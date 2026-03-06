import { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, CalendarCheck, ChevronDown, Cpu, Clock, ShieldCheck } from "lucide-react";

const usps = [
  { icon: Cpu, title: "Diagnostyka komputerowa", desc: "Nowoczesny sprzęt diagnostyczny" },
  { icon: Clock, title: "Naprawy w 24h", desc: "Ekspresowa realizacja zleceń" },
  { icon: ShieldCheck, title: "Gwarancja na usługi", desc: "Pewność i spokój po naprawie" },
];

const Hero = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230f1117'/%3E%3C/svg%3E"
          className="w-full h-[130%] object-cover will-change-transform"
          style={{ contentVisibility: "auto" }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent/[0.15] via-accent/[0.05] to-transparent blur-sm pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 md:py-40"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 glass px-4 py-2 sm:py-2.5 rounded-full mb-5 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Autoryzowany partner <span className="text-accent font-semibold">Q Service Castrol</span>
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[1.6rem] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter sm:leading-[0.95] md:leading-[0.9] mb-4 sm:mb-8"
          >
            Profesjonalny warsztat
            <br />
            samochodowy{" "}
            <span className="text-accent">w</span>{" "}<span className="text-primary">Rybniku</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-12 leading-relaxed"
          >
            Szybka diagnostyka • Uczciwe ceny • Ponad 1000 napraw rocznie
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16"
          >
            <a
              href="#kontakt"
              className="flex items-center justify-center gap-2.5 bg-accent text-accent-foreground px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold btn-shine transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_8px_40px_-8px_hsl(var(--accent)/0.5)] min-h-[48px] touch-manipulation"
            >
              <CalendarCheck className="w-5 h-5" />
              Umów wizytę online
            </a>
            <a
              href="tel:663881585"
              className="flex items-center justify-center gap-2.5 text-foreground px-6 py-3.5 sm:py-4 rounded-2xl border border-border hover:border-primary/40 active:bg-card/80 transition-all duration-300 hover:bg-card/60 font-semibold text-sm sm:text-base min-h-[48px] touch-manipulation"
            >
              <Phone className="w-5 h-5 text-primary" />
              Zadzwoń teraz
            </a>
          </motion.div>

          {/* USP Tiles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-3xl mx-auto perspective-grid"
          >
            {usps.map((usp, i) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                className="glass rounded-2xl p-3.5 sm:p-5 flex flex-row sm:flex-col items-center gap-3 hover:border-accent/30 transition-all duration-300"
                whileHover={{ y: -6, scale: 1.05, rotateX: -4, rotateY: (i - 1) * 5 }}
                style={{ transformPerspective: 600, transformStyle: "preserve-3d" }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                  <usp.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div className="text-left sm:text-center min-w-0">
                  <div className="font-semibold text-foreground text-sm leading-snug">{usp.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{usp.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#zaufanie"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground text-xs hidden sm:flex min-h-[44px] min-w-[44px] justify-center"
        aria-label="Przewiń do następnej sekcji"
      >
        <span>Przewiń</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;