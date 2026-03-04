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
  type: "flathead" | "phillips" | "hex-bolt" | "nut" | "washer";
  opacity: number;
}

const SCREW_COUNT = 100;
const PUSH_RADIUS = 90;
const PUSH_FORCE = 2.5;
const FRICTION = 0.96;
const ROTATION_FRICTION = 0.97;

const ScrewSVG = ({ type, size }: { type: string; size: number }) => {
  const color = "hsl(220, 10%, 45%)";
  const colorLight = "hsl(220, 10%, 55%)";

  if (type === "flathead") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle cx="12" cy="12" r="9.5" stroke={colorLight} strokeWidth="0.3" fill="none" opacity="0.2" />
        <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "phillips") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle cx="12" cy="12" r="9.5" stroke={colorLight} strokeWidth="0.3" fill="none" opacity="0.2" />
        <line x1="7" y1="12" x2="17" y2="12" stroke={color} strokeWidth="1.8" opacity="0.55" strokeLinecap="round" />
        <line x1="12" y1="7" x2="12" y2="17" stroke={color} strokeWidth="1.8" opacity="0.55" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "hex-bolt") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="12,2.5 20.5,7.25 20.5,16.75 12,21.5 3.5,16.75 3.5,7.25"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <polygon
          points="12,5 17.5,8.5 17.5,15.5 12,19 6.5,15.5 6.5,8.5"
          stroke={colorLight}
          strokeWidth="0.4"
          fill="none"
          opacity="0.2"
        />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
    );
  }

  if (type === "nut") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="12,2 21,7 21,17 12,22 3,17 3,7"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <circle cx="12" cy="12" r="5.5" stroke={color} strokeWidth="1.2" fill="none" opacity="0.45" />
        <circle cx="12" cy="12" r="4.5" stroke={colorLight} strokeWidth="0.3" fill="none" opacity="0.2" strokeDasharray="2 1.5" />
      </svg>
    );
  }

  // washer
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.45" />
      <circle cx="12" cy="12" r="9" stroke={colorLight} strokeWidth="0.4" fill="none" opacity="0.2" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" />
    </svg>
  );
};

interface InteractiveScrewsProps {
  sectionRef?: React.RefObject<HTMLElement>;
}

const InteractiveScrews = ({ sectionRef }: InteractiveScrewsProps) => {
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

    const types: Screw["type"][] = ["flathead", "phillips", "hex-bolt", "nut", "washer"];
    screwsRef.current = Array.from({ length: SCREW_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * (width - 40) + 20,
      y: Math.random() * (height - 40) + 20,
      vx: 0,
      vy: 0,
      rotation: Math.random() * 360,
      vr: 0,
      size: 8 + Math.random() * 30,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: 0.15 + Math.random() * 0.4,
    }));
    initializedRef.current = true;
    setRenderKey(k => k + 1);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => initScrews(), 100);
    window.addEventListener("resize", initScrews);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", initScrews);
    };
  }, [initScrews]);

  // Listen on the whole section so mouse works even over cards/text
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
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 5 }}
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
