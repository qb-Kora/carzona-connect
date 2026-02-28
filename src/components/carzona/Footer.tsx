import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-16 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight font-[Space_Grotesk]">
              CAR<span className="text-primary">ZONA</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Profesjonalny serwis samochodowy w Rybniku. Kompleksowa obsługa pojazdów wszystkich marek.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Autoryzowany partner Q Service Castrol
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-5">Usługi</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Mechanika ogólna</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Diagnostyka komputerowa</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Hamulce i zawieszenie</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Serwis klimatyzacji</a></li>
            <li><a href="#uslugi" className="hover:text-foreground transition-colors">Przeglądy okresowe</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-5">Godziny otwarcia</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>Poniedziałek – Piątek: 8:00–17:00</li>
            <li>Sobota: 8:00–13:00</li>
            <li>Niedziela: Zamknięte</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-5">Kontakt</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:663881585" className="hover:text-foreground transition-colors font-semibold">663 881 585</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:sebastian@carzona.pl" className="hover:text-foreground transition-colors">sebastian@carzona.pl</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <span>ul. Konarskiego 17<br />44-274 Rybnik</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CARZONA. Wszelkie prawa zastrzeżone.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Polityka prywatności</a>
          <a href="#" className="hover:text-foreground transition-colors">Regulamin</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
