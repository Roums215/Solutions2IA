# Accueil

**Route** : `/` · **1081 mots visibles** · 8 sections

| Axe | Note | |
|---|---|---|
| **Contenu** | **58**/100 | `██████░░░░` |
| **Design** | **82**/100 | `████████░░` |
| **Conversion** | **56**/100 | `██████░░░░` |
| **GLOBAL** | **63**/100 | `██████░░░░` |

> **Correcte, mais elle ne déclenche pas la décision.** C'est la page la plus visitée et l'une des plus faibles en conversion : elle explique très bien, elle ne chiffre rien et ne donne aucune raison d'agir aujourd'hui.

---

## 1. Le rôle de la page

C'est la vitrine. Elle doit faire trois choses en moins de trente secondes : dire ce que fait Iulian, montrer que ça s'applique au métier du visiteur, et donner une raison de cliquer maintenant.

Elle réussit les deux premières. Elle échoue sur la troisième.

---

## 2. Ce que voit le visiteur, section par section

| # | Section | Ce qu'elle dit | Verdict |
|---|---|---|---|
| 1 | `HeroSection` · h1 | « Des outils qui travaillent pour vous » | ✅ **excellent**, promesse claire et orientée client |
| 2 | `HomeServicesConstellation` · h2 | « Six services, un seul système » | ⚠️ schéma superbe, **mais il y en a cinq** |
| 3 | `HomeTransformationFlows` · h2 | « Le système change votre quotidien » : 4 flux Avant/Après | ✅ le meilleur bloc pédagogique, ❌ zéro chiffre |
| 4 | `HomeProofTelecom` · h2 | « Des rapports papier à la plateforme web » | ✅ **la meilleure preuve du site**, réelle et concrète |
| 5 | `PremiumFlowPanel` · h3 | « Quatre étapes, sans jargon, sans surprise » | ⚠️ utile, mais **pas de h2** et répété sur 5 pages |
| 6 | `HomeApproachSplit` · h2 | « Comprendre d'abord, construire ensuite » + volet technique | ✅ bonne double lecture |
| 7 | `HomeProfileMatrix` · h2 | « Quel est votre profil ? » 6 profils | ✅ très bonne idée : le visiteur se reconnaît |
| 8 | `CTABand` · h2 | « On regarde ensemble ce qui vous prend du temps ? » | ✅ CTA unique, ton juste |

**Ce qui manque dans cette liste** : une section « combien ça coûte » et une section « pourquoi maintenant ». Aucune des huit ne répond à ces deux questions.

---

## 3. Notes détaillées

### Contenu · 58/100

| Critère | Note | | Pourquoi |
|---|---|---|---|
| C1 · Clarté de la promesse | **17**/20 | `█████████░` | H1 « Des outils qui travaillent pour vous » + « Vous m'expliquez ce qui vous prend du temps, je construis l'outil qui s'en charge » : la promesse est immédiate et centrée sur le visiteur. |
| C2 · Bénéfice concret et chiffré | **6**/25 | `██░░░░░░░░` | **Aucun chiffre sur toute la page.** « Quatre transformations concrètes » annonce du concret et ne livre que du qualitatif. Zéro heure, zéro euro. |
| C3 · Preuve et crédibilité | **13**/20 | `███████░░░` | Le projet télécoms (DFT) est réel, daté, bien raconté. Mais aucun prix, et un seul exemple pour cinq services. |
| C4 · Traitement des objections | **9**/15 | `██████░░░░` | « Premier échange gratuit, sans engagement », « réponse sous 24 h ». Le pilote 30 jours et les prix, qui lèvent les vraies objections, sont absents. |
| C5 · Lisibilité PME | **7**/10 | `███████░░░` | Très accessible dans le corps. Mais les schémas Avant/Après affichent « RAG métier », « SEO → GEO IA », « Trigger → Workflow → Notification » sans une ligne d'explication. |
| C6 · Règles maison | **6**/10 | `██████░░░░` | **Erreur factuelle visible** : le H2 dit « Six services, un seul système » et l'`aria-label` dit « Six services Solutions 2IA », alors que la constellation en affiche cinq. |

### Design · 82/100

| Critère | Note | | Pourquoi |
|---|---|---|---|
| D1 · Hiérarchie et scannabilité | **15**/20 | `████████░░` | 1 h1, 6 h2, structure lisible. Mais la section méthode n'a pas de h2 : `PremiumFlowPanel` pose un h3 juste après le h1. |
| D2 · Pédagogie visuelle | **22**/25 | `█████████░` | La constellation des services et les quatre flux Avant/Après sont parmi les meilleurs schémas du site : on comprend sans lire. |
| D3 · Cohérence du système | **14**/15 | `█████████░` | Preset `home`, composants maison partout, aucune couleur en dur hors API documentée. |
| D4 · Rythme et densité | **13**/15 | `█████████░` | 1 081 mots pour 8 sections : rythme juste, aucune section de trop. |
| D5 · Mobile | **12**/15 | `████████░░` | La constellation bascule en grille 2×3 sous `lg`. Les flux Avant/Après tiennent. |
| D6 · Accessibilité | **6**/10 | `██████░░░░` | Saut h1→h3, et l'`aria-label` « Six services » est faux pour les lecteurs d'écran. |

### Conversion · 56/100

| Critère | Note | | Pourquoi |
|---|---|---|---|
| V1 · Visiteur qui ne connaît pas | **17**/20 | `█████████░` | Il comprend parfaitement. Le vocabulaire est celui de son quotidien : « les demandes se perdent dans une boîte mail ». |
| V2 · Visiteur qui connaît | **11**/15 | `███████░░░` | Le volet « Détails techniques : pour les curieux » donne la stack (Next.js, n8n, Claude, Mistral, PostgreSQL, hébergement UE). Bien vu, mais court. |
| V3 · Gain chiffré visible | **4**/20 | `██░░░░░░░░` | **Rien.** Le mot « temps » apparaît partout, jamais suivi d'un nombre. C'est le trou principal de la page. |
| V4 · Urgence : agir maintenant | **2**/15 | `█░░░░░░░░░` | **Rien du tout.** Aucune échéance, aucun coût de l'inaction chiffré, aucune disponibilité annoncée. Le visiteur peut revenir dans six mois sans rien perdre. |
| V5 · Réduction du risque | **9**/15 | `██████░░░░` | « Gratuit, sans engagement, réponse 24 h » : correct. Mais ni prix de départ, ni garantie 30 jours, alors que les deux existent ailleurs sur le site. |
| V6 · Appel à l'action | **13**/15 | `█████████░` | Un seul CTA cohérent (« Premier échange gratuit ») répété au bon endroit, plus le `CTABand` final. Conforme au standard qui convertit le mieux. |

---

## 4. Les deux lectures

### Le dirigeant qui ne connaît rien au sujet

**Il comprend, et c'est déjà beaucoup.** Le vocabulaire est celui de son quotidien, les flux Avant/Après lui parlent, et il se reconnaît dans un des six profils.

**Mais il repart sans savoir trois choses** : combien ça coûte (aucun prix), combien ça lui rapporterait (aucun chiffre), et pourquoi il devrait s'en occuper cette semaine plutôt qu'au printemps. Il note le site dans un coin, et il ne revient pas.

Deux détails l'accrochent au mauvais endroit : « RAG métier » et « SEO → GEO IA » dans les schémas, sans explication. Il ne sait pas ce que c'est, et personne ne le lui dit.

### Le dirigeant qui connaît déjà

**Il est plutôt bien servi.** Le volet « Détails techniques » lui donne la stack en une lecture : Next.js, React, TypeScript, n8n, Claude, Mistral, PostgreSQL, hébergement UE. C'est exactement ce qu'il cherche à vérifier.

**Ce qui lui manque** : les garde-fous (que se passe-t-il si l'agent se trompe ?), la réversibilité, et un ordre de grandeur de prix. Tout cela existe sur `/agents-ia` et `/services`, mais rien ne le lui signale depuis l'accueil.

---

## 5. Ce qui marche, à garder

1. **La promesse du hero.** « Vous m'expliquez ce qui vous prend du temps, je construis l'outil qui s'en charge. » Une phrase, tout est dit. À ne pas toucher.
2. **Les quatre flux Avant/Après.** Le meilleur dispositif pédagogique du site : le visiteur voit son propre problème dessiné, puis sa résolution.
3. **L'exemple télécoms.** Un projet réel, raconté sans exagération, avec le problème, la construction et le résultat. C'est la preuve la plus crédible du site précisément parce qu'elle est modeste.
4. **La matrice des six profils.** Auto-entrepreneur, artisan, cabinet, commerce local, PME, société de services : le visiteur se reconnaît en trois secondes.
5. **Le CTA unique.** Un seul appel, répété au bon moment. C'est le format qui convertit à 13,5 % contre 10,5 % pour les pages multi-CTA.

---

## 6. Ce qui coûte des clients

| Gravité | Problème | Où | Coût commercial |
|---|---|---|---|
| 🔴 | **« Six services » alors qu'il y en a cinq** | `HomeServicesConstellation.tsx:71` et `:90` | Le visiteur compte. Une erreur visible sur la première page attaque la crédibilité de tout le reste. |
| 🔴 | **Aucun gain chiffré** | toute la page | Le visiteur ne peut pas comparer au prix, donc il ne peut pas décider. C'est le facteur n°1 qui sépare une page à 3 % d'une page à 10 %. |
| 🔴 | **Aucune urgence** | toute la page | Rien ne l'empêche de reporter. Or les échéances réglementaires réelles existent (facture électronique 2026, Ségur, eCMR 2027) : elles sont juste ailleurs. |
| 🟠 | **Ni prix, ni garantie 30 jours** | toute la page | Les deux arguments les plus rassurants du site sont invisibles depuis l'accueil. |
| 🟠 | Jargon non expliqué dans les schémas | flux Avant/Après | « RAG métier », « GEO IA », « Trigger » perdent le novice au moment précis où on voulait le convaincre. |
| 🟡 | Saut h1 → h3 | section méthode | Accessibilité et lecture en diagonale dégradées. |
| 🟡 | Bloc méthode identique sur 5 pages | `PremiumFlowPanel` | Sensation de déjà-vu pour qui navigue. |

---

## 7. Améliorations, par ordre de rentabilité

### 🔴 P0 · Corriger « Six services » → « Cinq services »
Deux endroits : le h2 et l'`aria-label`. **2 minutes.** Retirer aussi le résidu `"studio"` du type `HomeService` et le `case "studio"` ligne 363.

### 🔴 P1 · Chiffrer les quatre transformations
Chaque flux Avant/Après reçoit une ligne de gain, formulée honnêtement comme une hypothèse à valider, jamais comme un résultat client :

> *Les demandes entrantes* → « Une demande traitée en 2 minutes au lieu de 20. Sur 15 demandes par semaine, c'est 4 h 30 récupérées par mois. »
> *Les tâches répétitives* → « 30 minutes par jour de ressaisie supprimées, soit 11 h par mois. »
> *Votre mémoire métier* → « Retrouver une information en 10 secondes au lieu de 10 minutes. »

Formulation à employer : **« Sur la base de ce que vous me décrirez, voilà le type de calcul qu'on fera ensemble »**. On ne promet pas, on montre la méthode de calcul. C'est honnête et c'est vendeur.

### 🔴 P1 · Ajouter un bandeau d'urgence réel
Sous le hero, une bande sobre : **« Facture électronique obligatoire : réception dès septembre 2026 pour toutes les entreprises assujetties à la TVA. »** avec lien vers `/automatisation`. C'est une échéance légale, pas une pression commerciale. Le contenu existe déjà, il est juste enterré.

### 🟠 P2 · Remonter les deux arguments de réassurance
Dans le `CTABand` ou juste sous le hero : **« À partir de 500 € »** et **« Pilote 30 jours, satisfait ou remboursé »**. Les deux sont vrais, les deux sont écrits ailleurs sur le site, aucun n'est sur l'accueil.

### 🟠 P2 · Expliquer les trois termes des schémas
Brancher `<TermeExplique k="rag">` et créer les entrées manquantes pour « GEO » et « déclencheur ». Le composant existe et n'est branché nulle part.

### 🟡 P3 · Poser un h2 sur la section méthode
Ajouter un `SectionHeading` avant `PremiumFlowPanel`, ou donner une prop de niveau au composant. Corrige aussi 5 autres pages.

---

## 8. Ce que font les meilleurs, et ce qu'on en prend

**Ce que font les meilleurs sur leur page d'accueil**, et où l'accueil se situe :

| Pratique | Les meilleurs | Ici |
|---|---|---|
| CTA unique au-dessus de la ligne de flottaison | 13,5 % contre 10,5 % | ✅ **déjà fait** |
| Design sur mesure | 11,6 % contre 3,8 % pour un template | ✅ **déjà fait**, et c'est un vrai atout |
| LCP < 2,5 s | standard 2026 | ✅ **1,8 s**, meilleur que le standard |
| Titre par persona | pratique dominante | ⚠️ la matrice des 6 profils s'en approche, mais elle est en bas de page |
| **Gain chiffré dès le hero** | quasi systématique | ❌ **absent** |
| **Réduction du risque dans le CTA** | « Essai 30 j, sans carte » bat les CTA incitatifs | ❌ le CTA dit « Premier échange gratuit », pas « Pilote 30 jours satisfait ou remboursé » |

**Le geste à copier** : les CTA qui mènent par la réduction du risque battent systématiquement les CTA purement incitatifs. Ici, remplacer ou compléter « Premier échange gratuit » par une mention de la garantie 30 jours coûte une ligne et déplace le curseur.

**Le geste à ne pas copier** : les ROI affichés du secteur (« 200 à 500 % la première année »). Solutions 2IA n'a pas de clients : ce serait faux. On calcule avec le visiteur, on n'affiche pas une moyenne de marché.

---

## 9. Le gain attendu

| Action | Effort | Effet attendu |
|---|---|---|
| Corriger « Six services » | 2 min | crédibilité restaurée sur la première impression |
| Chiffrer les 4 transformations | 2 h | **le levier n°1** : c'est ce qui sépare 3 % de 8 % de conversion |
| Bandeau facture électronique 2026 | 30 min | première raison d'agir maintenant sur tout le site |
| Prix de départ + garantie 30 j visibles | 30 min | lève les deux objections principales avant même le clic |

**Note projetée après ces quatre actions : 63 → environ 80.**
Le contenu passerait de 58 à ~76 (chiffrage + règles), la conversion de 56 à ~80 (chiffres, urgence, risque).

---

*Grille : [`../METHODE.md`](../METHODE.md) · Benchmark : [`../BENCHMARK.md`](../BENCHMARK.md) · Synthèse : [`../README.md`](../README.md)*
