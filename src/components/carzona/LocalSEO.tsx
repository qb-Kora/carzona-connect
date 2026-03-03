import AnimatedSection from "./AnimatedSection";

const LocalSEO = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-foreground">
            Mechanik samochodowy Rybnik
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4 text-sm md:text-base">
            <p>
              CARZONA to profesjonalny warsztat samochodowy w Rybniku, specjalizujący się w kompleksowej obsłudze
              pojazdów osobowych wszystkich marek. Nasz warsztat przy ul. Konarskiego 17 oferuje pełen zakres usług
              mechanicznych — od diagnostyki komputerowej, przez naprawy silników i skrzyń biegów, po serwis
              klimatyzacji i zawieszenia.
            </p>
            <p>
              Jako autoryzowany partner Q Service Castrol gwarantujemy najwyższą jakość stosowanych olejów i płynów
              eksploatacyjnych. Obsługujemy klientów z Rybnika oraz okolicznych miejscowości — Czerwionki-Leszczyn,
              Żor, Wodzisławia Śląskiego, Jastrzębia-Zdroju i Raciborza. Nasi doświadczeni mechanicy wykonują
              zarówno bieżące naprawy, jak i skomplikowane remonty silników.
            </p>
            <p>
              Stawiamy na uczciwość, transparentne ceny i szybki czas realizacji. Większość standardowych napraw
              realizujemy w ciągu 24 godzin. Umawiamy wizyty telefonicznie oraz online, aby zaoszczędzić Twój czas.
              Zaufaj doświadczeniu — ponad 1000 napraw rocznie mówi samo za siebie.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LocalSEO;
