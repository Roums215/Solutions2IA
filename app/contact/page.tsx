import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Démarrez votre projet digital avec Solutions 2IA. Premier échange offert, réponse sous 24h.",
};

export default function Page() {
  return <ContactPage />;
}
