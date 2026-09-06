# La grille de notation

> Pour que les notes soient discutables, reproductibles, et pas des impressions.
> Chaque page est notée sur trois axes, avec des critères pesés. La note globale
> les combine selon leur importance commerciale.

---

## Pourquoi trois axes et pas deux

Vous avez demandé une note de design et une note de contenu. J'en ajoute une troisième,
**Conversion**, parce que c'est la seule qui répond vraiment à votre question :
« est-ce qu'un client va se dire c'est maintenant ou jamais ? »

Une page peut être belle (design 90) et bien écrite (contenu 85) et ne convertir personne,
parce qu'elle ne chiffre aucun gain et ne donne aucune raison d'agir aujourd'hui.
C'est exactement la situation de ce site.

---

## Axe 1 · CONTENU /100

| Code | Critère | Points | Ce qui fait perdre des points |
|---|---|---|---|
| **C1** | **Clarté de la promesse** : en 5 secondes, le visiteur sait ce que la page lui apporte | 20 | titre abstrait, promesse noyée, on parle de soi avant de parler de lui |
| **C2** | **Bénéfice concret et chiffré** : combien de temps, combien d'euros, combien de clients | 25 | « gagner du temps » sans nombre, verbes vagues, aucun ordre de grandeur |
| **C3** | **Preuve et crédibilité** : exemples réels, prix affichés, transparence | 20 | aucun exemple, prix cachés, ou pire : **preuve inventée** |
| **C4** | **Traitement des objections** : prix, risque, délai, « je ne suis pas technique » | 15 | objections ignorées, réponses évasives |
| **C5** | **Lisibilité PME** : mots du quotidien, jargon expliqué, une idée par bloc | 10 | sigles non expliqués, phrases longues, empilement |
| **C6** | **Respect des règles maison** : « je » et jamais « nous », zéro preuve inventée, pas de tiret cadratin, compteurs justes | 10 | toute violation d'une règle non négociable du projet |

## Axe 2 · DESIGN /100

| Code | Critère | Points | Ce qui fait perdre des points |
|---|---|---|---|
| **D1** | **Hiérarchie et scannabilité** : on lit la page en diagonale et on comprend | 20 | titres qui ne racontent rien, blocs indifférenciés, saut de niveau Hn |
| **D2** | **Pédagogie visuelle** : le schéma explique vraiment, il n'est pas décoratif | 25 | joli mais muet, pas de légende, incompréhensible sans le texte |
| **D3** | **Cohérence du système** : tokens, composants maison, preset du domaine | 15 | couleurs en dur, composants recréés, preset absent ou emprunté |
| **D4** | **Rythme et densité** : longueur tenable, respiration, pas de redite | 15 | page interminable, sections qui se répètent, mur de texte |
| **D5** | **Mobile** : la mécanique signature survit à 375 px | 15 | schéma illisible, cibles tactiles < 44 px, débordement |
| **D6** | **Accessibilité** : un seul h1, hiérarchie continue, focus visible, décor `aria-hidden` | 10 | saut h1→h3, `aria-label` faux, contraste insuffisant |

## Axe 3 · CONVERSION /100

| Code | Critère | Points | Ce qui fait perdre des points |
|---|---|---|---|
| **V1** | **Le visiteur qui ne connaît PAS le sujet** comprend et se projette dans son métier | 20 | il faut déjà savoir ce qu'est un RAG ou un workflow pour suivre |
| **V2** | **Le visiteur qui connaît** trouve de la matière : stack, garanties, limites | 15 | page trop grand public, rien à se mettre sous la dent |
| **V3** | **Gain chiffré visible** : temps récupéré, euros économisés, clients gagnés | 20 | aucun nombre, ou des nombres qui ne parlent pas d'argent |
| **V4** | **Urgence** : une raison d'agir maintenant plutôt que dans six mois | 15 | aucune échéance, aucun coût de l'inaction, aucune rareté honnête |
| **V5** | **Réduction du risque** : prix, pilote, garantie, sans engagement, réversibilité | 15 | prix cachés, engagement flou, aucune sortie possible |
| **V6** | **Appel à l'action** : un seul, clair, sans friction | 15 | CTA multiples et concurrents, formulaire lourd, action vague |

---

## La note globale

```
Global = Contenu × 35 %  +  Design × 25 %  +  Conversion × 40 %
```

La conversion pèse le plus parce que c'est l'objectif que vous avez posé :
**ramener des clients**, pas gagner un prix de design.

| Note | Lecture |
|---|---|
| **85-100** | La page vend seule. On n'y touche plus. |
| **70-84** | Solide. Des ajustements ciblés font gagner beaucoup. |
| **55-69** | Correcte mais elle ne déclenche pas la décision. Chantier utile. |
| **40-54** | Elle informe, elle ne convertit pas. Chantier prioritaire. |
| **< 40** | Elle dessert le site. À reprendre. |

---

## Comment les notes ont été établies

1. **Le texte réellement affiché** a été extrait des pages rendues sur `localhost:4000`
   (HTML servi, balises retirées), pas lu dans le code source. C'est ce que voit un visiteur.
2. **La structure des titres** (h1 à h4) a été relevée sur le même HTML.
3. **Le volume** est compté en mots visibles, hors en-tête et pied de page.
4. **Les règles maison** viennent de `docs/contenu-copy.md` et de
   `docs/archives/audit-phase-0/PLAN.md` (règles données par le client, non négociables).
5. Chaque perte de points est justifiée par une citation ou un chemin de fichier.

Rien n'a été noté sur impression : si un critère est bas, la page correspondante
en donne la raison exacte.

---

## Les deux profils de visiteur testés

Chaque page est jugée sur deux lectures, parce que le site s'adresse aux deux :

**Le dirigeant qui ne connaît rien à l'IA.** Il cherche à régler un problème concret :
il perd du temps, il rate des demandes, il paie trop cher un logiciel qui ne lui va pas.
Il ne sait pas ce qu'est un RAG, un webhook ou un pipeline. Question test :
*« au bout de 30 secondes, sait-il ce que ça lui rapporterait, en euros ou en heures ? »*

**Le dirigeant ou responsable qui sait déjà.** Il a peut-être déjà essayé un outil,
il connaît le vocabulaire, il veut vérifier le sérieux : où sont les données,
que se passe-t-il si ça se plante, combien ça coûte vraiment, comment on sort.
Question test : *« trouve-t-il de quoi se rassurer sans avoir à écrire un mail ? »*
