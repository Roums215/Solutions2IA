# `/applications` · du bazar à votre outil

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> **Mis à jour le 29 septembre 2026** · contre le code de `app/applications/` et
> `components/sections/applications/`, après la refonte du 28 septembre 2026
> (commentaire `app/applications/ApplicationsPage.tsx:10-14`).
>
> Captures de référence : `review/applications-v2/` (8 sections en 1440 et 390 px, hero en
> `prefers-reduced-motion`, et les 5 étapes de l'animation du hero avec sa boucle vidéo dans
> `animation-hero/`). **Dossier local, non versionné** (`review/` est ignoré par git).

---

## 1. Ce que fait cette page

Page produit du service « Applications sur mesure ». Elle part des frictions du quotidien
(fichiers éclatés, ressaisie, outils qui ne se parlent pas), montre le principe d'une
application qui centralise puis redistribue l'information, ce qu'elle change à trois
niveaux, la méthode et le prix, l'outil tel qu'il serait dans chaque métier, et un cas réel
(télécoms).

Ce qu'elle ne fait pas : elle ne détaille pas chaque secteur (c'est le rôle de
`/applications/[secteur]`, fiche `applications-secteurs.md`), ne traite pas les tâches
automatiques hors de l'application (renvoi vers `/automatisation`) et n'affiche aucun
chiffre de résultat client.

| | |
|---|---|
| Route | `/applications` |
| Fichiers | `app/applications/page.tsx` (serveur, metadata, JSON-LD) · `app/applications/ApplicationsPage.tsx` (assemblage, **sans `"use client"`** : composant serveur qui monte des sections client, choix commenté `:6-8`) |
| Sections | `components/sections/applications/` : `AppHeroSection`, `AppsProblems`, `AppsPrinciple`, `AppsBenefits`, `AppsMethod`, `AppsSectors`, `AppsCaseStudy` ; contenu des sections B à H dans `appsPageData.ts` |
| Preset de décor | `apps` (`components/shared/PageAtmosphere.tsx:133-155`) |
| Public visé | dirigeant de PME qui travaille avec Excel, du papier et des logiciels mal reliés, qu'il parte de zéro ou d'un outil existant |

---

## 2. La promesse affichée

- **Surtitre** : « Applications sur mesure » (`AppHeroSection.tsx:41-43`)
- **Titre (h1)** : « Un outil fait pour votre métier, pas un logiciel de plus à subir. », « votre métier » en `.text-gradient-strong` (`AppHeroSection.tsx:45-50`)
- **Sous-titre** (élément LCP, peint en CSS avant hydratation) : « Excel, papier, mails, logiciels qui ne se parlent pas : je remplace ce bazar par une seule application, pensée pour votre façon de travailler. » (`:53-59`)
- **Trois promesses cochées** : « Une seule saisie » · « Le suivi en direct » · « Relié à vos outils » (`:19`, rendues `:61-71`)
- **Réassurance sous le bouton** : « Premier échange gratuit · réponse sous 24 h » (`:84-86`)
- **Niveau 1 (dirigeant de PME)** : tout le parcours principal est en français courant (« récupère, range, vérifie, déclenche », « l'écran du matin »).
- **Niveau 2 (visiteur averti)** : pas de volet technique dédié sur cette page. Le détail passe par les fiches métier de `AppsSectors` (modules comme « Dossier patient unique (DPI) », « Messagerie de santé sécurisée (MSSanté) ») et par le lien vers chaque page secteur.

---

## 3. Structure, dans l'ordre

Assemblage : `app/applications/ApplicationsPage.tsx:22-62` (sections repérées A à I dans
les commentaires, F et G réunies). Alternance nuit / papier.

| # | Question | Section affichée | Composant (fichier) | Surface | Ce que le visiteur retient |
|---|---|---|---|---|---|
| A | c'est quoi | Hero : promesse + démonstration en 5 temps | `AppHeroSection` (`:28`) | sombre | une seule application remplace le bazar |
| B | ce que ça apporte (par le coût du problème) | « Ce bazar vous coûte plus cher qu'un outil fait pour vous. » (« Votre quotidien ») | `AppsProblems`, `dynamic()` (`:15`, monté `:31`) | claire (`bg-paper`, arrondie) | il coche ses frictions, puis refait un calcul de temps perdu |
| C | comment ça marche | « Tout entre au même endroit, tout en sort au bon moment. » (« Le principe ») | `AppsPrinciple`, `dynamic()` (`:16`, monté `:34`) | sombre | entrées → application → sorties, exploré au survol ou au toucher |
| D | ce que ça apporte | « Du quotidien de vos équipes jusqu'à vos comptes. » (« Ce que ça change ») | `AppsBenefits`, `dynamic()` (`:17`, monté `:37`) | claire froide (`bg-paper-2`, arrondie) | 9 bénéfices en 3 niveaux : quotidien, système, entreprise |
| E | comment je travaille | « Du terrain à l'outil qui tourne, sans zone floue. » (« Comment je travaille »), `id="methode"` | `AppsMethod`, `dynamic()` (`:18`, monté `:40`) | sombre | 6 étapes, deux points de départ, engagements et repère de prix |
| F · G | pour qui | « Chaque métier a ses contraintes. L'outil les connaît. » (« Votre métier, votre outil ») | `AppsSectors`, `dynamic()` (`:19`, monté `:43`) | claire (`bg-paper`, arrondie) | sa fiche métier et « l'écran du matin » de son activité |
| H | preuve | « Des rapports papier à une plateforme utilisée chaque jour. » (« Un cas concret ») | `AppsCaseStudy`, `dynamic()` (`:20`, monté `:46`) | sombre | un projet réel, avant / construit / après |
| I | l'étape suivante | « Parlez-moi de ce qui vous fait perdre du temps. » | `CTABand framed` (`:49-60`) | sombre | une seule action : écrire |

Écart avec l'ordre imposé du projet : le principe (comment ça marche, C) passe avant les
bénéfices (D), et la preuve (H) vient après le « pour qui ». Le coût des problèmes (B)
tient lieu de première réponse à « ce que ça apporte ».

---

## 4. Schémas et animations

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Scène 2.5D du hero | `AppHeroScene.tsx` (plan fixe 820 × 628 mis à l'échelle en CSS, `:44-45`, `:137`), objets dans `appHeroSceneParts.tsx` (`ChaosCard :26`, `InputChip :56`, `AppWindow :87`, `OutputCard :218`, `IndicatorTile :237`), récit et données dans `appHeroSceneData.ts` | 5 temps (`appHeroSceneData.ts:35-41`) : 1 cinq cartes du « bazar » arrivent penchées avec ce qu'elles coûtent (« Quelle version ? », « À ressaisir »…, `:75-81`) ; 2 elles plongent dans l'application, les sources se rangent à gauche (`:84-90`) ; 3 l'application règle les dossiers et fait sortir tableau de bord, alerte, rapport client, agenda, équipe (`:182-188`) ; 4 quatre indicateurs se posent (« 1 saisie », « En direct », « 4 tâches », « 1 écran », `:192-197`) ; 5 l'outil change de métier toutes les 1,2 s (Santé, BTP, Services pro, Commerce, Transport, `AppHeroScene.tsx:123-133`). Zones nommées « Aujourd'hui » puis « Vos sources », « Votre outil », « Ce qui en sort » (`:339-360`) ; liaisons en `pathLength` (`:307`) ; légende synchronisée, progression et bouton pause (`:247-257`, `:362-420`). Boucle d'environ 26,2 s (24,8 s d'étapes + 1,4 s de repos). Badge « Maquette » dans la fenêtre (`appHeroSceneParts.tsx:130`) et `aria-label` qui annonce des données d'exemple (`appHeroSceneData.ts:45-46`) | **non montée** sous 768 px : `dynamic(..., { ssr: false })` (`AppHeroSection.tsx:14-17`), rendue seulement si `mounted && !isMobile` dans un conteneur `hidden md:block` (`:100-104`). Remplacée par `AppHeroSceneMobile` (voir §8) | `full` : plan incliné (`rotateX(5deg) rotateY(-6deg)`, `perspective: 2000px`, `:54-56`) ; `reduced` : à plat ; `minimal` et `prefers-reduced-motion` : image finale fixe (sources rangées, outil, sorties, indicateurs) et légende « En 5 temps : … » (`:418`). Pause hors écran, onglet masqué ou bouton |
| Récit mobile du hero | `AppHeroSceneMobile.tsx` | 4 moments (`appHeroSceneData.ts:201-206`) : les 5 cartes du bazar avec leur étiquette d'alerte, la fenêtre « Votre outil » (vue Interventions), les 5 sorties, puis les 4 indicateurs et les 5 métiers en pastilles. Mention « Maquette · données d'exemple » (`:137`) | version téléphone (`md:hidden`, `AppHeroSection.tsx:106`), révélation `whileInView` par moment (`:149`) | rendu final immédiat (`:29-30`, `:41-42`) |
| Principe entrées → outil → sorties | `AppsPrinciple.tsx`, données `appsPageData.ts:72-95` | 5 entrées (Papier, Excel, Mails, Logiciel existant, Terrain) → carte papier « Votre application » avec 4 verbes (Récupère, Range, Vérifie, Déclenche) → 5 sorties. 10 courbes tracées une fois en `pathLength` (`:81-94`). Survoler, focaliser ou toucher un nœud allume son chemin, un segment le parcourt en boucle (`repeat: Infinity`, `:96-109`) et un encart `aria-live` explique ce que l'outil en fait (`:200-221`) | sous `lg`, courbes masquées, colonnes empilées avec flèches vers le bas (`:235-241`), nœuds en `sm:grid-cols-2` ; le toucher remplace le survol (`onClick`, `:51`) | tracés déjà pleins (`initial={false}`, `:89`), pas de segment en boucle (`!instant`, `:96`) |
| Tableau de bord par métier | `AppsSectors.tsx:146-157`, maquettes dans `sectorDashboards.tsx` (partagé avec les pages secteur) | l'écran de chaque métier sur surface papier, avec la légende « Maquette : les chiffres sont des exemples, pas des résultats clients. » (`:152`) | rendu empilé en une colonne (voir capture `mobile-06`) | `dashboard.render(instant)` reçoit le drapeau de mouvement (`:155`) |
| Cas télécoms en trois temps | `AppsCaseStudy.tsx`, données `appsPageData.ts:159-190` | Avant → Ce que j'ai construit (Espace technicien avec `Checklist`, Espace responsable avec `MiniTable`, `components/shared/mockup/AppMockup`) → Après, puis 3 gains. Mêmes données que la preuve de l'accueil (`FIELD_CHECKS`, `OFFICE_ROWS` importés de `components/sections/home/homeProofTelecomData`, `:9`) | flèches verticales sous `lg` (`:141-148`) | révélation instantanée |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux. Le
pipeline de numérisation de l'ancienne page (`AppDigitizationPipeline`) est refait dans
`AppsPrinciple` ; son fichier reste sur le disque (§11).

---

## 5. Surfaces et cartes

Aucune `SpotlightCard`, aucune surface `.glass-*` hors bulle de réassurance du `CTABand`.
Signature de la page : des **interfaces papier posées sur la nuit du site** (hero,
principe, cas concret), comme de vrais écrans sur un bureau sombre
(`appHeroSceneParts.tsx:9-14`). Cartes maison `.panel-card` sur fond sombre et
`.paper-card` sur fond clair (`app/globals.css:599-652`).

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Feuilles papier (`bg-paper`, ombre `SHEET` / `SHEET_LG` en `color-mix`) | objets de la scène du hero (`appHeroSceneParts.tsx:17-20`) et du récit mobile | 5 cartes bazar, 5 sources, 1 application, 5 sorties (desktop) | positions absolues |
| `.panel-card` | indicateurs du récit mobile (`AppHeroSceneMobile.tsx:118`), légende de la scène desktop | 4 + 1 | `grid-cols-2` (mobile) |
| Bouton-carte `.paper-card` qui passe en `bg-accent-primary/[0.06]` coché | `AppsProblems` (`:68-95`) | 8 | `grid md:grid-cols-2` (`:58`) |
| Bande `bg-ink` (calcul) | `AppsProblems` (`:111-128`) | 1 | `lg:grid-cols-[15rem_1fr]` |
| `.panel-card` (nœud au repos) / `bg-paper` (nœud actif) | `AppsPrinciple` (`:52-55`) | 10 | colonnes `lg:grid-cols-[1fr_4.5rem_19rem_4.5rem_1fr]` (`:28`) |
| Carte papier « Votre application » | `AppsPrinciple` (`:162`) | 1 | colonne centrale |
| `.panel-card` | encart d'explication `AppsPrinciple` (`:200`) | 1 | pleine largeur |
| `.paper-card` (en-tête + liste) | `AppsBenefits` (`:57`) | 3 | `grid lg:grid-cols-3` (`:51`) |
| `.panel-card` | `AppsMethod` : 6 étapes (`:54`) + 2 blocs latéraux (`:78`, `:90`) | 8 | étapes `sm:grid-cols-2`, colonne latérale `lg:grid-cols-[1fr_21rem]` (`:44-46`) |
| `.paper-card` | fiche métier `AppsSectors` (`:102`) | 1 (par métier choisi) | `lg:grid-cols-[1.15fr_1fr_0.9fr]` |
| Maquette de tableau de bord | `AppsSectors` (`:154-156`) | 1 (par métier choisi) | pleine largeur |
| `.panel-card` + 2 feuilles papier + carte `border-cyan/35 bg-accent-primary/10` | `AppsCaseStudy` (`:57`, `:72-98`, `:104`) | 3 colonnes + 3 gains `.panel-card` (`:122`) | `lg:grid-cols-[0.85fr_auto_1.5fr_auto_0.85fr]` (`:51`), gains `sm:grid-cols-3` |
| `.panel-card` + `.panel-foot` + `.glass-inset` | `CTABand framed` (`components/shared/CTABand.tsx:60`, `:106`, `:113`) | 1 | `max-w-[1040px]` |

---

## 6. L'appel à l'action

- **CTA unique** : « Parler de mon projet » → `/contact`, même libellé dans le hero (`AppHeroSection.tsx:74-82`) et dans le `CTABand` final (`ApplicationsPage.tsx:56`).
- **Bouton secondaire du `CTABand`** : neutralisé (`secondary={null}`, `:57`).
- **Réassurance** : sous le hero « Premier échange gratuit · réponse sous 24 h » ; sous le `CTABand` « Premier échange gratuit », « Réponse sous 24 h », « Prix fixé avant de démarrer » (`:58`).
- **Texte du `CTABand`** : « Un premier échange suffit pour voir si un outil sur mesure a du sens chez vous, ou pas. Si ce n'est pas le cas, je vous le dis. » (`:55`)
- **Lien secondaire** (pas un CTA) : « Voir comment je travaille » → ancre `#methode` (`AppHeroSection.tsx:89-95`, cible `AppsMethod.tsx:27`).
- **Autres sorties de la page** : « Voir l'automatisation » → `/automatisation` (`AppsPrinciple.tsx:223-229`) ; « L'application santé en détail » → `/applications/sante` (`AppsSectors.tsx:136-142`, libellé construit depuis le nom du métier). Seul le métier choisi est rendu (Santé par défaut, `:31`) : dans le HTML servi, un seul lien secteur est présent, les cinq autres n'apparaissent qu'au clic sur leur onglet.

---

## 7. Le design en détail

- **Accents** : indigo et cyan de la marque. Titres de section en `.text-gradient-strong` (h1 compris) ; titre du `CTABand` en `.text-gradient-fluid`. Sur les surfaces claires, pastilles d'icônes `bg-ink text-cyan` ; sur les sombres, `bg-accent-primary/15 text-accent-light`. Couleurs d'état par tokens (`bg-warning/15 text-warning-ink`, `bg-success/15 text-success-ink`, `AppHeroSceneMobile.tsx:32-37`).
- **Décor** : `PageAtmosphere preset="apps"` en fond fixe (2 `GlowOrb` + 5 rectangles d'interface qui flottent et pulsent en boucle, `PageAtmosphere.tsx:133-155`), visible derrière les sections sombres. `SectionFluidBackdrop` par section : `appsHero`, `appsLight` (B, D, F·G), `appsDark` (C), `method` (E, variante de l'accueil), `appsCase` (H), `cta` (I). Le hero ajoute une grille masquée en ellipse (`AppHeroSection.tsx:31-35`).
- **Menu sur fond clair** : `AppsProblems`, `AppsBenefits` et `AppsSectors` appellent `useLightHeaderZone` ; le hero, sombre, ne le fait pas.
- **Rythme vertical** : `section-shell-tight` pour les six sections, `section-shell` pour le `CTABand`. Les trois sections claires sont des « îles » entièrement arrondies (`rounded-[2rem] lg:rounded-[3.5rem]`), contrairement à `/sites-web` où les blocs clairs se touchent.
- **Largeurs** : `section-container-wide` pour le hero (`:38`, grille `xl:grid-cols-[27rem_1fr]`), `section-container` ailleurs.
- **Profondeur** : réelle seulement dans la scène du hero en tier `full` (`translateZ` jusqu'à 80 px pour l'application, `AppHeroScene.tsx:187`). Ailleurs, ombres portées des feuilles papier.
- **Typographie** : h1 de `text-4xl` à `xl:text-[3.5rem]` ; `SectionHeading` en `centered={false}`, `labelStyle="eyebrow"` ; numéros `font-mono` sur les étapes de méthode, les verbes du principe et les niveaux de bénéfices (`01 / 03`).
- **Signature de la page** : l'interactivité. Le visiteur coche ses frictions et la section lui répond (`AppsProblems.tsx:101-108`), explore le principe nœud par nœud, et choisit son métier pour voir son écran.

---

## 8. Sur téléphone (390 px)

- **Hero** : scène desktop ni téléchargée ni montée ; `AppHeroSceneMobile` raconte le même passage en 4 moments numérotés.
- **Problèmes** : 8 cartes en une colonne, calcul en bloc empilé.
- **Principe** : entrées, application, sorties l'une sous l'autre avec flèches ; intitulés de colonne répétés au-dessus de chaque groupe (`AppsPrinciple.tsx:153`, `:194`) ; nœuds sur 2 colonnes dès `sm`.
- **Bénéfices** : 3 cartes empilées.
- **Méthode** : étapes en une colonne (2 dès `sm`), blocs « Deux points de départ » et engagements + prix sous les étapes.
- **Métiers** : les 6 onglets défilent horizontalement sans faire déborder la page (`-mx-4 overflow-x-auto px-4`, `AppsSectors.tsx:60-61`) ; fiche puis tableau de bord empilés (le tableau devient long, voir capture `mobile-06`).
- **Cas concret** : trois temps empilés, flèches verticales, gains en une colonne.
- **Décor** : composition téléphone des `SectionFluidBackdrop` (`sm:hidden`) et `PageAtmosphere` en tier `reduced`.

---

## 9. SEO

| | |
|---|---|
| `title` | « Application sur mesure pour votre métier » + gabarit `%s · Solutions 2IA` (`app/layout.tsx:31`) : **56 caractères**, suffixe compris (`page.tsx:11`) |
| `description` | « Application métier sur mesure pour PME : remplace Excel, le papier et les logiciels qui ne se parlent pas. Un seul outil, avec tableau de bord. Dès 1 500 €. » (**156 caractères**, `page.tsx:12-13`) |
| `openGraph` | titre « Applications sur mesure : un outil fait pour votre métier » (`page.tsx:21-27`) |
| `canonical` | `/applications` (`page.tsx:20`) |
| JSON-LD | `combineSchemas(buildServiceSchema(...), buildBreadcrumbSchema(...))`, id `ld-applications` (`page.tsx:31-49`) : service « Application métier sur mesure », audience « PME et ETI » ; fil d'Ariane Accueil › Services › Applications |
| Sitemap | `app/sitemap.ts:43`, route pilier, priorité 0,9 ; les 6 pages secteur sont listées à part (`:77`) |
| h1 | un seul (`AppHeroSection.tsx:45`) ; un `h2` par section via `SectionHeading` |
| Liens internes sortants (hors menu et pied de page) | `/contact` (×2), `/automatisation`, `/applications/sante` (métier par défaut) : 3 destinations dans le HTML servi |

---

## 10. Performance

- **Bundle initial** : seul le hero (`AppHeroSection`, avec `AppHeroSceneMobile` importé statiquement). Les six sections sont en `dynamic()` avec SSR conservé (`ApplicationsPage.tsx:6-20`).
- **Scène du hero** : `dynamic(..., { ssr: false, loading: () => null })`, montée après hydratation au-dessus de 767 px seulement ; boîte `aspect-[820/628]` réservée dès le SSR (`AppHeroSection.tsx:99-103`). Une minuterie d'étape, plus un `setInterval` pendant l'étape 5 seulement (`AppHeroScene.tsx:112-133`).
- **LCP** : h1 et sous-titre en `.hero-enter` (CSS pur), scène en `hero-enter-fade`.
- **Par tier** :
  - `full` : scène inclinée, boucles de `PageAtmosphere`, révélations `whileInView` ;
  - `reduced` : scène à plat, `PageAtmosphere` allégée ;
  - `minimal` et `prefers-reduced-motion` : scène figée sur son image finale, sections dans leur état final, pas de segment en boucle dans `AppsPrinciple`.
- **Points sensibles** : `sectorDashboards.tsx` (823 lignes) est chargé avec le chunk de `AppsSectors` ; seul le tableau du métier choisi est rendu. Le segment qui parcourt un chemin actif de `AppsPrinciple` tourne en boucle infinie tant qu'un nœud reste sélectionné (`:107`).

---

## 11. État et suite

- **Ce qui est fait** : refonte complète du 28 septembre 2026. Nouveau hero sombre avec scène 2.5D en 5 temps et récit mobile dédié ; sections `AppsProblems` (à cocher), `AppsPrinciple` (interactif), `AppsBenefits`, `AppsMethod` (prix « de 1 500 à 15 000 € », `appsPageData.ts:152-155`), `AppsSectors` (fiche + tableau de bord réunis), `AppsCaseStudy` ; bouton secondaire du `CTABand` retiré.
- **Composants débranchés mais présents sur le disque** (cités seulement dans le commentaire `ApplicationsPage.tsx:10-14`, vérifié par `grep -rlw` sur `app/`, `components/`, `lib/`) : `SectorsCoverage.tsx`, `AppDigitizationPipeline.tsx` (1 031 lignes), `BuildOrAuditDiptych.tsx`, `PerformanceTracking.tsx`, et la scène `components/scenes/mobile/AppScene.tsx`. Candidats au nettoyage. **À conserver** : `sectorsAppsData.tsx`, `appSectorVerticals.ts` et `sectorDashboards.tsx`, utilisés par `AppsSectors` et par `app/applications/[secteur]/`.
- **Point de vigilance (copy)** : la colonne « Ce que l'outil vise » de chaque fiche métier affiche les `kpis` de `appSectorVerticals.ts` (ex. « < 7 % no-show visé », « 98 %+ télétransmission visée », `:61-62`). Ce sont des objectifs, formulés comme tels, pas des résultats ; certains gardent un sigle en valeur (« AOV ↑ », « MTBF ↑ », « OTD ↑ », « Billable ↑ », `:103, 144, 185, 226`) avec une explication seulement dans le libellé voisin.
- **Ce qui reste** : aucun chantier ouvert dans `docs/chantiers/` pour cette version.
- **Note de conversion** : l'audit du 6 septembre 2026 (`docs/audits/2026-09-06-conversion/applications/README.md`, 73/100) porte sur une page qui n'existe plus. À re-noter avec `conversion-auditor`.

---

## Incohérences relevées avec la documentation existante

- **`CLAUDE.md`**, tableau des routes : la scène de hero de `/applications` y est encore `AppScene`. La scène réelle est `AppHeroScene` (`components/sections/applications/`), `AppScene` n'est plus importée.
- **Pattern de page** : `ApplicationsPage.tsx` n'a pas de `"use client"` (composant serveur qui assemble des sections client, `:6-8`), alors que `CLAUDE.md` décrit `<Nom>Page.tsx` comme client.
- **`PageAtmosphere`** : décrit comme statique dans `CLAUDE.md`, le preset `apps` anime en boucle 5 rectangles et 2 halos en tier `full` (sans suivi de souris).
- **`docs/chantiers/2026-09-19-theme-clair.md:169`** décrit l'ancienne composition (exemple, 6 secteurs, pipeline, sur mesure ou refonte, tableaux de bord séparés) : périmé pour cette page.
- **`docs/pages/README.md`** indique que toutes les fiches datent du 18 septembre 2026 : ce n'est plus vrai pour celle-ci.
