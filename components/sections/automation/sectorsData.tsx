import type { ReactNode } from "react";
import type { PipelineNode, PipelineEdge } from "./pipelineData";

export type SectorDetailItem = { label: string; text: string };

export type SectorDetails = {
  trigger:     SectorDetailItem;
  processing:  SectorDetailItem;
  write:       SectorDetailItem;
  reliability: SectorDetailItem;
};

export type SectorGain = { title: string; text: string };

export type Sector = {
  slug: string;
  name: string;
  icon: ReactNode;
  problem: string;
  benefit: string;
  /** Accent (dégradé) du h1 : un bénéfice, jamais un mot technique. */
  heroAccent: string;
  /** Ce que ça change dans la semaine : 3 tuiles, sans chiffre inventé. */
  gains: SectorGain[];
  /** Est-ce fait pour vous : 3 conditions courtes. */
  forWho: string[];
  /** Une phrase honnête : quand ce n'est pas la bonne solution. */
  notForYou: string;
  /** Échéance légale réelle (urgence authentique), facultative. */
  deadline?: string;
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  stack: string[];
  seoTitle: string;
  seoDescription: string;
  details?: SectorDetails;
};

// Les IDs des nodes restent calqués sur DEFAULT_NODES de pipelineData.ts.
// AutomationPipeline hardcode actuellement positions + séquence d'animation
// sur ces 6 IDs canoniques — seuls label / sublabel / tool peuvent varier
// par secteur. Quand on déploiera plus de secteurs, généraliser AutomationPipeline
// pour driver positions + SEQ depuis les props nodes/edges.

const ImmobilierIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan"
    aria-hidden="true"
  >
    <path d="M3 21h18" />
    <path d="M5 21V8l7-5 7 5v13" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 11h.01M13 11h.01" />
  </svg>
);

const CabinetComptableIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan"
    aria-hidden="true"
  >
    <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3z" />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
    <path d="M9 16h4" />
  </svg>
);

const BtpIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan"
    aria-hidden="true"
  >
    <path d="M4 17h16" />
    <path d="M4 17v-2a8 8 0 0 1 16 0v2" />
    <path d="M12 7V4" />
    <path d="M9 4h6" />
    <path d="M4 20h16" />
  </svg>
);

const RestaurationIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan"
    aria-hidden="true"
  >
    <path d="M7 3v8a2 2 0 0 0 2 2v8" />
    <path d="M11 3v8a2 2 0 0 1-2 2" />
    <path d="M7 7h4" />
    <path d="M17 3c-1.5 0-3 1.5-3 4s1 4 3 4v10" />
  </svg>
);

const FormationIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan"
    aria-hidden="true"
  >
    <path d="M2 10l10-5 10 5-10 5-10-5z" />
    <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    <path d="M22 10v6" />
  </svg>
);

export const SECTORS: Sector[] = [
  {
    slug: "immobilier",
    name: "Immobilier",
    icon: ImmobilierIcon,
    problem:
      "Vos leads SeLoger et Leboncoin se perdent entre une boîte mail et un tableur : quand vous rappelez, l'agence d'à côté a déjà décroché.",
    benefit:
      "Chaque demande qualifiée arrive en quelques minutes dans le CRM, avec un SMS au commercial qui peut rappeler avant tout le monde.",
    heroAccent: "rappeler avant l'agence d'à côté",
    gains: [
      { title: "Du temps", text: "Plus de tri manuel des demandes SeLoger et Leboncoin : chaque lead arrive déjà lu, classé et rangé dans votre CRM. Comptez le temps passé chaque jour à recopier des demandes : c'est ce temps-là qui revient." },
      { title: "De l'argent", text: "Un lead chaud rappelé dans l'heure a plus de chances de signer que le lendemain. Le SMS au commercial part dès que la demande est enregistrée, soirs et week-ends compris." },
      { title: "Vos clients", text: "Aucun acquéreur ne reste sans réponse. Chaque demande garde sa source, son budget et sa zone : le commercial rappelle en connaissant déjà le dossier." },
    ],
    forWho: [
      "Vous recevez des demandes SeLoger, Leboncoin ou depuis votre site",
      "Vous utilisez un CRM (HubSpot, Pipedrive ou le vôtre), ou voulez en avoir un",
      "Vos commerciaux rappellent parfois trop tard, faute d'avoir vu la demande",
    ],
    notForYou: "Si vous recevez moins d'une demande par semaine, un simple transfert de mail suffit : je vous le dirai.",
    nodes: [
      { id: "jobphoning",   tool: "jobphoning", label: "SeLoger",   sublabel: "lead reçu" },
      { id: "n8n-clean",    tool: "n8n",        label: "n8n",       sublabel: "qualification" },
      { id: "n8n-siren",    tool: "n8n",        label: "Claude",    sublabel: "enrichissement" },
      { id: "n8n-decision", tool: "n8n",        label: "n8n",       sublabel: "scoring" },
      { id: "axonaut",      tool: "axonaut",    label: "CRM",       sublabel: "lead enregistré" },
      { id: "notify",       tool: "notify",     label: "SMS",       sublabel: "commercial alerté" },
    ],
    edges: [
      { from: "jobphoning",   to: "n8n-clean",    kind: "main" },
      { from: "n8n-clean",    to: "n8n-siren",    kind: "main" },
      { from: "n8n-siren",    to: "n8n-decision", kind: "main" },
      { from: "n8n-decision", to: "axonaut",      kind: "main" },
      { from: "axonaut",      to: "notify",       kind: "notification" },
      { from: "n8n-decision", to: "jobphoning",   kind: "callback" },
    ],
    stack: ["SeLoger", "Leboncoin", "n8n", "Claude", "CRM", "SMS"],
    seoTitle:
      "Automatisation immobilier : leads en CRM",
    seoDescription:
      "Automatisation pour agences immobilières : le lead SeLoger ou Leboncoin est lu, qualifié et rangé dans votre CRM, avec un SMS au commercial. Hébergé en Europe.",
    details: {
      trigger: {
        label: "Déclencheur",
        text: "nouveau lead SeLoger ou Leboncoin (formulaire de contact) capté par webhook ou parsing email.",
      },
      processing: {
        label: "Qualification IA",
        text: "Claude lit la demande, identifie type de bien, budget, zone et intention ; n8n déduplique et score le lead.",
      },
      write: {
        label: "Écriture CRM",
        text: "création du contact + opportunité dans votre CRM (HubSpot, Pipedrive ou propre), avec source, score et notes.",
      },
      reliability: {
        label: "Fiabilité",
        text: "SMS au commercial dès qu'un lead chaud est enregistré, journalisation complète, reprises automatiques. Hébergé en UE.",
      },
    },
  },
  {
    slug: "cabinet-comptable",
    name: "Cabinet comptable",
    icon: CabinetComptableIcon,
    problem:
      "Factures, relevés, reçus s'accumulent : vos collaborateurs trient et relancent au lieu d'analyser.",
    benefit:
      "Chaque pièce arrive, est lue et classée sans ressaisie. Le dossier se construit seul. Le collaborateur se concentre sur l'analyse.",
    heroAccent: "les pièces classées sans ressaisie",
    gains: [
      { title: "Du temps", text: "Factures, relevés et reçus sont lus et classés à leur arrivée, dans le bon dossier. Vos collaborateurs ne trient plus : ils vérifient et analysent." },
      { title: "De l'argent", text: "Les relances de pièces manquantes partent seules, aux bonnes dates. Moins de dossiers en retard à la clôture, moins d'heures non facturables passées à courir après les clients." },
      { title: "Vos clients", text: "Le client dépose ses pièces par mail, WhatsApp ou Drive, comme il en a l'habitude. Il reçoit un accusé et sait ce qu'il manque : moins d'allers-retours, une relation plus calme." },
    ],
    forWho: [
      "Vous tenez des dossiers sur Pennylane, Sage, Quadra ou un outil équivalent",
      "Vos collaborateurs passent une partie de la journée à trier et relancer",
      "Vous voulez garder la validation humaine sur chaque écriture",
    ],
    notForYou: "Si votre logiciel de production fait déjà la collecte automatique et que vos clients l'utilisent, l'écart sera faible : on le vérifie ensemble avant de démarrer.",
    deadline: "depuis le 1er septembre 2026, toutes les entreprises assujetties à la TVA doivent pouvoir recevoir des factures électroniques, et vos clients PME et TPE devront en émettre à partir du 1er septembre 2027. Un flux de collecte déjà prêt pour ce format vous évite de tout refaire dans un an.",
    nodes: [
      {
        id: "sources", tool: "jobphoning",
        label: "Sources",
        sublabel: "email · Drive · WhatsApp",
        activeStatus: ["facture reçue", "relevé déposé", "reçu détecté"],
      },
      {
        id: "extraction", tool: "n8n",
        label: "Analyse IA",
        sublabel: "OCR + Claude",
        activeStatus: ["facture reconnue", "TVA détectée", "montant lu"],
      },
      {
        id: "verification", tool: "n8n",
        label: "Vérification",
        sublabel: "doublons · cohérence · alertes",
        activeStatus: ["doublon ignoré", "pièce manquante détectée", "TVA reconnue"],
      },
      {
        id: "export", tool: "axonaut",
        label: "Écriture",
        sublabel: "Pennylane · Sage · Quadra",
        activeStatus: ["écriture validée", "export Sage OK", "ligne créée"],
      },
      {
        id: "notify", tool: "notify",
        label: "Collaborateur",
        sublabel: "prêt à analyser",
      },
    ],
    edges: [
      { from: "sources",      to: "extraction",   kind: "main" },
      { from: "extraction",   to: "verification", kind: "main" },
      { from: "verification", to: "export",       kind: "main" },
      { from: "export",       to: "notify",       kind: "notification", label: "Prêt à analyser" },
      { from: "verification", to: "sources",      kind: "callback",     label: "Relance · pièce manquante" },
    ],
    stack: ["Gmail", "Drive", "OCR", "Claude", "n8n", "Pennylane"],
    seoTitle:
      "Automatisation comptable : zéro ressaisie",
    seoDescription:
      "Automatisation pour cabinets comptables : chaque pièce est lue et classée dans Pennylane, Sage ou Quadra, relances automatiques incluses. Hébergé en Europe.",
    details: {
      trigger: {
        label: "Déclencheur",
        text: "Email, dépôt Drive ou upload client. Le pipeline démarre seul.",
      },
      processing: {
        label: "Analyse IA",
        text: "L'OCR et Claude lisent type de pièce, fournisseur, montant HT et TVA.",
      },
      write: {
        label: "Export",
        text: "Données poussées vers Pennylane, Sage ou Quadra. Notification dès l'export.",
      },
      reliability: {
        label: "Fiabilité",
        text: "Doublons ignorés. Relances automatiques. Journalisation complète. Hébergé en UE.",
      },
    },
  },
  {
    slug: "btp",
    name: "BTP",
    icon: BtpIcon,
    problem:
      "Un client envoie des photos et une description WhatsApp : le devis part trois jours plus tard, quand le concurrent l'a déjà signé.",
    benefit:
      "Chaque demande chantier génère un pré-devis structuré dans Tolteck ou Obat, avec une notification à l'artisan dès la mise en attente.",
    heroAccent: "le pré-devis prêt avant le concurrent",
    gains: [
      { title: "Du temps", text: "Photos et description WhatsApp deviennent un pré-devis structuré dans Tolteck, Obat ou Batappli. Vous relisez et ajustez au lieu de tout saisir le soir." },
      { title: "De l'argent", text: "Le devis qui part le jour même a plus de chances d'être signé que celui qui part trois jours après. La relance automatique à J+3 rattrape ceux qui allaient s'oublier." },
      { title: "Vos clients", text: "Chaque demande reçoit une réponse rapide et un devis lisible. Le client sait où il en est, sans avoir à vous rappeler." },
    ],
    forWho: [
      "Vous faites vos devis sur Tolteck, Obat, Batappli ou un outil équivalent",
      "Les demandes arrivent par WhatsApp, mail ou téléphone, souvent avec des photos",
      "Vous perdez des chantiers parce que le devis part trop tard",
    ],
    notForYou: "Si chaque chantier exige une visite avant tout chiffrage, le flux prépare le dossier mais ne remplace pas le métré : on cadre ensemble ce qu'il peut faire.",
    nodes: [
      {
        id: "sources", tool: "jobphoning",
        label: "Demandes",
        sublabel: "formulaire · photo",
        activeStatus: ["chantier signalé", "photo reçue", "demande captée"],
      },
      {
        id: "analyse", tool: "n8n",
        label: "Analyse",
        sublabel: "besoin · métré",
        activeStatus: ["besoin identifié", "chantier compris", "métré estimé"],
      },
      {
        id: "devis", tool: "n8n",
        label: "Pré-devis",
        sublabel: "bibliothèque prix",
        activeStatus: ["prix calculé", "devis chiffré", "lignes prêtes"],
      },
      {
        id: "crm", tool: "axonaut",
        label: "Devis",
        sublabel: "Tolteck · Obat",
        activeStatus: ["devis envoyé", "client suivi", "relance posée"],
      },
      {
        id: "notify", tool: "notify",
        label: "Artisan",
        sublabel: "nouveau devis",
      },
    ],
    edges: [
      { from: "sources", to: "analyse", kind: "main" },
      { from: "analyse", to: "devis",   kind: "main" },
      { from: "devis",   to: "crm",     kind: "main" },
      { from: "crm",     to: "notify",  kind: "notification", label: "Artisan prévenu" },
      { from: "crm",     to: "sources", kind: "callback",     label: "Devis oublié · relance J+3" },
    ],
    stack: ["Tolteck", "Obat", "Batappli", "Claude", "n8n"],
    seoTitle:
      "Automatisation BTP : devis et relances",
    seoDescription:
      "Automatisation pour artisans du BTP : la demande WhatsApp devient un pré-devis dans Tolteck ou Obat, relance automatique à J+3 sans réponse. Hébergé en Europe.",
    details: {
      trigger: {
        label: "Déclencheur",
        text: "demande chantier reçue par formulaire site, email ou photo WhatsApp, captée par webhook ou parsing pièce jointe.",
      },
      processing: {
        label: "Analyse IA",
        text: "Claude identifie le type de travaux, le métré approximatif et la bibliothèque de prix applicable ; n8n assemble le pré-devis.",
      },
      write: {
        label: "Écriture",
        text: "pré-devis créé dans votre logiciel métier (Tolteck, Obat ou Batappli) avec libellés, postes et statut « à valider ».",
      },
      reliability: {
        label: "Fiabilité",
        text: "notification à l'artisan dès qu'un devis est prêt, relance auto J+3 si le devis reste sans réponse, journalisation complète. Hébergé en UE.",
      },
    },
  },
  {
    slug: "restauration",
    name: "Restauration",
    icon: RestaurationIcon,
    problem:
      "Les réservations arrivent sur Instagram, WhatsApp et le site en même temps : une table promise deux fois, une soirée pleine qui se vide d'un coup.",
    benefit:
      "Chaque demande est lue, la disponibilité vérifiée et la réservation posée dans Zenchef ou TheFork avant que vous ayez vu le message.",
    heroAccent: "chaque réservation posée sans vous",
    gains: [
      { title: "Du temps", text: "Instagram, WhatsApp, site : chaque demande est lue, la disponibilité vérifiée et la réservation posée dans Zenchef ou TheFork. Vous n'êtes plus au téléphone pendant le service." },
      { title: "De l'argent", text: "Le rappel de la veille réduit les tables réservées puis oubliées. Une table libérée à temps est une table remise en vente, pas une perte sèche." },
      { title: "Vos clients", text: "Réponse en quelques minutes, même à 23 h, avec votre ton. Plus de table promise deux fois, plus de message resté sans réponse." },
    ],
    forWho: [
      "Vous prenez des réservations sur Zenchef, TheFork ou Google Calendar",
      "Les demandes arrivent en même temps sur plusieurs canaux",
      "Les tables réservées puis oubliées vous coûtent des soirées",
    ],
    notForYou: "Si vous ne prenez pas de réservation, ou si une seule personne gère un seul canal sans difficulté, ce flux n'apportera pas grand-chose : je vous le dirai franchement.",
    nodes: [
      {
        id: "sources", tool: "jobphoning",
        label: "Demandes",
        sublabel: "Insta · site · WhatsApp",
        activeStatus: ["demande Insta", "message WhatsApp", "résa demandée"],
      },
      {
        id: "ia", tool: "n8n",
        label: "IA résa",
        sublabel: "couverts · date",
        activeStatus: ["couverts compris", "date détectée", "demande lue"],
      },
      {
        id: "dispo", tool: "n8n",
        label: "Disponibilité",
        sublabel: "plan de salle",
        activeStatus: ["table libre", "créneau trouvé", "salle vérifiée"],
      },
      {
        id: "resa", tool: "axonaut",
        label: "Réservation",
        sublabel: "Zenchef · TheFork",
        activeStatus: ["table bloquée", "résa posée", "client réservé"],
      },
      {
        id: "notify", tool: "notify",
        label: "SMS",
        sublabel: "confirmation",
      },
    ],
    edges: [
      { from: "sources", to: "ia",     kind: "main" },
      { from: "ia",      to: "dispo",  kind: "main" },
      { from: "dispo",   to: "resa",   kind: "main" },
      { from: "resa",    to: "notify", kind: "notification", label: "SMS client" },
      { from: "resa",    to: "sources", kind: "callback",    label: "No-show évité · rappel J-1" },
    ],
    stack: ["Zenchef", "TheFork", "Google Calendar", "Claude", "SMS"],
    seoTitle:
      "Automatisation restaurant : réservations",
    seoDescription:
      "Automatisation pour restaurants : demandes Instagram, WhatsApp et site traitées, réservation posée dans Zenchef ou TheFork, rappel la veille. Hébergé en Europe.",
    details: {
      trigger: {
        label: "Déclencheur",
        text: "message de réservation reçu via Instagram, formulaire site ou WhatsApp, capté par webhook ou connecteur messagerie.",
      },
      processing: {
        label: "Analyse IA",
        text: "Claude extrait date, heure, nombre de couverts et contraintes ; n8n vérifie la disponibilité du plan de salle en temps réel.",
      },
      write: {
        label: "Écriture",
        text: "réservation créée dans Zenchef ou TheFork (ou Google Calendar), avec nom, couverts, créneau et statut confirmé.",
      },
      reliability: {
        label: "Fiabilité",
        text: "SMS de confirmation envoyé à la pose, rappel J-1 anti no-show déclenché automatiquement, journalisation complète. Hébergé en UE.",
      },
    },
  },
  {
    slug: "formation",
    name: "Formation",
    icon: FormationIcon,
    problem:
      "Un prospect CPF remplit le formulaire un vendredi : sans relance sous 48 h, il signe ailleurs et le dossier de financement n'existe plus.",
    benefit:
      "Chaque lead est qualifié, le programme adapté à son profil et le dossier d'inscription envoyé à la signature sans intervention manuelle.",
    heroAccent: "le dossier signé avant le week-end",
    gains: [
      { title: "Du temps", text: "Chaque demande CPF ou OPCO est qualifiée, le bon programme proposé et le dossier créé dans Digiforma ou Dendreo. Vous validez, vous ne ressaisissez pas." },
      { title: "De l'argent", text: "Un prospect relancé dans l'heure signe plus souvent que celui relancé le lundi. La convention part à la signature Yousign sans attendre." },
      { title: "Vos clients", text: "Le stagiaire reçoit une réponse claire et un dossier complet, du premier contact à la signature. Moins de relances, moins de dossiers de financement abandonnés." },
    ],
    forWho: [
      "Vous gérez vos sessions sur Digiforma, Dendreo ou un outil équivalent",
      "Vos demandes CPF ou OPCO arrivent par formulaire et par mail",
      "Le dossier de financement traîne parfois jusqu'à la perte du prospect",
    ],
    notForYou: "Si vous formez uniquement en intra pour quelques grands comptes, la qualification automatique apporte peu : la valeur est alors dans la préparation des dossiers, pas dans le tri.",
    nodes: [
      {
        id: "sources", tool: "jobphoning",
        label: "Leads",
        sublabel: "site · CPF · email",
        activeStatus: ["lead CPF reçu", "demande site", "candidat repéré"],
      },
      {
        id: "qualif", tool: "n8n",
        label: "Qualification",
        sublabel: "besoin · financement",
        activeStatus: ["besoin compris", "CPF validé", "profil scoré"],
      },
      {
        id: "programme", tool: "n8n",
        label: "Programme",
        sublabel: "adapté au profil",
        activeStatus: ["modules choisis", "programme prêt", "parcours posé"],
      },
      {
        id: "inscription", tool: "axonaut",
        label: "Inscription",
        sublabel: "Digiforma · Dendreo",
        activeStatus: ["dossier monté", "convention prête", "apprenant créé"],
      },
      {
        id: "notify", tool: "notify",
        label: "Signature",
        sublabel: "Yousign",
      },
    ],
    edges: [
      { from: "sources",     to: "qualif",      kind: "main" },
      { from: "qualif",      to: "programme",   kind: "main" },
      { from: "programme",   to: "inscription", kind: "main" },
      { from: "inscription", to: "notify",      kind: "notification", label: "Signature envoyée" },
      { from: "inscription", to: "sources",     kind: "callback",     label: "Lead CPF froid · relance" },
    ],
    stack: ["Digiforma", "Dendreo", "Yousign", "Claude", "n8n"],
    seoTitle:
      "Automatisation formation : CPF et OPCO",
    seoDescription:
      "Automatisation pour organismes de formation : lead CPF ou OPCO qualifié, dossier créé dans Digiforma ou Dendreo, signature Yousign. Hébergé en Europe.",
    details: {
      trigger: {
        label: "Déclencheur",
        text: "lead reçu via site, Mon Compte Formation ou email, capté par webhook ou formulaire connecté à n8n.",
      },
      processing: {
        label: "Qualification IA",
        text: "Claude identifie le besoin, le dispositif de financement (CPF, OPCO, plan de formation) et sélectionne le programme correspondant.",
      },
      write: {
        label: "Écriture",
        text: "dossier d'inscription créé dans Digiforma ou Dendreo avec profil stagiaire, programme retenu et pièces requises ; lien Yousign envoyé.",
      },
      reliability: {
        label: "Fiabilité",
        text: "notification envoyée dès que le dossier est à signer, relance auto si le lead CPF reste froid sans signer sous 48 h, journalisation Qualiopi-compatible. Hébergé en UE.",
      },
    },
  },
];
