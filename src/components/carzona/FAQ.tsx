import { memo } from "react";
import { motion } from "framer-motion";
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

const FAQ = memo(() => (
  <ParallaxSection imageUrl="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1920&q=80&fit=crop" overlayOpacity={0.92}>
    <section id="faq" className="py-16 sm:py-20 md:py-32 relative">
      <div className="max-w-3xl 2xl:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="neon-label text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
            FAQ
          </span>
          <h2 className="neon-heading text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
            Często zadawane pytania
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            Odpowiedzi na najczęściej zadawane pytania naszych klientów.
          </p>
        </AnimatedSection>

        <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="rounded-xl sm:rounded-2xl px-4 sm:px-6 border transition-all duration-300 data-[state=open]:border-primary/25 data-[state=closed]:border-border relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--card) / 0.85) 0%, hsl(var(--card) / 0.7) 100%)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Left accent on open */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full opacity-0 data-[state=open]:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.5), transparent)",
                  }}
                />
                <AccordionTrigger className="text-left font-semibold text-foreground neon-hover-text transition-colors py-3.5 sm:py-5 text-sm sm:text-base min-h-[44px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-3.5 sm:pb-5 text-xs sm:text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  </ParallaxSection>
));

FAQ.displayName = "FAQ";

export default FAQ;
