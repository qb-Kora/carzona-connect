import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CarCrashCTA = () => {
  const [crashed, setCrashed] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const handleClick = () => {
    if (showBubble) {
      document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!crashed) {
      setCrashed(true);
      setTimeout(() => setShowBubble(true), 600);
    }
  };

  return (
    <section
      className="py-16 sm:py-24 overflow-hidden cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="max-w-3xl mx-auto px-4 relative flex flex-col items-center">
        {/* Cars container */}
        <div className="relative w-full h-32 sm:h-40 flex items-center justify-center">
          {/* Left car */}
          <motion.div
            initial={{ x: "-45vw", rotate: 0 }}
            animate={
              crashed
                ? { x: -10, rotate: 8, transition: { duration: 0.5, ease: "easeIn" } }
                : { x: -10, rotate: 0, transition: { duration: 2, ease: "easeInOut" } }
            }
            className="absolute text-5xl sm:text-7xl"
            style={{ filter: crashed ? "none" : "none" }}
          >
            🚗
          </motion.div>

          {/* Right car */}
          <motion.div
            initial={{ x: "45vw", rotate: 0, scaleX: -1 }}
            animate={
              crashed
                ? { x: 10, rotate: -8, scaleX: -1, transition: { duration: 0.5, ease: "easeIn" } }
                : { x: 10, rotate: 0, scaleX: -1, transition: { duration: 2, ease: "easeInOut" } }
            }
            className="absolute text-5xl sm:text-7xl"
          >
            🚗
          </motion.div>

          {/* Crash particles */}
          <AnimatePresence>
            {crashed && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1,
                      x: (Math.random() - 0.5) * 120,
                      y: (Math.random() - 0.5) * 80 - 20,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
                    className="absolute text-xl sm:text-2xl"
                  >
                    {["💥", "⚡", "✨", "🔧", "💫", "🔩"][i]}
                  </motion.div>
                ))}

                {/* Shake effect via a centered 💥 */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.8, 1.2], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="absolute text-4xl sm:text-6xl"
                >
                  💥
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Speech bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: -50 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-4 sm:-top-6 z-10"
              >
                <div className="relative bg-accent text-accent-foreground font-bold text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg shadow-accent/25 hover:scale-110 transition-transform duration-200">
                  Pomocy! 🆘
                  {/* Bubble tail */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rotate-45 rounded-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint text */}
        <AnimatePresence>
          {!crashed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2.5 }}
              className="text-muted-foreground text-xs sm:text-sm mt-4 text-center"
            >
              Kliknij, aby zobaczyć co się stanie…
            </motion.p>
          )}
        </AnimatePresence>

        {showBubble && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-xs sm:text-sm mt-8 text-center"
          >
            Kliknij „Pomocy!" aby umówić wizytę
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default CarCrashCTA;
