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
  // verification: { google: "TODO_GSC_VERIFICATION_CODE" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: BRAND.primary,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const graph = combineSchemas(
    buildOrganizationSchema(),
    buildProfessionalServiceSchema(),
    buildWebSiteSchema(),
  );

  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className="bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <JsonLd schema={graph} id="ld-graph-root" />
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
