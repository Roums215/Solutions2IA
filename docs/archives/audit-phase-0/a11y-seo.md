# Audit A11Y/SEO — Phase 0 (2026-06-12)

## Metadata — manquants (canonical + OG)
9 pages : /applications, /agents-ia, /automatisation (+/[secteur]), /rag, /cgv, /confidentialite, /cookies, /mentions-legales.
Fix : 1-2 lignes par page.tsx (alternates.canonical + openGraph). /studio-visuel supprimée → redirect 301.
Sitemap/robots : cohérents avec les routes réelles ✓ (retirer studio-visuel après suppression).

## Images
Alt corrects partout (logos). Peu d'images statiques ✓.

## Landmarks/sémantique
- ✓ header/main/footer (AppShell), sections aria-labelledby sur home
- ✓ OneAgentManyNeedsPipeline : role="img" + aria-label
- ✗ Header dropdown : onMouseEnter seul — **pas accessible clavier** (pas d'aria-expanded/haspopup, pas d'Escape) — WCAG A
- ✗ Accordéon FAQ /contact custom : pas d'aria-expanded
- PageAtmosphere/FluidMouseField : SVG décoratifs à passer aria-hidden

## Hn
- ✓ PageHero rend bien un <h1> unique (vérifié PageHero.tsx:167)
- /articles : h2 de cartes à vérifier vs h1 de page

## Reduced-motion
- ✓ PageHero : initial+animate (PAS whileInView) → contenu toujours révélé (risque signalé par l'agent surestimé, vérifié à la main)
- Vrai risque : sections initial="hidden" + whileInView quand le tier minimal coupera les anims → couvert par migration staticRender → disableContentMotion (état final statique lisible)

## Focus/clavier
- ✓ ProfileCard focus-visible ; inputs contact focus ring
- ✗ Dropdown header (cf. supra) ; boutons service-selector sans aria-pressed

## Contrastes (pires cas)
- text-[10px] text-text-tertiary (#8e95af) sur cards ≈ 4.2:1 — borderline pour micro-copy informative

## Formulaire /contact
- Labels visibles ✓ mais : pas de required/aria-required, pas d'aria-invalid, pas de validation, pas de gestion succès/erreur

## Top fixes (1-2 lignes chacun pour la plupart)
1. Canonical + OG ×9 pages
2. Dropdown header clavier (aria-expanded/haspopup, focus, Escape)
3. Form contact : required + aria + validation légère
4. aria-expanded accordéons custom
5. aria-hidden sur SVG décoratifs restants
6. Micro-copy : tertiary → secondary ou ≥ 12 px
