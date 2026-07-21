"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";
import {
  DECISION_QUESTIONS,
  recommendUsage,
  DEFAULT_RECO,
  type DecisionAnswer,
} from "./ragDecisionData";

type Answers = {
  q1?: DecisionAnswer;
  q2?: DecisionAnswer;
  q3?: DecisionAnswer;
};

export function RagDecisionWizard() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion;

  const [answers, setAnswers] = useState<Answers>({});

  const completed = answers.q1 && answers.q2 && answers.q3;
  const reco = useMemo(() => {
    if (answers.q1 && answers.q2 && answers.q3) {
      return recommendUsage(answers.q1, answers.q2, answers.q3);
    }
    return DEFAULT_RECO;
  }, [answers]);

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Outil de décision"
          title={
            <>
              Quel usage{" "}
              <span className="text-gradient-strong">vous correspond</span> ?
            </>
          }
          description="Trois questions, une recommandation. Une recommandation par défaut s'affiche tant que vous n'avez pas répondu, affinez si besoin."
        />

        <div className="mx-auto max-w-[1080px]">
          <div className="section-intro-panel rounded-2xl p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-6">
                {DECISION_QUESTIONS.map((q, qi) => {
                  const current = answers[q.id];
                  return (
                    <div key={q.id}>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
                        Question {qi + 1} sur 3
                      </div>
                      <p className="mt-2 text-base font-medium leading-snug text-text-primary sm:text-[17px]">
                        {q.question}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[q.optionA, q.optionB].map((opt) => {
                          const isActive = current === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                setAnswers((s) => ({ ...s, [q.id]: opt.value }))
                              }
                              className={cn(
                                "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                                isActive
                                  ? "border-cyan/50 bg-bg-card text-text-primary shadow-[0_0_14px_var(--color-cyan-glow)]"
                                  : "border-border-subtle bg-bg-card/55 text-text-secondary hover:border-border-medium hover:text-text-primary",
                              )}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="relative">
                <div className="sticky top-24">
                  <div className="rounded-2xl border border-cyan/40 bg-bg-card p-5 shadow-[0_0_36px_var(--color-cyan-glow)] sm:p-6">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan/80">
                      {completed ? "Ma recommandation" : "Recommandation par défaut"}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={reco.label}
                        initial={staticRender ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={staticRender ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="mt-3 text-xl font-semibold leading-tight text-text-primary sm:text-2xl">
                          {reco.label}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                          {reco.rationale}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {!completed && (
                      <p className="mt-4 text-xs italic text-text-tertiary sm:text-sm">
                        Répondez aux trois questions pour affiner la
                        recommandation.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
