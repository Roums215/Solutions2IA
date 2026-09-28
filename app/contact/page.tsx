import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Me contacter : réponse sous 24 h, gratuit",
  description:
    "Décrivez votre situation avec vos mots, sans dossier ni jargon. Réponse sous 24 h avec une première idée, gratuite et sans engagement. Site, application, IA.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Me contacter : réponse sous 24 h, gratuit",
    description:
      "Décrivez votre situation avec vos mots. Réponse sous 24 h, gratuit, sans engagement.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}
