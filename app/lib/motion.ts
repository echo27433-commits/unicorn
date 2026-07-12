/** Shared motion / scroll performance helpers (client-only). */

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
