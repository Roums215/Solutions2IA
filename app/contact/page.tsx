import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Solutions 2IA : audit gratuit 45 min · réponse sous 24h",
  description:
    "Démarrez votre projet IA, application métier ou automatisation : 45 minutes pour cadrer votre besoin, identifier les premiers gains et choisir la voie. Premier échange offert.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Audit gratuit 45 minutes",
    description:
      "Premier échange offert, réponse sous 24h. Cadrons votre projet IA, app métier ou automatisation.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}
