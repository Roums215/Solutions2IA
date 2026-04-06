import type { Metadata } from "next";
import { AProposPage } from "./AProposPage";

export const metadata: Metadata = {
  title: "À propos",
  description: "Solutions 2IA — Studio digital spécialisé en intelligence artificielle, développement web et automatisation. Notre vision, notre méthode.",
};

export default function Page() {
  return <AProposPage />;
}
