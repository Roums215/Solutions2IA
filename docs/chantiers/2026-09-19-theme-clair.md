# Chantier · le site passe en clair (blanc, bleu, violet)

> ## ⛔ Chantier annulé le 19 septembre 2026
>
> Le client a demandé de revenir au site tel qu'il était avant cette refonte. **Le site est
> repassé en thème sombre**, dans son état du 18 septembre au soir : film du hero, cartes en
> verre, constellation reliée.
>
> Ce document reste comme trace de l'exploration : la palette claire, la gamme de neuf tons,
> les recettes de verre teinté et les séquences proposées pour les 15 pages sont réutilisables
> telles quelles si la direction revient sur la table. Le code correspondant est sauvegardé
> hors dépôt (`scratchpad/version-claire/`), il n'a pas été jeté.

**Ouvert le 19 septembre 2026** · **annulé le 19 septembre 2026**
Demande client : « tout le site en bleu, blanc, violet, avec plusieurs degrés, beaucoup de
blanc puis bleu puis violet, des dégradés d'intensité, des cartes en verre translucide effet
bulle, des sections bien construites, des transitions parfaitement fluides. »

Ce chantier remplace la direction sombre indigo/cyan qui tenait depuis l'origine du site.
Il absorbe le chantier des cartes en verre ouvert le 17 septembre.

---

## 1. La direction : un système de tons, pas trois styles

Le client a demandé un mélange des trois dosages proposés. La réponse n'est pas de mélanger
au hasard : c'est de **définir une gamme de tons de section** et une règle de progression. Une
page part du blanc et descend vers le violet. C'est ce qui rend « beaucoup de blanc, puis
bleu, puis violet » vrai à l'échelle de la page, et cohérent d'une page à l'autre.

Première version le 19/09 au matin : quatre tons. Le client a tranché en voyant le résultat,
**c'était trop blanc**. La gamme est passée à **sept tons**, avec de vrais motifs de couleur.

| Ton | Motif | Texte | Pour quoi |
|---|---|---|---|
| `.tone-blanc` | aucun | encre | le repos : texte long, FAQ, glossaire, mentions |
| `.tone-brume` | gris bleuté très doux | encre | fait ressortir ce qui est blanc par-dessus (maquettes d'application) |
| `.tone-aurora` | blanc + deux souffles bleu et violet | encre | le standard : grilles de cartes, schémas |
| `.tone-bleu` | maillage bleu clair | encre | une bande de couleur, registre léger |
| `.tone-violet` | maillage violet clair | encre | idem, côté violet |
| **`.tone-bleu-fonce`** | **maillage bleu soutenu** | **blanc** | **l'accent fort : un schéma, une grille qui doit claquer** |
| **`.tone-violet-fonce`** | **maillage violet soutenu** | **blanc** | **idem, côté violet : « pour qui », convictions** |
| `.tone-profond` | bleu et violet saturés, clair | encre | le point culminant : bandeau final |
| `.tone-nuit` | bloc quasi noir | blanc | ponctuation rare : un écran, une démonstration |

Les trois tons foncés (`bleu-fonce`, `violet-fonce`, `nuit`) **réinversent les tokens** pour
leurs enfants : texte, bordures, cartes et dégradés de titre s'adaptent sans une classe de
plus, et le verre y redevient un verre sombre teinté de sa section.

**Ce ne sont pas des aplats.** Chaque ton est un maillage de trois dégradés radiaux posés sur
un fond dégradé : la couleur bouge dans la section au lieu d'être uniforme. Trois détails qui
comptent :

- **Fondu haut et bas** : le motif est masqué sur ses 7 premiers et derniers pourcents, donc
  deux sections voisines se fondent au lieu de se couper net.
- **Grain** : un bruit à 3,5 % par-dessus chaque motif. Invisible, mais il supprime les bandes
  de dégradé, très visibles sur de grands aplats clairs.
- **Le verre prend la couleur de sa section** : chaque ton pose `--verre-teinte`, le verre la
  reprend. Bleu dans une section bleue, violet dans une section violette.

`.tone-nuit` redéfinit les tokens de texte pour ses enfants : tout ce qui est écrit en classes
sémantiques s'adapte automatiquement, et le verre y redevient un verre sombre.

**Règle de progression d'une page** : les tons clairs en haut, les denses en bas, jamais deux
sections colorées de suite, et le bandeau final en `profond`. Chaque page a en plus une
dominante (bleue ou violette) liée à son domaine, pour qu'on la reconnaisse.

### Un piège Tailwind à connaître

Un utilitaire de couleur **avec opacité** (`text-cyan/85`) est figé au build : Tailwind y
inline la valeur du token au lieu de garder le `var()`. Redéfinir `--color-cyan` dans un ton
foncé ne l'atteint donc pas, et les étiquettes tombaient à **1,8:1** de contraste alors que
la même couleur sans opacité (`text-cyan`) suivait bien. Les trois tons foncés rattrapent ces
utilitaires explicitement. Contraste minimum mesuré après correction : **6,2:1** sur le bleu
foncé, **7,4:1** sur le violet foncé.

### Le menu

Il porte la couleur de marque : un verre teinté bleu vers violet (`.header-verre`), discret en
haut de page, plus dense au défilement pour rester lisible au-dessus de n'importe quel ton.
Fond opaque en tier réduit.

---

## 2. La palette

Tout est dans `app/globals.css`, bloc `@theme`. Trois échelles de dix intensités
(`--color-blue-50..900`, `--color-violet-50..900`), plus les surfaces et l'encre.

| Rôle | Valeur | Note |
|---|---|---|
| Fond de page | `#fcfdff` | le blanc domine |
| Carte | `#ffffff` | |
| Bleu de marque | `#4169f0` | l'ossature : liens, CTA, accents |
| Violet de marque | `#8b52f5` | la ponctuation : second accent, fins de dégradés |
| Titre | `#0b1030` | 17,6:1 sur blanc |
| Texte courant | `#39416b` | 9,1:1 |
| Texte secondaire | `#5b638c` | 5,6:1 |
| Dégradé de marque | `linear-gradient(120deg, #4169f0, #8b52f5)` | titres, CTA |

**Les couleurs de texte ont été recalculées, pas inversées.** L'ancien `#8e95af` passait de
6,8:1 sur fond sombre à **3:1 sur blanc** : sous le seuil d'accessibilité. Reprendre les
teintes pastel d'origine aurait donné un site illisible.

### Deux noms de tokens restent trompeurs

Pour éviter de noyer la bascule dans 354 remplacements, les **noms** n'ont pas changé :

- `--color-cyan` est désormais **violet** (alias propre : `--color-violet`)
- `--color-accent-*` est le **bleu**

Le renommage mécanique (`cyan` → `violet` sur 278 classes et 76 `var()`, 48 fichiers) est une
tâche à part, sans risque, à faire quand la refonte sera stabilisée.

---

## 3. Le verre, version claire

Leçon reprise d'un projet voisin et vérifiée ici : **un verre blanc sur fond clair est
invisible.** C'est la teinte qui le rend perceptible. Chaque ton pose donc `--verre-teinte`,
et les trois classes la reprennent :

- `.glass-surface` : la matière à composer, ne pose ni bordure ni rayon
- `.glass-bubble` : la bulle, pour un nœud posé sur un schéma
- `.glass-card` : le panneau autonome

Le repli sans flou (tier réduit, minimal, navigateur sans `backdrop-filter`) bascule sur un
blanc franc bordé, qui tient seul.

---

## 4. Ce qui est fait

| Étape | État |
|---|---|
| 55 couleurs d'état en dur (`green-400`, `red-400`, `yellow-400`) migrées vers les tokens | fait |
| Palette `@theme` basculée en clair, contrastes recalculés | fait |
| Fond de page en dégradé blanc vers bleu vers violet | fait |
| Dégradés de texte refaits (assez sombres pour le blanc) | fait |
| Surfaces opaques (`.surface-card`, `.metric-tile`, `.section-intro-panel`) | fait |
| Famille verre refaite en clair et teintée | fait |
| Gamme de tons de section créée | fait |
| Flou permanent de `.section-intro-panel` enfin coupé par les tiers (dette du 17/09) | fait |
| CTA sur le dégradé de marque | fait |
| Cadre du film traité en écran (anneau blanc, ombre bleutée) | fait |
| Tons appliqués à l'accueil et au bandeau final (13 routes) | fait |
| Gamme élargie à sept tons, motifs fluides, grain, fondus entre sections | fait |
| Deux tons soutenus ajoutés (bleu foncé, violet foncé) : neuf tons en tout | fait |
| Menu sur socle blanc : lisible même au-dessus d'une section foncée | fait |
| Menu en verre teinté bleu vers violet | fait |
| Fond fixe retiré (artefact de rendu et coût sur mobile) | fait |

Contrôles : `tsc` et `lint` verts, contraste du texte courant mesuré à **9,8:1**, aucune
erreur console sur l'accueil, `/services` et `/agents-ia`.

---

## 5. Propositions page par page

Établies le 19 septembre 2026 contre la structure réelle de chaque page (`docs/pages/`).

> Dépassé pour `/sites-web`, `/applications`, `/agents-ia` et `/automatisation`, refondues depuis :
> voir `docs/chantiers/2026-09-29-refonte-pages-service.md` et leurs fiches.
Trois règles appliquées partout : jamais deux sections colorées de suite, la page descend du
clair vers le dense, et une dominante par domaine pour qu'on reconnaisse la page.

| Page | Dominante | Séquence proposée, section par section |
|---|---|---|
| `/` **fait** | mixte | hero `aurora` · échéance `blanc` · constellation **`bleu-fonce`** · transformations `brume` · preuve télécom `violet` · approche `blanc` · méthode `aurora` · profils **`violet-fonce`** · CTA `profond` |
| `/services` | mixte | hero `aurora` · 5 services **`bleu-fonce`** · tarifs `brume` · méthode `aurora` · indépendant `violet` · situations `blanc` · CTA `profond` |
| `/sites-web` | bleue | hero `aurora` · 9 canaux **`bleu-fonce`** · plan en 9 stations `nuit` · coût de l'inaction `brume` · comparatif agence `bleu` · fondations `blanc` · services liés `brume` · CTA `profond` |
| `/applications` | bleue | hero `aurora` · exemple `bleu` · 6 secteurs `brume` · pipeline **`bleu-fonce`** · sur mesure ou refonte `blanc` · bénéfices `violet` · tableaux de bord `brume` · méthode `aurora` · CTA `profond` |
| `/applications/[secteur]` ×6 | bleue | hero `aurora` · objectifs `blanc` · modules **`bleu-fonce`** · pratique `brume` · CTA `profond` |
| `/agents-ia` | violette | hero `aurora` · anatomie **`violet-fonce`** · 8 besoins `brume` · pipeline multi-besoins `nuit` · profils `brume` · garde-fous `violet` · méthode `aurora` · CTA `profond` |
| `/automatisation` | mixte | hero `aurora` · échéance `blanc` · ce que vous récupérez **`bleu-fonce`** · mon propre flux `nuit` · outils reliés `brume` · 5 secteurs `violet` · facture 2026 `blanc` · CTA `profond` |
| `/automatisation/[secteur]` ×5 | mixte | hero `aurora` · ce que ça change **`bleu-fonce`** · le flux `brume` · conditions `violet` · CTA `profond` |
| `/rag` | violette | hero `aurora` · sommaire `blanc` · classique contre mémoire **`violet-fonce`** · pertes `brume` · flux de la mémoire `nuit` · usages `brume` · secteurs `violet` · données et limites `blanc` · CTA `profond` |
| `/faq` | lecture | hero `aurora` · corps `blanc` · CTA `profond` |
| `/glossaire` | lecture | hero `aurora` · corps `blanc` · CTA `profond` |
| `/articles` | lecture | hero `aurora` · grille `blanc` (pas de bandeau final sur cette route) |
| `/articles/[slug]` | lecture | en-tête `aurora` · corps `blanc` · comparatif `brume` · sources `blanc` · CTA `profond` |
| `/a-propos` | bleue | hero `aurora` · parcours `blanc` · engagements **`bleu-fonce`** · façon de travailler `brume` · convictions `violet` · CTA `profond` |
| `/contact` | bleue | hero `aurora` · **formulaire `bleu`** · ce qui se passe ensuite `brume` · FAQ `blanc` · email direct `brume` |
| pages légales ×4 | aucune | `blanc` de bout en bout, sans décor. C'est voulu. |

**Règle de densité** : chaque page porte **au moins une section en ton soutenu**
(`bleu-fonce` ou `violet-fonce`, selon sa dominante), encadrée de tons clairs. C'est ce qui
donne du poids à la page sans jamais fatiguer : une respiration, une frappe, une respiration.

### Le ton `nuit`, quatre fois sur tout le site

Réservé aux moments qui gagnent à être vus comme un écran : le plan d'infrastructure de
`/sites-web`, le pipeline multi-besoins de `/agents-ia`, mon propre flux d'automatisation, et
le flux de la mémoire sur `/rag`. Les déclinaisons par secteur n'en ont pas : `nuit` doit
rester rare pour garder son effet.

### Points à trancher

- **Trois pages n'atteignent jamais le ton profond** (`/contact`, `/articles`, les pages
  légales) : elles n'ont pas de bandeau final. Rupture assumée de la règle de descente, je ne
  crée pas un bandeau qui n'existe pas dans le code.
- **Le formulaire de contact sur fond bleu** : c'est le vrai geste de conversion du site, il
  mérite l'accent. À vérifier que les champs restent lisibles sur fond saturé.
- **Le comparatif agence de `/sites-web`** porte déjà une bordure colorée marquée : posé sur
  `bleu`, deux bleus se superposent. À regarder avant de valider.
- **Les bandeaux réglementaires en `blanc`** : cohérent avec l'existant, mais une échéance
  légale qui presse au ton le plus neutre peut sembler timide. Un `violet` léger se défendrait.

---

## 6. Ce qui reste, par ordre

1. **Poser les tons** sur les pages autres que l'accueil (chaque section choisit `clair`,
   `aurora` ou `profond` selon la règle de progression).
2. **Les éléments partagés à reprendre** : `Header` (4 `bg-white/[0.0x]`, ombres noires),
   `PageHero` (liseré et aperçu mobile en blanc translucide), `PremiumFlowPanel` (grille de
   fond blanche à 3,5 %, invisible sur blanc), `SectionHeading` (étiquette en blanc
   translucide), `Button` (variante secondaire), `LoadingScreen` (halos et barre).
3. **`PageAtmosphere`, les 9 presets** : leurs halos sont calibrés pour éclaircir du noir.
   Sur blanc, à alpha inchangé, ils donnent un voile terne. Chacun doit être remonté ou
   repensé. Le preset `studio` est orphelin : à supprimer.
4. **Les 4 scènes de hero** : `WebScene` et `AppScene` ont des barres de contenu en blanc
   translucide qui disparaissent sur carte claire ; `AutomationScene` et `AIBrainScene`
   demandent une recalibration des opacités de trait (0,12 à 0,4, pensées pour du noir).
5. **Les maquettes papier** (`AppMockup`) : elles étaient un îlot clair sur fond sombre.
   Sur un site clair, il faut les poser sur une bande teintée et renforcer leur cadre, sinon
   elles se fondent dans la page.
6. **Le renommage `cyan` → `violet`** (mécanique, sans risque).
7. **Les 15 fiches de page** (`docs/pages/`) décrivent le site sombre : chaque fiche se met à
   jour quand sa page passe au clair.

---

## 7. Ce qui ne change pas

- **Le film reste sombre.** Il est composé image par image sur un fond noir, sur 1 850 lignes
  sans typage : le repeindre serait le chantier le plus risqué de la refonte. Encadré de
  blanc, il se lit comme un écran de cinéma, et c'est un procédé courant. Vérifié à l'écran.
- **Les règles de copy, de structure et de performance** : inchangées. Un seul CTA par page,
  l'ordre des cinq questions, le LCP peint en CSS avant hydratation.
- **Les tiers de performance** : le verre et les halos se coupent toujours automatiquement.

---

## 8. Journal des décisions

| Date | Décision | Par |
|---|---|---|
| 19/09/2026 | Le site passe en clair : blanc, bleu, violet, verre teinté, transitions fluides | client |
| 19/09/2026 | Mélange des trois dosages, structuré : quatre tons de section et une règle de progression | client et Claude |
| 19/09/2026 | Le film reste sombre, traité comme un écran | client et Claude |
| 19/09/2026 | Bascule par les valeurs des tokens, pas par un jeu parallèle : un fichier rhabille 1 800 sites d'appel | Claude |
| 19/09/2026 | Noms `cyan` et `accent` conservés pour l'instant, renommage reporté | Claude |
| 19/09/2026 | « Trop blanc » : gamme portée à sept tons, motifs fluides, menu coloré | client |
| 19/09/2026 | Séquence de tons proposée pour les 15 pages, dominante par domaine | Claude |
| 19/09/2026 | Deux tons soutenus demandés (bleu foncé, violet foncé) : au moins un par page | client |
