import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildFaqSchema, combineSchemas } from "@/lib/seo/schema";
import { FAQ_ITEMS } from "@/lib/content/faqData";
import { FaqPage } from "./FaqPage";

export const metadata: Metadata = {
  title: "FAQ : agents IA, applications, RAG, prix",
  description:
    "32 questions : comment un agent IA évite d'inventer, RAG ou fine-tuning, hébergement en Europe, pilote 30 jours, prix et délais. Réponses courtes et chiffrées.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ : 32 questions sur les agents IA, les applications, le RAG et les prix",
    description: "Réponses courtes et chiffrées d'un développeur indépendant, sans jargon.",
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
