import { forwardRef } from "react";
import { motion } from "framer-motion";

const NeonDivider = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="relative w-full z-20 isolate"
    style={{ height: 0, overflow: "visible", marginTop: -1, marginBottom: -1 }}
  >
    {/* Core bright line — full width, slight fade only at very edges */}
    <div
      className="absolute left-0 right-0 top-0 h-[2px]"
      style={{
        background: "linear-gradient(90deg, hsl(var(--accent) / 0.05) 0%, hsl(var(--accent) / 0.7) 8%, hsl(var(--accent) / 0.9) 50%, hsl(var(--accent) / 0.7) 92%, hsl(var(--accent) / 0.05) 100%)",
        boxShadow: "0 0 8px 2px hsl(var(--accent) / 0.35), 0 0 20px 4px hsl(var(--accent) / 0.12)",
      }}
    />
    {/* Pulsing glow overlay */}
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[3%] right-[3%] -top-[10px] h-[22px]"
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
