"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { RELATED } from "./relatedServicesData";

/**
 * Navigation croisée contextuelle, placée avant le CTA final de chaque page
 * service. Léger (pas de SpotlightCard lourde) pour ne pas concurrencer le CTA :
 * 2 liens « pour aller plus loin » avec une phrase qui dit pourquoi.
 *
 * Usage : <RelatedServices current="automatisation" />
 */
export function RelatedServices({ current }: { current: keyof typeof RELATED }) {
  const links = RELATED[current];
  if (!links?.length) return null;

  return (
    <section className="section-shell-compact" aria-label="Services liés">
      <div className="section-container">
        <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
          Pour aller plus loin
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {links.map((l) => (
            <motion.div key={l.href} variants={fadeInUp}>
              <Link
                href={l.href}
                className="group flex h-full items-start gap-4 rounded-2xl border border-border-subtle bg-bg-card/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-accent hover:bg-bg-card-hover focus-visible:outline-2 focus-visible:outline-accent-light/60 focus-visible:outline-offset-2"
              >
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border-subtle bg-bg-card text-accent-light transition-colors duration-300 group-hover:border-border-accent">
                  {l.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[15px] font-semibold text-text-primary">
                    {l.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent-light" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-text-secondary">{l.hook}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
