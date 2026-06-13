# PLAN — Audit + refonte qualitative Solutions 2IA

## Context

Mission BRIEF_REFONTE.md : audit complet + refonte de toutes les pages (structure, lisibilité, visuel, mobile + desktop) avec **priorité absolue : performance adaptée à tous les appareils** (lag sur PC entrée de gamme HP, fluide sur Mac). Phase 0 (cartographie par 4 sous-agents lecture seule) est **terminée** — ce plan en est la synthèse.

**Réalité business (donnée par le client, prime sur tout le contenu existant)** : freelance **solo**, en **démarrage**, **zéro client** à ce jour. Le contenu actuel (« nos clients », « notre équipe », stats de résultats) sonne faux et trop « IA » — c'est la priorité de la refonte de contenu, à corriger via une **interview préalable** (Phase 0.5). Le reste du plan (socle perf, structure, mobile, a11y) est inchangé.

Garde-fous : schémas animés conservés (signature de marque), logo intact, réutiliser l'existant, build/lint/Playwright verts.

**Périmètre** : pages EXISTANTES uniquement (/, /services, /sites-web, /applications, /agents-ia, /automatisation, /a-propos, /contact, /rag, /faq, /articles, légales). **La page /studio-visuel est SUPPRIMÉE** (décision client) : retrait de la route, de la nav, du footer, du sitemap + redirect 301 → /services ; son savoir-faire motion devient un argument transversal (qualité d'exécution), pas une page. Les pages 🆕 du PLAYBOOK (/adoption, /formation, /realisations) sont HORS périmètre sauf demande explicite.

## RÈGLES DE CONTENU (non négociables — données par le client)

1. **Zéro preuve inventée** : pas de clients, résultats, témoignages ou chiffres fictifs. Pas de « nos clients », « notre équipe », « ils nous font confiance ». **« je », jamais « nous »**.
2. **On vend la méthode et une promesse concrète**, pas un palmarès. Le démarrage est une force (proximité, disponibilité, soin) mais **rien n'est affirmé sans validation du client** (tarifs, dispo, parcours → demander d'abord).
3. **Langage** (public = dirigeants de PME qui ne connaissent pas l'IA) : mots simples du quotidien, **humains, qui mettent en confiance**. Le jargon brut (RAG, pipeline, webhook, embeddings, LLM…) ne reste jamais seul dans le texte courant. Deux mécanismes pédagogiques :
   - **Tooltip pédagogique** (nouveau composant réutilisable) : un terme utile à apprendre reste visible mais souligné en pointillé → au survol (desktop) / au tap (mobile), une petite bulle l'explique en une phrase de français simple. Accessible (focus clavier, aria-describedby, cible tactile ≥ 44 px). Le visiteur **apprend sans être embrouillé**.
   - **Volet « détails techniques » déroulant** pour les explications plus longues (intégrations, sécurité, API).
   - **Glossaire jargon → mot simple + définition d'une ligne** construit et appliqué partout (livrable : `/audit/GLOSSAIRE.md`, source des tooltips — un seul endroit pour toutes les définitions, ex. `lib/content/glossaire.ts`).
4. **Schémas et visuels explicatifs : on garde tout.** Les schémas animés/images qui expliquent sont conservés et développés. Si une refonte en supprime un, il est **refait en mieux** (plus clair, mieux légendé) — jamais de suppression sèche de pédagogie visuelle.
5. **Ton anti-IA** : court, une idée par bloc, du blanc plutôt que du texte. Interdits : « solutions innovantes », « révolutionner », « à l'ère de l'IA », « libérez votre potentiel », « dans un monde où… », énumérations par trois, phrases à rallonge. Doit sonner comme le client expliquant en face, pas comme une plaquette.
6. **Structure de chaque page**, dans l'ordre : c'est quoi · ce que ça vous apporte (concret) · comment ça marche (simple) · pour qui · l'étape suivante. **Un seul CTA clair par page.** Navigation et libellés de menu dans le même langage simple et guidant.

## PHASE 0.5 — Interview (AVANT toute réécriture de texte)

- Questions posées par **petits lots (5-6 max)**, regroupées par page ou thème, avec **attente des réponses** avant de réécrire la page concernée.
- Lots suivants : un lot par page au fil de la Phase 2 (juste avant de réécrire chaque page).
- **Après chaque page réécrite : montrer le nouveau texte au client et le laisser ajuster** avant de passer à la page suivante.

### ✅ Lot 1 (base) — RÉPONSES VALIDÉES (fondations de toute la réécriture)
- **Qui** : entrepreneur individuel, il code lui-même — applications, sites web connectés, dashboards, hébergement web, mémoire documentaire (RAG), automatisations (n8n), assistants IA. Toujours « je ».
- **Offre réelle (les 4 piliers du site)** : ① sites web vitrines ② automatisations entre outils ③ assistants IA sur les documents de l'entreprise ④ petites applications métier.
- **Promesses autorisées (rien d'autre)** : réponse sous 24 h · premier échange gratuit · un seul interlocuteur (celui qui comprend = celui qui construit) · petits prix de démarrage · gains de temps (qualitatif, jamais chiffré).
- **Cible** : tout dirigeant non-technique — PME (10-50 pers.), artisans/commerçants/indépendants, professions libérales et cabinets.
- **Ton** : **sobre et pro**. Calme, précis, sans effet de manche. « J'installe des outils qui travaillent pour vous. »
- **Tarifs : affichés**, grille révisée à appliquer partout (remplace la grille actuelle) :
  - Site vitrine : **~500 €** · Site vitrine premium : **1 000 – 2 500 €**
  - Site connecté / avec système : **2 500 – 5 000 €** (ou plus si sur-mesure)
  - Applications métier : **1 500 – 15 000/20 000 €** selon complexité
  - Toujours accompagnés de : « ça dépend du projet et des fonctionnalités » + devis gratuit.

### ✅ Lot 2 (projets réels) — BANQUE D'EXEMPLES VALIDÉE
Tous les exemples du site sortent de cette banque (réels) ou sont des **scénarios types clairement présentés comme tels** — jamais de vécu inventé.
- **⭐ Plateforme de rapports d'intervention** (exemple star → /applications, réutilisable home) : avant = rapports papier des techniciens + ressaisie ; après = rapports en ligne, dashboard technicien + dashboard admin (visualisation, suivi), envoi automatique du rapport au client par mail. **Livré, utilisé au quotidien.** Racontable comme vécu.
- **Flux téléphonie → CRM (JobPhoning → n8n → Axonaut)** (→ /automatisation) : MIXTE — une partie tourne réellement, une partie est un scénario type. **Interview de page obligatoire pour tracer la frontière** ; le réel raconté comme vécu, le reste comme « ce que je peux mettre en place ».
- **Site(s) web livré(s)** (→ /sites-web) : existent — détails (secteur, contexte) à collecter à l'interview de page.
- **Assistant IA / mémoire documentaire** (→ /rag, /agents-ia) : projet réel — détails à collecter à l'interview de page.
- **Autre automatisation** : existe — détails à collecter.
- **Ce site Solutions 2IA lui-même** : vitrine légitime du savoir-faire (design, animation, technique).
- **Parcours en entreprise** : projets réalisés chez **DFT (Digital Factory Telecom)** et **Ramsay Santé** — noms citables (parcours), mélange nommé/anonyme selon le projet.
- **Diversité sectorielle** : varier les exemples entre secteurs réels (maintenance/techniciens, télécoms, santé) et scénarios types pour les cibles (artisans, libéraux, commerce) — outils différents et concrets à chaque fois, jamais deux fois le même exemple sur deux pages.

## Découvertes clés de la Phase 0 (résumé des 4 audits)

### Perf (axe prioritaire)
- **`usePerformanceMode.ts:89`** : `shouldReduceMotion = prefersReducedMotion` seul — un PC low-end (deviceMemory ≤ 4 / cores ≤ 4) garde TOUTES les animations motion JS. C'est LE bug racine du lag HP. (Découplage volontaire du commit 4ecd29e pour garder les anims cartes sur iPhone — le tier system doit préserver cette intention.)
- **47 call-sites** de `usePerformanceMode()` — chacun écrit `data-perf` sur `<html>` : incompatible avec un tier mutable par FPS guard → centraliser en store singleton.
- **`MouseParticles`** : `setParticles()` par frame rAF = ~60 re-renders React/s sur toutes les pages desktop. Contributeur n°1 probable du lag.
- **Scènes** (AIBrainScene 674 LOC, WebScene…) importées **statiquement** dans les `*Page.tsx` (bundle payé même sur mobile) ; SMIL `<animateMotion>` tournent hors écran ; Web/Automation scenes sans aucun gating.
- **Code mort à HEAD** : WebGalaxyShowcase (2331 LOC), AmbientBackground, ParticleField, NeonDivider, DepthDivider ne sont plus importés. three/pixi/lottie/gsap/tsparticles purgés du package.json (commit 0549393). On les gate quand même (retour possible) mais ils ne comptent pas dans les gains.
- **`playwright.config.ts` pointe le port 3000, dev tourne sur 4000** → suite E2E inopérante localement. À corriger en premier.

### Structure/contenu
- **Stats inventées** (interdites par PLAYBOOK) : « 73 % temps économisé » ×3 (home:89, services:49, automatisation:49), « ×3 conversion », « +200 % mémorabilité », « +150 % », « +89 % », « +300 % » (studio-visuel:26-35, services:22-67). Stats tierces non sourçables (Techment 70 %, Seekr 88/95 %, WRITER 29 %) dans faqData.ts.
- **Double lecture** (Niveau 1 bénéfice / Niveau 2 technique déroulant) : présente sur /faq (details natifs ✓), /contact (FAQ ✓), /rag (wizard ✓), /sites-web (toggle ✓) — absente sur home, /services, /agents-ia (capacités), /automatisation (cas d'usage), /studio-visuel.
- **Légendes de schémas** (« une ligne : ce que ça fait pour vous ») : OK sur RagMemoryFlow, WebOpportunityFlow ; à vérifier/ajouter sur AutomationPipeline, AgentAnatomyDiagram, OneAgentManyNeedsPipeline, AppDigitizationPipeline.
- **/rag : 16 sections empilées** → lecteur perdu, à regrouper (tabs/accordéons par thème).
- **/studio-visuel : page motion design sans un seul schéma animé** (contradiction de marque).
- Nomenclature PremiumFlowPanel incohérente entre pages (Diagnostic/Prototype vs Cadrage/Design/Build/Scale).
- Navigation inter-spécialités inexistante (pas de liens croisés /sites-web ↔ /applications ↔ /agents-ia, pas de fil d'ariane).

### Mobile/responsive
- HeroSection `w-[1000px]`, PageAtmosphere `w-[34rem]` : débordements contenus par `overflow-x: clip` mais coût layout.
- ShowcaseSection `grid-cols-3` fixe → écrasé à 360 px.
- Burger Header 40×40 (< 44 px WCAG) ; Button size sm h-7.
- Schémas SVG (RagMemoryFlow, RagEnrichmentStatic, AutomationPipeline, OneAgentManyNeeds) : animations OFF sur mobile ✓ mais positionnement % à vérifier à 360 px.
- Bons exemples existants : HomeServicesConstellation (desktop hexagone `hidden lg:block` / mobile grille), ProfileCarousel & RagSectorTabs (`min-h-[44px]` + scroll-x).

### A11y/SEO
- **9 pages sans canonical ni OG** : /applications, /agents-ia, /automatisation (+/[secteur]), /rag, /cgv, /confidentialite, /cookies, /mentions-legales (fix 1 ligne/page).
- **Header dropdown desktop inaccessible clavier** (onMouseEnter seul, pas d'aria-expanded/haspopup, pas d'Escape) — violation WCAG A.
- Form /contact : pas de required/aria-required/validation, accordéon FAQ sans aria-expanded.
- Reduced-motion : PageHero OK (initial+animate, vérifié — le risque signalé est surestimé) ; le vrai pattern à risque = sections `initial="hidden"` + `whileInView` quand on coupera les anims en tier minimal → l'étape 6 du socle (disableContentMotion → staticRender) le couvre.
- Contrastes : micro-copy text-[10px] tertiary borderline (~4.2:1).

---

## PHASE 1 — Socle performance adaptatif (EN PREMIER, global)

Design validé par agent architecte. Fichiers critiques : `lib/animation/usePerformanceMode.ts`, `components/shared/AppShell.tsx`, `app/globals.css` (lignes ~669-710), `app/layout.tsx`, `components/shared/PageHero.tsx`.

### 1.0 Préliminaires
- Écrire les rapports d'audit dans `/audit/{structure,perf,mobile,a11y-seo}.md` + `/audit/PLAN.md` (synthèse de ce plan).
- **Corriger `playwright.config.ts`** : baseURL/webServer → port 4000. Vérif : `pnpm exec playwright test` vert.

### 1.1 Store singleton + tier (zéro changement de comportement)
- Réécrire `usePerformanceMode.ts` : store module-level + `useSyncExternalStore` (un seul jeu de listeners matchMedia, un seul writer `data-perf`). API rétrocompatible (47 call-sites inchangés) + nouveaux champs :
  - `tier: 'full' | 'reduced' | 'minimal'`
  - statique : reduced-motion/saveData/slow → `minimal` ; low-end/mobile/coarse → `reduced` ; sinon `full` (≥ exigence brief : low-end déclenche au moins reduced)
  - `disableContentMotion = prefersReducedMotion || tier === 'minimal'` (future cible des `staticRender`)
  - `shouldReduceMotion` reste `= prefersReducedMotion` (préserve l'intention 4ecd29e : reveals cartes actifs sur mobile/low-end)
  - `shouldHideBackgroundDecor` / `shouldDegrade` dérivés de `tier !== 'full'` (table de vérité identique en statique)
- CSS : renommer `data-perf="low"` → `"minimal"` (bloc existant) + nouveau bloc `"reduced"` (backdrop-blur lg+ off, glow-strong off, decor particles/orbs off — PAS de animation-duration:0s). Sélecteurs en listes explicites (pas de `[class*="blur-["]`).

### 1.2 FPS guard runtime
- Nouveau `lib/animation/fpsGuard.ts` (module pur) : rAF sampling fenêtres 1 s, démarrage post-LoadingScreen + 2,5 s, **calibration refresh rate** (seuil = min(40, 0.66 × refresh estimé) — évite faux positif écrans 30 Hz), fenêtres invalidées si document.hidden/throttle, 3 fenêtres consécutives sous le seuil → downgrade d'un cran, cooldown 2 s, **ratchet** (jamais d'upgrade en session), persistance `sessionStorage("s2ia-fps-tier")`, actif en production seulement (+ `?fpsguard=1` pour le dev).
- Wiring dans AppShell (`startAllowed = !isLoading`), idempotent (StrictMode).
- **Script inline anti-flash** dans `app/layout.tsx` (head) : recalcule le tier statique + lit sessionStorage → pose `data-perf` avant le premier paint. Pas de risque hydration (React ne diffe pas data-perf sur html).

### 1.3 Pause hors écran
- Nouveau `lib/animation/inViewPause.tsx` : `<PauseOffscreen margin="240px">` + `useInViewPause()` via `useInView` de motion/react (pattern : `animate={paused ? undefined : LOOP}` — motion gèle la valeur, pas de reset visuel). SMIL : conditionner le rendu des nœuds (insensibles au CSS).
- Intégrer : SectionParticles, les 5 scènes, PremiumFlowPanel.

### 1.4 Branchement des composants au tier (3 commits)
| Composant | full | reduced | minimal |
|---|---|---|---|
| FluidMouseField | tout | `null` | `null` |
| PageAtmosphere | presets riches | branche intermédiaire (2 orbs + grille statique, code existant mort à ressusciter) | bg-radial-top seul |
| MouseParticles | monté (+ fix setParticles/frame) | non monté | non monté |
| SectionParticles | counts actuels + pause IO | count ≤ 4, styles sans box-shadow | `null` |
| HeroVisual / HeroSection | parallax + oscillations | monté, parallax off, boucles off, reveals gardés | poster statique |
| Scènes (5) | tout | `staticMode` généralisé (`tier !== 'full'`), SMIL non rendus, PauseOffscreen | non montées → poster |
| Schémas SVG sections | actuel | reveals whileInView gardés, boucles infinies off (`loops = tier === 'full'`) | `staticRender` état final lisible |
| SpotlightCard | spotlight + tilt | tilt off, spotlight gardé | statique (hover CSS) |
| ParallaxField | actif | `enabled = false` | idem |

### 1.5 Scènes en dynamic + Suspense
- `dynamic(() => import(...), { ssr: false, loading: () => <ScenePoster/> })` dans les 5 `*Page.tsx` + HeroVisual dans HeroSection. Vérif : first-load JS des routes baisse ; chunk scène jamais requêté en mobile émulé.

### 1.6 Migration staticRender
- `staticRender = !mounted || shouldReduceMotion` → `!mounted || disableContentMotion` (~25 fichiers sections, conserver les `|| isMobile` délibérés). Garantit l'exigence a11y : reduced-motion/minimal = état final statique LISIBLE.

### Risques surveillés
Hydration (tier='full' en SSR, branchements markup derrière `mounted`) · double-fallback reduced-motion (tester tier d'abord) · header verre lisible sans backdrop-blur · ne PAS inclure mobile dans disableContentMotion (régression iPhone 4ecd29e).

---

## PHASE 2 — Page par page (1 commit atomique/page)

**Boucle par page** : ① interview lot 5-6 questions max sur la page → ② réécriture (règles de contenu : « je », zéro jargon visible, structure c'est quoi → apporte → comment → pour qui → étape suivante, 1 CTA) + structure/schémas/mobile → ③ montrer le nouveau texte au client → ④ ajustements → ⑤ commit.

Ordre (impact × trafic × effort). Pour chaque page aussi : hero 10 s, schémas re-légendés (1 ligne bénéfice, français simple), double lecture (Niveau 1 simple + volet « détails techniques » `<details>` — seul endroit où le jargon est autorisé, défini en une ligne), toutes stats inventées et tout « nous » supprimés, mobile 360 px.

0a. **Composant `TermeExplique` (tooltip pédagogique)** + `lib/content/glossaire.ts` (terme → définition une ligne) — construit AVANT les réécritures de pages, car toutes l'utilisent. Souligné pointillé, bulle au hover/tap/focus, aria-describedby, cible ≥ 44 px, fermeture Escape/tap extérieur. Réutilise les tokens existants (surface-card, border-accent).
0b. **Suppression `/studio-visuel`** — retirer app/studio-visuel/, entrées nav (lib/content/navigation.ts), footer, sitemap.ts, schémas SEO ; redirect 301 `/studio-visuel` → `/services` (next.config) ; vérifier zéro lien interne restant (grep). **Ses contenus pédagogiques/visuels utiles ne disparaissent pas** : les arguments qualité visuelle/motion et le meilleur de ses démos sont refondus en mieux dans /services ou /sites-web. Build + Playwright verts.
1. **`/` Home** — réécriture complète au « je », ton sobre et pro ; supprimer les 4 stats inventées (73 %, ×3, 98/100…) et toute preuve fictive ; exemple star (plateforme rapports d'intervention) en preuve concrète ; structure c'est quoi → apporte → comment → pour qui → étape suivante ; un seul CTA ; vérifier h1 unique.
2. **`/automatisation`** (priorité PLAYBOOK) — interview de page : frontière exacte réel/scénario du flux téléphonie → CRM ; raconter le réel comme vécu, le reste comme « ce que je peux mettre en place » ; légender le schéma en français simple ; jargon (webhook, n8n, API) → volet détails techniques ; supprimer « 73 % ».
3. **`/applications`** — l'exemple star (rapports d'intervention) devient le fil rouge de la page ; légender AppDigitizationPipeline ; tooltips hover → double lecture accessible (tactile/clavier) ; exemples sectoriels variés (interview si besoin).
4. **`/rag`** — le mot « RAG » disparaît du texte visible (→ « mémoire d'entreprise » ou équivalent validé) ; interview : détails de l'assistant documentaire réel ; regrouper les 16 sections en 4-5 thèmes ; vérifier débordement mobile des schémas à 360 px.
5. **`/agents-ia`** — vocabulaire visible simplifié (« agent IA » → formulation à valider) ; légender AgentAnatomyDiagram + OneAgentManyNeedsPipeline ; double lecture sur les 6 capacités.
6. **`/services`** — réécriture « je » autour des 4 piliers réels (sites, automatisations, assistants documentaires, petites apps) ; 6 services actuels → recentrage sur l'offre validée ; stats inventées out ; micro-schéma de liaison (grammaire nœuds/flux existante) ; nomenclature PremiumFlowPanel harmonisée ; grille tarifaire révisée.
7. **`/sites-web`** — la meilleure structurellement ; passage au « je » + simplification langage ; interview : sites réellement livrés ; vérifier légendes WebOpportunitySources/WebFoundations ; tarifs révisés (500 € / 1 000-2 500 € / 2 500-5 000 €+).
8. **`/a-propos`** — réécriture la plus sensible (entrepreneur individuel, parcours DFT + Ramsay Santé, démarrage assumé comme force) — interview de page obligatoire ; rien d'inventé.
9. **`/contact`** — form : required + aria-required + aria-invalid + validation légère ; aria-expanded accordéon FAQ ; FAQ et options « type de projet » en langage simple, grille tarifaire révisée.
10. **`/faq`, `/articles`, légales** — FAQ : purge du jargon visible + stats tierces non sourcées + « nous » → « je » + tarifs révisés ; articles : correction « nous » → « je » minimale ; légales : corrections transverses Phase 3 seulement.

## PHASE 3 — Cohérence globale
- **Metadata** : canonical + OG sur les 9 pages manquantes (applications, agents-ia, automatisation +[secteur], rag, 4 légales) ; metadata réécrites en langage simple « je ».
- **Header** : dropdown accessible clavier (focus, aria-expanded/haspopup, Escape) ; burger 44×44 ; entrée studio-visuel retirée.
- **Navigation** : liens croisés entre pages spécialités (bloc « services liés » léger) ; fil d'ariane sur les sous-pages (/automatisation/[secteur], /articles/[slug]).
- **Glossaire** : passe finale de cohérence — le même mot simple pour le même concept sur tout le site (`/audit/GLOSSAIRE.md` appliqué).
- **Espacements** : vérif .section-shell* homogènes ; transitions de page.
- **Contrastes** : micro-copy informative tertiary → text-secondary ou taille ≥ 12px (labels décoratifs inchangés).

## PHASE 4 — Vérification finale
- `pnpm build` + `pnpm lint` + `pnpm exec playwright test` verts.
- Responsive CDP : screenshots 360/768/1280/1920 sur les 9 routes principales — aucun débordement horizontal (`scrollWidth ≤ innerWidth`), sections lisibles.
- **Perf avant/après** : CDP CPU throttling ×6 sur /, /agents-ia, /sites-web — vérifier le downgrade auto vers reduced (~6 s), data-perf correct, trace main-thread des boucles ≈ 0 hors écran ; comparer first-load JS par route avant/après (sortie build).
- Reduced-motion émulé : chaque schéma = état final statique lisible (pas de section vide).
- Rapport final par page : ce qui a changé, schémas touchés et pourquoi, gains perf.

## Vérification continue (chaque commit)
`pnpm lint` + `npx tsc --noEmit` systématiques ; build + Playwright aux jalons (fin 1.1, 1.4, 1.5, puis chaque page Phase 2) ; screenshots CDP 3 tiers (forçage via sessionStorage) sur la page touchée.

## Hors périmètre (sauf demande)
Création /adoption, /formation, /realisations (PLAYBOOK roadmap) · vidéo pipeline automatisation · suppression du code mort (WebGalaxyShowcase & co. gardés et gatés) · refonte du contenu des articles SEO.
