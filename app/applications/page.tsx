import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { ApplicationsPage } from "./ApplicationsPage";

export const metadata: Metadata = {
  title: "Application métier sur mesure — remplacez Excel et le papier",
  description:
    "L'application web et mobile qui remplace vos fichiers Excel et votre papier : une seule, simple, pensée pour votre métier. Premier échange gratuit.",
  keywords: [
    "application métier sur mesure PME",
    "développeur application web",
    "remplacer Excel par une application",
    "logiciel métier sur mesure vs SaaS",
  ],
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
  const schema = combineSchemas(
    buildServiceSchema({
      name: "Application métier sur mesure",
      description:
        "Applications web et mobile sur mesure qui remplacent les fichiers Excel et les processus papier par un outil unique, pensé pour votre métier.",
      url: "/applications",
      serviceType: "Application métier sur mesure",
      audience: "PME et ETI",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Applications", url: "/applications" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-applications" />
      <ApplicationsPage />
    </>
  );
}
