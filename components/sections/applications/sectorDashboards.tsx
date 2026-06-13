"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// ─── Common types ────────────────────────────────────────────────────────────

export type SectorSlug =
  | "sante"
  | "retail"
  | "industrie"
  | "services-pro"
  | "logistique"
  | "immobilier";

export type AlertLevel = "ok" | "warn" | "alert" | "info";

export type Alert = {
  level: AlertLevel;
  time: string;
  text: string;
};

export type SectorDashboard = {
  slug: SectorSlug;
  short: string;
  meta: string;
  domain: string;
  alerts: Alert[];
};

// ─── Common helpers ──────────────────────────────────────────────────────────

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function DashboardHeader({
  meta,
  domain,
  reduced,
}: {
  meta: string;
  domain: string;
  reduced: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border-subtle/60 px-5 py-3.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={[
              "absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70",
              reduced ? "" : "animate-ping",
            ].join(" ")}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
          Live · {meta}
        </p>
      </div>
      <span className="ml-3 shrink-0 font-mono text-[10px] text-text-tertiary">
        {domain}
      </span>
    </div>
  );
}

function alertIcon(level: AlertLevel) {
  if (level === "alert") return "●";
  if (level === "warn") return "▲";
  if (level === "info") return "◆";
  return "✓";
}

function alertColor(level: AlertLevel) {
  if (level === "alert") return "text-red-400";
  if (level === "warn") return "text-amber-400";
  if (level === "info") return "text-cyan";
  return "text-green-400";
}

function AlertsFooter({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="border-t border-border-subtle/60 px-5 py-3">
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan/85">
        Alertes récentes
      </p>
      <ul className="space-y-1.5">
        {alerts.slice(0, 2).map((a, i) => (
          <li key={i} className="flex items-start gap-2 truncate font-mono text-[11px] leading-5 text-text-secondary">
            <span className={["mt-0.5 shrink-0", alertColor(a.level)].join(" ")}>
              {alertIcon(a.level)}
            </span>
            <span className="truncate">
              <span className="text-text-tertiary">{a.time}</span> · {a.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
      {children}
    </p>
  );
}

function DeltaPill({ value, dir }: { value: string; dir: "up" | "down" }) {
  return (
    <span className={["ml-1.5 text-xs", dir === "up" ? "text-green-400" : "text-cyan"].join(" ")}>
      {dir === "up" ? "▲" : "▼"} {value}
    </span>
  );
}

// ─── Stagger helpers ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: PREMIUM_EASE } },
};

function StaggerSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ─── 1. SANTÉ — Cockpit cabinet médical ─────────────────────────────────────

const SANTE: SectorDashboard = {
  slug: "sante",
  short: "Santé",
  meta: "Cabinet · 4 praticiens",
  domain: "cabinet.santé",
  alerts: [
    { level: "alert", time: "14:22", text: "Tiers-payant rejeté · à corriger" },
    { level: "ok", time: "14:08", text: "DMP synchro · 47 dossiers" },
  ],
};

const PRACTITIONERS = [
  { name: "Dr Martin", status: "Téléconsult", time: "14:25", level: "ok" as AlertLevel },
  { name: "Dr Bensimon", status: "Consultation", time: "14:12", level: "ok" as AlertLevel },
  { name: "Dr Dupont", status: "Salle d'attente · 4 patients", time: "14:30", level: "warn" as AlertLevel },
  { name: "Dr Aubry", status: "Disponible", time: "—", level: "info" as AlertLevel },
];

// Slots de la journée (8h-19h), une marque par RDV
const SANTE_SLOTS: { x: number; status: "done" | "current" | "upcoming" | "noshow" }[] = (() => {
  const out: { x: number; status: "done" | "current" | "upcoming" | "noshow" }[] = [];
  // 44 RDV répartis 8h-19h
  for (let i = 0; i < 44; i++) {
    const x = (i / 43) * 100;
    let status: "done" | "current" | "upcoming" | "noshow" = "done";
    if (i === 28) status = "current";
    else if (i > 28) status = "upcoming";
    if (i === 4 || i === 11 || i === 17 || i === 22 || i === 24 || i === 27) status = "noshow";
    out.push({ x, status });
  }
  return out;
})();

function SanteDashboard({ reduced }: { reduced: boolean }) {
  return (
    <>
      <DashboardHeader meta={SANTE.meta} domain={SANTE.domain} reduced={reduced} />
      <StaggerSection className="px-5 pt-4 pb-3">
        <StaggerItem>
          <div className="flex items-end justify-between gap-3">
            <div>
              <SectionLabel>Agenda du jour</SectionLabel>
              <p className="mt-1 font-mono text-[20px] text-text-primary">
                284 RDV honorés
                <DeltaPill value="+2,1 %" dir="up" />
              </p>
            </div>
            <div className="text-right text-[10px] text-text-tertiary">
              <p>8 h ──── 13 h ──── 19 h</p>
              <p className="mt-1">6 no-show · 12 à venir</p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-3 rounded-md border border-border-subtle/70 bg-bg-card/40 px-3 py-3">
            <div className="relative h-7">
              {/* Timeline base */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-border-medium) 12%, var(--color-border-medium) 88%, transparent)",
                }}
              />
              {/* Hour ticks */}
              {[0, 20, 40, 60, 80, 100].map((x) => (
                <div
                  key={x}
                  className="absolute top-1/2 h-2 w-px -translate-y-1/2"
                  style={{
                    left: `${x}%`,
                    background: "var(--color-border-medium)",
                  }}
                />
              ))}
              {/* RDV dots */}
              {SANTE_SLOTS.map((s, i) => {
                const color =
                  s.status === "done"
                    ? "rgba(74,222,128,0.85)" // green-400
                    : s.status === "current"
                    ? "var(--color-cyan)"
                    : s.status === "noshow"
                    ? "rgba(248,113,113,0.85)" // red-400
                    : "rgba(156,163,175,0.5)"; // gray for upcoming
                const ringOpacity = s.status === "current" ? "0.45" : "0";
                return (
                  <motion.span
                    key={i}
                    className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: `${s.x}%`,
                      background: color,
                      boxShadow: s.status === "current" ? `0 0 10px ${color}` : undefined,
                    }}
                    initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                    animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.005 }}
                    aria-hidden
                  >
                    {s.status === "current" && !reduced && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ background: color, opacity: ringOpacity }}
                        animate={{ scale: [1, 2.2, 1], opacity: [0.45, 0, 0.45] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </motion.span>
                );
              })}
            </div>
            <div className="mt-2.5 flex items-center gap-3 text-[9px] text-text-tertiary">
              <Legend dot="rgba(74,222,128,0.85)" label="Honoré" />
              <Legend dot="var(--color-cyan)" label="En cours" />
              <Legend dot="rgba(248,113,113,0.85)" label="No-show" />
              <Legend dot="rgba(156,163,175,0.5)" label="À venir" />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Praticiens — statut temps réel</SectionLabel>
            <ul className="mt-2 space-y-1.5">
              {PRACTITIONERS.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between rounded-md border border-border-subtle/60 bg-bg-card/30 px-3 py-1.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={["text-xs", alertColor(p.level)].join(" ")}>●</span>
                    <span className="truncate text-[12px] font-medium text-text-primary">
                      {p.name}
                    </span>
                    <span className="truncate text-[11px] text-text-tertiary">
                      · {p.status}
                    </span>
                  </div>
                  <span className="ml-3 shrink-0 font-mono text-[10px] text-text-tertiary">
                    {p.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem>
          <KpiTriRow
            tiles={[
              { value: "6,4 %", label: "No-show", trend: "down" },
              { value: "98,2 %", label: "Télétransmission", trend: "up" },
              { value: "4,2 j", label: "Délai RDV", trend: "down" },
            ]}
          />
        </StaggerItem>
      </StaggerSection>

      <AlertsFooter alerts={SANTE.alerts} />
    </>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}

function KpiTriRow({
  tiles,
}: {
  tiles: { value: string; label: string; trend: "up" | "down" }[];
}) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="rounded-md border border-border-subtle/70 bg-bg-card/40 px-3 py-2"
        >
          <p className="truncate text-[9px] font-medium uppercase tracking-[0.18em] text-text-tertiary">
            {t.label}
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-[13px] font-semibold text-text-primary">{t.value}</span>
            <span className={["text-[10px]", t.trend === "up" ? "text-green-400" : "text-cyan"].join(" ")}>
              {t.trend === "up" ? "▲" : "▼"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 2. RETAIL — Pilotage e-commerce ────────────────────────────────────────

const RETAIL: SectorDashboard = {
  slug: "retail",
  short: "Retail",
  meta: "Marketplace · 3 canaux",
  domain: "shop.metier",
  alerts: [
    { level: "warn", time: "14:31", text: "Stock critique · ref XR-12 (4 u.) · WR-3 (8 u.)" },
    { level: "ok", time: "13:48", text: "Click & collect prêts · 23 retraits" },
  ],
};

const RETAIL_PRODUCTS = [
  { name: "Hoodie Black", count: 142, value: "14 280 €", w: 100 },
  { name: "Sneaker WR-3", count: 98, value: "12 720 €", w: 69 },
  { name: "T-shirt Logo", count: 76, value: "3 040 €", w: 54 },
];

const RETAIL_FUNNEL = [
  { label: "Visites", value: "12 480", w: 100, color: "rgba(34,211,238,0.7)" },
  { label: "Panier", value: "892 · 7,1 %", w: 28, color: "rgba(34,211,238,0.85)" },
  { label: "Achat", value: "401 · 3,2 %", w: 13, color: "var(--color-cyan)" },
];

function RetailDashboard({ reduced }: { reduced: boolean }) {
  return (
    <>
      <DashboardHeader meta={RETAIL.meta} domain={RETAIL.domain} reduced={reduced} />
      <StaggerSection className="px-5 pt-4 pb-3">
        <StaggerItem>
          <div className="flex items-end justify-between gap-3">
            <div>
              <SectionLabel>Commandes · 24 h</SectionLabel>
              <p className="mt-1 font-mono text-[20px] text-text-primary">
                1 247
                <DeltaPill value="+14,3 %" dir="up" />
              </p>
            </div>
            <div className="text-right">
              <SectionLabel>Panier moyen</SectionLabel>
              <p className="mt-1 font-mono text-[16px] text-text-primary">
                87 €<DeltaPill value="+4,2 %" dir="up" />
              </p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Top produits · 24 h</SectionLabel>
            <ul className="mt-2 space-y-1.5">
              {RETAIL_PRODUCTS.map((p, i) => (
                <li
                  key={p.name}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-border-subtle/60 bg-bg-card/30 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-mono text-text-tertiary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate text-[12px] font-medium text-text-primary">
                        {p.name}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-bg-card/60">
                      <motion.span
                        className="block h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--color-cyan), var(--color-accent-light))",
                        }}
                        initial={reduced ? false : { width: 0 }}
                        animate={reduced ? undefined : { width: `${p.w}%` }}
                        transition={{ duration: 0.9, delay: 0.1 * i, ease: PREMIUM_EASE }}
                      />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-[12px] text-text-primary">{p.count}</p>
                    <p className="font-mono text-[10px] text-text-tertiary">{p.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Funnel conversion</SectionLabel>
            <ul className="mt-2 space-y-1.5">
              {RETAIL_FUNNEL.map((f, i) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-[11px] text-text-secondary">{f.label}</span>
                  <div className="relative h-5 flex-1 overflow-hidden rounded-md border border-border-subtle/50 bg-bg-card/40">
                    <motion.span
                      className="absolute inset-y-0 left-0 block rounded-md"
                      style={{ background: f.color }}
                      initial={reduced ? false : { width: 0 }}
                      animate={reduced ? undefined : { width: `${f.w}%` }}
                      transition={{ duration: 0.9, delay: 0.1 * i, ease: PREMIUM_EASE }}
                    />
                    <span className="absolute inset-y-0 left-2 flex items-center font-mono text-[10px] text-text-primary">
                      {f.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      </StaggerSection>

      <AlertsFooter alerts={RETAIL.alerts} />
    </>
  );
}

// ─── 3. INDUSTRIE — Cockpit atelier ─────────────────────────────────────────

const INDUSTRIE: SectorDashboard = {
  slug: "industrie",
  short: "Industrie",
  meta: "Atelier · 4 lignes",
  domain: "production.atelier",
  alerts: [
    { level: "warn", time: "14:18", text: "Ligne B en maintenance préventive" },
    { level: "ok", time: "14:02", text: "OF 4287 terminé · 240 pièces" },
  ],
};

const LINES = [
  { name: "Ligne A", oee: 82, status: "Run" as const, level: "ok" as AlertLevel },
  { name: "Ligne B", oee: 0, status: "Arrêt", level: "warn" as AlertLevel },
  { name: "Ligne C", oee: 76, status: "Run", level: "ok" as AlertLevel },
  { name: "Ligne D", oee: 78, status: "Run", level: "ok" as AlertLevel },
];

function IndustrieDashboard({ reduced }: { reduced: boolean }) {
  return (
    <>
      <DashboardHeader meta={INDUSTRIE.meta} domain={INDUSTRIE.domain} reduced={reduced} />
      <StaggerSection className="px-5 pt-4 pb-3">
        <StaggerItem>
          <div className="flex items-end justify-between gap-3">
            <div>
              <SectionLabel>Production · 24 h</SectionLabel>
              <p className="mt-1 font-mono text-[20px] text-text-primary">
                1 842 / 2 200 pièces
                <DeltaPill value="+5,7 %" dir="up" />
              </p>
            </div>
            <div className="text-right text-[11px] text-text-tertiary">
              <p>Cadence : 76 / h</p>
              <p className="mt-0.5">84 % de l&apos;objectif</p>
            </div>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-bg-card/60">
            <motion.span
              className="block h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-cyan), var(--color-accent-light))",
              }}
              initial={reduced ? false : { width: 0 }}
              animate={reduced ? undefined : { width: "84%" }}
              transition={{ duration: 1.1, ease: PREMIUM_EASE }}
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>OEE par ligne — temps réel</SectionLabel>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LINES.map((l, i) => {
                const offline = l.oee === 0;
                return (
                  <motion.div
                    key={l.name}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 * i, ease: PREMIUM_EASE }}
                    className={[
                      "rounded-md border bg-bg-card/40 px-2.5 py-2.5",
                      offline ? "border-amber-400/30" : "border-border-subtle/70",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-text-secondary">
                        {l.name}
                      </span>
                      <span className={["text-[10px]", alertColor(l.level)].join(" ")}>
                        ●
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[18px] font-semibold text-text-primary">
                      {l.oee}%
                    </p>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-bg-card/60">
                      <motion.span
                        className={[
                          "block h-full rounded-full",
                          offline ? "" : "",
                        ].join(" ")}
                        style={{
                          background: offline
                            ? "rgba(251,191,36,0.55)"
                            : "linear-gradient(90deg, var(--color-cyan), var(--color-accent-light))",
                        }}
                        initial={reduced ? false : { width: 0 }}
                        animate={reduced ? undefined : { width: `${Math.max(l.oee, 6)}%` }}
                        transition={{ duration: 0.9, delay: 0.1 * i, ease: PREMIUM_EASE }}
                      />
                    </div>
                    <p className="mt-1.5 text-[10px] text-text-tertiary">{l.status}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <KpiTriRow
            tiles={[
              { value: "78,4 %", label: "TRS", trend: "up" },
              { value: "0,8 %", label: "Rebut", trend: "down" },
              { value: "142 h", label: "MTBF", trend: "up" },
            ]}
          />
        </StaggerItem>
      </StaggerSection>

      <AlertsFooter alerts={INDUSTRIE.alerts} />
    </>
  );
}

// ─── 4. SERVICES PRO — Cockpit cabinet conseil ──────────────────────────────

const SERVICES: SectorDashboard = {
  slug: "services-pro",
  short: "Services pro",
  meta: "Cabinet · 12 collaborateurs",
  domain: "cabinet.metier",
  alerts: [
    { level: "alert", time: "14:09", text: "Conflit d'intérêts · dossier 2389" },
    { level: "ok", time: "14:24", text: "Facture Chorus Pro envoyée · 12 480 €" },
  ],
};

const BILLABLE = { current: 73.2, target: 75 };
const PIPELINE = [
  { stage: "À émettre", count: 3, amount: "4 200 €" },
  { stage: "En cours", count: 5, amount: "12 480 €" },
  { stage: "Émises", count: 8, amount: "28 600 €" },
  { stage: "Payées", count: 29, amount: "142 800 €" },
];
const MATTERS = [
  { name: "Kering · M&A", hours: "4 h 32", w: 60 },
  { name: "Crédit Agricole · Contentieux", hours: "6 h 14", w: 88 },
  { name: "Veolia · Conseil", hours: "3 h 45", w: 50 },
];

function ServicesProDashboard({ reduced }: { reduced: boolean }) {
  return (
    <>
      <DashboardHeader meta={SERVICES.meta} domain={SERVICES.domain} reduced={reduced} />
      <StaggerSection className="px-5 pt-4 pb-3">
        <StaggerItem>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-border-subtle/70 bg-bg-card/40 px-3 py-2.5">
              <div className="flex items-baseline justify-between">
                <SectionLabel>Billable rate</SectionLabel>
                <span className="text-[10px] text-text-tertiary">cible 75 %</span>
              </div>
              <p className="mt-1 font-mono text-[20px] text-text-primary">
                {BILLABLE.current.toFixed(1)} %
              </p>
              <div className="relative mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg-card/60">
                <motion.span
                  className="block h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-cyan), var(--color-accent-light))",
                  }}
                  initial={reduced ? false : { width: 0 }}
                  animate={reduced ? undefined : { width: `${BILLABLE.current}%` }}
                  transition={{ duration: 1, ease: PREMIUM_EASE }}
                />
                <span
                  aria-hidden
                  className="absolute inset-y-0 w-px bg-amber-300/70"
                  style={{ left: `${BILLABLE.target}%` }}
                />
              </div>
            </div>
            <div className="rounded-md border border-border-subtle/70 bg-bg-card/40 px-3 py-2.5">
              <div className="flex items-baseline justify-between">
                <SectionLabel>Realization</SectionLabel>
                <span className="text-[10px] text-text-tertiary">vs Q3</span>
              </div>
              <p className="mt-1 font-mono text-[20px] text-text-primary">
                91,4 %<DeltaPill value="+1,8 pt" dir="up" />
              </p>
              <p className="mt-1.5 text-[11px] text-text-tertiary">
                Au-dessus du benchmark cabinet
              </p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Pipeline facturation</SectionLabel>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {PIPELINE.map((p, i) => (
                <motion.div
                  key={p.stage}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.07 * i, ease: PREMIUM_EASE }}
                  className="rounded-md border border-border-subtle/60 bg-bg-card/30 px-2 py-2"
                >
                  <p className="truncate text-[9px] font-semibold uppercase tracking-[0.15em] text-text-tertiary">
                    {p.stage}
                  </p>
                  <p className="mt-1 font-mono text-[13px] text-text-primary">{p.amount}</p>
                  <p className="font-mono text-[10px] text-text-tertiary">{p.count} dossiers</p>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Dossiers actifs — heures du jour</SectionLabel>
            <ul className="mt-2 space-y-1.5">
              {MATTERS.map((m, i) => (
                <li
                  key={m.name}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-border-subtle/60 bg-bg-card/30 px-3 py-2"
                >
                  <div className="min-w-0">
                    <span className="truncate block text-[12px] font-medium text-text-primary">
                      {m.name}
                    </span>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-bg-card/60">
                      <motion.span
                        className="block h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--color-cyan), var(--color-accent-light))",
                        }}
                        initial={reduced ? false : { width: 0 }}
                        animate={reduced ? undefined : { width: `${m.w}%` }}
                        transition={{ duration: 0.9, delay: 0.1 * i, ease: PREMIUM_EASE }}
                      />
                    </div>
                  </div>
                  <span className="font-mono text-[12px] text-text-primary">{m.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      </StaggerSection>

      <AlertsFooter alerts={SERVICES.alerts} />
    </>
  );
}

// ─── 5. LOGISTIQUE — Cockpit tournées ───────────────────────────────────────

const LOGISTIQUE: SectorDashboard = {
  slug: "logistique",
  short: "Logistique",
  meta: "Tournées · 18 véhicules",
  domain: "ops.tournees",
  alerts: [
    { level: "warn", time: "14:13", text: "Retard détecté · ETA +12 min · T-4" },
    { level: "ok", time: "14:27", text: "ePOD signé · CLT-8492" },
  ],
};

// 18 véhicules positionnés sur une "carte" abstraite (viewBox 100x55)
const FLEET = [
  { x: 12, y: 14, status: "go" as const },
  { x: 22, y: 26, status: "go" as const },
  { x: 30, y: 16, status: "delivered" as const },
  { x: 38, y: 30, status: "go" as const },
  { x: 46, y: 12, status: "go" as const },
  { x: 52, y: 24, status: "go" as const },
  { x: 60, y: 34, status: "delivered" as const },
  { x: 68, y: 18, status: "go" as const },
  { x: 75, y: 28, status: "problem" as const },
  { x: 82, y: 14, status: "go" as const },
  { x: 88, y: 32, status: "go" as const },
  { x: 18, y: 38, status: "go" as const },
  { x: 28, y: 44, status: "go" as const },
  { x: 42, y: 42, status: "delivered" as const },
  { x: 56, y: 46, status: "go" as const },
  { x: 70, y: 44, status: "go" as const },
  { x: 80, y: 40, status: "problem" as const },
  { x: 90, y: 46, status: "delivered" as const },
];

const TOUR_STATUS = [
  { label: "En route", count: 12, color: "rgba(74,222,128,0.85)", w: 67 },
  { label: "Livré", count: 4, color: "var(--color-cyan)", w: 22 },
  { label: "Problème", count: 2, color: "rgba(248,113,113,0.85)", w: 11 },
];

function LogistiqueDashboard({ reduced }: { reduced: boolean }) {
  return (
    <>
      <DashboardHeader meta={LOGISTIQUE.meta} domain={LOGISTIQUE.domain} reduced={reduced} />
      <StaggerSection className="px-5 pt-4 pb-3">
        <StaggerItem>
          <div className="flex items-end justify-between gap-3">
            <div>
              <SectionLabel>Livraisons · 24 h</SectionLabel>
              <p className="mt-1 font-mono text-[20px] text-text-primary">
                642
                <DeltaPill value="+3,4 %" dir="up" />
              </p>
            </div>
            <div className="text-right text-[10px] text-text-tertiary">
              <p>18 véhicules actifs</p>
              <p className="mt-0.5">ETA moyen 18 min</p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-3 rounded-md border border-border-subtle/70 bg-bg-card/40 p-3">
            <SectionLabel>Flotte temps réel</SectionLabel>
            <div className="mt-2">
              <svg viewBox="0 0 100 55" className="w-full" role="img" aria-label="Carte abstraite des véhicules en tournée">
                <defs>
                  <linearGradient id="logmap-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--color-accent-light)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Background routes (abstract) */}
                <path d="M 0 28 Q 25 18 50 30 T 100 24" fill="none" stroke="url(#logmap-grad)" strokeWidth="0.4" strokeDasharray="1 1.5" />
                <path d="M 0 42 Q 30 38 60 42 T 100 38" fill="none" stroke="url(#logmap-grad)" strokeWidth="0.4" strokeDasharray="1 1.5" />
                <path d="M 0 10 Q 35 4 70 14 T 100 8" fill="none" stroke="url(#logmap-grad)" strokeWidth="0.4" strokeDasharray="1 1.5" />
                {/* Vehicle dots */}
                {FLEET.map((v, i) => {
                  const color =
                    v.status === "delivered"
                      ? "var(--color-cyan)"
                      : v.status === "problem"
                      ? "rgba(248,113,113,0.9)"
                      : "rgba(74,222,128,0.85)";
                  return (
                    <g key={i}>
                      {v.status === "go" && !reduced && (
                        <motion.circle
                          cx={v.x}
                          cy={v.y}
                          r={1.2}
                          fill={color}
                          opacity={0.35}
                          style={{ transformBox: "fill-box", transformOrigin: "center" }}
                          animate={{ scale: [1, 2, 1], opacity: [0.35, 0, 0.35] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.08 }}
                        />
                      )}
                      <motion.circle
                        cx={v.x}
                        cy={v.y}
                        r={0.9}
                        fill={color}
                        initial={reduced ? false : { opacity: 0, scale: 0 }}
                        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.025 }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] text-text-tertiary">
              <Legend dot="rgba(74,222,128,0.85)" label="En route" />
              <Legend dot="var(--color-cyan)" label="Livré" />
              <Legend dot="rgba(248,113,113,0.9)" label="Problème" />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Statut tournées</SectionLabel>
            <ul className="mt-2 space-y-1.5">
              {TOUR_STATUS.map((s, i) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-[11px] text-text-secondary">{s.label}</span>
                  <span className="w-6 shrink-0 font-mono text-[11px] text-text-primary">{s.count}</span>
                  <div className="relative h-2.5 flex-1 overflow-hidden rounded-md border border-border-subtle/40 bg-bg-card/40">
                    <motion.span
                      className="block h-full rounded-md"
                      style={{ background: s.color }}
                      initial={reduced ? false : { width: 0 }}
                      animate={reduced ? undefined : { width: `${s.w}%` }}
                      transition={{ duration: 0.9, delay: 0.1 * i, ease: PREMIUM_EASE }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem>
          <KpiTriRow
            tiles={[
              { value: "98,7 %", label: "OTD", trend: "up" },
              { value: "94,2 %", label: "1er essai", trend: "up" },
              { value: "2,14 €", label: "Coût / colis", trend: "down" },
            ]}
          />
        </StaggerItem>
      </StaggerSection>

      <AlertsFooter alerts={LOGISTIQUE.alerts} />
    </>
  );
}

// ─── 6. IMMOBILIER / BTP — Cockpit chantiers ────────────────────────────────

const IMMOBILIER: SectorDashboard = {
  slug: "immobilier",
  short: "Immo / BTP",
  meta: "Multi-chantiers · 7 sites",
  domain: "chantiers.live",
  alerts: [
    { level: "ok", time: "14:04", text: "Devis signé · 24 500 € HT" },
    { level: "info", time: "14:21", text: "Photo terrain · chantier Bordeaux 2" },
  ],
};

const SITES = [
  { name: "Bordeaux 2", progress: 68, statusLabel: "+3 j d'avance", level: "ok" as AlertLevel },
  { name: "Lyon Part-Dieu", progress: 42, statusLabel: "-12 j de retard", level: "warn" as AlertLevel },
  { name: "Marseille Joliette", progress: 89, statusLabel: "Levée OK · 4 items", level: "ok" as AlertLevel },
  { name: "Toulouse Centre", progress: 24, statusLabel: "Démarré", level: "info" as AlertLevel },
];

const CREWS = [
  { site: "Bordeaux 2", count: 7 },
  { site: "Lyon Part-Dieu", count: 5 },
  { site: "Marseille", count: 3 },
  { site: "Toulouse", count: 2 },
];

function ImmoDashboard({ reduced }: { reduced: boolean }) {
  return (
    <>
      <DashboardHeader meta={IMMOBILIER.meta} domain={IMMOBILIER.domain} reduced={reduced} />
      <StaggerSection className="px-5 pt-4 pb-3">
        <StaggerItem>
          <div className="flex items-end justify-between gap-3">
            <div>
              <SectionLabel>Pointages · 24 h</SectionLabel>
              <p className="mt-1 font-mono text-[20px] text-text-primary">
                1 284
                <DeltaPill value="+4,2 %" dir="up" />
              </p>
            </div>
            <div className="text-right text-[11px] text-text-tertiary">
              <p>4 chantiers actifs</p>
              <p className="mt-0.5">17 équipes · 7 sites</p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Chantiers en cours</SectionLabel>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {SITES.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.07 * i, ease: PREMIUM_EASE }}
                  className="rounded-md border border-border-subtle/70 bg-bg-card/40 px-3 py-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate text-[12px] font-semibold text-text-primary">
                      {s.name}
                    </span>
                    <span className={["text-[10px]", alertColor(s.level)].join(" ")}>●</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[16px] font-semibold text-text-primary">
                      {s.progress}%
                    </span>
                    <span className="truncate text-[10px] text-text-tertiary">
                      {s.statusLabel}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg-card/60">
                    <motion.span
                      className="block h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-cyan), var(--color-accent-light))",
                      }}
                      initial={reduced ? false : { width: 0 }}
                      animate={reduced ? undefined : { width: `${s.progress}%` }}
                      transition={{ duration: 0.9, delay: 0.1 * i, ease: PREMIUM_EASE }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-4">
            <SectionLabel>Pointage temps réel — équipes présentes</SectionLabel>
            <ul className="mt-2 space-y-1">
              {CREWS.map((c) => (
                <li
                  key={c.site}
                  className="flex items-center justify-between rounded-md border border-border-subtle/60 bg-bg-card/30 px-3 py-1.5"
                >
                  <span className="truncate text-[11px] text-text-secondary">{c.site}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] text-text-primary">{c.count}</span>
                    <span className="flex gap-0.5" aria-hidden>
                      {Array.from({ length: c.count }).map((_, i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-cyan/80"
                        />
                      ))}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem>
          <KpiTriRow
            tiles={[
              { value: "14,8 %", label: "Marge chantier", trend: "up" },
              { value: "92 %", label: "Respect délais", trend: "up" },
              { value: "38 %", label: "Devis → contrat", trend: "up" },
            ]}
          />
        </StaggerItem>
      </StaggerSection>

      <AlertsFooter alerts={IMMOBILIER.alerts} />
    </>
  );
}

// ─── Registry ───────────────────────────────────────────────────────────────

export const SECTOR_DASHBOARDS: Array<{
  slug: SectorSlug;
  short: string;
  meta: string;
  render: (reduced: boolean) => ReactNode;
}> = [
  { slug: SANTE.slug, short: SANTE.short, meta: SANTE.meta, render: (r) => <SanteDashboard reduced={r} /> },
  { slug: RETAIL.slug, short: RETAIL.short, meta: RETAIL.meta, render: (r) => <RetailDashboard reduced={r} /> },
  { slug: INDUSTRIE.slug, short: INDUSTRIE.short, meta: INDUSTRIE.meta, render: (r) => <IndustrieDashboard reduced={r} /> },
  { slug: SERVICES.slug, short: SERVICES.short, meta: SERVICES.meta, render: (r) => <ServicesProDashboard reduced={r} /> },
  { slug: LOGISTIQUE.slug, short: LOGISTIQUE.short, meta: LOGISTIQUE.meta, render: (r) => <LogistiqueDashboard reduced={r} /> },
  { slug: IMMOBILIER.slug, short: IMMOBILIER.short, meta: IMMOBILIER.meta, render: (r) => <ImmoDashboard reduced={r} /> },
];
