"use client";

import { useEffect, useId, useState } from "react";

import {
  CALENDLY_CLOSE_EVENT,
  CALENDLY_OPEN_EVENT,
  CALENDLY_URL,
  closeCalendlyPopup,
} from "../lib/calendly";

/** Custom Calendly modal with an explicit close button. */
export default function CalendlyModal() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    window.addEventListener(CALENDLY_OPEN_EVENT, onOpen);
    window.addEventListener(CALENDLY_CLOSE_EVENT, onClose);

    return () => {
      window.removeEventListener(CALENDLY_OPEN_EVENT, onOpen);
      window.removeEventListener(CALENDLY_CLOSE_EVENT, onClose);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCalendlyPopup();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  const embedSrc = `${CALENDLY_URL}?embed_domain=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "localhost"
  )}&embed_type=Inline`;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close calendar overlay"
        className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-[2px]"
        onClick={closeCalendlyPopup}
      />

      <div className="relative z-[1] flex h-[min(92svh,760px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)]">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/10 px-4 py-3 sm:px-5">
          <p
            id={titleId}
            className="text-sm font-medium tracking-wide text-black/70"
          >
            Speak with our team
          </p>
          <button
            type="button"
            onClick={closeCalendlyPopup}
            aria-label="Close calendar"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black transition hover:border-[#ff5f28]/40 hover:bg-[#ff5f28]/10 hover:text-[#ff5f28]"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 bg-white">
          <iframe
            title="Schedule a meeting with unicorn"
            src={embedSrc}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
