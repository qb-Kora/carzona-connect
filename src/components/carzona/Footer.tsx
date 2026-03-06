import { memo } from "react";
import { Phone, Mail, MapPin, Clock, Wrench, ChevronRight } from "lucide-react";
import Logo from "./Logo";

const Footer = memo(() => (
  <footer className="relative border-t border-border/50 pt-12 sm:pt-16 md:pt-20 pb-24 md:pb-12 overflow-hidden">
    {/* Neon glow line at top */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden="true" />
    
    {/* Strong blue glow with flicker */}
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[120px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(ellipse, hsl(var(--primary) / 0.25) 0%, hsl(var(--primary) / 0.08) 40%, transparent 70%)",
        animation: "footerGlowFlicker 3s ease-in-out infinite",
      }}
      aria-hidden="true"
    />
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(ellipse, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
        animation: "footerGlowFlicker 2.2s ease-in-out infinite 0.5s",
      }}
      aria-hidden="true"
    />

    <style>{`
      @keyframes footerGlowFlicker {
        0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
        15% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        30% { opacity: 0.4; transform: translateX(-50%) scale(0.98); }
        50% { opacity: 0.9; transform: translateX(-50%) scale(1.02); }
        70% { opacity: 0.5; transform: translateX(-50%) scale(1); }
        85% { opacity: 1; transform: translateX(-50%) scale(1.03); }
      }
    `}</style>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Top — brand + CTA */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <div className="text-3xl sm:text-4xl mb-3">
            <Logo />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
            Profesjonalny serwis samochodowy w&nbsp;Rybniku.
            <br className="hidden sm:block" />
            Kompleksowa obsługa pojazdów wszystkich marek.
          </p>
        </div>
        <a
          href="tel:663881585"
          className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base btn-shine min-h-[48px] touch-manipulation"
        >
          <Phone className="w-4 h-4" />
          Zadzwoń: 663 881 585
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-10 sm:mb-14">
        {/* Usługi */}
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            Usługi
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {["Mechanika ogólna", "Diagnostyka komputerowa", "Hamulce i zawieszenie", "Serwis klimatyzacji", "Przeglądy okresowe"].map((s) => (
              <li key={s}>
                <a
                  href="#uslugi"
                  className="group flex items-center gap-1.5 hover:text-foreground transition-colors min-h-[36px] sm:min-h-0"
                >
                  <ChevronRight className="w-3 h-3 text-primary/60 group-hover:translate-x-0.5 transition-transform" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Godziny */}
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Godziny otwarcia
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex justify-between max-w-[200px]">
              <span>Pon – Pt</span>
              <span className="text-foreground font-medium">8:00–17:00</span>
            </li>
            <li className="flex justify-between max-w-[200px]">
              <span>Sobota</span>
              <span className="text-foreground font-medium">8:00–13:00</span>
            </li>
            <li className="flex justify-between max-w-[200px]">
              <span>Niedziela</span>
              <span className="text-destructive/80 font-medium">Zamknięte</span>
            </li>
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Kontakt
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="tel:663881585" className="hover:text-foreground transition-colors font-medium text-foreground min-h-[36px] inline-flex items-center">
                663 881 585
              </a>
            </li>
            <li>
              <a href="mailto:sebastian@carzona.pl" className="hover:text-foreground transition-colors break-all min-h-[36px] inline-flex items-center">
                sebastian@carzona.pl
              </a>
            </li>
          </ul>
        </div>

        {/* Adres */}
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Gdzie jesteśmy
          </h4>
          <address className="not-italic text-sm text-muted-foreground leading-relaxed mb-3">
            ul. Konarskiego 17<br />44-274 Rybnik
          </address>
          <a
            href="https://maps.google.com/?q=ul.+Konarskiego+17,+44-274+Rybnik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium min-h-[36px]"
          >
            Otwórz w mapach
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} CARZONA · Wszelkie prawa zastrzeżone
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground/60">
          <a href="#" className="hover:text-foreground transition-colors min-h-[36px] inline-flex items-center">
            Polityka prywatności
          </a>
          <a href="#" className="hover:text-foreground transition-colors min-h-[36px] inline-flex items-center">
            Regulamin
          </a>
        </div>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

export default Footer;