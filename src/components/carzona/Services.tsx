import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import MetalParticles from "./MetalParticles";
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
  <section id="uslugi" className="py-16 sm:py-20 md:py-32 relative">
    <MetalParticles />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
        <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
          Usługi
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
          Pełen zakres usług serwisowych
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
          Od prostych przeglądów po zaawansowane naprawy — zajmiemy się Twoim autem kompleksowo.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {services.map((service, i) => {
          // Gaming monitor inward curve for 4 columns
          const col4 = i % 4;
          const baseRotateY = col4 === 0 ? 5 : col4 === 1 ? 2 : col4 === 2 ? -2 : -5;
          return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: -1, rotateY: baseRotateY }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl cursor-default group"
              whileHover={{ rotateX: -3, rotateY: baseRotateY * 1.3, scale: 1.04, z: 25 }}
              style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
          >
            {service.popular && (
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-accent/15 text-accent text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                Popularne
              </div>
            )}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary/20 transition-colors duration-300">
              <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1.5 sm:mb-2">{service.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">{service.desc}</p>
            <a
              href="#kontakt"
              className="inline-flex text-xs sm:text-sm text-primary font-medium hover:text-accent transition-colors duration-300 min-h-[44px] items-center"
            >
              Sprawdź szczegóły →
            </a>
          </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
