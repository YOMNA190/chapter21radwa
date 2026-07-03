import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Home, Image, Gift, Mail, Sparkles, Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  scrollTo: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "memories", label: "Memories", icon: Image },
  { id: "gallery", label: "Gallery", icon: Sparkles },
  { id: "wishes", label: "Wishes", icon: Gift },
  { id: "letter", label: "Letter", icon: Mail },
  { id: "surprise", label: "Surprise", icon: Heart },
];

export default function Navigation({ activeSection, scrollTo, mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 font-heading text-xl font-semibold"
              style={{ color: "var(--text-primary)" }}
              whileHover={{ scale: 1.05 }}
            >
              <span>Radwa&apos;s 21</span>
              <Heart className="w-4 h-4 fill-current" style={{ color: "var(--blush-deep)" }} />
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white shadow-md"
                      : "hover:bg-white/50"
                  }`}
                  style={
                    activeSection === item.id
                      ? { backgroundColor: "var(--blush-deep)" }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.button
              onClick={() => scrollTo("surprise")}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: "var(--blush-deep)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-4 h-4" />
              <span>Yumna</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/50"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 glass-nav shadow-lg md:hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === item.id
                      ? "text-white"
                      : "hover:bg-white/50"
                  }`}
                  style={
                    activeSection === item.id
                      ? { backgroundColor: "var(--blush-deep)" }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
