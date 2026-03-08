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
      {count.toLocaleString("pl-PL")}
      {suffix}
    </span>
  );
}

const items = [
  { icon: Award, value: 15, suffix: "+", label: "Lat doświadczenia" },
  { icon: Shield, value: 100, suffix: "%", label: "Gwarancja na usługi" },
  { icon: Users, value: 3000, suffix: "+", label: "Zadowolonych klientów" },
  { icon: Cpu, value: 10, suffix: "+", label: "Certyfikacji i szkoleń" },
];

const TrustBar = memo(() => (
  <section id="zaufanie" className="relative py-10 sm:py-14 md:py-20">
    {/* Premium ambient glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_180%_100%_at_50%_50%,hsl(var(--primary)/0.10),hsl(var(--primary)/0.04)_40%,transparent_75%)]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col items-center text-center p-4 sm:p-5 md:p-6 rounded-2xl border border-border/40 relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, hsl(var(--card) / 0.7) 0%, hsl(var(--card) / 0.3) 100%)",
              boxShadow: "inset 0 1px 0 0 hsl(var(--foreground) / 0.04), 0 8px 24px -8px hsl(var(--background) / 0.6)",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-6 right-6 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)" }}
            />
            <div
              className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 neon-hover-icon transition-colors duration-300 mb-3"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.14) 0%, hsl(var(--primary) / 0.05) 100%)",
                boxShadow: "0 0 12px -4px hsl(var(--primary) / 0.1)",
              }}
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            {item.value > 0 ? (
              <div
                className="text-xl sm:text-2xl md:text-3xl font-black leading-tight mb-1"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <CountUp target={item.value} suffix={item.suffix} />
              </div>
            ) : null}
            <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-tight">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

TrustBar.displayName = "TrustBar";

export default TrustBar;