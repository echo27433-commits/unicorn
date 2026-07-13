"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

const MIN_MS = 2200;
const MIN_REDUCED_MS = 600;
const MAX_MS = 5200;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
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

function waitForVisibleImages() {
  const vh = window.innerHeight;
  const imgs = Array.from(document.images).filter((img) => {
    if (img.closest("#boot-loader")) return false;
    const rect = img.getBoundingClientRect();
    return rect.top < vh * 1.6 && rect.bottom > -vh * 0.25;
  });

  return Promise.all(
    imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return img.decode?.().catch(() => undefined) ?? Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
        window.setTimeout(done, 2200);
      });
    })
  ).then(() => undefined);
}

async function waitForAppReady(minMs: number) {
  const started = performance.now();

  await Promise.race([
    Promise.all([
      waitForWindowLoad(),
      waitForFonts(),
      wait(400),
      waitForVisibleImages(),
    ]),
    wait(MAX_MS),
  ]);

  await waitForVisibleImages();

  const elapsed = performance.now() - started;
  if (elapsed < minMs) await wait(minMs - elapsed);
}

/**
 * Dismisses #boot-loader once fonts / first-viewport images / scroll setup are warm.
 * Soft client navigations keep the root layout mounted, so this only runs on full loads.
 */
export default function PageLoader() {
  const lenis = useLenis();

  useEffect(() => {
    const el = document.getElementById("boot-loader");
    if (!el) return;

    lenis?.stop();

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const minMs = reduced ? MIN_REDUCED_MS : MIN_MS;

    let cancelled = false;

    void (async () => {
      await waitForAppReady(minMs);
      if (cancelled) return;

      el.classList.add("is-done");
      lenis?.start();
      ScrollTrigger.refresh();

      window.setTimeout(() => el.remove(), 480);
    })();

    return () => {
      cancelled = true;
    };
  }, [lenis]);

  return null;
}
