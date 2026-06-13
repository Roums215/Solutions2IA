# BRIEF_REFONTE — Solutions 2IA

> Brief à donner à Claude Code (modèle **Fable 5**) pour l'audit + la refonte qualitative du site.
> Lancer Claude Code **à la racine du repo**, sélectionner Fable 5 via `/model`, puis (recommandé)
> activer le **mode plan** avant de coller le prompt ci-dessous.

---

## Prompt

Tu travailles sur le repo Solutions 2IA (site vitrine Next.js 15 / App Router / TS strict / Tailwind v4 / pnpm).

AVANT TOUTE CHOSE : lis CLAUDE.md, AGENTS.md, ARCHITECTURE.md et PLAYBOOK.md en entier. Ces docs font loi (stack, presets par route, règles code/visuelles/perf, langage des schémas animés, double-lecture PME/grand compte). Ne propose rien qui les contredit.

### MISSION
Audit complet + refonte qualitative de TOUTES les pages et sous-pages : structure, lisibilité, visuel, version mobile ET desktop, et surtout performance adaptée à TOUS les appareils (aujourd'hui ça lague sur PC d'entrée de gamme type HP, alors que c'est fluide sur Mac / PC récent — ce n'est plus acceptable).

### CONTRAINTES ABSOLUES (ne jamais violer)
1. GARDER les schémas animés (pipelines, RAG, agents, automatisation) — c'est la signature de marque. Interdiction de les supprimer. Tu as le droit de les RE-PLACER, simplifier, mieux légender (une ligne par schéma), améliorer leur intégration.
2. Si un bloc doit disparaître (redondant, générique, ou stat inventée — voir PLAYBOOK), tu le REMPLACES par mieux. Jamais de trou ni de section cassée.
3. Logo intact. Identité visuelle par page (preset de domaine) conservée.
4. Zéro stat inventée (formulations qualitatives ou chiffres réels uniquement).
5. Réutiliser l'existant (SpotlightCard, FluidMouseField, PageAtmosphere, PageHero, CTABand…) plutôt que recréer.
6. Pas de régression : `pnpm build` + `pnpm lint` + `pnpm exec playwright test` doivent rester verts.
7. Pas de nouvelle dépendance lourde sans justification écrite.

### MÉTHODE EN PHASES

#### Phase 0 — Cartographie (SOUS-AGENTS en parallèle, LECTURE SEULE, aucune édition)
Lance plusieurs sous-agents (Task tool) en parallèle, un par axe, qui écrivent leurs constats dans /audit/<axe>.md :
- AUDIT STRUCTURE/CONTENU : pour chaque route (/ , /services, /sites-web, /applications, /agents-ia, /automatisation, /studio-visuel, /a-propos, /contact + pages légales), relever : clarté du hero, ordre logique des sections, hiérarchie Hn, présence/qualité de la double-lecture (niveau 1 PME / niveau 2 technique déroulant), navigation pages↔sous-pages, redondances entre pages.
- AUDIT PERF : recenser tous les composants coûteux (FluidMouseField, MouseParticles, SectionParticles, ParticleField, scènes three.js, Players Remotion, GSAP, pixi, WebGalaxyShowcase canvas). Vérifier lazy-load (dynamic ssr:false + Suspense), comptage de particules, calques, re-renders. Repérer ce qui tourne hors écran et ce qui ne respecte pas usePerformanceMode.
- AUDIT MOBILE/RESPONSIVE : breakpoints, débordements horizontaux, cibles tactiles, scènes lourdes chargées sur mobile, lisibilité aux largeurs 360 / 768 / 1280 / 1920.
- AUDIT A11Y/SEO : metadata par page, alt des images, contrastes, landmarks, prefers-reduced-motion = état final statique lisible.
Ensuite SYNTHÉTISE tout dans /audit/PLAN.md : problèmes priorisés (impact × effort) et plan d'action par page. Montre-moi ce PLAN avant de coder.

#### Phase 1 — Socle PERFORMANCE adaptatif (à faire EN PREMIER, c'est global)
- Étendre usePerformanceMode : exposer un `tier: 'full' | 'reduced' | 'minimal'`. `isLowPowerDevice` (deviceMemory ≤ 3, hardwareConcurrency ≤ 2) DOIT déclencher au moins 'reduced' (bug actuel : shouldReduceMotion ignore isLowPowerDevice).
- Ajouter un garde FPS runtime : mesurer le FPS réel ; si < ~40 fps soutenu, rétrograder le tier automatiquement (HP qui rame → bascule en 'reduced'/'minimal' tout seul).
- Brancher TOUS les FX lourds sur le tier : 'full' = expérience complète ; 'reduced' = moins de particules, moins de calques, parallax/tilt désactivés, blurs réduits ; 'minimal' = fonds statiques + poster pour vidéos/Remotion, animations coupées.
- IntersectionObserver : mettre en pause toute animation hors écran.
- Confirmer que three/Remotion/pixi/Lottie sont en `dynamic(import, { ssr:false })` + Suspense, et qu'aucun ne charge en eager.

#### Phase 2 — Page par page
Pour chaque route, dans l'ordre du PLAN :
- Clarifier le hero (promesse en 10 s), remettre les sections dans un ordre logique, structurer pages ET sous-pages (fil d'ariane si pertinent).
- Mieux placer et légender chaque schéma animé (une phrase « ce que ça fait pour vous »).
- Appliquer la double-lecture : niveau 1 = une phrase bénéfice ; niveau 2 = volet technique déroulant.
- Soigner mobile ET desktop (mobile-first, sm/lg/xl).
- Garder les schémas, les améliorer ; réutiliser les composants existants.
Fais un commit atomique par page.

#### Phase 3 — Cohérence globale
Header/Footer, espacements (.section-shell*, tokens), transitions de page, nav entre sous-pages, métadonnées et OG par page.

#### Phase 4 — Vérification
`pnpm build` + `pnpm lint` + `pnpm exec playwright test`. Vérif responsive 360/768/1280/1920. Rapport perf avant/après (composants désormais gated par tier, comportement sur appareil faible simulé).

### FORMAT DE SORTIE
- D'abord /audit/PLAN.md (tu me le montres).
- Puis exécution par phases.
- À la fin : résumé par page (ce qui a changé, schémas touchés et pourquoi, gains perf attendus). Court et factuel.

Commence par la Phase 0 maintenant.
