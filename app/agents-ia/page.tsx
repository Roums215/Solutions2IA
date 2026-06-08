import type { Metadata } from "next";
import { AgentsIAPage } from "./AgentsIAPage";

export const metadata: Metadata = {
  title: "Agents IA sur mesure — 1 agent, N besoins, votre métier",
  description:
    "Agents IA sur mesure pour entreprises et indépendants : tri d'emails, RDV, qualification de leads, RAG sur vos documents, génération de devis, reporting auto. Hébergement souverain UE, humain dans la boucle, pilote 30 jours dérisqué.",
};

export default function Page() {
  return <AgentsIAPage />;
}
