import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const letterContent = `يا سوستة،

رغم كل خناقاتنا، ومشاكل السكن، وكل مرة قولنا فيها مش هنتكلم تاني، للأسف لسه أصحاب.

من أول أكلات فري فاير في ريبابلك، لخناقات البلكونة، لخناقة المرتبة، لسفرنا، ولكل مصايب السكنات اللي ربنا ما يعيدها.

مش مصدقة إننا عدينا بكل ده ولسه بنضحك عليه.

كل سنة وانتي طيبة، وعقبال سنين كتير كلها ضحك وراحة ونجاح.

— يمنى`;

export default function LetterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div 
      ref={ref}
      className="section-padding min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--text-primary)" }}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 
            className="font-heading text-3xl sm:text-5xl font-bold text-white mb-3"
          >
            A Secret Letter
            <Heart className="inline w-6 h-6 sm:w-7 sm:h-7 ml-2 fill-current text-pink-300" />
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            Click the envelope to reveal
          </p>
        </motion.div>

        {/* Envelope / Letter */}
        <div className="relative flex justify-center items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="envelope"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpen}
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="relative"
                >
                  <img
                    src="/images/envelope.png"
                    alt="Secret envelope"
                    className="w-64 h-auto drop-shadow-2xl"
                  />
                  
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl blur-2xl opacity-40 -z-10"
                    style={{ backgroundColor: "var(--blush-deep)" }}
                  />
                </motion.div>

                {/* Click hint */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm whitespace-nowrap"
                >
                  Click to open
                </motion.div>

                {/* Sparkles */}
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-pink-300" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-6"
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-pink-200" />
                </motion.div>
              </motion.button>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative max-w-2xl w-full mx-4"
              >
                {/* Letter paper */}
                <div 
                  className="relative rounded-2xl p-6 sm:p-12 shadow-2xl"
                  style={{ 
                    background: "linear-gradient(135deg, #FFF8F5 0%, #FFF0EB 100%)",
                  }}
                >
                  {/* Decorative corner */}
                  <div 
                    className="absolute top-4 right-4 w-16 h-16 opacity-20"
                    style={{
                      background: "radial-gradient(circle, var(--blush-deep) 0%, transparent 70%)"
                    }}
                  />

                  {/* Letter content */}
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <pre 
                        className="font-arabic text-base sm:text-xl leading-relaxed sm:leading-loose whitespace-pre-wrap"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {letterContent}
                      </pre>
                    </motion.div>

                    {/* Heart stamp */}
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: -15 }}
                      transition={{ delay: 1.5, duration: 0.4, type: "spring" }}
                      className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--blush-pink)" }}
                    >
                      <Heart 
                        className="w-8 h-8 fill-current" 
                        style={{ color: "var(--blush-deep)" }} 
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ["#E9A5B3", "#F8D7DA", "#FADADD"][i % 3],
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
