import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Clock, Wrench } from "lucide-react";

const realizations = [
  {
    title: "Wymiana rozrządu — BMW 320d F30",
    problem: "Hałas z okolic rozrządu, przebieg 180 tys. km",
    scope: "Wymiana paska rozrządu, pompy wody, rolek napinających i płynu chłodniczego",
    time: "1 dzień",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Naprawa zawieszenia — Audi A4 B8",
    problem: "Stuki przy nierównościach, nierówne zużycie opon",
    scope: "Wymiana wahaczy przednich, łączników stabilizatora, geometria kół",
    time: "6 godzin",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Serwis klimatyzacji — VW Passat B7",
    problem: "Klimatyzacja nie chłodzi, nieprzyjemny zapach z nawiewów",
    scope: "Odgrzybianie, wymiana filtra kabinowego, uzupełnienie czynnika, test szczelności",
    time: "3 godziny",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Diagnostyka elektryczna — Opel Astra J",
    problem: "Zapalona kontrolka silnika, szarpanie przy przyspieszaniu",
    scope: "Diagnostyka komputerowa, wymiana cewki zapłonowej i świec, kasowanie błędów",
    time: "4 godziny",
    color: "bg-accent/10 text-accent",
  },
];

const Realizations = () => {
  return (
    <section id="realizacje" className="py-16 sm:py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
            Realizacje
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            Nasze ostatnie naprawy
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            Każda naprawa to dla nas wyzwanie, które podejmujemy z pasją.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {realizations.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover p-4 sm:p-5 md:p-7 rounded-2xl sm:rounded-3xl group"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="font-bold text-foreground text-sm sm:text-base md:text-lg leading-tight">{r.title}</h3>
                <div className={`flex items-center gap-1 shrink-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold ${r.color}`}>
                  <Clock className="w-3 h-3" />
                  {r.time}
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5 sm:mb-1">Problem</div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{r.problem}</p>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5 sm:mb-1">Zakres prac</div>
                  <div className="flex items-start gap-2">
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-foreground text-xs sm:text-sm">{r.scope}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Realizations;
