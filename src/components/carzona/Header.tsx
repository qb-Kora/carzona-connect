import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Dlaczego my", href: "#dlaczego" },
  { label: "Opinie", href: "#opinie" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

const Header = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <style>{`
        .nav-neon {
          color: hsl(var(--accent));
          text-shadow: 0 0 8px hsl(var(--accent) / 0.5), 0 0 20px hsl(var(--accent) / 0.2);
          transition: color 0.3s, text-shadow 0.3s;
          position: relative;
          animation: nav-neon-flicker 3.5s ease-in-out infinite;
        }
        .nav-neon::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: hsl(var(--accent));
          box-shadow: 0 0 6px hsl(var(--accent) / 0.8), 0 0 14px hsl(var(--accent) / 0.4);
          transition: width 0.3s ease;
        }
        .nav-neon:hover {
          color: hsl(var(--primary));
          text-shadow: 0 0 10px hsl(var(--primary) / 0.6), 0 0 25px hsl(var(--primary) / 0.3), 0 0 50px hsl(var(--primary) / 0.1);
          animation: none;
        }
        .nav-neon:hover::after {
          width: 100%;
          background: hsl(var(--accent));
          box-shadow: 0 0 8px hsl(var(--accent) / 0.9), 0 0 18px hsl(var(--accent) / 0.5), 0 0 30px hsl(var(--accent) / 0.2);
        }
        @keyframes nav-neon-flicker {
          0%, 100% { text-shadow: 0 0 8px hsl(var(--accent) / 0.5), 0 0 20px hsl(var(--accent) / 0.2); }
          7% { text-shadow: 0 0 3px hsl(var(--accent) / 0.2), 0 0 8px hsl(var(--accent) / 0.08); }
          8% { text-shadow: 0 0 8px hsl(var(--accent) / 0.5), 0 0 20px hsl(var(--accent) / 0.2); }
          42% { text-shadow: 0 0 10px hsl(var(--accent) / 0.65), 0 0 28px hsl(var(--accent) / 0.3); }
          44% { text-shadow: 0 0 4px hsl(var(--accent) / 0.2), 0 0 6px hsl(var(--accent) / 0.06); }
          45% { text-shadow: 0 0 10px hsl(var(--accent) / 0.65), 0 0 28px hsl(var(--accent) / 0.3); }
          80% { text-shadow: 0 0 8px hsl(var(--accent) / 0.5), 0 0 20px hsl(var(--accent) / 0.2); }
          82% { text-shadow: 0 0 3px hsl(var(--accent) / 0.15), 0 0 5px hsl(var(--accent) / 0.05); }
          83% { text-shadow: 0 0 8px hsl(var(--accent) / 0.5), 0 0 20px hsl(var(--accent) / 0.2); }
        }
        .nav-neon-mobile {
          color: hsl(var(--accent));
          text-shadow: 0 0 8px hsl(var(--accent) / 0.4), 0 0 16px hsl(var(--accent) / 0.15);
          transition: color 0.3s, text-shadow 0.3s;
          animation: nav-neon-flicker 3.5s ease-in-out infinite;
        }
        .nav-neon-mobile:hover, .nav-neon-mobile:active {
          color: hsl(var(--primary));
          text-shadow: 0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.25);
          animation: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center text-3xl" aria-label="CARZONA – strona główna">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Nawigacja główna">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-neon text-lg">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:663881585"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">663 881 585</span>
            </a>
            <a
              href="#kontakt"
              className="hidden md:inline-flex items-center gap-2 backdrop-blur-md text-accent font-bold px-5 py-2.5 rounded-xl border border-accent/60 hover:border-accent hover:scale-105 active:scale-95 transition-all duration-200 text-sm whitespace-nowrap bg-transparent min-h-[44px] touch-manipulation"
            >
              Umów wizytę
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-foreground p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1" aria-label="Menu mobilne">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="nav-neon-mobile py-3 px-4 rounded-xl hover:bg-secondary/50 active:bg-secondary/70 transition-colors min-h-[44px] flex items-center touch-manipulation"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:663881585"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 px-4 rounded-full mt-3 font-semibold min-h-[48px] active:scale-95 transition-transform touch-manipulation"
              >
                <Phone className="w-4 h-4" />
                Zadzwoń: 663 881 585
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

Header.displayName = "Header";

export default Header;