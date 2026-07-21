# CLAUDE.md — Solutions 2IA

Site vitrine multi-pages premium (Next.js 15) — sites web, apps, agents IA, automatisation, UI/UX, motion, 3D/Remotion.

## Stack
**Core** : Next.js 15 App Router · TS strict · Tailwind v4 (`@theme` dans `globals.css`) · pnpm
**Anim 2D** : `motion` (micro/reveal/parallax) · `gsap` + ScrollTrigger (séquences/scroll storytelling) — jamais sur le même élément
**3D / WebGL** : `three` · `@react-three/fiber` · `@react-three/drei`
**Vidéo programmatique** : `remotion` + `@remotion/{player,three,noise,paths,shapes,motion-blur,media-utils,google-fonts}`
**FX** : `@tsparticles/react` · `lottie-web` / `@lottiefiles/react-lottie-player` · `pixi.js`
**Couleurs** : `chroma-js` · `culori` (OKLCH)
**Tests** : Playwright

## Routes & scènes & presets
| Route | Preset bg | Forme 3D | Scène contenu |
|---|---|---|---|
| `/` | `home` | `blob` (morph) | HeroVisual (multi-panels parallax) |
| `/services` | `services` | `crystal` | — |
| `/sites-web` | `web` | `browser` | WebScene |
| `/applications` | `apps` | `device` | AppScene |
| `/agents-ia` | `ai` | `neural` | AIBrainScene (la + futuriste) |
| `/automatisation` | `automation` | `hex` | AutomationScene |
| `/studio-visuel` | `studio` | `prism` | StudioScene |
| `/a-propos` | `about` | `halo` | — |
| `/contact` | `contact` | `plasma` | — |

## Arborescence
```
app/<route>/{page.tsx (Server+metadata), <Name>Page.tsx (Client)}
components/
  ui/         Button, GlowCard, SectionHeading, SpotlightCard
  layout/     Header, Footer
  shared/     PageHero, CTABand, FluidMouseField, PageAtmosphere,
              MouseParticles, NeonDivider, DepthDivider, TransformationCard,
              SectionParticles, AppShell, LoadingScreen, PageTransition
  hero/       HeroSection, HeroVisual (parallax 3D context)
  sections/   Services|Benefits|Expertise|Process|ShowcaseSection
  scenes/{ai,automation,web,mobile,studio}/
  visuals/    (réservé fx/3D mutualisés)
remotion/     index.ts + Root.tsx + compositions/
lib/{animation,utils,content}/
remotion.config.ts
```

## Pattern de page
1. `page.tsx` Server Component → metadata
2. `<Name>Page.tsx` Client Component → rendu
3. **Background** : `<PageAtmosphere preset="X" />` + `<FluidMouseField preset="X" />` (X = preset domaine)
4. `<PageHero label/title/desc/visual/CTAs />` → sections (`SectionHeading` + `SpotlightCard`) → `<CTABand />`

## Composants clés

### `FluidMouseField` — fond fluide réactif souris (toutes pages)
- 3 calques parallaxés (halo principal lent, halo opposé inverse, focus rapide)
- Formes 3D flottantes parallaxées par `depth` (14→46), tilt rotateX/Y
- 9 presets (palette + forme + grille/scan) — 1 par domaine
- Props : `preset` · `intensity?`
- GPU only · `prefers-reduced-motion` géré · oscillation autonome sur tactile

### `SpotlightCard` — carte premium (grids des pages)
- Spotlight 380px qui suit la souris (radial gradient)
- Tilt 3D `rotateX/Y` driven par spring
- Bordure conique réactive révélée au hover (mask composite)
- Halo central pulsant optionnel (`pulse`)
- Props : `glow` (rgb sans alpha) · `tilt` · `pulse` · `className`
- Utiliser `style={{ transform: "translateZ(Npx)" }}` sur les enfants pour profondeur

### `HeroVisual` — composition home avec parallax 3D
- `ParallaxContext` propage la position souris à chaque `FloatingPanel`
- Container `perspective: 1400px` + `transformStyle: preserve-3d`
- Chaque panel a un `depth` propre (14→32) → vrai parallax
- Springs lents (stiffness 70, mass 0.8)

### `PageAtmosphere` — couche statique décorative par page
- Coexiste avec `FluidMouseField` (statique en fond, dynamique au-dessus)
- Décor unique par preset (neural net, circuits, formes flottantes, halos)

## Design tokens (Tailwind classes)
- BG : `bg-bg-{primary,secondary,card,card-hover,tertiary}`
- Texte : `text-text-{primary,secondary,tertiary}` · `text-accent-light`
- Bordures : `border-border-{subtle,medium,accent}`
- Accents : `bg-accent-{primary,light,dark,glow,glow-strong}` · `bg-cyan{,-glow}`
- Effets : `.text-gradient[-strong]` · `.glow-line` · `.bg-grid` · `.bg-radial-top` · `.card-shine` · `.bg-noise` · `.section-vignette`
- Surfaces : `.surface-card` · `.metric-tile` · `.section-intro-panel`

## Spacings (`globals.css`)
- `.section-shell` : `clamp(6rem, 9vw, 9rem)` (généreux)
- `.section-shell-tight` : `clamp(4.5rem, 7vw, 6.5rem)`
- `.section-shell-compact` : `clamp(3.5rem, 5vw, 5rem)`
- `.section-stack > * + *` : `clamp(2.5rem, 4vw, 4rem)` (rythme vertical)
- Auto-margin SectionHeading→grids/flex/space-y : `clamp(3rem, 5vw, 4.5rem)`

## Règles code
- `"use client"` que si nécessaire · pages = Server, rendus = Client
- Mobile-first (`sm: lg: xl:`) · `next/link` interne
- GSAP en import dynamique (lazy) · `prefers-reduced-motion` global
- Pas de `<img>` brut → `next/image` (lazy + optim)
- Vidéos : `<video>` + `preload="metadata"` + `poster`, ou `<Player>` Remotion
- Three.js : monter via `<Suspense>` + `dynamic(import, { ssr: false })`

## Règles visuelles
- Tout en CSS + SVG + React + motion (pas d'images de décor)
- Glow layers en fond (`blur-[80-120px]`)
- Panels flottants `motion.div` (`y:[0,-6,0]` 5-9s)
- Connexions SVG via `pathLength` animé
- Springs > durations fixes pour les interactions
- Toujours `transform`/`opacity` (jamais `width`/`height`/`top`/`left` en animation)
- Préférer `useMotionValue`/`useTransform` (0 re-render) à `useState` pour le mouvement souris

## Règles Remotion (intégré au projet)
- `remotion/Root.tsx` enregistre les compositions · `remotion.config.ts` à la racine
- Toujours `useCurrentFrame()` + `interpolate(... { extrapolateRight: "clamp" })`
- 3D dans Remotion = `ThreeCanvas` de `@remotion/three` (jamais `Canvas` R3F brut)
- `spring({stiffness:80, damping:12})` pour entrées/sorties
- Couleurs via `chroma.scale()` · shaders GLSL pour FX GPU
- Lecture web : `<Player>` de `@remotion/player` (lazy + `dynamic ssr:false`)

## Performance (priorité absolue)
- Lazy : `dynamic()` pour Three/Remotion/Pixi/Lottie · `Suspense` partout
- Images : `next/image` + `priority` que sur LCP · formats AVIF/WebP (configurés dans `next.config.ts`)
- Vidéos : `preload="metadata"`, `poster`, fallback `<img>`
- Anims : `transform`/`opacity` only · `will-change` ciblé · `contain: strict` sur les fonds fixed
- Bundle : pas de barrel imports lourds, `optimizePackageImports` configuré pour motion/drei/tsparticles/chroma/culori
- `transpilePackages` : `three`, `@react-three/{fiber,drei}`

## Commandes
```
pnpm dev | build | lint
pnpm remotion:studio        # Remotion Studio
pnpm remotion:render        # rendu MP4 (composition Hero par défaut)
pnpm exec playwright test   # tests E2E
```

## Règle de copy (demande explicite du client)
- **Jamais de tiret cadratin « — » dans le contenu visible** (pages, metadata, titres, FAQ, articles, emails, llms.txt) : ça « fait IA ». Remplacer par deux-points, virgule, parenthèses, point médian « · » (titres/labels) ou « X à Y » (fourchettes). Les commentaires de code peuvent en garder.

## Façon de travailler
- Lire l'existant avant de modifier · réutiliser `SpotlightCard` / `FluidMouseField` plutôt que recréer
- Chaque page garde sa personnalité visuelle (preset domaine) dans l'identité globale
- Logo (LoadingScreen + Header) **jamais touché** sans demande explicite
- Plan bref avant grosse modif → exécution directe → résumé court
- Build/lint quand pertinent

### `WebGalaxyShowcase` — galaxie interactive de domaines (`sections/`)
- Canvas starfield : ~180 étoiles scintillantes via `requestAnimationFrame`
- Orbites elliptiques (ratio Y = 0.42) pour effet 3D/profondeur — 3 rayons : 220/340/440px
- Planètes triées par `cy` (depth sort) · chaque planète = couleur + emoji + speed propre
- Hover → scale + glow pulsant · Clic → verrouillage (`lockedDomain`)
- Panneau droit : chrome navigateur macOS + `WebPreview` fidèle au secteur
- `AnimatePresence mode="wait"` pour transition entre previews
- Pills filtre en bas pour switcher sans la galaxie
- `angleRefs` = `useRef<Record<string,number>>` (0 re-render) · pas de state pour les positions d'orbite
## Signature de marque (NE PAS traiter comme du slop)
Les éléments suivants sont une signature de marque ASSUMÉE et INTENTIONNELLE, pas du slop IA. Ne jamais les supprimer ni les flagger comme erreur :
- `.text-gradient` / `.text-gradient-strong` sur les titres
- glow layers en fond (`blur-[80-120px]`, `bg-accent-glow`, `shadow-accent-glow`)
- palette indigo/cyan (#6366f1 / #22d3ee), dark mode à accents lumineux
- SpotlightCard (spotlight + tilt + bordure conique) et cartes premium

Registre = "brand" (site vitrine premium), pas "product". Un outil anti-slop doit distinguer le slop NON-INTENTIONNEL (doublons de particules, sections lourdes redondantes, incohérences de tokens) — ça, on corrige — de cette signature voulue — ça, on garde.
## Agents Claude Code (`.claude/agents/`)

Sept agents principaux + trois en bonus, calibrés sur l'archi Solutions 2IA.

### Read-only (audit, perf, a11y, tokens) — Haiku
| Agent | Quand l'utiliser |
|---|---|
| `site-auditor` | Début de session ou avant gros refactor. Scan archi, presets, drift. |
| `tokens-guardian` | Avant chaque PR. Détecte couleurs/spacings hard-codés hors `@theme`. |
| `performance-auditor` | Avant chaque PR ou après changement lourd. Lighthouse + bundle + grep anti-patterns. |
| `a11y-reviewer` | Avant chaque PR. Vérifie reduced-motion, ARIA, alt, hiérarchie h1-h3. |

### Création / refactor — Sonnet
| Agent | Quand l'utiliser |
|---|---|
| `section-designer` | Créer ou refondre une section. Propose 2-3 variantes avant de coder. |
| `motion-specialist` | Toute interaction, scroll storytelling, mouse parallax, GSAP timeline. |
| `r3f-3d-specialist` | Nouvelle scène Three.js / R3F. Respecte le preset du domaine. |
| `component-splitter` | Refactor d'un fichier > 250 LOC en sous-modules sans régression. |
| `copy-writer-fr` | Hero, CTAs, descriptions, SEO metadata en français premium. |

### Assets — Haiku + MCP
| Agent | Quand l'utiliser |
|---|---|
| `visual-asset-generator` | Hero vidéos, backgrounds, portraits via Higgsfield. Toujours estim. credits + confirmation. |

## Slash commands (`.claude/commands/`)
- `/refonte-page <route>` — pipeline complet (audit → propositions → impl → assets → QA)
- `/audit-pr` — 4 auditeurs en parallèle sur les fichiers modifiés
- `/split-composant <path>` — découpe un composant lourd

## MCPs configurés (`.mcp.json`)
| MCP | Usage |
|---|---|
| `context7` | Doc à jour Next 15 / React 19 / Tailwind v4 / motion v12. **Ajouter `use context7`** sur toute lib externe. |
| `higgsfield` | Génération image/vidéo on-brand. |
| `magic` (21st.dev) | `/ui` pour générer 3 variantes d'un composant. |
| `magicui` | 150+ composants animés MIT compatibles motion. |
| `shadcn` | Composants radix-based. |
| `chrome-devtools` + `playwright` | QA visuel + Lighthouse. |
| `firecrawl` | Scrape sites d'inspiration pour `section-designer`. |

## Workflows recommandés

### Refonte d'une page complète
```
/refonte-page /agents-ia
```

### Création d'une nouvelle section
```
Use section-designer to propose 3 lighter variants of a "comparaison avant/après" section for /automatisation, leveraging SpotlightCard and our tokens. Ne code pas.
```

### Animation à fixer
```
Use motion-specialist to refactor the animate={{ width }} found in components/sections/X.tsx into a scaleX-based equivalent.
```

### Avant PR
```
/audit-pr
```

## Modèles et coûts
- **Haiku** sur les agents read-only → audits rapides et peu chers
- **Sonnet** sur les agents de création
- **Opus** uniquement quand on lance `/model opusplan` pour architecturer une refonte multi-pages

## Variables d'environnement à exporter (avant `claude`)
```bash
export CONTEXT7_API_KEY="..."
export HIGGSFIELD_API_KEY="..."
export TWENTY_FIRST_API_KEY="..."
export FIRECRAWL_API_KEY="..."   # facultatif
```
