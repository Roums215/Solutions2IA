import type { Metadata } from "next";
import { AProposPage } from "./AProposPage";

export const metadata: Metadata = {
  title: "Qui je suis : Iulian, développeur indépendant derrière Solutions 2IA",
  description:
    "Développeur indépendant (projets DFT télécoms, Ramsay Santé). Sites, applications et automatisations sur mesure. France, Belgique, Suisse, Luxembourg.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "Qui je suis : Iulian, développeur indépendant",
    description:
      "Sites, applications et automatisations sur mesure. Un seul interlocuteur : la personne qui comprend votre besoin est celle qui construit.",
    url: "/a-propos",
    type: "website",
  },
};

export default function Page() {
  return <AProposPage />;
}
