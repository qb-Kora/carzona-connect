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
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative min-h-[85svh] lg:min-h-[90svh] flex items-center justify-center overflow-hidden">
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230f1117'/%3E%3C/svg%3E"
          className="w-full h-[120%] object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Enhanced overlays with richer gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,hsl(var(--primary)/0.06),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent/[0.12] via-accent/[0.04] to-transparent blur-sm pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-16 sm:py-24 md:py-28"
      >
        <div className="text-center max-w-5xl 2xl:max-w-6xl mx-auto">
          {/* Badge — enhanced with shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:py-3 rounded-full mb-5 sm:mb-8 border border-accent/20 bg-accent/[0.06] backdrop-blur-xl"
            style={{
              boxShadow: "0 0 20px -5px hsl(var(--accent) / 0.15), inset 0 1px 0 0 hsl(var(--accent) / 0.1)",
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-xs sm:text-sm text-foreground/80">
              Autoryzowany partner <span className="text-accent font-bold">Q Service Castrol</span>
            </span>
          </motion.div>

          {/* H1 — Neon Workshop 2026 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[1.6rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl 2xl:text-7xl font-black tracking-tighter leading-[1.05] sm:leading-[0.95] md:leading-[0.9] mb-4 sm:mb-8"
          >
            <span className="block neon-heading">Profesjonalny warsztat</span>
            <span className="block neon-heading">
              <span className="neon-heading">samochodowy</span>{" "}
              <span className="text-gradient-accent">w</span>{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(217 91% 70%) 100%)",
                  filter: "drop-shadow(0 0 10px hsl(217 91% 60% / 0.4))",
                }}
              >
                Rybniku
              </span>
            </span>
          </motion.h1>

          {/* Subtitle — refined with separator dots */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-12 leading-relaxed"
          >
            <span className="inline-flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span>Szybka diagnostyka</span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span>Uczciwe ceny</span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span>Ponad 1000 napraw rocznie</span>
            </span>
          </motion.p>

          {/* CTAs — enhanced with gradient and glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16"
          >
            <a
              href="#kontakt"
              className="group flex items-center justify-center gap-2.5 px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold btn-shine transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] min-h-[48px] touch-manipulation text-accent-foreground relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(84 70% 50%) 100%)",
                boxShadow: "0 4px 20px -4px hsl(var(--accent) / 0.4), 0 0 0 1px hsl(var(--accent) / 0.2) inset",
              }}
            >
              <CalendarCheck className="w-5 h-5" />
              Umów wizytę online
            </a>
            <a
              href="tel:663881585"
              className="flex items-center justify-center gap-2.5 text-foreground px-6 py-3.5 sm:py-4 rounded-2xl border border-border neon-hover-border active:bg-card/80 transition-all duration-300 hover:bg-card/60 font-semibold text-sm sm:text-base min-h-[48px] touch-manipulation backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 text-primary" />
              Zadzwoń teraz
            </a>
          </motion.div>

          {/* USP Tiles — enhanced with gradient borders and depth */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-3xl mx-auto"
          >
            {usps.map((usp, i) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                className="rounded-2xl p-3.5 sm:p-5 flex flex-row sm:flex-col items-center gap-3 transition-all duration-300 backdrop-blur-xl border border-accent/15 bg-accent/[0.04]"
                style={{
                  boxShadow: "inset 0 1px 0 0 hsl(var(--accent) / 0.08), 0 4px 16px -4px hsl(var(--background) / 0.5)",
                }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.08) 100%)",
                    boxShadow: "inset 0 1px 0 0 hsl(var(--accent) / 0.12)",
                  }}
                >
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
        <span className="tracking-widest uppercase text-[10px]">Przewiń</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
