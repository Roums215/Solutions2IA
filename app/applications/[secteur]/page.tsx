import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTORS_APPS } from "@/components/sections/applications/sectorsAppsData";
import { SECTOR_VERTICALS } from "@/components/sections/applications/appSectorVerticals";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { SecteurAppPage } from "./SecteurAppPage";

type RouteParams = Promise<{ secteur: string }>;

export function generateStaticParams() {
  return SECTORS_APPS.map((s) => ({ secteur: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { secteur } = await params;
  const vertical = SECTOR_VERTICALS[secteur as keyof typeof SECTOR_VERTICALS];
  if (!vertical) return {};
  const url = `/applications/${secteur}`;
  return {
    title: vertical.seoTitle,
    description: vertical.seoDescription,
    keywords: vertical.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: vertical.seoTitle,
      description: vertical.seoDescription,
      url,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: RouteParams }) {
  const { secteur } = await params;
  const sector = SECTORS_APPS.find((s) => s.slug === secteur);
  const vertical = SECTOR_VERTICALS[secteur as keyof typeof SECTOR_VERTICALS];
  if (!sector || !vertical) notFound();

  const url = `/applications/${secteur}`;
  const schema = combineSchemas(
    buildServiceSchema({
      name: `Application métier — ${sector.name}`,
      description: vertical.seoDescription,
      url,
      serviceType: "Application métier sur mesure",
      audience: sector.meta,
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Applications", url: "/applications" },
      { name: sector.name, url },
    ]),
  );

  return (
    <>
      <JsonLd schema={schema} id={`ld-applications-${secteur}`} />
      <SecteurAppPage sector={sector} vertical={vertical} />
    </>
  );
}
