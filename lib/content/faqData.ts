/**
 * FAQ structurée — utilisée à la fois pour le rendu visuel et pour le schema FAQPage.
 * Chaque réponse fait 60-180 mots, ton wiki-déclaratif (boost GEO).
 */

export type FaqCategory = {
  slug: string;
  label: string;
  description: string;
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
  },
  {
    slug: "applications-metier",
    label: "Applications métier",
    description: "Sur mesure, audit, méthode et stack technique.",
  },
  {
    slug: "rag-memoire",
    label: "RAG & mémoire métier",
    description: "Comment l'IA répond sur vos vraies données, sans inventer.",
  },
  {
    slug: "securite-rgpd",
    label: "Sécurité & RGPD",
    description: "Hébergement souverain UE, isolation, audit.",
  },
  {
    slug: "methode-pricing",
    label: "Méthode & pricing",
    description: "Pilote 30 jours, tarifs, garanties, ROI.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  // ─── Agents IA ───
  {
    category: "agents-ia",
    question: "Qu'est-ce qu'un agent IA et en quoi diffère-t-il d'un chatbot ?",
    answer:
      "Un agent IA est une chaîne d'exécution contrôlée : il sait (RAG sur vos documents), il raisonne (LLM contraint par règles métier), il agit (Email, CRM, Calendar, Slack, ERP) et il est supervisé (logs, taux de confiance, alertes). Un chatbot se contente de générer du texte. Un agent ferme la boucle jusqu'à l'action déclenchée dans vos outils, avec idempotence et traçabilité. Selon Gartner, 80 % des tickets de support de routine seront autonomes d'ici 2029 — c'est ce niveau d'autonomie qui distingue un agent d'un chatbot.",
  },
  {
    category: "agents-ia",
    question: "Comment éviter les hallucinations d'un agent IA en production ?",
    answer:
      "Trois leviers cumulés : (1) RAG sur vos propres documents (l'agent ne sait que ce qui est indexé, citations sources affichées, refus contrôlé sous seuil de confiance), (2) contraintes métier explicites dans le prompt système avec validation par règles, (3) humain dans la boucle pour les actions sensibles (seuil de confiance configurable, hand-off Slack ou e-mail, override audité). 55 % des organisations citent la fiabilité comme blocage n°1 à l'adoption — c'est précisément ce que ces garde-fous adressent.",
  },
  {
    category: "agents-ia",
    question: "Mon agent IA va-t-il remplacer mes équipes ?",
    answer:
      "Non. Un agent IA prend en charge les gestes répétitifs (tri inbox, notes de réunion, qualification leads, recherche documentaire) pour libérer le temps de vos équipes sur la valeur ajoutée. Les retours terrain le montrent : un commercial gagne 8 h/sem facturables, un expert métier récupère 50 % de son temps admin pour son cœur de métier, un marketeur solo double son output. L'écueil à éviter, identifié par WRITER 2026 : 29 % des employés (44 % des Gen Z) sabotent les stratégies IA non communiquées. La conduite du changement compte autant que l'outil.",
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
      "Notre méthode dérisquée : 3 à 4 semaines entre l'audit et le pilote 30 jours. Semaine 1 : audit du terrain réel (inbox, CRM, outils métier, identification des 2-3 cas d'usage à plus fort levier). Semaines 2-3 : build de l'agent avec chaîne K→R→A→M (Knowledge → Reasoning → Actions → Monitoring), intégrations validées. Semaine 4 : déploiement progressif et formation des équipes. Le pilote 30 jours commence ensuite, satisfait ou remboursé. À comparer aux 95 % de pilots IA enterprise sans ROI mesurable (source Seekr) — le dérisquage par étape change la donne.",
  },
  {
    category: "agents-ia",
    question: "Quels modèles LLM utilisez-vous ?",
    answer:
      "Selon la criticité du cas d'usage : Claude (Anthropic, hébergement UE possible) pour les tâches qui demandent du raisonnement et de la fidélité contextuelle ; GPT-5 (OpenAI) pour les volumes élevés ; Mistral Large/Codestral (Mistral AI, hébergement Paris) quand la souveraineté ou la latence prime. Aucun modèle n'est figé : on benchmark sur vos vrais prompts avant de choisir. Les modèles sont contraints par chaîne de pensée explicite, validation par règles métier et fallback humain — pas en mode generative pur.",
  },
  // ─── Applications métier ───
  {
    category: "applications-metier",
    question: "Pourquoi une application métier sur mesure plutôt qu'un SaaS générique ?",
    answer:
      "Le SaaS générique impose ses parcours, son vocabulaire et ses limites. Une app métier épouse vos gestes réels : un agenda santé qui montre vos no-show et téléconsultations en cours, un cockpit industrie avec vos lignes et OEE temps réel, un suivi chantier BTP avec pointage géolocalisé et marge en direct. La V8.0 de Solutions 2IA couvre 6 secteurs avec des dashboards vraiment différenciés (santé, retail, industrie, services pro, logistique, immobilier/BTP) — chaque cockpit reflète le vocabulaire et les KPIs propres au métier, pas une template.",
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
      "Six secteurs avec un cockpit métier dédié : Santé (cabinet 4 praticiens, agenda RDV, no-show 6,4 %, télétransmission 98,2 %), Retail/E-commerce (marketplace 3 canaux, AOV, funnel, top produits, stock critique), Industrie (atelier 4 lignes, OEE par ligne, TRS, MTBF, OF), Services pro/Conseil (cabinet 12 collaborateurs, billable rate, pipeline facturation, dossiers actifs), Logistique/Transport (tournées 18 véhicules, OTD, ETA, ePOD), Immobilier/BTP (multi-chantiers 7 sites, marge, pointage temps réel). Chaque dashboard est conçu avec le vocabulaire et les KPIs propres au métier.",
  },
  {
    category: "applications-metier",
    question: "Quelles applications mobiles supportez-vous ?",
    answer:
      "Web responsive natif (PWA installable depuis le navigateur) pour la plupart des cas. Quand le besoin de fonctionnalités natives est avéré (offline-first lourd, Bluetooth, scan code-barres, géofencing fin), nous développons en React Native ou Expo, avec partage de code maximal avec le web. Les pointages géolocalisés BTP, ePOD logistique et téléconsultations santé sont des cas typiques qui justifient le natif.",
  },
  {
    category: "applications-metier",
    question: "Que se passe-t-il après la mise en production ?",
    answer:
      "Run avec monitoring continu : tableau de bord d'usage temps réel, taux de confiance par décision (si IA), alertes proactives, A/B testing de prompts versionnés, ajout de nouveaux cas d'usage à la demande. Nos six KPIs transversaux d'instrumentation par défaut : adoption utilisateur > 85 %, temps gagné -40 à -70 % par opération, disponibilité 99,9 %, temps de réponse P95 < 250 ms, taux d'erreur métier < 0,5 %, lead time feature → prod < 5 jours.",
  },
  // ─── RAG & mémoire métier ───
  {
    category: "rag-memoire",
    question: "Comment fonctionne le RAG sur vos données ?",
    answer:
      "Vos documents (Notion, Confluence, SharePoint, Google Drive, etc.) sont indexés sous forme de vecteurs (embeddings) dans une base spécialisée comme pgvector ou Qdrant. Quand un utilisateur pose une question, le système retrouve les passages pertinents et les fournit au LLM comme contexte. Le LLM répond uniquement à partir de ces passages, avec citations sources affichées. Selon Techment, 70 % des initiatives GenAI enterprise 2026 reposent sur RAG — c'est devenu le standard pour éviter les hallucinations.",
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
      "En temps quasi-réel pour les sources qui exposent des webhooks (Notion, Slack, Confluence Cloud, SharePoint Online) — la donnée est indexée en 5-15 minutes après modification. Pour les sources sans webhook, polling configurable de 1 h à 24 h. Pour les sources statiques (PDF déposés manuellement), upload + indexation à la demande. Perplexity privilégie le contenu < 30 jours dans 82 % de ses citations — la fraîcheur compte pour la qualité des réponses.",
  },
  {
    category: "rag-memoire",
    question: "Le RAG fonctionne-t-il sur des documents juridiques sourcés ?",
    answer:
      "Oui, c'est même l'un des cas d'usage les plus solides. Un cabinet d'avocat indexe jurisprudence, doctrine, contrats-types, dossiers contentieux. L'agent répond avec citations sources exactes (article, paragraphe), refus contrôlé si la donnée n'est pas dans le corpus. Sans RAG, les LLM hallucinent jusqu'à 88 % sur les recherches juridiques spécialisées — selon Seekr. Avec RAG, on tombe à un taux d'erreur métier inférieur à 0,5 % sur les réponses sourcées.",
  },
  {
    category: "rag-memoire",
    question: "RAG ou fine-tuning : que choisir ?",
    answer:
      "RAG dans 95 % des cas d'usage entreprise. Pourquoi : votre base de connaissances change tous les jours (nouveaux contrats, nouvelles procédures), un modèle fine-tuné est figé à la date d'entraînement. RAG permet la mise à jour en temps réel, la traçabilité des sources, le contrôle d'accès. Le fine-tuning est pertinent dans les cas niche : génération de code propriétaire, ton de marque très spécifique, contraintes de latence extrêmes. On peut combiner : RAG sur la donnée + fine-tuning léger sur le ton.",
  },
  // ─── Sécurité & RGPD ───
  {
    category: "securite-rgpd",
    question: "Où sont hébergées les données de mes utilisateurs ?",
    answer:
      "France ou Union européenne, jamais ailleurs. Infrastructure : OVH Paris ou Scaleway pour le compute, Supabase EU (Francfort) ou base PostgreSQL Vercel EU pour la donnée structurée, modèles Mistral hébergés à Paris ou Claude EU (région européenne d'Anthropic) pour les LLM. 53 % des organisations citent la data residency comme blocage n°1 à l'adoption d'IA — d'où ce choix d'architecture.",
  },
  {
    category: "securite-rgpd",
    question: "Mes données servent-elles à entraîner des modèles ?",
    answer:
      "Non. Tous nos contrats avec les fournisseurs LLM (Anthropic, Mistral, OpenAI quand utilisé) excluent explicitement l'entraînement sur les prompts/réponses clients. Mistral et Claude EU offrent cette garantie par défaut. OpenAI nécessite un contrat enterprise dédié. Nous ne stockons jamais les prompts/réponses au-delà du cycle conversationnel sauf demande explicite du client pour journalisation/audit (auquel cas chiffrement at rest + accès auditable).",
  },
  {
    category: "securite-rgpd",
    question: "Êtes-vous conformes RGPD ?",
    answer:
      "Oui, par construction. Hébergement EU exclusif, contrats DPA (Data Processing Agreement) signés avec chaque sous-traitant, registre des traitements documenté, possibilité de purger les données utilisateur sous 24 h, anonymisation/pseudonymisation des PII dans les logs, accès tracé par audit. Pour les secteurs réglementés (santé HDS, services pro avec secret professionnel), certifications supplémentaires disponibles. La CNIL et le CEPD ont publié des prises de position spécifiques sur l'agentic AI que nous suivons.",
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
      "Oui, c'est inclus dans tous nos contrats. Notre DPA-type couvre les obligations Article 28 RGPD : finalités traitées, catégories de personnes concernées, mesures techniques et organisationnelles, sous-traitants ultérieurs (liste annexée), audit par le responsable de traitement. Possibilité d'amender pour spécificités sectorielles (HDS santé, secret professionnel avocat/expert-comptable). Délai de signature typique : 5-10 jours ouvrés.",
  },
  // ─── Méthode & pricing ───
  {
    category: "methode-pricing",
    question: "En quoi consiste votre pilote 30 jours satisfait ou remboursé ?",
    answer:
      "Une fois l'audit + le build terminés, vous démarrez 30 jours d'usage réel avec vos équipes. Si à la fin du mois vous estimez que l'agent (ou l'application) ne tient pas ses promesses mesurables — adoption sous 50 %, KPIs métier non atteints, retour utilisateurs négatif majoritaire — vous arrêtez sans frais et nous vous rendons toutes vos données. Cette garantie adresse l'objection n°1 du marché : 95 % des pilots IA enterprise n'ont délivré aucun ROI mesurable (Seekr). Notre dérisquage change l'équation pour vous.",
  },
  {
    category: "methode-pricing",
    question: "Combien coûte un agent IA sur mesure ?",
    answer:
      "Trois tranches indicatives. Starter (1-2 workflows ciblés, intégrations standards, 1 outil) : 800-2 500 € build + 300-800 €/mois run. Growth (3-6 workflows, dashboards, QA approfondi, 2-4 outils) : 2 500-8 000 € build + 800-2 000 €/mois run. Ops complet (6-15 workflows, intégrations complexes, gouvernance, audit) : 8 000-20 000 € build + 2 000-4 500 €/mois run. Ces prix peuvent varier — à la hausse ou à la baisse — selon la complexité du projet, les fonctionnalités demandées et les intégrations à prévoir. Inclus dans tous les forfaits : hébergement souverain UE, monitoring 24/7, hotfix sous 24 h, garantie 30 jours avec sortie sans frais si KPIs non atteints. Chiffrage précis après audit gratuit de 45 minutes.",
  },
  {
    category: "methode-pricing",
    question: "Combien coûte une application métier sur mesure ?",
    answer:
      "Tranches indicatives selon la complexité. MVP fonctionnel (1-3 modules, 5-10 écrans, 1 intégration) : 1 500-5 000 €. Application complète (8-15 modules, dashboards, mobile responsive, multi-utilisateurs, intégrations CRM/ERP) : 5 000-15 000 €. Plateforme métier avancée (multi-tenant, workflows complexes, BI embarqué, audit RGPD/HDS) : 15 000-40 000 €+. Run mensuel pour maintenance, monitoring et évolutions : 200-1 500 €/mois selon volume. Ces prix peuvent varier — à la hausse ou à la baisse — selon la complexité du projet, les fonctionnalités demandées et les intégrations à prévoir. Inclus : design soigné, code testé, accessibilité, perf Lighthouse 95+, garantie 30 jours. Devis détaillé après audit gratuit.",
  },
  {
    category: "methode-pricing",
    question: "Pratiquez-vous le paiement à la performance ?",
    answer:
      "Oui, en option. Modèle hybride : base fixe (couvrant les coûts d'infrastructure et de monitoring) + variable lié à la performance — typiquement par lead qualifié, par ticket résolu autonomement ou par economie de temps mesurée. HubSpot facture désormais à l'agent au lead qualifié (et non au siège), c'est devenu un standard. L'avantage : alignement parfait risque-valeur. Conditions négociées au cas par cas après l'audit.",
  },
  {
    category: "methode-pricing",
    question: "Quels indicateurs prouvez-vous au bout de 30 jours ?",
    answer:
      "Adoption utilisateur (cible > 85 % de l'équipe utilise quotidiennement), temps gagné par opération (mesure unitaire avant/après sur les gestes métier les plus fréquents), taux d'erreur métier (cible < 0,5 %), disponibilité (cible SLA 99,9 %), satisfaction qualitative (NPS interne ≥ 7/10). Si ces seuils ne sont pas atteints à J+30, vous sortez sans frais. Sinon, on passe en run mensuel avec amélioration continue.",
  },
  {
    category: "methode-pricing",
    question: "Comment se passe le support après mise en production ?",
    answer:
      "Run mensuel inclus selon votre forfait : monitoring 24/7 de l'infrastructure, alertes proactives Slack/email, hotfix bugs critiques sous 24 h, ajout de nouveaux cas d'usage à la demande (chiffrage transparent), update mensuel des prompts/règles métier, A/B testing pour optimisation continue. Slack dédié pour vos équipes pendant les heures ouvrables (9h-19h Paris). Astreinte premium possible (24/7, à partir de 199 €/mois selon SLA et périmètre).",
  },
];
