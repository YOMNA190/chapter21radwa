import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";

const polaroids = [
  { src: "/images/radwa-03.jpg", caption: "Lighting up the candles", rotate: -5 },
  { src: "/images/radwa-08.jpg", caption: "That shy smile", rotate: 3 },
  { src: "/images/radwa-01.jpg", caption: "Birthday queen", rotate: -2 },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div 
              className="text-sm font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--blush-deep)" }}
            >
              About Radwa
            </div>
            
            <h2 
              className="font-heading text-4xl sm:text-5xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Happy 21, Radwa
              <Heart className="inline w-6 h-6 ml-2 fill-current" style={{ color: "var(--blush-deep)" }} />
            </h2>
            
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              You&apos;re not just my best friend, you&apos;re my person. From coffee dates to deep talks, 
              from laughs to tears — thank you for being you, always. I love you endlessly!
            </p>
            
            <p 
              className="font-heading italic text-lg"
              style={{ color: "var(--blush-deep)" }}
            >
              — Your bestie, Yumna
            </p>
          </motion.div>

          {/* Right Polaroids */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px]"
          >
            {polaroids.map((polaroid, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotate: polaroid.rotate 
                } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                className="polaroid absolute cursor-pointer"
                style={{
                  width: index === 1 ? "220px" : "200px",
                  top: index === 0 ? "20px" : index === 1 ? "120px" : "240px",
                  left: index === 0 ? "20px" : index === 1 ? "100px" : "60px",
                  zIndex: index === 1 ? 2 : 1,
                }}
              >
                <img
                  src={polaroid.src}
                  alt={polaroid.caption}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p 
                  className="text-center text-sm mt-2 pb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {polaroid.caption}
                </p>
              </motion.div>
            ))}

            {/* Decorative tape */}
            <div 
              className="absolute top-10 left-16 w-16 h-6 -rotate-12 opacity-60"
              style={{ backgroundColor: "var(--blush-pink)" }}
            />
            <div 
              className="absolute top-32 right-20 w-14 h-5 rotate-6 opacity-60"
              style={{ backgroundColor: "var(--blush-light)" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
