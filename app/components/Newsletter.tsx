"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative w-full overflow-hidden bg-white font-sans"
    >
      <div className="relative mx-auto w-full max-w-[90rem] px-4 py-5 pb-3 sm:py-16 md:px-8 md:py-28 lg:px-12 lg:py-36">
        <div
          className={`relative mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-black/8 bg-[#fff5f0] px-5 py-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.18)] transition-all duration-1000 sm:rounded-[2rem] sm:px-8 sm:py-16 md:rounded-[2.75rem] md:px-16 md:py-28 lg:px-24 lg:py-32 ${
            visible ? "animate-fade-up opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Continuous moving gradient layers */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <div className="newsletter-gradient-spin absolute left-1/2 top-1/2 h-[180%] w-[180%] max-md:opacity-80" />
            <div className="newsletter-gradient-spin-rev absolute left-[20%] top-[30%] h-[120%] w-[120%] max-md:opacity-70" />
            <div className="newsletter-gradient-drift absolute -left-1/4 top-0 h-full w-[70%] max-md:opacity-80" />
          </div>

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center rounded-lg border border-[#ff5f28]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff5f28] sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.2em] md:text-xs">
              Stay Updated
            </span>

            <h2 className="mt-4 text-[1.75rem] font-light leading-[1.12] tracking-tight text-black sm:mt-8 sm:text-4xl sm:leading-[1.1] md:mt-10 md:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.06]">
              Insights that help you{" "}
              <span className="text-[#ff5f28]">build, scale &amp; lead.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-[0.8125rem] leading-relaxed text-black/55 sm:mt-6 sm:text-sm md:mt-8 md:text-lg">
              Get product updates, case studies, and digital growth ideas — no
              noise, just signal.
            </p>

            <Link
              href="/contact"
              className="btn btn--primary group mt-5 inline-flex w-full items-center justify-center gap-3 sm:mt-10 sm:w-auto md:mt-14 md:text-lg"
            >
              Book a demo
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff5f28] transition-transform duration-200 group-hover:translate-x-0.5">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
