"use client";

import { useId, useRef, useState } from "react";
import { Calculator, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { CALC_DAYS, CALC_DEFAULTS, CALC_NOTE, CALC_TARGET_MIN } from "./ragPageData";

/**
 * /rag, « Votre calcul » (claire, id="calcul"). Le chiffre vient du visiteur : combien de
 * personnes cherchent, combien de fois, combien de temps, quelle part la mémoire trouve,
 * ce que vaut une heure. Aucun résultat client ; le calcul est posé en clair dessous.
 * Remplace RagSearchTime (trois curseurs, résultat en heures seulement).
 */

const fmt = (n: number, digits = 0) => n.toLocaleString("fr-FR", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

export function RagSearchCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const [people, setPeople] = useState(CALC_DEFAULTS.people);
  const [perDay, setPerDay] = useState(CALC_DEFAULTS.perDay);
  const [minutes, setMinutes] = useState(CALC_DEFAULTS.minutes);
  const [share, setShare] = useState(CALC_DEFAULTS.share);
  const [cost, setCost] = useState(CALC_DEFAULTS.cost);

  // Le calcul, montré tel quel sous le résultat.
  const nowPerYear = (people * perDay * minutes * CALC_DAYS) / 60;
  const covered = (people * perDay * share) / 100; // recherches trouvées par la mémoire, par jour
  const savedPerDay = covered * (minutes - CALC_TARGET_MIN); // minutes
  const perYear = (savedPerDay * CALC_DAYS) / 60;
  const money = Math.round((perYear * cost) / 10) * 10;
  const days = perYear / 7;

  return (
    <section
      ref={sectionRef}
      id="calcul"
      aria-labelledby="rag-calc-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="ragLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="rag-calc-heading"
          label="Votre calcul"
          title={
            <>
              Ce que vous coûte <span className="text-gradient-strong">le temps passé à chercher</span>.
            </>
          }
          description="Une procédure introuvable, un contrat à relire, la question posée au collègue qui sait. Réglez les curseurs sur votre réalité : le calcul reste visible, pas de chiffre magique."
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
          {/* Réglages */}
          <div className="paper-card flex flex-col rounded-2xl p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Vos chiffres</p>
            <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <Slider label="Personnes qui cherchent" unit={people > 1 ? "personnes" : "personne"} value={people} min={1} max={50} step={1} onChange={setPeople} />
              <Slider label="Recherches par personne" unit="par jour" value={perDay} min={1} max={15} step={1} onChange={setPerDay} />
              <Slider label="Temps d'une recherche" unit="minutes" value={minutes} min={2} max={30} step={1} onChange={setMinutes} />
              <Slider label="Coût d'une heure de travail" unit="€, charges comprises" value={cost} min={15} max={120} step={1} onChange={setCost} />
              <div className="sm:col-span-2">
                <Slider
                  label="Part des recherches où la mémoire trouve"
                  unit="%"
                  value={share}
                  min={10}
                  max={90}
                  step={5}
                  onChange={setShare}
                  hint="50 % est un point de départ prudent : tout ne se trouve pas dans vos documents."
                />
              </div>
            </div>
            <p className="mt-6 flex items-start gap-2 border-t border-paper-line pt-4 text-[13px] leading-relaxed text-text-tertiary lg:mt-auto">
              <Info size={15} strokeWidth={1.9} className="mt-0.5 shrink-0" aria-hidden />
              {CALC_NOTE}
            </p>
          </div>

          {/* Résultat : aujourd'hui, puis ce que vous récupérez, puis le calcul en clair */}
          <div className="flex flex-col overflow-hidden rounded-2xl bg-ink text-paper lg:self-start" aria-live="polite">
            <div className="p-5 sm:p-6">
              <p className="inline-flex items-center gap-1.5 rounded-md bg-paper/10 px-2 py-1 text-[11.5px] font-semibold text-paper/85 ring-1 ring-paper/15">
                <Calculator size={12} strokeWidth={2} aria-hidden />
                Estimation basée sur vos propres chiffres
              </p>
              <p className="mt-4 text-[14px] text-paper/70">
                Aujourd&apos;hui : <span className="font-semibold text-paper">{fmt(nowPerYear)} h par an</span> passées à chercher.
              </p>
              <dl className="mt-4 grid gap-5 min-[420px]:grid-cols-2 min-[420px]:gap-4">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/60">Temps récupéré</dt>
                  <dd className="mt-1.5 text-[2.4rem] font-semibold leading-none tracking-tight text-cyan sm:text-[2.6rem]">{fmt(perYear)}&nbsp;h</dd>
                  <dd className="mt-1.5 text-[13.5px] text-paper/70">par an · environ {fmt(days)} journées</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/60">Valeur</dt>
                  <dd className="mt-1.5 text-[2.4rem] font-semibold leading-none tracking-tight text-paper sm:text-[2.6rem]">{fmt(money)}&nbsp;€</dd>
                  <dd className="mt-1.5 text-[13.5px] text-paper/70">par an</dd>
                </div>
              </dl>
              <p className="mt-5 border-t border-paper/10 pt-4 text-[13.5px] leading-relaxed text-paper/75">
                Ce résultat n&apos;est pas une promesse. Il indique ce que vaut, chez vous, le temps passé à
                chercher une information qui existe déjà.
              </p>
            </div>

            {/* Le calcul, posé comme une opération */}
            <div className="border-t border-paper/10 bg-paper/[0.04] px-5 py-4 sm:px-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/55">Le calcul</p>
              <ol className="space-y-1 font-mono text-[12.5px] text-paper/80">
                <li>
                  {people} × {perDay} × {share} % = <span className="text-paper">{fmt(covered, 1)} recherches trouvées par jour</span>
                </li>
                <li>
                  × ({minutes} min − 30 s) = <span className="text-paper">{fmt(savedPerDay)} min par jour</span>
                </li>
                <li>
                  × {CALC_DAYS} jours ÷ 60 = <span className="text-paper">{fmt(perYear)} h par an</span>
                </li>
                <li>
                  × {cost} € de l&apos;heure = <span className="text-paper">{fmt(money)} € par an</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14.5px] font-medium text-text-primary">
          {label}
        </label>
        <output htmlFor={id} className="shrink-0 text-[15px] font-semibold text-text-primary">
          {value} <span className="text-[12.5px] font-normal text-text-tertiary">{unit}</span>
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full cursor-pointer accent-accent-primary"
      />
      {hint && <p className="mt-1 text-[12.5px] text-text-tertiary">{hint}</p>}
    </div>
  );
}
