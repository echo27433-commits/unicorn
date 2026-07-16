/** Shared motion / scroll performance helpers (client-only). */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

/** Phones / small tablets — use lighter scroll + overlay motion. */
export function isMobileMotion(): boolean {
  return window.matchMedia?.("(max-width: 767px)")?.matches ?? false;
}

/** Scrub lag feels sticky on touch; prefer 1:1 on mobile. */
export function scrubValue(desktop = 0.85): boolean | number {
  return isMobileMotion() ? true : desktop;
}

export type SetupCoverOptions = {
  pinStart?: string;
  invalidateOnRefresh?: boolean;
};

/**
 * White/black panel cover: pin the outgoing section while the next slides over.
 * Mobile: pin only (no scale / radius / shadow paints).
 * Desktop: scale + opacity scrub + cover radius/shadow.
 */
export function setupCover(
  pinned: HTMLElement,
  cover: HTMLElement,
  pinnedInner?: HTMLElement | null,
  options?: SetupCoverOptions
) {
  const scrubTarget = pinnedInner ?? pinned;
  const mobile = isMobileMotion();
  const scrub = scrubValue(0.5);
  const invalidate = options?.invalidateOnRefresh ?? false;

  ScrollTrigger.create({
    trigger: pinned,
    start: options?.pinStart ?? "top top",
    endTrigger: cover,
    end: "top top",
    pin: true,
    pinSpacing: false,
    anticipatePin: mobile ? 0 : 1,
    fastScrollEnd: true,
    ...(invalidate ? { invalidateOnRefresh: true } : {}),
  });

  // Skip scale / radius / shadow on mobile — scaled full-bleed layers leave
  // black side gaps and force expensive paints while scrolling.
  if (mobile) return;

  gsap.fromTo(
    scrubTarget,
    { scale: 1, ...(pinnedInner ? {} : { opacity: 1 }) },
    {
      scale: 0.96,
      ...(pinnedInner ? {} : { opacity: 0.55 }),
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: cover,
        start: "top bottom",
        end: "top top",
        scrub,
        fastScrollEnd: true,
        ...(invalidate ? { invalidateOnRefresh: true } : {}),
      },
    }
  );

  setupCoverSheet(cover, { scrub, invalidateOnRefresh: invalidate });
}

/**
 * Desktop-only radius/shadow polish as a covering panel enters — no pin.
 * No-op on mobile.
 */
export function setupCoverSheet(
  cover: HTMLElement,
  options?: { scrub?: boolean | number; invalidateOnRefresh?: boolean }
) {
  if (isMobileMotion()) return;

  const scrub = options?.scrub ?? scrubValue(0.5);

  gsap.fromTo(
    cover,
    {
      borderRadius: "28px 28px 0px 0px",
      boxShadow: "0 -8px 24px rgba(0,0,0,0)",
    },
    {
      borderRadius: "0px 0px 0px 0px",
      boxShadow: "0 -20px 48px rgba(0,0,0,0.35)",
      ease: "none",
      scrollTrigger: {
        trigger: cover,
        start: "top bottom",
        end: "top top",
        scrub,
        fastScrollEnd: true,
        ...(options?.invalidateOnRefresh
          ? { invalidateOnRefresh: true }
          : {}),
      },
    }
  );
}

export type SetupRevealOptions = {
  /** Root to query within (defaults to document). */
  scope?: ParentNode;
  start?: string;
  y?: number;
  cardY?: number;
  duration?: number;
  cardDuration?: number;
  stagger?: number;
  cardStagger?: number;
  ease?: string;
};

/**
 * One-shot opacity/transform reveals for `[data-reveal]` groups with
 * `[data-reveal-item]` children. Cards use `data-stagger-cards` for larger motion.
 */
export function setupReveal(options?: SetupRevealOptions) {
  const {
    scope = document,
    start = "top 85%",
    y = 16,
    cardY = 32,
    duration = 0.6,
    cardDuration = 0.55,
    stagger = 0.06,
    cardStagger = 0.1,
    ease = "power2.out",
  } = options ?? {};

  const groups = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);

  groups.forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
    if (!items.length) return;

    const isCardStagger = group.hasAttribute("data-stagger-cards");

    gsap.set(items, {
      opacity: 0,
      y: isCardStagger ? cardY : y,
      force3D: true,
    });

    ScrollTrigger.create({
      trigger: group,
      start,
      once: true,
      fastScrollEnd: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: isCardStagger ? cardDuration : duration,
          ease,
          stagger: isCardStagger ? cardStagger : stagger,
          overwrite: "auto",
        });
      },
    });
  });
}

/** Module-level coalescer — one pending refresh across all covers/pages. */
let refreshTimer = 0;
let loadBound = false;
let subscribers = 0;

function flushScrollRefresh() {
  refreshTimer = 0;
  ScrollTrigger.refresh();
}

function queueScrollRefresh(delayMs: number) {
  if (refreshTimer) window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(flushScrollRefresh, delayMs);
}

function ensureLoadRefresh() {
  if (loadBound || typeof window === "undefined") return;
  loadBound = true;
  if (document.readyState === "complete") return;
  window.addEventListener("load", () => queueScrollRefresh(0), { once: true });
}

/**
 * Shared debounced ScrollTrigger.refresh — coalesces load + timeout storms
 * from covers, page clients, and SmoothScroll into a single pending refresh.
 */
export function scheduleScrollRefresh(delayMs = 250): () => void {
  subscribers += 1;
  ensureLoadRefresh();
  queueScrollRefresh(delayMs);

  return () => {
    subscribers = Math.max(0, subscribers - 1);
    if (subscribers === 0 && refreshTimer) {
      window.clearTimeout(refreshTimer);
      refreshTimer = 0;
    }
  };
}
