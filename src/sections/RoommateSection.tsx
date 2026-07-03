import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Laugh, Bed, UtensilsCrossed, Plane } from "lucide-react";

const memories = [
  { icon: Home, label: "مشاكل السكن", color: "#E9A5B3" },
  { icon: Laugh, label: "خناقات البلكونة", color: "#F8D7DA" },
  { icon: Bed, label: "خناقة المرتبة", color: "#FADADD" },
  { icon: UtensilsCrossed, label: "أكلات فري فاير", color: "#F5D0D8" },
  { icon: Plane, label: "السفر", color: "#E9A5B3" },
];

export default function RoommateSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className="section-padding overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, #FADADD 0%, var(--cream) 100%)" 
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="font-arabic text-4xl sm:text-5xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            عصر كوارث السكن
          </h2>
          <p 
            className="font-heading text-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            The Roommate Disaster Era
          </p>
        </motion.div>

        {/* Memory Cards */}
        <div className="flex gap-5 overflow-x-auto pb-6 px-4 justify-start lg:justify-center">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="flex-shrink-0 w-48 glass-card p-6 text-center cursor-pointer"
              style={{
                boxShadow: `0 8px 32px ${memory.color}30`,
              }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${memory.color}30` }}
              >
                <memory.icon 
                  className="w-8 h-8" 
                  style={{ color: memory.color }} 
                />
              </div>
              <p 
                className="font-arabic text-lg font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {memory.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <p 
            className="font-arabic text-xl sm:text-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            &ldquo;من أول أكلات فري فاير في ريبابلك، لخناقات البلكونة، لخناقة المرتبة، لسفرنا، ولكل مصايب السكنات اللي ربنا ما يعيدها.&rdquo;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
