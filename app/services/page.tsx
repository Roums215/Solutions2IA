import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mes services — sites web, applications, automatisations, assistant IA",
  description:
    "Cinq façons de vous faire gagner du temps : sites web (dès 500 €), applications sur mesure, automatisations entre vos outils, assistant intelligent et mémoire d'entreprise. Prix clairs, premier échange gratuit.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Mes services — sites, applications, automatisations, assistant IA",
    description:
      "Cinq services pour remplacer ce qui vous prend du temps par un outil qui le fait à votre place. Prix affichés, premier échange gratuit.",
    url: "/services",
    type: "website",
  },
};

export default function Page() {
  return <ServicesPage />;
}
