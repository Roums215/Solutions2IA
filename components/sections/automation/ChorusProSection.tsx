"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TermeExplique } from "@/components/ui/TermeExplique";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

/* Calendrier légal (loi de finances 2024) : réception obligatoire pour toutes les
 * entreprises assujetties à la TVA depuis le 1er septembre 2026 ; émission obligatoire
 * depuis le 1er septembre 2026 pour les grandes entreprises et ETI, à partir du
 * 1er septembre 2027 pour les PME, TPE et micro-entreprises. */
const points = [
  {
    title: "Qui est concerné",
    text: "Toutes les entreprises françaises assujetties à la TVA. Depuis le 1er septembre 2026, toutes doivent pouvoir recevoir des factures électroniques, et les grandes entreprises comme les ETI doivent déjà les émettre. Prochaine échéance : le 1er septembre 2027, émission obligatoire pour les PME, TPE et micro-entreprises (loi de finances 2024).",
  },
  {
    title: "Ce qui change concrètement",
    text: "Fini le PDF envoyé par mail : les factures entre entreprises passent dans un format lisible par les logiciels (Factur-X) et transitent par une plateforme agréée par l'État (PA, anciennement PDP). Chorus Pro reste la porte d'entrée pour facturer une administration. Un logiciel non conforme, ce sont des factures refusées.",
  },
  {
    title: "Ce que j'automatise",
    text: "Génération des factures au bon format depuis vos outils actuels, transmission automatique, suivi des statuts (déposée, acceptée, payée) et relances, sans changer votre façon de facturer.",
  },
];

export function ChorusProSection() {
  return (
    <section id="facture-electronique-2026" className="section-shell-tight scroll-mt-24">
      <div className="section-container">
        <SectionHeading
          label="Prochaine échéance · 1er septembre 2027"
          title={
            <>
              Facture électronique 2026 :{" "}
              <span className="text-gradient-strong">l&apos;automatiser plutôt que la subir</span>
            </>
          }
          description={
            <>
              La réception de{" "}
              <TermeExplique k="facture-electronique">factures électroniques</TermeExplique>{" "}
              est obligatoire depuis le 1er septembre 2026 pour toutes les entreprises assujetties à la TVA,
              l&apos;émission le devient pour les PME et TPE le 1er septembre 2027. C&apos;est une contrainte,
              et la bonne occasion de supprimer la saisie de facturation pour de bon.
            </>
          }
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="rounded-xl border border-border-subtle bg-bg-card/60 p-7 card-shine transition-all duration-300 hover:border-border-accent"
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
            mon guide complet sur la facture électronique 2026
          </Link>
          .
        </motion.p>
      </div>
    </section>
  );
}
