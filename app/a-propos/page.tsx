import type { Metadata } from "next";
import { AProposPage } from "./AProposPage";

export const metadata: Metadata = {
  title: "Qui je suis — Iulian, développeur indépendant derrière Solutions 2IA",
  description:
    "Développeur indépendant formé en ingénierie du web, j'ai travaillé sur des projets pour DFT (télécoms) et Ramsay Santé. Je conçois sites, applications et automatisations sur mesure. Disponible, proche, prix accessibles.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "Qui je suis — Iulian, développeur indépendant",
    description:
      "Sites, applications et automatisations sur mesure. Un seul interlocuteur : la personne qui comprend votre besoin est celle qui construit.",
    url: "/a-propos",
    type: "website",
  },
};

export default function Page() {
  return <AProposPage />;
}
