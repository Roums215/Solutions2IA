import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Me contacter : réponse sous 24 h, premier échange gratuit",
  description:
    "Dites-moi ce qui vous prend du temps. Je reviens vers vous sous 24 h avec une première idée, gratuitement et sans engagement. Site web, application, automatisation ou assistant IA.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Me contacter : réponse sous 24 h, premier échange gratuit",
    description:
      "Décrivez votre situation avec vos mots. Réponse sous 24 h, gratuit, sans engagement.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}
