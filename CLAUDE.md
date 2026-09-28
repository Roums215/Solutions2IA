# CLAUDE.md · Solutions 2IA

Site vitrine multi-pages premium (Next.js 15) : sites web, applications métier, agents IA,
mémoire d'entreprise (RAG), automatisation. Développeur indépendant français, solo.

> **Documentation complète dans `docs/`.** Avant de coder une page, lire
> **[`docs/anatomie-page.md`](docs/anatomie-page.md)** : c'est le document de référence.

| Besoin | Document |
|---|---|
| Comment une page est faite (contenu + design) | `docs/anatomie-page.md` |
| Tokens, presets, composants, props | `docs/design-system.md` |
| Ton, glossaire, règles de copy | `docs/contenu-copy.md` |
| Metadata, JSON-LD, sitemap, llms.txt, GSC | `docs/seo-geo.md` |
| Tiers de perf, animations, LCP | `docs/performance.md` |
| Stack réelle, arborescence, env, déploiement | `docs/architecture.md` |
| Ports et processus du projet, voisins du poste | `docs/ports-et-processus.md` |
| Fiche d'une page (état réel : contenu, CTA, schémas, design) | `docs/pages/` |
| Chantier en cours (ce qui est en train de changer) | `docs/chantiers/` |
| Dernier audit complet | `docs/audits/` (dont l'audit de conversion page par page) |

---

## Stack réelle

**Core** : Next.js 15 App Router · React 19 · TS strict · Tailwind v4 (`@theme` dans `globals.css`) · pnpm
**Animation** : `motion` v12 uniquement (88 fichiers)
**UI** : `radix-ui` + `cva` + `tailwind-merge` · `lucide-react` · `sonner`
**Email** : `resend` (formulaire de contact + rapport SEO)
**Mesure** : `@vercel/analytics` · `@vercel/speed-insights`
**Vidéo hors site** : `remotion` + `chroma-js` (dossier `remotion/` seulement)
**Tests** : Playwright

> ⚠️ **Ni GSAP, ni Three.js / R3F, ni tsparticles, ni Lottie, ni Pixi, ni culori.**
> Ces libs ont longtemps été annoncées dans la doc, elles n'ont jamais été installées.
> Toutes les « scènes 3D » (`components/scenes/**`) sont du **SVG + CSS + motion**.
> Ne pas en ajouter sans décision explicite : ça pèse lourd et le site tient son LCP sans.

---

## Routes, presets et scènes

| Route | Preset | Scène de hero | Note |
|---|---|---|---|
| `/` | `home` | `SolutionsFilm` (film hero) | Server Component, sections en `dynamic()` |
| `/services` | `services` | — | `OfferCatalog` JSON-LD |
| `/sites-web` | `web` | `WebHeroScene` | refonte 09/2026, hero clair |
| `/applications` | `apps` | `AppHeroScene` | refonte 09/2026 |
| `/applications/[secteur]` | `apps` | — | 6 verticaux |
| `/agents-ia` | `ai` | `AiHeroScene` | V3 09/2026 : iPhone + dossier actif, 6 moments |
| `/automatisation` | `flow` | `AutoHeroScene` | V3 09/2026 : film de 4 automatisations |
| `/automatisation/[secteur]` | `automation` | — | 5 secteurs, ancien design |
| `/rag` | `automation` | — | mémoire d'entreprise |
| `/faq` | `services` | — | 30 Q/R, `FAQPage` |
| `/glossaire` | `services` | — | 15 termes, `DefinedTermSet` |
| `/articles` + `/articles/[slug]` | `services` | — | 7 articles |
| `/a-propos` | `about` | — | |
| `/contact` | `contact` | — | formulaire → Resend |
| `/cgv` `/confidentialite` `/cookies` `/mentions-legales` | — | — | `LegalPage` mutualisé |
| `/felicationbebelove` | — | — | privée, `noindex`, hors nav et sitemap |

`/studio-visuel` a été **supprimée** (juin 2026) : redirection 308 vers `/services`
dans `next.config.ts`. Le preset `studio` existe encore mais n'est plus utilisé.

---

## Arborescence

```
app/<route>/{page.tsx (Server + metadata + JSON-LD), <Nom>Page.tsx (Client)}
app/api/{contact,seo-report}/route.ts
components/
  ui/       Button · SectionHeading · SpotlightCard · ToolBadge · TermeExplique + primitives radix
  layout/   Header · Footer · headerSurface (useLightHeaderZone : en-tête lisible sur section claire)
  shared/   AppShell · PageHero · PageAtmosphere · CTABand (prop `compact` opt-in)
            SectionFluidBackdrop (nappes et trajectoires SVG par section, une variante par page)
            mockup/AppMockup (maquettes d'application sur surface papier)
            PageTransition · LoadingScreen · SectionParticles
            PremiumFlowPanel · RelatedServices
  hero/     HeroSection · HeroFilm (coupe du film selon largeur et tier) · HeroVisual (plus monté)
  film/     SolutionsFilm · film-runtime · film-core · film-chapters-a/b · filmFonts
            (film hero 1920×1080 mis à l'échelle, horloge rAF propre, pas de motion ;
             source : design_handoff_hero_film/README.md)
  scenes/   ai · web · mobile · automation   (anciennes scènes SVG, débranchées des pages refondues)
  sections/ home · sites-web · applications · agents-ia · automation · rag
            chaque page refondue a son hero dans sections/<page>/ :
            <X>HeroSection (texte LCP en CSS) · <X>HeroScene (≥ md, plan fixe mis à l'échelle)
            · <X>HeroSceneMobile (narration verticale) · <x>HeroScene{Data,Parts}
  legal/    LegalPage        seo/ JsonLd
lib/
  seo/      constants.ts (source de vérité) · schema.ts (11 builders) · report/
  content/  faqData · glossaire · glossairePage · navigation · articles/
  animation/ usePerformanceMode · fpsGuard · inViewPause · parallaxField · variants
remotion/   index.ts · Root.tsx · compositions/   (hors site)
docs/       toute la documentation
```

---

## Pattern de page

1. `page.tsx` **Server Component** : `metadata` + `<JsonLd>` + rendu du composant client. Jamais `"use client"`.
2. `<Nom>Page.tsx` : le rendu. **Client Component** sur les pages historiques ; sur les pages refondues
   (`/sites-web`, `/applications`, `/agents-ia`, `/automatisation`), Server Component qui charge ses
   sections client en `dynamic()` (seul le hero est dans le bundle initial).
3. **Fond** : `<PageAtmosphere preset="X" />` (décor **statique**, aucun suivi de souris).
4. **Corps** : `<PageHero>` → sections (`SectionHeading` + `SpotlightCard`) → `<CTABand>`.
5. **Ordre du contenu, imposé** : c'est quoi · ce que ça vous apporte · comment ça marche · pour qui · l'étape suivante. **Un seul CTA par page.**

Détail complet et exemples : `docs/anatomie-page.md`.

### Scènes de hero « film » (pages refondues en septembre 2026)

`/sites-web`, `/applications`, `/agents-ia` et `/automatisation` n'utilisent plus `PageHero` :
leur hero est un `<X>HeroSection` qui peint titre et sous-titre en `.hero-enter` (LCP) et monte
la scène en `dynamic(..., { ssr: false })` seulement dès `md`. Règles communes :

- plan fixe (ex. 860 × 560) mis à l'échelle en CSS pur `[scale:tan(atan2(100cqw,860px))]` dans un `@container` ;
- horloge à phases en `setTimeout` (pas de rAF maison), `PauseOffscreen`, pause au clic et onglet masqué ;
- `transform` et `opacity` seulement ; reduced = transitions simples ; minimal et reduced-motion = image finale fixe ;
- version téléphone propre (`<X>HeroSceneMobile`), jamais la scène ordinateur réduite ;
- données d'exemple signalées (« Maquette · données d'exemple », « Exemple de workflow »), aucune métrique inventée ;
- attribut `data-ai-phase` / `data-auto-phase` sur le plan : les scripts de capture s'y synchronisent.

Captures et vidéos de QA : `review/<page>/` avec leur script `.capture.cjs`, **hors dépôt** (`.gitignore`).

---

## Design tokens

```
Fonds     bg-bg-{primary,secondary,tertiary,card,card-hover}
Texte     text-text-{primary,secondary,tertiary} · text-accent-light
Bordures  border-border-{subtle,medium,accent}
Accents   bg-accent-{primary,light,dark,glow,glow-strong} · bg-cyan{,-glow}
Effets    .text-gradient[-strong] · .glow-line · .bg-grid · .bg-radial-top
          .card-shine · .surface-card · .glass-card (+ .glass-light) · .metric-tile · .section-intro-panel
Shells    .section-shell · .section-shell-tight · .section-shell-compact
Largeurs  .section-container · .section-container-narrow · .section-container-reading
          · .section-container-wide (hero de l'accueil seulement)
États     text-success · text-warning · text-danger · bg-{success,warning,danger}/15 (jamais green-400 / amber-400 / red-400 en dur)
Papier    bg-paper{,-2,-3} · text-ink{,-2,-3} · border-paper-line · text-{success,warning,danger}-ink
          (surface claire des maquettes d'application, ex. sectorDashboards)
Film      bg-film-bg · --color-film-{blue,cyan,ink,glow} · .film-cta (CTA « Parler de mon besoin » du hero)
```

Une couleur en dur est un écart, sauf : `SpotlightCard glow="r,g,b"`,
`PremiumFlowPanel accent="r, g, b"`, les couleurs de marques tierces (`brandLogos.tsx`),
`app/icon.tsx` / `apple-icon.tsx` (rendu `next/og`, pas de variables CSS), et les modules du film
hero `components/film/*` (palette interne figée du handoff, rendu en px du plan 1920×1080).

---

## Règles code

- `"use client"` seulement si nécessaire : `page.tsx` = Server, `<Nom>Page.tsx` = Client
- Mobile-first (`sm: lg: xl:`) · `next/link` en interne · alias `@/`, jamais `../../..`
- Pas de `<img>` brut : `next/image`
- Séparer données et rendu : le contenu d'une grosse section va dans un `xxxData.ts` voisin
- `prefers-reduced-motion` géré globalement via le tier de performance
- Vidéos : `<video preload="metadata" poster>` ou `<Player>` Remotion en lazy

## Règles visuelles

- Tout en CSS + SVG + React + motion. Pas d'images de décor.
- Halos de fond en `blur-[80-120px]` · panneaux flottants `y:[0,-6,0]` sur 5 à 9 s
- Connexions SVG animées via `pathLength`
- Ressorts plutôt que durées fixes pour les interactions
- **Toujours `transform` / `opacity`**, jamais `width` / `height` / `top` / `left`
- Préférer `useMotionValue` / `useTransform` (0 re-render) à `useState` pour la souris

## Performance (priorité absolue)

- Trois tiers automatiques : `<html data-perf="full | reduced | minimal">` (voir `docs/performance.md`)
- Lazy : `dynamic()` pour les scènes et les méga-sections · `Suspense` partout
- `optimizePackageImports` configuré pour `motion`, `lucide-react`, `radix-ui`, `@vercel/*`
- **Ne pas casser le LCP** : `PageHero` peint son `h1` en CSS pur (`.hero-enter`) avant
  l'hydratation, et `PageTransition` a `initial={false}`. Y remettre un `opacity: 0` animé
  en JS fait remonter le LCP de 1,8 s à ~8 s.

---

## Règle de copy (demande explicite du client)

- **« je », jamais « nous »** : freelance solo.
- **Zéro preuve inventée** : pas de client fictif, pas de stat non sourçable.
- **Jamais de tiret cadratin « — » dans le contenu visible** (pages, metadata, titres, FAQ,
  articles, emails, `llms.txt`) : ça « fait IA ». Remplacer par deux-points, virgule,
  parenthèses, point médian « · » ou « X à Y ». *Les commentaires de code peuvent en garder.*
- **Le jargon ne reste jamais seul** : le remplacer par le mot simple, ou l'expliquer
  (`lib/content/glossaire.ts`).
- **Interdits** : « solutions innovantes », « révolutionner », « à l'ère de l'IA »,
  « libérez votre potentiel », « dans un monde où… ».

Détail : `docs/contenu-copy.md`.

---

## SEO / GEO

Toute nouvelle page doit avoir : `title` sous 60 caractères **suffixe ` · Solutions 2IA` compris**,
`description` de 150 à 160 caractères, **`alternates: { canonical: "/ma-route" }`** (sans quoi
la page hérite du canonical `/` du layout), `openGraph`, un JSON-LD via `combineSchemas`,
un seul `<h1>`, une entrée dans `app/sitemap.ts`, et au moins 2 liens internes sortants.

Domaine officiel : **`https://solutions2ia.fr`** (défini une seule fois dans
`lib/seo/constants.ts`). Le `.com` est mort : ne jamais le réintroduire.

Détail et checklist : `docs/seo-geo.md`.

---

## Signature de marque (NE PAS traiter comme du slop)

Intentionnels, à ne jamais supprimer ni signaler comme erreur :
`.text-gradient[-strong]` sur les titres · les halos flous en fond · la palette indigo/cyan
(`#6366f1` / `#22d3ee`) · `SpotlightCard` (spotlight + tilt + bordure conique).

Registre = **« marque »** (vitrine premium), pas « produit ». Un outil anti-slop doit
distinguer le bruit **non intentionnel** (doublons de particules, sections lourdes redondantes,
incohérences de tokens) de cette signature voulue.

---

## Commandes

```
pnpm dev              # port 4500 (plage du projet : 4500-4549)
pnpm build | lint
npx tsc --noEmit      # ✅ à préférer pendant le dev
pnpm exec playwright test
pnpm remotion:studio | remotion:render   # ports 4520 | 4530, fixés dans remotion.config.ts
```

> ⚠️ **Ports** : le projet n'ouvre rien hors de `4500`–`4549`. `:4000`–`:4299` appartient à
> Studio Video, `:3000`–`:3202` à AgentAI et BuildingPartnersOS. Port pris par un autre :
> décaler le nôtre (`pnpm exec next dev -p 4510`), jamais tuer le voisin.
> Détail : `docs/ports-et-processus.md`.

> ⚠️ **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne** : le build écrase
> le `.next` du serveur de dev et casse le site en local.

---

## Façon de travailler

- Lire l'existant avant de modifier. Réutiliser `SpotlightCard`, `PageHero`, `PageAtmosphere`
  plutôt que recréer.
- Chaque page garde sa personnalité visuelle (son preset) dans l'identité globale.
- Le **logo** (`LoadingScreen`, `Header`) : jamais touché sans demande explicite.
- Les **schémas pédagogiques animés** : jamais supprimés sèchement, refaits en mieux si besoin.
- Plan bref avant grosse modif → exécution directe → résumé court.
- `npx tsc --noEmit` + `pnpm lint` quand c'est pertinent.

---

## Skill `frontend-design` (`.claude/skills/frontend-design/`)

**À charger avant toute modification visible** : section, hero, carte, CTA, texte affiché,
mise en page, animation. Y compris pour « améliore cette section » ou « rends ça plus accrocheur ».

Il porte trois choses :

| Fichier | Contenu |
|---|---|
| `SKILL.md` | la boucle en 12 étapes, les 4 règles de contrôle, la checklist de fin |
| `references/direction-artistique.md` | ce qui donne envie d'écrire : chiffre du visiteur, exemple concret, dosage technique, CTA unique, signature visuelle, interdits |
| `references/boucle-navigateur.md` | démarrer le site, retrouver le composant React depuis un élément affiché, les deux largeurs 1440 / 390 |

La boucle : comprendre → localiser le composant exact → **regarder la page réelle** →
proposer 2-3 variantes → **STOP, le client choisit** → diff minimal → vérifier à 1440 et
390 px → `tsc` + `lint` → `tokens-guardian` → **STOP**.

Le second STOP est la règle la plus importante : pas de refonte élargie, pas de fichier
déplacé, pas de dépendance ajoutée, pas de documentation spontanée.

Astuce vérifiée (dev uniquement) : sélectionner un élément dans DevTools puis remonter
`__reactFiber$` donne le composant qui le rend (`h1` → `HeroSection`, une carte →
`TransformationCard` → `HomeTransformationFlows`). Snippet dans `references/boucle-navigateur.md`.

---

## Agents (`.claude/agents/`)

Treize agents calibrés sur le projet réel. Chacun connaît les pièges vécus ici.

### Audit, lecture seule
| Agent | Quand |
|---|---|
| `site-auditor` | début de session, avant gros refactor : structure, presets, dérive |
| `conversion-auditor` | **noter une page sur 100** en contenu, design et conversion. Répond à « est-ce que ça ramène un client ? ». Grille dans `docs/audits/2026-09-06-conversion/METHODE.md` |
| `tokens-guardian` | avant PR : couleurs et espacements hors `@theme` |
| `performance-auditor` | avant PR ou après changement lourd : Lighthouse, bundle, anti-patterns |
| `a11y-reviewer` | avant PR : hiérarchie des titres, ARIA, focus, reduced-motion |

### Création et refonte
| Agent | Quand |
|---|---|
| `section-designer` | créer ou refondre une section (propose 2 à 3 variantes avant de coder) |
| `card-designer` | **toute carte, tuile, panneau ou grille**. Possède `SpotlightCard`, la règle de profondeur `translateZ`, et la règle sur les chiffres affichés |
| `motion-specialist` | animations, reveals, parallax du hero, flux SVG. `motion` v12 uniquement |
| `scene-3d-specialist` | **profondeur et scènes de hero en CSS 3D + SVG**. Remplace `r3f-3d-specialist` : le projet n'a ni Three.js ni WebGL |
| `component-splitter` | découper un fichier lourd sans régression |
| `copy-writer-fr` | tout texte visible. Voix « je », zéro preuve inventée, zéro tiret cadratin |

### Exploitation
| Agent | Quand |
|---|---|
| `vercel-deployer` | **mise en production**. Contrôles avant vol, build vert obligatoire, commits atomiques, push sur `main`, vérification post-déploiement dans un vrai navigateur |
| `repo-structurer` | tenir le dépôt GitHub propre : structure, `.gitignore`, hygiène de commits, CI, modèles de PR |

### Agents supprimés le 7 septembre 2026
- `r3f-3d-specialist` : annonçait `three` 0.183, R3F 9 et drei 10, **jamais installés**.
  Remplacé par `scene-3d-specialist`.
- `visual-asset-generator` : dépendait du MCP Higgsfield (en échec d'authentification) et
  contredisait la règle « tout en CSS et SVG, pas d'images de décor ».

> **Deux agents maximum par demande.** S'il en faut trois, c'est que la demande n'a pas été
> découpée. `section-designer` et `card-designer` ont accès à `chrome-devtools` : ils
> regardent la page réelle avant de proposer.

## Slash commands (`.claude/commands/`)

- `/refonte-page <route>` : pipeline complet (audit → propositions → implémentation → QA)
- `/audit-pr` : 4 auditeurs en parallèle sur les fichiers modifiés
- `/split-composant <path>` : découpe un composant lourd

## MCP (`.mcp.json`)

| MCP | Usage |
|---|---|
| `context7` | doc à jour Next 15 / React 19 / Tailwind v4 / motion v12. **Ajouter `use context7`** pour toute lib externe. |
| `magicui` | 150+ composants animés MIT compatibles motion |
| `chrome-devtools` + `playwright` | QA visuelle + Lighthouse |
| `firecrawl` | scraping de sites d'inspiration |
| `higgsfield` · `magic` · `shadcn` | configurés mais en échec d'authentification à ce jour |

Variables à exporter avant `claude` :
`CONTEXT7_API_KEY` · `HIGGSFIELD_API_KEY` · `TWENTY_FIRST_API_KEY` · `FIRECRAWL_API_KEY`
