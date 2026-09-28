# Direction artistique · Solutions 2IA

Le site doit donner envie d'écrire un message, pas impressionner un jury de design.
Un dirigeant de PME arrive, ne connaît rien à l'IA, et se pose trois questions dans cet
ordre : « c'est pour moi ? », « ça me rapporte quoi ? », « combien et comment on commence ? ».

Tout ce qui ne sert pas ces trois questions est du décor. Le décor a le droit d'être beau,
il n'a pas le droit de passer devant.

---

## 1. Ce qui accroche vraiment

Par ordre d'effet mesuré sur ce site (voir `docs/audits/2026-09-06-conversion/`) :

| Levier | Pourquoi ça marche | Où le mettre |
|---|---|---|
| **Un chiffre que le visiteur reconnaît** | il vient de lui, il est vrai par construction | dans les 2 premières sections |
| **Un exemple nommé et situé** | il se projette : « c'est mon cas » | section « ce que ça apporte » |
| **Une échéance réelle** | donne une raison d'agir maintenant | haut de page, jamais en dernier |
| **Le prix et la sortie** | enlève la peur du devis piégé | avant le CTA final |
| **Un seul CTA, avec sa réassurance** | pas de choix à faire, pas de risque | fin de page, et une fois dans le hero |

### Le chiffre qui vient du visiteur

C'est la technique la plus rentable du site, et elle n'exige aucun client :
on fait le calcul devant lui.

> **Bien** : « Vous passez 6 h par semaine à ressaisir des devis. À 35 € de l'heure chargée,
> ça fait 10 920 € par an. »
> **Mal** : « Gagnez un temps précieux grâce à l'automatisation. »

Le chiffre du visiteur est toujours autorisé. Le chiffre inventé sur un client est
interdit : `zéro preuve inventée` (voir `docs/contenu-copy.md`).

### L'exemple concret

Un exemple tient en trois lignes : la situation, le geste, le résultat.

> **Bien** : « Un plombier reçoit 15 appels par jour pendant qu'il est sous un évier.
> L'assistant répond, note la demande et propose un créneau. Le soir, il rappelle 3 personnes
> au lieu de 15. »
> **Mal** : « Nos agents IA optimisent la gestion de votre relation client. »

Deux à trois exemples par page suffisent. Au-delà, c'est un catalogue et plus personne ne lit.

---

## 2. Le dosage technique : la règle des deux niveaux

**Niveau 1, toujours visible** : le bénéfice, en français courant, zéro sigle.
**Niveau 2, replié** : le détail technique, pour celui qui sait déjà et veut vérifier.

Le niveau 2 ne doit jamais gêner la lecture du niveau 1. Modèles déjà en place dans le
dépôt : `/faq` (balises `<details>` natives), `/rag` (assistant de décision),
`/sites-web` (`WebPainBusiness`), l'accueil (`HomeApproachSplit`).

Vocabulaire, table complète dans `docs/contenu-copy.md` :

| On dit | On ne dit pas |
|---|---|
| assistant IA, collègue numérique | agent conversationnel, chatbot IA |
| mémoire d'entreprise | RAG (sauf une fois, entre parenthèses) |
| tâches qui se font toutes seules | orchestration de workflows |
| fichier clients | CRM (sauf avec le nom de l'outil) |
| données hébergées en Europe | souveraineté numérique |
| site relié à vos outils | site connecté headless |
| premier échange gratuit | audit offert, consultation stratégique |

Si un mot technique doit rester, il est expliqué en une phrase juste à côté
(`lib/content/glossaire.ts`, 21 termes).

---

## 3. La structure qui convertit

Ordre imposé, jamais réarrangé (`docs/anatomie-page.md`) :

```
1. C'est quoi ?          PageHero : la promesse en une phrase, tournée vers le visiteur
2. Ce que ça apporte     le bénéfice, chiffré, avec un exemple
3. Comment ça marche     un schéma qui montre, pas un paragraphe qui décrit
4. Pour qui              secteurs et situations, le visiteur se reconnaît
5. L'étape suivante      CTABand : UN seul bouton, avec la réassurance dessous
```

Le CTA unique est une règle du projet, pas une préférence : `secondary={null}` sur
`CTABand`. Un deuxième bouton de même force divise l'attention et fait chuter le taux.
Un lien discret (texte + flèche) ne compte pas comme un deuxième CTA.

**La réassurance sous le bouton** fait partie du CTA, jamais séparée :
« Premier échange gratuit · sans engagement », « Réponse sous 24 h »,
« Pilote 30 jours, satisfait ou remboursé ».

---

## 4. La direction visuelle

### La signature, à ne jamais « nettoyer »

- `.text-gradient` / `.text-gradient-strong` sur les titres
- les halos flous en fond, `blur-[80-120px]`
- la palette indigo `#6366f1` et cyan `#22d3ee`, fond sombre à accents lumineux
- `SpotlightCard` : spotlight, tilt, bordure conique
- les panneaux flottants `y: [0, -6, 0]` sur 5 à 9 s
- les connexions SVG animées via `pathLength`
- le logo (`LoadingScreen`, `Header`) : jamais touché sans demande explicite
- les schémas pédagogiques animés : refaits en mieux si besoin, jamais retirés sèchement

### Ce qui rend une page accrocheuse sans la surcharger

- **Une seule idée forte par écran.** Un grand visuel maîtrisé bat quatre petits motifs
  qui se concurrencent.
- **Un contraste de rythme** : après une grille de cartes, une section pleine largeur,
  un schéma, ou un bloc de texte respirant. Jamais deux grilles identiques de suite.
- **La profondeur plutôt que la décoration** : `translateZ` sur les enfants des cartes,
  ombres portées, un plan derrière un autre. C'est ce qui donne le « premium ».
- **Le mouvement qui explique** : une animation montre un flux, une donnée qui se déplace,
  une étape qui se valide. Une animation qui fait juste « joli » se coupe.
- **Du blanc.** Le plus gros gain de lisibilité du site est venu des espacements élargis.

### Interdits visuels

- Fond ou décor qui suit la souris : retiré à la demande du client le 6 septembre 2026,
  ne pas réintroduire (`PageAtmosphere` est statique).
- Animer `width`, `height`, `top`, `left` : uniquement `transform` et `opacity`.
- Couleur en dur : 3 exceptions seulement (API `glow`/`accent`, logos de marques tierces,
  `app/icon.tsx`), plus les modules du film hero `components/film/*`.
- `-webkit-backdrop-filter` écrit à la main : Lightning CSS supprime alors la version
  standard et Chrome perd l'effet.
- Ajouter une bibliothèque (GSAP, Three.js, Lottie, tsparticles) : le site tient son LCP
  parce qu'elles ne sont pas là.

---

## 5. Ce qui fait « écrit par une IA » (à fuir)

- le tiret cadratin « — » dans un texte visible : interdit partout (pages, metadata, FAQ,
  articles, emails)
- « solutions innovantes », « révolutionner », « à l'ère de l'IA », « libérez votre
  potentiel », « dans un monde où… »
- les énumérations par trois qui sonnent creux : « rapide, fiable et performant »
- les phrases à rallonge avec trois subordonnées
- le « nous » : ici c'est « je », un développeur indépendant seul
- les titres de section qui ne disent rien : « Nos atouts », « Notre approche »

Un titre de section doit pouvoir se lire seul et apprendre quelque chose :
« Quatre étapes, sans jargon, sans surprise » plutôt que « Notre méthode ».

---

## 6. Les faits de référence

Toute page qui les contredit est en faute, pas le tableau (`docs/contenu-copy.md`) :

- premier échange : **45 minutes**, gratuit, sans engagement
- pilote assistant IA : **30 jours**, satisfait ou remboursé, données restituées
- facture électronique : réception obligatoire depuis le **1er septembre 2026**,
  émission pour les PME et TPE à partir du **1er septembre 2027**
- **cinq** services · **sept** articles
- prix : vitrine simple dès 500 € · vitrine premium 1 000 à 2 500 € · site relié aux outils
  2 500 à 5 000 € · application 1 500 à 15 000 € · automatisation et assistant IA sur devis

---

## 7. Le test avant de dire que c'est bon

Deux lectures, imposées par la grille d'audit :

1. **Le dirigeant qui ne connaît rien à l'IA** : au bout de 30 secondes, sait-il ce que ça
   lui rapporterait, en euros ou en heures ?
2. **Le dirigeant qui connaît déjà** : trouve-t-il de quoi se rassurer sans écrire un mail ?

Si la réponse est non à la première, le problème n'est pas le design : c'est qu'il manque
un chiffre, un exemple ou une phrase en français simple.

La grille complète (Contenu 35 %, Design 25 %, Conversion 40 %) est dans
`docs/audits/2026-09-06-conversion/METHODE.md`, appliquée par l'agent `conversion-auditor`.
