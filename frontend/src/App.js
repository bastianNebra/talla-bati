import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Boxes, 
  Wrench, 
  Truck, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Video,
  Mail,
  Send,
  Award,
  Shield,
  Eye,
  Users
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Toaster, toast } from "sonner";
import axios from "axios";
import "@/App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Translations
const translations = {
  fr: {
    nav: {
      about: "À Propos",
      services: "Services",
      gallery: "Réalisations",
      whyUs: "Pourquoi Nous",
      contact: "Contact"
    },
    hero: {
      title: "Talla Bâti Concept SARL",
      subtitle: "L'excellence du BTP au cœur de Yaoundé",
      description: "Situés à l’arrêt de bus après le carrefour Tsimi Ydé Nkolbisson et en face de la chefferie Ététack, par Oyomaban, nous sommes votre partenaire de proximité pour tous vos projets de construction.",
      cta: "Demander un Devis",
      videoCta: "Appel Vidéo WhatsApp"
    },
    about: {
      badge: "Notre Histoire",
      title: "Votre Partenaire BTP de Confiance",
      description: "Situés à l’arrêt de bus après le carrefour Tsimi Ydé Nkolbisson et en face de la chefferie Ététack, par Oyomaban, nous sommes votre partenaire de proximité. Nous maîtrisons les défis de la construction locale grâce à nos agglos vibrés haute résistance, conçus pour durer.",
      location: "Carrefour Tsimi Ydé Nkolbisson, Yaoundé",
      phone: "+237 95513589",
      hours: "Lundi - Dimanche: 9h - 20h"
    },
    services: {
      badge: "Nos Piliers",
      title: "Services de Qualité",
      items: [
        {
          title: "BTP & Génie Civil",
          description: "Conception et réalisation de gros œuvre. De la fondation à la toiture, nous construisons votre avenir."
        },
        {
          title: "Production d'Agglos",
          description: "Unité de production locale d'agglos vibrés et ordinaires haute résistance, conçus pour le climat camerounais."
        },
        {
          title: "Quincaillerie",
          description: "Vente de matériaux certifiés: fer à béton, ciment de qualité, outillage professionnel."
        },
        {
          title: "Logistique",
          description: "Location de camions bennes robustes pour le transport de vos matériaux et déblais."
        }
      ]
    },
    gallery: {
      badge: "Portfolio",
      title: "Nos Réalisations",
      description: "Découvrez nos projets réalisés à Yaoundé et dans tout le Cameroun"
    },
    whyUs: {
      badge: "Nos Atouts",
      title: "Pourquoi Nous Choisir ?",
      items: [
        {
          title: "Qualité Certifiée",
          description: "Matériaux aux normes et procédés de construction rigoureux"
        },
        {
          title: "Respect des Délais",
          description: "Engagement ferme sur les délais de livraison de vos projets"
        },
        {
          title: "Visibilité Totale",
          description: "Suivi en temps réel par appel vidéo WhatsApp sur vos chantiers"
        },
        {
          title: "Expertise Locale",
          description: "Équipe expérimentée maîtrisant les spécificités du BTP camerounais"
        }
      ]
    },
    contact: {
      badge: "Contactez-Nous",
      title: "Demandez Votre Devis",
      form: {
        name: "Nom Complet",
        email: "Adresse Email",
        phone: "Téléphone",
        project: "Type de Projet",
        projectOptions: ["BTP & Génie Civil", "Achat d'Agglos", "Quincaillerie", "Location Camion", "Autre"],
        message: "Décrivez votre projet",
        submit: "Envoyer la Demande",
        submitting: "Envoi en cours..."
      },
      info: {
        title: "Informations de Contact",
        address: "Carrefour Tsimi Ydé Nkolbisson, Yaoundé, Cameroun",
        phone: "+237 95513589 /+237 67 74 02 29 8",
        hours: "Lundi - Dimanche: 9h - 20h"
      },
      success: "Demande envoyée avec succès!",
      error: "Erreur lors de l'envoi. Veuillez réessayer."
    },
    footer: {
      rights: "Tous droits réservés",
      tagline: "L'excellence du BTP au Cameroun"
    }
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      gallery: "Portfolio",
      whyUs: "Why Us",
      contact: "Contact"
    },
    hero: {
      title: "Talla Bâti Concept",
      subtitle: "Construction Excellence in the Heart of Yaoundé",
      description: "Based at Longkak Roundabout, we are your local partner for all your construction projects.",
      cta: "Request a Quote",
      videoCta: "WhatsApp Video Call"
    },
    about: {
      badge: "Our Story",
      title: "Your Trusted Construction Partner",
      description: "Based at Longkak Roundabout, we are your local partner. We master the challenges of local construction with our high-resistance vibrated blocks, designed to last.",
      location: "Longkak Roundabout, Yaoundé",
      phone: "+237 95513589",
      hours: "Monday - Sunday: 9am - 8pm"
    },
    services: {
      badge: "Our Pillars",
      title: "Quality Services",
      items: [
        {
          title: "Construction & Civil Engineering",
          description: "Design and construction of structural work. From foundation to roof, we build your future."
        },
        {
          title: "Block Production",
          description: "Local production unit of vibrated and ordinary high-resistance blocks, designed for the Cameroonian climate."
        },
        {
          title: "Hardware Store",
          description: "Sale of certified materials: reinforcing steel, quality cement, professional tools."
        },
        {
          title: "Logistics",
          description: "Rental of robust dump trucks for transporting your materials and debris."
        }
      ]
    },
    gallery: {
      badge: "Portfolio",
      title: "Our Projects",
      description: "Discover our completed projects in Yaoundé and throughout Cameroon"
    },
    whyUs: {
      badge: "Our Strengths",
      title: "Why Choose Us?",
      items: [
        {
          title: "Certified Quality",
          description: "Standard-compliant materials and rigorous construction processes"
        },
        {
          title: "On-Time Delivery",
          description: "Firm commitment to your project delivery deadlines"
        },
        {
          title: "Full Visibility",
          description: "Real-time monitoring via WhatsApp video call on your sites"
        },
        {
          title: "Local Expertise",
          description: "Experienced team mastering Cameroonian construction specifics"
        }
      ]
    },
    contact: {
      badge: "Contact Us",
      title: "Request Your Quote",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        project: "Project Type",
        projectOptions: ["Construction & Civil Engineering", "Block Purchase", "Hardware", "Truck Rental", "Other"],
        message: "Describe your project",
        submit: "Send Request",
        submitting: "Sending..."
      },
      info: {
        title: "Contact Information",
        address: "Carrefour Tsimi Ydé Nkolbisson, Yaoundé, Cameroon",
        phone: "+237 695 51 35 89 /+237 67 74 02 29 8",
        hours: "Monday - Sunday: 9am - 8pm"
      },
      success: "Request sent successfully!",
      error: "Error sending. Please try again."
    },
    footer: {
      rights: "All rights reserved",
      tagline: "Construction Excellence in Cameroon"
    }
  }
};

// Images for gallery
const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1700469919563-ef267d459da5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    title: { fr: "Chantier de Construction", en: "Construction Site" }
  },
  {
    url: "https://images.unsplash.com/photo-1641632621887-554d6c8cecc1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    title: { fr: "Immeuble en Construction", en: "Building Under Construction" }
  },
  {
    url: "https://images.unsplash.com/photo-1604044478919-5b53331fa61e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    title: { fr: "Structure Métallique", en: "Steel Structure" }
  },
  {
    url: "https://images.unsplash.com/photo-1762010231754-74e647a4631d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    title: { fr: "Matériaux de Construction", en: "Construction Materials" }
  },
  {
    url: "https://images.unsplash.com/photo-1758798349125-5c297b18b8b2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    title: { fr: "Équipe au Travail", en: "Team at Work" }
  }
];

// Service icons mapping
const serviceIcons = [Building2, Boxes, Wrench, Truck];

// Why Us icons
const whyUsIcons = [Award, Clock, Eye, Users];

function App() {
  const [lang, setLang] = useState("fr");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[lang];

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success(t.contact.success);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: ""
      });
    } catch (error) {
      toast.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="landing-page">
      <Toaster position="top-right" richColors />
      
      {/* Navbar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2" data-testid="logo">
              <div className="w-10 h-10 bg-[#FF5722] rounded-sm flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className={`font-bold text-xl font-['Manrope'] ${isScrolled ? "text-[#1A1A1A]" : "text-white"}`}>
                Talla Bâti
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`nav-link font-medium ${isScrolled ? "text-[#1A1A1A]" : "text-white"}`}
                  data-testid={`nav-${key}`}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Language Switch & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <div className="lang-switch" data-testid="lang-switch">
                <button
                  className={`lang-btn ${lang === "fr" ? "active" : ""}`}
                  onClick={() => setLang("fr")}
                  data-testid="lang-fr"
                >
                  FR
                </button>
                <button
                  className={`lang-btn ${lang === "en" ? "active" : ""}`}
                  onClick={() => setLang("en")}
                  data-testid="lang-en"
                >
                  EN
                </button>
              </div>

              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? (
                  <X className={isScrolled ? "text-[#1A1A1A]" : "text-white"} />
                ) : (
                  <Menu className={isScrolled ? "text-[#1A1A1A]" : "text-white"} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              data-testid="mobile-menu"
            >
              <div className="px-4 py-6 space-y-4">
                {Object.entries(t.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className="block w-full text-left py-2 text-[#1A1A1A] font-medium hover:text-[#FF5722] transition-colors"
                    data-testid={`mobile-nav-${key}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="hero-section"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1700469919563-ef267d459da5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920')`
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-[#FF5722]" />
              <span className="text-white text-sm">Rond-point Longkak, Yaoundé</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 font-['Manrope']"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-testid="hero-title"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-[#FF5722] font-semibold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#FF5722] hover:bg-[#F4511E] text-white px-8 py-6 text-lg font-bold rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              data-testid="hero-cta-quote"
            >
              {t.hero.cta}
            </Button>
            <a
              href="https://call.whatsapp.com/video/JAgxRVnZiNhjN3NHh4HAny"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-6 text-lg font-bold rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              data-testid="hero-cta-whatsapp"
            >
              <Video className="w-5 h-5" />
              {t.hero.videoCta}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {t.about.badge}
              </span>
              <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-8 font-['Manrope']">
                {t.about.title}
              </h2>
              <p className="text-lg text-[#71717A] leading-relaxed mb-8">
                {t.about.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F4F4F5] rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#FF5722]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{t.about.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F4F4F5] rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#FF5722]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{t.about.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F4F4F5] rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#FF5722]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{t.about.hours}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1657007739179-ab6790599d75?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                  alt="Construction materials"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#FF5722] text-white p-6 rounded-xl shadow-xl">
                <p className="text-4xl font-bold font-['Manrope']">SARL</p>
                <p className="text-sm opacity-80">Société à Responsabilité Limitée</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-[#F4F4F5]" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <span className="inline-block bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t.services.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] font-['Manrope']">
              {t.services.title}
            </h2>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            {...staggerContainer}
          >
            {t.services.items.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <motion.div
                  key={index}
                  className="service-card bg-white p-8 rounded-xl border border-[#E4E4E7] cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`service-card-${index}`}
                >
                  <div className="service-icon w-16 h-16 bg-[#F4F4F5] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[#FF5722]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 font-['Manrope']">
                    {service.title}
                  </h3>
                  <p className="text-[#71717A] leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-white" data-testid="gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <span className="inline-block bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t.gallery.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] font-['Manrope'] mb-4">
              {t.gallery.title}
            </h2>
            <p className="text-lg text-[#71717A] max-w-2xl mx-auto">
              {t.gallery.description}
            </p>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-2xl"
            {...fadeInUp}
          >
            <div className="relative h-[400px] md:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={galleryImages[currentSlide].url}
                  alt={galleryImages[currentSlide].title[lang]}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white font-['Manrope']">
                  {galleryImages[currentSlide].title[lang]}
                </h3>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              data-testid="gallery-prev"
            >
              <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              data-testid="gallery-next"
            >
              <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
            </button>
          </motion.div>

          {/* Gallery Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`gallery-dot ${index === currentSlide ? "active" : ""}`}
                data-testid={`gallery-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="whyUs" className="py-20 md:py-32 bg-[#1A1A1A]" data-testid="why-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <span className="inline-block bg-[#FF5722]/20 text-[#FF5722] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t.whyUs.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Manrope']">
              {t.whyUs.title}
            </h2>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            {...staggerContainer}
          >
            {t.whyUs.items.map((item, index) => {
              const Icon = whyUsIcons[index];
              return (
                <motion.div
                  key={index}
                  className="argument-card bg-[#2A2A2A] p-8 rounded-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`why-us-card-${index}`}
                >
                  <div className="w-14 h-14 bg-[#FF5722]/20 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#FF5722]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-['Manrope']">
                    {item.title}
                  </h3>
                  <p className="text-[#A1A1AA] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <span className="inline-block bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t.contact.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] font-['Manrope']">
              {t.contact.title}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div {...fadeInUp}>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      {t.contact.form.name}
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input w-full px-4 py-3 border border-[#E4E4E7] rounded-lg focus:outline-none"
                      required
                      data-testid="form-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      {t.contact.form.email}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input w-full px-4 py-3 border border-[#E4E4E7] rounded-lg focus:outline-none"
                      required
                      data-testid="form-email"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      {t.contact.form.phone}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input w-full px-4 py-3 border border-[#E4E4E7] rounded-lg focus:outline-none"
                      required
                      data-testid="form-phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      {t.contact.form.project}
                    </label>
                    <Select 
                      value={formData.projectType} 
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                    >
                      <SelectTrigger className="w-full px-4 py-3 border border-[#E4E4E7] rounded-lg" data-testid="form-project">
                        <SelectValue placeholder={t.contact.form.project} />
                      </SelectTrigger>
                      <SelectContent>
                        {t.contact.form.projectOptions.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    {t.contact.form.message}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="form-input w-full px-4 py-3 border border-[#E4E4E7] rounded-lg focus:outline-none resize-none"
                    required
                    data-testid="form-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white py-4 text-lg font-bold rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="form-submit"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                      {t.contact.form.submitting}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      {t.contact.form.submit}
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#F4F4F5] p-8 rounded-xl mb-8">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 font-['Manrope']">
                  {t.contact.info.title}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#FF5722]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A]">
                        {t.contact.info.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#FF5722]" />
                    </div>
                    <div>
                      <a href="tel:+23795513589" className="font-medium text-[#1A1A1A] hover:text-[#FF5722] transition-colors">
                        {t.contact.info.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#FF5722]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A]">
                        {t.contact.info.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="map-container h-[300px]" data-testid="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.7580825277656!2d11.5048!3d3.8636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf0f1f1f1f1f%3A0x1f1f1f1f1f1f1f1f!2sRond-point%20Longkak%2C%20Yaound%C3%A9%2C%20Cameroun!5e0!3m2!1sfr!2scm!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF5722] rounded-sm flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white font-['Manrope']">Talla Bâti Concept SARL</p>
                <p className="text-sm text-[#A1A1AA]">{t.footer.tagline}</p>
              </div>
            </div>
            <p className="text-[#A1A1AA] text-sm">
              © {new Date().getFullYear()} Talla Bâti Concept SARL. {t.footer.rights}.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://call.whatsapp.com/video/JAgxRVnZiNhjN3NHh4HAny"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        data-testid="floating-whatsapp"
      >
        <Video className="w-6 h-6" />
        <span className="hidden sm:inline">{t.hero.videoCta}</span>
      </a>
    </div>
  );
}

export default App;
