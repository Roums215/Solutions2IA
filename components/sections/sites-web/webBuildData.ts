import { AppWindow, ClipboardList, Network, UserRoundCheck, type LucideIcon } from "lucide-react";

/**
 * /sites-web, section 4 : du site vitrine au site réellement connecté.
 * Quatre paliers, chacun ajoute une brique au précédent. Exemples volontairement
 * transversaux (aucun secteur dominant). Les prix restent secondaires : une seule ligne
 * sous le rail, reprise de la grille publique de /services.
 */

export type BuildLevelId = "vitrine" | "demandes" | "connecte" | "espace";

export type BuildLevel = {
  id: BuildLevelId;
  level: 1 | 2 | 3 | 4;
  icon: LucideIcon;
  title: string;
  tagline: string;
  pitch: string;
  includes: string[];
  examples: string[];
  /** Lien discret vers un service voisin (pas un CTA). */
  related?: { label: string; href: string };
};

export const BUILD_LEVELS: BuildLevel[] = [
  {
    id: "vitrine",
    level: 1,
    icon: AppWindow,
    title: "Site vitrine",
    tagline: "Présenter clairement, donner envie d'écrire",
    pitch:
      "Quelques pages bien construites : ce que vous faites, pour qui, pourquoi vous faire confiance, et comment vous joindre. C'est la base, et elle doit déjà convertir.",
    includes: ["Une offre lisible dès l'accueil", "Pensé pour le téléphone d'abord", "Un contact direct, sans détour"],
    examples: ["Un cabinet de conseil qui veut une présence sérieuse", "Une entreprise de terrain qu'on doit pouvoir appeler vite"],
  },
  {
    id: "demandes",
    level: 2,
    icon: ClipboardList,
    title: "Site avec demandes structurées",
    tagline: "Des formulaires pensés pour votre activité",
    pitch:
      "Devis, inscription, candidature, réservation : chaque formulaire pose les bonnes questions. La demande arrive complète, vous n'avez plus à rappeler pour comprendre.",
    includes: ["Formulaires adaptés à chaque besoin", "Informations utiles récupérées dès le départ", "Accusé de réception automatique"],
    examples: ["Un organisme de formation qui reçoit des inscriptions", "Une société de services qui travaille sur devis"],
  },
  {
    id: "connecte",
    level: 3,
    icon: Network,
    title: "Site relié à vos outils",
    tagline: "La demande part directement au bon endroit",
    pitch:
      "La demande n'attend plus dans une boîte mail : elle entre dans votre fichier clients, pose un créneau dans l'agenda, prévient la bonne personne ou alimente votre logiciel métier.",
    includes: ["Fichier clients et agenda", "Messagerie et notifications", "Votre logiciel métier, si possible"],
    examples: ["Une agence immobilière qui reçoit des demandes de visite", "Un commerce entre professionnels qui traite des demandes de tarif"],
    related: { label: "Aller plus loin : automatiser les suites", href: "/automatisation" },
  },
  {
    id: "espace",
    level: 4,
    icon: UserRoundCheck,
    title: "Site avec espace client",
    tagline: "Vos clients suivent leur dossier eux-mêmes",
    pitch:
      "Un espace connecté où vos clients retrouvent l'avancement, leurs documents et leur historique. Moins d'appels pour « savoir où on en est », plus de confiance.",
    includes: ["Suivi du dossier ou de la commande", "Documents à télécharger ou à déposer", "Comptes et historique"],
    examples: ["Un cabinet qui partage des documents avec ses clients", "Un organisme de formation : convocations et attestations"],
    related: { label: "Besoin d'un véritable outil métier : les applications", href: "/applications" },
  },
];

export const BUILD_PRICE_NOTE =
  "Repères de prix : site vitrine dès 500 €, vitrine plus poussée de 1 000 à 2 500 €, site relié à vos outils de 2 500 à 5 000 €. Un espace client se chiffre selon ce qu'il contient. Le prix est toujours fixé avant de démarrer.";

// ─── Schéma : plan fixe 760 × 260, mis à l'échelle en CSS ────────────────────

export type BuildNode = {
  key: string;
  /** Palier à partir duquel le nœud existe. */
  from: 1 | 2 | 3 | 4;
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  /** Libellé propre au palier 1 (le même emplacement change de rôle ensuite). */
  labelL1?: string;
  subL1?: string;
  tone?: "ink" | "cyan";
};

export const BUILD_NODES: BuildNode[] = [
  { key: "visiteur", from: 1, x: 0, y: 74, w: 112, label: "Visiteur", sub: "arrive sur le site" },
  { key: "site", from: 1, x: 132, y: 74, w: 112, label: "Votre site", sub: "offre claire", tone: "ink" },
  {
    key: "capture",
    from: 1,
    x: 264,
    y: 74,
    w: 146,
    label: "Formulaire adapté",
    sub: "devis, inscription…",
    labelL1: "Contact direct",
    subL1: "appel ou e-mail",
  },
  { key: "demande", from: 2, x: 430, y: 74, w: 146, label: "Demande complète", sub: "qui, quoi, quand", tone: "cyan" },
  { key: "fichier", from: 3, x: 612, y: 14, w: 146, label: "Fichier clients", sub: "fiche créée" },
  { key: "agenda", from: 3, x: 612, y: 74, w: 146, label: "Agenda", sub: "créneau posé" },
  { key: "messagerie", from: 3, x: 612, y: 134, w: 146, label: "Messagerie", sub: "la bonne personne" },
  { key: "espace", from: 4, x: 264, y: 196, w: 312, label: "Espace client", sub: "suivi · documents · historique", tone: "ink" },
];

export const BUILD_LINKS: { d: string; from: 1 | 2 | 3 | 4 }[] = [
  { d: "M 112 100 L 132 100", from: 1 },
  { d: "M 244 100 L 264 100", from: 1 },
  { d: "M 410 100 L 430 100", from: 2 },
  { d: "M 576 100 C 596 100, 592 40, 612 40", from: 3 },
  { d: "M 576 100 L 612 100", from: 3 },
  { d: "M 576 100 C 596 100, 592 160, 612 160", from: 3 },
  { d: "M 685 186 C 685 222, 630 222, 576 222", from: 4 },
  { d: "M 264 222 C 130 222, 56 204, 56 126", from: 4 },
];
