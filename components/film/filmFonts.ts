import { DM_Serif_Display, JetBrains_Mono, Manrope, Sora } from "next/font/google";

/* Polices du film hero (design_handoff_hero_film) : Sora porte toute la hiérarchie,
 * Manrope les interfaces, JetBrains Mono les étiquettes et le CTA, DM Serif Display
 * le site « Atelier Norda » du chapitre 04.
 *
 * preload: false : aucune ne doit concurrencer le LCP (le h1 en Geist). Le navigateur
 * ne les télécharge que lorsqu'un texte les utilise ; les métriques de repli calculées
 * par next/font limitent le décalage au moment de l'échange. */

const sora = Sora({ subsets: ["latin"], variable: "--font-film-sora", preload: false });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-film-manrope", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-film-mono", preload: false });
const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-film-serif",
  preload: false,
});

/** Classes qui déclarent les quatre variables CSS : à poser sur l'ancêtre du film et de son CTA. */
export const filmFontVariables = [sora.variable, manrope.variable, mono.variable, serif.variable].join(" ");
