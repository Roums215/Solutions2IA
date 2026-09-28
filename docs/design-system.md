# Design system

> Tout est défini dans `app/globals.css`. Une valeur écrite en dur ailleurs est un écart,
> sauf dans les trois cas prévus listés au §7.

---

## 1. Couleurs (`@theme`)

### Fonds

| Token | Classe | Valeur | Usage |
|---|---|---|---|
| `--color-bg-primary` | `bg-bg-primary` | `#05060b` | fond principal |
| `--color-bg-secondary` | `bg-bg-secondary` | `#0b0d16` | sections alternées |
| `--color-bg-tertiary` | `bg-bg-tertiary` | `#121524` | blocs encastrés |
| `--color-bg-card` | `bg-bg-card` | `#111424` | cartes |
| `--color-bg-card-hover` | `bg-bg-card-hover` | `#171b30` | cartes au survol |

### Accents

| Token | Classe | Valeur | Usage |
|---|---|---|---|
| `--color-accent-primary` | `bg-accent-primary` | `#6366f1` | **indigo de marque** |
| `--color-accent-light` | `text-accent-light` | `#9ba5ff` | labels, liens, pastilles |
| `--color-accent-dark` | `bg-accent-dark` | `#4f46e5` | dégradé de bouton, survol |
| `--color-accent-glow` | `shadow-accent-glow` | `rgba(99,102,241,.20)` | halo doux |
| `--color-accent-glow-strong` | `shadow-accent-glow-strong` | `rgba(99,102,241,.34)` | halo au survol |
| `--color-cyan` | `bg-cyan` | `#22d3ee` | **accent secondaire** |
| `--color-cyan-glow` | `bg-cyan-glow` | `rgba(34,211,238,.18)` | halo cyan |
| `--color-warning` / `-glow` | `bg-warning` `text-warning` | `#f59e0b` | état « attention » (jamais amber-400 en dur) |
| `--color-paper` / `-2` / `-3` | `bg-paper` `bg-paper-2` `bg-paper-3` | `#ffffff` `#f3f5fb` `#e9ecf5` | **surface claire « papier »** : maquettes d'application posées sur le site sombre (cartes, fond, pistes) |
| `--color-paper-line` | `border-paper-line` `divide-paper-line` | `rgba(20,24,51,.09)` | filets sur papier |
| `--color-ink` / `-2` / `-3` | `text-ink` `text-ink-2` `text-ink-3` `fill-ink` | `#141833` `#4a5170` `#8a90ab` | texte sur papier (titre, corps, discret) |
| `--color-{success,warning,danger}-ink` | `text-success-ink` … | `#15803d` `#b45309` `#b91c1c` | états lisibles sur papier (les versions claires ne passent pas sur blanc) |

### États

| Token | Classe | Valeur | Usage |
|---|---|---|---|
| `--color-success` | `text-success` `bg-success/10` | `#4ade80` | validé, en ligne, conforme |
| `--color-success-glow` | `shadow-success-glow` | `rgba(74,222,128,.12)` | halo de validation |
| `--color-danger` | `text-danger` `bg-danger/10` | `#f87171` | erreur, refus, alerte |
| `--color-danger-glow` | | `rgba(248,113,113,.12)` | |

Ajoutés le 7 septembre 2026 pour remplacer les `green-400` / `red-400` posés en dur.

### Film du hero de l'accueil

| Token | Classe | Valeur | Usage |
|---|---|---|---|
| `--color-film-bg` | `bg-film-bg` | `#04050d` | fond du cadre 16/9 du film, peint dès le SSR |
| `--color-film-blue` | | `#5a89ff` | départ du dégradé du CTA « Parler de mon besoin » |
| `--color-film-cyan` | | `#38cfff` | arrivée du même dégradé |
| `--color-film-ink` | | `#04122c` | texte du CTA, posé sur le dégradé clair |
| `--color-film-glow` | | `rgba(70,150,255,.9)` | halo porté sous le CTA |

La classe `.film-cta` assemble ces tokens : pilule en capitales, police mono, dégradé bleu
vers cyan. Le film lui-même (`components/film/`) garde sa palette interne en dur : c'est un
module de rendu fermé, rendu en pixels d'un plan de 1 920 × 1 080 (écart autorisé, voir §7).

Quatre polices lui sont propres, chargées par `components/film/filmFonts.ts` avec
`preload: false` pour ne pas concurrencer le LCP : Sora, Manrope, JetBrains Mono,
DM Serif Display. Elles posent `--font-film-{sora,manrope,mono,serif}` sur la section du hero.

### Texte et bordures

| Token | Classe | Valeur |
|---|---|---|
| `--color-text-primary` | `text-text-primary` | `#f5f7ff` |
| `--color-text-secondary` | `text-text-secondary` | `#bcc1d6` |
| `--color-text-tertiary` | `text-text-tertiary` | `#8e95af` |
| `--color-text-accent` | `text-text-accent` | `#9ea6ff` |
| `--color-border-subtle` | `border-border-subtle` | `rgba(255,255,255,.09)` |
| `--color-border-medium` | `border-border-medium` | `rgba(255,255,255,.15)` |
| `--color-border-accent` | `border-border-accent` | `rgba(129,140,248,.38)` |

### Typographie et easing

| Token | Valeur déclarée dans `globals.css` | Réalité |
|---|---|---|
| `--font-sans` | `"Inter", ui-sans-serif, system-ui…` | **`app/layout.tsx` charge Geist** via `next/font/google` et l'expose sur la même variable `--font-sans`, posée sur `<html>`. Aucune Inter n'est téléchargée. |
| `--font-display` | `"Inter", …` | jamais utilisé comme classe |
| `--font-mono` | `"JetBrains Mono", ui-monospace, monospace` | **JetBrains Mono n'est chargée nulle part** : les 16 fichiers qui utilisent `font-mono` retombent sur la monospace du système |
| `--ease-premium` | `cubic-bezier(0.16, 1, 0.3, 1)` | ease-out-expo, l'easing de marque |

> À trancher : soit on charge réellement Inter et JetBrains Mono via `next/font`,
> soit on met les déclarations en accord avec ce qui est servi (Geist + monospace système).

---

## 2. Espacements

### Shells (respiration verticale d'une section)

| Classe | `padding-block` | Quand |
|---|---|---|
| `.section-shell` | `clamp(6.5rem, 10vw, 10rem)` | section principale |
| `.section-shell-tight` | `clamp(5rem, 7.5vw, 7rem)` | section secondaire |
| `.section-shell-compact` | `clamp(3.5rem, 5vw, 5rem)` | encart, transition |

### Containers (largeur)

| Classe | Quand |
|---|---|
| `.section-container` | grilles, schémas, cartes |
| `.section-container-narrow` | 72 rem, pages denses en texte |
| `.section-container-reading` | 48 rem, colonne de lecture (articles, FAQ, légal) |
| `.section-container-wide` | **hero de l'accueil uniquement** : contenu jusqu'à 1 552 px pour laisser au film la plus grande colonne possible. Gouttière progressive dès `xl` (24 px à 1 280, 56 px dès 1 520), puis centrage. Ne pas l'utiliser ailleurs |

### Rythme automatique

- `.section-stack > * + *` : `margin-top: clamp(2.5rem, 4vw, 4rem)`
- Un `SectionHeading` suivi d'une `grid`, d'un `flex` ou d'un `space-y` prend
  automatiquement `clamp(3.5rem, 6vw, 5rem)` de marge, dans **tous** les shells et containers.
  **Ne pas ajouter de `mt-*` à la main.**
- `SectionHeading` porte `mb-14 lg:mb-16` sous son texte.

Ces valeurs ont été élargies le 7 septembre 2026 (demande client : « un peu plus de blancs »).

---

## 3. Classes utilitaires de marque

| Classe | Effet | Fichiers qui l'utilisent |
|---|---|---|
| `.text-gradient` | dégradé indigo → cyan sur du texte | 58 |
| `.text-gradient-strong` | même chose, plus contrasté | 56 |
| `.bg-grid` | grille 60 × 60 px discrète | 13 |
| `.card-shine` | reflet diagonal au survol | 11 |
| `.bg-radial-top` / `.bg-radial-bottom` | halo radial en coin de section | 5 |
| `.section-container-narrow` | colonne de lecture | 4 |
| `.metric-tile` | tuile de métrique | 3 |
| `.section-intro-panel` | panneau d'introduction encadré | 3 |
| `.hero-enter` / `.hero-enter-fade` | **entrée CSS pure, avant hydratation** (LCP) | 2 |
| `.surface-card` | surface carte premium | 2 |
| `.glass-card` + `.glass-light{,-cyan,-indigo}` | panneau « verre » complet : il pose lui-même bordure, rayon et overflow, plus deux lumières lentes derrière la vitre (transform only, figées en `reduced`, retirées en `minimal`). Ex. : `HomeTransformationFlows` | 1 |
| `.glass-surface` | **la matière verre à composer** (variante A, 17/09/2026) : fond blanc à 5,5 %, flou 18 px, saturation 1,25, liseré clair en haut. Elle ne pose **ni bordure ni rayon ni overflow**, donc la carte garde les siens et ses états de survol continuent de fonctionner | 5 |
| `.glass-bubble` | **bulle de verre** (18/09/2026) : même matière, plus dense (le fond passe sous des traits lumineux) avec un reflet en haut à gauche qui donne la courbure. Pour un nœud posé sur un schéma. Ex. : la constellation de l'accueil | 6 |
| `.glow-line` | filet lumineux horizontal | 1 |
| `.reading-copy` | typographie de lecture longue | 1 |
| `.perspective-floor` | sol en perspective (PageHero) | 1 |
| **10 classes mortes** (détail au §7) | définies dans `globals.css`, utilisées nulle part | **0** |

### Le verre : mode d'emploi

1. **Quelle classe ?** `.glass-surface` pour une carte de contenu (elle se compose avec les
   classes existantes), `.glass-bubble` pour un nœud posé sur un schéma, `.glass-card` pour
   un panneau autonome qui ne porte pas déjà bordure et rayon.
2. **Le repli n'est pas optionnel.** En tier `reduced` et `minimal`, le flou est coupé : les
   trois classes basculent alors sur un fond presque opaque, plus un repli
   `@supports not (backdrop-filter)` pour les navigateurs sans flou. Sans lui, le texte se
   retrouverait posé sur le décor. (Le défaut existait sur `.glass-card`, corrigé le 17/09/2026.)
3. **Pas de verre sur les petites tuiles répétées** (`.metric-tile`, pastilles, badges) :
   `backdrop-filter` coûte cher, une grille en compte vite huit.
4. **Le verre a besoin de lumière derrière lui.** Dans une zone sombre, l'effet ne se voit
   pas. C'est pour ça que la constellation de l'accueil porte deux halos locaux en
   `data-decor="halo"` (donc masqués en tier minimal).
5. **Jamais de `-webkit-backdrop-filter` écrit à la main** (voir l'avertissement ci-dessous).

### Maquettes d'application (surface papier)

`components/shared/mockup/AppMockup.tsx` est la boîte à outils partagée (tableaux de bord
sectoriels de `/applications`, assistants par profil de `/agents-ia`) pour dessiner une application « telle que le client la verrait », sur les tokens
`paper` / `ink` : `Chrome` (fenêtre, icône, navigation propre au métier, pastille « Maquette »),
`KpiRow` (tuiles avec objectif), `Panel`, `BarChart` (barres en `scaleY` + ligne d'objectif),
`HBars`, `Ring` (anneau `pathLength`), `Timeline` (agenda), `MiniTable` (statuts), `Feed`
(journal des actions), `Funnel`, `FleetMap` (carte abstraite, pause hors écran), `Integrations`
(outils connectés), `Checklist`, `StatusGrid` (synoptique), `Stops` (arrêts d'une tournée),
`Deadlines`, `Thumbs` (vignettes terrain), `FilledForm` (fiche remplie par l'assistant, provenance
et état par champ), `Draft` (brouillon de message en attente de validation), `WeekGrid` (semaine de
publication). `Chrome` prend `accent` (cyan · info · ok · warn), `nav` (onglets du métier) et `user`. Règles : données d'exemple uniquement, mention
« Maquette » visible, aucun nom réel de client, sigles doublés d'un mot simple, `reduced` → statique.

À côté des maquettes (thème sombre, signature du site) : `components/sections/agents-ia/AgentPlan.tsx`,
« le plan de l'agent » en six scènes qui jouent en boucle (déclencheur · agent IA · mémoire RAG ·
action · vous validez · enregistrement), avec les briques utilisées par le profil (RAG oui / non,
automatisation oui / non), une barre de lecture, un bouton pause, pause hors écran, statique en
reduced-motion. Données dans `profilesData.tsx` (`plan`).

> ⚠️ **`backdrop-filter` : ne jamais écrire `-webkit-backdrop-filter` à la main.** Lightning CSS
> (le compilateur de Tailwind v4) supprime alors la propriété non préfixée et ne garde que la
> version `-webkit-`, que Chrome ignore. Écrire uniquement `backdrop-filter` : le préfixe est
> généré automatiquement. (Constaté le 7 septembre 2026 sur `.glass-card` et sur les gates
> `data-perf` de `globals.css`.)


---

## 4. Les presets de page

Un mot donne à la page sa palette et son décor : `<PageAtmosphere preset="ai" />`.

| Preset | Palette | Routes |
|---|---|---|
| `home` | `99,102,241` + `34,211,238` | `/` |
| `services` | `99,102,241` + `129,140,248` | `/services` `/faq` `/glossaire` `/articles` `/articles/[slug]` |
| `web` | `59,130,246` + `34,211,238` | `/sites-web` |
| `apps` | `14,165,233` + `129,140,248` | `/applications` `/applications/[secteur]` |
| `automation` | `34,211,238` + `6,182,212` | `/automatisation/[secteur]` `/rag` |
| `ai` (V2/V3) | fond « système » statique `AiSystemField` : grandes courbes, arcs, sans croix ni points | `/agents-ia` |
| `flow` | trajectoires fines cyan/indigo + deux nappes très faibles (`FlowSystemField`), ni points ni particules | `/automatisation` (V3, 29/09/2026) |
| `studio` | `168,85,247` + orange | **aucune** (page supprimée en juin 2026) |
| `about` | `129,140,248` + `165,180,252` | `/a-propos` |
| `contact` | `99,102,241` + `139,92,246` | `/contact` |

Les quatre pages légales et la page privée n'ont aucun preset : fond `body` nu, volontaire.

---

## 5. Les couches de fond

```
contenu de la page
  ↑
SectionFluidBackdrop  nappes et trajectoires SVG propres à une section · absolute inset-0
  ↑
PageAtmosphere    décor statique du domaine (halos, grille, réseau, orbes) · fixed inset-0
  ↑
body              dégradé sombre
```

Le décor de fond est **entièrement statique** : il ne réagit ni à la souris ni au défilement.

> **Historique (6 septembre 2026).** Deux composants réactifs à la souris ont été retirés
> à la demande du client :
> - **`FluidMouseField`** (760 LOC) : fond fluide monté sur les 15 pages, 3 halos parallaxés
>   et 4 à 7 formes flottantes (`blob`, `crystal`, `browser`, `device`, `neural`, `hex`,
>   `prism`, `halo`, `plasma`) pilotées par `useSpring`.
> - **`MouseParticles`** (365 LOC) : traînée de particules suivant le curseur, montée dans
>   `AppShell` sur desktop puissant. Elle posait `* { cursor: none !important }` et dessinait
>   un curseur maison ; **le curseur natif du système est revenu** avec sa suppression.
>
> Les ~150 lignes de CSS de l'ancienne génération de halo souris (`.mouse-glow`,
> `.mouse-trail-glow`, `.mouse-molecule*` et leurs keyframes) ont été retirées en même temps.
> **Ne pas les réintroduire sans demande explicite.** Récupérables via
> `git show <commit>^:components/shared/FluidMouseField.tsx`.

---

## 6. Les composants

| Composant | Fichier | Props |
|---|---|---|
| **`PageHero`** | `shared/PageHero.tsx` | `label*` `title*` (ReactNode) `description*` `primaryCta?` `secondaryCta?` `visual?` `glowColor?` `mobileSteps?` `note?` (ReactNode, réassurance sous les boutons, rendue en CSS pur sans coût LCP) |
| **`SectionHeading`** | `ui/SectionHeading.tsx` | `label?` `title*` `description?` (ReactNode) `centered?` (défaut `true`) `id?` (posé sur le h2, pour `aria-labelledby`) |
| **`SpotlightCard`** | `ui/SpotlightCard.tsx` | `glow?` (`"r,g,b"`, défaut `"129,140,248"`) `tilt?` (deg, défaut `6`) `pulse?` `className?` |
| **`Button`** | `ui/Button.tsx` | `variant` (`primary` `secondary` `ghost` `outline` `link` `destructive` `default`) `size` (`xs` `sm` `default` `md` `lg` `icon*`) `href?` |
| **`HeroFilm`** | `hero/HeroFilm.tsx` | `className?` · choisit la coupe du film selon la largeur mesurée et le tier, monte `SolutionsFilm` en `dynamic({ ssr: false })`, porte le bouton pause |
| **`SolutionsFilm`** | `film/SolutionsFilm.tsx` | `only?` (chapitres joués) `showGrid?` `showChapterLabels?` `fit?` `loop?` `rate?` (`0` = image fixe) `posterTime?` `paused?` `ctaHref?` |
| **`CTABand`** | `shared/CTABand.tsx` | `title?` `description?` `primaryLabel?` `primaryHref?` `secondary?` (`{label, href}` ou **`null` pour un seul bouton**) `trustItems?` (`string[]`) `framed?` (grande carte bleu nuit) `compact?` (carte cadrée resserrée : termine la page sans refaire un hero ; utilisée par `/agents-ia` et `/automatisation`) |
| **`SectionFluidBackdrop`** | `shared/SectionFluidBackdrop.tsx` | `variant*` : une composition SVG statique par section (`hero` `proof` `friction` `solutions` `method` `cta` · `web*` · `apps*` · `aiHero` `aiLight` `aiDark` · `flowHero` `flowLight` `flowDark`), version téléphone dédiée ; apparition unique à l'entrée dans l'écran, fixe en minimal |
| **`PremiumFlowPanel`** | `shared/PremiumFlowPanel.tsx` | `label*` `title*` `description*` `steps*` (`{title, description, meta?}[]`) `accent?` (`"r, g, b"`) `className?` `headingLevel?` (**`h2` par défaut**, `h3` sous un `SectionHeading`) |
| **`PageAtmosphere`** | `shared/PageAtmosphere.tsx` | `preset*` (décor **statique**) |
| **`RelatedServices`** | `shared/RelatedServices.tsx` | `current` (clé de route) |
| **`SectionParticles`** | `shared/SectionParticles.tsx` | `variant` |
| **`ToolBadge`** | `ui/ToolBadge.tsx` | badge d'outil (n8n, Axonaut…) |
| **`TermeExplique`** | `ui/TermeExplique.tsx` | `k` (clé du glossaire) · branché sur `/automatisation` (API, webhook, facture électronique) |

`SpotlightCard` applique un tilt 3D : pour donner de la profondeur aux enfants,
`style={{ transform: "translateZ(30px)" }}`.

> **Niveaux de titre.** `PageHero` rend le `h1`, `SectionHeading` rend un `h2`,
> `PremiumFlowPanel` rend un `h2` par défaut. Sous un `SectionHeading`, lui passer `headingLevel="h3"`.

Comportement selon le tier de performance : le tilt n'est actif qu'en `full`,
le spotlight est conservé en `reduced`, tout devient statique en `minimal`.

### Primitives Radix disponibles mais non utilisées

`accordion` `badge` `card` `dialog` `dropdown-menu` `hover-card` `navigation-menu`
`progress` `separator` `sheet` `skeleton` `tabs` (≈ 1 300 LOC).
Elles restent dans `components/ui/` comme palette de départ ; `components.json` permet de
les régénérer à tout moment (`pnpm dlx shadcn@latest add <nom>`).
Réellement utilisées : `tooltip`, `sonner`.

---

## 7. Les écarts autorisés (et les autres)

### Autorisé

1. **`glow="r, g, b"` sur `SpotlightCard` et `accent="r, g, b"` sur `PremiumFlowPanel`** :
   c'est l'API documentée (le composant compose l'alpha lui-même).
2. **Les couleurs de marques tierces** dans `components/sections/automation/brandLogos.tsx`
   (Slack, Google, HubSpot, Dribbble…) : une marque a sa couleur, pas la nôtre.
3. **`app/icon.tsx` et `app/apple-icon.tsx`** : le rendu `next/og` ne lit pas les variables CSS,
   les hex y sont inévitables.

### À corriger

- ~~`BRAND` dans `lib/seo/constants.ts` ne correspond plus à `globals.css`~~ **Corrigé le
  7 septembre 2026** : `primary #6366f1`, `bg #05060b`, `card #111424`, alignés sur `@theme`.
- **Deux fonctions `cn` coexistent** : `lib/utils.ts` (`clsx` + `tailwind-merge`, 18 fichiers)
  et `lib/utils/cn.ts` (concaténation simple, 14 fichiers). La seconde ne déduplique pas les
  classes conflictuelles. À unifier sur la version `tailwind-merge`.
- **10 classes utilitaires mortes** dans `globals.css` (le bloc `.mouse-*`, 132 lignes, a été retiré le 6 septembre) :
  - `.glow-orb`, `.glow-orb-accent`, `.glow-orb-cyan` ;
  - `.glow-accent`, `.glow-accent-strong` (⚠️ encore référencées par les sélecteurs
    `html[data-perf="reduced"]` et `[data-perf="minimal"]` : à nettoyer ensemble) ;
  - `.section-stack`, `.section-surface`, `.section-vignette` ;
  - `.bg-noise`, `.bg-radial-bottom`.

  Les keyframes `float-slow`, `pulse-glow` et `data-flow` ne sont référencées nulle part non plus.
- **`--color-text-accent: #9ea6ff` n'est jamais utilisé** et vaut quasiment
  `--color-accent-light: #9ba5ff` (trois points d'écart). Doublon à trancher.
- ~~`PremiumFlowPanel` rend son titre en `<h3>` en dur~~ **Corrigé le 7 septembre 2026** :
  prop `headingLevel`, `h2` par défaut. Les six pages concernées ne sautent plus de niveau.
- **Le bloc shadcn en fin de `globals.css`** (`@theme inline` + `:root` en oklch clair +
  tokens `sidebar-*` et `chart-1..5`) est un reliquat d'initialisation : `sidebar` et `chart-*`
  ne sont utilisés nulle part. Les autres (`muted`, `popover`, `destructive`, `primary`)
  servent aux primitives Radix.

---

## 8. La signature de marque (à ne jamais « nettoyer »)

Ces éléments sont **intentionnels**. Un outil anti-slop qui les signale se trompe :

- `.text-gradient` / `.text-gradient-strong` sur les titres
- les halos flous en fond (`blur-[80-120px]`, `bg-accent-glow`, `shadow-accent-glow`)
- la palette indigo/cyan (`#6366f1` / `#22d3ee`), mode sombre à accents lumineux
- `SpotlightCard` : spotlight + tilt + bordure conique
- les panneaux flottants en `motion.div` (`y: [0, -6, 0]`, 5 à 9 s)
- les connexions SVG animées via `pathLength`

Le registre est **« marque »** (site vitrine premium), pas « produit ». Ce qu'on corrige,
c'est le bruit **non intentionnel** : doublons de particules, sections lourdes redondantes,
incohérences de tokens.
