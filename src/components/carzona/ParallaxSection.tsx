import { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  imageUrl: string;
  className?: string;
  overlayOpacity?: number;
}

const ParallaxSection = memo(({ children, imageUrl, className = "", overlayOpacity = 0.82 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background image with dimensions for CLS */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[12%] -bottom-[12%]"
      >
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, hsl(var(--background) / ${overlayOpacity}) 0%, hsl(var(--background) / ${overlayOpacity * 0.95}) 50%, hsl(var(--background) / ${overlayOpacity}) 100%)` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

ParallaxSection.displayName = "ParallaxSection";

export default ParallaxSection;