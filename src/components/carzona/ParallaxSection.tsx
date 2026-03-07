import { useRef, memo, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { isMidOrLow } from "@/hooks/use-device-capability";

interface Props {
  children: ReactNode;
  imageUrl: string;
  className?: string;
  overlayOpacity?: number;
}

const skipParallax = isMidOrLow();

const ParallaxSection = memo(forwardRef<HTMLDivElement, Props>(({ children, imageUrl, className = "", overlayOpacity = 0.82 }, _ref) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Use smaller images on mobile, add webp format
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const optimizedUrl = imageUrl
    .replace(/w=\d+/, isMobile ? "w=800" : "w=1200")
    .replace(/q=\d+/, isMobile ? "q=60" : "q=75")
    + (imageUrl.includes("&fm=") ? "" : "&fm=webp");

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background image — skip parallax transform on mobile */}
      {skipParallax ? (
        <div className="absolute inset-0">
          <img
            src={optimizedUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={isMobile ? 800 : 1200}
            height={isMobile ? 450 : 675}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-[12%] -bottom-[12%]"
        >
          <img
            src={optimizedUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

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
}));

ParallaxSection.displayName = "ParallaxSection";

export default ParallaxSection;