/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 💇‍♀️ EMANUELLA BEAUTY EMPIRE - SITE DE COIFFURE - UN SEUL FICHIER REACT 💇‍♀️
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Site professionnel pour salon de coiffure avec catalogue, présentation,
 * et système d'authentification simple.
 *
 * Palette de couleurs : Blanc (#FFFFFF) et Rose (#FF69B4, #FFB6C1, #FFC0CB)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * TOUT LE CODE EST DANS CE FICHIER - AUCUNE DÉPENDANCE LOCALE !
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import {
  Scissors,
  Menu,
  X,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Sparkles,
  Heart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Clock,
  Send,
  Check,
  BarChart3,
  MessageSquare,
  Eye,
  Home,
  Settings,
  Star,
} from "lucide-react";
import { Music2 as TikTok } from "lucide-react";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner@2.0.3";
import heroImage from "figma:asset/d238f4dd9b36f4b8d1951a9b01e84cdc5ac2b470.png";
import womanBraidsImage from "./assets/woman-braids-1.jpeg";
import menBraidsImage from "./assets/men-braids.jpeg";
import specialEventStylingImage from "./assets/special-event-styling.jpeg";
import womensHaircutImage from "./assets/womens-haircut.jpeg";
import cornrowsImage from "./assets/cornrows.jpeg";
import boxBraidsImage from "./assets/box-braids.jpeg";

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION SUPABASE
// ═══════════════════════════════════════════════════════════════════════════

const SUPABASE_PROJECT_ID = "nsbbcxbuzzpkeztcizow";
const SUPABASE_PUBLIC_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zYmJjeGJ1enpwa2V6dGNpem93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3Mjc2NTMsImV4cCI6MjA4MDMwMzY1M30.JGe4vUnZQ2fu_N0JvlhE3DA1Ao6aGq1ushRGUmPvI4U";

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION ADMIN
// ═══════════════════════════════════════════════════════════════════════════

const ADMIN_EMAIL = "terastyle1@gmail.com";
const ADMIN_PASSWORD = "bacd@2024";

// ══════════════════════════════════════════════════════════════���════════════
// SUPABASE CLIENT SINGLETON
// ═══════════════════════════════════════════════════════════════════════════

let supabaseInstance: ReturnType<
  typeof createSupabaseClient
> | null = null;

function createClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }
  supabaseInstance = createSupabaseClient(
    `https://${SUPABASE_PROJECT_ID}.supabase.co`,
    SUPABASE_PUBLIC_ANON_KEY,
  );
  return supabaseInstance;
}

// ═══════════════════════════════════════════════════════════════════════════
// DONNÉES DU CATALOGUE
// ═══════════════════════════════════════════════════════════════════════════

const services = [
  {
    id: 1,
    name: "Women's Braids",
    description:
      "Elegant and durable African braids, customized to your style",
    image: womanBraidsImage,
    popular: true,
  },
  {
    id: 2,
    name: "Men's Braids",
    description: "Modern and stylish men's braids, tailored to your look",
    image: menBraidsImage,
    popular: true,
  },
  {
    id: 3,
    name: "Women's Haircut",
    description:
      "Personalized haircut tailored to your face shape and style",
    image: womensHaircutImage,
    popular: false,
  },
  {
    id: 4,
    name: "Men's Haircut",
    description:
      "Precise and polished men's haircut for a flawless look",
    image:
      "https://images.unsplash.com/photo-1654097801176-cb1795fd0c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBoYWlyY3V0JTIwYmFyYmVyfGVufDF8fHx8MTc2MzY2MjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: false,
  },
  {
    id: 5,
    name: "Senegalese Twists",
    description:
      "Fine or jumbo twists for an iconic style",
    image: boxBraidsImage,
    popular: true,
  },
  {
    id: 6,
    name: "Cornrows",
    description: "Creative and precise cornrows for a structured look",
    image: cornrowsImage,
    popular: false,
  },
  {
    id: 7,
    name: "Blowout",
    description: "Perfect styling and volume for your hair",
    image:
      "https://images.unsplash.com/photo-1583170607643-9fcaba85073c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwYmxvd2RyeSUyMHN0eWxpbmd8ZW58MXx8fHwxNzYzNzY4NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: false,
  },
  {
    id: 8,
    name: "Special Event Styling",
    description: "Guaranteed elegance for your special events",
    image: specialEventStylingImage,
    popular: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT LOGO
// ═══════════════════════════════════════════════════════════════════════════

function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Couronne décorative */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <Sparkles className="text-pink-500" size={18} />
        </div>
        <Scissors className="text-pink-500" size={36} />
      </div>
      <div className="flex flex-col">
        <span
          className="text-xl md:text-2xl tracking-wider text-gray-900"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          EMANUELLA
        </span>
        <span className="text-sm md:text-base text-pink-500 tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
          BEAUTY EMPIRE
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT NAVBAR
// ═══════════════════════════════════════════════════════════════════════════

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  user: { id: string; email: string; name?: string } | null;
  onLogout: () => void;
}

function Navbar({
  onLoginClick,
  onSignupClick,
  user,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a
            href="#home"
            className="hover:opacity-80 transition-opacity"
          >
            <Logo />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-pink-50 border border-pink-200 rounded-full">
                  <User size={18} className="text-pink-500" />
                  <span className="text-gray-700">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-2"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={onSignupClick}
                  className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors flex items-center space-x-2"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-pink-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-pink-500 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <div className="border-t border-pink-100 pt-4 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-pink-50 border border-pink-200 rounded-full">
                      <User
                        size={18}
                        className="text-pink-500"
                      />
                      <span className="text-gray-700">
                        {user.name || user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-2"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onLoginClick();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-2"
                    >
                      <LogIn size={18} />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => {
                        onSignupClick();
                        setIsOpen(false);
                      }}
                      className="w-full px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ═════════════════════════════════════════════════���═════════════════════════
// ÉCRAN DE BIENVENUE
// ═══════════════════════════════════════════════════════════════════════════

interface WelcomeScreenProps {
  isFading: boolean;
}

function WelcomeScreen({ isFading }: WelcomeScreenProps) {
  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1, type: "spring" }}
              className="mb-6 flex justify-center"
            >
              <Sparkles
                size={64}
                className="text-pink-500"
              />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl text-gray-900 mb-4"
            >
              Welcome to <span className="text-pink-500">you</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl text-gray-600"
            >
              Your beauty destination
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT LOGO EBE (Badge élégant)
// ═══════════════════════════════════════════════════════════════════════════

function EBEBadge() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Image de beauté élégante */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-2xl"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={heroImage}
            alt="Emanuella Beauty Empire - Professional Hair Styling"
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION HERO
// ═══════════════════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section
      id="home"
      className="pt-32 pb-20 bg-gradient-to-b from-pink-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full mb-6"
            >
              <span className="flex items-center space-x-2">
                <Sparkles size={16} />
                <span>Your beauty, our passion</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl mb-6 text-gray-900"
            >
              Enhance your{" "}
              <span className="text-pink-500">style</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8"
            >
              Discover the excellence of professional hair styling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="px-8 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all inline-flex items-center space-x-2"
              >
                <Scissors size={20} />
                <span>Discover our services</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-4 border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-colors inline-flex items-center space-x-2"
              >
                <Phone size={20} />
                <span>Book appointment</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <EBEBadge />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION SERVICES/CATALOGUE
// ═══════════════════════════════════════════════════════════════════════════

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
            Our <span className="text-pink-500">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Custom services to reveal your natural beauty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-pink-100 hover:border-pink-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                {service.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    className="absolute top-4 right-4 px-3 py-1 bg-pink-500 text-white rounded-full text-sm flex items-center space-x-1"
                  >
                    <Heart size={14} />
                    <span>Popular</span>
                  </motion.div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-2 text-gray-900">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION À PROPOS
// ═══════════════════════════════════════════════════════════════════════════

function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white to-pink-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-6 text-gray-900"
          >
            About{" "}
            <span className="text-pink-500">Emanuella Beauty Empire</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 mb-6"
          >
            Emanuella Beauty Empire is your premier destination for
            all your hair care needs. Professional and passionate service
            to offer you an exceptional experience.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 mb-8"
          >
            Using high-quality professional products
            to ensure the health and beauty of your hair.
            Each visit is an opportunity to relax in a warm
            and welcoming environment.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      
      // Save message to Supabase
      const { data, error: dbError } = await supabase
        .from("contact_messages")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        })
        .select();

      if (dbError) {
        console.error("❌ Error saving message:", dbError);
        toast.error("Error sending your message. Please try again or contact us directly:\n📞 240 781 8109\n📧 terastyle1@gmail.com");
      } else {
        console.log("✅ Message saved successfully!", data);
        toast.success(
          "Thank you for your message! We will contact you very soon. 💇‍♀️\n\nFor immediate assistance:\n📞 240 781 8109",
          { duration: 6000 }
        );
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("❌ Erreur:", error);
      toast.error("Please contact us directly:\n📞 240 781 8109\n📧 terastyle1@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
            <span className="text-pink-500">Contact</span> Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book your appointment or contact us for more information
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-start space-x-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <MapPin size={24} className="text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl mb-2 text-gray-900">
                  Address
                </h3>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=13833+Outlet+Drive+Silver+Spring+MD+20904"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  13833 Outlet Drive
                  <br />
                  Silver Spring, MD 20904
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-start space-x-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Phone size={24} className="text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl mb-2 text-gray-900">
                  Phone
                </h3>
                <p className="text-gray-600">
                  240 781 8109
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex space-x-4 pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/terastyle1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.tiktok.com/@emanuellabeautyempire3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all"
              >
                <TikTok size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl mb-6 text-gray-900">
              Book an Appointment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className="block text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <label
                  htmlFor="phone"
                  className="block text-gray-700 mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="240 781 8109"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <label
                  htmlFor="message"
                  className="block text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none transition-colors resize-none"
                  placeholder="Describe your appointment request..."
                  required
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Request</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// REVIEWS SECTION
// ═══════════════════════════════════════════════════════════════════════════

function ReviewsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      
      // Validate form data
      if (!formData.name || !formData.email || !formData.comment) {
        toast.error("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      if (formData.rating < 1 || formData.rating > 5) {
        toast.error("Please select a valid rating.");
        setIsSubmitting(false);
        return;
      }
      
      // Save review to Supabase
      const { data, error: dbError } = await supabase
        .from("reviews")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          rating: formData.rating,
          comment: formData.comment.trim(),
        })
        .select();

      if (dbError) {
        console.error("❌ Error saving review - Details:", {
          error: dbError,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          code: dbError.code
        });
        toast.error(`Error submitting your review: ${dbError.message || "Database error"}. Please try again or contact us directly:\n📞 240 781 8109\n📧 terastyle1@gmail.com`);
      } else {
        console.log("✅ Review saved successfully!", data);
        toast.success("Thank you for your review! It will be published after moderation. 💇‍♀️");
        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: 5,
          comment: "",
        });
      }
    } catch (error: any) {
      console.error("❌ Unexpected error:", error);
      toast.error(`Error submitting your review: ${error?.message || "Unknown error"}. Please try again or contact us directly:\n📞 240 781 8109\n📧 terastyle1@gmail.com`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-white to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
            Your <span className="text-pink-500">Reviews</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your experience with us
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100"
          >
            <h3 className="text-2xl mb-6 text-gray-900">
              Leave a Review
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="review-email"
                  className="block text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-3">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={
                          star <= formData.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Click on the stars to rate (current: {formData.rating}/5)
                </p>
              </div>

              <div>
                <label
                  htmlFor="review-comment"
                  className="block text-gray-700 mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows={5}
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none transition-colors resize-none"
                  placeholder="Share your experience with us..."
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Submit Review</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════════════════

interface FooterProps {
  onPrivacyClick: () => void;
}

function Footer({ onPrivacyClick }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400">
              Your hair salon. Excellence and passion.
            </p>
          </div>

          <div>
            <h3 className="text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <button
                  onClick={onPrivacyClick}
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/terastyle1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@emanuellabeautyempire3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <TikTok size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Emanuella Beauty Empire. All
            rights reserved.
          </p>
          <p className="mt-2 text-sm">
            <button
              onClick={onPrivacyClick}
              className="hover:text-pink-400 transition-colors underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ══���════════════════════════════════════════════════════════════════════════
// MODAL DE CONNEXION
// ═══════════════════════════════════════════════════════════════════════════

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: {
    id: string;
    email: string;
    name?: string;
  }, isAdmin?: boolean) => void;
  onSwitchToSignup: () => void;
}

function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToSignup,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState("");

  const handleResetPassword = async (userEmail: string) => {
    if (!userEmail || !userEmail.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setResetLoading(true);
    setError("");
    setResetSuccess("");

    try {
      const supabase = createClient();
      
      // Send password reset email
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        userEmail,
        {
          redirectTo: `${window.location.origin}`,
        }
      );

      if (resetError) {
        throw resetError;
      }

      setResetSuccess(`✅ A reset email has been sent to ${userEmail}. Please check your inbox.`);
      setResetEmail("");
      toast.success("Reset email sent!");
    } catch (err: any) {
      setError(err.message || "Error during reset");
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      
      // Sign in directly with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      if (data.session) {
        // Try to get client data, but don't fail if table doesn't exist
        let clientData = null;
        try {
          const { data: client, error: clientError } = await supabase
            .from("clients")
            .select("*")
            .eq("user_id", data.user.id)
            .single();

          if (clientError && clientError.code !== "PGRST116") {
            console.warn("Client table not accessible:", clientError.message);
          } else {
            clientData = client;
          }
        } catch (clientErr) {
          console.warn("Client table not configured yet:", clientErr);
        }

        // Check if user is admin
        const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
        
        // Successfully authenticated - proceed with or without client data
        onSuccess({
          id: data.user.id,
          email: data.user.email || "",
          name: clientData?.nom_complet || data.user.email?.split('@')[0] || "User",
        }, isAdmin);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl mb-6 text-gray-900">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-pink-500 hover:text-pink-600"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL POLITIQUE DE CONFIDENTIALITÉ
// ═══════════════════════════════════════════════════════════════════════════

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 sticky top-0 z-10 bg-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl mb-6 text-gray-900">
          Privacy <span className="text-pink-500">Policy</span>
        </h2>

        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl text-gray-900 mb-3">1. Introduction</h3>
            <p>
              At <strong>Emanuella Beauty Empire</strong>, we are committed to protecting your privacy. 
              This privacy policy explains how we collect, use, and protect 
              your personal information when you use our website and services.
            </p>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">2. Information Collected</h3>
            <p className="mb-2">We collect the following information:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Appointment information and service preferences</li>
              <li>Login and authentication data</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">3. Use of Information</h3>
            <p className="mb-2">Your information is used to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Manage your account and authentication</li>
              <li>Process your appointment requests</li>
              <li>Contact you regarding our services</li>
              <li>Improve our website and services</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">4. Data Protection</h3>
            <p>
              We use advanced security measures to protect your personal data, 
              including SSL encryption, secure authentication via Supabase, and 
              strict access controls. Your passwords are encrypted and never stored in plain text.
            </p>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">5. Information Sharing</h3>
            <p>
              We do not sell, rent, or share your personal information with 
              third parties, except in the following cases:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>With service providers who help us operate our site (e.g., hosting)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">6. Your Rights</h3>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access your personal data</li>
              <li>Rectify your information</li>
              <li>Delete your account</li>
              <li>Object to the processing of your data</li>
              <li>Withdraw your consent at any time</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">7. Cookies</h3>
            <p>
              Our site uses essential cookies to ensure its proper functioning, 
              particularly to manage your authentication session. We do not use 
              advertising tracking cookies.
            </p>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">8. Data Retention</h3>
            <p>
              We retain your personal data as long as your account is active 
              or as needed to provide you with our services. You can request the 
              deletion of your data at any time.
            </p>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">9. Changes</h3>
            <p>
              We may update this privacy policy from time to time. 
              We will inform you of any significant changes by email or via a notification 
              on our site.
            </p>
          </section>

          <section>
            <h3 className="text-xl text-gray-900 mb-3">10. Contact</h3>
            <p>
              For any questions regarding this privacy policy or your personal 
              data, contact us:
            </p>
            <div className="mt-3 space-y-1 ml-4">
              <p className="flex items-center space-x-2">
                <Mail size={16} className="text-pink-500" />
                <span>Email : terastyle1@gmail.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} className="text-pink-500" />
                <span>Phone : 240 781 8109</span>
              </p>
              <p className="flex items-center space-x-2">
                <MapPin size={16} className="text-pink-500" />
                <span>Address : 13833 Outlet Drive, Silver Spring, MD 20904</span>
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-4 mt-6">
            <p className="text-sm text-gray-600 italic">
              Last updated: December 14, 2024
            </p>
          </section>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIGNUP MODAL
// ═══════════════════════════════════════════════════════════════════════════

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: {
    id: string;
    email: string;
    name?: string;
  }) => void;
  onSwitchToLogin: () => void;
}

function SignupModal({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToLogin,
}: SignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Check privacy policy acceptance
    if (!acceptedPrivacy) {
      setError("You must accept the privacy policy to continue.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      
      // Sign up directly with Supabase
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            name: name.trim(),
            telephone: telephone.trim() || null,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) {
        console.error("❌ Sign up error:", signUpError);
        // Check if email already exists
        if (signUpError.message.includes("already registered") || 
            signUpError.message.includes("User already registered") ||
            signUpError.message.includes("already been registered")) {
          setError("An account with this email already exists. Please sign in.");
          return;
        }
        // Check for network errors
        if (signUpError.message.includes("Failed to fetch") || 
            signUpError.message.includes("Network")) {
          setError("Network error. Please check your internet connection and try again.");
          return;
        }
        setError(signUpError.message || "Sign up error. Please try again.");
        return;
      }

      if (!signUpData.user) {
        setError("Failed to create account. Please try again.");
        return;
      }

      if (signUpData.session) {
        // Successful login (auto-confirmation enabled)
        // Try to check client table, but don't fail if it doesn't exist
        try {
          const { data: existingClient } = await supabase
            .from("clients")
            .select("*")
            .eq("user_id", signUpData.user.id)
            .single();

          if (!existingClient) {
            console.log("ℹ️ Client profile will be created by Supabase trigger");
          }
        } catch (clientErr) {
          console.warn("Client table not configured yet:", clientErr);
        }

        // Check if user is admin
        const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
        
        onSuccess({
          id: signUpData.user.id,
          email: signUpData.user.email!,
          name: signUpData.user.user_metadata?.name || name,
        }, isAdmin);
        toast.success("Sign up successful! Welcome to Emanuella Beauty Empire 💇‍♀️");
        onClose();
      } else {
        // If no session (email confirmation required)
        toast.success("Sign up successful! Please check your email to confirm your account.");
        onClose();
      }
    } catch (err: any) {
      console.error("❌ Unexpected error during sign up:", err);
      if (err.message && err.message.includes("Failed to fetch")) {
        setError("Network error. Please check your internet connection and try again.");
      } else {
        setError(err.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative my-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl md:text-3xl mb-4 md:mb-6 text-gray-900 pr-8">
          Sign Up
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
            {error.includes("already exists") && (
              <div className="mt-2">
                <button
                  onClick={onSwitchToLogin}
                  className="text-pink-600 hover:text-pink-700 underline"
                >
                  Click here to sign in
                </button>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="block text-gray-700 mb-2 text-sm md:text-base"
            >
              Full Name
            </label>
            <input
              type="text"
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="block text-gray-700 mb-2 text-sm md:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="signup-telephone"
              className="block text-gray-700 mb-2 text-sm md:text-base"
            >
              Phone (optional)
            </label>
            <input
              type="tel"
              id="signup-telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none text-sm md:text-base"
              placeholder="+1 240 123 4567"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-gray-700 mb-2 text-sm md:text-base"
            >
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-pink-100 rounded-lg focus:border-pink-500 focus:outline-none text-sm md:text-base"
              required
              minLength={6}
            />
          </div>

          {/* Privacy Policy - REQUIRED */}
          <div className="border-2 border-pink-200 bg-pink-50 rounded-lg p-3 md:p-4">
            <label className="flex items-start space-x-2 md:space-x-3 cursor-pointer">
              <div className="relative flex items-center justify-center flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id="privacy-policy"
                  checked={acceptedPrivacy}
                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  className="w-4 h-4 md:w-5 md:h-5 text-pink-500 border-2 border-pink-300 rounded focus:ring-pink-500 cursor-pointer"
                  required
                />
                {acceptedPrivacy && (
                  <Check 
                    size={14} 
                    className="absolute text-pink-500 pointer-events-none"
                  />
                )}
              </div>
              <span className="text-gray-700 text-xs md:text-sm leading-relaxed">
                <span className="text-red-500">*</span> I accept the{" "}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-pink-500 hover:text-pink-600 underline font-medium"
                >
                  privacy policy
                </button>
                {" "}and consent to the processing of my personal data.
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-2 ml-6 md:ml-8">
              This acceptance is required to create an account.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !acceptedPrivacy}
            className="w-full px-6 py-3 md:py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 md:mt-6 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-pink-500 hover:text-pink-600 underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD ADMIN
// ═══════════════════════════════════════════════════════════════════════════

interface DashboardAdminProps {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  onLogout: () => void;
  onBackToSite: () => void;
}

function DashboardAdmin({ user, onLogout, onBackToSite }: DashboardAdminProps) {
  const [visits, setVisits] = useState<number>(0);
  const [messages, setMessages] = useState<Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at: string;
  }>>([]);
  const [reviews, setReviews] = useState<Array<{
    id: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      const supabase = createClient();
      
      try {
        // Load visit count
        const { count, error: visitsError } = await supabase
          .from("site_visits")
          .select("*", { count: "exact", head: true });

        if (!visitsError && count !== null) {
          setVisits(count);
        }

        // Load contact messages
        const { data: messagesData, error: messagesError } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (!messagesError && messagesData) {
          setMessages(messagesData);
        }

        // Load reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (!reviewsError && reviewsData) {
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Navbar du Dashboard */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-pink-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Logo />
              <span className="text-gray-500">|</span>
              <span className="text-gray-700 font-medium">Dashboard Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToSite}
                className="px-4 py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-2"
              >
                <Home size={18} />
                <span>Back to Site</span>
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu du Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl mb-2 text-gray-900">
            Dashboard <span className="text-pink-500">Admin</span>
          </h1>
          <p className="text-xl text-gray-600">
            Welcome, {user.name || user.email}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={48} className="text-pink-500" />
            </motion.div>
          </div>
        ) : (
          <>
            {/* Statistiques */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                      <Eye size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-600 text-sm font-medium">Visitors</h3>
                      <p className="text-3xl font-bold text-gray-900">{visits}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Total site visits
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                      <MessageSquare size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-600 text-sm font-medium">Messages</h3>
                      <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Contact messages received
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                      <Star size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-600 text-sm font-medium">Reviews</h3>
                      <p className="text-3xl font-bold text-gray-900">{reviews.length}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Customer reviews received
                </p>
              </motion.div>
            </div>

            {/* Liste des messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden"
            >
              <div className="p-6 border-b border-pink-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <MessageSquare className="text-pink-500" size={24} />
                  <span>Contact Messages</span>
                </h2>
              </div>
              <div className="divide-y divide-pink-100 max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No messages at the moment</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div
                      key={msg.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-pink-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {msg.name}
                            </h3>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 text-sm">{msg.email}</span>
                          </div>
                          {msg.phone && (
                            <p className="text-gray-600 text-sm mb-2">
                              📞 {msg.phone}
                            </p>
                          )}
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-gray-400 text-sm">
                            {new Date(msg.created_at).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Reviews List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden mt-8"
            >
              <div className="p-6 border-b border-pink-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Star className="text-pink-500" size={24} />
                  <span>Customer Reviews</span>
                </h2>
              </div>
              <div className="divide-y divide-pink-100 max-h-[600px] overflow-y-auto">
                {reviews.length === 0 ? (
                  <div className="p-12 text-center">
                    <Star size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No reviews at the moment</p>
                  </div>
                ) : (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-pink-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {review.name}
                            </h3>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 text-sm">{review.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="text-gray-500 text-sm ml-2">
                              ({review.rating}/5)
                            </span>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {review.comment}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-gray-400 text-sm">
                            {new Date(review.created_at).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL APP
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name?: string;
  } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWelcomeFading, setIsWelcomeFading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    // Start fade-out after 4 seconds
    const fadeTimer = setTimeout(() => {
      setIsWelcomeFading(true);
    }, 4000);

    // Completely hide screen after 5.5 seconds (4s + 1.5s fade-out)
    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 5500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    // Record a visit when site loads
    const trackVisit = async () => {
      try {
        const supabase = createClient();
        await supabase.from("site_visits").insert({});
      } catch (error) {
        console.warn("Unable to record visit:", error);
      }
    };
    trackVisit();
  }, []);

  useEffect(() => {
    // Check session on load
    const checkSession = async () => {
      const supabase = createClient();
      
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // Check if user is admin
          const userIsAdmin = session.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
          setIsAdmin(userIsAdmin);
          
          // If admin, redirect to dashboard
          if (userIsAdmin) {
            setIsDashboard(true);
          }
          
          // Try to get client data, but proceed without it if table doesn't exist
          let clientData = null;
          try {
            const { data: client, error: clientError } = await supabase
              .from("clients")
              .select("*")
              .eq("user_id", session.user.id)
              .single();

            if (!clientError || clientError.code === "PGRST116") {
              clientData = client;
            }
          } catch (clientErr) {
            console.warn("Client table not configured yet:", clientErr);
          }

          // Set user with available data
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || clientData?.nom_complet || session.user.email?.split('@')[0] || "User",
          });
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setIsDashboard(false);
  };

  const handleLoginSuccess = (user: { id: string; email: string; name?: string }, admin?: boolean) => {
    setUser(user);
    if (admin !== undefined) {
      setIsAdmin(admin);
      setIsDashboard(admin);
    }
  };

  const handleBackToSite = () => {
    setIsDashboard(false);
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // If checking authentication, show loader
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4 flex justify-center"
          >
            <Sparkles size={48} className="text-pink-500" />
          </motion.div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, show only authentication modals
  if (!user) {
    return (
      <>
        {showWelcome && <WelcomeScreen isFading={isWelcomeFading} />}
        
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8"
            >
              <Logo />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl mb-4 text-gray-900"
            >
              Welcome to <span className="text-pink-500">Emanuella Beauty Empire</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8"
            >
              Please sign in or create an account to access our services
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full px-8 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
              >
                <LogIn size={20} />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => setShowSignupModal(true)}
                className="w-full px-8 py-4 border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2"
              >
                <UserPlus size={20} />
                <span>Create Account</span>
              </button>
            </motion.div>
          </div>
        </div>

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={handleSwitchToSignup}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </>
    );
  }

  // If user is logged in and is admin in dashboard mode, show dashboard
  if (user && isDashboard && isAdmin) {
    return (
      <>
        <DashboardAdmin
          user={user}
          onLogout={handleLogout}
          onBackToSite={handleBackToSite}
        />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // If user is logged in, show full site
  return (
    <>
      {showWelcome && <WelcomeScreen isFading={isWelcomeFading} />}

      <div className="min-h-screen bg-white">
        <Navbar
          onLoginClick={() => setShowLoginModal(true)}
          onSignupClick={() => setShowSignupModal(true)}
          user={user}
          onLogout={handleLogout}
        />

        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
        <Footer onPrivacyClick={() => setShowPrivacyModal(true)} />

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={handleSwitchToSignup}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />

        <PrivacyPolicyModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
        />
        
        <Toaster position="top-center" richColors />
      </div>
    </>
  );
}