"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { SectorCard } from "./SectorCard";
import { SECTORS } from "./sectorsData";

export function SectorGrid() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const { isCoarsePointer, shouldReduceMotion } = usePerformanceMode();
  const hoverAllowed = !isCoarsePointer && !shouldReduceMotion;

  return (
    <section className="section-shell-tight">
      <div className="section-container">
        <SectionHeading
          label="Par métier"
          title={
            <>
              Ce qu&apos;on automatise{" "}
              <span className="text-gradient-strong">par métier</span>
            </>
          }
          description="La même mécanique de pipeline, déclinée sur les frictions concrètes de chaque secteur. Cliquez pour voir le flux complet."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SECTORS.map((sector) => (
            <motion.div key={sector.slug} variants={fadeInUp} className="h-full">
              <SectorCard
                sector={sector}
                isActive={hoverAllowed && activeSlug === sector.slug}
                isDimmed={
                  hoverAllowed &&
                  activeSlug !== null &&
                  activeSlug !== sector.slug
                }
                onHoverStart={() => {
                  if (hoverAllowed) setActiveSlug(sector.slug);
                }}
                onHoverEnd={() => {
                  if (hoverAllowed) setActiveSlug(null);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .sector-card-node {
          opacity: 1;
        }
        @media (hover: hover) and (pointer: fine) {
          [data-sector-active="true"] .sector-card-node {
            animation: sectorCardCascade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        }
        @keyframes sectorCardCascade {
          0%   { opacity: 0.45; filter: none; }
          50%  { opacity: 1; filter: drop-shadow(0 0 6px var(--color-cyan)); }
          100% { opacity: 1; filter: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-sector-active="true"] .sector-card-node {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
