import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car } from "lucide-react";

const CarCrashCTA = () => {
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

  return (
    <>
      {/* Desktop */}
      <div className="fixed bottom-8 left-0 right-0 z-50 pointer-events-none hidden md:block" style={{ height: 100 }}>
        {/* Left car — blue, facing right */}
        <motion.div
          initial={{ x: "-80px" }}
          animate={phase === "driving" ? { x: "calc(50vw - 50px)", rotate: 0 } : { x: "calc(50vw - 35px)", rotate: 10 }}
          transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
          className="absolute bottom-3"
        >
          <Car size={40} className="text-primary" style={{ transform: "scaleX(-1)" }} strokeWidth={1.5} />
        </motion.div>

        {/* Right car — blue, facing left */}
        <motion.div
          initial={{ x: "calc(100vw + 40px)" }}
          animate={phase === "driving" ? { x: "calc(50vw + 10px)", rotate: 0 } : { x: "calc(50vw - 5px)", rotate: -10 }}
          transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
          className="absolute bottom-3"
        >
          <Car size={40} className="text-primary" strokeWidth={1.5} />
        </motion.div>

        {/* Crash flash */}
        <AnimatePresence>
          {phase !== "driving" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0.8], opacity: [0, 1, 0] }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-3xl"
            >💥</motion.div>
          )}
        </AnimatePresence>

        {/* Particles */}
        <AnimatePresence>
          {phase !== "driving" && ["⚡", "✨", "🔩"].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0, x: "calc(50vw - 8px)", y: 40 }}
              animate={{ opacity: 0, scale: 1.2, x: `calc(50vw + ${(i - 1) * 35}px)`, y: 10 - Math.random() * 30 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="absolute text-base"
            >{e}</motion.div>
          ))}
        </AnimatePresence>

        {/* Bubble */}
        <AnimatePresence>
          {phase === "bubble" && bubbleVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute bottom-[55px] pointer-events-auto cursor-pointer z-50"
              style={{ left: "calc(50vw - 55px)" }}
              onClick={handleClick}
            >
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                <div className="bg-background/60 backdrop-blur-sm text-accent font-bold text-base px-5 py-2 rounded-xl border-2 border-accent shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-transform duration-150 whitespace-nowrap relative">
                  Pomocy!
                  <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-background/60 border-b-2 border-r-2 border-accent rotate-45" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile */}
      <div className="fixed bottom-[70px] left-0 right-0 z-50 pointer-events-none md:hidden" style={{ height: 60 }}>
        {/* Left car — blue */}
        <motion.div
          initial={{ x: "-40px" }}
          animate={phase === "driving" ? { x: "calc(50vw - 30px)", rotate: 0 } : { x: "calc(50vw - 20px)", rotate: 10 }}
          transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
          className="absolute bottom-1"
        >
          <Car size={24} className="text-primary" style={{ transform: "scaleX(-1)" }} strokeWidth={1.5} />
        </motion.div>

        {/* Right car — blue */}
        <motion.div
          initial={{ x: "calc(100vw + 30px)" }}
          animate={phase === "driving" ? { x: "calc(50vw + 6px)", rotate: 0 } : { x: "calc(50vw - 2px)", rotate: -10 }}
          transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
          className="absolute bottom-1"
        >
          <Car size={24} className="text-primary" strokeWidth={1.5} />
        </motion.div>

        {/* Crash flash */}
        <AnimatePresence>
          {phase !== "driving" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 0.6], opacity: [0, 1, 0] }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xl"
            >💥</motion.div>
          )}
        </AnimatePresence>

        {/* Particles */}
        <AnimatePresence>
          {phase !== "driving" && ["⚡", "✨"].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0, x: "calc(50vw - 6px)", y: 25 }}
              animate={{ opacity: 0, scale: 1, x: `calc(50vw + ${(i === 0 ? -18 : 18)}px)`, y: 5 - Math.random() * 15 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="absolute text-xs"
            >{e}</motion.div>
          ))}
        </AnimatePresence>

        {/* Bubble */}
        <AnimatePresence>
          {phase === "bubble" && bubbleVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute bottom-[32px] pointer-events-auto cursor-pointer z-50"
              style={{ left: "calc(50vw - 38px)" }}
              onClick={handleClick}
            >
              <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                <div className="bg-background/60 backdrop-blur-sm text-accent font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-accent shadow-lg shadow-accent/20 active:scale-95 transition-transform duration-150 whitespace-nowrap relative">
                  Pomocy!
                  <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-background/60 border-b-2 border-r-2 border-accent rotate-45" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CarCrashCTA;
