import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });

  return (
    <section id="kontakt" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Skontaktuj się z nami
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Zadzwoń lub napisz — odpowiemy najszybciej jak to możliwe.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <a
              href="tel:663881585"
              className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Telefon</div>
                <div className="text-primary font-bold text-lg">663 881 585</div>
              </div>
            </a>

            <a
              href="mailto:sebastian@carzona.pl"
              className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Email</div>
                <div className="text-muted-foreground text-sm">sebastian@carzona.pl</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Adres</div>
                <div className="text-muted-foreground text-sm">ul. Konarskiego 17<br />44-274 Rybnik-Popielów</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Godziny otwarcia</div>
                <div className="text-muted-foreground text-sm">
                  Pon–Pt: 8:00 – 17:00<br />
                  Sob: 8:00 – 13:00
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form + map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground text-lg mb-6">Wyślij wiadomość</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Imię i nazwisko"
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Numer telefonu"
                    value={formState.phone}
                    onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <textarea
                  placeholder="Opisz problem z autem..."
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  Wyślij wiadomość
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.5!2d18.53!3d50.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA1JzI0LjAiTiAxOMKwMzEnNDguMCJF!5e0!3m2!1spl!2spl!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CARZONA lokalizacja"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
