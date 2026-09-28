# `/cgv` `/confidentialite` `/cookies` `/mentions-legales` · pages légales

> **Fiche d'état** : elle décrit les pages **telles qu'elles sont en ligne**, pas ce qu'on
> aimerait qu'elles deviennent. Toute modification d'une de ces pages met à jour cette
> fiche. Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans
> `docs/audits/`.
>
> Dernière vérification : 18 septembre 2026 · contre le code de `app/cgv/`,
> `app/confidentialite/`, `app/cookies/`, `app/mentions-legales/` et
> `components/legal/LegalPage.tsx`

Les quatre pages partagent un seul composant de rendu, `components/legal/LegalPage.tsx` :
chaque `page.tsx` ne fait que fournir son `metadata` et un tableau de sections. Cette
fiche décrit d'abord le gabarit commun, puis ce qui distingue chaque page.

---

## 1. Ce que fait chacune de ces pages

Elles portent les informations légales obligatoires du site (LCEN, RGPD, consommation) :
conditions de vente, confidentialité des données, cookies, mentions d'éditeur. Elles ne
vendent rien, ne comparent rien, et n'ont pas de CTA commercial.

| | |
|---|---|
| Routes | `/cgv` · `/confidentialite` · `/cookies` · `/mentions-legales` |
| Fichiers | `app/<route>/page.tsx` (serveur, contenu + SEO) · `components/legal/LegalPage.tsx` (rendu commun) |
| Preset de décor | **aucun** : pas de `<PageAtmosphere>`, décor propre en dur dans `LegalPage.tsx` (voir section 7) |
| Public visé | visiteur qui cherche une information légale précise, ou robot d'indexation |

---

## 2. Le gabarit commun (`LegalPage.tsx`)

`LegalPage` prend quatre props : `title`, `description`, `updatedAt` (optionnel, défaut
`"15 mai 2026"`, `components/legal/LegalPage.tsx:20`) et `sections` (un tableau de
`{ title, body?, items? }`, `LegalPage.tsx:4-15`).

Rendu, dans l'ordre (`LegalPage.tsx:24-83`) :

1. Lien « ← Retour à l'accueil » vers `/` (`LegalPage.tsx:31-37`)
2. Étiquette fixe « Informations légales » (`LegalPage.tsx:38-40`)
3. `<h1>` = `title` (`LegalPage.tsx:41-43`)
4. `<p>` = `description` (`LegalPage.tsx:44-46`)
5. Ligne « Dernière mise à jour : {updatedAt} » (`LegalPage.tsx:47`)
6. Une `<article>` par section, chacune avec un `<h2>` = `section.title`, des paragraphes
   (`body`) et/ou une liste à puces (`items`) (`LegalPage.tsx:50-79`)

**Aucune des quatre pages ne surcharge `updatedAt`** : les quatre affichent donc
« Dernière mise à jour : 15 mai 2026 », y compris celles dont le contenu a visiblement
été retravaillé depuis (les quatre fichiers `page.tsx` apparaissent modifiés dans l'état
Git courant). Cette date ne reflète pas nécessairement la dernière édition réelle du
texte : à corriger si une page légale est modifiée pour de vrai.

---

## 3. La promesse affichée (identique dans sa forme, différente dans son contenu)

Pas de « promesse » commerciale ici : chaque page annonce simplement son objet dans son
`<h1>` et sa description. Voir le tableau de la section 5 pour le texte exact de chacune.

---

## 4. Structure, dans l'ordre

Ces pages ne suivent pas l'ordre imposé du projet (c'est quoi · ce que ça apporte ·
comment ça marche · pour qui · l'étape suivante) : c'est un gabarit informatif, pas un
gabarit de vente, et c'est un écart assumé pour ce type de contenu.

| # | Élément | Composant | Présent sur les 4 pages |
|---|---|---|---|
| 1 | Lien retour accueil | `LegalPage.tsx:31-37` | oui |
| 2 | h1 + description + date de mise à jour | `LegalPage.tsx:38-47` | oui |
| 3 | Sections légales (`<article>` + h2) | `LegalPage.tsx:50-79` | oui, nombre variable |

Aucun `PageHero`, aucun `CTABand`, aucun `PageAtmosphere` : ces pages n'utilisent aucun
des composants partagés `shared/` habituels du site, seulement `LegalPage`.

---

## 5. Ce qui distingue chaque page

| Page | `<h1>` exact | Description sous le h1 | Sections | Statut réel du contenu |
|---|---|---|---|---|
| `/cgv` | « Conditions générales de vente » | « Conditions applicables aux prestations de services digitales proposées par Solutions 2IA, sauf conditions particulières convenues par écrit. » | 12 (`app/cgv/page.tsx:16-98`) | générique mais complet, aucun champ « à compléter » |
| `/confidentialite` | « Politique de confidentialité » | « Cette politique explique comment Solutions 2IA traite les données personnelles collectées via son site vitrine et ses échanges commerciaux. » | 9 (`app/confidentialite/page.tsx:16-91`) | complet ; précise l'absence de DPO désigné (`app/confidentialite/page.tsx:24`) |
| `/cookies` | « Politique cookies » | « Cette page précise les règles applicables aux cookies et traceurs susceptibles d'être utilisés sur le site Solutions 2IA. » | 7 (`app/cookies/page.tsx:16-60`) | complet ; le texte est au conditionnel/normatif (« ne doit… que si »), pas descriptif d'un outil précis, car **aucun outil de mesure d'audience n'est configuré à ce jour** (`app/cookies/page.tsx:32`) |
| `/mentions-legales` | « Mentions légales » | « Informations d'identification de l'éditeur du site Solutions 2IA et conditions générales d'utilisation du site vitrine. » | 8 (`app/mentions-legales/page.tsx:16-89`) | **incomplet, voir section 6** |

---

## 6. État réel des mentions légales : toujours « à compléter »

Le dernier audit de conversion signalait des champs à compléter en production sur les
mentions légales. **C'est toujours vrai dans le code actuel**, à la ligne près :

- Section « Éditeur du site » (`app/mentions-legales/page.tsx:18-32`) : dénomination
  sociale « à compléter avec la dénomination juridique exacte », forme juridique « à
  compléter », capital social « à compléter si société », siège social « à compléter »,
  SIREN/SIRET/RCS/RM « à compléter », numéro de TVA intracommunautaire « à compléter si
  applicable », directeur de la publication « à compléter ». Seul le contact e-mail
  (`contact@solutions2ia.fr`) est renseigné.
- Section « Hébergement » (`app/mentions-legales/page.tsx:34-43`) : hébergeur, adresse et
  contact de l'hébergeur, les trois « à compléter ».
- Section « Médiation de la consommation » (`app/mentions-legales/page.tsx:71-81`) :
  médiateur et site du médiateur « à compléter si applicable ».

Concrètement, la page publique en ligne aujourd'hui **n'identifie pas légalement
l'éditeur du site** (forme juridique, SIRET, siège social) ni son hébergeur, ce qui est
pourtant l'objet même d'une page de mentions légales au sens de la LCEN. Le texte est
honnête sur son propre état (il dit « à compléter » plutôt que d'inventer une adresse ou
un SIRET), ce qui respecte la règle « zéro preuve inventée », mais la page ne remplit pas
encore sa fonction légale.

---

## 7. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Carte maison (`rounded-2xl border border-border-subtle bg-bg-card/62 backdrop-blur-xl`) | une par section de contenu | 12 / 9 / 7 / 8 selon la page (voir section 5) | liste verticale (`space-y-5`), pas de grille : une colonne, empilées |

La première carte de chaque page a une bordure plus marquée
(`border-border-accent/60` si `index === 0`, `LegalPage.tsx:56`). Aucun `SpotlightCard`,
aucun `metric-tile` : le chantier verre le confirme et classe volontairement ces quatre
pages « hors chantier » (`docs/chantiers/2026-09-17-cartes-verre.md:83-84` : « Les pages
légales gardent leur fond nu : c'est voulu, elles restent hors chantier »).

---

## 8. L'appel à l'action

**Aucun CTA sur ces pages**, et c'est volontaire : ce ne sont pas des pages de
conversion. Le seul lien de sortie propre au contenu est « ← Retour à l'accueil » vers
`/` (`LegalPage.tsx:31-37`), présent sur les quatre. Les liens vers les trois autres
pages légales n'existent pas dans le contenu lui-même : ils viennent du footer global
(`footerNav.legal`, `lib/content/navigation.ts:38-44`, rendu par
`components/layout/Footer.tsx:92`), commun à tout le site, qui liste les quatre pages
ensemble.

---

## 9. Le design en détail

- **Accents** : pas de preset dédié. Décor statique et sobre, en dur dans
  `LegalPage.tsx:24-26` : une grille de fond à 3,5 % d'opacité (`bg-grid`) et un unique
  halo flou centré en haut (`bg-accent-primary/8 blur-[140px]`), sans animation `motion`
- **Rythme vertical** : une seule section (`section-shell-tight`), pas d'alternance
- **Largeurs** : `section-container-narrow`, contenu limité à `max-w-3xl` pour l'en-tête
- **Profondeur** : aucune (pas de `translateZ`, pas de panneau flottant, pas de
  `SectionParticles`) : ce sont les pages les plus dépouillées du site, par choix
- **Typographie** : h1 identique en taille au reste du site (`text-4xl sm:text-5xl
  lg:text-6xl`), mais sans le traitement `.text-gradient` habituel : ces titres restent
  en couleur de texte standard, pas de dégradé de marque
- **Ce qui fait la signature de ces pages** : justement l'absence de signature visuelle.
  Aucune animation, aucun halo respirant, aucune particule : cohérent avec des pages que
  personne ne vient lire pour le plaisir

---

## 10. Sur téléphone (390 px)

Rien de spécifique à adapter : il n'y a pas de grille qui se recompose, seulement une
colonne de cartes empilées (`space-y-5`) qui l'est déjà nativement. Le padding des cartes
passe de `p-7` à `p-5` en dessous de `sm:` (`LegalPage.tsx:55`).

---

## 11. SEO

| Page | `title` (avec suffixe) | `description` (caractères) | `canonical` | `robots` | `openGraph` | JSON-LD |
|---|---|---|---|---|---|---|
| `/cgv` | « Conditions générales de vente · Solutions 2IA » (45 car.) | 154 | `/cgv` | `{ index: true, follow: true }` explicite | absent | absent |
| `/confidentialite` | « Politique de confidentialité · Solutions 2IA » (44 car.) | 150 | `/confidentialite` | `{ index: true, follow: true }` explicite | absent | absent |
| `/cookies` | « Politique cookies · Solutions 2IA » (33 car.) | 158 | `/cookies` | `{ index: true, follow: true }` explicite | absent | absent |
| `/mentions-legales` | « Mentions légales · Solutions 2IA » (32 car.) | 153 | `/mentions-legales` | `{ index: true, follow: true }` explicite | absent | absent |

Les quatre respectent le `title` sous 60 caractères et la fourchette de 150 à 160
caractères pour `description`, et déclarent bien leur `canonical`. En revanche, **aucune
des quatre n'a d'`openGraph` ni de JSON-LD**, contrairement à la règle du projet (« un
JSON-LD via `combineSchemas` » et « un `openGraph` » pour toute nouvelle page). C'est un
écart cohérent sur les quatre pages, pas un oubli isolé sur une seule.

Liens internes sortants dans le contenu propre : un seul par page (« Retour à
l'accueil ») ; en dessous du minimum de deux si on ne compte pas le footer global (voir
section 8).

---

## 12. Performance

- Aucune animation `motion`, aucun composant client sauf ce que `next/link` requiert :
  ce sont les pages les plus légères du site
- Pas de `dynamic()` : inutile, il n'y a rien à découper
- Pas de dépendance à `usePerformanceMode` : le décor est statique dans les trois tiers,
  il n'y a rien à dégrader

---

## 13. État et suite

- **Ce qui est fait** : gabarit commun stable, contenu juridique généraliste rédigé pour
  `/cgv`, `/confidentialite` et `/cookies`
- **Ce qui reste** :
  - `/mentions-legales` contient encore des champs « à compléter » en production (section 6) : c'est le point le plus urgent des quatre pages, à traiter avec les vraies informations d'immatriculation avant qu'un contrôle ou un litige ne le révèle
  - aucun `openGraph` ni JSON-LD sur les quatre pages (section 11)
  - la date « Dernière mise à jour » reste figée au 15 mai 2026 sur les quatre pages, qu'il y ait eu une modification de contenu ou non (section 2)
  - chantier `docs/chantiers/2026-09-17-cartes-verre.md` : ces quatre pages sont explicitement laissées hors chantier verre, aucune action n'est prévue sur leurs cartes
- **Note de conversion** : ces quatre pages ne sont pas couvertes par l'audit de
  conversion du 6 septembre 2026 (`docs/audits/2026-09-06-conversion/`, pas de dossier
  `cgv`, `confidentialite`, `cookies` ou `mentions-legales`) : cohérent, ce ne sont pas
  des pages de vente et elles n'ont pas vocation à être notées avec cette grille
