import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ParallaxSection from "./ParallaxSection";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "Marek W.", text: "Najlepszy warsztat w Rybniku. Profesjonalne podejście, szybka realizacja i uczciwe ceny. Polecam każdemu!", rating: 5, car: "BMW 3 F30" },
  { name: "Anna K.", text: "Bardzo miła obsługa, wszystko dokładnie wytłumaczyli. Auto oddane w terminie, naprawione idealnie.", rating: 5, car: "Volkswagen Golf 7" },
  { name: "Tomasz P.", text: "Diagnostyka na najwyższym poziomie. Znaleźli problem, z którym inni sobie nie poradzili. Rewelacja!", rating: 5, car: "Audi A4 B9" },
  { name: "Katarzyna L.", text: "Od lat korzystam z usług CARZONA. Zawsze mogę liczyć na profesjonalizm i terminowość.", rating: 5, car: "Toyota Corolla" },
  { name: "Piotr M.", text: "Wymiana rozrządu zrobiona ekspresowo. Cena uczciwa, a obsługa rewelacyjna. Wrócę na pewno!", rating: 5, car: "Ford Focus MK3" },
  { name: "Ewa S.", text: "Klimatyzacja naprawiona tego samego dnia. Miło zaskoczona szybkością i ceną. Super warsztat!", rating: 5, car: "Opel Astra J" },
];

const Reviews = () => {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const maxPage = Math.ceil(reviews.length / perPage) - 1;

  return (
    <ParallaxSection imageUrl="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80&fit=crop" overlayOpacity={0.9}>
      <section id="opinie" className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
              Opinie
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              Co mówią nasi klienci
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
              Zaufanie klientów to nasza największa nagroda. Sprawdź opinie.
            </p>
          </AnimatedSection>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 perspective-grid">
            <AnimatePresence mode="popLayout">
              {reviews.slice(current * perPage, current * perPage + perPage).map((review, idx) => {
                const baseRotateY = idx === 0 ? 6 : idx === 2 ? -6 : 0;
                return (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20, rotateX: 8 }}
                  animate={{ opacity: 1, y: 0, rotateX: -1, rotateY: baseRotateY }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="card-hover p-6 sm:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-sm"
                  whileHover={{ rotateX: -3, rotateY: baseRotateY * 1.4, scale: 1.04, z: 35 }}
                  style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-primary/15 mb-3 sm:mb-4" />
                  <div className="flex gap-0.5 mb-3 sm:mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={String(review.rating)} />
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-sm" itemProp="reviewBody">
                    "{review.text}"
                  </p>
                  <div className="border-t border-border pt-3 sm:pt-4 flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm" itemProp="author">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.car}</div>
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile slider */}
          <div className="md:hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="card-hover p-4 sm:p-5 rounded-2xl backdrop-blur-sm"
              >
                <Quote className="w-6 h-6 text-primary/15 mb-2" />
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: reviews[current].rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                  "{reviews[current].text}"
                </p>
                <div className="border-t border-border pt-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {reviews[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{reviews[current].name}</div>
                    <div className="text-xs text-muted-foreground">{reviews[current].car}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              disabled={current === 0}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-30 min-h-[44px] min-w-[44px]"
              aria-label="Poprzednie opinie"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-7" : "bg-border hover:bg-muted-foreground w-2"
                  }`}
                  aria-label={`Strona ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent(c => Math.min(maxPage, c + 1))}
              disabled={current === maxPage}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-30 min-h-[44px] min-w-[44px]"
              aria-label="Następne opinie"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};

export default Reviews;
