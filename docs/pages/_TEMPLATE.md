# Brief page — `/<route>`  ·  *(rôle court)*

> Fichier lu **en premier** par `/refonte-page <route>` (avant tout audit). Donne à l'agent
> la précision page-spécifique que les règles génériques (`CLAUDE.md`, `docs/anatomie-page.md`,
> `docs/contenu-copy.md`) ne donnent pas.
> Dupliquer ce template par page, le remplir, le placer dans `docs/pages/<route>.md`.

## 1. Rôle unique (1 phrase)
Pourquoi cette page existe, et surtout **ce qu'elle ne fait PAS** (anti-répétition).

## 2. Promesse & double lecture
- **Niveau 1 (PME)** : 1 phrase bénéfice, concrète, zéro jargon.
- **Niveau 2 (grand compte)** : ce qu'on déroule en « détails techniques » (`accordion`).

## 3. Mécanique signature
L'animation/schéma UNIQUE de la page (ce qui fait que cette page ne ressemble à aucune autre).
Décrire : le concept, les états, ce que le mouvement *raconte*.

## 4. Sections (ordre + composants réels)
Renvoi à `STRUCTURE.md`. Lister l'ordre des sections et le composant de chaque
(existant vs à créer). Shell constant : `PageHero` → … → `CTABand`.

## 5. Desktop / iPhone  *(obligatoire)*
- **Desktop** : disposition de la mécanique signature.
- **iPhone** : comment elle s'adapte (ex. pipeline horizontal → vertical empilé), tailles de
  police, zones tactiles ≥ 44px, ce qu'on simplifie/coupe sur petit écran.

## 6. Recherche & inspiration  *(cibles précises pour l'agent)*
- **Inspiration à fetch** (firecrawl/WebFetch) : 2-3 URLs concrètes + ce qu'on en extrait
  (le *pattern*, pas le style — on réécrit avec nos tokens).
- **Vérifs à jour** (context7) : libs/versions à confirmer (`use context7`).
- **Justesse métier** : faits à vérifier sur le web avant d'écrire (noms produits, chiffres).

## 7. Copy
Renvoi à `copy-writer-fr`. Promesse principale, mots-clés, ton, formules à bannir.

## 8. Contraintes techniques
Renvoi à `CLAUDE.md` + `docs/anatomie-page.md`. Rappel ciblé : tokens only, transform/opacity/clip-path,
`reduced-motion`, `whileInView once`, lazy si lourd, 0 `<img>`.

## 9. Definition of Done  *(checklist auditeurs)*
- [ ] `tokens-guardian` : 0 hex hardcodé hors SVG justifié
- [ ] `a11y-reviewer` : reduced-motion + ARIA + hiérarchie titres OK
- [ ] `performance-auditor` : 60fps desktop **et** mobile, pas de chunk hors budget
- [ ] Rendu vérifié **desktop + iPhone**
- [ ] Mécanique signature distincte des autres pages (pas de composant d'une autre page recyclé)

## 10. NE PAS toucher
Logo, header, preset global, composants partagés hors scope.
