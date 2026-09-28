# Chantier · cartes en verre et schémas

**Ouvert le 17 septembre 2026** · dernière mise à jour : 18 septembre 2026
Demande client : remplacer les cartes actuelles par des cartes à effet verre dépoli
(« bulle de verre »), améliorer les schémas, et passer le site **page par page**.

Ce document est le suivi du chantier : il dit où on en est, ce qui est décidé, et ce qui
reste. On le met à jour à chaque page terminée.

---

## 1. La direction retenue

Trois variantes ont été maquettées sur le vrai fond du site (halos indigo, cyan, violet,
grille). Le spotlight, le tilt et la bordure conique de `SpotlightCard` sont conservés dans
les trois cas : c'est la signature de marque.

| Variante | Effet | Ce qu'elle donne |
|---|---|---|
| **A · verre sobre** | flou 18 px, blanc 5 %, liseré clair en haut | le décor respire derrière la carte, lecture inchangée, risque nul |
| **B · bulle lumineuse** | flou 26 px, coins 28 px, reflet spéculaire en haut à gauche, lumière rasante en bas | l'effet « bulle » assumé, le plus spectaculaire, demande un contrôle du contraste |
| **C · verre teinté** | verre teinté par l'accent de la page (indigo, cyan, violet selon le preset) | chaque page garde son identité, cohérent avec les presets existants |

> **Décision du 17 septembre 2026 : variante A, verre sobre.** Première page traitée :
> l'accueil. La teinte par page (variante C) reste ouverte pour plus tard, elle pourra
> s'appuyer sur la prop `glow` déjà passée à `SpotlightCard`.

### Ce qui a été livré pour A

- Nouvelle matière **`.glass-surface`** dans `app/globals.css` : fond blanc à 5,5 %, flou
  18 px, saturation 1,25, liseré clair en haut. Elle ne pose **ni bordure ni rayon ni
  overflow**, donc chaque carte garde les siens et ses états de survol continuent de
  fonctionner. C'est ce qui permet un diff minimal, carte par carte.
- **Le repli qui manquait** : en tier `reduced` et `minimal`, `.glass-card` coupait bien le
  flou mais gardait un fond à 5 % de blanc, donc le texte se retrouvait posé sur le décor.
  Corrigé pour `.glass-surface` **et** pour `.glass-card`, avec en plus un repli
  `@supports not (backdrop-filter)` pour les navigateurs sans flou.

---

## 2. Ce que le passage au verre implique

### Ce qui existe déjà
- `.glass-card` dans `app/globals.css` : flou 18 px, saturation 1,25, liseré interne.
  Déjà désactivé automatiquement en tier `reduced` et `minimal`.
- `SpotlightCard` (`components/ui/SpotlightCard.tsx`) : fond **opaque** `bg-bg-card`.
  C'est la carte utilisée partout, c'est elle qu'on fait évoluer.
- `.surface-card` et `.metric-tile` : surfaces sobres, opaques elles aussi.

### Ce qu'il faut traiter, sinon ça casse
1. **Le repli sans flou.** Sur mobile, PC modeste ou « animations réduites », le flou est
   retiré. Une carte translucide sans flou laisse le texte sur le décor brut : illisible.
   Chaque variante doit donc avoir un fond de repli presque opaque (validé en maquette).
2. **Le contraste du texte.** À mesurer sur la carte la plus claire, au-dessus d'un halo :
   `text-text-secondary` doit rester au-dessus de 4,5:1.
3. **Le coût GPU.** `backdrop-filter` est cher, et une grille en compte jusqu'à 6 ou 8.
   Règle retenue : **le verre s'applique aux cartes de contenu, pas aux petites tuiles
   répétées** (`.metric-tile`, pastilles, badges), qui restent opaques.
4. **`-webkit-backdrop-filter` ne s'écrit jamais à la main** : Lightning CSS supprimerait
   la version standard et Chrome perdrait l'effet.
5. **Les surfaces papier** (maquettes d'application, `bg-paper*`) ne passent pas au verre :
   elles imitent une interface claire posée sur le site sombre, c'est volontaire.

---

## 3. L'ordre de passage, page par page

Une page = une passe complète : cartes, schéma(s), et les améliorations de contenu
repérées. On ne passe à la suivante qu'une fois la précédente validée.

| # | Page | Pourquoi ce rang | État |
|---|---|---|---|
| 1 | `/` accueil | la plus vue, elle donne le ton du reste | **cartes faites** (17/09) · **constellation faite** (18/09) · reste : flux de transformations et contenu |
| 2 | `/services` | la page pivot : elle distribue vers les cinq services | à faire |
| 3 | `/agents-ia` | la plus dense en schémas, le plus gros gain visuel | à faire |
| 4 | `/sites-web` | beaucoup de cartes, page d'entrée fréquente | à faire |
| 5 | `/applications` + les 6 secteurs | gabarit partagé : une passe sert aux 6 | à faire |
| 6 | `/automatisation` + les 5 secteurs | même logique de gabarit | à faire |
| 7 | `/rag` | 26 fichiers de sections, la plus lourde, à faire quand le motif est rodé | à faire |
| 8 | `/a-propos`, `/contact` | peu de cartes, passage rapide | à faire |
| 9 | `/faq`, `/glossaire`, `/articles` | colonnes de lecture, surtout de la cohérence | à faire |

Les pages légales (`/cgv`, `/confidentialite`, `/cookies`, `/mentions-legales`) gardent
leur fond nu : c'est voulu, elles restent hors chantier.

---

## 4. Ce qu'on regarde sur chaque page

Pour chaque page, la passe suit le skill `frontend-design` et couvre quatre points :

1. **Cartes** : passage au verre choisi, cohérence des rayons et des ombres, densité de la
   grille, profondeur (`translateZ` sur les enfants).
2. **Schémas** : est-ce que le schéma apprend quelque chose en 5 secondes ? Légende
   présente ? Lisible à 390 px ? Statique en tier bas ?
3. **Contenu** : le chiffre qui vient du visiteur, l'exemple situé, la raison d'agir
   maintenant, le prix, la réassurance. C'est le point faible mesuré du site.
4. **Contrôles** : 1440 px et 390 px, `tsc`, `lint`, un seul `h1`, un seul CTA.

---

## 5. Les autres améliorations repérées (hors cartes)

Issues de l'audit de conversion de septembre 2026 (note globale du site : 66/100, le point
faible étant la conversion à 61). Elles seront traitées page par page, pas en bloc.

| Priorité | Ce qui manque | Où ça se joue |
|---|---|---|
| **P1** | **Aucun chiffre** : « gagner du temps » revient partout sans jamais être quantifié. Le calcul devant le visiteur ne demande aucun client. | toutes les pages, section 2 |
| **P1** | **Aucune raison d'agir maintenant** : quatre échéances réglementaires réelles existent et ne sont pas exploitées en haut de page. | accueil, automatisation, applications |
| **P1** | **Les meilleurs arguments sont enterrés** : le pilote 30 jours satisfait ou remboursé n'est que sur `/agents-ia`, en cinquième carte. Les prix ne sont que sur `/services` et `/contact`. | toutes |
| P2 | Les schémas sont beaux mais parfois muets : pas de légende, pas de mot-clé sur les étapes. | agents-ia, automatisation, rag |
| P2 | Deux grilles identiques se suivent sur plusieurs pages : manque de contraste de rythme. | services, sites-web, rag |
| P2 | `TermeExplique` existe mais n'est branché nulle part : c'est le moyen le plus rapide d'expliquer le jargon sans alourdir. | toutes |
| ✅ | ~~Couleurs d'état en dur (`green-400`) restantes dans plusieurs scènes et dans `Footer` et `PageHero`~~ : soldé le 18/09/2026, 55 occurrences migrées vers `success`, `danger`, `warning`. | scènes, layout |
| P3 | Primitives Radix non utilisées (environ 1 300 lignes) et classes CSS mortes dans `globals.css`. | nettoyage global, en fin de chantier |

---

## 6. Les schémas : traitement prévu

Les schémas pédagogiques animés sont une signature du site : **jamais supprimés, refaits en
mieux si besoin.** Le chantier les traite page par page, avec la même grille :

- il montre un mécanisme, pas une décoration
- il se lit sans son texte d'accompagnement
- chaque étape porte un mot, pas seulement une icône
- il tient à 390 px (sinon : version simplifiée, pas version illisible)
- il se fige proprement en tier bas
- il ne rejoue pas ce que dit la section d'à côté

L'inventaire détaillé des schémas par page est annexé en fin de document (section 8).

---

## 7. Journal des décisions

| Date | Décision | Par |
|---|---|---|
| 17/09/2026 | Ouverture du chantier : cartes en verre, schémas, page par page | client |
| 17/09/2026 | Trois variantes maquettées (A sobre, B bulle, C teintée) sur le fond réel du site | Claude |
| 17/09/2026 | Signature conservée dans tous les cas : spotlight, tilt, bordure conique | Claude |
| 17/09/2026 | **Variante A retenue** (verre sobre), première page : l'accueil | client |
| 17/09/2026 | Matière `.glass-surface` créée, repli sans flou corrigé aussi pour `.glass-card` | Claude |
| 17/09/2026 | Nœuds de la constellation laissés opaques : posés sur un schéma, lisibilité prioritaire | Claude |
| 18/09/2026 | Constellation : nœuds en bulles de verre, les cinq services tous reliés entre eux | client |
| 18/09/2026 | Matière `.glass-bubble` créée (verre plus dense + reflet), halo local ajouté derrière le réseau | Claude |
| 18/09/2026 | Correction : le tracé animé des lignes ne se déclenchait jamais (conteneur sans parent animé) | Claude |

---

## 8. Inventaire (annexe)

Relevé du 17 septembre 2026. Il sert de liste de pointage pendant le chantier.

### 8.1 Cartes par route

Constat principal : **`SpotlightCard` n'est pas la carte majoritaire du site.** L'essentiel
des surfaces sont des cartes « maison » (un div avec `bg-bg-card` et une bordure), ce qui
explique les écarts de rayon et d'ombre d'une page à l'autre. Le chantier est donc aussi
une mise en cohérence.

| Route | SpotlightCard | surface-card | metric-tile | glass-card | cartes maison |
|---|---|---|---|---|---|
| `/` | 0 | 0 | 0 | 1 | 6 |
| `/agents-ia` | 2 | 0 | 0 | 0 | 2 gabarits (4 et 6 instances) |
| `/applications` | 3 | 0 | 0 | 0 | 2 |
| `/applications/[secteur]` | 1 | 0 | 1 | 0 | 1 |
| `/automatisation` | 2 | 0 | 0 | 0 | 3 |
| `/automatisation/[secteur]` | 1 | 0 | 0 | 0 | 4 |
| `/rag` | 0 | 1 | 2 | 0 | 9 |
| `/sites-web` | 0 | 0 | 0 | 0 | 6 |
| `/services` | 1 | 0 | 0 | 0 | 2 |
| `/a-propos` | 0 | 0 | 1 | 0 | 2 |
| `/contact` | 0 | 0 | 0 | 0 | 3 |
| `/faq` · `/glossaire` · `/articles` | 0 | 1 | 0 | 0 | 6 |

`RelatedServices.tsx` est une carte maison partagée par 7 routes : la traiter une fois
sert partout. Même logique pour `LegalPage.tsx` sur les 4 pages légales.

### 8.2 État de l'accueil

| Composant | Ligne | Traitement |
|---|---|---|
| `HomeDeadlineBand` | 15 | passée en `.glass-surface` |
| `HomeApproachSplit` (volet « détails techniques ») | 50 | passée en `.glass-surface` |
| `HomeProfileMatrix` (6 profils) | 110 | passée en `.glass-surface` |
| `HomeProofTelecom` (3 étapes) | 47 | passée en `.glass-surface` |
| `HomeServicesConstellation` (repli mobile) | 284 | passée en `.glass-surface` |
| `HomeServicesConstellation` (nœuds du schéma) | 248 | passés en **bulles de verre** (`.glass-bubble`) le 18/09, avec halo derrière |
| `HomeTransformationFlows` | 130 | utilisait déjà `.glass-card`, bénéficie du repli corrigé |

Vérifié : flou actif en tier `full`, repli opaque en `reduced` (mobile) et `minimal`
(animations réduites), aucun débordement horizontal à 390 px, `tsc` et `lint` verts.

**À noter** : le verre se voit surtout là où un halo passe derrière. Dans les zones très
sombres de la page, l'effet est discret. Si tu le veux plus marqué, deux leviers : monter
le blanc de `.glass-surface` de 5,5 % à 7 %, ou déplacer les halos de `PageAtmosphere`
pour qu'ils passent derrière les grilles de cartes.

### 8.3 Schémas animés du site

| Composant | Lignes | Route | Ce qu'il montre |
|---|---|---|---|
| `OneAgentManyNeedsPipeline` | 1043 | /agents-ia | un agent qui absorbe plusieurs besoins en parallèle |
| `AppDigitizationPipeline` | 1031 | /applications | sources éparpillées vers un outil unique |
| `RagUsageSchema` | 761 | /rag | sources, mémoire métier, réponse sourcée |
| `AutomationPipeline` | 705 | /automatisation (+ secteurs) | déclencheur, automatisation, résultat |
| `WebOpportunitySources` | 474 | /sites-web | 9 canaux qui convergent vers le visiteur |
| `RagMemoryFlow` | 390 | /rag | trace animée de la recherche à la réponse citée |
| `WebOpportunityFlow` | 367 | /sites-web | plan vertical en 9 stations |
| `HomeServicesConstellation` | 364 | / | les services reliés au système |
| `AgentAnatomyDiagram` | 326 | /agents-ia | les 4 couches d'un agent fiable |
| `IntegrationsConnect` | 311 | /automatisation | flux déclencheur vers résultat |
| `HomeTransformationFlows` | 310 | / | avant et après, étapes reliées |
| `WebFoundations` | 272 | /sites-web | 4 strates plus 8 piliers |
| `AgentPlan` | 165 | /agents-ia | mini film en 6 scènes |
| `RagInstallSteps` · `RagDecisionWizard` | 123 · 129 | /rag | installation, assistant de décision |

Les scènes de hero (`AIBrainScene`, `AutomationScene`, `AppScene`, `WebScene`) sont du
décor, pas des schémas : elles ne sont pas dans le périmètre du chantier.

### 8.4 Deux trouvailles à traiter pendant le chantier

1. **`.section-intro-panel` floute en permanence** : son `backdrop-filter: blur(16px)` n'est
   coupé par aucune règle `data-perf`, contrairement au reste. Or il est rendu par `CTABand`
   sur **13 routes**. C'est du coût GPU inutile sur mobile. À corriger lors de la passe
   « éléments partagés ».
2. **Quatre sections orphelines** dans `components/sections/rag/` : `RagAvoids`,
   `RagDailyUsage`, `RagRealExamples`, `RagReplaces` ne sont importées nulle part. À
   supprimer ou à réintégrer quand on traitera `/rag`.

### 8.5 Constellation « Cinq services, un seul système » (18/09/2026)

- **Maillage complet** : le schéma reliait chaque service à ses deux voisins et au centre.
  Les 5 diagonales manquaient. Avec elles, les cinq services sont **tous reliés entre eux** :
  5 côtés + 5 diagonales + 5 rayons vers le centre, soit 15 liens. Trois épaisseurs pour que
  ça reste lisible : rayons pleins (le système), côtés pointillés, diagonales plus fines.
- **Bulles de verre** : les 6 nœuds (5 services + le centre) passent en `.glass-bubble`,
  coins très arrondis, reflet en haut à gauche, icône en pastille ronde.
- **Halo local** : deux lumières floues derrière le réseau. Sans elles le verre ne se lisait
  pas, cette zone de la page étant très sombre. Elles portent `data-decor="halo"`, donc
  elles disparaissent automatiquement en tier minimal.
- **Bug corrigé** : le tracé animé des lignes et l'apparition des nœuds ne se déclenchaient
  jamais. Le conteneur desktop recevait des variants mais n'avait aucun parent animé pour
  les piloter. Le commentaire du fichier annonçait pourtant ce comportement depuis l'origine.
- Vérifié : flou actif en tier `full`, repli opaque en `reduced` et `minimal`, aucun
  débordement à 390 px (le mobile garde la grille, pas la constellation), `tsc` et `lint` verts.
