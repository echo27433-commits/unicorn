"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

import { isMobileMotion } from "../lib/motion";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

function LenisGsapBridge() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Touch devices: stop Lenis so native scroll drives ScrollTrigger.
    if (isMobileMotion()) {
      lenis.stop();
      ScrollTrigger.refresh();
      return () => {
        lenis.start();
      };
    }

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis || isMobileMotion()) return;

    const id = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Skip driving Lenis from the GSAP ticker on mobile (native scroll only).
    if (isMobileMotion()) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

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
