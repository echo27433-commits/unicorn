"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Button from "../../components/Button";
import PageHeroHeader from "../../components/PageHeroHeader";
import WorkGrowthChart from "../../components/WorkGrowthChart";
import type { WorkCase } from "../../lib/work";
import { workCases } from "../../lib/work";
import {
  scheduleScrollRefresh,
  setupCover,
  setupReveal,
} from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#ff5f28";
const GRID = "rgba(255,255,255,0.08)";
const TICK = "rgba(255,255,255,0.45)";

function parseMetricNumber(value: string) {
  return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
}

function MetricTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; payload?: { display?: string } }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/15 bg-black/90 px-3 py-2 text-sm text-white shadow-lg">
      <p className="text-white/50">{label}</p>
      <p className="mt-0.5 font-medium text-[#ff5f28]">
        {payload[0].payload?.display ?? payload[0].value}
      </p>
    </div>
  );
}

export default function WorkDetailClient({ study }: { study: WorkCase }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const accentIndex = study.name.lastIndexOf(study.accent);
  const titleBefore = accentIndex > 0 ? study.name.slice(0, accentIndex) : "";
  const titleAfter =
    accentIndex >= 0
      ? study.name.slice(accentIndex + study.accent.length)
      : "";

  const related = workCases.filter((c) => c.slug !== study.slug).slice(0, 2);

  const beforeAfterData = useMemo(
    () => [
      {
        name: "Before",
        value: parseMetricNumber(study.metrics.beforeValue),
        display: study.metrics.beforeValue,
      },
      {
        name: "After",
        value: parseMetricNumber(study.metrics.afterValue),
        display: study.metrics.afterValue,
      },
    ],
    [study.metrics]
  );

  const funnelData = useMemo(
    () =>
      study.funnel.stages
        .filter((stage) => !/^\d+(\.\d+)?%$/.test(stage.value.trim()))
        .map((stage, i, arr) => ({
          name: stage.label,
          value: parseMetricNumber(stage.value),
          display: stage.value,
          fill:
            i === arr.length - 1
              ? ACCENT
              : `rgba(255,95,40,${0.35 + i * 0.18})`,
        })),
    [study.funnel.stages]
  );

  useEffect(() => {
    const root = rootRef.current;
    const header = headerRef.current;
    const detail = detailRef.current;
    if (!root || !header || !detail) return;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      setupCover(header, detail, null, { invalidateOnRefresh: true });
      setupReveal({
        scope: root,
        start: "top 80%",
        y: 24,
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
      });
    }, root);

    const cancelRefresh = scheduleScrollRefresh(250);

    return () => {
      cancelRefresh();
      ctx.revert();
    };
  }, [reducedMotion, study.slug]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <PageHeroHeader
        ref={headerRef}
        eyebrow={`Case Study · ${study.industry}`}
        beforeTitle={
          <Link
            href="/work"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span> Back to Use Cases
          </Link>
        }
        afterEyebrow={
          <div className="mb-6 inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <Image
              src={study.logo}
              alt={study.logoAlt}
              width={320}
              height={96}
              className={
                study.logoClassName
                  ? `${study.logoClassName}${
                      study.logoInvert === false ? "" : " brightness-0 invert"
                    }`
                  : `h-8 w-auto max-w-[10rem] object-contain md:h-10${
                      study.logoInvert === false ? "" : " brightness-0 invert"
                    }`
              }
            />
          </div>
        }
        title={
          <>
            {titleBefore}
            <span className="text-gradient-future">{study.accent}</span>
            {titleAfter}
          </>
        }
        titleClassName="text-[2.75rem] font-light leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[1.04] md:text-6xl lg:text-7xl xl:text-[4.75rem] xl:leading-[1.02]"
        afterDescription={
          <p className="mt-6 max-w-[36rem] text-2xl font-light leading-snug text-white md:mt-8 md:text-3xl lg:text-4xl">
            {study.headline}
          </p>
        }
        description={study.summary}
        descriptionClassName="mt-5 max-w-[34rem] text-[0.875rem] leading-relaxed text-white/55 sm:text-sm md:text-[0.95rem]"
        primaryCta={{ href: "/contact", label: "Book a Call" }}
        secondaryCta={{
          href: "https://www.theecho.global/",
          label: "Explore Echo",
        }}
      />

      <div ref={detailRef} className="relative z-30 overflow-hidden bg-black">
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
          {/* Hero image */}
          <div data-reveal className="border-b border-white/10 pb-16 md:pb-20">
            <div
              data-reveal-item
              className="relative aspect-[21/9] min-h-[14rem] overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl"
            >
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Journey */}
          <div data-reveal className="mt-16 border-b border-white/10 pb-16 md:mt-20 md:pb-20">
            <p
              data-reveal-item
              className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ff5f28]"
            >
              The Journey
            </p>
            <h2
              data-reveal-item
              className="mt-4 max-w-3xl text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              From challenge to measurable impact
            </h2>
            <p
              data-reveal-item
              className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg"
            >
              How we delivered measurable impact for {study.name}.
            </p>

            <div className="mt-12 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-10">
              {[
                { step: "01", label: "Challenge", title: "What needed to change", body: study.challenge },
                { step: "02", label: "Strategy", title: "How we approached it", body: study.solution },
                {
                  step: "03",
                  label: "Results",
                  title: "What was achieved",
                  body: null as string | null,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  data-reveal-item
                  className="border-t border-white/15 pt-6"
                >
                  <p className="text-sm font-medium tabular-nums text-[#ff5f28]">
                    {item.step} · {item.label}
                  </p>
                  <h3 className="mt-3 text-xl font-light tracking-tight text-white md:text-2xl">
                    {item.title}
                  </h3>
                  {item.body ? (
                    <p className="mt-3 text-base leading-relaxed text-white/50">
                      {item.body}
                    </p>
                  ) : (
                    <ul className="mt-3 space-y-2.5">
                      {study.results.map((r) => (
                        <li key={r} className="flex items-start gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                            aria-hidden
                          />
                          <span className="text-base leading-relaxed text-white/70">
                            {r}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {study.strategy?.length ? (
              <div data-reveal-item className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:mt-14 md:p-10">
                <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                  Strategy in detail
                </h3>
                <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
                  {study.strategy.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                        aria-hidden
                      />
                      <span className="text-base leading-relaxed text-white/65">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {study.outcomeStats?.length ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-3 md:mt-12 md:gap-6">
                {study.outcomeStats.map((stat) => (
                  <div
                    key={stat.label}
                    data-reveal-item
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-7 text-center"
                  >
                    <p className="text-4xl font-light tracking-tight text-[#ff5f28] md:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Performance metrics */}
          <div data-reveal className="mt-16 md:mt-20">
            <p
              data-reveal-item
              className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ff5f28]"
            >
              Performance Metrics
            </p>
            <h2
              data-reveal-item
              className="mt-4 max-w-3xl text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              Data driven outcomes
            </h2>
            <p
              data-reveal-item
              className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg"
            >
              Real results from the campaign for {study.name}.
            </p>

            {study.campaignMetrics?.length ? (
              <div
                data-reveal-item
                className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:mt-14"
              >
                <div className="border-b border-white/10 px-6 py-5 md:px-10">
                  <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                    Campaign results
                  </h3>
                </div>
                <div className="divide-y divide-white/10">
                  {study.campaignMetrics.map((row) => (
                    <div
                      key={row.metric}
                      className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-10"
                    >
                      <p className="text-sm text-white/50 md:text-base">{row.metric}</p>
                      <p className="text-lg font-light tracking-tight text-white md:text-xl">
                        {row.result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Before / After chart */}
            <div
              data-reveal-item
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:mt-10 md:p-10"
            >
              <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                {study.metrics.title}
              </h3>
              <p className="mt-2 text-base text-white/45">{study.metrics.description}</p>

              <div className="mt-6 flex flex-wrap gap-6 md:gap-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/40">Before</p>
                  <p className="mt-1 text-2xl font-light text-white">{study.metrics.beforeValue}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff5f28]">Uplift</p>
                  <p className="mt-1 text-2xl font-light text-[#ff5f28]">{study.metrics.uplift}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/40">After</p>
                  <p className="mt-1 text-2xl font-light text-white">{study.metrics.afterValue}</p>
                </div>
              </div>

              <div className="mt-8 h-[16rem] w-full md:h-[18rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={beforeAfterData}
                    margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
                    barCategoryGap="32%"
                  >
                    <CartesianGrid stroke={GRID} vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: TICK, fontSize: 12 }}
                      axisLine={{ stroke: GRID }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: TICK, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<MetricTooltip />}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={110}>
                      {beforeAfterData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={index === 0 ? "rgba(255,255,255,0.28)" : ACCENT}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth chart */}
            <div
              data-reveal-item
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                    {study.growth.title}
                  </h3>
                  <p className="mt-2 text-base text-white/45">{study.growth.description}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-white/40">Start</p>
                    <p className="mt-1 text-2xl font-light text-white">{study.growth.start}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-white/40">Peak</p>
                    <p className="mt-1 text-2xl font-light text-white">{study.growth.peak}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#ff5f28]">Change</p>
                    <p className="mt-1 text-2xl font-light text-[#ff5f28]">{study.growth.change}</p>
                  </div>
                </div>
              </div>

              <WorkGrowthChart growth={study.growth} />
            </div>

            {/* Funnel chart */}
            <div
              data-reveal-item
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
            >
              <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                {study.funnel.title}
              </h3>
              <p className="mt-2 text-base text-white/45">{study.funnel.description}</p>

              <div className="mt-8 h-[18rem] w-full md:h-[20rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={funnelData}
                    margin={{ top: 8, right: 8, left: 0, bottom: 48 }}
                    barCategoryGap="18%"
                  >
                    <CartesianGrid stroke={GRID} vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: TICK, fontSize: 11 }}
                      axisLine={{ stroke: GRID }}
                      tickLine={false}
                      interval={0}
                      angle={-16}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tick={{ fill: TICK, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={44}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<MetricTooltip />}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={72}>
                      {funnelData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {study.funnel.stages.map((stage, i) => (
                  <div
                    key={stage.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/35">
                      Stage {i + 1}
                    </p>
                    <p className="mt-2 text-2xl font-light tracking-tight text-white">
                      {stage.value}
                    </p>
                    <p className="mt-1 text-sm text-white/60">{stage.label}</p>
                    {stage.rate ? (
                      <p className="mt-2 text-sm text-[#ff5f28]">
                        {stage.rate}{" "}
                        <span className="text-white/35">{stage.rateLabel}</span>
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* More case studies */}
          {related.length > 0 ? (
            <div data-reveal className="mt-20 border-t border-white/10 pt-16 md:mt-28 md:pt-20">
              <h3
                data-reveal-item
                className="text-2xl font-light tracking-tight text-white md:text-3xl"
              >
                More Case Studies
              </h3>
              <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    data-reveal-item
                    href={`/work/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 transition hover:border-[#ff5f28]/40"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 inline-flex rounded-lg border border-white/20 bg-black/70 px-3 py-2 backdrop-blur-md">
                        <Image
                          src={item.logo}
                          alt={item.logoAlt}
                          width={240}
                          height={80}
                          className={
                            item.logoClassName
                              ? `${item.logoClassName}${
                                  item.logoInvert === false ? "" : " brightness-0 invert"
                                }`
                              : `h-6 w-auto max-w-[8rem] object-contain${
                                  item.logoInvert === false ? "" : " brightness-0 invert"
                                }`
                          }
                        />
                      </div>
                    </div>
                    <div className="bg-white/[0.03] px-5 py-5 md:px-6 md:py-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                        {item.industry}
                      </p>
                      <p className="mt-2 text-xl font-light tracking-tight text-white transition-colors group-hover:text-[#ff5f28] md:text-2xl">
                        {item.name}
                      </p>
                      <p className="mt-2 text-sm text-white/50">{item.headline}</p>
                      <span className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.12em] text-[#ff5f28]">
                        View Case Study →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* CTA */}
          <div
            data-reveal
            className="mt-20 flex flex-col items-start gap-6 border-t border-white/10 pt-16 md:mt-28 md:flex-row md:items-center md:justify-between md:pt-20"
          >
            <div data-reveal-item className="max-w-xl">
              <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl lg:text-4xl">
                Let&apos;s build better conversations together
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/50 md:text-lg">
                Book a personalized call with our team today.
              </p>
            </div>
            <div data-reveal-item>
              <Button href="/contact" variant="primary" className="px-6 py-3 text-base md:text-lg">
                Book a Call
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
