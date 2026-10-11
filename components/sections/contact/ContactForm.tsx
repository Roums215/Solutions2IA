"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { BESOIN_PARAM, BRIEF_HINTS, BUDGET_OPTIONS, CONTACT_EMAIL, SERVICE_OPTIONS, STAGE_OPTIONS, STEPS_LABELS } from "./contactPageData";

/**
 * Le formulaire de /contact (refonte d'octobre 2026) : en vitrine dans le hero, dans un
 * panneau de verre, et rempli comme une conversation, une question à la fois :
 *   1 · ce qui vous amène (et où vous en êtes, facultatif)
 *   2 · votre message, avec les trois conseils qui ajoutent une amorce d'un clic
 *   3 · comment vous répondre, puis l'envoi
 * Tous les champs sont contrôlés : revenir en arrière ne perd rien. L'envoi reste le même
 * (/api/contact : nom, email, entreprise, budget, message, type, website = piège à robots).
 * Les CTA orientés de /services arrivent avec ?besoin=… : le type est présélectionné.
 */

type Status = "idle" | "sending" | "success" | "error";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FIELD =
  "w-full rounded-xl border border-border-medium bg-paper/[0.04] px-4 py-3 text-[15px] text-text-primary placeholder:text-text-tertiary transition-colors duration-200 focus:border-accent-primary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/20";

export function ContactForm({ className }: { className?: string }) {
  const { disableContentMotion: instant } = usePerformanceMode();
  const id = useId();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [website, setWebsite] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const messageRef = useRef<HTMLTextAreaElement>(null);
  const moved = useRef(false);

  // Lu après l'hydratation (window plutôt que useSearchParams : pas de Suspense à ajouter).
  useEffect(() => {
    const besoin = new URLSearchParams(window.location.search).get("besoin");
    if (besoin && BESOIN_PARAM[besoin]) setType(BESOIN_PARAM[besoin]);
  }, []);

  // À chaque étape, le focus va sur sa question dès qu'elle apparaît (après l'animation de
  // sortie de la précédente), jamais au premier affichage. Ref stable : appelée au montage seulement.
  const focusOnMount = useCallback((el: HTMLHeadingElement | null) => {
    if (el && moved.current) el.focus();
  }, []);

  function go(next: number) {
    moved.current = true;
    setStep(next);
  }

  function nextFromMessage() {
    if (message.trim().length === 0) {
      setMessageError(true);
      messageRef.current?.focus();
      return;
    }
    go(2);
  }

  function addStarter(starter: string) {
    setMessage((m) => (m.trim() ? `${m.trimEnd()}\n${starter}` : starter));
    setMessageError(false);
    requestAnimationFrame(() => {
      const el = messageRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const payload = {
      nom,
      email,
      entreprise,
      budget,
      message: stage ? `Où j'en suis : ${stage}\n\n${message}` : message,
      type: type ?? "",
      website,
    };
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (res.ok && json.ok) {
        moved.current = true;
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(json.error || "L'envoi a échoué. Réessayez ou écrivez-moi directement par email.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connexion impossible. Vérifiez votre réseau, ou écrivez-moi directement par email.");
    }
  }

  function reset() {
    setStep(0);
    setType(null);
    setStage(null);
    setMessage("");
    setBudget(BUDGET_OPTIONS[0]);
    setNom("");
    setEmail("");
    setEntreprise("");
    setStatus("idle");
    moved.current = true;
  }

  const slide = {
    initial: instant ? false : { opacity: 0, x: 14 },
    animate: { opacity: 1, x: 0 },
    exit: instant ? undefined : { opacity: 0, x: -10, transition: { duration: 0.16 } },
    transition: { duration: 0.3, ease: EASE },
  } as const;

  return (
    <div id="formulaire" className={cn("relative scroll-mt-28", className)}>
      {/* La lumière derrière le verre */}
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[10%] top-[8%] h-[70%] w-[70%] rounded-full bg-accent-primary/35 blur-[100px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute bottom-[4%] right-[2%] h-[40%] w-[45%] rounded-full bg-cyan/20 blur-[90px]" />

      <GlassPanel sheen={false} className="rounded-[30px] p-6 sm:p-8">
        {status === "success" ? (
          <div className="py-6 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cyan/15 text-cyan ring-1 ring-cyan/30">
              <Check size={26} strokeWidth={2.4} aria-hidden />
            </span>
            <h2 ref={focusOnMount} tabIndex={-1} className="mt-5 text-[1.5rem] font-semibold tracking-tight focus:outline-none">
              Merci, votre message est bien parti.
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-text-secondary">
              Je vous réponds sous 24 h, du lundi au vendredi, avec quelques questions et une première idée.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[14px] font-semibold">
              <a href="#apres" className="inline-flex items-center gap-1.5 text-accent-light hover:text-text-primary">
                Ce qui se passe ensuite <ArrowRight size={15} aria-hidden />
              </a>
              <button type="button" onClick={reset} className="text-text-tertiary underline-offset-4 hover:text-text-primary hover:underline">
                Écrire un autre message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            {/* Piège à robots : invisible pour un humain */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${id}-website`}>Ne pas remplir</label>
              <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            {/* La progression */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                Étape {step + 1} sur 3 <span className="sr-only">: {STEPS_LABELS[step]}</span>
              </p>
              <span aria-hidden className="flex gap-1.5">
                {STEPS_LABELS.map((l, i) => (
                  <span key={l} className={cn("h-1 w-8 rounded-full transition-colors duration-500", i <= step ? "bg-cyan" : "bg-paper/15")} />
                ))}
              </span>
            </div>

            <div className="mt-5 min-h-[25rem]">
              <AnimatePresence mode="wait" initial={false}>
                {step === 0 && (
                  <motion.fieldset key="s0" {...slide} aria-labelledby={`${id}-q0`} className="m-0 min-w-0 border-0 p-0">
                      <h2 ref={focusOnMount} id={`${id}-q0`} tabIndex={-1} className="text-[1.4rem] font-semibold leading-snug tracking-tight focus:outline-none sm:text-[1.55rem]">
                        Qu&apos;est-ce qui vous amène ?
                      </h2>
                    <p className="mt-1.5 text-[14px] text-text-secondary">Choisissez ce qui s&apos;en rapproche. Si vous hésitez, ce n&apos;est pas grave.</p>
                    <div role="group" aria-label="Type de projet" className="mt-4 flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((o) => (
                        <Chip key={o} on={type === o} onClick={() => setType(type === o ? null : o)}>
                          {o}
                        </Chip>
                      ))}
                    </div>

                    <p id={`${id}-stage`} className="mt-7 text-[14px] font-medium text-text-primary">
                      Où en êtes-vous ? <span className="font-normal text-text-tertiary">(facultatif)</span>
                    </p>
                    <div role="group" aria-labelledby={`${id}-stage`} className="mt-3 flex flex-wrap gap-2">
                      {STAGE_OPTIONS.map((o) => (
                        <Chip key={o} on={stage === o} onClick={() => setStage(stage === o ? null : o)}>
                          {o}
                        </Chip>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button type="button" variant="primary" size="lg" onClick={() => go(1)} className="h-12 rounded-full px-7 text-[15px] font-semibold">
                        Continuer <ArrowRight className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                  </motion.fieldset>
                )}

                {step === 1 && (
                  <motion.fieldset key="s1" {...slide} aria-labelledby={`${id}-q1`} className="m-0 min-w-0 border-0 p-0">
                      <h2 ref={focusOnMount} id={`${id}-q1`} tabIndex={-1} className="text-[1.4rem] font-semibold leading-snug tracking-tight focus:outline-none sm:text-[1.55rem]">
                        Dites-le avec vos mots.
                      </h2>
                    <p className="mt-1.5 text-[14px] text-text-secondary">Pas besoin d&apos;un dossier. Trois pistes, si ça aide :</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BRIEF_HINTS.map((h) => (
                        <button
                          key={h.title}
                          type="button"
                          onClick={() => addStarter(h.starter)}
                          title={h.hint}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-paper/[0.04] px-3.5 text-[13px] text-text-secondary ring-1 ring-border-medium transition-colors duration-300 hover:text-text-primary hover:ring-border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                        >
                          <Plus size={13} strokeWidth={2.4} className="text-cyan" aria-hidden />
                          {h.title}
                        </button>
                      ))}
                    </div>

                    <label htmlFor={`${id}-message`} className="mt-5 block text-[14px] font-medium text-text-primary">
                      Ce qui vous amène <span className="text-accent-light">*</span>
                    </label>
                    <textarea
                      ref={messageRef}
                      id={`${id}-message`}
                      name="message"
                      rows={6}
                      required
                      aria-required="true"
                      aria-invalid={messageError || undefined}
                      aria-describedby={messageError ? `${id}-message-error` : undefined}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (messageError) setMessageError(false);
                      }}
                      placeholder="Ce que vous aimeriez améliorer, où vous en êtes, ce qui compte le plus."
                      className={cn(FIELD, "mt-2 resize-none", messageError && "border-danger/60")}
                    />
                    {messageError && (
                      <p id={`${id}-message-error`} className="mt-1.5 text-[13px] text-danger">
                        Une phrase suffit, mais il m&apos;en faut au moins une.
                      </p>
                    )}

                    <label htmlFor={`${id}-budget`} className="mt-5 block text-[14px] font-medium text-text-primary">
                      Votre budget <span className="font-normal text-text-tertiary">(facultatif, juste une idée)</span>
                    </label>
                    <select id={`${id}-budget`} name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={cn(FIELD, "mt-2 cursor-pointer")}>
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>

                    <div className="mt-7 flex items-center justify-between gap-4">
                      <BackButton onClick={() => go(0)} />
                      <Button type="button" variant="primary" size="lg" onClick={nextFromMessage} className="h-12 rounded-full px-7 text-[15px] font-semibold">
                        Continuer <ArrowRight className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                  </motion.fieldset>
                )}

                {step === 2 && (
                  <motion.fieldset key="s2" {...slide} aria-labelledby={`${id}-q2`} className="m-0 min-w-0 border-0 p-0">
                      <h2 ref={focusOnMount} id={`${id}-q2`} tabIndex={-1} className="text-[1.4rem] font-semibold leading-snug tracking-tight focus:outline-none sm:text-[1.55rem]">
                        Comment vous répondre ?
                      </h2>
                    <p className="mt-1.5 text-[14px] text-text-secondary">
                      Vous m&apos;écrivez pour : <span className="font-medium text-text-primary">{type ?? "un premier échange"}</span>
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field id={`${id}-nom`} label="Votre nom" required>
                        <input id={`${id}-nom`} name="nom" type="text" required aria-required="true" autoComplete="name" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Comment vous appelez-vous ?" className={FIELD} />
                      </Field>
                      <Field id={`${id}-email`} label="Votre email" required>
                        <input id={`${id}-email`} name="email" type="email" required aria-required="true" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Pour que je puisse vous répondre" className={FIELD} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field id={`${id}-entreprise`} label="Votre entreprise" hint="(facultatif)">
                          <input id={`${id}-entreprise`} name="entreprise" type="text" autoComplete="organization" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} placeholder="Le nom de votre activité" className={FIELD} />
                        </Field>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <BackButton onClick={() => go(1)} />
                      <Button type="submit" variant="primary" size="lg" disabled={status === "sending"} className="h-12 rounded-full px-7 text-[15px] font-semibold">
                        {status === "sending" ? "Envoi…" : "Envoyer mon message"}
                        {status !== "sending" && <ArrowRight className="h-4 w-4" aria-hidden />}
                      </Button>
                    </div>
                    <p className="mt-3 text-right text-[12.5px] text-text-tertiary">Réponse sous 24 h · gratuit · sans engagement</p>
                  </motion.fieldset>
                )}
              </AnimatePresence>
            </div>

            <div aria-live="polite">
              {status === "error" && (
                <p className="mt-4 rounded-xl border border-danger/25 bg-danger/10 px-4 py-3 text-[14px] text-danger">
                  {errorMsg}{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-text-primary">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}
            </div>
          </form>
        )}
      </GlassPanel>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[14px] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
        on ? "bg-paper text-ink" : "bg-paper/[0.04] text-text-secondary ring-1 ring-border-medium hover:text-text-primary hover:ring-border-accent",
      )}
    >
      {on && <Check size={14} strokeWidth={2.6} aria-hidden />}
      {children}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-[14px] font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
    >
      <ArrowLeft size={15} aria-hidden /> Retour
    </button>
  );
}

function Field({ id, label, required = false, hint, children }: { id: string; label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-text-primary">
        {label} {required && <span className="text-accent-light">*</span>}
        {hint && <span className="font-normal text-text-tertiary"> {hint}</span>}
      </label>
      {children}
    </div>
  );
}
