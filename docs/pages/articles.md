# `/articles` et `/articles/[slug]` · guides, preuve d'expertise

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 2026-09-18 · contre le code de `app/articles/` et
> `lib/content/articles/`

Cette fiche couvre **deux routes** : l'index `/articles` (liste) et le gabarit
`/articles/[slug]` (un article). Elles partagent les mêmes données (`lib/content/articles/`)
mais pas le même patron de fichiers : voir section 1.

---

## 1. Ce que fait cette page

Présenter les 7 guides longs du site et servir de preuve d'expertise et de capteur de trafic de
recherche (sources chiffrées, tableaux comparatifs, FAQ structurée par article). Elle ne
remplace pas `/faq` (réponses courtes, 60-180 mots) ni `/glossaire` (définitions d'un terme) :
un article développe un sujet complet avec sources externes et comparatif.

| | |
|---|---|
| Route index | `/articles` |
| Fichiers (index) | `app/articles/page.tsx` : **un seul fichier**, Server Component, contient à la fois `metadata` et le rendu JSX (pas de `ArticlesPage.tsx` client séparé) |
| Route article | `/articles/[slug]` (7 slugs, `generateStaticParams`) |
| Fichiers (article) | `app/articles/[slug]/page.tsx` (serveur, SEO dynamique) · `app/articles/[slug]/ArticleLayout.tsx` (client, rendu) |
| Preset de décor | `services` pour les deux routes (`app/articles/page.tsx:26`, `app/articles/[slug]/ArticleLayout.tsx:16`) |
| Public visé | Un visiteur en phase de recherche/comparaison, pas encore prêt à contacter |

**Écart au pattern du projet** : `CLAUDE.md` impose `page.tsx` (serveur) + `<Nom>Page.tsx`
(client) pour chaque route. L'index `/articles` ne suit pas ce pattern : tout est dans
`page.tsx`, y compris le rendu de la grille de cartes (`app/articles/page.tsx:23-91`). Le
gabarit `/articles/[slug]` suit bien le pattern à deux fichiers.

---

## 2. La promesse affichée

### Index `/articles`

- **Titre (h1)** : « Sept guides pour décider sereinement. » (`app/articles/page.tsx:38-41`)
- **Sous-titre** : « Audit d'application métier, agent IA souverain UE, RAG vs fine-tuning,
  automatiser le tri des mails, facture électronique 2026 : sources chiffrées, tableaux
  comparatifs et FAQ structurée pour chaque sujet. » (`app/articles/page.tsx:43`)
- **Étiquette / badge** : « Articles » (`app/articles/page.tsx:37`)
- **Niveau 1 (dirigeant de PME)** : 7 cartes avec catégorie, titre, résumé et date de mise à
  jour.
- **Niveau 2 (visiteur averti)** : chaque carte annonce déjà, dans son titre, la spécificité
  technique de l'article (RGPD, hébergement UE, RAG vs fine-tuning...).

### Gabarit `/articles/[slug]`

- **Titre (h1)** : `article.title`, propre à chaque article (ex. « Audit d'application métier :
  par où commencer ? Méthode 2026 »), affiché avec la catégorie au-dessus
  (`app/articles/[slug]/ArticleLayout.tsx:30-35`).
- **Sous-titre** : `article.description`, affichée sous le h1 ; un TL;DR de 40 à 60 mots suit
  dans un encart glow (`app/articles/[slug]/ArticleLayout.tsx:45-60`, commentaire « BLUF pour
  LLM »).
- **Fil d'Ariane** : Accueil / Articles / catégorie (`app/articles/[slug]/ArticleLayout.tsx:22-28`).
- **Niveau 1 (dirigeant de PME)** : TL;DR en tête, sommaire, sections courtes, FAQ en bas.
- **Niveau 2 (visiteur averti)** : tableau comparatif chiffré (présent sur les 7 articles),
  glossaire des termes techniques employés, sources externes cliquables.

---

## 3. Structure, dans l'ordre

### Index `/articles`

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 0 | (hero) | Promesse + CTA | `PageHero` | 7 guides existent, sources chiffrées |
| 1 | l'étape suivante | Grille des 7 articles | `app/articles/page.tsx:48-79` | Un lien direct vers chaque article, avec sa date de mise à jour |

Il n'y a **pas de `CTABand`** sur l'index : la page s'arrête après la grille de cartes
(vérifié : aucun import de `CTABand` dans `app/articles/page.tsx`). Les deux seules incitations
sont les CTA du hero (« Réserver un audit gratuit » → `/contact`, « Voir la FAQ complète » →
`/faq`).

### Gabarit `/articles/[slug]` (ordre imposé par `ArticleLayout.tsx`)

| # | Section affichée | Bloc (ligne) | Condition |
|---|---|---|---|
| 1 | En-tête : fil d'Ariane, catégorie, h1, description, date + auteur | `:20-43` | toujours |
| 2 | TL;DR | `:46-60` | toujours |
| 3 | Sommaire (ancres vers `article.sections`) | `:63-84` | toujours |
| 4 | Glossaire des termes | `:87-107` | si `article.glossary.length > 0` |
| 5 | Sections principales, numérotées | `:110-124` | toujours (une par élément de `article.sections`) |
| 6 | Tableau comparatif | `:127-169` | si `article.comparison` défini (présent sur les 7 articles) |
| 7 | Sources externes | `:172-193` | toujours |
| 8 | FAQ inline (renforce le schema `FAQPage`) | `:196-231` | toujours |
| 9 | Pour aller plus loin + lien pilier | `:234-270` | toujours |
| 10 | CTA final | `CTABand`, `:273-281` | toujours |

---

## 4. Schémas et animations

Aucun schéma animé, aucune scène : ni `app/articles/page.tsx` ni
`app/articles/[slug]/ArticleLayout.tsx` n'importent `motion/react` ou `usePerformanceMode`.
Seules dynamiques : les cartes de l'index ont un `hover:-translate-y-0.5` en transition CSS
(`app/articles/page.tsx:55`), et la FAQ inline de chaque article réutilise l'accordéon
`<details>` natif déjà vu sur `/faq` (`app/articles/[slug]/ArticleLayout.tsx:204-226`).

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Carte « maison » (`rounded-2xl border-border-subtle bg-bg-card/55`) | Grille de l'index (`app/articles/page.tsx:50-77`) | 7 | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Encart TL;DR (bordure + glow accent) | En tête de chaque article | 1 par article | pleine largeur (`section-container-narrow`) |
| Encart glossaire (`rounded-2xl border-border-subtle bg-bg-card/40`) | Un par article, si `glossary.length > 0` | 1 par article concerné | pleine largeur |
| Accordéon FAQ « maison » (`<details>`) | Bas de chaque article | Variable par article (réinjecté dans le schema `FAQPage`) | Liste verticale |
| Bloc lien pilier (bordure accent) | Bas de chaque article, avant le CTA | 1 par article | pleine largeur, `sm:flex-row` |

Aucune `SpotlightCard`, aucun `.metric-tile`, aucune `.surface-card` sur ces deux routes.

---

## 6. L'appel à l'action

### Index `/articles`

- **CTA** : uniquement dans le hero, « Réserver un audit gratuit » → `/contact` (primaire) et
  « Voir la FAQ complète » → `/faq` (secondaire). **Pas de CTA de fin de page.**
- **Autres sorties** : un lien par carte vers l'article correspondant (7 liens).

### Gabarit `/articles/[slug]`

- **CTA affichés** : le `CTABand` final (`app/articles/[slug]/ArticleLayout.tsx:273-281`) passe
  `primaryLabel="Réserver mon audit"` **sans** `primaryHref` ni `secondary`. Or
  `CTABand` a des valeurs par défaut (`components/shared/CTABand.tsx:18-25`) :
  `primaryHref = "/contact"` et surtout **`secondary = { label: "Voir les services", href:
  "/services" }`**. Résultat : cette page affiche **deux boutons** (« Réserver mon audit » et
  « Voir les services »), contrairement à `/rag`, `/faq` et `/glossaire` qui passent
  explicitement `secondary={null}` pour respecter la règle du projet « un seul CTA par page ».
  À vérifier si c'est un oubli ou un choix assumé pour cette route.
- **Réassurance sous le bouton** : celle par défaut de `CTABand` : « Réponse sous 24 h ·
  Premier échange offert · Sans engagement ».
- **Liens secondaires** : sommaire de l'article, liens de sources externes (`target="_blank"`).
- **Autres sorties de la page** : `article.relatedLinks` (liens internes choisis par article) et
  un bloc dédié « Le service qui va avec ce guide » (`article.pillarLink`,
  `app/articles/[slug]/ArticleLayout.tsx:254-268`), qui pointe vers la page service pilier de
  l'article (`/applications`, `/agents-ia`, `/rag` ou `/automatisation` selon le sujet).

---

## 7. Le design en détail

- **Accents** : preset `services` pour les deux routes, sans traitement visuel propre.
- **Rythme vertical** : `section-shell-tight` répété pour chaque bloc de l'article (en-tête,
  TL;DR, sommaire, glossaire, chaque section, comparatif, sources, FAQ, liens), sans alternance
  avec `section-shell` classique : rythme resserré, cohérent avec un format lecture longue.
  L'index utilise une seule `section-shell` pour la grille.
- **Largeurs** : `section-container-narrow` pour tout le contenu d'article (lecture longue
  colonne unique) ; `section-container` classique pour la grille de l'index.
- **Profondeur** : aucune (pas de halo, pas de tilt) sur les deux routes.
- **Typographie** : h1 d'article jusqu'à `lg:text-[2.6rem]` (`app/articles/[slug]/ArticleLayout.tsx:33`),
  plus grand que les h1 des autres pages de cette fiche ; h2 de section numérotés en préfixe
  `01`, `02`... (mono, accent).
- **Ce qui fait la signature de cette page** : le TL;DR en tête (« BLUF pour LLM », commentaire
  ligne 45) et le tableau comparatif présent sur les 7 articles, tous deux pensés pour la
  citation par une IA autant que pour la lecture humaine.

---

## 8. Sur téléphone (390 px)

- Grille de l'index : `grid-cols-1` (une carte par ligne) en dessous de `sm`.
- Tableau comparatif de chaque article : encapsulé dans `overflow-x-auto` avec
  `min-w-[480px]`, donc défilement horizontal plutôt que retour à la ligne
  (`app/articles/[slug]/ArticleLayout.tsx:133-134`).
- Le hero (index) n'a pas de `visual` : texte centré, pas de `MobileHeroPreview`.
- Rien d'autre ne change : pages sans animation à dégrader.

---

## 9. SEO

### Index `/articles`

| | |
|---|---|
| `title` | « Guides : IA, applications, automatisation » (41 caractères, 57 avec le suffixe) |
| `description` | « Guides ultra-optimisés : audit application métier, agent IA souverain France/UE, RAG vs fine-tuning, automatiser tri mails PME, facture électronique 2026. » (154 caractères) |
| `canonical` | `/articles` |
| JSON-LD | `buildBreadcrumbSchema(...)` seul → `BreadcrumbList` (pas de `CollectionPage` ni `ItemList` pour les 7 articles) |
| Liens internes sortants | `/contact`, `/faq` (hero), et 7 liens vers les articles |

### Gabarit `/articles/[slug]` (métadonnées générées dynamiquement, `generateMetadata`)

| | |
|---|---|
| `title` | `article.seoTitle ?? article.title` : les 7 `seoTitle` mesurent entre 34 et 41 caractères (50 à 57 avec le suffixe), tous sous 60 |
| `description` | `article.description`, entre 150 et 160 caractères sur les 7 articles |
| `canonical` | `/articles/[slug]` |
| JSON-LD | `combineSchemas(buildArticleSchema(...), buildBreadcrumbSchema(...), buildFaqSchema(article.faq))` → `Article` + `BreadcrumbList` + `FAQPage` (propre à chaque article, distinct de celui de `/faq`) |
| OpenGraph / Twitter | `type: "article"`, `publishedTime`/`modifiedTime`, `authors: ["Iulian Ionita"]`, carte Twitter `summary_large_image` |

Les 7 articles et leurs comparatifs :

| Slug | Catégorie | Publié le | Tableau comparatif |
|---|---|---|---|
| `audit-application-metier-par-ou-commencer` | Applications | 2026-06-08 | Refonte ciblée vs reconstruction : matrice de décision |
| `agent-ia-rgpd-souverain-france-ue` | Agents IA | 2026-06-08 | Mistral vs Claude EU vs Azure OpenAI France |
| `rag-vs-fine-tuning-quoi-choisir-entreprise` | RAG | 2026-06-08 | RAG vs fine-tuning : matrice de comparaison |
| `automatiser-tri-mails-pme-2026` | Automatisation | 2026-06-08 | Tri mails manuel vs agent IA |
| `facture-electronique-chorus-pro-2026-obligation` | Automatisation | 2026-06-08 | Chorus Pro vs PDP privée : choisir sa solution |
| `combien-coute-agent-ia-pme-2026` | Agents IA | 2026-07-03 | 3 niveaux de tarification pour un agent IA PME |
| `agent-ia-vs-chatbot-quelle-difference` | Agents IA | 2026-07-03 | Chatbot vs agent IA : matrice comparative |

**Point de vigilance** : aucun des 7 articles ne définit `updatedAt`. La date « Mis à jour le »
affichée sur l'index et sur chaque article (`updatedAt ?? publishedAt`) retombe donc toujours
sur `publishedAt` : le libellé « mis à jour » est actuellement toujours une date de première
publication, jamais une vraie mise à jour. `app/sitemap.ts:7-14` maintient par ailleurs sa
propre liste de 7 slugs en dur, dupliquée avec celle de `lib/content/articles/articles.tsx`
plutôt que dérivée par un `.map()`.

---

## 10. Performance

- Sections en `dynamic()` : aucune, sur l'index comme sur le gabarit d'article.
- Comportement par tier : **non concerné**. Ni `app/articles/page.tsx` ni
  `app/articles/[slug]/ArticleLayout.tsx` n'importent `usePerformanceMode`.
- Points sensibles : `lib/content/articles/articles.tsx` fait 849 lignes pour 7 articles (tout
  le contenu éditorial en JSX inline) ; c'est un fichier de données volumineux mais statique,
  sans coût d'exécution particulier.

---

## 11. État et suite

- **Ce qui est fait** : 7 articles complets (TL;DR, sommaire, glossaire, sections, comparatif,
  sources, FAQ, liens pilier), schema `Article` + `FAQPage` + `BreadcrumbList` par article,
  metadata dynamique conforme aux règles du projet (title < 60, description 150-160).
- **Ce qui reste** :
  - L'index `/articles` n'a pas de `CTABand` de fin de page, contrairement à toutes les autres
    pages de cette fiche.
  - Le `CTABand` du gabarit d'article affiche deux boutons (pas de `secondary={null}`) : à
    aligner sur la règle « un seul CTA par page » ou à documenter comme exception assumée.
  - L'index `/articles` ne suit pas le pattern `page.tsx` + `<Nom>Page.tsx` du reste du site :
    tout est dans un unique fichier serveur.
  - Aucun article ne renseigne `updatedAt` : le libellé « Mis à jour le » est aujourd'hui
    toujours une date de publication.
  - La liste de slugs d'`app/sitemap.ts` est dupliquée manuellement avec
    `lib/content/articles/articles.tsx` plutôt que dérivée de `ARTICLE_DATA`.
- **Note de conversion** (audit du 6 septembre 2026) : **48/100** (Contenu 47, Design 64,
  Conversion 40), la note la plus basse du site parmi les pages auditées. Verdict de l'audit :
  « elle informe, elle ne convertit pas. Chantier prioritaire. » : l'index annonçait alors cinq
  guides quand il y en avait déjà sept (le nombre affiché a depuis été corrigé à « Sept guides »
  et l'audit notait l'absence de CTA de fin de page, toujours vraie aujourd'hui) ; les articles
  eux-mêmes étaient jugés excellents. Voir
  `docs/audits/2026-09-06-conversion/articles/README.md`.
