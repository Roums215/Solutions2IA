/**
 * Contenu étendu de la page /glossaire.
 *
 * La définition d'une phrase vient de GLOSSAIRE (source des tooltips) ;
 * ici on ajoute le paragraphe détaillé + le lien de maillage vers le
 * service concerné. Fort levier GEO : les IA citent les définitions.
 */

import { GLOSSAIRE, type GlossaireKey } from "./glossaire";

export interface GlossairePageEntry {
  key: GlossaireKey;
  /** Paragraphe détaillé (2-4 phrases, français simple, exemple concret). */
  extended: string;
  /** Lien de maillage interne vers la page qui approfondit. */
  seeAlso?: { label: string; href: string };
}

export const GLOSSAIRE_PAGE_ENTRIES: GlossairePageEntry[] = [
  {
    key: "ia",
    extended:
      "Concrètement, une IA moderne lit et rédige du texte comme un collaborateur rapide : elle résume un dossier, répond à un email, classe des demandes. Elle ne remplace pas votre jugement — elle exécute les tâches de lecture et d'écriture qui vous prennent du temps. Dans une PME, ses premiers usages rentables sont presque toujours le tri, la synthèse et la préparation de réponses.",
    seeAlso: { label: "Ce qu'un agent IA peut faire pour vous", href: "/agents-ia" },
  },
  {
    key: "agent-ia",
    extended:
      "La différence avec un simple chatbot : l'agent n'attend pas qu'on lui parle, il AGIT. Il surveille une boîte mail, extrait les informations utiles, met à jour le fichier clients, prépare un devis, alerte la bonne personne — en suivant vos règles, avec vos outils. Vous gardez la main : il propose, journalise, et n'envoie rien d'important sans validation si c'est votre choix.",
    seeAlso: { label: "Assistant IA sur mesure", href: "/agents-ia" },
  },
  {
    key: "llm",
    extended:
      "Claude (Anthropic), Mistral, GPT : ce sont des modèles d'IA. Chacun a ses forces, ses limites et son niveau de confidentialité. Je choisis le modèle selon votre besoin réel — et pour les données sensibles, je privilégie des options hébergées en Europe. Le modèle n'est qu'un moteur : ce qui crée la valeur, c'est ce qu'on branche autour (vos données, vos règles, vos outils).",
    seeAlso: { label: "Comment je choisis les modèles", href: "/agents-ia" },
  },
  {
    key: "rag",
    extended:
      "Techniquement appelé RAG (Retrieval-Augmented Generation), le principe est simple : au lieu de répondre « de mémoire », l'IA va d'abord chercher dans VOS documents, puis répond en citant ses sources. Résultat : des réponses fiables, vérifiables, à jour — sans réentraîner de modèle. C'est la meilleure approche pour interroger procédures, contrats et bases internes.",
    seeAlso: { label: "Mémoire d'entreprise (RAG)", href: "/rag" },
  },
  {
    key: "automatisation",
    extended:
      "Exemple réel : un appel de prospection se termine → le compte-rendu est transcrit → la fiche client est créée dans le CRM → le commercial reçoit un résumé. Personne n'a rien ressaisi. L'automatisation ne remplace pas un métier : elle supprime la partie mécanique (copier-coller, relances, transferts) pour rendre du temps au reste.",
    seeAlso: { label: "Automatisation sur mesure", href: "/automatisation" },
  },
  {
    key: "workflow",
    extended:
      "« Nouvelle facture reçue → extraire les montants → vérifier le fournisseur → enregistrer en compta → notifier si anomalie » : voilà un workflow. On le décrit une fois, précisément, puis il s'exécute à chaque fois de la même façon. La qualité d'une automatisation se joue dans la précision de cette description — c'est exactement le travail d'audit que je fais avec vous.",
    seeAlso: { label: "Comment je câble vos workflows", href: "/automatisation" },
  },
  {
    key: "webhook",
    extended:
      "C'est le « sonnez ici » des logiciels. Quand un événement se produit dans un outil (paiement reçu, formulaire soumis, appel terminé), le webhook prévient instantanément un autre outil qui peut réagir. C'est ce qui permet aux automatisations de se déclencher en temps réel plutôt que de vérifier toutes les heures.",
  },
  {
    key: "api",
    extended:
      "Chaque logiciel sérieux (CRM, facturation, agenda, banque) expose une API : la porte officielle, documentée et sécurisée, par laquelle un autre programme peut lire ou écrire des données. Je n'utilise que ces portes officielles — jamais de bidouille fragile qui casse à la première mise à jour.",
  },
  {
    key: "n8n",
    extended:
      "n8n est un orchestrateur d'automatisations open source que j'héberge en Europe : il relie vos outils (mails, CRM, facturation, téléphonie) et exécute vos workflows. Open source = pas de dépendance à un abonnement américain, vos flux vous appartiennent, et les données restent où vous le décidez.",
    seeAlso: { label: "La stack d'automatisation", href: "/automatisation" },
  },
  {
    key: "crm",
    extended:
      "Axonaut, HubSpot, Pipedrive… peu importe l'outil : un CRM n'a de valeur que s'il est à jour. C'est précisément là que l'automatisation et les agents IA brillent — remplir et actualiser le CRM automatiquement à partir des mails, appels et formulaires, au lieu de compter sur la discipline de saisie de chacun.",
    seeAlso: { label: "Relier votre CRM au reste", href: "/automatisation" },
  },
  {
    key: "dashboard",
    extended:
      "Un bon tableau de bord répond en un regard à la question « est-ce que tout va bien ? » : activité du jour, chiffres clés, alertes. Je le construis sur mesure à partir des données que vos outils produisent déjà — sans ressaisie, mis à jour en continu.",
    seeAlso: { label: "Applications et tableaux de bord", href: "/applications" },
  },
  {
    key: "site-connecte",
    extended:
      "Un site vitrine montre. Un site connecté travaille : il prend les réservations dans votre agenda, transmet chaque demande dans votre CRM, encaisse un acompte, envoie l'accusé de réception. La différence de valeur entre les deux est énorme — et c'est souvent la meilleure première marche de digitalisation d'une PME.",
    seeAlso: { label: "Sites web connectés", href: "/sites-web" },
  },
  {
    key: "seo",
    extended:
      "Le référencement se gagne sur des fondations techniques saines (vitesse, structure, données balisées) et un contenu qui répond vraiment aux questions que vos clients tapent dans Google. S'y ajoute désormais le GEO : être cité par ChatGPT, Perplexity et les réponses IA de Google. Chaque site que je livre intègre les deux dès le départ.",
    seeAlso: { label: "Sites pensés pour être trouvés", href: "/sites-web" },
  },
  {
    key: "hebergement-souverain",
    extended:
      "Héberger en Europe, sous droit européen, ce n'est pas un détail juridique : c'est la garantie que vos données clients ne partent pas vers des juridictions où vous n'avez aucun recours. Pour l'IA, cela veut dire choisir des modèles et des infrastructures qui traitent vos documents sans les stocker ailleurs ni s'en servir pour s'entraîner.",
    seeAlso: { label: "IA souveraine, données en UE", href: "/agents-ia" },
  },
  {
    key: "rgpd",
    extended:
      "Le RGPD n'interdit pas l'IA ni l'automatisation — il impose de savoir quelles données on traite, pourquoi, où, et de pouvoir les effacer. Concevoir un projet « RGPD dès le départ » coûte peu ; le rattraper après coup coûte cher. C'est un réflexe intégré à chaque projet que je livre, pas une option.",
    seeAlso: { label: "Questions RGPD dans la FAQ", href: "/faq" },
  },
];

export function glossaireEntryTerm(entry: GlossairePageEntry) {
  return GLOSSAIRE[entry.key];
}
