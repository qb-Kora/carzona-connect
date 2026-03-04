import { useCallback, useEffect, useRef, useState } from "react";

interface Nut {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  size: number;
  opacity: number;
}

const NUT_COUNT = 200;
const PUSH_RADIUS = 90;
const PUSH_FORCE = 2.5;
const FRICTION = 0.96;
const ROTATION_FRICTION = 0.97;

const HexNutSVG = ({ size }: { size: number }) => {
  const color = "hsl(220, 10%, 45%)";
  const colorLight = "hsl(220, 10%, 55%)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="12,2 21,7 21,17 12,22 3,17 3,7"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.55"
      />
      <circle cx="12" cy="12" r="5.5" stroke={color} strokeWidth="1.2" fill="none" opacity="0.45" />
      <circle cx="12" cy="12" r="4.5" stroke={colorLight} strokeWidth="0.3" fill="none" opacity="0.2" strokeDasharray="2 1.5" />
    </svg>
  );
};

interface InteractiveScrewsProps {
  sectionRef?: React.RefObject<HTMLElement>;
}

const InteractiveScrews = ({ sectionRef }: InteractiveScrewsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nutsRef = useRef<Nut[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const [renderKey, setRenderKey] = useState(0);
  const initializedRef = useRef(false);

  const initNuts = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    nutsRef.current = Array.from({ length: NUT_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * (width - 30) + 15,
      y: Math.random() * (height - 30) + 15,
      vx: 0,
      vy: 0,
      rotation: Math.random() * 360,
      vr: 0,
      size: 6 + Math.random() * 32, // 6px to 38px
      opacity: 0.12 + Math.random() * 0.38,
    }));
    initializedRef.current = true;
    setRenderKey(k => k + 1);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => initNuts(), 100);
    window.addEventListener("resize", initNuts);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", initNuts);
    };
  }, [initNuts]);

  useEffect(() => {
    const target = sectionRef?.current || containerRef.current;
    if (!target) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = (containerRef.current || target).getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sectionRef]);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16, 3);
      lastTime = time;

      const container = containerRef.current;
      if (!container || !initializedRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      const { width, height } = container.getBoundingClientRect();
      const mouse = mouseRef.current;
      let needsRender = false;

      nutsRef.current.forEach((nut) => {
        const dx = nut.x - mouse.x;
        const dy = nut.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PUSH_RADIUS && dist > 0) {
          const force = (1 - dist / PUSH_RADIUS) * PUSH_FORCE * dt;
          nut.vx += (dx / dist) * force;
          nut.vy += (dy / dist) * force;
          nut.vr += (dx > 0 ? 1 : -1) * force * 3;
          needsRender = true;
        }

        nut.x += nut.vx * dt;
        nut.y += nut.vy * dt;
        nut.rotation += nut.vr * dt;

        nut.vx *= FRICTION;
        nut.vy *= FRICTION;
        nut.vr *= ROTATION_FRICTION;

        if (nut.x < 5) { nut.x = 5; nut.vx *= -0.5; }
        if (nut.x > width - 5) { nut.x = width - 5; nut.vx *= -0.5; }
        if (nut.y < 5) { nut.y = 5; nut.vy *= -0.5; }
        if (nut.y > height - 5) { nut.y = height - 5; nut.vy *= -0.5; }

        if (Math.abs(nut.vx) > 0.01 || Math.abs(nut.vy) > 0.01) {
          needsRender = true;
        }
      });

      if (needsRender) {
        setRenderKey(k => k + 1);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 5 }}
      data-render={renderKey}
    >
      {nutsRef.current.map((nut) => (
        <div
          key={nut.id}
          className="absolute"
          style={{
            left: nut.x - nut.size / 2,
            top: nut.y - nut.size / 2,
            transform: `rotate(${nut.rotation}deg)`,
            opacity: nut.opacity,
            willChange: "transform",
          }}
        >
          <HexNutSVG size={nut.size} />
        </div>
      ))}
    </div>
  );
};

export default InteractiveScrews;
