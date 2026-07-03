import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="py-8 px-4"
      style={{ backgroundColor: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm flex items-center justify-center gap-2"
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          Made with{" "}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 fill-current inline" style={{ color: "var(--blush-deep)" }} />
          </motion.span>{" "}
          by Yumna for Radwa
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs mt-2"
          style={{ color: "rgba(255, 255, 255, 0.4)" }}
        >
          Chapter 21 — A birthday celebration
        </motion.p>
      </div>
    </footer>
  );
}
