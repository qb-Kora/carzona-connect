import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car } from "lucide-react";

const CarCrashCTA = memo(() => {
  const [phase, setPhase] = useState<"driving" | "crash" | "bubble">("driving");
  const [visible, setVisible] = useState(true);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("crash"), 2400);
    const t2 = setTimeout(() => setPhase("bubble"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== "bubble") return;
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

  // Desktop: container 160px, car icon 40px
  // Center = 80. Left car right edge at center: x = 80-40 = 40. Right car left edge at center: x = 80
  // Driving: small gap. Crash: touching.
  const dLeftDrive = 34;   // right edge at 74, gap of 12px
  const dLeftCrash = 40;   // right edge at 80 = center (touching)
  const dRightDrive = 86;  // left edge at 86, gap of 12px  
  const dRightCrash = 80;  // left edge at 80 = center (touching)

  // Mobile: container 110px, car icon 24px
  // Center = 55. Left: x = 55-24 = 31. Right: x = 55
  const mLeftDrive = 25;
  const mLeftCrash = 31;
  const mRightDrive = 61;
  const mRightCrash = 55;

  const driveTransition = { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] as const };
  const crashTransition = { duration: 0.12, type: "spring" as const, stiffness: 600, damping: 12 };

  return (
    <>
      {/* Desktop */}
      <div
        className="fixed bottom-8 z-50 pointer-events-none hidden md:block"
        style={{ left: "50%", marginLeft: -80, width: 160, height: 100 }}
      >
        {/* Left car — faces right */}
        <motion.div
          initial={{ x: -80 }}
          animate={phase === "driving" ? { x: dLeftDrive, rotate: 0 } : { x: dLeftCrash, rotate: 10 }}
          transition={phase === "driving" ? driveTransition : crashTransition}
          className="absolute bottom-0"
        >
          <Car size={40} className="text-primary" strokeWidth={1.5} />
        </motion.div>

        {/* Right car — faces left (scaleX -1) */}
        <motion.div
          initial={{ x: 240 }}
          animate={phase === "driving" ? { x: dRightDrive, rotate: 0 } : { x: dRightCrash, rotate: -10 }}
          transition={phase === "driving" ? driveTransition : crashTransition}
          className="absolute bottom-0"
        >
          <Car size={40} className="text-primary" style={{ transform: "scaleX(-1)" }} strokeWidth={1.5} />
        </motion.div>

        {/* Crash flash */}
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

        {/* Bubble — centered above cars */}
        <AnimatePresence>
          {phase === "bubble" && bubbleVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute pointer-events-auto cursor-pointer z-50 flex justify-center"
              style={{ top: -8, left: 0, right: 0 }}
              onClick={handleClick}
            >
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                <div
                  className="backdrop-blur-md text-accent font-bold text-base px-5 py-2 rounded-xl border-2 border-accent hover:scale-105 active:scale-95 transition-transform duration-150 whitespace-nowrap relative"
                  style={{
                    background: "hsl(var(--background) / 0.5)",
                    boxShadow: "0 0 20px hsl(var(--accent) / 0.4), 0 0 40px hsl(var(--accent) / 0.15)",
                  }}
                >
                  Pomocy!
                  <div
                    className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-r-2 border-accent rotate-45"
                    style={{ background: "hsl(var(--background) / 0.5)" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile */}
      <div
        className="fixed bottom-[70px] z-50 pointer-events-none md:hidden"
        style={{ left: "50%", marginLeft: -55, width: 110, height: 75 }}
      >
        <motion.div
          initial={{ x: -60 }}
          animate={phase === "driving" ? { x: mLeftDrive, rotate: 0 } : { x: mLeftCrash, rotate: 10 }}
          transition={phase === "driving" ? driveTransition : crashTransition}
          className="absolute bottom-0"
        >
          <Car size={24} className="text-primary" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ x: 170 }}
          animate={phase === "driving" ? { x: mRightDrive, rotate: 0 } : { x: mRightCrash, rotate: -10 }}
          transition={phase === "driving" ? driveTransition : crashTransition}
          className="absolute bottom-0"
        >
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
          {phase === "bubble" && bubbleVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute pointer-events-auto cursor-pointer z-50 flex justify-center"
              style={{ top: -4, left: 0, right: 0 }}
              onClick={handleClick}
            >
              <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                <div
                  className="backdrop-blur-md text-accent font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-accent active:scale-95 transition-transform duration-150 whitespace-nowrap relative"
                  style={{
                    background: "hsl(var(--background) / 0.5)",
                    boxShadow: "0 0 15px hsl(var(--accent) / 0.4), 0 0 30px hsl(var(--accent) / 0.15)",
                  }}
                >
                  Pomocy!
                  <div
                    className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-accent rotate-45"
                    style={{ background: "hsl(var(--background) / 0.5)" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
});

CarCrashCTA.displayName = "CarCrashCTA";

export default CarCrashCTA;
