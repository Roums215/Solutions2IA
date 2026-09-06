# Architecture

> Ce qui est **réellement** installé et utilisé, vérifié le 6 septembre 2026.
> Pour comprendre une page, lire d'abord [`anatomie-page.md`](./anatomie-page.md).

---

## 1. Stack réelle

| Domaine | Ce qui est utilisé | Où |
|---|---|---|
| Framework | **Next.js 15** App Router, React 19, TypeScript strict | tout le projet |
| Styles | **Tailwind v4** (tokens dans `@theme`, pas de `tailwind.config`) | `app/globals.css` |
| Animation | **`motion` v12** (ex Framer Motion) | 88 fichiers |
| UI primitives | **`radix-ui`** + `class-variance-authority` + `tailwind-merge` | `components/ui/` |
| Icônes | `lucide-react` (7 fichiers) + SVG inline partout ailleurs | — |
| Notifications | `sonner` (+ `next-themes` en dépendance de `sonner`) | `components/ui/sonner.tsx` |
| Email | **`resend`** | `app/api/contact`, `lib/seo/report/email.ts` |
| Mesure | `@vercel/analytics`, `@vercel/speed-insights` | `app/layout.tsx` |
| Vidéo programmatique | **`remotion`** (+ 9 paquets `@remotion/*`), `chroma-js` | `remotion/` uniquement |
| Tests | **Playwright** | `tests/` |
| Gestionnaire | **pnpm** | — |

### Ce qui n'est PAS dans le projet

Les docs antérieures annonçaient une stack 3D et FX qui **n'a jamais été installée ni utilisée** :
`gsap`, `three`, `@react-three/fiber`, `@react-three/drei`, `@tsparticles/react`, `lottie-web`, `pixi.js`, `culori`. Zéro import, zéro dépendance.

**Toutes les « scènes 3D » du site sont en réalité du SVG + CSS + `motion`.** C'est un choix : zéro WebGL, zéro téléchargement de moteur 3D, dégradation propre sur mobile. Les fichiers `components/scenes/**` s'appellent « scènes » par analogie, pas par technologie.

`remotion` (10 paquets) ne sert qu'à `remotion/compositions/HeroComposition.tsx`, une composition vidéo hors site : rien de Remotion n'est chargé par une page.

---

## 2. Arborescence

```
app/                              5 200 LOC · 44 fichiers
├── layout.tsx                    metadata racine, JSON-LD global, script perf anti-flash
├── page.tsx                      home (Server Component + sections en dynamic)
├── globals.css                   @theme + toutes les classes utilitaires + tiers perf
├── sitemap.ts robots.ts manifest.ts
├── icon.tsx apple-icon.tsx opengraph-image.tsx twitter-image.tsx
├── <route>/
│   ├── page.tsx                  Server : metadata + JSON-LD
│   └── <Nom>Page.tsx             Client : le rendu
├── applications/[secteur]/       6 verticaux (santé, retail, industrie, services-pro, logistique, immobilier)
├── automatisation/[secteur]/     5 secteurs (immobilier, cabinet-comptable, btp, restauration, formation)
├── articles/[slug]/              7 articles + ArticleLayout
└── api/
    ├── contact/route.ts          formulaire → Resend
    └── seo-report/route.ts       score SEO hebdo/mensuel (cron Vercel)

components/                      21 200 LOC · 105 fichiers
├── layout/       Header · Footer
├── shared/       AppShell · PageHero · PageAtmosphere · CTABand
│                 PageTransition · LoadingScreen · SectionParticles
│                 PremiumFlowPanel · RelatedServices (+ data)
├── ui/           Button · SectionHeading · SpotlightCard · ToolBadge · TermeExplique
│                 + primitives radix (accordion, dialog, tabs, sheet… )
├── hero/         HeroSection · HeroVisual (parallax 3D CSS)
├── scenes/       ai · web · mobile · automation  (visuels de hero, SVG animé)
├── sections/     un dossier par page : home/ sites-web/ applications/ agents-ia/
│                 automation/ rag/  (composant + fichier de données séparés)
├── legal/        LegalPage (mutualisé par les 4 pages légales)
└── seo/          JsonLd

lib/                              3 200 LOC · 19 fichiers
├── seo/          constants.ts (source de vérité) · schema.ts (11 builders) · report/
├── content/      faqData · glossaire · glossairePage · navigation · articles/
├── animation/    usePerformanceMode · fpsGuard · inViewPause · parallaxField · variants
└── utils.ts + utils/cn.ts

remotion/                          144 LOC · hors site (studio + rendu MP4)
tests/                              34 LOC · Playwright
docs/                              cette documentation
```

### Conventions

| Type | Convention |
|---|---|
| Composants | `PascalCase.tsx` |
| Fichiers de données | `camelCaseData.ts` ou `.tsx` si JSX (icônes) |
| Hooks / utilitaires | `camelCase.ts` |
| Classes CSS | `kebab-case` |
| Tokens | `--color-{kebab}` |
| Import interne | alias `@/` (jamais de `../../..`) |

**Séparation données / rendu** : les grosses sections sortent leur contenu dans un fichier
`xxxData.ts` voisin (`sectorsData.tsx`, `homeServicesData.ts`, `ragUsagesData.ts`…).
C'est ce qui permet de réécrire la copy sans toucher au composant.

---

## 3. Les routes (20 fichiers `page.tsx` → 35 URL, dont 34 dans le sitemap)

| Route | Type | Preset | Visuel de hero |
|---|---|---|---|
| `/` | statique | `home` | `HeroVisual` |
| `/services` | statique | `services` | — |
| `/sites-web` | statique | `web` | `WebScene` |
| `/applications` | statique | `apps` | `AppScene` |
| `/applications/[secteur]` | 6 pages générées | `apps` | — |
| `/agents-ia` | statique | `ai` | `AIBrainScene` |
| `/automatisation` | statique | `automation` | `AutomationScene` |
| `/automatisation/[secteur]` | 5 pages générées | `automation` | — |
| `/rag` | statique | `automation` | — |
| `/faq` | statique | `services` | — |
| `/glossaire` | statique | `services` | — |
| `/articles` | statique | `services` | — |
| `/articles/[slug]` | 7 pages générées | `services` | — |
| `/a-propos` | statique | `about` | — |
| `/contact` | statique | `contact` | — |
| `/cgv` `/confidentialite` `/cookies` `/mentions-legales` | statique | *(aucun)* | — |
| `/felicationbebelove` | privée, `noindex`, hors nav et hors sitemap | *(aucun)* | — |
| `/studio-visuel` | **supprimée** : redirection 308 vers `/services` (`next.config.ts`) | — | — |

---

## 4. Le layout racine

`app/layout.tsx` fait quatre choses, dans l'ordre :

1. **`metadata`** : titre par défaut + `template: "%s · Solutions 2IA"`, description, mots-clés, OG, Twitter, robots, manifest, vérification Google (via `GOOGLE_SITE_VERIFICATION`).
2. **Script inline anti-flash** : calcule le tier de performance et pose `<html data-perf="…">` **avant le premier paint**. Les seuils doivent rester synchronisés avec `lib/animation/usePerformanceMode.ts`.
3. **JSON-LD racine** : `Organization` + `ProfessionalService` + `WebSite`, fusionnés en un `@graph`.
4. **`AppShell`** : LoadingScreen, Header, PageTransition, Footer, Toaster.

> ⚠️ `alternates: { canonical: "/" }` est déclaré au niveau du layout. Next l'hérite vers toute page qui n'en redéclare pas : **une page sans son propre `canonical` se déclare comme la home**.

---

## 5. Configuration

### `next.config.ts`
- `images` : AVIF + WebP, tailles d'appareil et d'image fixées
- `compiler.removeConsole` sauf `error` / `warn`
- `experimental.optimizePackageImports` : `motion`, `lucide-react`, `radix-ui`, `@vercel/*`
- `redirects()` : `/studio-visuel` → `/services` (308)
- `headers()` : cache immuable un an sur `/_next/static`, 30 jours sur `/branding`, `X-Content-Type-Options` + `Referrer-Policy` partout

### `vercel.json`
Deux crons : rapport SEO hebdomadaire (lundi 8 h UTC) et mensuel (1er du mois 8 h UTC).

### Commandes

```bash
pnpm dev              # serveur de dev sur le port 4000
pnpm build            # build de production
pnpm lint             # ESLint
npx tsc --noEmit      # typecheck (à préférer au build en cours de dev)
pnpm exec playwright test
pnpm remotion:studio  # studio Remotion (hors site)
pnpm remotion:render  # rendu MP4 de la composition Hero
```

> ⚠️ **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne** : le build écrase le `.next` du serveur de dev et casse le site en local. Pour vérifier, `npx tsc --noEmit` + `pnpm lint`.

---

## 6. Exploitation

### Variables d'environnement (Vercel, scope Production)

| Variable | Rôle | Requis |
|---|---|---|
| `RESEND_API_KEY` | envoi des mails (formulaire de contact **et** rapport SEO) | **oui** |
| `CONTACT_TO_EMAIL` | destinataire du formulaire (défaut : l'adresse Gmail en dur) | recommandé |
| `CONTACT_FROM_EMAIL` | expéditeur du formulaire (défaut : `onboarding@resend.dev`) | recommandé |
| `CRON_SECRET` | protège `/api/seo-report` | recommandé |
| `SEO_REPORT_EMAIL` | destinataire du rapport SEO | pour l'email |
| `SEO_REPORT_FROM` | expéditeur vérifié sur Resend | option |
| `GSC_SERVICE_ACCOUNT_KEY` | clé JSON base64 → débloque la partie visibilité du score | option |
| `GSC_SITE_URL` | `sc-domain:solutions2ia.fr` | option |
| `GOOGLE_SITE_VERIFICATION` | code de vérification Search Console | option |
| `SEO_REPORT_WEBHOOK` | URL Slack/Discord | option |

Détail de l'activation SEO : [`seo-geo.md`](./seo-geo.md).

### Domaine

**`https://solutions2ia.fr`** est le domaine officiel, défini une seule fois dans
`lib/seo/constants.ts` (`SITE_URL`). Le `.com` est mort (pas de DNS, pas de MX) :
**ne jamais le réintroduire** dans le code, les emails ou la documentation.

---

## 7. Historique

Les documents de la refonte de juin 2026 (brief, journal, playbook de design,
audits de phase 0) sont archivés dans [`archives/`](./archives/). Ils ne font plus
loi : ce sont des traces de décision.
