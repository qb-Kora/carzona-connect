import { useState, memo, useCallback } from "react";
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

const stars = Array.from({ length: 5 });

const ReviewCard = memo(({ review, className = "" }: { review: typeof reviews[0]; className?: string }) => (
  <div
    className={`card-hover p-6 sm:p-7 2xl:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-sm relative overflow-hidden h-full flex flex-col ${className}`}
    itemScope
    itemType="https://schema.org/Review"
  >
    {/* Decorative quote */}
    <div
      className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 100%)",
      }}
    >
      <Quote className="w-5 h-5 text-primary/20" />
    </div>

    <div className="flex gap-0.5 mb-3 sm:mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
      <meta itemProp="ratingValue" content={String(review.rating)} />
      {stars.map((_, j) => (
        <Star
          key={j}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent"
          style={{ filter: "drop-shadow(0 0 3px hsl(var(--accent) / 0.4))" }}
        />
      ))}
    </div>
    <p className="text-foreground/70 leading-relaxed mb-5 sm:mb-6 text-sm 2xl:text-base italic flex-1" itemProp="reviewBody">
      „{review.text}"
    </p>
    <div className="border-t border-border/50 pt-3 sm:pt-4 flex items-center gap-3 mt-auto">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-primary font-bold text-sm"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 100%)",
          boxShadow: "inset 0 1px 0 0 hsl(var(--primary) / 0.1)",
        }}
      >
        {review.name.charAt(0)}
      </div>
      <div>
        <div className="font-semibold text-foreground text-sm" itemProp="author">{review.name}</div>
        <div className="text-xs text-muted-foreground">{review.car}</div>
      </div>
    </div>
  </div>
));

ReviewCard.displayName = "ReviewCard";

const Reviews = memo(() => {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const maxPage = Math.ceil(reviews.length / perPage) - 1;

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(maxPage, c + 1)), [maxPage]);

  return (
    <ParallaxSection imageUrl="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80&fit=crop&auto=format" overlayOpacity={0.9}>
      <section id="opinie" className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="neon-label text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
              Opinie
            </span>
            <h2 className="neon-heading text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
              Co mówią nasi klienci
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
              Zaufanie klientów to nasza największa nagroda. Sprawdź opinie.
            </p>
          </AnimatedSection>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 2xl:gap-7 items-stretch">
            <AnimatePresence mode="popLayout">
              {reviews.slice(current * perPage, current * perPage + perPage).map((review) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
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
              >
                <ReviewCard review={reviews[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav — enhanced */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground neon-hover-text neon-hover-border transition-all disabled:opacity-30 min-h-[44px] min-w-[44px] touch-manipulation"
              aria-label="Poprzednie opinie"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    i === current
                      ? "w-7"
                      : "w-2"
                  }`}
                  aria-label={`Strona ${i + 1}`}
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-7 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                    style={i === current ? { boxShadow: "0 0 8px hsl(var(--primary) / 0.4)" } : {}}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              disabled={current === maxPage}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground neon-hover-text neon-hover-border transition-all disabled:opacity-30 min-h-[44px] min-w-[44px] touch-manipulation"
              aria-label="Następne opinie"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;
