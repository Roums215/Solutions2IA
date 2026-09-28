"use client";

import { useId, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const WORK_DAYS_PER_MONTH = 21;
/** Objectif fixé à l'étape 4 de l'installation : une réponse sourcée en moins de 30 secondes. */
const TARGET_MINUTES_PER_SEARCH = 0.5;

type FieldKey = "people" | "perDay" | "minutes";

type Field = {
  key: FieldKey;
  label: string;
  min: number;
  max: number;
  unit: (value: number) => string;
};

const FIELDS: Field[] = [
  {
    key: "people",
    label: "Personnes qui cherchent de l'information",
    min: 1,
    max: 50,
    unit: (v) => (v > 1 ? "personnes" : "personne"),
  },
  {
    key: "perDay",
    label: "Recherches par personne et par jour",
    min: 1,
    max: 10,
    unit: () => "par jour",
  },
  {
    key: "minutes",
    label: "Minutes perdues par recherche",
    min: 2,
    max: 15,
    unit: () => "min",
  },
];

function monthlyHours(searchesPerDay: number, minutesPerSearch: number) {
  return ((searchesPerDay * minutesPerSearch) / 60) * WORK_DAYS_PER_MONTH;
}

function formatHours(hours: number) {
  return hours < 1 ? "moins d'1 h" : `${Math.round(hours)} h`;
}

/**
 * Le gain chiffré, calculé avec le visiteur (trois curseurs).
 * Statut du chiffre explicite : un calcul, pas une statistique.
 * L'objectif « 30 secondes » est celui mesuré à l'étape 4 de l'installation.
 */
export function RagSearchTime() {
  const id = useId();
  const [values, setValues] = useState<Record<FieldKey, number>>({
    people: 10,
    perDay: 5,
    minutes: 8,
  });

  const searchesPerDay = values.people * values.perDay;
  const hoursPerDay = (searchesPerDay * values.minutes) / 60;
  const hoursNow = monthlyHours(searchesPerDay, values.minutes);
  const hoursTarget = monthlyHours(searchesPerDay, TARGET_MINUTES_PER_SEARCH);
  const hoursPerDayLabel = hoursPerDay.toFixed(1).replace(".", ",");

  return (
    <section className="section-shell-tight">
      <div className="section-container">
        <SectionHeading
          label="Faites le calcul"
          title={
            <>
              Combien de temps vos équipes passent-elles{" "}
              <span className="text-gradient-strong">à chercher</span> ?
            </>
          }
          description="Trois curseurs, vos chiffres. Le résultat est un calcul, pas une statistique : je n'ai aucun chiffre client à vous montrer, et je préfère vous le dire."
        />

        <div className="mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <div className="space-y-8">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor={`${id}-${f.key}`}
                    className="text-sm font-medium text-text-primary sm:text-[15px]"
                  >
                    {f.label}
                  </label>
                  <span className="text-sm tabular-nums text-cyan">
                    {values[f.key]} {f.unit(values[f.key])}
                  </span>
                </div>
                <input
                  id={`${id}-${f.key}`}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={1}
                  value={values[f.key]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [f.key]: Number(e.target.value) }))
                  }
                  className="mt-3 w-full accent-cyan"
                />
              </div>
            ))}
          </div>

          <div className="metric-tile p-8 text-center sm:p-10" aria-live="polite">
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
              Aujourd&apos;hui, avec vos chiffres
            </div>
            <div className="mt-4 text-5xl font-bold tracking-[-0.03em] text-gradient-strong sm:text-6xl">
              {formatHours(hoursNow)}
            </div>
            <p className="mt-2 text-sm text-text-secondary sm:text-[15px]">
              par mois passées à chercher une information
              <span className="mt-1 block text-xs text-text-tertiary">
                ({hoursPerDayLabel} h par jour ouvré, sur 21 jours)
              </span>
            </p>

            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

            <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan/80">
              Objectif avec la mémoire
            </div>
            <div className="mt-2 text-3xl font-bold tracking-[-0.03em] text-text-primary sm:text-4xl">
              {formatHours(hoursTarget)}
            </div>
            <p className="mt-1 text-xs text-text-tertiary">
              par mois, à 30 secondes par recherche
            </p>

            <p className="mt-6 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
              C&apos;est l&apos;objectif que je fixe et que l&apos;on mesure ensemble à
              l&apos;étape 4 de l&apos;installation :{" "}
              <span className="text-text-primary">
                une réponse sourcée en moins de 30 secondes
              </span>
              , sur 20 vraies questions de vos équipes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
