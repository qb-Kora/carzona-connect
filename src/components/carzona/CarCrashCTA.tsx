import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car } from "lucide-react";

const CarCrashCTA = memo(() => {
  const [phase, setPhase] = useState<"driving" | "crash" | "merged">("driving");
  const [visible, setVisible] = useState(true);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("crash"), 2400);
    const t2 = setTimeout(() => setPhase("merged"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== "merged") return;
    setBubbleVisible(true);
    const interval = setInterval(() => {
      setBubbleVisible(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]);

  const handleClick = useCallback(() => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
    setVisible(false);
  }, []);

  if (!visible) return null;

  const driveTransition = { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] as const };
  const crashTransition = { duration: 0.12, type: "spring" as const, stiffness: 600, damping: 12 };
  const mergeTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  const dLeftDrive = 34;
  const dLeftCrash = 42;
  const dLeftMerge = 45;
  const dRightDrive = 86;
  const dRightCrash = 78;
  const dRightMerge = 75;

  const mLeftDrive = 25;
  const mLeftCrash = 33;
  const mLeftMerge = 35;
  const mRightDrive = 61;
  const mRightCrash = 53;
  const mRightMerge = 51;

  const getDesktopLeftAnim = () => {
    if (phase === "driving") return { x: dLeftDrive, rotate: 0 };
    if (phase === "crash") return { x: dLeftCrash, rotate: 6 };
    return { x: dLeftMerge, rotate: 8 };
  };
  const getDesktopRightAnim = () => {
    if (phase === "driving") return { x: dRightDrive, rotate: 0 };
    if (phase === "crash") return { x: dRightCrash, rotate: -6 };
    return { x: dRightMerge, rotate: -8 };
  };
  const getMobileLeftAnim = () => {
    if (phase === "driving") return { x: mLeftDrive, rotate: 0 };
    if (phase === "crash") return { x: mLeftCrash, rotate: 6 };
    return { x: mLeftMerge, rotate: 8 };
  };
  const getMobileRightAnim = () => {
    if (phase === "driving") return { x: mRightDrive, rotate: 0 };
    if (phase === "crash") return { x: mRightCrash, rotate: -6 };
    return { x: mRightMerge, rotate: -8 };
  };

  const getTransition = () => {
    if (phase === "driving") return driveTransition;
    if (phase === "crash") return crashTransition;
    return mergeTransition;
  };

  const BubbleContent = ({ size = "base" }: { size?: "base" | "sm" }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="absolute pointer-events-auto cursor-pointer z-50 flex justify-center"
      style={{ top: size === "sm" ? -4 : -8, left: 0, right: 0 }}
      onClick={handleClick}
    >
      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
        <div
          className={`backdrop-blur-md text-accent font-bold ${size === "sm" ? "text-xs px-3 py-1.5 rounded-lg" : "text-base px-5 py-2 rounded-xl"} border-2 border-accent active:scale-95 transition-transform duration-150 whitespace-nowrap relative touch-manipulation`}
          style={{
            background: "hsl(var(--background) / 0.5)",
            boxShadow: `0 0 ${size === "sm" ? "15" : "20"}px hsl(var(--accent) / 0.4), 0 0 ${size === "sm" ? "30" : "40"}px hsl(var(--accent) / 0.15)`,
          }}
        >
          Pomocy!
          <div
            className={`absolute -bottom-[${size === "sm" ? "6" : "7"}px] left-1/2 -translate-x-1/2 ${size === "sm" ? "w-2 h-2" : "w-3 h-3"} border-b-2 border-r-2 border-accent rotate-45`}
            style={{ background: "hsl(var(--background) / 0.5)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop */}
      <div
        className="fixed bottom-8 z-50 pointer-events-none hidden md:block"
        style={{ left: "50%", marginLeft: -80, width: 160, height: 100 }}
      >
        <motion.div initial={{ x: -80 }} animate={getDesktopLeftAnim()} transition={getTransition()} className="absolute bottom-0">
          <Car size={40} className="text-primary" strokeWidth={1.5} />
        </motion.div>
        <motion.div initial={{ x: 240 }} animate={getDesktopRightAnim()} transition={getTransition()} className="absolute bottom-0">
          <Car size={40} className="text-primary" style={{ transform: "scaleX(-1)" }} strokeWidth={1.5} />
        </motion.div>
        <AnimatePresence>
          {phase !== "driving" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0.8], opacity: [0, 1, 0] }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-2 text-3xl"
              style={{ left: 80, transform: "translateX(-50%)" }}
            >💥</motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase === "merged" && bubbleVisible && <BubbleContent />}
        </AnimatePresence>
      </div>

      {/* Mobile */}
      <div
        className="fixed bottom-[70px] z-50 pointer-events-none md:hidden"
        style={{ left: "50%", marginLeft: -55, width: 110, height: 75 }}
      >
        <motion.div initial={{ x: -60 }} animate={getMobileLeftAnim()} transition={getTransition()} className="absolute bottom-0">
          <Car size={24} className="text-primary" strokeWidth={1.5} />
        </motion.div>
        <motion.div initial={{ x: 170 }} animate={getMobileRightAnim()} transition={getTransition()} className="absolute bottom-0">
          <Car size={24} className="text-primary" style={{ transform: "scaleX(-1)" }} strokeWidth={1.5} />
        </motion.div>
        <AnimatePresence>
          {phase !== "driving" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 0.6], opacity: [0, 1, 0] }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-1 text-xl"
              style={{ left: 55, transform: "translateX(-50%)" }}
            >💥</motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase === "merged" && bubbleVisible && <BubbleContent size="sm" />}
        </AnimatePresence>
      </div>
    </>
  );
});

CarCrashCTA.displayName = "CarCrashCTA";

export default CarCrashCTA;
