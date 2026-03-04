import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  imageUrl: string;
  className?: string;
  overlayOpacity?: number;
}

const ParallaxSection = ({ children, imageUrl, className = "", overlayOpacity = 0.82 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[30%] -bottom-[30%]"
      >
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, hsl(var(--background) / ${overlayOpacity}) 0%, hsl(var(--background) / ${overlayOpacity * 0.95}) 50%, hsl(var(--background) / ${overlayOpacity}) 100%)` }}
      />

      {/* Subtle accent glow on parallax sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
