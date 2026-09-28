"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { TermeExplique } from "@/components/ui/TermeExplique";
import { INVOICE_FLOW, INVOICE_POINTS } from "./autoPageData";

/**
 * /automatisation, facture électronique (sombre, compact, ancre #facture-electronique-2026
 * utilisée par l'accueil, /services et le glossaire). Un bloc court, pas une section
 * réglementaire : les dates reprennent le calendrier déjà publié sur le site (loi de
 * finances 2024), rien n'est ajouté.
 */

export function AutoInvoice() {
  return (
    <section id="facture-electronique-2026" aria-labelledby="auto-invoice-heading" className="section-shell-compact relative scroll-mt-24">
      <div className="section-container">
        <div className="panel-card grid gap-8 rounded-[1.75rem] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:p-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan">Prochaine échéance · 1er septembre 2027</p>
            <h2 id="auto-invoice-heading" className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] text-balance sm:text-3xl">
              Facture électronique : <span className="text-gradient-strong">profitez-en pour supprimer les ressaisies.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              La réception de <TermeExplique k="facture-electronique">factures électroniques</TermeExplique> est obligatoire depuis le 1er septembre 2026
              pour toutes les entreprises assujetties à la TVA. L&apos;émission le devient pour les PME et TPE le 1er septembre 2027.
            </p>
            <ul className="mt-5 space-y-2">
              {INVOICE_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15px] text-text-primary">
                  <Check size={15} strokeWidth={2.4} className="mt-1 shrink-0 text-cyan" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href="/articles/facture-electronique-chorus-pro-2026-obligation"
              className="group mt-6 inline-flex items-center gap-1.5 rounded-sm text-[14.5px] font-medium text-accent-light transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              Comprendre la facture électronique
              <ArrowRight size={14} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          {/* Le circuit, sans ressaisie : vertical sur téléphone */}
          <ol className="relative flex flex-col gap-2 self-center" aria-label="Circuit d'une facture automatisée">
            <span aria-hidden className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-cyan/40" />
            {INVOICE_FLOW.map((f, i) => {
              const Icon = f.icon;
              return (
                <li key={f.label} className="relative flex items-center gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bg-secondary text-cyan ring-1 ring-border-medium" aria-hidden>
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-[12px] text-text-tertiary">0{i + 1}</span>
                  <span className="text-[16px] font-semibold text-text-primary">{f.label}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
