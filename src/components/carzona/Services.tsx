import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import {
  Wrench, Cpu, Gauge, Droplets, Disc, CarFront, Thermometer, Shield
} from "lucide-react";

const services = [
  { icon: Wrench, title: "Mechanika ogólna", desc: "Pełen zakres napraw mechanicznych silników, skrzyń biegów i układów jezdnych.", popular: true },
  { icon: Cpu, title: "Diagnostyka komputerowa", desc: "Zaawansowana diagnostyka elektroniki samochodowej profesjonalnym sprzętem.", popular: true },
  { icon: Thermometer, title: "Serwis klimatyzacji", desc: "Napełnianie, dezynfekcja i naprawa układów klimatyzacji samochodowej.", popular: false },
  { icon: Droplets, title: "Wymiana oleju i filtrów", desc: "Szybka wymiana olejów Castrol, filtrów i płynów eksploatacyjnych.", popular: false },
  { icon: Disc, title: "Hamulce i zawieszenie", desc: "Wymiana klocków, tarcz, amortyzatorów. Precyzyjna geometria kół.", popular: true },
  { icon: Shield, title: "Przygotowanie do przeglądu", desc: "Kompleksowe przygotowanie pojazdu do przeglądu rejestracyjnego.", popular: false },
  { icon: Gauge, title: "Przeglądy okresowe", desc: "Przeglądy techniczne i serwisowe zgodne z wymaganiami producenta.", popular: false },
  { icon: CarFront, title: "Rozrząd i sprzęgło", desc: "Wymiana pasków, łańcuchów rozrządu, sprzęgieł i kół dwumasowych.", popular: false },
];

const Services = () => (
  <section id="uslugi" className="py-24 md:py-32 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-16">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
          Usługi
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Pełen zakres usług serwisowych
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Od prostych przeglądów po zaawansowane naprawy — zajmiemy się Twoim autem kompleksowo.
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="card-hover p-6 rounded-3xl cursor-default group"
          >
            {service.popular && (
              <div className="absolute top-4 right-4 bg-accent/15 text-accent text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Popularne
              </div>
            )}
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
            <a
              href="#kontakt"
              className="inline-flex text-sm text-primary font-medium hover:text-accent transition-colors duration-300"
            >
              Sprawdź szczegóły →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
