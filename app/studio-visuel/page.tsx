import type { Metadata } from "next";
import { StudioVisuelPage } from "./StudioVisuelPage";

export const metadata: Metadata = {
  title: "Studio visuel premium : motion design, 2D/3D, Remotion, expériences immersives",
  description:
    "Studio visuel pour marques exigeantes : motion design, animations 2D/3D, vidéos Remotion programmatiques, interfaces immersives. Univers visuels premium.",
  alternates: { canonical: "/studio-visuel" },
  openGraph: {
    title: "Studio visuel — Motion design, 2D/3D, Remotion premium",
    description:
      "Univers visuels qui marquent : motion design, 2D/3D, Remotion, interfaces immersives.",
    url: "/studio-visuel",
    type: "website",
  },
};

export default function Page() {
  return <StudioVisuelPage />;
}
