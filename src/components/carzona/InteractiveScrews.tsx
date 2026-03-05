import { useCallback, useEffect, useRef } from "react";

interface Nut {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  size: number;
  opacity: number;
}

const NUT_COUNT = 120;
const PUSH_RADIUS = 90;
const PUSH_FORCE = 2.5;
const FRICTION = 0.96;
const ROTATION_FRICTION = 0.97;

interface InteractiveScrewsProps {
  sectionRef?: React.RefObject<HTMLElement>;
}

const InteractiveScrews = ({ sectionRef }: InteractiveScrewsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nutsRef = useRef<Nut[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  const initNuts = useCallback((w: number, h: number) => {
    nutsRef.current = Array.from({ length: NUT_COUNT }, () => ({
      x: Math.random() * (w - 30) + 15,
      y: Math.random() * (h - 30) + 15,
      vx: 0, vy: 0,
      rotation: Math.random() * 360,
      vr: 0,
      size: 6 + Math.random() * 28,
      opacity: 0.08 + Math.random() * 0.25,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nutsRef.current.length === 0) initNuts(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const target = sectionRef?.current || canvas.parentElement;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    target?.addEventListener("mousemove", handleMouseMove);
    target?.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = performance.now();
    const color1 = "hsla(220, 10%, 45%,";
    const color2 = "hsla(220, 10%, 55%,";

    const drawHexNut = (nut: Nut) => {
      const { x, y, size, rotation, opacity } = nut;
      const s = size / 24; // scale factor relative to 24x24 viewBox
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(s, s);

      // Outer hexagon
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI / 3) * j - Math.PI / 6;
        const px = Math.cos(angle) * 10;
        const py = Math.sin(angle) * 10;
        j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `${color1}${opacity * 0.55})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner circle
      ctx.beginPath();
      ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = `${color1}${opacity * 0.45})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    };

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16, 3);
      lastTime = time;

      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const nuts = nutsRef.current;

      for (let i = 0; i < nuts.length; i++) {
        const nut = nuts[i];
        const dx = nut.x - mouse.x;
        const dy = nut.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PUSH_RADIUS && dist > 0) {
          const force = (1 - dist / PUSH_RADIUS) * PUSH_FORCE * dt;
          nut.vx += (dx / dist) * force;
          nut.vy += (dy / dist) * force;
          nut.vr += (dx > 0 ? 1 : -1) * force * 3;
        }

        nut.x += nut.vx * dt;
        nut.y += nut.vy * dt;
        nut.rotation += nut.vr * dt;
        nut.vx *= FRICTION;
        nut.vy *= FRICTION;
        nut.vr *= ROTATION_FRICTION;

        if (nut.x < 5) { nut.x = 5; nut.vx *= -0.5; }
        if (nut.x > w - 5) { nut.x = w - 5; nut.vx *= -0.5; }
        if (nut.y < 5) { nut.y = 5; nut.vy *= -0.5; }
        if (nut.y > h - 5) { nut.y = h - 5; nut.vy *= -0.5; }

        drawHexNut(nut);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      target?.removeEventListener("mousemove", handleMouseMove);
      target?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initNuts, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};

export default InteractiveScrews;
