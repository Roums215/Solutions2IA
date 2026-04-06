"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);

    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    const exitTimer = setTimeout(() => setIsExiting(true), 2800);
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete?.();
    }, 3400);

    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg-primary flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => {
        if (isExiting) {
          document.body.style.overflow = "";
        }
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 60,
              height: 200 + i * 60,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              border: `1px solid rgba(99, 102, 241, ${0.12 - i * 0.02})`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.15, 0.8],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </div>

      {/* Centered logo */}
      {showLogo && (
        <motion.div
          className="relative w-[180px] h-[180px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: premiumEase }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/branding/logo-s2ia.png"
              alt="Solutions 2IA"
              fill
              className="object-contain"
              style={{
                filter: "drop-shadow(0 0 30px rgba(99,102,241,0.5)) drop-shadow(0 0 60px rgba(34,211,238,0.3))",
              }}
              sizes="180px"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 30px rgba(99,102,241,0.3), inset 0 0 20px rgba(99,102,241,0.1)",
                "0 0 50px rgba(34,211,238,0.4), inset 0 0 30px rgba(34,211,238,0.15)",
                "0 0 30px rgba(99,102,241,0.3), inset 0 0 20px rgba(99,102,241,0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-1/3 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="w-52 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, rgba(99,102,241,0.9), rgba(34,211,238,1), rgba(129,140,248,0.9))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        <motion.p
          className="mt-4 text-[11px] text-text-tertiary/60 tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Chargement
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
