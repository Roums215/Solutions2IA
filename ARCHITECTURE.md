# Solutions 2IA — Architecture & Design System

> Site vitrine **multi-pages** premium pour Solutions 2IA. Next.js 15 App Router, TypeScript strict, Tailwind v4, Motion + GSAP, Remotion intégré, prêt 3D/Three.js.

## Sommaire
1. [Vue d'ensemble](#vue-densemble)
2. [Stack technique](#stack-technique)
3. [Architecture des fichiers](#architecture-des-fichiers)
4. [Routes & identité visuelle](#routes--identité-visuelle)
5. [Système de background](#système-de-background)
6. [Design system](#design-system)
7. [Composants clés](#composants-clés)
8. [Système d'animation](#système-danimation)
9. [Remotion intégré](#remotion-intégré)
10. [Performance & accessibilité](#performance--accessibilité)
11. [Tests & commandes](#tests--commandes)

---

## Vue d'ensemble

**9 pages**, chacune avec sa propre identité visuelle (palette, forme 3D, scène) tout en gardant une cohérence globale (typographie, layout, micro-interactions, design tokens).

**Philosophie :**
- Pas d'images de décoration : tout est CSS + SVG + composants React animés
- Tout en `transform`/`opacity` (compositing GPU) — jamais de mutation layout en animation
- `useMotionValue` + `useSpring` pour les interactions souris (0 re-render React)
- Backgrounds fluides réactifs souris uniformes via un système de presets par domaine

**Architecture rendu :**
- Pages = Server Components avec metadata SEO
- Rendus visuels = Client Components (`"use client"`) pour Motion/GSAP
- Static export friendly (SSG)

---

## Stack technique

| Catégorie | Lib | Version | Rôle |
|---|---|---|---|
| Framework | **Next.js** | 15.5 | App Router, SSG, image optim |
| UI | **React** | 19.0 | — |
| Lang | **TypeScript** | 5.7 strict | — |
| CSS | **Tailwind CSS v4** | 4.x | `@theme` dans `globals.css`, pas de config TS |
| Anim 2D | **motion** | 12.6 | micro-interactions, reveal, parallax |
| Anim scroll | **gsap + ScrollTrigger** | 3.12 | scroll storytelling (lazy import) |
| 3D | **three / @react-three/fiber / drei** | — | scènes 3D (lazy `dynamic`) |
| Vidéo prog | **Remotion 4** + plugins | 4.0 | compositions vidéo intégrées |
| FX | **@tsparticles, lottie-web, pixi.js** | — | particules, lottie, GPU 2D |
| Couleurs | **chroma-js, culori** | — | palettes, OKLCH |
| Tests | **Playwright** | 1.50 | E2E |
| Pkg | **pnpm** | 10.x | — |

`next.config.ts` : `transpilePackages: [three, fiber, drei]` · `optimizePackageImports: [motion, drei, tsparticles, chroma, culori]` · `images.formats: [avif, webp]`

---

## Architecture des fichiers

```
SiteSolutions2iaV3/
├── app/
│   ├── globals.css                 # Design tokens (@theme) + utilities + spacings
│   ├── layout.tsx                  # Root (HTML, fonts Inter/JetBrains Mono, AppShell)
│   ├── page.tsx                    # Home — Server Component
│   ├── services/         page.tsx + ServicesPage.tsx
│   ├── sites-web/        page.tsx + SitesWebPage.tsx
│   ├── applications/     page.tsx + ApplicationsPage.tsx
│   ├── agents-ia/        page.tsx + AgentsIAPage.tsx
│   ├── automatisation/   page.tsx + AutomatisationPage.tsx
│   ├── studio-visuel/    page.tsx + StudioVisuelPage.tsx
│   ├── a-propos/         page.tsx + AProposPage.tsx
│   └── contact/          page.tsx + ContactPage.tsx
│
├── components/
│   ├── ui/               Button, GlowCard, SectionHeading, SpotlightCard
│   ├── layout/           Header, Footer
│   ├── hero/             HeroSection, HeroVisual (parallax 3D context)
│   ├── shared/           PageHero, CTABand, FluidMouseField, PageAtmosphere,
│   │                     MouseParticles, NeonDivider, DepthDivider,
│   │                     TransformationCard, SectionParticles, AppShell,
│   │                     LoadingScreen, PageTransition, ParticleField,
│   │                     AmbientBackground
│   ├── sections/         ServicesSection, BenefitsSection, ExpertiseSection,
│   │                     ProcessSection, ShowcaseSection, CTASection
│   ├── scenes/
│   │   ├── ai/           AIBrainScene
│   │   ├── automation/   AutomationScene
│   │   ├── web/          WebScene
│   │   ├── mobile/       AppScene
│   │   └── studio/       StudioScene
│   ├── visuals/          (réservé fx/3D mutualisés)
│   ├── navigation/       (réservé)
│   └── robot/            (réservé futur Rive/3D)
│
├── remotion/
│   ├── index.ts                    # registerRoot
│   ├── Root.tsx                    # compositions
│   └── compositions/
│       └── HeroComposition.tsx     # démo : noise2D + spring + chroma OKLCH
│
├── lib/
│   ├── animation/        variants.ts (Motion), gsap-config.ts
│   ├── content/          navigation.ts
│   └── utils/            cn.ts
│
├── tests/                homepage.spec.ts (Playwright)
├── public/               assets statiques
├── remotion.config.ts    config Remotion (entryPoint, codec)
├── next.config.ts        Next.js (transpile, optimize, images)
└── CLAUDE.md             directives IA (token-optimized)
```

### Conventions
| Type | Convention |
|---|---|
| Composants | `PascalCase.tsx` |
| Hooks/utils | `camelCase.ts` |
| CSS classes | `kebab-case` |
| Tokens | `--color-{kebab}` |

---

## Routes & identité visuelle

Chaque page a un **preset** unique qui détermine palette, forme 3D flottante et décor.

| Route | Preset | Couleurs (RGB) | Forme 3D | Scène contenu |
|---|---|---|---|---|
| `/` | `home` | `99,102,241` + `34,211,238` | **`blob`** (morph organique) | HeroVisual |
| `/services` | `services` | `99,102,241` + `129,140,248` | **`crystal`** (facette gradient) | — |
| `/sites-web` | `web` | `59,130,246` + `34,211,238` | **`browser`** (frame wireframe) | WebScene |
| `/applications` | `apps` | `14,165,233` + `129,140,248` | **`device`** (phone glass) | AppScene |
| `/agents-ia` | `ai` | `139,92,246` + `99,102,241` | **`neural`** (cluster connecté) | AIBrainScene |
| `/automatisation` | `automation` | `34,211,238` + `6,182,212` | **`hex`** (chip avec pins) | AutomationScene |
| `/studio-visuel` | `studio` | `168,85,247` + `34,211,238` + `251,146,60` | **`prism`** (triangle rainbow) | StudioScene |
| `/a-propos` | `about` | `129,140,248` + `165,180,252` | **`halo`** (rings concentriques) | — |
| `/contact` | `contact` | `99,102,241` + `139,92,246` | **`plasma`** (nuage diffus) | — |

### Pattern de page (uniforme)
```tsx
export function XPage() {
  return (
    <>
      <PageAtmosphere preset="X" />        {/* décor statique unique */}
      <FluidMouseField preset="X" />       {/* fond fluide souris */}
      <PageHero label title description visual primaryCta secondaryCta />
      <section className="section-shell">
        <SectionHeading label title description />
        <motion.div variants={staggerContainer}>
          {items.map(...)}                 {/* SpotlightCard recommandé */}
        </motion.div>
      </section>
      {/* … autres sections */}
      <CTABand title description />
    </>
  );
}
```

---

## Système de background

Chaque page empile **3 couches** au-dessus du fond `body` :

```
┌─────────────────────────────────────────┐ z: contenu
│  Sections, cards, hero, etc.            │
├─────────────────────────────────────────┤
│  PageAtmosphere (statique, unique)      │ fixed inset-0 z-0
│  • Glow orbs animés                     │
│  • Décor SVG (neural, circuits, formes) │
├─────────────────────────────────────────┤
│  FluidMouseField (mouse-reactive)       │ fixed inset-0 -z-0
│  • 3 halos parallaxés (palette preset)  │
│  • 4-7 formes 3D flottantes parallax    │
│  • Grille / scan optionnels             │
│  • Vignette périphérique                │
├─────────────────────────────────────────┤
│  body                                   │ radial gradient + linear
└─────────────────────────────────────────┘
```

### `FluidMouseField` — détails techniques
- **Mount lazy** : retourne `null` jusqu'à `enabled` (post-mount client)
- **`prefers-reduced-motion`** : retourne `null`
- **Tactile** : oscillation autonome (`sin`/`cos`)
- **Mouse springs** : 2 paires `useSpring` (lent pour halos, rapide pour focus)
- **Formes 3D** : container `perspective: 1200px` + `transformStyle: preserve-3d`
- **`contain: strict`** sur le container fixed (isolation peinture)
- **`will-change: transform`** sur les calques actifs

### Formes disponibles (`ShapeKind`)
| Kind | Visuel | Animation interne |
|---|---|---|
| `blob` | SVG path organique | Morphing entre 3 d= + rotation lente |
| `crystal` | Polygone 6 facettes | Reflet diagonal animé + rotation |
| `browser` | Mini frame navigateur | Tilt rotateY ±3° |
| `device` | Phone outline + notch | Notif dot pulse + tilt rotateY |
| `neural` | Cluster centre+5 satellites | Connexions opacity + circles scale |
| `hex` | Hexagone + 5 pins/côté | Rotation lente + pulse central |
| `prism` | Triangle gradient rainbow | Refraction line + rotation |
| `halo` | 3 rings concentriques | Scale breathing + dot central |
| `plasma` | Cloud radial diffus | Scale + opacity breathing |

---

## Design system

### Palette (`@theme` dans `globals.css`)

#### Fonds
| Token | Valeur | Usage |
|---|---|---|
| `--color-bg-primary` | `#05060b` | Fond principal |
| `--color-bg-secondary` | `#0b0d16` | Sections alternées |
| `--color-bg-tertiary` | `#121524` | Encastrés |
| `--color-bg-card` | `#111424` | Cartes |
| `--color-bg-card-hover` | `#171b30` | Cartes hover |

#### Accents
| Token | Valeur | Usage |
|---|---|---|
| `--color-accent-primary` | `#6366f1` | Indigo principal |
| `--color-accent-light` | `#9ba5ff` | Texte/labels accent |
| `--color-accent-dark` | `#4f46e5` | Hover boutons |
| `--color-cyan` | `#22d3ee` | Accent secondaire |

#### Texte
| Token | Valeur |
|---|---|
| `--color-text-primary` | `#f5f7ff` |
| `--color-text-secondary` | `#bcc1d6` |
| `--color-text-tertiary` | `#8e95af` |

#### Bordures
| Token | Valeur |
|---|---|
| `--color-border-subtle` | `rgba(255,255,255,0.09)` |
| `--color-border-medium` | `rgba(255,255,255,0.15)` |
| `--color-border-accent` | `rgba(129,140,248,0.38)` |

### Typographie
- **Inter** 300-800 — UI principale
- **JetBrains Mono** 400-500 — code, métriques

### Spacings
| Classe | Padding-block |
|---|---|
| `.section-shell` | `clamp(6rem, 9vw, 9rem)` |
| `.section-shell-tight` | `clamp(4.5rem, 7vw, 6.5rem)` |
| `.section-shell-compact` | `clamp(3.5rem, 5vw, 5rem)` |
| `.section-stack > * + *` | `margin-top: clamp(2.5rem, 4vw, 4rem)` |

Auto-margin sous `SectionHeading` vers grids/flex/space-y : `clamp(3rem, 5vw, 4.5rem)`

### Utility classes
| Classe | Effet |
|---|---|
| `.text-gradient[-strong]` | Gradient indigo→cyan sur le texte |
| `.glow-line` | Ligne horizontale gradient |
| `.bg-grid` | Grille 60×60px subtle |
| `.bg-radial-top[-bottom]` | Halo radial coin section |
| `.bg-noise` | Texture bruit SVG (::before) |
| `.card-shine` | Reflet diagonal au hover |
| `.section-surface` | Fond alterné avec bordures top/bottom |
| `.section-vignette` | Bordures sombres radiales |
| `.surface-card` | Style carte premium glassmorph |
| `.metric-tile` | Style tuile de métrique |

### Easing
Toutes les anims utilisent : `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
Variable CSS : `--ease-premium`

---

## Composants clés

### `Button` (`components/ui/Button.tsx`)
Polymorphe : `<a>` si `href`, `<button>` sinon.
Props : `variant: primary|secondary|ghost` · `size: sm|md|lg` · `href` · `onClick` · `disabled` · `type`

### `SectionHeading` (`components/ui/SectionHeading.tsx`)
Props : `label?` · `title` · `description?` · `centered?`

### `GlowCard` (`components/ui/GlowCard.tsx`)
Carte simple avec hover glow. Encore utilisée pour les cards basiques. Pour les grids principaux, préférer `SpotlightCard`.

### `SpotlightCard` (`components/ui/SpotlightCard.tsx`) ⭐
Carte premium driven par `useMotionValue` (0 re-render) :
- **Spotlight 380px** qui suit la souris (radial gradient)
- **Tilt 3D** `rotateX/Y` via spring (`stiffness: 220, damping: 22`)
- **Bordure conique réactive** au hover (mask composite XOR)
- **Halo central pulsant** optionnel
- Préserve `transform-style: preserve-3d` → enfants peuvent utiliser `translateZ(Npx)` pour profondeur

```tsx
<SpotlightCard glow="139,92,246" tilt={5} pulse className="p-8">
  <div style={{ transform: "translateZ(30px)" }}>{icon}</div>
  <h3 style={{ transform: "translateZ(20px)" }}>{title}</h3>
  <p style={{ transform: "translateZ(10px)" }}>{description}</p>
</SpotlightCard>
```

Props : `glow` (rgb sans alpha) · `tilt` (° max) · `pulse` · `className`

### `PageHero` (`components/shared/PageHero.tsx`)
Hero standard de toute page non-home. Props : `label` · `title` · `description` · `visual?` · `primaryCta` · `secondaryCta`

### `CTABand` (`components/shared/CTABand.tsx`)
Bande CTA finale réutilisable. Props : `title` · `description`

### `FluidMouseField` (`components/shared/FluidMouseField.tsx`) ⭐
Voir [Système de background](#système-de-background). Props : `preset` · `intensity?`

### `PageAtmosphere` (`components/shared/PageAtmosphere.tsx`)
Couche statique décorative par preset. Coexiste avec `FluidMouseField`. Props : `preset`

### `HeroVisual` (`components/hero/HeroVisual.tsx`) ⭐
Composition home avec **parallax 3D** :
- `ParallaxContext` propage `mx`/`my` (springs) à chaque `FloatingPanel`
- Container `perspective: 1400px` + `transformStyle: preserve-3d`
- Chaque panel a un `depth` propre (14→32) → vrai parallax + tilt rotateX/Y
- 6 panels distincts (Dashboard IA, Mobile App, AI Agent, Code Editor, Performance Widget, Workflows)
- Connexions SVG `pathLength` animé · particules ambiantes · orbites

### `TransformationCard` (`components/shared/TransformationCard.tsx`)
Card avant/après réutilisable (variants : `general`, `web`, etc.)

### `SectionParticles`
Particules d'ambiance par section (styles : `dots`, `sparks`, `hexagons`, `crosses`, `grid-dots`, `code-rain`)

---

## Système d'animation

### Architecture
```
Motion (motion/react)              GSAP + ScrollTrigger
─────────────────────              ────────────────────
• whileInView (reveal)             • scrub timelines
• whileHover/whileTap              • séquences complexes
• useMotionValue/useSpring         • lazy import
• useTransform (parallax)
• animate (boucles)
• AnimatePresence (transitions)
```

**Règle d'or** : Motion et GSAP **jamais sur le même élément**.

### Variants Motion (`lib/animation/variants.ts`)
| Variant | Effet |
|---|---|
| `fadeInUp` | opacity 0→1, y +30→0, 0.6s |
| `fadeIn` | opacity 0→1, 0.6s |
| `scaleIn` | opacity + scale 0.95→1 |
| `slideInLeft` / `slideInRight` | x ±40→0 |
| `staggerContainer` | orchestre enfants (stagger 0.1, delay 0.1) |

### Pattern reveal standard
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  <motion.div variants={fadeInUp}>...</motion.div>
</motion.div>
```

### Pattern parallax souris (préféré pour interactions)
```tsx
const mx = useMotionValue(0);
const my = useMotionValue(0);
const sx = useSpring(mx, { stiffness: 70, damping: 18 });
const tx = useTransform(sx, v => v * depth);
// → 0 re-render React, 100% GPU
```

---

## Remotion intégré

Compositions vidéo programmatiques **dans le projet Next.js** (pas de projet séparé).

```
remotion/
├── index.ts              registerRoot(RemotionRoot)
├── Root.tsx              <Composition id="Hero" component={HeroComposition} />
└── compositions/
    └── HeroComposition.tsx   noise2D + spring + chroma OKLCH gradient
```

`remotion.config.ts` : `entryPoint: ./remotion/index.ts` · `concurrency: 4` · `videoImageFormat: jpeg`

### Règles Remotion
- Toujours `useCurrentFrame()` + `interpolate(... { extrapolateRight: "clamp" })`
- 3D = `ThreeCanvas` de `@remotion/three` (jamais `Canvas` R3F brut)
- `spring({ stiffness: 80, damping: 12 })` pour entrées/sorties
- Couleurs via `chroma.scale().mode("oklch")`
- Lecture web : `<Player>` de `@remotion/player` chargé en `dynamic({ ssr: false })`

### Commandes
```bash
pnpm remotion:studio       # Remotion Studio
pnpm remotion:render       # rendu MP4 (Hero, h264, 60 fps)
```

---

## Performance & accessibilité

### Performance
- **Animations** : `transform`/`opacity` exclusivement → GPU compositing
- **`will-change: transform`** ciblé sur les calques actifs
- **`contain: strict`** sur les containers fixed (isolation peinture)
- **`useMotionValue`/`useSpring`** au lieu de `useState` pour le mouvement → **0 re-render**
- **Lazy mounting** : `FluidMouseField`, `MouseParticles`, `LoadingScreen` retournent `null` jusqu'à `enabled`
- **GSAP** : import dynamique (`await import()`)
- **Three.js / Remotion Player** : `dynamic(import, { ssr: false })`
- **Next.js** :
  - `optimizePackageImports` pour motion, drei, tsparticles, chroma, culori
  - `transpilePackages` pour three/r3f/drei
  - `images.formats: [avif, webp]`

### Accessibilité
- **`prefers-reduced-motion`** géré globalement (`globals.css`) + dans `FluidMouseField`, `MouseParticles`, `HeroVisual` (return null / no spring)
- **Sémantique HTML** : `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- **Contraste** : texte `#f5f7ff` sur fond `#05060b` → ratio > 17:1
- **Menu mobile** : `aria-label`, scroll lock
- **Pointer coarse** (mobile/tactile) : oscillation autonome au lieu d'écouter pointermove

---

## Tests & commandes

### Commandes
```bash
pnpm dev                    # serveur dev (port 3000 ou suivant libre)
pnpm build                  # build production SSG
pnpm start                  # serveur production
pnpm lint                   # ESLint Next
pnpm exec playwright test   # tests E2E
pnpm remotion:studio        # Remotion Studio
pnpm remotion:render        # rendu MP4
```

### Tests Playwright (`tests/homepage.spec.ts`)
Tests smoke sur la home : h1 visible, header/footer présents, sections critiques attachées au DOM.

---

## Évolutions prévues

| Dossier | Usage |
|---|---|
| `components/visuals/` | FX/3D mutualisés (Three.js scenes, shaders) |
| `components/robot/` | Robot IA Rive/Lottie/3D |
| `components/dashboards/` | Dashboards interactifs |
| `remotion/compositions/` | Nouvelles compositions vidéo |

### Pistes
- Robot IA animé Rive/Lottie dans la Hero
- Particules WebGL via tsparticles ou Three.js
- Page transitions avec AnimatePresence
- Formulaire contact avec validation et envoi
- Internationalisation (fr/en)
- CMS headless (Sanity, Strapi)
- Analytics (Plausible, Vercel Analytics)
