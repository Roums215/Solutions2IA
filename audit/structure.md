# Audit STRUCTURE/CONTENU — Phase 0 (2026-06-12)

> ⚠️ Recadrage client (post-audit, prime sur tout) : freelance SOLO en démarrage, ZÉRO client.
> Tout « nous », toute preuve/stat inventée, tout témoignage implicite est à supprimer.
> Réécriture au « je », ton sobre et pro, langage simple PME (voir /audit/PLAN.md §Règles de contenu).

## Stats inventées (interdites — à supprimer partout)
- « 73 % temps économisé » ×3 : app/page.tsx:89, services/ServicesPage.tsx:49, automatisation/AutomatisationPage.tsx:49
- « ×3 conversion », « 98/100 Lighthouse » non tracé : app/page.tsx:90-91
- « +200 % mémorabilité », « +150 % », « ×10 », « +300 % » : studio-visuel (page supprimée) + services:22-67 (« +89 % engagement »)
- Stats tierces non sourçables dans lib/content/faqData.ts : Techment 70 % (l.126), Seekr 88/95 % (l.150, l.76), Perplexity 82 % (l.144), WRITER 29/44 % (l.64)

## Double lecture (Niveau 1 bénéfice / Niveau 2 technique déroulant)
- ✓ Présente : /faq (details natifs — LE modèle), /contact (FAQ), /rag (wizard interactif), /sites-web (WebPainBusiness toggle)
- ✗ Absente : home (« approche » = liste), /services (6 cards), /agents-ia (6 capacités), /automatisation (4 cas d'usage)

## Légendes de schémas (« 1 ligne : ce que ça fait pour vous »)
- ✓ RagMemoryFlow, WebOpportunityFlow
- À ajouter/vérifier : AutomationPipeline, AgentAnatomyDiagram, OneAgentManyNeedsPipeline, AppDigitizationPipeline

## Par page (constats majeurs)
| Page | Constats |
|---|---|
| / | Pas de schéma animé signature ; stats inventées ; enchaînement ProfileMatrix→Constellation→Flows flou ; double lecture absente |
| /services | Zéro schéma ; stats ; triple énumération (6 services + 4 étapes + 4 approche) sans fil |
| /sites-web | ✓ La meilleure : hero clair, 9 stations légendées, double lecture, nav interne |
| /applications | Pipeline OK mais tooltips hover non accessibles tactile/clavier |
| /agents-ia | Schémas présents, légendes à vérifier ; capacités sans double lecture |
| /automatisation | Pipeline signature à légender ; « 73 % » ; outils génériques vs réels |
| /rag | 16 sections empilées → regrouper en 4-5 thèmes ; excellent RagMemoryFlow |
| /studio-visuel | SUPPRIMÉE (décision client 2026-06-12) — contenus utiles refondus dans /services et /sites-web |
| /a-propos | « studio digital » → entrepreneur individuel ; réécriture sensible |
| /contact | FAQ details ✓ ; form sans validation/aria |
| /faq | ✓ Modèle du site (details + TOC) |

## Redondances inter-pages
- PremiumFlowPanel 4 étapes ×6 pages avec nomenclatures différentes (Diagnostic/Prototype vs Cadrage/Design/Build/Scale) → harmoniser
- Grille 6 items quasi identique sur 5 pages → varier
- Navigation inter-spécialités inexistante (pas de liens croisés, pas de fil d'ariane)
