# Solutions 2IA — Documentation d'architecture & design

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Stack technique](#stack-technique)
3. [Architecture des fichiers](#architecture-des-fichiers)
4. [Design system](#design-system)
5. [Système d'animation](#système-danimation)
6. [Page d'accueil — Sections détaillées](#page-daccueil--sections-détaillées)
7. [Composants réutilisables](#composants-réutilisables)
8. [Performance & accessibilité](#performance--accessibilité)
9. [Tests](#tests)
10. [Évolutions futures](#évolutions-futures)

---

## Vue d'ensemble

Solutions 2IA est un site vitrine premium single-page construit autour d'une **navigation par ancres** (#services, #expertise, #process, #showcase, #contact). L'ensemble du site est rendu côté client (`"use client"`) pour permettre les animations Motion et GSAP.

**Philosophie :** pas d'images externes, pas de librairies UI tierces. Tous les visuels sont construits en **CSS + SVG + composants React animés**, ce qui garantit un contrôle total sur le rendu, le poids et les performances.

**Flux de données :** aucun backend, aucun CMS. Le contenu est codé en dur dans chaque composant de section. Les données sont structurées en tableaux typés TypeScript au sein de chaque fichier.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **Next.js** | 15.5 | Framework React, App Router, SSG |
| **React** | 19.0 | UI library |
| **TypeScript** | 5.9 | Typage strict |
| **Tailwind CSS** | 4.2 | Utility-first CSS via `@theme` directives |
| **Motion** | 12.6 | Micro-interactions, reveal au scroll, hover states |
| **GSAP + ScrollTrigger** | 3.12 | Scroll storytelling, animations complexes |
| **Playwright** | 1.58 | Tests end-to-end |
| **pnpm** | 10.x | Package manager |

### Pourquoi ce choix

- **Motion** (ex Framer Motion) : API déclarative parfaite pour les `whileInView`, `whileHover`, `AnimatePresence`. Léger et intégré nativement à React.
- **GSAP** : puissance brute pour les timelines liées au scroll. Utilisé uniquement là où Motion ne suffit pas (ProcessSection timeline).
- **Tailwind v4** : les design tokens sont définis via `@theme` directement dans `globals.css`, sans fichier `tailwind.config.ts`. Plus simple, plus centralisé.

---

## Architecture des fichiers

```
SiteSolutions2ia/
├── app/
│   ├── globals.css              # Design tokens + utilitaires CSS
│   ├── layout.tsx               # Layout racine (HTML, fonts, SEO)
│   └── page.tsx                 # Page d'accueil (assemblage des sections)
│
├── components/
│   ├── ui/                      # Atomes du design system
│   │   ├── Button.tsx           # Bouton polymorphe (lien ou button)
│   │   ├── GlowCard.tsx         # Carte avec effet glow au hover
│   │   └── SectionHeading.tsx   # Titre de section réutilisable
│   │
│   ├── layout/                  # Shell du site
│   │   ├── Header.tsx           # Navigation fixe + menu mobile
│   │   └── Footer.tsx           # Pied de page
│   │
│   ├── hero/                    # Section héro
│   │   ├── HeroSection.tsx      # Texte + CTA + stats
│   │   └── HeroVisual.tsx       # Composition visuelle animée
│   │
│   ├── sections/                # Sections de contenu
│   │   ├── ServicesSection.tsx   # Grille des 6 services
│   │   ├── BenefitsSection.tsx  # 4 métriques d'impact business
│   │   ├── ExpertiseSection.tsx # 6 points de différenciation
│   │   ├── ProcessSection.tsx   # Timeline 6 étapes (GSAP)
│   │   ├── ShowcaseSection.tsx  # Mockups dashboard/mobile/IA
│   │   └── CTASection.tsx       # Appel à l'action final
│   │
│   ├── animations/              # (réservé) composants d'animation
│   ├── visuals/                 # (réservé) éléments visuels avancés
│   └── robot/                   # (réservé) futur robot IA
│
├── lib/
│   ├── animation/
│   │   ├── variants.ts          # Variants Motion réutilisables
│   │   └── gsap-config.ts       # Initialisation GSAP + ScrollTrigger
│   └── utils/
│       └── cn.ts                # Utilitaire de classnames
│
├── tests/
│   └── homepage.spec.ts         # Tests Playwright de base
│
├── public/
│   ├── images/                  # (réservé) assets images
│   ├── icons/                   # (réservé) icônes custom
│   ├── branding/                # (réservé) logos, favicons
│   └── visuals/                 # (réservé) assets visuels avancés
│
├── CLAUDE.md                    # Directives pour l'IA
├── ARCHITECTURE.md              # Ce fichier
├── playwright.config.ts         # Configuration Playwright
├── next.config.ts               # Configuration Next.js
├── postcss.config.mjs           # PostCSS (Tailwind v4)
├── tsconfig.json                # TypeScript
└── package.json                 # Dépendances et scripts
```

### Convention de nommage

| Type | Convention | Exemple |
|---|---|---|
| Composants | PascalCase | `HeroSection.tsx` |
| Utilitaires | camelCase | `variants.ts` |
| Dossiers | kebab-case ou camelCase | `animation/`, `utils/` |
| CSS classes custom | kebab-case | `.glow-accent`, `.bg-grid` |
| Design tokens | kebab-case avec préfixe | `--color-accent-primary` |

---

## Design system

### Palette de couleurs

Le site utilise un système de couleurs sombre et futuriste, défini dans `globals.css` via la directive Tailwind `@theme`.

#### Fonds
| Token | Valeur | Usage |
|---|---|---|
| `bg-primary` | `#050509` | Fond principal du site |
| `bg-secondary` | `#0a0a14` | Sections alternées (Benefits, Process, CTA) |
| `bg-tertiary` | `#0f0f1e` | Éléments encastrés dans les cartes |
| `bg-card` | `#0d0d1a` | Fond des cartes |
| `bg-card-hover` | `#12122a` | Cartes au survol |

#### Accents
| Token | Valeur | Usage |
|---|---|---|
| `accent-primary` | `#6366f1` | Couleur principale (boutons, bordures, glows) |
| `accent-light` | `#818cf8` | Version claire (texte accent, labels) |
| `accent-dark` | `#4f46e5` | Version foncée (hover bouton primary) |
| `cyan` | `#22d3ee` | Accent secondaire (gradients, détails) |

#### Texte
| Token | Valeur | Usage |
|---|---|---|
| `text-primary` | `#f0f0f5` | Titres, texte principal |
| `text-secondary` | `#a0a0b8` | Paragraphes, descriptions |
| `text-tertiary` | `#6b6b82` | Labels, metadata, texte discret |
| `text-accent` | `#818cf8` | Texte accentué (liens, badges) |

#### Bordures
| Token | Valeur | Usage |
|---|---|---|
| `border-subtle` | `rgba(255,255,255,0.06)` | Séparations discrètes |
| `border-medium` | `rgba(255,255,255,0.1)` | Bordures de cartes |
| `border-accent` | `rgba(99,102,241,0.3)` | Bordures accentuées (hover, panels IA) |

### Typographie

- **Inter** (300–800) : police principale pour tout le contenu
- **JetBrains Mono** (400–500) : police monospace pour les snippets de code et les numéros

**Échelle responsive des titres :**
```
h1 : text-4xl → sm:text-5xl → lg:text-6xl → xl:text-7xl
h2 : text-3xl → sm:text-4xl → lg:text-5xl
h3 : text-lg → text-xl
```

### Effets visuels (classes utilitaires)

| Classe | Effet |
|---|---|
| `.text-gradient` | Gradient indigo→cyan sur le texte |
| `.glow-accent` | Box-shadow diffuse violette |
| `.glow-line` | Ligne horizontale gradient (séparateur de sections) |
| `.bg-grid` | Grille de fond 60×60px semi-transparente |
| `.bg-noise` | Texture de bruit SVG (pseudo-élément ::before) |

### Transitions

Toutes les animations utilisent la même courbe d'ease premium :
```
cubic-bezier(0.16, 1, 0.3, 1)
```
C'est une courbe "ease-out expo" qui donne un démarrage rapide et une décélération douce et naturelle.

---

## Système d'animation

### Architecture à deux niveaux

```
┌──────────────────────────────────────────────────┐
│                    Motion (motion/react)           │
│                                                    │
│  • whileInView → reveal au scroll                 │
│  • whileHover / whileTap → micro-interactions     │
│  • AnimatePresence → menu mobile                  │
│  • variants → animations orchestrées              │
│  • animate → boucles infinies (floating panels)   │
│                                                    │
│  Utilisé dans : TOUS les composants               │
├──────────────────────────────────────────────────┤
│                GSAP + ScrollTrigger               │
│                                                    │
│  • ScrollTrigger scrub → timeline au scroll       │
│  • gsap.fromTo → animation de la ligne verticale  │
│                                                    │
│  Utilisé dans : ProcessSection uniquement          │
│  Chargement : import dynamique (lazy)             │
└──────────────────────────────────────────────────┘
```

### Variants Motion réutilisables (`lib/animation/variants.ts`)

| Variant | Effet | Durée |
|---|---|---|
| `fadeInUp` | Opacité 0→1, Y +30→0 | 0.6s |
| `fadeIn` | Opacité 0→1 | 0.6s |
| `scaleIn` | Opacité 0→1, Scale 0.95→1 | 0.5s |
| `staggerContainer` | Orchestre les enfants (stagger 0.1s, delay 0.1s) | — |
| `slideInLeft` | Opacité 0→1, X -40→0 | 0.6s |
| `slideInRight` | Opacité 0→1, X +40→0 | 0.6s |

### Pattern d'animation standard

Chaque section suit le même pattern :
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  <motion.div variants={fadeInUp}>...</motion.div>
  <motion.div variants={fadeInUp}>...</motion.div>
</motion.div>
```

- `once: true` → l'animation ne se joue qu'une seule fois
- `margin: "-80px"` → se déclenche 80px avant que l'élément entre dans le viewport

### GSAP — Scroll Timeline (ProcessSection)

```
Déclencheur : le parent de la ligne verticale entre dans le viewport
Début : top de l'élément à 60% de la fenêtre
Fin : bottom de l'élément à 40% de la fenêtre
Scrub : 1 (suit le scroll avec un léger lissage)
Animation : scaleY de 0 à 1 (la ligne "pousse" vers le bas)
```

GSAP est importé dynamiquement pour ne pas alourdir le bundle initial :
```ts
const { gsap, ScrollTrigger } = await import("@/lib/animation/gsap-config");
```

---

## Page d'accueil — Sections détaillées

### 1. Header (`components/layout/Header.tsx`)

**Comportement :**
- Position fixe (`fixed top-0`), z-index 50
- Transparent au repos, backdrop-blur + fond semi-transparent au scroll (>20px)
- Animation d'entrée : slide down + fade in

**Desktop :**
```
[ Logo: Solutions 2IA ]  [ Services  Expertise  Méthode  Réalisations ]  [ Démarrer un projet → ]
```

**Mobile :**
- Hamburger animé (3 lignes → croix avec rotation Motion)
- Menu plein écran avec overlay blur
- Liens animés en cascade (stagger 0.1s)
- Verrouillage du scroll (`overflow: hidden`) quand ouvert

**Navigation :**
| Lien | Ancre |
|---|---|
| Services | `#services` |
| Expertise | `#expertise` |
| Méthode | `#process` |
| Réalisations | `#showcase` |
| Démarrer un projet | `#contact` |

---

### 2. Hero Section (`components/hero/HeroSection.tsx` + `HeroVisual.tsx`)

**La section la plus importante du site.** Layout en deux colonnes sur desktop, empilé sur mobile.

#### Colonne gauche — Contenu

1. **Badge de statut** : pastille verte pulsante + "Studio digital & intelligence artificielle"
2. **Titre h1** : "Des expériences digitales **intelligentes**" (gradient sur le dernier mot)
3. **Sous-titre** : proposition de valeur en une phrase
4. **Deux CTA** : Primary "Démarrer un projet →" + Secondary "Découvrir nos services"
5. **Stats rapides** : IA | Web | Auto (séparées par des lignes verticales)

**Animations d'entrée :** séquence staggerée de haut en bas avec délais croissants (0.1s → 0.6s).

#### Colonne droite — Composition visuelle (`HeroVisual.tsx`)

Une scène composée de **6 panels flottants** positionnés en absolu dans un conteneur de 420–560px de hauteur :

```
    ┌─────────────┐       ┌──────────┐
    │ Dashboard IA│       │ Perf.    │       ┌─────────┐
    │ bars + stats│       │ barchart │       │ Mobile  │
    └─────────────┘       └──────────┘       │ App     │
                                              └─────────┘
         ╲ ─ ─ ─ SVG connections ─ ─ ─ ╱

              ┌─────────────────────┐
              │  Agent IA actif     │
    ┌────────┐│  ✓ Analyse terminée │
    │ Code   ││  ✓ Auto. déployée  │
    │ editor ││  ● Optimisation... │
    └────────┘└─────────────────────┘
```

**Détail des panels :**

| Panel | Position | Contenu | Animation spéciale |
|---|---|---|---|
| Dashboard IA | top-left | 4 barres de données + 2 stats | Barres avec scaleX staggeré |
| Performance | top-center (lg only) | 10 colonnes de bar chart | Hauteur animée séquentiellement |
| App Mobile | top-right | Frame smartphone avec UI mock | Floating bob (5s) |
| Agent IA | bottom-center | 3 lignes de statut (2 ✓ + 1 en cours) | Apparition séquentielle + pulse |
| Code Editor | bottom-left (sm+) | 3 lignes de pseudo-code coloré | Apparition ligne par ligne |
| SVG Connections | overlay | 2 courbes + 1 cercle pulsant | pathLength animation |

**Chaque panel** est enveloppé dans `FloatingPanel` qui applique :
- Animation d'entrée (opacity + y + scale)
- Animation perpétuelle de flottement (y: [0, -6, 0] sur 5–7s)

**Fond :** grille CSS semi-transparente + deux radial glows (accent + cyan) + gradient de fondu en bas.

---

### 3. Services (`components/sections/ServicesSection.tsx`)

**Grille de 6 cartes** (1 col mobile, 2 cols tablette, 3 cols desktop).

| Service | Icône SVG | Description clé |
|---|---|---|
| Sites web premium | Écran moniteur | Design, animations, performance, conversion |
| Applications | Smartphone | Web et mobile, UX irréprochable, architecture solide |
| Agents IA | Silhouette robot | Assistants intelligents, analyse, automatisation |
| Automatisation | Engrenage soleil | Workflows, intégrations, gain d'heures |
| UI / UX Design | Couches empilées | Pixel-perfect, interactions fluides |
| Expériences visuelles | Étoile | Animations, motion, 2D/3D, univers immersifs |

**Implémentation :** chaque carte utilise `GlowCard` (bordure subtle → accent au hover, fond qui s'éclaircit, shadow glow). L'icône est dans un carré 48px avec fond `accent-glow` et bordure accent.

---

### 4. Bénéfices (`components/sections/BenefitsSection.tsx`)

**4 colonnes de métriques** sur fond `bg-secondary` avec une ligne glow en haut.

| Métrique | Valeur | Message |
|---|---|---|
| Gain de temps | **73%** | Automatisez les tâches répétitives |
| Meilleure conversion | **×3** | Un site premium transforme les visiteurs |
| Agents IA actifs | **24/7** | Vos assistants travaillent sans interruption |
| Sur mesure | **100%** | Pas de templates, du code pensé pour vous |

**Rendu :** les chiffres utilisent `.text-gradient` (gradient indigo→cyan), ce qui crée un effet visuel fort.

---

### 5. Expertise (`components/sections/ExpertiseSection.tsx`)

**6 blocs numérotés** (01–06) avec ligne d'accent verticale à gauche.

Chaque bloc a :
- Un trait vertical gradient (accent-primary/60 → transparent)
- Un halo de blur (5px) en haut de la ligne
- Un numéro en font mono + couleur accent
- Un titre + une description

**Layout :** 3 colonnes desktop, 2 tablette, 1 mobile. Gap vertical de 48px (3rem).

---

### 6. Process / Méthode (`components/sections/ProcessSection.tsx`)

**Timeline verticale de 6 étapes** avec layout alterné gauche-droite sur desktop.

```
            01 Découverte ─────── ●
                                  │  ← ligne animée par GSAP
      ● ─────── 02 Stratégie     │
                                  │
            03 Design ─────────── ●
                                  │
      ● ─────── 04 Développement │
                                  │
       05 IA & Automatisation ── ●
                                  │
      ● ─── 06 Livraison         │
```

**Ligne verticale :** deux layers superposés :
1. Fond statique `border-subtle` (toujours visible)
2. Gradient animé `accent-primary → cyan → accent-primary` avec `scaleY` contrôlé par ScrollTrigger

**Points :** cercles 12px avec bordure accent-primary et fond bg-primary.

**Mobile :** tous les contenus sont à droite de la ligne (pas d'alternance).

---

### 7. Showcase (`components/sections/ShowcaseSection.tsx`)

**3 mockups interactifs** dans une grille 12 colonnes (7 + 5).

#### MockDashboard (7 cols)
- Barre de titre avec traffic lights (rouge/jaune/vert) + URL
- Grille de 3 stats (Utilisateurs: 12,847, Revenus: €47.2K, Conversion: 8.4%)
- Graphique à barres (24 colonnes, hauteurs calculées avec sin + random)

#### MockMobileApp (5 cols, haut)
- Barre de statut iPhone (9:41)
- Card de contenu avec gradient
- 3 lignes de liste avec icônes
- Tab bar avec 4 icônes

#### MockAIChat (5 cols, bas)
- Avatar IA avec gradient + statut "En ligne"
- 3 messages de conversation (bot → user → bot)
- Style : bulles arrondies avec coins asymétriques

**Tags de technologies :** 12 badges en flex-wrap sous les mockups (Next.js, React, TypeScript, Agents IA, GSAP, Motion Design, Tailwind CSS, Automatisation, 2D/3D, Remotion, Rive, API REST).

---

### 8. CTA Final (`components/sections/CTASection.tsx`)

- Fond `bg-secondary` avec glow central (500px, accent-primary/5, blur 120px)
- Badge : "Prêt à démarrer ?"
- Titre : "Donnons vie à votre **prochain projet**" (gradient)
- Description : invitation à discuter
- Deux boutons : "Prendre contact →" (mailto) + "Revoir les services"
- Ligne de réassurance : "Réponse sous 24h — Premier échange offert — Sans engagement"

---

### 9. Footer (`components/layout/Footer.tsx`)

**4 colonnes** (brand sur 2 cols + 2 groupes de liens).

```
[ Solutions 2IA                          ]  [ Navigation     ]  [ Services        ]
[ Expériences digitales intelligentes... ]  [ Services       ]  [ Sites web       ]
[                                        ]  [ Expertise      ]  [ Applications    ]
[                                        ]  [ Méthode        ]  [ Agents IA       ]
[                                        ]  [ Réalisations   ]  [ Automatisation  ]
─────────────────────────────────────────────────────────────────────────────────────
[ © 2026 Solutions 2IA. Tous droits réservés.        Conçu et développé par S2IA  ]
```

---

## Composants réutilisables

### Button

```tsx
<Button variant="primary" size="lg" href="#contact">
  Démarrer un projet
</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Style visuel |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Taille (padding + font) |
| `href` | `string?` | — | Si présent, rend un `<a>` au lieu d'un `<button>` |
| `onClick` | `() => void?` | — | Handler de clic |
| `disabled` | `boolean?` | — | État désactivé |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Type HTML |

**Animation :** scale 1.02 au hover, 0.98 au tap (Motion).

### GlowCard

```tsx
<GlowCard hover={true} className="p-8">
  <h3>Titre</h3>
  <p>Description</p>
</GlowCard>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenu de la carte |
| `hover` | `boolean?` | `true` | Active l'effet glow au survol |
| `className` | `string?` | — | Classes additionnelles |

**Effet hover :** bordure passe de `border-subtle` à `border-accent`, fond s'éclaircit, shadow glow apparaît.

### SectionHeading

```tsx
<SectionHeading
  label="Services"
  title="Des solutions digitales complètes"
  description="De la conception au déploiement..."
  centered={true}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string?` | — | Badge au-dessus du titre |
| `title` | `string` | — | Titre principal (h2) |
| `description` | `string?` | — | Paragraphe de description |
| `centered` | `boolean?` | `true` | Centrage horizontal |

---

## Performance & accessibilité

### Performance

| Mesure | Valeur |
|---|---|
| Page JS | 50.1 kB |
| First Load JS | 152 kB |
| Rendu | Static (SSG) |
| Images | Aucune (tout en CSS/SVG) |
| GSAP | Import dynamique (lazy) |
| Scroll listener | `{ passive: true }` |

### Accessibilité

- **`prefers-reduced-motion`** : toutes les animations sont désactivées via une media query globale dans `globals.css`
- **Sémantique HTML** : `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- **Contraste** : texte `#f0f0f5` sur fond `#050509` → ratio > 15:1
- **Menu mobile** : `aria-label="Menu"` sur le bouton hamburger
- **Scroll lock** : `overflow: hidden` sur body quand le menu mobile est ouvert

---

## Tests

### Playwright (`tests/homepage.spec.ts`)

5 tests de smoke couvrant les éléments critiques :

| Test | Vérifie |
|---|---|
| Hero heading | Le `h1` est visible et contient "digitales" |
| Header logo | Le `header` est visible et contient "Solutions" |
| Services section | L'élément `#services` est attaché au DOM |
| CTA section | L'élément `#contact` est attaché au DOM |
| Footer | Le `footer` est visible et contient "Solutions 2IA" |

**Lancer les tests :**
```bash
pnpm exec playwright test
```

---

## Évolutions futures

Les dossiers suivants sont réservés pour de futures extensions :

| Dossier | Usage prévu |
|---|---|
| `components/animations/` | Composants d'animation réutilisables (parallax, reveal custom) |
| `components/visuals/` | Éléments visuels avancés (particles, scenes) |
| `components/robot/` | Robot IA 2D/3D (Rive, Lottie, ou Three.js) |
| `components/dashboard/` | Composants de dashboard interactifs |
| `components/mobile/` | Composants de simulation mobile |
| `public/images/` | Photos, illustrations |
| `public/icons/` | Icônes SVG custom |
| `public/branding/` | Logo, favicon, OG image |
| `public/visuals/` | Assets visuels (Rive, Lottie, vidéos) |

### Pistes d'amélioration

- **Robot IA animé** dans la Hero (Rive ou Lottie)
- **Particles WebGL** en fond (via tsparticles ou Three.js)
- **Cursor custom** avec trailing effect
- **Page transitions** avec AnimatePresence
- **Dark/light mode** (structure de tokens prête)
- **Formulaire de contact** avec validation et envoi
- **Internationalisation** (fr/en)
- **CMS headless** pour le contenu (Sanity, Strapi)
- **Analytics** (Plausible, Vercel Analytics)
