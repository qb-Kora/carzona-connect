import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { MapPin } from "lucide-react";

const cities = [
  "Rybnik", "Żory", "Jastrzębie-Zdrój", "Wodzisław Śląski", "Racibórz",
  "Rydułtowy", "Pszów", "Radlin", "Czerwionka-Leszczyny", "Knurów",
  "Gliwice", "Zabrze", "Tychy", "Mikołów", "Ornontowice",
];

const ServiceArea = () => (
  <section className="py-24 md:py-32 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <AnimatedSection>
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Obszar działania
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Warsztat samochodowy dla mieszkańców Rybnika i okolic
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Obsługujemy klientów z Rybnika i okolicznych miast. Dojedziesz do nas łatwo — jesteśmy świetnie skomunikowani.
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city, i) => (
              <motion.span
                key={city}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300 cursor-default"
              >
                <MapPin className="w-3 h-3 text-primary" />
                {city}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-border h-80 lg:h-96"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.5!2d18.53!3d50.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA1JzI0LjAiTiAxOMKwMzEnNDguMCJF!5e0!3m2!1spl!2spl!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CARZONA lokalizacja Rybnik"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ServiceArea;
