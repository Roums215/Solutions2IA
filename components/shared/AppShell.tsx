"use client";

import { useState, useEffect, createContext, useContext, useRef, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/shared/PageTransition";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

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
  const [showContent, setShowContent] = useState(false);
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

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
    setHideHeaderLogo(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, hideHeaderLogo, logoPosition, registerLogoRef }}>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={showContent ? "app-content-visible" : "app-content-hidden"}>
        <Header />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </LoadingContext.Provider>
  );
}
