import { ArrowRight, Bell, Check, CornerUpLeft, FileText, GitBranch, Mail, MessageSquare, Monitor, Send, Smartphone, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ServiceKey } from "./servicesPageData";

/**
 * Les objets d'étape : /services (invite → live), /contact (sent, reply, invite, proposal)
 * et /a-propos (notes, repo, devices, support : les quatre règles de travail).
 */
export type ArtefactKey = "invite" | "proposal" | "preview" | "live" | "sent" | "reply" | "notes" | "repo" | "devices" | "support";

/**
 * Les « objets réels » de /services : ce que le client voit et manipule vraiment (une page,
 * un fichier, un mail, un devis, une invitation), posés en profondeur dans une petite scène.
 * Ils remplacent les icônes génériques : on montre la chose livrée, pas un pictogramme.
 * Tout est statique, en CSS ; les noms (Atelier Moreau, Léa M.) sont des maquettes.
 */

/** Ombre d'un objet posé sur le site sombre / sur une surface claire. */
const SHADOW_DARK =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 60%, transparent), 0 20px 36px -20px color-mix(in oklab, var(--color-bg-primary) 95%, transparent)";
const SHADOW_LIGHT =
  "0 1px 2px color-mix(in oklab, var(--color-ink) 8%, transparent), 0 18px 34px -20px color-mix(in oklab, var(--color-ink) 40%, transparent)";

function Obj({ className, children, light = false, style }: { className?: string; children: React.ReactNode; light?: boolean; style?: React.CSSProperties }) {
  return (
    <div className={cn("absolute rounded-xl bg-paper text-ink", className)} style={{ boxShadow: light ? SHADOW_LIGHT : SHADOW_DARK, ...style }}>
      {children}
    </div>
  );
}

/** La scène : un plateau discret qui porte les objets. */
function Stage({ className, children, light = false }: { className?: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-2xl",
        light ? "bg-ink/[0.035] ring-1 ring-ink/10" : "bg-paper/[0.035] ring-1 ring-paper/10",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Ce que je livre, par service ────────────────────────────────────────────

export function ServiceVisual({ k, className }: { k: ServiceKey; className?: string }) {
  switch (k) {
    case "web":
      return (
        <Stage className={className}>
          <Obj className="left-[6%] right-[16%] top-[12%] -bottom-6 overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-paper-line px-3 py-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/15" />
              ))}
              <span className="ml-2 rounded-md bg-paper-2 px-2 py-0.5 text-[10.5px] text-ink-3">atelier-moreau.fr</span>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-3">Menuiserie · Lyon</p>
              <p className="mt-1 text-[15px] font-semibold leading-snug tracking-tight">Des meubles faits pour durer.</p>
              <span className="mt-3 inline-flex h-7 items-center rounded-full bg-accent-primary px-3 text-[11.5px] font-semibold text-paper">
                Demander un devis
              </span>
            </div>
          </Obj>
          <Obj className="bottom-[12%] right-[4%] flex items-center gap-2 px-3 py-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-cyan">
              <Bell size={12} strokeWidth={2} />
            </span>
            <span>
              <span className="block text-[11.5px] font-semibold">Nouvelle demande de devis</span>
              <span className="block text-[10.5px] text-ink-3">il y a 2 min</span>
            </span>
          </Obj>
        </Stage>
      );

    case "apps":
      return (
        <Stage className={className}>
          {/* Le fichier qu'on quitte, en arrière-plan */}
          <Obj className="left-[5%] top-[16%] w-[52%] -rotate-6 overflow-hidden opacity-60">
            <p className="border-b border-paper-line px-2.5 py-1.5 text-[10px] text-ink-3">clients_v7_FINAL.xlsx</p>
            <div className="grid grid-cols-3 gap-px bg-paper-line p-px">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="h-3.5 bg-paper" />
              ))}
            </div>
          </Obj>
          {/* L'outil qui le remplace, devant */}
          <Obj className="right-[5%] top-[10%] w-[64%] overflow-hidden">
            <div className="flex items-center justify-between border-b border-paper-line px-3 py-2">
              <span className="text-[12px] font-semibold">Clients</span>
              <span className="text-[10.5px] text-ink-3">12 actifs</span>
            </div>
            {[
              { n: "Martin", s: "Payé", c: "bg-accent-primary/12 text-accent-dark" },
              { n: "Leroy", s: "À relancer", c: "bg-warning/15 text-warning-ink" },
              { n: "Garcia", s: "Devis envoyé", c: "bg-accent-primary/12 text-accent-dark" },
            ].map((r) => (
              <div key={r.n} className="flex items-center justify-between border-b border-paper-line px-3 py-1.5 last:border-b-0">
                <span className="text-[11.5px]">{r.n}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", r.c)}>{r.s}</span>
              </div>
            ))}
          </Obj>
        </Stage>
      );

    case "auto":
      return (
        <Stage className={className}>
          <Obj className="left-[5%] top-[22%] w-[40%] px-3 py-2.5">
            <Mail size={13} strokeWidth={2} className="text-accent-dark" />
            <p className="mt-1.5 text-[11.5px] font-semibold leading-snug">Demande de rendez-vous</p>
            <p className="text-[10.5px] text-ink-3">Léa M. · 09:42</p>
          </Obj>
          <ArrowRight size={18} strokeWidth={2} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan" />
          <Obj className="right-[5%] top-[14%] w-[42%] px-3 py-2.5">
            <p className="text-[11.5px] font-semibold">Fiche client</p>
            <p className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-accent-dark">
              <Check size={11} strokeWidth={3} /> créée
            </p>
            <p className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-accent-dark">
              <Check size={11} strokeWidth={3} /> relance prévue
            </p>
          </Obj>
        </Stage>
      );

    case "ai":
      return (
        <Stage className={className}>
          <Obj className="left-[5%] top-[10%] w-[60%] rounded-2xl rounded-bl-md px-3 py-2">
            <p className="text-[11.5px] leading-snug text-ink-2">Bonjour, pouvez-vous me faire un devis pour une cuisine ?</p>
          </Obj>
          <div
            className="absolute bottom-[9%] right-[5%] w-[64%] rounded-xl bg-ink px-3 py-2.5 text-paper ring-1 ring-cyan/40"
            style={{ boxShadow: SHADOW_DARK }}
          >
            <p className="flex items-center justify-between gap-2 text-[11.5px] font-semibold">
              Devis préparé
              <span className="rounded-full bg-cyan/20 px-2 py-0.5 text-[10px] text-cyan">à valider</span>
            </p>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-md bg-accent-primary px-2 py-1 text-[10.5px] font-semibold">Valider</span>
              <span className="rounded-md px-2 py-1 text-[10.5px] text-paper/75 ring-1 ring-paper/20">Modifier</span>
            </div>
          </div>
        </Stage>
      );

    case "rag":
      return (
        <Stage className={className}>
          <div className="absolute right-[6%] top-[12%] max-w-[70%] rounded-2xl rounded-br-md bg-accent-primary px-3 py-2 text-[11.5px] font-medium text-paper">
            Quel préavis pour ce bail ?
          </div>
          <Obj className="bottom-[10%] left-[6%] w-[72%] px-3 py-2.5">
            <p className="text-[11.5px] leading-snug">Un mois : le logement est en zone tendue.</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-cyan/15 px-2 py-0.5 text-[10.5px] font-semibold text-ink">
              <FileText size={11} strokeWidth={2} /> Bail.pdf · p. 7
            </span>
          </Obj>
        </Stage>
      );
  }
}

// ─── Ce que vous recevez, étape par étape ────────────────────────────────────

export function ArtefactObject({ k, className }: { k: ArtefactKey; className?: string }) {
  switch (k) {
    case "notes":
      return (
        <Stage light className={className}>
          <Obj light className="left-1/2 top-1/2 w-[76%] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] px-3 py-2.5">
            <p className="flex items-center gap-1.5 text-[11.5px] font-semibold">
              <StickyNote size={12} strokeWidth={2} className="text-accent-dark" /> Premier échange
            </p>
            <p className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">Où le temps se perd ?</p>
            {["Devis refaits à la main", "Relances oubliées", "Trois fichiers clients"].map((l) => (
              <p key={l} className="mt-1 text-[11px] text-ink-2">· {l}</p>
            ))}
          </Obj>
        </Stage>
      );

    case "repo":
      return (
        <Stage light className={className}>
          <Obj light className="left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-paper-line px-3 py-1.5">
              <GitBranch size={12} strokeWidth={2} className="text-accent-dark" />
              <span className="text-[11px] font-semibold">votre-entreprise / outil</span>
            </div>
            <div className="space-y-1 px-3 py-2.5">
              {["Propriétaire : vous", "Hébergé en Europe", "Documenté pour être repris"].map((l) => (
                <p key={l} className="flex items-center gap-1 text-[10.5px] font-medium text-ink-2">
                  <Check size={11} strokeWidth={3} className="text-accent-dark" /> {l}
                </p>
              ))}
            </div>
          </Obj>
        </Stage>
      );

    case "devices":
      return (
        <Stage light className={className}>
          <Obj light className="left-[8%] top-[18%] w-[56%] overflow-hidden">
            <div className="flex items-center gap-1 border-b border-paper-line px-2.5 py-1.5">
              <Monitor size={11} strokeWidth={2} className="text-accent-dark" />
              <span className="text-[10px] text-ink-3">Ordinateur</span>
            </div>
            <div className="space-y-1 px-2.5 py-2">
              <span className="block h-1.5 w-4/5 rounded-full bg-ink/15" />
              <span className="block h-1.5 w-3/5 rounded-full bg-ink/10" />
            </div>
            <p className="flex items-center gap-1 px-2.5 pb-2 text-[10px] font-semibold text-accent-dark">
              <Check size={10} strokeWidth={3} /> Vérifié
            </p>
          </Obj>
          <Obj light className="bottom-[10%] right-[10%] w-[28%] overflow-hidden rounded-2xl">
            <div className="flex items-center justify-center border-b border-paper-line py-1">
              <Smartphone size={11} strokeWidth={2} className="text-accent-dark" />
            </div>
            <div className="space-y-1 px-2 py-2">
              <span className="block h-1.5 w-full rounded-full bg-ink/15" />
              <span className="block h-1.5 w-2/3 rounded-full bg-ink/10" />
            </div>
            <p className="flex justify-center pb-1.5 text-accent-dark">
              <Check size={11} strokeWidth={3} />
            </p>
          </Obj>
        </Stage>
      );

    case "support":
      return (
        <Stage light className={className}>
          <Obj light className="left-[8%] top-[16%] w-[70%] rounded-2xl rounded-bl-md px-3 py-2">
            <p className="text-[11px] leading-snug text-ink-2">Pouvez-vous ajouter un champ « date de relance » ?</p>
          </Obj>
          <div className="absolute bottom-[14%] right-[8%] w-[62%] rounded-2xl rounded-br-md bg-accent-primary px-3 py-2 text-[11px] font-medium text-paper">
            C&apos;est fait, il est en ligne.
          </div>
        </Stage>
      );

    case "sent":
      return (
        <Stage light className={className}>
          <Obj light className="left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <div className="flex items-center justify-between border-b border-paper-line px-3 py-1.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-3">Nouveau message</span>
              <Send size={11} strokeWidth={2} className="text-accent-dark" />
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[11.5px] leading-snug text-ink-2">Bonjour, je recopie chaque devis dans trois logiciels, ça me prend mes soirées…</p>
              <p className="mt-2 flex items-center gap-1 text-[10.5px] font-semibold text-accent-dark">
                <Check size={11} strokeWidth={3} /> Envoyé
              </p>
            </div>
          </Obj>
        </Stage>
      );

    case "reply":
      return (
        <Stage light className={className}>
          <Obj light className="left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 px-3 py-2.5">
            <p className="flex items-center gap-1.5 text-[11.5px] font-semibold">
              <CornerUpLeft size={12} strokeWidth={2} className="text-accent-dark" /> Re : votre message
            </p>
            <p className="mt-1.5 text-[11px] leading-snug text-ink-2">Bonjour, merci pour ces détails. Trois questions avant qu&apos;on se parle…</p>
            <span className="mt-2 inline-flex rounded-full bg-accent-primary/12 px-2 py-0.5 text-[10px] font-semibold text-accent-dark">sous 24 h</span>
          </Obj>
        </Stage>
      );

    case "invite":
      return (
        <Stage light className={className}>
          <Obj light className="left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <div className="flex items-center justify-between bg-accent-primary px-3 py-1.5 text-paper">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em]">Invitation</span>
              <span className="text-[10.5px]">Mardi · 10 h</span>
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[12.5px] font-semibold">Premier échange</p>
              <p className="text-[11px] text-ink-3">45 min · gratuit</p>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-md bg-ink px-2 py-0.5 text-[10.5px] font-semibold text-paper">Accepter</span>
                <span className="rounded-md px-2 py-0.5 text-[10.5px] text-ink-2 ring-1 ring-paper-line-strong">Autre créneau</span>
              </div>
            </div>
          </Obj>
        </Stage>
      );

    case "proposal":
      return (
        <Stage light className={className}>
          <Obj light className="left-1/2 top-[10%] w-[66%] -translate-x-1/2 rotate-[-2deg] px-3.5 py-3">
            <p className="flex items-center gap-1.5 text-[12.5px] font-semibold">
              <FileText size={12} strokeWidth={2} className="text-accent-dark" /> Proposition
            </p>
            <div className="mt-2 space-y-1">
              <span className="block h-1.5 w-full rounded-full bg-ink/10" />
              <span className="block h-1.5 w-4/5 rounded-full bg-ink/10" />
            </div>
            {["Ce que je construis", "Prix : fixé", "Délai : fixé"].map((l) => (
              <p key={l} className="mt-1.5 flex items-center gap-1 text-[10.5px] font-medium text-ink-2">
                <Check size={11} strokeWidth={3} className="text-accent-dark" /> {l}
              </p>
            ))}
            <p className="mt-2.5 border-t border-dashed border-paper-line-strong pt-1.5 text-[10px] text-ink-3">Bon pour accord</p>
          </Obj>
        </Stage>
      );

    case "preview":
      return (
        <Stage light className={className}>
          <Obj light className="left-[8%] top-[14%] w-[76%] overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-paper-line px-2.5 py-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/15" />
              ))}
              <span className="ml-1.5 text-[10px] text-ink-3">test.votre-projet.fr</span>
            </div>
            <div className="space-y-1.5 px-3 py-3">
              <span className="block h-2 w-3/5 rounded-full bg-ink/20" />
              <span className="block h-1.5 w-full rounded-full bg-ink/10" />
              <span className="block h-1.5 w-4/5 rounded-full bg-ink/10" />
            </div>
          </Obj>
          <Obj light className="bottom-[10%] right-[6%] px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10.5px] text-ink-2">
              <MessageSquare size={11} strokeWidth={2} className="text-accent-dark" /> Changer ce titre ?
            </p>
            <p className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-accent-dark">
              <Check size={11} strokeWidth={3} /> Fait
            </p>
          </Obj>
        </Stage>
      );

    case "live":
      return (
        <Stage light className={className}>
          <Obj light className="left-[8%] top-[16%] w-[76%] px-3 py-2.5">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-primary/12 text-accent-dark">
                <Check size={11} strokeWidth={3} />
              </span>
              C&apos;est en ligne
            </p>
            <p className="mt-0.5 pl-[26px] text-[10.5px] text-ink-3">votre-projet.fr</p>
          </Obj>
          <Obj light className="bottom-[12%] left-[16%] w-[76%] px-3 py-2">
            <p className="text-[11px] font-medium text-ink-2">Je reste joignable · réponse sous 24 h</p>
          </Obj>
        </Stage>
      );
  }
}
