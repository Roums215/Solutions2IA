# CLAUDE.md

## Projet
Site vitrine multi-pages premium pour l'entreprise individuelle "Solutions 2IA".

## Activité
- Développement de sites web premium
- Développement d'applications web et mobiles
- Agents IA et assistants intelligents
- Automatisation de workflows et processus
- UI / UX design haut de gamme
- Animations web avancées, motion design
- Expériences visuelles 2D / 3D / Remotion

## Objectif
Site multi-pages très haut de gamme, mémorable, moderne, propre, orienté conversion. Chaque page a sa propre identité visuelle et sa scène animée dédiée, tout en conservant une cohérence globale.

## Stack technique
- Next.js 15 (App Router, multi-pages SSG)
- TypeScript (strict)
- Tailwind CSS v4 (via @tailwindcss/postcss, design tokens dans globals.css)
- Motion (motion/react) pour micro-interactions et animations locales
- GSAP + ScrollTrigger pour séquences complexes et scroll storytelling
- Playwright pour tests E2E de base
- Structure prête pour Rive / Remotion / Three.js / assets visuels avancés

## Architecture multi-pages

### Routes
| Route | Rôle | Scène visuelle |
|---|---|---|
| `/` | Home — manifeste, vitrine, wow | HeroVisual (composition multi-panels) |
| `/services` | Overview des prestations | — |
| `/sites-web` | Page dédiée sites web | WebScene (browser frame, performance) |
| `/applications` | Page dédiée apps | AppScene (phone + desktop sync) |
| `/agents-ia` | Page dédiée IA (la plus futuriste) | AIBrainScene (cerveau, orbites, neural) |
| `/automatisation` | Page dédiée automation | AutomationScene (pipelines, circuits) |
| `/studio-visuel` | Page dédiée motion/3D | StudioScene (timeline, viewport, tokens) |
| `/a-propos` | Crédibilité, vision, méthode | — |
| `/contact` | Formulaire, conversion | — |

### Direction artistique par page
- **Home** : composition multi-panels flottants (dashboard, mobile, agent IA, terminal, workflows). Orbites, particules, connexions SVG.
- **Agents IA** : cerveau numérique central, orbites rotatives, nœuds neuraux, panels de raisonnement. La page la plus futuriste.
- **Automatisation** : hub central cyan, pipelines verticaux avec impulsions électriques, nœuds d'intégration, métriques temps réel.
- **Sites web** : browser frame animé, badge Lighthouse, responsive indicator.
- **Applications** : phone frame avec notch, sync desktop, tech stack floating.
- **Studio visuel** : timeline de composition, viewport 3D pseudo, design tokens.
- **À propos / Contact** : pas de scène visuelle, focus sur le contenu premium et la conversion.

## Architecture des composants
```
components/
  ui/               → Button, GlowCard, SectionHeading (design system)
  layout/            → Header (dropdown nav), Footer
  shared/            → PageHero (réutilisable), CTABand (réutilisable)
  hero/              → HeroSection, HeroVisual (home uniquement)
  sections/          → ServicesSection, BenefitsSection, ExpertiseSection,
                       ProcessSection, ShowcaseSection
  scenes/
    ai/              → AIBrainScene (orbites, cerveau, neural nodes)
    automation/      → AutomationScene (pipelines, hub, métriques)
    web/             → WebScene (browser, Lighthouse, responsive)
    mobile/          → AppScene (phone, desktop, sync)
    studio/          → StudioScene (timeline, 3D viewport, tokens)
  navigation/        → (réservé)
  robot/             → (réservé pour futur robot Rive/3D)
  dashboards/        → (réservé)
  remotion/          → (réservé)
  3d/                → (réservé)
lib/
  animation/         → variants Motion, config GSAP
  utils/             → cn() helper
  content/           → navigation.ts (routes, liens)
```

## Pattern de page
Chaque page suit le pattern :
1. `app/<route>/page.tsx` — Server Component avec metadata
2. `app/<route>/<Name>Page.tsx` — Client Component avec le rendu
3. Utilise `PageHero` pour le hero (label, title, description, visual, CTAs)
4. Sections de contenu avec `SectionHeading` + `GlowCard` ou custom
5. Termine par `CTABand` (sauf Contact qui a son propre formulaire)

## Design tokens (CSS custom properties)
Définis dans `app/globals.css` via `@theme`. Classes Tailwind correspondantes :
- Fonds : `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-card`
- Texte : `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-accent-light`
- Bordures : `border-border-subtle`, `border-border-accent`
- Accents : `bg-accent-primary`, `bg-accent-glow`, `bg-cyan`, `bg-cyan-glow`
- Effets : `.text-gradient`, `.text-gradient-strong`, `.glow-line`, `.bg-grid`, `.bg-radial-top`, `.card-shine`

## Règles de code
- "use client" uniquement quand nécessaire
- Server Components pour les pages (metadata), Client Components pour le rendu
- Composants réutilisables avec interface TypeScript claire
- Responsive mobile-first (sm:, lg:, xl:)
- Import dynamique pour GSAP (lazy load)
- Link de next/link pour la navigation interne

## Règles d'animation
- Motion pour animations locales, micro-interactions, hover, reveal
- GSAP uniquement pour séquences complexes et scroll storytelling
- Ne pas mélanger Motion et GSAP sur le même élément
- Respecter prefers-reduced-motion (géré globalement)
- Chaque scène visuelle a ses propres animations autonomes
- Floating panels : animation perpétuelle (y: [0, -6, 0]) sur 5-9s

## Règles pour les scènes visuelles
- Construites en CSS + SVG + React + Motion (pas d'images)
- Positionnement absolu dans un conteneur relative
- Glow layers en fond (blur-[80-120px])
- Panels flottants avec FloatingPanel ou motion.div
- Connexions SVG avec pathLength animation
- Particules / NeuralNodes pour la profondeur
- Prêtes à accueillir des assets Rive, Lottie ou Three.js

## Commandes
- `pnpm dev` — serveur de développement
- `pnpm build` — build production
- `pnpm lint` — lint ESLint

## Façon de travailler
- Toujours analyser la structure existante avant de modifier
- Avant une grosse modification, expliquer le plan brièvement
- Exécuter directement après le plan
- Après chaque grande étape, résumer les changements
- Lancer build/lint quand pertinent
- Ne pas recréer un composant qui existe déjà — le réutiliser
- Chaque page doit avoir sa propre personnalité visuelle sans casser l'identité globale
