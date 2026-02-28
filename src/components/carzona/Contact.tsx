import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  return (
    <section id="kontakt" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Skontaktuj się z nami
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Zadzwoń lub napisz — odpowiemy najszybciej jak to możliwe.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Phone - prominent */}
            <a
              href="tel:663881585"
              className="group flex items-center gap-4 p-6 rounded-3xl bg-accent/10 border border-accent/20 hover:border-accent/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-0.5">Zadzwoń teraz</div>
                <div className="text-accent font-bold text-xl">663 881 585</div>
              </div>
            </a>

            <a
              href="mailto:sebastian@carzona.pl"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-0.5">Email</div>
                <div className="text-muted-foreground text-sm">sebastian@carzona.pl</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-3xl bg-card border border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-0.5">Adres</div>
                <div className="text-muted-foreground text-sm">ul. Konarskiego 17, 44-274 Rybnik</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-3xl bg-card border border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-0.5">Godziny otwarcia</div>
                <div className="text-muted-foreground text-sm">
                  Pon–Pt: 8:00–17:00 &nbsp;|&nbsp; Sob: 8:00–13:00
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="p-7 md:p-10 rounded-3xl bg-card border border-border">
              <h3 className="font-bold text-foreground text-xl mb-2">Umów wizytę</h3>
              <p className="text-muted-foreground text-sm mb-8">Wypełnij formularz, oddzwonimy w ciągu godziny.</p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Imię</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jan"
                      value={form.name}
                      onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-2xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Telefon</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="600 000 000"
                      value={form.phone}
                      onChange={(e) => setForm(s => ({ ...s, phone: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-2xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="msg" className="block text-sm font-medium text-foreground mb-2">Wiadomość (opcjonalnie)</label>
                  <textarea
                    id="msg"
                    placeholder="Opisz problem lub usługę..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm(s => ({ ...s, message: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-2xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground py-4 rounded-2xl font-bold text-base btn-shine hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5" />
                  Wyślij wiadomość
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
