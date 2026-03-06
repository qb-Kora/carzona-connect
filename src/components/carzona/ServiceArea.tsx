import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

const cities = [
  "Rybnik", "Żory", "Jastrzębie-Zdrój", "Wodzisław Śląski", "Racibórz",
  "Rydułtowy", "Pszów", "Radlin", "Czerwionka-Leszczyny", "Knurów",
  "Gliwice", "Zabrze", "Tychy", "Mikołów", "Ornontowice",
];

const LASER_COUNT = 20;
const MARGIN = 60;
const MAX_TRAIL = 800;
const GREEN_SLOTS = new Set([0]);

interface Laser {
  angle: number;
  speed: number;
  trail: Float32Array; // [x, y, alpha, x, y, alpha, ...]
  trailLen: number;
  hasBeenOnScreen: boolean;
  phase: "entering" | "exiting" | "done";
  green: boolean;
  cosA: number;
  sinA: number;
}

const isOnScreen = (x: number, y: number, w: number, h: number) =>
  x >= -MARGIN && x <= w + MARGIN && y >= -MARGIN && y <= h + MARGIN;

const LaserCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lasersRef = useRef<Laser[]>([]);

  const createLaser = useCallback((w: number, h: number, green: boolean): Laser => {
    const edge = Math.floor(Math.random() * 4);
    let startX: number, startY: number, angle: number;
    const off = MARGIN + 30;

    switch (edge) {
      case 0: startX = Math.random() * w; startY = -off; angle = Math.PI / 4 + Math.random() * Math.PI / 2; break;
      case 1: startX = w + off; startY = Math.random() * h; angle = Math.PI * 0.6 + Math.random() * Math.PI * 0.8; break;
      case 2: startX = Math.random() * w; startY = h + off; angle = -Math.PI / 4 - Math.random() * Math.PI / 2; break;
      default: startX = -off; startY = Math.random() * h; angle = -Math.PI * 0.4 + Math.random() * Math.PI * 0.8; break;
    }

    const baseSpeed = 4.3 + Math.random() * 3.6;
    const trail = new Float32Array(MAX_TRAIL * 3);
    trail[0] = startX; trail[1] = startY; trail[2] = 1;

    return {
      angle, speed: green ? baseSpeed * 2.1 : baseSpeed,
      trail, trailLen: 1,
      hasBeenOnScreen: false, phase: "entering", green,
      cosA: Math.cos(angle), sinA: Math.sin(angle),
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cw = 0, ch = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width; ch = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    lasersRef.current = Array.from({ length: LASER_COUNT }, (_, i) =>
      createLaser(cw, ch, GREEN_SLOTS.has(i))
    );

    let raf: number;
    const FADE_SPEED = 0.012;

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      const lasers = lasersRef.current;
      const time = performance.now() / 1000;

      for (let i = 0; i < lasers.length; i++) {
        const l = lasers[i];
        const t = l.trail;

        if (l.phase === "entering") {
          // Add new points with sub-stepping
          const steps = Math.max(1, Math.ceil(l.speed / 3));
          const stepSize = l.speed / steps;
          for (let s = 0; s < steps && l.trailLen < MAX_TRAIL; s++) {
            const prev = (l.trailLen - 1) * 3;
            const idx = l.trailLen * 3;
            t[idx] = t[prev] + l.cosA * stepSize;
            t[idx + 1] = t[prev + 1] + l.sinA * stepSize;
            t[idx + 2] = 1;
            l.trailLen++;
          }

          // Fade older points
          for (let p = 0; p < (l.trailLen - 1) * 3; p += 3) {
            t[p + 2] = Math.max(0, t[p + 2] - FADE_SPEED * 0.5);
          }

          const last = (l.trailLen - 1) * 3;
          const onScreen = isOnScreen(t[last], t[last + 1], cw, ch);
          if (onScreen) l.hasBeenOnScreen = true;
          if (l.hasBeenOnScreen && !onScreen) l.phase = "exiting";
        } else if (l.phase === "exiting") {
          let allDead = true;
          for (let p = 0; p < l.trailLen * 3; p += 3) {
            t[p + 2] = Math.max(0, t[p + 2] - FADE_SPEED * 2.5);
            if (t[p + 2] > 0) allDead = false;
          }
          if (allDead) l.phase = "done";
        }

        if (l.phase === "done") {
          lasers[i] = createLaser(cw, ch, GREEN_SLOTS.has(i));
          continue;
        }

        // Draw — batch all segments into single paths per layer
        if (l.trailLen > 1) {
          const brightness = l.green ? 1.6 : 1;
          const glowH = l.green ? "84,70%,55%" : "217,91%,60%";
          const coreH = l.green ? "84,70%,85%" : "210,100%,80%";
          const flicker = 0.6 + 0.4 * Math.sin(time * 2.5 + i * 1.7) * Math.sin(time * 1.3 + i * 0.9);

          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.lineCap = "round";

          // Draw in 3 passes but skip every other segment for outer glow
          for (let layer = 0; layer < 3; layer++) {
            const skip = layer === 0 ? 3 : 1; // outer glow: skip segments for perf
            ctx.lineWidth = layer === 0 ? 8 : layer === 1 ? 4 : 1;
            const alphaFactor = (layer === 0 ? 0.06 : layer === 1 ? 0.12 : 0.5) * brightness;
            const hsl = layer < 2 ? glowH : coreH;

            for (let p = skip; p < l.trailLen; p += skip) {
              const p0 = (p - skip) * 3;
              const p1 = p * 3;
              const avg = (t[p0 + 2] + t[p1 + 2]) / 2 * flicker;
              if (avg < 0.01) continue;

              ctx.strokeStyle = `hsla(${hsl},${avg * alphaFactor})`;
              ctx.beginPath();
              ctx.moveTo(t[p0], t[p0 + 1]);
              ctx.lineTo(t[p1], t[p1 + 1]);
              ctx.stroke();
            }
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
    <div className="absolute inset-0 z-0 bg-background" />

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
