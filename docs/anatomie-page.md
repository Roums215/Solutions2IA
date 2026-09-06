# Anatomie d'une page

> Le document à lire en premier. Il explique **comment une page du site est faite** :
> ses fichiers, son contenu, son design. Si tu comprends cette page, tu comprends les 30 autres.

---

## 1. En une phrase

Une page = **deux fichiers** (un pour Google, un pour l'écran), posés sur **un décor de fond propre à son univers**, puis une **suite de sections** qui répondent toujours aux cinq mêmes questions, et qui finit **toujours** par le même appel à l'action.

---

## 2. Les deux fichiers d'une page

Chaque route vit dans `app/<route>/` et contient exactement deux fichiers :

```
app/services/
├── page.tsx          ← Server Component : le SEO. Aucune animation ici.
└── ServicesPage.tsx  ← Client Component : ce que le visiteur voit.
```

### `page.tsx` : la carte d'identité (invisible)

C'est ce que lisent Google, ChatGPT, Perplexity et Claude. Il ne rend presque rien.

```tsx
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema, combineSchemas } from "@/lib/seo/schema";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mes services : sites web, applications, automatisations, assistant IA",
  description: "…150 à 160 caractères, avec le bénéfice + un chiffre + l'appel à l'action…",
  keywords: ["…"],
  alternates: { canonical: "/services" },   // ⚠️ OBLIGATOIRE : sinon la page hérite du canonical "/" du layout
  openGraph: { title: "…", description: "…", url: "/services", type: "website" },
};

export default function Page() {
  const schema = combineSchemas(
    buildServiceSchema({ name, description, url: "/services", serviceType, audience }),
    buildBreadcrumbSchema([{ name: "Accueil", url: "/" }, { name: "Services", url: "/services" }]),
  );
  return (
    <>
      <JsonLd schema={schema} id="ld-services" />
      <ServicesPage />
    </>
  );
}
```

**Règle** : `page.tsx` n'a jamais `"use client"`. Il ne fait que trois choses : `metadata`, `JsonLd`, rendre le composant client.

### `<Nom>Page.tsx` : la page visible

```tsx
"use client";

export function ServicesPage() {
  return (
    <>
      <PageAtmosphere preset="services" />   {/* décor de fond, statique */}

      <PageHero label="…" title={…} description="…" primaryCta={…} secondaryCta={…} />

      <section className="section-shell">…</section>
      <section className="section-shell-tight">…</section>
      <section className="section-shell">…</section>

      <CTABand title={…} description="…" />
    </>
  );
}
```

---

## 3. Le squelette visuel : deux couches empilées

Toute page superpose les mêmes couches. Tu n'as jamais à les recréer, seulement à choisir le `preset`.

```
┌──────────────────────────────────────────────┐
│  2. CONTENU        sections, cartes, textes  │  ← ce que tu écris
├──────────────────────────────────────────────┤
│  1. PageAtmosphere décor statique du domaine │  fixed inset-0
│     (halos, grille, réseau neuronal, orbes)  │
├──────────────────────────────────────────────┤
│  0. body           dégradé sombre de base    │
└──────────────────────────────────────────────┘
```

> **Le fond ne suit plus la souris.** `FluidMouseField` (fond fluide parallaxé) et
> `MouseParticles` (traînée de particules au curseur) ont été **retirés le 6 septembre 2026**
> à la demande du client. Ne pas les réintroduire : le décor de fond est désormais
> entièrement statique. `MouseParticles` posait aussi `* { cursor: none }` et dessinait un
> curseur maison ; le curseur natif du système est revenu.

Autour, `AppShell` (dans `app/layout.tsx`) ajoute pour **toutes** les pages : `LoadingScreen` au premier chargement, `Header`, `PageTransition`, `Footer`, `Toaster`.

### Le `preset` : l'identité visuelle de la page

Un mot suffit pour donner à la page sa palette et son décor.

| Preset | Routes qui l'utilisent | Palette |
|---|---|---|
| `home` | `/` | indigo + cyan |
| `services` | `/services`, `/faq`, `/glossaire`, `/articles`, `/articles/[slug]` | indigo + indigo clair |
| `web` | `/sites-web` | bleu + cyan |
| `apps` | `/applications`, `/applications/[secteur]` | bleu ciel + indigo clair |
| `ai` | `/agents-ia` | violet + indigo |
| `automation` | `/automatisation`, `/automatisation/[secteur]`, `/rag` | cyan + turquoise |
| `about` | `/a-propos` | indigo clair |
| `contact` | `/contact` | indigo + violet |
| `studio` | *(aucune : page supprimée en juin 2026)* | violet + orange |

> Un seul composant prend ce mot : `<PageAtmosphere preset="ai" />`.

---

## 4. Le contenu : l'ordre imposé des cinq questions

C'est la règle de contenu la plus importante du site. **Chaque page raconte dans cet ordre :**

| # | Question à laquelle la section répond | Traduction concrète |
|---|---|---|
| 1 | **C'est quoi ?** | `PageHero` : la promesse en une phrase |
| 2 | **Ce que ça vous apporte** | le bénéfice concret, chiffré si possible |
| 3 | **Comment ça marche ?** | un schéma animé ou un flux d'étapes |
| 4 | **Pour qui ?** | secteurs, profils, cas d'usage |
| 5 | **L'étape suivante** | `CTABand`, **un seul** appel à l'action |

Exemple réel, la home (`app/page.tsx`) :

```
HeroSection                  → 1. c'est quoi (la promesse)
HomeServicesConstellation    → 1. les 5 domaines
HomeTransformationFlows      → 2. les transformations concrètes
HomeProofTelecom             → 2. une preuve : un projet réel
PremiumFlowPanel             → 3. la méthode en 4 étapes
HomeApproachSplit            → 3. ce qui guide le travail
HomeProfileMatrix            → 4. pour qui
CTABand                      → 5. l'étape suivante
```

### Règles d'écriture (non négociables)

1. **« je », jamais « nous »** : développeur indépendant solo.
2. **Zéro preuve inventée** : pas de client fictif, pas de témoignage, pas de stat non sourçable.
3. **Pas de tiret cadratin « — » dans le texte visible** : ça fait « écrit par une IA ». Utiliser `:` `,` `( )` `·` ou « X à Y ». *(Les commentaires de code peuvent en garder.)*
4. **Le jargon ne reste jamais seul** : soit on le remplace par le mot simple, soit on l'explique (voir `lib/content/glossaire.ts`).
5. **Une idée par bloc**, du blanc plutôt que du texte.
6. **Interdits** : « solutions innovantes », « révolutionner », « à l'ère de l'IA », « libérez votre potentiel », « dans un monde où… ».

---

## 5. Une section, de l'intérieur

Le motif se répète partout. Trois briques : un **shell** (l'espacement), un **container** (la largeur), un **SectionHeading** (le titre), puis le contenu.

```tsx
<section className="section-shell">           {/* respiration verticale */}
  <div className="section-container">          {/* largeur max + padding latéral */}

    <SectionHeading
      label="Ce que je fais"                   {/* pastille au-dessus du titre */}
      title={<>Cinq façons de <span className="text-gradient-strong">gagner du temps</span></>}
      description="Une phrase qui pose le contexte."
    />

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div key={item.title} variants={fadeInUp}>
          <SpotlightCard glow="99, 102, 241" tilt={3} pulse>
            <h3 style={{ transform: "translateZ(30px)" }}>{item.title}</h3>
            <p>{item.description}</p>
          </SpotlightCard>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>
```

### Choisir son shell

| Classe | Respiration verticale | Quand |
|---|---|---|
| `.section-shell` | `clamp(6rem, 9vw, 9rem)` | section principale, généreuse |
| `.section-shell-tight` | `clamp(4.5rem, 7vw, 6.5rem)` | section secondaire |
| `.section-shell-compact` | `clamp(3.5rem, 5vw, 5rem)` | encart court, transition |

### Choisir son container

| Classe | Largeur | Quand |
|---|---|---|
| `.section-container` | large | grilles, schémas, cartes |
| `.section-container-narrow` | étroite | texte long (articles, légal) |

Le titre (`SectionHeading`) prend automatiquement sa marge basse vers la grille qui suit : **ne pas ajouter de `mt-*` à la main.**

> ⚠️ **Hiérarchie des titres.** `PageHero` rend le `h1`, `SectionHeading` rend un `h2`,
> `PremiumFlowPanel` rend un `h3`. Une section qui n'utilise que `PremiumFlowPanel`, sans
> `SectionHeading` avant, saute du `h1` au `h3` : c'est le cas aujourd'hui sur `/`, `/services`,
> `/applications`, `/agents-ia`, `/a-propos` et `/contact`. Toujours poser un `h2` avant.

---

## 6. Le design : les briques disponibles

### Couleurs : toujours par token, jamais en dur

```
Fonds     bg-bg-primary · bg-bg-secondary · bg-bg-tertiary · bg-bg-card · bg-bg-card-hover
Texte     text-text-primary · text-text-secondary · text-text-tertiary · text-accent-light
Bordures  border-border-subtle · border-border-medium · border-border-accent
Accents   bg-accent-primary (#6366f1) · bg-accent-light · bg-accent-dark
          bg-accent-glow · bg-accent-glow-strong · bg-cyan (#22d3ee) · bg-cyan-glow
```

Tout est défini dans `app/globals.css`, bloc `@theme`. **Une couleur écrite en dur dans un composant est un bug**, sauf dans les deux cas prévus par l'API : `SpotlightCard glow="99, 102, 241"` et `PremiumFlowPanel accent="99, 102, 241"` (format `r, g, b` sans alpha, volontaire).

### Effets de marque (assumés, à ne pas « nettoyer »)

```
.text-gradient / .text-gradient-strong   dégradé indigo → cyan sur un titre
.glow-line                               filet lumineux horizontal
.bg-grid · .bg-radial-top · .bg-noise    textures de fond
.card-shine                              reflet diagonal au survol
.surface-card · .metric-tile             surfaces premium prêtes à l'emploi
.section-intro-panel · .section-vignette encadrés et bords assombris
```

### Composants réutilisables

| Composant | Rôle | Props utiles |
|---|---|---|
| `PageHero` | le haut de page (h1 unique) | `label` `title` `description` `primaryCta` `secondaryCta` `visual` `mobileSteps` |
| `SectionHeading` | titre de section (h2) | `label` `title` `description` `centered` |
| `SpotlightCard` | carte premium | `glow="r, g, b"` `tilt` `pulse` `className` |
| `Button` | bouton / lien | `variant` (`primary`/`secondary`) `size` `href` |
| `CTABand` | bande finale d'appel | `title` `description` `primaryLabel` `primaryHref` |
| `PremiumFlowPanel` | flux d'étapes numérotées (rend un **h3**) | `label` `title` `description` `steps` `accent` |
| `RelatedServices` | maillage vers 2 services voisins | `current` (clé de route) |
| `SectionParticles` | particules légères d'ambiance | `variant` |

> `SpotlightCard` fait un tilt 3D : pour donner de la profondeur à ses enfants,
> `style={{ transform: "translateZ(30px)" }}`.

### Animation : les trois règles

1. **`transform` et `opacity` uniquement.** Jamais `width`, `height`, `top`, `left` (ça force un recalcul de mise en page à chaque image). Pour une barre qui grandit : `scaleX`.
2. **Les ressorts plutôt que les durées fixes** pour tout ce qui suit la souris (`useSpring`, `useMotionValue`, `useTransform` : zéro re-render React).
3. **Le reveal standard** : `staggerContainer` sur le parent + `fadeInUp` sur les enfants, `viewport={{ once: true }}` (variants dans `lib/animation/variants.ts`).

### Performance : le tier automatique

Le site détecte l'appareil et pose `<html data-perf="full | reduced | minimal">`.

| Tier | Déclencheur | Effet |
|---|---|---|
| `full` | desktop confortable | tout est actif |
| `reduced` | mobile, tactile, ≤ 4 Go RAM, ≤ 4 cœurs | effets GPU allégés, reveals conservés |
| `minimal` | `prefers-reduced-motion`, save-data, 2G/3G, FPS effondré | tout statique |

Dans un composant : `const { shouldReduceMotion, shouldHideBackgroundDecor } = usePerformanceMode();`
Un tier ne remonte jamais en cours de session (garde FPS à sens unique).

---

## 7. Le SEO / GEO d'une page : la checklist

À cocher pour **toute** nouvelle page ou refonte.

- [ ] `metadata.title` : le titre + `· Solutions 2IA` (ajouté automatiquement) reste **sous 60 caractères**
- [ ] `metadata.description` : **150 à 160 caractères**, bénéfice + preuve + action
- [ ] `alternates: { canonical: "/ma-route" }` : **sans ça la page se déclare comme la home**
- [ ] `openGraph` : title, description, `url`, `type`
- [ ] JSON-LD via `combineSchemas(...)` : au minimum `buildBreadcrumbSchema`, plus `buildServiceSchema` si c'est une page de service
- [ ] **un seul `<h1>`** (c'est `PageHero` qui le rend) et des `<h2>` en questions réelles
- [ ] la route est ajoutée à `app/sitemap.ts`
- [ ] la page est citée dans `public/llms.txt` si elle compte pour les IA
- [ ] au moins **2 liens internes sortants** (`RelatedServices` fait le travail sur les pages service)
- [ ] aucun tiret cadratin dans le texte visible

Les briques SEO sont toutes dans `lib/seo/` : `constants.ts` (source de vérité URL/marque) et `schema.ts` (11 constructeurs de JSON-LD).

---

## 8. Créer une page, pas à pas

```bash
mkdir app/ma-route
```

1. **`app/ma-route/page.tsx`** : copier le patron du §2, remplir `metadata` + le JSON-LD.
2. **`app/ma-route/MaRoutePage.tsx`** : `"use client"`, poser `PageAtmosphere` avec le preset du domaine, puis `PageHero`, les sections, `CTABand`.
3. **Écrire le contenu dans l'ordre des cinq questions** (§4).
4. **Ajouter la route** à `app/sitemap.ts`, et à `lib/content/navigation.ts` si elle doit être dans le menu ou le pied de page.
5. **Vérifier** :
   ```bash
   npx tsc --noEmit && pnpm lint
   ```
6. **Documenter la page** : dupliquer `docs/pages/_TEMPLATE.md` en `docs/pages/ma-route.md`.

> ⚠️ Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne : le build écrase le `.next` du serveur de dev et casse le site en local. Utiliser `npx tsc --noEmit` + `pnpm lint`.

---

## 9. Ce qu'on ne touche pas

- **Le logo** (`LoadingScreen`, `Header`) : jamais sans demande explicite.
- **La signature de marque** : dégradés sur les titres, halos flous en fond, palette indigo/cyan, `SpotlightCard`. C'est voulu, ce n'est pas du bruit à nettoyer.
- **Les schémas pédagogiques animés** : si une refonte en supprime un, il est refait en mieux, jamais retiré sèchement.
- **Le LCP** : `PageHero` peint son `h1` et son sous-titre en CSS pur (`.hero-enter`) avant l'hydratation. Y remettre une animation JS depuis `opacity: 0` ferait remonter le LCP de 1,8 s à ~8 s.

---

## Pour aller plus loin

| Sujet | Document |
|---|---|
| Tokens, presets, composants en détail | [`design-system.md`](./design-system.md) |
| Ton, glossaire, règles de copy | [`contenu-copy.md`](./contenu-copy.md) |
| Metadata, schemas, sitemap, llms.txt | [`seo-geo.md`](./seo-geo.md) |
| Tiers de perf, animations, LCP | [`performance.md`](./performance.md) |
| Stack, arborescence, routing | [`architecture.md`](./architecture.md) |
| Brief détaillé d'une page précise | [`pages/`](./pages/) |
