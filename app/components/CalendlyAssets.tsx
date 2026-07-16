"use client";

import Script from "next/script";

/** Loads Calendly popup CSS + JS once for the whole app. */
export default function CalendlyAssets() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
