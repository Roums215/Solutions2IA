"use client";

import { motion } from "motion/react";
import { SectionParticles } from "@/components/shared/SectionParticles";

const workPoints = [
  "Un seul interlocuteur : celui qui comprend le besoin est celui qui construit",
  "Des mots simples : vous comprenez ce que vous achetez",
  "Du code propre, qui reste à vous",
  "Réponse sous 24 h, premier échange gratuit",
  "Des prix de démarrage honnêtes, annoncés dès le devis",
];

const techTags = ["Next.js", "React", "TypeScript", "n8n", "Claude", "Mistral", "PostgreSQL", "Hébergement UE"];

export function HomeApproachSplit() {
  return (
    <section className="section-shell">
      <SectionParticles style="grid-dots" count={20} color="rgba(129,140,248,0.05)" />
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Ma façon de faire</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] mb-6">
              Comprendre d&apos;abord, <span className="text-gradient-strong">construire ensuite</span>
            </h2>
            <p className="text-lg reading-copy mb-8">
              Je ne vends pas une technologie. Je commence par comprendre comment
              vous travaillez, où le temps se perd, puis je construis l&apos;outil
              qui règle ce problème précis. Rien de plus.
            </p>
            <div className="space-y-4">
              {workPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-glow border border-accent-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span className="text-sm text-text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Double lecture — le volet technique pour ceux qui veulent vérifier */}
            <details className="group rounded-xl border border-border-subtle bg-bg-card/60 transition-colors duration-300 open:border-border-accent">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 list-none [&::-webkit-details-marker]:hidden">
                <span className="text-base font-semibold text-text-primary">Détails techniques : pour les curieux</span>
                <svg aria-hidden className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="border-t border-border-subtle/60 px-6 py-5 text-sm leading-[1.8] text-text-secondary space-y-3">
                <p>
                  <strong className="text-text-primary">Sites & applications :</strong>{" "}
                  Next.js, React, TypeScript : les technologies des grandes plateformes,
                  à l&apos;échelle de votre projet. Hébergement rapide et sécurisé inclus.
                </p>
                <p>
                  <strong className="text-text-primary">Automatisations :</strong>{" "}
                  je relie vos outils existants entre eux (téléphonie, CRM, mails, facturation)
                  via leurs portes de connexion officielles (API), orchestrées avec n8n.
                </p>
                <p>
                  <strong className="text-text-primary">IA :</strong>{" "}
                  des modèles éprouvés (Claude, Mistral), branchés sur vos documents quand il le faut,
                  avec vos données hébergées en Europe.
                </p>
              </div>
            </details>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {techTags.map((t) => (
                <span key={t} className="px-4 py-2 text-[13px] font-medium text-text-secondary bg-bg-card/60 border border-border-subtle rounded-xl cursor-default">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
