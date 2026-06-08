import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services digitaux premium : sites web, apps métier, agents IA, automatisation",
  description:
    "Six services pour transformer votre activité : sites web, applications métier sur mesure, agents IA souverains, RAG, automatisation Axonaut, studio visuel.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Six expertises digitales premium",
    description:
      "Sites web, apps métier, agents IA, RAG, automatisation, studio visuel. Solutions 2IA.",
    url: "/services",
    type: "website",
  },
};

export default function Page() {
  return <ServicesPage />;
}
