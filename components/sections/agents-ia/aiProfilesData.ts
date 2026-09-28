import { BriefcaseBusiness, Headset, Megaphone, Scale, TrendingUp, UserRound, type LucideIcon } from "lucide-react";

/**
 * Configurateur de rôle (/agents-ia) : UNE interface, reconfigurée selon le profil.
 * Même grammaire pour les six profils (objectif, entrées, connaissances, ce qu'il fait,
 * ce que vous gardez, outils, mesure), puis le poste de travail du jour.
 * Données d'exemple uniquement, signalées comme telles ; aucun résultat client.
 */

export type QueueState = "fait" | "seul" | "valider" | "suivant";

export type Profile = {
  id: string;
  icon: LucideIcon;
  name: string;
  objective: string;
  inputs: string[];
  knowledge: string[];
  does: string[];
  keep: string[];
  tools: string[];
  measures: string[];
  kpis: { goal: string; pending: number; toValidate: number; saved: string };
  queue: { time: string; text: string; state: QueueState }[];
  validate: { what: string; why: string }[];
  alone: string[];
  sources: string[];
};

export const PROFILES: Profile[] = [
  {
    id: "commercial",
    icon: TrendingUp,
    name: "Commercial",
    objective: "Ne laisser aucune demande commerciale sans suite.",
    inputs: ["Site", "Mails", "Appels", "LinkedIn"],
    knowledge: ["Offres", "Tarifs", "Zones", "Disponibilités"],
    does: ["Qualifie la demande", "Crée la fiche", "Prépare la relance", "Propose un rendez-vous"],
    keep: ["Validation des prix", "Négociation", "Décisions sensibles"],
    tools: ["Fichier clients", "Agenda", "Mail", "Téléphone"],
    measures: ["Temps de saisie évité", "Demandes traitées", "Relances préparées"],
    kpis: { goal: "Répondre à chaque demande le jour même", pending: 4, toValidate: 2, saved: "≈ 1 h 40" },
    queue: [
      { time: "08:42", text: "Appel traité : demande de devis notée", state: "fait" },
      { time: "09:03", text: "Demande du site qualifiée : budget et délai", state: "seul" },
      { time: "09:14", text: "Réponse préparée dans votre ton", state: "fait" },
      { time: "09:31", text: "Remise demandée hors grille", state: "valider" },
      { time: "10:02", text: "Rendez-vous créé jeudi 10 h", state: "seul" },
      { time: "11:00", text: "Relance J+7 de 3 devis", state: "suivant" },
    ],
    validate: [
      { what: "Remise de 12 % pour Agence T.", why: "au-delà de votre grille (10 %)" },
      { what: "Envoi du devis Menuiserie D.", why: "montant à confirmer" },
    ],
    alone: ["Fiche créée depuis un mail, doublon évité", "Rendez-vous posé sur un créneau libre", "Demande publicitaire archivée"],
    sources: ["grille-tarifaire-2026.pdf", "zones-intervention.pdf", "Votre agenda"],
  },
  {
    id: "dirigeant",
    icon: BriefcaseBusiness,
    name: "Dirigeant PME",
    objective: "Voir l'essentiel en dix minutes, et ne décider que ce qui compte.",
    inputs: ["Boîte mail", "Agenda", "Comptabilité", "Équipe"],
    knowledge: ["Priorités", "Clients clés", "Règles de l'entreprise", "Échéances"],
    does: ["Trie et résume les mails", "Prépare le point du matin", "Signale les échéances", "Prépare les réponses courantes"],
    keep: ["Signatures et engagements", "Arbitrages", "Relations clients clés"],
    tools: ["Mail", "Agenda", "Comptabilité", "Messagerie d'équipe"],
    measures: ["Mails traités sans vous", "Décisions soumises", "Temps de tri évité"],
    kpis: { goal: "10 minutes de point au lieu d'une heure", pending: 3, toValidate: 3, saved: "≈ 55 min" },
    queue: [
      { time: "07:00", text: "46 mails de la nuit triés et résumés", state: "seul" },
      { time: "07:05", text: "Point du matin prêt : 3 décisions, 2 échéances", state: "fait" },
      { time: "08:10", text: "Devis fournisseur à signer avant vendredi", state: "valider" },
      { time: "09:20", text: "Réponse au client A préparée", state: "valider" },
      { time: "10:00", text: "Relance facture impayée envoyée", state: "seul" },
      { time: "16:00", text: "Point de la semaine", state: "suivant" },
    ],
    validate: [
      { what: "Signer le devis fournisseur B", why: "engagement de plus de 5 000 €" },
      { what: "Répondre au client A", why: "client clé, ton à confirmer" },
      { what: "Accepter la réunion de jeudi", why: "conflit avec un rendez-vous" },
    ],
    alone: ["Newsletters archivées", "Factures transmises à la comptabilité", "Relance d'impayé selon votre modèle"],
    sources: ["Vos règles de tri", "Échéancier comptable", "Votre agenda"],
  },
  {
    id: "expert",
    icon: Scale,
    name: "Expert métier",
    objective: "Passer son temps sur l'expertise, pas sur la recherche.",
    inputs: ["Questions clients", "Dossiers", "Documents reçus"],
    knowledge: ["Procédures", "Modèles", "Jurisprudence ou normes", "Dossiers passés"],
    does: ["Retrouve le bon document", "Prépare une première réponse sourcée", "Complète les dossiers", "Liste les pièces manquantes"],
    keep: ["L'avis d'expert", "Tout ce qui engage votre responsabilité", "La réponse finale"],
    tools: ["Vos documents", "Gestion des dossiers", "Mail"],
    measures: ["Temps de recherche évité", "Dossiers complétés", "Réponses sourcées"],
    kpis: { goal: "Dossiers complets avant le rendez-vous", pending: 5, toValidate: 2, saved: "≈ 1 h 15" },
    queue: [
      { time: "08:30", text: "Question du client M. : 3 sources retrouvées", state: "fait" },
      { time: "09:10", text: "Première réponse préparée, sources jointes", state: "valider" },
      { time: "09:40", text: "Dossier D-31 : 2 pièces manquantes demandées", state: "seul" },
      { time: "10:15", text: "Modèle de contrat pré-rempli", state: "fait" },
      { time: "11:30", text: "Point sur la réforme de mars : notes classées", state: "seul" },
      { time: "14:00", text: "Préparation du rendez-vous SARL M.", state: "suivant" },
    ],
    validate: [
      { what: "Réponse au client M.", why: "avis engageant votre responsabilité" },
      { what: "Contrat de mission pré-rempli", why: "clauses à relire" },
    ],
    alone: ["Pièces manquantes réclamées", "Documents reçus classés au bon dossier", "Notes de veille rangées"],
    sources: ["procedures-cabinet.pdf", "modeles-contrats/", "Dossier D-31"],
  },
  {
    id: "sav",
    icon: Headset,
    name: "SAV / Support",
    objective: "Répondre vite aux demandes simples, et escalader les vraies.",
    inputs: ["Tickets", "Mails", "Discussion du site", "Appels"],
    knowledge: ["Fiches produits", "Procédures de retour", "Garanties", "Historique client"],
    does: ["Répond aux questions fréquentes", "Classe et priorise les tickets", "Prépare les retours", "Escalade les cas difficiles"],
    keep: ["Gestes commerciaux", "Clients mécontents", "Exceptions à la garantie"],
    tools: ["Outil de tickets", "Mail", "Logiciel de commandes"],
    measures: ["Tickets résolus sans escalade", "Délai de première réponse", "Escalades justifiées"],
    kpis: { goal: "Première réponse en moins d'une heure", pending: 7, toValidate: 2, saved: "≈ 2 h" },
    queue: [
      { time: "08:05", text: "12 tickets classés par priorité", state: "seul" },
      { time: "08:20", text: "Où est ma commande ? 6 réponses envoyées", state: "seul" },
      { time: "09:02", text: "Retour produit préparé, étiquette générée", state: "fait" },
      { time: "09:45", text: "Client mécontent : escaladé vers vous", state: "valider" },
      { time: "10:30", text: "Geste commercial demandé", state: "valider" },
      { time: "11:00", text: "Relance des tickets en attente client", state: "suivant" },
    ],
    validate: [
      { what: "Répondre au client mécontent R.", why: "ton et geste à décider" },
      { what: "Avoir de 20 € pour la commande 2291", why: "hors garantie" },
    ],
    alone: ["Suivi de commande envoyé au client", "Ticket en doublon fusionné", "Procédure de retour expliquée"],
    sources: ["procedure-retours.pdf", "conditions-garantie.pdf", "Historique client"],
  },
  {
    id: "marketing",
    icon: Megaphone,
    name: "Marketeur",
    objective: "Publier régulièrement sans y passer ses soirées.",
    inputs: ["Idées de sujets", "Actualités de l'entreprise", "Statistiques"],
    knowledge: ["Ton de la marque", "Offres", "Calendrier", "Contenus passés"],
    does: ["Prépare des brouillons de publications", "Décline un contenu par canal", "Prépare le point des statistiques", "Suit le calendrier éditorial"],
    keep: ["Ce qui est publié", "Le ton final", "Les promesses faites aux clients"],
    tools: ["Réseaux sociaux", "Site", "Outil d'envoi de mails"],
    measures: ["Brouillons prêts", "Publications tenues à la date", "Temps de rédaction évité"],
    kpis: { goal: "3 publications prêtes pour la semaine", pending: 3, toValidate: 3, saved: "≈ 1 h 30" },
    queue: [
      { time: "09:00", text: "Actualité de la semaine : 3 brouillons préparés", state: "fait" },
      { time: "09:20", text: "Article décliné pour LinkedIn et la lettre", state: "fait" },
      { time: "10:00", text: "Brouillons prêts à relire", state: "valider" },
      { time: "11:00", text: "Point des statistiques de la semaine", state: "seul" },
      { time: "15:00", text: "Calendrier du mois mis à jour", state: "seul" },
      { time: "Lun", text: "Publication programmée après votre accord", state: "suivant" },
    ],
    validate: [
      { what: "Publication LinkedIn du mardi", why: "ce qui est publié vous engage" },
      { what: "Lettre d'information d'octobre", why: "offre à confirmer" },
      { what: "Article « 5 erreurs à éviter »", why: "ton à valider" },
    ],
    alone: ["Statistiques de la semaine résumées", "Calendrier éditorial mis à jour", "Idées de sujets classées"],
    sources: ["charte-editoriale.pdf", "offres-2026.pdf", "Articles publiés"],
  },
  {
    id: "freelance",
    icon: UserRound,
    name: "Freelance",
    objective: "Garder du temps pour produire, pas pour administrer.",
    inputs: ["Mails", "Demandes de devis", "Temps passé"],
    knowledge: ["Tarifs", "Conditions", "Modèles de devis", "Disponibilités"],
    does: ["Prépare les devis", "Relance les factures", "Tient le suivi des projets", "Répond aux demandes simples"],
    keep: ["Le prix final", "Les engagements de délai", "Le choix des clients"],
    tools: ["Mail", "Facturation", "Agenda"],
    measures: ["Devis envoyés à temps", "Factures relancées", "Temps d'administration évité"],
    kpis: { goal: "Tout l'administratif en 20 minutes", pending: 2, toValidate: 2, saved: "≈ 45 min" },
    queue: [
      { time: "08:30", text: "Demande de devis : brouillon préparé", state: "fait" },
      { time: "08:45", text: "Facture de mars relancée", state: "seul" },
      { time: "09:00", text: "Temps de la semaine consolidé", state: "seul" },
      { time: "09:15", text: "Devis prêt à envoyer", state: "valider" },
      { time: "09:30", text: "Nouveau délai demandé par un client", state: "valider" },
      { time: "Ven", text: "Facturation du mois", state: "suivant" },
    ],
    validate: [
      { what: "Envoyer le devis au client K.", why: "prix final à confirmer" },
      { what: "Accepter un délai au 15", why: "engagement sur votre planning" },
    ],
    alone: ["Relance de facture selon votre modèle", "Temps passé consolidé par projet", "Demande hors cible déclinée poliment"],
    sources: ["conditions-generales.pdf", "tarifs.pdf", "Votre agenda"],
  },
];
