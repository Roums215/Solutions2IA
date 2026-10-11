/**
 * Contenu de /a-propos (refonte d'octobre 2026, « fiche + parcours »), séparé du rendu.
 * Repris de l'ancienne AProposPage : récit, repères, engagements, règles, volet technique,
 * convictions. Les lignes « comment le vérifier » s'appuient sur des faits déjà publiés
 * (proposition écrite, dépôt Git à votre nom, réponse sous 24 h).
 */

export const ID_CARD = {
  name: "Iulian Ionita",
  role: "Développeur indépendant",
  status: "Disponible pour de nouveaux projets",
  rows: [
    { label: "Formation", value: "Ingénierie du web" },
    { label: "Projets", value: "DFT (Digital Factory Telecom), Ramsay Santé" },
    { label: "Métier", value: "Sites, applications, automatisations, assistants IA" },
    { label: "Zone", value: "France, Belgique, Suisse, Luxembourg" },
    { label: "Réponse", value: "Sous 24 h, du lundi au vendredi" },
  ],
  foot: "Un seul interlocuteur, du premier échange à la mise en ligne.",
};

// ─── Mon parcours ────────────────────────────────────────────────────────────

export const STORY = [
  { lead: "Je m'appelle Iulian Ionita.", text: "J'ai été formé en ingénierie du web, puis j'ai travaillé sur des projets pour des entreprises comme DFT (Digital Factory Telecom) et Ramsay Santé, des télécoms à la santé." },
  { lead: "Partout, la même chose.", text: "Des équipes qui perdent un temps fou sur des tâches répétitives, des fichiers Excel dans tous les sens, du papier, des outils qui ne se parlent pas. Et à chaque fois, un outil bien pensé changeait tout." },
  { lead: "Aujourd'hui, je me lance à mon compte", text: "pour faire ça directement pour vous." },
  { lead: "Démarrer, c'est ma force :", text: "je suis disponible, proche, je prends le temps, et mes prix sont accessibles. Vous n'êtes pas un dossier parmi cent. Vous parlez à la personne qui construit." },
];

// ─── Mes engagements ─────────────────────────────────────────────────────────

export type Commitment = { title: string; text: string; verify: string; link?: { label: string; href: string } };

export const COMMITMENTS: Commitment[] = [
  {
    title: "Vous me parlez à moi, directement",
    text: "Pas de commercial, pas de chef de projet, pas d'intermédiaire. La personne qui comprend votre besoin est celle qui construit.",
    verify: "C'est moi qui réponds à votre premier message, et moi qui construis.",
  },
  {
    title: "Je parle votre langue, pas la mienne",
    text: "Le code et l'IA, c'est mon métier, pas le vôtre. Vous comprenez toujours ce que vous payez et pourquoi.",
    verify: "La proposition est écrite sans jargon ; un mot technique y est expliqué.",
  },
  {
    title: "Un prix clair, dès le départ",
    text: "Pas de facture surprise, pas de coûts cachés. Mes tarifs sont ceux d'un début d'activité : un site dès 500 €, une application dès 1 500 €.",
    verify: "Prix et délai sont écrits dans la proposition, avant de démarrer.",
    link: { label: "Voir les fourchettes de prix", href: "/services#prix" },
  },
  {
    title: "Je suis disponible et réactif",
    text: "Quand vous avez une question, vous n'attendez pas une semaine. Et je reste joignable après la mise en ligne.",
    verify: "Réponse sous 24 h, du lundi au vendredi.",
  },
  {
    title: "Je construis pour durer",
    text: "Du code propre, votre site et vos données restent à vous, hébergés en Europe. Vous n'êtes prisonnier de personne, surtout pas de moi.",
    verify: "Le code est déposé sur un espace à votre nom (dépôt Git), prêt à être repris.",
  },
  {
    title: "Je dis la vérité, même quand ça ne m'arrange pas",
    text: "Si un projet n'a pas besoin de moi, je vous le dis. Si une solution plus simple existe, je vous l'indique.",
    verify: "Si un outil ne vous apporterait rien, vous l'entendez dès le premier échange.",
  },
];

// ─── Ma façon de travailler ──────────────────────────────────────────────────

export type Rule = { key: "notes" | "repo" | "devices" | "support"; meta: string; title: string; text: string };

export const RULES: Rule[] = [
  { key: "notes", meta: "Je comprends", title: "D'abord votre besoin réel", text: "Comment vous travaillez et où le temps se perd, avant de proposer la moindre solution." },
  { key: "repo", meta: "Je construis", title: "Proprement, pour durer", text: "Code soigné, lisible sur mobile, rapide et sécurisé, facile à faire évoluer." },
  { key: "devices", meta: "Je vérifie", title: "Que ça marche vraiment", text: "Testé sur ordinateur et téléphone avant la mise en ligne. Pas de surprise le jour J." },
  { key: "support", meta: "Je reste", title: "Disponible après la livraison", text: "Une fois en ligne, je reste joignable pour ajuster et faire évoluer l'outil." },
];

export const TECH_DETAILS = [
  { label: "Avancement", text: "un point où vous voyez le projet fonctionner, au plus tard toutes les deux semaines. Vous ajustez avant que ce soit figé." },
  { label: "Propriété", text: "le code est déposé sur un espace à votre nom (dépôt Git), avec ce qu'il faut pour qu'un autre développeur le reprenne sans moi." },
  { label: "Vérification", text: "tests sur ordinateur et téléphone avant chaque mise en ligne, vitesse de chargement mesurée." },
  {
    label: "Outils",
    text: "des technologies répandues et durables (Next.js, React, TypeScript, base de données PostgreSQL) ; un orchestrateur d'automatisations (n8n) ; des modèles d'IA éprouvés (Claude, Mistral), avec vos données hébergées en Europe.",
  },
];

// ─── Oui / non ───────────────────────────────────────────────────────────────

export const BELIEVE = [
  "Un outil doit vous faire gagner du temps, pas en prendre",
  "On doit comprendre ce qu'on achète, sans être technicien",
  "L'IA est là pour vous aider, pas pour vous remplacer",
  "Vos données vous appartiennent, point",
];

export const REFUSE = [
  "Vous noyer sous le jargon pour avoir l'air savant",
  "Vous vendre quelque chose dont vous n'avez pas besoin",
  "Promettre des délais que je ne peux pas tenir",
  "Cacher les prix ou les conditions",
];
