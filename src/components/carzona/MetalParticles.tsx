import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 28;

interface Particle {
  x: number; y: number; size: number;
  speedX: number; speedY: number;
  opacity: number; flickerSpeed: number; flickerPhase: number;
}

const MetalParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.offsetWidth; h = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * (w || 500),
      y: Math.random() * (h || 500),
      size: 1.5 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.15 - Math.random() * 0.4,
      opacity: 0.25 + Math.random() * 0.5,
      flickerSpeed: 1 + Math.random() * 3,
      flickerPhase: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const animate = (time: number) => {
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
    raf = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};

export default MetalParticles;
