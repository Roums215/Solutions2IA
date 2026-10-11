"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { ServiceIcon } from "./servicesParts";
import { ServiceVisual } from "./servicesObjects";
import { SERVICES, type Service } from "./servicesPageData";
import { MobileRail } from "@/components/shared/MobileRail";

/**
 * /services, « Les cinq services » (sombre, id="services"). Une fiche par service, en verre
 * liquide, toujours construite pareil : ce qui est livré, montré par de vrais objets (la
 * page, le fichier, le mail, le devis) ; puis trois lignes dans le même ordre (votre
 * situation, ce que je livre, ce que ça change) ; puis délai et lien. Le site web occupe
 * toute la largeur (c'est l'entrée), les quatre autres en grille de deux.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ServicesBento() {
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section id="services" aria-labelledby="svc-bento-heading" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden">
      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="svc-bento-heading"
          label="Les cinq services"
          title={
            <>
              Ce que je construis, <span className="text-gradient-strong">et ce que ça vous évite</span>.
            </>
          }
          description="Chaque fiche se lit de la même façon : votre situation, ce que je livre, ce que ça change. Le détail et des exemples sont sur la page de chaque service."
        />

        <div className="relative">
          {/* La lumière derrière le verre */}
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute -left-10 top-0 h-[26rem] w-[34rem] max-w-full rounded-full bg-accent-primary/25 blur-[110px]" />
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute -right-10 top-1/3 h-[22rem] w-[24rem] max-w-full rounded-full bg-cyan/18 blur-[100px]" />
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute bottom-0 left-1/3 h-[20rem] w-[30rem] max-w-full rounded-full bg-accent-dark/25 blur-[110px]" />

          <MobileRail label="Les cinq services" className="relative gap-4 md:grid-cols-2 lg:gap-5">
            {SERVICES.map((s, i) => {
              const wide = s.key === "web";
              return (
                <motion.li
                  key={s.key}
                  className={cn("group", wide && "md:col-span-2")}
                  initial={instant ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: instant ? 0 : 0.55, delay: instant ? 0 : i * 0.06, ease: EASE }}
                >
                  <GlassPanel className="h-full rounded-[28px] p-4 sm:p-5">
                    <ServiceFiche s={s} wide={wide} />
                  </GlassPanel>
                </motion.li>
              );
            })}
          </MobileRail>
        </div>
      </div>
    </section>
  );
}

/** Une fiche : la scène, puis toujours les mêmes trois lignes, puis le pied. */
function ServiceFiche({ s, wide }: { s: Service; wide: boolean }) {
  return (
    <article className={cn("flex h-full flex-col gap-5", wide && "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-8")}>
      <ServiceVisual k={s.key} className={wide ? "h-[200px] lg:order-2 lg:h-auto lg:min-h-[260px]" : "h-[150px]"} />

      <div className="flex flex-1 flex-col px-1 pb-1 sm:px-2">
        <div className="flex items-center gap-3">
          <ServiceIcon s={s} small />
          <h3 className={cn("font-semibold tracking-tight", wide ? "text-[1.5rem]" : "text-[1.25rem]")}>{s.title}</h3>
          <span className="ml-auto shrink-0 rounded-full bg-cyan/10 px-3 py-1 text-[12.5px] font-semibold text-cyan ring-1 ring-cyan/25">{s.price}</span>
        </div>

        <dl className="mt-4 space-y-3">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Votre situation</dt>
            <dd className="mt-0.5 text-[14.5px] leading-relaxed text-text-secondary">{s.situation}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Ce que je livre</dt>
            <dd className="mt-0.5 text-[14.5px] leading-relaxed text-text-secondary">{s.deliver}</dd>
          </div>
          <div className="border-l-2 border-cyan pl-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan">Ce que ça change</dt>
            <dd className="mt-0.5 text-[15px] font-medium leading-relaxed text-text-primary">{s.change}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border-medium pt-4">
            <span className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary">
              <Clock3 size={13} strokeWidth={2} aria-hidden />
              {s.delay}
            </span>
            {/* Le lien couvre toute la fiche (calque ::after) ; son nom reste court */}
            <Link
              href={s.href}
              className="inline-flex items-center gap-1.5 rounded-sm text-[14px] font-semibold text-accent-light transition-colors duration-300 after:absolute after:inset-0 after:rounded-[22px] after:content-[''] group-hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              {s.cta}
              <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
