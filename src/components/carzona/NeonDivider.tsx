import { forwardRef } from "react";
import { motion } from "framer-motion";

const NeonDivider = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="relative w-full z-20 isolate"
    style={{ height: 0, overflow: "visible", marginTop: -1, marginBottom: -1 }}
  >
    {/* Core bright line */}
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 right-0 top-0 h-[1px]"
      style={{
        background: "hsl(var(--accent) / 0.85)",
        boxShadow: "0 0 8px 2px hsl(var(--accent) / 0.35), 0 0 20px 4px hsl(var(--accent) / 0.12)",
      }}
    />
    {/* Pulsing glow overlay — stronger pulse */}
    <motion.div
      animate={{ opacity: [0.15, 0.9, 0.15] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[3%] right-[3%] -top-[12px] h-[26px]"
      style={{
        background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.35) 0%, transparent 70%)",
        filter: "blur(8px)",
        pointerEvents: "none",
      }}
    />
  </div>
));

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;
