# Brief page — `/automatisation`  ·  *supprimer le répétitif*

> Lu en premier par `/refonte-page /automatisation`. Page la plus concrète du site :
> on prouve par un VRAI flux client (JobPhoning → n8n → Axonaut).

## 1. Rôle unique
Vendre l'automatisation des process manuels/répétitifs en **montrant un flux réel qui tourne**.
Ce qu'elle ne fait PAS : ré-expliquer les agents conversationnels (→ `/agents-ia`), ni le RAG
(→ `/rag`). Pas d'Avant/Après `TransformationCard` (réservé nulle part, on l'enlève ici).

## 2. Promesse & double lecture
- **PME** : « Vos appels JobPhoning deviennent des fiches qualifiées dans Axonaut, toutes
  seules, sans ressaisie et sans lead perdu. »
- **Grand compte** (`accordion` « détails techniques ») : webhook JobPhoning → n8n
  (normalisation tél/email, déduplication, enrichissement SIREN/SIRET via API entreprise,
  règles de décision) → API REST Axonaut (contact + entreprise + opportunité, option devis) →
  notification + journalisation. Idempotence, reprises, hébergement UE.

## 3. Mécanique signature — `AutomationPipeline`
Pipeline animé **JobPhoning → n8n → Axonaut**, section phare juste sous le hero.
- Nœuds-outils en chaîne (badges **neutres**, pas tokens 2IA) :
  `[JobPhoning · appel qualifié]` → `[n8n · Nettoyage/dédup]` → `[n8n · Enrichissement SIREN]`
  → `[n8n · Décision]` → `[Axonaut · CRM]`, + branche `à rappeler` qui reboucle vers JobPhoning,
  + sortie `notification commercial`.
- Un **jeton « lead »** voyage le long de la chaîne ; chaque nœud passe `pending → active → done`
  à son passage ; flux lumineux = sens de la donnée (réutiliser le pattern `CircuitLine`/pulse
  de `AutomationScene`). Boucle douce = « ça tourne 24/7 ».
- Labels = texte **éditable** (l'utilisateur calera ses vrais flux : déclencheur réel, statuts).

## 4. Sections (ordre + composants)
1. `PageHero` + visual `AutomationScene` *(existant, ambiance)*
2. ★ `AutomationPipeline` *(NEUF)* + `accordion` « détails techniques » (double lecture)
3. Cas d'usage — `SectionHeading` + grille `SpotlightCard` (leads d'appels, relances au bon
   moment, fin de ressaisie CRM, reporting auto)
4. Outils branchés — `SectionHeading` + rangée de `badge` neutres : JobPhoning, Axonaut,
   téléphonie, API entreprise (SIREN), + « vos outils »
5. `CTABand` (« Automatisons votre premier flux »)
- ❌ Supprimer : bloc `TransformationCard` + grille générique (Slack/HubSpot/Stripe/Zapier/
  Notion/PostgreSQL) + stats inventées (1 247 tâches/h, 0,02 %, 97 %…).

## 5. Desktop / iPhone
- **Desktop** : pipeline **horizontal** gauche→droite, branche de rebouclage au-dessus/dessous,
  jeton qui glisse, nœuds espacés.
- **iPhone** : pipeline **vertical empilé** (haut→bas), jeton qui descend, branche en retour
  visuel compact ; labels lisibles, zones tactiles ≥ 44px ; `accordion` plié par défaut.
- `reduced-motion` : pipeline en **état final statique** (tous nœuds `done`, flux fixes, pas de jeton).

## 6. Recherche & inspiration
- **Fetch (firecrawl/WebFetch)** pour le *pattern* de visualisation de flux à nœuds (on réécrit
  avec NOS tokens, on ne copie pas le style) :
  - `https://n8n.io` (canvas node-based, état des nœuds)
  - `https://www.make.com` (scénarios animés, flux circulants)
  - `https://zapier.com` (lisibilité « déclencheur → action » grand public)
- **Vérifs justesse métier (web)** déjà faites : JobPhoning = téléprospection/call-center FR
  (RDV qualifiés, fiches prospect) ; Axonaut = CRM/ERP FR, **API REST ouverte** (contacts,
  devis, factures). → le flux est réel. Re-vérifier seulement si on cite un chiffre.
- **context7** : `use context7` pour `motion` v12 (API `animate`, `useMotionValue`) avant d'écrire.

## 7. Copy  *(via copy-writer-fr)*
Promesse : fin de la ressaisie entre appels et CRM. Mots-clés : automatisation, n8n, CRM,
zéro double saisie, RDV qualifiés. Bannir : « boostez », « révolutionnaire », faux %.
RGPD : « hébergé en UE » plutôt que « 100 % sécurisé ».

## 8. Contraintes techniques
`CLAUDE.md` + `PLAYBOOK.md`. Pipeline en `motion/react` (PAS de GSAP), transform/opacity/
clip-path only, `whileInView once` + `IntersectionObserver` (pause hors écran), tokens only,
0 `<img>`. Seule la route `/automatisation` est touchée.

## 9. Definition of Done
- [ ] `tokens-guardian` OK · [ ] `a11y-reviewer` (reduced-motion + ARIA badges) OK
- [ ] `performance-auditor` : 60fps desktop + iPhone, pas de jank sur le jeton
- [ ] Rendu vérifié **desktop ET iPhone** (pipeline vertical lisible)
- [ ] Plus aucun `TransformationCard` ni stat inventée sur la page
- [ ] Labels d'étapes ajustés avec les vrais flux de l'utilisateur

## 10. NE PAS toucher
Logo, header, `AutomationScene` (on la garde en ambiance), les autres routes.

---
### À confirmer avec l'utilisateur (cale les labels)
Déclencheur réel (webhook JobPhoning ?) · statuts/branches exacts · ce qu'on écrit dans Axonaut
(contact ? opportunité ? devis ?) · enrichissement SIREN déjà en place ou à montrer ? ·
brique téléphonie = JobPhoning seule ou autre ?
