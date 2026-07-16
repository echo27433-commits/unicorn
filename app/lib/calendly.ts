export const CALENDLY_URL =
  "https://calendly.com/hello-theunicorn-zypy/unicorn";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/** Opens the Calendly popup widget; falls back to a new tab if script is not ready. */
export function openCalendlyPopup() {
  if (typeof window === "undefined") return;

  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}
