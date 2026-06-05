---
description: Pipeline complet de refonte d'une page (audit → propositions → impl → assets → QA)
argument-hint: <route> (ex: /agents-ia)
allowed-tools: Task, Read, Bash
---

# Refonte de la page : $1

Pipeline en 6 étapes pour la route **$1**. Chaque étape passe à un sous-agent dédié pour préserver le contexte principal.

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

## 5. Assets visuels (optionnel)
Si la page mérite un nouveau hero asset, lance `visual-asset-generator`.

## 6. QA finale
Lance en parallèle :
- `performance-auditor` sur la route $1
- `a11y-reviewer` sur la route $1

Synthèse finale en 5 bullets : ce qui a changé, gain bundle, gain Lighthouse, blockers restants, suite suggérée.

---

**Démarre maintenant l'étape 1.**
