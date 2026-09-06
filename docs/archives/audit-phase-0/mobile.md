# Audit MOBILE/RESPONSIVE — Phase 0 (2026-06-12)

> Largeurs cibles : 360 / 768 / 1280 / 1920. html/body ont `overflow-x: clip` (filet).

## Débordements / largeurs fixes
- HeroSection.tsx:19-21 : glows `w-[1000px]`, `w-[500px]` — contenus par clip mais coût layout
- PageAtmosphere : orbs `w-[34rem]`, `h-[30rem]` positionnés négatifs
- AmbientBackground (code mort) : w-[500px]+ multiples — pertinent seulement s'il revient

## Grilles sans responsive
- ShowcaseSection.tsx:26 : `grid grid-cols-3` fixe → écrasé à 360 px (~115 px/col)

## Cibles tactiles
- Header.tsx:248 : burger `w-10 h-10` (40 px < 44 px WCAG) → min 44×44
- Button size sm : h-7 (28 px) — OK actions secondaires, jamais CTA
- ✓ Bons exemples : ProfileCarousel & RagSectorTabs `min-h-[44px]` + scroll-x compensé

## Schémas animés — dégradation mobile
| Schéma | État |
|---|---|
| HomeServicesConstellation | ✓ desktop `hidden lg:block` / mobile grille 2×3 |
| HomeProfileMatrix | ✓ grid-cols-1→2→3 |
| RagMemoryFlow / RagEnrichmentStatic | anims OFF mobile ✓ ; positionnement % à vérifier à 360 |
| AutomationPipeline / OneAgentManyNeeds | à vérifier à 360 |
| WebGalaxyShowcase | code mort — si retour : sphères pos % débordent, version mobile requise |

## Lisibilité
- text-[9px]/[10px] sur contenu informatif (sectorDashboards, ShowcaseSection) — passable pour mocks, à éviter pour vrai contenu
- ✓ leading-[1.7-1.85] sur les textes longs

## Header/Footer mobile
- ✓ Menu overlay + scroll lock ; footer stack correct.
