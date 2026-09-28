# `/contact` · prise de contact

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : 18 septembre 2026 · contre le code de `app/contact/` et
> `app/api/contact/route.ts`

---

## 1. Ce que fait cette page

Elle transforme l'intérêt en message envoyé. C'est la dernière marche du site : le
formulaire, pas un `CTABand`, est le CTA de la page.

Elle ne fait pas : elle ne présente pas les services (renvoi implicite vers `/services`
via le site), elle ne raconte pas le parcours d'Iulian (`/a-propos`), et elle ne détaille
pas les garanties techniques d'un agent IA (`/agents-ia`).

| | |
|---|---|
| Route | `/contact` |
| Fichiers | `app/contact/page.tsx` (serveur, SEO) · `app/contact/ContactPage.tsx` (client) · `app/api/contact/route.ts` (envoi) |
| Preset de décor | `contact` |
| Public visé | visiteur convaincu, prêt à écrire, qui hésite encore sur la forme du message |

---

## 2. La promesse affichée

- **Titre (h1)** : « Dites-moi ce qui vous prend du temps » (`app/contact/ContactPage.tsx:139`)
- **Sous-titre** : « Pas besoin de savoir ce qu'il vous faut. Décrivez votre situation
  avec vos mots : je reviens vers vous sous 24 h avec une première idée, gratuitement et
  sans engagement. » (`ContactPage.tsx:140`)
- **Étiquette / badge** : « Disponible pour de nouveaux projets » (`ContactPage.tsx:138`)
- **Niveau 1 (dirigeant de PME)** : sa peur principale (« je ne sais pas quoi demander »)
  est levée dès la première phrase du h1 et du sous-titre ; le formulaire ne demande que
  3 champs obligatoires
- **Niveau 2 (visiteur averti)** : la FAQ intégrée donne les fourchettes de prix exactes,
  les délais par type de projet et les conditions de sortie (pilote 30 jours)

Le hero ne porte aucun bouton (ni `primaryCta` ni `secondaryCta` ne sont passés à
`PageHero`, `ContactPage.tsx:137-141`) : la section suivante, le formulaire, fait office
de première action.

---

## 3. Structure, dans l'ordre

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | Hero « Dites-moi ce qui vous prend du temps » | `PageHero` sans CTA (`ContactPage.tsx:136-141`) | la barrière du « je ne sais pas quoi dire » est levée |
| 2 | l'étape suivante (formulaire = CTA) | « Qu'est-ce qui vous amène ? » + formulaire | section `#formulaire` (`ContactPage.tsx:144-292`) | remplir le formulaire est simple et rapide |
| 3 | comment ça marche | « Ce qui se passe dans les jours qui suivent » | 4 cartes `processSteps` (`ContactPage.tsx:294-329`) | les 4 étapes après l'envoi, rien n'engage avant la proposition |
| 4 | pour qui / objections | « Les questions qu'on me pose souvent » | FAQ en accordéon, 5 questions (`ContactPage.tsx:331-358`) | prix, délai, niveau technique, sortie, après-livraison |
| 5 | sortie alternative | « Vous préférez écrire directement ? » | bloc email direct (`ContactPage.tsx:360-378`) | l'email `contact@solutions2ia.fr` fonctionne aussi |

Il n'y a pas de `CTABand` en fin de page. C'est cohérent avec la règle du CTA unique :
la page entière ne pousse que vers un seul geste, l'envoi du formulaire.

---

## 4. Schémas et animations

Pas de schéma pédagogique SVG. Deux connecteurs animés relient visuellement des étapes,
sans valeur explicative propre :

| Élément | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| `railReveal` : trait horizontal entre deux cartes du processus | `ContactPage.tsx:79-82`, `:313-319` | continuité entre les 4 étapes post-envoi | caché (`hidden xl:block`), visible à partir de `xl` seulement | `scaleX`/`opacity`, conforme à la règle transform/opacity |
| `threadReveal` : fil vertical entre les 3 points du guide de rédaction | `ContactPage.tsx:84-87`, `:274-279` | continuité entre les repères « pour un bon premier message » | reste visible, la colonne passe simplement sous le formulaire | `scaleY`/`opacity`, conforme |
| `SectionParticles` (`dots`, `grid-dots`) | `ContactPage.tsx:145`, `:296` | texture de fond du formulaire et de la section processus | densité réduite en interne | `reduced` : 4 points max · `minimal` : rien |

L'audit du 6 septembre 2026 mentionnait un `PremiumFlowPanel` en h3 (« Quelques mots bien
choisis suffisent ») à cet endroit : il n'existe plus dans le code actuel. Il a été
remplacé par le bloc `<aside>` « Pour un bon premier message » à 3 points (`briefHints`,
`ContactPage.tsx:66-70`, `:267-288`), affiché à côté du formulaire en desktop.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `.section-intro-panel` (glass) | panneau du formulaire (`ContactPage.tsx:152`) | 1 | pleine largeur, `lg:grid-cols-[minmax(0,1fr)_17rem]` en interne (formulaire + guide) |
| Carte maison `card-shine` (`bg-bg-card/60`) | 4 étapes du processus post-envoi (`ContactPage.tsx:320`) | 4 | `grid sm:grid-cols-2 xl:grid-cols-4` |
| `<details>` accordéon (`bg-bg-card/60`) | FAQ (`ContactPage.tsx:342`) | 5 | liste verticale (`space-y-4`) |
| Carte maison `card-shine` (`bg-bg-card/50`) | bloc email direct (`ContactPage.tsx:368`) | 1 | pleine largeur, centrée |

Aucun `SpotlightCard` ni `metric-tile` sur cette page : l'inventaire du chantier verre le
confirme (0 SpotlightCard, 0 metric-tile, 3 familles de cartes maison,
`docs/chantiers/2026-09-17-cartes-verre.md:175`).

---

## 6. L'appel à l'action

- **CTA unique** : bouton « Envoyer mon message » (type `submit`) dans le formulaire,
  libellé « Envoi… » pendant l'envoi (`ContactPage.tsx:225-230`). C'est le seul CTA
  cliquable et volontaire de la page (pas de bouton dans le hero, pas de `CTABand`)
- **Réassurance sous le bouton** : « Réponse sous 24 h · gratuit · sans engagement · prix
  fixé avant de démarrer » (`ContactPage.tsx:231`), et en bas de page « Réponse sous 24 h
  du lundi au vendredi · premier appel de 45 minutes gratuit, sans engagement »
  (`ContactPage.tsx:375`)
- **Liens secondaires** : aucun. Le fichier `ContactPage.tsx` n'importe pas `next/link` :
  le seul autre point de contact est le lien `mailto:contact@solutions2ia.fr`
  (`ContactPage.tsx:245`, `:371-373`), qui est un lien externe (email), pas interne
- **Autres sorties de la page** : **aucune, dans le contenu propre de la page.** Ni le
  hero (pas de `secondaryCta`), ni le formulaire, ni le processus, ni la FAQ, ni le bloc
  email ne contiennent de `<Link>` interne. Les seuls liens internes disponibles sur cette
  page viennent du header et du footer globaux (`components/layout/Footer.tsx`,
  `lib/content/navigation.ts:24-45`), communs à tout le site. Voir section 9 pour ce que
  ça implique pour la règle SEO du projet.

---

## 7. Le design en détail

- **Accents** : preset `contact`, un halo central « pulse chaud » en plus des deux orbes
  standard (`components/shared/PageAtmosphere.tsx:334-350`)
- **Rythme vertical** : `section-shell-tight` pour le formulaire (rapproché du hero,
  `scroll-mt-24` pour l'ancre `#formulaire`), `section-shell` pour processus et FAQ,
  `section-shell-compact` pour le bloc email final
- **Largeurs** : `section-container-narrow` pour le formulaire, `section-container` pour
  le processus, `section-container-reading` pour la FAQ et le bloc email
- **Profondeur** : le panneau de formulaire est le seul élément en glass (`.section-intro-panel`) ; les cartes du processus et le bloc email utilisent `card-shine` sans `translateZ`
- **Typographie** : h1 standard `PageHero`, mais **premier h2 de la page dans le
  formulaire lui-même** (« Qu'est-ce qui vous amène ? », `ContactPage.tsx:158`), avant le
  `SectionHeading` du processus : pas de saut de niveau détecté dans le code actuel
- **Ce qui fait la signature de cette page** : le champ « type de projet » sous forme de
  boutons à bascule (`aria-pressed`), avec l'option assumée « Je ne sais pas encore »
  (`ContactPage.tsx:12-18`) au même rang que les autres choix

---

## 8. Sur téléphone (390 px)

Pas de scène de hero ici non plus (`visual` non fourni à `PageHero`). Le formulaire passe
en une colonne : la grille `lg:grid-cols-[minmax(0,1fr)_17rem]` retombe sur `grid`
(colonne unique), donc le guide « Pour un bon premier message » s'affiche **sous** le
formulaire au lieu d'à côté. Le bouton d'envoi passe en pleine largeur
(`w-full sm:w-auto`) et la ligne de réassurance reste **au-dessus** du bouton grâce à
`flex-col-reverse` (`ContactPage.tsx:224`), pour qu'elle ne soit jamais coupée par le clavier
virtuel. Les 4 cartes du processus passent de `sm:grid-cols-2` à une colonne sur les plus
petits écrans.

---

## 9. SEO

| | |
|---|---|
| `title` | « Me contacter : réponse sous 24 h, gratuit » (41 caractères, 57 avec le suffixe ` · Solutions 2IA`) (`app/contact/page.tsx:5`) |
| `description` | 157 caractères (`app/contact/page.tsx:6-7`) |
| `canonical` | `/contact` (`app/contact/page.tsx:8`) |
| JSON-LD | **aucun.** `app/contact/page.tsx` ne rend ni `<JsonLd>` ni `combineSchemas` : c'est un écart à la règle du projet (« un JSON-LD via `combineSchemas` » pour toute nouvelle page), d'autant plus visible que la page contient une FAQ qui pourrait porter un schéma `FAQPage` comme `/faq` |
| Liens internes sortants | **zéro dans le contenu de la page** (voir section 6). C'est un écart à la règle « au moins 2 liens internes sortants » si on l'applique au contenu propre de la page ; le header et le footer globaux compensent partiellement, mais aucun lien contextuel (vers `/services`, `/agents-ia` ou `/a-propos`) n'existe dans le corps de `/contact` |

---

## 10. Performance

- Sections en `dynamic()` : aucune, page entièrement cliente comme `/a-propos`
- Comportement par tier : géré par `PageAtmosphere` et `SectionParticles` en interne
  (voir section 4) ; le formulaire lui-même n'a pas de comportement dépendant du tier
- Points sensibles : la soumission du formulaire est un `fetch` classique côté client
  (`ContactPage.tsx:114-131`) vers `/api/contact` ; aucun impact LCP puisque le hero
  n'a pas de visuel et que le formulaire est sous le pli

---

## 11. État et suite

- **Ce qui est fait** : mise en œuvre du 7 septembre 2026 (FAQ enrichie à 5 questions
  dont le pilote 30 jours, étape « On s'appelle 45 minutes » ajoutée au processus,
  description SEO recalibrée à 157 caractères)
- **Ce qui reste** : chantier ouvert `docs/chantiers/2026-09-17-cartes-verre.md`, rang 8
  sur 9 avec `/a-propos`, statut « à faire » ; aucun JSON-LD sur la page (à corriger,
  voir section 9) ; aucun lien interne contextuel dans le corps de la page (voir
  section 6 et 9)
- **Note de conversion** (audit du 6 septembre 2026) : 76/100 (contenu 83, design 71,
  conversion 74), meilleure page du site avec `/automatisation` à cette date. L'audit
  précède plusieurs changements déjà présents dans le code actuel (voir « Ce qui est
  fait ») et précise lui-même que sa note doit être « re-notée » ; ce n'est pas encore
  fait, à vérifier avec `conversion-auditor`. Le manque que l'audit soulignait
  (« aucune raison d'agir maintenant ») reste vrai dans le code actuel : rien ne date
  ni ne limite l'offre.

---

## Le formulaire, en détail

**Champs** (`ContactPage.tsx:180-220`) :

| Champ | Type | Obligatoire | Autocomplete | Remarque |
|---|---|---|---|---|
| `nom` | texte | oui | `name` | |
| `email` | email | oui | `email` | |
| `entreprise` | texte | non | `organization` | |
| `budget` | select | non | (aucun) | 6 options, défaut « Je préfère en parler » |
| `message` | textarea (6 lignes) | oui | (aucun) | |
| type de projet | boutons à bascule, un seul actif | non (implicite) | (aucun) | 5 options dont « Je ne sais pas encore » (`serviceOptions`, `ContactPage.tsx:12-18`) |
| `website` | texte caché | non, doit rester vide | `off` | honeypot anti-spam, `tabIndex={-1}`, `aria-hidden` (`ContactPage.tsx:182-189`) |

**Validation côté client** : attributs HTML natifs (`required`, `type="email"`) et
désactivation du bouton pendant l'envoi (`disabled={status === "sending"}`,
`ContactPage.tsx:225`).

**Envoi** : `POST /api/contact` en JSON (`ContactPage.tsx:113-118`). Traité par
`app/api/contact/route.ts` :

1. Corps JSON invalide → 400 « Requête invalide. » (`route.ts:34-39`)
2. Honeypot rempli → répond `{ ok: true }` sans rien envoyer, pour ne pas alerter le bot
   (`route.ts:42-44`)
3. Validation serveur : nom ≥ 2 caractères, email conforme à une regex simple, message
   ≥ 5 caractères, sinon 422 avec message dédié (`route.ts:54-62`)
4. Si `RESEND_API_KEY` absente → 503 « L'envoi n'est pas encore activé. Écrivez-moi
   directement par email en attendant. » (`route.ts:64-70`)
5. Envoi de la notification à Iulian via Resend (`route.ts:100-116`) : en cas d'échec
   (exception ou `error` renvoyée par Resend), 502 « L'envoi a échoué. Réessayez ou
   écrivez-moi directement par email. »
6. Accusé de réception au visiteur, **best-effort** : si cet envoi échoue, l'erreur est
   seulement journalisée (`console.warn`) et ne fait pas échouer la requête
   (`route.ts:127-142`)
7. Réponse finale `{ ok: true }` si tout s'est bien passé

**Variables d'environnement** (`route.ts:4-22`) :

| Variable | Statut | Défaut | Rôle |
|---|---|---|---|
| `RESEND_API_KEY` | **requise** | aucun | sans elle, le formulaire répond toujours une erreur 503 |
| `CONTACT_TO_EMAIL` | optionnelle | `ionita.iulian215@gmail.com` | adresse qui reçoit les demandes |
| `CONTACT_FROM_EMAIL` | optionnelle | `Solutions 2IA <onboarding@resend.dev>` | expéditeur ; pour que l'accusé de réception arrive vraiment chez les visiteurs, le domaine `solutions2ia.fr` doit être vérifié sur Resend |

**Ce que voit le visiteur en cas d'erreur** : un bandeau rouge avec le message d'erreur
retourné par l'API (ou un message générique en cas de coupure réseau), suivi d'un lien
`mailto:contact@solutions2ia.fr` (`ContactPage.tsx:242-247`). En cas de succès, un
bandeau vert : « Merci, votre message est bien parti. Je vous réponds sous 24 h, du lundi
au vendredi. » (`ContactPage.tsx:236-241`), le formulaire est réinitialisé
(`form.reset()`) et le type de projet sélectionné est désélectionné. Le conteneur du
retour est `aria-live="polite"` (`ContactPage.tsx:235`).

---

## La FAQ de la page

5 questions en accordéon (`faq`, `ContactPage.tsx:27-64`), chacune avec plusieurs
paragraphes de réponse :

1. **Combien ça coûte ?** Fourchettes complètes : site vitrine simple dès 500 €, site
   premium 1 000 à 2 500 €, site relié aux outils métier 2 500 à 5 000 €, application sur
   mesure 1 500 à 15 000 €. Prix des automatisations/IA renvoyé au premier échange.
2. **En combien de temps ?** Site simple : quelques jours à deux semaines. Site premium :
   deux à six semaines. Application : quelques semaines à quelques mois.
3. **Je ne suis pas du tout technique, c'est un problème ?** Non, traduire le besoin en
   solution est le métier d'Iulian.
4. **Et si ça ne me convient pas ?** Pilote 30 jours satisfait ou remboursé pour un agent
   IA ; pour un site ou une application, rien n'est engagé avant la proposition.
5. **Et après la mise en ligne ?** Iulian reste joignable, suivi régulier possible.

Aucune de ces 5 questions ne porte de balisage `FAQPage` (JSON-LD), contrairement à
`/faq` qui en a un (voir section 9). Note de conversion détaillée : section 11.
