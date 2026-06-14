import type { Metadata } from "next";
import { SitesWebPage } from "./SitesWebPage";

export const metadata: Metadata = {
  title: "Création de site web — un site qui vous amène des clients (dès 500 €)",
  description:
    "Je crée des sites web clairs, rapides et bien trouvés sur Google : de la simple vitrine au site relié à vos outils (réservation, espace client, paiement). À partir de 500 €. Premier échange gratuit.",
  alternates: { canonical: "/sites-web" },
  openGraph: {
    title: "Création de site web — un site qui vous amène des clients",
    description:
      "Un site qui accueille vos visiteurs et vous transmet chaque demande. De la vitrine au site connecté. Dès 500 €, premier échange gratuit.",
    url: "/sites-web",
    type: "website",
  },
};

export default function Page() {
  return <SitesWebPage />;
}
