"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { cn } from "@/lib/utils/cn";
import { WEB_PAINS, WEB_PAIN_TURNAROUND } from "./webPainData";

export function WebPainBusiness() {
  const { mounted, isMobile, shouldReduceMotion, isCoarsePointer, disableContentMotion } =
    usePerformanceMode();
  const staticRender = !mounted || disableContentMotion || isMobile;
  const allow3D = mounted && !isMobile && !isCoarsePointer && !shouldReduceMotion;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Le coût silencieux"
          title={
            <>
              Ce que coûte réellement{" "}
              <span className="text-gradient-strong">
                un site inefficace
              </span>
              .
            </>
          }
          description="Sept pertes business que la plupart des dirigeants ne mesurent pas — et qui pèsent chaque mois sur l'activité."
        />

        <motion.div
          className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
          {...parentProps}
        >
          {/* Colonne gauche : 7 pertes */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:gap-3.5"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
              Sans site connecté
            </div>
            {WEB_PAINS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={itemVariants}
                className="rounded-xl border border-border-subtle bg-bg-card/55 px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-card text-[11px] font-semibold text-text-tertiary"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-text-primary sm:text-[15px]">
                      {p.title}
                    </div>
                    <p className="mt-0.5 text-xs leading-snug text-text-secondary sm:text-[13px]">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Colonne droite : carte bascule */}
          <motion.div variants={itemVariants} className="relative">
            <div
              className={cn(
                "h-full",
                allow3D &&
                  "[perspective:1400px] [perspective-origin:50%_30%]",
              )}
            >
              <div
                className={cn(
                  "relative h-full rounded-2xl border border-cyan/40 bg-gradient-to-b from-cyan/[0.10] to-accent-primary/[0.08] p-6 shadow-[0_0_56px_var(--color-cyan-glow)] sm:p-8",
                  allow3D
                    ? "[transform:rotateY(-4deg)_rotateX(2deg)] [transform-style:preserve-3d] transition-transform duration-700 ease-out hover:[transform:rotateY(0deg)_rotateX(0deg)]"
                    : "",
                )}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
                  {WEB_PAIN_TURNAROUND.label}
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-text-primary sm:text-2xl">
                  {WEB_PAIN_TURNAROUND.headline}
                </h3>

                <ul className="mt-5 space-y-3">
                  {WEB_PAIN_TURNAROUND.promises.map((promise) => (
                    <li
                      key={promise}
                      className="flex items-start gap-3 text-sm leading-snug text-text-secondary sm:text-[15px]"
                    >
                      <svg
                        aria-hidden
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0 text-cyan"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{promise}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-bg-card px-3 py-1.5 text-[11px] sm:text-xs">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span className="text-text-tertiary">Bascule :</span>
                  <span className="font-medium text-text-primary">
                    {WEB_PAIN_TURNAROUND.closing}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm italic text-text-tertiary sm:text-base">
          « Un site qui ne travaille pas, c&apos;est une opportunité qui passe à côté de vous chaque jour. »
        </p>
      </div>
    </section>
  );
}
