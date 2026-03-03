import { motion } from "framer-motion";
import { Phone, CalendarCheck, ChevronDown, Cpu, Clock, ShieldCheck } from "lucide-react";

const usps = [
  { icon: Cpu, title: "Diagnostyka komputerowa", desc: "Nowoczesny sprzęt diagnostyczny" },
  { icon: Clock, title: "Naprawy w 24h", desc: "Ekspresowa realizacja zleceń" },
  { icon: ShieldCheck, title: "Gwarancja na usługi", desc: "Pewność i spokój po naprawie" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Cinematic animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated road/speed lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: "-110%", opacity: [0, 0.06, 0.06, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "linear",
            }}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${20 + i * 8}%`,
              width: `${120 + i * 30}px`,
            }}
          />
        ))}

        {/* Rotating gear — large */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-[0.02]"
        >
          <svg viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20 L108 40 L120 25 L122 48 L138 38 L134 60 L152 55 L142 75 L162 76 L148 92 L168 98 L150 108 L166 120 L145 122 L155 140 L134 135 L138 155 L118 144 L115 165 L100 148 L85 165 L82 144 L62 155 L66 135 L45 140 L55 122 L34 120 L50 108 L32 98 L52 92 L38 76 L58 75 L48 55 L66 60 L62 38 L78 48 L80 25 L92 40 L100 20Z"/>
            <circle cx="100" cy="100" r="30" fill="hsl(var(--background))"/>
          </svg>
        </motion.div>

        {/* Rotating gear — small */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-16 -left-16 w-[300px] h-[300px] opacity-[0.025]"
        >
          <svg viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 15 L110 42 L125 22 L127 52 L148 35 L140 64 L162 55 L148 80 L172 78 L152 98 L175 102 L152 115 L170 125 L147 128 L158 148 L135 142 L140 162 L118 150 L115 172 L100 152 L85 172 L82 150 L60 162 L65 142 L42 148 L53 128 L30 125 L48 115 L25 102 L48 98 L28 78 L52 80 L38 55 L60 64 L52 35 L73 52 L75 22 L90 42 L100 15Z"/>
            <circle cx="100" cy="100" r="35" fill="hsl(var(--background))"/>
          </svg>
        </motion.div>

        {/* Animated floating sparks */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            animate={{
              y: [0, -80, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 rounded-full bg-accent"
            style={{
              left: `${15 + i * 18}%`,
              top: `${60 + (i % 3) * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[180px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[180px]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-28 sm:py-32 md:py-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Autoryzowany partner <span className="text-accent font-semibold">Q Service Castrol</span>
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1] sm:leading-[0.9] mb-6 sm:mb-8"
          >
            Profesjonalny warsztat
            <br />
            samochodowy{" "}
            <span className="text-gradient-accent">w Rybniku</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2"
          >
            Szybka diagnostyka • Uczciwe ceny • Ponad 1000 napraw rocznie
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16 px-2"
          >
            <a
              href="#kontakt"
              className="group relative flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold btn-shine transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_40px_-8px_hsl(var(--accent)/0.5)]"
            >
              <CalendarCheck className="w-5 h-5" />
              Umów wizytę online
            </a>
            <a
              href="tel:663881585"
              className="flex items-center justify-center gap-3 text-foreground px-8 py-4 sm:py-5 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 hover:bg-card/60 font-semibold"
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {usps.map((usp, i) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="glass rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                  <usp.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground text-sm">{usp.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{usp.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#zaufanie"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs"
      >
        <span>Przewiń</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
