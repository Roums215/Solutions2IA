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
| Brief d'une page précise | `docs/pages/` |
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
| `/` | `home` | `HeroVisual` | Server Component, sections en `dynamic()` |
| `/services` | `services` | — | `OfferCatalog` JSON-LD |
| `/sites-web` | `web` | `WebScene` | |
| `/applications` | `apps` | `AppScene` | |
| `/applications/[secteur]` | `apps` | — | 6 verticaux |
| `/agents-ia` | `ai` | `AIBrainScene` | la plus futuriste |
| `/automatisation` | `automation` | `AutomationScene` | |
| `/automatisation/[secteur]` | `automation` | — | 5 secteurs |
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
  layout/   Header · Footer
  shared/   AppShell · PageHero · PageAtmosphere · CTABand
            PageTransition · LoadingScreen · SectionParticles
            PremiumFlowPanel · RelatedServices
  hero/     HeroSection · HeroVisual
  scenes/   ai · web · mobile · automation   (SVG animé, pas de WebGL)
  sections/ home · sites-web · applications · agents-ia · automation · rag
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
2. `<Nom>Page.tsx` **Client Component** : le rendu.
3. **Fond** : `<PageAtmosphere preset="X" />` (décor **statique**, aucun suivi de souris).
4. **Corps** : `<PageHero>` → sections (`SectionHeading` + `SpotlightCard`) → `<CTABand>`.
5. **Ordre du contenu, imposé** : c'est quoi · ce que ça vous apporte · comment ça marche · pour qui · l'étape suivante. **Un seul CTA par page.**

Détail complet et exemples : `docs/anatomie-page.md`.

---

## Design tokens

```
Fonds     bg-bg-{primary,secondary,tertiary,card,card-hover}
Texte     text-text-{primary,secondary,tertiary} · text-accent-light
Bordures  border-border-{subtle,medium,accent}
Accents   bg-accent-{primary,light,dark,glow,glow-strong} · bg-cyan{,-glow}
Effets    .text-gradient[-strong] · .glow-line · .bg-grid · .bg-radial-top
          .card-shine · .surface-card · .metric-tile · .section-intro-panel
Shells    .section-shell · .section-shell-tight · .section-shell-compact
Largeurs  .section-container · .section-container-narrow
```

Une couleur en dur est un écart, sauf : `SpotlightCard glow="r,g,b"`,
`PremiumFlowPanel accent="r, g, b"`, les couleurs de marques tierces (`brandLogos.tsx`),
et `app/icon.tsx` / `apple-icon.tsx` (rendu `next/og`, pas de variables CSS).

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
pnpm dev              # port 4000
pnpm build | lint
npx tsc --noEmit      # ✅ à préférer pendant le dev
pnpm exec playwright test
pnpm remotion:studio | remotion:render
```

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

## Agents (`.claude/agents/`)

### Lecture seule (Haiku)
| Agent | Quand |
|---|---|
| `site-auditor` | début de session, avant gros refactor : structure, presets, dérive |
| `tokens-guardian` | avant PR : couleurs et spacings hors `@theme` |
| `performance-auditor` | avant PR ou après changement lourd : Lighthouse, bundle, anti-patterns |
| `a11y-reviewer` | avant PR : reduced-motion, ARIA, alt, hiérarchie h1-h3 |

### Création / refactor (Sonnet)
| Agent | Quand |
|---|---|
| `section-designer` | créer ou refondre une section (propose 2-3 variantes avant de coder) |
| `motion-specialist` | interactions, scroll storytelling, parallax souris |
| `r3f-3d-specialist` | scènes visuelles de hero (⚠️ nom historique : pas de Three.js dans le projet) |
| `component-splitter` | découper un fichier > 250 LOC sans régression |
| `copy-writer-fr` | hero, CTA, descriptions, metadata SEO |

### Assets (Haiku + MCP)
| Agent | Quand |
|---|---|
| `visual-asset-generator` | visuels via Higgsfield. Toujours estimer les crédits + confirmer. |

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
