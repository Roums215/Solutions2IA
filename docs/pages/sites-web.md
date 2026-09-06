> [!NOTE]
> Brief rédigé pendant la refonte de **juin 2026**. Il reste la référence de cette page,
> mais il cite des composants aujourd'hui **supprimés** (`TransformationCard`, `WebGalaxyShowcase`),
> des pages jamais créées (`/realisations`) et des docs déplacées (`PLAYBOOK.md` → `docs/archives/2026-06-playbook-design.md`,
> `ROADMAP.md` n'existe pas). Les règles en vigueur sont dans `docs/` et `CLAUDE.md`.

# /sites-web — Brief V6.4 (patch éditorial V6.3)

> À déposer dans `docs/pages/sites-web.md`. Réf : `PLAYBOOK.md` + `docs/pages/rag.md` + `docs/pages/automatisation.md`.
> Page MAJEURE — carrefour d'acquisition. Point d'entrée vers `/automatisation`, `/rag` et `/agents-ia`.
> Chantier : `section-designer` + `motion-specialist` + `copy-writer-fr` + `/audit-pr`.
>
> **V6.1 (mise à jour)** : multi-cible explicite (CG1), test des 3 questions UX (CG2), flux de valeur en S5 (CG3), workflow 4 moments en S7 (CG4), fusion S11+S12, accordion mobile S6, motion Option B clarifiée, copy révisé.
>
> **V6.2 (mise à jour)** : renommage S5 « Comment une opportunité devient un client » (au lieu de « Flux de valeur ») pour lisibilité multi-cible · ajout S7bis « Exemple concret » scénario AVANT/APRÈS pédagogique entre S7 et S8 · CTA final « Croissance » → « Résultat » (factualité au lieu de promesse marketing).
>
> **V6.3 (patch ciblé)** : réordre — le Blueprint 9 stations passe **juste après le hero** (V6.2 S4 → V6.3 S1) · **suppression de S5 V6.2** (5 étapes opportunité → client) absorbée par le Blueprint, renumérotation S6→S4, S7→S5, S7bis→S5bis, S8→S6, S8bis→S6bis, S9→S7, S10→S8, S11→S9, S12→S10 · **reformulation du bloc ✗ S9 V6.3 (ex-S11 V6.2)** en 3 lignes ton cabinet (suppression des mentions de prix et multiplicateurs) · **ajustement H1** : `« C'est le point de départ de vos opportunités. »` → `« C'est le moteur de vos prochains clients. »` · **CG1 étendu à 6 audiences explicites** (auto-entrepreneurs, artisans, cabinets conseil/libéraux, commerces locaux, PME, sociétés de services — Solutions2IA ne cible pas les particuliers). Sprint S5 V6.2 annulé. Roadmap S4.5 → S12 V6.2 maintenue (renumérotée en interne).
>
> **V6.4 (patch éditorial)** : **5 ajustements stratégiques** — (1) Nouvelle couche amont **VISIBILITÉ** (anciennement « Acquisition », renommée terme dirigeant) formalisée comme première couche du système · (2) **Nouvelle section S1 V6.4 « Sources d'opportunités »** insérée entre Hero et Blueprint, fan-in 9 canaux (Google Search, GMB+avis, GEO IA, Réseaux sociaux, Publicité, Recommandation, Partenaires, Salons/événements, QR codes/supports physiques) — glissement +1 sur toutes les sections suivantes (S1→S2, S2→S3, …, S10→S11) · (3) **Architecture 4 couches** `VISIBILITÉ → CIRCULATION → INTELLIGENCE → PILOTAGE` formalisée en section 2bis comme grille de lecture interne · (4) **Ponts explicites vers la gamme** : bridge `/agents-ia` 🆕 ajouté au Blueprint S2 sous station 07 (en complément de `/rag` et `/automatisation` déjà présents) + phrase éditoriale *« Cette étape peut être renforcée par nos solutions IA »* déclinée dans S2, S5, S6, S7 (vente naturelle sans effet catalogue) · (5) **Règle V6.4 « 1 section = 1 question »** : chaque section structurante répond à une seule question dirigeant, table des 11 questions S1→S11 ajoutée en section 1ter. **Enrichissements connexes** : 7ᵉ secteur « Commerce local » au Cockpit S6 · grille S9 Fondations élargie de 8 à 11 piliers (SEO étendu, GEO, GMB, Pilotage avec colonne « Couche 4-couches ») · bloc ✗ S10 Engagements enrichi d'une 4ᵉ ligne SEO/GEO non garantis · S5 Paliers correctif mobile (4 en-têtes 01–04 toujours visibles, plus d'accordéon PME-ouvert par défaut) · S7 Méthode étape 06 enrichie (suivi mensuel + revue trimestrielle pour matérialiser la couche PILOTAGE) · interdictions absolues étendues (anti-jargon SEO/GEO). Nouveau sprint `S4.6.5 V6.4 — Visibilité & Ponts gamme` intercalé. Roadmap S4.5 → S12 conservée.

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

Cette page s'adresse à **6 audiences professionnelles** qui transforment un site en levier opérationnel (liste de référence V6.3 pour CG1) :

1. **Auto-entrepreneurs** (et professions libérales en nom propre)
2. **Artisans** (BTP, métiers de bouche, décoration, services à la personne organisés)
3. **Cabinets** (conseil, libéraux : avocats, experts-comptables, médecins, architectes)
4. **Commerces locaux** (boutiques physiques, magasins de proximité, salons)
5. **PME** (multi-équipes, services, outils métier en place ou à structurer)
6. **Sociétés de services** (prestataires B2B, agences, ESN, bureaux d'étude)

Tous secteurs : artisanat, BTP, immobilier, restauration, hôtellerie, santé, médical, juridique, assurance, finance, industrie, transport, e-commerce, commerce local, conseil, recrutement, formation, événementiel, tourisme, services à la personne.

**Solutions 2IA ne cible pas les particuliers.** L'offre suppose une activité professionnelle (CRM, automatisation métier, équipe ou collaborateurs à orchestrer, outils business à connecter).

**Ne jamais donner l'impression que Solutions 2IA est spécialisé dans un seul secteur ou une seule taille.** Le message est universel sur les 6 audiences ci-dessus — les exemples sectoriels (S5 V6.3 Cockpit) et l'architecture par taille (S4 V6.3 Paliers) sont là pour illustrer, pas pour cadrer.

---

## 1bis. Vérification de lecture multi-cible (CG1 — étendu V6.3)

La page ne doit **jamais** donner l'impression de s'adresser uniquement aux PME. Elle doit rester compréhensible et pertinente pour les **6 audiences professionnelles V6.3** (cf. Section 1).

**Règle d'écriture** — à chaque section structurante (S1 Blueprint, S4 Paliers, S5 Cockpit, S6 Méthode, S7 Ce qui change selon numérotation V6.3), le brief inclut explicitement **6 lignes de vérification de lecture** (minimum) — une par audience :

1. *Ce qu'un **auto-entrepreneur** comprend en lisant la section.*
2. *Ce qu'un **artisan** comprend en lisant la section.*
3. *Ce qu'un **cabinet** (conseil, libéral) comprend en lisant la section.*
4. *Ce qu'un **commerce local** comprend en lisant la section.*
5. *Ce qu'une **PME** comprend en lisant la section.*
6. *Ce qu'une **société de services** comprend en lisant la section.*

Si les 6 lectures convergent vers le même bénéfice (formulé à 6 échelles d'activité), la section est conforme.

Si une seule des 6 lectures aboutit à *« c'est intéressant mais c'est trop gros pour moi »* ou *« c'est trop petit pour moi »* ou *« ça ne parle pas de mon activité »*, la section est **non conforme** et doit être resimplifiée.

L'effet à éviter : *« c'est intéressant mais c'est trop gros pour moi »* — quelle que soit l'audience.

> **Note V6.3** : les vérifications CG1 héritées de V6.2 (déjà rédigées en 3 lignes indé/PME/ETI) restent valides — il faut les **étendre** à 6 lignes lors de la mise à jour de chaque section, pas les remplacer.

---

## 1ter. Règle V6.4 — « 1 section = 1 question »

Chaque section structurante de la page répond à **une seule** question d'un dirigeant TPE/PME. Si une section en couvre plusieurs, elle doit être **simplifiée** (réduire les éléments, raccourcir le verdict métier, déplacer la matière surnuméraire dans la section qui répond à cette question).

| Section V6.4 | Question unique répondue |
|---|---|
| **S1** Sources d'opportunités | *D'où viennent les opportunités ?* |
| **S2** Blueprint 9 stations | *Comment circulent-elles ?* |
| **S3** Pain « Sans / Avec » | *Que perd-on sans système ?* |
| **S4** vs Agence web classique | *Pourquoi Solutions 2IA ?* |
| **S5** Architecture par taille | *Quelle architecture me correspond ?* |
| **S6** Cockpit sectoriel | *Comment cela fonctionne dans mon métier ?* |
| **S7** Comment nous construisons | *Comment construisez-vous ?* |
| **S8** Ce qui change | *Qu'est-ce qui change ?* |
| **S9** Fondations techniques | *Sur quoi repose le système ?* |
| **S10** Nos engagements | *Quels engagements prenez-vous ?* |
| **S11** CTA final | *Quelle est la prochaine étape ?* |

Sub-sections (S6bis Scénario, S7bis Respiration) n'entrent pas dans la règle — ce sont des appuis pédagogiques de la section principale qui les héberge.

**Critère de conformité V6.4** : à la relecture, si une question apparaît dans plus d'une section, on **simplifie la section qui ne porte pas la question principale** — la réponse reste dans son foyer naturel.

Cette règle s'ajoute aux CG1 (multi-cible 6 audiences) et CG2 (3 questions UX par section).

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

## 2bis. Architecture 4 couches V6.4 — `VISIBILITÉ → CIRCULATION → INTELLIGENCE → PILOTAGE`

Grille de lecture interne. Verticale qui se lit comme un parcours métier, pas comme un mapping technique. Vocabulaire dirigeant : la couche amont s'appelle **« Visibilité »** (et non « Acquisition », terme marketing).

```
┌─ VISIBILITÉ ──────────────────────────┐
│  Être trouvable. Être reconnu.        │
│  Site · SEO · GEO · GMB               │
│  Réseaux · Publicité · Recommandation │
│  Partenaires · Événements · QR codes  │
└──────────────────┬────────────────────┘
                   ↓
┌─ CIRCULATION ─────────────────────────┐
│  Recevoir une opportunité.            │
│  Formulaire · CRM ·                   │
│  Automatisations · Notifications      │
└──────────────────┬────────────────────┘
                   ↓
┌─ INTELLIGENCE ────────────────────────┐
│  Traiter intelligemment.              │
│  RAG · IA documentaire · Agents IA    │
└──────────────────┬────────────────────┘
                   ↓
┌─ PILOTAGE ────────────────────────────┐
│  Piloter et améliorer.                │
│  Reporting · Dashboards               │
│  Process métier · Amélioration continue│
└───────────────────────────────────────┘
```

**Lecture dirigeant immédiate** :
> *« être visible → recevoir une opportunité → traiter intelligemment → piloter »*

### Couverture des 4 couches par section V6.4

| Section V6.4 page | Couche(s) couverte(s) |
|---|---|
| S1 Sources d'opportunités | **VISIBILITÉ** (totalité) |
| S2 Blueprint 9 stations | **CIRCULATION** (cœur) + **INTELLIGENCE** (station 04 Qualification via bridge `/rag`, station 07 via bridge `/agents-ia`) |
| S5 Paliers | **CIRCULATION** + introduction graduelle de **INTELLIGENCE** au palier 03/04 |
| S6 Cockpit sectoriel | **VISIBILITÉ** (point d'entrée du flux par secteur) + **CIRCULATION** |
| S7 Méthode | méta — couvre les 4 couches (audit · architecture · construction · suivi) |
| S9 Fondations techniques | **VISIBILITÉ** (SEO/GEO/GMB) + **PILOTAGE** (pilier dédié) |
| Autres sections | servent toutes les couches sans dépendance spécifique |

**Règle d'écriture V6.4** : chaque section doit pouvoir être située dans une ou plusieurs des 4 couches. Une section qui ne rattache à aucune couche est suspecte et doit être ré-examinée.

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

**Anti-jargon SEO / GEO V6.4 (étendu)** — termes interdits dans le corps de page (acceptables uniquement dans cette liste d'interdictions) :

- ❌ « backlinks », « link building », « referring domains », « domain authority »
- ❌ « SERP », « keyword stuffing », « black hat », « grey hat »
- ❌ « position garantie », « première position garantie », « top 3 Google »
- ❌ « apparition garantie dans ChatGPT / Claude / Perplexity / Gemini »
- ❌ « +50 % de trafic », « +N% de visites organiques », « ×N de visibilité »
- ❌ « référencement express », « SEO en 30 jours », « visibilité immédiate »
- ❌ « nous vous positionnons », « nous vous mettons dans ChatGPT »

**Verbes pivots V6.4 autorisés** : *« apparaître »*, *« être trouvable »*, *« vous voyez »*, *« le contenu travaille »*, *« la fiche établissement remonte »*. Tonalité cabinet — jamais d'expertise SEO survendeuse.

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

# ARCHITECTURE FINALE V6.4 — 11 SECTIONS PRINCIPALES + S6bis + S7bis

> **Insertion V6.4** : nouvelle section S1 « Sources d'opportunités » (fan-in 9 canaux) entre le hero et le Blueprint — couvre la couche **VISIBILITÉ**.
> **Glissement +1 V6.4** : S1 V6.3 → S2 V6.4 (Blueprint) · S2 → S3 (Pain) · S3 → S4 (vs Agence) · S4 → S5 (Paliers) · S5 → S6 (Cockpit) · S5bis → S6bis (Scénario) · S6 → S7 (Méthode) · S6bis → S7bis (Respiration) · S7 → S8 (Ce qui change) · S8 → S9 (Fondations) · S9 → S10 (Engagements) · S10 → S11 (CTA).
> **Enrichissements V6.4** : S2 Blueprint 3 bridges (`/rag`, `/automatisation`, `/agents-ia` 🆕) + phrase éditoriale · S5 Paliers correctif mobile + phrase IA palier 03/04 · S6 Cockpit 7ᵉ secteur Commerce local + phrase IA · S7 Méthode étape 06 enrichie + phrase IA étape 05 · S9 Fondations grille 11 piliers (SEO étendu, GEO, GMB, Pilotage) · S10 Engagements bloc ✗ 4ᵉ ligne.

| V6.4 | V6.3 | V6.2 | Section | Statut | Type | Question unique répondue | Couche 4-couches |
|---|---|---|---|---|---|---|---|
| **S0** | S0 | S1 | Hero (H1 cible V6.4 « moteur de vos prochains clients ») | ✅ Live | PageHero | — | — |
| **S1** 🆕 | — | — | **Sources d'opportunités (9 canaux fan-in)** | 🔨 sprint S4.6.5 V6.4 | Fan-in 9 → 1 | *D'où viennent les opportunités ?* | **VISIBILITÉ** |
| **S2** | S1 | S4 | Blueprint « De votre visiteur à votre prochain client » (9 stations) + 3 bridges gamme + phrase éditoriale V6.4 | ✅ Live (composant) — 🔨 bridges/phrase V6.4 | Flux vertical 9 stations | *Comment circulent-elles ?* | **CIRCULATION** + **INTELLIGENCE** (bridges) |
| **S3** | S2 | S2 | Pain « Sans / Avec site connecté » | ✅ Live | Comparaison 2-col | *Que perd-on sans système ?* | CIRCULATION |
| **S4** | S3 | S3 | Pourquoi nous ne sommes pas une agence web classique | ✅ Live | Comparaison 2-col | *Pourquoi Solutions 2IA ?* | — (méta) |
| ~~—~~ | ~~—~~ | ~~S5~~ | ~~Comment une opportunité devient un client (5 étapes)~~ | ❌ Supprimée V6.3 | (absorbée par Blueprint S2) | — | — |
| **S5** | S4 | S6 | Architecture par taille (4 paliers, **mobile 4 en-têtes visibles V6.4**) + phrase IA palier 03/04 | 🔨 sprint ex-S6 V6.2 enrichi V6.4 | Cascade descendante | *Quelle architecture me correspond ?* | CIRCULATION + INTELLIGENCE (paliers 03/04) |
| **S6** | S5 | S7 | Cockpit sectoriel (workflow 4 moments × **7 secteurs V6.4** dont Commerce local) + phrase IA | 🔨 sprint ex-S7 V6.2 enrichi V6.4 | Selector + mini-flux | *Comment cela fonctionne dans mon métier ?* | VISIBILITÉ + CIRCULATION |
| **S6bis** | S5bis | S7bis | Exemple concret (scénario AVANT/APRÈS) | 🔨 sprint ex-S7 V6.2 | Scénario flux comparé | — (appui S6) | — |
| **S7** | S6 | S8 | Comment nous construisons + **étape 06 enrichie V6.4** (suivi mensuel + revue trimestrielle) + phrase IA étape 05 | 🔨 sprint ex-S8 V6.2 enrichi V6.4 | Timeline 6 étapes | *Comment construisez-vous ?* | méta (4 couches) |
| **S7bis** | S6bis | S8bis | Respiration éditoriale | 🔨 sprint ex-S8 V6.2 | Citation pleine largeur | — (appui S7) | — |
| **S8** | S7 | S9 | Ce qui change (6 paires inline barré) | 🔨 sprint ex-S9 V6.2 | Liste inline | *Qu'est-ce qui change ?* | CIRCULATION |
| **S9** | S8 | S10 | Fondations techniques (**grille 11 piliers V6.4** : SEO étendu, GEO, GMB, Pilotage) | 🔨 sprint ex-S10 V6.2 enrichi V6.4 | Grille 4×3 | *Sur quoi repose le système ?* | VISIBILITÉ + PILOTAGE |
| **S10** | S9 | S11 | Nos engagements (✓ + ✗ **bloc ✗ enrichi V6.4 — 4 lignes**) | 🔨 sprint ex-S11 V6.2 enrichi V6.4 | Bipartite | *Quels engagements prenez-vous ?* | — (méta) |
| **S11** | S10 | S12 | CTA final | 🔨 sprint ex-S11 V6.2 | CTABand révisé | *Quelle est la prochaine étape ?* | — |

## S0 V6.4 — Hero ✅ LIVE (H1 V6.3 toujours à appliquer dans le code — différé au sprint dev S4.6.5 V6.4 étape 2)

**Type composant :** PageHero refondu (positionnement « système »).

**Statut :** déjà en production. **V6.3 modifie uniquement le H1.** Tout le reste est conservé tel quel.

**Pour mémoire** :
- Label pill : `Sites web premium · Système connecté` *(inchangé)*
- **H1 V6.3 (à appliquer)** : *« Votre site n'est pas un site. C'est le moteur de vos prochains clients. »*
- H1 V6.2 (ancien, à remplacer) : ~~*« Votre site n'est pas un site. C'est le point de départ de vos opportunités. »*~~
- Sous-titre : *« Un site connecté qui travaille avec votre entreprise, pas à côté d'elle. »* *(inchangé)*
- CTA primaire : *« Concevoir mon système numérique »* *(inchangé)*
- CTA secondaire : *« Voir comment circule une opportunité »* (ancre vers **S1 V6.3 Blueprint**, ex-S4 V6.2) *(libellé inchangé, ancre relogée)*
- Visual : `WebScene` 3D conservé (gated `usePerformanceMode`)

Pill micro-label sous le hero (déjà live) : `Site web · Automatisation · IA documentaire · Outils métier` *(inchangé)*.

**Raison du changement H1 V6.3** : *« point de départ de vos opportunités »* (abstrait — le mot « opportunité » n'est pas dans le vocabulaire quotidien des 6 audiences) devient *« moteur de vos prochains clients »* (concret — « prochain client » est l'unité de bénéfice business directement reconnaissable). Structure rhétorique « n'est pas… c'est… » conservée.

---

## S3 V6.4 — Pain « Sans / Avec site connecté » ✅ LIVE (ex-S2 V6.3, renuméroté V6.4)

**Question unique répondue (règle V6.4)** : *Que perd-on sans système ?*

**Type composant :** Comparaison de fonctionnement 2-col (douleurs à gauche, bascule à droite).

**Statut :** déjà en production. Conserver tel quel.

**Pour mémoire** :
- Titre : *« Ce que coûte réellement un site inefficace »*
- Colonne gauche `SANS SITE CONNECTÉ` : 7 pertes numérotées
- Colonne droite `AVEC UN SITE CONNECTÉ` (carte cyan glow) : *« Le site arrête ces pertes — et les transforme en circulation. »* + 5 promesses ✓
- Bascule : *« Vous arrêtez de perdre ce que vos efforts attirent. »*

Cette section porte déjà le contraste **sans/avec**. Ne pas dupliquer ailleurs.

---

## S4 V6.4 — Pourquoi nous ne sommes pas une agence web classique ✅ LIVE (ex-S3 V6.3, renuméroté V6.4)

**Question unique répondue (règle V6.4)** : *Pourquoi Solutions 2IA ?*

**Type composant :** Comparaison de fonctionnement 2-col (7 paires d'opposition).

**Statut :** déjà en production. Conserver tel quel.

**Pour mémoire** :
- Carte en-tête gauche : `RÉFÉRENCE · Agence web classique · Le site comme livrable`
- Carte en-tête droite (cyan) : `NOTRE POSTURE · Solutions 2IA · Le site comme point d'entrée`
- 7 paires d'opposition · Phrase fermante : *« Le site n'est pas le produit. C'est le point d'entrée. »*

Ton **factuel sans dénigrement**.

---

## S1 V6.4 — Sources d'opportunités 🆕 NOUVELLE V6.4 — 🔨 À CONSTRUIRE (sprint S4.6.5 V6.4)

**Type composant :** Schéma système — topologie fan-in **9 canaux → 1 visiteur** (pas dashboard, pas grille marketing).

**Question unique répondue (règle V6.4)** : *D'où viennent les opportunités ?*

**Couche 4-couches couverte** : **VISIBILITÉ** (totalité)

### Pourquoi cette section

Le Blueprint S2 démarre à `01 Visiteur`. Mais un visiteur ne vient pas par hasard — il provient d'un **canal de visibilité** précis. Sans cette représentation amont, le système connecté commence au milieu de l'histoire et le positionnement *« pas une agence web »* perd une partie de sa preuve visuelle. La S1 V6.4 montre que le site **centralise toutes les sources** en un seul flux.

### Titre H2 et phrase d'introduction

- **H2** : *« D'où viennent vos prochains clients ? »*
- **Phrase d'introduction** : *« Vos prochains clients ne viennent pas par hasard. Ils arrivent par 9 canaux possibles. Solutions 2IA branche ceux qui comptent pour vous. »*

### 9 canaux fan-in (avec sous-labels ToolBadge discrets)

| # | Canal | Sous-label discret (ToolBadge) |
|---|---|---|
| 1 | **Google Search** | référencement organique · contenu structuré |
| 2 | **Google Business Profile** | recherche locale · **avis Google** · fiche établissement |
| 3 | **GEO — Visibilité IA** | ChatGPT · Claude · Perplexity · Gemini |
| 4 | **Réseaux sociaux** | LinkedIn · Instagram · TikTok · YouTube (selon métier) |
| 5 | **Publicité** | Google Ads · Meta Ads · LinkedIn Ads · landing pages |
| 6 | **Recommandation / bouche-à-oreille** | referrals clients · ambassadeurs |
| 7 | **Partenaires** 🆕 V6.4 | apporteurs d'affaires · réseaux pro · syndicats métier |
| 8 | **Salons et événements** 🆕 V6.4 | conférences · foires · webinars |
| 9 | **QR codes / supports physiques** 🆕 V6.4 | flyers · cartes · vitrines · packaging |

### Topologie visuelle (schéma système)

```
   Google Search ────────┐
   GMB (+ avis) ─────────┤
   GEO IA ───────────────┤
   Réseaux sociaux ──────┤
   Publicité ────────────┼──→  VISITEUR  ──→  (S2 Blueprint 9 stations)
   Recommandation ───────┤        │
   Partenaires ──────────┤        │
   Salons / événements ──┤        │
   QR codes / physique ──┘        │
                                  │
   Tous les chemins centralisés ──┘
```

Le **VISITEUR** au centre reprend exactement la pill `01 Visiteur` du Blueprint S2 — **suture visuelle** intentionnelle entre S1 et S2.

### Sous-bloc adaptatif sous le schéma (rappel P2)

> **Tous les canaux n'ont pas le même poids pour vous.**
> Un artisan vit du Google Business Profile et du bouche-à-oreille.
> Un cabinet de conseil vit du SEO, de LinkedIn et des partenaires.
> Un commerce local vit de la recherche locale, des avis et des QR codes en boutique.
> Une PME services vit d'un mix orchestré.
> *Solutions 2IA branche les canaux qui comptent pour vous — et désactive les autres.*

### Phrase fermante et bridge vers S2

- **Phrase fermante** : *« Neuf canaux. Un seul système qui les centralise et les transforme en clients. »*
- **Bridge italique sous nœud VISITEUR** : *« Une fois sur votre site, voici comment l'opportunité circule ↓ »*

### Présentation visuelle

- Conteneur blueprint unique (grammaire S2 héritée).
- Fan-in convergent **9 → 1**. Labels small-caps tracking-widest pour chaque canal.
- Sous chaque canal : sous-label outils en `ToolBadge`.
- Connecteurs SVG fins cyan→accent.
- Nœud central `VISITEUR` en pill cyan saturé (reprend exactement le style de la station `01` du Blueprint S2).
- **1 draw one-shot `whileInView once`** sur les 9 connecteurs convergents (`pathLength` 0→1). Aucune autre animation.

### Distinction visuelle (CG B1)

- **vs fan-in `/rag`** : pas de glow central pulsant, pas de ligne traçante remontant à une source citée — uniquement convergence sobre vers le `VISITEUR`.
- **vs `AutomationPipeline` `/automatisation`** : pas de token animé qui voyage, pas d'état changeant (pending → active → done).
- Format unique sur la page V6.4 — aucune autre section n'utilise une topologie fan-in convergente.

### Mobile (320 → 768 px)

Stack vertical des 9 canaux groupés en **3 paquets de 3** pour lisibilité :
- Paquet « Numérique » : Google Search · GMB · GEO IA
- Paquet « Diffusion » : Réseaux sociaux · Publicité · Recommandation
- Paquet « Terrain » : Partenaires · Salons/événements · QR codes/supports physiques

Une flèche unique sous le 3ᵉ paquet pointe vers le nœud `VISITEUR` final. Aucun fan-in graphique sur mobile.

### Reduced-motion

Tous les SVG initialisés à `pathLength: 1, opacity: 1` au montage. Aucun timer.

### Vérification multi-cible (CG1 — 6 audiences)

- **Auto-entrepreneur** : *« Mes clients viennent du bouche-à-oreille et de LinkedIn. Ces deux canaux sont là. »*
- **Artisan** : *« GMB + recommandation + flyer porte-à-porte. Tout y est. »*
- **Cabinet conseil** : *« SEO, LinkedIn, partenaires, salons. C'est exactement notre mix. »*
- **Commerce local** : *« Google local, avis, QR code sur la vitrine. Tout y est. »*
- **PME services** : *« Mix complet. Et le site centralise. »*
- **Société de services** : *« Partenaires, salons, contenu LinkedIn, ads ciblées. Reconnaissable. »*

### Test 3 questions UX (CG2)

1. *Qu'est-ce que je viens de comprendre ?* → *« Mes prochains clients viennent de 9 canaux possibles, qui convergent vers mon site. »*
2. *Pourquoi c'est utile pour moi ?* → *« Solutions 2IA branche les canaux qui comptent pour mon activité, en un système. »*
3. *Quel problème cela règle ?* → *« Aujourd'hui, chaque canal vit séparément. Le site les unifie en un seul flux. »*

### Garde-fous copy

- ❌ **Aucune promesse** de position Google ou d'apparition garantie dans ChatGPT/Claude/Perplexity (cf. anti-jargon SEO Section 5).
- ❌ **Aucune metric inventée** (`+N%` de trafic, `×N` de visibilité).
- ❌ **Aucun logo** Google / OpenAI / Anthropic / Perplexity en bandeau (pas d'effet « prestataire affilié »).
- ✅ Verbes pivots : *« apparaître »*, *« être trouvable »*, *« le contenu travaille »*, *« la fiche établissement remonte »*.

---

## S2 V6.4 — Blueprint « De votre visiteur à votre prochain client » ✅ LIVE (composant, ex-S1 V6.3, renuméroté V6.4)

**Type composant :** Diagramme de flux vertical 9 stations (style blueprint / control room).

**Statut :** déjà en production. **V6.3 déplace cette section** : ex-S4 V6.2 → S1 V6.3 (juste après le hero). Aucune modification du composant `WebOpportunityFlow` ni du copy interne — seule la **position dans `SitesWebPage.tsx`** change.

**Cap visuel locké** — toutes les sections suivantes héritent de cette grammaire.

**Pour mémoire** :
- Badge `COMMENT CIRCULE UNE OPPORTUNITÉ`
- H2 : *« De votre visiteur à votre **prochain client**. »*
- Boundary labels `ENTRÉE · SYSTÈME CONNECTÉ` / `SORTIE · OPPORTUNITÉ CONVERTIE`
- 9 stations : Visiteur · Site web · Formulaire intelligent · Qualification · CRM · Notification · Collaborateur · Suivi · Client
- 8 connecteurs SVG fins · **1 anim cœur** draw one-shot
- Phrase fermante : *« Le site déclenche le flux. Chaque étape transmet le contexte. Personne n'a à y penser — et personne ne tombe entre les mailles. »*

### Bridges narratifs V6.4 (3 ponts gamme)

Le Blueprint S2 est le **carrefour gamme** : trois sous-labels italiques discrets sont logés sous les stations correspondantes, pour orienter le visiteur intéressé par une dimension précise (sans rompre la lecture du flux).

- Sous la station **04 Qualification**, sous-label italique discret : *« Quand l'IA doit consulter votre mémoire métier → `/rag` »*
- Sous la station **06 Notification**, sous-label italique discret : *« Quand l'action se déclenche dans vos outils → `/automatisation` »*
- Sous la station **07 Collaborateur** 🆕 V6.4, sous-label italique discret : *« Quand une tâche peut s'exécuter sans humain → `/agents-ia` »*

Ces 3 bridges respectent la règle existante du Blueprint : sous-label discret, pas de modification visuelle majeure du composant, pas d'animation supplémentaire. Ils servent la cohérence de gamme (cf. Section 3 du brief). **Évolution V6.3 → V6.4** : le bridge `/agents-ia` est ajouté pour couvrir la couche **INTELLIGENCE** au-delà de RAG (cf. architecture 4 couches en section 2bis).

### Phrase éditoriale V6.4 (vente naturelle sans catalogue)

À insérer **sous le Blueprint**, juste avant la phrase fermante existante, en italique discret :

> *« Chacune des 9 étapes peut être renforcée par nos solutions IA — automatisation, mémoire métier ou agent autonome — selon ce que votre activité réclame. »*

Cette phrase remplace toute énumération de produits. Le visiteur sent que `/automatisation`, `/rag`, `/agents-ia` sont **des options du système**, pas des prestations à la carte d'un catalogue. Le même registre éditorial est décliné — sans répétition mot-pour-mot — dans S5 (sous palier 03 PME et palier 04 ETI), S6 (sous le mini-flux 4 moments du cockpit affiché) et S7 (sous étape 05 Connexions).

**Garde-fou** : la phrase n'apparaît jamais comme une publicité (*« découvrez nos solutions ! »*). Elle s'inscrit toujours **dans la logique métier** de la section concernée. Aucun lien direct vers `/automatisation`, `/rag`, `/agents-ia` depuis S5/S6/S7 — les liens vivent uniquement dans le Blueprint S2 (3 bridges ci-dessus) et dans le Cockpit S6 secteur-par-secteur (bridges `/automatisation/<secteur>`).

### Universalité Blueprint V6.4 (règle inviolable)

**Le Blueprint 9 stations doit rester générique et universel.** Aucune variante par audience, aucune mention sectorielle, aucun outil nommé dans les stations principales. Les 9 stations servent **les 6 audiences simultanément** (auto-entrepreneur, artisan, cabinet, commerce local, PME, société de services). L'adaptation par maturité (paliers) est traitée en S5 V6.4 ; l'adaptation par métier (cockpits) est traitée en S6 V6.4 ; l'adaptation par canal de visibilité amont est traitée en S1 V6.4.

### Vérification multi-cible étendue V6.4 (CG1 — 6 lectures)

À écrire lors de la mise à jour du brief de cette section pour atteindre conformité V6.4 (extension de la liste indé/PME/ETI déjà présente à 6 lignes — auto-entrepreneur / artisan / cabinet / commerce local / PME / société de services).

---

## ~~Section 5 V6.2 — Comment une opportunité devient un client (5 étapes)~~ ❌ SUPPRIMÉE V6.3

> **Décision V6.3** : cette section est **supprimée** du brief et de la roadmap.
> **Raison** : redondance confirmée avec le Blueprint 9 stations (S1 V6.3, ex-S4 V6.2). Les deux racontaient le même mécanisme à des granularités proches (9 vs 5 étapes). Le Blueprint est plus complet, **est déjà live**, et reste générique/universel pour les 6 audiences. Les 5 étapes ne seront pas construites.
>
> **Conséquences :**
> - **Sprint S5 du brief V6.2 (`WebSystemArchitecture` + `webArchitectureData`) annulé.** Charge supprimée.
> - Les bridges narratifs qui devaient être ancrés dans cette section (`/rag` sous Qualification, `/automatisation` sous Action) sont **relogés dans le Blueprint S1 V6.3** (cf. ci-dessus).
> - La numérotation des sections suivantes glisse : Section 6 V6.2 → S4 V6.3, Section 7 → S5, Section 7bis → S5bis, Section 8 → S6, Section 8bis → S6bis, Section 9 → S7, Section 10 → S8, Section 11 → S9, Section 12 → S10.
>
> Le contenu détaillé de la S5 V6.2 (flux horizontal 5 zones, sous-bloc adaptatif P1/P3/P4, outils en sous-label, etc.) n'est plus normatif. Cette section est conservée dans l'historique du brief uniquement à titre d'archive — **ne pas la reconstruire**.

---

## S5 V6.4 — Une architecture adaptée à votre taille 🔨 À CONSTRUIRE (ex-S4 V6.3 / ex-S6 V6.2, renuméroté V6.4 — correctif mobile + phrase IA)

**Question unique répondue (règle V6.4)** : *Quelle architecture me correspond ?*

**Couche 4-couches couverte** : **CIRCULATION** (cœur) + **INTELLIGENCE** progressive aux paliers 03/04 (cf. phrase éditoriale V6.4 ci-dessous)

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
- **Mobile / tablette (< 1024 px) — correctif V6.4** : **stack vertical avec les 4 en-têtes 01–04 visibles** (label de taille + sous-titre), contenu replié par défaut sur **tous** les paliers. L'utilisateur déplie son palier au tap. ❌ **Plus d'accordéon PME-ouvert par défaut** (qui éjectait l'auto-entrepreneur en lui faisant croire que le palier 03 est la norme).
- Chaque palier : step number 01-04 + label de taille en small-caps tracking-widest + mini-flux cascade descendante + sous-titre + chips outils sobres + verdict métier en italique.
- Liserés cyan→accent progressifs (token CSS par palier, pas animation) — 01 cyan saturé / 02 cyan-accent mix / 03 accent-light / 04 accent-light + glow.
- Aucune anim continue. Sur desktop : stagger d'entrée séquentielle (opacity 0→1, max 80ms par palier, pas de translateY). Sur mobile : tous les en-têtes visibles immédiatement, contenu déplié au tap.

### Phrase éditoriale V6.4 (sous palier 03 PME et palier 04 ETI)

À insérer en italique discret sous le verdict métier des paliers 03 et 04 :

> *« À ce palier, l'IA documentaire (RAG) et les agents IA viennent renforcer les étapes les plus répétitives. »*

Cette phrase matérialise la couche **INTELLIGENCE** sur les paliers où elle commence à apporter de la valeur, **sans lien direct** vers `/rag` ou `/agents-ia` (les liens vivent uniquement dans le Blueprint S2). Reste dans la logique métier du palier (P3 : l'IA est ajoutée uniquement quand elle change le quotidien).

**Phrase fermante** :
*« Nous démarrons toujours là où vous en êtes. Le reste s'ajoute quand le besoin apparaît. »*

**Vérification multi-cible (CG1)** :
- **Auto-entrepreneur** comprend : *« Mon palier existe (01 Indépendant). Je le vois directement sur mobile sans devoir chercher. Je peux démarrer sans CRM ni IA. »*
- **Artisan** comprend : *« Mon palier (02 TPE) ajoute juste un CRM léger et de la relance auto. »*
- **Cabinet conseil** comprend : *« Mon palier (03 PME) est l'architecture complète avec RAG sur mes documents. »*
- **Commerce local** comprend : *« Mon palier (02 TPE) ou (03 PME) selon ma taille. Visible dès l'arrivée sur la section. »*
- **PME** comprend : *« Mon palier (03 PME) est l'architecture complète : flux, outils, IA ciblée. »*
- **Société de services** comprend : *« Mon palier (03 PME ou 04 ETI) couvre mes multi-équipes. Mon palier (04 ETI) ajoute RAG métier et agents — sans tout refondre. »*

**Test 3 questions UX (CG2)** :
1. *Qu'est-ce que je viens de comprendre ?* → *« Il y a 4 niveaux de système, je suis quelque part dedans. »*
2. *Pourquoi c'est utile pour moi ?* → *« Je vois exactement ce que mon entreprise peut activer aujourd'hui, et ce qui s'ajoute plus tard. »*
3. *Quel problème cela règle ?* → *« La peur que le système soit surdimensionné — ou au contraire trop petit. »*

---

## S6 V6.4 — Exemples par métier (Cockpit sectoriel) 🔨 À CONSTRUIRE (ex-S5 V6.3 / ex-S7 V6.2, renuméroté V6.4 — 7ᵉ secteur Commerce local + phrase IA) — REMPLACE `WebGalaxyShowcase`

**Question unique répondue (règle V6.4)** : *Comment cela fonctionne dans mon métier ?*

**Couche 4-couches couverte** : **VISIBILITÉ** (point d'entrée du flux par secteur) + **CIRCULATION**

**Type composant :** Vue sectorielle — sélecteur en pills (6 secteurs) + 1 mini-flux visible à la fois, format **workflow d'entreprise** (4 moments structurés).

**Décision** : `WebGalaxyShowcase` (2 331 LOC) est **remplacée intégralement**.

### Grammaire imposée (CG4) — chaque secteur raconte 4 moments

Chaque mini-flux sectoriel doit raconter **comment l'entreprise travaille** au travers de 4 moments clés :

1. **Le point d'entrée** (label small-caps « ENTRÉE ») — d'où vient l'opportunité.
2. **La décision** (label small-caps « DÉCISION ») — la qualification, le tri, le choix.
3. **L'action** (label small-caps « ACTION ») — ce qui se déclenche automatiquement.
4. **Le résultat** (label small-caps « RÉSULTAT ») — ce que l'entreprise obtient concrètement.

Une simple succession de blocs (« Visiteur → Site → Formulaire → CRM → Suite ») est **rejetée**. On doit comprendre comment l'entreprise travaille à travers ces 4 moments, pas suivre 5 stations neutres.

### 7 secteurs canoniques V6.4 (révisés selon CG4 + ajout Commerce local V6.4)

| Secteur | Entrée | Décision | Action | Résultat |
|---|---|---|---|---|
| **Immobilier** | Demande d'estimation | Qualification du bien | Envoi au bon agent | Rendez-vous fixé |
| **Restaurant** | Réservation en ligne | Vérification de disponibilité | Confirmation et rappel | Table préparée à l'heure |
| **Artisan** | Demande de devis | Estimation et planning | Devis envoyé + relance auto | Intervention planifiée |
| **Cabinet conseil** | Demande d'audit | Qualification du besoin | Affectation au consultant | Premier RDV confirmé |
| **Médical** | Prise de RDV en ligne | Vérification du créneau | Confirmation patient + rappel SMS | Cabinet prêt à l'arrivée |
| **E-commerce** | Commande passée | Paiement et stock validés | Préparation + transporteur | Client livré et notifié |
| **Commerce local / Boutique** 🆕 V6.4 | Recherche locale Google + fiche GMB | Disponibilité produit / créneau | Confirmation client + notification équipe boutique | Client servi en boutique ou produit prêt pour retrait |

### Phrase éditoriale V6.4 (sous le mini-flux 4 moments affiché)

À insérer en italique discret sous le mini-flux affiché, avant les CTAs :

> *« Selon votre métier, certaines étapes gagnent à être renforcées par l'IA. Discutons-en. »*

Aucun lien direct vers `/rag`, `/automatisation` ou `/agents-ia` depuis cette phrase (les liens vivent uniquement dans le Blueprint S2). Cette phrase reste dans la logique métier du cockpit affiché et invite à un échange.

### Présentation visuelle

- Sélecteur horizontal en pills (**7 secteurs V6.4**) en haut de section, 1 mini-flux visible à la fois.
- Chaque mini-flux affiché : 4 step pills horizontales (entrée / décision / action / résultat), liseré cyan→accent entre les pills, labels small-caps tracking-widest.
- Sous le mini-flux affiché : **1 phrase contextualisante** (factuelle, 1 ligne, sans jargon) + **phrase éditoriale V6.4** + CTA *« Voir le flux complet → `/automatisation/<secteur>` »* (si secteur couvert) ou *« Discutons de votre cas → `/contact` »* (sinon).
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

## S6bis V6.4 — Exemple concret (scénario AVANT/APRÈS) 🔨 À CONSTRUIRE (ex-S5bis V6.3 / ex-S7bis V6.2, renuméroté V6.4 — appui pédagogique de S6 Cockpit)

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

## S7 V6.4 — Comment nous construisons votre système 🔨 À CONSTRUIRE (ex-S6 V6.3 / ex-S8 V6.2, renuméroté V6.4 — étape 06 enrichie + phrase IA étape 05)

**Question unique répondue (règle V6.4)** : *Comment construisez-vous ?*

**Couche 4-couches couverte** : méta — couvre les 4 couches (audit · architecture · construction · suivi)

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
| 06 | **Mise en production** (enrichie V6.4) | Un bug en prod = une opportunité perdue. Et après la prod : un système qui n'évolue plus s'éteint. | QA cross-device · monitoring · documentation · formation · **suivi mensuel** · **revue trimestrielle**. | Système stable, documenté, équipes formées. **Suivi mensuel** (santé technique + santé business). **Revue trimestrielle** (ajustements automatisations + opportunités d'évolution). |

### Phrase éditoriale V6.4 (sous étape 05 Connexions)

À insérer en italique discret sous le tableau de l'étape 05 :

> *« Quand l'IA est justifiée (P3), elle est branchée à cette étape. Sinon, elle ne l'est pas. »*

Cette phrase matérialise la couche **INTELLIGENCE** dans la méthode de construction (et non comme une couche à part vendue séparément). Reste dans la logique métier de l'étape Connexions. Aucun lien direct vers `/rag`, `/automatisation` ou `/agents-ia`.

### Justification de l'enrichissement étape 06 (V6.4)

L'enrichissement *« Suivi mensuel · Revue trimestrielle »* matérialise la couche **PILOTAGE** sans créer de section dédiée. Vérifie *« ce n'est pas une livraison, c'est une relation continue »* sans tomber dans le discours « contrat de maintenance ». La revue trimestrielle s'appuie sur le pilier 11 « Pilotage » de la section S9 Fondations.

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

## S7bis V6.4 — Respiration éditoriale 🔨 À CONSTRUIRE (ex-S6bis V6.3 / ex-S8bis V6.2, renuméroté V6.4 — appui pédagogique de S7 Méthode)

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

## S8 V6.4 — Ce qui change dans votre entreprise 🔨 À CONSTRUIRE (ex-S7 V6.3 / ex-S9 V6.2, renuméroté V6.4)

**Question unique répondue (règle V6.4)** : *Qu'est-ce qui change ?*

**Couche 4-couches couverte** : **CIRCULATION** (impacts opérationnels du système connecté)

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

## S9 V6.4 — Fondations techniques 🔨 À CONSTRUIRE (ex-S8 V6.3 / ex-S10 V6.2, renuméroté V6.4 — grille élargie de 8 à 11 piliers, conservée dans le flux principal)

**Question unique répondue (règle V6.4)** : *Sur quoi repose le système ?*

**Couches 4-couches couvertes** : **VISIBILITÉ** (piliers 03–05 : SEO étendu, GEO, GMB) + **PILOTAGE** (piliers 10–11 : Analytics, Pilotage)

**Type composant :** Liste structurée — **11 piliers V6.4** (vs 8 en V6.3) avec colonne « Couche 4-couches » et technos en sous-label discret.

**Pas une liste de logos.** Chaque pilier = un **bénéfice business**, la techno arrive en sous-label.

### Grille 11 piliers V6.4 (avec colonne Couche)

| # | Pilier | Couche 4-couches | Bénéfice business (1 ligne) | Sous-label techno |
|---|---|---|---|---|
| 01 | **Performance** | — | Votre site répond vite, partout. | `Next.js · build optim · lazy loading` |
| 02 | **Accessibilité** | — | Votre site reste utilisable par tous. | `WCAG 2.2 · clavier · lecteurs d'écran · contrastes` |
| 03 | **SEO** 🆕 enrichi V6.4 | **VISIBILITÉ** | Vous apparaissez quand vos clients cherchent. | `pages structurées · maillage interne · schema.org · Core Web Vitals` |
| 04 | **GEO** 🆕 V6.4 | **VISIBILITÉ** | Vous apparaissez dans les réponses IA. | `contenus extractibles · expertise structurée · FAQ métier · llms.txt` |
| 05 | **Présence locale GMB** 🆕 V6.4 | **VISIBILITÉ** | Vous êtes trouvable autour de vous. | `Google Business Profile · avis Google · NAP cohérent · catégories métier` |
| 06 | **Responsive** | — | Vous êtes lisible sur chaque écran. | `mobile-first · 320 → 4K` |
| 07 | **Sécurité** | — | Vos données et celles de vos clients sont protégées. | `HTTPS · CSP · audit dépendances` |
| 08 | **Maintenabilité** | — | Votre site reste maintenable dans la durée. | `TypeScript · tests · documentation` |
| 09 | **Évolutivité** | — | Vous ajoutez sans tout refaire. | `architecture modulaire · APIs claires` |
| 10 | **Analytics** | **PILOTAGE** | Vous mesurez sans tracking invasif. | `Plausible · Posthog · GA4 (au choix)` |
| 11 | **Pilotage** 🆕 V6.4 | **PILOTAGE** | Vous voyez ce qui marche, et vous ajustez. | `suivi des demandes · KPI métier · revue trimestrielle` |

### Garde-fous copy V6.4 (renforcés)

- ❌ **Aucune promesse de position Google** ni d'apparition garantie dans ChatGPT/Claude/Perplexity (cf. anti-jargon SEO Section 5 + bloc ✗ S10 V6.4).
- ❌ **Aucun chiffre de performance promis** (`Lighthouse 95+`, `<1s`, `+N%`).
- ❌ **Aucun jargon SEO/GEO survendeur** (`backlinks`, `link building`, `SERP`, `domain authority`).
- ✅ **Verbes pivots V6.4** : *« vous apparaissez »*, *« vous êtes trouvable »*, *« vous voyez »*, *« vous ajustez »* — pas *« nous vous positionnons »*, pas *« nous vous mettons dans ChatGPT »*.

**Présentation visuelle :**
- Grille **4×3** ou 3×4 selon largeur (vs 4×2 V6.3) ; sur mobile 2×6 ou 1×11 selon largeur.
- Chaque pilier : icône discrète + nom (typo premium) + label « Couche » en small-caps tracking-widest (seulement pour les piliers SEO/GEO/GMB/Analytics/Pilotage qui ont une couche assignée) + 1 ligne de bénéfice + sous-label techno chips sobres.
- Aucun chiffre de performance promis.

**Phrase fermante** : *« Les fondations ne se voient pas. Elles expliquent pourquoi le système tient — pour être trouvé, pour circuler, pour évoluer. »*

---

## S10 V6.4 — Nos engagements (✓ Ce que nous garantissons + ✗ Ce que nous ne promettons pas — 4 lignes ton cabinet V6.4) 🔨 À CONSTRUIRE (ex-S9 V6.3 / ex-S11 V6.2, renuméroté V6.4 — bloc ✗ enrichi 4 lignes — FUSION S11+S12 V6.1)

**Question unique répondue (règle V6.4)** : *Quels engagements prenez-vous ?*

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

### Bloc 2 — Ce que nous ne promettons pas (typographie pure — **reformulé V6.3 en ton cabinet**)

**Format** : pas de grille, pas de cards. Typographie pure pleine largeur — intitulé `text-2xl font-semibold`, justification `text-base text-text-secondary`, tiret cadratin `—` sobre cyan désaturé en début de ligne. Plus de symbole ✗ Unicode (trop confrontatif).

**Phrase chapeau V6.4** : *« Nous restons clairs sur quatre points : »*  *(V6.3 : trois points · V6.4 : ajout d'une 4ᵉ ligne SEO/GEO non garantis)*

```
— Pas de résultats instantanés.
  Le référencement, la notoriété et les processus se construisent
  dans le temps.

— Pas de solutions standardisées sans analyse préalable.
  Chaque activité a ses contraintes, ses outils et ses objectifs.

— Pas d'IA sans utilité réelle.
  Chaque composant doit répondre à un besoin concret.

— Pas de position Google garantie ni d'apparition garantie dans les   🆕 V6.4
  réponses IA. La visibilité organique se construit par la qualité
  du contenu, de la structure et de la confiance dans la durée.
```

**Ce qui est supprimé V6.3 (ne pas reconstruire)** :
- ❌ Toute mention de prix (« pas de site à 500 € »).
- ❌ Tout multiplicateur (« pas de ×10 de chiffre d'affaires »).
- ❌ Toute formulation type « pas de template générique », « pas de lancement sans cadrage ».
- ❌ Le symbole ✗ Unicode en début de ligne (remplacé par tiret cadratin `—`).

**Justification V6.4 — pourquoi la 4ᵉ ligne** : V6.4 introduit SEO/GEO/GMB explicitement (S1 Sources d'opportunités + S9 Fondations piliers 03–05). Le bloc ✗ doit explicitement répondre à la promesse implicite que le visiteur pourrait entendre (*« je vais être premier sur Google »* ou *« je vais apparaître dans ChatGPT »*). La 4ᵉ ligne désamorce cette attente et maintient la posture honnête du cabinet.

**Pourquoi cette reformulation V6.3 → V6.4** : le ton cabinet calme et factuel **renforce la crédibilité** de Solutions2IA sans donner l'impression de critiquer le marché. Le visiteur doit penser *« ils semblent sérieux et raisonnables »*, pas *« ils se différencient en critiquant les autres »*. La posture honnête est conservée (désamorçage du doute, transformation du sceptique en lead qualifié), mais elle s'exprime dans un registre **consultant haut de gamme**, pas dans un registre défensif ou anti-concurrent.

**Position dans la section** : juste après le bloc ✓ garanties et le séparateur `glow-line` (inchangés V6.3/V6.4), avant le CTA final S11 V6.4.

---

## S11 V6.4 — CTA final 🔨 À CONSTRUIRE (ex-S10 V6.3 / ex-S12 V6.2, renuméroté V6.4)

**Question unique répondue (règle V6.4)** : *Quelle est la prochaine étape ?*

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

# SPRINTS (mis à jour V6.4 — patch éditorial, roadmap V6.3 conservée)

> **V6.4 ajoute un nouveau sprint `S4.6.5`** dédié à la couche **VISIBILITÉ** + ponts gamme. Le reste de la suite S4.5 → S12 du brief V6.3 est conservé, avec **enrichissements V6.4** intégrés dans chaque sprint déjà planifié (S6, S7, S8, S10, S11).
> Le **patch documentaire V6.3 → V6.4 sur `docs/pages/sites-web.md`** est appliqué hors sprint (action de cadrage, équivalent S4.6.5 étape 1 markdown).

| Sprint | Sections (V6.4) | Composants à créer / actions |
|---|---|---|
| **S4.5 V2** ✅ | Nettoyage immédiat ✅ TERMINÉ | Suppression `WebGalaxyShowcase` (instance + import) · 3 widgets décoratifs `WebScene` (browser mockup, Lighthouse, Responsive) · section Features 6 cards · section Livrables/Processus · réordre Blueprint en S1 (LIVE) · neutralisation copy `CTABand` (« Discutons de votre système numérique »). |
| **S4.6** ✅ | Mise à niveau brief V6.2 → V6.3 ✅ TERMINÉ | Édition `docs/pages/sites-web.md` : V6.3 patch ciblé (réordre Blueprint S1, suppression S5 V6.2, reformulation bloc ✗ ton cabinet, H1 ajusté, CG1 étendu à 6 audiences). |
| **S4.6.5 V6.4** 🆕 | Mise à niveau brief V6.3 → V6.4 + sprint dev Visibilité | **Étape 1 (markdown)** : patch documentaire V6.3 → V6.4 (architecture 4 couches en section 2bis, règle « 1 = 1 » en section 1ter, nouvelle S1 V6.4 Sources d'opportunités, glissement +1 sur les sections, bridges S2 Blueprint, anti-jargon SEO, renumérotation, DoD étendue). **Étape 2 (code)** : création composant `WebOpportunitySources` + data `webOpportunitySourcesData` (9 canaux fan-in, sous-bloc adaptatif) · insertion dans `SitesWebPage.tsx` juste après le micro-label, avant `<WebOpportunityFlow />` · modification mineure de `WebOpportunityFlow` (3ᵉ bridge `/agents-ia` sous station 07 + phrase éditoriale V6.4 sous le flux) · application du H1 V6.3 enfin (« moteur de vos prochains clients »). |
| ~~**S5**~~ | ~~Comment une opportunité devient un client (5 étapes)~~ | ❌ **ANNULÉ V6.3** — section absorbée par S2 Blueprint live. `WebSystemArchitecture` + `webArchitectureData` non construits. Charge supprimée. |
| **S6** → **(sprint ex-S6 V6.2)** | **S5 V6.4** — Architecture par taille (correctif mobile V6.4 + phrase IA palier 03/04) | `WebArchitectureBySize` + `webSizeData` (4 paliers, cascade descendante, step numbers 01-04, **stack vertical mobile avec 4 en-têtes visibles V6.4** — plus d'accordéon PME-ouvert) + phrase éditoriale V6.4 sous paliers 03 et 04 |
| **S7** → **(sprint ex-S7 V6.2)** | **S6 V6.4** — Cockpit sectoriel (7 secteurs V6.4) + **S6bis V6.4** scénario | `WebSectorFlows` + `webSectorFlowsData` (**7 secteurs V6.4 avec ajout Commerce local** × 4 moments entrée/décision/action/résultat, selector, bridges /automatisation/<secteur>) + phrase éditoriale V6.4 sous mini-flux + scénario AVANT/APRÈS inline (S6bis V6.4, 2 flux verticaux statiques) — **remplace** `WebGalaxyShowcase` |
| **S8** → **(sprint ex-S8 V6.2)** | **S7 V6.4** — Comment on construit (étape 06 enrichie V6.4) + **S7bis V6.4** respiration | `WebBuildProcess` + `webBuildProcessData` (avec bloc « Nous partons de l'existant » en en-tête + **étape 06 enrichie V6.4** : suivi mensuel + revue trimestrielle + phrase éditoriale V6.4 sous étape 05 Connexions) + citation pleine largeur inline (S7bis V6.4) |
| **S9** → **(sprint ex-S9 V6.2)** | **S8 V6.4** — Ce qui change (6 paires inline barré) | `WebChangePairs` + `webChangePairsData` (format inline line-through + flèche + accent, 6 paires) |
| **S10** → **(sprint ex-S10 V6.2)** | **S9 V6.4** — Fondations techniques (grille 11 piliers V6.4) | `WebFoundations` + `webFoundationsData` (**11 piliers V6.4 avec SEO étendu, GEO, GMB, Pilotage** + colonne « Couche 4-couches », grille 4×3, sous-labels ToolBadge) |
| **S11** → **(sprint ex-S11 V6.2)** | **S10 V6.4** Engagements (bloc ✗ 4 lignes V6.4) + **S11 V6.4** CTA | `WebEngagements` (✓ 8 garanties grille 4×2 + glow-line + **bloc ✗ V6.4 en 4 lignes ton cabinet** — ajout 4ᵉ ligne SEO/GEO non garantis) + révision `CTABand` copy + mini-schéma horizontal statique |
| **S12** | Audit final V6.4 | Perf · a11y · grep jargon · grep chiffres · **grep anti-jargon SEO** (`backlinks`, `link building`, `SERP`, `domain authority`, `referring domains`) · responsive iPhone · vérifs **CG1 6 audiences V6.3** + CG2 3 questions UX + **règle V6.4 « 1 section = 1 question »** · `pnpm build` |

**Règle inviolable :** aucun sprint ne se lance sans validation utilisateur explicite. Aucun sprint ne se termine sans screenshot rendu validé.

**Note V6.4 sur les numéros de sprint** : on conserve les libellés de sprint historiques (S4.5, S4.6, **S4.6.5 V6.4 🆕**, S6, S7, S8, S9, S10, S11, S12) pour ne pas casser la traçabilité des commits et des PR existants. Les **sections livrées par chaque sprint** sont en revanche renumérotées selon V6.4 (colonne « Sections (V6.4) » ci-dessus).

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

# DEFINITION OF DONE (page complète — V6.4)

### Critères V6.4 spécifiques 🆕

- [ ] Brief V6.4 déposé dans `docs/pages/sites-web.md` (patch éditorial V6.3 → V6.4 appliqué).
- [ ] **V6.4 — Architecture 4 couches** `VISIBILITÉ → CIRCULATION → INTELLIGENCE → PILOTAGE` formalisée en section 2bis du brief et appliquée comme grille interne (chaque section S1–S11 rattachée à 0/1/N couches).
- [ ] **V6.4 — Règle « 1 section = 1 question »** formalisée en section 1ter avec table des 11 questions S1 → S11, et vérifiée section par section (aucune section ne couvre plusieurs questions sans simplification).
- [ ] **V6.4 — S1 V6.4 Sources d'opportunités** spécifiée intégralement dans le brief (9 canaux fan-in, sous-bloc adaptatif, phrase fermante, bridge vers S2). Composant `WebOpportunitySources` créé et inséré en S1 dans `SitesWebPage.tsx` (sprint dev S4.6.5 V6.4 étape 2).
- [ ] **V6.4 — S2 Blueprint** : 3 bridges (`/rag` station 04, `/automatisation` station 06, `/agents-ia` station 07 🆕) + phrase éditoriale V6.4 *« Chacune des 9 étapes peut être renforcée par nos solutions IA »* tous présents dans le composant `WebOpportunityFlow`.
- [ ] **V6.4 — Phrase éditoriale** déclinée dans 4 sections sans répétition mot-pour-mot : S2 (Blueprint), S5 (Paliers 03/04), S6 (Cockpit sous mini-flux), S7 (Méthode étape 05).
- [ ] **V6.4 — S5 Paliers correctif mobile** : stack vertical avec 4 en-têtes 01–04 visibles, contenu replié par défaut sur tous. Plus d'accordéon PME-ouvert.
- [ ] **V6.4 — S6 Cockpit 7ᵉ secteur** Commerce local livré (Entrée recherche locale Google + GMB · Décision disponibilité produit/créneau · Action confirmation client + notification équipe · Résultat client servi en boutique).
- [ ] **V6.4 — S7 Méthode étape 06 enrichie** : livrable inclut **« Suivi mensuel (santé technique + santé business). Revue trimestrielle (ajustements + opportunités d'évolution). »** + phrase éditoriale V6.4 sous étape 05 Connexions.
- [ ] **V6.4 — S9 Fondations grille 11 piliers** (vs 8 en V6.3) avec colonne « Couche 4-couches » : SEO étendu (VISIBILITÉ), GEO (VISIBILITÉ), Présence locale GMB (VISIBILITÉ), Analytics (PILOTAGE), Pilotage (PILOTAGE).
- [ ] **V6.4 — S10 Engagements bloc ✗** : 4 lignes (vs 3 en V6.3), ajout 4ᵉ ligne *« Pas de position Google garantie ni d'apparition garantie dans les réponses IA »* + phrase chapeau « Nous restons clairs sur **quatre** points ».
- [ ] **V6.4 — Section 5 Interdictions** : anti-jargon SEO ajouté (`backlinks`, `link building`, `SERP`, `domain authority`, `referring domains`, `position garantie`, `apparition garantie dans ChatGPT/Claude/Perplexity`).
- [ ] **V6.4 — Grep anti-jargon SEO** sur `app/sites-web/`, `components/sections/sites-web/`, `components/scenes/web/` = **0 occurrence** des termes interdits ci-dessus.
- [ ] **V6.4 — Bridges gamme complète** : `/rag` + `/automatisation` + `/agents-ia` tous accessibles depuis le Blueprint S2 (couverture totale de la gamme depuis `/sites-web`).
- [ ] **V6.4 — Note stratégique** marquée ✅ « Réalisée en V6.4 » avec encart de statut en haut.

### Critères V6.3 hérités (maintenus)

- [ ] Brief V6.3 déposé dans `docs/pages/sites-web.md` (patch ciblé V6.2 → V6.3 appliqué).
- [ ] **V6.3 — H1 hero ajusté** : `« Votre site n'est pas un site. C'est le moteur de vos prochains clients. »` (à la place de l'ancien `« point de départ de vos opportunités »`).
- [ ] **V6.3 — Blueprint repositionné en S1**, juste après le hero (déplacement dans `SitesWebPage.tsx`, composant `WebOpportunityFlow` inchangé).
- [ ] **V6.3 — Bridges narratifs `/rag` et `/automatisation` relogés** dans le Blueprint S1 (sous-labels italiques sous stations « Qualification », « Notification » / « Suivi »).
- [ ] **V6.3 — S5 V6.2 supprimée** (5 étapes opportunité → client) · sprint S5 annulé · `WebSystemArchitecture` non construit.
- [ ] **V6.3 — Bloc ✗ S9 V6.3 (ex-S11 V6.2) reformulé en 3 lignes ton cabinet**, suppression complète des mentions de prix (« pas de site à 500 € ») et multiplicateurs (« ×10 de CA ») et formulations « pas de template » / « pas de lancement sans cadrage ».
- [ ] **V6.3 — CG1 étendu à 6 audiences** (auto-entrepreneurs · artisans · cabinets · commerces locaux · PME · sociétés de services) — Solutions2IA ne cible pas les particuliers (mention explicite).
- [ ] S4.5 nettoyage : `PremiumFlowPanel`, `TransformationCard`, metric-tiles, mockups chrome, faux dashboards → **supprimés**. **V6.3 ajoute** : chiffres `WebGalaxyShowcase` (+38%, ×3, +52%…), `CTABand` (« tripler votre taux de conversion »), section « Expertise » jargon → supprimés.
- [ ] S4.6 mise à niveau brief V6.2 → V6.3 effectuée (patch ciblé : réordre Blueprint S1, suppression S5, reformulation bloc ✗, H1 ajusté, CG1 6 audiences).
- [ ] Sprint ex-S6 V6.2 → **S4 V6.3** Architecture par taille (4 paliers, cascade descendante avec step numbers 01-04, **accordion mobile PME-ouvert**) livrée 🆕.
- [ ] Sprint ex-S7 V6.2 → **S5 V6.3** Cockpit sectoriel (6 secteurs × 4 moments entrée/décision/action/résultat, selector + bridges /automatisation/<secteur>) + **S5bis V6.3** scénario AVANT/APRÈS pédagogique livrés · `WebGalaxyShowcase` supprimé.
- [ ] Sprint ex-S8 V6.2 → **S6 V6.3** Comment on construit (6 étapes + en-tête « Nous partons de l'existant ») livré + **S6bis V6.3** respiration éditoriale citation pleine largeur insérée.
- [ ] Sprint ex-S9 V6.2 → **S7 V6.3** Ce qui change (**6 paires inline barré**, pas 8, pas de 2-col, pas de cards) livré.
- [ ] Sprint ex-S10 V6.2 → **S8 V6.3** Fondations (8 piliers) livrée — **conservée dans le flux principal**, pas reclassée en accordion footer.
- [ ] Sprint ex-S11 V6.2 → **S9 V6.3** `WebEngagements` (8 ✓ garanties grille + glow-line + **3 lignes ton cabinet** — pas 5) + **S10 V6.3** CTA final révisé livrés.
- [ ] **Grep anti-jargon** = 0 occurrence (« optimisation », « IA intelligente », « code splitté », « pixel-perfect », « code propre », etc.).
- [ ] **Grep anti-chiffres** = 0 occurrence (`×2`, `+89%`, `<1s`, `98/100`, `×10`, etc.).
- [ ] **Grep anti-composants interdits** = 0 (`TransformationCard`, `AutomationPipeline` hors page concernée).
- [ ] **Vérification P1** : la phrase « Nous partons toujours de l'existant » figure bien en en-tête de S6 V6.3 (ex-S8 V6.2).
- [ ] **Vérification P3** : la règle IA figure dans **S4 V6.3 palier 03 PME** (texte « IA ciblée sur les répétitions ») ET dans le **bloc ✗ S9 V6.3 reformulé** (ligne 3 : *« Pas d'IA sans utilité réelle. »*).
- [ ] **Vérification CG1 6 audiences V6.3** : chaque section structurante (S1 Blueprint, S4 Paliers, S5 Cockpit, S6 Méthode, S7 Ce qui change) a passé la lecture **6 audiences** (auto-entrepreneur / artisan / cabinet / commerce local / PME / société de services) sans effet « trop gros / trop petit / pas pour mon activité ».
- [ ] **Vérification CG2 3 questions UX** : chaque section structurante répond en moins de 5 secondes aux questions *Qu'est-ce que j'ai compris ? Pourquoi c'est utile pour moi ? Quel problème ça règle ?*
- [ ] **Vérification universalité Blueprint S1 V6.3** : le Blueprint reste générique — aucune variante par audience, aucune mention sectorielle, aucun outil nommé dans les stations principales.
- [ ] Perf : Lighthouse mobile vert · 0 boucle anim continue · reduced-motion statique (tous SVG à `pathLength: 1`).
- [ ] A11y : WCAG 2.2 AA · clavier · lecteurs d'écran testés · accordion S4 V6.3 ARIA valide · selector S5 V6.3 ARIA valide.
- [ ] Responsive : 320 px → 4K · iPhone 13 mini OK.
- [ ] `pnpm build` clean · 0 erreur TS · 0 warning lint.
- [ ] Screenshots de chaque section validés par l'utilisateur avant merge.

---

# NOTE STRATÉGIQUE — RÉFLEXIONS FUTURES ✅ RÉALISÉE EN V6.4 (archive historique)

> **Statut V6.4** : ✅ **Note transcrite intégralement dans le corps du brief V6.4**. La transcription couvre :
> - L'**architecture 4 couches** (note → section 2bis V6.4 `VISIBILITÉ → CIRCULATION → INTELLIGENCE → PILOTAGE`)
> - La **section S1 Sources d'opportunités** (note → section S1 V6.4 spécifiée intégralement avec 9 canaux fan-in, vs 6 dans la note brouillon — ajout V6.4 : Partenaires, Salons/événements, QR codes/supports physiques)
> - L'**enrichissement S9 Fondations** (note → grille 11 piliers V6.4 avec colonne couche)
> - La **ligne ✗ SEO/GEO** (note → bloc ✗ S10 V6.4 4ᵉ ligne)
>
> Cette note est **conservée en archive** pour traçabilité historique du raisonnement stratégique mais **n'est plus la référence opérationnelle**. La référence est désormais le corps du brief V6.4 (sections 1ter, 2bis, S1, S2 enrichi, S5 corrigé, S6 enrichi, S7 enrichi, S9 enrichi, S10 enrichi).
>
> _Statut historique V6.3 (date d'origine de la note, conservé pour mémoire) :_ réflexion stratégique uniquement · hors périmètre V6.3 · non implémentée · sans impact sur les sprints S4.5 → S12 en cours · à formaliser éventuellement dans une version brief ultérieure (V6.4+ ou V7.x). Cette note ne créait **aucune** section V6.4, **aucun** sprint, **aucun** composant, **aucune** modification de l'ordre des sections V6.3 — au moment de son écriture.

## Constat

Le Blueprint actuel (S1 V6.3, ex-S4 V6.2) démarre à `01 Visiteur` :

```
01 Visiteur
   ↓
02 Site web
   ↓
03 Formulaire intelligent
   ↓
04 Qualification
   ↓
05 CRM
   ↓
…
   ↓
09 Client
```

Mais il ne montre pas **d'où vient le visiteur**. Pour un dirigeant TPE/PME :

- un visiteur ne vient jamais de nulle part
- il provient d'un **canal d'acquisition** précis
- ce canal **fait partie du système Solutions 2IA** (au même titre que le CRM ou les automatisations)

Sans représentation de cet amont, le système connecté commence au milieu de l'histoire et le positionnement « pas une agence web » perd une partie de sa preuve visuelle.

## Intention à conserver

Une future évolution du Blueprint pourrait intégrer un **palier amont** « Sources d'opportunités » intercalé avant les 9 stations actuelles (ou immédiatement après, en regard) :

```
┌─ Sources d'opportunités ──────────┐
│  Google Search                    │
│  Google Business Profile          │
│  GEO (ChatGPT · Claude · Perplexity)
│  Publicité                        │
│  Réseaux sociaux                  │
│  Réseau / bouche-à-oreille        │
└────────────────┬──────────────────┘
                 ↓
        01 Visiteur → … → 09 Client       (Blueprint actuel, intact)
```

Canaux d'acquisition potentiels à représenter dans cette future section :

- **Google Search** — référencement organique
- **Google Business Profile** — recherche locale, fiche établissement
- **GEO (Generative Engine Optimization)** — visibilité dans les réponses IA : ChatGPT, Claude, Perplexity
- **Publicité** — Google Ads, Meta Ads, LinkedIn Ads, landing pages
- **Réseaux sociaux** — LinkedIn, Instagram, TikTok, YouTube selon métier
- **Réseau / bouche-à-oreille** — referrals, recommandations clients, partenaires

## Architecture à mémoriser (grille de lecture du système Solutions 2IA)

Quatre couches qui justifient le positionnement « système connecté » vs. « agence web ». À utiliser comme **grille interne** de lecture (positionnement, copywriting, structuration de futures sections) — **pas comme section à coder telle quelle** dans un sprint.

**1. Fondations** (présence et visibilité)
- Site web premium
- SEO
- GEO
- Google Business Profile

**2. Circulation** (capture et routage de l'opportunité)
- Formulaires intelligents
- CRM
- Automatisations (n8n, Make)
- Notifications

**3. Intelligence** (mémoire et autonomie)
- RAG
- IA documentaire
- Agents IA

**4. Pilotage** (mesure et amélioration continue)
- Reporting
- Dashboards
- Process métier

Le Blueprint V6.3 actuel couvre principalement la couche **Circulation** (stations 03–08) et touche à **Fondations** (stations 01–02) et **Intelligence** (station 04 Qualification). Les couches **Fondations amont** (SEO/GEO/GMB) et **Pilotage** ne sont pas représentées visuellement aujourd'hui.

## Cadrage strict de la note

- ❌ **Aucune** section V6.4 créée à partir de cette note
- ❌ **Aucun** sprint déclenché (la roadmap S4.5 → S12 V6.2 reste seule en vigueur)
- ❌ **Aucun** composant prévu, planifié, ou nommé
- ❌ **Aucune** modification de l'ordre des sections V6.3
- ❌ **Aucune** modification de l'architecture 10 sections V6.3 (S0 → S10 + S5bis + S6bis)
- ✅ Cette note **vit dans le brief** pour ne pas perdre l'intention stratégique identifiée pendant l'audit S4.5 V2
- ✅ Formalisation ultérieure possible — décision à prendre dans une version brief V6.4+ ou V7.x dédiée, à un moment choisi par le client

---

**Mantra final V6.4** : *Le site est la première brique. Le système est le produit.* *(inchangé V6.2/V6.3 — texte du mantra préservé intact à travers toutes les versions)*