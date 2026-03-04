import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CarCrashCTA = () => {
  const [phase, setPhase] = useState<"driving" | "crash" | "bubble">("driving");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("crash"), 2400);
    const t2 = setTimeout(() => setPhase("bubble"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClick = useCallback(() => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-0 right-0 z-50 pointer-events-none" style={{ height: 120 }}>
      {/* Left car – heading right → (default emoji faces left, so flip it) */}
      <motion.div
        initial={{ x: "-80px" }}
        animate={
          phase === "driving"
            ? { x: "calc(50vw - 55px)", rotate: 0 }
            : { x: "calc(50vw - 40px)", rotate: 12 }
        }
        transition={
          phase === "driving"
            ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] }
            : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }
        }
        className="absolute bottom-3"
        style={{ fontSize: "2.5rem", lineHeight: 1 }}
      >
        <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>🚗</span>
      </motion.div>

      {/* Right car – heading left ← (default emoji faces left, no flip needed) */}
      <motion.div
        initial={{ x: "calc(100vw + 40px)" }}
        animate={
          phase === "driving"
            ? { x: "calc(50vw + 5px)", rotate: 0 }
            : { x: "calc(50vw - 10px)", rotate: -12 }
        }
        transition={
          phase === "driving"
            ? { duration: 2.4, ease: [0.22, 0.68, 0.36, 1] }
            : { duration: 0.12, type: "spring", stiffness: 600, damping: 12 }
        }
        className="absolute bottom-3"
        style={{ fontSize: "2.5rem", lineHeight: 1 }}
      >
        🚗
      </motion.div>

      {/* Crash flash */}
      <AnimatePresence>
        {phase !== "driving" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.8, 0.8], opacity: [0, 1, 0] }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2"
            style={{ fontSize: "2.2rem" }}
          >
            💥
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {phase !== "driving" &&
          ["⚡", "✨", "🔩"].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0, x: "calc(50vw - 8px)", y: 50 }}
              animate={{
                opacity: 0,
                scale: 1.2,
                x: `calc(50vw + ${(i - 1) * 35}px)`,
                y: 10 - Math.random() * 30,
              }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="absolute text-base"
            >
              {e}
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {phase === "bubble" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute bottom-[55px] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer z-50"
            onClick={handleClick}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            >
              <div className="bg-accent text-accent-foreground font-bold text-sm sm:text-base px-5 py-2 rounded-xl shadow-lg shadow-accent/30 hover:scale-105 active:scale-95 transition-transform duration-150 whitespace-nowrap relative">
                Pomocy! 🆘
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rotate-45" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarCrashCTA;
