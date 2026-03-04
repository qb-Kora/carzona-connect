import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";


const cities = [
  "Rybnik", "Żory", "Jastrzębie-Zdrój", "Wodzisław Śląski", "Racibórz",
  "Rydułtowy", "Pszów", "Radlin", "Czerwionka-Leszczyny", "Knurów",
  "Gliwice", "Zabrze", "Tychy", "Mikołów", "Ornontowice",
];

const LASER_COUNT = 10;

interface Laser {
  x: number;
  y: number;
  angle: number;
  speed: number;
  trail: { x: number; y: number }[];
}

const LaserCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lasersRef = useRef<Laser[]>([]);

  const createLaser = useCallback((w: number, h: number): Laser => {
    // Start from a random edge (outside visible area)
    const edge = Math.floor(Math.random() * 4); // 0=top,1=right,2=bottom,3=left
    let startX: number, startY: number, angle: number;
    const margin = 20;

    switch (edge) {
      case 0: // top
        startX = Math.random() * w;
        startY = -margin;
        angle = Math.PI / 4 + Math.random() * Math.PI / 2; // downward
        break;
      case 1: // right
        startX = w + margin;
        startY = Math.random() * h;
        angle = Math.PI * 0.6 + Math.random() * Math.PI * 0.8; // leftward
        break;
      case 2: // bottom
        startX = Math.random() * w;
        startY = h + margin;
        angle = -Math.PI / 4 - Math.random() * Math.PI / 2; // upward
        break;
      default: // left
        startX = -margin;
        startY = Math.random() * h;
        angle = -Math.PI * 0.4 + Math.random() * Math.PI * 0.8; // rightward
        break;
    }

    const speed = 4 + Math.random() * 3;
    return {
      x: startX,
      y: startY,
      angle,
      speed,
      trail: [{ x: startX, y: startY }],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    lasersRef.current = Array.from({ length: LASER_COUNT }, () => createLaser(w(), h()));

    let raf: number;
    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      const lasers = lasersRef.current;
      for (let i = 0; i < lasers.length; i++) {
        const l = lasers[i];

        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;

        l.trail.push({ x: l.x, y: l.y });
        if (l.trail.length > 120) l.trail.shift();

        if (l.trail.length > 1) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          const len = l.trail.length;

          // Draw trail segments with gradual fade from tail to head
          for (let t = 1; t < len; t++) {
            const progress = t / len; // 0 = tail, 1 = head
            const alpha = 0.05 + progress * 0.25; // tail: 0.05, head: 0.30

            // Neon outer glow
            ctx.lineWidth = 3 + progress * 2;
            ctx.beginPath();
            ctx.moveTo(l.trail[t - 1].x, l.trail[t - 1].y);
            ctx.lineTo(l.trail[t].x, l.trail[t].y);
            ctx.strokeStyle = `hsla(217, 91%, 60%, ${alpha * 0.5})`;
            ctx.stroke();

            // Neon core
            ctx.lineWidth = 0.8 + progress * 0.7;
            ctx.beginPath();
            ctx.moveTo(l.trail[t - 1].x, l.trail[t - 1].y);
            ctx.lineTo(l.trail[t].x, l.trail[t].y);
            ctx.strokeStyle = `hsla(210, 100%, 85%, ${alpha})`;
            ctx.stroke();
          }

          // Bright neon head
          ctx.shadowColor = "hsla(217, 91%, 60%, 0.6)";
          ctx.shadowBlur = 8;
          ctx.fillStyle = `hsla(210, 100%, 90%, 0.5)`;
          ctx.beginPath();
          ctx.arc(l.x, l.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.restore();
        }

        // Respawn only when fully off-screen
        if (
          l.x < -100 || l.x > cw + 100 ||
          l.y < -100 || l.y > ch + 100
        ) {
          lasers[i] = createLaser(cw, ch);
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [createLaser]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

const ServiceArea = () => (
  <section className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 z-0 bg-background" />
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-accent/[0.08]" />

    <LaserCanvas />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <AnimatedSection>
          <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
            Obszar działania
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Warsztat samochodowy dla mieszkańców Rybnika i okolic
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-5 sm:mb-8">
            Obsługujemy klientów z Rybnika i okolicznych miast. Dojedziesz do nas łatwo — jesteśmy świetnie skomunikowani.
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {cities.map((city, i) => (
              <motion.span
                key={city}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 cursor-default ${
                  city === "Rybnik"
                    ? "bg-accent/10 border border-accent/60 text-accent font-medium hover:border-accent hover:bg-accent/20 hover:text-accent-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <MapPin className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${city === "Rybnik" ? "text-accent" : "text-primary"}`} />
                {city}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border h-60 sm:h-72 md:h-80 lg:h-96"
        >
          <iframe
            src="https://maps.google.com/maps?q=Konarskiego+17,+44-274+Rybnik,+Polska&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CARZONA lokalizacja — ul. Konarskiego 17, Rybnik"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ServiceArea;
