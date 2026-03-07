import { memo } from "react";
import { Phone, Mail, MapPin, Clock, Wrench, ChevronRight } from "lucide-react";
import Logo from "./Logo";

const Footer = memo(() => (
  <footer className="relative border-t border-border/50 pt-12 sm:pt-16 md:pt-20 pb-24 md:pb-12 overflow-hidden">
    {/* Subtle top gradient */}
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />

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
          className="inline-flex items-center gap-2.5 text-primary-foreground font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base btn-shine min-h-[48px] touch-manipulation active:scale-95"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(217 91% 65%) 100%)",
            boxShadow: "0 4px 16px -4px hsl(var(--primary) / 0.35), inset 0 1px 0 0 hsl(217 91% 70% / 0.3)",
          }}
        >
          <Phone className="w-4 h-4" />
          Zadzwoń: 663 881 585
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-10 sm:mb-14">
        {/* Usługi */}
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.06))" }}
            >
              <Wrench className="w-3 h-3 text-primary" />
            </div>
            Usługi
          </h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {["Mechanika ogólna", "Diagnostyka komputerowa", "Hamulce i zawieszenie", "Serwis klimatyzacji", "Przeglądy okresowe"].map((s) => (
              <li key={s}>
                <a
                  href="#uslugi"
                  className="group flex items-center gap-1.5 neon-hover-text transition-colors min-h-[36px] sm:min-h-0"
                >
                  <ChevronRight className="w-3 h-3 text-primary/40 group-hover:translate-x-0.5 transition-transform" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Godziny */}
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.06))" }}
            >
              <Clock className="w-3 h-3 text-primary" />
            </div>
            Godziny otwarcia
          </h3>
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
              <span className="text-destructive font-medium">Zamknięte</span>
            </li>
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.06))" }}
            >
              <Mail className="w-3 h-3 text-primary" />
            </div>
            Kontakt
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="tel:663881585" className="neon-hover-text transition-colors font-medium text-foreground min-h-[36px] inline-flex items-center">
                663 881 585
              </a>
            </li>
            <li>
              <a href="mailto:sebastian@carzona.pl" className="neon-hover-text transition-colors break-all min-h-[36px] inline-flex items-center">
                sebastian@carzona.pl
              </a>
            </li>
          </ul>
        </div>

        {/* Adres */}
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.06))" }}
            >
              <MapPin className="w-3 h-3 text-primary" />
            </div>
            Gdzie jesteśmy
          </h3>
          <address className="not-italic text-sm text-muted-foreground leading-relaxed mb-3">
            ul. Konarskiego 17<br />44-274 Rybnik
          </address>
          <a
            href="https://maps.google.com/?q=ul.+Konarskiego+17,+44-274+Rybnik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary neon-hover-text transition-colors font-medium min-h-[36px]"
          >
            Otwórz w mapach
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CARZONA · Wszelkie prawa zastrzeżone
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#" className="neon-hover-text transition-colors min-h-[36px] inline-flex items-center">
            Polityka prywatności
          </a>
          <a href="#" className="neon-hover-text transition-colors min-h-[36px] inline-flex items-center">
            Regulamin
          </a>
        </div>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

export default Footer;