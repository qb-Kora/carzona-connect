import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { CheckCircle2, Users, Timer, Banknote, HeartHandshake, Sparkles } from "lucide-react";

const reasons = [
  { icon: CheckCircle2, title: "Jakość bez kompromisów", desc: "Używamy wyłącznie certyfikowanych części i materiałów najwyższej jakości." },
  { icon: Users, title: "Doświadczony zespół", desc: "Nasi mechanicy to specjaliści z wieloletnim doświadczeniem i ciągłymi szkoleniami." },
  { icon: Timer, title: "Terminowość", desc: "Szanujemy Twój czas — naprawy realizujemy w ustalonym terminie." },
  { icon: Banknote, title: "Uczciwe ceny", desc: "Transparentna wycena bez ukrytych kosztów. Zawsze wiesz, za co płacisz." },
  { icon: HeartHandshake, title: "Indywidualne podejście", desc: "Każdy klient i każde auto traktujemy indywidualnie z pełnym zaangażowaniem." },
  { icon: Sparkles, title: "Nowoczesny sprzęt", desc: "Inwestujemy w najnowszy sprzęt diagnostyczny i narzędzia warsztatowe." },
];

const WhyUs = () => {
  return (
    <section id="dlaczego" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimatedSection>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
                Dlaczego my
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Zaufaj profesjonalistom
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                CARZONA to nie zwykły warsztat. To miejsce, gdzie pasja do motoryzacji 
                łączy się z najwyższą jakością obsługi.
              </p>
            </AnimatedSection>

            <a
              href="tel:663881585"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              Umów wizytę
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <reason.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-foreground text-sm mb-1">{reason.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
