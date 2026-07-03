import { useState, useEffect } from "react";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import GallerySection from "./sections/GallerySection";
import MessagesSection from "./sections/MessagesSection";
import RoommateSection from "./sections/RoommateSection";
import LetterSection from "./sections/LetterSection";
import MessageWallSection from "./sections/MessageWallSection";
import SurpriseSection from "./sections/SurpriseSection";
import Footer from "./sections/Footer";
import FloatingHearts from "./sections/FloatingHearts";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ["home", "memories", "gallery", "wishes", "letter", "surprise"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <FloatingHearts />
      
      <Navigation 
        activeSection={activeSection} 
        scrollTo={scrollTo} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main>
        <section id="home">
          <HeroSection scrollY={scrollY} />
        </section>
        
        <section id="memories">
          <AboutSection />
        </section>
        
        <section id="gallery">
          <GallerySection />
        </section>
        
        <section id="wishes">
          <MessagesSection />
        </section>
        
        <RoommateSection />
        
        <section id="letter">
          <LetterSection />
        </section>
        
        <MessageWallSection />
        
        <section id="surprise">
          <SurpriseSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
