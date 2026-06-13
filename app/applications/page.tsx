import type { Metadata } from "next";
import { ApplicationsPage } from "./ApplicationsPage";

export const metadata: Metadata = {
  title: "Applications métier sur mesure — un outil simple, fait pour votre travail",
  description:
    "Je construis l'application web et mobile qui remplace vos fichiers Excel et votre papier : une seule, simple, pensée pour votre métier. Exemple réel : une plateforme de rapports d'intervention. Premier échange gratuit.",
  alternates: { canonical: "/applications" },
  openGraph: {
    title: "Applications sur mesure — un outil fait pour votre métier",
    description:
      "Je remplace vos fichiers éparpillés par une application simple, accessible partout, reliée à vos outils. Premier échange gratuit.",
    url: "/applications",
    type: "website",
  },
};

export default function Page() {
  return <ApplicationsPage />;
}
