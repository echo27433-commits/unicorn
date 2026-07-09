"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { locations } from "./locations";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[360px] items-center justify-center rounded-2xl bg-black md:min-h-[480px]">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#ff5f28] border-t-transparent" />
        <span className="text-sm text-white/50">Loading map…</span>
      </div>
    </div>
  ),
});

const STAGGER_MS = 250;

export default function OurLocation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [mode, setMode] = useState<"overview" | "focused">("overview");
  const [overviewKey, setOverviewKey] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHeaderVisible(true);

        if (!triggered.current) {
          triggered.current = true;
          for (let i = 0; i < locations.length; i++) {
            window.setTimeout(() => setRevealedCount(i + 1), 600 + i * STAGGER_MS);
          }
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleSelect = (index: number) => {
    setMode("focused");
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-black text-white"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#ff5f28]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            headerVisible ? "animate-fade-up opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff5f28]">
            Our Location
          </p>
          <h2 className="text-glow-white mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
            Global presence,{" "}
            <span className="text-glow-orange text-[#ff5f28]">local expertise</span>
          </h2>
          <p className="text-glow-muted mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            Explore our offices on the map — click a location or pin to fly there
            interactively.
          </p>
        </div>

        <div
          className={`mt-12 h-px w-full origin-left bg-gradient-to-r from-[#ff5f28] via-[#ff5f28]/40 to-transparent transition-transform duration-1000 md:mt-16 ${
            headerVisible ? "scale-x-100" : "scale-x-0"
          }`}
        />

        <div
          className={`mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-10 ${
            headerVisible ? "animate-fade-up opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex flex-col gap-3 lg:col-span-2">
            {locations.map((loc, index) => {
              const active = activeIndex === index;
              const revealed = index < revealedCount;

              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelect(index)}
                  className={`group w-full rounded-2xl border p-5 text-left transition-all duration-500 md:p-6 ${
                    active
                      ? "border-[#ff5f28]/50 bg-[#ff5f28]/10 shadow-[0_8px_32px_-8px_rgba(255,95,40,0.25)]"
                      : "border-white/10 bg-white/[0.03] hover:border-[#ff5f28]/30 hover:bg-[#ff5f28]/[0.05]"
                  } ${revealed ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
                  style={{ transitionDelay: revealed ? `${index * 80}ms` : "0ms" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff5f28]">
                        {loc.timezone}
                      </p>
                      <h3
                        className={`mt-1 text-xl font-bold tracking-tight transition-colors md:text-2xl ${
                          active ? "text-[#ff5f28]" : "text-white group-hover:text-[#ff5f28]"
                        }`}
                      >
                        {loc.country}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-white/50">{loc.city}</p>
                    </div>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                        active
                          ? "bg-[#ff5f28] text-white"
                          : "bg-white/10 text-white/70 group-hover:bg-[#ff5f28]/20 group-hover:text-[#ff5f28]"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed text-white/55 transition-all duration-300 ${
                      active ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0 lg:max-h-20 lg:opacity-100"
                    }`}
                  >
                    {loc.description}
                  </p>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setMode("overview");
                setOverviewKey((k) => k + 1);
              }}
              className="mt-1 text-left text-sm font-medium text-[#ff5f28] underline-offset-4 transition hover:underline"
            >
              View all locations
            </button>
          </div>

          <div className="relative lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
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
