import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildDefinedTermSetSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import {
  GLOSSAIRE_PAGE_ENTRIES,
  glossaireEntryTerm,
} from "@/lib/content/glossairePage";
import { GlossairePage } from "./GlossairePage";

export const metadata: Metadata = {
  title: "Glossaire : agent IA, RAG, automatisation expliqués simplement",
  description:
    "Agent IA, RAG, workflow, API, RGPD, hébergement souverain : les termes de l'IA et de l'automatisation expliqués en français simple, avec des exemples concrets de PME.",
  keywords: [
    "définition agent IA",
    "qu'est-ce que le RAG",
    "définition automatisation entreprise",
    "glossaire IA français",
    "workflow définition simple",
  ],
  alternates: { canonical: "/glossaire" },
  openGraph: {
    title: "Glossaire : l'IA et l'automatisation en français simple",
    description:
      "Les termes que vous croiserez dans un projet IA ou d'automatisation, expliqués sans jargon, avec des exemples concrets.",
    url: "/glossaire",
    type: "website",
  },
};

export default function Page() {
  const schema = combineSchemas(
    buildDefinedTermSetSchema({
      name: "Glossaire Solutions 2IA : IA & automatisation",
      description:
        "Définitions en français simple des termes de l'IA et de l'automatisation pour les PME : agent IA, RAG, workflow, API, RGPD…",
      url: "/glossaire",
      terms: GLOSSAIRE_PAGE_ENTRIES.map((entry) => {
        const t = glossaireEntryTerm(entry);
        return {
          name: t.terme,
          description: t.definition,
          url: `/glossaire#${entry.key}`,
        };
      }),
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Glossaire", url: "/glossaire" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-glossaire" />
      <GlossairePage />
    </>
  );
}
