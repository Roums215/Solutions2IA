# `/` · vitrine du système

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 18 septembre 2026 · contre le code de `app/page.tsx`

---

## 1. Ce que fait cette page

C'est la page d'entrée du site : elle présente les cinq services comme un seul système,
montre une preuve réelle (un projet télécoms), et aiguille chaque visiteur vers son profil
métier. Elle ne détaille aucun service en profondeur (c'est le rôle de `/services` et des
pages produit) et ne liste pas les prix par service (seulement trois repères sous le hero
et le prix d'un site vitrine dans le `CTABand` final).

| | |
|---|---|
| Route | `/` |
| Fichiers | `app/page.tsx` (serveur, SEO) · pas de `<Nom>Page.tsx` séparé : le rendu est composé directement dans `page.tsx` à partir de composants de section |
| Preset de décor | `home` (`components/shared/PageAtmosphere.tsx:89-98`) |
| Public visé | tout visiteur, avant qu'il ait choisi un service : la page l'oriente vers son profil ou son besoin |

---

## 2. La promesse affichée

- **Badge** : « Développeur indépendant · web & IA » (`components/hero/HeroSection.tsx:64-66`), pastille verte animée (`bg-success`, passée aux tokens le 18/09/2026)
- **Titre (h1)** : « Des outils qui travaillent pour vous » (`components/hero/HeroSection.tsx:70-77`, retour à la ligne avant « pour vous », qui porte `.text-gradient-strong`)
- **Sous-titre** (élément LCP, peint en CSS avant hydratation) : « Je conçois des sites web, des applications et des automatisations sur mesure. Vous m'expliquez ce qui vous prend du temps, je construis l'outil qui s'en charge. » (`HeroSection.tsx:84-87`)
- **Repères sous le CTA** (3 chiffres réels, aucun résultat client) : « Site vitrine simple · Dès 500 € » · « Réponse à votre message · 24 h » · « Application sur mesure · Dès 1 500 € » (`HeroSection.tsx:123-138`)
- **Niveau 1 (dirigeant de PME)** : la promesse et le sous-titre suffisent, aucun jargon dans le hero
- **Niveau 2 (visiteur averti)** : le volet dépliable « Détails techniques : pour les curieux » de `HomeApproachSplit` (`components/sections/home/HomeApproachSplit.tsx:50-73`) donne la stack (Next.js, React, TypeScript, n8n, Claude, Mistral, PostgreSQL, hébergement UE)

---

## 3. Structure, dans l'ordre

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero : promesse + film de démonstration | `HeroSection` (`components/hero/HeroSection.tsx`), monté à `app/page.tsx:52` | ce que fait Iulian, en une phrase, illustré par un film |
| aside | pourquoi maintenant | Bandeau facture électronique (pas un `h2`, un `aside`) | `HomeDeadlineBand` (`components/sections/home/HomeDeadlineBand.tsx`), monté à `app/page.tsx:55` | une échéance légale réelle et datée, avec un lien vers `/automatisation` |
| 2 | c'est quoi (détail) | Les cinq services reliés en système | `HomeServicesConstellation`, `dynamic()` (`app/page.tsx:22-24`), montée à `app/page.tsx:58` | les cinq services ne sont pas des briques séparées |
| 3 | ce que ça apporte | Quatre transformations avant/après | `HomeTransformationFlows`, `dynamic()` (`app/page.tsx:25-27`), montée à `app/page.tsx:61` | à quoi ressemble le quotidien une fois l'outil en place |
| 4 | preuve | Un projet réel (télécoms) | `HomeProofTelecom`, `dynamic()` (`app/page.tsx:31-33`), montée à `app/page.tsx:64` | un exemple concret, modeste et daté, pas un chiffre de marketing |
| 5 | comment ça marche | Approche + volet technique | `HomeApproachSplit`, `dynamic()` (`app/page.tsx:34-36`), montée à `app/page.tsx:67` | méthode de travail + preuve de compétence technique pour qui veut vérifier |
| 6 | comment ça marche (détail) | Les quatre étapes d'un projet | `PremiumFlowPanel` inline (`app/page.tsx:70-80`), pas de composant de section dédié | le déroulé, du premier échange à la mise en ligne |
| 7 | pour qui | Six profils métier | `HomeProfileMatrix`, `dynamic()` (`app/page.tsx:28-30`), montée à `app/page.tsx:83` | le visiteur se reconnaît et clique vers la page produit adaptée à son profil |
| 8 | l'étape suivante | CTA unique | `CTABand` (`app/page.tsx:86-91`) | une seule action possible : demander un échange gratuit |

L'ordre imposé du projet est globalement respecté ; `HomeDeadlineBand` s'intercale entre le
hero et la première section « c'est quoi » comme un aside sans titre, ce qui est cohérent
avec son statut de bandeau d'urgence et non de section à part entière.

---

## 4. Schémas et animations

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Film hero (7 chapitres) | `components/hero/HeroFilm.tsx` + `components/film/SolutionsFilm.tsx`, `film-runtime.tsx`, `film-chapters-a.tsx`, `film-chapters-b.tsx`, `film-core.tsx` | Intro (7 s) → Agent IA (22,6 s) → Automatisation (19,7 s) → Mémoire d'entreprise (18 s) → Site web (20 s) → Application (20,8 s) → Final (9 s), soit 117,1 s au total (`components/film/film-runtime.tsx:65-72`) ; le film illustre les cinq services autour d'un même scénario (un appel client) | **masqué** en dessous de `md` (`HeroSection.tsx:159`, `className="hidden md:block"`) : le chunk n'est jamais demandé sur mobile | tier `full` + largeur ≥ 1380 px : film complet ; `full` + 1040-1379 px : coupe courte (Intro + AgentIA + Final) ; tier `reduced`/`minimal` ou < 1040 px : coupe « agent » seule (`HeroFilm.tsx:19-46`) ; tier `minimal` : image fixe (`rate = 0`, poster figé sur la fin du chapitre Agent IA) ; `saveData`/connexion lente : film non chargé du tout (`HeroFilm.tsx:55,71`) |
| Constellation des 5 services | `components/sections/home/HomeServicesConstellation.tsx` | pentagone de 5 nœuds + 1 nœud central « Système / Solutions 2IA », relié par 5 rayons pleins vers le centre, 5 côtés pointillés et 5 diagonales fines : les cinq services sont tous reliés entre eux (15 liens, `:185-259`) | bascule en liste 1 colonne (`grid-cols-1`, 2 colonnes dès `sm`) sans schéma SVG, juste les 5 cartes (`:93-106`, `lg:hidden`) | `disableContentMotion` (reduced-motion ou tier `minimal`) : rendu statique immédiat, tracé des lignes déjà plein (`:36-59`) |
| Quatre flux avant/après | `components/sections/home/HomeTransformationFlows.tsx` | pour chaque transformation : 3 étapes « avant » barrées et désaturées, une flèche animée (`pathLength`), 3 étapes « après » reliées et actives | flèche horizontale remplacée par une flèche verticale sous `lg` (`:280` vs `:250`), cartes empilées au lieu d'un layout 3 colonnes | `disableContentMotion` : rendu final statique, pas de tracé de flèche (`:29-59`) |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux. Le film
remplace l'ancien `HeroVisual` (voir section 11) mais ne supprime aucun schéma existant.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `.glass-surface` | `HomeDeadlineBand` (bandeau, `:15`) | 1 | bande pleine largeur, `max-w-3xl` centré |
| `.glass-bubble` | `HomeServicesConstellation`, nœuds du pentagone desktop (centre `:263`, chaque service `:289`) | 6 (5 services + 1 centre) | positions absolues en pentagone, pas de grille CSS |
| `.glass-surface` | `HomeServicesConstellation`, cartes mobile/tablette (`:325`) | 5 | `grid-cols-1 sm:grid-cols-2`, masqué à partir de `lg` |
| `.glass-card` | `HomeTransformationFlows` (`:130`) | 4 | empilées verticalement (`flex flex-col gap-6/8`), pas une grille |
| `.glass-surface` | `HomeProofTelecom` (`:47`) | 3 | `grid-cols-1 lg:grid-cols-3` |
| `.glass-surface` | `HomeApproachSplit`, volet `<details>` « Détails techniques » (`:50`) | 1 | colonne droite d'un `grid lg:grid-cols-2` |
| `.glass-surface` | `HomeProfileMatrix` (`:110`) | 6 | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Carte maison opaque, `bg-bg-card/58` + `backdrop-blur-xl` | `PremiumFlowPanel` (panneau) + 4 tuiles `bg-bg-secondary/62` à l'intérieur (`components/shared/PremiumFlowPanel.tsx:42,86`) | 1 panneau + 4 tuiles | tuiles en `grid sm:grid-cols-2` |
| `.section-intro-panel` (flou permanent, voir chantier §8.4) | `CTABand` (`components/shared/CTABand.tsx:38`) | 1 | pleine largeur, centré |

Rien n'est laissé en carte « maison » opaque sans raison sur cette page : le `PremiumFlowPanel`
est la seule surface hors nomenclature `.glass-*`, et elle est déjà translucide
(`bg-bg-card/58` + `backdrop-blur-xl`) de par son propre design, indépendant du chantier verre.
Aucune surface papier (`bg-paper*`) sur cette page : pas de maquette d'application ici.

---

## 6. L'appel à l'action

- **CTA unique** : action « demander un échange gratuit », affichée deux fois avec des libellés différents mais la même destination `/contact` : « Parler de mon besoin » dans le hero (`HeroSection.tsx:94-99`) et « Demander un premier échange gratuit » dans le `CTABand` final (`app/page.tsx:89`). Conforme à la règle « un seul CTA par page » : c'est la même action répétée, pas deux CTA concurrents.
- **Réassurance sous le bouton du hero** : « Premier échange gratuit · sans engagement » (`HeroSection.tsx:100-102`)
- **Réassurance sous le `CTABand` final** : `trustItems` par défaut, non surchargés : « Réponse sous 24 h », « Premier échange offert », « Sans engagement » (`components/shared/CTABand.tsx:24`)
- **Liens secondaires** (ils ne comptent pas comme un second CTA) : « Voir les cinq services » → `/services` sous le hero (`HeroSection.tsx:104-114`) · « Voir le détail » → `/services` en clôture de la constellation (`HomeServicesConstellation.tsx:117-122`, texte source `HOME_SERVICES_CLOSING_LABEL`) · « → contact » en clôture de la matrice de profils (`HomeProfileMatrix.tsx:82-87`)
- **Autres sorties de la page** : chaque service de la constellation et chaque profil de la matrice pointe vers une page produit (`/sites-web`, `/applications`, `/agents-ia`, `/automatisation`, `/rag`), plus le lien du bandeau d'urgence vers `/automatisation#facture-electronique-2026` (`HomeDeadlineBand.tsx:13-14`). Largement au-dessus du minimum de deux liens sortants exigé par `CLAUDE.md`.

---

## 7. Le design en détail

- **Accents** : preset `home` de `PageAtmosphere` : 3 halos respirants (indigo, cyan, mixte) et 3 lignes horizontales flottantes très discrètes (`PageAtmosphere.tsx:89-98`). Le hero superpose son propre décor indépendant (grille, radial, 3 halos flous, 2 anneaux, 2 lignes, `HeroSection.tsx:16-48`) : c'est la seule section du site à cumuler deux couches de décor.
- **Rythme vertical** : `section-shell` pour la constellation, les transformations et la matrice de profils ; `section-shell-tight` pour le panneau des quatre étapes ; `section-shell-compact` pour le bandeau d'urgence (aside).
- **Largeurs** : `section-container-wide` pour le hero (`HeroSection.tsx:52`, colonne du film plus large que le standard), `section-container` partout ailleurs.
- **Profondeur** : halo `data-decor="halo"` derrière le film (`HeroFilm.tsx:81-85`) et derrière le réseau de la constellation (`HomeServicesConstellation.tsx:154-163`, deux halos) ; à l'intérieur de chaque carte `HomeTransformationFlows`, deux lumières lentes (`.glass-light-cyan` / `.glass-light-indigo`) déphasées par carte pour ne pas respirer en phase (`:133-142`, `animationDelay`).
- **Typographie** : h1 jusqu'à `text-[4rem]` en `xl` (`HeroSection.tsx:71`) ; h2 de section entre `text-3xl` et `text-4xl`.
- **Ce qui fait la signature de cette page** : la constellation pentagonale (jamais réutilisée ailleurs, commentaire `HomeServicesConstellation.tsx:30`) et le film hero (`components/film/`), propres à l'accueil.

---

## 8. Sur téléphone (390 px)

- Le film est entièrement absent (`hidden md:block`) : le hero devient uniquement textuel (badge, h1, sous-titre, CTA, réassurance, lien secondaire, 3 repères chiffrés) sur toute la largeur.
- La constellation perd son schéma SVG et devient une liste de 5 cartes `.glass-surface` en une colonne (`grid-cols-1`, 2 colonnes dès `sm`).
- Les 4 flux avant/après passent de 3 colonnes (avant | flèche | après) à un empilement vertical avec flèche verticale.
- `HomeApproachSplit` empile le texte puis le volet technique (grille 2 colonnes uniquement à partir de `lg`).
- Le panneau des quatre étapes (`PremiumFlowPanel`) passe en une colonne, tuiles en une colonne (`sm:grid-cols-2`).
- La matrice de profils passe en une colonne (`sm:grid-cols-2`, `lg:grid-cols-3`).
- Le décor de fond bascule sur le tier `reduced` (détection mobile dans le script inline de `app/layout.tsx:109`) : `PageAtmosphere` réduit ses orbes à 2 halos respirants plus une grille statique très discrète, au lieu des 3 orbes et 3 lignes du tier `full` (`PageAtmosphere.tsx:64-84`).

---

## 9. SEO

| | |
|---|---|
| `title` | « Sites web, applications et IA sur mesure » · **40 caractères, sans la marque**. ⚠️ Contrairement à ce qu'annonce le commentaire de `app/page.tsx:12`, le gabarit du layout (`%s · Solutions 2IA`, `app/layout.tsx:31`) **ne s'applique pas ici** : dans Next.js un gabarit de titre vaut pour les segments enfants, or la page d'accueil partage son segment avec le layout. Vérifié sur le site servi : `/services` reçoit bien le suffixe, l'accueil non. La marque est donc absente du titre de la page la plus vue. Correctif : écrire le titre complet dans `app/page.tsx`. |
| `description` | « Sites web, applications, automatisations et assistants IA sur mesure pour les PME. Un seul interlocuteur, site vitrine dès 500 €, premier échange gratuit. » (154 caractères) |
| `canonical` | pas de `alternates.canonical` propre à `app/page.tsx` : la page hérite du canonical `/` déclaré une fois dans `app/layout.tsx:55-57`, ce qui est correct puisque `/` est justement la racine |
| JSON-LD | `buildHowToSchema` propre à la page (`app/page.tsx:39-44`, 4 étapes issues de `deliveryFlow`, id `ld-home-howto`) ; s'ajoute au graphe commun à tout le site (`buildOrganizationSchema` + `buildProfessionalServiceSchema` + `buildWebSiteSchema` combinés dans `app/layout.tsx:112-116`, id `ld-graph-root`), hérité par toutes les pages et non spécifique à l'accueil |
| Liens internes sortants | très largement au-dessus du minimum de 2 : `/contact` (×2), `/services` (×2), `/sites-web`, `/applications`, `/agents-ia`, `/automatisation` (×2), `/rag` |

---

## 10. Performance

- Sections en `dynamic()` (ssr par défaut conservé, seul le JS arrive plus tard) : `HomeServicesConstellation`, `HomeTransformationFlows`, `HomeProfileMatrix`, `HomeProofTelecom`, `HomeApproachSplit` (`app/page.tsx:22-36`)
- Le film (`SolutionsFilm`) est en plus chargé en `dynamic(..., { ssr: false })` dans `HeroFilm.tsx:12-15` : chunk client-only, jamais dans le chemin du LCP, sans fallback (le cadre 16/9 peint déjà le fond à la bonne taille avant hydratation)
- Comportement par tier (`usePerformanceMode`) :
  - `full` : film complet ou coupe courte selon la largeur, constellation et flux animés (tracé SVG, stagger)
  - `reduced` : `PageAtmosphere` allégée (2 orbes au lieu de 3 + grille discrète), le film passe systématiquement en coupe « agent » quelle que soit la largeur (`HeroFilm.tsx:41-42`)
  - `minimal` : `PageAtmosphere` réduite à un seul fond radial statique, film figé en image fixe (`rate = 0`), constellation et flux rendus dans leur état final sans animation (`disableContentMotion`)
  - `saveData` / connexion lente : le film n'est pas chargé du tout, quel que soit le tier
- Points sensibles de la page : le `h1` et le sous-titre du hero sont peints en CSS pur (`.hero-enter`) avant hydratation (règle `CLAUDE.md`, LCP mesuré à 1,8 s réel selon l'audit de conversion) ; le film est volontairement hors de ce chemin critique.

---

## 11. État et suite

- **Ce qui est fait** : hero remplacé par le film de démonstration (`HeroFilm` + `components/film/`, 16 septembre 2026) ; passage au verre des cartes de l'accueil (`.glass-surface` sur bandeau, preuve télécoms, volet technique, matrice de profils, repli mobile de la constellation, 17 septembre 2026) ; nœuds de la constellation en `.glass-bubble` avec halo local et maillage complet à 15 liens (18 septembre 2026) ; correctif du bug qui empêchait le tracé animé des lignes de se déclencher (18 septembre 2026). Détail dans `docs/chantiers/2026-09-17-cartes-verre.md`.
- **Ce qui reste** : le chantier verre note que le flux de transformations et le contenu de l'accueil restent à retravailler (`docs/chantiers/2026-09-17-cartes-verre.md`, tableau §3, ligne accueil) ; le chiffrage des quatre transformations et le remontage des arguments de réassurance (prix, garantie 30 jours) recommandés par l'audit de conversion ne sont pas visibles dans le code actuel au-delà des trois repères déjà présents dans le hero.
- **Note de conversion** (audit du 6 septembre 2026, `docs/audits/2026-09-06-conversion/accueil/README.md`) : **63/100** global (contenu 58, design 82, conversion 56), noté **avant** la mise en œuvre du 7 septembre 2026 (prix réels dans le hero, bandeau d'échéance, correction « cinq services ») et avant le remplacement du hero par le film (16-18 septembre 2026). Le README le signale lui-même : « Les notes ci-dessus décrivent la page avant ces changements. À re-noter avec la grille. » Cette fiche ne recalcule pas la note ; une nouvelle passe `conversion-auditor` est nécessaire pour la mettre à jour.

---

## Incohérences relevées avec la documentation existante

- **`HeroVisual` vs `HeroFilm`** : `CLAUDE.md` (tableau des routes) indique encore `HeroVisual` comme scène de hero de `/`. Le fichier `components/hero/HeroVisual.tsx` existe toujours (27 953 octets) mais n'est plus importé nulle part (`grep -rn "HeroVisual" app/ components/` ne retourne que des occurrences internes au fichier lui-même). Le hero réel est `HeroFilm` (`components/hero/HeroSection.tsx:8,159`). `CLAUDE.md` est à mettre à jour.
- **Couleurs d'état** : le point vert du badge du hero passe désormais par le token `bg-success` (`HeroSection.tsx:61-62`). La dette « couleurs d'état en dur » signalée par le chantier verre a été soldée le 18/09/2026 sur l'ensemble du site : 55 occurrences de `green-400`, `red-400` et `yellow-400` migrées vers `success`, `danger` et `warning`.
- **Note de conversion obsolète** : la note 63/100 de l'audit du 6 septembre ne reflète ni les correctifs du 7 septembre ni le nouveau hero du 16-18 septembre ; à re-noter.
