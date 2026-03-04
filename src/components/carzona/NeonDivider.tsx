import { motion } from "framer-motion";

const NeonDivider = () => (
  <div className="relative w-full h-[1px] overflow-visible">
    {/* Core line */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    {/* Glow layer with pulse */}
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[3px] -bottom-[3px] left-0 right-0 bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-sm"
    />
    {/* Wider soft glow with pulse */}
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      className="absolute -top-[8px] -bottom-[8px] left-[5%] right-[5%] bg-gradient-to-r from-transparent via-primary/15 to-transparent blur-md"
    />
  </div>
);

export default NeonDivider;
