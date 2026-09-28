"use client";

import { useId, useRef, useState } from "react";
import { Calculator, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { cn } from "@/lib/utils/cn";
import { CALC_DEFAULTS, CALC_NOTE, CALC_PRESETS } from "./aiPageData";

/**
 * /agents-ia, section C (claire) : le calculateur de temps récupéré.
 *
 * Le chiffre vient du visiteur (règle du projet) : volume, minutes par tâche, part
 * confiée à l'assistant, coût horaire. Aucun résultat client, aucune promesse : le
 * calcul est montré en clair, et la part réelle se mesure pendant le pilote.
 */

const fmt = (n: number, digits = 0) => n.toLocaleString("fr-FR", { maximumFractionDigits: digits, minimumFractionDigits: digits });

export function AiTimeCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const [preset, setPreset] = useState(CALC_PRESETS[0].id);
  const p = CALC_PRESETS.find((x) => x.id === preset) ?? CALC_PRESETS[0];
  const [volume, setVolume] = useState(p.volume);
  const [minutes, setMinutes] = useState(p.minutes);
  const [share, setShare] = useState(CALC_DEFAULTS.share);
  const [cost, setCost] = useState(CALC_DEFAULTS.cost);

  const pick = (id: string) => {
    const next = CALC_PRESETS.find((x) => x.id === id)!;
    setPreset(id);
    setVolume(next.volume);
    setMinutes(next.minutes);
  };

  // Le calcul, montré tel quel sous le résultat.
  const perDay = (volume * minutes * share) / 100; // minutes récupérées par jour
  const perWeek = (perDay * 5) / 60;
  const perYear = (perDay * CALC_DEFAULTS.days) / 60;
  const money = perYear * cost;
  const days = perYear / 7;

  return (
    <section
      ref={sectionRef}
      id="calcul"
      aria-labelledby="ai-calc-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="aiLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="ai-calc-heading"
          label="Votre calcul"
          title={
            <>
              Combien de temps vous récupérez,{" "}
              <span className="text-gradient-strong">avec vos chiffres</span>.
            </>
          }
          description="Choisissez une tâche, réglez les curseurs sur votre réalité. Le résultat se met à jour, et le calcul reste visible : pas de chiffre magique."
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
          {/* Réglages */}
          <div className="paper-card rounded-2xl p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">La tâche</p>
            <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Choisir une tâche">
              {CALC_PRESETS.map((x) => {
                const on = x.id === preset;
                const Icon = x.icon;
                return (
                  <button
                    key={x.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => pick(x.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[14px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                      on ? "border-ink bg-ink text-paper" : "border-paper-line-strong bg-paper text-text-secondary hover:border-accent-primary/50",
                    )}
                  >
                    <Icon size={16} strokeWidth={1.9} className={on ? "text-cyan" : "text-accent-dark"} aria-hidden />
                    {x.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <Slider label="Combien par jour" unit={p.unit} value={volume} min={1} max={200} step={1} onChange={setVolume} />
              <Slider label="Temps passé sur chacun" unit="minutes" value={minutes} min={1} max={60} step={1} onChange={setMinutes} />
              <Slider
                label="Part que l'assistant prend en charge"
                unit="%"
                value={share}
                min={10}
                max={90}
                step={5}
                onChange={setShare}
                hint="50 % est un point de départ prudent, à ajuster selon la tâche."
              />
              <Slider label="Coût d'une heure de travail" unit="€, charges comprises" value={cost} min={15} max={120} step={1} onChange={setCost} />
            </div>
          </div>

          {/* Résultat : deux lectures, puis le calcul en clair */}
          <div className="flex flex-col overflow-hidden rounded-2xl bg-ink text-paper lg:self-start" aria-live="polite">
            <div className="p-5 sm:p-6">
              <p className="inline-flex items-center gap-1.5 rounded-md bg-paper/10 px-2 py-1 text-[11.5px] font-semibold text-paper/85 ring-1 ring-paper/15">
                <Calculator size={12} strokeWidth={2} aria-hidden />
                Estimation basée sur vos propres chiffres
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/60">Temps</dt>
                  <dd className="mt-1.5 text-[2.4rem] font-semibold leading-none tracking-tight text-cyan sm:text-[2.9rem]">
                    {fmt(perYear)}&nbsp;h
                  </dd>
                  <dd className="mt-1.5 text-[13.5px] text-paper/70">par an · {fmt(perWeek, 1)} h par semaine</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/60">Valeur</dt>
                  <dd className="mt-1.5 text-[2.4rem] font-semibold leading-none tracking-tight text-paper sm:text-[2.9rem]">
                    {fmt(Math.round(money / 10) * 10)}&nbsp;€
                  </dd>
                  <dd className="mt-1.5 text-[13.5px] text-paper/70">par an · environ {fmt(days)} journées</dd>
                </div>
              </dl>
              <p className="mt-5 border-t border-paper/10 pt-4 text-[13.5px] leading-relaxed text-paper/75">
                Ce résultat n&apos;est pas une promesse. Il indique simplement la valeur du temps
                aujourd&apos;hui consacré à cette tâche.
              </p>
            </div>

            {/* Le calcul, posé comme une opération */}
            <div className="border-t border-paper/10 bg-paper/[0.04] px-5 py-4 sm:px-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/55">Le calcul</p>
              <ol className="space-y-1 font-mono text-[12.5px] text-paper/80">
                <li>
                  {volume} × {minutes} min × {share} % = <span className="text-paper">{fmt(perDay)} min par jour</span>
                </li>
                <li>
                  × {CALC_DEFAULTS.days} jours ÷ 60 = <span className="text-paper">{fmt(perYear)} h par an</span>
                </li>
                <li>
                  × {cost} € de l&apos;heure = <span className="text-paper">{fmt(Math.round(money / 10) * 10)} € par an</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <p className="mt-5 flex items-start gap-2 text-[13.5px] leading-relaxed text-text-tertiary">
          <Info size={15} strokeWidth={1.9} className="mt-0.5 shrink-0" aria-hidden />
          {CALC_NOTE}
        </p>
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
