# Audit complet du site : SEO, GEO, contenu, design

**Date** : 6 septembre 2026 · **Périmètre** : les 35 URL du site · **Méthode** : lecture du code,
analyse statique (accessibilité des fichiers, graphe d'imports, longueurs de metadata),
`tsc --noEmit` et `pnpm lint` verts après ménage.

---

## Résumé exécutif

Le site est **techniquement très au-dessus de la moyenne** de ce qu'on voit sur un site vitrine :
JSON-LD structuré sur toutes les pages commerciales, `llms.txt`, robots ouvert à 17 crawlers IA,
tiers de performance adaptatifs, contenu séparé du rendu, LCP maîtrisé. Les articles suivent un
gabarit GEO exemplaire (TL;DR, H2 en questions, ancres, tableau comparatif, sources, FAQ).

Il reste **une obligation légale non remplie**, quatre défauts SEO nets et trois incohérences
de contenu visible. La dérive documentaire, elle, est résolue par cette session.

| # | Problème | Impact | Effort |
|---|---|---|---|
| **0** | **`/mentions-legales` contient 13 champs « à compléter » en production** (forme juridique, SIREN, siège, hébergeur, directeur de publication) | **obligation légale LCEN non remplie** | 20 min + vos infos |
| 1 | Les 5 titres de `/automatisation/[secteur]` affichent **la marque deux fois** | SERP dégradée sur 5 pages | 5 min |
| 2 | **29 titres sur 33** dépassent 60 caractères (jusqu'à 102) : Google tronque | CTR sur toute la longue traîne | 1 h |
| 3 | **11 descriptions** dépassent 160 caractères | idem | 30 min |
| 4 | `BRAND.primary` = `#7c3aed` alors que l'accent du site est `#6366f1` | mauvaise couleur de barre navigateur + PWA | 2 min |
| 5 | `/articles` annonce « **Cinq** guides », il y en a **sept** ; la home annonce « **Six** services », il y en a **cinq** | crédibilité, visible par le lecteur | 5 min |
| 6 | `pillarLink` est saisi sur les **7 articles** et **jamais affiché** : 7 liens vers les pages piliers perdus | maillage interne + données mortes | 15 min |
| ✓ | La doc annonçait GSAP, Three.js, tsparticles, Lottie, Pixi : **jamais installés** | agents et devs induits en erreur | ✅ corrigé ici |

> Méthode : trois audits en parallèle ont été croisés avec une analyse statique. Deux de leurs
> constats se sont révélés **faux à la vérification** et ne figurent pas ici : `SectorCard` est
> bien un `<Link href="/automatisation/{slug}">` (avec `aria-label` et gestion du focus), donc
> ni le libellé « Cliquez pour voir le flux complet » ni le maillage sectoriel de
> `/automatisation` ne sont défectueux.

Côté technique, rien ne bloque : le site est indexable, cohérent et rapide.
Le seul point vraiment urgent est juridique, pas informatique.

---

## 1. Vue d'ensemble

| | |
|---|---|
| Fichiers `page.tsx` | 20 |
| URL réelles | 35 (34 dans le sitemap, la 35ᵉ est la page privée `noindex`) |
| Code applicatif | 29 553 LOC (`app` 5 157 · `components` 21 185 · `lib` 3 211) |
| Pages avec JSON-LD | **28 / 34** indexables (manquent `/a-propos`, `/contact` et les 4 pages légales) |
| Canonical | explicite sur toutes les pages indexables ; la home hérite correctement de `/` |
| Presets de fond | 9 définis, 8 utilisés |
| Contenu de référence | 15 termes de glossaire · 30 questions de FAQ · 7 articles |

---

## 2. SEO technique

### Ce qui est solide

- **Source de vérité unique** : `lib/seo/constants.ts` porte `SITE_URL`, le nom, la tagline,
  la description, les pays servis. Tout le reste en dérive : plus de dérive `.com` / `.fr` possible.
- **11 constructeurs de JSON-LD typés** dans `lib/seo/schema.ts`, avec `@id` partagés
  (`Organization` ← `Service.provider`, `Offer.itemOffered`, `Person` fondateur/auteur).
  C'est ce qui fait comprendre aux moteurs qu'il s'agit d'une seule entité.
- **Couverture des schémas** : `Organization` + `ProfessionalService` + `WebSite` en global ;
  `Service` + `BreadcrumbList` sur les 7 pages de service et les 11 pages sectorielles ;
  `OfferCatalog` avec fourchettes de prix sur `/services` ; `HowTo` sur la home ;
  `FAQPage` sur `/faq` et sur chaque article ; `Article` sur les 7 articles ;
  `DefinedTermSet` sur `/glossaire`.
- **Sitemap** : 34 URL, priorités graduées (1.0 home, 0.9 piliers, 0.7-0.8 support, 0.3 légal).
- **`robots.ts`** : 17 crawlers IA autorisés explicitement, `/api/`, `/_next/`, `/admin/` bloqués
  pour les crawlers classiques.
- **Redirection propre** de `/studio-visuel` vers `/services` en 308.
- **Headers** : cache immuable un an sur les assets statiques, `X-Content-Type-Options`,
  `Referrer-Policy`.

### Ce qui cloche

#### 🔴 P1 · Marque dupliquée dans 5 `<title>`

`components/sections/automation/sectorsData.tsx` : les 5 `seoTitle` se terminent déjà par
`| Solutions 2IA`, et le template du layout (`%s · Solutions 2IA`) ajoute encore le suffixe.

```
Automatisation cabinet comptable : collecte et écriture sans ressaisie | Solutions 2IA · Solutions 2IA   (102 car.)
Automatisation immobilier : leads SeLoger/Leboncoin qualifiés en CRM | Solutions 2IA · Solutions 2IA     (100 car.)
```

**Correction** : retirer ` | Solutions 2IA` des 5 `seoTitle`. Les 6 `seoTitle` de
`appSectorVerticals.ts` sont, eux, corrects (pas de suffixe manuel).

#### 🔴 P1 · Titres tronqués en SERP

**29 titres sur 33** dépassent 60 caractères une fois le suffixe ajouté. Les pires
(hors doublons de marque) :

| Longueur | Route |
|---|---|
| 92 | `/articles/facture-electronique-chorus-pro-2026-obligation` |
| 89 | `/articles` |
| 86 | `/faq` · `/articles/agent-ia-rgpd-souverain-france-ue` |
| 85 | `/services` · `/sites-web` |
| 84 | `/a-propos` |

Deux stratégies, au choix :
1. **Raccourcir les titres** pour tenir en 60 avec le suffixe (≈ 44 caractères utiles).
2. **Utiliser `title: { absolute: "…" }`** sur les pages dont le titre porte déjà la marque
   ou n'en a pas besoin (articles, secteurs), et garder le template ailleurs.

L'option 2 est la plus rapide et la moins destructrice pour la copy.

#### 🟠 P2 · Descriptions trop longues

11 descriptions dépassent 160 caractères, jusqu'à **186** (`/automatisation/immobilier`).
Concernées : `/contact` (180), 2 articles (180 et 177), 5 verticaux applicatifs (159-171),
`/faq` (161), `/glossaire` (166), `/automatisation/immobilier` (186).

#### 🟠 P2 · Trois pages sans JSON-LD

| Page | Manque | Gain |
|---|---|---|
| `/a-propos` | `Person` + `AboutPage` | **E-E-A-T** : c'est LA page qui doit établir l'auteur comme entité. Fort levier GEO. |
| `/contact` | `ContactPage` + `ContactPoint` | téléphone/email/horaires exposés aux moteurs |
| `/articles` | n'a qu'un `BreadcrumbList` : ajouter `Blog` + `ItemList` | fait comprendre la structure du cluster |

Les 4 pages légales n'ont pas de JSON-LD : c'est normal et sans impact.

#### 🟠 P2 · Dates du sitemap

`app/sitemap.ts` pose `new Date()` (la date du build) sur les 34 URL.
Les articles ont pourtant de vraies dates `publishedAt` / `updatedAt` : les utiliser
donne un signal de fraîcheur crédible plutôt qu'un « tout a changé aujourd'hui » suspect.

#### 🟡 P3 · Divers

- Une seule image OG pour tout le site (`app/opengraph-image.tsx`). Des OG par page
  amélioreraient le partage social.
- Le rapport SEO automatique audite 9 chemins : `/glossaire`, `/articles` et `/a-propos`
  n'en font pas partie.
- `manifest.ts` déclare la même image 512 px en `any` et en `maskable` : un `maskable`
  demande une marge de sécurité, sinon le logo est rogné sur Android.
- Dans `robots.txt`, les groupes par crawler IA n'ont aucun `Disallow` : un groupe
  spécifique remplace entièrement le groupe `*`, donc les bots IA peuvent explorer `/api/`.
  Sans danger ici (endpoints POST/cron), mais autant l'aligner.

---

## 2bis. Légal (le point le plus urgent du rapport)

### 🔴 P0 · `/mentions-legales` est incomplète en production

La page affiche **13 champs « à compléter »** actuellement en ligne, et porte même son propre
avertissement : « Les champs marqués "à compléter" ne doivent pas rester en production. »

| Section | Champs manquants |
|---|---|
| Éditeur | dénomination juridique exacte, forme juridique, capital social, siège social, SIREN/SIRET/RCS/RM, TVA intracommunautaire, directeur de la publication |
| Hébergement | nom de l'hébergeur, son adresse, son téléphone ou moyen de contact |
| Litiges | médiateur de la consommation et son site |

Ce n'est pas un TODO cosmétique : l'article 6-III de la LCEN rend ces mentions obligatoires
pour un site professionnel. C'est aussi un signal de confiance que Google et les moteurs
génératifs lisent. **À traiter avant toute optimisation SEO.**

Les trois autres pages légales (`/cgv`, `/confidentialite`, `/cookies`) portent des `notice`
d'avertissement plus douces (« base à faire relire », « à ajuster si de nouveaux outils »)
mais leur contenu, lui, est complet.

---

## 3. GEO (être cité par les IA)

### Le site est bien armé

| Levier | État |
|---|---|
| `llms.txt` | ✅ 49 lignes, structuré, à jour, avec prix et périmètre |
| Crawlers IA autorisés | ✅ 17, dont GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot |
| Définitions citables | ✅ `/glossaire`, 15 termes + `DefinedTermSet` avec ancres |
| FAQ structurée | ✅ 30 Q/R, 5 catégories, réponses de 60 à 180 mots, ton déclaratif |
| TL;DR en tête d'article | ✅ 40-60 mots, encadré, premier bloc après le H1 |
| H2 en questions PAA + ancres | ✅ imposé par le type `ArticleSection` |
| Tableaux comparatifs | ✅ champ `comparison` typé |
| Sources externes citées | ✅ champ `sources` typé |
| Chiffres et fourchettes | ✅ prix explicites dans `OfferCatalog` et la FAQ |

Le gabarit `lib/content/articles/types.ts` **force** la structure : c'est le meilleur atout GEO
du projet, parce qu'un nouvel article ne peut pas être publié sans TL;DR, sans ancres et sans FAQ.

### Ce qui manque

- **Pas de `llms-full.txt`.** `llms.txt` donne la carte ; la version longue donne le contenu.
  C'est ce que certains agents vont chercher en second.
- **`/a-propos` n'est pas une entité déclarée.** Un moteur génératif cite volontiers
  « selon X, développeur indépendant… » quand la personne est modélisée en `Person`
  avec `knowsAbout`, `alumniOf`, `sameAs`. Aujourd'hui le fondateur n'existe qu'en
  référence dans le `@graph` racine.
- **Belgique, Suisse, Luxembourg** sont dans `areaServed` du schema mais **ne sont nommés
  nulle part dans le texte visible**. Un moteur qui répond à « développeur IA Belgique »
  n'a rien à citer.
- **Les pages piliers n'ont pas de TL;DR.** Ce qui marche sur les articles marcherait
  aussi sur `/agents-ia`, `/rag`, `/applications` : un encadré de 40 à 60 mots juste
  après le hero.

---

## 4. Contenu

### Structure des pages

La règle des cinq questions (c'est quoi · ce que ça apporte · comment ça marche · pour qui ·
l'étape suivante) est **respectée** sur toutes les pages piliers. Le shell
`PageHero` → sections → `CTABand` est constant.

| Route | Sections | LOC (page + sections) | `RelatedServices` | `CTABand` |
|---|---|---|---|---|
| `/` | 7 | 1 380 | non (constellation joue ce rôle) | ✅ |
| `/services` | 4 | 643 | ❌ | ✅ |
| `/sites-web` | 5 | 1 788 | ✅ | ✅ |
| `/applications` | 7 | 2 614 | ✅ | ✅ |
| `/applications/[secteur]` | 2 | 197 | ✅ | ✅ |
| `/agents-ia` | 7 | 3 283 | ✅ | ✅ |
| `/automatisation` | 6 | 1 965 | ✅ | ✅ |
| `/automatisation/[secteur]` | 1 | 820 | ✅ | ✅ |
| **`/rag`** | **15** | **2 368** | ✅ | ✅ |
| `/faq` | 2 | 131 | ❌ | ✅ |
| `/glossaire` | 1 | 112 | ❌ | ✅ |
| `/articles` | 1 | 94 | ❌ | ❌ |
| `/articles/[slug]` | 8 | 270 | ❌ (a `relatedLinks` + `pillarLink`) | ✅ |
| `/a-propos` | 5 | 600 | ❌ | ✅ |
| `/contact` | 5 | 718 | ❌ | ❌ (la page **est** le CTA) |

### Ce qui cloche

#### 🔴 P1 · Deux compteurs annoncés faux, visibles à l'écran

**`/articles` annonce cinq guides, il y en a sept :**
- `app/articles/page.tsx:42` : « **Cinq** guides experts pour décider sereinement. »
- `app/articles/page.tsx:18` (OG) : « **5** guides experts pour les PME françaises »
- La liste rendue affiche bien les **7** articles.
- `lib/content/articles/articles.tsx:2` (commentaire) : « 5 articles satellites ».

**La home annonce six services, il y en a cinq :**
- `components/sections/home/HomeServicesConstellation.tsx:71` : h2 « **Six services**, un seul système »
- ligne 90 : `aria-label="Six services Solutions 2IA"` (lu par les lecteurs d'écran)
- `homeServicesData.ts` contient **5** entrées (Sites web, Applications, Agents IA,
  Automatisation, Mémoire d'entreprise) et le tableau `positions` a **5** points.
- Le commentaire ligne 136 dit d'ailleurs « 5 services depuis la suppression de /studio-visuel ».
- Résidu : le type `HomeService` garde encore la valeur `"studio"` et un `case "studio"` ligne 363.

Le visiteur compte, les deux incohérences se voient. `llms.txt`, lui, est correct.

#### 🔴 P1 · `pillarLink` : 7 liens internes saisis, jamais affichés

Le type `Article` déclare `pillarLink` comme **obligatoire** (« page service pilier liée »),
les 7 articles le renseignent, et `ArticleLayout.tsx` ne le rend nulle part.
C'est à la fois de la donnée morte et **7 liens vers les pages piliers perdus**, alors que
c'est exactement le maillage qui fait la force d'un cluster de contenu.

#### 🟠 P2 · Ancre cassée sur `/sites-web`

`components/sections/sites-web/WebOpportunityFlow.tsx:158` : le lien « Voir lesquels → »
pointe vers `#connected-constellation`. Cet `id` n'existe nulle part sur la page (les seuls
`id` présents sont `opportunity-flow`, `fanin-arrow`, `fanin-grad`, `mobile-fanin-arrow`,
`mobile-fanin-grad`). Le clic ne fait rien. Vestige de `WebGalaxyShowcase`, supprimée.

Dans le même fichier de données (`webFoundationsData.ts:35,43`), « → voir Blueprint » et
« → voir RAG · IA » sont du **texte simple, pas des liens**, contrairement aux passerelles
cliquables du reste de la page.

#### 🟠 P2 · `/faq` ne mène nulle part

30 réponses détaillées sur les agents IA, le RAG, le RGPD, les applications métier et
l'automatisation, et **seulement deux liens sortants** : `/contact` et `/services`.
Aucun lien in-content vers `/agents-ia`, `/rag`, `/applications`, `/automatisation`.

`/glossaire` fait exactement l'inverse et bien mieux : chaque terme porte un `seeAlso` vers
la page qui approfondit, ce qui lui donne **8 routes sortantes**. Appliquer le même motif
aux catégories de la FAQ est le gain de maillage le plus rapide du site.

#### 🟠 P2 · `/rag` : 15 sections d'affilée

C'est la page la plus longue du site, et de loin. Quinze sections empilées
(`RagPainLoss` → `RagMemoryFlow` → `RagContrast…` → `RagReplaces` → `RagAvoids` →
`RagUsagesTabs` → `RagSizing` → `RagRealExamples` → `RagSectorTabs` → `RagDecisionWizard` →
`RagInstallSteps` → `RagDailyUsage` → `RagEnrichmentStatic` → `RagDataControl` →
`RagHonestLimits`) sans respiration ni sommaire.

Trois de ces sections font le même travail argumentatif : `RagReplaces` (« ce que ça remplace »),
`RagAvoids` (« ce que ça évite ») et `RagPainLoss` (« ce que ça vous coûte aujourd'hui »).
Un sommaire ancré en tête, ou une fusion de ces trois blocs, rendrait la page tenable.

#### 🟠 P2 · « Comment je travaille » sur trois pages

`PremiumFlowPanel` est réutilisé sur 6 pages, ce qui est sain : le contenu diffère à chaque fois.
Mais **le même label « Comment je travaille » + une méthode en quatre étapes** apparaît sur
`/`, `/services` et `/agents-ia`. Vu du visiteur qui parcourt les trois, c'est du déjà-vu.
Différencier les labels suffirait (`/services` → « Ce qui se passe après votre message »,
`/agents-ia` → « De votre quotidien à l'assistant »).

#### 🟠 P2 · Le tooltip pédagogique n'est branché nulle part

`components/ui/TermeExplique.tsx` (112 LOC, accessible : `aria-expanded`, focus clavier,
cible ≥ 44 px) et `lib/content/glossaire.ts` (15 définitions) ont été construits pour appliquer
la règle « le jargon ne reste jamais seul ». **Le composant n'est importé par aucune page.**
La règle repose donc uniquement sur la discipline de rédaction.

C'est la correction la plus rentable côté pédagogie : brancher `<TermeExplique k="rag">`
sur les 15 termes là où ils apparaissent en premier dans le texte courant.

#### ✅ Règle du tiret cadratin : respectée

Balayage complet de `app/`, `components/`, `lib/`, `public/` : **une seule occurrence**
dans du texte visible, et c'est sur la page privée `/felicationbebelove` (une signature
« signature Iulian »). Tout le reste est dans des commentaires de code, ce qui est autorisé.

#### ✅ Pas de preuve inventée

Aucun « nous », aucun client fictif, aucune statistique non sourçable trouvés dans les pages.
Les stats inventées listées par l'audit de juin (73 %, ×3 conversion, +200 % mémorabilité)
ont bien disparu.

---

## 5. Design

### Le système tient

- **Un seul endroit** pour les tokens : `@theme` dans `app/globals.css`.
- **9 presets** de page, chacun avec palette + forme flottante + décor. 8 sont utilisés.
- **Composants premium cohérents** : `PageHero` (58 usages de `.text-gradient`),
  `SectionHeading` (47 fichiers), `SpotlightCard` (11), `Button` (8).
- **Les trois couches de fond** sont systématiques et jamais recréées à la main.
- **Dégradation par tier** intégrée jusque dans les composants : `SpotlightCard` coupe
  son tilt en `reduced` et tout en `minimal`.

### Ce qui cloche

#### 🟠 P2 · Le `BRAND` de `lib/seo/constants.ts` n'est plus la marque

| Clé | `constants.ts` | `globals.css` | Où ça se voit |
|---|---|---|---|
| `primary` | `#7c3aed` (violet) | `#6366f1` (indigo) | `themeColor` de la barre de navigateur, `theme_color` du manifest PWA |
| `bg` | `#06070d` | `#05060b` | `background_color` du manifest |
| `card` | `#10111c` | `#111424` | — |

Correction : aligner les trois valeurs sur `globals.css`.

#### 🟠 P2 · Deux fonctions `cn` coexistent

- `lib/utils.ts` : `twMerge(clsx(...))` → **18 fichiers**
- `lib/utils/cn.ts` : `classes.filter(Boolean).join(" ")` → **14 fichiers**

La seconde ne déduplique pas les classes Tailwind conflictuelles : un `className` passé en prop
peut ne pas écraser la classe par défaut du composant. À unifier sur la version `tailwind-merge`
(en vérifiant les 14 fichiers concernés, qui peuvent compter sur l'absence de merge).

#### 🟠 P2 · Classes utilitaires mortes dans `globals.css` (partiellement traité)

Au moment de l'audit, **24 classes n'étaient utilisées par aucun `.tsx`** (~150 lignes).

> **Mise à jour du 6 septembre** : le retrait des fonds réactifs à la souris a emporté les
> 14 classes du bloc `.mouse-*` et leurs keyframes, soit **174 lignes**. `globals.css` est
> passé de 765 à 591 lignes. **Il reste 10 classes mortes** : `.bg-noise`, `.bg-radial-bottom`,
> `.glow-accent`, `.glow-accent-strong`, `.glow-orb`, `.glow-orb-accent`, `.glow-orb-cyan`,
> `.section-stack`, `.section-surface`, `.section-vignette`.

| Bloc | Classes | Lignes |
|---|---|---|
| Ancien système de halo/molécule suivant la souris | `.mouse-glow`, `.mouse-trail-glow`, `.mouse-molecule` + ses 11 variantes | **132** |
| Orbes pulsantes | `.glow-orb`, `.glow-orb-accent`, `.glow-orb-cyan` | 12 |
| Ombres lumineuses | `.glow-accent`, `.glow-accent-strong` | ~8 |
| Mise en page | `.section-stack`, `.section-surface`, `.section-vignette` | ~10 |
| Décor | `.bg-noise`, `.bg-radial-bottom` | ~8 |

Le bloc `.mouse-*` est l'ancienne génération d'effets souris, remplacée par
`FluidMouseField.tsx` qui refait l'équivalent en JS. Les keyframes `float-slow`,
`pulse-glow` et `data-flow` ne sont référencées ni en CSS ni en TSX.

⚠️ `.glow-accent` et `.glow-accent-strong` sont encore **citées dans les règles
`html[data-perf="reduced"]` et `[data-perf="minimal"]`** de `globals.css` : les retirer
suppose de nettoyer ces sélecteurs aussi.

#### 🟡 P3 · Tokens définis sans usage

- `--color-text-accent: #9ea6ff` : **zéro usage**, et quasi identique à
  `--color-accent-light: #9ba5ff` (deux valeurs à 3 points d'écart). Doublon à trancher.
- Les tokens `sidebar-*` et `chart-1..5` du bloc shadcn : zéro usage.

#### 🟡 P3 · Les polices déclarées ne sont pas celles servies

`globals.css` déclare `--font-sans: "Inter"` et `--font-mono: "JetBrains Mono"`.
En réalité `app/layout.tsx` charge **Geist** via `next/font/google` sur la même variable,
et **JetBrains Mono n'est chargée nulle part** : les 16 fichiers qui utilisent `font-mono`
retombent sur la monospace du système. À trancher : charger réellement ces polices,
ou aligner les déclarations.

#### 🟡 P3 · Reliquat shadcn dans `globals.css`

Le bloc `@theme inline` + `:root` en oklch clair en fin de fichier vient de l'initialisation
shadcn. Les tokens `sidebar-*` et `chart-1..5` ne sont utilisés nulle part.
`muted`, `popover`, `destructive`, `primary` servent, eux, aux primitives Radix.

#### 🟠 P2 · Deux pipelines quasi identiques, 2 078 LOC

`components/sections/applications/AppDigitizationPipeline.tsx` (1 033 LOC) et
`components/sections/agents-ia/OneAgentManyNeedsPipeline.tsx` (1 045 LOC) sont deux
implémentations séparées du **même diagramme fan-in / fan-out**. Symboles communs relevés
dans les deux fichiers :

```
NodeStatus · HoverDetail · TooltipSide · HoverPopover · NodeCard · NodeOverlay
PipelineTrack · MobileDetailDrawer · lookupHover · buildFaninPath · buildFanoutPath
appInPoint · appOutPoint · outInPoint · srcOutPoint · ICON · LOOP · DESKTOP · MOBILE · TOTAL
```

Seules les données (sources, nœuds, libellés) et trois fonctions de statut diffèrent.
Un composant `FanPipeline` générique piloté par les données diviserait ce volume par deux et
rendrait les deux pages plus légères. C'est le plus gros gain de maintenance du dépôt.

#### 🟡 P3 · Le preset `studio` n'a plus de page

Défini dans `FluidMouseField` et `PageAtmosphere` (≈ 55 lignes au total), il n'est plus
référencé depuis la suppression de `/studio-visuel`.

---

## 6. Accessibilité

Tous les points ouverts par l'audit de juin 2026 ont été traités :

| Point de juin | État aujourd'hui |
|---|---|
| Menu déroulant du Header non accessible au clavier | ✅ `aria-haspopup`, `aria-expanded`, fermeture par Échap |
| Burger 40 px (< 44 px WCAG) | ✅ `min-w-[44px] min-h-[44px]` + `focus-visible` |
| Accordéon FAQ de `/contact` sans `aria-expanded` | ✅ `aria-expanded` + `aria-labelledby` |
| Décors SVG à passer en `aria-hidden` | ✅ sur `PageAtmosphere`, `FluidMouseField`, `MouseParticles` |
| Formulaire de contact | ✅ `<label for>` sur tous les champs, `role="group"` + `aria-labelledby` sur les boutons radio |
| `h1` unique | ✅ rendu par `PageHero` / `ArticleLayout` |

### 🟠 P2 · Saut de niveau h1 → h3 sur six pages

`components/shared/PremiumFlowPanel.tsx:65` rend son titre en **`<h3>` en dur**. Le composant
est correct quand il est niché sous un `SectionHeading` (qui rend le `h2`), mais il est
utilisé **seul, juste après le hero**, sur cinq pages : `/`, `/services`, `/applications`
(deux fois), `/agents-ia`, `/a-propos` et `/contact`. Résultat : un `h1` suivi directement
d'un `h3`, sans `h2` intermédiaire.

Deux corrections possibles :
1. ajouter une prop `as` / `headingLevel` au composant (défaut `h3`, `h2` quand il est seul) ;
2. envelopper chaque usage isolé d'un `SectionHeading`, ce qui alourdit la page.

L'option 1 corrige les sept occurrences d'un coup.

### Restent deux détails

- `components/shared/SectionParticles.tsx` n'a pas d'`aria-hidden` sur ses éléments décoratifs.
- Sur les pages qui composent leurs sections « à plat » (`/rag`, `/sites-web`), vérifier que
  chaque `<section>` porte bien un `aria-labelledby` vers son H2.

---

## 7. Performance

Rien à corriger. Le socle est en place et documenté :
trois tiers automatiques (`full` / `reduced` / `minimal`), store singleton, garde FPS à sens
unique, pause hors écran, script anti-flash avant le premier paint, lazy sur les scènes et
les méga-sections, LCP peint en CSS pur.

Mesures de juillet 2026 sur mobile : LCP 7,6 s → **1,5 s**, Lighthouse 70 → **94**, CLS 0,005.

Point de vigilance permanent : **ne jamais remettre d'`opacity: 0` animé en JS sur le hero**.
Les 7 fichiers de plus de 690 LOC (listés dans `docs/performance.md`) restent les candidats
naturels à `component-splitter`.

---

## 8. Ménage effectué

### Fichiers supprimés

| Catégorie | Détail | Gain |
|---|---|---|
| Builds obsolètes | `.next.build-20260515-152519`, `-170240`, `-172013`, `.next.stale-20260515-150007` | **1 245 Mo** |
| Caches | `.playwright-mcp/`, `test-results/`, `tsconfig.tsbuildinfo`, 10 `.DS_Store` | 2 Mo |
| Sauvegardes d'outillage | `.claude.bak/`, `.claude.bak-200950/`, `.mcp.json.bak`, `CLAUDE.md.bak` | 60 Ko |
| Captures QA versionnées | 31 PNG à la racine + 7 dans `docs/`, **aucune référence nulle part** | **133 Mo** |
| Doublon | `logoS2IA.png` (identique à `public/branding/logo-s2ia.png`) | 870 Ko |

Les sources du projet pèsent désormais **6 Mo** (dont 4 Mo de logos dans `public/branding`),
contre ~140 Mo avant. `.gitignore` a été complété pour que les captures de QA ne reviennent
plus à la racine ni dans `docs/`.

> Le dossier `.git` fait encore ~290 Mo : les 133 Mo de captures restent dans l'historique.
> Seule une réécriture d'historique (`git filter-repo`) les enlèverait vraiment. Ce n'est
> utile que si le temps de `git clone` devient gênant, et ça oblige à re-pousser en force.

### Code mort supprimé (≈ 5 500 LOC)

Vérifié par analyse d'accessibilité depuis les points d'entrée Next, puis confirmé par
`tsc --noEmit` et `pnpm lint` verts.

| Fichier | LOC | Pourquoi |
|---|---|---|
| `app/studio-visuel/` (2 fichiers) | 245 | page supprimée en juin, la redirection 308 vit dans `next.config.ts`. Le TODO était écrit dans le fichier. |
| `components/scenes/studio/StudioScene.tsx` | 294 | scène de la page supprimée |
| `components/sections/WebGalaxyShowcase.tsx` | 2 331 | remplacé par les sections V6.4 de `/sites-web` |
| `components/sections/WebTransformShowcase.tsx` + `web-transform/` | 792 | idem |
| `components/sections/ShowcaseSection.tsx` | 333 | ancienne home |
| `components/sections/ServicesSection.tsx` | 132 | ancienne home |
| `components/sections/BenefitsSection.tsx` | 112 | ancienne home |
| `components/sections/CTASection.tsx` | 85 | remplacé par `CTABand` |
| `components/sections/ExpertiseSection.tsx` | 86 | ancienne home |
| `components/shared/TransformationCard.tsx` | 644 | utilisée uniquement par `/studio-visuel` |
| `components/shared/NeonDivider.tsx` | 491 | séparateurs abandonnés |
| `components/shared/DepthDivider.tsx` | 195 | idem |
| `components/shared/ParticleField.tsx` | 130 | utilisée uniquement par `WebGalaxyShowcase` |
| `components/shared/AmbientBackground.tsx` | 92 | remplacé par `PageAtmosphere` |
| `components/ui/GlowCard.tsx` | 31 | utilisée uniquement par `ServicesSection` |

Tout reste récupérable dans l'historique git (`git show HEAD~1:<chemin>`).

### Conservés volontairement

- **`components/ui/TermeExplique.tsx`** : non branché, mais c'est une fonctionnalité voulue
  à rebrancher, pas un déchet.
- **12 primitives Radix non utilisées** (`accordion`, `dialog`, `tabs`, `sheet`… ≈ 1 300 LOC) :
  palette de départ régénérable par `pnpm dlx shadcn@latest add <nom>`. À supprimer si vous
  préférez un dépôt strictement minimal.
- **Remotion** (10 paquets pour une seule composition hors site) : outillage assumé,
  aucun impact sur le bundle du site.

### Documentation réorganisée

```
README.md              nouveau : point d'entrée humain
CLAUDE.md              réécrit : stack réelle, routes réelles, pointeurs vers docs/
AGENTS.md              réduit à un aiguillage vers CLAUDE.md et docs/
docs/
  anatomie-page.md     ★ nouveau : comment une page fonctionne (contenu + design)
  design-system.md     nouveau : tokens, presets, composants, écarts
  contenu-copy.md      nouveau : ton, glossaire, règles d'écriture
  seo-geo.md           remplace SEO-PLAYBOOK.md
  performance.md       nouveau : tiers, animations, LCP
  architecture.md      remplace ARCHITECTURE.md
  pages/               briefs par page (inchangés)
  audits/              ce rapport
  archives/            brief, journal et playbook de juin + audits de phase 0
```

Documents supprimés parce que leur contenu est repris et à jour ailleurs :
`ARCHITECTURE.md`, `SEO-PLAYBOOK.md`.

---

## 9. Plan d'action

### 0. Avant tout le reste (obligation légale)

1. **Compléter `/mentions-legales`** : les 13 champs « à compléter » (forme juridique, SIREN,
   siège, TVA, directeur de publication, hébergeur et ses coordonnées, médiateur). Nécessite
   vos informations administratives, pas du code.

### 1. Corrections rapides (≈ 1 h, gain immédiat)

2. Retirer ` | Solutions 2IA` des 5 `seoTitle` de `sectorsData.tsx`.
3. `Cinq guides` → `Sept guides` sur `/articles` (titre, OG, commentaire).
4. `Six services` → `Cinq services` sur la home (h2 **et** `aria-label`), et retirer le
   résidu `"studio"` du type `HomeService` et du `switch` ligne 363.
5. Aligner `BRAND` (`primary`, `bg`, `card`) de `lib/seo/constants.ts` sur `globals.css`.
6. Supprimer ou rebrancher l'ancre morte `#connected-constellation`
   (`WebOpportunityFlow.tsx:158`).

### 2. SEO de fond (≈ 3 h)

7. Raccourcir les 29 titres, ou passer articles et secteurs en `title: { absolute }`.
8. Ramener les 11 descriptions longues sous 160 caractères.
9. Rendre `pillarLink` dans `ArticleLayout` : 7 liens vers les pages piliers récupérés.
10. `Person` + `AboutPage` sur `/a-propos`, `ContactPage` + `ContactPoint` sur `/contact`,
    `Blog` + `ItemList` sur `/articles`.
11. Vraies dates dans `app/sitemap.ts`.
12. Ajouter des `seeAlso` aux catégories de `/faq`, sur le modèle du glossaire.

### 3. Qualité (≈ 1 journée)

13. Prop `headingLevel` sur `PremiumFlowPanel` : corrige le saut h1→h3 sur 6 pages.
14. Brancher `<TermeExplique>` sur les 15 termes du glossaire dans le texte courant.
15. Unifier les deux `cn` sur la version `tailwind-merge`.
16. Sommaire ancré, ou fusion de trois sections, sur `/rag` (15 sections).
17. Supprimer les 10 classes CSS mortes restantes, en nettoyant aussi les sélecteurs
    `html[data-perf]` qui référencent `.glow-accent*`. *(Le bloc `.mouse-*`, 174 lignes,
    a déjà été retiré le 6 septembre avec les fonds réactifs à la souris.)*

### 4. Quand il y aura du temps

18. Factoriser `AppDigitizationPipeline` et `OneAgentManyNeedsPipeline` en un `FanPipeline`
    piloté par les données : ≈ 1 000 LOC économisées.
19. `llms-full.txt`.
20. TL;DR de 40 à 60 mots en tête des pages piliers.
21. Images OG par page.
22. Nommer Belgique, Suisse et Luxembourg dans le texte visible.
23. Preset `studio` mort, reliquat shadcn, doublon `--color-text-accent`.
24. Trancher sur les polices (charger Inter + JetBrains Mono, ou aligner les déclarations).
