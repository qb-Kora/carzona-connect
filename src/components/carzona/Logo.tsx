import { forwardRef } from "react";

const Logo = forwardRef<HTMLSpanElement, { className?: string }>(
  ({ className = "h-10" }, ref) => (
    <span
      ref={ref}
      className={`font-[Space_Grotesk] font-extrabold tracking-tight text-accent ${className}`}
      style={{ fontSize: 'inherit' }}
    >
      CARZONA
    </span>
  )
);

Logo.displayName = "Logo";

export default Logo;
