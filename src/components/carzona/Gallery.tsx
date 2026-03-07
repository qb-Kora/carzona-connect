import { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ParallaxSection from "./ParallaxSection";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop&auto=format&fm=webp", alt: "Stanowisko diagnostyczne CARZONA" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop&auto=format&fm=webp", alt: "Naprawa silnika w warsztacie" },
  { src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop&auto=format&fm=webp", alt: "Profesjonalne narzędzia warsztatowe" },
  { src: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop&auto=format&fm=webp", alt: "Serwis układu hamulcowego" },
  { src: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop&auto=format&fm=webp", alt: "Diagnostyka komputerowa pojazdu" },
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&auto=format&fm=webp", alt: "Pojazd po serwisie CARZONA" },
];

const Gallery = memo(() => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <ParallaxSection imageUrl="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&q=80&fit=crop&auto=format" overlayOpacity={0.85}>
      <section id="galeria" className="py-16 sm:py-20 md:py-32 relative">
        <div className="max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="premium-label neon-label text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
              Galeria
            </span>
            <h2 className="neon-heading text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
              Nasz warsztat w akcji
            </h2>
            <div className="w-16 h-[1px] mx-auto mb-3 sm:mb-4" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.5), transparent)" }} />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
              Zobacz jak wygląda nasza codzienna praca i standardy, które utrzymujemy.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 2xl:gap-5">
            {images.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLightbox(i)}
                className="group relative aspect-[3/2] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer touch-manipulation min-h-[44px] border border-border/30"
                whileTap={{ scale: 0.98 }}
                aria-label={`Powiększ: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-foreground"
                    style={{
                      background: "hsl(var(--card) / 0.7)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid hsl(var(--border) / 0.5)",
                    }}
                  >
                    <ZoomIn className="w-3 h-3" />
                    Powiększ
                  </div>
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
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Podgląd zdjęcia"
            >
              <button
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-foreground neon-hover-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                onClick={closeLightbox}
                aria-label="Zamknij podgląd"
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
              <motion.img
                key={lightbox}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={images[lightbox].src.replace("w=600&h=400", "w=1200&h=800").replace("&fm=webp", "")}
                alt={images[lightbox].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] rounded-xl sm:rounded-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </ParallaxSection>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;