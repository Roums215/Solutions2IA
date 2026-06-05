import type { Metadata } from "next";
import { AutomatisationPage } from "./AutomatisationPage";

export const metadata: Metadata = {
  title: "Automatisation sur mesure — pipelines JobPhoning · n8n · Axonaut | Solutions 2IA",
  description: "Fini la ressaisie entre appels et CRM : vos leads JobPhoning deviennent des fiches Axonaut qualifiées, enrichies et notifiées automatiquement. Hébergé en UE.",
};

export default function Page() {
  return <AutomatisationPage />;
}
