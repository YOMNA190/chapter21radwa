import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

const messages = [
  { text: "كل سنة وانتي طيبة", position: "top-0 left-[5%]", size: "text-lg", delay: 0 },
  { text: "إحنا قولنا مش هنتكلم تاني كام مرة؟", position: "top-8 right-[10%]", size: "text-base", delay: 0.1 },
  { text: "خناقة المرتبة كانت تاريخية", position: "top-32 left-[15%]", size: "text-base", delay: 0.2 },
  { text: "ربنا ما يعيد أيام السكنات", position: "top-24 right-[5%]", size: "text-lg", delay: 0.3 },
  { text: "لسه مش مصدقة إننا عدينا بكل ده", position: "top-56 left-[8%]", size: "text-base", delay: 0.4 },
  { text: "وعقبال سفريات أكتر ومشاكل أقل", position: "top-48 right-[15%]", size: "text-lg", delay: 0.5 },
];

export default function MessageWallSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className="section-padding relative overflow-hidden min-h-[600px]"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Background gradient orbs */}
      <div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #F8D7DA 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #E9A5B3 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="font-arabic text-4xl sm:text-5xl font-bold inline-flex items-center gap-3"
            style={{ color: "var(--text-primary)" }}
          >
            رسايل الحب
            <Heart className="w-7 h-7 fill-current" style={{ color: "var(--blush-deep)" }} />
          </h2>
        </motion.div>

        {/* Floating Cards - Grid on Mobile, Absolute on Desktop */}
        <div className="relative min-h-[400px] lg:h-[500px] flex flex-wrap justify-center gap-4 lg:block">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: message.delay }}
              className={`relative lg:absolute ${message.position}`}
              style={{
                animation: `floating ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="glass-card px-4 py-3 sm:px-6 sm:py-4 cursor-pointer"
                style={{
                  transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (3 + index)}deg)`,
                  borderColor: "rgba(233, 165, 179, 0.3)",
                }}
              >
                <p 
                  className={`font-arabic ${message.size} whitespace-normal lg:whitespace-nowrap`}
                  style={{ color: "var(--text-primary)" }}
                >
                  {message.text}
                </p>
              </motion.div>
            </motion.div>
          ))}

          {/* Center decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(233, 165, 179, 0.2) 0%, transparent 70%)",
              }}
            >
              <Heart 
                className="w-12 h-12 fill-current" 
                style={{ color: "var(--blush-deep)", opacity: 0.4 }} 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
