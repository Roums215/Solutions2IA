# Assistant IA

**Route** : `/agents-ia` · **1090 mots visibles** · 7 sections

| Axe | Note | |
|---|---|---|
| **Contenu** | **73**/100 | `███████░░░` |
| **Design** | **81**/100 | `████████░░` |
| **Conversion** | **69**/100 | `███████░░░` |
| **GLOBAL** | **73**/100 | `███████░░░` |

> **Solide. Des ajustements ciblés font gagner beaucoup.** Elle contient le meilleur argument commercial du site, le pilote 30 jours satisfait ou remboursé, et il est enterré dans la cinquième carte d'une section du milieu.

---

## 1. Le rôle de la page

Vendre l'assistant IA à des dirigeants qui ont entendu parler de ChatGPT et qui craignent trois choses : que ça invente, que leurs données partent, que ça se plante devant un client.

C'est la page qui traite le mieux les objections de tout le site. Elle ne les convertit pas en euros.

---

## 2. Ce que voit le visiteur, section par section

| # | Section | Ce qu'elle dit | Verdict |
|---|---|---|---|
| 1 | `PageHero` · h1 | « Un collègue numérique qui connaît votre métier » + « Pas un chatbot de plus » | ✅ **excellent** |
| 2 | `AgentAnatomyDiagram` · h2 | « ce n'est pas un simple robot : c'est un système structuré et contrôlé » | ✅ schéma qui rassure |
| 3 | `UniversalNeedsGrid` · h2 | « Huit tâches répétitives que vos équipes vivent au quotidien » | ✅ très concret, ❌ jamais chiffré |
| 4 | `OneAgentManyNeedsPipeline` · h2 | « Un seul assistant peut prendre en charge plusieurs besoins » | ✅ bon schéma, ⚠️ 1 045 LOC dupliquées avec `/applications` |
| 5 | `ProfileCarousel` · h2 | « un assistant conçu pour votre rôle » | ✅ personnalisation |
| 6 | `TrustGuardrails` · h2 | « Un assistant qui ne casse rien » : 5 objections citées | ✅ **le meilleur bloc du site**, ⚠️ le pilote 30 j y est noyé |
| 7 | Capacités · h2 | « Un assistant qui comprend et agit » | ✅ 6 bénéfices simples |
| 8 | `PremiumFlowPanel` · h3 | « De votre quotidien à un assistant qui aide vraiment » | ⚠️ pas de h2, 4ᵉ occurrence sur le site |

---

## 3. Notes détaillées

### Contenu · 73/100

| Critère | Note | | Pourquoi |
|---|---|---|---|
| C1 · Clarté de la promesse | **18**/20 | `█████████░` | « Un collègue numérique qui connaît votre métier » + « Pas un chatbot de plus ». Il tue l'objection principale dès la deuxième phrase. |
| C2 · Bénéfice concret et chiffré | **11**/25 | `████░░░░░░` | « Des heures chaque semaine absorbées par la boîte mail », « le vendredi après-midi à compiler des chiffres » : on frôle le chiffre sans jamais le poser. |
| C3 · Preuve et crédibilité | **13**/20 | `███████░░░` | Aucun exemple d'agent réellement déployé. Les huit tâches sont crédibles mais théoriques. |
| C4 · Traitement des objections | **15**/15 | `██████████` | **Note maximale, et méritée.** La section Garde-fous cite cinq objections réelles entre guillemets et y répond concrètement. C'est le meilleur bloc du site. |
| C5 · Lisibilité PME | **8**/10 | `████████░░` | Bon dans l'ensemble. « Hand-off Slack », « modes draft / auto / proactif », « seuil de confiance configurable » restent du jargon. |
| C6 · Règles maison | **8**/10 | `████████░░` | Ton et règles respectés. |

### Design · 81/100

| Critère | Note | | Pourquoi |
|---|---|---|---|
| D1 · Hiérarchie et scannabilité | **15**/20 | `████████░░` | 1 h1, 7 h2. La section méthode est un h3 sans h2. |
| D2 · Pédagogie visuelle | **23**/25 | `█████████░` | `AgentAnatomyDiagram` et `OneAgentManyNeedsPipeline` sont des schémas de haut niveau. La grille des 8 tâches est très lisible. |
| D3 · Cohérence du système | **14**/15 | `█████████░` | Preset `ai`, le plus travaillé du site. Cohérent. |
| D4 · Rythme et densité | **12**/15 | `████████░░` | 1 090 mots, 7 sections : correct. `OneAgentManyNeedsPipeline` (1 045 LOC) est lourd pour ce qu'il raconte. |
| D5 · Mobile | **11**/15 | `███████░░░` | Le pipeline a une version mobile. Le carrousel de profils gère les cibles tactiles. |
| D6 · Accessibilité | **6**/10 | `██████░░░░` | Saut h1→h3 sur la méthode. |

### Conversion · 69/100

| Critère | Note | | Pourquoi |
|---|---|---|---|
| V1 · Visiteur qui ne connaît pas | **16**/20 | `████████░░` | « Pas un chatbot de plus » le rassure immédiatement. Les huit tâches sont décrites en gestes quotidiens, pas en fonctionnalités. |
| V2 · Visiteur qui connaît | **14**/15 | `█████████░` | **Très bien servi.** Sources affichées, refus explicite, Mistral/Claude UE/OVH/Scaleway, DPA, isolation, seuil de confiance, override audité, logs structurés. |
| V3 · Gain chiffré visible | **7**/20 | `████░░░░░░` | « Des heures chaque semaine » revient quatre fois sans jamais devenir un nombre. Frustrant, car la page est à un doigt du chiffrage. |
| V4 · Urgence : agir maintenant | **4**/15 | `███░░░░░░░` | Presque rien. Aucune échéance, aucun coût de l'attente. |
| V5 · Réduction du risque | **15**/15 | `██████████` | **Note maximale.** « Pilote 30 j sans engagement · 30 jours satisfait ou remboursé · vous arrêtez quand vous voulez · sortie sans frais, données restituées. » Le meilleur dispositif du site. |
| V6 · Appel à l'action | **13**/15 | `█████████░` | CTA unique et excellent : « Quelle tâche aimeriez-vous déléguer ? » Il fait faire un pas mental au visiteur. |

---

## 4. Les deux lectures

### Le dirigeant qui ne connaît rien au sujet

**Il est rassuré, et c'est exactement ce qu'il fallait.**

« Pas un chatbot de plus » désamorce sa méfiance. Les huit tâches sont décrites comme il les vit : « le vendredi après-midi à compiler des chiffres », « votre matinée ne commence plus par une heure de tri ».

La section Garde-fous répond mot pour mot à ce qu'il pensait sans oser le dire : *« Et si ça invente des réponses ? »*, *« Mes données partent où ? »*, *« Et si l'agent se trompe devant mon client ? »*, *« C'est une boîte noire. »*, *« Et si ça ne convient pas à mon équipe ? »*

**Ce qu'il n'a toujours pas** : combien de temps il récupère, combien ça coûte, et pourquoi commencer maintenant. Il est convaincu que c'est sérieux, pas qu'il doit s'y mettre.

### Le dirigeant qui connaît déjà

**Il trouve tout ce qu'il cherche, ce qui est rare.**

Ancrage documentaire avec sources affichées et refus explicite sous seuil de confiance. Hébergement Mistral, Claude UE, OVH, Scaleway avec contrats DPA et isolation par client. Humain dans la boucle avec seuil configurable, hand-off, override audité, modes draft/auto/proactif. Logs structurés, tableau de bord d'adoption, consignes versionnées, audit RGPD.

C'est le niveau d'un fournisseur sérieux, pas d'un freelance qui découvre le sujet.

**Ce qui lui manque** : un ordre de grandeur de prix et un exemple déployé.

---

## 5. Ce qui marche, à garder

1. **La section Garde-fous.** Cinq objections réelles, citées entre guillemets, avec une réponse courte puis un « en pratique » technique. C'est la double lecture parfaitement exécutée, et c'est le meilleur bloc de tout le site.
2. **Le pilote 30 jours satisfait ou remboursé.** Sortie sans frais, données restituées, indicateurs d'adoption documentés. **C'est l'argument le plus fort du site, tous services confondus.**
3. **« Pas un chatbot de plus ».** Quatre mots qui positionnent l'offre contre tout ce que le visiteur a déjà vu.
4. **Les huit tâches.** Décrites en gestes, avec les métiers concernés en étiquettes. Le visiteur se reconnaît en une lecture.
5. **Le CTA.** « Quelle tâche aimeriez-vous déléguer ? » Il fait travailler le visiteur mentalement avant de cliquer.

---

## 6. Ce qui coûte des clients

| Gravité | Problème | Coût commercial |
|---|---|---|
| 🔴 | **Le pilote 30 jours est invisible** | Meilleur argument du site, placé dans la cinquième carte d'une section au milieu de la page. Il devrait être dans le hero et dans le CTA. |
| 🔴 | **Aucun chiffre alors que la page en frôle partout** | « Des heures chaque semaine », « trop de temps commercial », « le vendredi après-midi » : quatre occasions manquées de poser un nombre. |
| 🟠 | **Aucune urgence** | Rien ne justifie de commencer ce mois-ci. |
| 🟠 | Aucun prix, même en fourchette | Le visiteur convaincu doit aller le chercher ailleurs. |
| 🟠 | Aucun exemple déployé | La page ne montre aucun agent en fonctionnement, même une démonstration. |
| 🟡 | 1 045 LOC dupliquées avec `/applications` | `OneAgentManyNeedsPipeline` et `AppDigitizationPipeline` sont le même composant à deux exemplaires. |
| 🟡 | Saut h1 → h3 | Accessibilité. |

---

## 7. Améliorations, par ordre de rentabilité

### 🔴 P1 · Sortir le pilote 30 jours du milieu de page
C'est l'action la plus rentable de tout le site. Trois emplacements :

1. **Dans le hero**, sous la description : *« Pilote 30 jours, satisfait ou remboursé. Vous arrêtez quand vous voulez, vos données vous sont restituées. »*
2. **Dans le CTA final**, à la place de « Premier échange gratuit » : *« Démarrer un pilote 30 jours »*.
3. **Sur `/services` et sur l'accueil**, en une ligne.

Le référentiel du secteur est formel : les CTA qui mènent par la réduction du risque battent systématiquement les CTA incitatifs. Le site a déjà la meilleure garantie possible et il la cache.

### 🔴 P1 · Chiffrer les huit tâches
Chaque carte reçoit un ordre de grandeur, présenté comme une hypothèse à valider ensemble :

| Tâche | Ligne à ajouter |
|---|---|
| Tri & réponse emails | « ≈ 1 h par jour, soit 20 h par mois » |
| Notes appel → CRM | « ≈ 5 min par appel, 15 appels/jour = 6 h par semaine » |
| Génération devis | « 45 min → 10 min par devis » |
| Reporting hebdo | « 2 h chaque vendredi, soit 100 h par an » |

Puis, en bas de section : **« Additionnez les vôtres. Multipliez par votre coût horaire chargé. C'est ce que la tâche vous coûte aujourd'hui. »** Le visiteur fait le calcul lui-même : rien n'est inventé, et le chiffre est le sien.

### 🟠 P2 · Ajouter un simulateur de gain
Trois champs (heures/semaine, nombre de personnes, coût horaire) et une sortie en heures/mois, euros/an et mois de retour sur investissement. C'est le standard du secteur, et Solutions 2IA n'en a pas.

### 🟠 P2 · Ajouter une fourchette de prix
« Un premier assistant sur une tâche : à partir de X €, pilote 30 jours inclus. »

### 🟠 P2 · Montrer un agent en fonctionnement
Même une démonstration sur données fictives, clairement annoncée comme telle. Une capture animée de 20 secondes vaut mieux qu'une page de description.

### 🟡 P3 · Factoriser les deux pipelines et poser un h2 sur la méthode.

---

## 8. Ce que font les meilleurs, et ce qu'on en prend

**Sur les garde-fous, cette page est au niveau des meilleures plateformes du marché.** Les acteurs de référence ont standardisé trois preuves : citation de la source, refus explicite quand l'information manque, souveraineté traitée dans l'architecture et pas dans le contrat. **Les trois sont présentes ici, et bien expliquées.** C'est un vrai actif.

**Sur la réduction du risque, elle a le bon dispositif au mauvais endroit.** Le standard du marché est « Essai 30 jours, sans carte bancaire », affiché dans le CTA principal. Solutions 2IA a l'équivalent, plus fort même (satisfait ou remboursé, données restituées), et le range dans une carte au milieu de la page.

**Sur le chiffrage, elle est nettement en dessous.** Le calculateur de ROI est devenu un standard de cette verticale : NxCode compare l'agent à une embauche, The Crunch affiche le point mort en mois, Layer3 Labs fait estimer le retour avant de montrer ses prix. **Aucun équivalent ici**, alors que la page a déjà la matière : huit tâches identifiées, chacune quantifiable.

**Le geste à copier en priorité** : le simulateur. C'est le seul dispositif qui transforme « gagner du temps » en décision d'achat, et il respecte parfaitement la règle du projet, puisque les chiffres viennent du visiteur.

**Le geste à ne pas copier** : les promesses de ROI du secteur (200 à 500 % la première année). Inutiles quand on peut faire calculer le client.

---

## 9. Le gain attendu

| Action | Effort | Effet attendu |
|---|---|---|
| Remonter le pilote 30 j dans le hero et le CTA | 30 min | **le meilleur rapport effort/impact du site** |
| Chiffrer les 8 tâches | 2 h | le visiteur calcule son propre gain |
| Simulateur de gain | 1 j | rejoint le standard de la verticale |
| Fourchette de prix | 20 min | moins de contacts perdus |

**Note projetée : 73 → environ 87.** Contenu 73 → ~84, conversion 69 → ~90 (V3 de 7 à 17, V4 de 4 à 10, V5 déjà au maximum).

---

*Grille : [`../METHODE.md`](../METHODE.md) · Benchmark : [`../BENCHMARK.md`](../BENCHMARK.md) · Synthèse : [`../README.md`](../README.md)*
