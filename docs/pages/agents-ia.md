# `/agents-ia` · vente de l'assistant IA

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> **Mis à jour le 29 septembre 2026** · contre le code de `app/agents-ia/` et
> `components/sections/agents-ia/` (refonte « V3 » des 28 et 29 septembre 2026).
> La fiche précédente (18 septembre) décrivait la page V1 : `AIBrainScene`, anatomie en
> quatre couches, pipeline fan-in/fan-out, carrousel de profils. Tout cela est débranché.

---

## 1. Ce que fait cette page

Vendre l'assistant IA sur mesure à un dirigeant de PME en lui montrant **une demande
réelle traitée de bout en bout**, puis en répondant dans l'ordre à ses quatre questions :
qu'est-ce qu'il fait exactement pour moi (un rôle précis), combien de temps je récupère
(calculateur avec ses propres chiffres), est-ce que je garde la main (niveaux d'autonomie
et verrou humain), comment on commence (pilote cadré). Elle ne vend pas le fait de relier
des logiciels entre eux (`/automatisation`), ni un outil métier complet (`/applications`),
ni la mémoire documentaire en détail (`/rag`, simple lien depuis le besoin « Équipe »).

| | |
|---|---|
| Route | `/agents-ia` |
| Fichiers | `app/agents-ia/page.tsx` (serveur, SEO, 53 lignes) · `app/agents-ia/AgentsIAPage.tsx` (83 lignes, **sans `"use client"`** : composition serveur, commentaire `:8-9` ; les sections sont des Client Components) |
| Sections | `components/sections/agents-ia/` : `AiHeroSection` · `AiHeroScene` · `AiHeroSceneMobile` · `aiHeroSceneParts` · `aiHeroSceneData` · `AiAgentTypes` · `AiTimeCalculator` · `AiAutonomy` · `AiDeployment` · `aiPageData` |
| Preset de décor | `ai` (`AgentsIAPage.tsx:30`) : `AiSystemField` dans `components/shared/PageAtmosphere.tsx:162,208`, radial + deux halos flous + grille SVG masquée + courbes ; plus de croix depuis la V3 (`docs/chantiers/2026-09-29-refonte-pages-service.md`) |
| Fonds de section | `SectionFluidBackdrop` variantes `aiHero` (hero), `aiDark` (sections sombres), `aiLight` (sections claires) |
| Public visé | dirigeant de PME qui envisage un assistant IA mais craint qu'il invente, qu'il agisse sans lui, ou que ses données partent ailleurs |
| État git | fichiers V3 encore non suivis sur la branche `refonte/homepage-v2` au 29/09/2026 |

---

## 2. La promesse affichée

- **Étiquette** : « Assistants IA · sur mesure » (`AiHeroSection.tsx:50-52`, `text-accent-dark`)
- **Titre (h1)** : « Un collègue numérique qui répond, trie et prépare. **Vous décidez.** » (`AiHeroSection.tsx:54-60`, « Vous décidez. » en `.text-gradient-fluid`)
- **Sous-titre** (élément LCP, `.hero-enter`) : « Il prend en charge le répétitif, sur vos règles et avec vos documents. Tout ce qui engage l'entreprise vous est soumis avant de partir. » (`AiHeroSection.tsx:63-69`)
- **Canaux** (4 pastilles papier) : « Au téléphone » · « Sur votre site » · « Dans vos mails » · « Dans vos documents » (`AiHeroSection.tsx:20-25,71-78`)
- **Réassurance sous le bouton** : « Pilote de 30 jours, satisfait ou remboursé » (`AiHeroSection.tsx:91-93`) · **à confirmer commercialement**, voir §11
- **Niveau 1 (dirigeant de PME)** : le h1 et la démonstration suffisent : l'assistant fait le travail, vous gardez la décision. Aucun jargon dans le hero.
- **Niveau 2 (visiteur averti)** : il n'y a plus de volet technique dédié sur la page. Le détail vit dans les fiches de rôle (« Il sait », « Outils », `AiAgentTypes.tsx:98-109`) et dans les quatre questions de `AiAutonomy` (sources citées, journal, hébergement). Le texte technique `TRUST_TECH` (RAG, LLM, Mistral, Claude) existe encore dans `aiPageData.ts:379-383` mais n'est lu que par `AiConfidence`, débranché.

---

## 3. Structure, dans l'ordre

Six moments au lieu de neuf en V1 (commentaire `AgentsIAPage.tsx:11-16`). Alternance
clair / sombre stricte.

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero clair : promesse + démonstration d'une demande | `AiHeroSection` (import direct, `AgentsIAPage.tsx:6,33`) | un assistant qui traite une vraie demande et s'arrête pour vous |
| 2 | ce que ça apporte | « Un rôle précis. Pas un robot pour tout. » (sombre, `#besoins`) | `AiAgentTypes`, `dynamic()` (`:17,36`) | chaque besoin a une fiche : ce qu'il reçoit, sait, peut, ce qu'il vous demande, ses outils |
| 3 | ce que ça apporte (chiffré) | « Combien de temps vous récupérez, avec vos chiffres. » (clair, `#calcul`) | `AiTimeCalculator`, `dynamic()` (`:18,39`) | un ordre de grandeur calculé avec ses propres chiffres, calcul visible |
| 4 | comment ça marche | « Vous choisissez ce qu'il peut faire seul. » (sombre, `#controle`) | `AiAutonomy`, `dynamic()` (`:19,42`) | trois niveaux, le verrou humain se déplace ; quatre objections traitées |
| 5 | pour qui / comment on démarre | « Une tâche, un pilote, puis vous décidez. » (clair, `#methode`) | `AiDeployment`, `dynamic()` (`:20,45`) | on commence petit, on mesure, on décide |
| aside | maillage | deux lignes « Services liés » (`<nav>`, pas une section) | inline (`AgentsIAPage.tsx:22-25,48-65`) | `/automatisation` et `/applications` si le besoin est ailleurs |
| 6 | l'étape suivante | « Quelle tâche aimeriez-vous déléguer ? » | `CTABand` `framed` `compact` (`:68-80`) | un seul bouton : parler de son besoin |

---

## 4. Schémas et animations

### 4.1 Le hero : une demande, de bout en bout

`AiHeroScene.tsx` (368 lignes) + `aiHeroSceneParts.tsx` (737) + `aiHeroSceneData.ts` (195).

- **Deux objets seulement** : un iPhone devant à gauche (ce qui arrive) et l'espace de
  travail de l'assistant derrière (ce qu'il comprend et fait), avec un **dossier actif**
  visible du début à la fin dont les lignes changent d'état sur place, sans remise à zéro
  (`aiHeroSceneData.ts:1-8`, `AiHeroScene.tsx:25-37`).
- **Une seule demande, fictive et signalée** : dossier `D-0142`, Camille Laurent de
  l'« Entreprise B », appel à 09:14, devis + rendez-vous cette semaine à Villeurbanne,
  remise demandée de 15 % (`aiHeroSceneData.ts:37-52`). Mention « Maquette · données
  d'exemple » en pied d'espace de travail (`AiHeroScene.tsx:160-162`).
- **Sept phases, environ 28 s** (`AI_PHASES`, `aiHeroSceneData.ts:18-26` : 6,4 + 4 + 4 +
  3,6 + 3,8 + 3,6 + 2,6 s = 28 s, plus 0,7 s d'attente entre deux boucles) :

| Phase | Étape affichée | Ce qui se passe |
|---|---|---|
| 1 | 01 Demande | l'appel arrive, la transcription remplit le dossier (contact, entreprise, besoin, lieu, délai, remise) |
| 2 | 02 Compréhension | question par message du site, réponse avec source `zones-intervention.pdf · p. 2` |
| 3 | 03 Sources | lecture de `tarifs-2026.pdf` : remise maximale 10 %, la ligne « Remise » passe « à valider » |
| 4 | 04 Décision | il s'arrête, bandeau de flux bloqué « Demande → Compréhension → Préparation → Vous → Action » |
| 5 | 05 Validation | sur l'iPhone, trois actions validées d'un geste (devis, rendez-vous jeudi 10 h, remise 10 %) ; le flux se rouvre |
| 6 | 06 Traçabilité | quatre destinations : Agenda, Fichier clients, Mail, Logiciel métier ; chaque information voyage depuis sa ligne du dossier |
| 7 | 06 Traçabilité | résumé « Dossier traité » puis « Tout est tracé. » (`aiHeroSceneParts.tsx:704-730`) |

- Repère d'étape discret (nom + six filets, `AiHeroScene.tsx:228-268`), légende sous la
  scène (`:184-210`), **bouton pause** (`:211-221`). L'iPhone recule quand l'assistant
  travaille et revient quand c'est à vous (`PHONE_POSE`, `:55-64`).
- **Attribut `data-ai-phase`** (`AiHeroScene.tsx:105`) : vaut la phase affichée (0 à 7).
  Il sert aux scripts de capture (`review/agents-ia/.capture.cjs`, hors dépôt) pour
  photographier chaque phase. Ne pas le renommer sans mettre les scripts à jour.
- Plan fixe 860 × 560 mis à l'échelle en CSS pur (`[scale:tan(atan2(100cqw,860px))]`),
  horloge en `setTimeout`, `transform` et `opacity` seulement.

### 4.2 Le hero sur téléphone : quatre moments

`AiHeroSceneMobile.tsx` (135 lignes) : pas la scène ordinateur réduite, l'iPhone au
centre et le dossier en petit dessous, plan fixe 340 × 600 (`:19-20`). Quatre moments de
la même demande (`AI_MOBILE_PHASES`, `aiHeroSceneData.ts:190-195`) : « Un appel arrive »
(6 s) · « Une question par message » (4,2 s) · « Il s'arrête » (4,2 s) · « Vous validez,
tout est tracé » (5,4 s), soit 19,8 s plus 0,7 s d'attente. Attribut
`data-ai-mobile-phase` (`:62`, 0 à 4 ou `static`). Bouton pause (`:121-131`).

### 4.3 Les schémas des sections

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Fiche de rôle + mini scène | `AiAgentTypes.tsx` (214 lignes) | 6 besoins en onglets (Appels, Messages, Boîte mail, Documents, Équipe, Tâches récurrentes, `aiPageData.ts:208-322`) : une seule fiche qui se reconfigure (Mission, Il reçoit, Il sait, Il peut, Il vous demande, Outils, `:98-109`) et une mini scène horodatée sur papier (`:114-145`). La ligne « Exemples » (6 métiers : Entreprise de services, Cabinet, Commerce, Immobilier, Formation, Terrain / maintenance, `aiPageData.ts:109-182`) ne change que l'exemple, pas le fonctionnement (`:158-183`) | onglets et métiers en défilement horizontal (`overflow-x-auto`, `:54,161`) ; fiche puis mini scène empilées (grille 2 colonnes dès `lg`, `:81`) | `disableContentMotion` : changements instantanés (`instant`, `:28`) |
| Calculateur | `AiTimeCalculator.tsx` (211 lignes) | 4 tâches préréglées (Mails 40 × 3 min, Appels 15 × 5, Devis 5 × 20, Documents 20 × 6, `aiPageData.ts:326-331`), 4 curseurs (volume, minutes, part 10 à 90 % défaut 50 %, coût horaire 15 à 120 € défaut 35 €), résultat en heures par an et en euros, **calcul affiché ligne par ligne** (`:142-155`), 220 jours travaillés (`aiPageData.ts:333`) | réglages puis résultat empilés (grille dès `lg`, `:68`) | aucune animation propre ; `aria-live="polite"` sur le résultat (`:113`) |
| Verrou humain qui se déplace | `AiAutonomy.tsx` (163 lignes) | un seul flux en 6 étapes (Demande, Comprendre, Préparer, Décider, Agir, Tracer, `aiPageData.ts:55-62`) ; le verrou (`layoutId="ai-control-lock"`, `:101-108`) se place sur « Décider » (niveau 1, « Vous décidez »), « Agir » (niveau 2, « Vous relisez ») ou « Tracer » (niveau 3, « Vous gardez le journal ») selon `CONTROL_GATE` (`aiPageData.ts:65`) ; au niveau 1 les étapes suivantes sont atténuées « après votre accord » (`:82,98`). Trajectoire SVG fine en fond (`:156-163`) | flux vertical avec filet à gauche, grille 6 colonnes dès `md` (`:78-79`) ; trajectoire SVG masquée (`hidden md:block`) | ressort à durée 0 (`visualDuration: instant ? 0 : 0.55`) |
| Quatre questions | `AiAutonomy.tsx:133-149` | accordéons natifs `<details>` : « Et s'il ne connaît pas la réponse ? », « Et s'il rencontre une exception ? », « Puis-je relire ce qu'il a fait ? », « Où sont mes données ? » (`aiPageData.ts:67-88`) | une colonne, deux dès `md` | natif, sans JS |
| Trajectoire du pilote | `AiDeployment.tsx` (110 lignes) | 5 temps (Une tâche, Vos règles, 30 jours réels, Mesure, Vous décidez de la suite, `aiPageData.ts:387-393`), ligne tracée une seule fois à l'entrée dans l'écran (`whileInView`, `:51-58`), dernier point en pointillé | vertical, 5 colonnes dès `md` (`:59`) | `instant` : ligne déjà pleine |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux. Les
schémas V1 (anatomie, pipeline, `AgentPlan`) sont débranchés mais **conservés sur le
disque** le temps de la validation, voir §11.

---

## 5. Surfaces et cartes

Plus aucune `SpotlightCard` ni `.glass-*` sur la page. La V3 remplace les grilles de
cartes par des lignes éditoriales et quelques surfaces papier ou encre.

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Section papier `surface-light bg-paper` arrondie | hero (`AiHeroSection.tsx:38`, arrondi bas seulement), calculateur (`AiTimeCalculator.tsx:50`), pilote (`AiDeployment.tsx:32`) | 3 | `rounded-[2rem]`, `lg:rounded-[3.5rem]` |
| Surfaces papier de maquette (`bg-paper`, `ring-ink/10`, ombre `LIFT`) | espace de travail et destinations du hero (`AiHeroScene.tsx:108-112,340-344`), dossier mobile | 1 + 4 | positions absolues dans le plan 860 × 560 |
| Carte papier sur fond sombre | mini scène de `AiAgentTypes` (`:122`) | 1 | colonne droite `21rem` dès `lg` |
| `.paper-card` | réglages du calculateur (`AiTimeCalculator.tsx:70`) | 1 | `lg:grid-cols-[1.1fr_1fr]` |
| Bloc encre `bg-ink text-paper` | résultat du calculateur (`:113`), carte « Votre pilote » (`AiDeployment.tsx:83`) | 2 | pilote : `lg:grid-cols-[1fr_17rem]`, termes en `sm:2` puis `xl:3` colonnes |
| Lignes à filets (`divide-y`, `border-y`) | fiche de rôle, niveaux d'autonomie, quatre questions, services liés | 4 listes | pas de cartes |

---

## 6. L'appel à l'action

- **CTA unique** : « Parler de mon besoin » → `/contact`, deux fois, même libellé : dans le
  hero (`AiHeroSection.tsx:81-89`) et dans le `CTABand` final (`AgentsIAPage.tsx:75`,
  `secondary={null}` : pas de second bouton). Le test Playwright vérifie un seul lien
  `/contact` dans le bandeau final.
- **Réassurance sous le bouton du hero** : « Pilote de 30 jours, satisfait ou remboursé »
- **Réassurance du `CTABand`** : « Réponse sous 24 h » · « Premier échange gratuit » · « Pilote cadré » (`AgentsIAPage.tsx:77`) ; description « Dites-moi ce qui revient chaque jour ou chaque semaine. Je vous dirai simplement ce qui peut être préparé, automatisé ou laissé sous votre validation. » (`:74`)
- **Liens secondaires** (pas un second CTA) : « Calculer le temps que vous récupérez » → `#calcul` sous le bouton du hero (`AiHeroSection.tsx:95-101`) ; « La mémoire d'entreprise en détail » → `/rag`, visible seulement quand le besoin « Équipe » est choisi (`AiAgentTypes.tsx:146-154`, `aiPageData.ts:302`)
- **Autres sorties** : « Services liés », deux lignes éditoriales : « Vous avez surtout besoin que des outils s'enchaînent ? » → `/automatisation` · « Vous avez besoin d'un véritable outil métier ? » → `/applications` (`AgentsIAPage.tsx:22-25`). `RelatedServices` n'est plus monté sur cette page.

---

## 7. Le design en détail

- **Accents** : violet de la page sur fond papier (étiquette et icônes en `text-accent-dark`, verrou et barre de niveau en `accent-primary` / `accent-light`), cyan pour les coches, les sources et les trajets de données. Le h1 du hero utilise `.text-gradient-fluid`, les h2 `.text-gradient-strong`.
- **Rythme vertical** : alternance clair / sombre à chaque section (hero clair, rôle sombre, calcul clair, contrôle sombre, pilote clair), toutes en `section-shell-tight` ; `CTABand` en `section-shell-compact` grâce à la prop `compact` (ajoutée pour ces refontes, `components/shared/CTABand.tsx:26,41`).
- **Largeurs** : `section-container-wide` pour le hero (`AiHeroSection.tsx:47`, grille `27rem` + scène dès `xl`), `section-container` ailleurs.
- **Profondeur** : ombres `LIFT` en `color-mix` sur `--color-ink` (`AiHeroScene.tsx:49-50`), iPhone au premier plan qui avance et recule, trajets de données en SVG `pathLength`. Pas de `translateZ`, pas de halo sur les sections : le décor vient de `SectionFluidBackdrop`.
- **Typographie** : h1 jusqu'à `xl:text-[3.5rem]` ; titres de section alignés à gauche (`centered={false}`, `labelStyle="eyebrow"`) ; chiffres du calculateur en `2.4rem` à `2.9rem`.
- **Signature de la page** : le dossier actif dont les lignes changent d'état sur place, et le verrou humain qui glisse d'une étape à l'autre dans le même schéma.
- **En-tête** : `useLightHeaderZone` sur les sections claires (hero, calcul, pilote) pour garder l'en-tête lisible.

---

## 8. Sur téléphone (390 px)

- Le hero garde tout son texte ; la scène ordinateur n'est **jamais téléchargée** (`dynamic(..., { ssr: false })` et montée seulement si `mounted && !isMobile`, `AiHeroSection.tsx:15-18,107`). À la place, `AiHeroSceneMobile` (4 moments) sous le texte. Elle commence sous la ligne de flottaison (noté dans le chantier du 29/09).
- Onglets de besoins et pastilles de métiers en défilement horizontal ; fiche puis mini scène empilées.
- Calculateur : réglages puis résultat en une colonne ; curseurs en une colonne sous `sm`.
- Contrôle : le flux passe en vertical, le verrou se pose à droite de l'étape (`ml-auto`), la trajectoire SVG disparaît.
- Pilote : trajectoire verticale, carte « Votre pilote » avec termes en une colonne puis le repère de prix dessous.
- Services liés : question et lien empilés (`sm:flex-row`).

---

## 9. SEO

| | |
|---|---|
| `title` | « Assistant IA sur mesure pour votre métier » + gabarit du layout (`app/layout.tsx:31`) = « Assistant IA sur mesure pour votre métier · Solutions 2IA » (**57 caractères**) (`page.tsx:11`) |
| `description` | « Un assistant IA qui trie vos mails, prépare vos devis et met à jour votre fichier clients. Le travail répétitif en moins, données en UE. Échange gratuit. » (**153 caractères**, `page.tsx:12-13`) |
| `canonical` | `/agents-ia` (`page.tsx:20`) |
| `openGraph` | titre « Assistant IA sur mesure : un collègue numérique pour votre métier » (`page.tsx:21-27`) |
| JSON-LD | `combineSchemas(buildServiceSchema(...), buildBreadcrumbSchema(Accueil › Services › Agents IA))`, id `ld-agents-ia` (`page.tsx:31-49`) |
| Sitemap | présent (`app/sitemap.ts:44`) |
| Liens internes sortants | `/contact` (×2), `/automatisation`, `/applications`, `/rag` (onglet « Équipe »), ancre `#calcul` |

Le metadata n'a pas été retouché pour la V3 : le h1 dit « collègue numérique », le titre dit
« Assistant IA sur mesure », ce qui reste cohérent.

---

## 10. Performance

- `AiHeroSection` est dans le bundle initial ; `AiAgentTypes`, `AiTimeCalculator`, `AiAutonomy`, `AiDeployment` en `dynamic()` avec SSR conservé (`AgentsIAPage.tsx:17-20`).
- `AiHeroScene` en `dynamic(..., { ssr: false, loading: () => null })`, monté après hydratation, seulement dès `md` et hors mobile : jamais dans le chemin du LCP. Le h1 et le sous-titre peignent en CSS pur (`.hero-enter`).
- Par tier (`usePerformanceMode`) :
  - `full` : scène complète, trajets des informations vers les destinations en SVG `pathLength` et pastilles qui voyagent (`AiHeroScene.tsx:296-334`).
  - `reduced` : même histoire, mais les destinations apparaissent simplement cochées, sans trajet (`lite`, `:85,338`). `PageAtmosphere` passe en deux halos + grille discrète.
  - `minimal` et `prefers-reduced-motion` (`disableContentMotion`) : **image finale fixe** (phase 6, `FINAL_PHASE`, `aiHeroSceneData.ts:109`), la zone de travail est remplacée par l'histoire en quatre lignes horodatées (`STATIC_STORY`, `:179-184`), légende « En quatre temps : demande, vérification, validation, actions tracées. » Sur mobile : état final fixe.
- Les deux scènes se mettent en pause hors écran (`PauseOffscreen` / `useInViewPause`), quand l'onglet est caché (`visibilitychange`) et sur le bouton pause.
- Captures de contrôle des tiers : `review/agents-ia/tier-reduced-hero.png` et `tier-minimal-hero.png` (local).

---

## 11. État et suite

- **Ce qui est fait (V3, 28-29 septembre 2026)** : hero clair iPhone + dossier actif (7 phases, ~28 s) et sa version téléphone (4 moments) ; fusion des rôles (`AiAgentTypes`), de l'autonomie et de la confiance (`AiAutonomy`), du pilote et de la méthode (`AiDeployment`) ; calculateur au chiffre du visiteur ; services liés en deux lignes ; `CTABand compact`.
- **Tests** : `tests/agents-ia.spec.ts` (8 tests) : un seul h1 contenant « Vous décidez », fiche de rôle qui se reconfigure (Appels → Boîte mail), exemple qui suit le métier (Immobilier), calculateur (Devis à préparer → 183 h), verrou qui change avec le niveau, deux liens de services liés, un seul lien `/contact` dans le bandeau final, aucun débordement horizontal à 1440, 1280 et 390 px.
- **Captures locales** : `review/agents-ia/` (dossier non versionné, `/review/` dans `.gitignore:62`) : 8 captures ordinateur et 8 téléphone section par section, `animation-hero/` (8 phases + `hero-boucle.mp4`), `animation-hero-mobile/` (4 moments), captures des tiers `reduced` et `minimal`, scripts `.capture.cjs` et `.capture-fix.cjs` qui s'appuient sur `data-ai-phase`.
- **À confirmer commercialement avant mise en ligne** :
  - « Pilote de 30 jours, satisfait ou remboursé » (hero `AiHeroSection.tsx:92`) et « Arrêt possible · à tout moment, sans frais : satisfait ou remboursé » (`aiPageData.ts:399`) ;
  - « Données restituées · l'assistant est désactivé, vos données vous reviennent » (`aiPageData.ts:400`) ;
  - hébergement en France ou dans l'UE, contrat de traitement, pas d'entraînement (`aiPageData.ts:84-86`, et « données en UE » dans la description SEO).
  Ces garanties reprennent la FAQ (`lib/content/faqData.ts:225`) mais engagent l'entreprise.
- **Composants débranchés, encore sur le disque** (vérifié par recherche : plus aucun import, seulement une mention en commentaire dans `AgentsIAPage.tsx:13-16`) :
  - `AiRoleConfigurator.tsx` (261 lignes) + `aiProfilesData.ts` (195) ;
  - `AiConfidence.tsx` (110), seul lecteur de `TRUST` et `TRUST_TECH` restés dans `aiPageData.ts:340-383` ;
  - V1 : `components/scenes/ai/AIBrainScene.tsx`, `AgentAnatomyDiagram.tsx` (326), `UniversalNeedsGrid.tsx` (207), `OneAgentManyNeedsPipeline.tsx` (1043), `TrustGuardrails.tsx` (161), `ProfileCarousel.tsx` (183), qui entraîne `AgentPlan.tsx` (165) et `profilesData.tsx` (908).
  À supprimer une fois la page validée en ligne (`docs/chantiers/2026-09-29-refonte-pages-service.md`). À la suppression, retirer aussi `TRUST` et `TRUST_TECH` de `aiPageData.ts`.
- **Incohérence à corriger ailleurs** : `CLAUDE.md` (tableau des routes) annonce encore `AIBrainScene` comme scène du hero de `/agents-ia`.
- **Note de conversion** (audit du 6 septembre 2026) : **73/100** (contenu 73, design 81, conversion 69, `docs/audits/2026-09-06-conversion/agents-ia/README.md`), notée sur la page V1. Elle ne décrit plus la page actuelle : à re-noter avec `conversion-auditor`.
