"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type ProfileSlug =
  | "commercial"
  | "dirigeant"
  | "expert"
  | "sav"
  | "marketeur"
  | "freelance";

// ─── Shared helpers ─────────────────────────────────────────────────────────

function ProfileHeader({
  role,
  meta,
  domain,
  icon,
  reduced,
}: {
  role: string;
  meta: string;
  domain: string;
  icon: ReactNode;
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
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-accent-primary/30 bg-bg-card">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
            {role}
          </p>
          <p className="truncate text-[9px] uppercase tracking-[0.18em] text-text-tertiary">
            {meta}
          </p>
        </div>
      </div>
      <span className="ml-3 shrink-0 font-mono text-[10px] text-text-tertiary">{domain}</span>
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

function PainBlock({ stat, label, detail }: { stat: string; label: string; detail: string }) {
  return (
    <div className="rounded-lg border border-red-400/25 bg-red-400/[0.04] px-4 py-3">
      <div className="flex items-baseline justify-between gap-2">
        <SectionLabel>Aujourd&apos;hui · douleur</SectionLabel>
        <span className="text-[10px] text-red-400/80">⚠</span>
      </div>
      <p className="mt-2 font-mono text-[20px] font-semibold text-text-primary">
        {stat}
        <span className="ml-1.5 text-[11px] font-normal text-text-tertiary">{label}</span>
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-text-tertiary">{detail}</p>
    </div>
  );
}

function KpiGain({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-green-400/25 bg-green-400/[0.04] px-4 py-3">
      <div className="flex items-baseline justify-between gap-2">
        <SectionLabel>Avec assistant · gain</SectionLabel>
        <span className="text-[10px] text-green-400">✓</span>
      </div>
      <p className="mt-2 font-mono text-[20px] font-semibold text-gradient-strong">{value}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-text-tertiary">{label}</p>
    </div>
  );
}

function TasksList({
  title,
  tasks,
}: {
  title: string;
  tasks: string[];
}) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <ul className="mt-2 space-y-1.5">
        {tasks.map((t, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i, ease: PREMIUM_EASE }}
            className="flex items-start gap-2 text-[12px] leading-snug text-text-secondary"
          >
            <span className="mt-0.5 shrink-0 text-accent-primary">▸</span>
            <span>{t}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ToolBadges({ tools }: { tools: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tools.map((tool) => (
        <li
          key={tool}
          className="rounded-md border border-border-subtle bg-bg-card/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-light"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}

const ICON = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "text-accent-light",
};

// ─── 1. COMMERCIAL DÉBORDÉ ──────────────────────────────────────────────────

function CommercialProfile({ reduced }: { reduced: boolean }) {
  const leads = [
    { name: "ACME Corp · 8 200 €", state: "logged" as const },
    { name: "Nova SAS · 14 500 €", state: "logged" as const },
    { name: "Pixel & Co · 3 800 €", state: "queue" as const },
  ];
  return (
    <>
      <ProfileHeader
        role="Le commercial débordé"
        meta="SDR · 4 ans d'XP"
        domain="sales.crm"
        reduced={reduced}
        icon={
          <svg {...ICON}>
            <path d="M21 12a9 9 0 1 1-9-9" />
            <path d="M16 3h5v5" />
          </svg>
        }
      />
      <div className="space-y-4 px-5 pt-4 pb-5">
        <PainBlock
          stat="70 %"
          label="du temps en admin / CRM"
          detail="2,5 h/jour passées à saisir des notes plutôt qu'à vendre. Source : Sybill 2025."
        />

        <div className="rounded-lg border border-border-subtle/60 bg-bg-card/30 px-4 py-3">
          <SectionLabel>Pipeline · notes enregistrées automatiquement (24 h)</SectionLabel>
          <ul className="mt-2.5 space-y-1.5">
            {leads.map((l, i) => (
              <motion.li
                key={l.name}
                initial={reduced ? false : { opacity: 0, scaleX: 0.7 }}
                animate={reduced ? undefined : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: PREMIUM_EASE }}
                style={{ originX: 0 }}
                className="flex items-center justify-between rounded-md border border-border-subtle/50 bg-bg-card/40 px-2.5 py-1.5"
              >
                <span className="truncate text-[11px] text-text-secondary">{l.name}</span>
                <span
                  className={[
                    "shrink-0 text-[10px] font-semibold uppercase tracking-wider",
                    l.state === "logged" ? "text-green-400" : "text-accent-light",
                  ].join(" ")}
                >
                  {l.state === "logged" ? "✓ loggé" : "● en cours"}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <TasksList
          title="Ce que l'assistant prend en charge"
          tasks={[
            "Transcrit l'appel et enregistre la note dans le CRM (HubSpot · Salesforce)",
            "Rédige l'email de suivi personnalisé",
            "Évalue le prospect selon vos critères, signale les comptes prioritaires",
          ]}
        />

        <KpiGain value="+8 h / sem" label="Plus de temps en RDV, moins de saisie. Source : Sybill 2025." />

        <ToolBadges tools={["HubSpot", "Salesforce", "Gmail", "Aircall"]} />
      </div>
    </>
  );
}

// ─── 2. DIRIGEANT PME MULTI-CASQUETTES ──────────────────────────────────────

function DirigeantProfile({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ProfileHeader
        role="Le dirigeant multi-casquettes"
        meta="PME · 12-50 collab."
        domain="cockpit.direction"
        reduced={reduced}
        icon={
          <svg {...ICON}>
            <path d="M3 21V8l9-5 9 5v13" />
            <path d="M9 21V12h6v9" />
          </svg>
        }
      />
      <div className="space-y-4 px-5 pt-4 pb-5">
        <PainBlock
          stat="73 %"
          label="des dirigeants débordés par l'opérationnel"
          detail="Trop de casquettes, peu de temps pour la stratégie. Source : WRITER 2026."
        />

        <div className="rounded-lg border border-border-subtle/60 bg-bg-card/30 px-4 py-3">
          <SectionLabel>Synthèse hebdo · vendredi 17h</SectionLabel>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {[
              { v: "+12,4 %", l: "CA vs S-1", color: "text-green-400" },
              { v: "−4 %", l: "Marge", color: "text-amber-400" },
              { v: "98 %", l: "SLA support", color: "text-cyan" },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.l}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.07 * i, ease: PREMIUM_EASE }}
                className="rounded-md border border-border-subtle/50 bg-bg-card/40 px-2 py-1.5 text-center"
              >
                <span className={["block font-mono text-[13px] font-semibold", kpi.color].join(" ")}>
                  {kpi.v}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-text-tertiary">{kpi.l}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-2 text-[10px] italic leading-relaxed text-text-tertiary">
            ⚠ Marge en recul · 3 chantiers identifiés · 2 actions proposées
          </p>
        </div>

        <TasksList
          title="Ce que l'assistant prend en charge"
          tasks={[
            "Prépare le reporting hebdo et signale les anomalies",
            "Trie l'inbox, répond aux messages courants, escalade le reste",
            "Prépare les briefs marketing et les notes de direction",
          ]}
        />

        <KpiGain value="1 jour / sem récupéré" label="Recentrage sur la stratégie et les sujets non délégables." />

        <ToolBadges tools={["Slack", "Notion", "Sheets", "Stripe"]} />
      </div>
    </>
  );
}

// ─── 3. EXPERT MÉTIER (médecin / avocat / comptable) ────────────────────────

function ExpertProfile({ reduced }: { reduced: boolean }) {
  const dossiers = [
    { name: "Mme Bensimon · Rétrocession", status: "ready" as const },
    { name: "SARL Pivot · Contentieux", status: "wait" as const },
    { name: "Dr Aubry · Bilan ann.", status: "ready" as const },
  ];
  return (
    <>
      <ProfileHeader
        role="L'expert métier"
        meta="Cabinet · 3 collaborateurs"
        domain="cabinet.metier"
        reduced={reduced}
        icon={
          <svg {...ICON}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
        }
      />
      <div className="space-y-4 px-5 pt-4 pb-5">
        <PainBlock
          stat="200 h / mois"
          label="d'admin par cabinet médical"
          detail="≈ 200 k$/an de temps staff sur tâches non médicales. Source : Intentionally Inspirational."
        />

        <div className="rounded-lg border border-border-subtle/60 bg-bg-card/30 px-4 py-3">
          <SectionLabel>Dossiers en attente · recherche dans vos fichiers</SectionLabel>
          <ul className="mt-2.5 space-y-1.5">
            {dossiers.map((d, i) => (
              <motion.li
                key={d.name}
                initial={reduced ? false : { opacity: 0, x: -4 }}
                animate={reduced ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.07 * i, ease: PREMIUM_EASE }}
                className="flex items-center justify-between rounded-md border border-border-subtle/50 bg-bg-card/40 px-2.5 py-1.5"
              >
                <span className="truncate text-[11px] text-text-secondary">{d.name}</span>
                <span
                  className={[
                    "shrink-0 text-[10px] font-semibold uppercase tracking-wider",
                    d.status === "ready" ? "text-green-400" : "text-amber-400",
                  ].join(" ")}
                >
                  {d.status === "ready" ? "✓ pré-rédigé" : "● en cours"}
                </span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] italic leading-relaxed text-text-tertiary">
            ◆ Réponses sourcées dans vos documents · refus explicite si absent
          </p>
        </div>

        <TasksList
          title="Ce que l'assistant prend en charge"
          tasks={[
            "Prise de RDV vocale et confirmation SMS",
            "Dictée → compte-rendu structuré (DPI / dossier)",
            "Recherche dans vos documents internes avec citations",
          ]}
        />

        <KpiGain value="−50 % admin" label="Plus de temps pour le cœur de votre métier." />

        <ToolBadges tools={["Doctolib", "Whisper", "MSSanté", "RGPD"]} />
      </div>
    </>
  );
}

// ─── 4. SAV / SUPPORT CLIENT ────────────────────────────────────────────────

function SavProfile({ reduced }: { reduced: boolean }) {
  const tickets = [
    { id: "#8492", subject: "Suivi commande retard", state: "n1" as const },
    { id: "#8491", subject: "Remboursement partiel", state: "auto" as const },
    { id: "#8490", subject: "Bug dashboard prod", state: "esc" as const },
    { id: "#8489", subject: "Question facture", state: "auto" as const },
  ];
  return (
    <>
      <ProfileHeader
        role="Le SAV qui crève sous le ticket"
        meta="Support · 8 agents"
        domain="support.live"
        reduced={reduced}
        icon={
          <svg {...ICON}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        }
      />
      <div className="space-y-4 px-5 pt-4 pb-5">
        <PainBlock
          stat="22 %"
          label="des PME ont un assistant vocal · 31 % dans les 2 ans"
          detail="Volume de tickets en hausse, équipes saturées. Source : Vstorm 2026."
        />

        <div className="rounded-lg border border-border-subtle/60 bg-bg-card/30 px-4 py-3">
          <SectionLabel>Queue tickets · triage temps réel</SectionLabel>
          <ul className="mt-2.5 space-y-1">
            {tickets.map((t, i) => {
              const color =
                t.state === "auto"
                  ? "text-green-400 border-green-400/30"
                  : t.state === "n1"
                  ? "text-cyan border-cyan/30"
                  : "text-red-400 border-red-400/30";
              const label =
                t.state === "auto" ? "AUTO" : t.state === "n1" ? "N1" : "ESC";
              return (
                <motion.li
                  key={t.id}
                  initial={reduced ? false : { opacity: 0, x: 4 }}
                  animate={reduced ? undefined : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i, ease: PREMIUM_EASE }}
                  className="flex items-center justify-between rounded-md border border-border-subtle/50 bg-bg-card/40 px-2.5 py-1.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="font-mono text-[10px] text-text-tertiary">{t.id}</span>
                    <span className="truncate text-[11px] text-text-secondary">{t.subject}</span>
                  </div>
                  <span
                    className={[
                      "ml-3 shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-semibold",
                      color,
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <TasksList
          title="Ce que l'assistant prend en charge"
          tasks={[
            "Réponses aux questions fréquentes (commandes, factures, retours)",
            "Suivi commande et remboursement automatisé",
            "Transfert à la bonne personne avec tout le contexte",
          ]}
        />

        <KpiGain value="CSAT amélioré" label="Réponse 24/7 avec votre ton, escalade au bon moment." />

        <ToolBadges tools={["Zendesk", "Intercom", "Stripe", "Shopify"]} />
      </div>
    </>
  );
}

// ─── 5. MARKETEUR SOLO ──────────────────────────────────────────────────────

function MarketeurProfile({ reduced }: { reduced: boolean }) {
  const days = [
    { label: "Lun", items: ["LinkedIn", "Blog"] },
    { label: "Mar", items: ["IG", "Email"] },
    { label: "Mer", items: ["LinkedIn"] },
    { label: "Jeu", items: ["IG", "Blog"] },
    { label: "Ven", items: ["Newsletter"] },
  ];
  return (
    <>
      <ProfileHeader
        role="Le marketeur solo"
        meta="Agence ou in-house · 1 paire de mains"
        domain="content.studio"
        reduced={reduced}
        icon={
          <svg {...ICON}>
            <path d="M3 11l18-8-3 18-7-8z" />
          </svg>
        }
      />
      <div className="space-y-4 px-5 pt-4 pb-5">
        <PainBlock
          stat="5 canaux"
          label="à alimenter (blog + LinkedIn + IG + email + ads)"
          detail="Un calendrier éditorial à tenir seul est épuisant : l'assistant allège la charge de production."
        />

        <div className="rounded-lg border border-border-subtle/60 bg-bg-card/30 px-4 py-3">
          <SectionLabel>Calendrier édito · semaine en cours</SectionLabel>
          <div className="mt-2.5 grid grid-cols-5 gap-1.5">
            {days.map((d, i) => (
              <motion.div
                key={d.label}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 * i, ease: PREMIUM_EASE }}
                className="flex flex-col items-center rounded-md border border-border-subtle/50 bg-bg-card/40 px-1.5 py-1.5"
              >
                <span className="text-[9px] uppercase tracking-wider text-text-tertiary">
                  {d.label}
                </span>
                <div className="mt-1 flex flex-col gap-0.5">
                  {d.items.map((item) => (
                    <span
                      key={item}
                      className="rounded bg-accent-primary/20 px-1 text-[8px] font-semibold uppercase text-accent-light"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-2 text-[10px] italic leading-relaxed text-text-tertiary">
            ◆ Repurpose 1 podcast → 10 posts (LinkedIn × 3, IG × 4, blog × 1, email × 2)
          </p>
        </div>

        <TasksList
          title="Ce que l'assistant prend en charge"
          tasks={[
            "Transforme un podcast ou une vidéo en carrousels, captions et articles",
            "Propose des idées de contenu dans votre ton",
            "Programme la diffusion sur plusieurs canaux",
          ]}
        />

        <KpiGain value="Plus de contenu, moins de rush" label="Plus de calendrier vide. Plus de fin de mois à la dernière minute." />

        <ToolBadges tools={["LinkedIn", "Instagram", "Substack", "Buffer"]} />
      </div>
    </>
  );
}

// ─── 6. FREELANCE / CONSULTANT ──────────────────────────────────────────────

function FreelanceProfile({ reduced }: { reduced: boolean }) {
  const bars = [
    { label: "Facturable", w: 38, color: "var(--color-cyan)" },
    { label: "Research / prep", w: 42, color: "var(--color-accent-primary)" },
    { label: "Admin (devis, facture)", w: 20, color: "rgba(248,113,113,0.7)" },
  ];
  return (
    <>
      <ProfileHeader
        role="Le freelance / consultant"
        meta="Indépendant · 5+ clients actifs"
        domain="cabinet.indep"
        reduced={reduced}
        icon={
          <svg {...ICON}>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        }
      />
      <div className="space-y-4 px-5 pt-4 pb-5">
        <PainBlock
          stat="60-70 %"
          label="du temps en recherche, pas en conseil"
          detail="Le temps facturable s'érode dans la préparation. Source : MindStudio 2026."
        />

        <div className="rounded-lg border border-border-subtle/60 bg-bg-card/30 px-4 py-3">
          <SectionLabel>Répartition d&apos;une journée type · 8 h</SectionLabel>
          <div className="mt-2.5 space-y-2">
            {bars.map((b, i) => (
              <div key={b.label}>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-[10px] text-text-secondary">{b.label}</span>
                  <span className="font-mono text-[10px] text-text-tertiary">{b.w} %</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-card/60">
                  <motion.span
                    initial={reduced ? false : { width: 0 }}
                    animate={reduced ? undefined : { width: `${b.w}%` }}
                    transition={{ duration: 0.9, delay: 0.1 * i, ease: PREMIUM_EASE }}
                    style={{ background: b.color, display: "block", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <TasksList
          title="Ce que l'assistant prend en charge"
          tasks={[
            "Recherche client et génération des supports de présentation",
            "Rédaction de propositions personnalisées",
            "Facturation, relances, suivi de mission",
          ]}
        />

        <KpiGain value="Moins de recherche, plus de conseil" label="Plus de temps à livrer, moins de temps à préparer." />

        <ToolBadges tools={["Notion", "Slides", "Stripe", "Calendly"]} />
      </div>
    </>
  );
}

// ─── Registry ───────────────────────────────────────────────────────────────

export const PROFILES: Array<{
  slug: ProfileSlug;
  short: string;
  render: (reduced: boolean) => ReactNode;
}> = [
  { slug: "commercial", short: "Commercial", render: (r) => <CommercialProfile reduced={r} /> },
  { slug: "dirigeant", short: "Dirigeant PME", render: (r) => <DirigeantProfile reduced={r} /> },
  { slug: "expert", short: "Expert métier", render: (r) => <ExpertProfile reduced={r} /> },
  { slug: "sav", short: "SAV / Support", render: (r) => <SavProfile reduced={r} /> },
  { slug: "marketeur", short: "Marketeur solo", render: (r) => <MarketeurProfile reduced={r} /> },
  { slug: "freelance", short: "Freelance", render: (r) => <FreelanceProfile reduced={r} /> },
];
