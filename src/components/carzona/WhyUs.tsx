import { memo } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ParallaxSection from "./ParallaxSection";
import { CheckCircle2, Timer, Banknote, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: CheckCircle2, title: "Jakość bez kompromisów", desc: "Certyfikowane części i materiały eksploatacyjne Castrol. Każda naprawa z gwarancją.", num: "01" },
  { icon: Timer, title: "Szybka realizacja", desc: "Szanujemy Twój czas. Większość napraw wykonujemy w ciągu 24h.", num: "02" },
  { icon: Banknote, title: "Uczciwe ceny", desc: "Transparentna wycena bez ukrytych kosztów. Zawsze wiesz, za co płacisz.", num: "03" },
  { icon: HeartHandshake, title: "Indywidualne podejście", desc: "Każdy klient i każde auto traktujemy indywidualnie z pełnym zaangażowaniem.", num: "04" },
];

const WhyUs = memo(() => (
  <ParallaxSection imageUrl="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80&fit=crop" overlayOpacity={0.88}>
    <section id="dlaczego" className="py-16 sm:py-20 md:py-32 relative">
      <div className="max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="neon-label text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
            Dlaczego my
          </span>
          <h2 className="neon-heading text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
            Zaufaj profesjonalistom
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            CARZONA to nie zwykły warsztat — to miejsce, gdzie pasja do motoryzacji łączy się z najwyższą jakością obsługi.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 2xl:gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl cursor-default group backdrop-blur-sm relative overflow-hidden"
            >
              {/* Number watermark */}
              <span
                className="absolute -top-2 -right-1 text-[4rem] sm:text-[5rem] font-black leading-none select-none pointer-events-none"
                style={{ color: "hsl(var(--primary) / 0.04)" }}
              >
                {reason.num}
              </span>
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 neon-hover-icon transition-all duration-300 relative z-10"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.05) 100%)",
                  boxShadow: "inset 0 1px 0 0 hsl(var(--primary) / 0.1)",
                }}
              >
                <reason.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base sm:text-lg mb-1.5 sm:mb-2 relative z-10">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </ParallaxSection>
));

WhyUs.displayName = "WhyUs";

export default WhyUs;
