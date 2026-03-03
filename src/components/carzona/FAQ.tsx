import AnimatedSection from "./AnimatedSection";
import ParallaxSection from "./ParallaxSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Czy muszę umawiać się na wizytę?", a: "Zalecamy wcześniejsze umówienie wizyty telefonicznie, dzięki czemu zapewnimy szybszą obsługę. W miarę możliwości przyjmujemy również klientów bez wcześniejszego zapisu." },
  { q: "Jak długo trwa typowa naprawa?", a: "Czas naprawy zależy od jej zakresu. Proste serwisy (olej, filtry) realizujemy w ciągu 1-2 godzin. Większe naprawy zazwyczaj wykonujemy w ciągu 24 godzin." },
  { q: "Czy udzielacie gwarancji na naprawy?", a: "Tak! Na wszystkie wykonane naprawy udzielamy gwarancji. Jako autoryzowany partner Q Service Castrol używamy wyłącznie certyfikowanych części." },
  { q: "Jakie marki samochodów obsługujecie?", a: "Obsługujemy samochody wszystkich marek — zarówno europejskie, japońskie jak i koreańskie. Nasz sprzęt diagnostyczny obsługuje pełen zakres modeli." },
  { q: "Czy mogę zostawić auto i odebrać je później?", a: "Oczywiście. Możesz zostawić samochód rano i odebrać go po pracy. Skontaktujemy się, gdy naprawa będzie gotowa." },
  { q: "Ile kosztuje diagnostyka komputerowa?", a: "Cena diagnostyki komputerowej zaczyna się od 50 zł. Dokładny koszt zależy od zakresu diagnostyki. Zadzwoń, a podamy szczegółową wycenę." },
];

const FAQ = () => (
  <ParallaxSection imageUrl="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1920&q=80&fit=crop" overlayOpacity={0.92}>
    <section id="faq" className="py-20 md:py-32 relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Często zadawane pytania
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Odpowiedzi na najczęściej zadawane pytania naszych klientów.
          </p>
        </AnimatedSection>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl px-5 md:px-6 data-[state=open]:border-primary/20 transition-colors duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-4 md:py-5 text-sm md:text-base touch-target">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 md:pb-5 text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </ParallaxSection>
);

export default FAQ;
