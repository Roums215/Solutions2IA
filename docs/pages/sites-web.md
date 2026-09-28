# `/sites-web` · une visite qui devient une demande

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> **Mis à jour le 29 septembre 2026** · contre le code de `app/sites-web/` et
> `components/sections/sites-web/`, après la refonte du 27 septembre 2026
> (commentaire `app/sites-web/SitesWebPage.tsx:10-12`).
>
> Captures de référence : `review/sites-web-v2/` (hero, 4 paliers, couches avec le détail
> technique ouvert, CTA, en 1440 et 390 px, plus trois versions de l'animation du hero
> dans `animation-hero/`, `-v2/`, `-v3/`). **Dossier local, non versionné** (`review/`
> est ignoré par git).

---

## 1. Ce que fait cette page

Page produit du service « Sites web ». Elle montre qu'un site sert à transformer une
visite en demande exploitable, puis à faire avancer cette demande (bonne personne, suivi,
agenda, client prévenu). Elle présente ensuite l'offre en quatre paliers, du site vitrine
au site avec espace client, et la façon de construire (quatre couches, engagements).

Ce qu'elle ne fait pas : pas de comparatif « moi contre l'agence » (retiré, voir
`webCraftData.ts:3-7`), pas de réalisation client, pas de grille de prix détaillée (une
seule ligne de repères sous les paliers). L'application métier est renvoyée vers
`/applications`, les suites automatiques vers `/automatisation`.

| | |
|---|---|
| Route | `/sites-web` |
| Fichiers | `app/sites-web/page.tsx` (serveur, metadata, JSON-LD) · `app/sites-web/SitesWebPage.tsx` (assemblage, **sans `"use client"`** : composant serveur qui monte des sections client, choix commenté `:6-8`) |
| Sections | `components/sections/sites-web/` : `WebHeroSection`, `WebSourcesConverge`, `WebCostSituations`, `WebBuildLevels`, `WebCraftFoundations`, et leurs fichiers de données |
| Preset de décor | `web` (`components/shared/PageAtmosphere.tsx:114-131`) |
| Public visé | dirigeant de PME ou indépendant qui part de zéro ou veut refaire un site existant |

---

## 2. La promesse affichée

- **Surtitre** : « Sites web · conçus sur mesure » (`WebHeroSection.tsx:47-49`)
- **Titre (h1)** : « Votre site transforme une visite en action », « en action » en `.text-gradient-fluid` (`WebHeroSection.tsx:51-57`)
- **Sous-titre** (élément LCP, peint en CSS avant hydratation) : « Votre site ne se contente pas d'être beau. Il récupère une demande complète, puis la fait avancer : chez la bonne personne, dans le suivi, jusqu'au rendez-vous. » (`WebHeroSection.tsx:60-67`)
- **Réassurance sous le bouton** : « Premier échange gratuit · sans engagement » (`:80-82`)
- **Niveau 1 (dirigeant de PME)** : tout le texte courant est sans jargon ; les couches du site sont nommées par leur effet (« ce que le visiteur voit et ressent », « là où arrive la demande »).
- **Niveau 2 (visiteur averti)** : volet `<details>` replié « Le détail technique, pour vérifier » dans `WebCraftFoundations` (`WebCraftFoundations.tsx:99-116`, texte `webCraftData.ts:72-91`) : Next.js, TypeScript, schema.org, Core Web Vitals, `llms.txt`, WCAG 2.2, HTTPS, CSP, RGPD.

---

## 3. Structure, dans l'ordre

Assemblage : `app/sites-web/SitesWebPage.tsx:26-56`. Alternance de surfaces claires
(papier) et sombres (nuit du site).

| # | Question | Section affichée | Composant (fichier) | Surface | Ce que le visiteur retient |
|---|---|---|---|---|---|
| 1 | c'est quoi | Hero : promesse + démonstration en 7 temps | `WebHeroSection` (`SitesWebPage.tsx:32`) | claire (`bg-paper`, bas arrondi) | un site qui récupère une demande complète et la fait avancer |
| 2 | c'est quoi (où ça se place) | « D'où viennent réellement vos clients. » (étiquette « Les entrées ») | `WebSourcesConverge`, `dynamic()` (`:13-15`, monté `:35`) | sombre | tous les canaux aboutissent au même site, qui produit une demande exploitable |
| 3 | ce que ça apporte (par le coût du manque) | « Ce qu'un site mal conçu vous coûte. » (« Le coût caché ») | `WebCostSituations`, `dynamic()` (`:16-18`, monté `:38`) | claire (`bg-paper`, haut arrondi) | quatre situations reconnaissables et un calcul à faire soi-même |
| 4 | c'est quoi (l'offre) · pour qui | « Du site vitrine au site réellement connecté. » (« Ce que je construis »), `id="ce-que-je-construis"` | `WebBuildLevels`, `dynamic()` (`:19-21`, monté `:41`) | claire froide (`bg-paper-2`, bas arrondi) | quatre paliers qui s'empilent, chacun avec des exemples de clients types |
| 5 | comment ça marche | « Quatre couches solides, un seul interlocuteur. » (« Comment je le construis ») | `WebCraftFoundations`, `dynamic()` (`:22-24`, monté `:44`) | sombre | la méthode, les engagements, la technique en second niveau |
| 6 | l'étape suivante | « Parlons de votre site » | `CTABand framed` (`:47-54`) | sombre | une seule action : écrire |

Les sections 3 et 4 forment un seul bloc clair (haut arrondi sur la 3, bas arrondi sur la
4). Le « pour qui » n'a pas de section dédiée : il passe par les exemples de chaque palier
(`webBuildData.ts:35, 46, 57, 69`), volontairement transversaux (`webBuildData.ts:5-6`).

---

## 4. Schémas et animations

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Scène 2.5D du hero | `WebHeroScene.tsx` (plan fixe 820 × 660 mis à l'échelle en CSS, `:53-54`, `:164`), objets dans `webHeroSceneParts.tsx` (`SearchCard :116`, `SiteCard :165`, `FicheCard :362`, `InboxCard :409`, `TrackCard :483`, `AgendaCard :541`, `Packet :632`), récit et données dans `webHeroSceneData.ts` | 7 étapes (`webHeroSceneData.ts:21-29`) : être trouvé · comprendre l'offre · demande envoyée · fiche claire · bon destinataire · action concrète (créneau posé) · client prévenu. Deux zones nommées « Côté visiteur » et « Côté entreprise » (`WebHeroScene.tsx:334-362`) ; un seul objet a le focus par étape (liseré indigo + pulsation unique, `:263-280`) ; la demande voyage du formulaire vers la fiche, la confirmation revient de l'agenda vers le site (`offset-path`, `:113-116`, `:373-386`) ; 5 liaisons tracées en `pathLength` puis parcourues une fois par un segment cyan (`:105-111`, `:285-331`). Légende synchronisée avec progression en 7 segments et bouton pause (`:388-453`, `:217-229`). Boucle d'environ 34,6 s (33 s d'étapes + 1,6 s de repos). Données d'exemple signalées par le badge « Maquette » (`webHeroSceneParts.tsx:185`) et l'`aria-label` (`webHeroSceneData.ts:79-80`) | **non montée** sous 768 px : chunk `dynamic(..., { ssr: false })` (`WebHeroSection.tsx:16-19`), rendu seulement si `mounted && !isMobile` dans un conteneur `hidden md:block` (`:100-104`). Remplacée par `WebHeroSceneMobile` (voir §8) | `full` : plan incliné (`rotateX(5deg) rotateY(-7deg)`, `perspective: 2000px`, `translateZ` réels, `:58-60`) ; `reduced` : même récit à plat ; `minimal` et `prefers-reduced-motion` : image finale fixe (étape 7, tout l'écosystème) et légende « En 7 temps : … » (`:137`, `:446-450`). Pause hors écran (`PauseOffscreen`, `useInViewPause`), onglet masqué (`visibilitychange`, `:140-145`) ou bouton |
| Récit mobile du hero | `WebHeroSceneMobile.tsx` | 4 moments empilés reliés par un fil vertical (`:49-139`) : recherche + site, formulaire rempli, fiche demande, puis boîte / suivi / agenda / client prévenu. Mention « Maquette · données d'exemple » (`:141`) | c'est la version téléphone (`md:hidden`, `WebHeroSection.tsx:106`) ; chaque moment se révèle à l'entrée dans l'écran (`whileInView`, `:153`) | `disableContentMotion` : rendu final immédiat (`:40-45`) |
| Convergence des sources | `WebSourcesConverge.tsx`, données `webSourcesData.ts` | 3 familles (« Ils vous cherchent », « Ils vous découvrent », « Ils vous connaissent déjà », 10 canaux) → « Votre site » (3 rôles) → « Une demande exploitable » (Qui, Besoin, Délai, Source) sur carte papier. 3 courbes SVG tracées une fois en `pathLength` (`:29-36`, `:87-103`), couleur par famille en token (`webSourcesData.ts:40, 51, 63`). Aucun chiffre (`webSourcesData.ts:17-18`) | sous `lg`, courbes masquées, la chaîne se lit de haut en bas avec des flèches `ArrowDown` (`:185-192`) | rendu final direct, tracés déjà pleins (`DRAW_STILL`, `:40`) |
| Échelle des paliers | `WebBuildLevels.tsx` (`BuildSchema :225-262`), données `webBuildData.ts:77-124` | un seul schéma (plan 760 × 260) qui s'enrichit : visiteur → site → contact direct (palier 1) / formulaire adapté → demande complète (2) → fichier clients, agenda, messagerie (3) → espace client (4). Les briques pas encore incluses restent en pointillé (`:281`), les liaisons se tracent en `pathLength` (`:243-252`). Filet de l'échelle qui se remplit jusqu'au palier choisi (`scaleY`, `:67-74`) | schéma absent sous `lg` : les 4 paliers se suivent, chacun avec sa chaîne en texte « Circuit : visiteur → votre site → … » (`:137-147`, `chainFor :211-218`) | `disableContentMotion` : transitions à durée nulle (`:227`, `:286`) |
| Les quatre couches | `WebCraftFoundations.tsx` (`LayerSlab :124-157`), données `webCraftData.ts:18-47` | 4 dalles empilées du plus visible au socle (Expérience · Conversion · Connexions · Performance, Google, sécurité), reliées par un fil vertical qui se déroule (`scaleY`, `:29-32`, `:72-76`) ; le socle porte un liseré indigo (`:143`) | même empilement, colonne unique | rendu final direct (`still`, `:34-39`) |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux. Les
schémas de l'ancienne page (sources en 9 canaux, parcours en 9 étapes) ont été refaits dans
`WebSourcesConverge` et `WebBuildLevels` ; leurs fichiers restent sur le disque (§11).

---

## 5. Surfaces et cartes

Aucune `SpotlightCard`, aucune surface `.glass-*` sur la page, hors bulle de réassurance du
`CTABand`. Deux familles de cartes maison définies dans `app/globals.css` : `.panel-card`
sur fond sombre (`:599-613`) et `.paper-card` / `.paper-sub` sur fond clair (`:627-652`).

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Surfaces papier (tokens `paper` / `ink`), ombres en `color-mix` | objets de la scène du hero (`webHeroSceneParts.tsx`) et cartes du récit mobile (`WebHeroSceneMobile.tsx:168-174`) | 6 objets desktop · 4 cartes mobile | positions absolues (desktop) · pile verticale (mobile) |
| `.panel-card` | `WebSourcesConverge` : 3 familles (`:167`) + carte « Votre site » avec en-tête `.panel-head` (`:107-108`) | 4 | `lg:grid-cols-[1fr_5.5rem_15.5rem_3rem_15.5rem]` (`:72`) |
| Carte papier (`bg-paper`, `ring-paper-line-strong`) | `WebSourcesConverge`, « Une demande exploitable » (`:142`) | 1 | dernière colonne du même schéma |
| `.paper-card` en trois bandes (contenu, « Aujourd'hui » sur `SURFACE.muted`, « Avec le bon site » sur bande `bg-ink`) | `WebCostSituations` (`:92-130`) | 4 | `grid md:grid-cols-2` (`:64`) |
| `.paper-sub` | encart de calcul de `WebCostSituations` (`:77`) | 1 | pleine largeur |
| `.paper-card` | panneau du palier choisi (`WebBuildLevels.tsx:121`) · 4 cartes de palier sur mobile (`:139`) | 1 desktop · 4 mobile | `lg:grid-cols-[17rem_1fr]` (`:63`) |
| `.panel-card` | `WebCraftFoundations` : 4 dalles (`:143`), 2 blocs d'engagements (`:85`), volet technique (`:99`) | 7 | `lg:grid-cols-[1.1fr_1fr]` (`:62`) |
| `.panel-card` + `.panel-foot` + `.glass-inset` | `CTABand framed` (`components/shared/CTABand.tsx:60`, `:106`, `:113`) | 1 | pleine largeur, `max-w-[1040px]` |

---

## 6. L'appel à l'action

- **CTA unique** : « Parler de mon site » → `/contact`, deux fois avec le même libellé : bouton du hero (`WebHeroSection.tsx:70-78`) et bouton du `CTABand` final (`SitesWebPage.tsx:50`).
- **Bouton secondaire du `CTABand`** : neutralisé (`secondary={null}`, `SitesWebPage.tsx:51`).
- **Réassurance** : sous le hero « Premier échange gratuit · sans engagement » ; sous le `CTABand` « Premier échange gratuit », « Réponse sous 24 h », « Prix fixé avant de démarrer » (`SitesWebPage.tsx:52`).
- **Texte du `CTABand`** : « Que vous partiez de zéro ou que vous ayez déjà un site à refaire, dites-moi ce qu'il devrait vous apporter. Je vous réponds franchement : ce qui est utile, et ce que ça coûterait. » (`:49`)
- **Lien secondaire** (pas un CTA) : « Du site vitrine au site relié à vos outils » → ancre `#ce-que-je-construis` (`WebHeroSection.tsx:85-95`).
- **Autres sorties de la page** : « Aller plus loin : automatiser les suites » → `/automatisation` (palier 3) et « Besoin d'un véritable outil métier : les applications » → `/applications` (palier 4) (`webBuildData.ts:58, 70`, rendus `WebBuildLevels.tsx:172-180`). Sur desktop, seul le palier choisi est affiché (palier 1 par défaut, `:36`) : ces deux liens n'apparaissent qu'au clic sur le palier 3 ou 4. Ils restent présents dans le HTML via la liste mobile (`lg:hidden`, `:137-147`), qui rend les quatre paliers.

---

## 7. Le design en détail

- **Accents** : indigo et cyan de la marque. Titres de section en `.text-gradient-strong` (réassombri sur surface claire, `globals.css:844`) ; h1 et titre du `CTABand` en `.text-gradient-fluid`. Pastilles d'icônes `bg-ink text-cyan` sur les surfaces claires, repris partout (coûts, paliers, récit mobile).
- **Décor** : `PageAtmosphere preset="web"` en fond fixe (2 `GlowOrb` + 10 lignes verticales dont l'opacité pulse, `PageAtmosphere.tsx:113-131`) visible derrière les sections sombres. Chaque section porte en plus son `SectionFluidBackdrop` (nappes SVG statiques, fondu à l'entrée) : variantes `webHero`, `webSources`, `webCost`, `webBuild`, `webCraft` (`components/shared/SectionFluidBackdrop.tsx:30-34`), et `cta` pour le bandeau final. Le hero ajoute une grille masquée en ellipse (`WebHeroSection.tsx:37-41`).
- **Menu sur fond clair** : le hero, `WebCostSituations` et `WebBuildLevels` appellent `useLightHeaderZone` (`components/layout/headerSurface.ts`) : le menu passe à l'encre quand une de ces sections est dessous.
- **Rythme vertical** : `section-shell-tight` pour les quatre sections (padding bas forcé `pb-12! lg:pb-14!` sur `WebCraftFoundations`, `:43`) ; `section-shell` pour le `CTABand`. Coins arrondis `rounded-[2rem]` / `lg:rounded-[3.5rem]` aux jonctions clair / sombre.
- **Largeurs** : `section-container-wide` pour le hero (`WebHeroSection.tsx:44`, grille `xl:grid-cols-[27rem_1fr]`), `section-container` partout ailleurs.
- **Profondeur** : réelle seulement dans la scène du hero en tier `full` (`preserve-3d`, `translateZ` de -40 à 110 px selon l'objet et l'étape, `WebHeroScene.tsx:75-92`). Ailleurs, relief par ombres et `color-mix`.
- **Typographie** : h1 de `text-4xl` à `xl:text-[3.6rem]` ; titres de section via `SectionHeading` (`centered={false}`, `labelStyle="eyebrow"`) ; numéros en `font-mono` (`01`, `02`…) sur les cartes de coût, les paliers et les couches.
- **Signature de la page** : la scène « Côté visiteur / Côté entreprise » où la demande voyage réellement d'un objet à l'autre, et l'échelle des paliers dont le schéma se complète en pointillé.

---

## 8. Sur téléphone (390 px)

- **Hero** : la scène 2.5D n'est ni téléchargée ni montée. `WebHeroSceneMobile` raconte le même récit en 4 moments numérotés `01` à `04` (`webHeroSceneData.ts:146-151`), texte à taille de lecture, cartes papier.
- **Sources** : colonne unique, flèches vers le bas entre familles, site et demande ; courbes SVG masquées.
- **Coûts** : 4 cartes en une colonne (2 colonnes dès `md`).
- **Paliers** : l'échelle interactive disparaît (`hidden lg:grid`) ; les 4 paliers s'affichent l'un sous l'autre avec leur mention « Palier 0X » (`WebBuildLevels.tsx:165-167`) et leur circuit en texte, parce que le schéma y serait illisible (`:27-28`).
- **Couches** : dalles puis engagements, en une colonne.
- **Décor** : `SectionFluidBackdrop` bascule sur sa composition téléphone (`sm:hidden`, `SectionFluidBackdrop.tsx:112-119`) ; tier `reduced` sur mobile, donc `PageAtmosphere` allégée (2 halos, grille statique, `PageAtmosphere.tsx:61-84`).

---

## 9. SEO

| | |
|---|---|
| `title` | « Site web : des clients, pas juste du joli » + gabarit `%s · Solutions 2IA` (`app/layout.tsx:31`) : **57 caractères**, suffixe compris (`page.tsx:11`) |
| `description` | « Sites web clairs, rapides et bien référencés sur Google : de la vitrine au site connecté (réservation, espace client, paiement). Dès 500 €, échange gratuit. » (**156 caractères**, `page.tsx:12-13`) |
| `openGraph` | titre « Création de site web : un site qui vous amène des clients » (`page.tsx:21-27`) |
| `canonical` | `/sites-web` (`page.tsx:20`) |
| JSON-LD | `combineSchemas(buildServiceSchema(...), buildBreadcrumbSchema(...))`, id `ld-sites-web` (`page.tsx:31-49`) : service « Création de site web », audience « PME et indépendants » ; fil d'Ariane Accueil › Services › Sites web |
| Sitemap | `app/sitemap.ts:45`, route pilier, priorité 0,9 |
| h1 | un seul (`WebHeroSection.tsx:51`) ; chaque section a son `h2` via `SectionHeading` |
| Liens internes sortants (hors menu et pied de page) | `/contact` (×2), `/automatisation`, `/applications` : 3 destinations distinctes, au-dessus du minimum de 2 |

---

## 10. Performance

- **Bundle initial** : seul le hero (`WebHeroSection`, avec `WebHeroSceneMobile` importé statiquement). Les quatre sections sont en `dynamic()` avec SSR conservé : contenu dans le HTML, JS hydraté plus tard (`SitesWebPage.tsx:6-24`).
- **Scène du hero** : `dynamic(..., { ssr: false, loading: () => null })`, montée après hydratation et seulement au-dessus de 767 px (`isMobile` = `max-width: 767px`, `lib/animation/usePerformanceMode.ts:188`). Sa boîte `aspect-[820/660]` est réservée dès le SSR : aucun décalage au montage (`WebHeroSection.tsx:99-103`). Une seule minuterie vivante (`setTimeout` par étape, `WebHeroScene.tsx:147-154`), `transform` et `opacity` uniquement.
- **LCP** : h1 et sous-titre peints en CSS (`.hero-enter` avec `--enter-delay`), jamais d'`opacity: 0` animée en JS ; la scène entre en `hero-enter-fade`.
- **Par tier** :
  - `full` : scène inclinée, boucles d'opacité de `PageAtmosphere`, révélations `whileInView` ;
  - `reduced` (mobile, tactile, machine modeste) : scène à plat, `PageAtmosphere` allégée ;
  - `minimal` et `prefers-reduced-motion` : scène figée sur l'étape finale, toutes les sections rendues dans leur état final (`disableContentMotion`), `PageAtmosphere` réduite à un radial statique.
- **Point sensible** : les fichiers de la scène pèsent environ 1 250 lignes (`WebHeroScene.tsx` 454, `webHeroSceneParts.tsx` 651, `webHeroSceneData.ts` 151), hors du chemin critique mais à surveiller si la scène grossit.

---

## 11. État et suite

- **Ce qui est fait** : refonte complète du 27 septembre 2026. Nouveau hero clair avec scène 2.5D et récit mobile dédié ; quatre nouvelles sections (`WebSourcesConverge`, `WebCostSituations`, `WebBuildLevels`, `WebCraftFoundations`) ; comparatif agence et fondations fusionnés en « couches et engagements » ; bouton secondaire du `CTABand` retiré ; `CTABand` en rendu cadré.
- **Composants débranchés mais présents sur le disque** (cités seulement dans le commentaire `SitesWebPage.tsx:10-12`, vérifié par `grep -rlw` sur `app/`, `components/`, `lib/` : aucun import restant hors de leurs propres fichiers) : `WebOpportunitySources.tsx` (+ `webOpportunitySourcesData.ts`), `WebOpportunityFlow.tsx` (+ `webOpportunityData.ts`), `WebPainBusiness.tsx` (+ `webPainData.ts`), `WebVsAgency.tsx` (+ `webVsAgencyData.ts`), `WebFoundations.tsx` (+ `webFoundationsData.ts`), et la scène `components/scenes/web/WebScene.tsx`. Candidats au nettoyage une fois la refonte validée.
- **Ce qui reste** : aucun chantier ouvert dans `docs/chantiers/` pour cette version. Pas de réalisation client montrée sur la page.
- **Note de conversion** : l'audit du 6 septembre 2026 (`docs/audits/2026-09-06-conversion/sites-web/README.md`, 68/100) porte sur une page qui n'existe plus. À re-noter avec `conversion-auditor`.

---

## Incohérences relevées avec la documentation existante

- **`CLAUDE.md`**, tableau des routes : la scène de hero de `/sites-web` y est encore `WebScene`. La scène réelle est `WebHeroScene` (`components/sections/sites-web/`), `WebScene` n'est plus importée.
- **Pattern de page** : `CLAUDE.md` décrit `<Nom>Page.tsx` comme composant client. `SitesWebPage.tsx` n'a pas de `"use client"` : c'est un composant serveur qui assemble des sections client, choix délibéré (commentaire `:6-8`).
- **`PageAtmosphere`** : `CLAUDE.md` le présente comme un décor statique. Le preset `web` anime en boucle l'opacité de 10 lignes et de 2 halos en tier `full` (aucun suivi de souris, en revanche).
- **`docs/chantiers/2026-09-19-theme-clair.md:168`** décrit l'ancienne composition (9 canaux, plan en 9 stations, comparatif agence, fondations) : périmé pour cette page.
- **`docs/pages/README.md`** indique que toutes les fiches datent du 18 septembre 2026 : ce n'est plus vrai pour celle-ci.
