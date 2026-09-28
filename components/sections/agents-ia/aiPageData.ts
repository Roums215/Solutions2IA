import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  FileSearch,
  FileText,
  History,
  Inbox,
  MessageSquare,
  PhoneCall,
  Repeat,
  Route,
  ShieldCheck,
  Undo2,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Contenu de la page /agents-ia (V3 : rôle, calcul, contrôle, pilote). Aucune preuve inventée : exemples
 * situés sans client nommé, calculateur alimenté par les chiffres du visiteur, garanties
 * reprises de la FAQ (pilote 30 jours, restitution des données, hébergement UE).
 */

// ─── Contrôle : trois niveaux, un même flux, un verrou qui se déplace ───────

export type ControlLevel = 1 | 2 | 3;

export const AUTONOMY: { level: ControlLevel; title: string; line: string; lock: string; example: string }[] = [
  {
    level: 1,
    title: "Vous validez avant action",
    line: "Il comprend et prépare. Rien ne part sans votre accord.",
    lock: "Vous décidez",
    example: "une réponse à un client, un devis, une remise",
  },
  {
    level: 2,
    title: "Il agit dans un cadre précis",
    line: "Il fait ce que vos règles autorisent, vous relisez après.",
    lock: "Vous relisez",
    example: "poser un rendez-vous libre, classer un mail, créer une fiche",
  },
  {
    level: 3,
    title: "Il agit seul sur ce qui est sans risque",
    line: "Seulement ce qui se corrige facilement. Tout reste au journal.",
    lock: "Vous gardez le journal",
    example: "archiver une publicité, résumer une réunion, mettre à jour un statut",
  },
];

/** Le flux commun aux trois niveaux. `gate` = où se place le verrou humain selon le niveau. */
export const CONTROL_FLOW: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "demande", label: "Demande", icon: Inbox },
  { id: "comprendre", label: "Comprendre", icon: BookOpen },
  { id: "preparer", label: "Préparer", icon: ClipboardList },
  { id: "decider", label: "Décider", icon: Route },
  { id: "agir", label: "Agir", icon: Workflow },
  { id: "tracer", label: "Tracer", icon: History },
];

/** Index de l'étape que le verrou occupe : avant d'agir, après avoir agi, au journal. */
export const CONTROL_GATE: Record<ControlLevel, number> = { 1: 3, 2: 4, 3: 5 };

export const CONTROL_QUESTIONS: { q: string; a: string; icon: LucideIcon }[] = [
  {
    q: "Et s'il ne connaît pas la réponse ?",
    a: "Il répond à partir de vos documents et affiche sa source. Si l'information n'y est pas, il le dit et vous transmet la question.",
    icon: BookOpen,
  },
  {
    q: "Et s'il rencontre une exception ?",
    a: "L'action est bloquée selon vos règles (un prix, une remise, une réclamation) et vous est soumise avec la raison et la source.",
    icon: ClipboardCheck,
  },
  {
    q: "Puis-je relire ce qu'il a fait ?",
    a: "Oui. Chaque action est enregistrée : ce qu'il a lu, ce qu'il a proposé, ce que vous avez validé, ce qu'il a exécuté.",
    icon: History,
  },
  {
    q: "Où sont mes données ?",
    a: "Hébergées en France ou dans l'Union européenne, avec un contrat de traitement des données, et jamais utilisées pour entraîner un modèle.",
    icon: ShieldCheck,
  },
];

// ─── B · Un rôle précis : le besoin, puis l'exemple dans votre métier ──────

export type Sector = {
  id: string;
  label: string;
  /** La demande qui arrive, telle qu'on la lit. */
  ask: string;
  /** Ce qu'il vérifie. */
  known: string;
  /** Ce qu'il prépare ou fait (commence en minuscule). */
  done: string;
  /** Ce qui vous revient. */
  you: string;
  doc: string;
  teamQ: string;
  teamSource: string;
  weekly: [string, string];
};

export const SECTORS: Sector[] = [
  {
    id: "services",
    label: "Entreprise de services",
    ask: "un devis pour une visite",
    known: "zone, tarifs et agenda",
    done: "visite proposée jeudi 10 h",
    you: "une remise hors de votre grille",
    doc: "un bon de commande",
    teamQ: "« Quel délai pour une intervention urgente ? »",
    teamSource: "conditions-generales.pdf, article 4",
    weekly: ["4 devis sans réponse relancés", "Fiches clients mises à jour"],
  },
  {
    id: "cabinet",
    label: "Cabinet",
    ask: "un premier rendez-vous",
    known: "agenda et type de dossier",
    done: "rendez-vous proposé mardi 14 h",
    you: "un dossier hors de vos domaines",
    doc: "les pièces d'un dossier client",
    teamQ: "« Quelles pièces pour une succession ? »",
    teamSource: "liste-pieces-succession.pdf",
    weekly: ["Pièces manquantes réclamées à 3 clients", "Échéances de la semaine listées"],
  },
  {
    id: "commerce",
    label: "Commerce",
    ask: "« Ce modèle est-il disponible ? »",
    known: "stock et délais de livraison",
    done: "disponibilité confirmée, retrait samedi",
    you: "un geste commercial demandé",
    doc: "une facture fournisseur",
    teamQ: "« Comment traiter un échange sans ticket ? »",
    teamSource: "procedure-retours.pdf, étape 2",
    weekly: ["Clients prévenus des retours en stock", "Commandes fournisseurs préparées"],
  },
  {
    id: "immobilier",
    label: "Immobilier",
    ask: "une visite du T3 en centre-ville",
    known: "disponibilités et critères du mandat",
    done: "visite proposée samedi 10 h",
    you: "une offre sous le prix affiché",
    doc: "un dossier de location",
    teamQ: "« Quels diagnostics pour une vente ? »",
    teamSource: "checklist-vente.pdf",
    weekly: ["Acquéreurs relancés après visite", "Annonces mises à jour"],
  },
  {
    id: "formation",
    label: "Formation",
    ask: "une inscription à la session de mars",
    known: "places restantes et prérequis",
    done: "place réservée, programme envoyé",
    you: "une demande de prise en charge particulière",
    doc: "un dossier d'inscription",
    teamQ: "« Que faire en cas d'absence d'un stagiaire ? »",
    teamSource: "reglement-interieur.pdf",
    weekly: ["Convocations envoyées aux inscrits", "Feuilles d'émargement rassemblées"],
  },
  {
    id: "terrain",
    label: "Terrain / maintenance",
    ask: "une panne, pendant que vous êtes en intervention",
    known: "contrat et secteur du technicien",
    done: "intervention planifiée demain 8 h",
    you: "une intervention hors contrat",
    doc: "un rapport d'intervention",
    teamQ: "« Quelle référence pour ce filtre ? »",
    teamSource: "catalogue-pieces.pdf, page 12",
    weekly: ["Visites d'entretien planifiées", "Rapports envoyés aux clients"],
  },
];

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export type NeedId = "appels" | "messages" | "mails" | "documents" | "equipe" | "recurrent";

export type Need = {
  id: NeedId;
  icon: LucideIcon;
  /** Le besoin, dans le sélecteur. */
  label: string;
  /** Le rôle, sur la fiche. */
  name: string;
  mission: string;
  receives: string[];
  knows: string[];
  can: string[];
  asks: string[];
  tools: string[];
  /** L'objet de la mini scène : ce qu'on voit arriver. */
  object: string;
  /** La mini scène, écrite pour le métier choisi. */
  scene: (s: Sector) => { time: string; text: string; you?: boolean }[];
  related?: { label: string; href: string };
};

export const NEEDS: Need[] = [
  {
    id: "appels",
    icon: PhoneCall,
    label: "Appels",
    name: "Assistant vocal",
    mission: "Ne perdre aucun appel utile.",
    receives: ["Appels entrants", "Appels manqués"],
    knows: ["Horaires", "Prestations", "Zones", "Disponibilités"],
    can: ["Répondre", "Qualifier la demande", "Proposer un créneau", "Créer une fiche"],
    asks: ["Prix particulier", "Réclamation", "Décision sensible"],
    tools: ["Téléphone", "Agenda", "Fichier clients"],
    object: "Appel entrant",
    scene: (s) => [
      { time: "10:12", text: `Appel : ${s.ask}` },
      { time: "10:13", text: `Vérifié : ${s.known}` },
      { time: "10:14", text: `${cap(s.done)}, confirmation par SMS` },
      { time: "12:00", text: `Pour vous : ${s.you}`, you: true },
    ],
  },
  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
    name: "Assistant écrit",
    mission: "Répondre vite, sans répondre n'importe quoi.",
    receives: ["Discussion du site", "Messageries"],
    knows: ["Vos documents", "Vos tarifs publiés", "Vos délais"],
    can: ["Répondre avec la source", "Poser les bonnes questions", "Transmettre une demande prête"],
    asks: ["Question absente de vos documents", "Prix non publié"],
    tools: ["Site", "Messagerie", "Fichier clients"],
    object: "Message du site",
    scene: (s) => [
      { time: "21:40", text: `Message : ${s.ask}` },
      { time: "21:40", text: `Réponse avec la source : ${s.known}` },
      { time: "21:42", text: cap(s.done) },
      { time: "08:30", text: `Pour vous : ${s.you}`, you: true },
    ],
  },
  {
    id: "mails",
    icon: Inbox,
    label: "Boîte mail",
    name: "Tri de la boîte mail",
    mission: "Qu'aucun mail important ne dorme.",
    receives: ["Adresse commune", "Boîtes de l'équipe"],
    knows: ["Vos clients", "Vos modèles de réponse", "Vos priorités"],
    can: ["Classer", "Transmettre les factures", "Préparer les réponses", "Signaler l'urgent"],
    asks: ["Tout envoi, par défaut"],
    tools: ["Boîte mail", "Comptabilité", "Fichier clients"],
    object: "Mail reçu",
    scene: (s) => [
      { time: "07:00", text: `Mail reçu : ${s.ask}` },
      { time: "07:01", text: `Classé, vérifié : ${s.known}` },
      { time: "07:02", text: `Réponse préparée : ${s.done}` },
      { time: "08:15", text: "Vous relisez et envoyez", you: true },
    ],
  },
  {
    id: "documents",
    icon: FileSearch,
    label: "Documents",
    name: "Lecture de documents",
    mission: "Plus de saisie à la main, et aucun écart qui passe.",
    receives: ["Bons de commande", "Factures", "Formulaires"],
    knows: ["Vos tarifs", "Vos règles", "Vos clients"],
    can: ["Lire", "Extraire", "Comparer à vos règles", "Créer l'entrée dans votre logiciel"],
    asks: ["Tout écart avec vos règles"],
    tools: ["Logiciel métier", "Boîte mail"],
    object: "Document reçu",
    scene: (s) => [
      { time: "09:05", text: `Reçu : ${s.doc}` },
      { time: "09:05", text: `Informations extraites, comparées à : ${s.known}` },
      { time: "09:06", text: `Écart repéré : ${s.you}` },
      { time: "09:30", text: "Vous tranchez, le dossier avance", you: true },
    ],
  },
  {
    id: "equipe",
    icon: BookOpen,
    label: "Équipe",
    name: "Assistant d'équipe",
    mission: "Que chacun trouve la bonne réponse sans déranger personne.",
    receives: ["Questions de l'équipe"],
    knows: ["Procédures", "Tarifs", "Contrats"],
    can: ["Répondre avec la source", "Guider les nouveaux", "Dire quand l'information n'existe pas"],
    asks: ["Question hors de vos documents : il oriente vers la bonne personne"],
    tools: ["Vos documents", "Messagerie d'équipe"],
    object: "Question interne",
    scene: (s) => [
      { time: "14:02", text: s.teamQ },
      { time: "14:02", text: `Réponse avec ${s.teamSource}` },
      { time: "14:03", text: "Le collègue avance seul, sans vous déranger", you: true },
    ],
    related: { label: "La mémoire d'entreprise en détail", href: "/rag" },
  },
  {
    id: "recurrent",
    icon: Repeat,
    label: "Tâches récurrentes",
    name: "Tâches de fond",
    mission: "Que les relances ne dépendent plus de votre mémoire.",
    receives: ["Devis sans réponse", "Réunions", "Fichier clients"],
    knows: ["Vos délais de relance", "Votre ton"],
    can: ["Relancer", "Résumer une réunion", "Mettre à jour le fichier", "Préparer le point de la semaine"],
    asks: ["Les priorités : il ne décide pas pour vous"],
    tools: ["Boîte mail", "Agenda", "Fichier clients"],
    object: "Semaine type",
    scene: (s) => [
      { time: "Lun", text: s.weekly[0] },
      { time: "Mer", text: s.weekly[1] },
      { time: "Ven", text: "Point de la semaine prêt dans votre boîte", you: true },
    ],
  },
];

// ─── C · Le calculateur ─────────────────────────────────────────────────────

export const CALC_PRESETS: { id: string; icon: LucideIcon; label: string; unit: string; volume: number; minutes: number }[] = [
  { id: "mails", icon: Inbox, label: "Mails à traiter", unit: "mails par jour", volume: 40, minutes: 3 },
  { id: "appels", icon: PhoneCall, label: "Appels entrants", unit: "appels par jour", volume: 15, minutes: 5 },
  { id: "devis", icon: ClipboardList, label: "Devis à préparer", unit: "devis par jour", volume: 5, minutes: 20 },
  { id: "documents", icon: FileText, label: "Documents à saisir", unit: "documents par jour", volume: 20, minutes: 6 },
];

export const CALC_DEFAULTS = { share: 50, cost: 35, days: 220 };

export const CALC_NOTE =
  "Estimation à partir de vos chiffres, sur 220 jours travaillés par an. La part prise en charge dépend de la tâche : on la mesure réellement pendant le pilote, sur vos cas, avant de s'engager.";

// ─── Confiance & contrôle : la question, la réponse, le mécanisme ─────────

export const TRUST: { q: string; a: string; mechanism: string; icon: LucideIcon }[] = [
  {
    q: "Et s'il invente une réponse ?",
    a: "Il répond à partir de vos documents et affiche la source. Si l'information n'y est pas, il le dit et vous transmet la question.",
    mechanism: "Sources citées · transmission si l'information manque",
    icon: BookOpen,
  },
  {
    q: "Et s'il se trompe devant un client ?",
    a: "Ce qui engage l'entreprise passe par vous : un devis, un prix, un engagement. Vous fixez ce qu'il fait seul et ce qu'il vous soumet.",
    mechanism: "Validation humaine, réglée tâche par tâche",
    icon: ClipboardCheck,
  },
  {
    q: "Mes données partent où ?",
    a: "Hébergement en France ou dans l'Union européenne, contrat de traitement des données, et aucun entraînement de modèle sur vos données.",
    mechanism: "Hébergement UE · contrat de traitement · pas d'entraînement",
    icon: ShieldCheck,
  },
  {
    q: "C'est une boîte noire ?",
    a: "Chaque action est enregistrée : ce qu'il a lu, ce qu'il a proposé, ce que vous avez validé, ce qu'il a exécuté. Vous pouvez tout relire.",
    mechanism: "Journal de chaque action",
    icon: History,
  },
  {
    q: "Mon équipe va-t-elle l'accepter ?",
    a: "On commence sur une seule tâche, avec les personnes concernées, et on explique ce qu'il fait et ce qu'il ne fait pas. Il retire des tâches pénibles, il ne remplace personne.",
    mechanism: "Périmètre limité · pilote avec l'équipe",
    icon: Users,
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: "Le pilote de 30 jours est satisfait ou remboursé : vous arrêtez quand vous voulez, sans frais. L'assistant est désactivé et vos données vous sont restituées.",
    mechanism: "Arrêt sans frais · désactivation · données restituées",
    icon: Undo2,
  },
];

export const TRUST_TECH: { label: string; text: string }[] = [
  { label: "Comment il répond", text: "Il cherche d'abord dans vos documents (on parle de RAG, génération augmentée par la recherche), puis rédige à partir de ce qu'il a trouvé. Sans source, pas de réponse affirmée." },
  { label: "Les modèles", text: "Des modèles de langage (LLM) choisis selon la tâche et l'hébergement voulu, par exemple Mistral ou Claude sur des infrastructures européennes." },
  { label: "Les actions", text: "Il n'agit dans vos outils qu'à travers des accès précis, limités à la tâche, avec une règle de validation pour chaque type d'action." },
];

// ─── Déploiement : une tâche, un pilote, puis on élargit ───────────────────

export const PILOT_PATH: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Une tâche", text: "Celle qui vous coûte le plus de temps." },
  { n: "02", title: "Vos règles", text: "Vos documents, vos outils, ce qu'il fait seul." },
  { n: "03", title: "30 jours réels", text: "Sur vos vrais cas, avec l'équipe concernée." },
  { n: "04", title: "Mesure", text: "Temps passé avant et après, sur vos chiffres." },
  { n: "05", title: "Vous décidez de la suite", text: "Arrêter, garder, ou ajouter une tâche." },
];

export const PILOT_TERMS: { label: string; detail: string }[] = [
  { label: "Périmètre défini", detail: "une tâche, écrite noir sur blanc avant de commencer" },
  { label: "30 jours", detail: "sur vos vrais cas, avec votre équipe" },
  { label: "Mesures avant et après", detail: "temps, erreurs, demandes traitées" },
  { label: "Arrêt possible", detail: "à tout moment, sans frais : satisfait ou remboursé" },
  { label: "Données restituées", detail: "l'assistant est désactivé, vos données vous reviennent" },
];

export const PILOT_PRICE = {
  value: "Sur devis",
  line: "1 à 2 tâches pour commencer, reliées à vos outils. Chiffré après un premier échange gratuit. Mise en place en 3 à 4 semaines.",
};
