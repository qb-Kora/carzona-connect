import { forwardRef } from "react";
import { motion } from "framer-motion";

const NeonDivider = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="relative w-full z-20" style={{ height: 2 }}>
    {/* Core bright line */}
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
    {/* Close glow */}
    <motion.div
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[12px] bg-gradient-to-r from-transparent via-accent/35 to-transparent"
      style={{ filter: "blur(4px)" }}
    />
    {/* Wide soft glow */}
    <motion.div
      animate={{ opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      className="absolute left-[2%] right-[2%] top-1/2 -translate-y-1/2 h-[24px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
      style={{ filter: "blur(8px)" }}
    />
  </div>
));

NeonDivider.displayName = "NeonDivider";

export default NeonDivider;
