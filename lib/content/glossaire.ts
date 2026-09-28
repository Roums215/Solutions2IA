/**
 * Glossaire pédagogique — source unique des tooltips <TermeExplique>.
 *
 * Règle (PLAN §Règles de contenu) : le jargon brut ne reste jamais seul dans
 * le texte courant. Un terme utile à apprendre reste visible mais expliqué
 * en UNE phrase de français simple, au survol / tap / focus.
 *
 * Clé = identifiant stable (kebab-case). `terme` = ce qui s'affiche.
 * `simple` = par quoi le remplacer quand on ne veut PAS l'enseigner.
 * `definition` = une seule phrase, sans jargon en cascade.
 */

export interface TermeGlossaire {
  terme: string;
  simple: string;
  definition: string;
}

export const GLOSSAIRE = {
  ia: {
    terme: "IA",
    simple: "intelligence artificielle",
    definition:
      "Un programme capable de comprendre du texte et d'aider sur des tâches réelles : répondre, trier, résumer, rédiger.",
  },
  "agent-ia": {
    terme: "agent IA",
    simple: "assistant numérique",
    definition:
      "Un assistant numérique qui travaille tout seul sur une tâche précise : lire, trier, répondre, alerter, selon vos règles.",
  },
  rag: {
    terme: "mémoire d'entreprise",
    simple: "mémoire d'entreprise",
    definition:
      "Vos documents (devis, contrats, procédures) deviennent interrogeables : vous posez une question, la réponse cite vos propres fichiers.",
  },
  automatisation: {
    terme: "automatisation",
    simple: "tâches qui se font toutes seules",
    definition:
      "Relier vos outils entre eux pour que les tâches répétitives (ressaisie, relances, envois) se fassent sans vous.",
  },
  workflow: {
    terme: "workflow",
    simple: "enchaînement de tâches",
    definition:
      "La suite d'étapes qu'une tâche traverse, de son déclenchement jusqu'au résultat : décrite une fois, exécutée à chaque fois.",
  },
  webhook: {
    terme: "webhook",
    simple: "signal automatique",
    definition:
      "Un signal qu'un outil envoie automatiquement à un autre quand quelque chose se passe (ex. « appel terminé » → « créer la fiche »).",
  },
  api: {
    terme: "API",
    simple: "porte de connexion",
    definition:
      "La porte officielle par laquelle deux logiciels échangent des informations entre eux, sans intervention humaine.",
  },
  crm: {
    terme: "CRM",
    simple: "fichier clients",
    definition:
      "Le logiciel qui centralise vos contacts, échanges et opportunités commerciales (ex. Axonaut, HubSpot).",
  },
  n8n: {
    terme: "n8n",
    simple: "outil d'automatisation",
    definition:
      "L'outil que j'utilise pour relier vos logiciels entre eux et construire les enchaînements automatiques.",
  },
  dashboard: {
    terme: "tableau de bord",
    simple: "tableau de bord",
    definition:
      "Un écran qui montre d'un coup d'œil ce qui compte pour vous : activité, chiffres, alertes, mis à jour automatiquement.",
  },
  "hebergement-souverain": {
    terme: "hébergement souverain",
    simple: "données hébergées en Europe",
    definition:
      "Vos données restent sur des serveurs en Europe, soumis au droit européen, sans envoi vers des serveurs américains.",
  },
  rgpd: {
    terme: "RGPD",
    simple: "règles européennes sur les données",
    definition:
      "La loi européenne qui protège les données personnelles : je conçois chaque projet pour la respecter dès le départ.",
  },
  llm: {
    terme: "modèle d'IA",
    simple: "modèle d'IA",
    definition:
      "Le « moteur » d'intelligence artificielle (comme Claude ou Mistral) qui lit et rédige du texte. Je choisis le plus adapté à votre besoin.",
  },
  "site-connecte": {
    terme: "site connecté",
    simple: "site relié à vos outils",
    definition:
      "Un site qui ne fait pas que présenter : il est relié à vos outils (agenda, devis, fichier clients) et travaille avec eux.",
  },
  seo: {
    terme: "référencement",
    simple: "référencement",
    definition:
      "Tout ce qui aide votre site à apparaître dans Google quand vos clients cherchent ce que vous faites.",
  },
  geo: {
    terme: "visibilité dans les IA",
    simple: "être cité par ChatGPT ou Perplexity",
    definition:
      "Apparaître dans les réponses que donnent ChatGPT, Claude, Perplexity ou Google IA quand un client pose une question sur votre métier.",
  },
  declencheur: {
    terme: "déclencheur",
    simple: "signal de départ",
    definition:
      "L'événement qui lance une automatisation : un mail reçu, un formulaire rempli, un devis signé.",
  },
  "facture-electronique": {
    terme: "facture électronique",
    simple: "facture au format officiel",
    definition:
      "Une facture au format structuré, transmise par une plateforme agréée par l'État. Réception obligatoire pour toutes les entreprises assujetties à la TVA depuis septembre 2026.",
  },
  "core-web-vitals": {
    terme: "Core Web Vitals",
    simple: "critères de vitesse de Google",
    definition:
      "Les trois mesures de vitesse et de stabilité que Google utilise pour juger un site : temps d'affichage, réactivité, stabilité de la page.",
  },
  wcag: {
    terme: "WCAG",
    simple: "normes d'accessibilité",
    definition:
      "Les règles internationales pour qu'un site soit utilisable par tout le monde, y compris au clavier ou avec un lecteur d'écran.",
  },
  "fiche-google": {
    terme: "fiche Google",
    simple: "votre fiche établissement",
    definition:
      "La fiche qui apparaît dans Google Maps et dans les résultats locaux : horaires, avis, photos, itinéraire. Gratuite, et décisive pour un commerce ou un artisan.",
  },
} as const satisfies Record<string, TermeGlossaire>;

export type GlossaireKey = keyof typeof GLOSSAIRE;
