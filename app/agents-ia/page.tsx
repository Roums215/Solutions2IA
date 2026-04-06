import type { Metadata } from "next";
import { AgentsIAPage } from "./AgentsIAPage";

export const metadata: Metadata = {
  title: "Agents IA",
  description: "Agents intelligents autonomes. Analyse, prise de décision et exécution automatisée pour transformer votre activité.",
};

export default function Page() {
  return <AgentsIAPage />;
}
