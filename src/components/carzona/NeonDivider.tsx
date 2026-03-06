import { memo, forwardRef } from "react";

interface NeonDividerProps {
  direction?: "top" | "bottom" | "both";
  color?: "accent" | "primary";
}

/**
 * Pure CSS neon divider — no JS animation runtime cost.
 * Uses CSS @keyframes for the flicker effect.
 */
const NeonDivider = memo(forwardRef<HTMLDivElement, NeonDividerProps>(({ direction = "both" }, ref) => {
  const showTop = direction === "top" || direction === "both";
  const showBottom = direction === "bottom" || direction === "both";

  return (
    <div
      ref={ref}
      className="relative w-full z-20 isolate"
      style={{ height: 0, overflow: "visible", marginTop: -1, marginBottom: -1 }}
      aria-hidden="true"
    >
      {/* Core bright line */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px]"
        style={{
          background: "hsl(var(--accent) / 0.7)",
          boxShadow: [
            showTop ? "0 -1px 3px 1px hsl(var(--accent) / 0.15), 0 -2px 8px 1px hsl(var(--accent) / 0.05)" : "",
            showBottom ? "0 1px 3px 1px hsl(var(--accent) / 0.15), 0 2px 8px 1px hsl(var(--accent) / 0.05)" : "",
          ].filter(Boolean).join(", "),
          animation: "neon-divider-flicker 3s ease-in-out infinite",
        }}
      />
      {/* Top glow */}
      {showTop && (
        <div
          className="absolute left-[10%] right-[10%] h-[10px]"
          style={{
            top: "-10px",
            background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
            filter: "blur(3px)",
            pointerEvents: "none",
            animation: "neon-divider-glow 3s ease-in-out infinite",
          }}
        />
      )}
      {/* Bottom glow */}
      {showBottom && (
        <div
          className="absolute left-[10%] right-[10%] h-[10px]"
          style={{
            top: "0px",
            background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
            filter: "blur(3px)",
            pointerEvents: "none",
            animation: "neon-divider-glow 3s ease-in-out infinite",
          }}
        />
      )}

      <style>{`
        @keyframes neon-divider-flicker {
          0%, 100% { opacity: 0.5; }
          15% { opacity: 0.9; }
          30% { opacity: 0.65; }
          50% { opacity: 0.85; }
          70% { opacity: 0.5; }
        }
        @keyframes neon-divider-glow {
          0%, 100% { opacity: 0.12; }
          25% { opacity: 0.32; }
          50% { opacity: 0.18; }
          75% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}));

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;