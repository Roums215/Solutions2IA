import type { Metadata } from "next";
import { RagPage } from "./RagPage";

export const metadata: Metadata = {
  title: "RAG · Mémoire métier privée",
  description:
    "Connectez vos procédures, contrats, PDF ou bases internes. Une IA qui répond avec vos documents et cite ses sources — hébergée en UE.",
};

export default function Page() {
  return <RagPage />;
}
