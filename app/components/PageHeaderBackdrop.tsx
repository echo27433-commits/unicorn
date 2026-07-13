"use client";

import { useEffect, useState } from "react";

import LineWaves from "./DynamicLineWaves";

const desktopWavesMask =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.85) 64%, black 76%, black 100%)";

/** Softer mask so waves read across a narrow phone screen */
const mobileWavesMask =
  "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 28%, black 55%, black 100%)";

const desktopDarkOverlay =
  "linear-gradient(to right, #000000 0%, #000000 40%, rgba(0,0,0,0.97) 48%, rgba(0,0,0,0.88) 54%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.52) 66%, rgba(0,0,0,0.32) 72%, rgba(0,0,0,0.16) 78%, rgba(0,0,0,0.06) 84%, transparent 92%)";

/** Keep text readable without burying the animation on mobile */
const mobileDarkOverlay =
  "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.55) 100%), linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)";

type PageHeaderBackdropProps = {
  /** Slightly richer waves for the home hero */
  intensity?: "default" | "home";
};

export default function PageHeaderBackdrop({
  intensity = "default",
}: PageHeaderBackdropProps) {
  const [isMobile, setIsMobile] = useState(false);
  // Defer WebGL until after first paint — CSS glow covers the gap (helps LCP).
  const [showWaves, setShowWaves] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduced) return;

    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;

    const enable = () => {
      if (!cancelled) setShowWaves(true);
    };

    // While the boot intro is up, start WebGL immediately so it warms behind it.
    const booting =
      !!document.getElementById("boot-loader") ||
      document.documentElement.dataset.booting === "1";

    if (booting) {
      enable();
      return () => {
        cancelled = true;
      };
    }

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(enable, 400);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const wavesMask = isMobile ? mobileWavesMask : desktopWavesMask;
  const isHome = intensity === "home";

  return (
    <>
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage: wavesMask,
          WebkitMaskImage: wavesMask,
        }}
      >
        {showWaves ? (
          <LineWaves
            key={`${isMobile ? "mobile" : "desktop"}-${intensity}`}
            speed={isMobile ? 0.11 : isHome ? 0.16 : 0.14}
            innerLineCount={isMobile ? 26 : isHome ? 44 : 40}
            outerLineCount={isMobile ? 30 : isHome ? 52 : 48}
            warpIntensity={isMobile ? 0.95 : isHome ? 1.25 : 1.15}
            rotation={isMobile ? -24 : -38}
            edgeFadeWidth={isMobile ? 0.14 : 0.08}
            colorCycleSpeed={isMobile ? 0.45 : isHome ? 0.65 : 0.55}
            brightness={isMobile ? 0.58 : isHome ? 0.68 : 0.62}
            color1="#ff5f28"
            color2="#ffc49a"
            color3="#ff3a00"
            enableMouseInteraction={false}
          />
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: isMobile ? mobileDarkOverlay : desktopDarkOverlay,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen opacity-40 md:opacity-50"
        style={{
          background: isMobile
            ? "radial-gradient(ellipse 90% 70% at 70% 40%, rgba(255,95,40,0.14), transparent 70%)"
            : "linear-gradient(to right, transparent 0%, transparent 46%, rgba(255,95,40,0.03) 54%, rgba(255,95,40,0.07) 64%, rgba(255,95,40,0.1) 72%, rgba(255,95,40,0.06) 80%, transparent 90%)",
        }}
      />

      <div
        className={`pointer-events-none absolute z-[1] ${
          isMobile
            ? "inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_90%_80%_at_70%_100%,rgba(255,95,40,0.22),transparent_70%)]"
            : "inset-y-0 right-0 w-[50%] bg-[radial-gradient(ellipse_85%_80%_at_90%_50%,rgba(255,95,40,0.2),transparent_75%)]"
        }`}
      />
    </>
  );
}
