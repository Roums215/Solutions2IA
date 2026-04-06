import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description: "Sites web, applications, agents IA, automatisation, UI/UX design et expériences visuelles premium. Découvrez nos solutions digitales complètes.",
};

export default function Page() {
  return <ServicesPage />;
}
