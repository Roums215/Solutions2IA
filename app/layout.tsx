import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/shared/AppShell";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  BRAND,
} from "@/lib/seo/constants";
import {
  buildOrganizationSchema,
  buildProfessionalServiceSchema,
  buildWebSiteSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "agence digitale française",
    "applications métier sur mesure",
    "agents IA souverains",
    "RAG entreprise",
    "automatisation Axonaut JobPhoning",
    "hébergement souverain UE",
    "audit application 30 jours",
    "Mistral Claude Anthropic",
    "Chorus Pro facture électronique 2026",
    "Ségur santé DPI",
    "eCMR ePOD logistique",
    "TRS OEE industrie",
    "CRM Hoguet immobilier",
  ],
  authors: [{ name: "Iulian Ionita", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    creator: "@solutions2ia",
    site: "@solutions2ia",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  // Vérification Google Search Console : poser GOOGLE_SITE_VERIFICATION sur
  // Vercel (le code fourni par GSC, méthode « balise HTML »).
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: BRAND.primary,
  colorScheme: "dark",
};

/**
 * Anti-flash perf : pose <html data-perf> AVANT le premier paint, en miroir du
 * calcul statique du store (usePerformanceMode) + tier FPS persisté en session.
 * Sans risque d'hydration mismatch : React ne diffe pas data-perf sur <html>.
 * ⚠️ Garder les seuils synchronisés avec lib/animation/usePerformanceMode.ts.
 */
const PERF_TIER_INLINE_SCRIPT = `try{var f=sessionStorage.getItem("s2ia-fps-tier");var n=navigator,c=n.connection||{};var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;var sl=/^(slow-2g|2g|3g)$/.test(c.effectiveType||"");var lo=(n.deviceMemory&&n.deviceMemory<=4)||(n.hardwareConcurrency&&n.hardwareConcurrency<=4);var st=(rm||c.saveData||sl)?"minimal":(lo||matchMedia("(max-width: 767px)").matches||matchMedia("(pointer: coarse)").matches)?"reduced":"full";var rk={full:0,reduced:1,minimal:2};var t=(f&&rk[f]>rk[st])?f:st;document.documentElement.setAttribute("data-perf",t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const graph = combineSchemas(
    buildOrganizationSchema(),
    buildProfessionalServiceSchema(),
    buildWebSiteSchema(),
  );

  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PERF_TIER_INLINE_SCRIPT }} />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <JsonLd schema={graph} id="ld-graph-root" />
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
