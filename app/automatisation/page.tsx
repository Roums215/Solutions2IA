import type { Metadata } from "next";
import { AutomatisationPage } from "./AutomatisationPage";

export const metadata: Metadata = {
  title: "Automatisation sur mesure — vos tâches répétitives se font toutes seules",
  description:
    "Je relie vos logiciels entre eux pour supprimer ressaisies, relances et transferts manuels. Exemple réel : appels de prospection → fiches clients, automatiquement. Premier échange gratuit.",
  alternates: { canonical: "/automatisation" },
  openGraph: {
    title: "Automatisation — ce qui se répète peut se faire tout seul",
    description:
      "Je relie vos logiciels entre eux pour supprimer ressaisies et relances manuelles. Premier échange gratuit.",
    url: "/automatisation",
    type: "website",
  },
};

export default function Page() {
  return <AutomatisationPage />;
}
