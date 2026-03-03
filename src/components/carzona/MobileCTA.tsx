import { Phone, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const MobileCTA = () => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 glass-strong"
  >
    <div className="flex gap-2">
      <a
        href="tel:663881585"
        className="flex items-center justify-center gap-2 bg-card border border-border text-foreground flex-1 py-3.5 rounded-2xl font-semibold text-sm"
      >
        <Phone className="w-4 h-4 text-primary" />
        Zadzwoń
      </a>
      <a
        href="#kontakt"
        className="flex items-center justify-center gap-2 bg-accent text-accent-foreground flex-1 py-3.5 rounded-2xl font-bold text-sm btn-shine"
      >
        <CalendarCheck className="w-4 h-4" />
        Umów wizytę
      </a>
    </div>
  </motion.div>
);

export default MobileCTA;
