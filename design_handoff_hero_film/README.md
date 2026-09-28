# Handoff : film hero « Solutions 2IA »

## Vue d'ensemble

Film produit cinématographique en sept chapitres plein cadre (1920 × 1080), destiné à la
**première section de la page d'accueil, à droite du titre**. Il raconte l'offre sans texte
marketing : un objet physique par service.

| # | Chapitre | Durée | Objet principal |
|---|---|---|---|
| 00 | Introduction | 7,0 s | un point lumineux → signal entrant |
| 01 | Agent IA | 22,6 s | smartphone (appel → CRM → agenda → équipe) |
| 02 | Automatisation | 19,7 s | donnée qui traverse 3 stations, app A → app B |
| 03 | Mémoire d'entreprise | 18,0 s | documents papier, passage surligné, réponse sourcée |
| 04 | Site web connecté | 20,0 s | navigateur Atelier Norda, réservation, intégrations |
| 05 | Application métier | 20,8 s | logiciel qui se construit autour des données |
| 06 | Final | 9,0 s | cinq silhouettes reliées + CTA |

Durée totale : **117,1 s**, en boucle. Chaque chapitre se vide complètement avant le suivant
(scène noire ~300–500 ms) : jamais deux services à l'écran en même temps.

## À propos des fichiers

`reference/` contient le **prototype HTML** : la référence visuelle et temporelle, pas du code
de production. `src/` contient le **portage React/TypeScript prêt à intégrer** dans le dépôt
Next.js : mêmes positions, mêmes timings, mêmes matières, sans dépendance externe.

Fidélité : **haute (hifi)**. Couleurs, typographies, ombres et timings sont définitifs.
Le rendu doit être identique au prototype ; seul l'habillage du conteneur (largeur de la colonne,
marges de la section) appartient au site.

## Fichiers livrés

```
src/
  film-runtime.tsx      moteur : horloge rAF, Shot, easings, mise à l'échelle du plan, cues
  film-core.tsx         primitives : palette, matières, Obj, Wire, Pulse, Cursor, titres
  film-chapters-a.tsx   chapitres 00 Intro · 01 Agent IA · 02 Automatisation
  film-chapters-b.tsx   chapitres 03 Mémoire · 04 Site web · 05 Application · 06 Final
  SolutionsFilm.tsx     composant à monter (props publiques)
reference/
  Solutions 2IA Film Fullscreen.dc.html   prototype (point d'entrée)
  film-core.jsx / film-ch1.jsx / film-ch2.jsx / film-main.jsx   sources du prototype
```

Aucune image, aucune police bitmap, aucun asset binaire : tout est CSS/SVG.

## Intégration

### 1. Copier les fichiers

`src/*` → `components/film/` (ou l'emplacement habituel des composants de page).

### 2. Monter le composant

Le film est **client-only** (`requestAnimationFrame`, `ResizeObserver`, `IntersectionObserver`).
Pour ne pas peser sur le LCP de la page d'accueil, le charger en dynamique :

```tsx
// app/(marketing)/page.tsx  — ou le fichier de contenu de la section 1
import dynamic from 'next/dynamic';

const SolutionsFilm = dynamic(() => import('@/components/film/SolutionsFilm'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full rounded-2xl bg-[#04050d]" />,
});
```

```tsx
<div className="grid items-center gap-12 lg:grid-cols-[minmax(0,44ch)_minmax(0,1fr)]">
  <div>{/* titre + sous-titre + CTA existants, inchangés */}</div>
  <SolutionsFilm className="rounded-2xl" />
</div>
```

Le composant remplit **100 % de la largeur de son conteneur** en ratio 16/9 et se met à
l'échelle tout seul : ne lui donner ni largeur ni hauteur fixes, juste une colonne.

### 3. Polices

Le film utilise quatre familles. Les déclarer avec `next/font/google` et remplacer l'objet `F`
en tête de `film-core.tsx` par les variables CSS du projet :

| Rôle | Famille | Graisses |
|---|---|---|
| titres, noms, chiffres | **Sora** | 400 · 500 · 600 · 700 |
| textes d'interface | **Manrope** | 400 · 500 · 600 · 700 |
| étiquettes / valeurs techniques | **JetBrains Mono** | 400 · 500 · 600 |
| site Atelier Norda (chap. 04) + guillemets | **DM Serif Display** | 400 |

```ts
// film-core.tsx
const F = {
  sora: 'var(--font-sora)',
  body: 'var(--font-manrope)',
  mono: 'var(--font-jetbrains-mono)',
  serif: 'var(--font-dm-serif)',
};
```

Sans ces polices, le rendu change sensiblement (Sora porte toute la hiérarchie).

## Props publiques

| Prop | Défaut | Effet |
|---|---|---|
| `only` | tout le film | liste de chapitres joués, ex. `['AgentIA']` — les cues sont recalculées |
| `showGrid` | `true` | sol en perspective |
| `showChapterLabels` | `true` | étiquette « 01 / 05 — AGENT IA » en haut à gauche |
| `fit` | `'width'` | `'width'` : 16/9 fluide ; `'contain'` : tient dans un conteneur à hauteur fixe |
| `loop` | `true` | boucle |
| `rate` | `1` | vitesse ; **`0` = image fixe** (tier de performance bas) |
| `posterTime` | `26.5` | seconde affichée en image fixe (fin du chapitre Agent IA) |

## Contrainte de lisibilité — à lire avant de choisir la largeur

Le film est composé pour 1920 px de large. Le facteur d'échelle est `largeur du slot / 1920` ;
tous les corps de texte suivent.

- **Slot ≥ 1380 px** (échelle ≥ 0,72) : film complet, tous les chapitres lisibles. Situation idéale.
- **Slot 1040–1380 px** : les interfaces denses (CRM, application métier, site web) deviennent
  de la texture. Jouer une coupe courte centrée sur les objets larges :
  `only={['Intro', 'AgentIA', 'Final']}`.
- **Slot < 1040 px** (donc la plupart des colonnes « à droite du titre » en 1280–1440 px d'écran) :
  ne pas afficher le film complet. Deux options, au choix du site :
  1. `only={['AgentIA']}` — le téléphone reste lisible jusqu'à ~900 px ;
  2. donner au film **toute la largeur de la section, sous le titre**, en dessous de `lg`.

C'est la seule vraie adaptation demandée par le passage « plein cadre → colonne de hero » :
l'animation ne perd rien, c'est la densité de texte qui ne descend pas plus bas. Recommandation :
titre à gauche sur 40 % de la largeur, film sur 60 %, conteneur de section élargi
(`max-w-[1600px]`) pour rester au-dessus de 1040 px sur desktop, et bascule pleine largeur
sous `lg`.

## Performance

- Une seule horloge `requestAnimationFrame` → un `setState` par frame, un seul arbre React.
  Pas de WebGL, pas de `motion`, pas de canvas.
- **Pause automatique** hors écran (`IntersectionObserver`, seuil 5 %) et quand l'onglet est
  masqué : aucune frame calculée pour rien.
- **`prefers-reduced-motion: reduce`** → image fixe à `posterTime`, horloge non démarrée.
- **Tiers de performance du site** : tier bas → `rate={0}` (image fixe, coût nul) ; tier moyen →
  `only={['AgentIA']}` ; tier haut → film complet.
- LCP : monter en `dynamic(..., { ssr: false })` avec le placeholder `aspect-video` ci-dessus —
  le LCP reste le titre, pas le film.
- Tout est en `transform` / `opacity` sur des éléments positionnés en absolu ; un seul
  `will-change: transform` sur le plan.

## Jetons de design

**Couleurs** — `ink #eef3ff` · `dim #a6b4d6` · `faint #6f80a8` · `cyan #3ad8ff` ·
`blue #4a7dff` · `indigo #6b6cf6` · `violet #a68cff` · `mint #6ef0c8` ·
fond `#04050d` → `#070a1b`.
Un accent par chapitre : cyan (Agent IA), violet (Automatisation), mint (Mémoire),
blue (Site web), indigo (Application).

**Matières** (`MAT` dans `film-core.tsx`) : `dark` panneau logiciel sombre · `glass` objet de
données · `light` interface claire (CRM, agenda) · `paper` document papier avec épaisseur.
Chaque objet reçoit une ombre portée au sol (`Obj`), les panneaux ont une épaisseur physique
(ombres empilées de 2 à 6 px).

**Rythme** : entrée d'objet 0,8–1,2 s · lecture 1–1,5 s · action suivante 0,7–1 s ·
image finale de chapitre 2 s. Easings : `easeOutCubic` (entrées), `easeInCubic` (sorties),
`easeInOutCubic` (déplacements), `easeOutBack` (apparitions ponctuelles).

## TypeScript & lint

`film-core.tsx`, `film-chapters-a.tsx` et `film-chapters-b.tsx` portent `// @ts-nocheck` et
`/* eslint-disable */` en tête. C'est **volontaire** : ce sont des modules de rendu fermés
(aucune API typée exposée, aucune donnée externe), où les tableaux de composition
(`[['09:00', 'Installation', 15.4], …]`) servent de partition. Les typer ligne à ligne ferait
diverger le code du prototype sans rien sécuriser. La surface publique — `SolutionsFilm.tsx` et
`film-runtime.tsx` — est, elle, **entièrement typée et vérifiée par `tsc --noEmit`**.

Si la règle du dépôt l'exige, les trois fichiers peuvent être déclarés en exception dans
`eslint.config` plutôt qu'avec le commentaire en tête.

Un point d'attention : `React.useMemo(..., [only && only.join(',')])` dans
`film-runtime.tsx` / `SolutionsFilm.tsx` déclenchera `react-hooks/exhaustive-deps`. La
dépendance est volontaire (comparaison par valeur d'un tableau de props).

## Vérification attendue après intégration

1. `npx tsc --noEmit && pnpm lint`
2. Les sept chapitres s'enchaînent, la scène est **vide** entre deux chapitres.
3. À la fin du chapitre 01, la ligne téléphone → CRM → agenda → équipe est alignée et les
   connexions partent bien des bords des objets (elles sont calculées depuis les positions
   animées, pas codées en dur).
4. Chapitre 04 : le curseur touche le bouton « Prendre rendez-vous », puis le champ nom, puis
   le créneau 14:00 — jamais le vide.
5. Onglet masqué ou film hors écran : plus aucune frame (vérifiable au profiler).
6. `prefers-reduced-motion` : image fixe, lisible, aucune animation.
