# Solutions 2IA — Playbook design, motion & pédagogie
### Refonte page par page · positionnement « spécialiste adoption IA »

> But du document : figer **un langage visuel et pédagogique commun** avant de coder, pour
> que chaque page soit **woaw** (impressionne) **et claire** (une PME comme un grand compte
> comprend en 10 s ce que ça lui rapporte) — sans que les pages se répètent.

---

## 0. Le principe directeur

Un site qui vend de l'**adoption de l'IA** doit faire deux choses en même temps :
1. **Impressionner** — montrer qu'on maîtrise un sujet perçu comme complexe.
2. **Expliquer** — désamorcer la peur, rendre concret « ce que ça change pour vous ».

Notre arme pour les deux à la fois : **le schéma animé**. Partout où il y a un process
(pipeline, agent, RAG, automatisation), on le **montre en mouvement** au lieu de le décrire.
Le mouvement n'est pas décoratif : il *dit* quelque chose (la donnée circule, l'étape
s'exécute, la décision se prend). C'est ça qui fait à la fois le wow **et** la pédagogie.

---

## 1. Le langage commun (sur TOUTES les pages)

### 1.1 Système d'« explication animée »
Un vocabulaire visuel unique, réutilisé partout :
- **Nœuds** = étapes ou outils (rectangles arrondis, icône + label court).
- **Flux** = traits lumineux animés (pulse qui voyage) indiquant **le sens** de la donnée.
- **États** = en attente (gris) → actif (glow cyan) → fait (check vert).
- **Légendes** = une ligne, jamais de pavé.

Palette : la **signature 2IA** (indigo/cyan, glows) pour « le système 2IA » ; les **outils
tiers** (JobPhoning, Axonaut, Claude, n8n…) gardent un **badge neutre** pour rester crédibles
et reconnaissables. Conséquence : chaque page a SA mécanique, mais le visiteur reconnaît la
même grammaire → cohérence de marque **et** zéro répétition de contenu.

### 1.2 Règle schéma / image / vidéo (quand utiliser quoi)
- **Schéma animé SVG/CSS = défaut (≈90 % des cas).** Léger, interactif, on-brand, 0 asset.
  Pour tous les pipelines, flux, architectures, raisonnements. C'est notre signature.
- **Image réelle (`next/image`) = pour la PREUVE.** Screenshot de Claude en usage, du canvas
  n8n, d'Axonaut, d'un dashboard d'app. Là où « c'est vrai » compte plus que « c'est joli ».
  Optimisée AVIF/WebP + lazy.
- **Vidéo (capture écran ou Remotion) = 1, maximum 2 moments héros** sur tout le site.
  Ex : une boucle de 15-20 s du pipeline JobPhoning→Axonaut qui « tourne ». Toujours :
  lazy-load, poster image, coupée en `reduced-motion`, **jamais** en fond plein écran
  (poids iPhone). Par défaut on préfère le schéma animé SVG à la vidéo.

### 1.3 Double lecture : PME ↔ grand compte
Chaque bloc explicatif porte **deux niveaux** :
- **Niveau 1 (tout le monde / PME)** : une phrase concrète orientée bénéfice.
  > « Vos leads d'appels arrivent tout seuls dans votre CRM, déjà qualifiés, sans ressaisie. »
- **Niveau 2 (technique / grand compte)** : un volet **« détails techniques » déroulant**
  (intégrations, API, sécurité, volumétrie, RGPD, hébergement).

C'est de la *progressive disclosure* : on n'effraie pas la PME, on ne frustre pas la DSI.

### 1.4 Motion au service du sens
- Le mouvement raconte le flux (gauche→droite = la donnée circule ; nœud qui s'allume =
  étape qui s'exécute ; boucle = ça tourne 24/7).
- `whileInView once`, `IntersectionObserver` pour mettre en pause hors écran,
  **transform/opacity/clip-path only**, 60 fps, `reduced-motion` = état final statique lisible.
- Une seule grosse animation « vivante » par écran ; le reste en micro-motion.

### 1.5 Garde-fous
- **Crédibilité** : zéro stat inventée. Chiffres réels ou formulations qualitatives
  (« réduction nette du temps de ressaisie » plutôt que « 97,4 % de confiance »).
- **Perf iPhone** : `contain`, lazy, pas d'asset lourd non justifié.
- **Signature de marque** conservée (glows/gradients = assumés, jamais traités comme du slop).

---

## 2. Page par page

Pour chaque page : **Rôle · Hero · Mécanique signature · Sections & explication · Visuels · Wow**.

### 2.1 `/` Home — *orchestrer & positionner*
- **Rôle** : poser la promesse (« votre partenaire pour adopter l'IA, sans douleur ») et
  donner envie d'entrer dans le parcours. Pas un dépotoir de 4 Avant/Après.
- **Hero** : phrase de positionnement claire + sous-titre bénéfice + 1 visuel signature
  (le `HeroVisual` existant, gardé). CTA « Faire le diagnostic » + « Voir comment ».
- **Mécanique signature** : **le parcours d'adoption en 6 marches** (Adoption → Formation →
  Automatisation → Agents → RAG → Applications) sous forme de chemin animé qui se révèle au
  scroll — chaque marche = un nœud qui s'allume + une phrase bénéfice + lien vers sa page.
- **Reframe important** : les blocs web/studio actuels passent en **preuve** (un teaser
  « on fait aussi de beaux sites quand le projet le mérite » → lien `/realisations`). Le démo
  Atelier Bois n'est plus un service phare mais une vitrine. Ton travail dessus est réutilisé.
- **Visuels** : schémas animés SVG. Pas de vidéo ici.
- **Wow** : le chemin lumineux qui se construit marche après marche au scroll.

### 2.2 `/automatisation` — *supprimer le répétitif* — **PRIORITÉ**
- **Rôle** : vendre l'automatisation des process manuels/répétitifs. C'est LA page la plus
  concrète : on prouve par un vrai flux client.
- **Hero** : garder `AutomationScene` (le circuit animé) en ambiance, titre orienté bénéfice
  (« Vos tâches répétitives s'exécutent toutes seules, sans erreur, pendant que vous vendez »).
- **Mécanique signature** : **le pipeline isométrique animé JobPhoning → n8n → Axonaut**
  (le flux réel, voir §3). Des nœuds-outils (badges JobPhoning, n8n, Axonaut) reliés par des
  flux lumineux ; une « donnée » (un lead) voyage le long de la chaîne, chaque étape s'allume
  à son passage, et le lead atterrit dans le CRM. Boucle douce = « ça tourne 24/7 ».
- **À SUPPRIMER** (la répétition + le générique) :
  - le bloc `TransformationCard` Avant/Après (réservé nulle part ailleurs : on remplace par
    le pipeline, qui raconte mieux) ;
  - la grille d'intégrations générique (Slack/HubSpot/Stripe/Zapier…) → remplacée par **TES**
    outils réels (JobPhoning, Axonaut, téléphonie, API entreprise) + un « + vos outils » ;
  - les stats inventées (1 247 tâches/h, 0,02 %…) → bénéfices qualitatifs ou chiffres réels.
- **Double lecture** : Niveau 1 « plus de ressaisie, zéro lead perdu » ; Niveau 2 déroulant
  « webhook JobPhoning → n8n → normalisation + dédup + enrichissement SIREN → règles de
  décision → API Axonaut → notification ».
- **Visuels** : schéma animé SVG (signature) **+** candidat n°1 pour **la seule vidéo** du site
  (boucle 15-20 s du pipeline qui tourne, ou capture écran réelle de n8n + Axonaut = preuve).
- **Wow** : voir un vrai lead traverser la chaîne et apparaître dans le CRM, en direct.

### 2.3 `/adoption` 🆕 — *convertir l'indécis*
- **Rôle** : capter le dirigeant qui « sait qu'il doit s'y mettre mais ne sait pas par où ».
  C'est ta meilleure porte d'entrée commerciale.
- **Mécanique signature** : un **diagnostic de maturité IA interactif** — l'utilisateur clique
  son stade (Curieux → Pilote → En production → À l'échelle) et la page lui répond par un
  **point de départ personnalisé** + la marche du parcours recommandée. Petit, ludique, utile.
- **Sections** : le constat (où en sont les entreprises), le diagnostic interactif, la
  feuille de route type (90 jours), CTA « En parler 30 min, offert ».
- **Visuels** : schéma de maturité animé (jauge/étapes). 0 vidéo.
- **Wow** : la page « répond » à ton clic — sensation de conseil personnalisé immédiat.

### 2.4 `/formation` 🆕 — *enseigner & vendre la montée en compétence*
- **Rôle** : « former vos équipes à installer et utiliser Claude ». Page d'**autorité** : elle
  convertit en démontrant, pas en vantant.
- **Mécanique signature** : un **parcours/curriculum en modules** (Découvrir → Prompter →
  Automatiser → Sécuriser/RGPD) qui se déroule, + un encart **Claude en usage réel**
  (screenshot/animation d'une vraie session). Formats : atelier sur site, distanciel, coaching.
- **Double lecture** : PME « vos équipes autonomes en quelques jours » ; grand compte
  « déploiement, gouvernance, bonnes pratiques, conformité ».
- **Visuels** : **image réelle** (Claude à l'écran) = preuve + schéma de parcours.
- **Wow** : voir concrètement ce que les équipes sauront faire après.

### 2.5 `/rag` 🆕 — *autorité & vendre le RAG*
- **Rôle** : expliquer le RAG (« vos données deviennent interrogeables, réponses sourcées »)
  et le vendre par secteur. Page pédagogique qui installe l'expertise.
- **Mécanique signature** : un **schéma interactif** `question → recherche dans vos documents
  → réponse sourcée` : on tape/choisit une question, on voit la requête « fouiller » des docs
  (juridique, immo, support…), puis la réponse s'écrit **avec ses sources surlignées**.
- **Double lecture** : PME « posez une question, l'IA répond avec VOS infos, pas du blabla
  générique » ; grand compte « embeddings, base vectorielle, citations, fraîcheur, accès ».
- **Visuels** : schéma animé SVG + exemples sectoriels (onglets).
- **Wow** : voir la réponse se construire **et citer la source** — ça tue l'objection
  « l'IA invente ».

### 2.6 `/agents-ia` — *agents conversationnels* ✅ (déjà bon)
- **Rôle** : vendre les agents autonomes/conversationnels (support, commercial, veille).
- **Mécanique signature** : la **chaîne de raisonnement + terminal** déjà construite (sprint
  précédent). On garde.
- **Nettoyage** : retirer les stats inventées (97,4 %, 24K/min) ; resserrer pour ne pas
  refaire la même structure que les autres pages (pas de re-`TransformationCard`).
- **Visuels** : la scène/agent existante. 0 vidéo.

### 2.7 `/applications` — *industrialiser* ✏️
- **Rôle** : vendre l'app sur mesure qui **emballe** agent + RAG + automatisation en un produit.
- **Mécanique signature** : des **maquettes produit** (cockpit/dashboard) navigables — pas
  d'Avant/Après. Reframe du discours : « on industrialise ce qu'on a prototypé ».
- **Visuels** : maquettes CSS/SVG (comme le frame Atelier Bois, réutilisable) ; éventuellement
  un screenshot réel d'app livrée (preuve).
- **Wow** : un faux dashboard vivant (données qui bougent légèrement).

### 2.8 `/realisations` ♻️ (fusion sites-web + studio-visuel) — *preuve*
- **Rôle** : prouver le savoir-faire (web premium, motion) **sans** en faire un service phare.
- **Forme** : galerie de cas / vitrines. **Le démo Atelier Bois vit ici** (avant/après web),
  + exemples motion. Cadre clair : « la qualité d'exécution qu'on met aussi dans vos projets IA ».
- **Visuels** : le frame avant/après existant + tuiles.

### 2.9 `/a-propos` ✏️ — *confiance*
- Réécrire l'intro : **« spécialiste de l'adoption de l'IA »**, plus « studio digital
  généraliste ». Garder valeurs + méthode, mais recentrées sur l'IA/automatisation/formation.

### 2.10 `/contact` ✏️ — *convertir*
- Garder le brief + FAQ. **MAJ le menu « type de projet »** : Adoption/Diagnostic, Formation,
  Automatisation, Agent IA, RAG, Application — retirer « site web premium / studio visuel »
  des choix principaux (ils basculent en « autre / réalisation »).

---

## 3. Le pipeline `/automatisation` à valider (JobPhoning → Axonaut)

> ⚠️ Proposition à corriger avec **tes vrais flux** — c'est ce qui rendra la page *vraie* et
> impossible à copier. Dis-moi où ça diffère.

1. **Déclencheur** — fin d'un appel qualifié dans **JobPhoning** (statut « intéressé » /
   « RDV pris ») → webhook.
2. **n8n reçoit** le lead (nom, société, tél, email, notes d'appel, statut).
3. **Nettoyage** — normalisation tél/email, **déduplication**.
4. **Enrichissement** — SIREN/SIRET via API entreprise officielle (gratuit), secteur, taille.
5. **Décision** — « RDV pris » → créer opportunité + tâche ; « à rappeler » → planifier
   relance ; « pas intéressé » → log seul.
6. **Écriture Axonaut** — créer/mettre à jour contact + entreprise + opportunité (option :
   devis pré-rempli), via l'API Axonaut.
7. **Notification + boucle** — message au commercial ; option : recharger les « à rappeler »
   dans une campagne JobPhoning.

**Questions pour caler la page :**
- Le déclencheur réel : webhook JobPhoning, export, ou autre ?
- Les statuts/branches exacts que tu utilises ?
- Ce que tu écris vraiment dans Axonaut (contact ? opportunité ? devis ?) ?
- L'enrichissement SIREN, tu le fais déjà ou c'est un plus à montrer ?
- Le volet « appels » : JobPhoning gère les appels, ou il y a une autre brique téléphonie ?

---

## 4. Ordre d'exécution
0. **Socle de positionnement** (nav + metadata + intro home + intro à-propos) — texte, gros levier.
1. **`/automatisation`** (pipeline JobPhoning→Axonaut) — **en cours**.
2. `/adoption` 🆕 → 3. `/rag` 🆕 → 4. `/formation` 🆕 → 5. `/agents-ia` (nettoyage) →
   6. `/applications` (reframe) → 7. `/realisations` (fusion) → 8. `/contact` + `/a-propos`.
