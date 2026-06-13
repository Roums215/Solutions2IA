import type { Metadata } from "next";
import { AgentsIAPage } from "./AgentsIAPage";

export const metadata: Metadata = {
  title: "Assistant IA sur mesure — un collègue numérique pour votre métier",
  description:
    "Je conçois un assistant intelligent qui trie vos mails, prépare vos devis, met à jour votre fichier clients et répond à vos clients. Il fait le travail répétitif, vous gardez la main. Données en Europe. Premier échange gratuit.",
  alternates: { canonical: "/agents-ia" },
  openGraph: {
    title: "Assistant IA sur mesure — un collègue numérique pour votre métier",
    description:
      "Un assistant qui connaît votre métier, relié à vos outils, sous votre contrôle. Premier échange gratuit.",
    url: "/agents-ia",
    type: "website",
  },
};

export default function Page() {
  return <AgentsIAPage />;
}
