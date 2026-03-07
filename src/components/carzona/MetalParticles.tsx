import { useEffect, useRef, memo } from "react";
import { isLowEnd, scaledCount } from "@/hooks/use-device-capability";

interface Particle {
  x: number; y: number; size: number;
  speedX: number; speedY: number;
  opacity: number; flickerSpeed: number; flickerPhase: number;
}

const MetalParticles = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Skip entirely on low-end devices
  if (isLowEnd()) return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let raf = 0;
    let isVisible = false;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.offsetWidth; h = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !raf) raf = requestAnimationFrame(animate);
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const count = scaledCount(30, 15, 0);
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * (w || 500),
      y: Math.random() * (h || 500),
      size: 2 + Math.random() * 4,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.15 - Math.random() * 0.4,
      opacity: 0.4 + Math.random() * 0.6,
      flickerSpeed: 1.5 + Math.random() * 4,
      flickerPhase: Math.random() * Math.PI * 2,
    }));

    const animate = (time: number) => {
      if (!isVisible) { raf = 0; return; }
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;

        const flicker = 0.5 + 0.5 * Math.sin(time * 0.001 * p.flickerSpeed + p.flickerPhase);
        const alpha = p.opacity * flicker;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40,60%,65%,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />;
});

MetalParticles.displayName = "MetalParticles";

export default MetalParticles;
