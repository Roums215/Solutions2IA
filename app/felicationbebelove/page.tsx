import type { Metadata } from "next";
import { FelicationBebeLovePage } from "./FelicationBebeLovePage";

// Page secrète (surprise) — non indexée, absente du sitemap et de la navigation.
export const metadata: Metadata = {
  title: "💛 Pour toi",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <FelicationBebeLovePage />;
}
