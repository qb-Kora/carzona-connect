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
      <div className="fixed bottom-8 z-50 pointer-events-none hidden md:flex items-end justify-center left-1/2 -translate-x-1/2" style={{ height: 120 }}>
        {/* Container for centered cars */}
        <div className="relative" style={{ width: 100, height: 60 }}>
          {/* Left car — facing right */}
          <motion.div
            initial={{ x: -120 }}
            animate={phase === "driving" ? { x: 0, rotate: 0 } : { x: 15, rotate: 10 }}
            transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
            className="absolute bottom-0 left-0"
          >
            <Car size={40} className="text-primary" strokeWidth={1.5} />
          </motion.div>

          {/* Right car — facing left */}
          <motion.div
            initial={{ x: 220 }}
            animate={phase === "driving" ? { x: 60, rotate: 0 } : { x: 45, rotate: -10 }}
            transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
            className="absolute bottom-0 left-0"
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
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl"
              >💥</motion.div>
            )}
          </AnimatePresence>

          {/* Particles */}
          <AnimatePresence>
            {phase !== "driving" && ["⚡", "✨", "🔩"].map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 42, y: 20 }}
                animate={{ opacity: 0, scale: 1.2, x: 42 + (i - 1) * 35, y: -10 - Math.random() * 30 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="absolute text-base"
              >{e}</motion.div>
            ))}
          </AnimatePresence>

          {/* Bubble — above cars */}
          <AnimatePresence>
            {phase === "bubble" && bubbleVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-[50px] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer z-50"
                onClick={handleClick}
              >
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                  <div
                    className="backdrop-blur-md text-accent font-bold text-base px-5 py-2 rounded-xl border-2 border-accent hover:scale-105 active:scale-95 transition-transform duration-150 whitespace-nowrap relative"
                    style={{
                      background: "hsl(var(--background) / 0.5)",
                      boxShadow: "0 0 20px hsl(var(--accent) / 0.4), 0 0 40px hsl(var(--accent) / 0.15), inset 0 0 15px hsl(var(--accent) / 0.05)",
                      textShadow: "0 0 10px hsl(var(--accent) / 0.5)",
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
      </div>

      {/* Mobile */}
      <div className="fixed bottom-[70px] z-50 pointer-events-none md:hidden flex items-end justify-center left-1/2 -translate-x-1/2" style={{ height: 80 }}>
        <div className="relative" style={{ width: 70, height: 40 }}>
          {/* Left car */}
          <motion.div
            initial={{ x: -80 }}
            animate={phase === "driving" ? { x: 0, rotate: 0 } : { x: 10, rotate: 10 }}
            transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
            className="absolute bottom-0 left-0"
          >
            <Car size={24} className="text-primary" strokeWidth={1.5} />
          </motion.div>

          {/* Right car */}
          <motion.div
            initial={{ x: 150 }}
            animate={phase === "driving" ? { x: 46, rotate: 0 } : { x: 36, rotate: -10 }}
            transition={phase === "driving" ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] } : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }}
            className="absolute bottom-0 left-0"
          >
            <Car size={24} className="text-primary" style={{ transform: "scaleX(-1)" }} strokeWidth={1.5} />
          </motion.div>

          {/* Crash flash */}
          <AnimatePresence>
            {phase !== "driving" && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 0.6], opacity: [0, 1, 0] }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xl"
              >💥</motion.div>
            )}
          </AnimatePresence>

          {/* Particles */}
          <AnimatePresence>
            {phase !== "driving" && ["⚡", "✨"].map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 30, y: 15 }}
                animate={{ opacity: 0, scale: 1, x: 30 + (i === 0 ? -18 : 18), y: -10 - Math.random() * 15 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="absolute text-xs"
              >{e}</motion.div>
            ))}
          </AnimatePresence>

          {/* Bubble — above cars */}
          <AnimatePresence>
            {phase === "bubble" && bubbleVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-[40px] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer z-50"
                onClick={handleClick}
              >
                <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                  <div
                    className="backdrop-blur-md text-accent font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-accent active:scale-95 transition-transform duration-150 whitespace-nowrap relative"
                    style={{
                      background: "hsl(var(--background) / 0.5)",
                      boxShadow: "0 0 15px hsl(var(--accent) / 0.4), 0 0 30px hsl(var(--accent) / 0.15), inset 0 0 10px hsl(var(--accent) / 0.05)",
                      textShadow: "0 0 8px hsl(var(--accent) / 0.5)",
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
      </div>
    </>
  );
};

export default CarCrashCTA;
