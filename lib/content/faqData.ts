/**
 * FAQ structurée — utilisée à la fois pour le rendu visuel et pour le schema FAQPage.
 * Chaque réponse fait 60-180 mots, ton wiki-déclaratif (boost GEO).
 */

export type FaqCategory = {
  slug: string;
  label: string;
  description: string;
  /** Une sortie par catégorie : la page qui approfondit. */
  seeAlso: { label: string; href: string };
};

export type FaqItem = {
  category: FaqCategory["slug"];
  question: string;
  answer: string;
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: "agents-ia",
    label: "Agents IA",
    description: "Comment fonctionne un agent IA fiable, et comment l'évaluer.",
    seeAlso: { label: "Voir ce qu'un assistant IA ferait chez vous", href: "/agents-ia" },
  },
  {
    slug: "applications-metier",
    label: "Applications métier",
    description: "Sur mesure ou refonte, méthode, outils utilisés.",
    seeAlso: { label: "Découvrir les applications sur mesure", href: "/applications" },
  },
  {
    slug: "rag-memoire",
    label: "RAG & mémoire métier",
    description: "Comment l'IA répond sur vos vraies données, sans inventer.",
    seeAlso: { label: "Interroger vos propres documents", href: "/rag" },
  },
  {
    slug: "securite-rgpd",
    label: "Sécurité & RGPD",
    description: "Où vont vos données, qui y accède, ce que dit la loi.",
    seeAlso: { label: "Voir où vont vos données", href: "/rag#vos-donnees" },
  },
  {
    slug: "methode-pricing",
    label: "Méthode & pricing",
    description: "Démarrage, tarifs, premiers échanges gratuits, suivi.",
    seeAlso: { label: "Voir les prix et les délais", href: "/services" },
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  // ─── Agents IA ───
  {
    category: "agents-ia",
    question: "Qu'est-ce qu'un agent IA et en quoi diffère-t-il d'un chatbot ?",
    answer:
      "Un chatbot répond à une question avec du texte, et s'arrête là. Un agent IA va plus loin : il connaît vos documents, suit vos règles, et agit dans vos outils (mail, fichier clients, agenda, facturation). Exemple : une demande arrive par mail, l'agent la lit, crée la fiche client, prépare la réponse et vous la soumet. Chaque action est notée et vérifiable, et une même demande n'est jamais traitée deux fois. C'est cette capacité à finir le travail, sous contrôle, qui fait la différence.",
  },
  {
    category: "agents-ia",
    question: "Comment éviter les hallucinations d'un agent IA en production ?",
    answer:
      "Trois leviers cumulés : (1) une IA branchée sur vos propres documents (l'agent ne sait que ce qui est indexé, citations sources affichées, refus contrôlé sous seuil de confiance), (2) contraintes métier explicites dans le prompt système avec validation par règles, (3) humain dans la boucle pour les actions sensibles (seuil de confiance configurable, hand-off Slack ou e-mail, override audité). La fiabilité est souvent le premier frein cité à l'adoption : c'est précisément ce que ces garde-fous adressent.",
  },
  {
    category: "agents-ia",
    question: "Mon agent IA va-t-il remplacer mes équipes ?",
    answer:
      "Non. Un agent IA prend en charge les gestes répétitifs (tri de la boîte mail, notes de réunion, qualification des demandes, recherche dans les documents) pour libérer du temps sur ce qui compte : la relation client, le conseil, la décision. Le gain se mesure chez vous, pendant le pilote de 30 jours, sur des tâches choisies ensemble ; je ne promets pas de chiffre avant. Un point souvent sous-estimé : expliquer à l'équipe ce que fait l'agent et ce qu'il ne fait pas compte autant que l'outil. Un agent imposé sans explication crée de la résistance, pas de la performance.",
  },
  {
    category: "agents-ia",
    question: "Sur quels outils l'agent peut-il se brancher ?",
    answer:
      "Tous les outils avec une API REST ou un webhook : Gmail, Outlook, Front (inbox) · HubSpot, Salesforce, Axonaut, Pipedrive (CRM) · Slack, Microsoft Teams (chat) · Google Calendar, Outlook, Calendly (planning) · Notion, Confluence, SharePoint, Google Drive (documentation) · Stripe, Chorus Pro, Pennylane (facturation) · Whisper, Aircall (transcription appels). Function calling typé garantit l'idempotence et chaque appel est journalisé pour l'audit.",
  },
  {
    category: "agents-ia",
    question: "Combien de temps pour mettre un premier agent en production ?",
    answer:
      "Je travaille par étapes courtes pour limiter les risques : 3 à 4 semaines entre l'audit et le premier déploiement. Semaine 1 : audit du terrain réel (inbox, CRM, outils métier, identification des 2-3 cas d'usage à plus fort levier). Semaines 2-3 : build de l'agent avec chaîne K→R→A→M (Knowledge → Reasoning → Actions → Monitoring), intégrations validées. Semaine 4 : déploiement progressif et prise en main par votre équipe. Beaucoup de projets IA échouent parce que les données et processus sous-jacents n'ont jamais été audités : c'est précisément ce que cette méthode évite.",
  },
  {
    category: "agents-ia",
    question: "Quels modèles LLM utilisez-vous ?",
    answer:
      "Selon la criticité du cas d'usage : Claude (Anthropic, hébergement UE possible) pour les tâches qui demandent du raisonnement et de la fidélité contextuelle ; GPT-4o/GPT-5 (OpenAI) pour les volumes élevés ; Mistral Large/Codestral (Mistral AI, hébergement Paris) quand la souveraineté ou la latence prime. Aucun modèle n'est figé : je benchmark sur vos vrais prompts avant de choisir. Les modèles sont contraints par chaîne de pensée explicite, validation par règles métier et fallback humain, pas en mode génératif pur.",
  },
  // ─── Applications métier ───
  {
    category: "applications-metier",
    question: "Pourquoi une application métier sur mesure plutôt qu'un SaaS générique ?",
    answer:
      "Le SaaS générique impose ses parcours, son vocabulaire et ses limites. Une app métier épouse vos gestes réels : un agenda santé qui montre vos no-show et téléconsultations en cours, un cockpit industrie avec vos lignes et OEE temps réel, un suivi chantier BTP avec pointage géolocalisé et marge en direct. Je conçois des dashboards vraiment différenciés par secteur (santé, retail, industrie, services pro, logistique, immobilier/BTP) : chaque cockpit reflète le vocabulaire et les KPIs propres à votre métier, pas une template générique.",
  },
  {
    category: "applications-metier",
    question: "Greenfield (sur mesure) ou audit + refonte ?",
    answer:
      "Deux voies, même rigueur. (A) Sur mesure dès la page blanche : cadrage métier (1-2 ateliers), maquettes navigables validées avant code, build incrémental sprints courts, intégrations, mise en service progressive. (B) Audit + refonte d'un existant : cartographie du code, des données et des parcours ; diagnostic structuré (ce qui reste, ce qui part, ce qui se réécrit avec arbitrages coût/valeur) ; trajectoire de migration sans coupure (modules réécrits un par un, ancien et nouveau cohabitent) ; bascule complète quand le nouveau couvre tout.",
  },
  {
    category: "applications-metier",
    question: "Quelle stack technique utilisez-vous ?",
    answer:
      "Next.js 15 (App Router, SSR/SSG, React Server Components) · TypeScript strict · Tailwind CSS v4 · PostgreSQL (Supabase ou managé) · pgvector ou Qdrant pour les embeddings RAG · motion v12 + GSAP pour les animations · Three.js / React Three Fiber quand la 3D apporte. Hébergement Vercel + base de données EU. Tests Playwright. Stack volontairement resserrée pour rester maintenable sans plomber le développement.",
  },
  {
    category: "applications-metier",
    question: "Combien de secteurs sont déjà couverts ?",
    answer:
      "Six secteurs ont aujourd'hui une page dédiée, avec des maquettes de tableau de bord : santé (agenda, dossier patient, téléconsultation), commerce et e-commerce (un seul stock pour tous les canaux), industrie (production en direct, maintenance), cabinets et conseil (temps, facturation, documents), transport et logistique (tournées, preuves de livraison), immobilier et BTP (mandats, chantiers, marges). Les chiffres affichés sur ces maquettes sont des exemples, pas des résultats clients : les objectifs réels se fixent avec vous au démarrage. Votre secteur n'y est pas ? La démarche est la même : on part de vos outils et de ce qui coince.",
  },
  {
    category: "applications-metier",
    question: "Quelles applications mobiles supportez-vous ?",
    answer:
      "Web responsive natif (PWA installable depuis le navigateur) pour la plupart des cas. Quand le besoin de fonctionnalités natives est avéré (offline-first lourd, Bluetooth, scan code-barres, géofencing fin), je développe en React Native ou Expo, avec partage de code maximal avec le web. Les pointages géolocalisés BTP, ePOD logistique et téléconsultations santé sont des cas typiques qui justifient le natif.",
  },
  {
    category: "applications-metier",
    question: "Que se passe-t-il après la mise en production ?",
    answer:
      "Run avec monitoring continu : tableau de bord d'usage temps réel, taux de confiance par décision (si IA), alertes proactives, A/B testing de prompts versionnés, ajout de nouveaux cas d'usage à la demande. Six indicateurs de suivi par défaut : adoption utilisateur > 85 %, temps gagné mesurable par opération, disponibilité 99,9 %, temps de réponse P95 < 250 ms, taux d'erreur métier < 0,5 %, lead time feature → prod < 5 jours.",
  },
  {
    category: "applications-metier",
    question: "Mon application sera-t-elle prête pour la facture électronique ?",
    answer:
      "Oui, c'est prévu dès la conception. Le calendrier officiel : depuis le 1er septembre 2026, toutes les entreprises assujetties à la TVA doivent pouvoir recevoir des factures électroniques, et les grandes entreprises et ETI doivent en émettre ; les PME, TPE et micro-entreprises devront en émettre à partir du 1er septembre 2027. Concrètement, votre application produit des factures au format attendu (Factur-X) et les transmet par une plateforme agréée par l'État. Vous n'avez rien à ressaisir, et vous n'aurez pas à changer d'outil dans un an.",
  },
  // ─── RAG & mémoire métier ───
  {
    category: "rag-memoire",
    question: "Comment fonctionne le RAG sur vos données ?",
    answer:
      "Vos documents (Notion, Confluence, SharePoint, Google Drive, etc.) sont indexés sous forme vectorielle dans une base spécialisée comme pgvector ou Qdrant : chaque fragment de texte est rangé de façon à être retrouvé vite par similarité de sens. Quand un utilisateur pose une question, le système retrouve les passages pertinents et les fournit à l'IA comme contexte. L'IA répond uniquement à partir de ces passages, avec citations sources affichées. C'est aujourd'hui le standard pour éviter les hallucinations dans les projets en entreprise.",
  },
  {
    category: "rag-memoire",
    question: "Quelles sources de documents le RAG accepte-t-il ?",
    answer:
      "Documents bureautiques (PDF, Word, Excel, PowerPoint), bases de connaissances (Notion, Confluence, SharePoint, Coda), drives (Google Drive, OneDrive, Dropbox), wikis internes, messageries (canaux Slack, Teams autorisés), bases métier (CRM, ERP, GED), API custom. L'indexation est incrémentale : un nouveau document est repris en 5-15 minutes selon le volume. Les mises à jour sont détectées automatiquement (Notion events, webhooks SharePoint).",
  },
  {
    category: "rag-memoire",
    question: "Comment garantir que l'agent ne mélange pas les données entre clients ?",
    answer:
      "Isolation par tenant : chaque client a sa propre base vectorielle, ses propres clés de chiffrement, ses propres prompts système. Aucun croisement n'est possible au niveau infrastructure. Pour les agents intra-entreprise, on applique des permissions de rôle (RBAC) : un commercial ne voit que les documents commerciaux, un RH ne voit que les politiques RH. Audit RGPD complet de chaque accès, logs structurés, possibilité de purger une base sous 24 h sur demande.",
  },
  {
    category: "rag-memoire",
    question: "À quelle fréquence la base RAG est-elle mise à jour ?",
    answer:
      "En temps quasi-réel pour les sources qui exposent des signaux automatiques (Notion, Slack, Confluence Cloud, SharePoint Online) : la donnée est indexée en 5-15 minutes après modification. Pour les sources sans signal automatique, vérification configurable toutes les 1 h à 24 h. Pour les sources statiques (PDF déposés manuellement), upload + indexation à la demande. La fraîcheur des documents compte directement sur la qualité des réponses : un corpus vieillissant produit des réponses périmées.",
  },
  {
    category: "rag-memoire",
    question: "Le RAG fonctionne-t-il sur des documents juridiques sourcés ?",
    answer:
      "Oui, c'est même l'un des usages les plus solides. Un cabinet d'avocats indexe jurisprudence, doctrine, contrats types et dossiers. L'assistant répond en citant la source exacte (article, paragraphe) et refuse de répondre quand l'information n'est pas dans la base. Sans base documentaire propre, les IA généralistes inventent des références juridiques : c'est un phénomène documenté. Avec une base bien construite, chaque réponse est vérifiable en un clic ; le taux d'erreur acceptable se fixe avec vous avant le démarrage et se mesure pendant le pilote, il n'est pas promis à l'avance.",
  },
  {
    category: "rag-memoire",
    question: "RAG ou fine-tuning : que choisir ?",
    answer:
      "La mémoire d'entreprise (RAG) dans la grande majorité des cas d'usage. Pourquoi : votre base de connaissances change tous les jours (nouveaux contrats, nouvelles procédures), un modèle ré-entraîné est figé à la date d'entraînement. La mémoire d'entreprise permet la mise à jour en temps réel, la traçabilité des sources, le contrôle d'accès. Le ré-entraînement du modèle est pertinent dans les cas niche : génération de code propriétaire, ton de marque très spécifique, contraintes de latence extrêmes. On peut combiner les deux : mémoire d'entreprise sur la donnée + ré-entraînement léger sur le ton.",
  },
  // ─── Sécurité & RGPD ───
  {
    category: "securite-rgpd",
    question: "Où sont hébergées les données de mes utilisateurs ?",
    answer:
      "France ou Union européenne, jamais ailleurs. Infrastructure : OVH Paris ou Scaleway pour le compute, Supabase EU (Francfort) ou base PostgreSQL Vercel EU pour la donnée structurée, modèles Mistral hébergés à Paris ou Claude EU (région européenne d'Anthropic) pour l'IA. La localisation des données est souvent le premier frein cité à l'adoption d'IA dans les entreprises : c'est précisément ce que cette architecture adresse.",
  },
  {
    category: "securite-rgpd",
    question: "Mes données servent-elles à entraîner des modèles ?",
    answer:
      "Non. Les contrats avec les fournisseurs LLM que j'utilise (Anthropic, Mistral, OpenAI quand utilisé) excluent explicitement l'entraînement sur les prompts/réponses clients. Mistral et Claude EU offrent cette garantie par défaut. OpenAI nécessite un contrat enterprise dédié. Je ne stocke jamais les prompts/réponses au-delà du cycle conversationnel sauf demande explicite pour journalisation/audit (auquel cas chiffrement at rest + accès auditable).",
  },
  {
    category: "securite-rgpd",
    question: "Êtes-vous conformes RGPD ?",
    answer:
      "Oui, par construction. Hébergement EU exclusif, contrats DPA (Data Processing Agreement) signés avec chaque sous-traitant, registre des traitements documenté, possibilité de purger les données utilisateur sous 24 h, anonymisation/pseudonymisation des PII dans les logs, accès tracé par audit. Pour les secteurs réglementés (santé HDS, services pro avec secret professionnel), certifications supplémentaires disponibles. La CNIL et le CEPD ont publié des prises de position spécifiques sur l'IA agentique que je suis de près.",
  },
  {
    category: "securite-rgpd",
    question: "Qui voit quoi ? Comment fonctionne le contrôle d'accès ?",
    answer:
      "Authentification SSO (SAML, OAuth) ou login dédié selon vos préférences. Permissions par rôle (RBAC) : un agent commercial accède au CRM commercial mais pas aux dossiers RH ; un manager voit son équipe mais pas les autres. Pour les agents IA, chaque action est tracée avec l'utilisateur ou l'agent à l'origine, l'outil cible, le résultat. Logs structurés conservés selon votre politique de rétention (typiquement 12-36 mois). Audit RGPD complet exportable.",
  },
  {
    category: "securite-rgpd",
    question: "Que se passe-t-il en cas d'incident de sécurité ?",
    answer:
      "Plan de continuité documenté : détection automatisée des comportements anormaux, notification CNIL sous 72 h en cas de fuite de données personnelles, communication aux personnes concernées si risque élevé, audit forensique avec rapport, mise à jour des contrôles. Monitoring 24/7 sur l'infrastructure. Sauvegardes chiffrées toutes les 6 h avec rétention 30 jours. PRA testé semestriellement.",
  },
  {
    category: "securite-rgpd",
    question: "Pouvez-vous signer un DPA avec mon entreprise ?",
    answer:
      "Oui, c'est inclus dans chaque mission. Mon DPA-type couvre les obligations Article 28 RGPD : finalités traitées, catégories de personnes concernées, mesures techniques et organisationnelles, sous-traitants ultérieurs (liste annexée), audit par le responsable de traitement. Possibilité d'amender pour spécificités sectorielles (HDS santé, secret professionnel avocat/expert-comptable). Délai de signature typique : 5-10 jours ouvrés.",
  },
  // ─── Méthode & prix ───
  {
    category: "methode-pricing",
    question: "Combien coûte un agent IA sur mesure ?",
    answer:
      "Trois niveaux indicatifs. Démarrage (1-2 workflows ciblés, intégrations standards, 1 outil) : 800-2 500 € build + 300-800 €/mois run. Intermédiaire (3-6 workflows, dashboards, QA approfondi, 2-4 outils) : 2 500-8 000 € build + 800-2 000 €/mois run. Complet (6-15 workflows, intégrations complexes, gouvernance, audit) : 8 000-20 000 € build + 2 000-4 500 €/mois run. Ces fourchettes varient selon la complexité réelle, les fonctionnalités demandées et les intégrations à prévoir. Inclus dans tous les niveaux : hébergement souverain UE, monitoring 24/7, hotfix sous 24 h. Chiffrage précis après un premier échange gratuit de 45 minutes.",
  },
  {
    category: "methode-pricing",
    question: "Combien coûte une application métier sur mesure ?",
    answer:
      "Fourchettes indicatives selon la complexité. MVP fonctionnel (1-3 modules, 5-10 écrans, 1 intégration) : 1 500-5 000 €. Application complète (8-15 modules, dashboards, mobile responsive, multi-utilisateurs, intégrations CRM/ERP) : 5 000-15 000 €. Plateforme métier avancée (multi-tenant, workflows complexes, BI embarqué, audit RGPD/HDS) : 15 000-40 000 €+. Run mensuel pour maintenance, monitoring et évolutions : 200-1 500 €/mois selon volume. Ces fourchettes varient selon la complexité réelle, les fonctionnalités demandées et les intégrations. Inclus : design soigné, code testé, accessibilité, performance Lighthouse 95+. Devis détaillé après un premier échange gratuit.",
  },
  {
    category: "methode-pricing",
    question: "Et si ça ne me convient pas ?",
    answer:
      "Pour un assistant IA, vous démarrez par un pilote de 30 jours satisfait ou remboursé : vous arrêtez quand vous voulez, sans frais, et vos données vous sont restituées. Pour un site ou une application, rien n'est engagé avant la proposition, et le prix est fixé avant de commencer. À chaque étape, vous voyez ce qui est livré avant de payer la suite. Vous décidez en connaissance de cause, jamais sous pression.",
  },
  {
    category: "methode-pricing",
    question: "Comment se déroule le premier mois après le build ?",
    answer:
      "Une fois le build terminé, vous démarrez 30 jours d'usage réel avec votre équipe sur les cas concrets identifiés en audit. Je mesure avec vous l'adoption et les gains réels (temps économisé, erreurs évitées, cas traités). Si les indicateurs ne correspondent pas aux objectifs fixés ensemble, on ajuste : c'est l'intérêt d'un suivi serré sur cette période. Beaucoup de projets IA ne tiennent pas leurs promesses parce que les données et processus n'ont jamais été audités en amont : c'est précisément ce que cette méthode par étapes courtes évite.",
  },
  {
    category: "methode-pricing",
    question: "Quels indicateurs prouvez-vous au bout de 30 jours ?",
    answer:
      "Adoption utilisateur (cible > 85 % de l'équipe utilise quotidiennement), temps gagné par opération (mesure avant/après sur les gestes métier les plus fréquents), taux d'erreur métier (cible < 0,5 %), disponibilité (cible SLA 99,9 %), satisfaction qualitative (NPS interne ≥ 7/10). Ces indicateurs sont définis ensemble avant de démarrer, pas imposés après coup. À J+30, on fait le point ensemble et on ajuste ou on passe en run mensuel avec amélioration continue.",
  },
  {
    category: "methode-pricing",
    question: "Pratiquez-vous le paiement à la performance ?",
    answer:
      "Oui, en option. Modèle hybride : base fixe (couvrant les coûts d'infrastructure et de monitoring) + variable lié à la performance (par lead qualifié, par ticket résolu autonomement ou par économie de temps mesurée). L'avantage : alignement parfait entre risque et valeur délivrée. Conditions négociées au cas par cas après le premier échange.",
  },
  {
    category: "methode-pricing",
    question: "Comment se passe le support après mise en production ?",
    answer:
      "Run mensuel inclus selon le niveau choisi : monitoring 24/7 de l'infrastructure, alertes proactives Slack/email, hotfix bugs critiques sous 24 h, ajout de nouveaux cas d'usage à la demande (chiffrage transparent), mise à jour mensuelle des prompts/règles métier, tests pour optimisation continue. Canal dédié pour votre équipe pendant les heures ouvrables (9h-19h Paris). Astreinte élargie possible (24/7, tarif selon SLA et périmètre, à discuter ensemble).",
  },
];
