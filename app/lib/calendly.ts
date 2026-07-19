export const CALENDLY_URL =
  "https://calendly.com/hello-theunicorn-zypy/unicorn";

export const CALENDLY_OPEN_EVENT = "unicorn:calendly-open";
export const CALENDLY_CLOSE_EVENT = "unicorn:calendly-close";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget?: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/** Opens the site Calendly modal (with close button). */
export function openCalendlyPopup() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CALENDLY_OPEN_EVENT));
}

/** Closes the site Calendly modal. */
export function closeCalendlyPopup() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CALENDLY_CLOSE_EVENT));
}
