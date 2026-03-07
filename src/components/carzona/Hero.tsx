import { useRef, useEffect, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, CalendarCheck, ChevronDown, Cpu, Clock, ShieldCheck } from "lucide-react";
import { isMidOrLow } from "@/hooks/use-device-capability";

const usps = [
  { icon: Cpu, title: "Diagnostyka komputerowa", desc: "Nowoczesny sprzęt diagnostyczny" },
  { icon: Clock, title: "Naprawy w 24h", desc: "Ekspresowa realizacja zleceń" },
  { icon: ShieldCheck, title: "Gwarancja na usługi", desc: "Pewność i spokój po naprawie" },
];

const skipParallax = isMidOrLow();

/** Direct video render — no lazy loading for above-the-fold hero */
const HeroVideo = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => { video.play().catch(() => {}); };
    tryPlay();
    const t = setTimeout(tryPlay, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-[120%]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230a0c14' width='1920' height='1080'/%3E%3C/svg%3E"
        className="w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <track kind="captions" />
      </video>
    </div>
  );
});
HeroVideo.displayName = "HeroVideo";

const Hero = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", skipParallax ? "0%" : "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", skipParallax ? "0%" : "15%"]);

  return (
    <section ref={ref} className="relative h-svh flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <motion.div className="absolute inset-0" style={skipParallax ? undefined : { y: videoY }}>
        <HeroVideo />
      </motion.div>

      {/* Premium multi-layer overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/75 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_35%,hsl(var(--primary)/0.08),transparent)]" />
       {/* Warm green cinematic strip at bottom */}
       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-accent/[0.04] via-accent/[0.06] to-transparent blur-sm pointer-events-none" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,hsl(var(--background)/0.6))]" />

      {/* Content */}
      <motion.div
        style={skipParallax ? undefined : { y: contentY }}
        className="relative z-10 w-full max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12 sm:py-16"
      >
        <div className="text-center max-w-5xl 2xl:max-w-6xl mx-auto">
          {/* Premium Badge */}
           <motion.div
             initial={{ opacity: 0, y: 20, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="inline-flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:py-3 rounded-full mb-5 sm:mb-8"
             style={{
               background: "linear-gradient(135deg, hsl(var(--accent) / 0.08) 0%, hsl(var(--accent) / 0.06) 100%)",
               border: "1px solid hsl(var(--accent) / 0.25)",
               boxShadow: "0 0 20px -5px hsl(var(--accent) / 0.12), inset 0 1px 0 0 hsl(var(--accent) / 0.12)",
             }}
           >
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(var(--accent))" }} />
               <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(var(--accent))" }} />
             </span>
             <span className="text-xs sm:text-sm" style={{ color: "hsl(var(--accent))" }}>
               Autoryzowany partner <span className="font-bold text-accent">Q Service Castrol</span>
             </span>
           </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tighter leading-[0.95] mb-4 sm:mb-6"
            style={{ fontSize: "clamp(1.6rem, 5vw, 4.5rem)" }}
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

          {/* Decorative line under heading */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-[1px] mx-auto mb-5 sm:mb-7"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.5), hsl(var(--primary) / 0.4), transparent)",
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-12 leading-relaxed"
          >
            <span className="inline-flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span>Szybka diagnostyka</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--gold))" }} />
              <span>Uczciwe ceny</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--gold))" }} />
              <span>Ponad 1000 napraw rocznie</span>
            </span>
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
              className="group flex items-center justify-center gap-2.5 px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold btn-shine transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] min-h-[48px] touch-manipulation text-accent-foreground relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(84 70% 50%) 100%)",
                boxShadow: "0 4px 24px -4px hsl(var(--accent) / 0.45), 0 0 0 1px hsl(var(--accent) / 0.2) inset, 0 1px 0 0 hsl(84 70% 60% / 0.3) inset",
              }}
            >
              <CalendarCheck className="w-5 h-5" />
              Umów wizytę online
            </a>
            <a
              href="tel:663881585"
              className="flex items-center justify-center gap-2.5 text-foreground px-6 py-3.5 sm:py-4 rounded-2xl border border-border/80 neon-hover-border active:bg-card/80 transition-all duration-300 hover:bg-card/60 font-semibold text-sm sm:text-base min-h-[48px] touch-manipulation"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card) / 0.4) 0%, transparent 100%)",
              }}
            >
              <Phone className="w-5 h-5 text-primary" />
              Zadzwoń teraz
            </a>
          </motion.div>

          {/* USP Tiles — premium styling */}
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
                className="rounded-2xl p-3.5 sm:p-5 flex flex-row sm:flex-col items-center gap-3 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, hsl(var(--card) / 0.7) 0%, hsl(var(--card) / 0.3) 100%)",
                  border: "1px solid hsl(var(--border) / 0.6)",
                  boxShadow: "inset 0 1px 0 0 hsl(var(--foreground) / 0.04), 0 4px 20px -6px hsl(var(--background) / 0.6)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[1px]"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
                />
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 100%)",
                    boxShadow: "inset 0 1px 0 0 hsl(var(--primary) / 0.12), 0 0 12px -4px hsl(var(--primary) / 0.1)",
                  }}
                >
                  <usp.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
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
        <span className="tracking-widest uppercase text-[10px]" style={{ color: "hsl(var(--gold) / 0.6)" }}>Przewiń</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;