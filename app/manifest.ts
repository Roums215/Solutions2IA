import type { MetadataRoute } from "next";
import { BRAND, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Solutions 2IA",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: BRAND.bg,
    theme_color: BRAND.primary,
    icons: [
      {
        src: "/branding/logo-s2ia.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/branding/logo-s2ia.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
