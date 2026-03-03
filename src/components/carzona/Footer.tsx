import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => (
  <footer className="border-t border-border py-10 sm:py-12 md:py-16 relative pb-20 md:pb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12">
        <div className="col-span-2 lg:col-span-1">
          <div className="mb-4 sm:mb-5 text-2xl sm:text-3xl">
            <Logo />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 sm:mb-3">
            Profesjonalny serwis samochodowy w Rybniku. Kompleksowa obsługa pojazdów wszystkich marek.
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/50">
            Autoryzowany partner Q Service Castrol
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3 sm:mb-5">Usługi</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-muted-foreground">
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Mechanika ogólna</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Diagnostyka komputerowa</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Hamulce i zawieszenie</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Serwis klimatyzacji</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Przeglądy okresowe</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3 sm:mb-5">Godziny otwarcia</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-muted-foreground">
            <li>Pon – Pt: 8:00–17:00</li>
            <li>Sob: 8:00–13:00</li>
            <li>Ndz: Zamknięte</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3 sm:mb-5">Kontakt</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <a href="tel:663881585" className="hover:text-foreground transition-colors font-semibold">663 881 585</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <a href="mailto:sebastian@carzona.pl" className="hover:text-foreground transition-colors truncate">sebastian@carzona.pl</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 shrink-0" />
              <span>ul. Konarskiego 17<br />44-274 Rybnik</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          © {new Date().getFullYear()} CARZONA. Wszelkie prawa zastrzeżone.
        </p>
        <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Polityka prywatności</a>
          <a href="#" className="hover:text-foreground transition-colors">Regulamin</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
