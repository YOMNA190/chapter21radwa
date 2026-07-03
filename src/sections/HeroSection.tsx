import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  scrollY: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: July 3, 2026 (Radwa's 21st birthday)
    const targetDate = new Date("2026-07-03T00:00:00").getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Birthday has arrived!
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToMemories = () => {
    const element = document.getElementById("memories");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const parallaxOffset = scrollY * 0.3;

  return (
    <div 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FFF8F5 0%, #FADADD 50%, #FFF0EB 100%)",
      }}
    >
      {/* Decorative gradient orbs */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #F8D7DA 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #E9A5B3 0%, transparent 70%)" }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "var(--blush-pink)" }}
            >
              <Heart className="w-4 h-4" style={{ color: "var(--blush-deep)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                July 3, 2004
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Happy
              <br />
              <span className="italic" style={{ color: "var(--blush-deep)" }}>21st</span> Birthday,
              <br />
              Radwa{" "}
              <Heart className="inline w-8 h-8 fill-current" style={{ color: "var(--blush-deep)" }} />
            </motion.h1>

            {/* Arabic Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-arabic text-2xl sm:text-3xl mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              كل سنة وانتي طيبة يا سوستة
            </motion.p>

            {/* Arabic Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-arabic text-lg max-w-lg mx-auto lg:mx-0 mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              رغم كل خناقاتنا، ومشاكل السكن، وكل مرة قولنا فيها مش هنتكلم تاني، للأسف لسه أصحاب.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToMemories}
              className="btn-primary inline-flex items-center gap-2 text-lg mb-10"
            >
              <Sparkles className="w-5 h-5" />
              Make A Wish
              <Heart className="w-5 h-5" />
            </motion.button>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center lg:justify-start gap-3"
            >
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="glass-card px-4 py-3 text-center min-w-[70px]"
                >
                  <div 
                    className="font-heading text-2xl sm:text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div 
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="order-1 lg:order-2 relative"
            style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Glow behind image */}
              <div 
                className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
                style={{ 
                  background: "linear-gradient(135deg, #E9A5B3, #F8D7DA)",
                  transform: "scale(1.1) translateY(10px)"
                }}
              />
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/images/radwa-09.png"
                  alt="Radwa and Yumna together"
                  className="w-full h-auto object-cover"
                  style={{ 
                    maxHeight: "600px",
                    borderRadius: "24px"
                  }}
                />
                
                {/* Overlay gradient */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(233, 165, 179, 0.3) 0%, transparent 40%)"
                  }}
                />
              </div>

              {/* Floating decoration */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--blush-pink)" }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 fill-current" style={{ color: "var(--blush-deep)" }} />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass-card px-4 py-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="font-arabic text-sm" style={{ color: "var(--text-secondary)" }}>
                  best day ever
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <button onClick={scrollToMemories} className="flex flex-col items-center gap-2">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Scroll</span>
          <ChevronDown className="w-5 h-5" style={{ color: "var(--blush-deep)" }} />
        </button>
      </motion.div>
    </div>
  );
}
