export type ProfileIcon =
  | "entrepreneur"
  | "artisan"
  | "cabinet"
  | "commerce"
  | "pme"
  | "services";

export type ProfileBridge = {
  href: string;
  label: string;
};

export type HomeProfile = {
  key: string;
  label: string;
  title: string;
  benefice: string;
  icon: ProfileIcon;
  bridge: ProfileBridge;
};

export const HOME_PROFILES: HomeProfile[] = [
  {
    key: "auto-entrepreneur",
    label: "Auto-entrepreneur",
    title: "Démarrer propre, simple, sans usine à gaz.",
    benefice:
      "Site qui accueille, formulaire qui qualifie, agenda relié à votre boîte mail. L'essentiel, rien de plus.",
    icon: "entrepreneur",
    bridge: { href: "/sites-web", label: "Voir comment démarrer" },
  },
  {
    key: "artisan",
    label: "Artisan",
    title: "Devis envoyés, relances qui partent seules.",
    benefice:
      "Demandes de devis qualifiées, planning à jour, relances automatiques. Vous gardez la main sur votre métier.",
    icon: "artisan",
    bridge: { href: "/automatisation", label: "Voir le flux artisan" },
  },
  {
    key: "cabinet",
    label: "Cabinet conseil · libéral",
    title: "Prospects qualifiés, dossiers centralisés.",
    benefice:
      "L'IA documentaire (RAG) cite vos dossiers, vos process et vos modèles. Vos consultants gagnent du temps.",
    icon: "cabinet",
    bridge: { href: "/rag", label: "Voir la mémoire métier" },
  },
  {
    key: "commerce-local",
    label: "Commerce local",
    title: "Apparaître autour de vous, capter les avis.",
    benefice:
      "Recherche locale Google, fiche établissement, avis structurés. Vos clients vous trouvent à proximité.",
    icon: "commerce",
    bridge: { href: "/sites-web", label: "Voir la visibilité locale" },
  },
  {
    key: "pme",
    label: "PME",
    title: "Orchestrer vos équipes, vos outils, vos demandes.",
    benefice:
      "Workflows métier qui connectent CRM, calendrier, email et IA. Vos équipes avancent sur ce qui décide.",
    icon: "pme",
    bridge: { href: "/automatisation", label: "Voir les workflows PME" },
  },
  {
    key: "societe-services",
    label: "Société de services",
    title: "Industrialiser vos process, outiller vos équipes.",
    benefice:
      "Agents IA autonomes qui exécutent les tâches répétitives. Vos consultants se concentrent sur la décision.",
    icon: "services",
    bridge: { href: "/agents-ia", label: "Voir les agents autonomes" },
  },
];

export const HOME_PROFILES_CLOSING =
  "Votre activité n'est pas listée ? Discutons-en.";
export const HOME_PROFILES_CLOSING_HREF = "/contact";
