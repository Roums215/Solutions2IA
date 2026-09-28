# `/services` · carrefour des cinq offres

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 18 septembre 2026 · contre le code de `app/services/`

---

## 1. Ce que fait cette page

C'est la page carrefour : elle présente les cinq services avec leur prix et aiguille vers
la bonne page produit. Elle ne détaille pas chaque service en profondeur (schémas,
garde-fous techniques : c'est le rôle de `/sites-web`, `/applications`, `/agents-ia`,
`/automatisation`, `/rag`) et ne remplace pas la FAQ ni `/contact` pour les questions de
délai détaillées.

| | |
|---|---|
| Route | `/services` |
| Fichiers | `app/services/page.tsx` (serveur, SEO, JSON-LD) · `app/services/ServicesPage.tsx` (client, tout le rendu ; aucun sous-dossier `components/sections/services/` n'existe, le contenu de section est déclaré en constantes locales dans ce fichier) |
| Preset de décor | `services` (`components/shared/PageAtmosphere.tsx:101-111`) |
| Public visé | visiteur qui sait qu'il a un problème mais ne sait pas encore lequel des cinq services y répond |

---

## 2. La promesse affichée

- **Étiquette** : « Ce que je fais » (`app/services/ServicesPage.tsx:216`)
- **Titre (h1)** : « Cinq façons de vous faire gagner du temps » (`:217`, « gagner du temps » en `.text-gradient-strong`)
- **Sous-titre** : « Sites web, applications, automatisations, assistants IA, mémoire d'entreprise. Cinq services, une seule logique : remplacer ce qui vous prend du temps par un outil qui le fait à votre place. » (`:218`)
- **Ligne de réassurance sous les CTA du hero** : « Sites web dès 500 €, applications dès 1 500 €. Le premier échange dure 45 minutes, sans engagement. » (`:221`)
- **Niveau 1 (dirigeant de PME)** : les cinq cartes de service, en français courant (« Assistant intelligent » plutôt que « agent IA », « Mémoire d'entreprise » plutôt que « RAG »)
- **Niveau 2 (visiteur averti)** : pas de volet technique dédié sur cette page (contrairement à l'accueil) ; le détail technique se trouve uniquement sur les pages produit filles

---

## 3. Structure, dans l'ordre

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero : promesse + schéma des 5 services empilés | `PageHero` (`components/shared/PageHero.tsx`), appelé à `ServicesPage.tsx:215-228`, visuel `ServicesStackVisual` (`:174-209`) | les cinq services forment un seul système, on peut commencer par une seule brique |
| 2 | ce que ça apporte (détail des offres) | Les cinq services, en détail | 5 × `SpotlightCard` dans une boucle (`:249-293`) | ce que chaque service inclut et son prix de départ |
| 3 | ce que ça apporte (prix) | Grille tarifaire | section `id="prix"` (`:299-349`), 7 cartes « maison » | fourchette de prix, ce que chaque prestation remplace, le délai |
| 4 | comment ça marche | Méthode en quatre étapes | `SectionHeading` + `PremiumFlowPanel` (`:352-367`) | le même déroulé pour tous les projets |
| 5 | comment ça marche (différenciation) | Ce qui change avec un indépendant | 4 items en liste, sans carte (`:371-398`) | pourquoi un indépendant plutôt qu'une agence |
| 6 | pour qui | Six situations reconnaissables | liste divisée, sans carte (`:401-428`) | chaque situation renvoie vers le service qui y répond |
| 7 | l'étape suivante | CTA unique | `CTABand` (`:430-435`) | une seule action : premier échange gratuit |

---

## 4. Schémas et animations

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Pile des 5 services (`ServicesStackVisual`) | `ServicesPage.tsx:174-209` | les 5 services empilés en couches, du site web (l'entrée) à la mémoire d'entreprise (le socle), en perspective 3D (`preserve-3d`, profondeur via `translateZ`/`z`) ; commentaire dans le code : « Le seul schéma de la page » (`:165`) | remplacé par `MobileHeroPreview`, un aperçu à 3 étapes propre à cette page (`mobileSteps`, `ServicesPage.tsx:223-227`), affiché sous `sm` par `PageHero` | le flottement vertical des couches (`animate={{ y: [0, -5, 0] }}`) est coupé par `disableContentMotion` (`usePerformanceMode`, `:175,190`) ; le schéma reste visible, seule l'animation cesse |

C'est la seule page « produit hub » du site avec un unique schéma (contre plusieurs sur les
pages filles) ; l'audit de conversion de septembre 2026 notait justement son absence
(section 11) avant qu'il ne soit ajouté.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `SpotlightCard` | Les cinq services détaillés (`:252`, glow différent par carte via `cardGlows`, `tilt={3}`, `pulse`) | 5 (1 composant, 5 instances) | empilées verticalement (`space-y-10 lg:space-y-12`), pas une grille |
| Carte maison opaque, `bg-bg-card/60` | Grille tarifaire (`:317`) | 7 | `grid-cols-1 sm:grid-cols-2`, dernière carte en `sm:col-span-2` |
| Carte maison translucide, `bg-bg-card/70` | `ServicesStackVisual`, chaque couche (`:188`) | 5 | empilement 3D, pas une grille |
| Carte maison opaque, `bg-bg-card/58` + `backdrop-blur-xl` (composant partagé) | `PremiumFlowPanel` (panneau) + 4 tuiles `bg-bg-secondary/62` | 1 panneau + 4 tuiles | tuiles en `grid sm:grid-cols-2` |
| Aucune carte (liste à puce) | « Ce qui change avec un indépendant » (`:386-395`) | 4 items | `grid-cols-1 md:grid-cols-2` |
| Aucune carte (liste divisée) | « Six situations » (`:415-425`) | 6 items | liste verticale `divide-y`, volontairement sans carte pour ne pas concurrencer le CTA (commentaire `:400`) |

**Aucune surface `.glass-*` sur cette page** : ni `.glass-card`, ni `.glass-surface`, ni
`.glass-bubble`. C'est cohérent avec `docs/chantiers/2026-09-17-cartes-verre.md`, qui place
`/services` au rang 2 de la liste de passage au verre, encore « à faire » à la date de cette
fiche. Toutes les cartes actuelles (`SpotlightCard`, cartes « maison ») restent opaques par
choix du chantier (SpotlightCard n'est pas concerné par le passage au verre, les cartes
maison le seront lors de la passe dédiée à cette page).

---

## 6. L'appel à l'action

- **CTA unique** : « Premier échange gratuit » dans le hero (`primaryCta`, `:219`, vers `/contact`) et « Premier échange gratuit » répété dans le `CTABand` final (`:433`, même destination) : même action affichée deux fois, conforme à la règle du site.
- **Réassurance sous le bouton du hero** : « Sites web dès 500 €, applications dès 1 500 €. Le premier échange dure 45 minutes, sans engagement. » (`:221`)
- **Liens secondaires** (ils ne comptent pas comme un second CTA) : bouton secondaire du hero « Qui je suis » → `/a-propos` (`:220`) ; dans chaque carte de service, un lien de type « Voir des exemples de sites », etc., qui mène en fait à la même page que le clic sur la carte entière (`:23,33,43,53,63`)
- **Autres sorties de la page** : vers chacune des 5 pages produit depuis les cartes de service et depuis les 6 « situations » (`/sites-web`, `/applications`, `/automatisation` dont un ancre `#facture-electronique-2026`, `/agents-ia`, `/rag`), largement au-dessus du minimum de deux liens sortants

---

## 7. Le design en détail

- **Accents** : preset `services` de `PageAtmosphere` : 2 halos respirants (indigo, cyan) et une grille de fond dont l'opacité pulse doucement (`PageAtmosphere.tsx:103-109`).
- **Rythme vertical** : `section-shell` pour les services détaillés, les prix et l'approche ; `section-shell-tight` pour la méthode ; `section-shell-compact` pour les six situations.
- **Largeurs** : `section-container` partout ; la grille tarifaire est resserrée à `max-w-4xl`, la liste de situations à `max-w-3xl`.
- **Profondeur** : la seule vraie mise en scène de profondeur de la page est `ServicesStackVisual` (`perspective`, `preserve-3d`, `translateZ` via la prop `z`) ; les `SpotlightCard` utilisent leur `translateZ` interne standard sur l'icône (`style={{ transform: "translateZ(30px)" }}`, `:258`) et le titre (`translateZ(20px)`, `:261`).
- **Typographie** : h1 par défaut de `PageHero` (non redéfini sur cette page) ; h2 de section classiques via `SectionHeading`.
- **Ce qui fait la signature de cette page** : la grille tarifaire avec fourchettes et aveu explicite (« le prix exact dépend de vos besoins, il peut être plus bas comme plus haut », `:304`) : c'est la page la plus transparente du site sur les prix, contrairement aux pages produit qui ne fixent pas de fourchette.

---

## 8. Sur téléphone (390 px)

- Le hero remplace `ServicesStackVisual` par `MobileHeroPreview`, un panneau dédié à 3 étapes (« Site web », « Application », « Assistant IA ») avec ses propres halos et un badge « Live » animé (`components/shared/PageHero.tsx`, classe `sm:hidden` sur le panneau mobile).
- Les 5 cartes `SpotlightCard` restent empilées (elles l'étaient déjà en desktop, pas de réorganisation de grille).
- La grille tarifaire passe de 2 colonnes à 1 colonne sous `sm`.
- Le bloc « Ce qui change avec un indépendant » passe de 2 colonnes à 1 sous `md`.
- La méthode (`PremiumFlowPanel`) empile son panneau et ses 4 tuiles en 1 colonne sous `lg`/`sm`.
- La liste des six situations reste une liste verticale à toutes les tailles (déjà en 1 colonne).

---

## 9. SEO

| | |
|---|---|
| `title` | « Mes services : site, application, IA » (36 caractères), complété par le template du layout → « Mes services : site, application, IA · Solutions 2IA » (52 caractères) |
| `description` | « Sites web, applications sur mesure, automatisations et IA pour PME : cinq façons de remplacer ce qui vous prend du temps. Prix clairs, premier échange gratuit. » (159 caractères) |
| `canonical` | `/services` (`app/services/page.tsx:21`) |
| JSON-LD | `combineSchemas` de `buildServiceSchema` (nom, description, type de service, audience), `buildBreadcrumbSchema` (Accueil → Services) et `buildOfferCatalogSchema` (les 5 services comme `Offer`, avec `priceRange` pour Site web, Application et Agent IA ; Automatisation et RAG sans fourchette) (`app/services/page.tsx:32-84`, id `ld-services`) |
| Liens internes sortants | très au-dessus du minimum de 2 : les 5 pages produit, `/a-propos`, `/contact` (×2), `/automatisation#facture-electronique-2026` |

**Point à vérifier** : `app/services/page.tsx:22-28` déclare son propre objet `openGraph`
(titre, description, url, type) sans `images`. Le commentaire de `app/page.tsx:13`
prévient que déclarer `openGraph` sur une page « remplacerait celle du layout (image OG
perdue) » ; à vérifier si cette règle s'applique aussi ici ou si l'image générée par
`app/opengraph-image.tsx` (convention de fichier Next.js, indépendante de l'objet
`openGraph`) s'ajoute correctement pour `/services`. Pas de test visuel effectué pour cette
fiche.

---

## 10. Performance

- **Aucune section n'est chargée en `dynamic()` sur cette page** : tout `ServicesPage.tsx` est un seul composant client monté d'un bloc (contrairement à l'accueil, qui différe l'hydratation de 5 sections sous la ligne de flottaison).
- Comportement par tier (`usePerformanceMode`) : seul `ServicesStackVisual` consulte `disableContentMotion` pour couper le flottement vertical des 5 couches (`:175,190`) ; le reste des animations de la page (reveals `motion.div`/`motion.ul` avec `whileInView`) n'a pas de garde de tier explicite dans ce fichier.
- Points sensibles de la page : le titre et le sous-titre du hero passent par `PageHero`, dont le rôle est le même que `HeroSection` sur l'accueil (peindre le h1 en CSS avant hydratation) ; à vérifier dans `components/shared/PageHero.tsx` si cette page bénéficie du même traitement LCP que l'accueil (non audité en détail dans cette fiche).

---

## 11. État et suite

- **Ce qui est fait** : d'après `docs/audits/2026-09-06-conversion/services/README.md`, la « Mise en œuvre (7 septembre 2026) » documentée ne couvre que les fourchettes de prix, la ligne de réassurance sous le hero et le raccourcissement du titre. Le code actuel va au-delà de ce qui est journalisé : le schéma en couches (`ServicesStackVisual`), la colonne « Remplace » et le champ « Délai » dans la grille tarifaire, ainsi que la mention du pilote 30 jours sous la grille, sont tous présents dans le code alors qu'ils ne sont pas listés dans le journal de mise en œuvre de l'audit. Le libellé de la section méthode a aussi été changé en « Ce qui se passe après votre message », comme le recommandait l'audit (section 7, P2).
- **Ce qui reste** : passage au verre des cartes (`docs/chantiers/2026-09-17-cartes-verre.md`, rang 2, statut « à faire ») ; le simulateur de gain suggéré par l'audit (section 8, « geste à copier ») n'existe pas dans le code.
- **Note de conversion** (audit du 6 septembre 2026, `docs/audits/2026-09-06-conversion/services/README.md`) : **70/100** global (contenu 76, design 69, conversion 66), noté **avant** la mise en œuvre du 7 septembre 2026 et avant l'ajout apparent du schéma en couches. Le README le signale lui-même : « Les notes ci-dessus décrivent la page avant ces changements. À re-noter avec la grille. » Cette fiche ne recalcule pas la note.

---

## Incohérences relevées avec la documentation existante

- **Journal d'implémentation incomplet** : le journal « Mise en œuvre (7 septembre 2026) » de l'audit de conversion ne mentionne ni le schéma en couches, ni la colonne « Remplace »/« Délai » de la grille tarifaire, ni la mention du pilote 30 jours, alors que ces trois éléments (recommandations P1 de l'audit) sont bien présents dans `ServicesPage.tsx` actuel. Soit ils ont été ajoutés plus tard sans mise à jour du journal, soit le journal doit être complété.
- **Chantier verre** : la fiche confirme l'inventaire du 17 septembre 2026 (`docs/chantiers/2026-09-17-cartes-verre.md`, §8.1) : `/services` compte toujours 0 surface `.glass-*`, la page n'a pas encore été passée au verre.
- **OG image** : à vérifier si l'`openGraph` propre à `/services` (sans `images`) conserve bien l'image générée par `app/opengraph-image.tsx`, au vu de l'avertissement inscrit dans `app/page.tsx:13` pour la page d'accueil.
