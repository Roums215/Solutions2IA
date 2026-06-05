# Brief v2 — Pipelines métier sur `/automatisation` (post-infra)

> À déposer dans `docs/pages/automatisation-secteurs.md` (remplace la v1).
> L'infrastructure est **livrée**. Ce brief pilote l'ajout des secteurs restants.
> Référence : `PLAYBOOK.md` + `ROADMAP.md` §1.

---

## 0. Rôle & promesse

Le pipeline maître `JobPhoning → n8n → Axonaut` (`/automatisation`) prouve **comment ça
circule** (preuve technique). Les sous-pages métier ajoutent la **preuve business** :
« voilà exactement ce qu'on automatise dans VOTRE métier ».

**Cadrage honnête (PLAYBOOK §1.3) :** ces pipelines sont des **capacités**, PAS des cas
clients. 0 stat inventée. La stack = des **exemples d'outils**, jamais une preuve de
mission passée (ça vit sur `/realisations`). RGPD = « hébergé en UE ».

---

## 1. État actuel — ce qui est DÉJÀ livré (ne pas recréer)

| Composant | Statut | Rôle |
|-----------|--------|------|
| `components/sections/automation/sectorsData.tsx` | ✅ livré | types `Sector` + `SectorDetails` + `SECTORS` (immobilier rempli) |
| `components/sections/automation/SectorCard.tsx` | ✅ livré | carte variante A, aperçu statique, hover cascade desktop only |
| `components/sections/automation/SectorGrid.tsx` | ✅ livré | grille responsive, 1 carte active à la fois |
| `app/automatisation/[secteur]/page.tsx` | ✅ livré | route dynamique SSG (`generateStaticParams` + `generateMetadata` async Next 15) |
| `app/automatisation/[secteur]/SecteurPage.tsx` | ✅ livré | rend `<AutomationPipeline nodes edges details />` |
| `components/sections/automation/AutomationPipeline.tsx` | ✅ **généralisé** | layout calculé (positions dérivées de l'index), accordion data-driven via prop `details`, branches optionnelles |

**Conséquence : ajouter un secteur ne crée AUCUN fichier ni composant.**

---

## 2. Le modèle — ajouter un secteur = UNE entrée de données

Un nouveau secteur = **une entrée dans le tableau `SECTORS`** de `sectorsData.tsx`.
La route dynamique, la grille, le SEO et le rendu sont automatiques.

Champs à remplir :
```ts
{
  slug, name, icon,            // identité
  problem, benefit,            // copy double lecture (1 phrase, 0 % inventé)
  nodes, edges,                // le pipeline du secteur
  details: { trigger, processing, write, reliability },  // accordion
  stack,                       // ToolBadge (exemples d'outils)
  seoTitle, seoDescription,    // SEO distinct
}
```

---

## 3. Capacités du pipeline généralisé (ce que la donnée peut exprimer)

`AutomationPipeline` accepte, sans toucher au code :
- **4 à 6 nœuds** sur le rail principal (espacement calculé, largeur de carte homogène).
- **1 branche callback optionnelle** (ex. « à rappeler », « relance client ») — reboucle.
- **1 sortie notify optionnelle** (ex. « SMS commercial », « collaborateur notifié »).
- L'accordion « Détails techniques » alimenté par `details` (4 lignes).

**Limite connue (TODO futur) :** pas de topologie en **fan-in** (plusieurs entrées qui
convergent) ni de branche parallèle multiple. Les secteurs « multi-sources » se
représentent par **un nœud d'entrée multi-canal** (les canaux en sublabel/badges), pas
par un fan-in visuel. Si un secteur l'exige vraiment → extension composant séparée
(section-designer + motion-specialist), à décider explicitement.

---

## 4. Principes de design par secteur (à respecter)

1. **Même mécanique, données différentes.** On réutilise le pipeline signature pour TOUS
   les secteurs. La différenciation passe par le **contenu** (labels, copy, branches), pas
   par une animation sur-mesure. Pas de « PDF qui tombent », pas de tooltips animés par
   secteur — ça casse la signature unique (ROADMAP §1.1) et la perf iPhone.
2. **Pas de section Avant/Après.** Le `TransformationCard` est réservé à `/realisations`
   (ROADMAP §1.1). Le contraste « avant le chaos / après le calme » vit dans la **copy**
   (hero + accordion), pas dans une carte.
3. **Concret métier, jamais générique.** Bannir « IA intelligente », « automatisation
   avancée », « optimisation ». Préférer « relance automatique des pièces manquantes »,
   « extraction TVA », « détection des doublons ».
4. **Double lecture** (ROADMAP §1.2) : `problem`/`benefit` = PME sans jargon ; accordion
   `details` = version technique grand compte.

---

## 5. Contraintes perf & responsive (inchangées)

- **Grille** : aperçus **statiques** (0 `setInterval`), hover cascade desktop only
  (`@media (hover: hover) and (pointer: fine)`), 1 carte active à la fois.
- **Sous-page** : 1 seul pipeline animé à l'écran → animation complète OK (`useInView`,
  `usePerformanceMode`).
- **Mobile/iPhone** : grille empilée statique, tap-targets ≥ 44 px, carte = `<Link>` entier.
- **Tokens/motion** : `motion/react`, `transform`/`opacity`/`clip-path` only, cyan/indigo
  (`var(--color-*)`), badges outils neutres, 0 hex hard-codé hors badges.

---

## 6. Le top 10 — état & slugs

| # | slug | Métier | Statut |
|---|------|--------|--------|
| 1 | `immobilier` | Immobilier | ✅ livré |
| 2 | `cabinet-comptable` | Cabinet comptable | 🔧 **en cours** |
| 3 | `ecommerce` | E-commerce / SAV | ⏭️ |
| 4 | `rh` | Recrutement / RH | ⏭️ |
| 5 | `medical` | Médical / clinique | ⏭️ |
| 6 | `restauration` | Restaurant / Hôtel | ⏭️ |
| 7 | `btp` | BTP / Artisans | ⏭️ |
| 8 | `industrie` | Industrie / PME tech | ⏭️ |
| 9 | `juridique` | Avocats / juridique | ⏭️ (nourrit `/rag`) |
| 10 | `formation` | Centre de formation | ⏭️ (nourrit `/formation`) |

> Note : `ecommerce` (escalade humaine) et les secteurs à sortie conditionnelle valideront
> la branche optionnelle ; surveiller s'ils tiennent dans les capacités §3.

---

## 7. Recette par secteur (workflow allégé)

L'infra existe → workflow court, **pas** de section-designer ni motion-specialist sauf
nouvelle topologie (§3).

1. **copy-writer-fr** (principal) — remplir l'entrée du secteur dans `sectorsData.tsx` :
   `problem`, `benefit`, `details`, `stack`, `seoTitle`/`seoDescription`, labels des nœuds.
   Ton premium, concret métier, principes §4.
2. **motion-specialist** — UNIQUEMENT si le secteur réclame une topologie hors §3.
3. **section-designer** — UNIQUEMENT si on décide une nouvelle forme visuelle.
4. **/audit-pr** — tokens-guardian + a11y-reviewer + performance-auditor, en fin de secteur
   (ou par lot de 2-3 secteurs).

QA manuelle : `/automatisation/<slug>` desktop + iPhone 390 px, espacement régulier (layout
calculé), accordion spécifique au secteur, `pnpm build` génère la page SSG.

---

## 8. Spec du prochain secteur — `cabinet-comptable`

**Angle** : la charge mentale administrative qui disparaît (« le cabinet ne court plus
après les documents »).

**Pipeline (4 nœuds main + branches) :**
```
[Sources · email/Drive/WhatsApp] → [OCR + IA · extraction] → [Contrôle · doublons + pièce manquante] → [Export · Pennylane/Sage]
   branche callback : "Relance client"  (depuis Contrôle, si pièce manquante)
   sortie notify     : "Collaborateur notifié"
```
- Le « multi-sources » = le **sublabel multi-canal** du 1er nœud (pas un fan-in §3).

**`details` (cible, copy-writer-fr peaufine le ton) :**
- `trigger` — « Déclencheur » : emails, dossiers partagés et uploads clients surveillés
  automatiquement.
- `processing` — « Qualification IA » : l'IA détecte le type de document et extrait
  montant, TVA, fournisseur et date.
- `write` — « Écriture comptable » : export vers Pennylane, Sage, Quadra ou outil interne.
- `reliability` — « Fiabilité » : doublons ignorés, relance automatique si pièce manquante,
  journalisation complète. Hébergé en UE.

**`stack`** : Gmail · Google Drive · OCR · Claude · n8n · Pennylane (exemples).

**`problem`** (cible) : pièces dispersées sur plusieurs canaux, tri manuel, relances
oubliées, ressaisie.
**`benefit`** (cible) : documents centralisés, extraction et classement automatiques,
relances déclenchées sans intervention.

**À ne pas faire** : pas de PDF animés/tooltips bespoke (§4.1), pas de section avant/après
(§4.2).
# §8bis — Specs des 8 secteurs restants (grounded)

> À coller dans `docs/pages/automatisation-secteurs.md`, après le §8 (cabinet-comptable).
> Mêmes principes (§4), même moteur (§3), même recette (§7). Chaque secteur = **une entrée
> `SECTORS`**. Aucun nouveau composant. copy-writer-fr finalise le ton ; les `activeStatus`,
> labels de branche (`edge.label`) et stacks ci-dessous sont des **cibles métier réelles**.

**Convention `tool` (sémantique, non rendu visuellement) :**
`jobphoning` = source d'entrée · `n8n` = traitement IA/workflow · `axonaut` = écriture/terminus
métier · `notify` = sortie notification.

**Cadrage honnête rappel :** outils cités = **exemples** (« compatible avec… »), jamais une
preuve de mission. Human-in-the-loop explicite quand c'est sensible (juridique, médical).

---

## 3. `ecommerce` — E-commerce / SAV

**Angle :** le SAV ne bloque plus l'équipe — les tickets répétitifs se traitent seuls, les cas
complexes remontent à un humain.
**Topologie :** 4 nœuds main + sortie notify = **escalade humaine** (pas de fan-in, pas de
branche conditionnelle moteur — l'escalade EST la sortie notify).

nodes :
- `sources` (jobphoning) — « Tickets SAV » · « email · chat · Instagram » · activeStatus « ticket reçu »
- `analyse` (n8n) — « Analyse IA » · « Claude · intention » · activeStatus « demande comprise »
- `commande` (n8n) — « Commande » · « Shopify » · activeStatus « commande retrouvée »
- `reponse` (axonaut) — « Réponse + CRM » · « Gorgias » · activeStatus « réponse envoyée »
- `notify` (notify) — « Escalade humaine » · « agent » 

edges : sources→analyse→commande→reponse (main) ; reponse→notify `kind:notification` label « cas complexe → agent ».
*(Pas de callback.)*

stack : `["Shopify", "Gorgias", "Zendesk", "Claude", "n8n", "Instagram"]`
problem (cible) : tickets SAV répétitifs, réponses lentes, équipe noyée.
benefit (cible) : réponses instantanées sur les cas simples, escalade vers un humain seulement quand c'est nécessaire.
details : trigger « tickets email/chat/Instagram captés » · processing « l'IA comprend la demande et retrouve la commande Shopify » · write « réponse envoyée et ticket tracé dans le CRM » · reliability « escalade humaine sur les cas complexes, journalisation, hébergé en UE ».
seoTitle (≤65) : « Automatisation SAV e-commerce — réponses Shopify + escalade humaine »
seoDescription (≤160) : tickets SAV traités par IA, commande Shopify retrouvée, réponse automatique et escalade humaine si besoin. Hébergé en UE.

---

## 4. `rh` — Recrutement / RH

**Angle :** les RH ne trient plus 300 CV — parsing, matching et scoring automatiques, réponse à chaque candidat.
**Topologie :** 5 nœuds main + notify (email candidat). Pas de callback.

nodes :
- `sources` (jobphoning) — « CV reçus » · « email · LinkedIn · job board » · activeStatus « CV reçu »
- `parsing` (n8n) — « Parsing IA » · « Claude » · activeStatus « profil extrait »
- `matching` (n8n) — « Matching » · « fiche de poste » · activeStatus « score calculé »
- `ats` (axonaut) — « ATS » · « Teamtailor · Lever » · activeStatus « candidat qualifié »
- `notify` (notify) — « Email candidat » · « accusé + suite »

edges : sources→parsing→matching→ats (main) ; ats→notify `kind:notification` label « réponse envoyée ».

stack : `["LinkedIn", "Teamtailor", "Lever", "Claude", "n8n"]`
problem (cible) : tri manuel de CV, réponses lentes, candidats oubliés, mauvais matching.
benefit (cible) : chaque CV est lu, scoré et positionné, chaque candidat reçoit une réponse.
details : trigger « CV reçus par email, LinkedIn ou job board » · processing « l'IA extrait les compétences et les confronte à la fiche de poste, avec un score » · write « candidat qualifié ajouté à l'ATS » · reliability « réponse envoyée à chaque candidat, traçabilité, hébergé en UE ».
seoTitle : « Automatisation recrutement — parsing CV, scoring et ATS »
seoDescription : CV parsés par IA, matchés à la fiche de poste et scorés, ajout ATS et réponse automatique au candidat. Hébergé en UE.

---

## 5. `medical` — Médical / clinique

**Angle :** le secrétariat n'est plus saturé — l'IA vocale qualifie et prend les RDV, le compte-rendu se rédige seul.
**Topologie :** 4 nœuds main + notify (confirmation SMS). Pas de callback.

nodes :
- `sources` (jobphoning) — « Appel patient » · « standard · IA vocale » · activeStatus « appel reçu »
- `qualif` (n8n) — « Qualification » · « motif · urgence » · activeStatus « motif identifié »
- `rdv` (n8n) — « Prise de RDV » · « agenda · Doctolib » · activeStatus « créneau proposé »
- `dossier` (axonaut) — « Dossier patient » · « RDV confirmé » · activeStatus « dossier à jour »
- `notify` (notify) — « Confirmation » · « SMS patient »

edges : sources→qualif→rdv→dossier (main) ; dossier→notify `kind:notification` label « SMS envoyé ».

stack : `["Doctolib", "IA vocale", "Claude", "agenda", "SMS"]`
problem (cible) : appels répétitifs, prise de RDV chronophage, comptes rendus manuels.
benefit (cible) : les demandes simples sont gérées sans mobiliser le secrétariat, les RDV se calent seuls.
details : trigger « appels entrants pris par l'IA vocale » · processing « qualification du motif et de l'urgence, proposition de créneau » · write « RDV posé et dossier patient mis à jour » · reliability « confirmation SMS, accès tracé, données traitées en UE ».
**Note secteur (sensible) :** données de santé → mentionner « hébergement conforme aux données de santé » SEULEMENT si l'hébergement est réellement HDS ; sinon rester sur « données traitées en UE, accès tracé ». Ne pas sur-promettre. Human-in-the-loop sur tout acte médical.
seoTitle : « Automatisation secrétariat médical — IA vocale, RDV, compte-rendu »
seoDescription : appels qualifiés par IA vocale, RDV posés dans l'agenda, compte-rendu résumé. Données traitées en UE.

---

## 6. `restauration` — Restaurant / Hôtel

**Angle :** répondre plus vite aux réservations et **réduire les no-shows** (1 résa sur 7 non honorée en France).
**Topologie :** 4 nœuds main + notify (confirmation) + callback (relance anti no-show).

nodes :
- `sources` (jobphoning) — « Demandes » · « Insta · site · WhatsApp » · activeStatus « demande reçue »
- `ia` (n8n) — « IA réservation » · « couverts · date · heure » · activeStatus « demande comprise »
- `dispo` (n8n) — « Disponibilité » · « plan de salle » · activeStatus « table trouvée »
- `resa` (axonaut) — « Réservation » · « Zenchef · TheFork » · activeStatus « résa enregistrée »
- `notify` (notify) — « Confirmation » · « SMS client »

edges : sources→ia→dispo→resa (main) ; resa→notify `kind:notification` label « SMS envoyé » ;
resa→sources `kind:callback` label « rappel anti no-show (J-1) ».

stack : `["Zenchef", "TheFork", "Google Calendar", "Claude", "SMS"]`
problem (cible) : demandes répétitives multi-canal, réponses lentes, no-shows qui plombent la marge.
benefit (cible) : chaque demande reçoit une réponse immédiate, les tables se confirment, les no-shows chutent grâce aux rappels.
details : trigger « demandes Insta, site et WhatsApp centralisées » · processing « l'IA comprend la demande et vérifie la disponibilité » · write « réservation posée dans l'agenda » · reliability « confirmation SMS, rappel anti no-show, hébergé en UE ».
seoTitle : « Automatisation réservations restaurant — IA, agenda, anti no-show »
seoDescription : demandes Insta/site/WhatsApp comprises par IA, dispo vérifiée, réservation confirmée par SMS et rappel anti no-show. Hébergé en UE.

---

## 7. `industrie` — Industrie / Maintenance

**Angle :** détecter les problèmes avant la panne — capteurs et rapports analysés, tickets et historique automatiques.
**Topologie :** 4 nœuds main + notify (alerte équipe). Pas de callback.

nodes :
- `sources` (jobphoning) — « Capteurs · rapports » · « IoT · terrain » · activeStatus « donnée reçue »
- `analyse` (n8n) — « Analyse IA » · « détection anomalie » · activeStatus « anomalie détectée »
- `ticket` (n8n) — « Ticket » · « GMAO » · activeStatus « ticket créé »
- `histo` (axonaut) — « Historique » · « centralisé » · activeStatus « tracé »
- `notify` (notify) — « Alerte équipe » · « maintenance »

edges : sources→analyse→ticket→histo (main) ; histo→notify `kind:notification` label « équipe notifiée ».

stack : `["Capteurs IoT", "GMAO", "Mobility Work", "Claude", "Slack"]`
problem (cible) : maintenance réactive, rapports non centralisés, incidents mal suivis.
benefit (cible) : les anomalies sont repérées tôt, chaque incident génère un ticket et reste tracé.
details : trigger « données capteurs et rapports terrain remontées automatiquement » · processing « l'IA détecte les anomalies » · write « ticket de maintenance créé et historisé (GMAO) » · reliability « alerte équipe, historique centralisé, hébergé en UE ».
seoTitle : « Automatisation maintenance industrielle — détection anomalie + GMAO »
seoDescription : capteurs et rapports analysés par IA, anomalies détectées, ticket GMAO créé et équipe alertée. Hébergé en UE.

---

## 8. `btp` — BTP / Artisans

**Angle :** les devis ne prennent plus des heures — demande analysée, pré-devis chiffré, relances automatiques.
**Topologie :** 4 nœuds main + notify (artisan notifié) + callback (relance devis).

nodes :
- `sources` (jobphoning) — « Demandes chantier » · « formulaire · photo » · activeStatus « demande reçue »
- `analyse` (n8n) — « Analyse IA » · « besoin · métré » · activeStatus « besoin qualifié »
- `devis` (n8n) — « Pré-devis » · « bibliothèque de prix » · activeStatus « devis chiffré »
- `crm` (axonaut) — « Devis + CRM » · « Tolteck · Obat » · activeStatus « devis envoyé »
- `notify` (notify) — « Notification » · « artisan »

edges : sources→analyse→devis→crm (main) ; crm→notify `kind:notification` label « artisan notifié » ;
crm→sources `kind:callback` label « relance devis (J+3) ».

stack : `["Tolteck", "Obat", "Batappli", "Claude", "n8n"]`
problem (cible) : devis manuels chronophages, relances oubliées, demandes chantier mal suivies.
benefit (cible) : un pré-devis chiffré part vite, les relances se déclenchent seules.
details : trigger « demandes par formulaire ou photo de chantier » · processing « l'IA analyse le besoin et chiffre un pré-devis sur la bibliothèque de prix » · write « devis créé et suivi dans l'outil (Tolteck, Obat) » · reliability « relance automatique si pas de réponse, hébergé en UE ».
seoTitle : « Automatisation devis BTP — pré-devis IA + relances artisan »
seoDescription : demandes chantier analysées par IA, pré-devis chiffré, suivi CRM et relances automatiques. Compatible Tolteck/Obat. Hébergé en UE.

---

## 9. `juridique` — Avocats / juridique

**Angle :** retrouver l'information vite — classement, RAG sur la jurisprudence interne, brouillon préparé (validé par l'avocat).
**Topologie :** 4 nœuds main + notify (brouillon prêt). Pas de callback. **Nourrit la future page `/rag`.**

nodes :
- `sources` (jobphoning) — « Nouveau dossier » · « pièces · email » · activeStatus « dossier reçu »
- `classement` (n8n) — « Classement IA » · « pièces triées » · activeStatus « dossier structuré »
- `rag` (n8n) — « RAG juridique » · « jurisprudence interne » · activeStatus « sources trouvées »
- `synthese` (axonaut) — « Synthèse » · « GED » · activeStatus « résumé généré »
- `notify` (notify) — « Brouillon prêt » · « à valider »

edges : sources→classement→rag→synthese (main) ; synthese→notify `kind:notification` label « brouillon généré ».

stack : `["Doctrine", "RAG", "Claude", "GED", "n8n"]`
problem (cible) : volume documentaire énorme, jurisprudence dispersée, recherche lente.
benefit (cible) : les dossiers se classent, la recherche est instantanée, l'avocat part d'un brouillon.
details : trigger « nouveaux dossiers et pièces déposés » · processing « classement automatique et recherche RAG sur la jurisprudence interne » · write « synthèse et brouillon générés dans la GED » · reliability « brouillon toujours validé par l'avocat, données en UE ».
**Note secteur (sensible) :** human-in-the-loop OBLIGATOIRE — « brouillon préparé, jamais déposé sans validation de l'avocat ». Pas de promesse de conseil juridique automatisé.
seoTitle : « Automatisation cabinet d'avocats — RAG jurisprudence + brouillon »
seoDescription : dossiers classés par IA, recherche RAG sur la jurisprudence interne, synthèse et brouillon préparés pour l'avocat. Hébergé en UE.

---

## 10. `formation` — Centre de formation

**Angle :** automatiser le suivi apprenant — lead qualifié, programme adapté, relances et signature de la convention.
**Topologie :** 4 nœuds main + notify (signature) + callback (relance lead). **Nourrit la future page `/formation`.**

nodes :
- `sources` (jobphoning) — « Leads formation » · « site · CPF · email » · activeStatus « lead reçu »
- `qualif` (n8n) — « Qualification IA » · « besoin · financement » · activeStatus « besoin qualifié »
- `programme` (n8n) — « Programme » · « adapté au profil » · activeStatus « programme proposé »
- `inscription` (axonaut) — « Inscription » · « Digiforma · Dendreo » · activeStatus « dossier créé »
- `notify` (notify) — « Signature » · « Yousign »

edges : sources→qualif→programme→inscription (main) ; inscription→notify `kind:notification` label « convention signée » ;
inscription→sources `kind:callback` label « relance lead ».

stack : `["Digiforma", "Dendreo", "Yousign", "Claude", "n8n"]`
problem (cible) : relances manuelles, leads froids, suivi administratif lourd (Qualiopi, financement).
benefit (cible) : chaque lead est qualifié et relancé, la convention se signe en ligne, le dossier se monte seul.
details : trigger « leads par site, CPF ou email » · processing « qualification du besoin et du financement, programme adapté » · write « dossier d'inscription créé (Digiforma/Dendreo) » · reliability « relance automatique des leads, signature électronique de la convention, conformité Qualiopi facilitée, hébergé en UE ».
seoTitle : « Automatisation centre de formation — qualif lead, programme, signature »
seoDescription : leads qualifiés par IA, programme adapté, relances automatiques et signature électronique de la convention. Compatible Digiforma. Hébergé en UE.

---

## Récap topologies (contrôle capacités §3)

| Secteur | Nœuds main | callback | notify | Tient dans le moteur ? |
|---|---|---|---|---|
| ecommerce | 4 | — | escalade humaine | ✅ |
| rh | 4 | — | email candidat | ✅ |
| medical | 4 | — | SMS patient | ✅ |
| restauration | 4 | rappel no-show | SMS client | ✅ |
| industrie | 4 | — | alerte équipe | ✅ |
| btp | 4 | relance devis | artisan notifié | ✅ |
| juridique | 4 | — | brouillon prêt | ✅ |
| formation | 4 | relance lead | signature | ✅ |

Aucun ne nécessite d'extension moteur. Tous = pure data.
---

## 9. Definition of Done (par secteur)

- [ ] Entrée ajoutée dans `SECTORS` (sectorsData.tsx) — aucun autre fichier touché.
- [ ] `/automatisation/<slug>` : pipeline aligné (layout calculé), accordion spécifique,
      hero problem/benefit, CTA.
- [ ] Grille `/automatisation` : nouvelle carte en aperçu statique, hover desktop only.
- [ ] Desktop + iPhone 390 px : espacement régulier, 0 animation sur la grille mobile.
- [ ] `prefers-reduced-motion` : statique, 0 timer.
- [ ] SEO : `<title>`/`<meta description>` distincts.
- [ ] `pnpm build` : page SSG générée, bundle stable.
- [ ] Grep : 0 stat inventée, 0 terme générique banni (§4.3).