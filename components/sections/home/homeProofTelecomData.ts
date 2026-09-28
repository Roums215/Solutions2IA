import type { CheckItem, DraftMail, TableRow } from "@/components/shared/mockup/AppMockup";

/**
 * Preuve télécoms de l'accueil : un projet réel (plateforme de rapports d'intervention),
 * raconté en quatre temps. Les faits sont ceux de la version précédente de la section,
 * rien d'ajouté. Les interfaces sont reconstituées avec des données d'exemple, et la
 * section le dit (PROOF_DISCLAIMER).
 */

export const PROOF_BEFORE =
  "Les techniciens remplissaient leurs rapports d'intervention à la main. Retour au bureau, ressaisie, documents égarés, clients qui attendent.";

export const PROOF_DISCLAIMER = "Reconstitution illustrative du fonctionnement";
export const PROOF_CONTEXT = "Projet réalisé en entreprise, dans le secteur des télécoms. Utilisé au quotidien.";

export type ProofStepId = "terrain" | "rapport" | "bureau" | "client";

export const PROOF_STEPS: { id: ProofStepId; title: string; text: string }[] = [
  {
    id: "terrain",
    title: "Terrain",
    text: "Le technicien remplit son rapport en ligne, depuis le terrain.",
  },
  {
    id: "rapport",
    title: "Rapport saisi",
    text: "Le rapport est saisi une seule fois. Plus de papier, plus de ressaisie au bureau.",
  },
  {
    id: "bureau",
    title: "Suivi bureau",
    text: "Les responsables voient toute l'activité d'un coup d'œil, sur leur tableau de bord.",
  },
  {
    id: "client",
    title: "Envoi client",
    text: "Le client reçoit son rapport par mail, automatiquement. Plus personne n'attend.",
  },
];

// ─── Données d'exemple des quatre vignettes ────────────────────────────────

export const FIELD_CHECKS: CheckItem[] = [
  { label: "Intervention réalisée", state: "done" },
  { label: "Observations saisies", state: "done" },
  { label: "Rapport complet", state: "done" },
];

export const REPORT_FIELDS: { label: string; value: string }[] = [
  { label: "Client", value: "Client A" },
  { label: "Intervention", value: "Raccordement" },
  { label: "Technicien", value: "Tech. 04" },
];

export const OFFICE_ROWS: TableRow[] = [
  { cells: ["Raccordement", "Tech. 04"], status: "Terminé", tone: "ok" },
  { cells: ["Dépannage", "Tech. 02"], status: "En cours", tone: "info" },
  { cells: ["Installation", "Tech. 07"], status: "Planifié", tone: "neutral" },
];

export const CLIENT_MAIL: DraftMail = {
  to: "client-a@exemple.fr",
  subject: "Votre rapport d'intervention",
  body: "Bonjour, vous trouverez en pièce jointe le rapport de l'intervention du jour.",
  state: "sent",
};
