---
description: Pipeline complet de refonte d'une page (audit → propositions → impl → assets → QA)
argument-hint: <route> (ex: /agents-ia)
allowed-tools: Task, Read, Bash
---

# Refonte de la page : $1

Pipeline pour la route **$1**. Chaque étape passe à un sous-agent dédié pour préserver le contexte principal.

**Avant l'étape 1** : charge le skill `frontend-design` (boucle, direction artistique, interdits), démarre `pnpm dev` (port 4500) et ouvre la route `$1` dans le navigateur. On juge ce que le visiteur voit, pas le code source.

## 1. Audit ciblé (read-only)
Lance `site-auditor` sur la route `$1` uniquement. Récupère le rapport P0/P1/P2.

## 2. Audit design system (read-only)
Lance `tokens-guardian` sur les fichiers concernés par `$1` :
- `app$1/page.tsx`
- `app$1/*Page.tsx`
- Sections importées par cette page

## 3. Propositions (sans coder)
Lance `section-designer` avec la consigne :
> "Lis le rapport ci-dessus. Pour chaque section P0/P1, propose 2-3 variantes plus légères et uniques. NE CODE PAS encore. Reviens avec un tableau de variantes par section."

## 4. Implémentation (après validation utilisateur)
Une fois les variantes choisies, lance `section-designer` pour implémenter, puis `motion-specialist` pour finaliser les animations.

## 5. Cartes et profondeur (optionnel)
Si la refonte touche des cartes ou des grilles, lance `card-designer`.
Si elle touche la scène de hero ou les effets de profondeur, lance `scene-3d-specialist`.

## 6. Vérification dans le navigateur (obligatoire, avant la QA)
Recharge la route `$1` et contrôle **à 1440 px puis à 390 px** : hiérarchie, densité, aucun défilement horizontal, le CTA reste unique, le `h1` s'affiche sans attendre le JS. Puis `npx tsc --noEmit` et `pnpm lint`.

## 7. QA finale
Lance en parallèle :
- `performance-auditor` sur la route $1
- `a11y-reviewer` sur la route $1
- `conversion-auditor` sur la route $1 (note avant / après)
- `tokens-guardian` sur les fichiers modifiés

Synthèse finale en 5 bullets : ce qui a changé, gain bundle, gain Lighthouse, note de conversion avant/après, blockers restants.

Puis **STOP** : pas de correction spontanée sur une autre page, pas de refonte élargie. Ce qui a été repéré ailleurs se liste en une ligne chacun.

---

**Démarre maintenant l'étape 1.**
