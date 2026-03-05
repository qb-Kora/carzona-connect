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
      animate={{ opacity: [0.6, 0.85, 0.6] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 right-0 top-0 h-[1px]"
      style={{
        background: "hsl(var(--accent) / 0.7)",
        boxShadow: "0 0 4px 1px hsl(var(--accent) / 0.2), 0 0 10px 2px hsl(var(--accent) / 0.06)",
      }}
    />
    {/* Pulsing glow overlay — tighter spread */}
    <motion.div
      animate={{ opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[10%] right-[10%] -top-[6px] h-[13px]"
      style={{
        background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.2) 0%, transparent 70%)",
        filter: "blur(4px)",
        pointerEvents: "none",
      }}
    />
  </div>
));

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;
