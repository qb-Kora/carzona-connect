import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xs">C</span>
              </div>
              <span className="text-xl font-bold tracking-tight font-[Space_Grotesk]">
                CAR<span className="text-primary">ZONA</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Profesjonalny serwis samochodowy w Rybniku. Kompleksowa obsługa pojazdów wszystkich marek.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Autoryzowany partner Q Service Castrol
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4">Usługi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mechanika pojazdowa</li>
              <li>Diagnostyka komputerowa</li>
              <li>Układ hamulcowy</li>
              <li>Klimatyzacja</li>
              <li>Zawieszenie i geometria</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4">Godziny otwarcia</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Poniedziałek – Piątek: 8:00 – 18:00</li>
              <li>Sobota: 8:00 – 13:00</li>
              <li>Niedziela: Zamknięte</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:663881585" className="hover:text-foreground transition-colors">663 881 585</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:sebastian@carzona.pl" className="hover:text-foreground transition-colors">sebastian@carzona.pl</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>ul. Konarskiego 17, 44-274 Rybnik</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CARZONA. Wszelkie prawa zastrzeżone.
          </p>
          <a
            href="tel:663881585"
            className="sm:hidden flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold"
          >
            <Phone className="w-4 h-4" />
            Zadzwoń teraz
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
