import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, X } from "lucide-react";

const allPhotos = [
  "/images/radwa-01.jpg",
  "/images/radwa-02.jpg",
  "/images/radwa-03.jpg",
  "/images/radwa-05.jpg",
  "/images/radwa-06.jpg",
  "/images/radwa-07.jpg",
  "/images/radwa-08.jpg",
  "/images/radwa-09.png",
  "/images/radwa-10.jpg",
  "/images/radwa-11.jpg",
  "/images/radwa-12.jpg",
  "/images/radwa-13.jpg",
  "/images/radwa-14.jpg",
  "/images/radwa-15.jpg",
];

export default function GallerySection() {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div 
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: "var(--cream-warm)" }}
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
            className="font-heading text-4xl sm:text-5xl font-bold inline-flex items-center gap-3"
            style={{ color: "var(--text-primary)" }}
          >
            Little Moments We Cherish
            <Heart className="w-7 h-7 fill-current" style={{ color: "var(--blush-deep)" }} />
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
          </button>

          {/* Photos Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide px-14 py-4"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {allPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setSelectedImage(photo)}
                className="flex-shrink-0 cursor-pointer group"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.03]">
                  <img
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className="w-72 h-80 object-cover"
                    loading="lazy"
                  />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, rgba(233, 165, 179, 0.4) 0%, transparent 50%)"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Full Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => setSelectedImage(allPhotos[0])}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            View Full Gallery
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(92, 61, 74, 0.9)" }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass-card flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
}
