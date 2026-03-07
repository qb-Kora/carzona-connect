import { memo } from "react";
import { MapPin, Shield, Clock, Wrench } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const highlights = [
  { icon: MapPin, label: "ul. Konarskiego 17, Rybnik" },
  { icon: Shield, label: "Partner Q Service Castrol" },
  { icon: Clock, label: "Naprawa w 24h" },
  { icon: Wrench, label: "1000+ napraw rocznie" },
];

const LocalSEO = memo(() => (
  <section className="py-14 sm:py-16 md:py-28 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(var(--primary)/0.03),transparent)] pointer-events-none" />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <AnimatedSection>
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {highlights.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground rounded-full px-3 py-1.5 border border-border/40"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card) / 0.7) 0%, hsl(var(--card) / 0.4) 100%)",
              }}
            >
              <Icon className="w-3 h-3 text-primary" />
              {label}
            </span>
          ))}
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2 text-foreground">
          Mechanik samochodowy <span className="text-gradient">Rybnik</span>
        </h2>
        <p className="text-primary/60 text-xs sm:text-sm font-medium mb-5 sm:mb-7 flex items-center gap-2">
          <span
            className="inline-block w-8 h-[1px]"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.5), transparent)" }}
          />
          Twój zaufany serwis w sercu Śląska
        </p>

        <div className="text-muted-foreground leading-[1.85] space-y-4 sm:space-y-5 text-[13px] sm:text-sm md:text-[15px]">
          <p>
            <strong className="text-foreground font-medium">CARZONA</strong> to profesjonalny warsztat
            samochodowy w&nbsp;Rybniku, specjalizujący się w&nbsp;kompleksowej obsłudze pojazdów osobowych
            wszystkich marek. Nasz warsztat przy ul.&nbsp;Konarskiego&nbsp;17 oferuje pełen zakres usług
            mechanicznych — od diagnostyki komputerowej, przez naprawy silników i&nbsp;skrzyń biegów, po
            serwis klimatyzacji i&nbsp;zawieszenia.
          </p>
          <p>
            Jako autoryzowany partner{" "}
            <strong className="text-foreground font-medium">Q&nbsp;Service Castrol</strong>{" "}
            gwarantujemy najwyższą jakość stosowanych olejów i&nbsp;płynów eksploatacyjnych. Obsługujemy
            klientów z&nbsp;<span className="text-primary font-medium">Rybnika</span> oraz okolicznych miejscowości —{" "}
            <span className="text-foreground/70">
              Czerwionki-Leszczyn, Żor, Wodzisławia Śląskiego, Jastrzębia-Zdroju i&nbsp;Raciborza
            </span>
            . Nasi doświadczeni mechanicy wykonują zarówno bieżące naprawy, jak i&nbsp;skomplikowane
            remonty silników.
          </p>
          <p>
            Stawiamy na uczciwość, transparentne ceny i&nbsp;szybki czas realizacji. Większość
            standardowych napraw realizujemy{" "}
            <strong className="text-foreground font-medium">w&nbsp;ciągu 24&nbsp;godzin</strong>.
            Umawiamy wizyty telefonicznie oraz online, aby zaoszczędzić Twój czas. Zaufaj doświadczeniu
            — ponad 1000 napraw rocznie mówi samo za siebie.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
));

LocalSEO.displayName = "LocalSEO";

export default LocalSEO;
