import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildFaqSchema, combineSchemas } from "@/lib/seo/schema";
import { FAQ_ITEMS } from "@/lib/content/faqData";
import { FaqPage } from "./FaqPage";

export const metadata: Metadata = {
  title: "FAQ Solutions 2IA : agents IA, applications métier, RAG, RGPD, pricing",
  description:
    "30 questions structurées : comment un agent IA évite les hallucinations, RAG vs fine-tuning, hébergement souverain UE, pilote 30 jours, coûts, secteurs couverts.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — 30 questions sur agents IA, apps métier, RAG, RGPD, pricing",
    description: "Réponses concrètes et sourcées sur l'IA enterprise française.",
    url: "/faq",
    type: "website",
  },
};

export default function Page() {
  const schema = combineSchemas(
    buildFaqSchema(
      FAQ_ITEMS.map((it) => ({ question: it.question, answer: it.answer })),
    ),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "FAQ", url: "/faq" },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-faq" />
      <FaqPage />
    </>
  );
}
