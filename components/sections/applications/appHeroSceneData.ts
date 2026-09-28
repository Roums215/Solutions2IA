import {
  BarChart3,
  Building2,
  CalendarCheck,
  FileSpreadsheet,
  FileText,
  HardHat,
  Mail,
  MessageSquare,
  MonitorCog,
  PenLine,
  ShoppingBag,
  Stethoscope,
  Truck,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Scène du hero de /applications : d'un « bazar » coûteux à un outil métier clair.
 * Données d'exemple uniquement, affichées comme telles (« Maquette · données
 * d'exemple »). Aucun chiffre de résultat client : les indicateurs décrivent ce que
 * l'outil fait, pas un gain mesuré chez quelqu'un.
 *
 * Cinq temps : avant éparpillé → tout converge → l'outil fait circuler →
 * résultat → la même logique pour votre métier.
 */

export type AppStep = 0 | 1 | 2 | 3 | 4 | 5;
export const APP_IDLE: AppStep = 0;
export const APP_FINAL: AppStep = 5;
export const APP_IDLE_DURATION = 1400;

export const APP_SCENE_STEPS: { title: string; line: string; duration: number }[] = [
  { title: "Aujourd'hui, c'est éparpillé", line: "Excel, mails, papier, logiciels : la même information vit à cinq endroits.", duration: 4400 },
  { title: "Tout converge vers votre outil", line: "Une seule application, construite pour votre façon de travailler.", duration: 4400 },
  { title: "L'outil fait circuler l'information", line: "Chaque dossier part au bon endroit : tableau de bord, alertes, rapports, agenda.", duration: 5200 },
  { title: "Moins de ressaisie, plus de visibilité", line: "Une saisie, des infos à jour, des tâches qui se font toutes seules.", duration: 4400 },
  { title: "La même logique, pour votre métier", line: "Cabinet, chantier, commerce, transport : l'outil parle votre langue.", duration: 6400 },
];

export const APP_SCENE_SHORT = ["Éparpillé", "Converge", "Circule", "Résultat", "Votre métier"];

export const APP_SCENE_LABEL =
  "Démonstration illustrée avec des données d'exemple. Au départ, l'information est éparpillée entre Excel, mails, papier, un logiciel mal adapté et des messages du terrain. Tout converge vers une application métier unique. L'application fait circuler chaque dossier vers un tableau de bord, des alertes, des rapports envoyés au client, l'agenda et l'équipe. Résultat : une seule saisie, des informations à jour, des automatisations actives. La même logique s'adapte à la santé, au BTP, aux services, au commerce et au transport.";

/** Temps internes des objets, en secondes depuis le début de l'étape. */
export const T = {
  chaos: 0.3,
  chaosGap: 0.35,
  chaosTag: 2.0,
  chaosTagGap: 0.25,
  converge: 0.2,
  convergeGap: 0.18,
  appEnter: 0.9,
  appRows: 1.6,
  appRowGap: 0.3,
  inputs: 2.5,
  inputGap: 0.15,
  output: 0.7,
  outputGap: 0.75,
  statusResolve: 0.9,
  indicator: 0.5,
  indicatorGap: 0.55,
  sectorEvery: 1.2,
  linkDraw: 0.8,
  linkFlow: 1.0,
} as const;

// ─── Avant : le bazar ───────────────────────────────────────────────────────

export type ChaosId = "excel" | "mails" | "papier" | "logiciel" | "terrain";

export const CHAOS: { id: ChaosId; icon: LucideIcon; title: string; meta: string; tag: string; x: number; y: number; w: number; rot: number }[] = [
  { id: "excel", icon: FileSpreadsheet, title: "suivi_v7_FINAL(2).xlsx", meta: "modifié par 4 personnes", tag: "Quelle version ?", x: 6, y: 18, w: 222, rot: -3 },
  { id: "mails", icon: Mail, title: "RE: TR: RE: dossier 0421", meta: "12 messages · pièce jointe ?", tag: "Info perdue", x: 44, y: 128, w: 214, rot: 2.5 },
  { id: "papier", icon: PenLine, title: "Fiche d'intervention", meta: "remplie à la main", tag: "À ressaisir", x: 0, y: 236, w: 196, rot: -4 },
  { id: "logiciel", icon: MonitorCog, title: "Logiciel généraliste", meta: "abonnement par utilisateur", tag: "Cher, mal adapté", x: 52, y: 336, w: 210, rot: 3 },
  { id: "terrain", icon: MessageSquare, title: "Photos et messages", meta: "envoyés depuis le terrain", tag: "Pas centralisé", x: 10, y: 440, w: 204, rot: -2 },
];

/** Après la convergence : les mêmes sources, rangées et reliées. */
export const INPUTS: { id: ChaosId; icon: LucideIcon; label: string; becomes: string }[] = [
  { id: "papier", icon: PenLine, label: "Papier", becomes: "saisi sur téléphone" },
  { id: "excel", icon: FileSpreadsheet, label: "Excel", becomes: "importé une fois" },
  { id: "mails", icon: Mail, label: "Mails", becomes: "demandes captées" },
  { id: "logiciel", icon: MonitorCog, label: "Logiciel existant", becomes: "relié, pas remplacé" },
  { id: "terrain", icon: MessageSquare, label: "Terrain", becomes: "photos au dossier" },
];

// ─── L'application : contenu par métier ─────────────────────────────────────

export type RowTone = "ok" | "info" | "warn" | "neutral";
export type AppView = {
  key: string;
  sector: string;
  icon: LucideIcon;
  title: string;
  rows: { ref: string; label: string; status: string; tone: RowTone }[];
};

/** Vue transversale (étapes 2 à 4), puis cinq métiers qui défilent (étape 5). */
export const APP_VIEWS: AppView[] = [
  {
    key: "interventions",
    sector: "Terrain",
    icon: FileText,
    title: "Interventions",
    rows: [
      { ref: "0418", label: "Raccordement · Client A", status: "Rapport envoyé", tone: "ok" },
      { ref: "0419", label: "Dépannage · Client C", status: "En cours", tone: "info" },
      { ref: "0420", label: "Installation · Client D", status: "Planifiée", tone: "neutral" },
      { ref: "0421", label: "Maintenance · Client B", status: "Pièce manquante", tone: "warn" },
    ],
  },
  {
    key: "sante",
    sector: "Santé",
    icon: Stethoscope,
    title: "Dossiers patients",
    rows: [
      { ref: "15:30", label: "Mme L. · consultation", status: "Rappel confirmé", tone: "ok" },
      { ref: "CR", label: "M. R. · compte-rendu", status: "À signer", tone: "warn" },
      { ref: "16:00", label: "Créneau libéré", status: "Proposé", tone: "info" },
      { ref: "DMP", label: "2 dossiers", status: "Synchronisés", tone: "ok" },
    ],
  },
  {
    key: "btp",
    sector: "BTP",
    icon: HardHat,
    title: "Chantiers",
    rows: [
      { ref: "C-07", label: "Lyon 3 · gros œuvre", status: "Dans le budget", tone: "ok" },
      { ref: "D-112", label: "Devis rénovation", status: "Signé", tone: "ok" },
      { ref: "EQ-B", label: "Pointage équipe B", status: "Validé", tone: "info" },
      { ref: "C-09", label: "Villeurbanne", status: "Retard 2 jours", tone: "warn" },
    ],
  },
  {
    key: "services",
    sector: "Services pro",
    icon: Building2,
    title: "Dossiers clients",
    rows: [
      { ref: "D-31", label: "SARL M. · conseil", status: "Temps saisi", tone: "info" },
      { ref: "F-87", label: "Facture mars", status: "Générée", tone: "ok" },
      { ref: "CT-4", label: "Contrat de mission", status: "Signé en ligne", tone: "ok" },
      { ref: "D-29", label: "Pièces manquantes", status: "Relance envoyée", tone: "warn" },
    ],
  },
  {
    key: "commerce",
    sector: "Commerce",
    icon: ShoppingBag,
    title: "Commandes",
    rows: [
      { ref: "2291", label: "Site · 3 articles", status: "Préparée", tone: "ok" },
      { ref: "2292", label: "Click & collect", status: "Prête", tone: "info" },
      { ref: "A-14", label: "Stock article 14", status: "Réassort lancé", tone: "warn" },
      { ref: "R-34", label: "Retour client", status: "Remboursé", tone: "ok" },
    ],
  },
  {
    key: "transport",
    sector: "Transport",
    icon: Truck,
    title: "Tournées",
    rows: [
      { ref: "T-12", label: "Tournée nord · 18 arrêts", status: "En cours", tone: "info" },
      { ref: "L-934", label: "Livraison Client F", status: "Signée", tone: "ok" },
      { ref: "V-07", label: "Véhicule 07", status: "Entretien jeudi", tone: "warn" },
      { ref: "ETA", label: "Heure d'arrivée", status: "Envoyée au client", tone: "ok" },
    ],
  },
];

// ─── Ce qui en sort ─────────────────────────────────────────────────────────

export type OutputId = "dashboard" | "alertes" | "rapport" | "agenda" | "equipe";
export const OUTPUTS: { id: OutputId; icon: LucideIcon; title: string; line: string; detail: string }[] = [
  { id: "dashboard", icon: BarChart3, title: "Tableau de bord", line: "12 dossiers en cours", detail: "à jour en direct" },
  { id: "alertes", icon: TriangleAlert, title: "Alerte", line: "Dossier 0421", detail: "pièce manquante, relance envoyée" },
  { id: "rapport", icon: FileText, title: "Rapport client", line: "rapport-0418.pdf", detail: "envoyé tout seul" },
  { id: "agenda", icon: CalendarCheck, title: "Agenda", line: "Jeu 9 h · 0420", detail: "planifié, équipe prévenue" },
  { id: "equipe", icon: Users, title: "Équipe et client", line: "Julie, le client", detail: "informés au bon moment" },
];

// ─── Résultat ───────────────────────────────────────────────────────────────

export const INDICATORS: { value: string; label: string }[] = [
  { value: "1 saisie", label: "au lieu de trois" },
  { value: "En direct", label: "les infos sont à jour" },
  { value: "4 tâches", label: "qui se font toutes seules" },
  { value: "1 écran", label: "pour tout suivre" },
];

// ─── Téléphone : quatre moments ─────────────────────────────────────────────

export const APP_MOBILE_STEPS = [
  { title: "Aujourd'hui, c'est éparpillé", line: "La même information vit à cinq endroits, et personne n'a la bonne version." },
  { title: "Tout arrive dans votre outil", line: "Une seule application, pensée pour votre façon de travailler." },
  { title: "L'information circule toute seule", line: "Le bon document, à la bonne personne, au bon moment." },
  { title: "Dans votre métier", line: "La même logique, adaptée à votre activité." },
];
