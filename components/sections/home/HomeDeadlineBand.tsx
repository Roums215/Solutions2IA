import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

/**
 * Note réglementaire AUTHENTIQUE : une obligation légale datée, pas une pression
 * commerciale. Statique (aucune animation), pas de h2 : c'est un aside.
 * Calendrier : réception obligatoire pour toutes les entreprises assujetties à la TVA
 * depuis le 1er septembre 2026 ; émission obligatoire pour les PME et TPE à partir du
 * 1er septembre 2027.
 *
 * LOT 4B : sortie du milieu du récit, placée après les cinq solutions.
 * LOT 4C : petite carte métier à trois zones (échéance, ce qui change, ce que je
 * connecte), sans verre ni halo, dans la hiérarchie de rayons du site.
 */

const ZONES: { label: string; value: string; detail: string }[] = [
  {
    label: "Prochaine échéance",
    value: "01.09.2027",
    detail: "L'émission devient obligatoire pour les PME et les TPE.",
  },
  {
    label: "Ce qui change",
    value: "01.09.2026",
    detail:
      "La réception est déjà obligatoire pour toutes les entreprises assujetties à la TVA.",
  },
  {
    label: "Ce que je peux connecter",
    value: "Vos outils actuels",
    detail: "L'émission et la réception s'automatisent depuis ce que vous utilisez déjà.",
  },
];

export function HomeDeadlineBand() {
  return (
    <aside
      className="relative py-8 lg:py-10"
      aria-label="Facture électronique : obligation en vigueur et prochaine échéance"
    >
      <div className="section-container">
        {/* LOT 4G : en-tête éclairé pleine largeur, corps sur la surface de la carte. */}
        <div className="panel-card mx-auto max-w-[1040px] overflow-hidden rounded-2xl">
          <div className="panel-head flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3.5 sm:px-5">
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyan/12 text-cyan ring-1 ring-inset ring-cyan/25"
            >
              <CalendarClock size={16} strokeWidth={1.75} />
            </span>
            <p className="text-sm font-semibold text-text-primary">Facture électronique</p>
            <Link
              href="/automatisation#facture-electronique-2026"
              className="group ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-sm text-[13px] font-medium text-text-secondary underline-offset-4 transition-colors duration-300 hover:text-text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
            >
              Ce que je fais pour ça
              <ArrowRight
                size={13}
                strokeWidth={1.75}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <dl className="grid gap-3.5 px-4 py-4 sm:grid-cols-3 sm:gap-0 sm:px-5 sm:py-5">
            {ZONES.map((zone, i) => (
              <div
                key={zone.label}
                className={i > 0 ? "sm:border-l sm:border-border-medium sm:pl-5" : "sm:pr-5"}
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  {zone.label}
                </dt>
                <dd>
                  <span className="mt-1.5 block font-mono text-[15px] font-semibold tracking-[0.04em] text-text-primary">{zone.value}</span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-text-secondary">{zone.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </aside>
  );
}
