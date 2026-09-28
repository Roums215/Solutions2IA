import {
  CalendarClock,
  FileText,
  FolderOpen,
  Mail,
  MessageSquareReply,
  Moon,
  PanelTop,
  PhoneMissed,
  Repeat,
  Table2,
  type LucideIcon,
} from "lucide-react";

/**
 * Les situations du quotidien, avant toute technologie (accueil, section 3).
 *
 * Règle de contenu : une situation que le visiteur reconnaît, la friction qu'elle
 * crée, puis le trajet d'aujourd'hui et ce qu'il devient avec l'outil. Aucun chiffre,
 * aucun client cité, aucun terme technique à ce niveau de lecture.
 *
 * LOT 4C : le geste barré (« ce qui disparaît ») est remplacé par deux zones lisibles,
 * « Aujourd'hui » et « Avec l'outil ». Le texte des quatre situations n'a pas changé.
 */

export type DailyFriction = {
  key: string;
  situation: string;
  friction: string;
  /** Le trajet actuel de l'information, maillon par maillon. */
  today: string[];
  /** Ce que ce trajet devient. */
  withTool: string;
};

export const DAILY_FRICTIONS: DailyFriction[] = [
  {
    key: "ressaisie",
    situation: "La même information, saisie trois fois",
    friction:
      "Un client vous écrit. Vous recopiez son nom dans un tableur, puis dans votre logiciel, puis dans le devis. Trois saisies pour une seule information, et à la fin plus personne ne sait quelle version est la bonne.",
    today: ["Mail", "Tableur", "Logiciel", "Devis"],
    withTool: "Une fiche unique alimente le reste.",
  },
  {
    key: "appels",
    situation: "L'appel qui tombe au mauvais moment",
    friction:
      "Vous êtes en intervention, en rendez-vous, les mains prises. Le téléphone sonne. Vous rappelez le soir, parfois le lendemain, et la personne a déjà trouvé quelqu'un d'autre.",
    today: ["Appel manqué", "Rappel le soir", "Parfois oublié"],
    withTool: "La demande est notée, qualifiée, et elle vous attend.",
  },
  {
    key: "recherche",
    situation: "L'information est écrite quelque part",
    friction:
      "Le tarif exact, la procédure, le devis de l'an dernier : tout existe. Dans un mail, un dossier partagé, un classeur. On cherche à plusieurs, et on finit par redemander à la personne qui sait.",
    today: ["Mails", "Dossier partagé", "Classeur", "On redemande"],
    withTool: "La réponse arrive avec le document d'où elle sort.",
  },
  {
    key: "soir",
    situation: "Le travail qui commence après la journée",
    friction:
      "La journée est finie. Restent le compte rendu, le devis à envoyer et les relances à faire. Ce travail ne se voit pas, il ne se facture pas, et il faut quand même le faire.",
    today: ["Compte rendu", "Devis", "Relances", "Le soir"],
    withTool: "Le document est préparé, vous n'avez qu'à le relire.",
  },
];

export const DAILY_FRICTION_CLOSING =
  "Toutes ces situations ne demandent pas de l'intelligence artificielle. Parfois, un formulaire bien branché suffit.";

/** Une icône par maillon du trajet actuel : le schéma se lit sans le texte. */
export const CHAIN_ICON: Record<string, LucideIcon | undefined> = {
  Mail: Mail,
  Tableur: Table2,
  Logiciel: PanelTop,
  Devis: FileText,
  "Appel manqué": PhoneMissed,
  "Rappel le soir": Moon,
  "Parfois oublié": Repeat,
  Mails: Mail,
  "Dossier partagé": FolderOpen,
  Classeur: FolderOpen,
  "On redemande": MessageSquareReply,
  "Compte rendu": FileText,
  Relances: CalendarClock,
  "Le soir": Moon,
};
