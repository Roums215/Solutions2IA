"use client";

import { useState, useEffect, createContext, useContext, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/shared/PageTransition";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { startFpsGuard } from "@/lib/animation/fpsGuard";

// MouseParticles chargé uniquement côté client + uniquement si shouldDegrade=false.
// Évite le téléchargement du bundle sur low-end / reduced-motion / save-data.
const MouseParticles = dynamic(
  () => import("@/components/shared/MouseParticles").then((m) => m.MouseParticles),
  { ssr: false },
);

interface LoadingContextType {
  isLoading: boolean;
  hideHeaderLogo: boolean;
  logoPosition: { top: number; left: number } | null;
  registerLogoRef: (ref: HTMLDivElement | null) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  hideHeaderLogo: true,
  logoPosition: null,
  registerLogoRef: () => {},
});

export function useLoadingState() {
  return useContext(LoadingContext);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [hideHeaderLogo, setHideHeaderLogo] = useState(true);
  const [logoPosition, setLogoPosition] = useState<{ top: number; left: number } | null>(null);
  const logoRefElement = useRef<HTMLDivElement | null>(null);

  const registerLogoRef = useCallback((ref: HTMLDivElement | null) => {
    logoRefElement.current = ref;
    if (ref) {
      const rect = ref.getBoundingClientRect();
      setLogoPosition({ top: rect.top, left: rect.left });
    }
  }, []);

  // Update position on resize
  useEffect(() => {
    const updatePosition = () => {
      if (logoRefElement.current) {
        const rect = logoRefElement.current.getBoundingClientRect();
        setLogoPosition({ top: rect.top, left: rect.left });
      }
    };

    window.addEventListener("resize", updatePosition);
    // Initial calculation after a small delay to ensure header is rendered
    const timer = setTimeout(updatePosition, 100);

    return () => {
      window.removeEventListener("resize", updatePosition);
      clearTimeout(timer);
    };
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setShowContent(true);
    setHideHeaderLogo(false);
  }, []);

  const { mounted, shouldHideBackgroundDecor } = usePerformanceMode();
  const decor = mounted && !shouldHideBackgroundDecor;

  // Garde FPS : démarre une fois le LoadingScreen terminé (warm-up interne
  // de 2,5 s en plus). Idempotent — ratchet via sessionStorage.
  useEffect(() => {
    if (!isLoading) startFpsGuard();
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, hideHeaderLogo, logoPosition, registerLogoRef }}>
      <TooltipProvider>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        <div
          className={`${showContent ? "app-content-visible" : "app-content-hidden"} flex min-h-screen flex-col`}
        >
          {decor && <MouseParticles />}
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
        <Toaster richColors position="bottom-right" />
      </TooltipProvider>
    </LoadingContext.Provider>
  );
}
