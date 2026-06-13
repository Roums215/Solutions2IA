import type { ReactNode } from "react";

/**
 * Logos de marques en SVG inline — reconnaissables, zéro dépendance, zéro asset
 * réseau (règle projet : tout en SVG/CSS, pas d'images de décor, pas de lib
 * lourde). Marques tierces affichées à titre de compatibilité (PLAYBOOK : les
 * outils tiers gardent leur identité pour rester crédibles et reconnaissables).
 *
 * Chaque logo est dessiné dans un viewBox 24×24, sans dimension fixe : la taille
 * est pilotée par le conteneur (`w-…`/`h-…`). `aria-hidden` — le nom textuel
 * accompagne toujours le logo.
 */

export interface BrandLogo {
  name: string;
  /** Couleur d'accent dominante (pour halo/anneau du conteneur). */
  tint: string;
  svg: ReactNode;
}

const wrap = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden focusable="false">
    {children}
  </svg>
);

export const BRAND_LOGOS = {
  gmail: {
    name: "Gmail",
    tint: "234,67,53",
    svg: wrap(
      <>
        <path d="M2 6.5A1.5 1.5 0 0 1 3.5 5h.6L12 11l7.9-6h.6A1.5 1.5 0 0 1 22 6.5V18a1 1 0 0 1-1 1h-2V9.2l-7 5.3-7-5.3V19H3a1 1 0 0 1-1-1V6.5Z" fill="#EA4335" />
        <path d="M2 6.5A1.5 1.5 0 0 1 3.5 5h.6L12 11 4 17V6.5Z" fill="#C5221F" opacity="0.0" />
        <path d="M19 9.2 22 7V6.5A1.5 1.5 0 0 0 20.5 5h-.6L12 11l-7.9-6h-.6A1.5 1.5 0 0 0 2 6.5V7l3 2.2V19h14V9.2Z" fill="#EA4335" />
        <path d="M2 6.5 12 14 22 6.5V18a1 1 0 0 1-1 1h-2V9.4L12 14.6 5 9.4V19H3a1 1 0 0 1-1-1V6.5Z" fill="#EA4335" />
        <path d="M5 19V9.4L12 14.6 19 9.4V19H5Z" fill="#fff" opacity="0.0" />
      </>,
    ),
  },
  outlook: {
    name: "Outlook",
    tint: "0,120,212",
    svg: wrap(
      <>
        <rect x="10" y="5" width="11" height="14" rx="1" fill="#0A2767" opacity="0.0" />
        <rect x="2.5" y="6.5" width="11" height="11" rx="2.4" fill="#0078D4" />
        <text x="8" y="15.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">O</text>
        <rect x="13.6" y="7" width="7.9" height="10" rx="0.8" fill="#0078D4" opacity="0.85" />
        <path d="M13.6 8.2 17.5 11l3.9-2.6V7.8a.8.8 0 0 0-.8-.8h-6.2a.8.8 0 0 0-.8.8v.4Z" fill="#fff" opacity="0.9" />
      </>,
    ),
  },
  "google-calendar": {
    name: "Google Agenda",
    tint: "66,133,244",
    svg: wrap(
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" fill="#fff" />
        <rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="#DADCE0" strokeWidth="0.8" />
        <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H4V8Z" fill="#4285F4" />
        <rect x="6" y="3.5" width="1.6" height="3.4" rx="0.8" fill="#4285F4" />
        <rect x="16.4" y="3.5" width="1.6" height="3.4" rx="0.8" fill="#4285F4" />
        <text x="12" y="17.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#4285F4" fontFamily="Arial, sans-serif">31</text>
      </>,
    ),
  },
  "google-sheets": {
    name: "Google Sheets",
    tint: "15,157,88",
    svg: wrap(
      <>
        <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" fill="#0F9D58" />
        <path d="M14 3l5 5h-5V3Z" fill="#0B7A45" />
        <rect x="8.5" y="11" width="7" height="6" rx="0.5" fill="#fff" />
        <path d="M8.5 13.2h7M8.5 15.2h7M11.8 11v6" stroke="#0F9D58" strokeWidth="0.7" />
      </>,
    ),
  },
  notion: {
    name: "Notion",
    tint: "120,120,120",
    svg: wrap(
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="#fff" />
        <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="#111" strokeWidth="0.9" />
        <path d="M8 8.2v7.6M8 8.2l8 7.6M16 8.2v7.6" stroke="#111" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>,
    ),
  },
  slack: {
    name: "Slack",
    tint: "74,21,75",
    svg: wrap(
      <>
        <path d="M9.5 13.5a1.6 1.6 0 1 1-1.6-1.6h1.6v1.6Z" fill="#E01E5A" />
        <path d="M10.4 13.5a1.6 1.6 0 0 1 3.2 0v4a1.6 1.6 0 0 1-3.2 0v-4Z" fill="#E01E5A" />
        <path d="M10.5 9.5a1.6 1.6 0 1 1 1.6-1.6v1.6h-1.6Z" fill="#36C5F0" />
        <path d="M10.5 10.4a1.6 1.6 0 0 1 0 3.2h-4a1.6 1.6 0 0 1 0-3.2h4Z" fill="#36C5F0" />
        <path d="M14.5 10.5a1.6 1.6 0 1 1 1.6 1.6h-1.6v-1.6Z" fill="#2EB67D" />
        <path d="M13.6 10.5a1.6 1.6 0 0 1-3.2 0v-4a1.6 1.6 0 0 1 3.2 0v4Z" fill="#2EB67D" />
        <path d="M13.5 14.5a1.6 1.6 0 1 1-1.6 1.6v-1.6h1.6Z" fill="#ECB22E" />
        <path d="M13.5 13.6a1.6 1.6 0 0 1 0-3.2h4a1.6 1.6 0 0 1 0 3.2h-4Z" fill="#ECB22E" />
      </>,
    ),
  },
  whatsapp: {
    name: "WhatsApp",
    tint: "37,211,102",
    svg: wrap(
      <>
        <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" fill="#25D366" />
        <path d="M9.2 8.1c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5l-.7-1.6Z" fill="#fff" />
      </>,
    ),
  },
  stripe: {
    name: "Stripe",
    tint: "99,91,255",
    svg: wrap(
      <>
        <rect x="3" y="4.5" width="18" height="15" rx="3" fill="#635BFF" />
        <text x="12" y="15.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif" fontStyle="italic">S</text>
      </>,
    ),
  },
  hubspot: {
    name: "HubSpot",
    tint: "255,122,89",
    svg: wrap(
      <>
        <circle cx="9" cy="14.5" r="3.3" fill="#FF7A59" />
        <circle cx="16" cy="9" r="2.3" fill="none" stroke="#FF7A59" strokeWidth="1.5" />
        <path d="M16 11.3v1.4M11.8 13.2l1.6-1.3M16 6.7V4.5" stroke="#FF7A59" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="16" cy="3.6" r="1.1" fill="#FF7A59" />
      </>,
    ),
  },
  shopify: {
    name: "Shopify",
    tint: "150,191,72",
    svg: wrap(
      <>
        <path d="M14.4 5.2c-.1 0-1.7.1-1.7.1l-1.2-1.2c-.1-.1-.4-.1-.5-.1l-.6.2c-.4-1-.9-1.4-1.7-1.4-.6 0-1.1.4-1.5 1-.6-.2-1.1-.1-1.3.6L4.4 16.8 11 18l5-1.1-1.6-11.7Z" fill="#95BF47" />
        <path d="M11 4.1c-.2 0-.5.1-.7.2 0-.1 0-.2-.1-.3-.2-.5-.5-.8-.9-.9.5.1.9.7 1.1 1.5l.6-.5Z" fill="#5E8E3E" />
        <path d="M13 9.4s-.7-.4-1.5-.4c-1.2 0-1.3.8-1.3 1 0 1.1 2.8 1.5 2.8 4 0 1.9-1.2 3.2-2.9 3.2-2 0-3-1.3-3-1.3l.5-1.8s1 .9 1.9.9c.6 0 .8-.5.8-.8 0-1.4-2.3-1.5-2.3-3.8 0-1.9 1.4-3.7 4.1-3.7 1.1 0 1.6.3 1.6.3L13 9.4Z" fill="#fff" />
      </>,
    ),
  },
  drive: {
    name: "Google Drive",
    tint: "30,142,62",
    svg: wrap(
      <>
        <path d="M8.2 4 3 13l2.6 4.5 5.2-9L8.2 4Z" fill="#0066DA" />
        <path d="M15.8 4H8.2l5.2 9h7.6L15.8 4Z" fill="#00AC47" />
        <path d="M21 13h-7.6l-2.6 4.5h7.6L21 13Z" fill="#FFBA00" transform="translate(0 0)" />
        <path d="M13.4 13 10.8 8.5l-5.2 9h7.6L13.4 13Z" fill="#EA4335" opacity="0.0" />
        <path d="M5.6 17.5 8.2 13h5.2l-2.6 4.5H5.6Z" fill="#2684FC" opacity="0.0" />
      </>,
    ),
  },
  excel: {
    name: "Excel",
    tint: "33,115,70",
    svg: wrap(
      <>
        <path d="M13.5 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5L13.5 4Z" fill="#fff" stroke="#DADCE0" strokeWidth="0.6" />
        <path d="M13.5 4 19 9.5h-5.5V4Z" fill="#E6E6E6" />
        <rect x="3" y="8" width="8.5" height="8.5" rx="1" fill="#217346" />
        <path d="M5.4 10.4 9.1 14M9.1 10.4 5.4 14" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      </>,
    ),
  },
  // ── Outils français sans logo iconique : marque neutre + initiale ──
  jobphoning: {
    name: "JobPhoning",
    tint: "34,211,238",
    svg: wrap(
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="rgb(34,211,238)" strokeWidth="1.4" />
        <path d="M9 8.2c-.2-.4-.4-.4-.6-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.2 1.4 2.3 3.5 3.1 1.7.7 2.1.6 2.5.5.4 0 1.2-.5 1.3-1 .2-.4.2-.8.1-.9 0-.1-.2-.2-.5-.3l-1.1-.5c-.2-.1-.3 0-.4.1l-.5.6c-.1.1-.2.1-.4.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.2-1.2-1.4 0-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4L9 8.2Z" fill="rgb(34,211,238)" />
      </>,
    ),
  },
  axonaut: {
    name: "Axonaut",
    tint: "129,140,248",
    svg: wrap(
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="rgb(129,140,248)" strokeWidth="1.4" />
        <path d="M8 16 12 7l4 9M9.6 12.6h4.8" stroke="rgb(129,140,248)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>,
    ),
  },
  n8n: {
    name: "n8n",
    tint: "234,76,137",
    svg: wrap(
      <>
        <circle cx="5" cy="12" r="2.1" fill="#EA4C89" />
        <circle cx="12" cy="8" r="2.1" fill="#EA4C89" />
        <circle cx="12" cy="16" r="2.1" fill="#EA4C89" />
        <circle cx="19" cy="12" r="2.1" fill="#EA4C89" />
        <path d="M6.8 11 10.4 8.6M6.8 13l3.6 2.4M13.6 8.6 17.2 11M13.6 15.4 17.2 13" stroke="#EA4C89" strokeWidth="1.2" strokeLinecap="round" />
      </>,
    ),
  },
} as const satisfies Record<string, BrandLogo>;

export type BrandKey = keyof typeof BRAND_LOGOS;
