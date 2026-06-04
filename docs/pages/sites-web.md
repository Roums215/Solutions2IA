# /sites-web — Brief V6.2 (consolidé définitif)

> À déposer dans `docs/pages/sites-web.md`. Réf : `PLAYBOOK.md` + `docs/pages/rag.md` + `docs/pages/automatisation.md`.
> Page MAJEURE — carrefour d'acquisition. Point d'entrée vers `/automatisation` et `/rag`.
> Chantier : `section-designer` + `motion-specialist` + `copy-writer-fr` + `/audit-pr`.
>
> **V6.1 (mise à jour)** : multi-cible explicite (CG1), test des 3 questions UX (CG2), flux de valeur en S5 (CG3), workflow 4 moments en S7 (CG4), fusion S11+S12, accordion mobile S6, motion Option B clarifiée, copy révisé.
>
> **V6.2 (mise à jour)** : renommage S5 « Comment une opportunité devient un client » (au lieu de « Flux de valeur ») pour lisibilité multi-cible · ajout S7bis « Exemple concret » scénario AVANT/APRÈS pédagogique entre S7 et S8 · CTA final « Croissance » → « Résultat » (factualité au lieu de promesse marketing).

---

## 0. Mission

Cette page ne vend pas un site internet.

Cette page explique comment **Solutions 2IA construit un système numérique connecté** qui relie :

- les visiteurs
- les clients
- les équipes
- les données
- les outils métier
- les automatisations
- l'intelligence artificielle

Le visiteur doit comprendre, en lisant cette page :

- comment une opportunité circule
- où vont les données
- comment les outils communiquent
- ce qui est automatisé
- ce qui change dans son activité
- **comment l'architecture s'adapte à sa taille et à ses outils existants**
- pourquoi le site n'est qu'une composante du système

**Le site est la première brique. Le système est le produit.**

---

## 1. Public cible

Cette page s'adresse à toute structure qui transforme un site en levier opérationnel :

- indépendants · auto-entrepreneurs · professions libérales
- artisans · commerçants · associations
- startups · TPE · PME · ETI

Tous secteurs : artisanat, BTP, immobilier, restauration, hôtellerie, santé, médical, juridique, assurance, finance, industrie, transport, e-commerce, commerce local, conseil, recrutement, formation, événementiel, tourisme, services à la personne.

**Ne jamais donner l'impression que Solutions 2IA est spécialisé dans un seul secteur ou une seule taille.** Le message est universel — les exemples sectoriels et l'architecture par taille sont là pour illustrer, pas pour cadrer.

---

## 1bis. Vérification de lecture multi-cible (CG1)

La page ne doit **jamais** donner l'impression de s'adresser uniquement aux PME. Elle doit rester compréhensible et pertinente pour les **8 typologies** : indépendant · auto-entrepreneur · artisan · commerçant · profession libérale · TPE · PME · ETI.

**Règle d'écriture** — à chaque section structurante (S5, S6, S7, S8, S9), le brief inclut explicitement **3 lignes de vérification de lecture** :

1. *Ce qu'un indépendant comprend en lisant la section.*
2. *Ce qu'une PME comprend en lisant la section.*
3. *Ce qu'une structure plus importante (ETI) comprend en lisant la section.*

Si les 3 lectures convergent vers le même bénéfice (formulé à 3 échelles), la section est conforme.

Si une seule des 3 lectures aboutit à *« c'est intéressant mais c'est trop gros pour moi »* ou *« c'est trop petit pour moi »*, la section est **non conforme** et doit être resimplifiée.

L'effet à éviter : *« c'est intéressant mais c'est trop gros pour moi »*.

---

## 2. Positionnement

Une agence web classique vend :

```
Site  →  Livraison  →  Fin
```

Solutions 2IA construit :

```
Site  →  Outils  →  Données  →  Automatisations  →  IA  →  Évolution
```

Le site web est :

- un **point d'entrée**
- une **interface métier**
- une **porte d'accès**

Le site n'est jamais présenté comme le produit final.

### Principes directeurs (à respecter dans toute la page)

**P1 — Nous partons toujours de l'existant.**
On ne remplace pas vos outils — on les connecte. Si vous avez déjà un CRM, un agenda, une boîte mail métier, on s'y branche. Nous remplaçons uniquement ce qui freine, jamais ce qui fonctionne.

**P2 — Architecture progressive selon votre taille.**
Indépendant, TPE, PME, ETI : c'est la même logique, déployée à des niveaux de complexité différents. Le système grandit avec votre activité.

**P3 — L'IA n'est intégrée que lorsqu'elle :**
- supprime une tâche
- accélère une recherche
- améliore une décision
- réduit une répétition

Sinon, elle n'est pas ajoutée. Pas d'IA gadget. Pas d'IA pour l'IA.

**P4 — Outils remplaçables, pas de lock-in.**
Vous restez propriétaire. Vous pouvez à tout moment remplacer un outil par un autre. Le système ne vous tient pas en otage.

---

## 3. Cohérence de gamme (bridge narratif)

| Page | Rôle dans la gamme |
|---|---|
| **`/sites-web`** | La **première brique** — le site qui acquiert, rassure, qualifie, route. |
| **`/automatisation`** | L'IA **agit** dans les outils métier (déclenchée par le site). |
| **`/rag`** | L'IA **retrouve** vos connaissances (consultable depuis le site interne). |
| **`/agents-ia`** | L'IA **décide et exécute** des tâches autonomes. |

Cette page doit donner envie d'explorer `/automatisation` et `/rag` ensuite. Liens internes naturels en Section 5 (zone COMPRENDRE / DÉCLENCHER) et Section 7.

---

## 4. Grammaire visuelle

La page doit ressembler à :

- un cabinet d'architecture numérique
- un bureau d'ingénierie
- une salle de contrôle métier
- un plan d'infrastructure
- une topologie système

La page ne doit pas ressembler à :

- une agence web
- un template SaaS
- une landing page marketing
- une démo de logiciel
- un dashboard analytics

**Cap visuel hérité de la Section 4 Blueprint 9 stations (live)** : grid backdrop opacity 0.06, boundary labels small-caps tracking-widest, liserés cyan→accent, connecteurs SVG fins, step numbers, icônes discrètes, sublabels italiques. Toutes les sections à construire doivent s'y aligner — avec une **identité visuelle distincte** par section pour éviter la fatigue de schémas.

---

## 5. Interdictions absolues

**Toute valeur chiffrée non sourcée est interdite.** Liste à grep avant chaque PR :

- ❌ `×2`, `x2`, `x3`, `+N%`, `-N%`, `+89%`, `+52%`, `<1s`, `98/100`
- ❌ « UX score », « SEO score », « score Lighthouse 98+ »
- ❌ « x2 engagement », « +89% crédibilité », « x3 conversion »
- ❌ « en moyenne », « jusqu'à », « grâce à nous »
- ❌ « augmentation de N% », « réduction de N% », « économie de »
- ❌ « productivité », « efficacité », « ROI », « rentabilité » (en promesse chiffrée)
- ❌ « première position garantie », « +50 % de trafic »
- ❌ « plus rapide », « immédiatement », « sans attendre » sans qualifier

**Composants visuels interdits :**

- ❌ dashboards fictifs (Trafic / SEO / Lead / CRM en mockup)
- ❌ analytics simulés (graphes inventés)
- ❌ widgets marketing décoratifs
- ❌ interface CRM fictive
- ❌ tableau de bord inventé
- ❌ écran d'administration imaginaire
- ❌ cartes décoratives sans contenu opérationnel
- ❌ mockup chrome décoratif (window bar simulée)
- ❌ `TransformationCard` Avant/Après (réservée à `/realisations`)
- ❌ `AutomationPipeline` réutilisé (réservé à `/automatisation`)
- ❌ fan-in `/rag` réutilisé (style différent)

**Vocabulaire interdit :**

- « optimisation », « IA intelligente », « automatisation avancée »
- « code splitté », « cache intelligent »
- « bas de gamme », « médiocre », « obsolète » (pas de dénigrement direct)
- « solution clé en main universelle » (contredit P2 architecture progressive)

---

## 6. Composants autorisés

Uniquement :

- schémas système
- diagrammes métier
- topologies d'outils
- flux opérationnels
- cartes de circulation
- plans d'infrastructure
- vues de processus
- architectures connectées
- listes structurées (garanties, fondations, à savoir)

---

## 7. Règle des 5 secondes + Test des 3 questions UX (CG2)

### 7a. Règle des 5 secondes (lisibilité visuelle)

Avant de coder ou de valider une section, vérifier :

1. Est-ce un schéma métier réel ?
2. Est-ce un flux compréhensible ?
3. Est-ce une architecture connectée ?
4. Est-ce utile à un dirigeant ?
5. Est-ce compréhensible en moins de 5 secondes ?

### 7b. Test des 3 questions UX (compréhension métier)

À la fin de chaque section structurante (S5-S9), un visiteur de **chaque typologie CG1** doit pouvoir répondre mentalement :

6. **Qu'est-ce que je viens de comprendre ?**
7. **Pourquoi c'est utile pour moi ?**
8. **Quel problème cela règle ?**

### 7c. Critère de conformité

Si la réponse est **non** à l'un des 5 premiers points (visuel), la section doit être **redesignée**.

Si une réponse aux questions **6/7/8** ne vient pas en moins de 5 secondes de relecture, la section doit être **simplifiée** (réduire le nombre d'éléments, clarifier le verdict métier, raccourcir la phrase fermante) jusqu'à ce que les 3 réponses émergent naturellement.

**Ne jamais remplacer une logique métier par un dashboard fictif.**

---

# ARCHITECTURE FINALE — 12 SECTIONS (V6.1)

| # | Section | Statut | Type |
|---|---|---|---|
| 1 | Hero | ✅ Live | PageHero |
| 2 | Pain « Sans / Avec site connecté » | ✅ Live | Comparaison 2-col |
| 3 | Pourquoi nous ne sommes pas une agence web classique | ✅ Live | Comparaison 2-col |
| 4 | Blueprint « De votre visiteur à votre prochain client » | ✅ Live | Flux vertical 9 stations |
| 5 | **Comment une opportunité devient un client (5 étapes)** (CG3) | 🔨 S5 | Flux horizontal |
| 6 | Architecture par taille (4 paliers, accordion mobile) | 🔨 S6 | Cascade descendante |
| 7 | **Cockpit sectoriel (workflow 4 moments)** (CG4) | 🔨 S7 | Selector + mini-flux |
| 7bis | **Exemple concret (scénario AVANT/APRÈS)** 🆕 | 🔨 S7 | Scénario flux comparé |
| 8 | Comment nous construisons | 🔨 S8 | Timeline 6 étapes |
| 8bis | Respiration éditoriale | 🔨 S8 | Citation pleine largeur |
| 9 | Ce qui change (6 paires inline barré) | 🔨 S9 | Liste inline |
| 10 | Fondations techniques | 🔨 S10 | Grille 4×2 |
| 11 | **Nos engagements (✓ + ✗ fusionnés)** | 🔨 S11 | Bipartite |
| 12 | CTA final | 🔨 S11 | CTABand révisé |

## Section 1 — Hero ✅ LIVE

**Type composant :** PageHero refondu (positionnement « système »).

**Statut :** déjà en production. Conserver tel quel.

**Pour mémoire** :
- Label pill : `Sites web premium · Système connecté`
- H1 : *« Votre site n'est pas un site. C'est le point de départ de vos opportunités. »*
- Sous-titre : *« Un site connecté qui travaille avec votre entreprise, pas à côté d'elle. »*
- CTA primaire : *« Concevoir mon système numérique »*
- CTA secondaire : *« Voir comment circule une opportunité »* (ancre vers Section 4)
- Visual : `WebScene` 3D conservé (gated `usePerformanceMode`)

Pill micro-label sous le hero (déjà live) : `Site web · Automatisation · IA documentaire · Outils métier`.

---

## Section 2 — Pain « Sans / Avec site connecté » ✅ LIVE

**Type composant :** Comparaison de fonctionnement 2-col (douleurs à gauche, bascule à droite).

**Statut :** déjà en production. Conserver tel quel.

**Pour mémoire** :
- Titre : *« Ce que coûte réellement un site inefficace »*
- Colonne gauche `SANS SITE CONNECTÉ` : 7 pertes numérotées
- Colonne droite `AVEC UN SITE CONNECTÉ` (carte cyan glow) : *« Le site arrête ces pertes — et les transforme en circulation. »* + 5 promesses ✓
- Bascule : *« Vous arrêtez de perdre ce que vos efforts attirent. »*

Cette section porte déjà le contraste **sans/avec**. Ne pas dupliquer ailleurs.

---

## Section 3 — Pourquoi nous ne sommes pas une agence web classique ✅ LIVE

**Type composant :** Comparaison de fonctionnement 2-col (7 paires d'opposition).

**Statut :** déjà en production. Conserver tel quel.

**Pour mémoire** :
- Carte en-tête gauche : `RÉFÉRENCE · Agence web classique · Le site comme livrable`
- Carte en-tête droite (cyan) : `NOTRE POSTURE · Solutions 2IA · Le site comme point d'entrée`
- 7 paires d'opposition · Phrase fermante : *« Le site n'est pas le produit. C'est le point d'entrée. »*

Ton **factuel sans dénigrement**.

---

## Section 4 — Blueprint « De votre visiteur à votre prochain client » ✅ LIVE

**Type composant :** Diagramme de flux vertical 9 stations (style blueprint / control room).

**Statut :** déjà en production. **Cap visuel locké** — toutes les sections suivantes héritent de cette grammaire.

**Pour mémoire** :
- Badge `COMMENT CIRCULE UNE OPPORTUNITÉ`
- H2 : *« De votre visiteur à votre **prochain client**. »*
- Boundary labels `ENTRÉE · SYSTÈME CONNECTÉ` / `SORTIE · OPPORTUNITÉ CONVERTIE`
- 9 stations : Visiteur · Site web · Formulaire intelligent · Qualification · CRM · Notification · Collaborateur · Suivi · Client
- 8 connecteurs SVG fins · **1 anim cœur** draw one-shot
- Phrase fermante : *« Le site déclenche le flux. Chaque étape transmet le contexte. Personne n'a à y penser — et personne ne tombe entre les mailles. »*

---

## Section 5 — Comment une opportunité devient un client (5 étapes) 🔨 À CONSTRUIRE

**Type composant :** Flux de valeur métier horizontal — `Visiteur → Demande → Qualification → Action → Résultat`. Les outils sont **secondaires** (sous-label discret), le **bénéfice métier est principal**.

**Pourquoi pas une topologie de 4 zones avec les outils en avant ?** Parce que « voici les zones de mon infrastructure » exhibe une grille fonctionnelle sans raconter le chemin concret d'une opportunité. Le flux raconte ce que vit l'opportunité — les outils prennent en charge, ils n'occupent pas la scène.

**Structure principale (ce qui se voit en premier)** :

```
Visiteur  →  Demande  →  Qualification  →  Action  →  Résultat
```

**Lecture annotée (chips métier sobres sous chaque étape)** : Demande = `capter` · Qualification = `comprendre` · Action = `déclencher` · Résultat = `mémoriser & livrer`. Ces 4 zones fonctionnelles restent la grille invisible — ce qui se voit, c'est le chemin.

**Outils en sous-label `ToolBadge` discret sous chaque étape** :

| Étape | Sous-label outils |
|---|---|
| **Demande** | `Formulaire avec logique de qualification · WhatsApp Business · API métier` |
| **Qualification** | `IA générale · RAG métier · Règles de qualification` |
| **Action** | `n8n · Email · Calendrier · Paiement · Notifications` |
| **Résultat** | `CRM · ERP · Base documentaire` |

**Sous-bloc adaptatif (rappel P1, P3, P4)** affiché sous le flux :

> **Toutes les étapes n'ont pas la même intensité.**
> - Avec ou **sans CRM** — on peut connecter votre boîte mail métier en attendant.
> - Avec ou **sans IA** — l'étape Qualification n'est étoffée par l'IA que si elle supprime une tâche, accélère une recherche, améliore une décision ou réduit une répétition.
> - Avec ou **sans automatisation** — l'étape Action peut être minimale (juste une notification) ou complète.
> - **Si vous avez déjà un outil, on s'y branche.** Si vous n'en avez pas, on en suggère un adapté à votre taille.

**Bridges narratifs explicites (CG B7)** :
- Sous étape **Qualification**, sous-label inline italique : *« Voir comment l'IA retrouve vos connaissances → `/rag` »*
- Sous étape **Action**, sous-label inline italique : *« Voir les automatisations métier → `/automatisation` »*

**Présentation visuelle :**
- Conteneur blueprint unique (même grammaire que Section 4).
- Flux horizontal de 5 step pills typographie premium, small-caps tracking-widest, liseré cyan→accent entre chaque pill.
- Sous chaque step pill : chips métier sobre (zone fonctionnelle) + sous-label outils en `ToolBadge`.
- Pas de step numbers (zones de valeur, pas étapes process).
- Mobile (≤ 768 px) : bascule en stack vertical, chips métier visibles, outils en sous-label inline.
- **1 draw one-shot `whileInView once`** sur la ligne horizontale qui relie les 5 étapes (`pathLength` 0→1). Aucune autre animation.

**Phrase fermante** : *« Cinq étapes. Un seul but : que l'opportunité aille jusqu'au bout. »*

**Vérification multi-cible (CG1)** :
- **Indé / auto-entrepreneur / artisan / commerçant** comprend : *« Une demande arrive, elle est triée, je sais quoi faire, rien ne se perd. »*
- **PME** comprend : *« Chaque opportunité suit un chemin défini ; l'IA et les outils prennent en charge ce qui peut l'être. »*
- **ETI** comprend : *« L'architecture qualifie et route à grande échelle, en s'appuyant sur les outils déjà en place. »*

**Test 3 questions UX (CG2)** :
1. *Qu'est-ce que je viens de comprendre ?* → *« Une opportunité suit un chemin de 5 étapes — entrée, tri, action, livraison. »*
2. *Pourquoi c'est utile pour moi ?* → *« Mon site arrête d'être une vitrine passive ; il devient le point de départ d'un flux opérationnel. »*
3. *Quel problème cela règle ?* → *« Le risque qu'une demande arrive et se perde — quelle que soit ma taille. »*

**Bridge** : *« Voir comment ce flux s'adapte à votre taille ↓ »* (vers Section 6).

---

## Section 6 — Une architecture adaptée à votre taille 🔨 À CONSTRUIRE 🆕

**Type composant :** Architecture progressive — 4 paliers visuels en **cascade descendante** avec **step numbers 01-04** (Indépendant → TPE → PME → ETI).

**Phrase introductive de la section** :
*« Même logique. Quatre échelles. Aucun système surdimensionné. »*

**Pourquoi cette section** : un indépendant et un dirigeant ETI ne se reconnaissent pas dans la même architecture. Cette section montre que c'est **la même logique**, déployée à 4 niveaux de complexité — chacun adapté à une réalité opérationnelle. Elle désamorce le « ça n'est pas pour moi ».

**Distinction visuelle imposée vs Section 5 (CG B1)** : S5 = flux horizontal sans step numbers (zones de valeur). S6 = **cascade descendante verticale avec step numbers 01-04** (paliers de complexité). Les deux orientations opposées éliminent toute redite visuelle.

**4 paliers, même grammaire visuelle, niveaux progressifs :**

### Palier 01 — Indépendant / auto-entrepreneur

Architecture minimale, sans CRM, sans IA.

```
SITE WEB
  ↓
Formulaire
  ↓
Email + Calendrier
```

Sous-titre : *« L'essentiel pour ne plus perdre une demande. »*
Outils typiques : `Cal.com · Brevo · une boîte mail métier`.
Verdict métier : *« Chaque demande arrive. Chaque rendez-vous est confirmé. Rien ne passe entre les mailles. »*

### Palier 02 — TPE / artisan / commerçant

Ajout d'un CRM léger et de premières automatisations.

```
SITE WEB
  ↓
Formulaire avec logique de qualification
  ↓
CRM léger  →  Notifications  →  Relance auto
```

Sous-titre : *« Le suivi devient automatique, les demandes ne se perdent plus. »*
Outils typiques : `Axonaut · Pipedrive · n8n basique · WhatsApp Business`.
Verdict métier : *« Chaque opportunité est tracée. Les relances partent sans y penser. »*

### Palier 03 — PME

Le flux de valeur complet, IA ciblée sur les répétitions.

```
SITE WEB
  ↓
Demande (Formulaire · WhatsApp · API)
  ↓
Qualification (IA + règles)
  ↓
Action (n8n + Email + Calendar + Paiement)
  ↓
Résultat (CRM + ERP)
```

Sous-titre : *« Le système gère ce qui peut l'être. L'équipe se concentre sur la décision. »*
Outils typiques : `HubSpot · Odoo · n8n · OpenAI/Mistral · Stripe`.
Verdict métier : *« Ce qui était répété est automatisé. Ce qui était oublié est tracé. L'équipe avance sur ce qui décide. »*

### Palier 04 — ETI

Flux de valeur complet + RAG métier + agents IA.

```
SITE WEB
  ↓
Demande (multi-canaux + API métier)
  ↓
Qualification (IA + RAG sur documentation interne)
  ↓
Action (n8n + agents IA + workflows multi-systèmes)
  ↓
Résultat (CRM + ERP + base documentaire)
```

Sous-titre : *« L'IA accède à votre mémoire métier. Les agents exécutent les tâches répétitives, sans saturation. »*
Outils typiques : `Salesforce · SAP · n8n + Make · agents Claude · RAG vectoriel`.
Verdict métier : *« Vos équipes, vos données et vos processus opèrent à partir d'une source commune. »*

**Présentation visuelle :**
- **Desktop ≥ 1024 px** : grille 2×2 (01 + 02 en haut, 03 + 04 en bas), step numbers visibles, liserés progressifs cyan→accent.
- **Mobile / tablette (< 1024 px)** : **accordion** — Palier 03 (PME) ouvert par défaut, Indé / TPE / ETI en teaser (label + sous-titre visibles, contenu replié, expand au tap). Pas de stack vertical complet sur mobile.
- Chaque palier : step number 01-04 + label de taille en small-caps tracking-widest + mini-flux cascade descendante + sous-titre + chips outils sobres + verdict métier en italique.
- Liserés cyan→accent progressifs (token CSS par palier, pas animation) — 01 cyan saturé / 02 cyan-accent mix / 03 accent-light / 04 accent-light + glow.
- Aucune anim continue. Sur desktop : stagger d'entrée séquentielle (opacity 0→1, max 80ms par palier, pas de translateY). Sur mobile : tous les paliers visibles immédiatement quand ouverts.

**Phrase fermante** :
*« Nous démarrons toujours là où vous en êtes. Le reste s'ajoute quand le besoin apparaît. »*

**Vérification multi-cible (CG1)** :
- **Indé / auto-entrepreneur** comprend : *« Mon palier existe (01 Indépendant). Je peux démarrer sans CRM ni IA. »*
- **PME** comprend : *« Mon palier (03 PME) est l'architecture complète : flux, outils, IA ciblée. »*
- **ETI** comprend : *« Mon palier (04 ETI) ajoute RAG métier et agents — sans tout refondre. »*

**Test 3 questions UX (CG2)** :
1. *Qu'est-ce que je viens de comprendre ?* → *« Il y a 4 niveaux de système, je suis quelque part dedans. »*
2. *Pourquoi c'est utile pour moi ?* → *« Je vois exactement ce que mon entreprise peut activer aujourd'hui, et ce qui s'ajoute plus tard. »*
3. *Quel problème cela règle ?* → *« La peur que le système soit surdimensionné — ou au contraire trop petit. »*

---

## Section 7 — Exemples par métier (Cockpit sectoriel) 🔨 À CONSTRUIRE — REMPLACE `WebGalaxyShowcase`

**Type composant :** Vue sectorielle — sélecteur en pills (6 secteurs) + 1 mini-flux visible à la fois, format **workflow d'entreprise** (4 moments structurés).

**Décision** : `WebGalaxyShowcase` (2 331 LOC) est **remplacée intégralement**.

### Grammaire imposée (CG4) — chaque secteur raconte 4 moments

Chaque mini-flux sectoriel doit raconter **comment l'entreprise travaille** au travers de 4 moments clés :

1. **Le point d'entrée** (label small-caps « ENTRÉE ») — d'où vient l'opportunité.
2. **La décision** (label small-caps « DÉCISION ») — la qualification, le tri, le choix.
3. **L'action** (label small-caps « ACTION ») — ce qui se déclenche automatiquement.
4. **Le résultat** (label small-caps « RÉSULTAT ») — ce que l'entreprise obtient concrètement.

Une simple succession de blocs (« Visiteur → Site → Formulaire → CRM → Suite ») est **rejetée**. On doit comprendre comment l'entreprise travaille à travers ces 4 moments, pas suivre 5 stations neutres.

### 6 secteurs canoniques (révisés selon CG4)

| Secteur | Entrée | Décision | Action | Résultat |
|---|---|---|---|---|
| **Immobilier** | Demande d'estimation | Qualification du bien | Envoi au bon agent | Rendez-vous fixé |
| **Restaurant** | Réservation en ligne | Vérification de disponibilité | Confirmation et rappel | Table préparée à l'heure |
| **Artisan** | Demande de devis | Estimation et planning | Devis envoyé + relance auto | Intervention planifiée |
| **Cabinet conseil** | Demande d'audit | Qualification du besoin | Affectation au consultant | Premier RDV confirmé |
| **Médical** | Prise de RDV en ligne | Vérification du créneau | Confirmation patient + rappel SMS | Cabinet prêt à l'arrivée |
| **E-commerce** | Commande passée | Paiement et stock validés | Préparation + transporteur | Client livré et notifié |

### Présentation visuelle

- Sélecteur horizontal en pills (6 secteurs) en haut de section, 1 mini-flux visible à la fois.
- Chaque mini-flux affiché : 4 step pills horizontales (entrée / décision / action / résultat), liseré cyan→accent entre les pills, labels small-caps tracking-widest.
- Sous le mini-flux affiché : **1 phrase contextualisante** (factuelle, 1 ligne, sans jargon) + CTA *« Voir le flux complet → `/automatisation/<secteur>` »* (si secteur couvert) ou *« Discutons de votre cas → `/contact` »* (sinon).
- 1 draw one-shot `whileInView once` sur le mini-flux visible (re-déclenché au changement de secteur via `key` React).
- Aucune anim continue.

**Bridges narratifs explicites (CG B7)** : chaque CTA *« Voir le flux complet »* est obligatoire — c'est ce qui transforme la section en teaser au lieu d'une vitrine fermée.

**Phrase introductive** : *« Même logique, métiers différents. »*

**Phrase fermante** : *« Votre activité a son propre flux. Nous le câblons. »*

**Vérification multi-cible (CG1)** :
- **Indé / artisan / commerçant / profession libérale** comprend : *« Mon métier est représenté avec un vrai exemple, pas une abstraction. »*
- **PME** comprend : *« Le flux montré est exécutable dans mon outillage actuel. »*
- **ETI** comprend : *« Le même flux s'industrialise sur mes volumes. »*

**Test 3 questions UX (CG2)** :
1. *Qu'est-ce que je viens de comprendre ?* → *« Mon secteur a un workflow concret en 4 moments — point d'entrée, décision, action, résultat. »*
2. *Pourquoi c'est utile pour moi ?* → *« Je vois exactement comment mon activité fonctionnerait avec ce système. »*
3. *Quel problème cela règle ?* → *« Je n'ai plus à imaginer comment ça marche dans mon métier — c'est montré. »*

---

## Section 7bis — Exemple concret (scénario AVANT/APRÈS) 🔨 À CONSTRUIRE 🆕

**Type composant :** Scénario réel — schéma simple de comparaison AVANT/APRÈS sur le parcours d'une demande, **inséré directement dans `SitesWebPage.tsx`** (pas de composant lourd dédié, simple data + render statique).

**Pourquoi cette section** : entre les exemples métier (S7) et le processus de construction (S8), permettre au visiteur de **se projeter concrètement** sur la transformation d'un parcours. Sert de respiration pédagogique avant la séquence projet — le visiteur arrête de réfléchir en abstrait et voit un cas tangible.

**Structure visuelle** :

```
AVANT
Demande reçue
  ↓
Email
  ↓
Traitement manuel
  ↓
Relance oubliée
```

```
APRÈS
Demande reçue
  ↓
Qualification
  ↓
CRM
  ↓
Notification
  ↓
Suivi
```

**Phrase de cadrage** : *« Le principe reste le même quel que soit votre métier : une demande entre, elle est comprise, distribuée puis suivie. »*

**Présentation visuelle :**
- 2 flux verticaux empilés (mobile) ou côte à côte (desktop ≥ 1024 px).
- AVANT en `text-text-tertiary` désaturé, lignes fines grises.
- APRÈS en `text-text-primary` + accent cyan, lignes fines cyan→accent.
- **Aucun chiffre.** Aucun KPI. Aucun dashboard. Aucun mockup.
- **100 % statique.** Pas de draw, pas d'anim, même en `whileInView`.
- Même grammaire blueprint que Section 4 (typographie sobre, step pills, liserés).

**Distinction visuelle vs sections opposition (CG B1)** :
- S2 (Pain) = 2-col cards numérotées
- S3 (vs Agence) = 2-col tableau de paires
- S9 (Ce qui change) = inline barré ligne-par-ligne
- **S7bis = 2 flux verticaux de parcours, format scénario** (la transformation d'UN parcours, pas une liste de paires)

Aucune confusion possible entre les 4 sections opposition.

---

## Section 8 — Comment nous construisons votre système 🔨 À CONSTRUIRE

**Type composant :** Architecture métier — timeline 6 étapes (problème · action · livrable).

### En-tête de section (rappel P1)

**Bloc en haut, encadré cyan désaturé**, avant les 6 étapes :

> **« Nous partons toujours de l'existant. »**
>
> Nous ne remplaçons pas vos outils — nous les connectons. Si vous avez déjà un CRM, un agenda, une boîte mail métier, on s'y branche. Nous remplaçons uniquement ce qui freine, jamais ce qui fonctionne.

Trois mini-exemples visuels en sous-bloc (icônes + texte court) :

- *Vous avez Pipedrive ? On s'y branche.*
- *Vous utilisez Cal.com ? On le garde.*
- *Vous avez une boîte mail métier ? On la connecte au flux.*

### Les 6 étapes

| # | Étape | Problème | Action | Livrable |
|---|---|---|---|---|
| 01 | **Audit de l'existant** | On ne peut pas construire sans savoir ce qui tourne déjà. | Inventaire outils · audit métier · offres · cibles. | Carte d'activité + inventaire validés. |
| 02 | **Architecture** | Sans plan, le système devient un patchwork. | Topologie : flux de valeur · connexions · ce qu'on garde / ajoute / remplace. | Schéma d'architecture validé. |
| 03 | **Design** | Le design doit refléter le niveau de l'entreprise. | Direction artistique premium · maquettes orientées action. | Maquettes validées au détail. |
| 04 | **Développement** | Un site qui n'évolue pas est un site qui meurt. | TypeScript strict · modulaire · testé. | Site fonctionnel en staging. |
| 05 | **Connexions** | Sans connexion, le site reste isolé. | Branchements CRM · calendrier · email · n8n · IA (si justifiée). | Système câblé et testé. |
| 06 | **Mise en production** | Un bug en prod = une opportunité perdue. | QA cross-device · monitoring · documentation · formation. | Système stable, documenté, équipes formées. |

**Présentation visuelle :**
- En-tête « Nous partons de l'existant » bien visible (carte cyan désaturée, texte sobre).
- Timeline verticale (mobile : stack centré ; desktop : alternance gauche/droite possible).
- Chaque étape : step number 01-06, titre, sous-bloc problème → action → livrable en 3 lignes courtes.
- Même grammaire que Section 4. 1 draw one-shot `whileInView once` sur la ligne verticale de la timeline (`scaleY` 0→1).

**Phrase fermante** : *« Six étapes. Aucune brûlée. »*

**Vérification multi-cible (CG1)** :
- **Indé / auto-entrepreneur** comprend : *« On audite mon existant — pas besoin d'avoir déjà un SI. »*
- **PME** comprend : *« On garde mes outils qui marchent et on connecte autour. »*
- **ETI** comprend : *« L'architecture est documentée, transférable, sans verrou. »*

**Test 3 questions UX (CG2)** :
1. *Qu'est-ce que je viens de comprendre ?* → *« Il y a 6 étapes claires, avec un livrable à chaque étape. »*
2. *Pourquoi c'est utile pour moi ?* → *« Je sais ce que je reçois et quand. Pas de zone d'ombre projet. »*
3. *Quel problème cela règle ?* → *« La peur du projet web flou où « on verra à la livraison ». »*

---

## Section 8bis — Respiration éditoriale 🔨 À CONSTRUIRE 🆕

**Type composant :** Citation pleine largeur inline (pas de composant dédié — inséré directement dans `SitesWebPage.tsx`).

**Pourquoi cette section** : entre la zone « comment on construit » (S8) et la zone « ce qui change pour vous » (S9), insérer une rupture éditoriale pour briser le « wall of blueprints » des sections 4 → 8. C'est l'unique moment de voix directe de la page.

**Contenu** :

> *« Nous construisons ce qui manque. Nous connectons ce qui existe. Nous ne remplaçons pas ce qui fonctionne. »*

**Présentation visuelle :**
- `<blockquote>` ou `<p>` pleine largeur, centrée, ~80-100 % de la largeur.
- Typographie premium, corps grand.
- Pas de fond de carte, pas d'icône, pas de bordure.
- `glow-line` séparateur en dessous (token existant `globals.css`).
- **0 animation.** Statique pur, même en `whileInView`.

---

## Section 9 — Ce qui change dans votre entreprise 🔨 À CONSTRUIRE

**Type composant :** Liste structurée — **6 paires Avant / Après** au format **inline barré** (line-through + flèche + accent), pas de 2 colonnes, pas de cards.

**Format imposé (CG B2)** : chaque paire = **une seule ligne pleine largeur**.

```
<span line-through gris désaturé>Avant</span>   →   <span gras accent cyan>Après</span>
```

Le geste de lecture diffère radicalement des Sections 2 (sans/avec en 2 colonnes) et 3 (vs agence en tableau opposé). Ici, la transformation se lit comme un acte de rédaction corrigée — diff de réalité, journal de bord.

### 6 paires resserrées (fusion 8 → 6 pour éliminer chevauchements)

| # | Avant (barré) | Après (accent) |
|---|---|---|
| 1 | Une demande arrive dans une boîte mail. | Elle arrive qualifiée, distribuée, et déclenche une suite. |
| 2 | Les informations sont dispersées entre emails, têtes, dossiers. | Chaque échange est centralisé, retrouvable, transmissible. |
| 3 | Les relances sont oubliées. Le bon collaborateur est prévenu trop tard — ou pas. | Le suivi est automatisé. La bonne personne reçoit l'opportunité avec le contexte. |
| 4 | Tout repose sur une seule personne (souvent vous). | Le système fonctionne même quand vous n'êtes pas disponible. |
| 5 | Les mêmes questions reviennent. Personne ne sait où est la dernière réponse validée. | Les réponses récurrentes sont centralisées et accessibles sans chercher. |
| 6 | Une absence = des demandes qui n'attendent pas. | Le système accueille en continu. Chaque entrée est visible et traçable. |

**Garde-fous absolus** : aucun chiffre, aucun pourcentage, aucun multiplicateur. Aucune `TransformationCard`.

**Verbes autorisés** : capitaliser · transmettre · suivre · savoir · distribuer · arrêter de perdre · ne plus dépendre · centraliser · tracer · accueillir.

**Présentation visuelle :**
- **6 lignes pleine largeur** empilées, format inline `Avant → Après`.
- Avant = `text-text-tertiary` + `line-through` (gris désaturé barré).
- Flèche fine cyan entre les deux propositions.
- Après = `text-text-primary` + `font-semibold` + accent cyan.
- Pas de cards, pas de 2 colonnes, pas de step numbers.
- Stagger d'entrée séquentielle sur les 6 lignes (`fadeInUp` `whileInView once`).

**Phrase fermante** : *« Le livrable, c'est le changement dans votre quotidien. »*

**Vérification multi-cible (CG1)** :
- **Indé / auto-entrepreneur** comprend : *« Plus de demandes oubliées dans une boîte mail. »*
- **PME** comprend : *« Les opérations qui dépendaient d'une personne sont sécurisées. »*
- **ETI** comprend : *« Le contexte ne se perd plus entre les équipes et les outils. »*

**Test 3 questions UX (CG2)** :
1. *Qu'est-ce que je viens de comprendre ?* → *« Voici 6 changements opérationnels concrets dans mon quotidien. »*
2. *Pourquoi c'est utile pour moi ?* → *« Je projette ces changements dans ma propre semaine. »*
3. *Quel problème cela règle ?* → *« L'écart entre « avoir un site » et « avoir un système qui change la vie au bureau ». »*

---

## Section 10 — Fondations techniques 🔨 À CONSTRUIRE

**Type composant :** Liste structurée — 8 piliers métier (technos en sous-label discret).

**Pas une liste de logos.** Chaque pilier = un **bénéfice business**, la techno arrive en sous-label.

| Pilier | Sous-label techno |
|---|---|
| **Performance** | `Next.js · build optim · lazy loading` |
| **Accessibilité** | `WCAG 2.2 · clavier · lecteurs d'écran · contrastes` |
| **SEO technique** | `metadata · sitemap · structure sémantique · Core Web Vitals` |
| **Responsive** | `mobile-first · 320 → 4K` |
| **Sécurité** | `HTTPS · CSP · audit dépendances` |
| **Maintenabilité** | `code propre · TypeScript · tests` |
| **Évolutivité** | `architecture modulaire · APIs claires` |
| **Suivi analytics** | `Plausible · Posthog · GA4 (au choix)` |

**Présentation visuelle :**
- Grille 4×2 ou 2×4 selon largeur.
- Chaque pilier : icône discrète + nom (typo premium) + 1 ligne de bénéfice + sous-label techno chips sobres.
- Aucun chiffre de performance promis.

**Phrase fermante** : *« Les fondations ne se voient pas. Elles expliquent pourquoi le système tient. »*

---

## Section 11 — Nos engagements (✓ Ce que nous garantissons + ✗ Ce que nous ne promettons pas) 🔨 À CONSTRUIRE — FUSION S11+S12 (V6.1)

**Type composant unique :** `WebEngagements` — section bipartite en un seul composant : grille ✓ garanties + glow-line + manifeste ✗ non-promesses.

**Pourquoi cette fusion (CG B3)** : 3 listes consécutives avant le CTA (S10 piliers + S11 garanties + S12 non-promesses) provoquent un décrochage maximal. Réduit à 2 listes (S10 puis S11 fusionnée), la fin de page gagne en proximité avec le CTA. Transition naturelle « fondations techniques (S10) → engagements humains (S11) ».

**Titre chapeau de section** : *« Nos engagements »*.

### Bloc 1 — Ce que nous garantissons (grille ✓ 4×2)

Pattern visuel : copie verbatim de `components/sections/rag/RagDataControl.tsx` lignes 43-78 (cyan checkmarks, border `border-cyan/25`, hover `border-cyan/50`, shadow `var(--color-cyan-glow)`).

| ✓ | Garantie |
|---|---|
| ✓ | **Vous êtes propriétaire** du code, du contenu, des données. |
| ✓ | **Hébergement à votre nom** — UE par défaut, choix souverains si demandé. |
| ✓ | **Documentation livrée** — chaque connexion documentée, prise en main autonome possible. |
| ✓ | **Architecture évolutive** — vous pouvez ajouter / remplacer / déconnecter sans tout casser. |
| ✓ | **Outils remplaçables** — pas de lock-in propriétaire (rappel P4). |
| ✓ | **Pas de dépendance cachée** — vous savez exactement ce qui tourne et où. |
| ✓ | **Conformité RGPD** — données hébergées en UE, traitements documentés. |
| ✓ | **Accompagnement possible** — maintenance par nous, par votre équipe, ou par un autre prestataire. |

Grille 4×2 (mobile : 2×4). Chaque carré : ✓ cyan + libellé en gras + détail court. Pas d'icônes excessives — la coche suffit.

### Séparateur — glow-line pleine largeur

`glow-line` token existant + `mt-16 mb-12` (respiration visuelle entre les 2 blocs).

### Bloc 2 — Ce que nous ne promettons pas (typographie pure)

**Format** : pas de grille, pas de cards. Typographie pure pleine largeur — intitulé `text-2xl font-semibold`, justification `text-base text-text-secondary`, ✗ Unicode sobre cyan désaturé en début de ligne.

```
✗ Nous ne vendons pas de site à 500 €.
  Un système connecté demande de l'audit, du design, du développement
  et des intégrations. Cela a un coût juste.

✗ Nous ne promettons pas ×10 de chiffre d'affaires.
  Le SEO est une discipline continue, pas une livraison. Aucune
  position garantie sur Google.

✗ Nous ne livrons pas de template générique.
  Chaque système est conçu pour votre activité — pas une vitrine
  déclinée d'un thème.

✗ Nous ne lançons pas sans cadrage.
  Pas de devis serré sans comprendre votre activité. Si l'audit
  ne se justifie pas, on vous le dit.

✗ Nous n'ajoutons pas d'IA partout.
  L'IA n'est intégrée que lorsqu'elle supprime une tâche, accélère
  une recherche, améliore une décision ou réduit une répétition.
  Sinon, elle n'est pas dans le système. Pas d'IA gadget.
```

**Pourquoi cette posture honnête** : elle désamorce le doute (« vont-ils sur-vendre ? »). C'est ce qui transforme un visiteur sceptique en lead qualifié, juste avant le CTA.

---

## Section 12 — CTA final 🔨 À CONSTRUIRE

**Type composant :** CTABand (copy révisée — pas de réutilisation aveugle).

**Architecture simplifiée au-dessus du CTA** :

```
Votre activité  →  Site connecté  →  Outils  →  Automatisations  →  IA  →  Résultat
```

(Mini-schéma horizontal léger, même grammaire que Section 4, 1 seule ligne, 100 % statique.)

**Titre :** *« Construisons votre système numérique. »*

**Sous-titre :** *« Premier échange offert. Sans engagement. »*

**CTAs (2 boutons côte à côte)** :
- Primaire : *« Demander un audit »*
- Secondaire : *« Réserver un échange »*

---

# SPRINTS

| Sprint | Sections | Composants à créer |
|---|---|---|
| **S4.5** | Nettoyage immédiat | Supprimer `PremiumFlowPanel "Qualité web"` · toutes les `TransformationCard` Avant/Après · metric-tiles (`×2`, `+89%`, `<1s`) · mockups chrome décoratifs · stack chips standalone (sera absorbée S10). Conserver `WebGalaxyShowcase` jusqu'à S7. |
| **S4.6** 🆕 | Mise à niveau brief V6 → V6.1 | Édition `docs/pages/sites-web.md` : CG1 (multi-cible §1bis), CG2 (3 questions UX §7), CG3 (flux de valeur S5), CG4 (workflow 4 moments S7), fusion S11+S12, accordion mobile S6, motion Option B, réécritures copy. Aucun code. |
| **S5** | Section 5 — Comment une opportunité devient un client (5 étapes) | `WebSystemArchitecture` + `webArchitectureData` (flux Visiteur → Demande → Qualification → Action → Résultat, outils en sous-label, bridges /rag /automatisation) |
| **S6** | Section 6 — Architecture par taille (accordion mobile) | `WebArchitectureBySize` + `webSizeData` (4 paliers, cascade descendante, step numbers 01-04, accordion PME-ouvert mobile) |
| **S7** | Section 7 — Cockpit sectoriel (workflow 4 moments) + S7bis scénario | `WebSectorFlows` + `webSectorFlowsData` (6 secteurs × 4 moments entrée/décision/action/résultat, selector, bridges /automatisation/<secteur>) + scénario AVANT/APRÈS inline (Section 7bis, 2 flux verticaux statiques, pas de composant dédié) — **remplace** `WebGalaxyShowcase` (suppression complète à ce sprint) |
| **S8** | Section 8 — Comment on construit + respiration éditoriale | `WebBuildProcess` + `webBuildProcessData` (avec bloc « Nous partons de l'existant » en en-tête) + citation pleine largeur inline (Section 8bis) |
| **S9** | Section 9 — Ce qui change (6 paires inline barré) | `WebChangePairs` + `webChangePairsData` (format inline line-through + flèche + accent, 6 paires) |
| **S10** | Section 10 — Fondations techniques | `WebFoundations` + `webFoundationsData` (8 piliers, grille 4×2, sous-labels ToolBadge) |
| **S11** | Sections 11 + 12 — Engagements fusionnés + CTA | `WebEngagements` (✓ 8 garanties grille 4×2 + glow-line + ✗ 5 non-promesses typo pure) + révision `CTABand` copy + mini-schéma horizontal statique |
| **S12** | Audit final | Perf · a11y · grep jargon · grep chiffres · responsive iPhone · vérifs CG1 multi-cible + CG2 3 questions UX · `pnpm build` |

**Règle inviolable :** aucun sprint ne se lance sans validation utilisateur explicite. Aucun sprint ne se termine sans screenshot rendu validé.

---

# GARDE-FOUS TECHNIQUES

- **Animations** : `motion/react` uniquement (jamais `framer-motion`). Transform / opacity / clip-path uniquement.
- **0 boucle anim continue** sur toute la page. **Motion Option B (V6.1)** : **1 draw one-shot par section blueprint autorisé**, déclenché une seule fois en `whileInView once` sur les connecteurs SVG uniquement (`pathLength` 0→1, `opacity` 0→1). Concerne : S4 (déjà live), S5, S7, S8. Aucune autre animation. La S6 utilise un stagger d'entrée léger (opacity uniquement, pas de draw). La S9 utilise un stagger fadeInUp. La S10, S11, S12 : statiques pures.
- **`prefers-reduced-motion`** : tout devient statique, aucun timer. Tous les SVG initialisés à `pathLength: 1, opacity: 1` au montage.
- **Mobile (≤ 768 px ou coarse pointer)** : tous les schémas en stack vertical, aucune anim, lisibilité prioritaire. **Exception S6** : accordion (PME ouvert par défaut, Indé / TPE / ETI en teaser).
- **Tokens** : `var(--color-accent)` cyan / `var(--color-accent-light)` indigo uniquement. Aucun hex codé sauf `ToolBadge` neutre.
- **Identités visuelles distinctes (CG B1)** : Section 5 (**flux horizontal de valeur sans step numbers**) ≠ Section 6 (**cascade descendante avec step numbers 01-04**) ≠ Section 7 (**mini-flux horizontaux 4 moments, 1 visible à la fois**) ≠ Section 8 (**timeline 6 étapes verticale**) ≠ Section 9 (**inline barré ligne-par-ligne, pas de cards ni colonnes**). Aucune confusion possible.
- **Performance** : `usePerformanceMode` gate les `WebScene` 3D et tout effet GPU lourd.
- **Aucune nouvelle dépendance npm** sans approbation explicite.
- **Tooling visuel** : réutiliser `ToolBadge`, `SectionHeading`, `PageHero`, `CTABand`. Ne pas dupliquer.

---

# WORKFLOW AGENTS

1. **`section-designer`** — compose chaque section sous Claude Code en plan mode (option 2 « manually approve »).
2. **`copy-writer-fr`** — ton dirigeant + indépendant, voix française, plusieurs pistes Hero / CTAs.
3. **`motion-specialist`** — gardien du « 0 anim continue ». Tout statique sauf draw one-shot Blueprint.
4. **`tokens-guardian`** + **`a11y-reviewer`** + **`performance-auditor`** — passe `/audit-pr` entre sprints.
5. **Checkpoint git** entre chaque sprint. Commit message clair (`feat(sites-web): S5 Architecture 4 zones`).

---

# DEFINITION OF DONE (page complète)

- [ ] Brief V6.2 déposé dans `docs/pages/sites-web.md`.
- [ ] S4.5 nettoyage : `PremiumFlowPanel`, `TransformationCard`, metric-tiles, mockups chrome, faux dashboards → **supprimés**.
- [ ] S4.6 mise à niveau brief V6 → V6.1 effectuée (CG1, CG2, CG3, CG4, fusion S11+S12, accordion S6, motion Option B, copy révisé).
- [ ] S5 Comment une opportunité devient un client (5 étapes Visiteur → Demande → Qualification → Action → Résultat, outils en sous-label) + sous-bloc adaptatif + bridges /rag /automatisation livrée.
- [ ] S6 Architecture par taille (4 paliers, cascade descendante avec step numbers 01-04, **accordion mobile PME-ouvert**) livrée 🆕.
- [ ] S7 Cockpit sectoriel (6 secteurs × 4 moments entrée/décision/action/résultat, selector + bridges /automatisation/<secteur>) + S7bis scénario AVANT/APRÈS pédagogique livrés · `WebGalaxyShowcase` supprimé.
- [ ] S8 Comment on construit (6 étapes + en-tête « Nous partons de l'existant ») livré + S8bis respiration éditoriale citation pleine largeur insérée.
- [ ] S9 Ce qui change (**6 paires inline barré**, pas 8, pas de 2-col, pas de cards) livré.
- [ ] S10 Fondations (8 piliers) livrée.
- [ ] S11 `WebEngagements` (8 ✓ garanties grille + glow-line + 5 ✗ non-promesses typo pure) + CTA final révisé livrés.
- [ ] **Grep anti-jargon** = 0 occurrence (« optimisation », « IA intelligente », « code splitté », « pixel-perfect », « code propre », etc.).
- [ ] **Grep anti-chiffres** = 0 occurrence (`×2`, `+89%`, `<1s`, `98/100`, etc.).
- [ ] **Grep anti-composants interdits** = 0 (`TransformationCard`, `AutomationPipeline` hors page concernée).
- [ ] **Vérification P1** : la phrase « Nous partons toujours de l'existant » figure bien en en-tête de Section 8.
- [ ] **Vérification P3** : la règle IA figure dans la Section 5 (sous-bloc adaptatif) ET dans la Section 11 bloc ✗ (non-promesses).
- [ ] **Vérification CG1 multi-cible** : chaque section S5-S9 a passé la lecture indé/PME/ETI sans effet « trop gros / trop petit pour moi ».
- [ ] **Vérification CG2 3 questions UX** : chaque section S5-S9 répond en moins de 5 secondes aux questions *Qu'est-ce que j'ai compris ? Pourquoi c'est utile pour moi ? Quel problème ça règle ?*
- [ ] Perf : Lighthouse mobile vert · 0 boucle anim continue · reduced-motion statique (tous SVG à `pathLength: 1`).
- [ ] A11y : WCAG 2.2 AA · clavier · lecteurs d'écran testés · accordion S6 ARIA valide · selector S7 ARIA valide.
- [ ] Responsive : 320 px → 4K · iPhone 13 mini OK.
- [ ] `pnpm build` clean · 0 erreur TS · 0 warning lint.
- [ ] Screenshots de chaque section validés par l'utilisateur avant merge.

---

**Mantra final** : *Le site est la première brique. Le système est le produit.*