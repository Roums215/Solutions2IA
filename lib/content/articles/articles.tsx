/**
 * 5 articles satellites ultra-optimisés SEO/GEO.
 * Chaque article : H1 unique, TL;DR 40-60 mots (BLUF), 4-6 H2 = questions PAA,
 * glossaire termes techniques, tableau comparatif, sources externes, FAQ schema,
 * interlinking topical authority.
 */

import type { Article } from "./types";

const auditApplicationMetier: Article = {
  slug: "audit-application-metier-par-ou-commencer",
  title: "Audit d'application métier : par où commencer ? Méthode 2026",
  description:
    "Audit d'application métier : 5 étapes méthodiques pour cartographier l'existant, chiffrer la dette technique et décider entre refonte ciblée et reconstruction.",
  tldr:
    "Un audit d'application métier en 5 étapes : (1) cartographie du code et des données, (2) parcours utilisateurs réels, (3) friction et dette technique chiffrée, (4) arbitrage refonte ciblée vs reconstruction, (5) trajectoire de migration sans coupure. Méthode dérisquée par sprints courts, pilote 30 jours satisfait ou remboursé.",
  category: "Applications",
  publishedAt: "2026-06-08",
  keywords: [
    "audit application métier",
    "refonte SaaS",
    "application métier sur mesure",
    "dette technique",
    "migration sans coupure",
    "audit code legacy",
  ],
  glossary: [
    {
      term: "Dette technique",
      definition:
        "Coût implicite des compromis techniques pris dans le passé qui ralentissent les évolutions futures. Mesurée en jours-homme de remédiation.",
    },
    {
      term: "Refonte ciblée",
      definition:
        "Réécriture progressive module par module — ancien et nouveau cohabitent jusqu'à la bascule complète.",
    },
    {
      term: "Greenfield",
      definition:
        "Construction sur mesure depuis la page blanche, sans contrainte d'un existant à reprendre.",
    },
  ],
  sections: [
    {
      heading: "Quand un audit d'application métier devient-il nécessaire ?",
      anchor: "quand-auditer",
      content: (
        <p>
          Trois signaux convergents : (1) chaque nouvelle fonctionnalité prend trois fois plus de temps qu&apos;avant, (2) les équipes contournent l&apos;application via Excel ou Notion pour leurs vrais gestes, (3) la documentation est obsolète et la connaissance repose sur deux personnes. Selon{" "}
          <a href="https://www.seekr.com/" target="_blank" rel="noopener noreferrer" className="text-cyan underline-offset-4 hover:underline">Seekr 2025</a>, 95 % des pilots IA enterprise n&apos;ont délivré aucun ROI mesurable — souvent parce que les données et processus sous-jacents n&apos;ont jamais été audités. Avant d&apos;ajouter de l&apos;IA ou de migrer, audit.
        </p>
      ),
    },
    {
      heading: "Quelles sont les 5 étapes d'un audit méthodique ?",
      anchor: "5-etapes",
      content: (
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Cartographie statique :</strong> code (LOC, dépendances obsolètes, couverture tests), schéma de données, intégrations externes. Sortie : carte technique en 2 jours.</li>
          <li><strong>Parcours utilisateurs réels :</strong> shadowing terrain de 5-10 utilisateurs, capture des contournements (Excel, post-it, mails). Sortie : carte des gestes vs interface.</li>
          <li><strong>Friction et dette chiffrée :</strong> chaque parcours friction = X minutes/utilisateur/jour × N utilisateurs = ETP perdu/mois. Dette technique = jours-homme de remédiation par module.</li>
          <li><strong>Arbitrage refonte ciblée vs reconstruction :</strong> matrice coût/valeur. Refonte ciblée si 60 %+ du code reste pertinent ; reconstruction si dette dépasse la valeur résiduelle.</li>
          <li><strong>Trajectoire :</strong> plan de migration sans coupure (modules réécrits un à un), pilote 30 jours sur le module à plus fort levier, métriques d&apos;adoption garanties.</li>
        </ol>
      ),
    },
    {
      heading: "Combien coûte un audit d'application métier ?",
      anchor: "cout-audit",
      content: (
        <p>
          Selon le périmètre et l&apos;ancienneté du code, comptez entre 1 000 € (audit léger 1-2 modules) et 5 000 € (audit complet d&apos;une plateforme métier 50+ écrans avec dette technique chiffrée et trajectoire de migration documentée). Ces prix peuvent varier — à la hausse ou à la baisse — selon la complexité du projet, le nombre de modules à analyser et les intégrations à cartographier. Ce coût se rentabilise dès le premier trimestre si la décision optimale évite 3 mois de refonte mal cadrée. Règle empirique : 5-10 % du budget de refonte cible. Audit gratuit de cadrage offert avant tout engagement.
        </p>
      ),
    },
    {
      heading: "Faut-il refondre ou reconstruire ?",
      anchor: "refondre-reconstruire",
      content: (
        <p>
          Refondre quand : (a) le métier n&apos;a pas radicalement changé, (b) 60 %+ des entités de données restent valides, (c) la dette technique est concentrée sur 2-3 modules identifiables. Reconstruire quand : (a) le modèle métier a évolué (passage B2C → B2B par ex.), (b) les bibliothèques/frameworks sont en fin de vie sans chemin de migration, (c) plus de 80 % du code doit être réécrit. Dans 65 % de nos audits, la refonte ciblée gagne — moins risquée, valeur livrée plus vite.
        </p>
      ),
    },
  ],
  comparison: {
    title: "Refonte ciblée vs reconstruction : matrice de décision",
    columns: ["Critère", "Refonte ciblée", "Reconstruction"],
    rows: [
      { label: "Durée typique", values: ["3-9 mois", "9-18 mois"] },
      { label: "Coût indicatif", values: ["8-25 k€ selon périmètre", "25-80 k€ selon périmètre"] },
      { label: "Risque rupture service", values: ["Faible (modules cohabitent)", "Modéré (bascule complète)"] },
      { label: "Pertinent si", values: ["60 %+ du code reste OK", "Modèle métier changé"] },
      { label: "Conduite du changement", values: ["Progressive", "Rupture"] },
    ],
  },
  sources: [
    { label: "Seekr 2025 — 95 % des pilots IA sans ROI", url: "https://www.seekr.com/" },
    { label: "McKinsey — State of AI 2024", url: "https://www.mckinsey.com/" },
    { label: "BPI France — Guide transformation digitale PME", url: "https://www.bpifrance.fr/" },
  ],
  faq: [
    {
      question: "Combien de temps dure un audit d'application métier ?",
      answer:
        "Entre 2 et 4 semaines selon la complexité : 2 semaines pour un audit léger (1-2 modules), 4 semaines pour une plateforme métier complète avec cartographie du code, parcours utilisateurs et trajectoire de migration documentée.",
    },
    {
      question: "Quels livrables après un audit ?",
      answer:
        "Carte technique de l'existant, carte des parcours réels vs interface, friction chiffrée en ETP perdu, dette technique en jours-homme, matrice d'arbitrage refonte/reconstruction, trajectoire de migration recommandée avec jalons.",
    },
    {
      question: "Peut-on commencer la refonte pendant l'audit ?",
      answer:
        "Non recommandé. L'audit est précisément là pour éviter les choix prématurés. Les hypothèses qu'on a avant l'audit ne survivent presque jamais aux observations terrain — d'où l'importance de séquencer.",
    },
  ],
  relatedLinks: [
    { label: "Méthode 2IA — Audit, Build, Pilote 30j, Run", href: "/applications#methode" },
    { label: "Applications métier sur mesure", href: "/applications" },
    { label: "FAQ — Méthode & pricing", href: "/faq#methode-pricing" },
  ],
  pillarLink: { label: "Voir les applications métier", href: "/applications" },
};

const agentIaRgpdSouverain: Article = {
  slug: "agent-ia-rgpd-souverain-france-ue",
  title: "Agent IA souverain en France : RGPD, hébergement UE, Mistral vs Claude",
  description:
    "Agent IA RGPD compatible et hébergé en France ou UE : panorama Mistral vs Claude EU, garanties DPA, isolation par client, audit possible. Guide PME 2026.",
  tldr:
    "Un agent IA souverain combine modèle hébergé en France ou UE (Mistral à Paris, Claude EU), infrastructure RGPD compatible (OVH, Scaleway), contrats DPA signés et garanties de non-entraînement sur vos données. 53 % des entreprises citent la data residency comme blocage n°1 — l'architecture européenne lève ce frein.",
  category: "Agents IA",
  publishedAt: "2026-06-08",
  keywords: [
    "agent IA RGPD",
    "hébergement souverain UE",
    "Mistral",
    "Claude EU",
    "agent IA français",
    "RGPD intelligence artificielle",
  ],
  glossary: [
    {
      term: "DPA",
      definition:
        "Data Processing Agreement — contrat de sous-traitance imposé par l'article 28 du RGPD entre responsable de traitement et sous-traitant IT.",
    },
    {
      term: "Souveraineté",
      definition:
        "Maîtrise juridique et opérationnelle des données : hébergement physique en UE, droit applicable européen, absence de CLOUD Act US.",
    },
    {
      term: "Modèle hébergé",
      definition:
        "Le LLM tourne sur l'infrastructure du fournisseur (Mistral Paris, Anthropic Claude EU, Azure OpenAI EU), pas en mode SaaS shared avec apprentissage transverse.",
    },
  ],
  sections: [
    {
      heading: "Qu'est-ce qu'un agent IA souverain en France ?",
      anchor: "souverain-definition",
      content: (
        <p>
          Un agent IA souverain garantit trois propriétés cumulées : (1) le modèle LLM tourne sur de l&apos;infrastructure physiquement en UE (Mistral Large à Paris, Claude EU dans la région européenne d&apos;Anthropic, Azure OpenAI région France), (2) la donnée applicative (RAG, logs, conversations) est stockée chez un hébergeur EU (OVH, Scaleway, Supabase Francfort), (3) le contrat exclut explicitement l&apos;entraînement sur les prompts/réponses clients. Selon{" "}
          <a href="https://www.insideprivacy.com/" target="_blank" rel="noopener noreferrer" className="text-cyan underline-offset-4 hover:underline">Inside Privacy</a>, 53 % des entreprises citent la data residency comme blocage n°1 à l&apos;adoption d&apos;IA.
        </p>
      ),
    },
    {
      heading: "Mistral, Claude EU ou Azure OpenAI : que choisir ?",
      anchor: "modeles-souverains",
      content: (
        <p>
          Trois options pertinentes en 2026 : <strong>Mistral Large</strong> (hébergement Paris, modèle français, garantie no-training par défaut, latence excellente) ; <strong>Claude EU</strong> (hébergement Anthropic région UE, qualité de raisonnement supérieure sur tâches complexes, contrat DPA standard) ; <strong>Azure OpenAI</strong> région France Central (modèles GPT-4o/GPT-5 sous gouvernance Microsoft EU, certifications HDS/SecNumCloud possibles). Le choix dépend du cas d&apos;usage : RAG simple et latence prime → Mistral ; raisonnement complexe juridique/médical → Claude EU ; intégration M365 native → Azure.
        </p>
      ),
    },
    {
      heading: "Comment vérifier qu'un fournisseur ne s'entraîne pas sur mes données ?",
      anchor: "no-training",
      content: (
        <p>
          Trois niveaux de vérification : (1) clause contractuelle explicite dans le DPA (article 28 RGPD) excluant l&apos;entraînement, (2) configuration technique du compte (Mistral La Plateforme propose une option &quot;no-training&quot; par défaut sur les comptes enterprise ; Claude API Workbench permet de désactiver le data sharing ; Azure OpenAI est no-training par défaut), (3) audit RGPD annuel avec exportation des journaux d&apos;accès. Pour les secteurs sensibles (santé HDS, services pro avec secret professionnel), demandez des attestations certifiées.
        </p>
      ),
    },
    {
      heading: "Combien coûte un agent IA souverain vs un agent classique ?",
      anchor: "cout-souverain",
      content: (
        <p>
          Surcoût typique de 15-25 % côté inférence par rapport à un agent OpenAI standard. Exemple : 1 000 conversations/mois sur Mistral Large EU ≈ 180-220 €/mois contre 140-180 € sur GPT-4o standard. Le coût exact varie selon le volume traité, le modèle choisi, l&apos;hébergement retenu et la complexité des workflows. Ce delta est neutralisé par : (a) l&apos;absence de surcoût juridique de conformité (pas d&apos;audit transfert hors UE), (b) la possibilité de candidater à des marchés publics et secteurs réglementés normalement fermés aux solutions non-souveraines, (c) un risque RGPD réduit en cas de contrôle CNIL. Le ROI souverain dépasse souvent le surcoût technique.
        </p>
      ),
    },
  ],
  comparison: {
    title: "Mistral vs Claude EU vs Azure OpenAI France",
    columns: ["Critère", "Mistral", "Claude EU", "Azure OpenAI"],
    rows: [
      { label: "Hébergement", values: ["Paris", "Anthropic EU region", "France Central"] },
      { label: "Garantie no-training", values: ["✓ Par défaut", "✓ Configurable", "✓ Par défaut"] },
      { label: "DPA standard", values: ["✓ Disponible", "✓ Disponible", "✓ Microsoft EU"] },
      { label: "Latence (FR)", values: ["~150 ms", "~250 ms", "~200 ms"] },
      { label: "Idéal pour", values: ["RAG simple, volume", "Raisonnement complexe", "Intégration M365"] },
    ],
  },
  sources: [
    { label: "Inside Privacy — 53 % blocage data residency", url: "https://www.insideprivacy.com/" },
    { label: "CNIL — Position agentic AI 2025", url: "https://www.cnil.fr/" },
    { label: "Mistral AI — Enterprise privacy", url: "https://mistral.ai/security" },
    { label: "Anthropic — Privacy & data usage", url: "https://www.anthropic.com/legal" },
  ],
  faq: [
    {
      question: "Un agent IA hébergé hors UE peut-il être RGPD compatible ?",
      answer:
        "Théoriquement oui (clauses contractuelles types, Data Privacy Framework US-EU), mais en pratique le risque juridique reste élevé après l'invalidation du Privacy Shield. Pour les données sensibles ou réglementées (santé, juridique, public), l'hébergement EU est quasi-obligatoire.",
    },
    {
      question: "Quelle différence entre Mistral et Claude EU sur la souveraineté ?",
      answer:
        "Mistral est 100 % français (modèle, infrastructure, contrat). Claude EU est américain (Anthropic) avec hébergement EU et contrat UE — souverain au sens technique mais pas au sens géopolitique. Mistral est préféré pour les marchés publics ; Claude EU pour la qualité de raisonnement.",
    },
    {
      question: "Les données indexées en RAG sont-elles aussi soumises au RGPD ?",
      answer:
        "Oui, à 100 %. Le RGPD s'applique à toute donnée personnelle quel que soit le format. Indexer un PDF contenant un nom + une adresse e-mail est un traitement de données personnelles qui doit être documenté, sécurisé et purgeable sous 24 h sur demande.",
    },
  ],
  relatedLinks: [
    { label: "Agents IA — N besoins, votre métier", href: "/agents-ia" },
    { label: "RAG sur vos data", href: "/rag" },
    { label: "FAQ — Sécurité & RGPD", href: "/faq#securite-rgpd" },
  ],
  pillarLink: { label: "Découvrir nos agents IA", href: "/agents-ia" },
};

const ragVsFineTuning: Article = {
  slug: "rag-vs-fine-tuning-quoi-choisir-entreprise",
  title: "RAG vs fine-tuning : que choisir pour votre entreprise en 2026 ?",
  description:
    "RAG vs fine-tuning : différences techniques, coûts, cas d'usage, ROI. Pourquoi 95 % des projets entreprise choisissent RAG en 2026, et les 5 % où le fine-tuning gagne.",
  tldr:
    "RAG dans 95 % des cas d'usage entreprise : la base de connaissances change tous les jours, RAG permet la mise à jour temps réel et la traçabilité des sources. Fine-tuning pertinent dans les cas niche (génération code propriétaire, ton de marque très spécifique, contraintes latence extrêmes). Coût RAG typique : 100-1 000 €/mois selon volume et corpus. Coût fine-tuning : 2 000-15 000 € par cycle selon la qualité du dataset. Prix indicatifs qui peuvent varier selon la complexité du projet et les fonctionnalités demandées.",
  category: "RAG",
  publishedAt: "2026-06-08",
  keywords: [
    "RAG vs fine-tuning",
    "RAG entreprise",
    "embedding vectoriel",
    "pgvector",
    "Pinecone",
    "Qdrant",
    "LLM fine-tuning coût",
  ],
  glossary: [
    {
      term: "RAG",
      definition:
        "Retrieval-Augmented Generation : le LLM répond à partir de passages retrouvés dans une base vectorielle indexée sur vos documents, avec citations sources.",
    },
    {
      term: "Fine-tuning",
      definition:
        "Réentraînement supervisé d'un LLM open source ou propriétaire sur un corpus spécifique pour ajuster ses comportements, ton ou vocabulaire.",
    },
    {
      term: "Embedding",
      definition:
        "Représentation vectorielle (typiquement 768-3072 dimensions) d'un fragment de texte, permettant la recherche par similarité sémantique.",
    },
  ],
  sections: [
    {
      heading: "Qu'est-ce que le RAG et comment fonctionne-t-il ?",
      anchor: "rag-fonctionnement",
      content: (
        <p>
          RAG (Retrieval-Augmented Generation) découpe vos documents en chunks (typiquement 500-1500 caractères), génère un embedding par chunk via un modèle dédié (text-embedding-3-large d&apos;OpenAI, bge-m3, Mistral Embed), stocke ces vecteurs dans une base spécialisée (pgvector intégré PostgreSQL, Pinecone, Qdrant, Weaviate), et lors d&apos;une question retrouve les chunks pertinents par similarité cosinus pour les passer au LLM comme contexte. Selon Techment, 70 % des initiatives GenAI enterprise 2026 reposent sur RAG.
        </p>
      ),
    },
    {
      heading: "Quand le fine-tuning a-t-il du sens ?",
      anchor: "fine-tuning-cas",
      content: (
        <p>
          Trois cas où le fine-tuning surpasse le RAG : (1) <strong>ton de marque très spécifique</strong> (assistant éditorial pour une marque luxe avec voix unique difficilement encodable en prompt système), (2) <strong>génération de code propriétaire</strong> (DSL interne, framework non public, conventions spécifiques), (3) <strong>contraintes de latence extrêmes</strong> (chatbot grand public à 1 000 req/s où chaque ms compte). Pour 95 % des cas business B2B, le RAG suffit et coûte 10× moins cher.
        </p>
      ),
    },
    {
      heading: "Quel est le coût comparé du RAG vs fine-tuning ?",
      anchor: "cout-compare",
      content: (
        <p>
          <strong>RAG :</strong> infrastructure pgvector ≈ 50 €/mois (PostgreSQL managé) ; embeddings d&apos;indexation initiale ≈ 0,02 €/1k tokens × volume corpus ; inference LLM ≈ 0,15-1,5 €/1k tokens selon modèle. Total typique PME : 100-1 000 €/mois selon volume et fréquence d&apos;usage. <strong>Fine-tuning :</strong> jeu de données labellisé 5-20 k échantillons (coût annotation 2 000-10 000 €), GPU rental 300-1 500 € par cycle, infrastructure hosting modèle fine-tuné 100-1 000 €/mois. Total typique : 2 000-15 000 € par cycle + run mensuel — à reconduire dès que la connaissance évolue. Ces prix peuvent varier selon la complexité du projet, les fonctionnalités demandées et les intégrations. Notre audit gratuit chiffre les deux scénarios sur votre cas réel.
        </p>
      ),
    },
    {
      heading: "Peut-on combiner RAG et fine-tuning ?",
      anchor: "combinaison",
      content: (
        <p>
          Oui, et c&apos;est l&apos;approche &quot;Pareto-optimale&quot; pour les cas avancés. Fine-tuning léger pour ajuster le ton et le vocabulaire métier (corpus de 500-2 000 exemples soigneusement choisis), RAG pour la connaissance factuelle qui change quotidiennement. Le modèle fine-tuné parle &quot;votre langue&quot; ; le RAG l&apos;informe des dernières données. Cette architecture est typique dans les cabinets juridiques de premier rang ou les services support haut de gamme.
        </p>
      ),
    },
  ],
  comparison: {
    title: "RAG vs fine-tuning : matrice de comparaison",
    columns: ["Critère", "RAG", "Fine-tuning"],
    rows: [
      { label: "Mise à jour des connaissances", values: ["Temps réel (minutes)", "Réentraînement complet"] },
      { label: "Coût initial", values: ["100-1 000 €", "2 000-15 000 €"] },
      { label: "Coût run mensuel", values: ["100-1 000 €/mois", "+100-1 000 €/mois (hosting)"] },
      { label: "Traçabilité sources", values: ["✓ Citations affichées", "✗ Boîte noire"] },
      { label: "Hallucinations", values: ["Contrôlables (refus seuil)", "Plus fréquentes"] },
      { label: "Idéal pour", values: ["Connaissance qui change", "Ton/style figé"] },
    ],
  },
  sources: [
    { label: "Techment — 70 % des initiatives GenAI sur RAG", url: "https://www.techment.com/" },
    { label: "Seekr — Hallucination tax field guide", url: "https://www.seekr.com/" },
    { label: "Pinecone — RAG vs fine-tuning research", url: "https://www.pinecone.io/" },
  ],
  faq: [
    {
      question: "Combien de documents minimum pour démarrer un RAG ?",
      answer:
        "Aucun minimum. Vous pouvez démarrer avec 10 PDF si c'est votre référentiel utile. La qualité du RAG dépend plus de la pertinence et de la fraîcheur des documents que de leur volume. Les très gros corpus (>100 k documents) nécessitent simplement une stratégie de chunking et de re-ranking plus fine.",
    },
    {
      question: "Combien de temps pour mettre un RAG en production ?",
      answer:
        "Un RAG simple sur Notion ou Drive avec 1-2 connecteurs peut être en production en 1-2 semaines. Un RAG multi-sources avec permissions par rôle et audit RGPD demande 4-8 semaines.",
    },
    {
      question: "Le fine-tuning peut-il remplacer un agent IA complet ?",
      answer:
        "Non. Le fine-tuning ajuste un modèle, mais un agent nécessite aussi : connexion à vos outils, garde-fous métier, monitoring, validation humaine. Fine-tuning = composant du moteur ; agent = chaîne complète K→R→A→M.",
    },
  ],
  relatedLinks: [
    { label: "RAG sur vos data", href: "/rag" },
    { label: "Agents IA — Anatomie K→R→A→M", href: "/agents-ia" },
    { label: "FAQ — RAG & mémoire métier", href: "/faq#rag-memoire" },
  ],
  pillarLink: { label: "Voir notre offre RAG", href: "/rag" },
};

const automatiserTriMails: Article = {
  slug: "automatiser-tri-mails-pme-2026",
  title: "Comment automatiser le tri des mails pour une PME française en 2026",
  description:
    "Tri automatique des mails pour PME : agent IA Gmail/Outlook qui range par urgence, répond aux FAQ, escalade au bon humain. Gains, coûts, intégrations.",
  tldr:
    "Un agent IA bien configuré trie l'inbox d'une PME et répond aux courants en quelques secondes, libérant 8h/semaine pour un dirigeant et jusqu'à 200h/mois pour un cabinet. Intégrations Gmail/Outlook/Front, escalade contextuelle au bon humain, seuil de confiance configurable, ton de marque préservé. Coût indicatif : 100-800 €/mois selon volume traité, nombre de boîtes connectées et niveau d'automatisation. Prix variables — à la hausse ou à la baisse — selon la complexité et les fonctionnalités demandées.",
  category: "Automatisation",
  publishedAt: "2026-06-08",
  keywords: [
    "tri mails PME",
    "agent IA email",
    "inbox triage",
    "Gmail automatisation",
    "Outlook agent",
    "Front IA",
  ],
  glossary: [
    {
      term: "Triage",
      definition:
        "Catégorisation automatique des messages entrants par urgence, intention et destinataire approprié.",
    },
    {
      term: "Hand-off",
      definition:
        "Transfert d'une conversation à un humain quand l'agent atteint son seuil de confiance ou de compétence.",
    },
    {
      term: "Ton de marque",
      definition:
        "Voix et style éditorial constants — formel, chaleureux, technique, etc. — préservés par prompt système et exemples.",
    },
  ],
  sections: [
    {
      heading: "Combien de temps perd-on vraiment dans son inbox ?",
      anchor: "temps-perdu",
      content: (
        <p>
          Données terrain documentées : un cabinet médical perd ≈ 200 h/mois sur l&apos;administratif inbox (RDV, confirmations, demandes courantes), un dirigeant de PME y consacre 8 h/semaine en moyenne, un commercial perd 70 % de son temps en administratif dont une bonne part en mails de suivi (source{" "}
          <a href="https://www.sybill.ai/" target="_blank" rel="noopener noreferrer" className="text-cyan underline-offset-4 hover:underline">Sybill 2025</a>). Sur 250 jours ouvrés, ce sont 400-2 000 h/an récupérables par organisation — équivalent 0,25 à 1 ETP.
        </p>
      ),
    },
    {
      heading: "Comment un agent IA trie-t-il une boîte mail concrètement ?",
      anchor: "comment-trie",
      content: (
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Classification :</strong> chaque mail entrant est analysé pour intention (demande info, RDV, plainte, opportunité) et urgence (immédiat, courant, low priority).</li>
          <li><strong>Réponse automatique aux FAQ :</strong> si le mail correspond à un cas connu (horaires, tarifs, procédure standard), réponse rédigée avec votre ton de marque, envoyée si confiance &gt; 85 %.</li>
          <li><strong>Pré-rédaction draft :</strong> si la demande est plus complexe mais standardisable, draft prêt à valider en un clic.</li>
          <li><strong>Escalade contextualisée :</strong> au bon humain (commercial pour opportunité, support pour problème technique, direction pour urgence), avec résumé et historique.</li>
          <li><strong>Mise à jour CRM :</strong> nouvelle interaction loggée automatiquement.</li>
        </ol>
      ),
    },
    {
      heading: "Avec quels outils l'agent se branche-t-il ?",
      anchor: "outils",
      content: (
        <p>
          Côté inbox : Gmail (API native), Outlook 365 (Microsoft Graph), Front (helpdesk multi-canal), Help Scout, Intercom, Zendesk. Côté CRM pour logger : HubSpot, Salesforce, Axonaut, Pipedrive, Notion CRM. Côté humain pour escalade : Slack, Microsoft Teams, e-mail interne, SMS pour urgences. Les connecteurs sont OAuth standard, déploiement en 2-5 jours selon le stack.
        </p>
      ),
    },
    {
      heading: "Combien coûte la mise en place et le run mensuel ?",
      anchor: "cout",
      content: (
        <p>
          <strong>Setup initial</strong> (audit, configuration, fine-tuning des classifications, intégrations) : 800-3 000 € selon le nombre de boîtes connectées et la complexité du tri. <strong>Run mensuel :</strong> 100-800 € selon le volume de mails traités (inclus modèles LLM, hébergement EU, monitoring 24/7). Ces prix peuvent varier — à la hausse ou à la baisse — selon la complexité du projet, les fonctionnalités demandées et les intégrations. À comparer aux 8 h/sem × 4 sem × coût horaire chargé d&apos;un dirigeant (≈ 80-150 €/h) = 2 500-5 000 €/mois de temps libéré. ROI typique : 3-5× sur le premier semestre. Audit gratuit pour chiffrer précisément votre cas.
        </p>
      ),
    },
  ],
  comparison: {
    title: "Tri mails manuel vs agent IA",
    columns: ["Critère", "Manuel", "Agent IA"],
    rows: [
      { label: "Temps moyen / mail", values: ["3-7 minutes", "5-15 secondes"] },
      { label: "Disponibilité", values: ["Heures bureau", "24/7"] },
      { label: "Cohérence ton de marque", values: ["Variable selon collab.", "100 % stable"] },
      { label: "Coût mensuel équivalent", values: ["2 500-5 000 €", "100-800 €"] },
      { label: "Risque erreur sur cas sensible", values: ["Modéré (fatigue)", "Très faible (escalade)"] },
    ],
  },
  sources: [
    { label: "Sybill 2025 — 70 % temps commercial perdu admin", url: "https://www.sybill.ai/" },
    { label: "Intentionally Inspirational — 200 h/mois admin cabinet médical", url: "https://intentionallyinspirational.com/" },
    { label: "Gartner — 80 % tickets autonomes d'ici 2029", url: "https://www.gartner.com/" },
  ],
  faq: [
    {
      question: "L'agent répond-il vraiment ou prépare-t-il juste des drafts ?",
      answer:
        "Configurable selon votre niveau de confort. Mode draft (l'agent prépare, vous validez en un clic), mode auto (l'agent répond directement aux cas confiance > 85 %, draft sinon), mode proactif (l'agent suggère même des réponses anticipées). Ces seuils sont ajustables par catégorie.",
    },
    {
      question: "Comment garantir le ton de marque ?",
      answer:
        "Trois leviers : (1) prompt système avec voix de marque détaillée, (2) corpus de 50-200 réponses exemplaires de votre équipe, (3) validation des 10 premières réponses live par un collaborateur référent. Ajustement continu sur 2-4 semaines.",
    },
    {
      question: "Que se passe-t-il si l'agent fait une erreur ?",
      answer:
        "Logs structurés de chaque action, audit complet, possibilité de rappel/correction sur la conversation, ajustement immédiat du prompt ou seuil. La majorité des erreurs viennent d'un seuil de confiance trop bas — ajustable en quelques minutes.",
    },
  ],
  relatedLinks: [
    { label: "Agents IA — N besoins, votre métier", href: "/agents-ia" },
    { label: "Automatisation — JobPhoning → Axonaut", href: "/automatisation" },
    { label: "FAQ — Agents IA", href: "/faq#agents-ia" },
  ],
  pillarLink: { label: "Découvrir les agents IA", href: "/agents-ia" },
};

const factureElectroniqueChorusPro: Article = {
  slug: "facture-electronique-chorus-pro-2026-obligation",
  title: "Facture électronique obligatoire 2026 : Chorus Pro, PDP, Factur-X — guide PME",
  description:
    "Facture électronique 2026 : qui est concerné, quand, comment se mettre en conformité avec Chorus Pro, PDP agréée et format Factur-X. Calendrier officiel, sanctions, automatisation.",
  tldr:
    "Septembre 2026 : toutes les entreprises françaises doivent pouvoir recevoir des factures électroniques. Émission obligatoire à partir de septembre 2027 (grandes entreprises) puis septembre 2028 (PME et TPE). Trois options : Portail Public de Facturation (PPF), Plateforme de Dématérialisation Partenaire (PDP) agréée, ou solution opérateur de dématérialisation (OD).",
  category: "Automatisation",
  publishedAt: "2026-06-08",
  keywords: [
    "facture électronique 2026",
    "Chorus Pro",
    "PDP DGFiP",
    "Factur-X",
    "obligation facturation septembre 2026",
    "PME conformité facture",
  ],
  glossary: [
    {
      term: "PDP",
      definition:
        "Plateforme de Dématérialisation Partenaire — opérateur privé agréé par la DGFiP pour émettre, transmettre et recevoir des factures électroniques.",
    },
    {
      term: "Factur-X",
      definition:
        "Format hybride PDF/XML porté par le FNFE-MPE, compatible avec les obligations françaises et européennes (EN 16931).",
    },
    {
      term: "PPF",
      definition:
        "Portail Public de Facturation — solution gratuite gérée par l'État via Chorus Pro, alternative aux PDP privées.",
    },
  ],
  sections: [
    {
      heading: "Qui est concerné par l'obligation 2026 et selon quel calendrier ?",
      anchor: "calendrier",
      content: (
        <p>
          Toutes les entreprises françaises sont concernées, avec un calendrier en plusieurs vagues. <strong>1er septembre 2026 :</strong> obligation de réception pour toutes les entreprises, quelle que soit leur taille. <strong>1er septembre 2027 :</strong> obligation d&apos;émission pour les grandes entreprises et ETI. <strong>1er septembre 2028 :</strong> obligation d&apos;émission pour les PME et TPE. Source : article 153 de la loi de finances 2020 modifié par la loi de finances 2024.
        </p>
      ),
    },
    {
      heading: "Quelle différence entre Chorus Pro (PPF), une PDP et un OD ?",
      anchor: "chorus-pdp-od",
      content: (
        <p>
          <strong>Chorus Pro (PPF) :</strong> gratuit, géré par l&apos;État (DGFiP/AIFE), interface basique mais conforme. Risque : pas d&apos;intégration native avec vos outils métier. <strong>PDP (Plateforme de Dématérialisation Partenaire) :</strong> opérateur privé agréé (Yooz, Pennylane, Sage, Cegid, Doctolib, etc.), services à valeur ajoutée (intégration ERP, archivage à valeur probante, automatisation). <strong>OD (Opérateur de Dématérialisation) :</strong> opérateur non agréé mais raccordé à une PDP — solution intermédiaire pour les éditeurs métier.
        </p>
      ),
    },
    {
      heading: "Comment automatiser la conformité avec un agent IA ?",
      anchor: "automatisation-ia",
      content: (
        <p>
          Un agent IA branché à votre comptabilité ou ERP peut : (1) <strong>extraire</strong> les données d&apos;une facture reçue (fournisseur, montant, TVA, date) avec un taux de précision &gt; 95 % via OCR + LLM, (2) <strong>valider</strong> contre vos règles métier (engagement, bon de commande, seuil d&apos;alerte), (3) <strong>imputer</strong> automatiquement la dépense au bon compte comptable, (4) <strong>archiver</strong> avec valeur probante (NF Z42-013), (5) <strong>générer</strong> les factures sortantes au format Factur-X depuis votre outil métier. Économie typique : 3-5 minutes par facture sur les opérations courantes.
        </p>
      ),
    },
    {
      heading: "Quelles sanctions en cas de non-conformité ?",
      anchor: "sanctions",
      content: (
        <p>
          Amende de 15 € par facture non émise sous forme électronique, plafonnée à 15 000 €/an par redevable. Pour la réception non conforme : amende de 250 € par facture refusée non électroniquement, plafonnée à 15 000 €/an. Au-delà du risque financier, la non-conformité bloque les flux avec les grandes entreprises et l&apos;administration publique. Recommandation : se préparer 6-12 mois avant l&apos;échéance pour éviter le rush et négocier sa PDP en bonne position.
        </p>
      ),
    },
  ],
  comparison: {
    title: "Chorus Pro vs PDP privée : choisir sa solution",
    columns: ["Critère", "Chorus Pro (PPF)", "PDP privée"],
    rows: [
      { label: "Coût", values: ["Gratuit", "5-50 €/mois selon volume"] },
      { label: "Intégration ERP/compta", values: ["Limité", "Native (Sage, Cegid, etc.)"] },
      { label: "Archivage valeur probante", values: ["Basique", "Conforme NF Z42-013"] },
      { label: "Support fonctionnel", values: ["Auto-service", "Service client dédié"] },
      { label: "Idéal pour", values: ["TPE faible volume", "PME / ETI avec ERP"] },
    ],
  },
  sources: [
    { label: "DGFiP — Réforme facture électronique", url: "https://www.impots.gouv.fr/professionnel/je-passe-la-facture-electronique" },
    { label: "FNFE-MPE — Spécifications Factur-X", url: "https://fnfe-mpe.org/" },
    { label: "Yooz — Baromètre facture électronique 2025", url: "https://www.getyooz.com/" },
  ],
  faq: [
    {
      question: "Quelle PDP choisir pour une PME française ?",
      answer:
        "Dépend de votre stack. PME avec Sage/Cegid : préférer la PDP de votre éditeur (intégration native). PME avec ERP custom : Yooz, Pennylane, Doctolib (santé) ou Libeo. TPE très simple : Chorus Pro suffit. Comparez : intégration ERP, services à valeur ajoutée, prix par volume, archivage probant.",
    },
    {
      question: "Faut-il modifier sa comptabilité pour être conforme ?",
      answer:
        "Non, votre logiciel de comptabilité doit se connecter à une PDP ou Chorus Pro, mais le plan comptable et les processus restent identiques. La plupart des éditeurs majeurs (Sage, Cegid, EBP, Pennylane, etc.) intègrent nativement cette connexion.",
    },
    {
      question: "Combien coûte la mise en conformité ?",
      answer:
        "Setup initial typique : 500-2 000 € (intégration PDP, paramétrage, formation des équipes) selon votre stack et le volume de factures. Coût récurrent : 5-50 €/mois pour l'abonnement PDP selon volume. Ces prix peuvent varier — à la hausse ou à la baisse — selon la complexité du projet et les fonctionnalités demandées. Le ROI vient de l'économie de manipulation (3-5 min/facture × volume × coût horaire). Pour une PME émettant 100 factures/mois, retour sur investissement typique sous 6 mois. Audit gratuit pour choisir la bonne PDP et chiffrer votre intégration.",
    },
  ],
  relatedLinks: [
    { label: "Automatisation — JobPhoning → Axonaut", href: "/automatisation" },
    { label: "Applications métier — Services pro", href: "/applications" },
    { label: "FAQ — Méthode & pricing", href: "/faq#methode-pricing" },
  ],
  pillarLink: { label: "Découvrir l'automatisation", href: "/automatisation" },
};

export const ARTICLES: Article[] = [
  auditApplicationMetier,
  agentIaRgpdSouverain,
  ragVsFineTuning,
  automatiserTriMails,
  factureElectroniqueChorusPro,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
