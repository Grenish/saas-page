"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
  smooth?: number;
  effects?: boolean;
  smoothTouch?: number;
}

export default function SmoothScrollWrapper({
  children,
  smooth = 1.5,
  effects = true,
  smoothTouch = 0.1,
}: SmoothScrollWrapperProps) {
  const smoother = useRef<ScrollSmoother | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  const smootherConfig = useMemo(
    () => ({
      smooth,
      effects,
      smoothTouch,
      normalizeScroll: true,
      ignoreMobileResize: true,
    }),
    [smooth, effects, smoothTouch]
  );

  const cleanup = useCallback(() => {
    if (smoother.current) {
      smoother.current.kill();
      smoother.current = null;
      isInitialized.current = false;
    }
    ScrollTrigger.clearMatchMedia();
    ScrollTrigger.refresh();
  }, []);

  const initializeSmoother = useCallback(() => {
    if (isInitialized.current || !wrapperRef.current || !contentRef.current) {
      return;
    }

    try {
      cleanup();

      smoother.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        ...smootherConfig,
      });

      isInitialized.current = true;
    } catch (error) {
      console.warn("Failed to initialize ScrollSmoother:", error);
      isInitialized.current = false;
    }
  }, [smootherConfig, cleanup]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (smoother.current) {
          ScrollTrigger.refresh();
        }
      }, 250);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number;
    const initWithRAF = () => {
      rafId = requestAnimationFrame(() => {
        initializeSmoother();
      });
    };

    const timeoutId = setTimeout(initWithRAF, 50);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      cleanup();
    };
  }, [initializeSmoother, cleanup]);

  useEffect(() => {
    if (isInitialized.current && smoother.current) {
      cleanup();
      const timeoutId = setTimeout(initializeSmoother, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [smootherConfig, initializeSmoother, cleanup]);

  return (
    <div
      ref={wrapperRef}
      id="smooth-wrapper"
      style={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        ref={contentRef}
        id="smooth-content"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
