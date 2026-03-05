import { forwardRef } from "react";
import { motion } from "framer-motion";

interface NeonDividerProps {
  direction?: "top" | "bottom" | "both";
}

const NeonDivider = forwardRef<HTMLDivElement, NeonDividerProps>(
  ({ direction = "both" }, ref) => {
    const showTop = direction === "top" || direction === "both";
    const showBottom = direction === "bottom" || direction === "both";

    return (
      <div
        ref={ref}
        className="relative w-full z-20 isolate"
        style={{ height: 0, overflow: "visible", marginTop: -1, marginBottom: -1 }}
      >
        {/* Core bright line */}
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.65, 0.85, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 right-0 top-0 h-[1px]"
          style={{
            background: "hsl(var(--accent) / 0.7)",
            boxShadow: [
              showTop ? "0 -1px 3px 1px hsl(var(--accent) / 0.15), 0 -2px 8px 1px hsl(var(--accent) / 0.05)" : "",
              showBottom ? "0 1px 3px 1px hsl(var(--accent) / 0.15), 0 2px 8px 1px hsl(var(--accent) / 0.05)" : "",
            ].filter(Boolean).join(", "),
          }}
        />
        {/* Top glow */}
        {showTop && (
          <motion.div
            animate={{ opacity: [0.12, 0.32, 0.18, 0.3, 0.12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] right-[10%] h-[10px]"
            style={{
              top: "-10px",
              background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
              filter: "blur(3px)",
              pointerEvents: "none",
            }}
          />
        )}
        {/* Bottom glow */}
        {showBottom && (
          <motion.div
            animate={{ opacity: [0.12, 0.32, 0.18, 0.3, 0.12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] right-[10%] h-[10px]"
            style={{
              top: "0px",
              background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
              filter: "blur(3px)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    );
  }
);

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;
