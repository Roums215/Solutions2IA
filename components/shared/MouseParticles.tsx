"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface OrbitParticle {
  id: number;
  angle: number;
  radius: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

function canEnableEffects() {
  if (typeof window === "undefined") {
    return false;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  return !reducedMotion && !coarsePointer;
}

export function MouseParticles() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<OrbitParticle[]>([]);
  const visibleRef = useRef(false);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Smooth spring for the black hole center
  const blackHoleX = useSpring(cursorX, { stiffness: 150, damping: 25, mass: 0.5 });
  const blackHoleY = useSpring(cursorY, { stiffness: 150, damping: 25, mass: 0.5 });

  // Slower trail for outer glow
  const glowX = useSpring(cursorX, { stiffness: 80, damping: 20, mass: 1 });
  const glowY = useSpring(cursorY, { stiffness: 80, damping: 20, mass: 1 });

  // Event horizon distortion based on velocity
  const velocityMagnitude = useMotionValue(0);
  const holeScale = useTransform(velocityMagnitude, [0, 30], [1, 1.3]);
  const glowIntensity = useTransform(velocityMagnitude, [0, 30], [0.4, 0.9]);

  useEffect(() => {
    if (!canEnableEffects()) {
      return;
    }

    setEnabled(true);

    // Initialize orbiting particles with unique ids starting from 1000
    const initialParticles: OrbitParticle[] = Array.from({ length: 12 }, (_, i) => ({
      id: 1000 + i,
      angle: (i / 12) * Math.PI * 2,
      radius: 35 + Math.random() * 25,
      size: 2 + Math.random() * 3,
      speed: 0.02 + Math.random() * 0.03,
      color: i % 3 === 0 ? "rgba(34, 211, 238, 0.8)" : i % 3 === 1 ? "rgba(129, 140, 248, 0.8)" : "rgba(165, 180, 252, 0.6)",
      opacity: 0.4 + Math.random() * 0.4,
    }));
    particleIdRef.current = 2000; // Start spawned particles from 2000
    setParticles(initialParticles);

    function handlePointerMove(event: PointerEvent) {
      const prevX = cursorX.get();
      const prevY = cursorY.get();

      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      // Calculate velocity
      const vx = event.clientX - prevX;
      const vy = event.clientY - prevY;
      velocityRef.current = { x: vx, y: vy };
      velocityMagnitude.set(Math.min(Math.hypot(vx, vy), 30));

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      // Spawn trail particles when moving fast
      const now = performance.now();
      const speed = Math.hypot(vx, vy);
      if (speed > 8 && now - lastSpawnRef.current > 50) {
        lastSpawnRef.current = now;
        const newParticle: OrbitParticle = {
          id: particleIdRef.current++,
          angle: Math.atan2(vy, vx) + Math.PI,
          radius: 20 + Math.random() * 40,
          size: 1.5 + Math.random() * 2,
          speed: 0.04 + Math.random() * 0.02,
          color: Math.random() > 0.5 ? "rgba(34, 211, 238, 0.9)" : "rgba(129, 140, 248, 0.9)",
          opacity: 0.7,
        };

        setParticles(prev => [...prev.slice(-20), newParticle]);

        // Remove after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }

      lastPosRef.current = { x: event.clientX, y: event.clientY };
    }

    function handlePointerLeave() {
      visibleRef.current = false;
      setVisible(false);
      velocityMagnitude.set(0);
    }

    // Animate orbiting particles
    function animateParticles() {
      setParticles(prev => prev.map(p => ({
        ...p,
        angle: p.angle + p.speed,
        // Slowly spiral inward
        radius: p.radius > 15 ? p.radius - 0.02 : p.radius,
      })));
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    }

    animationFrameRef.current = requestAnimationFrame(animateParticles);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [cursorX, cursorY, velocityMagnitude]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor globally when effect is visible */}
      {visible && (
        <style>{`* { cursor: none !important; }`}</style>
      )}

      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden>
        {/* Outer gravitational glow - smaller and more transparent */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            x: glowX,
            y: glowY,
            width: 60,
            height: 60,
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(34,211,238,0.04) 50%, transparent 70%)",
            opacity: visible ? glowIntensity : 0,
            filter: "blur(10px)",
          }}
        />

        {/* Event horizon ring - smaller */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            x: blackHoleX,
            y: blackHoleY,
            width: 28,
            height: 28,
            scale: holeScale,
            opacity: visible ? 0.85 : 0,
          }}
        >
          {/* Outer spinning ring */}
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.25), transparent, rgba(129,140,248,0.25), transparent, rgba(34,211,238,0.25), transparent)",
              filter: "blur(2px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Spinning accretion disk */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.3), transparent, rgba(129,140,248,0.3), transparent)",
              filter: "blur(1.5px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner glow ring */}
          <motion.div
            className="absolute inset-[3px] rounded-full"
            style={{
              background: "conic-gradient(from 180deg, transparent, rgba(129,140,248,0.4), transparent, rgba(34,211,238,0.4), transparent)",
              filter: "blur(1px)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />

          {/* Black hole core */}
          <div
            className="absolute inset-[5px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(5,6,11,0.85) 60%, rgba(15,17,30,0.6) 100%)",
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.9), 0 0 8px rgba(99,102,241,0.2)",
            }}
          />

          {/* Core highlight - tiny bright spot */}
          <motion.div
            className="absolute rounded-full"
            style={{
              top: "30%",
              left: "30%",
              width: "20%",
              height: "20%",
              background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Secondary highlight */}
          <motion.div
            className="absolute rounded-full"
            style={{
              bottom: "25%",
              right: "25%",
              width: "15%",
              height: "15%",
              background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Orbiting particles - smaller */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              x: blackHoleX,
              y: blackHoleY,
              width: particle.size * 0.6,
              height: particle.size * 0.6,
              background: particle.color.replace(/[\d.]+\)$/, "0.6)"),
              boxShadow: `0 0 ${particle.size}px ${particle.color.replace(/[\d.]+\)$/, "0.4)")}`,
              opacity: visible ? particle.opacity * 0.7 : 0,
              translateX: Math.cos(particle.angle) * particle.radius * 0.5 - particle.size * 0.3,
              translateY: Math.sin(particle.angle) * particle.radius * 0.5 - particle.size * 0.3,
            }}
            animate={{
              opacity: visible ? [particle.opacity * 0.5, particle.opacity * 0.3, particle.opacity * 0.5] : 0,
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.id * 0.08,
            }}
          />
        ))}

        {/* Gravitational lensing effect - smaller */}
        <motion.svg
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            x: blackHoleX,
            y: blackHoleY,
            width: 44,
            height: 44,
            opacity: visible ? 0.2 : 0,
          }}
          viewBox="0 0 44 44"
        >
          {[0, 60, 120].map((angle) => (
            <motion.ellipse
              key={angle}
              cx="22"
              cy="22"
              rx="18"
              ry="6"
              fill="none"
              stroke="url(#lensGradient)"
              strokeWidth="0.3"
              transform={`rotate(${angle} 22 22)`}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2.5, delay: angle * 0.008, repeat: Infinity }}
            />
          ))}
          <defs>
            <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(129,140,248,0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Micro particles around core */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={`micro-${i}`}
            className="absolute rounded-full"
            style={{
              x: blackHoleX,
              y: blackHoleY,
              width: 1.5,
              height: 1.5,
              background: i % 2 === 0 ? "rgba(34,211,238,0.5)" : "rgba(129,140,248,0.5)",
              translateX: Math.cos((deg * Math.PI) / 180) * 18 - 0.75,
              translateY: Math.sin((deg * Math.PI) / 180) * 18 - 0.75,
              opacity: visible ? 0.6 : 0,
            }}
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: visible ? [0.3, 0.7, 0.3] : 0,
            }}
            transition={{
              duration: 1,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
}
