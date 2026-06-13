"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { Button } from "@/components/ui/Button";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const serviceOptions = [
  "Un site web",
  "Une application sur mesure",
  "Automatiser des tâches",
  "Un assistant IA",
  "Je ne sais pas encore",
];

const processSteps = [
  { number: "01", title: "Vous m'écrivez", description: "Décrivez votre besoin en quelques mots. Pas besoin d'un dossier parfait — une idée suffit pour commencer." },
  { number: "02", title: "Je réponds sous 24 h", description: "Je lis votre message et je reviens vers vous avec quelques questions et une première idée de ce qui vous aiderait." },
  { number: "03", title: "On échange, gratuitement", description: "Un appel d'une trentaine de minutes pour bien comprendre votre situation. Gratuit, sans engagement." },
  { number: "04", title: "Je vous propose une solution", description: "Vous recevez une proposition claire : ce que je construis, ce que ça change, le prix et le délai." },
];

const faq = [
  { q: "Combien ça coûte ?", a: "Pour vous situer : un site vitrine simple démarre autour de 500 €, un site vitrine premium entre 1 000 et 2 500 €, un site relié à vos outils (réservation, espace client, paiement…) entre 2 500 et 5 000 €, et une application sur mesure entre 1 500 et 15 000 € selon le nombre de fonctions. Pour les automatisations et les assistants IA, le prix dépend trop du projet pour une fourchette honnête — on en parle lors du premier échange, qui est gratuit. Dans tous les cas, le prix est fixé ensemble avant de démarrer : pas de mauvaise surprise." },
  { q: "En combien de temps ?", a: "Un site simple : quelques jours à deux semaines. Un site premium : deux à six semaines. Une application : selon la taille, de quelques semaines à quelques mois. Je vous donne un délai clair dans la proposition, et je m'y tiens." },
  { q: "Je ne suis pas du tout technique, c'est un problème ?", a: "Au contraire, c'est mon métier de traduire. Je vous explique tout avec des mots simples, sans jargon. Vous n'avez jamais besoin de comprendre la technique — juste de me dire ce qui vous prend du temps." },
  { q: "Et après la mise en ligne ?", a: "Je reste joignable. Je prends le temps de vous montrer comment ça marche, et je suis là pour ajuster ou faire évoluer l'outil quand votre besoin change. On peut aussi convenir d'un suivi régulier si vous le souhaitez." },
];

const briefFlow = [
  {
    meta: "Votre objectif",
    title: "Ce que vous aimeriez améliorer",
    description: "Être plus visible, gagner du temps, arrêter de tout retaper à la main, lancer un nouveau service… dites-le avec vos mots.",
  },
  {
    meta: "Votre situation",
    title: "Où vous en êtes aujourd'hui",
    description: "Vous avez déjà un site ? Quels outils utilisez-vous ? Qu'est-ce qui vous bloque ou vous fait perdre du temps en ce moment ?",
  },
  {
    meta: "Vos priorités",
    title: "Ce qui compte le plus",
    description: "Un délai à tenir, un budget en tête, une fonction indispensable… ce qui est important pour vous m'aide à viser juste.",
  },
  {
    meta: "La suite",
    title: "Le prochain pas, concret",
    description: "Après votre message, je reviens avec les bonnes questions, une première lecture honnête et une direction claire.",
  },
];

export function ContactPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageAtmosphere preset="contact" />
      <FluidMouseField preset="contact" />
      <PageHero
        label="Parlons-en"
        title={<>Dites-moi ce qui vous <span className="text-gradient-strong">prend du temps</span></>}
        description="Pas besoin de savoir ce qu'il vous faut. Décrivez votre situation avec vos mots — je reviens vers vous sous 24 h avec une première idée, gratuitement et sans engagement."
      />

      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Pour un bon premier message"
            title="Quelques mots bien choisis suffisent."
            description="Pas besoin d'un dossier complet. Si vous me donnez ces quelques éléments, je comprends tout de suite le vrai sujet et notre échange est plus utile."
            steps={briefFlow}
            accent="99, 102, 241"
          />
        </div>
      </section>

      {/* Form section */}
      <section className="section-shell-tight z-10">
        <SectionParticles style="dots" count={8} color="rgba(129,140,248,0.08)" />
        <div className="section-container-narrow">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-intro-panel rounded-[1.75rem] p-8 sm:p-12 lg:p-14"
          >
            {/* Service selection */}
            <motion.div variants={fadeInUp} className="mb-10">
              <span id="type-projet-label" className="text-base font-semibold text-text-primary block mb-2">Qu&apos;est-ce qui vous amène ?</span>
              <p className="text-sm text-text-secondary/85 mb-5">Choisissez ce qui s&apos;en rapproche le plus. Si vous hésitez, ce n&apos;est pas grave — on en parle.</p>
              <div className="flex flex-wrap gap-3" role="group" aria-labelledby="type-projet-label">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={selectedService === s}
                    onClick={() => setSelectedService(selectedService === s ? null : s)}
                    className={`px-4 py-2.5 text-sm rounded-xl border transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-light/60 focus-visible:outline-offset-2 ${
                      selectedService === s
                        ? "border-accent-primary bg-accent-glow text-accent-light shadow-sm shadow-accent-glow/20"
                        : "border-border-medium bg-bg-tertiary/45 text-text-secondary hover:border-border-accent hover:text-text-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Form fields */}
            <motion.form variants={fadeInUp} className="space-y-7" onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="contact-nom" className="text-sm font-medium text-text-primary block mb-2.5">Votre nom <span className="text-accent-light">*</span></label>
                  <input id="contact-nom" name="nom" type="text" required aria-required="true" autoComplete="name" placeholder="Comment vous appelez-vous ?" className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/50 border border-border-medium text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-text-primary block mb-2.5">Votre email <span className="text-accent-light">*</span></label>
                  <input id="contact-email" name="email" type="email" required aria-required="true" autoComplete="email" placeholder="Pour que je puisse vous répondre" className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/50 border border-border-medium text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="contact-entreprise" className="text-sm font-medium text-text-primary block mb-2.5">Votre entreprise <span className="text-text-tertiary font-normal">(facultatif)</span></label>
                  <input id="contact-entreprise" name="entreprise" type="text" autoComplete="organization" placeholder="Le nom de votre activité" className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/50 border border-border-medium text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all" />
                </div>
                <div>
                  <label htmlFor="contact-budget" className="text-sm font-medium text-text-primary block mb-2.5">Votre budget <span className="text-text-tertiary font-normal">(facultatif, juste une idée)</span></label>
                  <select id="contact-budget" name="budget" className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/50 border border-border-medium text-sm text-text-secondary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all appearance-none cursor-pointer">
                    <option>Je préfère en parler</option>
                    <option>Moins de 1 000 €</option>
                    <option>1 000 € — 3 000 €</option>
                    <option>3 000 € — 8 000 €</option>
                    <option>8 000 € — 20 000 €</option>
                    <option>Plus de 20 000 €</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-text-primary block mb-2.5">Ce qui vous amène <span className="text-accent-light">*</span></label>
                <textarea id="contact-message" name="message" rows={6} required aria-required="true" placeholder="Dites-moi avec vos mots ce qui vous prend du temps, ou ce que vous aimeriez. Pas besoin d'être précis." className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/50 border border-border-medium text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all resize-none" />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-3">
                <Button variant="primary" size="lg" type="submit">
                  Envoyer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Button>
                <p className="text-xs text-text-tertiary">Réponse sous 24 h — gratuit, sans engagement</p>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>


      {/* Process */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={12} color="rgba(129,140,248,0.04)" />
        <div className="section-container-narrow">
          <SectionParticles style="dots" count={6} color="rgba(129,140,248,0.06)" />
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Comment ça se passe</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">De votre message à ma proposition</h2>
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


      {/* FAQ */}
      <section className="section-shell">
        <div className="section-container-narrow max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Questions fréquentes</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Les questions qu&apos;on me pose souvent</h2>
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
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="w-full text-left px-7 py-5 flex items-center justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-light/60 focus-visible:outline-offset-[-2px]"
                >
                  <span className="text-sm font-semibold text-text-primary pr-4">{item.q}</span>
                  <motion.svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-text-tertiary flex-shrink-0"
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
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
      <section className="section-shell-compact">
        <div className="section-container-narrow">
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
