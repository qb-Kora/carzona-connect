import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CarCrashCTA = () => {
  const [phase, setPhase] = useState<"driving" | "crash" | "bubble">("driving");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("crash"), 2800);
    const t2 = setTimeout(() => setPhase("bubble"), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClick = () => {
    if (phase === "bubble") {
      document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 pointer-events-none"
      style={{ height: 80 }}
    >
      {/* Left car */}
      <motion.div
        initial={{ x: "-100px" }}
        animate={
          phase === "driving"
            ? { x: "calc(50vw - 60px)", rotate: 0 }
            : { x: "calc(50vw - 35px)", rotate: 12 }
        }
        transition={
          phase === "driving"
            ? { duration: 2.8, ease: [0.25, 0.1, 0.25, 1] }
            : { duration: 0.15, ease: "easeOut" }
        }
        className="absolute bottom-2 text-4xl sm:text-5xl"
      >
        🚗
      </motion.div>

      {/* Right car */}
      <motion.div
        initial={{ x: "calc(100vw + 50px)" }}
        animate={
          phase === "driving"
            ? { x: "calc(50vw + 10px)", rotate: 0, scaleX: -1 }
            : { x: "calc(50vw - 15px)", rotate: -12, scaleX: -1 }
        }
        transition={
          phase === "driving"
            ? { duration: 2.8, ease: [0.25, 0.1, 0.25, 1] }
            : { duration: 0.15, ease: "easeOut" }
        }
        className="absolute bottom-2 text-4xl sm:text-5xl"
      >
        🚗
      </motion.div>

      {/* Crash effect */}
      <AnimatePresence>
        {(phase === "crash" || phase === "bubble") && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 1.2], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl"
          >
            💥
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {(phase === "crash" || phase === "bubble") &&
          ["⚡", "✨", "🔧", "💫", "🔩"].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0, x: "50vw", y: 40 }}
              animate={{
                opacity: 0,
                scale: 1,
                x: `calc(50vw + ${(i - 2) * 40}px)`,
                y: 40 - 30 - Math.random() * 40,
              }}
              transition={{ duration: 0.7, delay: i * 0.04 }}
              className="absolute text-lg sm:text-xl"
            >
              {e}
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {phase === "bubble" && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -30 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer z-50"
            onClick={handleClick}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-accent text-accent-foreground font-bold text-sm sm:text-lg px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl shadow-lg shadow-accent/30 hover:scale-110 active:scale-95 transition-transform duration-150 whitespace-nowrap">
                Pomocy! 🆘
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rotate-45 rounded-sm" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarCrashCTA;
