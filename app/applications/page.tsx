import type { Metadata } from "next";
import { ApplicationsPage } from "./ApplicationsPage";

export const metadata: Metadata = {
  title: "Applications métier sur mesure — Santé, Retail, Industrie, Services pro, Logistique, Immobilier",
  description:
    "Applications web et mobiles sur mesure pour tous secteurs — santé, retail, industrie, services pro, logistique, immobilier. Construction custom ou refonte après audit. Dématerialisation, schémas clairs, suivi de performance et pilotage temps réel.",
};

export default function Page() {
  return <ApplicationsPage />;
}
