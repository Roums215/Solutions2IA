# `/glossaire` · vocabulaire IA vulgarisé

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 2026-09-18 · contre le code de `app/glossaire/`,
> `lib/content/glossaire.ts` et `lib/content/glossairePage.ts`

---

## 1. Ce que fait cette page

Rendre le site compréhensible à quelqu'un qui ne connaît aucun des mots employés ailleurs
(agent IA, RAG, workflow, webhook, RGPD...) et capter les recherches de définition (« c'est
quoi un agent IA », « définition RAG »). Elle ne vend rien directement : chaque terme renvoie
vers la page service qui en fait usage. Elle ne doit pas être confondue avec les tooltips
`<TermeExplique>` disséminés sur le reste du site : ceux-ci lisent la même source
(`lib/content/glossaire.ts`) mais s'affichent au survol, sans page dédiée.

| | |
|---|---|
| Route | `/glossaire` |
| Fichiers | `app/glossaire/page.tsx` (serveur, SEO) · `app/glossaire/GlossairePage.tsx` (client, rendu) |
| Preset de décor | `services` (`app/glossaire/GlossairePage.tsx:34`) |
| Public visé | Un dirigeant qui ne connaît pas le jargon et cherche une définition avant de creuser |

---

## 2. La promesse affichée

- **Titre (h1)** : « L'IA et l'automatisation, en français simple. »
  (`app/glossaire/GlossairePage.tsx:39-43`)
- **Sous-titre** : dynamique, `` `Agent IA, RAG, workflow, API, RGPD, facture électronique :
  ${total} termes que vous croiserez dans un projet, expliqués en une phrase puis détaillés
  avec des exemples de PME. Et pour chacun, ce que ça change pour vous.` `` où `total =
  GLOSSAIRE_PAGE_ENTRIES.length` (`app/glossaire/GlossairePage.tsx:30` et `44`), soit
  actuellement **18 termes**.
- **Étiquette / badge** : « Glossaire » (`app/glossaire/GlossairePage.tsx:37`)
- **Niveau 1 (dirigeant de PME)** : une définition en une phrase, puis un paragraphe avec un
  exemple concret de PME, puis une ligne « Pour vous : » qui traduit l'intérêt.
- **Niveau 2 (visiteur averti)** : un mini-schéma de circulation en 3 étapes pour les termes de
  flux (RAG, automatisation, workflow, déclencheur, webhook, API), et un lien de maillage vers
  la page service qui approfondit.

---

## 3. Structure, dans l'ordre

Même pattern à deux colonnes que `/faq` : sommaire collant groupé par thème + contenu en
colonne unique, sans `SpotlightCard`.

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 0 | (hero) | Promesse + CTA | `PageHero` | 18 termes expliqués en français simple |
| 1 | c'est quoi | Thème « Comprendre l'IA » : Qu'est-ce que l'IA peut faire dans une PME ? | `GLOSSAIRE_THEMES[0]`, 4 termes (IA, agent IA, modèle d'IA, mémoire d'entreprise/RAG) | L'IA lit, rédige, trie ; l'agent agit ; le RAG cite ses sources |
| 2 | ce que ça apporte / comment ça marche | Thème « Relier vos outils » : Comment vos logiciels se parlent entre eux ? | `GLOSSAIRE_THEMES[1]`, 6 termes (automatisation, workflow, déclencheur, webhook, API, n8n) | La ressaisie disparaît quand les outils sont reliés |
| 3 | pour qui | Thème « Trouver des clients et piloter » : Comment gagner des clients et garder le contrôle ? | `GLOSSAIRE_THEMES[2]`, 5 termes (CRM, tableau de bord, site connecté, référencement, visibilité dans les IA) | Un site et un CRM qui travaillent, pas seulement qui existent |
| 4 | objections | Thème « Protéger vos données, rester en règle » : Comment rester en règle avec vos données et vos factures ? | `GLOSSAIRE_THEMES[3]`, 3 termes (hébergement souverain, RGPD, facture électronique) | Conformité pensée dès le départ, échéances 2026-2027 |
| n | l'étape suivante | CTA final | `CTABand` | « Un terme reste flou ? On en parle sans jargon. » → `/contact` |

---

## 4. Schémas et animations

Pas de scène ni de `motion` sur cette page : `app/glossaire/GlossairePage.tsx` n'importe ni
`usePerformanceMode` ni `motion/react`. Le seul élément « schématique » est textuel :

| Élément | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Mini-flux en 3 étapes | `app/glossaire/GlossairePage.tsx:141-159`, champ `flow` de `lib/content/glossairePage.ts` | Une liste ordonnée « signal → traitement → résultat » avec flèches, pour 6 des 18 termes (rag, automatisation, workflow, déclencheur, webhook, API) | `flex flex-wrap` : les étapes reviennent à la ligne | Pas d'animation à dégrader (HTML/CSS statique) |

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `.surface-card` | Une carte par terme (`app/glossaire/GlossairePage.tsx:122-173`) | 18 | Liste verticale (`space-y-6`) à l'intérieur de chaque thème, pas de grille multi-colonnes |
| Lien de nav (sommaire) | Sidebar collante, groupée par thème | 4 groupes / 18 liens | Liste verticale imbriquée |

Aucune `SpotlightCard`, aucun `.metric-tile` sur cette page. Le verre (`bg-bg-card/60`) est
appliqué à toutes les cartes de terme de façon uniforme ; rien n'est laissé opaque
volontairement, contrairement à `/rag`.

---

## 6. L'appel à l'action

- **CTA unique** : « Premier échange gratuit », hero (`app/glossaire/GlossairePage.tsx:45`) et
  `CTABand` final (`app/glossaire/GlossairePage.tsx:192`), même destination `/contact`.
- **Réassurance sous le bouton** : celle par défaut de `CTABand` : « Réponse sous 24 h ·
  Premier échange offert · Sans engagement ».
- **Liens secondaires** (ils ne comptent pas comme un second CTA) : bouton secondaire du hero
  « Voir les services » → `/services` ; sommaire à 4 thèmes / 18 ancres.
- **Autres sorties de la page** : un lien `seeAlso` par terme (18 au total), vers `/agents-ia`,
  `/rag`, `/automatisation`, `/sites-web`, `/applications`, `/faq#securite-rgpd` et
  `/automatisation#facture-electronique-2026` (`lib/content/glossairePage.ts:71-241`) : le
  maillage interne le plus dense des quatre pages de cette fiche. Pas de `RelatedServices`.

---

## 7. Le design en détail

- **Accents** : preset `services`, aucune spécificité de couleur propre à cette page.
- **Rythme vertical** : une seule `section-shell` contenant sommaire et contenu
  (`app/glossaire/GlossairePage.tsx:49`), même construction que `/faq`.
- **Largeurs** : `section-container` en grille `lg:grid-cols-[260px_1fr]`, contenu borné à
  `max-w-[46rem]`.
- **Profondeur** : aucune (pas de halo, pas de tilt) : page plate et dense en texte.
- **Typographie** : `h2` de thème à `text-2xl sm:text-[1.7rem]`, `h3` de terme à
  `text-xl sm:text-2xl` (plus grand que les questions de `/faq`, car chaque terme fait office de
  mini-fiche autonome).
- **Ce qui fait la signature de cette page** : la ligne « Pour vous : » systématique sous
  chaque définition (`app/glossaire/GlossairePage.tsx:161-164`), qui traduit toujours le terme
  en bénéfice sans inventer de chiffre, et le mini-schéma de flux pour les termes qui décrivent
  un enchaînement.

---

## 8. Sur téléphone (390 px)

- La grille `lg:grid-cols-[260px_1fr]` repasse en une seule colonne : le sommaire (groupé par
  thème) précède le contenu, non collant sous `lg`.
- Les mini-flux (`flow`) passent en `flex-wrap` : les étapes numérotées reviennent à la ligne
  au lieu de s'aligner sur une seule ligne.
- Le hero n'a pas de `visual` : texte centré uniquement, pas de `MobileHeroPreview`.
- Aucune animation à couper : la page ne dépend d'aucun tier de performance.

---

## 9. SEO

| | |
|---|---|
| `title` | « Glossaire : l'IA expliquée simplement » (37 caractères, 53 avec le suffixe ` · Solutions 2IA`) |
| `description` | « Agent IA, RAG, workflow, API, RGPD, facture électronique : les termes de l'IA et de l'automatisation expliqués en français simple, avec des exemples de PME. » (156 caractères) |
| `canonical` | `/glossaire` |
| JSON-LD | `combineSchemas(buildDefinedTermSetSchema({...}), buildBreadcrumbSchema(...))` → `DefinedTermSet` (18 `DefinedTerm`, un par entrée de `GLOSSAIRE_PAGE_ENTRIES`) + `BreadcrumbList` |
| Liens internes sortants | `/contact` (CTA), et 18 liens `seeAlso` (un par terme) |

**Point de vigilance** : `lib/content/glossaire.ts` (source unique des tooltips
`<TermeExplique>` utilisés ailleurs sur le site) définit **21 termes**, mais
`GLOSSAIRE_PAGE_ENTRIES` (le contenu affiché sur `/glossaire`, et donc le `DefinedTermSet`) n'en
reprend que **18**. Trois termes du dictionnaire source n'apparaissent pas sur la page ni dans
son JSON-LD : `core-web-vitals`, `wcag`, `fiche-google`.

---

## 10. Performance

- Sections en `dynamic()` : aucune.
- Comportement par tier : **non concerné**. `app/glossaire/GlossairePage.tsx` n'importe pas
  `usePerformanceMode` : aucune animation à dégrader.
- Points sensibles : aucun identifié. Avec `/faq`, c'est la page la plus légère en JS client
  parmi les quatre couvertes par cette fiche.

---

## 11. État et suite

- **Ce qui est fait** : 18 termes organisés en 4 thèmes formulés comme de vraies questions,
  schema `DefinedTermSet` cohérent avec le contenu affiché, un lien de sortie par terme (le
  meilleur maillage interne du site selon l'audit de conversion), page légère sans dépendance
  de performance.
- **Ce qui reste** :
  - Décider si les 3 termes absents de la page (`core-web-vitals`, `wcag`,
    `fiche-google`) doivent y être ajoutés (et donc au `DefinedTermSet`), ou rester des
    tooltips internes uniquement.
  - Le nombre de termes affichés (18) a augmenté depuis l'audit de conversion (qui en comptait
    15) : les fichiers `lib/content/glossaire.ts` et `lib/content/glossairePage.ts` portent des
    modifications non commitées au moment de cette fiche.
- **Note de conversion** (audit du 6 septembre 2026) : **58/100** (Contenu 63, Design 70,
  Conversion 46). L'audit comptait alors 15 termes pour 1379 mots visibles. Verdict de l'audit :
  « correcte, mais elle ne déclenche pas la décision » : le meilleur maillage interne et le
  meilleur travail de vulgarisation du site, sur une page qui ne cherche jamais explicitement à
  vendre. Voir `docs/audits/2026-09-06-conversion/glossaire/README.md`.
