import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Phone, Mail, MapPin, Send, Clock, CheckCircle } from "lucide-react";

const services = [
  "Diagnostyka komputerowa",
  "Mechanika ogólna",
  "Wymiana rozrządu",
  "Serwis klimatyzacji",
  "Wymiana oleju i filtrów",
  "Serwis hamulców",
  "Zawieszenie i geometria",
  "Elektryka samochodowa",
  "Przeglądy okresowe",
  "Inne",
];

const hours = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", car: "", date: "", time: "", message: "", rodo: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Podaj imię i nazwisko";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 9) e.phone = "Podaj poprawny numer telefonu";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Podaj poprawny email";
    if (!form.service) e.service = "Wybierz usługę";
    if (!form.car.trim()) e.car = "Podaj markę i model auta";
    if (!form.date) e.date = "Wybierz datę";
    if (!form.rodo) e.rodo = "Wymagana zgoda RODO";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const update = (field: string, value: string | boolean) => {
    setForm(s => ({ ...s, [field]: value }));
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  const inputClass = (field: string) =>
    `w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-secondary border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all min-h-[44px] ${errors[field] ? "border-destructive" : "border-border"}`;

  if (submitted) {
    return (
      <section id="kontakt" className="py-16 sm:py-20 md:py-32">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-card border border-accent/20"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Dziękujemy!</h3>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">Twoje zgłoszenie zostało wysłane. Oddzwonimy w ciągu godziny.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", car: "", date: "", time: "", message: "", rodo: false }); }}
              className="text-accent font-semibold hover:underline min-h-[44px]"
            >
              Wyślij kolejne zgłoszenie
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-16 sm:py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="neon-label text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 block">
            Kontakt
          </span>
          <h2 className="neon-heading text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            Umów wizytę online
          </h2>
          <p className="neon-desc max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            Wypełnij formularz — oddzwonimy w ciągu godziny i potwierdzimy termin.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-2.5 sm:space-y-3 md:space-y-4 perspective-grid"
            style={{ transformPerspective: 1000 }}
          >
            <a
              href="tel:663881585"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-accent/10 border border-accent/20 hover:border-accent/40 transition-all duration-300 min-h-[44px]"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-xs sm:text-sm mb-0.5">Zadzwoń teraz</div>
                <div className="text-accent font-bold text-base sm:text-xl">663 881 585</div>
              </div>
            </a>

            <a
              href="mailto:sebastian@carzona.pl"
              className="group flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 min-h-[44px]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-foreground text-xs sm:text-sm mb-0.5">Email</div>
                <div className="text-muted-foreground text-xs sm:text-sm truncate">sebastian@carzona.pl</div>
              </div>
            </a>

            <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-card border border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-foreground text-xs sm:text-sm mb-0.5">Adres</div>
                <div className="text-muted-foreground text-xs sm:text-sm">ul. Konarskiego 17, 44-274 Rybnik</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-card border border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-foreground text-xs sm:text-sm mb-0.5">Godziny otwarcia</div>
                <div className="text-muted-foreground text-xs sm:text-sm">
                  Pon–Pt: 8:00–17:00 | Sob: 8:00–13:00
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
            style={{ transformPerspective: 1000 }}
          >
            <div className="p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-card border border-border raised-surface">
              <h3 className="font-bold text-foreground text-lg sm:text-xl mb-1.5 sm:mb-2">Zarezerwuj termin</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-5 sm:mb-8">Wszystkie pola oznaczone * są wymagane.</p>
              <form className="space-y-3 sm:space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Imię i nazwisko *</label>
                    <input id="name" type="text" placeholder="Jan Kowalski" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass("name")} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Telefon *</label>
                    <input id="phone" type="tel" placeholder="600 000 000" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass("phone")} />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Email</label>
                    <input id="email" type="email" placeholder="jan@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass("email")} />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="car" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Marka i model auta *</label>
                    <input id="car" type="text" placeholder="np. BMW 320d F30" value={form.car} onChange={(e) => update("car", e.target.value)} className={inputClass("car")} />
                    {errors.car && <p className="text-destructive text-xs mt-1">{errors.car}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Usługa *</label>
                  <select id="service" value={form.service} onChange={(e) => update("service", e.target.value)} className={inputClass("service")}>
                    <option value="">Wybierz usługę...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="date" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Preferowana data *</label>
                    <input id="date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass("date")} />
                    {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Preferowana godzina</label>
                    <select id="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={inputClass("time")}>
                      <option value="">Dowolna</option>
                      {hours.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="msg" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Dodatkowe uwagi</label>
                  <textarea id="msg" placeholder="Opisz problem lub dodaj numer VIN..." rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${inputClass("message")} resize-none`} />
                </div>

                <div>
                  <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.rodo} onChange={(e) => update("rodo", e.target.checked)} className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded border-border accent-accent shrink-0" />
                    <span className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji usługi zgodnie z <a href="#" className="text-accent hover:underline">polityką prywatności</a>. *
                    </span>
                  </label>
                  {errors.rodo && <p className="text-destructive text-xs mt-1">{errors.rodo}</p>}
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base btn-shine hover:shadow-md hover:shadow-accent/15 transition-all duration-300 min-h-[44px]"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Umów wizytę
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
