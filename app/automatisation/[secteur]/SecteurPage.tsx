"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { RelatedServices } from "@/components/shared/RelatedServices";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AutomationPipeline } from "@/components/sections/automation/AutomationPipeline";
import type { Sector } from "@/components/sections/automation/sectorsData";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

interface SecteurPageProps {
  sector: Sector;
}

/**
 * Page secteur /automatisation/[secteur].
 * Ordre : c'est quoi (hero) · ce que ça change · comment ça marche (schéma) ·
 * pour qui (et quand ce n'est pas la bonne solution) · l'étape suivante.
 */
export function SecteurPage({ sector }: SecteurPageProps) {
  const lower = sector.name.toLowerCase();

  return (
    <>
      <PageAtmosphere preset="automation" />

      <PageHero
        label={`Automatisation · ${sector.name}`}
        title={
          <>
            {sector.name} :{" "}
            <span className="text-gradient-strong">{sector.heroAccent}</span>
          </>
        }
        description={`${sector.problem} ${sector.benefit}`}
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir le flux en détail", href: "#comment-ca-marche" }}
        note="Premier échange de 45 minutes, gratuit et sans engagement. Le prix est fixé avec vous avant de démarrer, sur vos outils actuels."
        glowColor="bg-cyan/5"
      />

      {/* Ce que ça change */}
      <section className="section-shell">
        <div className="section-container">
          <SectionHeading
            label="Ce que ça change"
            title={
              <>
                Dans votre semaine,{" "}
                <span className="text-gradient-strong">concrètement</span>
              </>
            }
            description="Pas de statistique de marché : ce que le flux fait pour vous, et ce que vous pouvez compter vous-même dès le premier mois."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {sector.gains.map((gain, i) => (
              <motion.div key={gain.title} variants={fadeInUp}>
                <SpotlightCard glow="34,211,238" tilt={4} className="h-full p-7">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {String(i + 1).padStart(2, "0")} · {gain.title}
                  </p>
                  <p
                    className="mt-4 text-sm leading-relaxed text-text-secondary"
                    style={{ transform: "translateZ(12px)" }}
                  >
                    {gain.text}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

          {sector.deadline && (
            <aside className="mx-auto mt-10 max-w-3xl rounded-xl border border-border-accent bg-bg-card/60 px-6 py-5 text-sm leading-relaxed text-text-secondary">
              <span className="font-semibold text-text-primary">Échéance réelle : </span>
              {sector.deadline}
            </aside>
          )}
        </div>
      </section>

      {/* Comment ça marche */}
      <AutomationPipeline
        id="comment-ca-marche"
        eyebrow="Le flux, étape par étape"
        nodes={sector.nodes}
        edges={sector.edges}
        details={sector.details}
        heading={
          sector.nodes
            .filter((n) => n.tool !== "notify")
            .map((n) => n.label)
            .join(" → ")
        }
        intro={sector.benefit}
      />

      {/* Pour qui */}
      <section className="section-shell-tight">
        <div className="section-container">
          <SectionHeading
            label="Est-ce fait pour vous ?"
            title={
              <>
                Trois conditions,{" "}
                <span className="text-gradient-strong">et une limite honnête</span>
              </>
            }
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
            <ul className="space-y-3">
              {sector.forWho.map((condition) => (
                <li
                  key={condition}
                  className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-card/55 px-5 py-4 text-sm leading-relaxed text-text-primary"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-success/40 bg-success-glow text-[11px] text-success"
                  >
                    ✓
                  </span>
                  {condition}
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <div className="rounded-xl border border-border-subtle bg-bg-card/40 px-5 py-4 text-sm leading-relaxed text-text-secondary">
                <span className="font-semibold text-text-primary">
                  Quand ce n&apos;est pas la bonne solution :{" "}
                </span>
                {sector.notForYou}
              </div>
              <div className="rounded-xl border border-border-subtle bg-bg-card/40 px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                  Compatible avec vos outils
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {sector.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-md border border-border-subtle bg-bg-card/60 px-2.5 py-1 text-[12px] text-text-secondary"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices current="automatisation" />

      <CTABand
        title={
          <>
            Et si ça se faisait{" "}
            <span className="text-gradient-strong">tout seul</span>, dans votre {lower} ?
          </>
        }
        description="Je pars d'une de vos tâches réelles et je la branche en quelques jours, sur vos outils actuels. Hébergé en Europe, vous gardez la main. Premier échange gratuit."
        primaryLabel="Premier échange gratuit"
        secondary={null}
      />
    </>
  );
}
