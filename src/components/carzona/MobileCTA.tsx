import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const MobileCTA = () => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 glass-strong"
  >
    <a
      href="tel:663881585"
      className="flex items-center justify-center gap-3 bg-accent text-accent-foreground w-full py-4 rounded-2xl font-bold text-base btn-shine"
    >
      <Phone className="w-5 h-5" />
      Zadzwoń teraz — 663 881 585
    </a>
  </motion.div>
);

export default MobileCTA;
