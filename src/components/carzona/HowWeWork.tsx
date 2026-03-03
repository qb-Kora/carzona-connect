import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Search, FileText, Wrench, CarFront } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnostyka",
    desc: "Precyzyjna diagnostyka komputerowa i oględziny pojazdu w celu identyfikacji problemu.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Wycena",
    desc: "Transparentna wycena naprawy z pełnym opisem zakresu prac i kosztów części.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Naprawa",
    desc: "Profesjonalna naprawa z użyciem certyfikowanych części i materiałów Castrol.",
  },
  {
    icon: CarFront,
    step: "04",
    title: "Odbiór auta",
    desc: "Kontrola jakości, wydanie pojazdu z gwarancją i omówienie wykonanych prac.",
  },
];

const HowWeWork = () => (
  <section className="py-20 md:py-28 relative">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14 md:mb-16">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
          Proces
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Jak pracujemy
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
          Od przyjęcia auta do wydania — każdy krok pod kontrolą.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative">
        {/* Connection line — desktop only */}
        <div className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex flex-col items-center text-center p-6 md:p-7 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all duration-500 group"
          >
            {/* Step number badge */}
            <div className="absolute -top-3 left-6 bg-accent text-accent-foreground text-[11px] font-bold px-3 py-1 rounded-full tracking-wider">
              {step.step}
            </div>

            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
              <step.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>

            <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWork;
