import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { SitesWebPage } from "./SitesWebPage";

export const metadata: Metadata = {
  title: "Création de site web : un site qui vous amène des clients (dès 500 €)",
  description:
    "Sites web clairs, rapides et bien référencés sur Google : de la vitrine au site connecté (réservation, espace client, paiement). Dès 500 €, échange gratuit.",
  keywords: [
    "création site web PME",
    "site vitrine professionnel dès 500 €",
    "développeur site web Next.js",
    "site web référencé Google",
  ],
  alternates: { canonical: "/sites-web" },
  openGraph: {
    title: "Création de site web : un site qui vous amène des clients",
    description:
      "Un site qui accueille vos visiteurs et vous transmet chaque demande. De la vitrine au site connecté. Dès 500 €, premier échange gratuit.",
    url: "/sites-web",
    type: "website",
  },
};

export default function Page() {
  const schema = combineSchemas(
    buildServiceSchema({
      name: "Création de site web",
      description:
        "Sites web vitrines et connectés (réservation, espace client, paiement), rapides et optimisés pour le référencement Google. À partir de 500 €.",
      url: "/sites-web",
      serviceType: "Création de site web",
      audience: "PME et indépendants",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Sites web", url: "/sites-web" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-sites-web" />
      <SitesWebPage />
    </>
  );
}
