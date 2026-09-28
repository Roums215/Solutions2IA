# Chantier · refonte des pages de service (septembre 2026)

Mis à jour le 29 septembre 2026.

## Ce qui a changé

Quatre pages de service ont été refondues sur le modèle de la nouvelle page d'accueil
(film du hero, sections moins nombreuses, une idée forte par section, un seul CTA) :

| Page | Hero | Sections | Fiche |
|---|---|---|---|
| `/sites-web` | `WebHeroScene` (clair, 2.5D) | sources qui convergent, coût des situations, niveaux de site, fondations | `docs/pages/sites-web.md` |
| `/applications` | `AppHeroScene` | problèmes, principe, bénéfices, étude de cas, secteurs, méthode | `docs/pages/applications.md` |
| `/agents-ia` (V3) | `AiHeroScene` : iPhone + dossier actif, 6 moments | rôle par besoin, calculateur, contrôle, pilote | `docs/pages/agents-ia.md` |
| `/automatisation` (V3) | `AutoHeroScene` : 4 automatisations autour d'un moteur de règles | quotidien, cas réel, outils reliés, métiers, facture électronique, méthode | `docs/pages/automatisation.md` |

Ajouts partagés, tous opt-in (aucune autre page ne change) :

- `SectionFluidBackdrop` : variantes `web*`, `apps*`, `ai*`, `flow*` ;
- `PageAtmosphere` : preset `flow` (seulement `/automatisation`) ; le preset `ai` perd ses croix ;
- `CTABand` : prop `compact` ;
- `headerSurface` (`useLightHeaderZone`) : l'en-tête reste lisible sur les sections claires ;
- `app/layout.tsx` : `suppressHydrationWarning` sur `<html>` (attribut `data-perf` posé avant l'hydratation) ;
- `next.config.ts` : cache immuable sur `/_next/static` en production seulement.

Tests Playwright : `tests/agents-ia.spec.ts` (8) et `tests/automatisation.spec.ts` (7).
Captures et vidéos : `review/<page>/` avec leur script `.capture.cjs`, hors dépôt.

## Reste à faire

- Confirmer commercialement : pilote de 30 jours satisfait ou remboursé, données restituées,
  hébergement UE (`/agents-ia`) ; « Désactivable à tout moment » (`/automatisation`).
- Supprimer les composants débranchés une fois les pages validées en ligne (liste dans chaque
  fiche et en tête de chaque `<Nom>Page.tsx`).
- `/automatisation/[secteur]` et `/applications/[secteur]` gardent l'ancien design.
- Le hero de `/agents-ia` sur téléphone commence sous la ligne de flottaison.
