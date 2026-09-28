# DESIGN_SYSTEM_V2_DIRECTION.md

# But

Faire évoluer le design sans repartir de zéro.

L'objectif est de réduire la sensation :
- trop sombre ;
- trop glass ;
- trop glow ;
- trop "interface IA générique".

Et augmenter :
- lisibilité ;
- espace ;
- contraste ;
- hiérarchie ;
- réalisme produit ;
- cohérence inter-pages.

---

# Palette cible

## Base claire
- blanc / blanc cassé
- gris très clair
- gris doux pour séparateurs
- texte presque noir

## Base sombre
Réservée aux :
- démonstrations ;
- hero ponctuel ;
- sections techniques fortes ;
- callouts.

## Accents
Conserver la famille existante :
- indigo ;
- violet ;
- cyan.

Mais les accents ne doivent plus remplir tout le site.

Utilisations :
- signal actif ;
- connexion ;
- progression ;
- focus ;
- CTA ;
- état sélectionné.

---

# Surfaces

Réduire le nombre de variantes.

Créer / normaliser autour de :

1. `Surface`
   - light
   - muted
   - dark

2. `Card`
   - default
   - interactive
   - accent

3. `DemoSurface`
   - grand espace produit / animation

4. `FloatingPanel`
   - petites cartes détachées pour les scènes

5. `DeviceFrame`
   - browser
   - laptop
   - phone
   - tablet

6. `FlowNode`
   - source
   - processing
   - destination
   - result

7. `Metric`
   - donnée / preuve compacte

Ne pas recréer une nouvelle famille de cartes par page.

---

# Typographie

Chercher :
- gros titres plus courts ;
- paragraphes plus étroits ;
- phrases plus humaines ;
- moins de texte directement visible ;
- détail secondaire repliable.

Principe :
**première lecture simple, deuxième lecture détaillée**.

Le visiteur doit pouvoir comprendre une section sans lire toutes les lignes.

---

# Sections

Alternance recommandée :

- clair ;
- clair légèrement teinté ;
- sombre démonstratif ;
- clair ;
- clair ;
- CTA sombre ou accentué.

Eviter le pattern :
sombre + glow
puis sombre + glow
puis sombre + glow
pendant 10 sections.

---

# Espacement

Privilégier :
- grandes marges verticales ;
- moins de cartes visibles simultanément ;
- sections qui respirent ;
- max-width lisibles ;
- davantage de vide autour des objets complexes.

---

# Illustration produit

Les schémas doivent progressivement ressembler à de vrais produits.

Exemples :
- email réel stylisé ;
- fiche CRM ;
- calendrier ;
- téléphone ;
- dashboard ;
- document ;
- notification ;
- formulaire ;
- tableau.

Eviter les nœuds abstraits si un objet métier réel peut expliquer la même chose.

---

# Règle de réutilisation

Avant de créer un composant, vérifier :
1. existe-t-il déjà ?
2. peut-il devenir une variante ?
3. est-il partagé entre au moins deux usages ?
4. est-ce un composant de design ou juste du contenu ?

Ne pas extraire prématurément chaque petit morceau.
Ne pas dupliquer les gros composants.
