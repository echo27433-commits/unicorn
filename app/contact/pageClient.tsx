"use client";

import dynamic from "next/dynamic";
import { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContactHeader from "../components/ContactHeader";
import NewsletterCover from "../components/NewsletterCover";
import { locations } from "../components/locations";

gsap.registerPlugin(ScrollTrigger);

const LocationMap = dynamic(() => import("../components/LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center bg-[#f3f3f3] md:min-h-[560px]">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#ff5f28] border-t-transparent" />
        <span className="text-sm text-black/45">Loading map…</span>
      </div>
    </div>
  ),
});

const LINKEDIN_URL =
  "https://www.linkedin.com/company/theunicornglobal/?viewAsMember=true";

const fieldClass =
  "w-full border-0 border-b border-black/15 bg-transparent px-0 py-3 text-base text-black outline-none transition placeholder:text-black/35 focus:border-[#ff5f28] focus:ring-0";

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [mode, setMode] = useState<"overview" | "focused">("overview");
  const [overviewKey, setOverviewKey] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    const cover = coverRef.current;
    if (!hero || !cover) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        endTrigger: cover,
        end: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      gsap.fromTo(
        hero,
        { scale: 1, opacity: 1 },
        {
          scale: 0.94,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cover,
            start: "top bottom",
            end: "top top",
            scrub: 0.9,
          },
        }
      );

      gsap.fromTo(
        cover,
        {
          borderRadius: "32px 32px 0px 0px",
          boxShadow: "0 -12px 40px rgba(0,0,0,0)",
        },
        {
          borderRadius: "0px 0px 0px 0px",
          boxShadow: "0 -32px 90px rgba(0,0,0,0.5)",
          ease: "none",
          scrollTrigger: {
            trigger: cover,
            start: "top bottom",
            end: "top top",
            scrub: 0.9,
          },
        }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timeout = window.setTimeout(refresh, 250);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.set(items, { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: group,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleSelectLocation = (index: number) => {
    setMode("focused");
    setActiveIndex(index);
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <ContactHeader ref={heroRef} />

      <div
        ref={coverRef}
        className="relative z-20 overflow-hidden bg-white will-change-transform"
      >
        <main className="relative bg-white font-sans">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#ff5f28]/[0.08] blur-3xl" />
            <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#ff5f28]/[0.06] blur-3xl" />
          </div>

          <section className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:pt-32 lg:pb-20">
            <div
              data-reveal
              className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20"
            >
              <div className="max-w-xl lg:max-w-none">
                <p
                  data-reveal-item
                  className="text-sm font-medium tracking-wide text-[#ff5f28]"
                >
                  / get in touch /
                </p>

                <h2
                  data-reveal-item
                  className="mt-5 text-4xl font-light leading-[1.12] tracking-tight text-black md:text-5xl lg:text-6xl lg:leading-[1.08] xl:text-[4rem]"
                >
                  We are always ready to help you and answer your{" "}
                  <span className="text-[#ff5f28]">questions</span>
                </h2>

                <p
                  data-reveal-item
                  className="mt-6 max-w-md text-sm leading-relaxed text-black/55 md:text-base"
                >
                  Reach out with your project goals or questions — our team across
                  the UAE, Saudi Arabia, Bahrain, Qatar, and India will get back
                  to you with clear next steps.
                </p>

                <div
                  data-reveal-item
                  className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12"
                >
                  <div>
                    <h3 className="text-base font-semibold text-black md:text-lg">
                      Call Center
                    </h3>
                    <a
                      href="tel:+971585686912"
                      className="mt-3 block text-sm leading-relaxed text-black/55 transition-colors hover:text-[#ff5f28] md:text-base"
                    >
                      +97 158 5686912
                    </a>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black md:text-lg">
                      Our Location
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-black/55 md:text-base">
                      Unicorn Worldwide Marketing Services FZ-LLC
                      <br />
                      Ontario Tower, C1801
                      <br />
                      Business Bay, Dubai, UAE
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black md:text-lg">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@theunicorn.global"
                      className="mt-3 block text-sm leading-relaxed text-black/55 transition-colors hover:text-[#ff5f28] md:text-base"
                    >
                      hello@theunicorn.global
                    </a>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black md:text-lg">
                      Social network
                    </h3>
                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/60 transition-colors hover:border-[#ff5f28]/50 hover:text-[#ff5f28]"
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-reveal-item
                id="contact-form"
                className="rounded-[1.75rem] border border-black/8 bg-black/[0.03] p-8 text-black md:rounded-[2rem] md:p-10 lg:p-12"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
                  Get in Touch
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/50 md:text-base">
                  Define your goals and identify areas where AI can add value to
                  your business.
                </p>

                {submitted ? (
                  <div className="mt-10 rounded-2xl border border-[#ff5f28]/30 bg-[#ff5f28]/10 px-6 py-8 text-center">
                    <p className="text-lg font-medium text-black">
                      Thanks — we&apos;ve received your message.
                    </p>
                    <p className="mt-2 text-sm text-black/55">
                      Our team will reply at the earliest opportunity.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-[#ff5f28]"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7">
                    <label className="block">
                      <span className="sr-only">Full name</span>
                      <input
                        required
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        className={fieldClass}
                      />
                    </label>

                    <label className="block">
                      <span className="sr-only">Email</span>
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        className={fieldClass}
                      />
                    </label>

                    <label className="block">
                      <span className="sr-only">Subject</span>
                      <input
                        required
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        className={fieldClass}
                      />
                    </label>

                    <label className="block">
                      <span className="sr-only">Message</span>
                      <textarea
                        required
                        name="message"
                        rows={3}
                        placeholder="Message"
                        className={`${fieldClass} min-h-[5.5rem] resize-y`}
                      />
                    </label>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#ff5f28] disabled:cursor-wait disabled:opacity-70"
                      >
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
                        {submitting ? "Sending…" : "Send a message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>

          <section
            id="find-us"
            className="relative border-t border-black/8 bg-white"
          >
            <div
              data-reveal
              className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:py-28"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
                <div className="max-w-2xl">
                  <p
                    data-reveal-item
                    className="text-sm font-medium tracking-wide text-[#ff5f28]"
                  >
                    / where to find us /
                  </p>
                  <h2
                    data-reveal-item
                    className="mt-4 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl"
                  >
                    Visit our offices{" "}
                    <span className="text-[#ff5f28]">worldwide</span>
                  </h2>
                  <p
                    data-reveal-item
                    className="mt-5 max-w-lg text-sm leading-relaxed text-black/55 md:text-base"
                  >
                    Headquartered in Business Bay, Dubai — with teams across
                    India and the USA. Click a location or pin to explore.
                  </p>
                </div>

                <div data-reveal-item className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("overview");
                      setOverviewKey((k) => k + 1);
                    }}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      mode === "overview"
                        ? "border-[#ff5f28] bg-[#ff5f28]/10 text-[#ff5f28]"
                        : "border-black/10 text-black/55 hover:border-[#ff5f28]/40 hover:text-[#ff5f28]"
                    }`}
                  >
                    View all
                  </button>
                  {locations.map((loc, index) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleSelectLocation(index)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        mode === "focused" && activeIndex === index
                          ? "border-[#ff5f28] bg-[#ff5f28]/10 text-[#ff5f28]"
                          : "border-black/10 text-black/55 hover:border-[#ff5f28]/40 hover:text-[#ff5f28]"
                      }`}
                    >
                      {loc.country}
                    </button>
                  ))}
                </div>
              </div>

              <div
                data-reveal-item
                className="mt-10 overflow-hidden rounded-[1.75rem] border border-black/10 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] md:mt-14 md:rounded-[2rem]"
              >
                <div className="h-[420px] md:h-[560px] lg:h-[640px]">
                  <LocationMap
                    activeIndex={activeIndex}
                    revealedCount={locations.length}
                    mode={mode}
                    overviewKey={overviewKey}
                    onSelect={handleSelectLocation}
                  />
                </div>
              </div>

              <p
                data-reveal-item
                className="mt-4 text-center text-xs text-black/35"
              >
                Scroll to zoom · Drag to pan · Click pins to explore
              </p>
            </div>
          </section>
        </main>
      </div>

      <NewsletterCover />
    </div>
  );
}
