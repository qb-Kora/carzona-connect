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
const MARGIN = 60;

interface Laser {
  angle: number;
  speed: number;
  trail: { x: number; y: number }[];
  hasBeenOnScreen: boolean;
  phase: "entering" | "exiting" | "done";
}

const isOnScreen = (x: number, y: number, w: number, h: number) =>
  x >= -MARGIN && x <= w + MARGIN && y >= -MARGIN && y <= h + MARGIN;

const LaserCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lasersRef = useRef<Laser[]>([]);

  const createLaser = useCallback((w: number, h: number): Laser => {
    const edge = Math.floor(Math.random() * 4);
    let startX: number, startY: number, angle: number;
    const off = MARGIN + 30;

    switch (edge) {
      case 0:
        startX = Math.random() * w; startY = -off;
        angle = Math.PI / 4 + Math.random() * Math.PI / 2;
        break;
      case 1:
        startX = w + off; startY = Math.random() * h;
        angle = Math.PI * 0.6 + Math.random() * Math.PI * 0.8;
        break;
      case 2:
        startX = Math.random() * w; startY = h + off;
        angle = -Math.PI / 4 - Math.random() * Math.PI / 2;
        break;
      default:
        startX = -off; startY = Math.random() * h;
        angle = -Math.PI * 0.4 + Math.random() * Math.PI * 0.8;
        break;
    }

    return {
      angle,
      speed: 3 + Math.random() * 2.5,
      trail: [{ x: startX, y: startY }],
      hasBeenOnScreen: false,
      phase: "entering",
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getSize = () => {
      const rect = canvas.getBoundingClientRect();
      return { w: rect.width, h: rect.height };
    };

    const resize = () => {
      const { w, h } = getSize();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    lasersRef.current = Array.from({ length: LASER_COUNT }, () => {
      const { w, h } = getSize();
      return createLaser(w, h);
    });

    let raf: number;
    const TAIL_SPEED = 6; // how many trail points to remove per frame when exiting

    const draw = () => {
      const { w: cw, h: ch } = getSize();
      ctx.clearRect(0, 0, cw, ch);

      const lasers = lasersRef.current;
      for (let i = 0; i < lasers.length; i++) {
        const l = lasers[i];

        if (l.phase === "entering") {
          // Move head forward
          const head = l.trail[l.trail.length - 1];
          const nx = head.x + Math.cos(l.angle) * l.speed;
          const ny = head.y + Math.sin(l.angle) * l.speed;
          l.trail.push({ x: nx, y: ny });

          const onScreen = isOnScreen(nx, ny, cw, ch);
          if (onScreen) {
            l.hasBeenOnScreen = true;
          }
          // Only switch to exiting after it has entered and then left
          if (l.hasBeenOnScreen && !onScreen) {
            l.phase = "exiting";
          }
        } else if (l.phase === "exiting") {
          // Remove points from tail
          for (let r = 0; r < TAIL_SPEED && l.trail.length > 0; r++) {
            l.trail.shift();
          }
          if (l.trail.length === 0) {
            l.phase = "done";
          }
        }

        if (l.phase === "done") {
          lasers[i] = createLaser(cw, ch);
          continue;
        }

        // Draw the trail
        if (l.trail.length > 1) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          const len = l.trail.length;

          // Outer glow — single path for performance
          ctx.lineWidth = 4;
          ctx.strokeStyle = "hsla(217, 91%, 60%, 0.15)";
          ctx.beginPath();
          ctx.moveTo(l.trail[0].x, l.trail[0].y);
          for (let t = 1; t < len; t++) {
            ctx.lineTo(l.trail[t].x, l.trail[t].y);
          }
          ctx.stroke();

          // Core line
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = "hsla(210, 100%, 85%, 0.3)";
          ctx.beginPath();
          ctx.moveTo(l.trail[0].x, l.trail[0].y);
          for (let t = 1; t < len; t++) {
            ctx.lineTo(l.trail[t].x, l.trail[t].y);
          }
          ctx.stroke();

          // Bright head dot (only while entering)
          if (l.phase === "entering") {
            const head = l.trail[len - 1];
            ctx.shadowColor = "hsla(217, 91%, 60%, 0.7)";
            ctx.shadowBlur = 10;
            ctx.fillStyle = "hsla(210, 100%, 92%, 0.7)";
            ctx.beginPath();
            ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          ctx.restore();
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
