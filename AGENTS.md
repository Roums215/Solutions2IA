# AGENTS.md · Solutions 2IA

Site vitrine multi-pages premium (Next.js 15 · React 19 · TS strict · Tailwind v4 · pnpm) :
sites web, applications métier, agents IA, mémoire d'entreprise (RAG), automatisation.

> **Ce fichier est un aiguillage. Les règles font loi dans [`CLAUDE.md`](CLAUDE.md).**
> Lis-le en entier avant de coder : stack réelle, routes et presets, pattern de page,
> design tokens, règles de copy, performance, signature de marque.

## À lire selon la tâche

| Tâche | Document |
|---|---|
| **Créer ou modifier une page** | [`docs/anatomie-page.md`](docs/anatomie-page.md) ← commencer ici |
| Couleurs, presets, composants, props | [`docs/design-system.md`](docs/design-system.md) |
| Écrire du texte, du titre, une FAQ | [`docs/contenu-copy.md`](docs/contenu-copy.md) |
| Metadata, JSON-LD, sitemap, GEO | [`docs/seo-geo.md`](docs/seo-geo.md) |
| Animation, LCP, tiers de performance | [`docs/performance.md`](docs/performance.md) |
| Stack, arborescence, env, déploiement | [`docs/architecture.md`](docs/architecture.md) |
| Brief d'une page précise | [`docs/pages/`](docs/pages/) |
| Dernier audit du site | [`docs/audits/`](docs/audits/) |

## Les cinq réflexes

1. **Lire l'existant avant de modifier.** Réutiliser `SpotlightCard`, `PageHero`,
   `PageAtmosphere`, `SectionHeading`, `CTABand` plutôt que recréer.
2. **`page.tsx` = Server (metadata + JSON-LD), `<Nom>Page.tsx` = Client (rendu).**
3. **Jamais de tiret cadratin « — » dans le texte visible.** Jamais « nous » : c'est « je ».
4. **Animer uniquement `transform` et `opacity`.** Ne pas remettre d'`opacity: 0` animé en JS
   sur le hero : ça casse le LCP.
5. **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne.** Vérifier avec
   `npx tsc --noEmit` + `pnpm lint`.
