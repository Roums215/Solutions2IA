# ASTRA_START_HERE.md

# Mission

Tu travailles sur **Solutions 2IA**, un site vitrine premium Next.js 15 / React 19 / TypeScript strict / Tailwind v4.

Ta mission n'est **pas** de refaire tout le site en une fois.

Tu dois d'abord :
1. comprendre l'existant ;
2. auditer la page d'accueil et le design system ;
3. me poser les questions qui empêchent une bonne décision ;
4. proposer 2 ou 3 directions maximum ;
5. attendre ma validation ;
6. implémenter ensuite par lots courts et vérifiables.

Le site doit devenir plus :
- premium ;
- lisible ;
- blanc / clair ;
- moderne ;
- espacé ;
- crédible ;
- moins "effet IA" ;
- plus proche d'un produit SaaS haut de gamme / studio digital ;
- plus simple à comprendre pour un dirigeant non technique.

---

# À lire avant toute modification

Dans cet ordre :

1. `CLAUDE.md`
2. `AGENTS.md`
3. `README.md`
4. `docs/anatomie-page.md`
5. `docs/design-system.md`
6. `docs/contenu-copy.md`
7. `docs/performance.md`
8. `docs/seo-geo.md`
9. `docs/pages/accueil.md`
10. `docs/pages/services.md`
11. `docs/pages/sites-web.md`
12. `docs/pages/applications.md`
13. `docs/pages/agents-ia.md`
14. `docs/pages/automatisation.md`
15. `docs/pages/rag.md`

Lis aussi les fichiers de la homepage réellement utilisés dans le code :
- `app/page.tsx`
- `components/hero/HeroSection.tsx`
- `components/hero/HeroFilm.tsx`
- `components/film/**`
- les sections de `components/sections/home/**`
- le header / navbar
- les composants partagés réellement réutilisés

Ne te contente pas de la documentation si le code raconte autre chose.

---

# Règle importante

**Ne commence pas à coder immédiatement.**

Ta première réponse doit contenir :

## 1. Ce que tu as compris
- rôle actuel de la homepage ;
- services présentés ;
- structure actuelle ;
- systèmes visuels actuels ;
- composants à conserver ;
- problèmes de densité / répétition / incohérence.

## 2. Ce que tu recommandes de conserver
Sépare :
- contenu ;
- SEO ;
- architecture ;
- composants ;
- animations ;
- signature de marque.

## 3. Ce que tu recommandes de changer
Sépare :
- hero ;
- sections ;
- couleurs ;
- surfaces ;
- typographie ;
- rythme vertical ;
- responsive ;
- animation ;
- performance.

## 4. Les risques
Exemples :
- casser le LCP ;
- ajouter trop de JS ;
- dupliquer les composants ;
- refaire des pages qui fonctionnent ;
- transformer chaque section en démonstration animée ;
- dégrader le SEO ;
- introduire de nouvelles libs inutiles ;
- rendre le site "AI generated".

## 5. Tes questions
Pose uniquement les questions qui changent vraiment le résultat.
Maximum 8 questions.

## 6. Tes 2 ou 3 directions
Pour chaque direction :
- nom ;
- principe ;
- hero ;
- couleurs ;
- scène visuelle ;
- rythme des sections ;
- avantages ;
- risques.

Puis **STOP**.

Ne code rien avant ma validation explicite.

---

# Direction visuelle déjà souhaitée

Le site doit tendre vers :

- majorité de sections claires / blanches ;
- noir, anthracite ou bleu très sombre uniquement pour des sections fortes ;
- violet / indigo / cyan comme accents, pas comme fond permanent ;
- beaucoup plus d'espace ;
- cartes sobres ;
- bordures légères ;
- ombres fines ;
- grandes démonstrations produit ;
- animations utiles et narratives ;
- interface crédible et réaliste ;
- moins de glassmorphism ;
- moins de particules ;
- moins de glow partout ;
- aucun "effet dashboard IA générique".

On veut une impression :
**produit premium + logiciel réel + motion design contrôlé**.

---

# Header / navbar

Le logo animé actuel est **une création sur mesure à conserver**.

Tu peux améliorer :
- spacing ;
- contraste ;
- état sticky ;
- fond / blur ;
- menu desktop ;
- menu mobile ;
- transitions.

Mais :
- ne remplace pas le logo animé ;
- ne réécris pas son animation si elle fonctionne ;
- ne le transforme pas en simple SVG statique ;
- ne modifie sa logique qu'en cas de bug démontré.

---

# Principe d'exécution

On travaille dans cet ordre :

1. audit
2. questions
3. proposition
4. validation
5. homepage seulement
6. header + hero + première grande section
7. review
8. tests
9. validation
10. seulement ensuite le reste de l'accueil

Ne touche pas aux autres pages pendant le premier lot.
