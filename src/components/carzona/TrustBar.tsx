import { useEffect, useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Shield, Users, Cpu } from "lucide-react";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("pl-PL")}{suffix}
    </span>
  );
}

const items = [
  { icon: Award, value: 15, suffix: "+", label: "Lat doświadczenia" },
  { icon: Shield, value: 100, suffix: "%", label: "Gwarancja na usługi" },
  { icon: Users, value: 3000, suffix: "+", label: "Zadowolonych klientów" },
  { icon: Cpu, value: 0, suffix: "", label: "Nowoczesny sprzęt" },
];

const TrustBar = memo(() => (
  <section id="zaufanie" className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
    {/* LED strip glow — sharp center core */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          "radial-gradient(ellipse 100% 40% at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 60%)",
          "radial-gradient(ellipse 80% 20% at 50% 50%, hsl(var(--primary) / 0.18) 0%, transparent 50%)",
          "radial-gradient(ellipse 120% 8% at 50% 50%, hsl(var(--primary) / 0.25) 0%, transparent 40%)",
        ].join(", "),
        animation: "led-pulse 4s ease-in-out infinite",
      }}
    />
    {/* Horizontal LED core line */}
    <div
      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] pointer-events-none"
      style={{
        background: "linear-gradient(to right, transparent 5%, hsl(var(--primary) / 0.35) 30%, hsl(var(--primary) / 0.5) 50%, hsl(var(--primary) / 0.35) 70%, transparent 95%)",
        boxShadow: "0 0 8px 2px hsl(var(--primary) / 0.2), 0 0 20px 4px hsl(var(--primary) / 0.1)",
        animation: "led-pulse 4s ease-in-out infinite",
      }}
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex items-center gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-border/50 backdrop-blur-sm relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.3) 100%)",
              boxShadow: "inset 0 1px 0 0 hsl(var(--foreground) / 0.03), 0 4px 16px -4px hsl(var(--background) / 0.5)",
            }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 neon-hover-icon transition-colors duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.06) 100%)",
              }}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="min-w-0">
              {item.value > 0 ? (
                <div className="text-base sm:text-lg md:text-2xl font-bold text-foreground leading-tight">
                  <CountUp target={item.value} suffix={item.suffix} />
                </div>
              ) : null}
              <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-tight">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

TrustBar.displayName = "TrustBar";

export default TrustBar;
