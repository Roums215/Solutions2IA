# Audit PERF — Phase 0 (2026-06-12)

> Contexte : le site lague sur PC d'entrée de gamme (HP, deviceMemory ≤ 4, 2-4 cœurs), fluide sur Mac.

## usePerformanceMode — état exact (`lib/animation/usePerformanceMode.ts`)

| Flag | Logique | Constat |
|---|---|---|
| `shouldReduceMotion` (l.89) | `= prefersReducedMotion` SEUL | **BUG RACINE** : un PC low-end sans réglage OS garde toutes les anims motion JS (repeat: Infinity). Découplage volontaire (commit 4ecd29e) pour préserver les anims cartes sur iPhone — à préserver via le tier system. |
| `shouldDegrade` (l.92) | low-end ∨ reduced-motion → `<html data-perf="low">` | Aucun consommateur React réel (CSS seulement). Sémantique redéfinissable. |
| `shouldHideBackgroundDecor` (l.95) | mobile ∨ coarse ∨ low-end ∨ saveData ∨ slow ∨ reduced | ≡ « tier ≠ full » — rétrocompat mécanique. |
| `isLowPowerDevice` (l.79) | deviceMemory ≤ 4 ∨ cores ≤ 4 ∨ saveData ∨ slow | OK. |

**47 call-sites** du hook — chacun pose ses 3 listeners matchMedia et écrit `data-perf` : incompatible avec un tier mutable (FPS guard) → centraliser en store singleton.

## Inventaire composants coûteux

| Composant | Fichier | Branché perf ? | Coût | Notes |
|---|---|---|---|---|
| FluidMouseField | shared/FluidMouseField.tsx (758 LOC) | ✓ shouldHideBackgroundDecor | TRÈS ÉLEVÉ | 4 springs, ~6 formes 3D parallaxées, grille+scan, 3 halos blur. |
| MouseParticles | shared/MouseParticles.tsx (353 LOC) | ✓ (AppShell) | TRÈS ÉLEVÉ | **`setParticles()` par frame rAF = ~60 re-renders React/s** (l.125-135). Contributeur n°1 probable du lag desktop. |
| SectionParticles | shared/SectionParticles.tsx | ✓ | MOYEN | counts 6-10, repeat Infinity par style. |
| Scènes (AIBrain/Web/Automation/App/Studio) | scenes/** | partiel | TRÈS ÉLEVÉ | **Import statique dans les *Page.tsx** (bundle payé sur mobile). AIBrainScene : 9 repeat Infinity + SMIL `<animateMotion>` (insensibles au CSS, tournent hors écran). Web/Automation : AUCUN gating. |
| PageAtmosphere | shared/PageAtmosphere.tsx | ✓ early returns | MOYEN | Branche intermédiaire (mobile) actuellement morte — réutilisable pour tier reduced. |
| HeroVisual | hero/HeroVisual.tsx | partiel | ÉLEVÉ | parallax souris + oscillations infinies. |

### Code MORT à HEAD (non importé — gating de précaution seulement)
WebGalaxyShowcase (2331 LOC), AmbientBackground, shared/ParticleField, NeonDivider, DepthDivider.
three/pixi/lottie/gsap/tsparticles purgés du package.json (commit 0549393). `@remotion/player` non importé dans app/.

## Animations infinies non gérées (échantillon fichier:ligne)
- scenes/web/WebScene.tsx : 8× repeat Infinity (aucun gating)
- scenes/ai/AIBrainScene.tsx : 9× repeat Infinity + SMIL
- sections/automation/AutomationPipeline.tsx, applications/AppDigitizationPipeline.tsx, applications/sectorDashboards.tsx : boucles non gatées par tier
- shared/FluidMouseField.tsx:670 (scan lines ×12)
- shared/PageHero.tsx:100 (MobileHeroPreview pulse), l.161 animate-ping permanent

## Lazy-loading
- ✓ MouseParticles : dynamic ssr:false (AppShell)
- ✗ Scènes : import statique dans les 5 *Page.tsx → à passer en dynamic + Suspense + poster
- next.config : optimizePackageImports OK.

## CSS data-perf existant (globals.css 669-710) vs manquant
Existant (`low`) : backdrop-filter off, animations CSS 0s, [data-decor] hidden, glows off.
Manquant : tier intermédiaire (reduced), will-change relâché, mix-blend-mode.

## Divers
- **playwright.config.ts pointait port 3000, dev = 4000** → corrigé en Phase 1.0.
- Tests existants : tests/homepage.spec.ts (smoke h1/header/footer/sections).

## Top actions (impact × effort)
1. Tier system (`full|reduced|minimal`) + low-end ⇒ ≥ reduced — corrige le bug racine.
2. FPS guard runtime (downgrade auto < ~40 fps, ratchet, sessionStorage).
3. Fix MouseParticles setParticles/frame (motion values, pas de setState par frame).
4. Scènes en dynamic ssr:false + poster + PauseOffscreen (SMIL non rendus hors écran).
5. CSS data-perf reduced/minimal.
