import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ParallaxSection from "./ParallaxSection";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop", alt: "Stanowisko diagnostyczne CARZONA" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop", alt: "Naprawa silnika w warsztacie" },
  { src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop", alt: "Profesjonalne narzędzia warsztatowe" },
  { src: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop", alt: "Serwis układu hamulcowego" },
  { src: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop", alt: "Diagnostyka komputerowa pojazdu" },
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop", alt: "Pojazd po serwisie CARZONA" },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <ParallaxSection imageUrl="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&q=80&fit=crop" overlayOpacity={0.85}>
      <section id="galeria" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Realizacje
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Nasz warsztat w akcji
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
              Zobacz jak wygląda nasza codzienna praca i standardy, które utrzymujemy.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setLightbox(i)}
                className="group relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-foreground" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors touch-target"
                onClick={() => setLightbox(null)}
                aria-label="Zamknij"
              >
                <X className="w-8 h-8" />
              </button>
              <motion.img
                key={lightbox}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={images[lightbox].src.replace("w=600&h=400", "w=1200&h=800")}
                alt={images[lightbox].alt}
                className="max-w-full max-h-[85vh] rounded-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </ParallaxSection>
  );
};

export default Gallery;
