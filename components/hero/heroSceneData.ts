import { BookOpen, CalendarCheck, MessageSquare, Send, Sparkles, UserPlus } from "lucide-react";
import type { FeedItem, FormField } from "@/components/shared/mockup/AppMockup";

/**
 * Scène du hero de l'accueil : une demande client traversée de bout en bout.
 * Données d'exemple uniquement (aucun client réel), affichées comme telles
 * (« Maquette · données d'exemple » dans le cadre de l'application).
 *
 * Storyboard : demande client → compréhension → connaissance de l'entreprise
 * → fiche client → calendrier → confirmation → historique.
 */

export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** État de repos : première image avant la boucle (tier full / reduced). */
export const IDLE_STEP: Step = 0;
/** État final : il raconte toute l'histoire en une image (tier minimal, reduced-motion). */
export const FINAL_STEP: Step = 7;

export const SCENE_STEPS: { title: string; line: string; duration: number }[] = [
  { title: "Demande client", line: "Un client écrit, même pendant que vous travaillez.", duration: 3400 },
  { title: "Compréhension", line: "Sa demande est comprise : un devis, une chaudière, jeudi.", duration: 3400 },
  { title: "Connaissance de l'entreprise", line: "Vos règles sont vérifiées : zone et créneaux.", duration: 3600 },
  { title: "Fiche client", line: "La fiche client se remplit toute seule.", duration: 3400 },
  { title: "Calendrier", line: "Le rendez-vous se pose sur un créneau libre.", duration: 3200 },
  { title: "Confirmation", line: "Le client reçoit sa confirmation dans la foulée.", duration: 3200 },
  { title: "Historique", line: "Tout est tracé. Vous relisez et gardez la main.", duration: 4200 },
];

/**
 * Activité récente du logiciel : les lignes s'ajoutent au fil du récit (LOT 4C).
 * `from` = première étape où la ligne existe.
 */
export const APP_ACTIVITY: { from: number; time: string; label: string; detail: string }[] = [
  { from: 1, time: "09:12", label: "Nouvelle demande reçue", detail: "SMS · devis chaudière" },
  { from: 4, time: "09:12", label: "Fiche client créée", detail: "Camille Laurent" },
  { from: 5, time: "09:13", label: "Rendez-vous ajouté", detail: "jeudi 14\u00a0h\u00a030" },
  { from: 6, time: "09:13", label: "Confirmation envoyée", detail: "SMS au client" },
];

/** Libellés courts : la légende statique quand la scène ne s'anime pas. */
export const SCENE_SHORT = [
  "Demande",
  "Compréhension",
  "Connaissance",
  "Fiche client",
  "Calendrier",
  "Confirmation",
  "Historique",
];

export const SCENE_LABEL =
  "Démonstration illustrée avec des données d'exemple. Un client écrit pour demander un devis de chaudière. Sa demande est comprise, les règles de l'entreprise sont vérifiées, la fiche client se remplit, le rendez-vous se pose jeudi à 14 h 30, le client reçoit sa confirmation et chaque action est tracée dans l'historique.";

// ─── Le message du client ───────────────────────────────────────────────────

/** Message découpé : les segments `key` sont surlignés à l'étape « compréhension ». */
export const CLIENT_MESSAGE: { text: string; key?: boolean }[] = [
  { text: "Bonjour, j'aimerais " },
  { text: "un devis", key: true },
  { text: " pour remplacer ma " },
  { text: "chaudière", key: true },
  { text: ". Je suis disponible " },
  { text: "jeudi après-midi", key: true },
  { text: "." },
];
export const CLIENT_SIGNATURE = "Camille Laurent, Villeurbanne";
// Espaces insécables (\u00a0) : « 14 h 30 » ne se coupe jamais en fin de ligne.
export const REPLY_MESSAGE = "C'est noté : visite jeudi à 14\u00a0h\u00a030 pour votre devis. À\u00a0jeudi\u00a0!";

// ─── Compréhension et mémoire de l'entreprise ──────────────────────────────

export const UNDERSTOOD: { label: string; value: string }[] = [
  { label: "Besoin", value: "Devis" },
  { label: "Objet", value: "Remplacement de chaudière" },
  { label: "Quand", value: "Jeudi après-midi" },
  { label: "Où", value: "Villeurbanne" },
];

export const MEMORY = {
  doc: "Procédure devis chaudière",
  source: "procedures.pdf · page 2",
  rules: [
    "Visite technique de 1\u00a0h\u00a030",
    "Le jeudi, entre 14\u00a0h et 17\u00a0h",
    "Zone : Lyon et 20\u00a0km autour",
  ],
};

// ─── Le logiciel : fiche, agenda, historique ───────────────────────────────

export const FICHE_FIELDS: FormField[] = [
  { label: "Nom", value: "Camille Laurent", state: "auto", source: "depuis son message" },
  { label: "Demande", value: "Devis remplacement chaudière", state: "auto" },
  { label: "Adresse", value: "Villeurbanne · zone couverte", state: "auto", source: "vérifié dans vos règles" },
  { label: "Disponible", value: "Jeudi après-midi", state: "auto" },
  { label: "Budget", value: "À voir lors de la visite", state: "todo" },
];

/** Agenda de 8 h à 18 h. `start` / `end` en heures décimales. */
export const AGENDA_START = 8;
export const AGENDA_END = 18;
export const AGENDA_HOURS = [8, 10, 12, 14, 16, 18];
export const AGENDA_DAYS: { day: string; date: string; busy: { start: number; end: number; label: string }[] }[] = [
  { day: "Lun", date: "10", busy: [{ start: 9, end: 10.5, label: "Entretien" }, { start: 14, end: 16, label: "Dépannage" }] },
  { day: "Mar", date: "11", busy: [{ start: 8.5, end: 12, label: "Pose radiateurs" }] },
  { day: "Mer", date: "12", busy: [{ start: 10, end: 11, label: "Entretien" }, { start: 15, end: 17, label: "Dépannage" }] },
  { day: "Jeu", date: "13", busy: [{ start: 9, end: 11.5, label: "Entretien" }] },
  { day: "Ven", date: "14", busy: [{ start: 9, end: 12, label: "Chantier" }] },
];
/** Le créneau libre du jeudi, réservé à l'étape « calendrier ». */
export const BOOKING = { dayIndex: 3, start: 14.5, end: 16, label: "Visite devis", who: "C. Laurent" };

export const HISTORY: FeedItem[] = [
  { time: "09:12", text: "Message de Camille Laurent reçu", tone: "info", icon: MessageSquare, done: "Reçu" },
  { time: "09:12", text: "Besoin compris : devis chaudière", tone: "cyan", icon: Sparkles, done: "Compris" },
  { time: "09:12", text: "Règles vérifiées : zone et créneaux", tone: "info", icon: BookOpen, done: "Vérifié" },
  { time: "09:13", text: "Fiche client créée", tone: "ok", icon: UserPlus, done: "Créée" },
  { time: "09:13", text: "Visite posée jeudi à 14\u00a0h\u00a030", tone: "ok", icon: CalendarCheck, done: "Réservé" },
  { time: "09:13", text: "Confirmation envoyée par SMS", tone: "ok", icon: Send, done: "Envoyé" },
];

// ─── Version mobile : quatre temps, lecture verticale ──────────────────────

export const MOBILE_STEPS = [
  { title: "Un client écrit" },
  { title: "C'est compris, avec vos règles" },
  { title: "La fiche et le rendez-vous sont créés" },
  { title: "Le client est prévenu, tout est tracé" },
];
