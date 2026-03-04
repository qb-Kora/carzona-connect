import { forwardRef } from "react";
import { motion } from "framer-motion";

const NeonDivider = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="relative w-full z-20 isolate"
    style={{ height: 0, overflow: "visible", marginTop: -1, marginBottom: -1 }}
  >
    {/* Core bright line */}
    <div
      className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      style={{ boxShadow: "0 0 6px 1px hsl(var(--accent) / 0.4), 0 0 16px 4px hsl(var(--accent) / 0.15)" }}
    />
    {/* Pulsing glow overlay */}
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[5%] right-[5%] -top-[10px] h-[22px]"
      style={{
        background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.25) 0%, transparent 70%)",
        filter: "blur(6px)",
        pointerEvents: "none",
      }}
    />
  </div>
));

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;
