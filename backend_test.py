import requests
import sys
from datetime import datetime
import json

class TallaBatiAPITester:
    def __init__(self, base_url="https://talla-bati.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    result["error"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, result["response_data"] if success else result["error"]

        except Exception as e:
            print(f"❌ Failed - Exception: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, str(e)

    def test_health_check(self):
        """Test API health check"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+237 95513589",
            "projectType": "BTP & Génie Civil",
            "message": "Test message for construction project"
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )

    def test_get_contact_requests(self):
        """Test getting all contact requests"""
        return self.run_test(
            "Get Contact Requests",
            "GET",
            "contact",
            200
        )

    def test_status_check_creation(self):
        """Test status check creation"""
        test_data = {
            "client_name": "Test Client"
        }
        
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )

    def test_get_status_checks(self):
        """Test getting status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

def main():
    print("🚀 Starting Talla Bâti Concept API Tests")
    print("=" * 50)
    
    # Setup
    tester = TallaBatiAPITester()
    
    # Run core API tests
    print("\n📋 Testing Core API Endpoints...")
    tester.test_health_check()
    tester.test_api_root()
    
    # Test contact functionality
    print("\n📞 Testing Contact Form Functionality...")
    contact_success, contact_response = tester.test_contact_form_submission()
    tester.test_get_contact_requests()
    
    # Test status functionality
    print("\n📊 Testing Status Check Functionality...")
    tester.test_status_check_creation()
    tester.test_get_status_checks()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        
        # Print failed tests summary
        failed_tests = [test for test in tester.test_results if not test["success"]]
        if failed_tests:
            print("\n❌ Failed Tests Summary:")
            for test in failed_tests:
                print(f"   - {test['test_name']}: {test['error']}")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())