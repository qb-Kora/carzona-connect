const Logo = ({ className = "h-10" }: { className?: string }) => (
  <span
    className={`font-[Space_Grotesk] font-extrabold tracking-tight text-accent ${className}`}
    style={{ fontSize: 'inherit' }}
  >
    CARZONA
  </span>
);

export default Logo;
