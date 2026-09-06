# Archives

Documents de la refonte de **juin 2026**. Ils **ne font plus loi** : ils expliquent
*pourquoi* le site est ce qu'il est, pas *comment* travailler aujourd'hui.

Pour les règles en vigueur : [`../README.md`](../README.md) et [`../../CLAUDE.md`](../../CLAUDE.md).

| Document | Ce que c'était |
|---|---|
| [`2026-06-brief-refonte.md`](2026-06-brief-refonte.md) | le brief donné à l'agent pour lancer l'audit et la refonte |
| [`2026-06-journal-refonte.md`](2026-06-journal-refonte.md) | le récapitulatif de la session : perf, contenu réécrit au « je », design, favicon, formulaire Resend, décisions client |
| [`2026-06-playbook-design.md`](2026-06-playbook-design.md) | le langage visuel et pédagogique posé avant de coder (explication animée, double lecture, page par page). ⚠️ décrit aussi des pages `/adoption`, `/formation`, `/realisations` qui **n'ont jamais été créées** |
| [`audit-phase-0/`](audit-phase-0/) | les 4 audits de cartographie + le plan de refonte + le glossaire jargon → français simple |

## Ce qu'il reste d'utile dedans

- **`audit-phase-0/PLAN.md` §Règles de contenu** : la source des règles d'écriture,
  reprises et à jour dans [`../contenu-copy.md`](../contenu-copy.md).
- **`audit-phase-0/GLOSSAIRE.md`** : le tableau jargon → mot simple, dont
  `lib/content/glossaire.ts` est l'implémentation.
- **`2026-06-journal-refonte.md` §7** : les décisions validées par le client, qui font
  toujours référence (freelance solo, zéro preuve inventée, « je » et pas « nous »).

## Ce qui y est périmé

- La page `/studio-visuel` : supprimée, redirection 308 vers `/services`.
- Les pages `/adoption`, `/formation`, `/realisations` du playbook : jamais créées,
  hors périmètre.
- Les chiffres de performance « avant » : le chantier a été mené, voir
  [`../performance.md`](../performance.md).
- Les métadonnées manquantes listées dans `audit-phase-0/a11y-seo.md` : toutes posées depuis.
