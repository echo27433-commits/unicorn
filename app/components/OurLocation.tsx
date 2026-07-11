"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { locations } from "./locations";

gsap.registerPlugin(ScrollTrigger);

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[360px] items-center justify-center rounded-2xl bg-white/[0.04] md:min-h-[480px]">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#ff5f28] border-t-transparent" />
        <span className="text-sm text-white/45">Loading map…</span>
      </div>
    </div>
  ),
});

const STAGGER_MS = 250;

export default function OurLocation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [mode, setMode] = useState<"overview" | "focused">("overview");
  const [overviewKey, setOverviewKey] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const startPinReveal = () => {
      if (triggered.current) return;
      triggered.current = true;
      for (let i = 0; i < locations.length; i++) {
        window.setTimeout(() => setRevealedCount(i + 1), 400 + i * STAGGER_MS);
      }
    };

    if (prefersReduced) {
      startPinReveal();
      return;
    }

    const ctx = gsap.context(() => {
      const header = section.querySelectorAll("[data-location-header]");
      const rule = section.querySelector("[data-location-rule]");
      const cards = section.querySelectorAll("[data-location-card]");
      const map = section.querySelector("[data-location-map]");

      gsap.set(header, {
        autoAlpha: 0,
        y: 48,
        scale: 0.96,
      });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(cards, {
        autoAlpha: 0,
        y: 56,
        scale: 0.96,
        transformOrigin: "center bottom",
      });
      gsap.set(map, {
        autoAlpha: 0,
        y: 56,
        scale: 0.96,
        transformOrigin: "center bottom",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
          onEnter: startPinReveal,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(header, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.08,
      })
        .to(rule, { scaleX: 1, duration: 0.8 }, "-=0.5")
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .to(
          map,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
          },
          "-=0.65"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSelect = (index: number) => {
    setMode("focused");
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="relative w-full overflow-hidden bg-black font-sans text-white"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#ff5f28]/[0.1] blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#ff5f28]/[0.06] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[90rem] px-4 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="max-w-4xl">
          <p
            data-location-header
            className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:mb-6 md:text-sm"
          >
            <span aria-hidden>✦</span>
            Our Location
          </p>
          <h2
            data-location-header
            className="text-4xl font-light leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-[4rem]"
          >
            Global presence,{" "}
            <span className="text-[#ff5f28]">local expertise</span>
          </h2>
          <p
            data-location-header
            className="mt-5 max-w-[30.5rem] text-sm leading-relaxed text-white/55 md:mt-6 md:text-[0.95rem]"
          >
            Explore our offices on the map — click a location or pin to fly there
            interactively.
          </p>
        </div>

        <div
          data-location-rule
          className="mt-12 h-px w-full bg-gradient-to-r from-[#ff5f28] via-[#ff5f28]/40 to-transparent md:mt-16"
        />

        <div
          className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-10"
        >
          <div className="flex flex-col gap-3 lg:col-span-2">
            {locations.map((loc, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={loc.id}
                  type="button"
                  data-location-card
                  onClick={() => handleSelect(index)}
                  className={`group w-full rounded-2xl border p-5 text-left transition-colors duration-300 md:p-6 ${
                    active
                      ? "border-[#ff5f28]/40 bg-[#ff5f28]/[0.12] shadow-[0_8px_32px_-8px_rgba(255,95,40,0.25)]"
                      : "border-white/10 bg-white/[0.03] hover:border-[#ff5f28]/30 hover:bg-[#ff5f28]/[0.06]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff5f28]">
                        {loc.timezone}
                      </p>
                      <h3
                        className={`mt-1 text-xl font-light tracking-tight transition-colors md:text-2xl ${
                          active ? "text-[#ff5f28]" : "text-white group-hover:text-[#ff5f28]"
                        }`}
                      >
                        {loc.country}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-white/45">{loc.city}</p>
                    </div>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-[#ff5f28] text-white"
                          : "bg-white/10 text-white/55 group-hover:bg-[#ff5f28]/20 group-hover:text-[#ff5f28]"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed text-white/55 transition-all duration-300 ${
                      active
                        ? "max-h-20 opacity-100"
                        : "max-h-0 overflow-hidden opacity-0 lg:max-h-20 lg:opacity-100"
                    }`}
                  >
                    {loc.description}
                  </p>
                </button>
              );
            })}

            <button
              type="button"
              data-location-card
              onClick={() => {
                setMode("overview");
                setOverviewKey((k) => k + 1);
              }}
              className="mt-1 text-left text-sm font-medium text-[#ff5f28] underline-offset-4 transition hover:underline"
            >
              View all locations
            </button>
          </div>

          <div data-location-map className="relative lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="h-[360px] md:h-[480px] lg:h-[520px]">
                <LocationMap
                  activeIndex={activeIndex}
                  revealedCount={revealedCount}
                  mode={mode}
                  overviewKey={overviewKey}
                  onSelect={handleSelect}
                />
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-white/35">
              Scroll to zoom · Drag to pan · Click pins to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
