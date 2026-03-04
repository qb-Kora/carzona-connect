import { forwardRef } from "react";

const Logo = forwardRef<HTMLSpanElement, { className?: string }>(
  ({ className = "h-10" }, ref) => (
    <span
      ref={ref}
      className={`font-[Space_Grotesk] font-extrabold tracking-tight text-accent transition-all duration-300 hover:drop-shadow-[0_0_12px_hsl(217,91%,55%)] hover:text-primary cursor-pointer ${className}`}
      style={{ fontSize: 'inherit' }}
    >
      CARZONA
    </span>
  )
);

Logo.displayName = "Logo";

export default Logo;
