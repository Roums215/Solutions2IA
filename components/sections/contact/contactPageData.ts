/**
 * Contenu de /contact (refonte d'octobre 2026, « formulaire en vitrine »), séparé du rendu.
 * Repris de l'ancienne ContactPage : options, conseils, étapes, questions, bon à savoir.
 */

export const CONTACT_EMAIL = "contact@solutions2ia.fr";

/** Ce qui vous amène : la valeur part telle quelle dans le champ `type` de /api/contact. */
export const SERVICE_OPTIONS = [
  "Un site web",
  "Une application sur mesure",
  "Automatiser des tâches",
  "Un assistant IA",
  "Une mémoire d'entreprise",
  "Je ne sais pas encore",
];

// Les CTA orientés de /services arrivent avec ?besoin=… : le type de projet est présélectionné.
export const BESOIN_PARAM: Record<string, string> = {
  site: "Un site web",
  application: "Une application sur mesure",
  automatisation: "Automatiser des tâches",
  assistant: "Un assistant IA",
  memoire: "Une mémoire d'entreprise",
};

/** Où vous en êtes (facultatif) : ajouté en tête du message envoyé. */
export const STAGE_OPTIONS = [
  "Je pars de zéro",
  "J'ai déjà un site ou un outil",
  "Mes outils ne se parlent pas",
  "J'ai un projet précis en tête",
];

export const BUDGET_OPTIONS = [
  "Je préfère en parler",
  "Moins de 1 000 €",
  "1 000 € à 3 000 €",
  "3 000 € à 8 000 €",
  "8 000 € à 20 000 €",
  "Plus de 20 000 €",
];

/** Les trois conseils pour un bon premier message : un clic ajoute l'amorce dans le message. */
export const BRIEF_HINTS = [
  { title: "Ce que vous aimeriez améliorer", starter: "Ce que j'aimerais améliorer : ", hint: "Être plus visible, gagner du temps, arrêter de tout retaper à la main." },
  { title: "Où vous en êtes aujourd'hui", starter: "Aujourd'hui, j'utilise : ", hint: "Un site déjà en place ? Quels outils ? Qu'est-ce qui bloque ?" },
  { title: "Ce qui compte le plus", starter: "Le plus important pour moi : ", hint: "Un budget, une date à tenir, une fonction indispensable." },
];

export const STEPS_LABELS = ["Ce qui vous amène", "Votre message", "Comment vous répondre"];

export const REASSURANCE = ["Réponse sous 24 h, du lundi au vendredi", "Premier échange de 45 minutes, gratuit", "Sans engagement, prix fixé avant de démarrer"];

// ─── Après votre message (objets réels) ──────────────────────────────────────

export type AfterStep = { key: "sent" | "reply" | "invite" | "proposal"; n: string; when: string; title: string; text: string };

export const AFTER_STEPS: AfterStep[] = [
  { key: "sent", n: "01", when: "Aujourd'hui", title: "Vous m'écrivez", text: "Quelques lignes suffisent. Pas besoin d'un dossier parfait, une idée suffit pour commencer." },
  { key: "reply", n: "02", when: "Sous 24 h", title: "Je vous réponds", text: "Avec quelques questions et une première idée de ce qui vous aiderait." },
  { key: "invite", n: "03", when: "Quand ça vous va", title: "On se parle 45 minutes", text: "Gratuit, sans engagement. Je cherche à comprendre votre situation, pas à vendre." },
  { key: "proposal", n: "04", when: "Après l'échange", title: "Une proposition écrite", text: "Ce que je construis, ce que ça change, le prix et le délai. Vous décidez, sans rien devoir." },
];

// ─── Les questions qu'on me pose souvent ─────────────────────────────────────

export const FAQ = [
  {
    q: "Combien ça coûte ?",
    a: [
      "Pour vous situer : un site vitrine simple démarre autour de 500 €, un site vitrine premium entre 1 000 et 2 500 €, un site relié à vos outils (réservation, espace client, paiement) entre 2 500 et 5 000 €, une application sur mesure entre 1 500 et 15 000 € selon le nombre de fonctions.",
      "Pour les automatisations et les assistants IA, le prix dépend du projet : on en parle lors du premier échange, qui est gratuit, et vous savez à quoi vous en tenir avant de décider.",
      "Dans tous les cas, le prix est fixé ensemble avant de démarrer : pas de mauvaise surprise. Et comme je démarre, mes prix sont accessibles.",
    ],
  },
  {
    q: "En combien de temps ?",
    a: [
      "Un site simple : quelques jours à deux semaines. Un site premium : deux à six semaines. Une application : selon la taille, de quelques semaines à quelques mois.",
      "Je vous donne un délai clair dans la proposition, et je m'y tiens.",
    ],
  },
  {
    q: "Je ne suis pas du tout technique, c'est un problème ?",
    a: [
      "Au contraire, c'est mon métier de traduire. Je vous explique tout avec des mots simples, sans jargon.",
      "Vous n'avez jamais besoin de comprendre la technique : dites-moi simplement ce qui vous prend du temps.",
    ],
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: [
      "Pour un assistant IA, vous démarrez par un pilote de 30 jours satisfait ou remboursé : vous arrêtez quand vous voulez, sans frais, et vos données vous sont restituées.",
      "Pour un site ou une application, rien n'est engagé avant la proposition, et le prix est fixé avant de commencer. Vous décidez en connaissance de cause.",
    ],
  },
  {
    q: "Et après la mise en ligne ?",
    a: [
      "Je reste joignable. Je prends le temps de vous montrer comment ça marche, et je suis là pour ajuster ou faire évoluer l'outil quand votre besoin change.",
      "On peut aussi convenir d'un suivi régulier si vous le souhaitez.",
    ],
  },
];

// ─── Bon à savoir ────────────────────────────────────────────────────────────

export const GOOD_TO_KNOW = [
  { title: "Des prix de démarrage", text: "Comme je démarre, mes prix sont accessibles : un site dès 500 €, une application dès 1 500 €." },
  { title: "Un pilote sans risque", text: "Pour un assistant IA, le pilote de 30 jours est satisfait ou remboursé." },
  {
    title: "Facture électronique",
    text: "Réception obligatoire depuis le 1er septembre 2026, émission obligatoire pour les PME et TPE à partir du 1er septembre 2027. Si c'est votre sujet, dites-le.",
  },
];
