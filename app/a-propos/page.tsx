import type { Metadata } from "next";
import { AProposPage } from "./AProposPage";

export const metadata: Metadata = {
  title: "À propos de Solutions 2IA : agence digitale française IA, web, automatisation",
  description:
    "Solutions 2IA : studio digital français spécialisé en agents IA souverains, applications métier sur mesure, RAG entreprise et automatisation. Notre méthode et nos valeurs.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos — Solutions 2IA, agence digitale française",
    description:
      "Studio digital français : agents IA, apps métier, RAG, automatisation. Notre méthode.",
    url: "/a-propos",
    type: "website",
  },
};

export default function Page() {
  return <AProposPage />;
}
