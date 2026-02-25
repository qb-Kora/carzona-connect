import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import {
  Wrench, Cpu, Gauge, Droplets, Disc, Zap, CarFront, Settings, Thermometer, Shield
} from "lucide-react";

const services = [
  { icon: Wrench, title: "Mechanika pojazdowa", desc: "Pełen zakres napraw mechanicznych silników, skrzyń biegów i układów jezdnych." },
  { icon: Cpu, title: "Diagnostyka komputerowa", desc: "Zaawansowana diagnostyka elektroniki samochodowej z użyciem profesjonalnego sprzętu." },
  { icon: Gauge, title: "Przeglądy okresowe", desc: "Przeglądy techniczne i serwisowe zgodne z wymaganiami producenta." },
  { icon: Droplets, title: "Wymiana oleju i filtrów", desc: "Szybka wymiana olejów silnikowych, filtrów i płynów eksploatacyjnych." },
  { icon: Disc, title: "Układ hamulcowy", desc: "Wymiana klocków, tarcz, naprawa i regeneracja układów hamulcowych." },
  { icon: Zap, title: "Instalacje elektryczne", desc: "Naprawa wiązek, czujników, oświetlenia i pełnej instalacji elektrycznej." },
  { icon: CarFront, title: "Zawieszenie i geometria", desc: "Wymiana amortyzatorów, sprężyn, wahaczy. Precyzyjna geometria kół." },
  { icon: Settings, title: "Rozrząd i sprzęgło", desc: "Wymiana pasków i łańcuchów rozrządu, sprzęgieł i kół dwumasowych." },
  { icon: Thermometer, title: "Klimatyzacja", desc: "Serwis, napełnianie i dezynfekcja układów klimatyzacji samochodowej." },
  { icon: Shield, title: "Przygotowanie do przeglądu", desc: "Kompleksowe przygotowanie pojazdu do przeglądu rejestracyjnego." },
];

const Services = () => {
  return (
    <section id="uslugi" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Usługi
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Pełen zakres usług
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Od prostych przeglądów po zaawansowane naprawy — zajmiemy się Twoim autem kompleksowo.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{service.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>

              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
