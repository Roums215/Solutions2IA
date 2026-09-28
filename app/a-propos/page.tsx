import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, combineSchemas } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/constants";
import { AProposPage } from "./AProposPage";

export const metadata: Metadata = {
  title: "À propos : Iulian, développeur indépendant",
  description:
    "Iulian, développeur indépendant (projets DFT télécoms, Ramsay Santé). Sites, applications, automatisations sur mesure. Un seul interlocuteur, échange gratuit.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos : Iulian, développeur indépendant",
    description:
      "Sites, applications et automatisations sur mesure. Un seul interlocuteur : la personne qui comprend votre besoin est celle qui construit.",
    url: "/a-propos",
    type: "website",
  },
};

// ProfilePage rattachée au Person #founder déjà déclaré par l'Organization du layout.
const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/a-propos`,
  url: `${SITE_URL}/a-propos`,
  name: "À propos : Iulian, développeur indépendant",
  inLanguage: "fr-FR",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}#founder`,
    name: "Iulian Ionita",
    jobTitle: "Développeur indépendant",
    worksFor: { "@id": `${SITE_URL}#organization` },
    knowsAbout: ["Sites web", "Applications sur mesure", "Automatisation", "Agents IA"],
  },
};

export default function Page() {
  const schema = combineSchemas(
    profileSchema,
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "À propos", url: "/a-propos" },
    ]),
  );
  return (
    <>
      <JsonLd schema={schema} id="ld-a-propos" />
      <AProposPage />
    </>
  );
}
