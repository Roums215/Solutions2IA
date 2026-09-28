"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

const services = [
  {
    title: "Sites web",
    description: "Un site clair, rapide et beau, qui donne envie de vous contacter. De la simple vitrine au site relié à vos outils.",
    href: "/sites-web",
    gradient: "from-accent-primary to-accent-light",
    includes: ["Design soigné, à votre image", "Rapide sur mobile et ordinateur", "Bien trouvé sur Google", "Hébergement et mise en ligne"],
    price: "dès 500 €",
    cta: "Voir des exemples de sites",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
  {
    title: "Applications sur mesure",
    description: "L'outil qui remplace vos fichiers Excel et votre papier : un seul endroit, simple, fait pour votre façon de travailler.",
    href: "/applications",
    gradient: "from-accent-light to-cyan",
    includes: ["Sur ordinateur et téléphone", "Espaces selon les rôles", "Relié à vos autres outils", "Tableau de bord pour suivre"],
    price: "dès 1 500 €",
    cta: "Voir des exemples d'applications",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>,
  },
  {
    title: "Automatisations",
    description: "Vos logiciels se parlent enfin. Les tâches répétitives (ressaisies, relances, transferts) se font toutes seules.",
    href: "/automatisation",
    gradient: "from-accent-dark to-cyan",
    includes: ["On part de vos outils actuels", "Plus de ressaisie à la main", "Vous gardez le contrôle", "Je surveille que ça tourne"],
    price: "sur devis",
    cta: "Voir ce qui peut se faire tout seul",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    title: "Assistant intelligent",
    description: "Un collègue numérique qui trie vos mails, prépare vos devis et répond à vos clients. Il fait le répétitif, vous décidez.",
    href: "/agents-ia",
    gradient: "from-cyan to-accent-primary",
    includes: ["Il connaît votre métier", "Relié à vos outils", "Vous validez avant l'envoi", "Vous voyez ce qu'il fait"],
    price: "sur devis",
    cta: "Voir ce qu'il ferait pour vous",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="9" cy="16" r="1" fill="currentColor" /><circle cx="15" cy="16" r="1" fill="currentColor" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>,
  },
  {
    title: "Mémoire d'entreprise",
    description: "Vos documents deviennent une IA qui répond, en citant le bon fichier. Plus besoin de déranger la personne qui sait.",
    href: "/rag",
    gradient: "from-accent-light to-accent-primary",
    includes: ["Branchée sur vos documents", "Répond en citant la source", "Vos données restent en Europe", "Se met à jour toute seule"],
    price: "sur devis",
    cta: "Voir comment elle répond",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6c2-1 5-1 7 0v13c-2-1-5-1-7 0V6z" /><path d="M21 6c-2-1-5-1-7 0v13c2-1 5-1 7 0V6z" /><path d="M10 19c0-1.5 1-2 2-2s2 0.5 2 2" /></svg>,
  },
];

// Glow par carte (format r,g,b attendu par SpotlightCard). Hors du map : constante, pas recréée à chaque rendu.
const cardGlows = ["99,102,241", "34,211,238", "129,140,248", "14,165,233", "147,197,253"];

// Grille tarifaire affichée (validée : FAQ pricing + délais de /contact et faqData). Transparence = confiance.
// « Remplace » = gain qualitatif en face du prix, sans chiffre inventé. « Délai » = repris mot pour mot des sources.
const pricing = [
  {
    label: "Site vitrine simple",
    price: "≈ 500 €",
    note: "présenter votre activité, donner envie d'appeler",
    replaces: "les clients qui partent chez le concurrent, faute de site",
    delay: "quelques jours à deux semaines",
  },
  {
    label: "Site vitrine premium",
    price: "1 000 à 2 500 €",
    note: "design plus poussé, plusieurs pages, animations",
    replaces: "un site vieillissant qui fait douter avant même l'appel",
    delay: "deux à six semaines",
  },
  {
    label: "Site relié à vos outils",
    price: "2 500 à 5 000 €",
    note: "réservation, espace client, blog, paiement",
    replaces: "les allers-retours de mails pour caler un rendez-vous",
    delay: "fixé dans la proposition",
  },
  {
    label: "Application métier",
    price: "1 500 à 15 000 €",
    note: "selon le nombre de fonctions et d'écrans · plateforme complète : au-delà, sur devis",
    replaces: "vos fichiers Excel, la double saisie, le papier",
    delay: "quelques semaines à quelques mois",
  },
  {
    label: "Automatisation",
    price: "sur devis",
    note: "on part de vos outils actuels · chiffrée après un premier échange gratuit",
    replaces: "la ressaisie quotidienne, les relances oubliées",
    delay: "fixé dans la proposition",
  },
  {
    label: "Assistant IA, premier cas d'usage",
    price: "sur devis",
    note: "1 à 2 tâches pour commencer, relié à vos outils · chiffré après un premier échange gratuit",
    replaces: "le tri des mails et les devis préparés à la main",
    delay: "3 à 4 semaines",
  },
  {
    label: "Mémoire d'entreprise",
    price: "sur devis",
    note: "branchée sur vos documents et vos outils · chiffrée après un premier échange gratuit",
    replaces: "les questions posées dix fois à la personne qui sait",
    delay: "fixé dans la proposition",
  },
];

const approach = [
  { title: "Un seul interlocuteur : moi", description: "La personne qui comprend votre besoin est celle qui construit. Pas d'intermédiaire, rien ne se perd entre ce que vous dites et ce qui est codé." },
  { title: "Des mots simples", description: "Je vous explique ce que je fais sans jargon. Vous comprenez toujours ce que vous achetez et pourquoi." },
  { title: "Un prix clair, dès le départ", description: "Vous savez ce que ça coûte avant de démarrer. Pas de mauvaise surprise en cours de route." },
  { title: "Je reste disponible", description: "Réponse sous 24 h, et je reste là après la mise en ligne pour ajuster ce qui doit l'être." },
];

const serviceFlow = [
  {
    meta: "On se parle",
    title: "Vous m'expliquez votre besoin",
    description: "Premier échange gratuit de 45 minutes. Je cherche ce qui vous prend du temps ou ce qui vous manque, avant de proposer quoi que ce soit.",
  },
  {
    meta: "Je propose",
    title: "Une solution simple et chiffrée",
    description: "Vous recevez une proposition claire : ce que je construis, ce que ça change pour vous, le prix et le délai.",
  },
  {
    meta: "Je construis",
    title: "Vous suivez l'avancement",
    description: "Je vous montre le projet qui prend forme régulièrement. Vous ajustez en cours de route, rien n'est figé jusqu'au bout.",
  },
  {
    meta: "Ça tourne",
    title: "Mise en ligne, et je reste là",
    description: "On déploie en douceur, je prends le temps de vous montrer, et je fais évoluer l'outil quand votre besoin change.",
  },
];

// Six situations reconnaissables, chacune reliée au service qui y répond (case « pour qui » de l'ordre imposé).
const situations = [
  { text: "On vous trouve mal sur Google, ou votre site fait douter.", href: "/sites-web", service: "Site web" },
  { text: "Votre activité tient dans des fichiers Excel et du papier.", href: "/applications", service: "Application sur mesure" },
  { text: "Quelqu'un ressaisit chaque jour la même information d'un logiciel à l'autre.", href: "/automatisation", service: "Automatisation" },
  { text: "Vous devez recevoir des factures électroniques depuis septembre 2026 et rien n'est prêt.", href: "/automatisation#facture-electronique-2026", service: "Facture électronique" },
  { text: "Vous répondez aux mêmes mails et refaites les mêmes devis.", href: "/agents-ia", service: "Assistant intelligent" },
  { text: "On pose toujours les mêmes questions à la personne qui sait.", href: "/rag", service: "Mémoire d'entreprise" },
];

// Le seul schéma de la page : les cinq services empilés, du site (l'entrée) à la mémoire d'entreprise (le socle).
const stackLayers = [
  { name: "Site web", role: "l'entrée : ce que voient vos clients" },
  { name: "Application sur mesure", role: "l'outil du quotidien, à la place d'Excel" },
  { name: "Automatisations", role: "les liaisons entre vos logiciels" },
  { name: "Assistant intelligent", role: "le collègue numérique qui fait le répétitif" },
  { name: "Mémoire d'entreprise", role: "le socle : vos documents qui répondent" },
];

function ServicesStackVisual() {
  const { disableContentMotion } = usePerformanceMode();
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 rounded-full bg-accent-glow blur-[110px]" />
      <div aria-hidden="true" className="relative [perspective:1400px]">
        <div
          className="relative space-y-3"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(12deg) rotateY(-6deg)" }}
        >
          <div className="pointer-events-none absolute bottom-6 left-7 top-6 w-px bg-gradient-to-b from-accent-light/50 via-cyan/30 to-transparent" />
          {stackLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              className="relative flex items-center gap-4 rounded-2xl border border-border-subtle bg-bg-card/70 px-5 py-4 shadow-lg shadow-accent-glow/20"
              style={{ z: (stackLayers.length - i) * 14 }}
              animate={disableContentMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 5 + i * 0.7, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-accent-light/20 bg-accent-glow font-mono text-[11px] font-bold text-accent-light">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-text-primary">{layer.name}</span>
                <span className="mt-0.5 block truncate text-xs text-text-tertiary">{layer.role}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-text-tertiary">
        Commencez par une seule brique. Les autres s&apos;ajoutent quand vous voulez.
      </p>
    </div>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageAtmosphere preset="services" />
      <PageHero
        label="Ce que je fais"
        title={<>Cinq façons de vous faire <span className="text-gradient-strong">gagner du temps</span></>}
        description="Sites web, applications, automatisations, assistants IA, mémoire d'entreprise. Cinq services, une seule logique : remplacer ce qui vous prend du temps par un outil qui le fait à votre place."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Qui je suis", href: "/a-propos" }}
        note="Sites web dès 500 €, applications dès 1 500 €. Le premier échange dure 45 minutes, sans engagement."
        visual={<ServicesStackVisual />}
        mobileSteps={[
          { label: "Site web", hint: "l'entrée : ce que voient vos clients" },
          { label: "Application", hint: "l'outil du quotidien" },
          { label: "Assistant IA", hint: "le collègue numérique" },
        ]}
      />


      {/* Services détaillés */}
      <section className="section-shell">
        <SectionParticles style="dots" count={12} color="rgba(129,140,248,0.1)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="section-container">
          <SectionHeading
            label="Les cinq services"
            title="Ce que je peux construire pour vous"
            description="Cliquez sur un service pour voir des exemples concrets. Chacun part du même point : votre besoin réel, pas une solution toute faite."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-10 lg:space-y-12"
          >
            {services.map((service, idx) => (
              <motion.div key={service.href} variants={fadeInUp}>
                <Link href={service.href} className="group block">
                  <SpotlightCard glow={cardGlows[idx % cardGlows.length]} tilt={3} pulse className="overflow-hidden">
                    <div className="p-8 sm:p-10 lg:p-12">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-14">
                        {/* Icon + Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-5 mb-5">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg shadow-accent-glow/20 transition-shadow duration-500 group-hover:shadow-accent-glow/40`} style={{ transform: "translateZ(30px)" }}>
                              {service.icon}
                            </div>
                            <div style={{ transform: "translateZ(20px)" }}>
                              <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent-light transition-colors duration-300">{service.title}</h3>
                              <span className="mt-1 inline-block rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-0.5 text-xs font-semibold text-cyan">{service.price}</span>
                            </div>
                          </div>
                          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">{service.description}</p>
                          <span className="text-sm text-text-tertiary group-hover:text-accent-light transition-colors flex items-center gap-2">
                            {service.cta}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </span>
                        </div>

                        {/* Livrables */}
                        <div className="lg:w-72 flex-shrink-0">
                          <span className="text-[11px] uppercase tracking-[0.15em] text-text-tertiary block mb-4">Ce que vous y gagnez</span>
                          <div className="space-y-2">
                            {service.includes.map((item) => (
                              <div key={item} className="flex items-center gap-2.5">
                                <div className="w-4 h-4 rounded-full bg-accent-glow/50 border border-accent-primary/15 flex items-center justify-center flex-shrink-0">
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <span className="text-sm text-text-secondary">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Tarifs : transparence = confiance. id="prix" = cible du lien « Voir la grille de prix complète » de la FAQ */}
      <section id="prix" className="section-shell scroll-mt-24">
        <div className="section-container">
          <SectionHeading
            label="Les prix, sans détour"
            title="Combien ça coûte ?"
            description="Des fourchettes claires pour situer votre projet. Le prix exact dépend de vos besoins (il peut être plus bas comme plus haut) et il est fixé ensemble, avant de démarrer."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {pricing.map((p, i) => (
              <motion.div
                key={p.label}
                variants={fadeInUp}
                className={`rounded-2xl border border-border-subtle bg-bg-card/60 px-6 py-5 ${i === pricing.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary">{p.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-text-tertiary">{p.note}</p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-sm font-semibold text-cyan">
                    {p.price}
                  </span>
                </div>
                <dl className="mt-4 grid gap-1.5 border-t border-border-subtle pt-4 text-xs sm:grid-cols-[auto_1fr] sm:gap-x-3">
                  <dt className="text-text-tertiary">Remplace</dt>
                  <dd className="text-text-secondary">{p.replaces}</dd>
                  <dt className="text-text-tertiary">Délai</dt>
                  <dd className="text-text-secondary">{p.delay}</dd>
                </dl>
              </motion.div>
            ))}
          </motion.div>
          <div className="mx-auto mt-10 max-w-2xl text-center text-sm text-text-tertiary">
            <p>
              Ces prix sont ceux d&apos;un indépendant qui démarre. Ils évolueront avec mon carnet de commandes.
            </p>
            <p className="mt-4">
              Automatisations, assistant IA et mémoire d&apos;entreprise : le prix dépend trop du projet pour une fourchette honnête. On en parle lors du premier échange, c&apos;est gratuit.
            </p>
            <p className="mx-auto mt-4 max-w-xl rounded-xl border border-accent-primary/20 bg-accent-glow px-5 py-3 text-text-secondary">
              Pour un assistant IA : 30 jours d&apos;usage réel, satisfait ou remboursé. Vous arrêtez quand vous voulez, sans frais, et vos données vous sont rendues.
            </p>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-shell-tight">
        <div className="section-container">
          <SectionHeading
            label="Comment ça marche"
            title="Ce qui se passe après votre message"
          />
          <PremiumFlowPanel
            headingLevel="h3"
            label="Quatre étapes"
            title="De votre besoin à l'outil qui tourne."
            description="La même méthode pour tous les projets, du petit site à l'application : on se parle, je propose, je construis, ça tourne."
            steps={serviceFlow}
            accent="129, 140, 248"
          />
        </div>
      </section>


      {/* Approche */}
      <section className="section-shell">
        <SectionParticles style="hexagons" count={8} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <SectionHeading
            label="Travailler avec moi"
            title="Ce qui change quand vous passez par un indépendant"
            description="Je ne suis pas une agence. Voici, concrètement, ce que ça change pour vous."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2"
          >
            {approach.map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp} className="relative pl-8 group">
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-border-medium to-transparent" />
                {/* Barre d'accent : s'allonge au survol via scaleY (jamais height) */}
                <div className="absolute left-[-1.5px] top-0 h-20 w-[4px] origin-top scale-y-[0.6] rounded-full bg-gradient-to-b from-accent-primary to-cyan opacity-50 blur-[2px] transition-[transform,scale,opacity] duration-500 group-hover:scale-y-100 group-hover:opacity-100" />
                <span className="text-xs text-accent-light/40 font-mono font-bold block mb-2">0{i + 1}</span>
                <h3 className="text-lg font-semibold mb-3 tracking-tight group-hover:text-accent-light transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pour qui : liste légère, sans carte, pour ne pas concurrencer le CTA */}
      <section className="section-shell-compact">
        <div className="section-container">
          <SectionHeading
            label="Six situations"
            title="Vous vous reconnaissez ?"
            description="Six situations fréquentes dans les petites entreprises. À chacune, une réponse."
          />
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto flex max-w-3xl flex-col divide-y divide-border-subtle"
          >
            {situations.map((s) => (
              <motion.li key={s.href} variants={fadeInUp}>
                <Link href={s.href} className="group flex items-center justify-between gap-6 py-5">
                  <span className="text-base text-text-secondary transition-colors duration-300 group-hover:text-text-primary">{s.text}</span>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent-light">
                    {s.service}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <CTABand
        title={<>Vous ne savez pas par où <span className="text-gradient-strong">commencer</span> ?</>}
        description="C'est normal, et c'est justement mon travail. Expliquez-moi votre situation lors d'un premier échange gratuit : je vous dis ce qui vous aiderait le plus, simplement."
        primaryLabel="Premier échange gratuit"
        secondary={null}
      />
    </>
  );
}
