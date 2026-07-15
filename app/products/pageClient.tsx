"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NewsletterCover from "../components/NewsletterCover";
import ProductsHeader from "../components/ProductsHeader";
import { setupCover } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "35%+", label: "Increase in customer retention" },
  { value: "70%+", label: "Customer queries automated" },
  { value: "55%+", label: "Reduction in support costs" },
  { value: "3X", label: "Higher campaign response rates" },
];

const modules = [
  {
    number: "01",
    eyebrow: "Reward. Retain. Repeat.",
    title: "Loyalty",
    accent: "Loyalty",
    headline: "Build loyalty that lasts",
    description:
      "Echo's Loyalty Platform uses predictive analytics to trigger personalized rewards and engagement campaigns at the exact moment a customer is most likely to churn or make a repeat purchase. Turn casual shoppers into brand advocates.",
    metric: "35%+",
    metricLabel: "Customer retention uplift",
    points: [
      "Smart rewards with AI driven point allocation",
      "Targeted retention campaigns for at risk segments",
      "Real time loyalty metrics and program ROI dashboards",
    ],
    tags: "Reward programs · Automated support · Engagement tracking",
  },
  {
    number: "02",
    eyebrow: "One inbox. Every channel.",
    title: "Omnichannel Messaging Suite",
    accent: "Omnichannel",
    headline: "Every channel, one conversation",
    description:
      "The Omnichannel Communication Suite centralizes all customer interactions across WhatsApp, SMS, email, RCS, Social, and web chat into a single unified dashboard, so your team never loses context and customers never repeat themselves.",
    metric: "3X",
    metricLabel: "Campaign response rates",
    points: [
      "Unified inbox across WhatsApp, SMS, email, RCS, Social, and web",
      "Intelligent cross channel routing to the right agent or bot",
      "Rich media campaigns optimized for mobile first audiences",
    ],
    tags: "WhatsApp & SMS · Email automation · Unified inbox · RCS · Social",
  },
  {
    number: "03",
    eyebrow: "Agentic AI that understands.",
    title: "AI Conversational Platform",
    accent: "AI",
    headline: "AI that resolves, not just replies",
    description:
      "Go beyond rule based chatbots. Echo's Agentic AI understands context, intent, and sentiment to resolve queries instantly, escalate seamlessly to humans, and continuously improve from every interaction.",
    metric: "70%+",
    metricLabel: "Queries automated",
    points: [
      "Context aware AI with sentiment and intent understanding",
      "Automated workflows that resolve repetitive tickets instantly",
      "Enterprise grade security with seamless human handoff",
    ],
    tags: "Agentic AI · Self service flows · Smart routing",
  },
];

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);
}

export default function ProductsPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const header = headerRef.current;
    const overview = overviewRef.current;
    const modulesEl = modulesRef.current;
    if (!root || !header || !overview || !modulesEl) return;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      setupCover(header, overview, null, { invalidateOnRefresh: true });
      setupCover(overview, modulesEl, null, {
        pinStart: "bottom bottom",
        invalidateOnRefresh: true,
      });

      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        const isCardStagger = group.hasAttribute("data-stagger-cards");

        gsap.set(items, {
          opacity: 0,
          y: isCardStagger ? 40 : 20,
        });

        ScrollTrigger.create({
          trigger: group,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: isCardStagger ? 0.06 : 0.08,
            });
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <ProductsHeader ref={headerRef} />

      {/* Black overview */}
      <div ref={overviewRef} className="relative z-20 bg-black">
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-28 md:px-8 md:py-28 md:pb-36 lg:px-12 lg:py-32 lg:pb-40">
          <div
            data-reveal
            className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
          >
            <h2
              data-reveal-item
              className="text-4xl font-light uppercase tracking-[0.06em] text-white md:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              Echo <span className="text-[#ff5f28]">Platform</span>
            </h2>
            <p
              data-reveal-item
              className="max-w-lg text-base leading-relaxed text-white/55 md:text-right md:text-lg lg:text-xl"
            >
              Enable organizations to create seamless customer journeys through
              automation, personalization, and real-time communication — turning
              every interaction into long-term value.
            </p>
          </div>

          <div
            data-reveal
            className="mt-16 grid items-start gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-12 xl:gap-20"
          >
            <div data-reveal-item className="relative max-w-2xl">
              <div
                className="pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 md:-inset-x-12 md:-inset-y-14"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 65% at 30% 40%, rgba(255,95,40,0.1) 0%, rgba(255,95,40,0.04) 45%, transparent 75%)",
                }}
                aria-hidden
              />
              <div className="relative z-[1]">
                <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:text-sm">
                  <span aria-hidden>✦</span>
                  Product
                </p>
                <Image
                  src="/The_Echo_Logo_v2 (2).webp"
                  alt="ECHO — powered by unicorn"
                  width={720}
                  height={200}
                  sizes="(max-width: 768px) 80vw, 420px"
                  className="h-28 w-auto object-contain object-left md:h-36 lg:h-44"
                />
                <h3 className="mt-8 text-4xl font-light leading-[1.08] tracking-tight text-white md:mt-10 md:text-5xl lg:text-6xl xl:text-[3.75rem] xl:leading-[1.06]">
                  AI conversations. Stronger loyalty.{" "}
                  <span className="text-[#ff5f28]">Real impact.</span>
                </h3>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55 md:mt-6 md:text-lg lg:text-xl">
                  Three connected pillars — loyalty, omnichannel messaging, and
                  agentic AI — in one ecosystem built for enterprise customer
                  engagement.
                </p>
                <Link
                  href="/contact"
                  className="btn btn--primary group mt-8 !hidden items-center gap-3 lg:mt-10 lg:!inline-flex md:text-lg"
                >
                  Talk about Echo
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff5f28] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
                        d="M7 17L17 7M17 7H9M17 7V15"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            <div data-reveal-item className="relative scale-105 lg:scale-110 lg:translate-x-2">
              <Image
                src="/image_1.webp"
                alt="ECHO platform preview"
                width={1600}
                height={1200}
                className="h-auto w-full min-h-[300px] object-contain md:min-h-[440px] lg:min-h-[540px]"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>

            <div data-reveal-item className="lg:!hidden">
              <Link
                href="/contact"
                className="btn btn--primary group inline-flex w-full items-center justify-center gap-3"
              >
                Talk about Echo
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff5f28] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
                      d="M7 17L17 7M17 7H9M17 7V15"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div
            data-reveal
            data-stagger-cards
            className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4 lg:gap-5"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-reveal-item
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 sm:px-6 sm:py-7"
              >
                <p className="text-3xl font-light tracking-tight text-[#ff5f28] sm:text-4xl md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/55 sm:mt-3 sm:text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* White modules */}
      <div
        ref={modulesRef}
        id="modules"
        className="relative z-30 overflow-hidden bg-white"
      >
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-28 md:px-8 md:py-28 md:pb-36 lg:px-12 lg:py-32 lg:pb-40">
          <div
            data-reveal
            className="flex flex-col gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
          >
            <div data-reveal-item>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:text-sm">
                Platform Modules
              </p>
              <h2 className="text-4xl font-light uppercase tracking-[0.06em] text-black md:text-5xl lg:text-6xl xl:text-[4rem]">
                Three pillars.{" "}
                <span className="text-[#ff5f28]">One platform.</span>
              </h2>
            </div>
            <p
              data-reveal-item
              className="max-w-lg text-base leading-relaxed text-black/55 md:text-right md:text-lg lg:text-xl"
            >
              Loyalty, omnichannel messaging, and conversational AI — connected
              so every customer interaction compounds.
            </p>
          </div>

          <div data-reveal data-stagger-cards className="mt-14 space-y-6 md:mt-20 md:space-y-8">
            {modules.map((mod) => (
              <article
                key={mod.number}
                data-reveal-item
                className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#fafafa]"
              >
                <div className="grid gap-8 p-7 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12 md:p-10 lg:gap-16 lg:p-12">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium tabular-nums text-[#ff5f28] md:text-base">
                        {mod.number}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40 md:text-sm">
                        {mod.eyebrow}
                      </p>
                    </div>
                    <h3 className="mt-5 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                      {mod.title.startsWith(mod.accent) ? (
                        <>
                          <span className="text-[#ff5f28]">{mod.accent}</span>
                          {mod.title.slice(mod.accent.length)}
                        </>
                      ) : (
                        mod.title
                      )}
                    </h3>
                    <p className="mt-3 text-xl font-light text-black/80 md:text-2xl">
                      {mod.headline}
                    </p>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-black/55 md:mt-6 md:text-lg">
                      {mod.description}
                    </p>
                    <p className="mt-6 text-xs uppercase tracking-[0.16em] text-black/40 md:text-sm">
                      {mod.tags}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center border-t border-black/10 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-14">
                    <div className="flex items-end gap-3">
                      <span className="text-5xl font-light tracking-tight text-black md:text-6xl lg:text-7xl">
                        {mod.metric}
                      </span>
                      <span className="mb-2 max-w-[10rem] text-sm leading-snug text-black/45 md:mb-3 md:text-base">
                        {mod.metricLabel}
                      </span>
                    </div>
                    <ul className="mt-8 space-y-3">
                      {mod.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                            aria-hidden
                          />
                          <span className="text-base leading-relaxed text-black/70 md:text-lg">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex w-fit items-center rounded-full bg-[#ff5f28] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#ff7342] md:mt-10"
                    >
                      Explore {mod.accent}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </section>
      </div>

      <NewsletterCover />
    </div>
  );
}
