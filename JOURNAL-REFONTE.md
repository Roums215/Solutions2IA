# Journal de refonte — Solutions 2IA

> Récapitulatif complet de la session de refonte (juin 2026).
> Site vitrine Next.js 15 d'un développeur freelance solo (Iulian Ionita).
> Tout ce qui suit est **déployé sur Vercel** sauf mention « ⚠️ à faire ».

---

## 0. Point de départ et fil conducteur

Le site existait déjà (V8) mais sonnait **« agence / IA générique »**, avec du
« nous », des stats inventées, du jargon technique, et **laguait sur PC
d'entrée de gamme**.

**Recadrage client (fait loi sur toute la refonte) :**
- Freelance **solo**, en **démarrage**, **zéro client**. Toujours **« je »**, jamais « nous ».
- **Zéro preuve inventée** : pas de client, résultat, témoignage ou chiffre fictif.
- **Langage simple** pour dirigeants de PME non techniques. Jargon banni du texte visible (expliqué en tooltip ou volet « détails techniques »).
- **Ton sobre et pro**, rassurant. Le démarrage est une **force** (proximité, dispo, prix accessibles).
- **Schémas animés conservés** (signature de marque) — améliorés, jamais supprimés sèchement.
- **Priorité n°1 : la performance** sur tous les appareils.

---

## 1. Performance — le socle adaptatif (priorité n°1, RÉSOLUE et PROUVÉE)

Le lag sur PC d'entrée de gamme venait d'un bug : les animations tournaient à
fond même sur machine faible. Solution : un **système de niveaux de performance**.

### Ce qui a été construit (`lib/animation/`)
- **`usePerformanceMode.ts`** réécrit en **store singleton** (`useSyncExternalStore`).
  Expose un **`tier: 'full' | 'reduced' | 'minimal'`** :
  - `full` = expérience complète (desktop correct)
  - `reduced` = décor de fond coupé, parallax/tilt off, boucles infinies décoratives off — **mais reveals de cartes conservés** (mobile/low-end)
  - `minimal` = tout statique (reduced-motion utilisateur, save-data, ou FPS effondré)
  - Le low-end (deviceMemory ≤ 4 / cœurs ≤ 4) déclenche **au moins `reduced`** (corrige le bug racine).
- **`fpsGuard.ts`** : mesure le **FPS réel** ; si < ~40 fps soutenu, rétrograde le tier
  automatiquement. Calibration du refresh (anti faux-positif 30 Hz), **ratchet** (jamais
  de remontée = anti yo-yo), mémorisé en `sessionStorage`. Actif en prod (ou `?fpsguard=1` en dev).
- **`inViewPause.tsx`** : `<PauseOffscreen>` + `useInViewPause()` — met en pause les
  animations hors écran (via `useInView` de motion).
- **Script anti-flash** dans `app/layout.tsx` : pose `data-perf` avant le premier paint.
- **CSS** (`globals.css`) : règles `data-perf="reduced"` / `"minimal"`.

### Composants branchés au tier
FluidMouseField, PageAtmosphere, MouseParticles (fix : plus de `setState` 60×/s),
SectionParticles, SpotlightCard (tilt full-only), ParallaxField (full-only),
HeroVisual, les 5 scènes 3D (AIBrain/Web/Automation/App/Studio) — toutes **lazy
(`dynamic ssr:false`)** + pause hors écran + SMIL non rendus hors `full`.
~25 sections migrées `staticRender → disableContentMotion`.

### Vérifié en conditions réelles (CDP)
- Mobile émulé → `data-perf="reduced"`, scènes lourdes non montées ✓
- **Bridage CPU ×6 → tier passe `full` → `reduced` tout seul en ~10 s** ✓
- Ratchet : reste `reduced` même CPU redevenu normal ✓
- Zéro débordement horizontal à 390 px sur les 9 pages ✓

### Bonus qualité
Correction d'une erreur console préexistante (`<circle r>` animé) sur 6 composants
→ remplacé par `scale` (GPU). Console 100 % propre.

---

## 2. Contenu — 9 pages réécrites au « je »

Toutes au **« je »**, langage simple, **stats inventées supprimées (~20)**, jargon
banni du texte visible, prix transparents, schémas conservés et re-légendés.

| Page | Ce qui a changé |
|---|---|
| **Accueil** | Hero « Des outils qui travaillent pour vous ». Exemple réel (plateforme rapports télécoms) en preuve. Stats 73 %/×3/98 100 retirées. Structure : c'est quoi → apporte → comment → pour qui → 1 CTA. |
| **/services** | « Cinq façons de vous faire gagner du temps ». **Prix affichés** (bloc « Combien ça coûte ? »). « Ce qui change avec un indépendant ». |
| **/sites-web** | « Un site qui ne fait pas que joli, il vous amène des clients ». Jargon (SEO/UX/CMS/API) → mots simples. Dès 500 €. |
| **/applications** | Fil rouge **exemple réel DFT télécoms** (rapports d'intervention : papier → 2 espaces → envoi auto). KPIs inventés → indicateurs honnêtes. |
| **/automatisation** | Flux réel JobPhoning→n8n→Axonaut re-légendé. 1 cas vécu + 3 scénarios. **Nouvelle section logos de marques** + schéma pédagogique (voir §3). |
| **/agents-ia** | « Un collègue numérique ». Jargon (LLM, orchestration…) → « assistant ». **8 stats inventées retirées**. Promesse « 30 j remboursé » non validée → retirée. |
| **/rag** | Le mot **« RAG » disparaît du texte visible** → « mémoire d'entreprise ». 15 sections simplifiées. Schémas conservés. |
| **/a-propos** | **Histoire personnelle vraie** : « Moi, c'est Iulian », formé en ingénierie du web, projets pour **DFT (Digital Factory Telecom)** et **Ramsay Santé**, démarrage assumé comme force. Rien d'inventé. |
| **FAQ + articles** | Stats tierces non sourcées retirées (Gartner, Seekr, Techment, WRITER, Perplexity…). « nous » → « je ». Jargon simplifié. |

**Pédagogie** : composant **`<TermeExplique>`** (tooltip accessible) + glossaire
`lib/content/glossaire.ts` — un terme technique reste visible, souligné en pointillé,
expliqué en une phrase au survol/tap/focus.

---

## 3. Design & structure

- **Schéma /automatisation refait** : abandon du hub radial (confus) pour un **flux
  qui se lit gauche → droite** : « Ce qui se passe » (appel, mail, commande) →
  « Ça circule tout seul » → « Ce qui se fait » (fiche, devis, RDV). + **exemple
  concret qui défile** + ligne de réassurance « Vous ne changez pas vos logiciels ».
- **Section logos de marques** (`brandLogos.tsx` — SVG inline, zéro dépendance) :
  Gmail, Slack, Stripe, n8n, Axonaut, WhatsApp… en barre défilante, montrant la
  connexion entre outils.
- **Navigation croisée** (`<RelatedServices>`) : 2 liens contextuels « pour aller
  plus loin » avant le CTA de chaque page service, pour explorer sans se perdre.
- **Page /studio-visuel SUPPRIMÉE** (route, nav, footer, sitemap, SEO) + **redirect
  308** → /services. Constellation home repassée en pentagone (5 services).
- **Footer** : sticky compact (padding réduit, collé en bas desktop + mobile).
- **Exemple star DFT** (rapports d'intervention) en fil rouge sur home et /applications.

---

## 4. Identité — favicon

Le site n'avait **aucune favicon** (rien dans l'onglet). Ajout :
- `app/icon.tsx` (512 px) + `app/apple-icon.tsx` (180 px) — wordmark **S2iA** recadré
  serré (`public/branding/logo-mark.png`) sur carré sombre arrondi, généré par Next
  (ImageResponse). Lisible même à petite taille.

---

## 5. Formulaire de contact — fonctionnel (Resend)

Avant, le formulaire ne faisait rien. Maintenant il **envoie les demandes par email**.
- **`app/api/contact/route.ts`** : valide (nom/email/message), anti-spam **honeypot**,
  envoie un email **à Iulian** (`ionita.iulian215@gmail.com`) avec tous les champs
  (reply-to = email du visiteur) + un **accusé de réception au visiteur** (best-effort).
  Erreurs claires (422 validation, 503 si clé absente, 502 si échec).
- **`ContactPage.tsx`** : soumission réelle (fetch POST), états idle/sending/success/error,
  bouton « Envoi… », feedback accessible (`aria-live`). Formulaire accessible (labels
  liés, required, aria, navigable clavier).
- **Testé localement avec une vraie clé** → emails envoyés avec succès (`ok:true`).

### ⚠️ À FAIRE côté user pour activer en ligne
La clé ne se commit **jamais** (secret). Elle doit être ajoutée dans **Vercel** :
1. Vercel → projet → **Settings → Environment Variables**
2. `RESEND_API_KEY` = la clé Resend (compte gratuit sur resend.com)
3. **Redeploy**.
Détails et nuance domaine : voir mémoire `contact-form-resend.md`.

---

## 6. Accessibilité & SEO

- **Header navigable au clavier** : menu déroulant ouvre au focus, ferme à l'Escape,
  `aria-haspopup`/`aria-expanded`. Burger mobile 40 → **44 px**.
- **Formulaire contact accessible** : labels liés (htmlFor/id), champs requis signalés,
  FAQ avec `aria-expanded`, boutons avec `aria-pressed`.
- **canonical + OG** ajoutés sur toutes les pages (dont les 4 pages légales).
- **Metadata** réécrites au « je » sur toutes les pages.

---

## 7. Décisions validées par le client (référence)

**Grille tarifaire affichée :**
- Site vitrine simple : **≈ 500 €**
- Site vitrine premium : **1 000 – 2 500 €**
- Site relié à vos outils : **2 500 – 5 000 €+**
- Application métier : **1 500 – 15 000 €**
- Automatisation / assistant IA / mémoire d'entreprise : **sur devis** (échange gratuit)
- Toujours « ça dépend du projet, fixé ensemble avant de démarrer ».

**Promesses autorisées (rien d'autre) :** réponse sous 24 h · premier échange gratuit ·
un seul interlocuteur · petits prix de démarrage · gains de temps (qualitatif).

**Parcours (vrai, citable) :** Iulian Ionita, formé en ingénierie du web, projets pour
**DFT (Digital Factory Telecom)** et **Ramsay Santé**, démarre à son compte.

**Banque d'exemples réels :** plateforme rapports d'intervention (télécoms, livrée, vécu) ·
flux téléphonie→CRM (mixte réel/scénario) · ce site lui-même.

---

## 8. État de déploiement

Tout est **mergé sur `main` et déployé sur Vercel** (plusieurs déploiements `success`).
Branche de travail : `setup/agents-design`. Repo : github.com/Roums215/Solutions2IA.

**Vérifications finales (vertes) :** `tsc --noEmit` ✓ · `pnpm lint` ✓ ·
`pnpm exec playwright test` 5/5 ✓ · responsive 390 px ✓ · console propre.

---

## 9. Notes techniques utiles

- **Rapports d'audit Phase 0** : dossier `/audit/` (perf, structure, mobile, a11y-seo, PLAN, GLOSSAIRE).
- **Serveur dev** : `pnpm dev` sur le **port 4000**. Pour vérifier sans casser le dev :
  `npx tsc --noEmit` + `pnpm lint` — **JAMAIS `pnpm build`** pendant que le dev tourne
  (ça écrase le `.next` partagé → site cassé). Réparation : kill process + `rm -rf .next` + relancer.
- **Après une grosse vague d'édits** : reload navigateur avec cache vidé (les chunks dev sont parfois stale).
- **Code mort gardé mais gaté** : WebGalaxyShowcase, AmbientBackground, NeonDivider (non montés, mais prêts au cas où).

---

## 10. Pistes restantes (optionnel)

- Vérifier le domaine `solutions2ia.com` sur Resend → activer l'accusé de réception aux visiteurs externes.
- Passe contrastes sur la micro-copie tertiaire (< 12 px).
- Fil d'ariane sur les sous-pages (`/articles/[slug]`, `/automatisation/[secteur]`).
- Mettre à jour `CLAUDE.md` / `AGENTS.md` (référencent encore /studio-visuel et l'ancien positionnement).
