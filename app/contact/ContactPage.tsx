"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { Button } from "@/components/ui/Button";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { DepthDivider } from "@/components/shared/DepthDivider";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const serviceOptions = [
  "Site web premium",
  "Application web / mobile",
  "Agent IA",
  "Automatisation",
  "Studio visuel / Motion",
  "Consulting / Audit",
  "Autre",
];

const processSteps = [
  { number: "01", title: "Vous nous écrivez", description: "Décrivez votre projet en quelques mots. Pas besoin d'un brief parfait — une idée suffit." },
  { number: "02", title: "Réponse sous 24h", description: "Nous analysons votre demande et revenons vers vous avec des premières questions et pistes de réflexion." },
  { number: "03", title: "Échange découverte", description: "Un appel de 30 minutes pour comprendre vos objectifs, votre contexte et vos contraintes. Gratuit, sans engagement." },
  { number: "04", title: "Proposition sur mesure", description: "Nous vous envoyons une proposition détaillée : périmètre, approche, planning et investissement." },
];

const faq = [
  { q: "Combien coûte un projet ?", a: "Chaque projet est différent. Un site vitrine premium commence à partir de 3 000€, une application à partir de 8 000€, un agent IA à partir de 2 000€. Nous proposons toujours un devis transparent après l'échange découverte." },
  { q: "Quels sont vos délais ?", a: "Un site web premium : 4-8 semaines. Une application : 8-16 semaines. Un agent IA : 2-6 semaines. Les délais dépendent de la complexité, mais nous respectons toujours nos engagements." },
  { q: "Travaillez-vous avec des clients internationaux ?", a: "Oui. Nous travaillons en français et en anglais, avec des clients en France, en Europe et au-delà. Le travail se fait en remote avec des points réguliers." },
  { q: "Proposez-vous de la maintenance ?", a: "Oui. Chaque livraison peut s'accompagner d'un contrat de maintenance et d'optimisation continue. Vos solutions restent performantes dans la durée." },
];

export function ContactPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageAtmosphere preset="contact" />
      <PageHero
        label="Contact"
        title={<>Démarrons votre <span className="text-gradient-strong">projet</span></>}
        description="Chaque grand projet commence par une conversation. Décrivez votre besoin, nous revenons vers vous sous 24h avec une première analyse personnalisée."
      />

      {/* Form section */}
      <section className="relative py-16 lg:py-24 -mt-16 z-10">
        <SectionParticles style="dots" count={8} color="rgba(129,140,248,0.08)" />
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl border border-border-subtle bg-bg-card/80 backdrop-blur-xl p-8 sm:p-12 lg:p-14 shadow-2xl shadow-accent-glow/5"
          >
            {/* Service selection */}
            <motion.div variants={fadeInUp} className="mb-10">
              <label className="text-base font-semibold text-text-primary block mb-2">Quel type de projet vous intéresse ?</label>
              <p className="text-sm text-text-tertiary mb-5">Sélectionnez un ou plusieurs services pour nous aider à comprendre votre besoin.</p>
              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedService(selectedService === s ? null : s)}
                    className={`px-4 py-2.5 text-sm rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedService === s
                        ? "border-accent-primary bg-accent-glow text-accent-light shadow-sm shadow-accent-glow/20"
                        : "border-border-subtle bg-bg-tertiary/30 text-text-secondary hover:border-border-medium hover:text-text-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Form fields */}
            <motion.div variants={fadeInUp} className="space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label className="text-sm font-medium text-text-primary block mb-2.5">Nom *</label>
                  <input type="text" placeholder="Votre nom complet" className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/30 border border-border-subtle text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary block mb-2.5">Email *</label>
                  <input type="email" placeholder="votre@email.com" className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/30 border border-border-subtle text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label className="text-sm font-medium text-text-primary block mb-2.5">Entreprise <span className="text-text-tertiary font-normal">(optionnel)</span></label>
                  <input type="text" placeholder="Nom de votre entreprise" className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/30 border border-border-subtle text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary block mb-2.5">Budget estimé <span className="text-text-tertiary font-normal">(optionnel)</span></label>
                  <select className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/30 border border-border-subtle text-sm text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all appearance-none cursor-pointer">
                    <option>Sélectionner une fourchette</option>
                    <option>Moins de 3 000€</option>
                    <option>3 000€ — 8 000€</option>
                    <option>8 000€ — 20 000€</option>
                    <option>20 000€ — 50 000€</option>
                    <option>Plus de 50 000€</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary block mb-2.5">Décrivez votre projet *</label>
                <textarea rows={6} placeholder="Parlez-nous de votre projet : objectifs, contexte, contraintes, timeline souhaitée..." className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/30 border border-border-subtle text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all resize-none" />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-3">
                <Button variant="primary" size="lg" type="submit">
                  Envoyer ma demande
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Button>
                <p className="text-xs text-text-tertiary">Réponse personnalisée sous 24h — Sans engagement</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DepthDivider preset="glow" />

      {/* Process */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <SectionParticles style="grid-dots" count={12} color="rgba(129,140,248,0.04)" />
        <div className="relative max-w-4xl mx-auto px-6">
          <SectionParticles style="dots" count={6} color="rgba(129,140,248,0.06)" />
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Comment ça se passe</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">De votre message à notre proposition</h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {processSteps.map((s) => (
              <motion.div key={s.number} variants={fadeInUp} className="flex items-start gap-5 rounded-xl border border-border-subtle bg-bg-card/60 p-6 sm:p-7 card-shine">
                <span className="text-lg font-bold text-gradient-strong font-mono flex-shrink-0">{s.number}</span>
                <div>
                  <h3 className="text-base font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <DepthDivider preset="wave" />

      {/* FAQ */}
      <section className="relative py-32 lg:py-40 bg-bg-secondary overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Questions fréquentes</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Tout ce que vous devez savoir</h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-xl border border-border-subtle bg-bg-card/60 overflow-hidden transition-all duration-300 hover:border-border-accent"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-7 py-5 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-sm font-semibold text-text-primary pr-4">{item.q}</span>
                  <motion.svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-text-tertiary flex-shrink-0"
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-7 pb-5">
                    <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact alternatives */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <motion.a variants={fadeInUp} href="mailto:contact@solutions2ia.com" className="rounded-xl border border-border-subtle bg-bg-card/50 p-7 text-center hover:border-border-accent transition-all duration-300 group card-shine">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light mx-auto mb-4"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
              <p className="text-sm font-medium group-hover:text-accent-light transition-colors">contact@solutions2ia.com</p>
              <p className="text-xs text-text-tertiary mt-1">Email direct</p>
            </motion.a>
            <motion.div variants={fadeInUp} className="rounded-xl border border-border-subtle bg-bg-card/50 p-7 text-center card-shine">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light mx-auto mb-4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <p className="text-sm font-medium">Réponse sous 24h</p>
              <p className="text-xs text-text-tertiary mt-1">Du lundi au vendredi</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="rounded-xl border border-border-subtle bg-bg-card/50 p-7 text-center card-shine">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light mx-auto mb-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <p className="text-sm font-medium">Appel découverte</p>
              <p className="text-xs text-text-tertiary mt-1">30 min — gratuit</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
