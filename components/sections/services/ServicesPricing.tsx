"use client";

import { useRef } from "react";
import { Check, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { cn } from "@/lib/utils/cn";
import { ServiceIcon } from "./servicesParts";
import { GUARANTEE, PRICE_INCLUDED, PRICE_NOTES, PRICE_VARIES, PRICES, SERVICES } from "./servicesPageData";

/**
 * /services, « Les prix » (claire, id="prix" : cible du lien de la FAQ). Une seule table
 * en verre givré au lieu de sept cartes : prestation, prix, ce que ça remplace, délai.
 * Des halos pastel derrière, pour que le verre prenne la couleur. La garantie de 30 jours
 * est juste dessous, là où l'on parle argent.
 */

const COLS = "md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,0.9fr)]";

export function ServicesPricing() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="prix"
      aria-labelledby="svc-price-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      {/* Halos pastel : la couleur que le verre givré laisse passer */}
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[-6rem] top-[30%] h-[28rem] w-[36rem] rounded-full bg-accent-primary/20 blur-[110px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute bottom-[-4rem] right-[-4rem] h-[26rem] w-[32rem] rounded-full bg-cyan/25 blur-[110px]" />

      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="svc-price-heading"
          label="Les prix, sans détour"
          title={
            <>
              Combien ça coûte, <span className="text-gradient-strong">et ce que ça remplace</span>.
            </>
          }
          description="Des fourchettes claires pour situer votre projet. Le prix exact dépend de vos besoins, il peut être plus bas comme plus haut, et il est fixé ensemble avant de démarrer."
        />

        <GlassPanel tone="light" className="rounded-[28px]">
          <div aria-hidden className={cn("hidden gap-6 border-b border-paper-line-strong px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary md:grid", COLS)}>
            <span>Prestation</span>
            <span>Prix</span>
            <span>Ce que ça remplace</span>
            <span>Délai</span>
          </div>
          <ul className="divide-y divide-paper-line">
            {PRICES.map((p) => {
              const s = SERVICES.find((x) => x.key === p.service)!;
              const quote = p.price === "sur devis";
              return (
                <li key={p.label} className={cn("grid gap-2 px-5 py-5 sm:px-7 md:items-center md:gap-6", COLS)}>
                  <div className="flex items-start gap-3">
                    <ServiceIcon s={s} small tone="light" />
                    <div className="min-w-0">
                      <p className="text-[15.5px] font-semibold leading-snug">{p.label}</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-text-tertiary">{p.note}</p>
                    </div>
                  </div>
                  <p className={cn("pl-11 text-[16px] font-semibold md:pl-0", quote ? "text-text-secondary" : "text-accent-dark")}>
                    <span className="sr-only">Prix : </span>
                    {p.price}
                  </p>
                  <p className="pl-11 text-[14px] leading-relaxed text-text-secondary md:pl-0">
                    <span className="font-medium text-text-tertiary md:sr-only">Remplace : </span>
                    {p.replaces}
                  </p>
                  <p className="pl-11 text-[14px] leading-relaxed text-text-secondary md:pl-0">
                    <span className="font-medium text-text-tertiary md:sr-only">Délai : </span>
                    {p.delay}
                  </p>
                </li>
              );
            })}
          </ul>
        </GlassPanel>

        {/* Ce qui est toujours compris, et ce qui fait bouger le prix */}
        <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="rounded-3xl bg-paper/70 p-5 ring-1 ring-paper-line sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Inclus dans tous les projets</p>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {PRICE_INCLUDED.map((x) => (
                <li key={x} className="flex items-start gap-2 text-[14px] leading-snug text-text-secondary">
                  <Check size={14} strokeWidth={2.6} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-paper/70 p-5 ring-1 ring-paper-line sm:p-6">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
              <SlidersHorizontal size={13} strokeWidth={2} aria-hidden />
              Ce qui fait varier le prix
            </p>
            <ul className="mt-3 space-y-2">
              {PRICE_VARIES.map((x) => (
                <li key={x} className="text-[14px] leading-snug text-text-secondary">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <p className="flex items-start gap-3 rounded-2xl bg-ink px-5 py-4 text-[14.5px] leading-relaxed text-paper">
            <ShieldCheck size={18} strokeWidth={1.9} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
            {GUARANTEE}
          </p>
          <div className="space-y-2 text-[13.5px] leading-relaxed text-text-tertiary">
            {PRICE_NOTES.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
