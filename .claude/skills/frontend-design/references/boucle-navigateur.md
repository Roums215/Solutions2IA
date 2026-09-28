# La boucle navigateur

Comment regarder le vrai site avant et après avoir touché au code.
Tout ce qui suit a été vérifié sur ce dépôt le 17 septembre 2026.

---

## 1. Démarrer le site

```bash
pnpm dev          # port 4500
```

Deux pièges maison :

- **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne** : le build écrase le
  `.next` du serveur de dev et casse le site en local.
- Si un autre projet occupe déjà le port 4500, ne le tue pas : `pnpm exec next dev -p 4510`.
  Jamais `:4000` à `:4299` (Studio Video) ni `:3000` à `:3202` (AgentAI, BuildingPartnersOS) :
  voir `docs/ports-et-processus.md`.

Si la page affiche `Cannot read properties of undefined (reading 'call')`, ce n'est
presque jamais le code : c'est le cache. Rechargement forcé du navigateur, et si ça
persiste, serveur arrêté puis `rm -rf .next`.

---

## 2. Retrouver le composant à partir de ce qu'on voit

Le problème numéro un du design assisté : « cet élément me dérange, il est dans lequel
des 300 fichiers ? ». En développement, React garde le lien. Sélectionne l'élément dans
DevTools (il devient `$0`), puis :

```js
(() => {
  const el = $0; // ou document.querySelector("…")
  const cle = Object.keys(el).find((k) => k.startsWith("__reactFiber$"));
  if (!cle) return "aucun fiber : build de production";
  const STOP = /^(SegmentViewNode|OuterLayoutRouter|InnerLayoutRouter|AppRouter|ServerRoot|Root)$/;
  const BRUIT = /^(LinkComponent|MotionComponent|MotionDOMComponent|Primitive|Slot|.*Context|.*Provider)$/;
  const noms = [];
  for (let f = el[cle]; f; f = f.return) {
    const t = f.type;
    const n = (typeof t === "function" || typeof t === "object") && t ? t.displayName || t.name : null;
    if (n && STOP.test(n)) break;
    if (n && /^[A-Z]/.test(n) && !BRUIT.test(n) && !noms.includes(n)) noms.push(n);
  }
  return noms;
})();
```

Retours réels sur l'accueil :

| Élément visé | Réponse |
|---|---|
| `h1` | `["HeroSection"]` |
| le film du hero | `["HeroFilm", "HeroSection"]` |
| un titre de carte, 3ᵉ section | `["TransformationCard", "HomeTransformationFlows"]` |
| un lien du pied de page | `["Footer", "AppShell"]` |

Puis du nom au fichier :

```bash
grep -rln "function TransformationCard\|const TransformationCard" components/ app/
# components/sections/home/HomeTransformationFlows.tsx
```

Le premier nom est le composant local, le suivant la section qui le porte. C'est là
qu'on édite, et nulle part ailleurs.

---

## 3. Ce qu'on regarde avec Chrome DevTools MCP

Sur la page ouverte, avant de proposer quoi que ce soit :

- **Styles calculés** de l'élément : la valeur réelle, pas celle qu'on croit avoir écrite.
- **Dimensions et débordement** : un `getBoundingClientRect()` vaut mieux qu'une intuition.
- **Console** : une erreur d'hydratation invalide toute lecture du rendu.
- **Réseau** : ce que la page télécharge vraiment (un chunk de scène qui part sur mobile
  est un bug, pas un détail).
- **Lighthouse** pour un avant/après quand le changement est lourd.

Deux erreurs connues du site, déjà présentes, à ne pas confondre avec une régression :
l'avertissement d'hydratation sur `data-perf` (posé par le script anti-flash du layout)
et l'écart d'hydratation de `PageHero` sur `/services`.

---

## 4. Les deux largeurs, à chaque fois

| Largeur | Ce qu'on vérifie |
|---|---|
| **1440 px** | la composition : hiérarchie, densité, alignement sur la grille du header, le pli |
| **390 px** | l'empilement, les débordements, la taille de frappe des boutons, le texte qui ne casse pas |

Le site n'a pas le droit de défiler horizontalement. Un `overflow-x` visible à 390 px est
un P0.

Sur les grandes largeurs (1920 px), vérifier aussi que la section ne se disloque pas :
le hero de l'accueil a un conteneur propre (`.section-container-wide`), le reste du site
est en `.section-container` (1280 px).

---

## 5. Playwright MCP : uniquement s'il y a une interaction

Pas pour regarder une page (DevTools suffit), mais pour :

- cliquer, ouvrir un menu, dérouler une FAQ, envoyer un formulaire ;
- vérifier le focus clavier et l'ordre de tabulation ;
- comparer plusieurs tailles d'écran dans la foulée ;
- rejouer `tests/homepage.spec.ts`.

Piège connu du dépôt, déjà documenté en mémoire : pour une capture pleine page, forcer
`scroll-behavior: auto` et faire défiler par paliers, sinon les sections animées au
défilement paraissent vides et on croit à un bug qui n'existe pas.

Autre piège vécu : le navigateur piloté par MCP garde un profil persistant. Après un
`rm -rf .next`, il peut rejouer d'anciens fichiers et afficher une erreur qui n'existe
plus. En cas de doute, relancer la vérification dans un contexte neuf :

```bash
node -e "import('@playwright/test').then(async ({chromium}) => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('http://localhost:4500/'); await p.waitForTimeout(5000);
  console.log(await p.evaluate(() => document.querySelectorAll('main section').length));
  await b.close();
})"
```

---

## 6. Le texte réellement affiché

Pour juger le contenu (et pas les commentaires du code) :

```bash
curl -s http://localhost:4500/<route> \
  | sed 's/<script[^>]*>.*<\/script>//g;s/<style[^>]*>.*<\/style>//g;s/<[^>]*>/\n/g' \
  | sed 's/^[[:space:]]*//' | grep -v '^$'
```

Si le texte extrait est vide alors que la page renvoie 200, l'arbre React ne monte pas :
ouvrir un navigateur avant de conclure quoi que ce soit.

---

## 7. Avant de dire que c'est fini

```bash
npx tsc --noEmit
pnpm lint
pnpm exec playwright test tests/homepage.spec.ts --reporter=list   # si l'accueil est touché
```

Et le contrôle qui ne se voit pas dans un test : **le LCP**. `PageHero` et `HeroSection`
peignent leur `h1` en CSS pur (`.hero-enter`) avant l'hydratation, et `PageTransition` a
`initial={false}`. Y remettre une animation JS depuis `opacity: 0` fait passer le LCP de
1,8 s à environ 8 s. Si une proposition touche à ça, elle est refusée.
