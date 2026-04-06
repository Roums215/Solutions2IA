import type { Metadata } from "next";
import { ApplicationsPage } from "./ApplicationsPage";

export const metadata: Metadata = {
  title: "Applications",
  description: "Applications web et mobiles performantes. Architecture solide, UX premium et synchronisation temps réel.",
};

export default function Page() {
  return <ApplicationsPage />;
}
