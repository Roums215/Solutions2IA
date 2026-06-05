---
description: Audit complet pré-PR (tokens, perf, a11y) en parallèle
allowed-tools: Task, Bash
---

# Audit pré-PR

Lance les 4 auditeurs read-only en parallèle :

1. `site-auditor` — scope : fichiers modifiés (utiliser `git diff --name-only HEAD` puis filtrer `*.tsx`)
2. `tokens-guardian` — même scope
3. `performance-auditor` — full build + Lighthouse sur les routes affectées
4. `a11y-reviewer` — même scope que site-auditor

Une fois les 4 rapports reçus, **fusionne en un seul rapport de synthèse** :

```markdown
# Audit pré-PR — <date>

## Résumé exécutif
- P0 totaux : N (bloquants merge)
- P1 totaux : N
- Lighthouse delta : avant → après
- Bundle delta : avant → après

## P0 (à corriger avant merge)
[Liste consolidée]

## P1 (à corriger dans cette PR si possible)
[Liste consolidée]

## P2 (backlog)
[Liste consolidée]

## Décision recommandée
✅ Merge OK / ⚠️ Corriger P0 d'abord / ❌ Refonte nécessaire
```

Pas de modification de code. Lance immédiatement.
