# `/rag` · mémoire d'entreprise vendue

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 2026-09-18 · contre le code de `app/rag/` et `components/sections/rag/`

---

## 1. Ce que fait cette page

Vendre le RAG (renommé « mémoire d'entreprise ») à un dirigeant qui ne connaît pas le sigle :
une IA branchée sur les documents internes (procédures, contrats, PDF) qui répond et cite sa
source exacte. Elle ne compare pas RAG et fine-tuning en détail (c'est le rôle de l'article
`rag-vs-fine-tuning-quoi-choisir-entreprise`) et ne vend pas l'assistant qui agit dans les
outils (c'est `/agents-ia`) : ici, la mémoire retrouve et cite, elle n'exécute pas d'action.

| | |
|---|---|
| Route | `/rag` |
| Fichiers | `app/rag/page.tsx` (serveur, SEO) · `app/rag/RagPage.tsx` (client, rendu) |
| Preset de décor | `automation` (`app/rag/RagPage.tsx:24`) |
| Public visé | PME et ETI (`audience: "PME et ETI"`, `app/rag/page.tsx:39`) |

C'est, avec ses 13 sections de contenu montées entre le hero et le CTA final, la page la plus
lourde du site (l'audit de conversion en compte 15 en incluant hero et CTA final).

---

## 2. La promesse affichée

- **Titre (h1)** : « Une IA qui répond avec vos documents et cite sa source. »
  (`app/rag/RagPage.tsx:28-34`)
- **Sous-titre** : « Vos procédures, contrats et dossiers contiennent déjà les réponses. Je
  relie une IA à ces documents : une question, la bonne réponse, le document exact qui la
  justifie. Plus besoin de déranger la personne qui sait. » (`app/rag/RagPage.tsx:35`)
- **Étiquette / badge** : « Mémoire d'entreprise (RAG) » (`app/rag/RagPage.tsx:27`)
- **Niveau 1 (dirigeant de PME)** : vos documents répondent à votre place, et la réponse
  montre le document qui la justifie.
- **Niveau 2 (visiteur averti)** : le sigle RAG apparaît entre parenthèses dans le label et le
  h1 ; la stack technique possible (pgvector, Qdrant, recherche hybride, reranking, Claude,
  Mistral, LangChain, LlamaIndex) est listée en `ToolBadge` dans `RagDataControl`
  (`components/sections/rag/ragDataControlData.ts:39-48`), sous un bandeau « Pour les
  techniques ».

---

## 3. Structure, dans l'ordre

Le fichier source commente lui-même les quatre blocs imposés (`app/rag/RagPage.tsx:49-69`).

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 0 | (hero) | Promesse + CTA | `PageHero` | Une IA qui répond avec ses documents et cite sa source |
| 0 | (nav) | Sommaire à 7 ancres | `RagSommaire.tsx` | La page a un plan, on peut sauter une section |
| 1 | c'est quoi | IA généraliste vs mémoire d'entreprise | `RagContrastClassicVsRag.tsx` | Une IA classique invente, celle-ci cite ses sources |
| 2 | ce que ça apporte | Pourquoi les entreprises perdent leur savoir | `RagPainLoss.tsx` (`#ce-que-ca-change`) | 5 fuites de savoir silencieuses, et leur contrepartie |
| 2 | ce que ça apporte | Combien de temps vos équipes passent-elles à chercher | `RagSearchTime.tsx` | Un calcul (pas une stat) du temps perdu, fait avec 3 curseurs |
| 3 | comment ça marche | Votre savoir devient consultable, immédiatement | `RagMemoryFlow.tsx` (`#comment-ca-marche`) | Le trajet source → mémoire → réponse citée |
| 3 | comment ça marche | Quatre façons d'utiliser votre mémoire métier | `RagUsagesTabs.tsx` (`#usages`) | 4 usages (Répondre, Explorer, Croiser, Maintenir à jour) |
| 3 | comment ça marche | Comment on l'installe, étape par étape | `RagInstallSteps.tsx` (`#installation`) | 5 étapes, 4 à 6 semaines en moyenne |
| 3 | comment ça marche | Comment elle se met à jour, toute seule | `RagEnrichmentStatic.tsx` | 4 étapes d'enrichissement automatique, schéma statique assumé |
| 4 | pour qui | Une mémoire adaptée à chaque métier | `RagSectorTabs.tsx` (`#pour-qui`) | 5 secteurs (immobilier, comptabilité, industrie, RH, juridique) |
| 4 | pour qui | Quelle taille de mémoire métier | `RagSizing.tsx` | 3 échelles : TPE, PME, ETI/Groupe, même moteur |
| 4 | pour qui | Quel usage vous correspond | `RagDecisionWizard.tsx` | Recommandation en 3 questions, table de vérité à 8 cas |
| objections | vos données / limites | Vos données restent sous contrôle | `RagDataControl.tsx` (`#vos-donnees`) | 6 garanties concrètes + stack technique |
| objections | vos données / limites | Ce que cette mémoire ne fait pas | `RagHonestLimits.tsx` (`#limites`) | 3 limites assumées avant l'engagement |
| n | l'étape suivante | Services liés | `RelatedServices` (`current="rag"`) | Vers `/agents-ia` et `/applications` |
| n | l'étape suivante | CTA final | `CTABand` | « Donnez une mémoire à votre entreprise » → `/contact` |

---

## 4. Schémas et animations

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Flux de la mémoire | `RagMemoryFlow.tsx` | Trait vertical animé (`pathLength`) reliant sources actives, mémoire, recherche, passages retrouvés et réponse citée ; cycle de 5,5 s avec amplification « preuve » sur la source qui répond (`TRACE_LOOP_MS`, ligne 21) | Même structure en colonne unique (déjà mobile-first) | `staticRender` (`!mounted \|\| disableContentMotion \|\| isMobile`, ligne 28) : un seul trait plein, sans boucle |
| Enrichissement autonome | `RagEnrichmentStatic.tsx` | Schéma radial statique : mémoire centrale + 4 nœuds (détection, vérification des droits, intégration, notification) | Identique : le composant est volontairement statique (« on ne vous vend pas une animation », ligne 78) | Déjà statique par conception ; `staticRender` retire seulement les reveals `fadeInUp` |
| Schéma d'usage, 4 variantes | `RagUsageSchema.tsx` (761 lignes) | Grammaire visuelle unique « sources → mémoire métier → réponse sourcée + citation vérifiée », déclinée selon l'onglet actif de `RagUsagesTabs` (simple, conversationnel, multi-source, auto-enrichi) | SVG responsive (`viewBox 480×280`), rendu identique | 100 % statique, aucune animation à dégrader |
| Timeline d'installation | `RagInstallSteps.tsx` | Rail horizontal animé (`scaleX`) reliant les 5 étapes sur desktop | Bascule en liste verticale avec trait latéral (`lg:hidden` / `hidden lg:block`, lignes 53 et 86) | `staticRender` masque le rail animé, garde les 5 étapes fixes |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Carte « maison » (`rounded-xl/2xl border-border-subtle bg-bg-card/45-70`) | Toutes les sections (contraste, douleurs, garanties, secteurs, usages, limites) | Majorité des blocs de la page | Variable : `lg:grid-cols-2` (contraste), `lg:grid-cols-[1fr_1fr]` (douleurs), `sm:grid-cols-2 lg:grid-cols-3` (6 garanties) |
| `.metric-tile` | `RagSearchTime.tsx` (résultat chiffré) · `RagSizing.tsx` (3 tuiles) | 4 tuiles | `lg:grid-cols-3` pour Sizing ; tuile unique pour SearchTime |
| `.surface-card` | `RagHonestLimits.tsx` (3 limites) | 3 | `lg:grid-cols-3` |
| `.section-intro-panel` | `RagDecisionWizard.tsx` (conteneur du wizard) | 1 | `lg:grid-cols-[1.3fr_1fr]` |

Aucune `SpotlightCard` sur cette page (vérifié : aucune occurrence dans `app/rag/` ni
`components/sections/rag/`). Le verre (`bg-bg-card/XX` + `backdrop-blur`) est appliqué presque
partout ; les callouts « preuve » (carte cyan de `RagPainLoss`, citation de `RagMemoryFlow`,
bloc recommandation de `RagSectorTabs`, réponse de `RagDecisionWizard`) restent en `bg-bg-card`
plein pour porter le glow cyan (`shadow-[0_0_Npx_var(--color-cyan-glow)]`) sans le diluer.

---

## 6. L'appel à l'action

- **CTA unique** : « Premier échange gratuit » → `/contact`, répété deux fois (hero et
  `CTABand` final, `app/rag/RagPage.tsx:37` et `:81`) : c'est le même CTA, pas un second.
- **Réassurance sous le bouton** : celle par défaut de `CTABand` (non surchargée) : « Réponse
  sous 24 h · Premier échange offert · Sans engagement » (`components/shared/CTABand.tsx:24`).
- **Liens secondaires** (ils ne comptent pas comme un second CTA) : bouton secondaire du hero
  « Voir la mémoire en action » → `#comment-ca-marche` (ancre interne) ; sommaire à 7 ancres
  (`RagSommaire.tsx`).
- **Autres sorties de la page** : `RelatedServices current="rag"` renvoie vers `/agents-ia`
  (« Un assistant qui s'appuie sur cette mémoire pour vous répondre ») et `/applications`
  (« Intégrez cette mémoire dans un outil simple pour vos équipes »)
  (`components/shared/relatedServicesData.tsx:60-63`).

---

## 7. Le design en détail

- **Accents** : cyan dominant sur cette page (preset `automation`), réservé aux éléments de
  preuve (réponse citée, garanties, recommandation sectorielle) ; l'indigo (`text-gradient-strong`)
  reste sur les titres.
- **Rythme vertical** : alternance `section-shell` (Douleurs, Flux mémoire, Usages,
  Installation, Enrichissement, Wizard) et `section-shell-tight` (Contraste, Calcul du temps,
  Sizing, Limites), plus `section-shell-compact` pour le sommaire.
- **Largeurs** : `section-container` général, contenus internes contraints (`max-w-[960px]`,
  `max-w-[1080px]`, `max-w-[1180px]`) selon la densité de la section.
- **Profondeur** : la carte « avec mémoire métier » de `RagPainLoss` est le seul vrai tilt 3D de
  la page (`[perspective:1400px]` + `rotateY(-4deg) rotateX(2deg)`, désactivé au survol),
  actif seulement si `mounted && !isMobile && !isCoarsePointer && !shouldReduceMotion`
  (`components/sections/rag/RagPainLoss.tsx:49` et `113-126`).
- **Typographie** : h1 et `h2` aux tailles standard `PageHero` / `SectionHeading`, rien de
  spécifique à cette page.
- **Ce qui fait la signature de cette page** : la citation systématique de la source
  (« Source : fichier · page N ») répétée dans `RagMemoryFlow` et `RagSectorTabs` comme motif
  visuel récurrent de preuve, et le halo cyan réservé exclusivement aux éléments vérifiables.

---

## 8. Sur téléphone (390 px)

- Le hero n'a pas de `visual` (aucune scène de hero sur cette page) : pas de
  `MobileHeroPreview`, juste le texte centré (`hasVisual` reste `false`).
- `RagPainLoss` perd son tilt 3D sur mobile (`allow3D` exige `!isMobile`) : la carte reste plate.
- `RagInstallSteps` bascule du rail horizontal animé à une liste verticale avec trait latéral.
- `RagUsagesTabs` et `RagSectorTabs` passent leur barre d'onglets en défilement horizontal
  tactile (pilules `min-h-[44px]`, `overflow-x-auto`).
- La plupart des sections désactivent leurs reveals dès `isMobile`
  (`staticRender = !mounted || disableContentMotion || isMobile`), sauf `RagUsagesTabs`,
  `RagSectorTabs` et `RagDecisionWizard` dont le `staticRender` ignore `isMobile` : ces trois-là
  restent animés (bascule d'onglet) sur téléphone.

---

## 9. SEO

| | |
|---|---|
| `title` | « Mémoire d'entreprise (RAG), sources citées » (42 caractères, 58 avec le suffixe ` · Solutions 2IA`) |
| `description` | « Une IA reliée à vos procédures, contrats et PDF : elle répond à vos équipes et cite le document exact. Données hébergées en Europe. Premier échange gratuit. » (156 caractères) |
| `canonical` | `/rag` |
| JSON-LD | `combineSchemas(buildServiceSchema(...), buildBreadcrumbSchema(...))` → `Service` + `BreadcrumbList` (pas de `FAQPage` ni `Article` sur cette page) |
| Liens internes sortants | `/contact` (CTA), `/agents-ia` et `/applications` (`RelatedServices`) |

---

## 10. Performance

- Sections en `dynamic()` : **aucune**. Les 15 imports de `app/rag/RagPage.tsx:3-19`
  (13 sections + `RelatedServices` + `CTABand`) sont tous statiques, contrairement à
  `app/page.tsx` qui, lui, utilise `dynamic()` pour ses sections lourdes.
- Comportement par tier : la majorité des sections lisent `usePerformanceMode()` et passent en
  rendu final statique dès `!mounted || disableContentMotion || isMobile` (Contraste, Douleurs,
  Flux mémoire, Installation, Enrichissement, Sizing, Limites, Contrôle des données) ; les trois
  composants interactifs (`RagUsagesTabs`, `RagSectorTabs`, `RagDecisionWizard`) ne dépendent que
  de `!mounted || disableContentMotion` et restent animés sur mobile, conformément à la règle du
  projet (mobile seul n'implique jamais `disableContentMotion`).
- Points sensibles : `RagUsageSchema.tsx` (761 lignes) est monté dès qu'un onglet de
  `RagUsagesTabs` est actif, jamais en `dynamic()` ; `RagMemoryFlow` fait tourner un
  `setInterval` de 5,5 s tant que la section est visible (`IntersectionObserver`), coupé
  seulement par `disableContentMotion`, pas par le tier mobile seul.

---

## 11. État et suite

- **Ce qui est fait** : page complète, 13 sections de contenu + sommaire ancré + navigation
  croisée + CTA final, JSON-LD `Service` + `BreadcrumbList`, canonical correct, aucune
  `SpotlightCard` ni couleur en dur repérée hors palette cyan/glow du preset.
- **Ce qui reste** :
  - Quatre fichiers de `components/sections/rag/` ne sont importés nulle part sur le site :
    `RagAvoids.tsx`, `RagDailyUsage.tsx`, `RagRealExamples.tsx` et `RagReplaces.tsx` (vérifié par
    recherche croisée dans `app/` et `components/`). Code mort à trancher : les réintégrer dans
    la page ou les supprimer, pas de suppression automatique décidée ici.
  - Aucune section n'est en `dynamic()` malgré le poids de la page (13 sections, dont un
    composant de 761 lignes) : à vérifier si c'est un choix assumé ou un oubli face à la règle
    générale du projet sur les méga-sections.
- **Note de conversion** (audit du 6 septembre 2026) : **64/100** (Contenu 67, Design 70,
  Conversion 57). Verdict de l'audit : « correcte, mais elle ne déclenche pas la décision » :
  contenu technique de très bon niveau, desservi par l'empilement de quinze sections sans
  hiérarchie visuelle forte. Voir `docs/audits/2026-09-06-conversion/rag/README.md`.
