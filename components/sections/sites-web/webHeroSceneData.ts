import { Building2, CalendarClock, FileText, UserRound, type LucideIcon } from "lucide-react";

/**
 * Scène du hero de /sites-web : une visite qui devient une demande qui avance.
 * Démonstration transversale, sans métier précis ni client réel : les noms sont des
 * données d'exemple, affichées comme telles (« Maquette · données d'exemple »).
 *
 * Storyboard : trouvé → offre comprise → demande envoyée → fiche claire → bon
 * destinataire → action (agenda) → client prévenu, suivi à jour. Puis courte pause.
 */

export type WebStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Repos : première image avant la boucle, et pause courte entre deux boucles. */
export const WEB_IDLE: WebStep = 0;
/** Image finale : elle raconte toute l'histoire (tier minimal, reduced-motion). */
export const WEB_FINAL: WebStep = 7;
/** Pause de repos entre deux boucles : la scène se vide, puis tout recommence. */
export const WEB_IDLE_DURATION = 1600;

export const WEB_SCENE_STEPS: { title: string; line: string; duration: number }[] = [
  { title: "Être trouvé", line: "Une personne cherche un prestataire et clique sur votre site.", duration: 4200 },
  { title: "Comprendre l'offre", line: "Elle voit tout de suite ce que vous faites, pour qui, et comment demander.", duration: 4400 },
  { title: "Demande envoyée", line: "Elle remplit un formulaire court, pensé pour votre activité, puis l'envoie.", duration: 5400 },
  { title: "Fiche claire", line: "Sa demande devient une fiche rangée : qui, quoi, pour quand, contact.", duration: 4400 },
  { title: "Bon destinataire", line: "La fiche arrive chez la bonne personne et entre dans le suivi.", duration: 4800 },
  { title: "Action concrète", line: "Un créneau libre est posé dans votre agenda.", duration: 4200 },
  { title: "Client prévenu", line: "Le client reçoit sa confirmation. Tout est tracé, rien ne s'est perdu.", duration: 5600 },
];

/**
 * Temps internes des objets, en secondes depuis le début de l'étape.
 * Réglés pour qu'un seul geste se lise à la fois.
 */
export const T = {
  /** Étape 1 : le curseur vient cliquer sur le résultat, puis le site apparaît. */
  cursor: 0.7,
  cursorDuration: 1.8,
  siteEnter: 2.4,
  /** Étape 2 : les trois cases de l'offre, puis le bouton d'action. */
  offer: 0.7,
  offerGap: 0.75,
  navCta: 3.1,
  /** Étape 3 : champs un par un, message, bouton prêt, pressé, envoi. */
  field: 0.5,
  fieldGap: 0.6,
  message: 3.0,
  buttonReady: 3.5,
  packet: 4.2,
  packetDuration: 0.9,
  /** Étape 4 : la fiche se remplit ligne à ligne. */
  ficheRow: 0.9,
  ficheRowGap: 0.5,
  /** Étape 5 : la demande arrive dans la boîte, puis le suivi entre et coche. */
  inboxLand: 1.0,
  trackEnter: 1.9,
  trackRow: 2.5,
  trackCheck: [2.9, 3.5],
  /** Étape 6 : le créneau se pose, la ligne du suivi se coche. */
  slot: 1.1,
  slotLabel: 1.8,
  trackCheckAgenda: 2.4,
  /** Étape 7 : la confirmation repart vers le site, le client est prévenu. */
  confirmPacket: 0.6,
  confirmDuration: 1.2,
  confirmShown: 1.9,
  trackCheckClient: 2.5,
  searchBack: 3.0,
  /** Connecteurs : tracé, puis un segment qui les parcourt une fois. */
  linkDraw: 0.35,
  linkDrawDuration: 0.9,
  linkFlow: 1.2,
  linkFlowDuration: 1.2,
} as const;

/** Légende fixe, quand la scène ne s'anime pas. */
export const WEB_SCENE_SHORT = ["Trouvé", "Compris", "Envoyée", "Fiche", "Destinataire", "Agenda", "Prévenu"];

export const WEB_SCENE_LABEL =
  "Démonstration illustrée avec des données d'exemple. Une personne cherche un prestataire, arrive sur votre site et comprend l'offre. Elle envoie une demande de devis et de rendez-vous pour cette semaine. La demande devient une fiche structurée, arrive dans la boîte de la bonne personne, entre dans le suivi, un créneau est posé dans l'agenda, et le client reçoit sa confirmation.";

// ─── Recherche ──────────────────────────────────────────────────────────────

export const SEARCH_QUERY = "prestataire devis rendez-vous";
export const SEARCH_RESULTS: { title: string; url: string; line: string; you?: boolean }[] = [
  { title: "Votre entreprise · devis sous 48 h", url: "votresite.fr", line: "Offre claire, demande en ligne", you: true },
  { title: "Annuaire des prestataires", url: "annuaire-exemple.fr", line: "Comparer les entreprises" },
];
export const SEARCH_ORIGINS = ["Recherche", "Annuaire", "Lien partagé"];

// ─── Le site ────────────────────────────────────────────────────────────────

export const SITE_OFFER: { label: string; value: string }[] = [
  { label: "Ce que je fais", value: "Trois prestations" },
  { label: "Pour qui", value: "Entreprises" },
  { label: "Comment", value: "Devis en ligne" },
];

/** Les quatre informations universelles que le formulaire récupère. */
export const FORM_FIELDS: { label: string; value: string; placeholder: string }[] = [
  { label: "Nom / entreprise", value: "C. Laurent · Entreprise B", placeholder: "Votre nom" },
  { label: "Besoin", value: "Demande de devis", placeholder: "Choisir…" },
  { label: "Délai", value: "Cette semaine", placeholder: "Choisir…" },
  { label: "Coordonnées", value: "camille@exemple.fr", placeholder: "E-mail ou téléphone" },
];
export const FORM_MESSAGE = "Bonjour, je souhaite un devis et un rendez-vous cette semaine.";

// ─── La fiche demande ───────────────────────────────────────────────────────

export const FICHE_ROWS: { key: string; label: string; value: string; icon: LucideIcon; strong?: boolean }[] = [
  { key: "qui", label: "Qui", value: "Entreprise B", icon: Building2 },
  { key: "quoi", label: "Quoi", value: "Demande de devis", icon: FileText },
  { key: "priorite", label: "Priorité", value: "Cette semaine", icon: CalendarClock, strong: true },
  { key: "contact", label: "Contact", value: "Camille Laurent", icon: UserRound },
];

// ─── Vos outils ─────────────────────────────────────────────────────────────

export const INBOX_OLD: { initials: string; from: string; subject: string; time: string }[] = [
  { initials: "FC", from: "Formulaire contact", subject: "Question sur les délais", time: "08:47" },
  { initials: "PM", from: "P. Martin", subject: "Relance facture", time: "Hier" },
];
export const INBOX_NEW = { initials: "EB", from: "Entreprise B", subject: "Devis · cette semaine", time: "09:12", owner: "Pour Julie · commerciale" };

/** Étapes du suivi : `at` = étape de la scène à partir de laquelle elle est cochée. */
export const TRACK_STEPS: { label: string; detail: string; at: WebStep }[] = [
  { label: "Reçue", detail: "09:12 · depuis le site", at: 5 },
  { label: "Attribuée", detail: "à Julie", at: 5 },
  { label: "Rendez-vous", detail: "jeudi 10 h", at: 6 },
  { label: "Client prévenu", detail: "e-mail envoyé", at: 7 },
];

/** Agenda : trois jours, de 9 h à 13 h. `start` / `end` en heures décimales. */
export const AGENDA_START = 9;
export const AGENDA_END = 13;
export const AGENDA_HOURS = [9, 11, 13];
export const AGENDA_DAYS: { day: string; busy: { start: number; end: number; label: string }[] }[] = [
  { day: "Mer", busy: [{ start: 9, end: 10.5, label: "Réunion" }, { start: 11.5, end: 13, label: "Visite" }] },
  { day: "Jeu", busy: [{ start: 11.5, end: 12.75, label: "Appel" }] },
  { day: "Ven", busy: [{ start: 9.5, end: 12, label: "Chantier" }] },
];
export const SLOT = { dayIndex: 1, start: 9.75, end: 11, day: "Jeu", dayLong: "jeudi", hour: "10 h", label: "Entreprise B" };

// ─── Téléphone : quatre moments ─────────────────────────────────────────────

export const WEB_MOBILE_STEPS = [
  { title: "On vous trouve, on vous comprend", line: "Une recherche mène à votre site. L'offre se lit tout de suite." },
  { title: "La demande part, complète", line: "Un formulaire court récupère ce qu'il faut pour répondre." },
  { title: "Elle devient une fiche claire", line: "Qui, quoi, quand, contact : tout est rangé." },
  { title: "Elle arrive au bon endroit et avance", line: "La bonne personne, le suivi, l'agenda, le client prévenu." },
];
