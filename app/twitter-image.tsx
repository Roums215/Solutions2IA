// Réutilise le même rendu que opengraph-image (1200x630 fonctionne pour Twitter aussi).
// `runtime` n'est pas réexporté : Next ne lit ce champ que s'il est écrit en littéral
// dans le fichier (sinon avertissement à chaque compilation). Runtime Node par défaut,
// comme avant : l'image reste générée une fois au build.
export { default, alt, size, contentType } from "./opengraph-image";
