import type { ReactNode } from "react";

/**
 * Liens croisés CONTEXTUELS entre services — pour que le visiteur explore
 * sans se perdre. Chaque page renvoie vers 2 services qui ont du sens à côté,
 * avec une phrase « pourquoi ça pourrait vous intéresser ».
 */

export interface RelatedLink {
  href: string;
  title: string;
  hook: string; // une ligne, bénéfice concret
  icon: ReactNode;
}

const ICONS: Record<string, ReactNode> = {
  "sites-web": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
  ),
  applications: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>
  ),
  automatisation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  "agents-ia": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="9" cy="16" r="1" fill="currentColor" /><circle cx="15" cy="16" r="1" fill="currentColor" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  ),
  rag: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6c2-1 5-1 7 0v13c-2-1-5-1-7 0V6z" /><path d="M21 6c-2-1-5-1-7 0v13c2-1 5-1 7 0V6z" /></svg>
  ),
};

const L = {
  "sites-web": { href: "/sites-web", title: "Site web", icon: ICONS["sites-web"] },
  applications: { href: "/applications", title: "Application sur mesure", icon: ICONS.applications },
  automatisation: { href: "/automatisation", title: "Automatisation", icon: ICONS.automatisation },
  "agents-ia": { href: "/agents-ia", title: "Assistant IA", icon: ICONS["agents-ia"] },
  rag: { href: "/rag", title: "Mémoire d'entreprise", icon: ICONS.rag },
};

/** Clé = route courante (sans slash). Valeur = 2 liens contextuels. */
export const RELATED: Record<string, RelatedLink[]> = {
  "sites-web": [
    { ...L.applications, hook: "Quand un site ne suffit plus : un vrai outil pour votre métier." },
    { ...L.automatisation, hook: "Reliez votre site à vos outils : les demandes arrivent toutes seules." },
  ],
  applications: [
    { ...L.automatisation, hook: "Faites dialoguer votre application avec vos autres logiciels." },
    { ...L["agents-ia"], hook: "Ajoutez un assistant qui travaille dans votre application." },
  ],
  automatisation: [
    { ...L["agents-ia"], hook: "Allez plus loin : un assistant qui décide et agit, pas juste qui transfère." },
    { ...L.applications, hook: "Besoin d'un outil complet ? Une application sur mesure pour votre métier." },
  ],
  "agents-ia": [
    { ...L.rag, hook: "Donnez-lui une mémoire : il répond avec vos documents." },
    { ...L.automatisation, hook: "Automatisez ce qui l'entoure pour qu'il travaille en autonomie." },
  ],
  rag: [
    { ...L["agents-ia"], hook: "Un assistant qui s'appuie sur cette mémoire pour vous répondre." },
    { ...L.applications, hook: "Intégrez cette mémoire dans un outil simple pour vos équipes." },
  ],
};
