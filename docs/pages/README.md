# Briefs par page

Un fichier par route. Il donne la précision **page-spécifique** que les règles génériques
(`../anatomie-page.md`, `../contenu-copy.md`, `CLAUDE.md`) ne donnent pas : le rôle unique de
la page, ce qu'elle ne fait PAS, sa mécanique signature, son comportement sur iPhone.

C'est le premier fichier lu par la commande `/refonte-page <route>`.

> [!NOTE]
> Les quatre briefs existants datent de **juin 2026**. Ils restent la référence de leur page,
> mais citent des composants depuis supprimés (`TransformationCard`, `WebGalaxyShowcase`),
> une page jamais créée (`/realisations`) et d'anciens chemins de doc. Un bandeau le rappelle
> en tête de chaque fichier.

## Existants

| Fichier | Route | État |
|---|---|---|
| [`sites-web.md`](sites-web.md) | `/sites-web` | complet (1 300 lignes, le plus détaillé) |
| [`rag.md`](rag.md) | `/rag` | complet |
| [`automatisation.md`](automatisation.md) | `/automatisation` | complet |
| [`automatisation-secteurs.md`](automatisation-secteurs.md) | `/automatisation/[secteur]` | complet, les 5 secteurs |

## Manquants

`/` · `/services` · `/applications` · `/applications/[secteur]` · `/agents-ia` ·
`/faq` · `/glossaire` · `/articles` · `/a-propos` · `/contact`

À écrire au moment de refondre la page concernée, pas avant : un brief non tenu à jour
est pire que pas de brief.

## Créer un brief

```bash
cp docs/pages/_TEMPLATE.md docs/pages/ma-route.md
```

Le template ([`_TEMPLATE.md`](_TEMPLATE.md)) couvre : rôle unique, promesse et double lecture,
mécanique signature, sections et composants, desktop/iPhone, recherche et inspiration, copy,
contraintes techniques, definition of done, et ce qu'il ne faut pas toucher.
