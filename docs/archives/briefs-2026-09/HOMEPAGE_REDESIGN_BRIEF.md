# HOMEPAGE_REDESIGN_BRIEF.md

# Objectif

Refondre la page d'accueil de Solutions 2IA pour qu'elle explique plus simplement la valeur du système, avec une identité claire, premium et moderne.

La homepage ne doit pas expliquer chaque service en profondeur.
Elle doit :
1. faire comprendre en quelques secondes ce que Solutions 2IA fait ;
2. donner envie de continuer ;
3. montrer que plusieurs outils peuvent travailler ensemble ;
4. orienter vers les pages spécialisées ;
5. rassurer sur le sérieux technique ;
6. convertir vers une prise de contact.

---

# Message principal

Le site ne vend pas "de l'IA".
Il vend des systèmes qui enlèvent du travail manuel.

Le message à faire sentir :

> vos outils, votre site, vos données et vos automatisations peuvent fonctionner ensemble, au lieu de vous faire ressaisir et surveiller partout.

Le langage doit être compréhensible par :
- dirigeant de TPE ;
- PME ;
- responsable métier ;
- personne peu technique ;
- personne plus technique qui veut vérifier derrière.

---

# Structure cible indicative

Ne considère pas cette structure comme figée avant audit.

## 1. Hero
- texte simple à gauche ;
- grande scène animée à droite ;
- CTA principal ;
- secondaire éventuel ;
- preuve / réassurance discrète.

## 2. Grande section démonstrative
Une seule section forte qui montre :
- une demande arrive ;
- elle est comprise ;
- les informations sont récupérées ;
- une action est exécutée ;
- les outils sont mis à jour ;
- l'humain reste en contrôle.

## 3. Les grands problèmes réglés
Quelques situations très simples :
- appels manqués ;
- informations dispersées ;
- ressaisie ;
- suivi client manuel ;
- documents difficiles à retrouver ;
- site qui ne transmet rien.

## 4. Le système Solutions 2IA
Présenter les services comme des briques reliées, sans répéter cinq landing pages.

## 5. Exemple concret / preuve
Conserver une preuve réelle et honnête.
Pas de statistiques marketing inventées.

## 6. Méthode
Très courte.
Comprendre → construire → vérifier → améliorer.

## 7. CTA final

---

# Hero : scène codée et animée

Le hero doit ressembler à une production motion design, mais être codé.

Référence visuelle :
- appareil principal ;
- fenêtres UI flottantes ;
- cartes détachées ;
- données qui circulent ;
- profondeur 2.5D ;
- transitions propres ;
- composants réalistes.

Ne pas chercher à faire une "vraie 3D" juste pour impressionner.

Préférer :
- React ;
- CSS transforms ;
- SVG ;
- Motion ;
- perspective ;
- translateZ ;
- masques ;
- gradients ;
- ombres ;
- animations transform / opacity.

N'ajouter Three.js / WebGL que si tu peux démontrer un bénéfice réel impossible à obtenir proprement avec l'existant.

---

# Séquence narrative du hero

Conçois une boucle de 15 à 25 secondes maximum.

Exemple de narration :

### Etat 0
Un laptop / dashboard central calme.

### Etat 1 - Demande
Un téléphone ou une carte "appel entrant" entre.
Exemple :
`Nouveau appel · Demande de rendez-vous`

### Etat 2 - Compréhension
Une onde / carte détachée :
`Besoin détecté · Rendez-vous`

### Etat 3 - Connaissance
Une carte "Documents / Mémoire entreprise" se connecte.
Exemple :
`Horaires · services · tarifs · procédures`

### Etat 4 - Action
Le CRM et le calendrier apparaissent.
Exemples :
`Client créé`
`Rendez-vous 14:30`
`Résumé enregistré`

### Etat 5 - Résultat
Dashboard final :
- appel traité ;
- client enregistré ;
- rendez-vous confirmé ;
- action tracée.

Puis reset propre.

---

# Règles de motion

Le mouvement doit raconter quelque chose.

Chaque animation doit avoir une fonction :
- entrée ;
- relation ;
- transmission ;
- changement d'état ;
- confirmation ;
- sortie.

Eviter :
- objets qui flottent sans raison ;
- glow permanent ;
- particules gratuites ;
- rotation 3D excessive ;
- boucle hypnotique ;
- tout qui bouge en même temps.

Le regard du visiteur doit toujours savoir où regarder.

---

# Mobile

Le mobile ne doit pas être une version compressée du desktop.

Créer une version dédiée :
- moins d'objets ;
- 3 à 4 étapes maximum ;
- lecture verticale ;
- pas de micro texte illisible ;
- pas de scène lourde ;
- poster / version statique si nécessaire.

---

# Accessibilité et performance

Respecter l'existant :
- `prefers-reduced-motion` ;
- tiers `full / reduced / minimal` ;
- animations uniquement transform / opacity ;
- ne pas casser le LCP ;
- lazy loader des scènes lourdes ;
- aucune dépendance lourde sans justification.

Le hero doit afficher son texte immédiatement.
La scène ne doit jamais bloquer le contenu principal.
