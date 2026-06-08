import type { Metadata } from "next";
import { SitesWebPage } from "./SitesWebPage";

export const metadata: Metadata = {
  title: "Sites web premium : système numérique connecté qui transforme vos visiteurs",
  description:
    "Création de sites web premium qui convertissent : 9 canaux de visibilité, parcours fluide, CRM connecté, performance Lighthouse 95+. Audit SEO inclus.",
  alternates: { canonical: "/sites-web" },
  openGraph: {
    title: "Sites web premium — Système numérique connecté",
    description:
      "9 canaux de visibilité, parcours visiteur fluide, CRM connecté. Sites premium qui transforment.",
    url: "/sites-web",
    type: "website",
  },
};

export default function Page() {
  return <SitesWebPage />;
}
