/**
 * Scène du hero de /agents-ia (V3) : UNE demande vit toute la démonstration.
 * Données d'exemple uniquement (« Maquette · données d'exemple »), aucun client réel.
 *
 * Deux objets seulement : un iPhone (ce qui arrive) et l'espace de travail de l'assistant
 * (ce qu'il comprend et fait). Le « dossier actif » reste visible du début à la fin :
 * ses lignes naissent pendant l'appel puis changent d'état sur place, sans remise à zéro.
 */

/** 0 = attente ; 1 à 7 = les temps de la scène (le 7 est le résumé final, sous l'étape 06). */
export type AiPhase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const AI_IDLE: AiPhase = 0;
export const AI_LAST: AiPhase = 7;
export const AI_IDLE_DURATION = 700;

export type AiPhaseDef = { key: string; step: number; label: string; title: string; line: string; duration: number };

export const AI_PHASES: AiPhaseDef[] = [
  { key: "appel", step: 1, label: "Demande", title: "Un appel arrive", line: "Il écoute et range chaque information dans le dossier.", duration: 6400 },
  { key: "message", step: 2, label: "Compréhension", title: "Une question par message", line: "Il répond avec vos documents, et cite sa source.", duration: 4000 },
  { key: "document", step: 3, label: "Sources", title: "Il vérifie vos règles", line: "La remise demandée dépasse ce que vous autorisez.", duration: 4000 },
  { key: "decision", step: 4, label: "Décision", title: "Il s'arrête", line: "Rien n'est envoyé sans votre accord.", duration: 3600 },
  { key: "validation", step: 5, label: "Validation", title: "Vous validez", line: "Trois actions, un geste, depuis votre téléphone.", duration: 3800 },
  { key: "propagation", step: 6, label: "Traçabilité", title: "Tout part au bon endroit", line: "Chaque information rejoint son outil.", duration: 3600 },
  { key: "final", step: 6, label: "Traçabilité", title: "Dossier traité", line: "Tout est tracé.", duration: 2600 },
];

export const AI_STEP_COUNT = 6;

export const phaseDef = (p: AiPhase) => AI_PHASES[Math.max(p, 1) - 1];

export const AI_SCENE_LABEL =
  "Démonstration illustrée avec des données d'exemple. À 9 h 14, Camille Laurent, de l'Entreprise B, appelle pour un devis et un rendez-vous cette semaine à Villeurbanne, et demande une remise de 15 %. Pendant l'appel, l'assistant remplit le dossier. Par message, il confirme que Villeurbanne est couverte, avec la source. Il lit la grille tarifaire : la remise maximale est de 10 %, il s'arrête et vous soumet la décision. Sur votre téléphone, vous validez trois actions : le devis, le rendez-vous jeudi 10 h et une remise de 10 %. Le rendez-vous part dans l'agenda, le client dans le fichier clients, la confirmation par mail, le dossier dans le logiciel métier, et tout est tracé dans le journal.";

// ─── La demande ─────────────────────────────────────────────────────────────

export const REQUEST = {
  ref: "D-0142",
  contact: "Camille Laurent",
  company: "Entreprise B",
  time: "09:14",
  callLength: "1 min 38",
};

/** La transcription de l'appel, ligne par ligne ; `key` = passage que l'assistant retient. */
export const TRANSCRIPT: { parts: { t: string; key?: boolean }[]; at: number }[] = [
  { parts: [{ t: "Bonjour," }], at: 0.9 },
  { parts: [{ t: "je souhaiterais " }, { t: "un devis", key: true }], at: 1.6 },
  { parts: [{ t: "et " }, { t: "un rendez-vous", key: true }, { t: " " }, { t: "cette semaine", key: true }], at: 2.3 },
  { parts: [{ t: "pour nos bureaux à " }, { t: "Villeurbanne", key: true }, { t: "." }], at: 3.0 },
  { parts: [{ t: "Une " }, { t: "remise de 15 %", key: true }, { t: " serait possible ?" }], at: 3.7 },
];

/** Moment (s) où l'appel se replie en une ligne d'historique, dans l'étape 1. */
export const CALL_END_AT = 5.0;

// ─── Le dossier actif ───────────────────────────────────────────────────────

export type RowState = "recu" | "compris" | "verifie" | "avalider" | "valide";

export type DossierRow = {
  key: "contact" | "entreprise" | "besoin" | "lieu" | "delai" | "remise";
  label: string;
  /** Apparition pendant l'appel (s depuis le début de l'étape 1). */
  at: number;
};

export const DOSSIER_ROWS: DossierRow[] = [
  { key: "contact", label: "Contact", at: 0.5 },
  { key: "entreprise", label: "Entreprise", at: 0.9 },
  { key: "besoin", label: "Besoin", at: 2.0 },
  { key: "lieu", label: "Lieu", at: 3.4 },
  { key: "delai", label: "Délai", at: 2.7 },
  { key: "remise", label: "Remise", at: 4.1 },
];

export type RowView = { value: string; was?: string; state: RowState; note?: string; source?: string; delay: number };

/**
 * L'état d'une ligne à une phase donnée. `delay` = quand le changement arrive dans la
 * phase (s), pour qu'il tombe au moment où l'iPhone montre ce qui le provoque.
 */
export function rowView(key: DossierRow["key"], p: AiPhase): RowView {
  switch (key) {
    case "contact":
      return { value: "Camille Laurent", state: "compris", delay: 0 };
    case "entreprise":
      return { value: "Entreprise B", state: "compris", delay: 0 };
    case "besoin":
      return p >= 3
        ? { value: "Devis + rendez-vous", state: "verifie", note: "forfait visite 250\u00a0€", source: "tarifs-2026.pdf", delay: p === 3 ? 0.9 : 0 }
        : { value: "Devis + rendez-vous", state: "compris", delay: 0 };
    case "lieu":
      return p >= 2
        ? { value: "Villeurbanne", state: "verifie", note: "zone couverte", source: "zones-intervention.pdf", delay: p === 2 ? 1.9 : 0 }
        : { value: "Villeurbanne", state: "recu", note: "à vérifier", delay: 0 };
    case "delai":
      return p >= 5
        ? { value: "Jeudi 10 h", state: "valide", note: "validé par vous", delay: p === 5 ? 2.0 : 0 }
        : { value: "Cette semaine", state: "compris", delay: 0 };
    case "remise":
      if (p >= 5) return { value: "10 %", was: "15 %", state: "valide", note: "validé par vous", delay: p === 5 ? 2.3 : 0 };
      if (p >= 3) return { value: "15 %", state: "avalider", note: "règle : 10 % maximum", delay: p === 3 ? 2.6 : 0 };
      return { value: "15 %", state: "compris", delay: 0 };
  }
}

/** Minimal / prefers-reduced-motion : l'état final, tout lisible d'un coup. */
export const FINAL_PHASE: AiPhase = 6;

// ─── Étape 2 · le message ───────────────────────────────────────────────────

export const CHAT = {
  channel: "Message · votre site",
  question: "Est-ce que vous intervenez aussi à Villeurbanne ?",
  answer: "Oui, cette zone est couverte.",
  source: "zones-intervention.pdf · p. 2",
};

// ─── Étape 3 · le document ──────────────────────────────────────────────────

export const DOC = {
  name: "tarifs-2026.pdf",
  lines: [
    { label: "Forfait visite", value: "250 €", key: "forfait" },
    { label: "Déplacement zone 1", value: "inclus" },
    { label: "Remise maximale", value: "10 %", key: "remise" },
  ] as { label: string; value: string; key?: string }[],
};

export const COMPARE = {
  asked: { label: "Demande du client", value: "15 %" },
  rule: { label: "Votre règle", value: "10 % maximum" },
};

// ─── Étape 4 · la décision ──────────────────────────────────────────────────

export const DECISION: { label: string; value: string; strong?: boolean }[] = [
  { label: "Remise demandée", value: "15 %" },
  { label: "Règle autorisée", value: "10 %" },
  { label: "Proposition de l'assistant", value: "10 %", strong: true },
];

export const FLOW = ["Demande", "Compréhension", "Préparation", "Vous", "Action"];

// ─── Étape 5 · la validation sur iPhone ────────────────────────────────────

export const TO_VALIDATE = ["Envoyer le devis", "Poser le rendez-vous jeudi 10 h", "Proposer une remise de 10 %"];
/** Le « clic » de la démonstration, puis les coches, en secondes dans l'étape 5. */
export const VALIDATE_TAP_AT = 1.4;
export const VALIDATE_CHECK_AT = [1.7, 2.0, 2.3];

// ─── Étape 6 · journal et destinations ─────────────────────────────────────

export const JOURNAL: { time: string; text: string }[] = [
  { time: "09:14", text: "Demande reçue" },
  { time: "09:15", text: "Informations extraites" },
  { time: "09:16", text: "Zone et tarifs vérifiés" },
  { time: "09:18", text: "Validation demandée" },
  { time: "09:21", text: "Actions validées" },
  { time: "09:22", text: "Rendez-vous ajouté" },
  { time: "09:22", text: "Confirmation envoyée" },
];

export type Destination = { id: string; title: string; carries: string; from: DossierRow["key"] };

export const DESTINATIONS: Destination[] = [
  { id: "agenda", title: "Agenda", carries: "Jeudi 10 h", from: "delai" },
  { id: "clients", title: "Fichier clients", carries: "Camille Laurent", from: "contact" },
  { id: "mail", title: "Mail", carries: "Confirmation", from: "besoin" },
  { id: "metier", title: "Logiciel métier", carries: "Dossier D-0142", from: "remise" },
];

// ─── Fin de boucle ──────────────────────────────────────────────────────────

export const SUMMARY = ["Devis préparé", "Rendez-vous jeudi 10 h", "Confirmation envoyée"];

/** Minimal : l'histoire en quatre temps, sans animation. */
export const STATIC_STORY: { time: string; text: string }[] = [
  { time: "09:14", text: "Demande reçue par téléphone" },
  { time: "09:16", text: "Zone et tarifs vérifiés dans vos documents" },
  { time: "09:21", text: "Remise hors règle : validée par vous à 10 %" },
  { time: "09:22", text: "Rendez-vous, fiche, mail et dossier : tracés" },
];

// ─── Téléphone (< md) : quatre moments, la même demande ────────────────────

export type AiMobilePhase = 0 | 1 | 2 | 3 | 4;

export const AI_MOBILE_PHASES: { title: string; line: string; duration: number; dossier: AiPhase }[] = [
  { title: "Un appel arrive", line: "Il écoute et remplit le dossier.", duration: 6000, dossier: 1 },
  { title: "Une question par message", line: "Il répond avec la source.", duration: 4200, dossier: 2 },
  { title: "Il s'arrête", line: "La remise dépasse votre règle : il vous la soumet.", duration: 4200, dossier: 4 },
  { title: "Vous validez, tout est tracé", line: "Rendez-vous posé, confirmation envoyée.", duration: 5400, dossier: 6 },
];
