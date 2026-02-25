import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Marek W.",
    text: "Najlepszy warsztat w Rybniku. Profesjonalne podejście, szybka realizacja i uczciwe ceny. Polecam każdemu!",
    rating: 5,
    car: "BMW 3 F30",
  },
  {
    name: "Anna K.",
    text: "Bardzo miła obsługa, wszystko dokładnie wytłumaczyli. Auto oddane w terminie, naprawione idealnie.",
    rating: 5,
    car: "Volkswagen Golf 7",
  },
  {
    name: "Tomasz P.",
    text: "Diagnostyka na najwyższym poziomie. Znaleźli problem, z którym inni sobie nie poradzili. Rewelacja!",
    rating: 5,
    car: "Audi A4 B9",
  },
  {
    name: "Katarzyna L.",
    text: "Od lat korzystam z usług CARZONA. Zawsze mogę liczyć na profesjonalizm i terminowość.",
    rating: 5,
    car: "Toyota Corolla",
  },
];

const Reviews = () => {
  return (
    <section id="opinie" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Opinie
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Co mówią nasi klienci
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Zaufanie klientów to nasza największa nagroda.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl bg-card border border-border group hover:border-primary/20 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                "{review.text}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground text-sm">{review.name}</div>
                <div className="text-xs text-muted-foreground">{review.car}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
