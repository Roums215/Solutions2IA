"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const points = [
  {
    title: "Qui est concerné",
    text: "Toutes les entreprises françaises assujetties à la TVA. Réception obligatoire dès septembre 2026 pour tout le monde ; émission obligatoire dès 2026 pour les grandes entreprises et ETI, 2027 pour les PME et TPE.",
  },
  {
    title: "Ce qui change concrètement",
    text: "Fini le PDF envoyé par mail : les factures passent au format électronique structuré (Factur-X) et transitent par Chorus Pro ou une plateforme agréée (PDP). Un logiciel non conforme = des factures refusées.",
  },
  {
    title: "Ce que j'automatise",
    text: "Génération des factures au bon format depuis vos outils actuels, transmission automatique, suivi des statuts (déposée, acceptée, payée) et relances — sans changer votre façon de facturer.",
  },
];

export function ChorusProSection() {
  return (
    <section id="facture-electronique-2026" className="section-shell-compact scroll-mt-24">
      <div className="section-container">
        <SectionHeading
          label="Échéance réglementaire"
          title={
            <>
              Facture électronique 2026 :{" "}
              <span className="text-gradient-strong">l&apos;automatiser plutôt que la subir</span>
            </>
          }
          description="L'obligation Chorus Pro / Factur-X arrive. C'est une contrainte — et l'occasion idéale de supprimer la saisie de facturation pour de bon."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5"
        >
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="rounded-xl border border-border-subtle bg-bg-card/60 p-6 card-shine transition-all duration-300 hover:border-border-accent"
            >
              <h3 className="text-base font-semibold text-text-primary">{p.title}</h3>
              <p className="mt-2 text-sm leading-[1.8] text-text-secondary">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-tertiary"
        >
          Pour comprendre l&apos;obligation en détail :{" "}
          <Link
            href="/articles/facture-electronique-chorus-pro-2026-obligation"
            className="font-medium text-accent-light transition-colors duration-200 hover:text-text-primary"
          >
            notre guide complet facture électronique 2026
          </Link>
          .
        </motion.p>
      </div>
    </section>
  );
}
