import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ParallaxSection from "./ParallaxSection";
import { CheckCircle2, Timer, Banknote, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: CheckCircle2, title: "Jakość bez kompromisów", desc: "Certyfikowane części i materiały eksploatacyjne Castrol. Każda naprawa z gwarancją." },
  { icon: Timer, title: "Szybka realizacja", desc: "Szanujemy Twój czas. Większość napraw wykonujemy w ciągu 24h." },
  { icon: Banknote, title: "Uczciwe ceny", desc: "Transparentna wycena bez ukrytych kosztów. Zawsze wiesz, za co płacisz." },
  { icon: HeartHandshake, title: "Indywidualne podejście", desc: "Każdy klient i każde auto traktujemy indywidualnie z pełnym zaangażowaniem." },
];

const WhyUs = () => (
  <ParallaxSection imageUrl="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80&fit=crop" overlayOpacity={0.88}>
    <section id="dlaczego" className="py-16 sm:py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
            Dlaczego my
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            Zaufaj profesjonalistom
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            CARZONA to nie zwykły warsztat — to miejsce, gdzie pasja do motoryzacji łączy się z najwyższą jakością obsługi.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {reasons.map((reason, i) => {
            const col4 = i % 4;
            const baseRotateY = col4 === 0 ? 5 : col4 === 1 ? 2 : col4 === 2 ? -2 : -5;
            return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: -1, rotateY: baseRotateY }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl cursor-default group backdrop-blur-sm"
              whileHover={{ rotateX: -3, rotateY: baseRotateY * 1.3, scale: 1.04, z: 25 }}
              style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary/20 transition-all duration-300">
                <reason.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base sm:text-lg mb-1.5 sm:mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  </ParallaxSection>
);

export default WhyUs;
