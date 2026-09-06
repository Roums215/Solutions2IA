# Solutions 2IA

Site vitrine de **Solutions 2IA** : applications métier sur mesure, agents IA souverains,
mémoire d'entreprise (RAG), sites web et automatisation. Développeur indépendant français.

**En ligne** : https://solutions2ia.fr

---

## Démarrer

```bash
pnpm install
pnpm dev          # http://localhost:4000
```

| Commande | Ce qu'elle fait |
|---|---|
| `pnpm dev` | serveur de développement (port 4000) |
| `pnpm build` | build de production |
| `pnpm lint` | ESLint |
| `npx tsc --noEmit` | typecheck |
| `pnpm exec playwright test` | tests end-to-end |
| `pnpm remotion:studio` | studio Remotion (vidéo, hors site) |

> ⚠️ **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne** : le build écrase le
> `.next` du serveur de développement et casse le site en local.
> Pour vérifier une modification : `npx tsc --noEmit && pnpm lint`.

---

## La documentation

Tout est dans **[`docs/`](docs/)**. Le point d'entrée :

### 👉 [`docs/anatomie-page.md`](docs/anatomie-page.md) : comment une page est faite

C'est le document à lire en premier. Il explique les deux fichiers d'une page, les trois
couches de fond, l'ordre imposé du contenu, les briques de design et la checklist SEO.

| Sujet | Document |
|---|---|
| Couleurs, presets, composants, props | [`docs/design-system.md`](docs/design-system.md) |
| Ton, glossaire, règles d'écriture | [`docs/contenu-copy.md`](docs/contenu-copy.md) |
| Metadata, JSON-LD, sitemap, Search Console | [`docs/seo-geo.md`](docs/seo-geo.md) |
| Tiers de performance, animations, LCP | [`docs/performance.md`](docs/performance.md) |
| Stack, arborescence, variables d'environnement | [`docs/architecture.md`](docs/architecture.md) |
| Brief détaillé par page | [`docs/pages/`](docs/pages/) |
| Audits | [`docs/audits/`](docs/audits/) |

`CLAUDE.md` et `AGENTS.md` à la racine sont les règles destinées aux assistants de code.

---

## En bref

- **Next.js 15** App Router, React 19, TypeScript strict, **Tailwind v4** (tokens dans `@theme`)
- **`motion`** pour toutes les animations. Pas de WebGL : les « scènes 3D » sont du SVG animé.
- **35 URL** (34 au sitemap) : 7 pages de service, 11 pages sectorielles, 7 articles, FAQ, glossaire, 4 pages légales
- **SEO/GEO** : JSON-LD sur toutes les pages commerciales, `llms.txt`, robots ouvert aux
  crawlers IA, rapport de score automatique par email (cron Vercel)
- **Performance** : trois tiers automatiques selon l'appareil, LCP à ~1,8 s sur mobile

Déploiement : **Vercel**, branche `main`.
