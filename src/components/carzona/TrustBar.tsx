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
  <section id="zaufanie" className="relative py-12 md:py-16 line-glow">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              {item.value > 0 ? (
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  <CountUp target={item.value} suffix={item.suffix} />
                </div>
              ) : null}
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
