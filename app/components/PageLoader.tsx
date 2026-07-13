"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

const MIN_MS = 2400;
const MIN_REDUCED_MS = 700;
const MAX_MS = 7000;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function waitFrames(count = 2) {
  return new Promise<void>((resolve) => {
    const step = (left: number) => {
      if (left <= 0) {
        resolve();
        return;
      }
      requestAnimationFrame(() => step(left - 1));
    };
    step(count);
  });
}

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForFonts() {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(
    () => undefined,
    () => undefined
  );
}

function decodeImage(img: HTMLImageElement) {
  if (img.complete && img.naturalWidth > 0) {
    return img.decode?.().catch(() => undefined) ?? Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
    window.setTimeout(done, 2800);
  });
}

/** All page images except the boot loader itself. */
function waitForPageImages() {
  const imgs = Array.from(document.images).filter(
    (img) => !img.closest("#boot-loader")
  );
  return Promise.all(imgs.map(decodeImage)).then(() => undefined);
}

/**
 * Prefetch heavy home chunks so Case Study / Location / Newsletter / Waves
 * parse while the intro is on screen.
 */
function prefetchHeavyChunks() {
  return Promise.allSettled([
    import("./CaseStudy"),
    import("./LocationCover"),
    import("./BrandsTrust"),
    import("./NewsletterCover"),
    import("./DynamicLineWaves"),
    import("./Reviews"),
    import("./OurLocation"),
  ]);
}

/** Wait until hero WebGL canvas mounts (or give up). */
function waitForHeroWaves(timeoutMs = 3200) {
  const selector = ".line-waves-container canvas, header canvas";
  if (document.querySelector(selector)) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const started = performance.now();

    const tick = () => {
      if (
        document.querySelector(selector) ||
        performance.now() - started > timeoutMs
      ) {
        resolve();
        return;
      }
      window.setTimeout(tick, 80);
    };

    tick();
  });
}

/** Let React effects + ScrollTrigger pins settle, then refresh. */
async function settleMotion() {
  await wait(500);
  await waitFrames(3);
  ScrollTrigger.refresh();
  await waitFrames(2);
}

async function waitForAppReady(minMs: number) {
  const started = performance.now();

  // Kick chunk downloads immediately (don't block the rest on them alone).
  const chunks = prefetchHeavyChunks();

  await Promise.race([
    Promise.all([
      waitForWindowLoad(),
      waitForFonts(),
      waitForPageImages(),
      waitForHeroWaves(),
      chunks,
      wait(600),
    ]),
    wait(MAX_MS),
  ]);

  // Second pass — dynamic sections may have injected more <img>s.
  await waitForPageImages();
  await settleMotion();

  const elapsed = performance.now() - started;
  if (elapsed < minMs) await wait(minMs - elapsed);
}

/**
 * Keeps the multilingual intro up while images, hero waves, GSAP covers,
 * and below-fold chunks warm — then fades out so the first scroll feels ready.
 */
export default function PageLoader() {
  const lenis = useLenis();

  useEffect(() => {
    const el = document.getElementById("boot-loader");
    if (!el) return;

    document.documentElement.dataset.booting = "1";
    lenis?.stop();

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const minMs = reduced ? MIN_REDUCED_MS : MIN_MS;

    let cancelled = false;

    void (async () => {
      await waitForAppReady(minMs);
      if (cancelled) return;

      el.classList.add("is-done");
      delete document.documentElement.dataset.booting;
      lenis?.start();
      ScrollTrigger.refresh();

      window.setTimeout(() => el.remove(), 500);
    })();

    return () => {
      cancelled = true;
      delete document.documentElement.dataset.booting;
    };
  }, [lenis]);

  return null;
}
