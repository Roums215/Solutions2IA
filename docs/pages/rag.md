# Brief — Page `/rag` : le cerveau documentaire privé

> À déposer dans `docs/pages/rag.md`. Réf : `PLAYBOOK.md` + `ROADMAP.md`.
> Page MAJEURE avec sa propre forme signature (≠ pipeline automatisation).
> Chantier design complet : section-designer + motion-specialist + copy-writer-fr.

---

## 0. Positionnement (la bascule)

On NE vend PAS « une stack RAG » ni « une technologie ». On vend **une mémoire métier
fiable** — un **cerveau documentaire privé** qui connaît VOS documents et **cite ses sources**.

Cohérence de gamme (à rendre lisible sur le site) :
- **Automatisation** → l'IA **agit** dans vos outils.
- **RAG** → l'IA **retrouve et explique** vos connaissances internes.
- **Agents IA** → l'IA **décide et exécute** des tâches.

Mot d'ordre vocabulaire : **« mémoire »**, pas « index / embeddings / vector store » dans
le hero. Le technique vit PLUS BAS, jamais en haut.

---

## 1. Règle d'or — PME d'abord, technique en dessous

Risque mortel : faire une page « AI engineer ». Une PME ne sait pas ce qu'est un embedding
ni pgvector. Donc :
- **Hero + sections hautes** = langage métier, bénéfice, zéro jargon.
- **Panneau technique** = plus bas, et **rassurant avant d'être technique**.
- Honnêteté (§1.3 PLAYBOOK) : « peut afficher ses sources » (pas « affiche toujours »),
  human-in-the-loop, « hébergé en UE ». Outils = exemples. 0 stat inventée.

---

## 2. Hero

**Titre :**
> Une IA qui répond avec vos documents, pas avec de l'improvisation.

**Sous-texte :**
> Connectez vos procédures, contrats, PDF ou bases internes. L'IA retrouve les passages
> utiles, cite ses sources et aide vos équipes à retrouver l'information immédiatement.

**CTA principal** (tester) : « Construire mon assistant documentaire » ou « Explorer une
mémoire métier ». CTA secondaire : « Tous les services » / lien vers automatisation.

---

## 3. Forme signature — la mémoire qui s'active (LE morceau)

Schéma vertical, vivant, qui se lit comme une scène — pas un diagramme tech :

```
Documents entreprise
(PDF • Drive • Notion • SharePoint)
            ↓
Mémoire documentaire          ← nœud CENTRAL, le "cerveau", pulse subtil (vivant)
(indexation + recherche)
            ↓
Question collaborateur
            ↓
Passages retrouvés
            ↓
Réponse sourcée
   └─ Source : Procédure_RH.pdf — page 12     ← LA citation, visible
```

**Le moment "wow, c'est fiable" :** quand la réponse apparaît, une **fine ligne remonte
du document source** (léger glow sur ce document) **jusqu'à la citation** sous la réponse.
C'est le différenciateur visuel : la réponse est *traçable*.

Détails design :
- Le mot **« Mémoire documentaire »** est le centre de gravité visuel.
- La citation est un **chip lisible** (`Source : <fichier> — page N`), pas un libellé tech.
- Animation : 1 seul élément animé (la ligne de citation + le pulse mémoire), `useInView`,
  coupée en `prefers-reduced-motion` (état statique = ligne + citation déjà affichées).
- Mobile : statique, citation visible d'emblée, 0 timer.

---

## 4. Section contraste — IA classique vs RAG métier (bespoke, PAS TransformationCard)

Deux colonnes, vend la valeur en 3 secondes :

| IA classique | RAG métier |
|---|---|
| ✗ peut inventer | ✓ répond avec vos sources |
| ✗ ne connaît pas vos documents | ✓ retrouve les passages exacts |
| ✗ réponses non vérifiables | ✓ réponses vérifiables |

Traitement visuel sobre (la colonne RAG en cyan/teal, la colonne classique en gris terne).
Composant **nouveau**, ne PAS réutiliser `TransformationCard` (réservé `/realisations`).

---

## 5. Section « Ce que le RAG remplace » (Avant/Après en copy, douleurs universelles)

**Avant** (3 phrases de quotidien PME — douleurs universelles, PAS des témoignages clients) :
- « Je crois que le document est sur le Drive… »
- « Demande à Julien, lui il sait. »
- « Je ne retrouve plus la dernière procédure. »

**Après** :
- Question posée → réponse sourcée immédiatement.

Cadre honnête : ce sont des situations génériques, pas des cas clients. Aucun nom réel,
aucune stat.

---

## 6. Section « Branché sur les documents de VOTRE métier »

> ⚠️ Titre : éviter « le RAG apprend » au sens ML (il ne s'entraîne pas, il **interroge**
> votre corpus). Copy = « il connaît / il est branché sur vos documents ».

Le RAG est **horizontal** : un seul moteur, des corpus différents. Petites cartes/chips
par métier (réutiliser l'esprit des secteurs, statique) :

- **Immobilier** : mandats · procédures location · clauses
- **Comptabilité** : TVA · process internes · doctrine
- **Industrie** : maintenance · fiches techniques · normes
- **RH** : onboarding · congés · règlement interne
- (+ juridique : jurisprudence · dossiers — pont vers la verticale juridique)

Sensation visée : « l'IA connaît MON entreprise ».

---

## 7. Section « Sources connectables » (visuelle, pas une liste)

Un **hub** : plusieurs sources reliées à un centre « Mémoire documentaire ».

Sources (exemples, badges neutres type ToolBadge) :
`Google Drive · Notion · SharePoint · Emails · PDF · CRM · Base SQL · Site interne`

Toutes connectées visuellement à → **Mémoire documentaire**. C'est une topologie en
**fan-in** (plusieurs entrées → 1 centre) — donc un **nouveau composant** (le moteur
automatisation ne fait pas de fan-in, §3 brief auto). C'est OK : page majeure, forme propre.

---

## 8. Panneau technique — rassurant avant d'être technique

4 entrées, ton rassurant :
- **Sources** : documents synchronisés automatiquement.
- **Recherche** : l'IA retrouve les passages les plus pertinents avant de répondre.
- **Citations** : chaque réponse peut afficher ses sources.
- **Sécurité** : droits d'accès, journalisation et hébergement UE.

Sous ce panneau (et SEULEMENT là), une ligne « pour les techniques » : la stack possible
(pgvector / Qdrant auto-hébergés en UE, recherche hybride + reranking, génération Claude
ou Mistral, orchestration LangChain/LlamaIndex). Exemples, hébergeable en UE.

---

## 9. Garde-fous (non négociables)

- Hero/sections hautes : 0 jargon (« mémoire », pas « embeddings »).
- Citations : « peut afficher ses sources » — pas de survente.
- Pas de faux témoignages : les « Avant » sont des douleurs génériques.
- Pas de `TransformationCard` (réservé `/realisations`) : contraste & avant/après = bespoke.
- « Branché sur / connaît vos documents » — jamais « s'entraîne / apprend » au sens ML.
- Honnêteté RGPD : « hébergé en UE », données jamais réutilisées pour entraîner un modèle public.
- Termes bannis : « IA intelligente », « automatisation avancée », « optimisation ».

---

## 10. Perf & responsive

- `motion/react`, `transform`/`opacity`/`clip-path` only, tokens cyan/indigo `var(--color-*)`.
- 1 seul élément animé à l'écran (la mémoire qui pulse + la ligne de citation), `useInView`,
  `usePerformanceMode`.
- `prefers-reduced-motion` : tout statique, citation + ligne déjà affichées, 0 timer.
- iPhone 390 px : sections empilées, schéma statique, fan-in « sources » lisible en vertical,
  tap-targets ≥ 44 px.
- Badges outils neutres (ToolBadge), 0 hex hard-codé hors badges.

---

## 11. Workflow agents (chantier complet, pas data-only)

1. **section-designer** — compose la page : hero, forme signature (mémoire + citation),
   contraste, remplace, métiers, hub sources, panneau. Skill `frontend-design`.
2. **motion-specialist** — l'anim « mémoire vivante » + la ligne de citation qui remonte,
   sobre, perf, reduced-motion off.
3. **copy-writer-fr** — toute la copy selon §1–§8, ton premium PME, garde-fous §9.
4. **/audit-pr** — tokens-guardian + a11y-reviewer + performance-auditor, en fin de page.

QA : desktop + iPhone 390 px, `prefers-reduced-motion`, `pnpm build` (page `/rag` générée),
SEO `<title>`/`<meta>` distincts, grep anti-jargon.

---

## 12. Definition of Done

- [ ] Hero PME-first (titre + sous-texte + CTA), 0 jargon.
- [ ] Forme signature : mémoire centrale + citation visible + ligne source→réponse.
- [ ] Contraste IA classique vs RAG (bespoke).
- [ ] « Ce que le RAG remplace » (Avant/Après copy, douleurs universelles).
- [ ] « Branché sur votre métier » : 4-5 corpus secteurs.
- [ ] Hub « Sources connectables » visuel (fan-in).
- [ ] Panneau rassurant (Sources/Recherche/Citations/Sécurité) + stack en bas.
- [ ] Perf : 1 anim, reduced-motion statique, iPhone OK, 0 timer mobile.
- [ ] Garde-fous §9 respectés (grep jargon = 0, 0 faux témoignage, pas de TransformationCard).
- [ ] `pnpm build` OK, SEO distinct.