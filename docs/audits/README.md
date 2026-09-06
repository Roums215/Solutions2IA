# Audits

États des lieux datés du site. Le plus récent fait référence.

| Date | Rapport | Périmètre |
|---|---|---|
| 6 septembre 2026 | [**`2026-09-06-conversion/`**](2026-09-06-conversion/) | **Audit de conversion : les 14 pages notées sur 100 en contenu, design et conversion.** Un dossier par page, grille de notation, benchmark marché, schémas et plan d'action. |
| 6 septembre 2026 | [`2026-09-06-audit-site.md`](2026-09-06-audit-site.md) | SEO, GEO, contenu, design, accessibilité, performance + ménage effectué et plan d'action |

Les audits de cartographie de juin 2026 (perf, structure, mobile, a11y/SEO) sont dans
[`../archives/audit-phase-0/`](../archives/audit-phase-0/).

## Relancer un audit

```
/audit-pr                    # 4 auditeurs en parallèle sur les fichiers modifiés
/refonte-page <route>        # pipeline complet sur une page
```

Ou directement les agents lecture seule : `site-auditor`, `tokens-guardian`,
`performance-auditor`, `a11y-reviewer`.
