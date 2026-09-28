# `/faq` · objections désamorcées d'avance

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 2026-09-18 · contre le code de `app/faq/` et `lib/content/faqData.ts`

---

## 1. Ce que fait cette page

Lever, en une seule page dense, les objections qui bloquent une prise de contact (fiabilité
d'un agent IA, RAG vs fine-tuning, sécurité RGPD, méthode, prix) et nourrir le référencement sur
ces questions réelles. Elle ne vend pas un service en particulier : chaque catégorie renvoie
vers la page qui approfondit (`seeAlso`). Ce n'est pas une page de contenu long format comme
`/articles` : les réponses font 60 à 180 mots (commentaire du fichier source, ligne 2).

| | |
|---|---|
| Route | `/faq` |
| Fichiers | `app/faq/page.tsx` (serveur, SEO) · `app/faq/FaqPage.tsx` (client, rendu) |
| Preset de décor | `services` (`app/faq/FaqPage.tsx:12`) |
| Public visé | Un visiteur déjà intéressé qui cherche à lever un doute précis avant de contacter |

---

## 2. La promesse affichée

- **Titre (h1)** : « Les vraies questions qu'on me pose en premier rendez-vous. »
  (`app/faq/FaqPage.tsx:16-21`)
- **Sous-titre** : dynamique, `` `${FAQ_ITEMS.length} réponses courtes sur les agents IA, les
  applications sur mesure, la mémoire d'entreprise (RAG), la sécurité de vos données, la
  méthode et les prix. Sans jargon.` `` (`app/faq/FaqPage.tsx:22`), soit actuellement
  **« 32 réponses courtes... »**.
- **Étiquette / badge** : « FAQ » (`app/faq/FaqPage.tsx:15`)
- **Niveau 1 (dirigeant de PME)** : 32 réponses courtes, groupées par sujet, sans jargon.
- **Niveau 2 (visiteur averti)** : réponses chiffrées et sourcées (seuils de confiance,
  fourchettes de prix, dates réglementaires), ton « wiki-déclaratif » pensé pour être cité par
  une IA (commentaire `lib/content/faqData.ts:2`, boost GEO).

---

## 3. Structure, dans l'ordre

Pas de sections au sens `SpotlightCard`/`SectionHeading` habituel : la page est un document à
deux colonnes (sommaire collant + contenu), pattern volontairement différent du reste du site.

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 0 | (hero) | Promesse + CTA | `PageHero` | 32 réponses courtes, sans jargon |
| 1 à 5 | c'est quoi / comment ça marche / objections | 5 catégories : Agents IA, Applications métier, RAG & mémoire métier, Sécurité & RGPD, Méthode & pricing | `app/faq/FaqPage.tsx:57-123`, données `lib/content/faqData.ts` | Chaque catégorie répond à un bloc d'objections précis, puis renvoie vers la page qui approfondit |
| n | l'étape suivante | CTA final | `CTABand` | « Une autre question ? Demandez-moi. » → `/contact` |

Le sommaire (`nav aria-label="Sommaire FAQ"`, `app/faq/FaqPage.tsx:30-54`) est collant en
desktop (`lg:sticky lg:top-28`) et liste les 5 catégories avec leur description courte.

---

## 4. Schémas et animations

Aucun schéma animé sur cette page : c'est la seule des quatre pages de cette fiche à ne pas
utiliser `motion` ni `usePerformanceMode` dans son fichier client (vérifié : aucune de ces deux
chaînes n'apparaît dans `app/faq/FaqPage.tsx`). L'unique dynamique visuelle est l'accordéon HTML
natif `<details>/<summary>` avec chevron SVG qui pivote (`group-open:rotate-180`,
`app/faq/FaqPage.tsx:85-107`) : une transition CSS, pas du JS de scène.

| Élément | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| Accordéon de question | `app/faq/FaqPage.tsx:85-107` | `<details>` natif, pastille numérotée, chevron qui pivote à l'ouverture | Identique (déjà tactile, cible `min-h-` implicite via `py-4`) | Non concerné, aucune animation JS à dégrader |

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| Carte « maison » (`<details>` : `rounded-xl border-border-subtle bg-bg-card/50 backdrop-blur-sm`) | Une par question, dans chaque catégorie | 32 | Liste verticale (`space-y-3`), pas de grille multi-colonnes |
| Lien de nav (sommaire) | Sidebar collante | 5 (une par catégorie) | Liste verticale (`space-y-1.5`) |

Aucune `SpotlightCard`, aucun `.metric-tile`, aucune `.surface-card` sur cette page : c'est la
page du site avec la famille de carte la plus sobre, cohérent avec son rôle de documentation
plutôt que de vitrine. `SectionHeading` n'est pas utilisé non plus : chaque catégorie a son
propre en-tête « maison » (numéro + `h2` + description, `app/faq/FaqPage.tsx:67-80`), une
exception au pattern `SectionHeading` + `SpotlightCard` du reste du site.

---

## 6. L'appel à l'action

- **CTA unique** : « Premier échange gratuit », présent dans le hero (`href: "/contact"`,
  `app/faq/FaqPage.tsx:23`) et répété comme `primaryLabel` du `CTABand` final
  (`app/faq/FaqPage.tsx:134`, hérite du `primaryHref` par défaut `/contact` de
  `components/shared/CTABand.tsx:22`).
- **Réassurance sous le bouton** : celle par défaut de `CTABand` : « Réponse sous 24 h ·
  Premier échange offert · Sans engagement ».
- **Liens secondaires** (ils ne comptent pas comme un second CTA) : bouton secondaire du hero
  « Voir les services » → `/services` ; sommaire à 5 ancres.
- **Autres sorties de la page** : un lien « Pour aller plus loin » par catégorie
  (`app/faq/FaqPage.tsx:111-119`), vers `/agents-ia`, `/applications`, `/rag`,
  `/rag#vos-donnees` et `/services` (`seeAlso` de chaque catégorie,
  `lib/content/faqData.ts:22-49`) : 5 liens sortants au total, un par catégorie. Pas de
  `RelatedServices`.

---

## 7. Le design en détail

- **Accents** : preset `services` (indigo + cyan classiques), rien de spécifique à cette page.
- **Rythme vertical** : une seule grande `section-shell` contenant les deux colonnes
  (`app/faq/FaqPage.tsx:27`), pas d'alternance de shells comme sur les pages vitrines.
- **Largeurs** : `section-container` en grille `lg:grid-cols-[260px_1fr]` ; la colonne de
  contenu est bornée à `max-w-[46rem]` pour la lisibilité longue durée.
- **Profondeur** : aucune (pas de halo, pas de tilt, pas de `translateZ`) : page volontairement
  plate, cohérente avec son rôle documentaire.
- **Typographie** : `h2` de catégorie à `text-2xl sm:text-[1.7rem]` (plus petit que les
  `SectionHeading` habituels à `text-3xl sm:text-4xl lg:text-[3.1rem]`), `h3` de question à
  `text-[15px]` : hiérarchie resserrée pour une page dense en texte.
- **Ce qui fait la signature de cette page** : le sommaire collant à deux niveaux (catégories
  dans la sidebar, questions numérotées dans le contenu) et l'usage de `<details>` HTML natif
  plutôt que d'un composant motion, unique sur le site.

---

## 8. Sur téléphone (390 px)

- La grille `lg:grid-cols-[260px_1fr]` repasse en une seule colonne (`grid-cols-1`) : le
  sommaire des catégories s'affiche **avant** les questions, non collant (le `lg:sticky` ne
  s'applique qu'à partir de `lg`).
- Les pastilles numérotées et le padding des `<summary>` respectent une cible tactile d'environ
  44 px de hauteur.
- Le hero n'a pas de `visual`, donc pas de `MobileHeroPreview` : texte centré uniquement.
- Rien d'autre ne change : la page n'a pas d'animation à dégrader sur mobile.

---

## 9. SEO

| | |
|---|---|
| `title` | « FAQ : agents IA, applications, RAG, prix » (40 caractères, 56 avec le suffixe ` · Solutions 2IA`) |
| `description` | « 32 questions : comment un agent IA évite d'inventer, RAG ou fine-tuning, hébergement en Europe, pilote 30 jours, prix et délais. Réponses courtes et chiffrées. » (159 caractères) |
| `canonical` | `/faq` |
| JSON-LD | `combineSchemas(buildFaqSchema(FAQ_ITEMS...), buildBreadcrumbSchema(...))` → `FAQPage` (32 `Question`/`Answer`) + `BreadcrumbList` |
| Liens internes sortants | `/contact` (CTA), et 5 liens `seeAlso` (un par catégorie) |

**Point de vigilance** : la `description` de `app/faq/page.tsx:9-10` code en dur « 32 questions »
alors que le sous-titre affiché à l'écran calcule dynamiquement `FAQ_ITEMS.length`
(`app/faq/FaqPage.tsx:22`). Les deux chiffres coïncident aujourd'hui (32 = 32), mais si
`FAQ_ITEMS` change à nouveau, seule la métadonnée statique restera à mettre à jour à la main.

---

## 10. Performance

- Sections en `dynamic()` : aucune (page légère, pas de scène ni de méga-section).
- Comportement par tier : **non concerné**. `app/faq/FaqPage.tsx` n'importe pas
  `usePerformanceMode` : la page ne dépend d'aucun tier de performance, l'accordéon fonctionne en
  CSS/HTML pur.
- Points sensibles : aucun identifié. C'est, avec `/glossaire`, la page la plus légère en JS
  client parmi les quatre couvertes par cette fiche.

---

## 11. État et suite

- **Ce qui est fait** : 32 questions réparties en 5 catégories, schema `FAQPage` conforme à ce
  qui est affiché, un lien de sortie par catégorie, page légère sans dépendance de performance.
- **Ce qui reste** :
  - Le couplage entre le texte de métadonnée statique (« 32 questions ») et le compteur
    dynamique affiché à l'écran (`FAQ_ITEMS.length`) n'est pas automatique : à surveiller à
    chaque ajout de question (voir section 9).
  - Aucun renvoi transversal de type `RelatedServices` en fin de page : les seules sorties sont
    les 5 liens `seeAlso`, un par catégorie, et le CTA final.
- **Note de conversion** (audit du 6 septembre 2026) : **69/100** (Contenu 77, Design 66,
  Conversion 65). L'audit indiquait alors « 2765 mots visibles · 5 catégories · 30 questions » ;
  le nombre de questions est passé à 32 depuis (fichier `lib/content/faqData.ts` modifié après
  l'audit, non encore commité au moment de cette fiche). Verdict de l'audit : « correcte, mais
  elle ne déclenche pas la décision » : 30 (aujourd'hui 32) réponses solides et chiffrées, qui ne
  renvoyaient vers aucune page de service avant l'ajout des liens `seeAlso`. Voir
  `docs/audits/2026-09-06-conversion/faq/README.md`.
