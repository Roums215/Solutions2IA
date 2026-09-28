import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  Contact,
  Database,
  FileInput,
  FileText,
  GitBranch,
  History,
  LayoutDashboard,
  Mail,
  MessageSquare,
  PhoneCall,
  Receipt,
  RefreshCw,
  Route,
  Send,
  ShoppingCart,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import type { BrandKey } from "./brandLogos";

/**
 * Contenu de /automatisation (V3). Aucune métrique inventée : exemples situés, signalés
 * comme tels ; le seul cas réel est mon propre flux JobPhoning → n8n → Axonaut, présenté
 * en reconstitution. Les intégrations sont « possibles », jamais garanties d'avance.
 */

// ─── 2 · Ce que ça change au quotidien ──────────────────────────────────────

export const DAILY: { n: string; icon: LucideIcon; title: string; today: string; todayFlow?: string[]; with: string }[] = [
  {
    n: "01",
    icon: FileInput,
    title: "Vous recopiez la même information",
    today: "Elle passe d'un outil à l'autre à la main.",
    todayFlow: ["Mail", "Excel", "Fichier clients"],
    with: "Une seule saisie alimente le reste.",
  },
  {
    n: "02",
    icon: RefreshCw,
    title: "Vous relancez à la main",
    today: "Tout repose sur l'agenda, les notes et votre mémoire.",
    with: "Les relances partent selon vos règles, aux bonnes dates.",
  },
  {
    n: "03",
    icon: Route,
    title: "Une information reste bloquée",
    today: "Quelqu'un doit penser à la transmettre.",
    with: "Elle arrive dans le bon outil, tout de suite.",
  },
  {
    n: "04",
    icon: History,
    title: "Vous vérifiez si tout a été fait",
    today: "Plusieurs outils à ouvrir pour s'en assurer.",
    with: "Un journal montre ce qui s'est passé, et quand.",
  },
];

// ─── 3 · Le cas réel : JobPhoning → n8n → Axonaut ───────────────────────────

export const REAL_CASE = {
  n8nSteps: [
    { title: "Normaliser", text: "téléphone et mail au même format" },
    { title: "Vérifier les doublons", text: "le contact existe-t-il déjà ?" },
    { title: "Enrichir l'entreprise", text: "si l'information publique est disponible" },
    { title: "Décider", text: "créer, compléter ou ignorer" },
  ],
  axonaut: ["Contact", "Entreprise", "Opportunité"],
  journal: [
    { time: "09:42", text: "Appel qualifié" },
    { time: "09:42", text: "Contact normalisé" },
    { time: "09:42", text: "Entreprise retrouvée" },
    { time: "09:42", text: "Opportunité créée" },
    { time: "09:43", text: "Commercial prévenu" },
  ],
};

// ─── 4 · Vos outils travaillent ensemble ────────────────────────────────────

export type DestinationId = "crm" | "agenda" | "facturation" | "messagerie" | "tableau";

export const DESTINATIONS: { id: DestinationId; icon: LucideIcon; label: string }[] = [
  { id: "crm", icon: Contact, label: "Fichier clients" },
  { id: "agenda", icon: CalendarDays, label: "Agenda" },
  { id: "facturation", icon: Receipt, label: "Facturation" },
  { id: "messagerie", icon: Send, label: "Messagerie" },
  { id: "tableau", icon: LayoutDashboard, label: "Tableau de bord" },
];

export const WORKFLOW_STAGES: { key: "trigger" | "condition" | "transform" | "action"; label: string; icon: LucideIcon }[] = [
  { key: "trigger", label: "Déclencheur", icon: Webhook },
  { key: "condition", label: "Condition", icon: GitBranch },
  { key: "transform", label: "Transformation", icon: RefreshCw },
  { key: "action", label: "Action", icon: Send },
];

export const EVENTS: {
  id: string;
  icon: LucideIcon;
  label: string;
  stages: Record<"trigger" | "condition" | "transform" | "action", string>;
  chain: string[];
  to: DestinationId[];
}[] = [
  {
    id: "mail",
    icon: Mail,
    label: "Mail",
    stages: { trigger: "Un mail arrive", condition: "S'il contient une pièce jointe", transform: "Les données de la pièce sont lues", action: "Le dossier est créé, l'équipe prévenue" },
    chain: ["Mail reçu", "pièce jointe détectée", "données extraites", "dossier créé", "équipe prévenue"],
    to: ["tableau", "messagerie"],
  },
  {
    id: "appel",
    icon: PhoneCall,
    label: "Appel",
    stages: { trigger: "Un appel se termine", condition: "Si le contact est intéressé", transform: "Contact nettoyé, doublon vérifié", action: "Fiche et opportunité créées" },
    chain: ["Appel terminé", "intérêt confirmé", "contact nettoyé", "fiche créée", "commercial prévenu"],
    to: ["crm", "messagerie"],
  },
  {
    id: "commande",
    icon: ShoppingCart,
    label: "Commande",
    stages: { trigger: "Une commande est validée", condition: "Si le stock suffit", transform: "Le bon de préparation est généré", action: "Facture créée, client prévenu" },
    chain: ["Commande validée", "stock vérifié", "bon de préparation", "facture créée", "client prévenu"],
    to: ["facturation", "messagerie", "tableau"],
  },
  {
    id: "formulaire",
    icon: FileInput,
    label: "Formulaire",
    stages: { trigger: "Un formulaire est envoyé", condition: "Si un créneau est libre", transform: "La fiche client est préparée", action: "Rendez-vous posé, confirmation envoyée" },
    chain: ["Formulaire reçu", "créneau trouvé", "fiche préparée", "rendez-vous posé", "confirmation envoyée"],
    to: ["crm", "agenda", "messagerie"],
  },
  {
    id: "document",
    icon: FileText,
    label: "Document",
    stages: { trigger: "Un document est déposé", condition: "Si c'est une facture fournisseur", transform: "Montant et échéance sont lus", action: "L'écriture est préparée pour la comptabilité" },
    chain: ["Document déposé", "facture reconnue", "montant et échéance lus", "écriture préparée", "échéance suivie"],
    to: ["facturation", "tableau"],
  },
];

/** Neuf outils seulement, pas un mur de logos. Clés de `BRAND_LOGOS` quand le logo existe. */
export const INTEGRATIONS: { label: string; logo: BrandKey }[] = [
  { label: "Google Workspace", logo: "gmail" },
  { label: "Microsoft 365", logo: "outlook" },
  { label: "Slack", logo: "slack" },
  { label: "Notion", logo: "notion" },
  { label: "HubSpot", logo: "hubspot" },
  { label: "Axonaut", logo: "axonaut" },
  { label: "Shopify", logo: "shopify" },
  { label: "Agenda", logo: "google-calendar" },
  { label: "n8n", logo: "n8n" },
];

// ─── 5 · Par métier ─────────────────────────────────────────────────────────

export type StepKind = "Déclencheur" | "Condition" | "Action" | "Notification";

export const TRADES: {
  id: string;
  label: string;
  icon: LucideIcon;
  steps: { kind: StepKind; title: string; text: string; icon: LucideIcon }[];
  result: { title: string; lines: string[] };
  href?: string;
}[] = [
  {
    id: "immobilier",
    label: "Immobilier",
    icon: Contact,
    steps: [
      { kind: "Déclencheur", title: "Nouvelle demande", text: "elle arrive d'un portail d'annonces ou du site", icon: Webhook },
      { kind: "Action", title: "Fiche prospect", text: "créée avec ses critères de recherche", icon: Contact },
      { kind: "Condition", title: "Attribution", text: "au conseiller du secteur concerné", icon: GitBranch },
      { kind: "Action", title: "Relance", text: "à J+2 si le prospect n'a pas répondu", icon: RefreshCw },
      { kind: "Action", title: "Visite", text: "créneau proposé puis confirmé", icon: CalendarDays },
      { kind: "Notification", title: "Suivi", text: "compte rendu et prochaine étape au conseiller", icon: Bell },
    ],
    result: { title: "Prospect · T3 centre-ville", lines: ["Conseiller attribué", "Visite samedi 10 h", "Relance programmée"] },
    href: "/automatisation/immobilier",
  },
  {
    id: "cabinet",
    label: "Cabinet / conseil",
    icon: FileText,
    steps: [
      { kind: "Déclencheur", title: "Document reçu", text: "par mail ou dépôt sur l'espace client", icon: Webhook },
      { kind: "Action", title: "Dossier classé", text: "rangé chez le bon client, au bon exercice", icon: Database },
      { kind: "Action", title: "Donnée extraite", text: "montant, date, référence", icon: FileText },
      { kind: "Condition", title: "Tâche créée", text: "pour le collaborateur si une pièce manque", icon: GitBranch },
      { kind: "Notification", title: "Client prévenu", text: "pièce reçue ou pièce à envoyer", icon: Send },
    ],
    result: { title: "Dossier client · exercice 2026", lines: ["3 pièces classées", "1 pièce réclamée", "Tâche au collaborateur"] },
    href: "/automatisation/cabinet-comptable",
  },
  {
    id: "btp",
    label: "BTP / terrain",
    icon: ClipboardCheck,
    steps: [
      { kind: "Déclencheur", title: "Photo ou formulaire terrain", text: "envoyé depuis le chantier", icon: Webhook },
      { kind: "Action", title: "Dossier chantier", text: "mis à jour avec les photos", icon: Database },
      { kind: "Action", title: "Rapport", text: "généré en PDF", icon: FileText },
      { kind: "Condition", title: "Devis complémentaire", text: "préparé si des travaux s'ajoutent", icon: GitBranch },
      { kind: "Notification", title: "Client prévenu", text: "rapport et devis envoyés pour accord", icon: Send },
    ],
    result: { title: "Chantier · rénovation bureaux", lines: ["Rapport PDF envoyé", "Devis complémentaire prêt", "Dossier à jour"] },
    href: "/automatisation/btp",
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: ShoppingCart,
    steps: [
      { kind: "Déclencheur", title: "Commande", text: "passée en boutique en ligne ou au comptoir", icon: Webhook },
      { kind: "Condition", title: "Stock", text: "vérifié puis mis à jour", icon: GitBranch },
      { kind: "Action", title: "Préparation", text: "bon généré pour l'équipe", icon: ClipboardCheck },
      { kind: "Action", title: "Facture", text: "créée et envoyée", icon: Receipt },
      { kind: "Notification", title: "Client prévenu", text: "commande prête ou expédiée", icon: MessageSquare },
    ],
    result: { title: "Commande · retrait samedi", lines: ["Stock mis à jour", "Facture envoyée", "Client prévenu"] },
  },
  {
    id: "formation",
    label: "Formation",
    icon: CalendarDays,
    steps: [
      { kind: "Déclencheur", title: "Inscription", text: "reçue par le formulaire du site", icon: Webhook },
      { kind: "Action", title: "Dossier stagiaire", text: "créé avec la session choisie", icon: Database },
      { kind: "Action", title: "Documents", text: "convention et programme envoyés", icon: FileText },
      { kind: "Action", title: "Convocation", text: "envoyée une semaine avant", icon: CalendarDays },
      { kind: "Condition", title: "Relance", text: "si une pièce manque encore", icon: RefreshCw },
    ],
    result: { title: "Stagiaire · session de mars", lines: ["Dossier complet", "Convocation envoyée", "Aucune relance à faire"] },
    href: "/automatisation/formation",
  },
];

// ─── 6 · Facture électronique ───────────────────────────────────────────────

export const INVOICE_FLOW: { label: string; icon: LucideIcon }[] = [
  { label: "Votre logiciel", icon: Database },
  { label: "Facture", icon: Receipt },
  { label: "Transmission", icon: Send },
  { label: "Statut", icon: History },
  { label: "Comptabilité", icon: FileText },
  { label: "Relance", icon: RefreshCw },
];

export const INVOICE_POINTS = [
  "Émission au bon format, depuis vos outils actuels.",
  "Suivi des statuts : déposée, acceptée, payée.",
  "Rapprochement et relances, selon ce que vos outils permettent.",
];

// ─── 7 · Comment on démarre ─────────────────────────────────────────────────

export const METHOD: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Observer", text: "Vous me montrez où vous perdez du temps." },
  { n: "02", title: "Dessiner le flux", text: "On décide ce qui déclenche quoi." },
  { n: "03", title: "Tester", text: "On le fait tourner sur de vrais cas." },
  { n: "04", title: "Déployer", text: "On élargit seulement si ça vous fait réellement gagner du temps." },
];

export const DELIVERABLES: { label: string; detail: string }[] = [
  { label: "Déclencheur défini", detail: "ce qui lance l'automatisation, écrit noir sur blanc" },
  { label: "Règles écrites", detail: "ce qu'elle fait, et ce qu'elle ne fait pas" },
  { label: "Erreurs prévues", detail: "ce qui se passe si un outil ne répond pas" },
  { label: "Journal activé", detail: "chaque passage est enregistré" },
  { label: "Désactivable à tout moment", detail: "vous reprenez la main quand vous voulez" },
];
