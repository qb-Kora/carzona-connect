import { useState, useEffect } from "react";

const GarageDoorLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "lifting" | "done">("loading");

  useEffect(() => {
    // Wait for page resources, then lift the door
    const minDelay = setTimeout(() => {
      setPhase("lifting");
    }, 1800);

    return () => clearTimeout(minDelay);
  }, []);

  useEffect(() => {
    if (phase === "lifting") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-auto"
      aria-hidden="true"
    >
      {/* Dark workshop behind the door */}
      <div className="absolute inset-0 bg-[hsl(228,18%,3%)]" />

      {/* Garage door panels */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          transform: phase === "lifting" ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Door panels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 relative"
            style={{
              background: `linear-gradient(180deg, 
                hsl(228, 14%, ${11 + i * 1.5}%) 0%, 
                hsl(228, 14%, ${8 + i * 1.5}%) 45%,
                hsl(228, 14%, ${6 + i * 1.5}%) 50%,
                hsl(228, 14%, ${9 + i * 1.5}%) 55%,
                hsl(228, 14%, ${11 + i * 1.5}%) 100%)`,
              borderBottom: "2px solid hsl(228, 12%, 5%)",
              borderTop: i === 0 ? "none" : "1px solid hsl(228, 12%, 16%)",
            }}
          >
            {/* Metallic horizontal line */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent 5%, hsl(220, 12%, 20%) 20%, hsl(220, 12%, 25%) 50%, hsl(220, 12%, 20%) 80%, transparent 95%)",
              }}
            />
            {/* Panel emboss highlight */}
            <div
              className="absolute inset-x-0 top-0 h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(220,15%,22%) 30%, hsl(220,15%,22%) 70%, transparent)",
                opacity: 0.5,
              }}
            />
          </div>
        ))}

        {/* Bottom rubber seal */}
        <div
          className="h-3 flex-shrink-0"
          style={{
            background: "linear-gradient(180deg, hsl(228,14%,6%) 0%, hsl(228,14%,4%) 100%)",
            borderTop: "1px solid hsl(228,12%,10%)",
          }}
        />

        {/* Center content on the door */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          {/* Logo / brand */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="text-3xl sm:text-4xl font-bold tracking-wider"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "hsl(var(--accent))",
                textShadow: "0 0 20px hsl(var(--accent) / 0.4), 0 0 40px hsl(var(--accent) / 0.15)",
              }}
            >
              CARZONA
            </div>
            <div
              className="text-xs sm:text-sm tracking-[0.3em] uppercase"
              style={{
                color: "hsl(var(--muted-foreground))",
                letterSpacing: "0.3em",
              }}
            >
              Auto Serwis
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex flex-col items-center gap-3 mt-4">
            {/* Animated progress bar */}
            <div
              className="w-48 h-[2px] rounded-full overflow-hidden"
              style={{ background: "hsl(var(--border))" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))`,
                  animation: "garage-progress 1.8s ease-in-out forwards",
                  transformOrigin: "left",
                }}
              />
            </div>
            <span
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em]"
              style={{
                color: "hsl(var(--muted-foreground) / 0.6)",
                animation: "garage-pulse 1.2s ease-in-out infinite",
              }}
            >
              Otwieranie warsztatu...
            </span>
          </div>
        </div>
      </div>

      {/* Door frame sides */}
      <div
        className="absolute top-0 bottom-0 left-0 w-3 sm:w-4"
        style={{
          background: "linear-gradient(90deg, hsl(228,14%,6%), hsl(228,14%,10%))",
          borderRight: "1px solid hsl(228,12%,14%)",
          transform: phase === "lifting" ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-3 sm:w-4"
        style={{
          background: "linear-gradient(270deg, hsl(228,14%,6%), hsl(228,14%,10%))",
          borderLeft: "1px solid hsl(228,12%,14%)",
          transform: phase === "lifting" ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Light spill from underneath as door lifts */}
      {phase === "lifting" && (
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "40%",
            background: "linear-gradient(0deg, hsl(var(--accent) / 0.06) 0%, transparent 100%)",
            animation: "garage-light-spill 1s ease-out forwards",
          }}
        />
      )}
    </div>
  );
};

export default GarageDoorLoader;
