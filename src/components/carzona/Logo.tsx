const Logo = ({ className = "h-10" }: { className?: string }) => (
  <svg
    viewBox="0 0 280 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="CARZONA Q Service"
  >
    {/* Blue rounded background */}
    <rect width="280" height="60" rx="10" fill="hsl(220, 60%, 30%)" />

    {/* Q icon */}
    <g transform="translate(10, 5)">
      {/* Q circle */}
      <circle cx="25" cy="25" r="18" stroke="hsl(84, 70%, 45%)" strokeWidth="6" fill="none" />
      {/* Q tail */}
      <path d="M35 35 L48 48" stroke="hsl(84, 70%, 45%)" strokeWidth="6" strokeLinecap="round" />
    </g>

    {/* SERVICE text */}
    <text
      x="62"
      y="28"
      fontFamily="'Space Grotesk', sans-serif"
      fontWeight="700"
      fontSize="13"
      fill="white"
      letterSpacing="1.5"
    >
      SERVICE
    </text>

    {/* CARZONA text */}
    <text
      x="62"
      y="48"
      fontFamily="'Space Grotesk', sans-serif"
      fontWeight="800"
      fontSize="18"
      fill="hsl(84, 70%, 45%)"
      letterSpacing="2"
    >
      CARZONA
    </text>
  </svg>
);

export default Logo;
