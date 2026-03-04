import { forwardRef } from "react";
import { motion } from "framer-motion";

const NeonDivider = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="relative w-full z-10" style={{ height: 20 }}>
    {/* Core line */}
    <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
    {/* Glow layer with pulse */}
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"
    />
    {/* Wider soft glow with pulse */}
    <motion.div
      animate={{ opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      className="absolute left-[3%] right-[3%] top-1/2 -translate-y-1/2 h-[20px] bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-md"
    />
  </div>
));

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;
