from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Talla Bâti Concept API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    projectType: Optional[str] = ""
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class ContactRequestCreate(BaseModel):
    name: str
    email: str
    phone: str
    projectType: Optional[str] = ""
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    projectType: Optional[str]
    message: str
    timestamp: str
    status: str


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Talla Bâti Concept API - Bienvenue!"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def create_contact_request(input: ContactRequestCreate):
    """Create a new contact/quote request"""
    contact_dict = input.model_dump()
    contact_obj = ContactRequest(**contact_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contact_requests.insert_one(doc)
    
    return ContactResponse(
        id=contact_obj.id,
        name=contact_obj.name,
        email=contact_obj.email,
        phone=contact_obj.phone,
        projectType=contact_obj.projectType,
        message=contact_obj.message,
        timestamp=doc['timestamp'],
        status=contact_obj.status
    )

@api_router.get("/contact", response_model=List[ContactResponse])
async def get_contact_requests():
    """Get all contact/quote requests"""
    contacts = await db.contact_requests.find({}, {"_id": 0}).to_list(1000)
    
    result = []
    for contact in contacts:
        result.append(ContactResponse(
            id=contact['id'],
            name=contact['name'],
            email=contact['email'],
            phone=contact['phone'],
            projectType=contact.get('projectType', ''),
            message=contact['message'],
            timestamp=contact['timestamp'],
            status=contact.get('status', 'pending')
        ))
    
    return result

@api_router.get("/contact/{contact_id}", response_model=ContactResponse)
async def get_contact_request(contact_id: str):
    """Get a specific contact/quote request by ID"""
    contact = await db.contact_requests.find_one({"id": contact_id}, {"_id": 0})
    
    if not contact:
        raise HTTPException(status_code=404, detail="Contact request not found")
    
    return ContactResponse(
        id=contact['id'],
        name=contact['name'],
        email=contact['email'],
        phone=contact['phone'],
        projectType=contact.get('projectType', ''),
        message=contact['message'],
        timestamp=contact['timestamp'],
        status=contact.get('status', 'pending')
    )

@api_router.patch("/contact/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """Update the status of a contact request"""
    result = await db.contact_requests.update_one(
        {"id": contact_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact request not found")
    
    return {"message": "Status updated successfully", "status": status}


# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Talla Bâti Concept API"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
