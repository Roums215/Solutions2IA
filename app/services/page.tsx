import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildOfferCatalogSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mes services — sites web, applications, automatisations, assistant IA",
  description:
    "Sites web, applications sur mesure, automatisations et IA pour PME : cinq façons de remplacer ce qui vous prend du temps. Prix clairs, premier échange gratuit.",
  keywords: [
    "développeur web indépendant France",
    "site web application automatisation IA PME",
    "prestataire digital sur mesure",
    "développeur freelance tout-en-un",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Mes services — sites, applications, automatisations, assistant IA",
    description:
      "Cinq services pour remplacer ce qui vous prend du temps par un outil qui le fait à votre place. Prix affichés, premier échange gratuit.",
    url: "/services",
    type: "website",
  },
};

export default function Page() {
  const schema = combineSchemas(
    buildServiceSchema({
      name: "Développeur web & IA indépendant",
      description:
        "Sites web, applications métier, automatisations et IA sur mesure pour PME et ETI. Prix clairs, premier échange gratuit.",
      url: "/services",
      serviceType: "Services numériques sur mesure",
      audience: "PME et ETI",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
    ]),
    // Fourchettes alignées sur la FAQ (lib/content/faqData.ts, méthode & pricing).
    buildOfferCatalogSchema({
      name: "Services Solutions 2IA",
      tiers: [
        {
          name: "Site web",
          description:
            "Site vitrine ou site connecté (réservation, espace client, paiement), rapide et référencé.",
          priceRange: "dès 500 €",
          url: "/sites-web",
        },
        {
          name: "Application métier sur mesure",
          description:
            "Du MVP fonctionnel à la plateforme avancée : remplace Excel et le papier par un outil unique.",
          priceRange: "1 500 € — 40 000 €",
          url: "/applications",
        },
        {
          name: "Agent IA sur mesure",
          description:
            "Assistant qui trie les mails, prépare les devis, met à jour le CRM. Hébergement souverain UE.",
          priceRange: "800 € — 20 000 € (build) + run mensuel",
          url: "/agents-ia",
        },
        {
          name: "Automatisation",
          description:
            "Vos logiciels reliés entre eux : fin des ressaisies et relances manuelles. Chiffrage après audit d'un process réel.",
          url: "/automatisation",
        },
        {
          name: "Mémoire d'entreprise (RAG)",
          description:
            "Une IA qui répond avec vos documents et cite ses sources, hébergée en UE.",
          url: "/rag",
        },
      ],
    }),
  );

  return (
    <>
      <JsonLd schema={schema} id="ld-services" />
      <ServicesPage />
    </>
  );
}
