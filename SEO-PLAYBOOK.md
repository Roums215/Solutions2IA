# SEO / GEO Playbook — Solutions 2IA

Guide d'activation et de suivi du référencement. Domaine officiel : **https://solutions2ia.fr**

---

## 0. Ce qui a été fait (session du 25 juin 2026)

| Statut | Action | Impact |
|---|---|---|
| ✅ | **Bug critique corrigé** : `SITE_URL` passait de `.com` (domaine mort, sans DNS) à `.fr`. Le canonical, l'OG, le sitemap, le `host` robots et tout le JSON-LD pointaient vers une URL inexistante. | Débloque l'indexation. **C'était le frein n°1.** |
| ✅ | Emails morts `contact@solutions2ia.com` → `contact@solutions2ia.fr` (le `.fr` a des serveurs mail Hostinger, le `.com` n'en a aucun). | Plus de leads perdus. |
| ✅ | JSON-LD `Service` + `BreadcrumbList` ajoutés sur les 7 pages commerciales (`/services`, `/sites-web`, `/applications`, `/agents-ia`, `/automatisation`, `/rag`, `/automatisation/[secteur]`). | Rich results + citations IA (GEO). |
| ✅ | `/rag` réécrite (titre, description, canonical, OG, mots-clés) — elle était trop maigre. | Page indexable et différenciée de `/agents-ia`. |
| ✅ | Pages secteurs : canonical + OG + breadcrumb 4 niveaux + maillage `RelatedServices`. | Longue traîne sectorielle exploitable. |
| ✅ | `keywords` ciblés + descriptions ≤ 160 car. sur les pages commerciales. | Snippets non tronqués, ciblage Bing/IA. |
| ✅ | Lien **Articles** + **FAQ** ajoutés au footer. | Les articles piliers ne sont plus orphelins. |
| ✅ | **Système de score SEO hebdo + mensuel** (`/api/seo-report` + `lib/seo/report/*`). | Suivi automatique par email. |

> ⚠️ **Action immédiate requise : REDÉPLOYER** (`git push` → Vercel). Tant que le site n'est pas redéployé, le canonical live reste `.com` et le bug persiste.

---

## 1. La toute première chose à faire

1. **Redéployer** le site (push sur `main` → Vercel build).
2. Vérifier sur https://solutions2ia.fr que le canonical est bon :
   ```bash
   curl -s https://solutions2ia.fr | grep -i canonical
   # attendu : <link rel="canonical" href="https://solutions2ia.fr"/>
   ```
3. Vérifier dans Hostinger que la boîte **contact@solutions2ia.fr** existe (sinon créer l'alias).

---

## 2. Activer Google Search Console (GSC)

GSC est **gratuit, officiel, et indispensable** : c'est la seule source de tes positions/clics/impressions réels. Sans lui, le score ne mesure que la santé technique on-page.

### 2.1 Créer la propriété + vérifier le site
1. https://search.google.com/search-console → **Ajouter une propriété**.
2. Choisir **Domaine** (recommandé : couvre http/https/www) → `solutions2ia.fr`.
   - Vérification par **enregistrement DNS TXT** chez Hostinger (Google te donne la valeur).
   - *Alternative* si tu préfères « Préfixe d'URL » : Google te donne une balise HTML → pose son code dans la variable Vercel `GOOGLE_SITE_VERIFICATION` (le `layout.tsx` l'injecte déjà automatiquement).
3. Une fois validé : **Sitemaps** → soumettre `https://solutions2ia.fr/sitemap.xml`.

### 2.2 Créer le service account (pour le rapport automatique)
1. https://console.cloud.google.com → nouveau projet « solutions2ia-seo ».
2. **APIs & Services → Library** → activer **Google Search Console API**.
3. **IAM & Admin → Service Accounts** → créer un compte → **Keys → Add key → JSON** → télécharger le fichier.
4. Dans GSC : **Paramètres → Utilisateurs et autorisations → Ajouter** l'email du service account (`...@...iam.gserviceaccount.com`) en accès **Restreint** (suffisant en lecture).

---

## 3. Variables d'environnement Vercel

Projet Vercel → **Settings → Environment Variables** (scope *Production*) :

| Variable | Valeur | Requis |
|---|---|---|
| `CRON_SECRET` | une chaîne aléatoire : `openssl rand -hex 32` | recommandé |
| `SEO_REPORT_EMAIL` | `ionita.iulian215@gmail.com` (où tu reçois le score) | oui (pour l'email) |
| `RESEND_API_KEY` | ta clé Resend (déjà utilisée par le formulaire) | oui |
| `SEO_REPORT_FROM` | `Solutions 2IA SEO <seo@solutions2ia.fr>` (domaine vérifié sur Resend) — sinon laisse vide, ça utilise `onboarding@resend.dev` | option |
| `GSC_SERVICE_ACCOUNT_KEY` | la clé JSON, **encodée base64** : `base64 -i key.json \| pbcopy` puis coller | option (débloque la visibilité) |
| `GSC_SITE_URL` | `sc-domain:solutions2ia.fr` (propriété Domaine) **ou** `https://solutions2ia.fr/` (préfixe d'URL) | option |
| `GOOGLE_SITE_VERIFICATION` | le code GSC (méthode balise HTML) | option |
| `SEO_REPORT_WEBHOOK` | URL Slack/Discord (en plus de l'email) | option |

> Sans `GSC_SERVICE_ACCOUNT_KEY`, le rapport part quand même chaque semaine avec le **score de santé on-page**. Ajoute GSC dès que possible pour débloquer le suivi de position.

---

## 4. Tester le rapport sans attendre lundi

Après déploiement et config des env vars :

```bash
# Dry-run (calcule le score, n'envoie PAS d'email) :
curl "https://solutions2ia.fr/api/seo-report?secret=TON_CRON_SECRET&dry=1"

# Envoi réel hebdo :
curl "https://solutions2ia.fr/api/seo-report?secret=TON_CRON_SECRET&mode=weekly"

# Envoi réel mensuel :
curl "https://solutions2ia.fr/api/seo-report?secret=TON_CRON_SECRET&mode=monthly"
```

Réponse JSON attendue : `{ "status": "ok", "score": { "global": 78, "grade": "B", ... }, "gscConnected": true/false, ... }`

**Crons automatiques** (déjà dans `vercel.json`) :
- Rapport **hebdomadaire** : chaque **lundi 8h UTC**.
- Rapport **mensuel** : le **1ᵉʳ de chaque mois 8h UTC**.

---

## 5. Comment lire ton score

**Score global /100 + note A→E.**

- **Visibilité (60 %)** — depuis GSC : où tu te classes réellement.
  - Position moyenne (50 %) · CTR (20 %) · Impressions (15 %) · Clics (15 %).
- **Santé on-page (40 %)** — qualité technique mesurée sur le site live (title, description, canonical sur le bon domaine, h1 unique, JSON-LD, indexabilité, robots/sitemap…).

| Note | Score | Lecture |
|---|---|---|
| A | ≥ 85 | Excellent, on défend la position |
| B | 70–84 | Bon, marges d'optimisation |
| C | 55–69 | Correct, chantiers identifiés |
| D | 40–54 | Fragile, action nécessaire |
| E | < 40 | Critique |

L'email contient : score + évolution vs période précédente, top requêtes avec mouvement de position (▲/▼), pages performantes, et la **checklist des contrôles on-page en échec** (donc actionnable tout de suite).

> Un site neuf démarre logiquement en C/D côté visibilité (peu d'historique Google). Ce qui compte c'est la **tendance hebdo** : impressions et requêtes qui montent = indexation qui progresse.

---

## 6. Bonus — étendre la portée (GEO + Bing)

- **Bing Webmaster Tools** (https://www.bing.com/webmasters) : import en 1 clic depuis GSC. Bing alimente Copilot et une partie des réponses IA.
- **GEO (réponses IA)** : `robots.ts` autorise déjà GPTBot, ClaudeBot, PerplexityBot, etc. Le JSON-LD `Service`/`FAQ`/`Article` qu'on vient d'ajouter est ce que les IA citent. Continue à publier des articles structurés (FAQ + sources).
- **Google Business Profile** : si une présence locale est pertinente, une fiche établissement booste le SEO local et la confiance.

---

## 7. Backlog SEO (prochaines optimisations, par priorité)

Issu de l'audit de contenu — non bloquant, à faire au fil de l'eau :

- **P2** — `buildOfferCatalogSchema` sur `/services` (les fourchettes de prix sont déjà dans `faqData.ts`) → prix éligibles aux rich results.
- **P2** — `buildHowToSchema` sur la méthode « 4 étapes » de la home / `/applications`.
- **P2** — Mentions textuelles **Belgique / Suisse / Luxembourg** (le schema cible déjà FR/BE/CH/LU, mais aucun contenu ne les nomme).
- **P2** — Décliner le pattern `[secteur]` pour `/applications/[secteur]` (verticaux applicatifs déjà décrits dans la FAQ).
- **P3** — Page/section dédiée « facture électronique Chorus Pro 2026 » (la demande va exploser, l'article existe déjà mais aucune page de service ne cible l'obligation).
- **P3** — Raccourcir le `title.template` du layout (`%s — Solutions 2IA` ajoute 16 car. et fait dépasser 60 car. certains titres).

---

## 8. Performance / Core Web Vitals (chantier dédié)

Audit Lighthouse mobile du 25 juin 2026 sur la home :

| Métrique | Mesuré | Cible | Statut |
|---|---|---|---|
| Performance | **70/100** | ≥ 90 | ⚠️ à corriger |
| **LCP** | **7,6 s** | < 2,5 s | ❌ facteur de classement |
| CLS | 0,003 | < 0,1 | ✅ excellent |
| TBT | 50 ms | < 200 ms | ✅ |
| FCP | 1,5 s | < 1,8 s | ✅ |
| SEO / A11y / Best-practices | 100 / 98 / 100 | — | ✅ |

**Diagnostic vérifié** (l'hypothèse « logo 871 KB » est écartée : la prod sert bien le logo optimisé via `/_next/image?...&w=32&q=75`, quelques KB). Le vrai problème = **« render delay » de ~3,1 s** sur le texte du hero :
1. `app/page.tsx` est `"use client"` et importe **5 sections lourdes en synchrone** → le thread principal parse/exécute tout ce JS avant de peindre le hero.
2. Le texte du hero anime depuis `opacity:0` avec des delays → le LCP n'est peint qu'à la fin de l'anim.
3. `LoadingScreen` en overlay au démarrage + `HeroVisual` (dynamic) concurrencent le rendu.

**Plan d'action (à mesurer après chaque étape) :**
- **P0 — Sortir la home du tout-client** : passer `app/page.tsx` en Server Component et n'isoler en client (`"use client"`) que les sections réellement interactives. Permet de lazy-loader le below-the-fold **en gardant le contenu dans le HTML (SSR)** → bon pour le SEO ET le LCP. *(à valider : `component-splitter` / `section-designer`)*
- **P0 — Hero** : réduire/supprimer le delay d'entrée sur l'élément LCP (le sous-titre) ; déférer `HeroVisual` après le 1er paint. *(via `motion-specialist`)*
- **P1 — Découper les méga-composants** : `WebGalaxyShowcase` (2331 LOC), `OneAgentManyNeedsPipeline` (1045), `AppDigitizationPipeline` (1033), `sectorDashboards` (1042) → sous-modules + lazy. *(via `component-splitter`)*
- **P1 — Animations `width`/`height` → `scaleX`/`scaleY`** : `ProfileCarousel.tsx:109`, `PerformanceTracking.tsx:206`, `WebScene.tsx:63-65`, `AppScene.tsx:88,145`, `AutomationScene.tsx:251`, `Header.tsx:162,178`. *(via `motion-specialist`)*
- **P2 — LoadingScreen** : évaluer son intérêt sur mobile (coûte ~320 ms sur le chemin critique).

**Déjà bon (ne pas toucher) :** lazy `dynamic` des libs 3D/Remotion, `optimizePackageImports`, AVIF/WebP, `prefers-reduced-motion`, 0 JS mort, HTTPS/compression. Et le **logo est correctement optimisé** par next/image.
