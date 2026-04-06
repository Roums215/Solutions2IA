"use client";

import { motion } from "motion/react";

type AmbientPreset = "home" | "ai" | "electric" | "web" | "mobile" | "studio" | "about" | "contact" | "services";

interface AmbientBackgroundProps {
  preset: AmbientPreset;
}

export function AmbientBackground({ preset }: AmbientBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Shared noise layer */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {preset === "ai" && (
        <>
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-accent-primary/4 rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-cyan/3 rounded-full blur-[180px]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-light/5 rounded-full blur-[150px]" />
          {/* Floating neural grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1200 800">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.line
                key={i}
                x1={60 * i} y1="0" x2={60 * (i + 1)} y2="800"
                stroke="var(--color-accent-primary)" strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 6, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </svg>
        </>
      )}

      {preset === "electric" && (
        <>
          <div className="absolute top-[30%] left-[25%] w-[500px] h-[500px] bg-cyan/4 rounded-full blur-[200px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-accent-primary/3 rounded-full blur-[180px]" />
          {/* Circuit traces */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" viewBox="0 0 1200 800">
            {Array.from({ length: 8 }, (_, i) => {
              const y = 100 + i * 90;
              return (
                <motion.path
                  key={i}
                  d={`M0 ${y} L${200 + i * 50} ${y} L${250 + i * 50} ${y + 40} L1200 ${y + 40}`}
                  stroke="var(--color-cyan)" strokeWidth="1" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 8, delay: i * 1.2, repeat: Infinity }}
                />
              );
            })}
          </svg>
        </>
      )}

      {preset === "studio" && (
        <>
          <div className="absolute top-[15%] right-[20%] w-[400px] h-[400px] bg-accent-primary/4 rounded-full blur-[180px]" />
          <div className="absolute bottom-[15%] left-[25%] w-[350px] h-[350px] bg-cyan/3 rounded-full blur-[160px]" />
          <div className="absolute top-[60%] right-[40%] w-[200px] h-[200px] bg-green-400/2 rounded-full blur-[120px]" />
        </>
      )}

      {preset === "web" && (
        <>
          <div className="absolute top-[25%] left-[30%] w-[450px] h-[450px] bg-accent-primary/4 rounded-full blur-[180px]" />
          <div className="absolute bottom-[20%] right-[25%] w-[300px] h-[300px] bg-cyan/3 rounded-full blur-[150px]" />
        </>
      )}

      {preset === "mobile" && (
        <>
          <div className="absolute top-[20%] left-[35%] w-[400px] h-[400px] bg-accent-primary/4 rounded-full blur-[180px]" />
          <div className="absolute bottom-[25%] right-[30%] w-[350px] h-[350px] bg-cyan/3 rounded-full blur-[160px]" />
        </>
      )}

      {(preset === "home" || preset === "services" || preset === "about" || preset === "contact") && (
        <>
          <div className="absolute top-[20%] left-[25%] w-[400px] h-[400px] bg-accent-primary/3 rounded-full blur-[200px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-cyan/2 rounded-full blur-[180px]" />
        </>
      )}
    </div>
  );
}
