import type { Metadata } from "next";
import { StudioVisuelPage } from "./StudioVisuelPage";

export const metadata: Metadata = {
  title: "Studio visuel",
  description: "Animations avancées, motion design, univers 2D/3D, Remotion et interfaces immersives. Des expériences visuelles premium.",
};

export default function Page() {
  return <StudioVisuelPage />;
}
