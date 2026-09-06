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
| `.section-shell` | `clamp(6rem, 9vw, 9rem)` | section principale |
| `.section-shell-tight` | `clamp(4.5rem, 7vw, 6.5rem)` | section secondaire |
| `.section-shell-compact` | `clamp(3.5rem, 5vw, 5rem)` | encart, transition |

### Containers (largeur)

| Classe | Quand |
|---|---|
| `.section-container` | grilles, schémas, cartes |
| `.section-container-narrow` | texte long (articles, pages légales) |

### Rythme automatique

- `.section-stack > * + *` : `margin-top: clamp(2.5rem, 4vw, 4rem)`
- Un `SectionHeading` suivi d'une `grid`, d'un `flex` ou d'un `space-y` prend
  automatiquement `clamp(3rem, 5vw, 4.5rem)` de marge. **Ne pas ajouter de `mt-*` à la main.**

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
| `.glow-line` | filet lumineux horizontal | 1 |
| `.reading-copy` | typographie de lecture longue | 1 |
| `.perspective-floor` | sol en perspective (PageHero) | 1 |
| **10 classes mortes** (détail au §7) | définies dans `globals.css`, utilisées nulle part | **0** |

---

## 4. Les presets de page

Un mot donne à la page sa palette et son décor : `<PageAtmosphere preset="ai" />`.

| Preset | Palette | Routes |
|---|---|---|
| `home` | `99,102,241` + `34,211,238` | `/` |
| `services` | `99,102,241` + `129,140,248` | `/services` `/faq` `/glossaire` `/articles` `/articles/[slug]` |
| `web` | `59,130,246` + `34,211,238` | `/sites-web` |
| `apps` | `14,165,233` + `129,140,248` | `/applications` `/applications/[secteur]` |
| `ai` | `139,92,246` + `99,102,241` | `/agents-ia` |
| `automation` | `34,211,238` + `6,182,212` | `/automatisation` `/automatisation/[secteur]` `/rag` |
| `studio` | `168,85,247` + orange | **aucune** (page supprimée en juin 2026) |
| `about` | `129,140,248` + `165,180,252` | `/a-propos` |
| `contact` | `99,102,241` + `139,92,246` | `/contact` |

Les quatre pages légales et la page privée n'ont aucun preset : fond `body` nu, volontaire.

---

## 5. Les couches de fond

```
contenu de la page
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
| **`PageHero`** | `shared/PageHero.tsx` | `label*` `title*` (ReactNode) `description*` `primaryCta?` `secondaryCta?` `visual?` `glowColor?` `mobileSteps?` |
| **`SectionHeading`** | `ui/SectionHeading.tsx` | `label?` `title*` `description?` `centered?` (défaut `true`) |
| **`SpotlightCard`** | `ui/SpotlightCard.tsx` | `glow?` (`"r,g,b"`, défaut `"129,140,248"`) `tilt?` (deg, défaut `6`) `pulse?` `className?` |
| **`Button`** | `ui/Button.tsx` | `variant` (`primary` `secondary` `ghost` `outline` `link` `destructive` `default`) `size` (`xs` `sm` `default` `md` `lg` `icon*`) `href?` |
| **`CTABand`** | `shared/CTABand.tsx` | `title?` `description?` `primaryLabel?` `primaryHref?` (tout a un défaut) |
| **`PremiumFlowPanel`** | `shared/PremiumFlowPanel.tsx` | `label*` `title*` `description*` `steps*` (`{title, description, meta?}[]`) `accent?` (`"r, g, b"`) `className?` |
| **`PageAtmosphere`** | `shared/PageAtmosphere.tsx` | `preset*` (décor **statique**) |
| **`RelatedServices`** | `shared/RelatedServices.tsx` | `current` (clé de route) |
| **`SectionParticles`** | `shared/SectionParticles.tsx` | `variant` |
| **`ToolBadge`** | `ui/ToolBadge.tsx` | badge d'outil (n8n, Axonaut…) |
| **`TermeExplique`** | `ui/TermeExplique.tsx` | `k` (clé du glossaire) · **actuellement non branché** |

`SpotlightCard` applique un tilt 3D : pour donner de la profondeur aux enfants,
`style={{ transform: "translateZ(30px)" }}`.

> ⚠️ **Niveaux de titre.** `PageHero` rend le `h1`, `SectionHeading` rend un `h2`,
> `PremiumFlowPanel` rend un `h3` en dur. Une section qui n'utilise que `PremiumFlowPanel`
> saute du `h1` au `h3` : toujours poser un `SectionHeading` avant.

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

- **`BRAND` dans `lib/seo/constants.ts` ne correspond plus à `globals.css`** :
  `primary: "#7c3aed"` (violet) alors que l'accent réel est `#6366f1` (indigo),
  `bg: "#06070d"` au lieu de `#05060b`, `card: "#10111c"` au lieu de `#111424`.
  Conséquence visible : le `theme-color` de la barre de navigateur et le `theme_color`
  du manifest PWA affichent une couleur qui n'est pas celle du site.
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
- **`PremiumFlowPanel` rend son titre en `<h3>` en dur** (`PremiumFlowPanel.tsx:65`).
  Utilisé seul juste après le hero, il crée un saut `h1` → `h3` : c'est le cas sur `/`,
  `/services`, `/applications` (deux fois), `/agents-ia`, `/a-propos` et `/contact`.
  Une prop de niveau de titre corrigerait les sept occurrences d'un coup.
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
