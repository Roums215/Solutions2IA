"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { COMMITMENTS } from "./aproposPageData";
import { MobileRail } from "@/components/shared/MobileRail";

/**
 * /a-propos, « Mes engagements » (sombre). Six fiches de verre, toujours construites pareil :
 * la promesse, ce qu'elle veut dire, puis comment vous le vérifiez vous-même. Une promesse
 * sans preuve est un slogan ; ici chaque ligne de preuve renvoie à un fait publié.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutCommitments() {
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section aria-labelledby="about-commit-heading" className="section-shell-tight relative isolate overflow-hidden">
      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="about-commit-heading"
          label="Mes engagements"
          title={
            <>
              Ce sur quoi vous pouvez compter, <span className="text-gradient-strong">et comment le vérifier</span>.
            </>
          }
          description="Ce ne sont pas des slogans. C'est la façon dont je travaille, et ce que vous êtes en droit d'attendre de moi."
        />

        <div className="relative">
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute -left-10 top-0 h-[24rem] w-[32rem] max-w-full rounded-full bg-accent-primary/25 blur-[110px]" />
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute -right-10 bottom-0 h-[22rem] w-[28rem] max-w-full rounded-full bg-cyan/18 blur-[100px]" />

          <MobileRail label="Mes engagements" className="relative gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {COMMITMENTS.map((c, i) => (
              <motion.li
                key={c.title}
                initial={instant ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : (i % 3) * 0.08, ease: EASE }}
              >
                <GlassPanel className="h-full rounded-[26px] p-6">
                  <article className="flex h-full flex-col">
                    <p className="font-mono text-[12px] font-semibold text-cyan">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-[18px] font-semibold leading-snug tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-text-secondary">{c.text}</p>
                    <div className="mt-auto pt-5">
                      <div className="rounded-2xl bg-paper/[0.04] p-3.5 ring-1 ring-cyan/20">
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan">
                          <ShieldCheck size={13} strokeWidth={2} aria-hidden />
                          Comment le vérifier
                        </p>
                        <p className="mt-1.5 text-[14px] leading-snug text-text-primary">{c.verify}</p>
                        {c.link && (
                          <Link
                            href={c.link.href}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-sm text-[13.5px] font-semibold text-accent-light transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                          >
                            {c.link.label}
                            <ArrowRight size={14} aria-hidden />
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                </GlassPanel>
              </motion.li>
            ))}
          </MobileRail>
        </div>
      </div>
    </section>
  );
}
