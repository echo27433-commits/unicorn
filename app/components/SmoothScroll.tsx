"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { isMobileMotion, scheduleScrollRefresh } from "../lib/motion";
import { useReducedMotion } from "../lib/useReducedMotion";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

function LenisGsapBridge() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const cancelRefresh = scheduleScrollRefresh(80);

    return () => {
      cancelRefresh();
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    const cancelRefresh = scheduleScrollRefresh(120);
    const id = window.setTimeout(() => {
      lenis?.resize();
    }, 120);

    return () => {
      cancelRefresh();
      window.clearTimeout(id);
    };
  }, [pathname, lenis]);

  return null;
}

/**
 * Native scroll by default (mobile, reduced-motion, and until idle/input).
 * Lenis + gsap.ticker only mount on desktop after the TBT window — biggest
 * lever for Lighthouse "Other" / continuous RAF cost.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [smoothEnabled, setSmoothEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || isMobileMotion()) return;

    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;

    const enable = () => {
      if (!cancelled) setSmoothEnabled(true);
    };

    const onFirstInput = () => {
      enable();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("wheel", onFirstInput);
      window.removeEventListener("touchstart", onFirstInput);
      window.removeEventListener("keydown", onFirstInput);
    };

    window.addEventListener("wheel", onFirstInput, { passive: true, once: true });
    window.addEventListener("touchstart", onFirstInput, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", onFirstInput, { once: true });

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: 5500 });
    } else {
      timeoutId = window.setTimeout(enable, 5000);
    }

    return () => {
      cancelled = true;
      cleanupListeners();
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [reduced]);

  useEffect(() => {
    if (!smoothEnabled) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [smoothEnabled]);

  // No Lenis tree until enabled — avoids wrapping every page in continuous work.
  if (!smoothEnabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.12,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
        allowNestedScroll: true,
        syncTouch: false,
        touchMultiplier: 1.5,
        wheelMultiplier: 0.95,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
