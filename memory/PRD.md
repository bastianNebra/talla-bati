# Talla Bâti Concept SARL - PRD

## Original Problem Statement
Landing Page High Quality (One-Page) Premium & Conversion-Oriented pour Talla Bâti Concept SARL - Entreprise BTP au Cameroun.
- Cible : Particuliers et professionnels à Yaoundé et dans tout le Cameroun
- Localisation : Rond-point Longkak, Yaoundé

## User Personas
1. **Particuliers camerounais** - Recherchent des services de construction pour villas/maisons
2. **Professionnels/Entreprises** - Besoin de matériaux de construction ou location de camions
3. **Promoteurs immobiliers** - Projets de grande envergure

## Core Requirements (Static)
- Design Premium: Gris Anthracite, Orange Sécurité, Blanc
- Sections: Hero, À Propos, Services, Galerie, Pourquoi Nous, Contact
- Formulaire de devis avec stockage MongoDB
- Google Maps intégré (Rond-point Longkak)
- Bouton WhatsApp Video flottant
- Bilingue FR/EN
- Responsive mobile

## What's Been Implemented (10 Mars 2026)
### Frontend
- ✅ Hero Section avec image de fond et CTAs (Devis + WhatsApp Vidéo)
- ✅ Navigation sticky avec glassmorphism
- ✅ Switch langue FR/EN fonctionnel
- ✅ Section À Propos avec infos contact
- ✅ 4 Services en grille Bento (BTP, Agglos, Quincaillerie, Logistique)
- ✅ Galerie slider avec navigation
- ✅ Section "Pourquoi Nous" avec 4 arguments
- ✅ Formulaire de devis complet
- ✅ Google Maps intégré
- ✅ Bouton WhatsApp flottant
- ✅ Animations scroll reveal (Framer Motion)
- ✅ Design responsive mobile

### Backend
- ✅ API /api/contact - Soumission formulaire de contact
- ✅ API /api/health - Health check
- ✅ Stockage MongoDB pour demandes de devis

## Tech Stack
- Frontend: React, Tailwind CSS, Framer Motion, Shadcn/UI
- Backend: FastAPI, Motor (MongoDB async)
- Database: MongoDB

## Prioritized Backlog

### P0 (Critique) - Terminé
- ✅ Landing page fonctionnelle

### P1 (Important) - À considérer
- [ ] Dashboard admin pour gérer les demandes de devis
- [ ] Notifications email/SMS lors de nouvelles demandes
- [ ] Témoignages clients dynamiques

### P2 (Nice to have)
- [ ] Blog/Actualités
- [ ] Calculateur de devis en ligne
- [ ] Chat en direct

## Next Action Items
1. Ajouter des vrais témoignages clients
2. Configurer notifications email pour nouvelles demandes
3. SEO avancé avec meta tags optimisés
