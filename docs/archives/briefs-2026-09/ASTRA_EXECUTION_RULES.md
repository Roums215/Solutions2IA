# ASTRA_EXECUTION_RULES.md

# Mode de travail

Tu travailles comme un lead frontend / product designer senior.

Tu n'es pas autorisé à agrandir le scope de toi-même.

---

# Avant de modifier un fichier

Toujours :
1. lire le fichier ;
2. identifier ses usages ;
3. vérifier s'il est partagé ;
4. vérifier les tests ;
5. vérifier les contraintes documentées.

---

# Interdictions

Pendant le lot homepage initial :

- pas de refonte des autres pages ;
- pas de migration de framework ;
- pas de nouvelle architecture globale ;
- pas de changement de routing ;
- pas de remplacement du logo animé ;
- pas de renommage massif ;
- pas de déplacement de dossiers sans nécessité ;
- pas de nouvelle librairie lourde sans validation ;
- pas de Three.js / R3F par défaut ;
- pas de suppression SEO ;
- pas de suppression de JSON-LD ;
- pas de faux témoignage ;
- pas de fausse statistique ;
- pas de mock "client réel" présenté comme preuve réelle.

---

# Documentation

Ne crée pas 15 documents.

Pour le chantier, seulement :
- mettre à jour le document de chantier existant si présent ;
- mettre à jour `docs/pages/accueil.md` lorsque la homepage change ;
- mettre à jour le design system seulement si une vraie règle globale change.

Pas de rapport Markdown gigantesque après chaque action.

---

# Questions

Pose une question lorsque :
- deux directions sont réellement possibles ;
- une décision change le produit ;
- une contrainte business manque ;
- la modification risquerait de casser une signature existante.

Ne demande pas confirmation pour :
- corriger un type ;
- appliquer les tokens ;
- nettoyer une duplication locale évidente ;
- ajouter un test nécessaire.

---

# Lots

Chaque lot doit être petit.

Format attendu :

## Objectif
une phrase

## Fichiers modifiés
liste

## Ce qui change
3 à 8 points maximum

## Ce qui ne change pas
scope explicite

## Validation
- typecheck
- lint
- tests pertinents
- responsive
- performance si concerné

Puis STOP.

---

# Premier lot autorisé après validation

Uniquement :
- navbar / header si nécessaire ;
- hero homepage ;
- scène hero ;
- première grande section narrative sous le hero ;
- composants génériques strictement nécessaires à ces blocs.

Pas plus.

---

# Critère de réussite

Le lot est réussi si :
- le site paraît plus premium ;
- le message est plus simple ;
- le hero raconte quelque chose ;
- la scène ne paraît pas générée automatiquement ;
- les composants sont réutilisables ;
- le logo reste intact ;
- mobile reste propre ;
- LCP ne régresse pas fortement ;
- aucun contenu SEO important n'est perdu ;
- aucun nouveau scope n'a été créé.
