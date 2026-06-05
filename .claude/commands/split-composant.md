---
description: Découper un composant lourd (> 250 LOC) en sous-fichiers sans régression
argument-hint: <chemin du composant>
allowed-tools: Task, Read, Bash
---

# Découpage du composant : $1

1. Lance `component-splitter` sur **$1**.
2. Présente le **mapping** et le **plan de découpe** à l'utilisateur. STOP.
3. Après validation, exécute l'implémentation pas à pas.
4. À la fin, lance `performance-auditor` pour mesurer le gain bundle.
5. Lance `site-auditor` pour vérifier qu'aucune régression de pattern n'a été introduite.

Démarre l'étape 1 maintenant.
