import {
  BookOpenText,
  Bot,
  Headset,
  LayoutDashboard,
  Languages,
  MonitorSmartphone,
  PenLine,
  UserRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Contenu de /services (refonte d'octobre 2026, « bento de verre », passe UX), séparé du
 * rendu. Prix et délais repris de l'ancienne grille (validée avec la FAQ et /contact) et
 * des faits de référence de docs/contenu-copy.md. Aucun chiffre client : les durées de la
 * journée sont un exemple affiché comme tel.
 */

export type ServiceKey = "web" | "apps" | "auto" | "ai" | "rag";

export type Service = {
  key: ServiceKey;
  icon: LucideIcon;
  /** Nom court (bulles, pastilles, journée). */
  short: string;
  title: string;
  price: string;
  delay: string;
  href: string;
  cta: string;
  /** La fiche : trois lignes, toujours dans cet ordre. */
  situation: string;
  deliver: string;
  change: string;
  /** CTA orienté : la douleur telle que le visiteur la dit, le bouton, le paramètre de /contact. */
  pain: string;
  ctaLabel: string;
  besoin: string;
};

export const SERVICES: Service[] = [
  {
    key: "web",
    icon: MonitorSmartphone,
    short: "Site web",
    title: "Sites web",
    price: "dès 500 €",
    delay: "quelques jours à six semaines",
    href: "/sites-web",
    cta: "Voir des exemples de sites",
    situation: "On vous cherche sur Google et on tombe sur un concurrent, ou sur un site qui fait douter.",
    deliver: "Un site rapide, à votre image, où chaque page mène à une demande.",
    change: "Les visiteurs deviennent des demandes, même quand vous êtes sur un chantier.",
    pain: "Mon site ne m'apporte rien",
    ctaLabel: "Parler de mon site",
    besoin: "site",
  },
  {
    key: "apps",
    icon: LayoutDashboard,
    short: "Application",
    title: "Applications sur mesure",
    price: "dès 1 500 €",
    delay: "quelques semaines à quelques mois",
    href: "/applications",
    cta: "Voir des exemples d'applications",
    situation: "Votre activité tient dans des fichiers Excel, des carnets et votre mémoire.",
    deliver: "Un outil unique, sur ordinateur et téléphone, fait pour votre façon de travailler.",
    change: "Une seule version à jour, et chacun voit ce qui le concerne.",
    pain: "Tout est dans Excel et sur papier",
    ctaLabel: "Parler de mon application",
    besoin: "application",
  },
  {
    key: "auto",
    icon: Workflow,
    short: "Automatisation",
    title: "Automatisations",
    price: "sur devis",
    delay: "fixé dans la proposition",
    href: "/automatisation",
    cta: "Voir ce qui peut se faire seul",
    situation: "Quelqu'un recopie chaque jour la même information d'un logiciel à l'autre.",
    deliver: "Vos outils reliés entre eux : l'information circule seule, et tout est noté.",
    change: "Plus de ressaisie, plus de relance oubliée.",
    pain: "Je ressaisis tout à la main",
    ctaLabel: "Parler de mes ressaisies",
    besoin: "automatisation",
  },
  {
    key: "ai",
    icon: Bot,
    short: "Assistant IA",
    title: "Assistant IA",
    price: "sur devis",
    delay: "3 à 4 semaines",
    href: "/agents-ia",
    cta: "Voir ce qu'il ferait pour vous",
    situation: "Vous répondez aux mêmes mails et refaites les mêmes devis, souvent le soir.",
    deliver: "Un assistant qui trie, prépare et répond selon vos règles. Vous validez.",
    change: "Le répétitif est prêt quand vous arrivez. Pilote de 30 jours, satisfait ou remboursé.",
    pain: "Mails et devis me prennent mes soirées",
    ctaLabel: "Parler de mon assistant",
    besoin: "assistant",
  },
  {
    key: "rag",
    icon: BookOpenText,
    short: "Mémoire d'entreprise",
    title: "Mémoire d'entreprise",
    price: "sur devis",
    delay: "4 à 6 semaines",
    href: "/rag",
    cta: "Voir comment elle répond",
    situation: "On pose toujours les mêmes questions à la personne qui sait.",
    deliver: "Une mémoire branchée sur vos documents, qui répond en citant la page.",
    change: "Chacun trouve seul, et la réponse se vérifie.",
    pain: "On cherche sans cesse les mêmes infos",
    ctaLabel: "Parler de ma mémoire d'entreprise",
    besoin: "memoire",
  },
];

export const serviceByKey = (k: ServiceKey) => SERVICES.find((s) => s.key === k)!;

// ─── La journée (hero) ───────────────────────────────────────────────────────

/** Heures en décimal (8.5 = 8 h 30). Durées d'exemple, affichées comme telles. */
export const DAY_START = 8;
export const DAY_END = 18;

export type DayTask = {
  service: ServiceKey;
  task: string;
  start: number;
  /** Durée aujourd'hui, en minutes. */
  minutes: number;
  /** Ce qu'il en reste avec le service, en minutes (barre raccourcie, pas une promesse chiffrée). */
  after: number;
  /** Ce qui change, en mots. */
  with: string;
};

export const DAY: DayTask[] = [
  { service: "ai", task: "Trier les mails, préparer les devis", start: 8.5, minutes: 90, after: 20, with: "préparés, vous validez" },
  { service: "auto", task: "Recopier d'un logiciel à l'autre", start: 10.5, minutes: 60, after: 0, with: "se fait tout seul" },
  { service: "apps", task: "Retrouver la bonne version du fichier", start: 13.5, minutes: 45, after: 10, with: "une seule version à jour" },
  { service: "rag", task: "Chercher une procédure, un contrat", start: 15, minutes: 40, after: 5, with: "réponse avec la page" },
  { service: "web", task: "Redire tarifs et horaires au téléphone", start: 16.5, minutes: 30, after: 10, with: "c'est déjà sur le site" },
];

export const DAY_NOTE = "Journée d'exemple, durées indicatives. La vôtre, on la regarde ensemble au premier échange.";

// ─── Les prix ────────────────────────────────────────────────────────────────

export type PriceRow = {
  service: ServiceKey;
  label: string;
  price: string;
  note: string;
  replaces: string;
  delay: string;
};

export const PRICES: PriceRow[] = [
  {
    service: "web",
    label: "Site vitrine simple",
    price: "≈ 500 €",
    note: "présenter votre activité, donner envie d'appeler",
    replaces: "les clients qui partent chez le concurrent, faute de site",
    delay: "quelques jours à deux semaines",
  },
  {
    service: "web",
    label: "Site vitrine premium",
    price: "1 000 à 2 500 €",
    note: "design plus poussé, plusieurs pages, animations",
    replaces: "un site vieillissant qui fait douter avant même l'appel",
    delay: "deux à six semaines",
  },
  {
    service: "web",
    label: "Site relié à vos outils",
    price: "2 500 à 5 000 €",
    note: "réservation, espace client, blog, paiement",
    replaces: "les allers-retours de mails pour caler un rendez-vous",
    delay: "fixé dans la proposition",
  },
  {
    service: "apps",
    label: "Application métier",
    price: "1 500 à 15 000 €",
    note: "selon le nombre de fonctions et d'écrans ; au-delà, sur devis",
    replaces: "vos fichiers Excel, la double saisie, le papier",
    delay: "quelques semaines à quelques mois",
  },
  {
    service: "auto",
    label: "Automatisation",
    price: "sur devis",
    note: "on part de vos outils actuels",
    replaces: "la ressaisie quotidienne, les relances oubliées",
    delay: "fixé dans la proposition",
  },
  {
    service: "ai",
    label: "Assistant IA, premier cas d'usage",
    price: "sur devis",
    note: "1 à 2 tâches pour commencer, relié à vos outils",
    replaces: "le tri des mails et les devis préparés à la main",
    delay: "3 à 4 semaines",
  },
  {
    service: "rag",
    label: "Mémoire d'entreprise",
    price: "sur devis",
    note: "branchée sur vos documents et vos outils",
    replaces: "les questions posées dix fois à la personne qui sait",
    delay: "4 à 6 semaines",
  },
];

export const PRICE_INCLUDED = [
  "Le premier échange de 45 minutes, gratuit",
  "Une proposition écrite : prix et délai fixés avant de démarrer",
  "L'avancement montré régulièrement, vous ajustez en route",
  "La mise en main, et je reste joignable après",
];

export const PRICE_VARIES = [
  "Le nombre de pages ou d'écrans",
  "Les outils à relier entre eux",
  "Le nombre de personnes qui s'en servent",
];

export const PRICE_NOTES = [
  "Ces prix sont ceux d'un indépendant qui démarre. Ils évolueront avec mon carnet de commandes.",
  "Automatisation, assistant IA et mémoire d'entreprise : le prix dépend trop du projet pour une fourchette honnête. Il est chiffré après le premier échange et fixé avant de démarrer.",
];

export const GUARANTEE =
  "Assistant IA : 30 jours d'usage réel, satisfait ou remboursé. Vous arrêtez quand vous voulez, sans frais, et vos données vous sont rendues.";

// ─── Ce que vous recevez (après votre message) ───────────────────────────────

export type Artefact = { key: "invite" | "proposal" | "preview" | "live"; n: string; when: string; title: string; text: string };

export const ARTEFACTS: Artefact[] = [
  { key: "invite", n: "01", when: "Sous 24 h", title: "Une invitation", text: "45 minutes ensemble, gratuites. Je cherche ce qui vous coûte du temps avant de proposer quoi que ce soit." },
  { key: "proposal", n: "02", when: "Après l'échange", title: "Une proposition écrite", text: "Ce que je construis, ce que ça change, le prix et le délai. Vous signez seulement si ça vous va." },
  { key: "preview", n: "03", when: "Pendant le projet", title: "Un lien de test", text: "Vous voyez l'outil prendre forme et vous demandez des changements en cours de route." },
  { key: "live", n: "04", when: "À la livraison", title: "C'est en ligne", text: "Je vous montre comment vous en servir, et je reste joignable pour ajuster." },
];

export const WHY_ME: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: UserRound, title: "Un seul interlocuteur : moi", text: "Celui qui comprend votre besoin est celui qui construit. Rien ne se perd en route." },
  { icon: Languages, title: "Des mots simples", text: "Je vous explique ce que je fais sans jargon. Vous savez toujours ce que vous achetez." },
  { icon: PenLine, title: "Un prix clair, dès le départ", text: "Vous savez ce que ça coûte avant de démarrer. Pas de surprise en cours de route." },
  { icon: Headset, title: "Je reste disponible", text: "Réponse sous 24 h, et je reste là après la mise en ligne pour ajuster." },
];

// ─── Avant / après (vous vous reconnaissez ?) ────────────────────────────────

export type Situation = {
  key: string;
  label: string;
  service: ServiceKey | "invoice";
  serviceLabel: string;
  href: string;
  before: string[];
  after: string[];
};

export const SITUATIONS: Situation[] = [
  {
    key: "site",
    label: "On vous trouve mal sur Google",
    service: "web",
    serviceLabel: "Site web",
    href: "/sites-web",
    before: ["On vous cherche sur Google", "On tombe sur un concurrent, ou un site daté", "Le client appelle ailleurs"],
    after: ["On vous trouve", "Le site rassure : services, prix, accès", "La demande arrive dans votre boîte"],
  },
  {
    key: "excel",
    label: "Tout tient dans Excel et sur papier",
    service: "apps",
    serviceLabel: "Application sur mesure",
    href: "/applications",
    before: ["Trois fichiers Excel et un carnet", "Laquelle est la bonne version ?", "On rappelle le même client deux fois"],
    after: ["Un seul outil, sur le téléphone aussi", "Chacun voit ce qui le concerne", "Les relances sont prévues"],
  },
  {
    key: "ressaisie",
    label: "On ressaisit d'un logiciel à l'autre",
    service: "auto",
    serviceLabel: "Automatisation",
    href: "/automatisation",
    before: ["Un mail arrive", "On le recopie dans Excel", "Puis dans le logiciel", "On oublie de relancer"],
    after: ["Le mail arrive", "La fiche se crée toute seule", "La relance part à la bonne date"],
  },
  {
    key: "factures",
    label: "Les factures électroniques arrivent",
    service: "invoice",
    serviceLabel: "Facture électronique",
    href: "/automatisation#facture-electronique-2026",
    before: ["Les factures arrivent en PDF par mail", "On les ressaisit en comptabilité", "Depuis septembre 2026, la réception change de format"],
    after: ["Les factures arrivent par la plateforme", "Elles sont lues et classées", "Il ne reste qu'à valider"],
  },
  {
    key: "mails",
    label: "Les mêmes mails, les mêmes devis",
    service: "ai",
    serviceLabel: "Assistant IA",
    href: "/agents-ia",
    before: ["Les mêmes questions par mail", "Le même devis, refait à la main", "Le soir, la boîte déborde"],
    after: ["Le mail est trié, la réponse préparée", "Le devis est prêt, vous validez", "Vous gardez la décision"],
  },
  {
    key: "questions",
    label: "Les mêmes questions à la même personne",
    service: "rag",
    serviceLabel: "Mémoire d'entreprise",
    href: "/rag",
    before: ["On demande à la personne qui sait", "Elle s'interrompt, cherche, répond", "Le lendemain, même question"],
    after: ["La question est posée à la mémoire", "La réponse cite la bonne page", "La personne qui sait reste concentrée"],
  },
];
