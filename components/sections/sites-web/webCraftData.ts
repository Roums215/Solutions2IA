import { Gauge, MousePointerClick, Network, ScanEye, type LucideIcon } from "lucide-react";

/**
 * /sites-web, section 5 : comment je le construis, et pourquoi travailler avec moi.
 * Fusion de l'ancien comparatif « agence » et des fondations techniques, sans opposer
 * personne : des engagements, puis le schéma des quatre couches d'un site.
 */

export type CraftLayer = {
  key: string;
  icon: LucideIcon;
  name: string;
  role: string;
  items: string[];
};

/** Du plus visible (en haut) à ce qui tient tout le reste (en bas). */
export const CRAFT_LAYERS: CraftLayer[] = [
  {
    key: "experience",
    icon: ScanEye,
    name: "Expérience",
    role: "ce que le visiteur voit et ressent",
    items: ["téléphone, tablette, grand écran", "lisible par tous", "clair dès l'accueil"],
  },
  {
    key: "conversion",
    icon: MousePointerClick,
    name: "Conversion",
    role: "ce qui le fait passer à l'action",
    items: ["une offre compréhensible", "des preuves concrètes", "une seule prochaine étape"],
  },
  {
    key: "connexions",
    icon: Network,
    name: "Connexions",
    role: "là où arrive la demande",
    items: ["fichier clients", "agenda", "messagerie", "logiciel métier"],
  },
  {
    key: "socle",
    icon: Gauge,
    name: "Performance · Google · sécurité",
    role: "ce qui tient tout le reste",
    items: ["pages rapides", "bien lues par Google", "données protégées"],
  },
];

export const CRAFT_COMMITMENTS: { title: string; points: string[] }[] = [
  {
    title: "Ma façon de travailler",
    points: [
      "Un interlocuteur direct, du premier échange à la mise en ligne",
      "Un site conçu pour vous, pas un thème repris tel quel",
      "Du code propre, qui reste à vous",
      "Branché sur les outils que vous utilisez déjà",
      "Il peut évoluer après la mise en ligne, par petites étapes",
    ],
  },
  {
    title: "Dans chaque site",
    points: [
      "Adapté au téléphone, à la tablette et au grand écran",
      "Accessible à tous, y compris au clavier et aux lecteurs d'écran",
      "Sécurisé : connexion chiffrée, mises à jour suivies",
      "Rapide à charger, même sur une connexion moyenne",
      "Bien structuré pour Google (référencement technique)",
    ],
  },
];

export const CRAFT_TECH_SUMMARY = "Le détail technique, pour vérifier";

export const CRAFT_TECH: { label: string; text: string }[] = [
  {
    label: "Construction",
    text: "Next.js et TypeScript (un code typé, donc plus fiable à faire évoluer), des briques indépendantes et des connexions claires vers vos outils.",
  },
  {
    label: "Google et les assistants IA",
    text: "Pages structurées, données lisibles par les moteurs (schema.org), vitesse mesurée par Google (Core Web Vitals), et un fichier llms.txt qui aide les assistants comme ChatGPT à citer correctement votre activité.",
  },
  {
    label: "Accessibilité",
    text: "Norme WCAG 2.2 : contrastes, navigation au clavier, lecteurs d'écran.",
  },
  {
    label: "Sécurité et données",
    text: "HTTPS, protections du navigateur (CSP), dépendances mises à jour, RGPD. Mesure d'audience sans cookie quand c'est possible.",
  },
];
