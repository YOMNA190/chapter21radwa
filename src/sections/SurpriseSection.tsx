import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, Gift, PartyPopper } from "lucide-react";
// @ts-ignore
import confetti from "canvas-confetti";

export default function SurpriseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isRevealed, setIsRevealed] = useState(false);

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#E9A5B3", "#F8D7DA", "#FADADD", "#F5D0D8", "#FFFFFF"];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 8,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
        scalar: 1.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    const burstPositions = [
      { x: 0.2, y: 0.3 },
      { x: 0.5, y: 0.2 },
      { x: 0.8, y: 0.3 },
    ];

    burstPositions.forEach((pos, i) => {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: pos,
          colors: colors,
          scalar: 2,
          ticks: 200,
          gravity: 0.8,
          drift: 0,
        });
      }, i * 400);
    });
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    triggerConfetti();
  };

  return (
    <div 
      ref={ref}
      className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        background: "radial-gradient(circle at center, #FADADD 0%, #FFF8F5 70%)" 
      }}
    >
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: ["#E9A5B3", "#F8D7DA", "#FADADD"][i % 3],
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.button
                onClick={handleReveal}
                className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center gap-3 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #E9A5B3, #F5D0D8)",
                  boxShadow: "0 0 60px rgba(233, 165, 179, 0.5)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(233, 165, 179, 0.4)",
                    "0 0 80px rgba(233, 165, 179, 0.7)",
                    "0 0 40px rgba(233, 165, 179, 0.4)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                <Gift className="w-12 h-12 text-white" />
                <span className="font-heading text-2xl text-white font-semibold">
                  Open Your
                  <br />
                  Surprise
                </span>
              </motion.button>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-8 text-lg"
                style={{ color: "var(--text-muted)" }}
              >
                Tap the button to reveal your surprise!
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 
                  className="font-heading text-5xl sm:text-6xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Happy 21st Birthday
                  <br />
                  Radwa{" "}
                  <Heart className="inline w-10 h-10 fill-current" style={{ color: "var(--blush-deep)" }} />
                </h2>
              </motion.div>

              {/* Arabic message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="font-arabic text-2xl sm:text-3xl mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                كل سنة وانتي طيبة يا سوستة
              </motion.p>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="relative mb-8"
              >
                <div 
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                  style={{ 
                    background: "linear-gradient(135deg, #E9A5B3, #F8D7DA)",
                    transform: "scale(1.1)"
                  }}
                />
                <img
                  src="/images/radwa-09.png"
                  alt="Radwa and Yumna"
                  className="relative w-72 h-auto rounded-3xl shadow-2xl"
                />
                
                {/* Floating hearts around image */}
                <motion.div
                  className="absolute -top-4 -left-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 fill-current" style={{ color: "var(--blush-deep)" }} />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -right-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  <Heart className="w-6 h-6 fill-current" style={{ color: "var(--blush-pink)" }} />
                </motion.div>
              </motion.div>

              {/* Signature */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="font-heading text-xl"
                style={{ color: "var(--blush-deep)" }}
              >
                — Yomna{" "}
                <Heart className="inline w-5 h-5 fill-current" />
              </motion.p>

              {/* Re-trigger confetti button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={triggerConfetti}
                className="mt-8 btn-primary flex items-center gap-2"
              >
                <PartyPopper className="w-5 h-5" />
                Celebrate Again!
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
