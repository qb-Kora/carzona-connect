import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import carzonaStreet from "@/assets/carzona-street.png";

const cities = [
  "Rybnik", "Żory", "Jastrzębie-Zdrój", "Wodzisław Śląski", "Racibórz",
  "Rydułtowy", "Pszów", "Radlin", "Czerwionka-Leszczyny", "Knurów",
  "Gliwice", "Zabrze", "Tychy", "Mikołów", "Ornontowice",
];

const LASER_COUNT = 12;

interface Laser {
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
}

const LaserScratchCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const lasersRef = useRef<Laser[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgLoaded = useRef(false);

  const createLaser = useCallback((w: number, h: number): Laser => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 3; // steady, uniform speed
    const startX = Math.random() * w;
    const startY = Math.random() * h;
    return {
      x: startX,
      y: startY,
      angle,
      speed,
      life: 0,
      maxLife: 60 + Math.floor(Math.random() * 80), // much longer life = longer trail
      trail: [{ x: startX, y: startY }],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create off-screen mask canvas for scratch reveal
    const mask = document.createElement("canvas");
    maskRef.current = mask;

    const resize = () => {
      const dpr = window.devicePixelRatio;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      mask.width = w * dpr;
      mask.height = h * dpr;
      const mctx = mask.getContext("2d");
      if (mctx) mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Load image
    const img = new Image();
    img.src = carzonaStreet;
    img.onload = () => {
      imgRef.current = img;
      imgLoaded.current = true;
    };

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Init lasers
    lasersRef.current = Array.from({ length: LASER_COUNT }, () => createLaser(w(), h()));

    // Temporary canvas for compositing the photo reveal
    const revealCanvas = document.createElement("canvas");

    let raf: number;
    const draw = () => {
      const cw = w();
      const ch = h();
      const mctx = mask.getContext("2d");

      // Clear main canvas
      ctx.clearRect(0, 0, cw, ch);

      // Update & draw lasers
      const lasers = lasersRef.current;
      for (let i = 0; i < lasers.length; i++) {
        const l = lasers[i];
        l.life++;

        // Move at constant speed
        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;

        // Store trail point
        l.trail.push({ x: l.x, y: l.y });
        // Keep trail max ~120 points for long tail
        if (l.trail.length > 120) l.trail.shift();

        // Scratch the mask where laser travels
        if (mctx) {
          mctx.globalCompositeOperation = "source-over";
          mctx.strokeStyle = "white";
          mctx.lineWidth = 2 + Math.random() * 3;
          mctx.lineCap = "round";
          mctx.globalAlpha = 0.1;
          mctx.beginPath();
          mctx.moveTo(
            l.x - Math.cos(l.angle) * l.speed,
            l.y - Math.sin(l.angle) * l.speed
          );
          mctx.lineTo(l.x, l.y);
          mctx.stroke();
          mctx.globalAlpha = 1;
        }

        // Draw long blue trail
        const alive = 1 - l.life / l.maxLife;
        if (alive > 0 && l.trail.length > 1) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Outer glow trail
          for (let t = 1; t < l.trail.length; t++) {
            const segAlpha = (t / l.trail.length) * alive;
            ctx.strokeStyle = `hsla(217, 91%, 60%, ${segAlpha * 0.35})`;
            ctx.lineWidth = 8;
            ctx.shadowColor = `hsla(217, 91%, 60%, 0.6)`;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.moveTo(l.trail[t - 1].x, l.trail[t - 1].y);
            ctx.lineTo(l.trail[t].x, l.trail[t].y);
            ctx.stroke();
          }

          // Core trail
          for (let t = 1; t < l.trail.length; t++) {
            const segAlpha = (t / l.trail.length) * alive;
            ctx.strokeStyle = `hsla(210, 100%, 85%, ${segAlpha * 0.8})`;
            ctx.lineWidth = 2;
            ctx.shadowColor = `hsla(210, 100%, 85%, 0.5)`;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(l.trail[t - 1].x, l.trail[t - 1].y);
            ctx.lineTo(l.trail[t].x, l.trail[t].y);
            ctx.stroke();
          }

          // Bright head
          ctx.fillStyle = `hsla(210, 100%, 90%, ${alive})`;
          ctx.shadowColor = `hsla(217, 91%, 65%, 0.9)`;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(l.x, l.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        // Respawn when dead or off-screen
        if (
          l.life >= l.maxLife ||
          l.x < -100 || l.x > cw + 100 ||
          l.y < -100 || l.y > ch + 100
        ) {
          lasers[i] = createLaser(cw, ch);
        }
      }

      // Draw the photo revealed through the scratch mask behind lasers
      if (imgLoaded.current && imgRef.current) {
        const dpr = window.devicePixelRatio;
        revealCanvas.width = cw * dpr;
        revealCanvas.height = ch * dpr;
        const rctx = revealCanvas.getContext("2d");
        if (rctx) {
          rctx.clearRect(0, 0, revealCanvas.width, revealCanvas.height);
          rctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          // Draw the image with slight blur
          rctx.filter = "blur(2px)";
          const imgAspect = imgRef.current.width / imgRef.current.height;
          const canvasAspect = cw / ch;
          let sx = 0, sy = 0, sw = imgRef.current.width, sh = imgRef.current.height;
          if (imgAspect > canvasAspect) {
            sw = imgRef.current.height * canvasAspect;
            sx = (imgRef.current.width - sw) / 2;
          } else {
            sh = imgRef.current.width / canvasAspect;
            sy = (imgRef.current.height - sh) / 2;
          }
          rctx.drawImage(imgRef.current, sx, sy, sw, sh, 0, 0, cw, ch);
          rctx.filter = "none";

          // Darken it
          rctx.fillStyle = "rgba(0, 0, 0, 0.45)";
          rctx.fillRect(0, 0, cw, ch);

          // Use mask to clip — only show where scratched
          rctx.globalCompositeOperation = "destination-in";
          rctx.drawImage(mask, 0, 0, cw, ch);

          // Draw behind lasers on main canvas
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.drawImage(revealCanvas, 0, 0, cw, ch);
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const ServiceArea = () => (
  <section className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
    <LaserScratchCanvas />
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
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card border border-border text-xs sm:text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300 cursor-default"
              >
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
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
