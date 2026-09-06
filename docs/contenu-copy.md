# Contenu & copy

> Les règles d'écriture du site. Elles viennent du client et **priment sur tout le reste** :
> une page magnifique qui les enfreint est une page à refaire.

---

## 1. Le positionnement

**Développeur indépendant français, solo, en démarrage.** Le public : des dirigeants de PME
qui ne connaissent pas l'IA. On vend **une méthode et une promesse concrète**, pas un palmarès.

Le démarrage est une force (proximité, disponibilité, soin), jamais une excuse.

---

## 2. Les six règles non négociables

### 1. « je », jamais « nous »
Pas de « notre équipe », pas de « nos clients », pas de « nous accompagnons ».
La personne qui comprend le besoin est celle qui construit : c'est l'argument de vente.

### 2. Zéro preuve inventée
Pas de client fictif, pas de témoignage, pas de logo emprunté, pas de statistique
non sourçable. Les seuls chiffres autorisés : ceux que le client a validés
(fourchettes de prix, délais de réponse), et les projets réellement faits
(DFT télécoms, Ramsay Santé).

### 3. Pas de tiret cadratin « — » dans le texte visible
Demande explicite du client : « ça fait IA ». Concerne **tout** ce qui s'affiche :
pages, metadata, titres, FAQ, articles, emails, `llms.txt`.

| Au lieu de « — » | Utiliser |
|---|---|
| incise explicative | deux-points `:` |
| respiration | virgule `,` |
| aparté | parenthèses `( )` |
| séparateur de titre ou de label | point médian `·` |
| fourchette | « 500 à 2 500 € » |

*Les commentaires de code peuvent en garder.*

### 4. Le jargon ne reste jamais seul
Deux mécanismes :
- **le remplacer** par le mot simple (colonne « simple » de `lib/content/glossaire.ts`) ;
- **le garder et l'expliquer** en une phrase (`<TermeExplique k="rag">`, souligné pointillé, bulle au survol / tap / focus).

Pour les explications longues (intégrations, sécurité, API) : un volet « détails techniques » repliable.

### 5. Ton anti-IA
Court. Une idée par bloc. Du blanc plutôt que du texte. Ça doit sonner comme
quelqu'un qui explique en face, pas comme une plaquette.

**Interdits** : « solutions innovantes », « révolutionner », « à l'ère de l'IA »,
« libérez votre potentiel », « dans un monde où… », les énumérations par trois,
les phrases à rallonge.

### 6. La structure imposée
Chaque page, dans l'ordre : **c'est quoi · ce que ça vous apporte · comment ça marche ·
pour qui · l'étape suivante**. Et **un seul appel à l'action par page**.

---

## 3. La double lecture

Le site parle à deux lecteurs en même temps :

| Niveau | Pour qui | Où ça vit |
|---|---|---|
| **1. Bénéfice** | le dirigeant de PME | le texte courant, toujours visible, zéro jargon |
| **2. Technique** | le profil qui veut vérifier | un volet repliable, un tooltip, un tableau détaillé |

Le niveau 2 ne doit jamais gêner la lecture du niveau 1.

**Exemples déjà en place** : `/faq` (`<details>` natifs, le modèle de référence),
`/contact` (FAQ), `/rag` (assistant de décision), `/sites-web` (`WebPainBusiness`, bascule),
home (`HomeApproachSplit`, volet technique).

---

## 4. Le glossaire

`lib/content/glossaire.ts` est la **source unique** des définitions : une clé stable
en kebab-case, le terme affiché, le mot simple de remplacement, la définition en une phrase.

15 termes : `ia` · `agent-ia` · `rag` · `automatisation` · `workflow` · `webhook` ·
`api` · `crm` · `n8n` · `dashboard` · `hebergement-souverain` · `rgpd` · `llm` ·
`site-connecte` · `seo`.

`lib/content/glossairePage.ts` ajoute, pour la page `/glossaire`, un paragraphe détaillé
et un lien de maillage (`seeAlso`) vers le service concerné. Fort levier GEO : les IA citent
les définitions, et ces `seeAlso` donnent à `/glossaire` **8 routes sortantes**.

> C'est le modèle à copier. `/faq`, avec ses 30 réponses sur les agents IA, le RAG, le RGPD,
> les applications et l'automatisation, n'a que **2 liens sortants** (`/contact`, `/services`)
> et ne renvoie vers aucune page pilier. Ajouter un `seeAlso` par catégorie de FAQ est le gain
> de maillage interne le plus rapide du site.

> Le composant `components/ui/TermeExplique.tsx` (tooltip pédagogique accessible :
> focus clavier, `aria-describedby`, cible tactile ≥ 44 px) existe mais **n'est actuellement
> branché nulle part**. Le rebrancher dans le texte courant est le moyen le plus rapide
> d'appliquer la règle 4.

---

## 5. Où se trouve le contenu

Le contenu est séparé du rendu : on réécrit un texte sans toucher au composant.

| Fichier | Contenu |
|---|---|
| `lib/content/faqData.ts` | 30 questions, 5 catégories, réponses de 60 à 180 mots |
| `lib/content/glossaire.ts` | 15 définitions courtes (source des tooltips) |
| `lib/content/glossairePage.ts` | versions longues + maillage, pour `/glossaire` |
| `lib/content/articles/articles.tsx` | 7 articles complets (gabarit typé) |
| `lib/content/navigation.ts` | menu principal et pied de page |
| `components/sections/*/xxxData.ts` | le contenu de chaque section, par page |
| `components/shared/relatedServicesData.tsx` | les liens croisés entre services |
| `public/llms.txt` | le résumé du site pour les IA |

---

## 6. Le vocabulaire de marque

| On dit | On ne dit pas |
|---|---|
| assistant IA, collègue numérique | agent conversationnel, chatbot IA |
| mémoire d'entreprise | RAG (sauf entre parenthèses, une fois) |
| tâches qui se font toutes seules | orchestration de workflows |
| fichier clients | CRM (sauf avec le nom de l'outil) |
| données hébergées en Europe | souveraineté numérique |
| site relié à vos outils | site connecté headless |
| premier échange gratuit | audit offert, consultation stratégique |

---

## 7. Avant de publier

- [ ] Zéro « nous », zéro « notre »
- [ ] Zéro chiffre non validé
- [ ] Zéro tiret cadratin dans le texte visible
- [ ] Chaque terme technique est soit remplacé, soit expliqué
- [ ] La page suit l'ordre des cinq questions
- [ ] Un seul appel à l'action
- [ ] **Les compteurs affichés correspondent à la réalité.** Deux erreurs vivent actuellement
      en ligne : `/articles` annonce « Cinq guides » pour 7 articles, et la home annonce
      « Six services » pour 5 (dans le `h2` **et** dans l'`aria-label`)
- [ ] `title` sous 60 caractères suffixe compris, `description` de 150 à 160

Vérification rapide des tirets cadratins dans le contenu visible :

```bash
grep -rn '—' --include='*.tsx' --include='*.ts' --include='*.txt' app lib public \
  | grep -vE ':\s*(\*|//|/\*|\{/\*)'
```
