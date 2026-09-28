---
name: frontend-design
description: Boucle canonique pour toute modification visible du site Solutions 2IA (section, hero, carte, CTA, texte affiché, mise en page, animation). Regarder la page réelle dans le navigateur, faire un diff minimal, vérifier en 1440 et 390 px, puis s'arrêter. À charger avant de toucher au design, y compris pour « améliore cette section » ou « rends ça plus accrocheur ».
---

# Design frontend · Solutions 2IA

Ce skill existe pour une raison : sans lui, une demande de design part en refonte.
« Pendant que j'y étais, j'ai modernisé le shell, remplacé 14 composants et migré le
design system » est exactement ce qu'on ne veut pas.

Objectif du site : **donner envie à un dirigeant de PME d'écrire un message.**
Pas d'impressionner. La direction complète est dans
`references/direction-artistique.md`, à lire avant toute proposition visuelle ou de texte.

---

## La boucle, dans cet ordre

```
1.  Comprendre la demande, et seulement elle
2.  Localiser le composant EXACT (voir references/boucle-navigateur.md §2)
3.  Regarder la page réelle dans le navigateur, pas le code seul
4.  Lire le design system existant avant de proposer
5.  Proposer 2 ou 3 variantes en 3 lignes chacune  →  STOP, attendre le choix
6.  Implémenter en DIFF MINIMAL
7.  Recharger, vérifier à 1440 px
8.  Vérifier à 390 px
9.  Playwright seulement s'il y a une interaction à tester
10. npx tsc --noEmit + pnpm lint
11. tokens-guardian (et a11y-reviewer si la structure a bougé)
12. STOP. Résumer en 5 lignes. Ne rien faire d'autre.
```

L'étape 5 n'est pas facultative : sur ce projet, le choix de direction appartient au client.
L'étape 12 non plus.

---

## Les quatre règles de contrôle

1. **Un seul sujet.** Ce qui est demandé, rien d'autre. Un problème repéré à côté se
   signale en fin de réponse, il ne se corrige pas dans la foulée.
2. **Diff minimal.** `Edit` plutôt que `Write`. On ne réécrit un fichier entier que si la
   demande est « refais cette section ». L'API publique (props, exports) reste stable.
3. **Zéro nouvelle dépendance.** Pas de GSAP, Three.js, Lottie, tsparticles, Lenis,
   framer-motion. Le site tient son LCP à 1,8 s parce qu'elles ne sont pas là.
   `motion` v12 est la seule bibliothèque d'animation.
4. **Zéro déplacement de fichier, zéro nouvelle abstraction** non demandée. Pas de
   documentation spontanée : `docs/` se met à jour quand le client le demande ou quand
   une règle change.

---

## Avant de proposer, lire

| Fichier | Ce qu'on y trouve |
|---|---|
| `references/direction-artistique.md` | ce qui accroche, le dosage technique, la signature visuelle, les interdits |
| `references/boucle-navigateur.md` | démarrer le site, retrouver un composant depuis le DOM, les deux largeurs |
| `CLAUDE.md` | règles du dépôt, tokens, routes et presets |
| `docs/anatomie-page.md` | l'ordre imposé des sections, le CTA unique |
| `app/globals.css` (`@theme`) | la seule source de vérité des couleurs et espacements |
| le composant visé | l'existant, avant de le juger |

---

## La direction, en huit lignes

- Une promesse tournée vers le visiteur, pas vers le prestataire.
- Un chiffre qui vient de lui (« 6 h par semaine à 35 € = 10 920 € par an »), jamais un
  chiffre inventé sur un client.
- Deux ou trois exemples concrets et situés par page, pas un catalogue.
- Le bénéfice en français courant au premier niveau, la technique repliée au second.
- Une seule idée forte par écran, du blanc, un contraste de rythme entre les sections.
- La profondeur (`translateZ`, ombres, plans) plutôt que la décoration.
- Le mouvement explique quelque chose, sinon il se coupe.
- Un seul CTA, avec sa réassurance juste dessous.

---

## Quel agent pour quoi

Aucun ne part en autonomie : chacun rend sa proposition, le choix revient au client.

| Besoin | Agent |
|---|---|
| créer ou refondre une section | `section-designer` (propose 2-3 variantes d'abord) |
| carte, tuile, panneau, grille | `card-designer` |
| animation, reveal, flux SVG, parallax | `motion-specialist` |
| profondeur, scène de hero | `scene-3d-specialist` |
| tout texte visible | `copy-writer-fr` |
| « est-ce que ça ramène un client ? » | `conversion-auditor` (note sur 100) |
| validation design system avant PR | `tokens-guardian` |
| hiérarchie des titres, ARIA, focus | `a11y-reviewer` |

Deux agents maximum par demande. Si trois agents semblent nécessaires, c'est que la
demande n'a pas été découpée.

---

## Ce qui casse le site si on y touche

- **Le LCP** : `PageHero` et `HeroSection` peignent leur `h1` en CSS pur (`.hero-enter`)
  avant l'hydratation, `PageTransition` a `initial={false}`. Une animation JS depuis
  `opacity: 0` fait passer le LCP de 1,8 s à environ 8 s.
- **`pnpm build` pendant que `pnpm dev` tourne** : le build écrase le `.next` du serveur
  de dev et casse le site en local.
- **Le fond réactif à la souris** : retiré à la demande du client, ne pas réintroduire.
- **Le logo** : jamais sans demande explicite.
- **Un schéma pédagogique animé** : refait en mieux si besoin, jamais supprimé sèchement.

---

## Checklist de fin

- [ ] la demande, et seulement la demande
- [ ] vu à 1440 px et à 390 px, sans défilement horizontal
- [ ] tokens uniquement, aucune couleur en dur
- [ ] un seul `h1`, hiérarchie des titres continue
- [ ] un seul CTA, réassurance dessous
- [ ] aucun tiret cadratin dans le texte visible, aucun « nous », aucun chiffre inventé
- [ ] `npx tsc --noEmit` et `pnpm lint` passent
- [ ] résumé en 5 lignes, puis STOP
