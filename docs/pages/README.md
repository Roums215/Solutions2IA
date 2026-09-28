# Les pages, une par une

Une fiche par route. Elle décrit la page **telle qu'elle est en ligne** : rôle, promesse
affichée, structure section par section, schémas, cartes et surfaces, appel à l'action,
design détaillé, comportement sur téléphone, SEO, performance, état du moment.

Trois usages :

- comprendre une page sans relire son code ;
- premier fichier lu par `/refonte-page <route>` ;
- **à mettre à jour dès qu'une page change** : une fiche périmée est pire que pas de fiche.

Toutes ont été écrites le 18 septembre 2026 contre le code réel, avec les chemins et les
numéros de ligne à l'appui. `sites-web`, `applications`, `agents-ia` et `automatisation` ont été
réécrites le 29 septembre 2026 après leur refonte.

---

## Les fiches

| Fiche | Route | Rôle |
|---|---|---|
| [`accueil.md`](accueil.md) | `/` | vitrine du système, film du hero, aiguillage par profil |
| [`services.md`](services.md) | `/services` | la page pivot, elle distribue vers les cinq services |
| [`sites-web.md`](sites-web.md) | `/sites-web` | le site qui ramène et traite les demandes |
| [`applications.md`](applications.md) | `/applications` | l'application métier sur mesure |
| [`applications-secteurs.md`](applications-secteurs.md) | `/applications/[secteur]` | le gabarit commun et ses 6 secteurs |
| [`agents-ia.md`](agents-ia.md) | `/agents-ia` | l'assistant IA : une demande suivie de bout en bout, vous gardez la main |
| [`automatisation.md`](automatisation.md) | `/automatisation` | les tâches qui se font toutes seules, film de quatre automatisations |
| [`automatisation-secteurs.md`](automatisation-secteurs.md) | `/automatisation/[secteur]` | le gabarit commun et ses 5 secteurs |
| [`rag.md`](rag.md) | `/rag` | la mémoire d'entreprise, la page la plus lourde |
| [`faq.md`](faq.md) | `/faq` | les objections traitées, modèle de double lecture |
| [`glossaire.md`](glossaire.md) | `/glossaire` | le jargon traduit, fort levier pour les moteurs |
| [`articles.md`](articles.md) | `/articles` et `/articles/[slug]` | la liste et le gabarit d'article |
| [`a-propos.md`](a-propos.md) | `/a-propos` | qui construit, et pourquoi lui |
| [`contact.md`](contact.md) | `/contact` | le formulaire, seul point d'entrée des demandes |
| [`pages-legales.md`](pages-legales.md) | `/cgv` `/confidentialite` `/cookies` `/mentions-legales` | le gabarit mutualisé et ce qui distingue chaque page |

La page privée `/felicationbebelove` n'a pas de fiche : hors navigation, hors sitemap,
`noindex`, elle ne fait pas partie du site vitrine.

---

## Écrire ou mettre à jour une fiche

```bash
cp docs/pages/_TEMPLATE.md docs/pages/ma-route.md
```

Le gabarit ([`_TEMPLATE.md`](_TEMPLATE.md)) impose onze sections : ce que fait la page, la
promesse affichée, la structure dans l'ordre, les schémas, les surfaces et cartes, l'appel à
l'action, le design en détail, le téléphone, le SEO, la performance, l'état et la suite.

Deux règles d'écriture, les mêmes que pour le site : **aucun tiret cadratin**, et jamais
« nous ». Chaque affirmation se vérifie dans le code, avec son chemin de fichier.

---

## Ce qui n'est pas ici

- **Les intentions de refonte** : `../chantiers/`
- **Les constats datés et les notes sur 100** : `../audits/`
- **Les briefs de juin 2026** (intention, composants depuis supprimés) :
  `../archives/briefs-2026-06/`
- **Les règles générales** (anatomie d'une page, tokens, copy, SEO, performance) : un cran
  au-dessus, à la racine de `../`
