# `/applications/[secteur]` · vitrine sectorielle SEO

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 18 septembre 2026 · contre le code de `app/applications/[secteur]/`,
> `components/sections/applications/appSectorVerticals.ts` et `sectorsAppsData.tsx`.

---

## 1. Ce que fait cette page

Un **gabarit unique** qui génère 6 pages statiques (`generateStaticParams`,
`app/applications/[secteur]/page.tsx:15-17`), une par secteur, pour capter les recherches
de longue traîne (« application cabinet médical », « logiciel gestion chantier BTP »). Elle
ne vend pas « une application » en général (c'est le rôle de `/applications`) : elle vend
**l'application de ce métier précis**, avec son vocabulaire, ses obligations réglementaires
et ses modules.

| | |
|---|---|
| Route | `/applications/[secteur]` (6 instances : `sante`, `retail`, `industrie`, `services-pro`, `logistique`, `immobilier`) |
| Fichiers | `app/applications/[secteur]/page.tsx` (serveur, SEO, résout `secteur` via `SECTORS_APPS` + `SECTOR_VERTICALS`) · `app/applications/[secteur]/SecteurAppPage.tsx` (client, rendu, 165 lignes) |
| Données | `components/sections/applications/sectorsAppsData.tsx` (carte courte, utilisée aussi par `/applications`) · `appSectorVerticals.ts` (contenu long propre à la page secteur : SEO, KPI, modules, conformité) |
| Preset de décor | `apps` (`PageAtmosphere preset="apps"`, `SecteurAppPage.tsx:22`) |
| Public visé | Un dirigeant ou un responsable d'un métier précis, déjà convaincu qu'il lui faut un outil, qui cherche un prestataire spécialisé dans SON secteur |

Ce qu'elle ne fait pas : convaincre qu'une application sur mesure est utile en général
(page `/applications`), ni détailler la méthode de travail (page `/a-propos`).

---

## 2. La promesse affichée

Le gabarit est identique pour les 6 secteurs, seul le contenu change. Structure du titre :

```
{sector.name} : {vertical.heroAccent}
```
(`SecteurAppPage.tsx:26-31`, le fragment `heroAccent` étant mis en `.text-gradient-strong`)

| Secteur (`slug`) | Titre affiché (h1) | Intro (description du hero) |
|---|---|---|
| Santé (`sante`) | « Santé : **le cockpit du cabinet** » | « Dossier patient éclaté entre papier, Excel et plusieurs logiciels qui ne se parlent pas ; rendez-vous non honorés qui grignotent les journées ; échéances Ségur qui approchent. » |
| Retail / e-commerce (`retail`) | « Retail / E-commerce : **un seul stock, tous vos canaux** » | « Boutique, site, marketplaces : trois stocks qui divergent, des fiches produit recopiées partout, des paniers abandonnés sans relance. » |
| Industrie (`industrie`) | « Industrie : **l'atelier en temps réel** » | « Les fiches suiveuses papier se perdent, le rendement des machines (TRS) s'estime au doigt mouillé, et l'ERP du bureau ne descend jamais jusqu'aux machines. » |
| Services pro / Conseil (`services-pro`) | « Services pro / Conseil : **chaque heure compte, enfin** » | « Les heures facturables s'évaporent dans les tableurs, la facture électronique s'impose, et le secret professionnel interdit les outils approximatifs. » |
| Logistique / Transport (`logistique`) | « Logistique / Transport : **chaque livraison prouvée** » | « Des bons de livraison papier qui se perdent, un dernier kilomètre qui coûte le plus cher, des clients qui appellent pour savoir où est le camion. » |
| Immobilier / BTP (`immobilier`) | « Immobilier / BTP : **mandats et chantiers sous contrôle** » | « Des mandats suivis sur carnet, des pointages chantier contestés, des marges découvertes en fin d'opération quand il est trop tard. » |

- **Étiquette / badge** (pastille au-dessus du h1) : « Applications · {sector.name} », ex. « Applications · Santé » (`SecteurAppPage.tsx:25`).
- **Niveau 1 (dirigeant de PME)** : il se reconnaît en une phrase dans l'accroche, écrite dans le vocabulaire exact de son métier (échéances Ségur, PCI-DSS, TRS, loi Hoguet…).
- **Niveau 2 (visiteur averti)** : le sigle est repris et développé dans les modules juste en dessous (ex. « Dossier patient unique (DPI) », « Rendement des machines en direct (OEE, TRS) »), jamais dans un glossaire séparé sur cette page.

---

## 3. Structure, dans l'ordre

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero sectoriel | `PageHero` (`SecteurAppPage.tsx:24-37`) | Le métier est nommé, les douleurs sont les siennes |
| 2 | ce que ça apporte | « Ce qu'on vise » | Tuiles KPI (`SecteurAppPage.tsx:40-72`) | 3 objectifs chiffrés à atteindre, pas des résultats déjà constatés |
| 3 | comment ça marche | « Les modules qui font le quotidien » | Grille de 4 `SpotlightCard` (`SecteurAppPage.tsx:74-113`) | Les 4 briques concrètes de l'outil, en langage métier |
| 4 | pour qui, et à quel prix | « Trois choses à savoir avant d'appeler » | 3 cartes maison (`SecteurAppPage.tsx:116-148`) | Public visé, fourchette de prix, conformité réglementaire |
| 5 | maillage | « Pour aller plus loin » | `RelatedServices current="applications"` (`SecteurAppPage.tsx:150`) | Liens vers `/automatisation` et `/agents-ia` |
| 6 | l'étape suivante | CTA final | `CTABand` (`SecteurAppPage.tsx:152-162`) | Un seul geste : premier échange gratuit, reformulé avec le nom du secteur |

**458 mots visibles et 6 sections** sur `/applications/sante` (mesuré le 19/09/2026 ; seul
secteur relevé). L'audit du 6 septembre comptait 422 mots en moyenne sur les 6 pages
(`docs/audits/2026-09-06-conversion/applications-secteurs/README.md`).

---

## 4. Schémas et animations

**Cette page n'a aucun schéma pédagogique animé.** C'est le seul des quatre gabarits
couverts par cette série de fiches à ne pas en avoir : ni pipeline, ni diagramme
d'anatomie, contrairement à `/agents-ia` ou `/automatisation`. L'audit de conversion le
relève comme un manque (`docs/audits/2026-09-06-conversion/applications-secteurs/README.md`,
point 🟡 « Aucun schéma, alors que c'est la signature du site »).

Les seuls éléments visuels animés de la page :

| Élément | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Icône de secteur (SVG statique, 1 par secteur) | `sectorsAppsData.tsx:24-70` | Un pictogramme métier (stéthoscope stylisé, chariot, usine…) dans le hero et les listes | Identique | Identique (pas d'animation) |
| Halos de fond + rectangles UI flottants du preset `apps` | `components/shared/PageAtmosphere.tsx:134-155` | Décor générique « interface d'application » (5 rectangles bordés qui montent/descendent doucement) | Identique, décor toujours statique en intention (pas de suivi souris) | Coupé si `shouldHideBackgroundDecor` (tier ≠ `full`) |
| Reveal des cartes (`fadeInUp` / `staggerContainer`) | `SecteurAppPage.tsx` (KPI, modules) | Apparition en fondu + léger décalage vertical au scroll | Identique | **Non gaté par tier** : ce sont des reveals de carte, volontairement conservés à tous les tiers (règle du projet, voir `lib/animation/usePerformanceMode.ts:16-18`) |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux. Ici,
il n'y en a jamais eu à supprimer.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `.metric-tile` + `.card-shine` | KPI (« Ce qu'on vise ») | 3 tuiles (`SecteurAppPage.tsx:59-69`) | `grid-cols-1 sm:grid-cols-3` |
| `SpotlightCard` (glow indigo `99,102,241`, `tilt={4}`) | Modules du cockpit | 4 cartes (`SecteurAppPage.tsx:93-110`) | `grid-cols-1 sm:grid-cols-2` |
| Carte maison (`.card-shine`, bordure `border-subtle`, pas de glow ni de tilt) | « Pour qui / prix / conformité » | 3 cartes (`SecteurAppPage.tsx:127-146`) | `grid-cols-1 md:grid-cols-3` |

Rien n'est passé au verre (`.glass-card`) sur cette page : les fonds de carte restent
opaques à 55-60 % (`bg-bg-card/55`, `bg-bg-card/60`), cohérent avec le reste des pages
`apps`. Les tuiles KPI n'ont pas de `translateZ` (pas de profondeur de parallax, contrairement
aux `SpotlightCard`) : c'est voulu, une tuile de chiffre n'a pas besoin de tilt.

---

## 6. L'appel à l'action

- **CTA unique** : « Premier échange gratuit » → `/contact`. Il apparaît deux fois avec le
  même libellé : dans le `PageHero` (`SecteurAppPage.tsx:33`) et dans le `CTABand` final
  (`SecteurAppPage.tsx:160-161`, `secondary={null}`).
- **Réassurance sous le bouton** (note du hero) : « Application sur mesure de 1 500 à
  15 000 € selon le périmètre. Prix fixé avant de démarrer, après un premier échange
  gratuit de 45 minutes. » (`SecteurAppPage.tsx:35`)
- **Liens secondaires** (ne comptent pas comme un second CTA) : bouton secondaire du hero
  « Toutes les applications » → `/applications` (`SecteurAppPage.tsx:34`).
- **Autres sorties de la page** : `RelatedServices` vers `/automatisation` et `/agents-ia`
  (`components/shared/relatedServicesData.tsx:48-51`), plus le fil d'Ariane du JSON-LD
  (`Accueil` → `Services` → `Applications` → secteur, `page.tsx:57-62`). Le CTABand utilise
  la ligne de réassurance par défaut (« Réponse sous 24 h », « Premier échange offert »,
  « Sans engagement ») car `trustItems` n'est pas surchargé.

---

## 7. Le design en détail

- **Accents** : indigo/accent-primary (`glow="99,102,241"` sur les modules,
  `glowColor="bg-accent-primary/5"` sur le hero), cohérent avec le preset `apps` dominé
  par cette teinte (contrairement à `automation`, dominé par le cyan).
- **Rythme vertical** : `PageHero` → `section-shell` (KPI) → `section-shell-tight` (modules)
  → `section-shell-tight` (pour qui/prix) → `section-shell-compact` (`RelatedServices`) →
  `section-shell` (`CTABand`).
- **Largeurs** : `section-container` partout ; la grille KPI est en plus contrainte à
  `max-w-4xl` (`SecteurAppPage.tsx:57`).
- **Profondeur** : `translateZ(20px)` sur le titre et `translateZ(12px)` sur le texte des
  cartes de modules (`SecteurAppPage.tsx:97-106`), conforme à la règle de profondeur des
  `SpotlightCard`. Le décor du preset `apps` est fait de deux `GlowOrb`
  (`PageAtmosphere.tsx:135-136`) : des dégradés radiaux, sans flou CSS.
- **Typographie** : titres de section standards (`SectionHeading`), rien de spécifique à
  cette page.
- **Ce qui fait la signature de cette page** : rien de spécifique, justement. C'est un
  gabarit **délibérément générique et répété à l'identique 6 fois**, où seul le texte change.
  C'est efficace pour tenir le rythme de production sur 6 secteurs, mais ça explique aussi
  pourquoi l'audit de conversion la juge « correcte mais qui ne déclenche pas la décision »
  plutôt que mémorable.

---

## 8. Sur téléphone (390 px)

- Le `PageHero` **n'a pas de `visual`** (pas de scène 3D/SVG passée en prop, ni de
  `mobileSteps` personnalisés). Résultat : `hasVisual` est `false`
  (`components/shared/PageHero.tsx:127`) et le hero s'affiche **en une seule colonne
  centrée, identique sur desktop et mobile** (`max-w-3xl mx-auto text-center`,
  `PageHero.tsx:154`). Il n'y a donc ni scène lourde à charger ni aperçu mobile animé à
  gérer sur cette page : c'est le hero le plus léger du site.
- KPI : 3 tuiles passent de `sm:grid-cols-3` à 1 colonne empilée en dessous de 640 px.
- Modules : 4 cartes passent de `sm:grid-cols-2` à 1 colonne.
- « Pour qui / prix / conformité » : 3 cartes passent de `md:grid-cols-3` à 1 colonne.
- Rien de spécifique ne disparaît sur mobile : il n'y a pas de schéma à simplifier ou à
  masquer, contrairement à `/agents-ia` ou `/automatisation`.

---

## 9. SEO

Métadonnées construites dynamiquement depuis `SECTOR_VERTICALS[secteur]`
(`app/applications/[secteur]/page.tsx:19-40`) : `vertical.seoTitle`,
`vertical.seoDescription`, `vertical.keywords`.

| Secteur | `title` (avec suffixe, longueur) | `description` (longueur) |
|---|---|---|
| Santé | « Application santé : agenda, dossier patient · Solutions 2IA » (59) | 159 caractères |
| Retail | « Application boutique : stock unifié · Solutions 2IA » (51) | 159 caractères |
| Industrie | « Application atelier : production en direct · Solutions 2IA » (58) | 159 caractères |
| Services pro | « Application cabinet : temps et facturation · Solutions 2IA » (58) | 160 caractères |
| Logistique | « Application transport : tournées et preuves · Solutions 2IA » (59) | 155 caractères |
| Immobilier | « Application immobilier et BTP : marges · Solutions 2IA » (54) | 152 caractères |

- `canonical` : `/applications/${secteur}` (`page.tsx:27,32`), présent pour les 6 pages.
- JSON-LD : `buildServiceSchema` (nom « Application métier : {sector.name} », `serviceType:
  "Application métier sur mesure"`, `audience: sector.meta`) + `buildBreadcrumbSchema`
  (Accueil → Services → Applications → secteur), combinés via `combineSchemas`
  (`page.tsx:49-63`). Pas de `FAQPage` ni d'`OfferCatalog` sur cette page.
- Liens internes sortants : `/applications` (secondaryCta), `/automatisation` et
  `/agents-ia` (`RelatedServices`), `/contact` (CTA) : largement au-dessus du minimum de 2
  exigé par `docs/seo-geo.md`.
- `generateStaticParams` (`page.tsx:15-17`) pré-rend les 6 routes au build à partir de
  `SECTORS_APPS`.

---

## 10. Performance

- **Aucune section en `dynamic()`** sur cette page : ni scène de hero, ni méga-section
  lazy-loadée. C'est cohérent avec l'absence de schéma lourd (section 4) : il n'y a rien
  de coûteux à différer.
- **`usePerformanceMode` n'est appelé nulle part** dans `SecteurAppPage.tsx` : les reveals
  (`fadeInUp`, `staggerContainer`) tournent à l'identique quel que soit le tier (`full`,
  `reduced`, `minimal`). C'est cohérent avec la règle du projet selon laquelle les reveals
  de cartes restent actifs à tous les tiers (`lib/animation/usePerformanceMode.ts:16-18`) ;
  seul le décor de fond (`PageAtmosphere`) réagit au tier.
- Points sensibles : le hero n'ayant pas de `visual`, il n'y a aucun risque de scène 3D
  lourde à charger avant le LCP sur cette route ; c'est la page la plus légère à faire
  peindre du groupe étudié dans cette série de fiches.

---

## 11. État et suite

- **Ce qui est fait** : les 6 pages sont en ligne, avec des accroches sectorielles fortes
  et des KPI désormais reformulés comme des **objectifs à atteindre** plutôt que des
  résultats constatés (« Ce ne sont pas des résultats constatés chez d'autres : ce sont
  les vôtres, à atteindre. », `SecteurAppPage.tsx:50`). C'est la correction P0 recommandée
  par l'audit de conversion (option A, « la cible mesurable ») : **elle semble déjà
  appliquée dans le code actuel**, alors que l'audit cite encore l'ancien texte
  (« Des chiffres qui se constatent, pas qui se promettent » / « indicateurs issus de
  cockpits en production ») comme violation de la règle « zéro preuve inventée ». À
  vérifier avec le client si un audit de suivi a déjà validé cette correction.
- **Ce qui reste** : pas de schéma pédagogique animé sur cette page (section 4) ; pas de
  prix affiché avant la section 4 (« Pour qui, à quel prix ») alors que le visiteur est
  déjà très avancé dans sa décision, selon l'audit.
- **Note de conversion** (audit du 6 septembre 2026) : **61/100** (Contenu 49, Design 76,
  Conversion 63) · `docs/audits/2026-09-06-conversion/applications-secteurs/README.md`.
