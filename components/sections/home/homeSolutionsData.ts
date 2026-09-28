import {
  Files,
  LayoutDashboard,
  MessagesSquare,
  PanelsTopLeft,
  Route,
  type LucideIcon,
} from "lucide-react";

/**
 * Les cinq familles de prestations, telles qu'elles se présentent sur l'accueil
 * (section 4). Même offre que `homeServicesData.ts`, dite autrement : ce que
 * c'est, ce que ça change, un exemple concret. Le détail reste sur les pages
 * de service, la home ne les remplace pas.
 *
 * Les vignettes sont des maquettes : données d'exemple, aucun client réel.
 */

export type HomeSolutionId = "sites-web" | "applications" | "automatisation" | "agents-ia" | "rag";

export type HomeSolution = {
  id: HomeSolutionId;
  href: string;
  title: string;
  /** Trois ou quatre mots, dans le rail de gauche. */
  tagline: string;
  icon: LucideIcon;
  /** Qu'est-ce que c'est. */
  what: string;
  /** Ce que ça change pour l'entreprise. */
  changes: string;
  /** Un exemple concret. */
  example: string;
  linkLabel: string;
  /** En-tête de la sous-carte qui montre le fonctionnement. */
  sheet: { title: string; aside: string };
};

export const HOME_SOLUTIONS: HomeSolution[] = [
  {
    id: "sites-web",
    href: "/sites-web",
    title: "Sites web connectés",
    tagline: "Le site qui transmet",
    icon: PanelsTopLeft,
    what: "Un site qui ne se contente pas d'exister : il récupère les demandes et les dépose là où vous travaillez.",
    changes: "Une demande reçue la nuit est déjà rangée et complète quand vous ouvrez votre journée.",
    example: "Un formulaire de devis crée la fiche client, vous prévient, et garde la trace de la demande.",
    linkLabel: "Voir les sites web",
    sheet: { title: "Une demande, deux actions", aside: "sans ressaisie" },
  },
  {
    id: "applications",
    href: "/applications",
    title: "Applications métier",
    tagline: "L'outil fait pour vous",
    icon: LayoutDashboard,
    what: "Un outil construit pour votre façon de travailler, quand aucun logiciel du marché ne correspond.",
    changes: "Tout le monde saisit au même endroit, et vous voyez l'activité sans avoir à réclamer un point.",
    example: "Les équipes remplissent leur rapport depuis le terrain, le bureau suit les chantiers du jour.",
    linkLabel: "Voir les applications",
    sheet: { title: "L'outil au quotidien", aside: "maquette" },
  },
  {
    id: "automatisation",
    href: "/automatisation",
    title: "Automatisations",
    tagline: "Les étapes s'enchaînent",
    icon: Route,
    what: "Une information arrive dans un outil, les étapes suivantes se déclenchent sans ressaisie.",
    changes: "Ce qui revient chaque semaine se fait sans vous, et vous gardez la main sur ce qui compte.",
    example: "Un formulaire validé crée la fiche client, prévient l'équipe et prépare le suivi.",
    linkLabel: "Voir les automatisations",
    sheet: { title: "Un déclencheur, trois suites", aside: "vos règles" },
  },
  {
    id: "agents-ia",
    href: "/agents-ia",
    title: "Agents IA",
    tagline: "L'assistant qui prépare",
    icon: MessagesSquare,
    what: "Un assistant qui lit une demande, la comprend et prépare la réponse. Vous validez avant l'envoi.",
    changes: "Les demandes simples avancent seules, vous ne traitez que celles qui méritent votre avis.",
    example: "Un appel manqué devient une demande notée et un message de rappel prêt à partir.",
    linkLabel: "Voir les agents IA",
    sheet: { title: "Comprendre, puis préparer", aside: "vous validez" },
  },
  {
    id: "rag",
    href: "/rag",
    title: "Mémoire d'entreprise",
    tagline: "Vos documents répondent",
    icon: Files,
    what: "Vos documents deviennent consultables en une question, avec la source citée à chaque réponse.",
    changes: "La bonne information se retrouve en quelques secondes, même quand la personne qui la connaît est absente.",
    example: "Un nouveau demande la procédure de retour : la réponse arrive avec la page du document.",
    linkLabel: "Voir la mémoire d'entreprise",
    sheet: { title: "De vos documents à la réponse", aside: "source citée" },
  },
];

export const HOME_SOLUTIONS_MOCKUP_NOTE = "Maquette · données d'exemple";

/** Sur téléphone, la mention est donnée une seule fois pour toute la section. */
export const HOME_SOLUTIONS_MOCKUP_NOTE_MOBILE =
  "Les écrans montrés sont des maquettes, avec des données d'exemple.";
