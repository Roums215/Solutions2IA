import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTORS } from "@/components/sections/automation/sectorsData";
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
  return {
    title: sector.seoTitle,
    description: sector.seoDescription,
  };
}

export default async function Page({ params }: { params: RouteParams }) {
  const { secteur } = await params;
  const sector = SECTORS.find((s) => s.slug === secteur);
  if (!sector) notFound();
  return <SecteurPage sector={sector} />;
}
