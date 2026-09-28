import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  Contact,
  Database,
  FileInput,
  FileText,
  LayoutDashboard,
  Mail,
  PhoneCall,
  Receipt,
  Route,
  Send,
  Clock3,
  type LucideIcon,
} from "lucide-react";

/**
 * Hero de /automatisation (V3) : un film de quatre automatisations concrètes autour d'un
 * même moteur de règles, puis une vue de synthèse. Données d'exemple uniquement, signalées
 * « Exemple de workflow » ; aucune métrique, aucun faux monitoring.
 *
 * Chaque scénario : l'objet d'entrée arrive, une donnée part vers le moteur, le moteur
 * coche ses étapes, les résultats apparaissent dans les outils, la phrase de résultat
 * tient, puis tout repart proprement.
 */

export type AutoPhase = 0 | 1 | 2 | 3 | 4 | 5;
export const AUTO_LAST: AutoPhase = 5;
export const AUTO_IDLE_DURATION = 500;

export type Field = { label: string; value: string };
export type Output = { icon: LucideIcon; label: string; value: string; note?: string };

export type Scenario = {
  key: string;
  /** Nom court dans le repère de scénario. */
  name: string;
  input: {
    icon: LucideIcon;
    kind: string;
    title: string;
    fields: Field[];
    /** Bouton pressé au moment où la donnée part (facultatif). */
    action?: string;
    /** Statut qui bascule au moment où la donnée part (facultatif). */
    status?: { from: string; to: string };
  };
  /** Le moteur : le déclencheur, puis quatre étapes cochées tour à tour. */
  engine: { trigger: string; steps: string[] };
  outputs: Output[];
  /** Petite mention sous les résultats (facultative). */
  outputsNote?: string;
  result: [string, string];
  /** Mobile, moment 04 : ce qui est tracé. */
  journal: { time: string; text: string }[];
  duration: number;
};

export const SCENARIOS: Scenario[] = [
  {
    key: "prospection",
    name: "Prospection",
    input: {
      icon: PhoneCall,
      kind: "Appel qualifié",
      title: "Camille Laurent",
      fields: [
        { label: "Entreprise", value: "Entreprise B" },
        { label: "Besoin", value: "Devis" },
        { label: "Téléphone", value: "06 •• •• 42 18" },
        { label: "Ville", value: "Villeurbanne" },
      ],
      status: { from: "En cours", to: "Qualifié" },
    },
    engine: { trigger: "Appel terminé", steps: ["Contact nettoyé", "Doublon vérifié", "Entreprise retrouvée", "Fichier clients mis à jour"] },
    outputs: [
      { icon: Contact, label: "Fiche client", value: "Camille Laurent", note: "Entreprise B" },
      { icon: Route, label: "Opportunité", value: "Devis demandé" },
      { icon: Bell, label: "Notification", value: "Commercial prévenu" },
    ],
    result: ["Le commercial raccroche.", "La fiche est déjà créée."],
    journal: [
      { time: "09:42", text: "Appel qualifié" },
      { time: "09:42", text: "Contact nettoyé, doublon vérifié" },
      { time: "09:42", text: "Fiche et opportunité créées" },
      { time: "09:43", text: "Commercial prévenu" },
    ],
    duration: 6400,
  },
  {
    key: "formulaire",
    name: "Formulaire",
    input: {
      icon: FileInput,
      kind: "Formulaire du site",
      title: "Demande de rendez-vous",
      fields: [
        { label: "Nom", value: "Léa Morel" },
        { label: "Entreprise", value: "Cabinet Morel" },
        { label: "Besoin", value: "Premier rendez-vous" },
        { label: "Créneau préféré", value: "Jeudi matin" },
      ],
      action: "Envoyer",
    },
    engine: { trigger: "Formulaire reçu", steps: ["Informations vérifiées", "Fiche client créée", "Créneau trouvé", "Confirmation préparée"] },
    outputs: [
      { icon: Database, label: "Fichier clients", value: "Fiche créée" },
      { icon: CalendarDays, label: "Agenda", value: "Jeudi 10 h" },
      { icon: Mail, label: "Mail", value: "Confirmation envoyée" },
    ],
    result: ["Une demande arrive.", "Le rendez-vous est déjà préparé."],
    journal: [
      { time: "14:05", text: "Formulaire reçu" },
      { time: "14:05", text: "Fiche client créée" },
      { time: "14:05", text: "Rendez-vous jeudi 10 h posé" },
      { time: "14:06", text: "Confirmation envoyée" },
    ],
    duration: 6400,
  },
  {
    key: "facturation",
    name: "Facturation",
    input: {
      icon: FileText,
      kind: "Devis",
      title: "DEV-2026-184",
      fields: [
        { label: "Client", value: "Entreprise B" },
        { label: "Montant", value: "2 400 € HT (exemple)" },
        { label: "Validité", value: "30 jours" },
      ],
      status: { from: "Envoyé", to: "Accepté" },
    },
    engine: { trigger: "Devis accepté", steps: ["Facture préparée", "Transmission lancée", "Échéance enregistrée", "Relance prévue si besoin"] },
    outputs: [
      { icon: Receipt, label: "Facture", value: "Créée" },
      { icon: Database, label: "Comptabilité", value: "Synchronisée" },
      { icon: Clock3, label: "Suivi", value: "Échéance enregistrée" },
    ],
    outputsNote: "Peut être relié à vos outils existants.",
    result: ["Le devis est accepté.", "La facture suit toute seule."],
    journal: [
      { time: "10:18", text: "Devis DEV-2026-184 accepté" },
      { time: "10:18", text: "Facture créée et transmise" },
      { time: "10:18", text: "Échéance enregistrée" },
      { time: "10:19", text: "Relance programmée si impayé" },
    ],
    duration: 6400,
  },
  {
    key: "terrain",
    name: "Terrain",
    input: {
      icon: ClipboardCheck,
      kind: "Rapport d'intervention",
      title: "Entreprise C",
      fields: [
        { label: "Intervention", value: "Maintenance" },
        { label: "Technicien", value: "Sur place" },
        { label: "Statut", value: "Terminée" },
      ],
      action: "Valider",
    },
    engine: { trigger: "Rapport validé", steps: ["Document généré", "Dossier client mis à jour", "Client prévenu", "Responsable informé"] },
    outputs: [
      { icon: Database, label: "Dossier client", value: "À jour" },
      { icon: FileText, label: "PDF", value: "Rapport généré" },
      { icon: Send, label: "Mail", value: "Client prévenu" },
      { icon: LayoutDashboard, label: "Tableau de suivi", value: "Actualisé" },
    ],
    result: ["Le technicien termine.", "Le bureau n'a rien à ressaisir."],
    journal: [
      { time: "16:31", text: "Rapport validé sur le téléphone" },
      { time: "16:31", text: "PDF généré, dossier à jour" },
      { time: "16:31", text: "Client prévenu par mail" },
      { time: "16:32", text: "Tableau de suivi actualisé" },
    ],
    duration: 6800,
  },
];

export const SYNTHESIS = {
  inputs: [
    { icon: PhoneCall, label: "Appel" },
    { icon: FileInput, label: "Formulaire" },
    { icon: FileText, label: "Devis" },
    { icon: ClipboardCheck, label: "Rapport" },
  ],
  outputs: [
    { icon: Database, label: "Fichier clients" },
    { icon: CalendarDays, label: "Agenda" },
    { icon: Receipt, label: "Facture" },
    { icon: Mail, label: "Mail" },
    { icon: LayoutDashboard, label: "Tableau de bord" },
  ],
  line: ["Une information entre.", "Le reste s'enchaîne."],
  duration: 3800,
};

export const phaseDuration = (p: AutoPhase) => (p === 0 ? AUTO_IDLE_DURATION : p === 5 ? SYNTHESIS.duration : SCENARIOS[p - 1].duration);

/** Temps internes d'un scénario, en secondes. */
export const T = {
  input: 0.1,
  send: 1.0,
  travel: 0.55,
  step0: 1.7,
  stepGap: 0.42,
  out0: 3.5,
  outGap: 0.28,
  result: 4.6,
};

export const AUTO_SCENE_LABEL =
  "Démonstration avec des données d'exemple : quatre automatisations autour d'un même moteur de règles. Un appel qualifié crée la fiche client et l'opportunité, puis prévient le commercial. Un formulaire du site crée la fiche, pose le rendez-vous dans l'agenda et envoie la confirmation. Un devis accepté crée la facture, la synchronise en comptabilité et enregistre l'échéance. Un rapport d'intervention validé génère le PDF, met à jour le dossier client, prévient le client et actualise le tableau de suivi. Une information entre, le reste s'enchaîne.";

// ─── Téléphone : quatre moments par scénario ────────────────────────────────

export const MOBILE_MOMENTS = ["Un déclencheur arrive", "Le workflow travaille", "Les outils sont mis à jour", "Tout est tracé"];
export const MOBILE_MOMENT_DURATION = 2000;
