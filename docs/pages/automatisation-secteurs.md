# `/automatisation/[secteur]` · vitrine sectorielle SEO

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 18 septembre 2026 · contre le code de
> `app/automatisation/[secteur]/` et `components/sections/automation/sectorsData.tsx`.

---

## 1. Ce que fait cette page

Un **gabarit unique** qui génère 5 pages statiques (`generateStaticParams`,
`app/automatisation/[secteur]/page.tsx:14-16`), une par métier, pour capter les recherches
de longue traîne (« automatiser agence immobilière », « relance devis BTP »). Comme pour
`/applications/[secteur]`, elle ne vend pas l'automatisation en général (rôle de
`/automatisation`) : elle rejoue la même mécanique de pipeline sur les frictions concrètes
d'un métier, avec le vocabulaire et les outils de ce métier.

| | |
|---|---|
| Route | `/automatisation/[secteur]` (5 instances : `immobilier`, `cabinet-comptable`, `btp`, `restauration`, `formation`) |
| Fichiers | `app/automatisation/[secteur]/page.tsx` (serveur, SEO, 68 lignes) · `app/automatisation/[secteur]/SecteurPage.tsx` (client, rendu, 181 lignes) |
| Données | `components/sections/automation/sectorsData.tsx` (535 lignes, un objet `Sector` complet par secteur : SEO, gains, conditions, nœuds et arêtes du pipeline) |
| Preset de décor | `automation` (`PageAtmosphere preset="automation"`, `SecteurPage.tsx:28`), identique au pilier `/automatisation` |
| Public visé | Un dirigeant d'un métier précis qui cherche « automatiser + [son métier] », déjà conscient du problème |

Le fichier source résume lui-même l'intention en commentaire :
« Ordre : c'est quoi (hero) · ce que ça change · comment ça marche (schéma) · pour qui (et
quand ce n'est pas la bonne solution) · l'étape suivante. » (`SecteurPage.tsx:19-21`)

---

## 2. La promesse affichée

Titre construit ainsi (`SecteurPage.tsx:32-37`) :

```
{sector.name} : {sector.heroAccent}
```

et la description du hero concatène `problem` + `benefit` (`SecteurPage.tsx:38`).

| Secteur (`slug`) | Titre affiché (h1) | Problème posé | Bénéfice promis |
|---|---|---|---|
| Immobilier (`immobilier`) | « Immobilier : **rappeler avant l'agence d'à côté** » | « Vos leads SeLoger et Leboncoin se perdent entre une boîte mail et un tableur : quand vous rappelez, l'agence d'à côté a déjà décroché. » | « Chaque demande qualifiée arrive en quelques minutes dans le CRM, avec un SMS au commercial qui peut rappeler avant tout le monde. » |
| Cabinet comptable (`cabinet-comptable`) | « Cabinet comptable : **les pièces classées sans ressaisie** » | « Factures, relevés, reçus s'accumulent : vos collaborateurs trient et relancent au lieu d'analyser. » | « Chaque pièce arrive, est lue et classée sans ressaisie. Le dossier se construit seul. » |
| BTP (`btp`) | « BTP : **le pré-devis prêt avant le concurrent** » | « Un client envoie des photos et une description WhatsApp : le devis part trois jours plus tard, quand le concurrent l'a déjà signé. » | « Chaque demande chantier génère un pré-devis structuré dans Tolteck ou Obat, avec une notification à l'artisan. » |
| Restauration (`restauration`) | « Restauration : **chaque réservation posée sans vous** » | « Les réservations arrivent sur Instagram, WhatsApp et le site en même temps : une table promise deux fois, une soirée pleine qui se vide d'un coup. » | « Chaque demande est lue, la disponibilité vérifiée et la réservation posée dans Zenchef ou TheFork avant que vous ayez vu le message. » |
| Formation (`formation`) | « Formation : **le dossier signé avant le week-end** » | « Un prospect CPF remplit le formulaire un vendredi : sans relance sous 48 h, il signe ailleurs et le dossier de financement n'existe plus. » | « Chaque lead est qualifié, le programme adapté à son profil et le dossier d'inscription envoyé à la signature sans intervention manuelle. » |

- **Étiquette / badge** : « Automatisation · {sector.name} », ex. « Automatisation ·
  Immobilier » (`SecteurPage.tsx:31`).
- **Niveau 1 (dirigeant de PME)** : la douleur est nommée dans son vocabulaire exact
  (SeLoger, Tolteck, Zenchef, CPF/OPCO), pas de jargon technique dans le hero.
- **Niveau 2 (visiteur averti)** : le détail technique (webhook, OCR, scoring, format
  Factur-X) vit dans le panneau « Comment ça marche techniquement » sous
  `AutomationPipeline`, alimenté par `sector.details`.

---

## 3. Structure, dans l'ordre

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero sectoriel | `PageHero` (`SecteurPage.tsx:30-43`) | Le métier est nommé, la douleur est la sienne |
| 2 | ce que ça change | « Dans votre semaine, concrètement » | 3 `SpotlightCard` (Du temps / De l'argent / Vos clients, `SecteurPage.tsx:46-92`) + un encart d'échéance légale optionnel | 3 gains explicitement non chiffrés en stats de marché (« Pas de statistique de marché : ce que le flux fait pour vous », ligne 56) |
| 3 | comment ça marche | « Le flux, étape par étape » (`#comment-ca-marche`) | `AutomationPipeline` réutilisé avec les `nodes`/`edges`/`details` du secteur (`SecteurPage.tsx:95-108`) | Le pipeline complet du métier, animé, avec son titre généré (`ex. "Sources → n8n → Claude → n8n → CRM"`) |
| 4 | pour qui | « Trois conditions, et une limite honnête » | Liste de conditions + encart « pas la bonne solution » + tags d'outils compatibles (`SecteurPage.tsx:111-164`) | Un cadrage honnête, y compris de ce que le flux **ne** fait **pas** |
| 5 | maillage | « Pour aller plus loin » | `RelatedServices current="automatisation"` (`SecteurPage.tsx:166`) | Liens vers `/agents-ia` et `/applications` |
| 6 | l'étape suivante | CTA final | `CTABand` (`SecteurPage.tsx:168-178`) | Un seul geste, reformulé avec le nom du métier |

**527 mots visibles et 6 sections** sur `/automatisation/immobilier` (mesuré le 19/09/2026 ;
seul secteur relevé, les quatre autres suivent le même gabarit).
L'audit du 6 septembre comptait 227 mots en moyenne et qualifiait ces pages de « les plus
vides du site » (`docs/audits/2026-09-06-conversion/automatisation-secteurs/README.md`) :
ce n'est plus le cas.

---

## 4. Schémas et animations

Le seul schéma de la page est le même composant que celui du pilier `/automatisation`,
réutilisé avec des données différentes : voir la description complète du mécanisme
(rail horizontal/vertical, boucle de ticks, callback, tier bas) dans
[`docs/pages/automatisation.md`, section 4](automatisation.md#4-schémas-et-animations).
Ce qui change réellement d'un secteur à l'autre :

| Secteur | Titre du pipeline (généré) | Nœuds spécifiques |
|---|---|---|
| Immobilier | « SeLoger → n8n → Claude → n8n → CRM » | `SeLoger` (lead) → `n8n` (qualification) → `Claude` (enrichissement) → `n8n` (scoring) → `CRM` (lead enregistré), notification SMS |
| Cabinet comptable | « Sources → Analyse IA → Vérification → Écriture » | `Sources` (email/Drive/WhatsApp) → `Analyse IA` (OCR + Claude) → `Vérification` (doublons/cohérence) → `Écriture` (Pennylane/Sage/Quadra), notification collaborateur |
| BTP | « Demandes → Analyse → Pré-devis → Devis » | `Demandes` (formulaire/photo) → `Analyse` (besoin/métré) → `Pré-devis` (bibliothèque prix) → `Devis` (Tolteck/Obat), notification artisan |
| Restauration | « Demandes → IA résa → Disponibilité → Réservation » | `Demandes` (Insta/site/WhatsApp) → `IA résa` (couverts/date) → `Disponibilité` (plan de salle) → `Réservation` (Zenchef/TheFork), SMS de confirmation |
| Formation | « Leads → Qualification → Programme → Inscription » | `Leads` (site/CPF/email) → `Qualification` (besoin/financement) → `Programme` (adapté au profil) → `Inscription` (Digiforma/Dendreo), signature Yousign |

Chaque nœud « actif » fait défiler un statut d'exemple différent à chaque boucle
(`activeStatus`, tableau de 2-3 textes, ex. « facture reçue » puis « relevé déposé » puis
« reçu détecté » pour le cabinet comptable, `sectorsData.tsx:232`), pour enseigner
plusieurs cas plutôt qu'un seul message figé.

Chaque secteur a aussi une arête de callback propre, affichée comme un arc pointillé
au-dessus du rail : « Devis oublié · relance J+3 » (BTP), « No-show évité · rappel J-1 »
(restauration), « Lead CPF froid · relance » (formation), « Relance · pièce manquante »
(cabinet comptable), retour direct vers la source (immobilier, sans label).

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `SpotlightCard` (glow cyan `34,211,238`, `tilt={4}`) | « Ce que ça change » (Du temps / De l'argent / Vos clients) | 3 | `grid-cols-1 md:grid-cols-3` |
| Carte maison (nœuds du pipeline, réutilisés depuis `AutomationPipeline`) | « Le flux, étape par étape » | 5-6 par secteur | positionnés sur le tracé SVG |
| Liste de lignes maison (icône check + `bg-success-glow`) | « Est-ce fait pour vous ? » : conditions | 3 par secteur (`sector.forWho`) | liste verticale (`space-y-3`), colonne gauche d'une grille `lg:grid-cols-[1.15fr_1fr]` |
| Encart maison (`border-subtle`, `bg-bg-card/40`) | « Quand ce n'est pas la bonne solution » + outils compatibles | 2 blocs | colonne droite de la même grille |
| Encart d'échéance (`border-accent`, `bg-bg-card/60`) | « Échéance réelle » | 1 seul, **uniquement sur `cabinet-comptable`** (`sector.deadline`, `SecteurPage.tsx:85-90`) | pleine largeur, `max-w-3xl` |

Rien n'est passé au verre ; toutes les cartes restent opaques, cohérent avec le pilier
`/automatisation`.

---

## 6. L'appel à l'action

- **CTA unique** : « Premier échange gratuit » → `/contact`, dans le hero
  (`SecteurPage.tsx:39`) et dans le `CTABand` final (`secondary={null}`,
  `SecteurPage.tsx:177`).
- **Réassurance sous le bouton** : « Premier échange de 45 minutes, gratuit et sans
  engagement. Le prix est fixé avec vous avant de démarrer, sur vos outils actuels. »
  (`SecteurPage.tsx:41`)
- **Liens secondaires** (ne comptent pas comme un second CTA) : bouton secondaire du hero
  « Voir le flux en détail » → `#comment-ca-marche` (ancre interne,
  `SecteurPage.tsx:40`).
- **Autres sorties de la page** : `RelatedServices` vers `/agents-ia` et `/applications`
  (mêmes liens que le pilier `/automatisation`, `current="automatisation"`).
  Le `CTABand` utilise les `trustItems` par défaut (« Réponse sous 24 h », « Premier
  échange offert », « Sans engagement »).

---

## 7. Le design en détail

- **Accents** : cyan (`34,211,238`) partout, identique au pilier `/automatisation`, aucune
  variation de teinte par secteur.
- **Rythme vertical** : `PageHero` → « Ce que ça change » (`section-shell`) →
  `AutomationPipeline` (`section-shell`, ancre `#comment-ca-marche`) → « Est-ce fait pour
  vous ? » (`section-shell-tight`) → `RelatedServices` (`section-shell-compact`) →
  `CTABand` (`section-shell`).
- **Largeurs** : `section-container` partout ; la section « pour qui » est contrainte à
  `max-w-5xl` avec une grille asymétrique `lg:grid-cols-[1.15fr_1fr]`
  (`SecteurPage.tsx:122`).
- **Profondeur** : `translateZ(20px/12px)` sur les cartes « Ce que ça change »
  (`SecteurPage.tsx:70-77`) ; pas de `translateZ` sur les listes de conditions (blocs
  plats, sans `SpotlightCard`).
- **Typographie** : rien de spécifique hors normes `SectionHeading`.
- **Ce qui fait la signature de cette page** : comme pour `/applications/[secteur]`, un
  gabarit **délibérément répété à l'identique 5 fois**. La seule vraie variation
  structurelle entre les 5 pages est l'encart d'échéance légale, présent uniquement sur
  `cabinet-comptable` (facture électronique).

---

## 8. Sur téléphone (390 px)

- Le `PageHero` **n'a pas de `visual`** (pas de scène passée en prop) : `hasVisual` est
  `false` (`components/shared/PageHero.tsx:127`) et le hero s'affiche en une seule colonne
  centrée, identique sur desktop et mobile, exactement comme sur
  `/applications/[secteur]`.
- « Ce que ça change » : passe de `md:grid-cols-3` à 1 colonne.
- `AutomationPipeline` : passe du rail horizontal à la geometrie verticale dédiée
  (voir `automatisation.md`, section 4).
- « Est-ce fait pour vous ? » : la grille asymétrique `lg:grid-cols-[1.15fr_1fr]` s'empile
  en 1 colonne sous `lg`, conditions d'abord, puis limite et outils compatibles.

---

## 9. SEO

Métadonnées construites dynamiquement depuis `SECTORS[secteur]`
(`app/automatisation/[secteur]/page.tsx:18-38`) : `sector.seoTitle`, `sector.seoDescription`.

| Secteur | `title` (avec suffixe, longueur) | `description` (longueur) |
|---|---|---|
| Immobilier | « Automatisation immobilier : leads en CRM · Solutions 2IA » (56) | 159 caractères |
| Cabinet comptable | « Automatisation comptable : zéro ressaisie · Solutions 2IA » (57) | 156 caractères |
| BTP | « Automatisation BTP : devis et relances · Solutions 2IA » (54) | 159 caractères |
| Restauration | « Automatisation restaurant : réservations · Solutions 2IA » (56) | 160 caractères |
| Formation | « Automatisation formation : CPF et OPCO · Solutions 2IA » (54) | 150 caractères |

- `canonical` : `/automatisation/${secteur}` (`page.tsx:26,30`), présent pour les 5 pages.
- JSON-LD : `buildServiceSchema` (nom « Automatisation : {sector.name} », `serviceType:
  "Automatisation"`, `audience: sector.name`) + `buildBreadcrumbSchema` (Accueil →
  Services → Automatisation → secteur), combinés via `combineSchemas` (`page.tsx:46-60`).
  Pas de `FAQPage` ni d'`OfferCatalog`.
- Liens internes sortants : `/agents-ia` et `/applications` (`RelatedServices`),
  `/contact` (CTA), l'ancre `#comment-ca-marche` (interne, ne compte pas) : au moins 2
  liens internes sortants réels.
- `generateStaticParams` (`page.tsx:14-16`) pré-rend les 5 routes au build depuis
  `SECTORS`.

---

## 10. Performance

- **Aucune section en `dynamic()`** : `AutomationPipeline` est importé statiquement
  (`SecteurPage.tsx:10`), pas de scène de hero (pas de `visual` sur `PageHero`).
- **`usePerformanceMode` n'est appelé nulle part directement dans `SecteurPage.tsx`** : les
  reveals (`fadeInUp`, `staggerContainer`) des sections « Ce que ça change » tournent à
  l'identique quel que soit le tier. C'est le composant partagé `AutomationPipeline` qui
  porte à lui seul toute la logique de tier (voir `automatisation.md`, section 10) : il ne
  rend rien avant montage client (`if (!mounted) return null;`), et fige tous ses nœuds à
  l'état « done » en `shouldReduceMotion`.
- Points sensibles : comme le pilier `/automatisation`, le seul élément visuellement riche
  de la page (le pipeline) est absent du HTML avant hydratation ; sur une page déjà très
  courte (227 mots), c'est une part importante du contenu qui n'existe pas au premier rendu.

---

## 11. État et suite

- **Ce qui est fait** : les 5 pages sont en ligne, avec la meilleure accroche du site selon
  l'audit (douleur nommée dans le vocabulaire exact du métier), un pipeline réutilisé et
  cohérent avec le pilier, et un cadrage honnête de ce qui **ne** convient **pas**
  (`sector.notForYou` sur les 5 secteurs).
- **Ce qui reste** : selon l'audit, la page est « la plus vide » du site (227 mots), sans
  élément qui transforme l'envie en contact au-delà du CTA générique ; la structure des
  nœuds du pipeline reste câblée en dur sur 6 IDs canoniques
  (commentaire `sectorsData.tsx:39-42`), ce qui limite la généralisation à de nouveaux
  secteurs sans toucher `AutomationPipeline`.
- **Note de conversion** (audit du 6 septembre 2026) : **57/100** (Contenu 52, Design 68,
  Conversion 54) · `docs/audits/2026-09-06-conversion/automatisation-secteurs/README.md`.
