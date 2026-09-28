# `/automatisation` · des logiciels qui se parlent

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> **Mis à jour le 29 septembre 2026** · contre le code de `app/automatisation/` et
> `components/sections/automation/` (refonte « V3 » des 28 et 29 septembre 2026).
> La fiche précédente (18 septembre) décrivait l'ancienne page : `AutomationScene` à
> métriques, quatre cartes de cas, `IntegrationsConnect`, `SectorGrid`, `ChorusProSection`.
> Tout cela est débranché de cette page.

---

## 1. Ce que fait cette page

Montrer à un dirigeant de PME que **ce qui se répète entre ses logiciels peut se faire
seul** : une information entre, le reste s'enchaîne. Identité « systèmes reliés » : un
moteur de règles au centre, des déclencheurs à gauche, des outils à droite. La page
s'appuie sur une seule preuve réelle (le propre flux de prospection d'Iulian, JobPhoning →
n8n → Axonaut) et sur des exemples signalés comme tels. Elle ne vend pas un assistant qui
comprend avant d'agir (`/agents-ia`), ni un outil métier complet (`/applications`), et
ne détaille pas chaque secteur (`/automatisation/[secteur]`, atteint par les onglets métier).

| | |
|---|---|
| Route | `/automatisation` |
| Fichiers | `app/automatisation/page.tsx` (serveur, SEO, 54 lignes) · `app/automatisation/AutomatisationPage.tsx` (90 lignes, **sans `"use client"`** : composition serveur, commentaire `:8-9` ; les sections sont des Client Components) |
| Sections | `components/sections/automation/` : `AutoHeroSection` · `AutoHeroScene` · `AutoHeroSceneMobile` · `autoHeroParts` · `autoHeroData` · `AutoDaily` · `AutoRealCase` · `AutoConnect` · `AutoTrades` · `AutoInvoice` · `AutoMethod` · `autoPageData` (+ `brandLogos` pour les logos tiers) |
| Preset de décor | **`flow`** (`AutomatisationPage.tsx:31`) : `FlowSystemField` dans `components/shared/PageAtmosphere.tsx:165,247-265`, radial + deux halos flous (cyan en haut à droite, indigo en bas à gauche) + trois courbes SVG très discrètes. Preset créé pour cette page seulement ; l'ancien preset `automation` n'y est plus utilisé |
| Fonds de section | `SectionFluidBackdrop` variantes `flowHero` (hero), `flowLight` (sections claires), `flowDark` (sections sombres) |
| Public visé | dirigeant de PME qui ressaisit, relance et transfère à la main entre plusieurs outils |
| État git | fichiers V3 encore non suivis sur la branche `refonte/homepage-v2` au 29/09/2026 |

---

## 2. La promesse affichée

- **Étiquette** : « Automatisation · sur mesure » (`AutoHeroSection.tsx:32`, `text-cyan`)
- **Titre (h1)** : « Ce qui se répète peut se faire **tout seul**. » (`AutoHeroSection.tsx:34-39`, « tout seul » en `.text-gradient-strong`)
- **Sous-titre** (élément LCP, `.hero-enter`) : « Ressaisies, relances, transferts d'un outil à l'autre : je relie vos logiciels pour que l'information circule sans vous. » (`AutoHeroSection.tsx:42-48`)
- **Réassurance sous le bouton** : « Premier échange gratuit, sans engagement » (`:60`)
- **Niveau 1 (dirigeant de PME)** : h1 + tableau « Aujourd'hui / Avec l'automatisation » de `AutoDaily`, sans aucun terme technique.
- **Niveau 2 (visiteur averti)** : le vocabulaire du workflow (Déclencheur, Condition, Transformation, Action) dans `AutoConnect` et `AutoTrades` ; « API » et « webhook » expliqués au survol par `TermeExplique` (`AutoConnect.tsx:178-179`) ; le cas réel nomme les outils (JobPhoning, n8n, Axonaut).

---

## 3. Structure, dans l'ordre

Huit moments (commentaire `AutomatisationPage.tsx:11-15`), alternance sombre / clair.

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero sombre : promesse + film de 4 automatisations | `AutoHeroSection` (import direct, `:6,34`) | une information entre, le reste s'enchaîne |
| 2 | ce que ça apporte | « Moins de ressaisie. Moins d'oublis. Plus de temps utile. » (clair froid `bg-paper-2`) | `AutoDaily`, `dynamic()` (`:16,37`) | quatre situations du quotidien, avant et après |
| 3 | preuve | « Un flux que j'utilise moi-même. » (sombre, `#mon-flux`) | `AutoRealCase`, `dynamic()` (`:17,40`) | ça tourne déjà, tous les jours, chez lui |
| 4 | comment ça marche | « Vos logiciels arrêtent de travailler chacun dans son coin. » (clair) | `AutoConnect`, `dynamic()` (`:18,43`) | déclencheur, condition, transformation, action ; seules les branches utiles s'allument |
| 5 | pour qui | « Le même principe. Des automatisations différentes selon votre métier. » (sombre, `#metiers`) | `AutoTrades`, `dynamic()` (`:19,46`) | son métier a son workflow |
| 6 | pourquoi maintenant | « Facture électronique : profitez-en pour supprimer les ressaisies. » (bloc court sombre, `#facture-electronique-2026`) | `AutoInvoice`, `dynamic()` (`:20,49`) | une échéance réelle devient une occasion |
| 7 | comment on démarre | « On commence par une seule tâche. » (clair, `#methode`) | `AutoMethod`, `dynamic()` (`:21,52`) | quatre temps, et ce qui est livré avec chaque flux |
| aside | maillage | deux lignes « Services liés » (`<nav>`, pas une section) | inline (`:23-26,55-72`) | `/agents-ia` et `/applications` si le besoin est ailleurs |
| 8 | l'étape suivante | « Quelle tâche refaites-vous chaque semaine ? » | `CTABand` `framed` `compact` (`:75-87`) | un seul bouton : premier échange gratuit |

Les ancres `#mon-flux`, `#facture-electronique-2026` et `#methode` sont conservées car
utilisées ailleurs (accueil, `/services`, glossaire pour la facture ; commentaire
`AutoInvoice.tsx:9-12`) et vérifiées par le test Playwright.

---

## 4. Schémas et animations

### 4.1 Le hero : un film autour d'un moteur de règles

`AutoHeroScene.tsx` (292 lignes) + `autoHeroParts.tsx` (192) + `autoHeroData.ts` (222).

- Le **moteur de règles** reste fixe au centre et fait le lien ; autour, l'objet d'entrée
  à gauche et les outils à droite n'apparaissent que quand ils servent (quatre au plus)
  (`AutoHeroScene.tsx:12-20`). Cadre signalé « Exemple de workflow » (`autoHeroParts.tsx:103`).
- **Quatre scénarios + une synthèse, environ 30 s par boucle** (`SCENARIOS`,
  `autoHeroData.ts:61-182` ; `SYNTHESIS`, `:184-200` : 6,4 + 6,4 + 6,4 + 6,8 + 3,8 s =
  29,8 s ; la boucle repart au scénario 1 sans passer par l'attente, `AutoHeroScene.tsx:40,59`) :

| Phase | Scénario | Déclencheur → résultats | Phrase de résultat |
|---|---|---|---|
| 1 | Prospection | appel qualifié de Camille Laurent (Entreprise B) → fiche client, opportunité, commercial prévenu | « Le commercial raccroche. La fiche est déjà créée. » |
| 2 | Formulaire | demande de rendez-vous de Léa Morel (Cabinet Morel) → fichier clients, agenda jeudi 10 h, mail de confirmation | « Une demande arrive. Le rendez-vous est déjà préparé. » |
| 3 | Facturation | devis DEV-2026-184 accepté (« 2 400 € HT (exemple) ») → facture, comptabilité, échéance ; mention « Peut être relié à vos outils existants. » | « Le devis est accepté. La facture suit toute seule. » |
| 4 | Terrain | rapport d'intervention validé (Entreprise C) → dossier client, PDF, mail client, tableau de suivi | « Le technicien termine. Le bureau n'a rien à ressaisir. » |
| 5 | Synthèse | 4 entrées (Appel, Formulaire, Devis, Rapport) → moteur « Déclencheur → règles → actions » → 5 outils | « Une information entre. Le reste s'enchaîne. » |

- Dans chaque scénario : l'objet arrive, une donnée part vers le moteur (1 s), le moteur
  coche ses quatre étapes, les résultats apparaissent, la phrase tient (`T`,
  `autoHeroData.ts:205-214`). Repère des quatre scénarios et **bouton pause** sous la scène
  (`AutoHeroScene.tsx:100-137`).
- **Attribut `data-auto-phase`** (`AutoHeroScene.tsx:66`) : 1 à 5, ou `static` quand le
  mouvement est coupé. Il sert aux scripts de capture (`review/automatisation/.capture.cjs`,
  hors dépôt). Ne pas le renommer sans mettre les scripts à jour.
- Plan fixe 860 × 500 mis à l'échelle en CSS pur, horloge en `setTimeout`, `transform` et
  `opacity` seulement. Aucune métrique ni faux monitoring (le test vérifie l'absence de
  « 99,98 », « tâches/heure », « 1 247 », « latence », « #847 »).

### 4.2 Le hero sur téléphone : quatre moments par scénario

`AutoHeroSceneMobile.tsx` (151 lignes) : une narration verticale, une seule
représentation à la fois (`:12-17`). Pour chaque scénario, quatre moments
(`MOBILE_MOMENTS`, `autoHeroData.ts:221`) : « Un déclencheur arrive » · « Le workflow
travaille » · « Les outils sont mis à jour » · « Tout est tracé » (journal horodaté + phrase
de résultat). 2 s par moment, 2,7 s pour le journal (`:50`), puis scénario suivant. La
synthèse n'existe pas sur téléphone. Attribut `data-auto-mobile` (`:59`, `scénario-moment`
ou `static`). Bouton « Pause / Reprendre » avec libellé (`:137-148`).

### 4.3 Les schémas des sections

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Quatre situations | `AutoDaily.tsx` (99 lignes) | tableau 3 colonnes « La situation · Aujourd'hui · Avec l'automatisation » (`:47-51`), 4 lignes (`DAILY`, `autoPageData.ts:33-63`) ; la première montre le trajet manuel « Mail → Excel → Fichier clients » | en-tête de tableau masqué, étiquettes « Aujourd'hui : » et « Avec l'automatisation » affichées dans chaque ligne (`md:hidden`, `:74,88`) | `instant` : pas de révélation échelonnée |
| Le cas réel | `AutoRealCase.tsx` (151 lignes) | colonne verticale JobPhoning (déclencheur « Appel qualifié ») → n8n (4 règles : Normaliser, Vérifier les doublons, Enrichir l'entreprise, Décider) → Axonaut (Contact, Entreprise, Opportunité) → « Commercial prévenu » ; à côté un **journal reconstitué** de 5 lignes sur papier, collant dès `lg` (`:96`), mention « Reconstitution du fonctionnement. » (`:116`). Révélation unique à l'entrée dans l'écran | journal sous le flux ; règles n8n en une colonne puis deux dès `sm` | `instant` : tout visible d'emblée |
| Workflow interactif | `AutoConnect.tsx` (187 lignes) | 3 colonnes dans une `.paper-card` : « Ce qui arrive » (5 événements : Mail, Appel, Commande, Formulaire, Document, choisis au clic **ou au survol**, `:64-80`), « Le workflow » (4 étages réécrits à chaque choix), « Où ça repart » (5 destinations, seules les utiles s'allument avec une coche « mis à jour », `:120-141`) ; la chaîne complète en une ligne dessous (`:145-161`). Rien ne tourne en boucle | événements en défilement horizontal, destinations en pastilles `flex-wrap`, 3 colonnes seulement dès `lg` (`:54`) | `instant` |
| Workflow par métier | `AutoTrades.tsx` (162 lignes) | 5 onglets (Immobilier, Cabinet / conseil, BTP / terrain, Commerce, Formation, `autoPageData.ts:177-248`) : un mini workflow étiqueté par type d'étape (Déclencheur, Condition, Action, Notification) et, à côté, le « Résultat » sur papier « Données d'exemple » (`:128-144`) | onglets en défilement horizontal ; résultat sous le workflow (grille dès `lg`) | `instant` |
| Circuit de facture | `AutoInvoice.tsx` (66 lignes) | 6 étapes verticales statiques : Votre logiciel, Facture, Transmission, Statut, Comptabilité, Relance (`autoPageData.ts:252-259`) | identique, vertical partout | aucune animation |
| Trajectoire de démarrage | `AutoMethod.tsx` (92 lignes) | 4 temps (Observer, Dessiner le flux, Tester, Déployer, `autoPageData.ts:269-274`), ligne cyan tracée une fois à l'entrée (`:49-56`) | vertical, 4 colonnes dès `md` | `instant` : ligne pleine |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux.
`AutomationPipeline` n'a pas disparu : il reste le schéma des pages secteur.

---

## 5. Surfaces et cartes

Plus aucune `SpotlightCard` ni `.glass-*` sur la page : lignes éditoriales, surfaces papier
pour les « documents », `.panel-card` sur fond sombre, bloc encre pour les livrables.

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Section papier `surface-light` arrondie | `AutoDaily` (`bg-paper-2`, `:29`), `AutoConnect` (`bg-paper`, `:35`), `AutoMethod` (`bg-paper`, `:30`) | 3 | `rounded-[2rem]`, `lg:rounded-[3.5rem]` |
| Objets de maquette papier (`bg-paper`, `OBJECT_SHADOW`) et cadre du moteur | hero (`autoHeroParts.tsx`) | 1 moteur + 1 entrée + 3 ou 4 sorties par scénario | positions absolues dans le plan 860 × 500 |
| `.panel-card` | règles n8n (`AutoRealCase.tsx:57`), workflow métier (`AutoTrades.tsx:92`), bloc facture (`AutoInvoice.tsx:19`) | 3 | facture : `lg:grid-cols-[1fr_1.1fr]` |
| `.paper-card` | carte de workflow (`AutoConnect.tsx:53`) | 1 | `lg:grid-cols-[13rem_1fr_14rem]` |
| Carte papier sur fond sombre | journal du cas réel (`AutoRealCase.tsx:96`), résultat métier (`AutoTrades.tsx:128`) | 2 | colonne droite `21rem` / `19rem` dès `lg` |
| Bloc encre `bg-ink text-paper` | « Votre automatisation » (`AutoMethod.tsx:71`) | 1 | livrables en `sm:2` puis `lg:5` colonnes |
| Pastilles d'outils papier avec logo | `AutoConnect.tsx:165-176` | 9 + « et vos outils métier » | `flex-wrap` |

---

## 6. L'appel à l'action

- **CTA unique** (action « demander un échange ») : « Parler de mon besoin » → `/contact` dans le hero (`AutoHeroSection.tsx:51-59`) et « Premier échange gratuit » → `/contact` dans le `CTABand` final (`AutomatisationPage.tsx:82`, `secondary={null}`). Deux libellés, même destination, un seul bouton par emplacement (vérifié par le test).
- **Réassurance** : « Premier échange gratuit, sans engagement » sous le bouton du hero ; `trustItems` du bandeau : « Réponse sous 24 h » · « Premier échange gratuit » · « Sans engagement » (`:84`) ; description « Montrez-moi ce qui se répète. Je vous dirai ce qui peut être automatisé, comment, et avec quels outils. » (`:81`)
- **Liens secondaires** (pas un second CTA) : « Voir un flux que j'utilise moi-même » → `#mon-flux` (`AutoHeroSection.tsx:61-67`) ; « Le flux <métier> en détail » sous le résultat de l'onglet actif (`AutoTrades.tsx:145-153`) vers `/automatisation/immobilier`, `/automatisation/cabinet-comptable`, `/automatisation/btp` ou `/automatisation/formation` (Commerce n'a pas de lien) ; « Comprendre la facture électronique » → `/articles/facture-electronique-chorus-pro-2026-obligation` (`AutoInvoice.tsx:37-43`)
- **Autres sorties** : « Services liés », deux lignes : « Besoin qu'un assistant comprenne avant d'agir ? » → `/agents-ia` · « Besoin d'un vrai outil central pour votre activité ? » → `/applications` (`AutomatisationPage.tsx:23-26`). `RelatedServices` n'est plus monté ici (il reste utilisé par `/automatisation/[secteur]`, `/applications/[secteur]` et `/rag`).

---

## 7. Le design en détail

- **Accents** : cyan dominant (étiquette du hero, trajets du film, filets de trajectoire, coches, bordure gauche des phrases « Avec l'automatisation »), indigo en appui (étiquettes « Condition », halo bas du preset). Titres de section en `.text-gradient-strong`.
- **Rythme vertical** : hero sombre, quotidien clair, cas réel sombre, outils clair, métiers sombre, facture sombre compacte (`section-shell-compact`, sans fond propre), méthode claire. Sections en `section-shell-tight` ; `CTABand` `compact`.
- **Largeurs** : `section-container-wide` pour le hero (`AutoHeroSection.tsx:29`, grille `26rem` + scène dès `xl`), `section-container` ailleurs.
- **Profondeur** : ombres portées sur les objets papier (`OBJECT_SHADOW`, `SHEET` en `color-mix`), donnée qui voyage sur un trajet SVG `pathLength`. Pas de `translateZ` ni de halo par section : le décor vient de `SectionFluidBackdrop` et du preset `flow`.
- **Typographie** : h1 jusqu'à `xl:text-[3.5rem]` ; phrases de résultat du film en 19 px ; titres de section alignés à gauche (`centered={false}`, `labelStyle="eyebrow"`).
- **Signature de la page** : le moteur de règles immobile au centre du film, et le vocabulaire commun Déclencheur / Condition / Action repris du hero jusqu'aux onglets métier.
- **En-tête** : `useLightHeaderZone` sur les sections claires (`AutoDaily`, `AutoConnect`, `AutoMethod`).

---

## 8. Sur téléphone (390 px)

- Hero : texte complet ; la scène ordinateur n'est **jamais téléchargée** (`dynamic(..., { ssr: false })`, montée seulement si `mounted && !isMobile`, `AutoHeroSection.tsx:13-16,72`). À la place, `AutoHeroSceneMobile` : quatre moments par scénario, une représentation à la fois, hauteur fixe 304 px (`:93`).
- `AutoDaily` : le tableau devient une liste, chaque ligne porte ses étiquettes « Aujourd'hui » et « Avec l'automatisation ».
- `AutoRealCase` : le journal passe sous le flux, il n'est plus collant.
- `AutoConnect` : événements en rangée défilante, workflow, puis destinations en pastilles.
- `AutoTrades` : onglets défilants, workflow puis résultat.
- `AutoMethod` : trajectoire verticale, livrables en une colonne.

---

## 9. SEO

| | |
|---|---|
| `title` | « Automatisation : vos tâches se font seules » + gabarit du layout (`app/layout.tsx:31`) = « Automatisation : vos tâches se font seules · Solutions 2IA » (**58 caractères**) (`page.tsx:11`) |
| `description` | « Je relie vos logiciels entre eux : ressaisies, relances et transferts se font seuls. Mon propre flux de prospection en exemple. Premier échange gratuit. » (**152 caractères**, `page.tsx:12-13`, reprise telle quelle en `openGraph`) |
| `canonical` | `/automatisation` (`page.tsx:21`) |
| `openGraph` | titre « Automatisation : ce qui se répète peut se faire tout seul » (`page.tsx:22-28`) |
| JSON-LD | `combineSchemas(buildServiceSchema(...), buildBreadcrumbSchema(Accueil › Services › Automatisation))`, id `ld-automatisation` (`page.tsx:32-50`) ; la description du service mentionne la facture électronique 2026 |
| Sitemap | présent (`app/sitemap.ts:46`), avec les pages secteur (`:70`) |
| Liens internes sortants | `/contact` (×2), `/agents-ia`, `/applications`, l'article facture électronique, 4 pages `/automatisation/[secteur]` (une visible à la fois), ancre `#mon-flux` |

---

## 10. Performance

- `AutoHeroSection` dans le bundle initial ; les six sections suivantes en `dynamic()` avec SSR conservé (`AutomatisationPage.tsx:16-21`).
- `AutoHeroScene` en `dynamic(..., { ssr: false, loading: () => null })`, hors chemin du LCP ; h1 et sous-titre peints en CSS pur (`.hero-enter`).
- Par tier (`usePerformanceMode`) :
  - `full` : film complet, trajets en `pathLength` et petit bloc de donnée qui voyage de l'entrée au moteur (`AutoHeroScene.tsx:186-196`).
  - `reduced` : pas de donnée qui voyage, les liaisons vers les outils apparaissent en fondu au lieu d'être tracées (`lite`, `:48,174-175`). `PageAtmosphere` passe en deux halos + grille discrète.
  - `minimal` et `prefers-reduced-motion` : **composition fixe du scénario Prospection** (déclencheur → moteur → outils, `shown = 1`, `:46`), `data-auto-phase="static"`, pas de bouton pause. Sur téléphone : moment « Les outils sont mis à jour » du premier scénario, fixe (`AutoHeroSceneMobile.tsx:37-38`).
- Les deux scènes se mettent en pause hors écran (`PauseOffscreen` / `useInViewPause`), onglet caché et bouton pause.
- Les sections ne bouclent jamais : révélations uniques `whileInView` ou changements au clic.

---

## 11. État et suite

- **Ce qui est fait (V3, 28-29 septembre 2026)** : hero sombre avec film de 4 automatisations + synthèse (~30 s) et version téléphone ; preset `flow` et fonds `flowHero` / `flowLight` / `flowDark` ; quatre situations en tableau ; cas réel en colonne avec journal ; workflow interactif ; métiers en onglets ; facture électronique réduite à un bloc court ; méthode + livrables ; services liés en deux lignes ; `CTABand compact`.
- **Tests** : `tests/automatisation.spec.ts` (7 tests) : un seul h1 contenant « tout seul », aucune métrique de plateforme inventée, le workflow n'allume que les branches utiles (Formulaire → 3 destinations cochées), le workflow se réécrit par métier (BTP), les ancres `#mon-flux`, `#facture-electronique-2026` et `#methode` existent, deux liens de services liés et un seul lien `/contact` dans le bandeau final, aucun débordement horizontal à 1440, 1280 et 390 px.
- **Captures locales** : `review/automatisation/` (dossier non versionné, `/review/` dans `.gitignore:62`) : 5 captures du film (un scénario chacune + synthèse), captures section par section (`desktop-06` à `desktop-14`), tiers `reduced` et `minimal` (`desktop-17`, `desktop-18`), téléphone (`mobile-15`, `mobile-16`, `animation-hero-mobile/` en 4 moments), `hero-boucle.mp4`, et le script `.capture.cjs` qui s'appuie sur `data-auto-phase`.
- **À confirmer commercialement avant mise en ligne** :
  - « Désactivable à tout moment · vous reprenez la main quand vous voulez » (`autoPageData.ts:281`, carte « Votre automatisation ») ;
  - les pastilles « Google Workspace » affichée avec le **logo Gmail** et « Microsoft 365 » affichée avec le **logo Outlook** (`autoPageData.ts:155-156`, logos `components/sections/automation/brandLogos.tsx:28,41`) : libellé de suite, logo d'un seul produit. À valider (ou remplacer par le libellé Gmail / Outlook) avant diffusion.
- **Composants débranchés de cette page, encore sur le disque** (vérifié par recherche : plus aucun import depuis `/automatisation`, seulement une mention en commentaire `AutomatisationPage.tsx:11-15`) :
  - `components/scenes/automation/AutomationScene.tsx` (ancien hero à métriques fictives) : plus importé nulle part ;
  - `IntegrationsConnect.tsx` (311 lignes) : plus importé nulle part ;
  - `SectorGrid.tsx` (81) et `SectorCard.tsx` (142, importé seulement par `SectorGrid`) : plus montés nulle part ;
  - `ChorusProSection.tsx` (86) : plus importé nulle part ;
  - **toujours utilisés ailleurs, à ne pas supprimer** : `AutomationPipeline.tsx` (705), `pipelineData.ts` et `sectorsData.tsx` (535), lus par `app/automatisation/[secteur]/` ; `brandLogos.tsx`, lu par `AutoRealCase`, `AutoConnect` et `autoPageData`.
  À supprimer une fois la page validée en ligne (`docs/chantiers/2026-09-29-refonte-pages-service.md`). `/automatisation/[secteur]` garde l'ancien design.
- **Incohérence à corriger ailleurs** : `CLAUDE.md` (tableau des routes) annonce encore le preset `automation` et la scène `AutomationScene` pour `/automatisation`.
- **Note de conversion** (audit du 6 septembre 2026) : **76/100** (contenu 74, design 81, conversion 74, `docs/audits/2026-09-06-conversion/automatisation/README.md`), notée sur l'ancienne page. Elle ne décrit plus la page actuelle : à re-noter avec `conversion-auditor`.
