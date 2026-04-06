import type { Metadata } from "next";
import { SitesWebPage } from "./SitesWebPage";

export const metadata: Metadata = {
  title: "Sites web premium",
  description: "Création de sites web modernes, rapides et mémorables. Design premium, performance optimisée et expériences immersives.",
};

export default function Page() {
  return <SitesWebPage />;
}
