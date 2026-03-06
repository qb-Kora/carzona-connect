import { useEffect, useRef, useState } from "react";
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

const TrustBar = () => (
  <section id="zaufanie" className="relative py-8 sm:py-12 md:py-16">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 perspective-grid">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center gap-2.5 sm:gap-4 group p-3 sm:p-4 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm"
            whileHover={{ rotateX: -3, rotateY: 4, scale: 1.05, z: 15 }}
            style={{ transformPerspective: 600, transformStyle: "preserve-3d" }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
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
);

export default TrustBar;
