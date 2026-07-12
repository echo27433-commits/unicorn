"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

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
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
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
