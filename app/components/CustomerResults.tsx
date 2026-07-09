"use client";

import { useEffect, useRef, useState } from "react";

import Button from "./Button";

const STAGGER_MS = 220;

const featuredStats = [
  {
    value: "350M",
    label: "Players reached through Epic Games experiences",
    client: "Epic Games",
    accent: true,
  },
  {
    value: "6x",
    label: "Deployment capacity unlocked for global rollouts",
    client: "Bacardi",
    accent: false,
  },
];

const metrics = [
  {
    value: "16x",
    label: "Faster website rollouts across 40+ markets",
    client: "Bacardi",
    tag: "Speed",
  },
  {
    value: "30%",
    label: "Increase in online quotes through digital channels",
    client: "LV= Insurance",
    tag: "Conversion",
  },
  {
    value: "55+",
    label: "Countries where we deliver for enterprise clients",
    client: "Global",
    tag: "Reach",
  },
  {
    value: "11",
    label: "Industries served with tailored digital solutions",
    client: "Cross-sector",
    tag: "Expertise",
  },
];

const clients = ["Bacardi", "Epic Games", "LV= Insurance", "Unilever", "Siemens"];

function parseStatValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseFloat(match[1]), suffix: match[2] };
}

function formatCount(number: number, suffix: string) {
  if (suffix === "M") return `${Math.round(number)}M`;
  if (suffix === "%") return `${Math.round(number)}%`;
  if (suffix === "x") return `${Math.round(number)}x`;
  if (suffix === "+") return `${Math.round(number)}+`;
  return `${Math.round(number)}${suffix}`;
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedNumber({
  value,
  active,
  delay = 0,
}: {
  value: string;
  active: boolean;
  delay?: number;
}) {
  const { number, suffix } = parseStatValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const timeout = window.setTimeout(() => {
      const duration = 1400;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(number * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [active, number, delay]);

  return (
    <span className="tabular-nums">
      {active ? formatCount(count, suffix) : `0${suffix}`}
    </span>
  );
}

function FeaturedStatCard({
  stat,
  delay,
  visible,
}: {
  stat: (typeof featuredStats)[number];
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-700 md:p-10 ${
        stat.accent
          ? "border-[#ff5f28]/30 bg-gradient-to-br from-[#ff5f28]/10 via-[#ff5f28]/5 to-transparent"
          : "border-white/10 bg-white/[0.03]"
      } ${visible ? "animate-scale-in opacity-100" : "scale-95 opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-700 ${
          stat.accent ? "bg-[#ff5f28]/20" : "bg-white/5"
        } ${visible ? "opacity-100" : "opacity-0"}`}
      />

      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
        {stat.client}
      </p>
      <p
        className={`text-glow-white mt-4 text-5xl font-bold leading-none tracking-tight md:text-6xl ${
          stat.accent ? "text-[#ff5f28]" : "text-white"
        }`}
      >
        <AnimatedNumber value={stat.value} active={visible} />
      </p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65 md:text-base">
        {stat.label}
      </p>
      <span
        className={`mt-6 block h-px w-10 transition-all duration-500 group-hover:w-16 ${
          stat.accent ? "bg-[#ff5f28]/70" : "bg-white/30"
        }`}
      />
    </div>
  );
}

function useStaggeredScrollReveal(count: number, gapMs = STAGGER_MS) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggered = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();

        for (let i = 0; i < count; i++) {
          window.setTimeout(() => setActiveIndex(i), i * gapMs);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [count, gapMs]);

  const isVisible = (index: number) => activeIndex >= index;

  return { ref, isVisible };
}

function MetricRow({
  metric,
  index,
  visible,
}: {
  metric: (typeof metrics)[number];
  index: number;
  visible: boolean;
}) {
  const rowNum = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`group relative transition-all duration-700 ${
        visible ? "animate-fade-up opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="flex flex-col gap-5 py-10 md:grid md:grid-cols-[4rem_7rem_1fr_minmax(0,18rem)] md:items-center md:gap-8 md:py-12 lg:grid-cols-[5rem_8rem_1fr_minmax(0,22rem)] lg:gap-12 lg:py-14">
        <div className="flex items-center gap-4 md:contents">
          <span
            className={`text-xs font-medium tabular-nums tracking-[0.2em] text-[#ff5f28]/50 transition-all duration-500 ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "80ms" : "0ms" }}
          >
            {rowNum}
          </span>

          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5f28] transition-all duration-500 ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "140ms" : "0ms" }}
          >
            {metric.tag}
          </p>
        </div>

        <p
          className={`text-glow-orange text-5xl font-bold leading-none tracking-tight text-[#ff5f28] transition-all duration-700 sm:text-6xl lg:text-7xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "200ms" : "0ms" }}
        >
          <AnimatedNumber value={metric.value} active={visible} delay={200} />
        </p>

        <div
          className={`transition-all duration-700 md:text-right ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "320ms" : "0ms" }}
        >
          <p className="text-sm leading-relaxed text-white/70 md:text-base lg:text-lg">
            {metric.label}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28]/70">
            {metric.client}
          </p>
        </div>
      </div>

      <div
        className={`h-px w-full origin-left bg-gradient-to-r from-[#ff5f28]/50 via-[#ff5f28]/20 to-transparent transition-transform duration-1000 ${
          visible ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transitionDelay: visible ? "400ms" : "0ms" }}
      />
    </div>
  );
}

export default function CustomerResults() {
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
      { threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const gridReveal = useReveal(0.1);
  const metricsScroll = useStaggeredScrollReveal(metrics.length);
  const ctaReveal = useReveal(0.2);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-black"
    >
      <div
        className={`pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ff5f28]/40 to-transparent transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#ff5f28]/[0.06] blur-3xl transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl transition-opacity duration-1000 delay-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div
            className={`transition-all duration-1000 ${
              visible ? "animate-fade-in-left opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff5f28]/25 bg-[#ff5f28]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#ff5f28]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5f28]" />
              Proven Impact
            </span>

            <h2 className="text-glow-white mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
              Results that{" "}
              <span className="text-glow-orange text-[#ff5f28]">move the needle</span>
            </h2>

            <p
              className={`text-glow-muted mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg ${
                visible ? "animate-fade-up opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "150ms" }}
            >
              From global beverage brands to gaming giants, we help teams ship
              faster, convert more, and scale without adding headcount. Real
              outcomes — not vanity metrics.
            </p>

            <div
              className={`mt-8 flex flex-wrap gap-3 ${visible ? "animate-fade-up opacity-100" : "opacity-0"}`}
              style={{ animationDelay: "280ms" }}
            >
              <Button href="#contact" variant="primary">
                Book a Call
              </Button>
              <Button href="#contact" variant="secondary">
                View Case Studies
              </Button>
            </div>

            <div
              className={`mt-12 border-t border-white/10 pt-8 ${visible ? "animate-fade-up opacity-100" : "opacity-0"}`}
              style={{ animationDelay: "400ms" }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                Trusted by industry leaders
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {clients.map((client, i) => (
                  <span
                    key={client}
                    className={`text-sm font-medium text-white/45 transition-colors duration-300 hover:text-white/80 ${
                      visible ? "animate-fade-up opacity-100" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${480 + i * 60}ms` }}
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 ${
              visible ? "animate-fade-in-right opacity-100" : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            {featuredStats.map((stat, index) => (
              <FeaturedStatCard
                key={stat.client}
                stat={stat}
                delay={200 + index * 150}
                visible={visible}
              />
            ))}
          </div>
        </div>

        <div ref={gridReveal.ref} className="mt-20 md:mt-28">
          <div
            className={`mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
              gridReveal.visible ? "animate-fade-up opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#ff5f28]/60">
                By the numbers
              </p>
              <h3 className="text-glow-white mt-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                Measurable outcomes across every engagement
              </h3>
            </div>
            <p className="max-w-xs text-sm text-white/45">
              Each metric reveals as you scroll down.
            </p>
          </div>

          <div
            className={`mb-2 h-px w-full bg-gradient-to-r from-[#ff5f28]/60 via-[#ff5f28]/20 to-transparent ${
              gridReveal.visible ? "animate-line-reveal" : "scale-x-0"
            }`}
          />

          <div ref={metricsScroll.ref}>
            {metrics.map((metric, index) => (
              <MetricRow
                key={metric.tag}
                metric={metric}
                index={index}
                visible={metricsScroll.isVisible(index)}
              />
            ))}
          </div>
        </div>

        <div
          ref={ctaReveal.ref}
          className={`mt-20 border-t border-[#ff5f28]/20 pt-16 md:mt-28 md:pt-20 ${
            ctaReveal.visible ? "animate-fade-up opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#ff5f28]/60">
                Next step
              </p>
              <h3 className="text-glow-white mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Ready to become our next{" "}
                <span className="text-glow-orange text-[#ff5f28]">success story?</span>
              </h3>
              <p className="text-glow-muted mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                Let&apos;s talk about what we can build together.
              </p>
            </div>
            <Button href="#contact" variant="primary" className="shrink-0 self-start md:self-end">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
