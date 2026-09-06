# Performance

> La performance est la **priorité n°1** du projet : le site doit rester fluide sur un PC
> d'entrée de gamme comme sur un Mac. Tout ce qui suit est un mécanisme en place,
> pas une intention.

---

## 1. Le socle : trois tiers automatiques

Le site détecte l'appareil et pose `<html data-perf="full | reduced | minimal">`.

| Tier | Déclencheurs | Ce qui change |
|---|---|---|
| `full` | desktop confortable | tout est actif |
| `reduced` | mobile, pointeur grossier (`pointer: coarse`), largeur < 768 px, ≤ 4 Go de RAM, ≤ 4 cœurs | décor de fond coupé, parallax et tilt désactivés, boucles infinies décoratives arrêtées. **Les reveals de cartes et de sections restent** |
| `minimal` | `prefers-reduced-motion`, `save-data`, connexion 2G/3G, ou FPS effondré en cours de session | tout statique : fonds fixes, animations de contenu coupées, `backdrop-filter` désactivé |

**Le tier ne remonte jamais** en cours de session (cliquet à sens unique, persisté en `sessionStorage` sous `s2ia-fps-tier`).

### Les trois pièces

| Fichier | Rôle |
|---|---|
| `lib/animation/usePerformanceMode.ts` | **store singleton** (`useSyncExternalStore`) : un seul jeu de listeners `matchMedia` pour tout le site, un seul écrivain de `data-perf`. |
| `lib/animation/fpsGuard.ts` | mesure le FPS après le chargement (2,5 s de chauffe) et rétrograde le tier s'il s'effondre. Démarré par `AppShell` une fois le `LoadingScreen` terminé. |
| Script inline dans `app/layout.tsx` | recalcule le tier **avant le premier paint** pour éviter le flash. ⚠️ **Ses seuils doivent rester synchronisés avec `usePerformanceMode.ts`.** |

### L'utiliser dans un composant

```tsx
const {
  tier,                        // "full" | "reduced" | "minimal"
  shouldHideBackgroundDecor,   // tier !== "full" → couper le décor de fond
  disableContentMotion,        // reduced-motion OU tier "minimal" → rendre l'état FINAL statique
  shouldReduceMotion,          // le réglage OS de l'utilisateur, seul
  mounted,
} = usePerformanceMode();
```

> Piège : **mobile seul n'implique jamais `disableContentMotion`.** Les reveals de cartes
> restent actifs sur iPhone : c'est une intention explicite (commit `4ecd29e`), pas un oubli.

Le CSS complète le React en fin de `app/globals.css` : `html[data-perf="reduced"]` coupe les
`backdrop-blur` lourds, `html[data-perf="minimal"]` fige les animations et masque tout ce qui
porte `data-decor="particles | orbs | grid | floor | float-lines | halo | neural"`.

---

## 2. Les règles d'animation

1. **`transform` et `opacity` uniquement.** Jamais `width`, `height`, `top`, `left` : ça force
   un recalcul de mise en page à chaque image. Une barre qui grandit se fait en `scaleX`
   (avec `transform-origin` et une contre-échelle sur le contenu si besoin).
2. **Ressorts plutôt que durées fixes** pour tout ce qui suit la souris.
3. **`useMotionValue` / `useTransform` / `useSpring`** plutôt que `useState` pour la position
   de la souris : zéro re-render React.
4. **`will-change` ciblé** et `contain: strict` sur les couches `fixed` de fond.
5. **Pause hors écran** : `PauseOffscreen` + `useInViewPause` (`lib/animation/inViewPause.tsx`)
   arrêtent les boucles infinies des composants sortis du viewport.
6. **Reveal standard** : `staggerContainer` sur le parent, `fadeInUp` sur les enfants,
   `viewport={{ once: true, margin: "-80px" }}`. Variants dans `lib/animation/variants.ts`
   (`fadeInUp`, `fadeIn`, `scaleIn`, `staggerContainer`, `slideInLeft`, `slideInRight`).
7. **Easing de marque** : `cubic-bezier(0.16, 1, 0.3, 1)`, exposé en `--ease-premium`.

---

## 3. Le LCP : ce qu'il ne faut surtout pas casser

Le LCP est passé de 7,6 s à ~1,8 s. Le mécanisme est fragile :

- **`PageHero` et `HeroSection` peignent leur `h1` et leur sous-titre en CSS pur**
  (classe `.hero-enter` + variable `--enter-delay`), **avant l'hydratation**.
  Y remettre une animation JS depuis `opacity: 0` referait remonter le LCP à ~8 s.
- **`PageTransition` a `initial={false}`** pour la même raison : pas d'`opacity: 0` au SSR.
- **La home est un Server Component** ; ses sections sous la ligne de flottaison sont en
  `dynamic()` avec `ssr: true` par défaut : le contenu reste dans le HTML (SEO intact),
  seul le JS arrive plus tard.
- **`LoadingScreen` est court-circuité sur mobile** (il coûtait ~320 ms sur le chemin critique).

### Piège de mesure

Le mode par défaut de PageSpeed Insights (« simulated throttling » / lantern) affiche un LCP
pessimiste de 7 à 8 s parce qu'il modélise mal les animations CSS pré-hydratation.
La réalité utilisateur, et **CrUX (ce que Google utilise réellement pour classer)**, est à
1,5-2,2 s. Se fier à CrUX et aux traces DevTools, jamais au chiffre lantern.

---

## 4. Le chargement

| Règle | Application |
|---|---|
| Scènes de hero en `dynamic()` | `AIBrainScene`, `WebScene`, `AppScene`, `AutomationScene` |
| Méga-sections en `dynamic()` avec `ssr: true` | home, `/applications`, `/agents-ia` |
| `optimizePackageImports` | `motion`, `lucide-react`, `radix-ui`, `@vercel/*` |
| Images | `next/image` obligatoire, AVIF/WebP, `priority` uniquement sur le LCP |
| Vidéos | `preload="metadata"` + `poster`, ou `<Player>` Remotion en lazy |
| Cache | un an immuable sur `/_next/static`, 30 jours sur `/branding` |

---

## 5. Résultats mesurés (juillet 2026, mobile)

| Métrique | Avant | Après |
|---|---|---|
| LCP | 7,6 s | **1,5 s** (trace Chrome) / 2,2 s (Lighthouse throttling réel) |
| Performance Lighthouse | 70 | **94** |
| CLS | 0,003 | 0,005 |
| TBT | 300 ms | 20-170 ms |
| Speed Index | 11,2 s | 2,8-4,2 s |

---

## 6. Les fichiers à surveiller

Les composants les plus lourds du dépôt. Toute évolution y coûte cher :

| Fichier | LOC |
|---|---|
| `components/sections/agents-ia/OneAgentManyNeedsPipeline.tsx` | 1 045 |
| `components/sections/applications/sectorDashboards.tsx` | 1 042 |
| `components/sections/applications/AppDigitizationPipeline.tsx` | 1 033 |
| `components/sections/rag/RagUsageSchema.tsx` | 761 |
| `components/scenes/ai/AIBrainScene.tsx` | 708 |
| `components/sections/automation/AutomationPipeline.tsx` | 699 |

L'agent `component-splitter` (ou `/split-composant <path>`) est fait pour les découper
sans régression.

---

## 7. Vérifier

```bash
npx tsc --noEmit && pnpm lint     # à préférer en cours de dev
pnpm exec playwright test
```

> ⚠️ **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne** : le build écrase
> le `.next` du serveur de dev et casse le site en local.
