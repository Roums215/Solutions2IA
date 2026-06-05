"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type PropsWithChildren,
  type CSSProperties,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePerformanceMode } from "./usePerformanceMode";

interface ParallaxCtx {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  enabled: boolean;
}

const ParallaxContext = createContext<ParallaxCtx | null>(null);

export function useParallaxLayer(depth: number) {
  const ctx = useContext(ParallaxContext);
  const zero = useMotionValue(0);
  const source = ctx?.enabled ? ctx : null;
  const tx = useTransform(source?.mx ?? zero, (v) => v * depth);
  const ty = useTransform(source?.my ?? zero, (v) => v * depth);
  const ry = useTransform(source?.mx ?? zero, (v) => v * (depth * 0.18));
  const rx = useTransform(source?.my ?? zero, (v) => -v * (depth * 0.18));
  return { tx, ty, rx, ry };
}

interface ParallaxFieldProps {
  className?: string;
  perspective?: number;
  disabled?: boolean;
  style?: CSSProperties;
}

export function ParallaxField({
  children,
  className,
  perspective = 1400,
  disabled,
  style,
}: PropsWithChildren<ParallaxFieldProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 70, damping: 18, mass: 0.8 });
  const my = useSpring(rawY, { stiffness: 70, damping: 18, mass: 0.8 });

  const { mounted, isCoarsePointer, prefersReducedMotion } = usePerformanceMode();
  const enabled = mounted && !disabled && !isCoarsePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(x * 2);
      rawY.set(y * 2);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  return (
    <ParallaxContext.Provider value={{ mx, my, enabled }}>
      <div
        ref={containerRef}
        className={className}
        style={{ perspective: `${perspective}px`, transformStyle: "preserve-3d", ...style }}
      >
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}

export { motion };
