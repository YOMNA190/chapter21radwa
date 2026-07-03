import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Quote } from "lucide-react";

const messages = [
  {
    text: "Happy 21st to the most beautiful soul! Keep shining. Keep being the amazing person you are. Here's to many more years of friendship!",
    author: "Yumna",
  },
  {
    text: "May all your wishes come true this year. You deserve all the happiness in the world, Radwa!",
    author: "Sara",
  },
  {
    text: "Here's to more adventures & coffee dates! Can't wait to make more memories together.",
    author: "Menna",
  },
  {
    text: "The world is better with you in it. Love you! Never change who you are.",
    author: "Hadeer",
  },
];

export default function MessagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          
          {/* Left: Messages Grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 
                className="font-heading text-4xl sm:text-5xl font-bold inline-flex items-center gap-3"
                style={{ color: "var(--text-primary)" }}
              >
                Birthday Messages
                <Heart className="w-7 h-7 fill-current" style={{ color: "var(--blush-deep)" }} />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="glass-card p-5 sm:p-6 relative"
                >
                  <Quote 
                    className="absolute top-4 right-4 w-8 h-8 opacity-20" 
                    style={{ color: "var(--blush-deep)" }} 
                  />
                  <p 
                    className="text-base leading-relaxed mb-4 italic"
                    style={{ color: "var(--text-primary)" }}
                  >
                    &ldquo;{message.text}&rdquo;
                  </p>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: "var(--blush-deep)" }}
                  >
                    — {message.author}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Decoration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.img
              src="/images/heart-balloons.png"
              alt="Heart balloons"
              className="w-48 h-auto mb-6 floating"
            />
            <p 
              className="font-heading text-xl text-center mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Make a wish,
              <br />
              <span style={{ color: "var(--blush-deep)" }}>Radwa!</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Send Your Wish
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
