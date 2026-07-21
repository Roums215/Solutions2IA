import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTORS } from "@/components/sections/automation/sectorsData";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { SecteurPage } from "./SecteurPage";

type RouteParams = Promise<{ secteur: string }>;

export function generateStaticParams() {
  return SECTORS.map((s) => ({ secteur: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { secteur } = await params;
  const sector = SECTORS.find((s) => s.slug === secteur);
  if (!sector) return {};
  const url = `/automatisation/${secteur}`;
  return {
    title: sector.seoTitle,
    description: sector.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: sector.seoTitle,
      description: sector.seoDescription,
      url,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: RouteParams }) {
  const { secteur } = await params;
  const sector = SECTORS.find((s) => s.slug === secteur);
  if (!sector) notFound();

  const url = `/automatisation/${secteur}`;
  const schema = combineSchemas(
    buildServiceSchema({
      name: `Automatisation : ${sector.name}`,
      description: sector.seoDescription,
      url,
      serviceType: "Automatisation",
      audience: sector.name,
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Automatisation", url: "/automatisation" },
      { name: sector.name, url },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id={`ld-automatisation-${secteur}`} />
      <SecteurPage sector={sector} />
    </>
  );
}
