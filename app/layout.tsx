import type { Metadata } from "next";
import { AppShell } from "@/components/shared/AppShell";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Solutions 2IA — Expériences digitales intelligentes",
    template: "%s — Solutions 2IA",
  },
  description:
    "Sites web, applications, agents IA, automatisation et expériences visuelles premium. Solutions digitales modernes, performantes et sur mesure.",
  keywords: [
    "agence digitale", "développement web", "intelligence artificielle",
    "automatisation", "UI design", "UX design", "agents IA",
    "Next.js", "applications web",
  ],
  openGraph: {
    title: "Solutions 2IA — Expériences digitales intelligentes",
    description: "Solutions digitales modernes, performantes et sur mesure.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
