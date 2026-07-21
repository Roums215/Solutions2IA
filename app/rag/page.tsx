import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { RagPage } from "./RagPage";

export const metadata: Metadata = {
  title: "Mémoire d'entreprise (RAG) : l'IA qui répond avec vos documents",
  description:
    "Connectez vos procédures, contrats et PDF : une IA qui répond avec vos propres documents et cite ses sources, hébergée en UE. Premier échange gratuit.",
  keywords: [
    "mémoire d'entreprise IA",
    "RAG entreprise France",
    "IA qui répond avec vos documents",
    "RAG hébergé UE",
    "RAG vs fine-tuning PME",
  ],
  alternates: { canonical: "/rag" },
  openGraph: {
    title: "Mémoire d'entreprise (RAG) : une IA qui cite vos documents",
    description:
      "Une IA branchée sur vos documents internes, qui répond aux questions métier et cite ses sources. Hébergée en UE.",
    url: "/rag",
    type: "website",
  },
};

export default function Page() {
  const schema = combineSchemas(
    buildServiceSchema({
      name: "Mémoire d'entreprise (RAG)",
      description:
        "Une IA reliée à vos documents internes (procédures, contrats, PDF) qui répond aux questions métier et cite ses sources. Hébergement souverain UE.",
      url: "/rag",
      serviceType: "RAG / Mémoire d'entreprise",
      audience: "PME et ETI",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Mémoire d'entreprise", url: "/rag" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-rag" />
      <RagPage />
    </>
  );
}
