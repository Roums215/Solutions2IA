import type { Metadata } from "next";
import { AutomatisationPage } from "./AutomatisationPage";

export const metadata: Metadata = {
  title: "Automatisation",
  description: "Workflows intelligents, intégrations API et processus automatisés. Éliminez les tâches répétitives et gagnez des heures chaque semaine.",
};

export default function Page() {
  return <AutomatisationPage />;
}
