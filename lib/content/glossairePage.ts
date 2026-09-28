/**
 * Contenu étendu de la page /glossaire.
 *
 * La définition d'une phrase vient de GLOSSAIRE (source des tooltips) ;
 * ici on ajoute le thème d'affichage, le paragraphe détaillé, la ligne
 * « Pour vous » (ce que ça change, sans chiffre inventé), un mini-schéma
 * de circulation pour les termes de flux, et le lien de maillage vers la
 * page qui approfondit. Fort levier GEO : les IA citent les définitions.
 */

import { GLOSSAIRE, type GlossaireKey } from "./glossaire";

export type GlossaireTheme = "comprendre" | "relier" | "piloter" | "proteger";

export interface GlossaireThemeMeta {
  slug: GlossaireTheme;
  /** Libellé court : sommaire et pastille de section. */
  label: string;
  /** Intertitre de la section, formulé comme une vraie question. */
  title: string;
  /** Pour qui : une phrase ancrée PME, affichée sous l'intertitre. */
  audience: string;
}

/** Ordre d'affichage sur /glossaire : comprendre → relier → piloter → protéger. */
export const GLOSSAIRE_THEMES: GlossaireThemeMeta[] = [
  {
    slug: "comprendre",
    label: "Comprendre l'IA",
    title: "Qu'est-ce que l'IA peut faire dans une PME ?",
    audience:
      "Pour qui : vous entendez parler d'IA partout et vous voulez savoir ce que ça ferait, concrètement, dans votre entreprise.",
  },
  {
    slug: "relier",
    label: "Relier vos outils",
    title: "Comment vos logiciels se parlent entre eux ?",
    audience:
      "Pour qui : vous ressaisissez les mêmes informations dans plusieurs outils et vous voulez que ça s'arrête.",
  },
  {
    slug: "piloter",
    label: "Trouver des clients et piloter",
    title: "Comment gagner des clients et garder le contrôle ?",
    audience:
      "Pour qui : vous voulez un site qui travaille, un fichier clients à jour et des chiffres lisibles sans ouvrir cinq outils.",
  },
  {
    slug: "proteger",
    label: "Protéger vos données, rester en règle",
    title: "Comment rester en règle avec vos données et vos factures ?",
    audience:
      "Pour qui : vous traitez des données de clients ou de patients, et l'obligation de facture électronique, en vigueur depuis septembre 2026, vous concerne.",
  },
];

export interface GlossairePageEntry {
  key: GlossaireKey;
  /** Section d'affichage sur /glossaire (intertitre = thème, h2 = terme). */
  theme: GlossaireTheme;
  /** Paragraphe détaillé (2-4 phrases, français simple, exemple concret). */
  extended: string;
  /** Ce que ça change pour le visiteur : une phrase, sans chiffre inventé. Rendu derrière « Pour vous : ». */
  gain: string;
  /** Mini-schéma de circulation en trois étapes (signal → traitement → résultat), pour les termes de flux. */
  flow?: readonly [string, string, string];
  /** Une sortie par carte : lien de maillage interne vers la page qui approfondit. */
  seeAlso: { label: string; href: string };
}

export const GLOSSAIRE_PAGE_ENTRIES: GlossairePageEntry[] = [
  // ── Comprendre l'IA ──────────────────────────────────────────────────────
  {
    key: "ia",
    theme: "comprendre",
    extended:
      "Une IA moderne lit et rédige du texte comme un collaborateur rapide : elle résume un dossier, répond à un email, classe des demandes. Elle ne remplace pas votre jugement : elle exécute les tâches de lecture et d'écriture qui vous prennent du temps. Dans une PME, ses premiers usages rentables sont presque toujours le tri, la synthèse et la préparation de réponses.",
    gain:
      "les tâches de lecture et d'écriture qui s'accumulent (résumer, trier, préparer une réponse) sont les premières à déléguer.",
    seeAlso: { label: "Voir ce qu'un assistant IA ferait chez vous", href: "/agents-ia#besoins" },
  },
  {
    key: "agent-ia",
    theme: "comprendre",
    extended:
      "La différence avec un simple chatbot : l'agent n'attend pas qu'on lui parle, il agit. Il surveille une boîte mail, extrait les informations utiles, met à jour le fichier clients, prépare un devis, alerte la bonne personne. Il suit vos règles, avec vos outils. Vous gardez la main : il propose, garde une trace de tout, et n'envoie rien d'important sans votre validation si c'est votre choix.",
    gain:
      "la boîte mail triée et les fiches clients remplies avant que vous n'ouvriez l'ordinateur, selon vos règles.",
    seeAlso: { label: "Découvrir l'assistant IA sur mesure", href: "/agents-ia" },
  },
  {
    key: "llm",
    theme: "comprendre",
    extended:
      "Claude (Anthropic), Mistral, GPT : ce sont des modèles d'IA. Chacun a ses forces, ses limites et son niveau de confidentialité. Je choisis le modèle selon votre besoin réel. Pour les données sensibles, je privilégie des options hébergées en Europe. Le modèle n'est qu'un moteur : ce qui crée la valeur, c'est ce qu'on branche autour (vos données, vos règles, vos outils).",
    gain:
      "vous n'avez pas à choisir un modèle : je le fais selon votre besoin et la sensibilité de vos données.",
    seeAlso: { label: "Voir les garanties de l'assistant IA", href: "/agents-ia" },
  },
  {
    key: "rag",
    theme: "comprendre",
    extended:
      "Techniquement appelé RAG (Retrieval-Augmented Generation), le principe est simple : au lieu de répondre « de mémoire », l'IA va d'abord chercher dans VOS documents, puis répond en citant ses sources. Résultat : des réponses fiables, vérifiables, à jour, sans réentraîner de modèle. C'est la meilleure approche pour interroger procédures, contrats et bases internes.",
    gain:
      "la réponse à « où est la procédure ? » s'obtient en posant la question, pas en fouillant les dossiers.",
    flow: ["Votre question", "Recherche dans vos documents", "Réponse avec ses sources"],
    seeAlso: { label: "Interroger vos propres documents", href: "/rag" },
  },

  // ── Relier vos outils ────────────────────────────────────────────────────
  {
    key: "automatisation",
    theme: "relier",
    extended:
      "Exemple réel : un appel de prospection se termine → le compte-rendu est transcrit → la fiche client est créée dans le CRM → le commercial reçoit un résumé. Personne n'a rien ressaisi. L'automatisation ne remplace pas un métier : elle supprime la partie mécanique (copier-coller, relances, transferts) pour rendre du temps au reste.",
    gain: "plus de ressaisie entre votre agenda, vos devis et votre facturation.",
    flow: ["Appel terminé", "Compte-rendu transcrit", "Fiche client créée"],
    seeAlso: { label: "Supprimer la ressaisie entre vos outils", href: "/automatisation" },
  },
  {
    key: "workflow",
    theme: "relier",
    extended:
      "« Nouvelle facture reçue → extraire les montants → vérifier le fournisseur → enregistrer en compta → notifier si anomalie » : voilà un workflow. On le décrit une fois, précisément, puis il s'exécute à chaque fois de la même façon. La qualité d'une automatisation se joue dans la précision de cette description : c'est exactement le travail d'audit que je fais avec vous.",
    gain:
      "une tâche décrite une fois, exécutée de la même façon à chaque fois, même quand vous n'êtes pas là.",
    flow: ["Facture reçue", "Montants extraits, fournisseur vérifié", "Enregistrée en compta"],
    seeAlso: { label: "Voir comment je décris et câble vos flux", href: "/automatisation" },
  },
  {
    key: "declencheur",
    theme: "relier",
    extended:
      "Toute automatisation commence par un déclencheur : un mail qui arrive, un formulaire rempli, un devis signé, ou simplement une heure fixe chaque matin. C'est la première question que je pose pour décrire un flux : « qu'est-ce qui se passe juste avant ? ». Bien choisi, il évite les automatisations qui tournent pour rien ou qui ratent le bon moment.",
    gain: "vos automatisations partent du bon signal, au bon moment, sans que vous ayez à les lancer.",
    flow: ["Devis signé", "Flux lancé aussitôt", "Facture préparée"],
    seeAlso: { label: "Voir des automatisations qui partent du bon signal", href: "/automatisation" },
  },
  {
    key: "webhook",
    theme: "relier",
    extended:
      "C'est le « sonnez ici » des logiciels. Quand un événement se produit dans un outil (paiement reçu, formulaire soumis, appel terminé), le webhook prévient instantanément un autre outil qui peut réagir. C'est ce qui permet aux automatisations de se déclencher en temps réel plutôt que de vérifier toutes les heures.",
    gain:
      "vos automatisations réagissent à la seconde où quelque chose se passe, pas à la prochaine vérification.",
    flow: ["Paiement reçu", "Signal envoyé à l'instant", "Fiche mise à jour"],
    seeAlso: { label: "Voir des automatisations qui se déclenchent seules", href: "/automatisation" },
  },
  {
    key: "api",
    theme: "relier",
    extended:
      "Chaque logiciel sérieux (CRM, facturation, agenda, banque) expose une API : la porte officielle, documentée et sécurisée, par laquelle un autre programme peut lire ou écrire des données. Je n'utilise que ces portes officielles, jamais de bidouille fragile qui casse à la première mise à jour.",
    gain:
      "vos outils actuels restent en place : je les relie par leur porte officielle, sans les remplacer.",
    flow: ["Demande sur votre site", "Porte officielle (API)", "Rendez-vous dans votre agenda"],
    seeAlso: { label: "Voir les outils que je sais relier", href: "/automatisation" },
  },
  {
    key: "n8n",
    theme: "relier",
    extended:
      "n8n est un orchestrateur d'automatisations open source que j'héberge en Europe : il relie vos outils (mails, CRM, facturation, téléphonie) et exécute vos workflows. Open source = pas de dépendance à un abonnement américain, vos flux vous appartiennent, et les données restent où vous le décidez.",
    gain:
      "vos automatisations tournent sur un outil open source hébergé en Europe, sans abonnement américain imposé.",
    seeAlso: { label: "Comprendre la méthode d'automatisation", href: "/automatisation" },
  },

  // ── Trouver des clients et piloter ───────────────────────────────────────
  {
    key: "crm",
    theme: "piloter",
    extended:
      "Axonaut, HubSpot, Pipedrive… peu importe l'outil : un CRM n'a de valeur que s'il est à jour. C'est précisément là que l'automatisation et les agents IA brillent, en remplissant et actualisant le CRM automatiquement à partir des mails, appels et formulaires, au lieu de compter sur la discipline de saisie de chacun.",
    gain:
      "un fichier clients à jour sans discipline de saisie, alimenté par vos mails, vos appels et vos formulaires.",
    seeAlso: { label: "Relier votre fichier clients au reste", href: "/automatisation" },
  },
  {
    key: "dashboard",
    theme: "piloter",
    extended:
      "Un bon tableau de bord répond en un regard à la question « est-ce que tout va bien ? » : activité du jour, chiffres clés, alertes. Je le construis sur mesure à partir des données que vos outils produisent déjà, sans ressaisie, mis à jour en continu.",
    gain:
      "la réponse à « est-ce que tout va bien ? » en un regard chaque matin, sans ouvrir cinq outils.",
    seeAlso: { label: "Voir des tableaux de bord sur mesure", href: "/applications" },
  },
  {
    key: "site-connecte",
    theme: "piloter",
    extended:
      "Un site vitrine montre. Un site connecté travaille : il prend les réservations dans votre agenda, transmet chaque demande dans votre CRM, encaisse un acompte, envoie l'accusé de réception. La différence de valeur entre les deux est énorme, et c'est souvent la meilleure première marche de digitalisation d'une PME.",
    gain: "un site qui prend les réservations et transmet les demandes pendant que vous travaillez.",
    seeAlso: { label: "Voir ce qu'un site connecté fait pour vous", href: "/sites-web" },
  },
  {
    key: "seo",
    theme: "piloter",
    extended:
      "Le référencement se gagne sur des fondations techniques saines (vitesse, structure, données balisées) et un contenu qui répond vraiment aux questions que vos clients tapent dans Google. S'y ajoute désormais le GEO : être cité par ChatGPT, Perplexity et les réponses IA de Google. Chaque site que je livre intègre les deux dès le départ.",
    gain:
      "être trouvé par les clients qui cherchent déjà ce que vous faites, sur Google et dans les réponses des IA.",
    seeAlso: { label: "Voir comment un site attire des clients", href: "/sites-web" },
  },
  {
    key: "geo",
    theme: "piloter",
    extended:
      "Vos clients ne cherchent plus seulement sur Google : ils posent leur question à une IA, qui répond en citant quelques sources. Être cité par ces IA (ce qu'on appelle le GEO) consiste à faire partie de ces sources : un contenu qui répond vraiment à la question, des données balisées que les IA comprennent, des définitions claires. Ce glossaire en est un exemple. Chaque site que je livre est construit avec ce réflexe, en plus du référencement Google classique.",
    gain: "un prospect qui pose sa question à une IA peut tomber sur vous, pas seulement sur vos concurrents.",
    seeAlso: { label: "Voir un site pensé pour Google et pour les IA", href: "/sites-web" },
  },

  // ── Protéger vos données, rester en règle ────────────────────────────────
  {
    key: "hebergement-souverain",
    theme: "proteger",
    extended:
      "Héberger en Europe, sous droit européen, ce n'est pas un détail juridique : c'est la garantie que vos données clients ne partent pas vers des juridictions où vous n'avez aucun recours. Pour l'IA, cela veut dire choisir des modèles et des infrastructures qui traitent vos documents sans les stocker ailleurs ni s'en servir pour s'entraîner.",
    gain: "vos données clients restent sous droit européen, et vous pouvez le dire à vos propres clients.",
    seeAlso: { label: "Voir l'assistant IA avec données en Europe", href: "/agents-ia" },
  },
  {
    key: "rgpd",
    theme: "proteger",
    extended:
      "Le RGPD n'interdit pas l'IA ni l'automatisation : il impose de savoir quelles données on traite, pourquoi, où, et de pouvoir les effacer. Concevoir un projet « RGPD dès le départ » coûte peu ; le rattraper après coup coûte cher. C'est un réflexe intégré à chaque projet que je livre, pas une option.",
    gain: "un projet conforme dès le départ coûte peu, une mise en conformité après coup coûte cher.",
    seeAlso: { label: "Lire les réponses RGPD dans la FAQ", href: "/faq#securite-rgpd" },
  },
  {
    key: "facture-electronique",
    theme: "proteger",
    extended:
      "Le PDF envoyé par mail ne suffit plus : la facture devient un fichier lisible par les logiciels (format Factur-X, entre autres), déposé sur une plateforme agréée par l'État. Réception obligatoire pour toutes les entreprises assujetties à la TVA depuis le 1er septembre 2026 ; émission obligatoire depuis la même date pour les grandes entreprises et les entreprises de taille intermédiaire (ETI), à partir du 1er septembre 2027 pour les PME et TPE. Il faut donc avoir choisi une plateforme agréée, et un logiciel qui produit ce format, avant votre date d'émission.",
    gain:
      "vous devez déjà pouvoir recevoir ces factures, et les émettre dès septembre 2027 si vous êtes une PME : autant profiter de cette mise en conformité pour supprimer la saisie de facturation.",
    seeAlso: { label: "Automatiser vos factures avant votre échéance", href: "/automatisation#facture-electronique-2026" },
  },
];

export function glossaireEntryTerm(entry: GlossairePageEntry) {
  return GLOSSAIRE[entry.key];
}
