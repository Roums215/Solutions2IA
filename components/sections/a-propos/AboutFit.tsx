"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BELIEVE, REFUSE } from "./aproposPageData";

/**
 * /a-propos, « Pour qui » (sombre). Oui / non côte à côte : ce que je crois, ce que je refuse
 * de faire, pour que le visiteur sache à qui il confie son projet. Puis l'étape suivante :
 * UN bouton, et juste au-dessus ce qui se passe après le clic (CTA expliqué).
 */

export function AboutFit() {
  return (
    <section aria-labelledby="about-fit-heading" className="section-shell-tight relative isolate overflow-hidden">
      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="about-fit-heading"
          label="Pour qui"
          title={
            <>
              Si ces phrases vous parlent, <span className="text-gradient-strong">on travaillera bien ensemble</span>.
            </>
          }
          description="Je ne conviens pas à tout le monde, et c'est normal. Voici ce que je crois, et ce que je ne ferai pas."
        />

        <div className="relative grid gap-4 md:grid-cols-2 lg:gap-5">
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[5%] top-[10%] h-[80%] w-[45%] rounded-full bg-cyan/18 blur-[100px]" />
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[5%] top-[10%] h-[80%] w-[45%] rounded-full bg-accent-primary/22 blur-[100px]" />

          <GlassPanel className="rounded-[28px] p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-[1.2rem] font-semibold tracking-tight">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-cyan text-bg-primary">
                <Check size={16} strokeWidth={3} />
              </span>
              Ce en quoi je crois
            </h3>
            <ul className="mt-6 space-y-4">
              {BELIEVE.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15.5px] leading-snug text-text-primary">
                  <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="rounded-[28px] p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-[1.2rem] font-semibold tracking-tight">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 text-text-secondary ring-1 ring-paper/20">
                <X size={16} strokeWidth={2.6} />
              </span>
              Ce que je refuse de faire
            </h3>
            <ul className="mt-6 space-y-4">
              {REFUSE.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15.5px] leading-snug text-text-secondary">
                  <X size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-warning" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>

        {/* L'étape suivante : ce qui se passe après le clic, puis le bouton */}
        <div className="mt-12 grid items-center gap-6 rounded-[28px] bg-paper p-6 text-ink sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <div>
            <h3 className="text-[1.6rem] font-semibold leading-tight tracking-tight sm:text-[1.9rem]">On fait connaissance ?</h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">
              Le meilleur moyen de voir si on peut travailler ensemble, c&apos;est d&apos;en parler. Je vous réponds sous
              24 h, on se parle 45 minutes gratuitement, et vous recevez une proposition écrite, ou un non franc si je
              ne vous suis pas utile.
            </p>
          </div>
          <div className="lg:text-right">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="h-14 rounded-full px-9 text-[1.0625rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
            >
              Parler de mon besoin
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden />
            </Button>
            <p className="mt-3 text-[13px] text-ink-2">Premier échange gratuit · Réponse sous 24 h · Sans engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
