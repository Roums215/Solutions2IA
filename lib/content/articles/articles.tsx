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
    "Audit d'application métier : 5 étapes pour cartographier l'existant, chiffrer la dette technique et décider entre refonte ciblée et reconstruction.",
  tldr:
    "Un audit d'application métier en 5 étapes : (1) cartographie du code et des données, (2) parcours utilisateurs réels, (3) friction et dette technique chiffrée, (4) arbitrage refonte ciblée vs reconstruction, (5) trajectoire de migration sans coupure. Méthode par sprints courts, premier échange gratuit.",
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
        "Réécriture progressive module par module : l'ancien et le nouveau cohabitent jusqu'à la bascule complète.",
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
          Trois signaux convergents : (1) chaque nouvelle fonctionnalité prend trois fois plus de temps qu&apos;avant, (2) les équipes contournent l&apos;application via Excel ou Notion pour leurs vrais gestes, (3) la documentation est obsolète et la connaissance repose sur deux personnes. Beaucoup de projets IA échouent parce que les données et processus sous-jacents n&apos;ont jamais été audités. Avant d&apos;ajouter de l&apos;IA ou de migrer, audit.
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
          <li><strong>Trajectoire :</strong> plan de migration sans coupure (modules réécrits un à un), démarrage sur le module à plus fort levier, métriques d&apos;adoption définies ensemble avant le départ.</li>
        </ol>
      ),
    },
    {
      heading: "Combien coûte un audit d'application métier ?",
      anchor: "cout-audit",
      content: (
        <p>
          Selon le périmètre et l&apos;ancienneté du code, comptez entre 1 000 € (audit léger 1-2 modules) et 5 000 € (audit complet d&apos;une plateforme métier 50+ écrans avec dette technique chiffrée et trajectoire de migration documentée). Ces prix peuvent varier, à la hausse ou à la baisse, selon la complexité du projet, le nombre de modules à analyser et les intégrations à cartographier. Ce coût se rentabilise dès le premier trimestre si la décision optimale évite 3 mois de refonte mal cadrée. Règle empirique : 5-10 % du budget de refonte cible. Audit gratuit de cadrage offert avant tout engagement.
        </p>
      ),
    },
    {
      heading: "Faut-il refondre ou reconstruire ?",
      anchor: "refondre-reconstruire",
      content: (
        <p>
          Refondre quand : (a) le métier n&apos;a pas radicalement changé, (b) 60 %+ des entités de données restent valides, (c) la dette technique est concentrée sur 2-3 modules identifiables. Reconstruire quand : (a) le modèle métier a évolué (passage B2C → B2B par ex.), (b) les bibliothèques/frameworks sont en fin de vie sans chemin de migration, (c) plus de 80 % du code doit être réécrit. Dans la plupart des cas rencontrés, la refonte ciblée gagne : moins risquée, valeur livrée plus vite.
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
    { label: "Seekr : Hallucination tax field guide", url: "https://www.seekr.com/" },
    { label: "McKinsey : State of AI 2024", url: "https://www.mckinsey.com/" },
    { label: "BPI France : Guide transformation digitale PME", url: "https://www.bpifrance.fr/" },
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
        "Non recommandé. L'audit est précisément là pour éviter les choix prématurés. Les hypothèses qu'on a avant l'audit ne survivent presque jamais aux observations terrain : voilà pourquoi il faut séquencer.",
    },
  ],
  relatedLinks: [
    { label: "Méthode 2IA : Audit, Build, Pilote 30j, Run", href: "/applications#methode" },
    { label: "Applications métier sur mesure", href: "/applications" },
    { label: "FAQ : Méthode & pricing", href: "/faq#methode-pricing" },
  ],
  pillarLink: { label: "Voir les applications métier", href: "/applications" },
};

const agentIaRgpdSouverain: Article = {
  slug: "agent-ia-rgpd-souverain-france-ue",
  title: "Agent IA souverain en France : RGPD, hébergement UE, Mistral vs Claude",
  description:
    "Agent IA RGPD compatible et hébergé en France ou UE : panorama Mistral vs Claude EU, garanties DPA, isolation par client, audit possible. Guide PME 2026.",
  tldr:
    "Un agent IA souverain combine modèle hébergé en France ou UE (Mistral à Paris, Claude EU), infrastructure RGPD compatible (OVH, Scaleway), contrats DPA signés et garanties de non-entraînement sur vos données. La localisation des données est souvent le premier frein à l'adoption d'IA. L'architecture européenne lève ce frein.",
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
        "Data Processing Agreement : contrat de sous-traitance imposé par l'article 28 du RGPD entre responsable de traitement et sous-traitant IT.",
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
          Un agent IA souverain garantit trois propriétés cumulées : (1) le modèle IA tourne sur de l&apos;infrastructure physiquement en UE (Mistral Large à Paris, Claude EU dans la région européenne d&apos;Anthropic, Azure OpenAI région France), (2) la donnée applicative (mémoire d&apos;entreprise, logs, conversations) est stockée chez un hébergeur EU (OVH, Scaleway, Supabase Francfort), (3) le contrat exclut explicitement l&apos;entraînement sur les prompts/réponses clients. La localisation des données est souvent le premier frein cité à l&apos;adoption d&apos;IA dans les entreprises.
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
    { label: "Inside Privacy : data residency et adoption IA", url: "https://www.insideprivacy.com/" },
    { label: "CNIL : Position agentic AI 2025", url: "https://www.cnil.fr/" },
    { label: "Mistral AI : Enterprise privacy", url: "https://mistral.ai/security" },
    { label: "Anthropic : Privacy & data usage", url: "https://www.anthropic.com/legal" },
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
        "Mistral est 100 % français (modèle, infrastructure, contrat). Claude EU est américain (Anthropic) avec hébergement EU et contrat UE, souverain au sens technique mais pas au sens géopolitique. Mistral est préféré pour les marchés publics ; Claude EU pour la qualité de raisonnement.",
    },
    {
      question: "Les données indexées en RAG sont-elles aussi soumises au RGPD ?",
      answer:
        "Oui, à 100 %. Le RGPD s'applique à toute donnée personnelle quel que soit le format. Indexer un PDF contenant un nom + une adresse e-mail est un traitement de données personnelles qui doit être documenté, sécurisé et purgeable sous 24 h sur demande.",
    },
  ],
  relatedLinks: [
    { label: "Agents IA : vos besoins, votre métier", href: "/agents-ia" },
    { label: "RAG sur vos data", href: "/rag" },
    { label: "FAQ : Sécurité & RGPD", href: "/faq#securite-rgpd" },
  ],
  pillarLink: { label: "Découvrir les agents IA", href: "/agents-ia" },
};

const ragVsFineTuning: Article = {
  slug: "rag-vs-fine-tuning-quoi-choisir-entreprise",
  title: "RAG vs fine-tuning : que choisir pour votre entreprise en 2026 ?",
  description:
    "RAG vs fine-tuning : différences techniques, coûts, cas d'usage, ROI. Quand choisir la mémoire d'entreprise (RAG), et dans quels cas niche le ré-entraînement du modèle s'impose.",
  tldr:
    "La mémoire d'entreprise (RAG) convient à la grande majorité des cas : la base de connaissances change tous les jours, RAG permet la mise à jour temps réel et la traçabilité des sources. Le ré-entraînement du modèle est pertinent dans les cas niche (génération code propriétaire, ton de marque très spécifique, contraintes latence extrêmes). Coût RAG typique : 100-1 000 €/mois selon volume et corpus. Coût ré-entraînement : 2 000-15 000 € par cycle selon la qualité du jeu de données. Prix indicatifs variables selon la complexité.",
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
          RAG (Retrieval-Augmented Generation) découpe vos documents en fragments (typiquement 500-1500 caractères), représente chaque fragment sous forme vectorielle via un modèle dédié (text-embedding-3-large d&apos;OpenAI, bge-m3, Mistral Embed), stocke ces vecteurs dans une base spécialisée (pgvector intégré PostgreSQL, Pinecone, Qdrant, Weaviate), et lors d&apos;une question retrouve les fragments pertinents par similarité de sens pour les passer à l&apos;IA comme contexte. C&apos;est aujourd&apos;hui la méthode dominante pour les projets IA en entreprise.
        </p>
      ),
    },
    {
      heading: "Quand le fine-tuning a-t-il du sens ?",
      anchor: "fine-tuning-cas",
      content: (
        <p>
          Trois cas où le ré-entraînement surpasse la mémoire d&apos;entreprise : (1) <strong>ton de marque très spécifique</strong> (assistant éditorial pour une marque luxe avec voix unique difficilement encodable en prompt système), (2) <strong>génération de code propriétaire</strong> (DSL interne, framework non public, conventions spécifiques), (3) <strong>contraintes de latence extrêmes</strong> (chatbot grand public à 1 000 req/s où chaque ms compte). Pour la grande majorité des cas business B2B, la mémoire d&apos;entreprise suffit et coûte nettement moins cher.
        </p>
      ),
    },
    {
      heading: "Quel est le coût comparé du RAG vs fine-tuning ?",
      anchor: "cout-compare",
      content: (
        <p>
          <strong>Mémoire d&apos;entreprise (RAG) :</strong> infrastructure pgvector ≈ 50 €/mois (PostgreSQL managé) ; indexation initiale ≈ 0,02 €/1k tokens × volume corpus ; inférence IA ≈ 0,15-1,5 €/1k tokens selon modèle. Total typique PME : 100-1 000 €/mois selon volume et fréquence d&apos;usage. <strong>Ré-entraînement du modèle :</strong> jeu de données labellisé 5-20 k échantillons (coût annotation 2 000-10 000 €), location GPU 300-1 500 € par cycle, hébergement du modèle ré-entraîné 100-1 000 €/mois. Total typique : 2 000-15 000 € par cycle + run mensuel, à reconduire dès que la connaissance évolue. Ces prix peuvent varier selon la complexité et les intégrations. Un premier échange gratuit chiffre les deux scénarios sur votre cas réel.
        </p>
      ),
    },
    {
      heading: "Peut-on combiner RAG et fine-tuning ?",
      anchor: "combinaison",
      content: (
        <p>
          Oui, et c&apos;est l&apos;approche la plus efficace pour les cas avancés. Ré-entraînement léger pour ajuster le ton et le vocabulaire métier (corpus de 500-2 000 exemples soigneusement choisis), mémoire d&apos;entreprise pour la connaissance factuelle qui change quotidiennement. Le modèle ré-entraîné parle &quot;votre langue&quot; ; la mémoire d&apos;entreprise l&apos;informe des dernières données. Cette architecture est typique dans les cabinets juridiques de premier rang ou les services support haut de gamme.
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
    { label: "Techment : RAG et projets GenAI enterprise", url: "https://www.techment.com/" },
    { label: "Seekr : Hallucination tax field guide", url: "https://www.seekr.com/" },
    { label: "Pinecone : RAG vs fine-tuning research", url: "https://www.pinecone.io/" },
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
        "Non. Le ré-entraînement ajuste un modèle, mais un agent nécessite aussi : connexion à vos outils, garde-fous métier, monitoring, validation humaine. Ré-entraînement = composant du moteur ; agent = chaîne complète K→R→A→M.",
    },
  ],
  relatedLinks: [
    { label: "RAG sur vos data", href: "/rag" },
    { label: "Agents IA : Anatomie K→R→A→M", href: "/agents-ia" },
    { label: "FAQ : RAG & mémoire métier", href: "/faq#rag-memoire" },
  ],
  pillarLink: { label: "Voir l'offre mémoire d'entreprise", href: "/rag" },
};

const automatiserTriMails: Article = {
  slug: "automatiser-tri-mails-pme-2026",
  title: "Comment automatiser le tri des mails pour une PME française en 2026",
  description:
    "Tri automatique des mails pour PME : agent IA Gmail/Outlook qui range par urgence, répond aux FAQ, escalade au bon humain. Gains, coûts, intégrations.",
  tldr:
    "Un agent IA bien configuré trie l'inbox d'une PME et répond aux messages courants en quelques secondes, libérant plusieurs heures par semaine pour un dirigeant ou une équipe. Intégrations Gmail/Outlook/Front, escalade contextuelle au bon humain, seuil de confiance configurable, ton de marque préservé. Coût indicatif : 100-800 €/mois selon volume traité, nombre de boîtes connectées et niveau d'automatisation. Prix variables selon la complexité et les fonctionnalités demandées.",
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
        "Voix et style éditorial constants (formel, chaleureux, technique, etc.), préservés par prompt système et exemples.",
    },
  ],
  sections: [
    {
      heading: "Combien de temps perd-on vraiment dans son inbox ?",
      anchor: "temps-perdu",
      content: (
        <p>
          Le constat est régulier : les cabinets médicaux passent une part significative de leur temps admin sur l&apos;inbox (RDV, confirmations, demandes courantes) ; un dirigeant de PME y consacre souvent plusieurs heures par semaine ; un commercial perd une bonne partie de son temps sur les mails de suivi et de relance. Ramené à l&apos;année, ce sont des dizaines ou centaines d&apos;heures récupérables par organisation, selon le volume et le type de messages.
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
          <strong>Setup initial</strong> (audit, configuration, ajustement des classifications, intégrations) : 800-3 000 € selon le nombre de boîtes connectées et la complexité du tri. <strong>Run mensuel :</strong> 100-800 € selon le volume de mails traités (inclus modèles IA, hébergement EU, monitoring 24/7). Ces prix peuvent varier selon la complexité et les intégrations. À comparer au temps libéré : 8 h/sem × 4 sem × coût horaire chargé d&apos;un dirigeant (≈ 80-150 €/h) = 2 500-5 000 €/mois de temps récupéré. ROI positif typiquement dès le premier semestre. Premier échange gratuit pour chiffrer votre cas précis.
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
    { label: "Sybill : temps commercial et mails de suivi", url: "https://www.sybill.ai/" },
    { label: "Gartner : IA et automatisation du support", url: "https://www.gartner.com/" },
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
        "Logs structurés de chaque action, audit complet, possibilité de rappel/correction sur la conversation, ajustement immédiat du prompt ou seuil. La majorité des erreurs viennent d'un seuil de confiance trop bas, ajustable en quelques minutes.",
    },
  ],
  relatedLinks: [
    { label: "Agents IA : vos besoins, votre métier", href: "/agents-ia" },
    { label: "Automatisation : JobPhoning → Axonaut", href: "/automatisation" },
    { label: "FAQ : Agents IA", href: "/faq#agents-ia" },
  ],
  pillarLink: { label: "Découvrir les agents IA", href: "/agents-ia" },
};

const factureElectroniqueChorusPro: Article = {
  slug: "facture-electronique-chorus-pro-2026-obligation",
  title: "Facture électronique obligatoire 2026 : Chorus Pro, PDP, Factur-X. Guide PME",
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
        "Plateforme de Dématérialisation Partenaire : opérateur privé agréé par la DGFiP pour émettre, transmettre et recevoir des factures électroniques.",
    },
    {
      term: "Factur-X",
      definition:
        "Format hybride PDF/XML porté par le FNFE-MPE, compatible avec les obligations françaises et européennes (EN 16931).",
    },
    {
      term: "PPF",
      definition:
        "Portail Public de Facturation : solution gratuite gérée par l'État via Chorus Pro, alternative aux PDP privées.",
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
          <strong>Chorus Pro (PPF) :</strong> gratuit, géré par l&apos;État (DGFiP/AIFE), interface basique mais conforme. Risque : pas d&apos;intégration native avec vos outils métier. <strong>PDP (Plateforme de Dématérialisation Partenaire) :</strong> opérateur privé agréé (Yooz, Pennylane, Sage, Cegid, Doctolib, etc.), services à valeur ajoutée (intégration ERP, archivage à valeur probante, automatisation). <strong>OD (Opérateur de Dématérialisation) :</strong> opérateur non agréé mais raccordé à une PDP, solution intermédiaire pour les éditeurs métier.
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
    { label: "DGFiP : Réforme facture électronique", url: "https://www.impots.gouv.fr/professionnel/je-passe-la-facture-electronique" },
    { label: "FNFE-MPE : Spécifications Factur-X", url: "https://fnfe-mpe.org/" },
    { label: "Yooz : Baromètre facture électronique 2025", url: "https://www.getyooz.com/" },
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
        "Setup initial typique : 500-2 000 € (intégration PDP, paramétrage, formation des équipes) selon votre stack et le volume de factures. Coût récurrent : 5-50 €/mois pour l'abonnement PDP selon volume. Ces prix peuvent varier, à la hausse ou à la baisse, selon la complexité du projet et les fonctionnalités demandées. Le ROI vient de l'économie de manipulation (3-5 min/facture × volume × coût horaire). Pour une PME émettant 100 factures/mois, retour sur investissement typique sous 6 mois. Audit gratuit pour choisir la bonne PDP et chiffrer votre intégration.",
    },
  ],
  relatedLinks: [
    { label: "Automatisation : JobPhoning → Axonaut", href: "/automatisation" },
    { label: "Applications métier : Services pro", href: "/applications" },
    { label: "FAQ : Méthode & pricing", href: "/faq#methode-pricing" },
  ],
  pillarLink: { label: "Découvrir l'automatisation", href: "/automatisation" },
};

const combienCouteAgentIaPme: Article = {
  slug: "combien-coute-agent-ia-pme-2026",
  title: "Combien coûte un agent IA pour une PME en 2026 ?",
  description:
    "Agent IA PME 2026 : 3 niveaux de prix chiffrés (800-20 000 € build), coûts cachés à anticiper, sur-mesure vs SaaS comparé. Premier échange gratuit 45 min.",
  tldr:
    "Trois niveaux indicatifs en 2026 : Démarrage 800-2 500 € build + 300-800 €/mois run ; Intermédiaire 2 500-8 000 € + 800-2 000 €/mois ; Complet 8 000-20 000 € + 2 000-4 500 €/mois. Hébergement souverain UE, monitoring 24/7 et hotfix sous 24 h inclus dans chaque niveau. Ces fourchettes varient selon la complexité réelle. Chiffrage précis après un premier échange gratuit de 45 minutes.",
  category: "Agents IA",
  publishedAt: "2026-07-03",
  keywords: [
    "prix agent IA",
    "coût agent IA PME",
    "tarif assistant IA sur mesure",
    "budget agent IA 2026",
    "combien coûte un agent IA",
  ],
  wordCount: 1450,
  glossary: [
    {
      term: "Build",
      definition:
        "Phase de construction de l'agent : audit, configuration, développement des workflows, intégrations et recette. Coût one-shot, facturation au projet.",
    },
    {
      term: "Run",
      definition:
        "Abonnement mensuel post-livraison couvrant l'hébergement souverain UE, les modèles IA, le monitoring 24/7, les mises à jour de prompts et le support.",
    },
    {
      term: "Workflow",
      definition:
        "Chaîne d'actions automatisées qu'exécute l'agent. Exemple : lire un mail → qualifier l'intention → rédiger une réponse → mettre à jour le CRM.",
    },
  ],
  sections: [
    {
      heading: "Qu'est-ce qui fait vraiment varier le prix d'un agent IA ?",
      anchor: "facteurs-prix",
      content: (
        <p>
          Trois leviers déterminent l&apos;essentiel du budget. <strong>Le nombre de workflows :</strong> chaque enchaînement d&apos;actions (trier les mails, qualifier un lead, préparer un devis) représente un bloc à concevoir, tester et valider. Un agent Démarrage couvre 1-2 workflows ; un agent Complet en orchestre 6 à 15. <strong>Les intégrations :</strong> brancher Gmail ou Notion prend 2-5 jours ; connecter un ERP propriétaire ou un outil sans API publique multiplie le temps d&apos;intégration par 3 à 5. <strong>La gouvernance :</strong> logs d&apos;audit structurés, permissions par rôle (RBAC), pipeline de validation humaine sur les actions sensibles, indispensable en environnement réglementé, optionnel pour un premier déploiement interne. Ces trois paramètres expliquent pourquoi deux PME avec des besoins similaires peuvent recevoir des devis très différents : ce sont les détails du terrain réel qui font la différence.
        </p>
      ),
    },
    {
      heading: "Quels coûts cachés faut-il anticiper ?",
      anchor: "couts-caches",
      content: (
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Tokens API LLM :</strong> chaque conversation traitée consomme des tokens facturés par le fournisseur LLM. 500 conversations/mois sur Claude EU ou Mistral représentent typiquement 30-150 € de tokens selon la longueur des échanges, inclus dans le run mensuel, sans surprise en fin de mois.</li>
          <li><strong>Maintenance des prompts :</strong> votre métier évolue (nouvelles procédures, nouveaux produits, changements réglementaires). Compter 1-4 h/mois de mise à jour des règles métier en régime de croisière (inclus dans le run).</li>
          <li><strong>Évolutions fonctionnelles :</strong> ajouter un workflow après la livraison initiale est facturé séparément, typiquement 500-3 000 € selon la complexité. Définir le bon périmètre dès le premier échange évite ces surcoûts.</li>
          <li><strong>Accompagnement au démarrage :</strong> 2-4 h de formation sont nécessaires pour ancrer les nouveaux gestes dans votre équipe. Ce poste est souvent sous-estimé : c&apos;est pourtant lui qui conditionne l&apos;adoption réelle au-delà des 30 premiers jours.</li>
        </ol>
      ),
    },
    {
      heading: "Comment démarrer avec un budget maîtrisé ?",
      anchor: "demarrer-budget",
      content: (
        <p>
          La règle est simple : commencer par 1 ou 2 workflows à fort levier, mesurer le gain réel sur 30 jours, puis élargir. Un agent Démarrage (800-2 500 € build) sur le cas d&apos;usage le plus chronophage de votre équipe (triage inbox, qualification leads, notes de réunion automatisées) livre des résultats mesurables avant d&apos;engager un budget plus conséquent. Cette approche par étapes courtes réduit le risque : si le premier workflow ne tient pas ses promesses (rare, mais possible), on ajuste avant d&apos;aller plus loin. Elle évite aussi l&apos;erreur classique : acheter trop de fonctionnalités d&apos;un coup, sans avoir validé les cas d&apos;usage de base avec vos vraies données et vos vrais utilisateurs. Les projets IA qui échouent le font presque toujours parce que le terrain réel n&apos;a jamais été audité en amont : c&apos;est précisément ce que l&apos;audit initial (45 min, gratuit) permet d&apos;éviter.
        </p>
      ),
    },
    {
      heading: "Pourquoi le sur-mesure l'emporte sur le SaaS à moyen terme ?",
      anchor: "surmesure-vs-saas",
      content: (
        <p>
          Les solutions SaaS d&apos;agent IA (Intercom, Drift, Monday AI, Zapier AI) démarrent souvent entre 50 et 500 €/mois pour des workflows prédéfinis. Avantage apparent : pas de phase de build. Limites réelles : (1) vous adaptez vos processus à l&apos;outil, pas l&apos;inverse ; (2) les intégrations sont standardisées (si votre CRM est Axonaut ou votre ERP est propriétaire, les connecteurs natifs sont rares) ; (3) la gouvernance reste celle de l&apos;éditeur : hébergement EU, conformité RGPD, audit ne sont pas toujours garantis. À 18-24 mois, une PME qui a payé 300-500 €/mois de SaaS (soit 5 000-12 000 € dépensés) n&apos;est toujours pas autonome sur ses cas d&apos;usage spécifiques. Un agent sur mesure au niveau Intermédiaire (2 500-8 000 € build + 800-2 000 €/mois run) livre la même couverture fonctionnelle sur votre terrain réel, hébergé en UE, avec vos règles métier, et peut évoluer sans changer d&apos;outil.
        </p>
      ),
    },
  ],
  comparison: {
    title: "3 niveaux de tarification pour un agent IA PME",
    columns: ["Niveau", "Build (one-shot)", "Run mensuel", "Périmètre"],
    rows: [
      { label: "Démarrage", values: ["800-2 500 €", "300-800 €/mois", "1-2 workflows, 1 outil intégré"] },
      { label: "Intermédiaire", values: ["2 500-8 000 €", "800-2 000 €/mois", "3-6 workflows, 2-4 outils, dashboards"] },
      { label: "Complet", values: ["8 000-20 000 €", "2 000-4 500 €/mois", "6-15 workflows, gouvernance, audit RGPD"] },
    ],
  },
  sources: [
    { label: "BPI France : Guide transformation digitale PME", url: "https://www.bpifrance.fr/" },
    { label: "McKinsey : State of AI 2024", url: "https://www.mckinsey.com/" },
    { label: "Gartner : IA, automatisation et PME", url: "https://www.gartner.com/" },
  ],
  faq: [
    {
      question: "Peut-on démarrer un agent IA avec moins de 1 000 € ?",
      answer:
        "Oui. Le niveau Démarrage commence à 800 € build pour 1-2 workflows ciblés avec 1 intégration standard (Gmail, Notion, HubSpot). À ce stade, l'agent prend en charge votre cas d'usage à plus fort levier, et le run mensuel (300-800 €) est souvent couvert par le temps libéré si vous valorisez votre heure à 80 €+.",
    },
    {
      question: "Le run mensuel inclut-il les coûts d'API LLM ?",
      answer:
        "Oui. Le run mensuel inclut les coûts de modèles IA (tokens LLM), l'hébergement souverain UE, le monitoring 24/7 et les hotfixes sous 24 h. Le forfait est calibré sur votre usage estimé, sans surprises en fin de mois selon le volume traité.",
    },
    {
      question: "Quel ROI peut-on attendre d'un agent IA PME ?",
      answer:
        "Le ROI se mesure en temps libéré et en erreurs évitées. Un agent qui trie l'inbox de 3 commerciaux et met à jour le CRM automatiquement économise 5-10 h/semaine par collaborateur. À 60-100 €/h chargé, le ROI positif est atteint en 2-4 mois pour un niveau Démarrage. Les projets qui tiennent leurs promesses ont systématiquement un cas d'usage audité et des métriques définies avant le départ.",
    },
    {
      question: "Comment se passe le chiffrage lors du premier échange ?",
      answer:
        "Le premier échange (45 min, gratuit) se déroule en 3 temps : (1) audit rapide du terrain réel (quels outils, quels gestes chronophages, quelles données disponibles) ; (2) identification des 1-3 cas d'usage à plus fort levier ; (3) fourchette de build et run personnalisée. Un devis indicatif est transmis sous 48 h, sans engagement.",
    },
  ],
  relatedLinks: [
    { label: "Agents IA : présentation complète", href: "/agents-ia" },
    { label: "Automatisation : workflows et pipelines", href: "/automatisation" },
    { label: "FAQ : Méthode & pricing", href: "/faq#methode-pricing" },
  ],
  pillarLink: { label: "Découvrir les agents IA", href: "/agents-ia" },
};

const agentIaVsChatbot: Article = {
  slug: "agent-ia-vs-chatbot-quelle-difference",
  title: "Agent IA vs chatbot : quelle différence, lequel choisir ?",
  description:
    "Agent IA vs chatbot : différences concrètes, tableau comparatif, quand le chatbot suffit et quand l'agent s'impose. Guide décision PME 2026, exemple inclus.",
  tldr:
    "Un chatbot répond à des questions selon des scripts prédéfinis, utile pour la FAQ et la qualification entrante. Un agent IA agit : il trie les mails, met à jour le CRM, prépare les devis, enchaîne des actions entre vos outils. Si votre besoin est informatif et stable, un chatbot suffit. Si vous avez besoin d'actions automatisées entre outils, il vous faut un agent.",
  category: "Agents IA",
  publishedAt: "2026-07-03",
  keywords: [
    "agent IA vs chatbot",
    "différence agent IA chatbot",
    "chatbot ou agent IA entreprise",
    "agent IA PME",
    "chatbot intelligent",
  ],
  wordCount: 1350,
  glossary: [
    {
      term: "Chatbot",
      definition:
        "Programme conversationnel qui répond à des questions selon des règles ou scripts prédéfinis, sans capacité d'action dans des outils externes.",
    },
    {
      term: "Agent IA",
      definition:
        "Chaîne d'exécution contrôlée qui sait (base de connaissances), raisonne (règles métier), agit (outils externes) et est supervisée (logs, alertes, hand-off humain).",
    },
    {
      term: "Function calling",
      definition:
        "Capacité d'un LLM à invoquer des fonctions externes typées : la brique technique qui permet à un agent IA d'agir dans vos outils (CRM, email, agenda).",
    },
  ],
  sections: [
    {
      heading: "Qu'est-ce qu'un chatbot et à quoi sert-il réellement ?",
      anchor: "chatbot-definition",
      content: (
        <p>
          Un chatbot est un programme conversationnel. Sa promesse : répondre aux questions fréquentes, guider un visiteur dans un tunnel, qualifier une demande entrante. Les chatbots modernes (Intercom, Crisp, Zendesk Bot) s&apos;appuient sur des scripts arborescents ou des règles LLM légères pour générer des réponses fluides. Ils restent dans la fenêtre de la conversation : ils n&apos;envoient pas d&apos;e-mail, ne mettent pas à jour votre CRM, ne planifient pas de rendez-vous. Leur force est leur simplicité (déployable en quelques heures, maintenable sans compétences techniques) et leur coût limité (30-300 €/mois). Leur limite est structurelle : ils répondent, ils n&apos;agissent pas.
        </p>
      ),
    },
    {
      heading: "Comment un agent IA agit-il là où un chatbot s'arrête ?",
      anchor: "agent-ia-definition",
      content: (
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Il connaît votre contexte :</strong> branché sur vos documents via RAG, il répond avec vos données réelles, pas avec ce que le LLM a mémorisé à l&apos;entraînement.</li>
          <li><strong>Il raisonne sous contraintes :</strong> règles métier explicites, seuils de confiance, validation par conditions. Sur les cas critiques, il n&apos;hallucine pas : il escalade au bon humain.</li>
          <li><strong>Il agit dans vos outils :</strong> via function calling, il écrit un e-mail, crée une opportunité dans HubSpot, bloque un créneau dans Google Calendar, prépare un devis dans Pennylane.</li>
          <li><strong>Il est supervisé :</strong> chaque action est loggée, chaque décision est traçable. Un humain peut reprendre la main à tout moment selon un seuil de confiance configurable.</li>
        </ol>
      ),
    },
    {
      heading: "Quand un simple chatbot suffit ?",
      anchor: "quand-chatbot-suffit",
      content: (
        <p>
          Soyons directs : un chatbot suffit dans plusieurs cas courants. Si votre objectif se limite à répondre aux questions FAQ de votre site (horaires, tarifs, procédures), à qualifier un visiteur entrant avec 3-5 questions et transmettre ses coordonnées à un commercial, ou à guider un utilisateur dans un formulaire complexe : un chatbot bien configuré fait le travail pour 50-300 €/mois, sans infrastructure complexe. Inutile de sur-engineer une solution agent IA si le besoin est statique et purement informatif. Cette honnêteté est précisément ce qui construit la confiance : un bon prestataire vous dit quand vous n&apos;avez pas besoin de lui.
        </p>
      ),
    },
    {
      heading: "Quand un agent IA devient-il nécessaire ?",
      anchor: "quand-agent-ia",
      content: (
        <p>
          L&apos;agent s&apos;impose dès que vous avez besoin d&apos;actions, pas seulement de réponses. Exemples concrets : (a) <strong>Support client :</strong> classer les demandes, résoudre les cas courants, escalader les complexes avec résumé, sans que votre équipe touche à l&apos;inbox ; (b) <strong>Commercial :</strong> qualifier les leads entrants, les enrichir depuis LinkedIn, créer l&apos;opportunité dans le CRM, envoyer l&apos;e-mail de suivi personnalisé ; (c) <strong>Opérations :</strong> lire les comptes-rendus de réunion, extraire les actions, les attribuer dans votre outil de suivi, relancer les retardataires ; (d) <strong>Finance :</strong> extraire les données d&apos;une facture reçue, valider contre vos règles métier, imputer en comptabilité. Dans ces cas, un chatbot ne peut que prendre note. Seul un agent ferme la boucle.
        </p>
      ),
    },
    {
      heading: "Comment chatbot et agent IA se combinent dans une PME ?",
      anchor: "combinaison",
      content: (
        <p>
          La configuration la plus efficace pour une PME : un chatbot sur le site pour la qualification entrante (rapide, économique, disponible immédiatement) + un agent IA en back-office pour les processus métier (plus complexe, plus puissant, coût justifié par le temps libéré). Exemple concret d&apos;un cabinet de conseil de 12 personnes : le chatbot du site répond aux questions générales et collecte les coordonnées des prospects. L&apos;agent IA, lui, enrichit la fiche dans HubSpot, analyse le contexte de la demande, prépare un briefing pour le commercial concerné et bloque un créneau de démo dans son agenda, sans intervention humaine. Le commercial arrive en rendez-vous avec un dossier préparé, pas un formulaire à lire.
        </p>
      ),
    },
  ],
  comparison: {
    title: "Chatbot vs agent IA : matrice comparative",
    columns: ["Critère", "Chatbot", "Agent IA"],
    rows: [
      { label: "Action principale", values: ["Répond", "Agit"] },
      { label: "Intégration outils", values: ["Aucune (ou webhook simple)", "CRM, email, agenda, ERP"] },
      { label: "Base de connaissances", values: ["Scripts ou règles fixes", "RAG sur vos documents réels"] },
      { label: "Coût mensuel indicatif", values: ["30-300 €", "300-4 500 €"] },
      { label: "Cas d'usage type", values: ["FAQ, qualification entrante", "Support autonome, back-office"] },
      { label: "Limite principale", values: ["Ne ferme pas la boucle", "Nécessite un audit terrain"] },
    ],
  },
  sources: [
    { label: "Gartner : IA et automatisation du support", url: "https://www.gartner.com/" },
    { label: "McKinsey : State of AI 2024", url: "https://www.mckinsey.com/" },
    { label: "CNIL : Position agentic AI 2025", url: "https://www.cnil.fr/" },
  ],
  faq: [
    {
      question: "Un chatbot peut-il évoluer vers un agent IA ?",
      answer:
        "Techniquement oui, mais pratiquement c'est souvent une reconstruction. Un chatbot basé sur des scripts ou un LLM léger (Intercom, Crisp) n'a pas l'architecture nécessaire pour les intégrations, la gestion des états et la traçabilité des actions. Mieux vaut concevoir un agent dès le départ si le besoin final est l'action, pas seulement la réponse.",
    },
    {
      question: "Quel est le coût d'un agent IA vs un chatbot pour une PME ?",
      answer:
        "Un chatbot coûte 30-300 €/mois en abonnement SaaS. Un agent IA sur mesure : 800-2 500 € build + 300-800 €/mois pour un niveau Démarrage. La différence de coût se justifie si l'agent économise 5-10 h/semaine à votre équipe : le ROI positif est atteint en 2-4 mois dans la majorité des cas.",
    },
    {
      question: "Mon équipe craint que l'agent IA remplace des postes : que répondre ?",
      answer:
        "Un agent IA prend en charge les gestes répétitifs (tri inbox, mise à jour CRM, notes de réunion, relances) pour libérer du temps sur ce qui compte vraiment. Les retours terrain montrent des gains nets : moins de temps administratif, plus de temps sur le cœur de métier, moins d'erreurs de saisie. La communication interne autour du changement est aussi importante que l'outil : un agent imposé sans explication génère de la résistance, pas de la performance.",
    },
  ],
  relatedLinks: [
    { label: "Agents IA : présentation complète", href: "/agents-ia" },
    { label: "RAG : mémoire sur vos données", href: "/rag" },
    { label: "Combien coûte un agent IA pour une PME ?", href: "/articles/combien-coute-agent-ia-pme-2026" },
  ],
  pillarLink: { label: "Découvrir les agents IA", href: "/agents-ia" },
};

export const ARTICLES: Article[] = [
  auditApplicationMetier,
  agentIaRgpdSouverain,
  ragVsFineTuning,
  automatiserTriMails,
  factureElectroniqueChorusPro,
  combienCouteAgentIaPme,
  agentIaVsChatbot,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
