# Documentation Solutions 2IA

Toute la documentation du projet. Un fichier = un sujet, pas de doublon.

---

## 👉 Commencer ici

### [`anatomie-page.md`](anatomie-page.md) : comment une page fonctionne

Les deux fichiers d'une page, les trois couches de fond, l'ordre imposé du contenu,
les briques de design, la checklist SEO, et la marche à suivre pour créer une page.
**Si tu ne lis qu'un document, c'est celui-là.**

---

## Les références

| Document | Ce qu'il contient |
|---|---|
| [`design-system.md`](design-system.md) | tokens `@theme`, espacements, classes utilitaires, 9 presets, props de chaque composant, écarts connus |
| [`contenu-copy.md`](contenu-copy.md) | positionnement, six règles d'écriture, double lecture, glossaire, vocabulaire de marque, checklist avant publication |
| [`seo-geo.md`](seo-geo.md) | metadata, 11 schémas JSON-LD, checklist par page, leviers GEO, activation Search Console, rapport de score automatique |
| [`performance.md`](performance.md) | trois tiers automatiques, règles d'animation, ce qui protège le LCP, fichiers lourds à surveiller |
| [`architecture.md`](architecture.md) | stack réelle, arborescence, 35 URL, layout racine, configuration, variables d'environnement |

## Par page

[`pages/`](pages/) : un brief détaillé par route (rôle unique, promesse, mécanique signature,
sections, desktop/iPhone, copy, definition of done). Lu en premier par `/refonte-page <route>`.
Dupliquer [`pages/_TEMPLATE.md`](pages/_TEMPLATE.md) pour une nouvelle page.

## Audits

[`audits/`](audits/) : les états des lieux datés.

- [**`2026-09-06-conversion/`**](audits/2026-09-06-conversion/) : **les 14 pages notées sur 100**
  en contenu, design et conversion. Un dossier par page, grille de notation, benchmark marché,
  schémas et plan d'action. Moyenne du site : **66/100**, dont **61 en conversion**.
- [`2026-09-06-audit-site.md`](audits/2026-09-06-audit-site.md) : SEO, GEO, accessibilité,
  performance, ménage effectué.

## Archives

[`archives/`](archives/) : les documents de la refonte de juin 2026 (brief, journal, playbook
de design, audits de phase 0). **Ils ne font plus loi** : ce sont des traces de décision,
utiles pour comprendre pourquoi le site est ce qu'il est.

---

## Où vivent les règles

- **[`../CLAUDE.md`](../CLAUDE.md)** : les règles projet, destinées aux assistants de code.
  Stack réelle, routes et presets, pattern de page, tokens, copy, performance, agents et MCP.
- **[`../AGENTS.md`](../AGENTS.md)** : aiguillage court vers `CLAUDE.md` et `docs/`.
- **[`../README.md`](../README.md)** : point d'entrée humain (démarrer le projet).

## Les trois règles qui reviennent le plus

1. **Jamais de tiret cadratin « — » dans le texte visible.** Et « je », jamais « nous ».
2. **`alternates: { canonical: "/ma-route" }` sur chaque page.** Sans ça, la page hérite du
   canonical `/` du layout et se déclare comme la home.
3. **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne.** Utiliser
   `npx tsc --noEmit` + `pnpm lint`.
