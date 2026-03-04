const NeonDivider = () => (
  <div className="relative w-full h-px">
    {/* Core line */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    {/* Glow layer */}
    <div className="absolute -top-1 -bottom-1 left-0 right-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
    {/* Wider soft glow */}
    <div className="absolute -top-3 -bottom-3 left-[10%] right-[10%] bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-md" />
  </div>
);

export default NeonDivider;
