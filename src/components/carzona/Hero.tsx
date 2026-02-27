import { motion } from "framer-motion";
import { Phone, ArrowDown, Shield, Clock, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
      {/* Mechanical parallax background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gear 1 - large, top-right */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-[0.03]"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20 L108 40 L120 25 L122 48 L138 38 L134 60 L152 55 L142 75 L162 76 L148 92 L168 98 L150 108 L166 120 L145 122 L155 140 L134 135 L138 155 L118 144 L115 165 L100 148 L85 165 L82 144 L62 155 L66 135 L45 140 L55 122 L34 120 L50 108 L32 98 L52 92 L38 76 L58 75 L48 55 L66 60 L62 38 L78 48 L80 25 L92 40 L100 20Z" fill="currentColor"/>
            <circle cx="100" cy="100" r="30" fill="hsl(var(--background))"/>
          </svg>
        </motion.div>
        {/* Gear 2 - medium, bottom-left */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] opacity-[0.04]"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 15 L110 42 L125 22 L127 52 L148 35 L140 64 L162 55 L148 80 L172 78 L152 98 L175 102 L152 115 L170 125 L147 128 L158 148 L135 142 L140 162 L118 150 L115 172 L100 152 L85 172 L82 150 L60 162 L65 142 L42 148 L53 128 L30 125 L48 115 L25 102 L48 98 L28 78 L52 80 L38 55 L60 64 L52 35 L73 52 L75 22 L90 42 L100 15Z" fill="currentColor"/>
            <circle cx="100" cy="100" r="35" fill="hsl(var(--background))"/>
          </svg>
        </motion.div>
        {/* Gear 3 - small, center-left */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-[8%] w-[180px] h-[180px] opacity-[0.03]"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 8 L55 22 L65 12 L63 28 L76 20 L70 35 L84 32 L74 45 L90 48 L76 55 L88 64 L73 64 L82 76 L67 72 L72 86 L58 78 L55 92 L50 78 L45 92 L42 78 L28 86 L33 72 L18 76 L27 64 L12 64 L24 55 L10 48 L26 45 L16 32 L30 35 L24 20 L37 28 L35 12 L45 22 L50 8Z" fill="currentColor"/>
            <circle cx="50" cy="50" r="15" fill="hsl(var(--background))"/>
          </svg>
        </motion.div>
        {/* Piston/connecting rod - right side */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] right-[12%] w-[60px] opacity-[0.04]"
        >
          <svg viewBox="0 0 40 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="0" width="20" height="40" rx="4"/>
            <rect x="16" y="40" width="8" height="50"/>
            <circle cx="20" cy="100" r="12"/>
            <circle cx="20" cy="100" r="6" fill="hsl(var(--background))"/>
          </svg>
        </motion.div>
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Massive glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full bg-primary/25 blur-[160px]"
      />
      <motion.div
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.08, 0.18, 0.08], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[180px]"
      />
      {/* Center subtle glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/10 blur-[200px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="text-center max-w-5xl mx-auto">
          {/* Q Service badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Autoryzowany serwis <span className="text-primary font-semibold">Q Service Castrol</span> w Rybniku
            </span>
          </motion.div>

          {/* Heading — massive */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-tighter leading-[0.85] mb-8"
          >
            Twój samochód
            <br />
            <span className="text-gradient-blue">zasługuje na więcej</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Kompleksowa obsługa serwisowa na najwyższym poziomie. 
            Diagnostyka, mechanika, elektronika — wszystko w jednym miejscu.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a
              href="tel:663881585"
              className="group relative flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 hover:scale-105 glow-primary overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <Phone className="w-5 h-5" />
              Zadzwoń teraz
            </a>
            <a
              href="#uslugi"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-8 py-5 rounded-full border border-border hover:border-primary/30 transition-all duration-300 hover:bg-card/50"
            >
              Zobacz usługi
              <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              { icon: Shield, text: "Gwarancja na usługi" },
              { icon: Clock, text: "Szybka realizacja" },
              { icon: Award, text: "15+ lat doświadczenia" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2.5 text-muted-foreground text-sm cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                {item.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
