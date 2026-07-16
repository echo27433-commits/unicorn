"use client";

import dynamic from "next/dynamic";

/** Shared lazy newsletter pin section used across page clients. */
const DeferredNewsletterCover = dynamic(() => import("./NewsletterCover"), {
  loading: () => (
    <div className="min-h-[50vh] w-full bg-black" aria-hidden />
  ),
});

export default DeferredNewsletterCover;
