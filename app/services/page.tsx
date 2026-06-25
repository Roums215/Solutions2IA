import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mes services — sites web, applications, automatisations, assistant IA",
  description:
    "Sites web, applications sur mesure, automatisations et IA pour PME : cinq façons de remplacer ce qui vous prend du temps. Prix clairs, premier échange gratuit.",
  keywords: [
    "développeur web indépendant France",
    "site web application automatisation IA PME",
    "prestataire digital sur mesure",
    "développeur freelance tout-en-un",
  ],
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
  const schema = combineSchemas(
    buildServiceSchema({
      name: "Développeur web & IA indépendant",
      description:
        "Sites web, applications métier, automatisations et IA sur mesure pour PME et ETI. Prix clairs, premier échange gratuit.",
      url: "/services",
      serviceType: "Services numériques sur mesure",
      audience: "PME et ETI",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-services" />
      <ServicesPage />
    </>
  );
}
