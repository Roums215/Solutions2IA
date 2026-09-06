# SEO & GEO

> **SEO** = être trouvé par Google. **GEO** = être *cité* par ChatGPT, Claude, Perplexity, Copilot.
> Les deux se travaillent avec les mêmes briques ici : metadata propres, JSON-LD, contenu structuré.
> Domaine officiel : **https://solutions2ia.fr** (le `.com` est mort, ne jamais le réintroduire).

---

## 1. Où vit le SEO dans le code

| Fichier | Rôle |
|---|---|
| `lib/seo/constants.ts` | **source de vérité unique** : `SITE_URL`, nom, tagline, description, couleurs de marque, coordonnées, pays servis. Tout le reste en dérive. |
| `lib/seo/schema.ts` | 11 constructeurs de JSON-LD typés, avec `@id` partagés pour le cross-référencement. |
| `components/seo/JsonLd.tsx` | injecte un schéma dans la page. |
| `app/layout.tsx` | metadata racine + `Organization` / `ProfessionalService` / `WebSite`. |
| `app/<route>/page.tsx` | metadata de page + schémas spécifiques. |
| `app/sitemap.ts` | **34 URL**, priorités et fréquences. |
| `app/robots.ts` | autorisations, dont **17 crawlers IA** explicitement listés. |
| `public/llms.txt` | résumé du site écrit **pour les LLM**. |
| `app/api/seo-report/` + `lib/seo/report/` | score SEO automatique hebdo/mensuel par email. |

---

## 2. Les 11 schémas disponibles

```ts
import { combineSchemas, buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
```

| Constructeur | Type Schema.org | Où il est utilisé |
|---|---|---|
| `buildOrganizationSchema` | `Organization` | layout (global) |
| `buildProfessionalServiceSchema` | `ProfessionalService` | layout (global) |
| `buildWebSiteSchema` | `WebSite` + `SearchAction` | layout (global) |
| `buildServiceSchema` | `Service` | 7 pages de service + 11 pages secteur |
| `buildBreadcrumbSchema` | `BreadcrumbList` | toutes les pages indexables sauf légales et `/a-propos` `/contact` |
| `buildFaqSchema` | `FAQPage` | `/faq` (30 Q/R) + chaque article |
| `buildArticleSchema` | `Article` | `/articles/[slug]` |
| `buildHowToSchema` | `HowTo` | home (méthode en 4 étapes) |
| `buildOfferCatalogSchema` | `OfferCatalog` + `Offer` | `/services` (5 offres avec fourchettes) |
| `buildDefinedTermSetSchema` | `DefinedTermSet` + `DefinedTerm` | `/glossaire` (15 termes) |
| `combineSchemas` | `@graph` | fusionne plusieurs schémas en un seul `<script>` |

Le `@graph` racine cross-référence : `Organization{@id}` ← `Service.provider`, `Offer.itemOffered`, `Person{@id}` (fondateur, auteur des articles). C'est ce qui fait comprendre aux moteurs qu'il s'agit d'une seule entité.

---

## 3. La checklist par page

À cocher pour toute nouvelle page ou refonte :

- [ ] `title` : le titre **+ ` · Solutions 2IA`** (ajouté automatiquement par le template du layout) reste sous **60 caractères**
- [ ] `description` : **150 à 160 caractères**, avec bénéfice + preuve + action
- [ ] `alternates: { canonical: "/ma-route" }`, **obligatoire** : sans ça, la page hérite du canonical `/` du layout et se déclare comme la home
- [ ] `openGraph` : `title`, `description`, `url`, `type`
- [ ] `keywords` si la page vise une requête précise
- [ ] JSON-LD : au minimum `buildBreadcrumbSchema`, plus le schéma métier
- [ ] **un seul `<h1>`** (rendu par `PageHero`), des `<h2>` formulés en questions
- [ ] route ajoutée à `app/sitemap.ts`
- [ ] page citée dans `public/llms.txt` si elle compte pour les IA
- [ ] au moins 2 liens internes sortants
- [ ] aucun tiret cadratin dans le texte visible

---

## 4. Ce qui fait la différence en GEO

Un moteur génératif ne « classe » pas : il **extrait** et **cite**. Ce qui se fait citer :

1. **Une réponse en tête de bloc** (BLUF). Chaque article ouvre sur un `TL;DR` de 40 à 60 mots : c'est le passage le plus repris.
2. **Des H2 formulés comme des questions réelles**, avec une ancre stable (`#quand-auditer`). Une ancre = un extrait citable.
3. **Des tableaux comparatifs.** Un tableau est nettement plus repris qu'un paragraphe équivalent.
4. **Des définitions.** `/glossaire` + `DefinedTermSet` : 15 termes en français simple. C'est le contenu le plus « copiable » du site.
5. **Des FAQ structurées** : `/faq` (30 questions, 5 catégories, réponses de 60 à 180 mots, ton déclaratif) + une FAQ par article, toutes remontées en `FAQPage`.
6. **Des sources externes citées** dans les articles.
7. **Des chiffres et des fourchettes de prix explicites** plutôt que « sur devis ».
8. **`llms.txt`** : le résumé du site en Markdown, à la racine publique, écrit pour être lu par une IA.
9. **`robots.ts` ouvert aux crawlers IA** : GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-SearchBot, Claude-Web, PerplexityBot, Google-Extended, CCBot, Amazonbot, Applebot-Extended, Bytespider, Meta-ExternalAgent, Diffbot, Omgilibot, FacebookBot, Cohere-ai.

### Le gabarit d'article (`lib/content/articles/types.ts`)

Chaque article est un objet typé qui **force** la structure GEO :

```
slug · title · description (150-160) · tldr (40-60 mots) · category · publishedAt/updatedAt
keywords[] · glossary[] · sections[{ heading (question PAA), anchor, content }]
comparison? { columns, rows } · sources[] · faq[] · relatedLinks[] · pillarLink
```

Le rendu (`ArticleLayout`) place dans l'ordre : fil d'Ariane, H1, TL;DR encadré, sommaire ancré, glossaire, sections ancrées, tableau comparatif, sources, FAQ, liens internes, CTA. **Reproduire ce gabarit pour tout nouvel article.**

---

## 5. Activation Google Search Console

GSC est gratuit et indispensable : c'est la seule source de vos positions réelles.
Sans lui, le score automatique ne mesure que la santé technique.

### 5.1 Créer la propriété

1. https://search.google.com/search-console → **Ajouter une propriété**
2. Choisir **Domaine** (couvre http/https/www) → `solutions2ia.fr`
   Vérification par enregistrement **DNS TXT** chez Hostinger.
   *Alternative* « Préfixe d'URL » : poser le code fourni dans la variable Vercel `GOOGLE_SITE_VERIFICATION` (le layout l'injecte automatiquement).
3. Une fois validé : **Sitemaps** → soumettre `https://solutions2ia.fr/sitemap.xml`

### 5.2 Service account (pour le rapport automatique)

1. https://console.cloud.google.com → nouveau projet « solutions2ia-seo »
2. **APIs & Services → Library** → activer **Google Search Console API**
3. **IAM & Admin → Service Accounts** → créer → **Keys → Add key → JSON**
4. Dans GSC : **Paramètres → Utilisateurs et autorisations** → ajouter l'email `…@….iam.gserviceaccount.com` en accès **Restreint**
5. Sur Vercel : `GSC_SERVICE_ACCOUNT_KEY` = la clé JSON **encodée base64** (`base64 -i key.json | pbcopy`), et `GSC_SITE_URL` = `sc-domain:solutions2ia.fr`

### 5.3 Bonus

- **Bing Webmaster Tools** : import en un clic depuis GSC. Bing alimente Copilot.
- **Google Business Profile** si une présence locale devient pertinente.

---

## 6. Le rapport SEO automatique

Deux crons Vercel (`vercel.json`) appellent `/api/seo-report` :
lundi 8 h UTC (hebdomadaire) et le 1er du mois 8 h UTC (mensuel).

**Test manuel :**

```bash
# Dry-run : calcule le score, n'envoie pas d'email
curl "https://solutions2ia.fr/api/seo-report?secret=TON_CRON_SECRET&dry=1"

# Envoi réel
curl "https://solutions2ia.fr/api/seo-report?secret=TON_CRON_SECRET&mode=weekly"
curl "https://solutions2ia.fr/api/seo-report?secret=TON_CRON_SECRET&mode=monthly"
```

### Lire le score

**Score global /100 + note A→E.**

- **Visibilité (60 %)**, depuis GSC : position moyenne (50 %) · CTR (20 %) · impressions (15 %) · clics (15 %)
- **Santé on-page (40 %)**, mesurée en direct sur 9 pages : title, description, canonical sur le bon domaine, h1 unique, JSON-LD, indexabilité, robots, sitemap

| Note | Score | Lecture |
|---|---|---|
| A | ≥ 85 | Excellent |
| B | 70-84 | Bon, marges d'optimisation |
| C | 55-69 | Correct, chantiers identifiés |
| D | 40-54 | Fragile |
| E | < 40 | Critique |

Un site neuf démarre logiquement en C/D côté visibilité. Ce qui compte, c'est la **tendance hebdomadaire** : impressions et requêtes qui montent = indexation qui progresse.

---

## 7. Performance et Core Web Vitals

Chantier terminé (juillet 2026), mesures sur le live :

| Métrique mobile | Avant | Après |
|---|---|---|
| LCP | 7,6 s | **1,5 s** (trace Chrome) / 2,2 s (Lighthouse throttling réel) |
| Performance Lighthouse | 70 | **94** |
| CLS | 0,003 | 0,005 |
| TBT | 300 ms | 20-170 ms |
| Speed Index | 11,2 s | 2,8-4,2 s |

> ⚠️ **Piège de mesure** : le mode par défaut de PageSpeed Insights (« simulated throttling » / lantern) affiche encore un LCP pessimiste (~7-8 s) parce qu'il modélise mal les animations CSS pré-hydratation. La réalité utilisateur, et **CrUX (ce que Google utilise pour classer)**, est à 1,5-2,2 s. Se fier à CrUX et aux traces DevTools, pas au chiffre lantern.

Détail du mécanisme : [`performance.md`](./performance.md).

---

## 8. État et corrections en attente

L'audit du 6 septembre 2026 est dans [`audits/2026-09-06-audit-site.md`](./audits/2026-09-06-audit-site.md).
Les points ouverts, du plus rentable au moins urgent :

| Prio | Point |
|---|---|
| **P0** | **`/mentions-legales` contient 13 champs « à compléter » en production** : obligation légale LCEN non remplie, et signal de confiance manquant pour Google comme pour les moteurs génératifs |
| P1 | `pillarLink` est renseigné sur les 7 articles mais jamais rendu par `ArticleLayout` : 7 liens vers les pages piliers perdus |
| P1 | Deux compteurs faux à l'écran : `/articles` annonce « Cinq guides » (il y en a 7), la home annonce « Six services » (il y en a 5, h2 **et** `aria-label`) |
| P1 | Les 5 `seoTitle` de `/automatisation/[secteur]` contiennent déjà `\| Solutions 2IA`, et le template du layout ajoute ` · Solutions 2IA` : **la marque apparaît deux fois** dans le `<title>` |
| P1 | **29 titres sur 33** dépassent 60 caractères une fois le suffixe de marque ajouté (jusqu'à 102) : troncature en SERP |
| P1 | **11 meta descriptions** dépassent 160 caractères (jusqu'à 186) |
| P2 | `/a-propos` n'a aucun JSON-LD : un `Person` + `AboutPage` renforcerait l'entité auteur (levier E-E-A-T et GEO) |
| P2 | `/contact` n'a aucun JSON-LD : `ContactPage` + `ContactPoint` |
| P2 | `/articles` n'a qu'un fil d'Ariane : ajouter `Blog` + `ItemList` |
| P2 | `app/sitemap.ts` met la date du build sur toutes les URL : utiliser les vraies dates des articles |
| P2 | `BRAND.primary` vaut `#7c3aed` dans `lib/seo/constants.ts` alors que l'accent réel du site est `#6366f1` : le `theme-color` du navigateur et le manifest affichent la mauvaise couleur |
| P3 | Pas de `llms-full.txt` (version longue pour les IA) |
| P3 | Une seule image OG pour tout le site : des OG par page amélioreraient le CTR social |
| P3 | Les 9 chemins audités par le rapport SEO n'incluent ni `/glossaire`, ni `/articles`, ni `/a-propos` |
| P2 | `/faq` n'a que 2 liens sortants (`/contact`, `/services`) malgré 30 réponses couvrant tous les piliers. `/glossaire` en a 8 grâce à ses `seeAlso` : appliquer le même motif |
| P2 | Ancre morte `#connected-constellation` sur `/sites-web` (`WebOpportunityFlow.tsx:158`), vestige de `WebGalaxyShowcase` |
| P3 | Mentions textuelles Belgique / Suisse / Luxembourg : le schema cible FR/BE/CH/LU mais aucun contenu ne les nomme |
