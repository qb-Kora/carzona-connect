import { memo, forwardRef } from "react";

interface NeonDividerProps {
  direction?: "top" | "bottom" | "both";
  color?: "accent" | "primary";
}

/**
 * Pure CSS neon divider — no JS animation, keyframes in index.css.
 */
const NeonDivider = memo(forwardRef<HTMLDivElement, NeonDividerProps>(({ direction = "both", color = "accent" }, ref) => {
  const showTop = direction === "top" || direction === "both";
  const showBottom = direction === "bottom" || direction === "both";
  const cssVar = color === "primary" ? "--primary" : "--accent";

  return (
    <div
      ref={ref}
      className="relative w-full z-20 isolate"
      style={{ height: 0, overflow: "visible", marginTop: -1, marginBottom: -1 }}
      aria-hidden="true"
    >
      {/* Core bright line */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] neon-divider-line"
        style={{
          background: `hsl(var(${cssVar}) / 0.7)`,
          boxShadow: [
            showTop ? `0 -1px 3px 1px hsl(var(${cssVar}) / 0.15), 0 -2px 8px 1px hsl(var(${cssVar}) / 0.05)` : "",
            showBottom ? `0 1px 3px 1px hsl(var(${cssVar}) / 0.15), 0 2px 8px 1px hsl(var(${cssVar}) / 0.05)` : "",
          ].filter(Boolean).join(", "),
        }}
      />
      {/* Top glow */}
      {showTop && (
        <div
          className="absolute left-[10%] right-[10%] h-[10px] neon-divider-glow"
          style={{
            top: "-10px",
            background: `radial-gradient(ellipse at center, hsl(var(${cssVar}) / 0.15) 0%, transparent 70%)`,
            filter: "blur(3px)",
            pointerEvents: "none",
          }}
        />
      )}
      {/* Bottom glow */}
      {showBottom && (
        <div
          className="absolute left-[10%] right-[10%] h-[10px] neon-divider-glow"
          style={{
            top: "0px",
            background: `radial-gradient(ellipse at center, hsl(var(${cssVar}) / 0.15) 0%, transparent 70%)`,
            filter: "blur(3px)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}));

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;
