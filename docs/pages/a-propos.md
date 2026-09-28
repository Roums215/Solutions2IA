# `/a-propos` · confiance dans le fondateur

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 18 septembre 2026 · contre le code de `app/a-propos/`

---

## 1. Ce que fait cette page

Elle installe la confiance dans l'unique actif d'un indépendant qui démarre : lui-même,
sans client à montrer. Elle raconte le parcours d'Iulian et pose ses engagements de travail.

Elle ne fait pas : elle ne détaille pas les tarifs (renvoi vers `/services`), elle ne
répond pas aux questions pratiques du type prix/délai (renvoi vers `/faq`), et elle ne
décrit pas la méthode technique projet par projet (renvoi vers `/applications#methode`).

| | |
|---|---|
| Route | `/a-propos` |
| Fichiers | `app/a-propos/page.tsx` (serveur, SEO) · `app/a-propos/AProposPage.tsx` (client) |
| Preset de décor | `about` |
| Public visé | dirigeant de PME qui hésite à confier son projet à un indépendant sans référence client publique |

---

## 2. La promesse affichée

- **Titre (h1)** : « Moi, c'est Iulian » (`app/a-propos/AProposPage.tsx:113`)
- **Sous-titre** : « Je suis développeur indépendant. Je conçois et je code moi-même des
  sites web, des applications et des automatisations sur mesure. Mon but : remplacer ce
  qui vous prend du temps par un outil simple qui le fait à votre place. » (`AProposPage.tsx:114`)
- **Étiquette / badge** : « Qui je suis » (`AProposPage.tsx:112`)
- **CTA du hero** : primaire « Premier échange gratuit » → `/contact`, secondaire
  « Voir ce que je fais » → `/services` (`AProposPage.tsx:115-116`)
- **Niveau 1 (dirigeant de PME)** : la personne qui comprend le besoin est celle qui
  construit, les prix sont accessibles parce que l'activité démarre, réponse sous 24 h.
- **Niveau 2 (visiteur averti)** : un `<details>` repliable « Pour ceux qui veulent
  vérifier : comment je travaille techniquement » (`AProposPage.tsx:229-278`), avec
  avancement bimensuel, propriété du code (dépôt Git), stack (Next.js, React, TypeScript,
  PostgreSQL, n8n, Claude, Mistral) et deux liens sortants (`/applications#methode`, `/faq`).

---

## 3. Structure, dans l'ordre

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero « Moi, c'est Iulian » | `PageHero` (`AProposPage.tsx:111-117`) | qui est Iulian, ce qu'il fait |
| 2 | c'est quoi (suite) | « Mon parcours » | 4 paragraphes + 3 `metric-tile` (`AProposPage.tsx:120-172`) | DFT (Digital Factory Telecom), Ramsay Santé, formation en ingénierie du web, zone France/Belgique/Suisse/Luxembourg |
| 3 | ce que ça apporte | « Mes engagements » | `SectionHeading` + 6 cartes maison (`AProposPage.tsx:175-216`) | 6 engagements concrets, dont un lien vers la grille de prix `/services` |
| 4 | comment ça marche | « Ma façon de travailler » | `PremiumFlowPanel` + `<details>` technique (`AProposPage.tsx:219-280`) | 4 règles (comprendre, construire, vérifier, rester) et, pour qui veut creuser, le détail technique |
| 5 | pour qui | « Si ces phrases vous parlent… » | `SectionHeading` + 2 blocs convictions (`AProposPage.tsx:283-328`) | « Ce en quoi je crois » / « Ce que je refuse de faire » |
| 6 | l'étape suivante | `CTABand` | `CTABand` (`AProposPage.tsx:331-336`) | CTA unique « Premier échange gratuit » |

---

## 4. Schémas et animations

Aucun schéma pédagogique animé sur cette page (pas de SVG explicatif, pas de scène de
`components/scenes/`). C'est un choix de fond, déjà relevé par l'audit du 6 septembre 2026
(« D2 · Pédagogie visuelle : 8/25, aucun schéma, aucune photo »), toujours vrai dans le code.

Ce qui existe est décoratif, pas explicatif :

| Élément | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| `PageAtmosphere preset="about"` : 2 halos + 3 anneaux concentriques respirants | `components/shared/PageAtmosphere.tsx:317-332` | ambiance calme, pas d'information | inchangé (fond `fixed`) | `reduced` : 2 halos sans anneaux · `minimal` : fond statique seul |
| `SectionParticles style="hexagons"` (8) puis `style="crosses"` (10) | `AProposPage.tsx:176`, `:284` | texture de fond des sections engagements/pour qui | densité réduite sur mobile (géré en interne) | `reduced` : 4 points max · `minimal` : rien |
| Barre d'accent verticale au survol de chaque carte engagement | `AProposPage.tsx:192-193` | met en avant la carte survolée | pas de hover réel au tactile, la barre reste discrète | `transform`/`opacity` uniquement |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux. Ici il n'y en a simplement jamais eu.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `.metric-tile` | repères vérifiables (formation, projets, zone) (`AProposPage.tsx:163`) | 3 | `grid-cols-1 sm:grid-cols-3` |
| Carte maison (bord gauche en dégradé, pas de fond) | « Mes engagements » (`AProposPage.tsx:191-212`) | 6 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Carte maison (`bg-bg-card/60`, `rounded-2xl`) | convictions « je crois » / « je refuse » (`AProposPage.tsx:298-325`) | 2 | `grid-cols-1 md:grid-cols-2` |
| `PremiumFlowPanel` (glass, `bg-bg-card/58` + `backdrop-blur-xl`) | « Ma façon de travailler » (`AProposPage.tsx:221-227`) | 1 panneau, 4 étapes internes | pleine largeur |
| `<details>` glass (`bg-bg-card/60`) | volet technique (`AProposPage.tsx:229`) | 1 | pleine largeur |

Aucun `SpotlightCard` sur cette page : l'inventaire du chantier verre (`docs/chantiers/2026-09-17-cartes-verre.md:174`) le confirme (0 SpotlightCard, 1 metric-tile, 2 familles de cartes maison). Les cartes d'engagements n'ont pas de fond opaque : seule la barre d'accent gauche se colore, le reste reste transparent sur le décor.

---

## 6. L'appel à l'action

- **CTA unique** : « Premier échange gratuit » → `/contact`, dans le `CTABand` final (`AProposPage.tsx:334`) et déjà en primaire dans le hero (`AProposPage.tsx:115`)
- **Réassurance sous le bouton** : réassurance par défaut du `CTABand`, non surchargée : « Réponse sous 24 h », « Premier échange offert », « Sans engagement » (`components/shared/CTABand.tsx:24`)
- **Liens secondaires** (ils ne comptent pas comme un second CTA) : « Voir ce que je fais » → `/services` dans le hero (`AProposPage.tsx:116`) ; le `CTABand` lui-même désactive tout bouton secondaire (`secondary={null}`, `AProposPage.tsx:335`), respectant la règle du CTA unique en bas de page
- **Autres sorties de la page** : `/applications#methode` et `/faq` (volet technique, `AProposPage.tsx:265-274`), `/services` (lien « Voir les fourchettes de prix » dans la carte engagement prix, `AProposPage.tsx:35`)

---

## 7. Le design en détail

- **Accents** : preset `about`, teintes indigo/cyan discrètes, anneaux concentriques respirants au lieu des motifs « circuit » ou « réseau de neurones » des pages plus techniques
- **Rythme vertical** : `section-shell` sur les 4 sections de corps, alternance section nue / section avec `SectionParticles`
- **Largeurs** : `section-container-narrow` pour le hero et « mon parcours », `section-container` pour engagements, méthode et convictions
- **Profondeur** : halos flous du `PremiumFlowPanel` (`rgba(accent,0.16)` et `rgba(accent,0.11)`), pas de `translateZ` observé sur cette page, cartes engagements/convictions restent plates
- **Typographie** : h1 standard `PageHero` (4xl → `[4rem]`), h2 standard `SectionHeading` (3xl → `[3.1rem]`), numérotation mono « 01 » à « 06 » sur les cartes d'engagement (`AProposPage.tsx:194-196`)
- **Ce qui fait la signature de cette page** : le duo « Ce en quoi je crois » / « Ce que je refuse de faire », qui traite cinq objections en creux sans jamais les nommer comme telles ; propre à cette page, ne se retrouve nulle part ailleurs sur le site

---

## 8. Sur téléphone (390 px)

Pas de scène de hero (aucun `visual` n'est passé à `PageHero`), donc pas d'aperçu mobile
(`MobileHeroPreview` ne se déclenche jamais ici) : le hero mobile est simplement le badge,
le h1, la description et les deux boutons, centrés. Les trois grilles (repères, engagements,
convictions) passent en une colonne (`sm:grid-cols-3` / `md:grid-cols-2 lg:grid-cols-3` /
`md:grid-cols-2` retombent à `grid-cols-1`).

---

## 9. SEO

| | |
|---|---|
| `title` | « À propos : Iulian, développeur indépendant » (42 caractères, 58 avec le suffixe ` · Solutions 2IA`) (`app/a-propos/page.tsx:8`) |
| `description` | 158 caractères (`app/a-propos/page.tsx:9-10`) |
| `canonical` | `/a-propos` (`app/a-propos/page.tsx:11`) |
| JSON-LD | `ProfilePage` avec `mainEntity` `Person` `#founder` (rattaché à l'`Organization` du layout) + `BreadcrumbList`, combinés via `combineSchemas` (`app/a-propos/page.tsx:22-46`) |
| Liens internes sortants | `/contact`, `/services` (×2), `/applications#methode`, `/faq` : largement au-dessus du minimum de deux |

---

## 10. Performance

- Sections en `dynamic()` : aucune. Toute la page est un unique composant client
  (`AProposPage.tsx`), contrairement au motif de `/` qui découpe ses sections en
  `dynamic()`
- Comportement par tier : géré en interne par `PageAtmosphere` (orbes + anneaux en
  `full`, 2 halos en `reduced`, fond statique en `minimal`) et `SectionParticles`
  (densité pleine, 4 points, ou rien) ; la page elle-même n'appelle pas
  `usePerformanceMode` directement
- Points sensibles : le hero n'a pas de scène (`visual` non fourni), donc l'élément LCP
  est le h1 texte peint en CSS pur (`.hero-enter`), pas de risque de régression LCP lié à
  un visuel lourd sur cette page

---

## 11. État et suite

- **Ce qui est fait** : réécriture du 7 septembre 2026 (engagements réécrits en « je »
  avec repères vérifiables, note ajoutée dans l'audit) ; le `PremiumFlowPanel` rend
  désormais son titre en `h2` par défaut (`components/shared/PremiumFlowPanel.tsx:30`
  et appel sans `headingLevel` dans `AProposPage.tsx:221-227`), ce qui corrige le saut
  h1 → h3 que l'audit du 6 septembre signalait avant `PremiumFlowPanel`
- **Ce qui reste** : chantier ouvert `docs/chantiers/2026-09-17-cartes-verre.md`, rang 8
  sur 9, statut « à faire » (« peu de cartes, passage rapide »,
  `docs/chantiers/2026-09-17-cartes-verre.md:80`)
- **Note de conversion** (audit du 6 septembre 2026) : 62/100 (contenu 69, design 67,
  conversion 53). L'audit précise lui-même que cette note précède la réécriture du
  7 septembre 2026 déjà présente dans le code actuel et qu'elle doit être « re-notée » ;
  aucune re-notation n'a été faite à ce jour, à vérifier avec `conversion-auditor`
