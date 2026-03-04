import { useCallback, useEffect, useRef, useState } from "react";

interface Screw {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  size: number;
  type: "bolt" | "nut" | "screw";
  opacity: number;
}

const SCREW_COUNT = 18;
const PUSH_RADIUS = 80;
const PUSH_FORCE = 2.5;
const FRICTION = 0.96;
const ROTATION_FRICTION = 0.97;

const ScrewSVG = ({ type, size }: { type: string; size: number }) => {
  if (type === "bolt") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" fill="none" opacity="0.5" />
        <circle cx="12" cy="12" r="6" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.4" />
        <line x1="12" y1="2" x2="12" y2="22" stroke="hsl(var(--muted-foreground))" strokeWidth="0.7" opacity="0.35" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="hsl(var(--muted-foreground))" strokeWidth="0.7" opacity="0.35" />
      </svg>
    );
  }
  if (type === "nut") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="12,2 21,7 21,17 12,22 3,17 3,7"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
        <circle cx="12" cy="12" r="5" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.35" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" fill="none" opacity="0.5" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.45" strokeLinecap="round" />
    </svg>
  );
};

const InteractiveScrews = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const screwsRef = useRef<Screw[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const [renderKey, setRenderKey] = useState(0);
  const initializedRef = useRef(false);

  const initScrews = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    
    const types: Screw["type"][] = ["bolt", "nut", "screw"];
    screwsRef.current = Array.from({ length: SCREW_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * (width - 60) + 30,
      y: Math.random() * (height - 60) + 30,
      vx: 0,
      vy: 0,
      rotation: Math.random() * 360,
      vr: 0,
      size: 20 + Math.random() * 16,
      type: types[i % 3],
      opacity: 0.35 + Math.random() * 0.3,
    }));
    initializedRef.current = true;
    setRenderKey(k => k + 1);
  }, []);

  useEffect(() => {
    // Delay init slightly to ensure container has dimensions
    const timeout = setTimeout(() => {
      initScrews();
    }, 100);
    
    window.addEventListener("resize", initScrews);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", initScrews);
    };
  }, [initScrews]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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

      screwsRef.current.forEach((screw) => {
        const dx = screw.x - mouse.x;
        const dy = screw.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PUSH_RADIUS && dist > 0) {
          const force = (1 - dist / PUSH_RADIUS) * PUSH_FORCE * dt;
          screw.vx += (dx / dist) * force;
          screw.vy += (dy / dist) * force;
          screw.vr += (dx > 0 ? 1 : -1) * force * 3;
          needsRender = true;
        }

        screw.x += screw.vx * dt;
        screw.y += screw.vy * dt;
        screw.rotation += screw.vr * dt;

        screw.vx *= FRICTION;
        screw.vy *= FRICTION;
        screw.vr *= ROTATION_FRICTION;

        if (screw.x < 10) { screw.x = 10; screw.vx *= -0.5; }
        if (screw.x > width - 10) { screw.x = width - 10; screw.vx *= -0.5; }
        if (screw.y < 10) { screw.y = 10; screw.vy *= -0.5; }
        if (screw.y > height - 10) { screw.y = height - 10; screw.vy *= -0.5; }

        if (Math.abs(screw.vx) > 0.01 || Math.abs(screw.vy) > 0.01) {
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
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
      data-render={renderKey}
    >
      {screwsRef.current.map((screw) => (
        <div
          key={screw.id}
          className="absolute"
          style={{
            left: screw.x - screw.size / 2,
            top: screw.y - screw.size / 2,
            transform: `rotate(${screw.rotation}deg)`,
            opacity: screw.opacity,
            willChange: "transform",
          }}
        >
          <ScrewSVG type={screw.type} size={screw.size} />
        </div>
      ))}
    </div>
  );
};

export default InteractiveScrews;
