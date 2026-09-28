"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const serviceOptions = [
  "Un site web",
  "Une application sur mesure",
  "Automatiser des tâches",
  "Un assistant IA",
  "Je ne sais pas encore",
];

const processSteps = [
  { number: "01", title: "Vous m'écrivez", description: "Décrivez votre besoin en quelques mots. Pas besoin d'un dossier parfait, une idée suffit pour commencer." },
  { number: "02", title: "Je réponds sous 24 h", description: "Je lis votre message et je reviens vers vous avec quelques questions et une première idée de ce qui vous aiderait." },
  { number: "03", title: "On s'appelle 45 minutes", description: "Un premier échange pour bien comprendre votre situation. Gratuit, sans engagement, et vous décidez ensuite." },
  { number: "04", title: "Je vous propose une solution", description: "Vous recevez une proposition claire : ce que je construis, ce que ça change, le prix et le délai. Vous décidez, sans rien devoir." },
];

const faq = [
  {
    q: "Combien ça coûte ?",
    a: [
      "Pour vous situer : un site vitrine simple démarre autour de 500 €, un site vitrine premium entre 1 000 et 2 500 €, un site relié à vos outils (réservation, espace client, paiement) entre 2 500 et 5 000 €, une application sur mesure entre 1 500 et 15 000 € selon le nombre de fonctions.",
      "Pour les automatisations et les assistants IA, le prix dépend du projet : on en parle lors du premier échange, qui est gratuit, et vous savez à quoi vous en tenir avant de décider.",
      "Dans tous les cas, le prix est fixé ensemble avant de démarrer : pas de mauvaise surprise. Et comme je démarre, mes prix sont accessibles.",
    ],
  },
  {
    q: "En combien de temps ?",
    a: [
      "Un site simple : quelques jours à deux semaines. Un site premium : deux à six semaines. Une application : selon la taille, de quelques semaines à quelques mois.",
      "Je vous donne un délai clair dans la proposition, et je m'y tiens.",
    ],
  },
  {
    q: "Je ne suis pas du tout technique, c'est un problème ?",
    a: [
      "Au contraire, c'est mon métier de traduire. Je vous explique tout avec des mots simples, sans jargon.",
      "Vous n'avez jamais besoin de comprendre la technique : dites-moi simplement ce qui vous prend du temps.",
    ],
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: [
      "Pour un assistant IA, vous démarrez par un pilote de 30 jours satisfait ou remboursé : vous arrêtez quand vous voulez, sans frais, et vos données vous sont restituées.",
      "Pour un site ou une application, rien n'est engagé avant la proposition, et le prix est fixé avant de commencer. Vous décidez en connaissance de cause.",
    ],
  },
  {
    q: "Et après la mise en ligne ?",
    a: [
      "Je reste joignable. Je prends le temps de vous montrer comment ça marche, et je suis là pour ajuster ou faire évoluer l'outil quand votre besoin change.",
      "On peut aussi convenir d'un suivi régulier si vous le souhaitez.",
    ],
  },
];

const briefHints = [
  { title: "Ce que vous aimeriez améliorer", description: "Être plus visible, gagner du temps, arrêter de tout retaper à la main : dites-le avec vos mots." },
  { title: "Où vous en êtes aujourd'hui", description: "Un site déjà en place ? Quels outils ? Qu'est-ce qui vous bloque en ce moment ?" },
  { title: "Ce qui compte le plus", description: "Un budget en tête, une date à tenir, une fonction indispensable : ça m'aide à viser juste." },
];

const goodToKnow = [
  "Comme je démarre, mes prix sont accessibles.",
  "Pour un assistant IA, le pilote de 30 jours est satisfait ou remboursé.",
  "Facture électronique : réception obligatoire depuis le 1er septembre 2026, émission obligatoire pour les PME et TPE à partir du 1er septembre 2027. Si c'est votre sujet, dites-le.",
];

/* Connecteur horizontal entre deux étapes du processus (transform only). */
const railReveal: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/* Fil vertical entre deux numéros du guide (transform only). */
const threadReveal: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { opacity: 1, scaleY: 1, transition: { duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nom: String(data.get("nom") ?? ""),
      email: String(data.get("email") ?? ""),
      entreprise: String(data.get("entreprise") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? ""),
      type: selectedService ?? "",
      website: String(data.get("website") ?? ""), // honeypot
    };
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        setSelectedService(null);
      } else {
        setStatus("error");
        setErrorMsg(json.error || "L'envoi a échoué. Réessayez ou écrivez-moi directement par email.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connexion impossible. Vérifiez votre réseau, ou écrivez-moi directement par email.");
    }
  }

  return (
    <>
      <PageAtmosphere preset="contact" />
      <PageHero
        label="Disponible pour de nouveaux projets"
        title={<>Dites-moi ce qui vous <span className="text-gradient-strong">prend du temps</span></>}
        description="Pas besoin de savoir ce qu'il vous faut. Décrivez votre situation avec vos mots : je reviens vers vous sous 24 h avec une première idée, gratuitement et sans engagement."
      />

      {/* Formulaire : sur cette page, le formulaire est le CTA. Il vient juste après le hero. */}
      <section id="formulaire" className="section-shell-tight z-10 scroll-mt-24">
        <SectionParticles style="dots" count={8} color="rgba(129,140,248,0.08)" />
        <div className="section-container-narrow">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-intro-panel rounded-[1.75rem] p-8 sm:p-12 lg:p-14"
          >
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
              <div>
                {/* Type de projet */}
                <motion.div variants={fadeInUp} className="mb-12">
                  <h2 id="type-projet-label" className="text-base font-semibold text-text-primary mb-2">Qu&apos;est-ce qui vous amène ?</h2>
                  <p className="text-sm text-text-secondary/85 mb-5">Choisissez ce qui s&apos;en rapproche le plus. Si vous hésitez, ce n&apos;est pas grave, on en parle.</p>
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

                {/* Champs */}
                <motion.form variants={fadeInUp} className="space-y-7" onSubmit={handleSubmit}>
                  {/* Honeypot anti-spam : invisible, ne doit pas être rempli. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
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
                        <option>1 000 € à 3 000 €</option>
                        <option>3 000 € à 8 000 €</option>
                        <option>8 000 € à 20 000 €</option>
                        <option>Plus de 20 000 €</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-sm font-medium text-text-primary block mb-2.5">Ce qui vous amène <span className="text-accent-light">*</span></label>
                    <textarea id="contact-message" name="message" rows={6} required aria-required="true" placeholder="Avec vos mots : ce que vous aimeriez améliorer, où vous en êtes, ce qui compte le plus. Pas besoin d'être précis." className="w-full px-5 py-3.5 rounded-xl bg-bg-tertiary/50 border border-border-medium text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all resize-none" />
                  </div>

                  {/* Envoi : sur mobile, la réassurance reste au-dessus du bouton (flex-col-reverse). */}
                  <div className="pt-3">
                    <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <Button variant="primary" size="lg" type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
                        {status === "sending" ? "Envoi…" : "Envoyer mon message"}
                        {status !== "sending" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        )}
                      </Button>
                      <p className="text-xs text-text-tertiary">Réponse sous 24 h · gratuit · sans engagement · prix fixé avant de démarrer</p>
                    </div>

                    {/* Retour accessible après envoi */}
                    <div aria-live="polite" className="mt-4 min-h-[1.25rem]">
                      {status === "success" && (
                        <p className="flex items-center gap-2 rounded-xl border border-success/25 bg-success/10 px-4 py-3 text-sm text-success">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                          Merci, votre message est bien parti. Je vous réponds sous 24 h, du lundi au vendredi.
                        </p>
                      )}
                      {status === "error" && (
                        <p className="rounded-xl border border-danger/25 bg-danger/10 px-4 py-3 text-sm text-danger">
                          {errorMsg}{" "}
                          <a href="mailto:contact@solutions2ia.fr" className="underline hover:text-text-primary">contact@solutions2ia.fr</a>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.form>

                {/* Bon à savoir : les trois raisons vraies d'écrire aujourd'hui, à côté du bouton à tous les écrans. */}
                <motion.div variants={fadeInUp} className="mt-8 border-t border-border-subtle pt-8">
                  <p className="text-sm font-semibold text-text-primary">Bon à savoir</p>
                  <ul className="mt-4 space-y-3">
                    {goodToKnow.map((t) => (
                      <li key={t} className="flex gap-3 text-sm leading-6 text-text-secondary">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Guide, à côté du formulaire : un parcours en trois points reliés par un fil */}
              <motion.aside variants={fadeInUp} aria-labelledby="aide-message" className="lg:border-l lg:border-border-subtle lg:pl-10">
                <h3 id="aide-message" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light">Pour un bon premier message</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">Pas besoin d&apos;un dossier. Ces trois éléments suffisent pour que je comprenne le vrai sujet.</p>
                <ol className="mt-6 space-y-5">
                  {briefHints.map((h, i) => (
                    <li key={h.title} className="relative flex gap-4">
                      {i < briefHints.length - 1 && (
                        <motion.span
                          aria-hidden="true"
                          variants={threadReveal}
                          className="pointer-events-none absolute -bottom-5 left-4 top-8 w-px origin-top bg-gradient-to-b from-accent-light/45 via-border-subtle to-border-subtle"
                        />
                      )}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border-subtle bg-bg-tertiary/50 font-mono text-[11px] font-semibold text-accent-light">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{h.title}</p>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">{h.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.aside>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comment ça marche : ce qui se passe après l'envoi */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={12} color="rgba(129,140,248,0.04)" />
        <div className="section-container">
          <SectionHeading
            label="Après votre message"
            title={<>Ce qui se passe <span className="text-gradient-strong">dans les jours qui suivent</span></>}
            description="Quatre étapes, toujours les mêmes. Vous savez à chaque moment où on en est, et rien ne vous engage avant la proposition."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4"
          >
            {processSteps.map((s, i) => (
              <motion.div key={s.number} variants={fadeInUp} className="relative h-full">
                {/* Connecteur vers l'étape suivante, dans le gap de la grille (xl uniquement) */}
                {i < processSteps.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    variants={railReveal}
                    className="pointer-events-none absolute left-full top-12 hidden h-px w-8 origin-left bg-gradient-to-r from-accent-light/55 to-accent-light/15 xl:block"
                  />
                )}
                <div className="h-full rounded-2xl border border-border-subtle bg-bg-card/60 p-6 sm:p-7 card-shine">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border-subtle bg-bg-tertiary/50 font-mono text-xs font-semibold text-accent-light">{s.number}</span>
                  <h3 className="mt-6 text-base font-semibold tracking-[-0.02em] text-text-primary">{s.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ : les objections du moment de cliquer */}
      <section className="section-shell">
        <div className="section-container-reading">
          <SectionHeading
            label="Avant de m'écrire"
            title="Les questions qu'on me pose souvent"
            description="Le prix, le délai, le niveau technique, la sortie et l'après : des réponses courtes, sans détour."
          />
          <ul className="space-y-4">
            {faq.map((item, i) => (
              <li key={item.q}>
                <details className="group rounded-xl border border-border-subtle bg-bg-card/60 transition-colors duration-300 hover:border-border-accent open:border-border-accent">
                  <summary className="flex cursor-pointer items-center gap-4 px-6 py-5 text-left list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-accent-light/60 focus-visible:outline-offset-[-2px]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-card font-mono text-[10px] text-text-tertiary group-open:border-accent-primary/40 group-open:text-accent-light">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-text-primary">{item.q}</span>
                    <svg aria-hidden className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9" /></svg>
                  </summary>
                  <div className="space-y-3 border-t border-border-subtle/60 px-6 py-5 text-sm leading-[1.75] text-text-secondary">
                    {item.a.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sans formulaire : l'email direct, pour ceux qui n'aiment pas les formulaires */}
      <section className="section-shell-compact">
        <div className="section-container-reading">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl border border-border-subtle bg-bg-card/50 px-6 py-8 text-center sm:px-10 sm:py-10 card-shine"
          >
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-text-primary sm:text-2xl">Vous préférez écrire directement ?</h2>
            <a href="mailto:contact@solutions2ia.fr" className="mt-4 inline-flex items-center gap-2.5 text-base font-medium text-accent-light transition-colors hover:text-text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
              contact@solutions2ia.fr
            </a>
            <p className="mt-4 text-sm text-text-tertiary">Réponse sous 24 h du lundi au vendredi · premier appel de 45 minutes gratuit, sans engagement</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
