# `/<route>` · <rôle en trois mots>

> **Fiche d'état** : elle décrit la page **telle qu'elle est en ligne**, pas ce qu'on
> aimerait qu'elle devienne. Toute modification de la page met à jour cette fiche.
> Les intentions de refonte vivent dans `docs/chantiers/`, les notes dans `docs/audits/`.
>
> Dernière vérification : <date> · contre le code de `app/<route>/`

---

## 1. Ce que fait cette page

Une phrase sur son rôle, et surtout **ce qu'elle ne fait pas** (pour éviter que la page
voisine raconte la même chose).

| | |
|---|---|
| Route | `/<route>` |
| Fichiers | `app/<route>/page.tsx` (serveur, SEO) · `app/<route>/<Nom>Page.tsx` (client, rendu) |
| Preset de décor | `<preset>` |
| Public visé | … |

---

## 2. La promesse affichée

- **Titre (h1)** : « … » (texte exact)
- **Sous-titre** : « … »
- **Étiquette / badge** : « … »
- **Niveau 1 (dirigeant de PME)** : le bénéfice, en français courant
- **Niveau 2 (visiteur averti)** : où se trouve le détail technique, et sous quelle forme

---

## 3. Structure, dans l'ordre

L'ordre imposé du projet : c'est quoi · ce que ça apporte · comment ça marche · pour qui ·
l'étape suivante.

| # | Question | Section affichée | Composant (fichier) | Ce que le visiteur retient |
|---|---|---|---|---|
| 1 | c'est quoi | … | `PageHero` | … |
| 2 | ce que ça apporte | … | … | … |
| … | | | | |
| n | l'étape suivante | … | `CTABand` | … |

---

## 4. Schémas et animations

Pour chaque schéma de la page :

| Schéma | Fichier | Ce qu'il montre | Comportement mobile | Tier bas |
|---|---|---|---|---|
| … | … | … | … | … |

Rappel du projet : un schéma pédagogique ne se supprime pas, il se refait en mieux.

---

## 5. Surfaces et cartes

| Famille | Où | Nombre | Grille |
|---|---|---|---|
| `SpotlightCard` · `.glass-surface` · `.glass-bubble` · `.surface-card` · `.metric-tile` · carte maison · papier | … | … | `grid …` |

Préciser ce qui est passé au verre et ce qui reste opaque volontairement.

---

## 6. L'appel à l'action

- **CTA unique** : libellé exact, destination, où il se trouve
- **Réassurance sous le bouton** : « … »
- **Liens secondaires** (ils ne comptent pas comme un second CTA) : …
- **Autres sorties de la page** : liens internes vers … (minimum deux)

---

## 7. Le design en détail

- **Accents** : couleurs du preset, ce qu'elles soulignent
- **Rythme vertical** : shells utilisés, alternance des sections
- **Largeurs** : `section-container` / `-narrow` / `-reading` / `-wide`
- **Profondeur** : halos, ombres, `translateZ`, panneaux flottants
- **Typographie** : tailles de titres, particularités de la page
- **Ce qui fait la signature de cette page** : ce qu'on ne retrouve nulle part ailleurs

---

## 8. Sur téléphone (390 px)

Ce qui change, ce qui se simplifie, ce qui disparaît, et pourquoi.

---

## 9. SEO

| | |
|---|---|
| `title` | « … » (n caractères, suffixe compris) |
| `description` | « … » (n caractères) |
| `canonical` | `/<route>` |
| JSON-LD | … |
| Liens internes sortants | … |

---

## 10. Performance

- Sections en `dynamic()` : …
- Comportement par tier (`full` / `reduced` / `minimal`) : …
- Points sensibles de la page : …

---

## 11. État et suite

- **Ce qui est fait** : …
- **Ce qui reste** : renvoi vers `docs/chantiers/…` si un chantier est ouvert
- **Note de conversion** (audit du 6 septembre 2026) : …/100
