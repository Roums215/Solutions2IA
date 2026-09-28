import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { AutomatisationPage } from "./AutomatisationPage";

export const metadata: Metadata = {
  title: "Automatisation : vos tâches se font seules",
  description:
    "Je relie vos logiciels entre eux : ressaisies, relances et transferts se font seuls. Mon propre flux de prospection en exemple. Premier échange gratuit.",
  keywords: [
    "automatisation tâches répétitives PME",
    "relier ses logiciels entre eux",
    "automatisation ressaisie CRM facturation",
    "automatisation workflow entreprise France",
    "facture électronique 2026 automatisation",
  ],
  alternates: { canonical: "/automatisation" },
  openGraph: {
    title: "Automatisation : ce qui se répète peut se faire tout seul",
    description:
      "Je relie vos logiciels entre eux : ressaisies, relances et transferts se font seuls. Mon propre flux de prospection en exemple. Premier échange gratuit.",
    url: "/automatisation",
    type: "website",
  },
};

export default function Page() {
  const schema = combineSchemas(
    buildServiceSchema({
      name: "Automatisation sur mesure",
      description:
        "Connexion de vos logiciels pour supprimer ressaisies, relances et transferts manuels entre CRM, facturation, mails et tableurs. Facture électronique 2026 : génération, transmission et suivi automatisés.",
      url: "/automatisation",
      serviceType: "Automatisation",
      audience: "PME et ETI",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Automatisation", url: "/automatisation" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-automatisation" />
      <AutomatisationPage />
    </>
  );
}
