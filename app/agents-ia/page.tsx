import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { AgentsIAPage } from "./AgentsIAPage";

export const metadata: Metadata = {
  title: "Assistant IA sur mesure — un collègue numérique pour votre métier",
  description:
    "Un assistant IA qui trie vos mails, prépare vos devis et met à jour votre fichier clients. Le travail répétitif en moins, données en UE. Échange gratuit.",
  keywords: [
    "développeur agent IA RGPD France",
    "assistant IA sur mesure PME",
    "agent IA tri mails devis CRM",
    "agent IA souverain hébergé UE",
  ],
  alternates: { canonical: "/agents-ia" },
  openGraph: {
    title: "Assistant IA sur mesure — un collègue numérique pour votre métier",
    description:
      "Un assistant qui connaît votre métier, relié à vos outils, sous votre contrôle. Premier échange gratuit.",
    url: "/agents-ia",
    type: "website",
  },
};

export default function Page() {
  const schema = combineSchemas(
    buildServiceSchema({
      name: "Assistant IA sur mesure",
      description:
        "Un agent IA qui agit : tri des mails, préparation des devis, mise à jour du CRM, réponses aux clients. Relié à vos outils, données hébergées en UE.",
      url: "/agents-ia",
      serviceType: "Agent IA",
      audience: "PME et ETI",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Agents IA", url: "/agents-ia" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-agents-ia" />
      <AgentsIAPage />
    </>
  );
}
