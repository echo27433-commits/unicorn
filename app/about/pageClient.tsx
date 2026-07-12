"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutHeader from "../components/AboutHeader";
import NewsletterCover from "../components/NewsletterCover";

gsap.registerPlugin(ScrollTrigger);

const whyUnicorn = [
  {
    title: "Regional Expertise",
    description:
      "Deep understanding of GCC markets and customer behavior — so solutions fit how people actually buy and engage.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
      </svg>
    ),
  },
  {
    title: "Enterprise Focus",
    description:
      "Built for medium and large organizations that need security, scale, and clear governance from day one.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "AI First",
    description:
      "Every solution is designed with intelligence, automation, and scalability built in — not bolted on later.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2M19 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Outcome Driven",
    description:
      "Focused on measurable business results — so leadership sees impact, not technology for its own sake.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M4 19h16M8 16l3.5-5 3 3.5L18 8" />
      </svg>
    ),
  },
];

const principles = [
  {
    title: "Align early",
    description:
      "Stakeholders, goals, and success metrics locked before we build.",
  },
  {
    title: "Ship in phases",
    description: "Clear milestones with value delivered at every stage.",
  },
  {
    title: "Measure outcomes",
    description:
      "Instrumentation so leadership sees impact — not just output.",
  },
];

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We deliver AI-powered platforms and digital growth solutions — including conversational AI, loyalty systems, computer vision, performance marketing, and enterprise transformation across the GCC and beyond.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work with ambitious brands across retail, energy, mobility, and enterprise platforms — helping teams design, ship, and scale intelligent products with measurable outcomes.",
  },
  {
    question: "How do you approach AI projects?",
    answer:
      "We start by aligning stakeholders and success metrics, then ship in clear phases. Every delivery includes instrumentation so leadership can see impact — not just output.",
  },
  {
    question: "How are engagements typically structured?",
    answer:
      "Engagements are scoped around outcomes and delivered in phased milestones. We tailor the approach to your goals, timeline, and internal capabilities.",
  },
  {
    question: "Can we review work before it goes live?",
    answer:
      "Yes. We build in review checkpoints at every phase so your team can validate direction, content, and delivery before launch.",
  },
  {
    question: "Is there a minimum engagement period?",
    answer:
      "It depends on the scope. Some projects are short discovery or pilot sprints; larger transformations run in multi-phase partnerships. We’ll recommend the right fit after an initial conversation.",
  },
];

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);
}

function setupCover(
  pinned: HTMLElement,
  cover: HTMLElement,
  pinnedInner?: HTMLElement | null
) {
  const scrubTarget = pinnedInner ?? pinned;

  ScrollTrigger.create({
    trigger: pinned,
    start: "top top",
    endTrigger: cover,
    end: "top top",
    pin: true,
    pinSpacing: false,
    anticipatePin: 1,
    fastScrollEnd: true,
  });

  gsap.fromTo(
    scrubTarget,
    { scale: 1, ...(pinnedInner ? {} : { opacity: 1 }) },
    {
      scale: 0.96,
      ...(pinnedInner ? {} : { opacity: 0.55 }),
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: cover,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        fastScrollEnd: true,
      },
    }
  );

  gsap.fromTo(
    cover,
    {
      borderRadius: "28px 28px 0px 0px",
      boxShadow: "0 -8px 24px rgba(0,0,0,0)",
    },
    {
      borderRadius: "0px 0px 0px 0px",
      boxShadow: "0 -20px 48px rgba(0,0,0,0.35)",
      ease: "none",
      scrollTrigger: {
        trigger: cover,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        fastScrollEnd: true,
      },
    }
  );
}

export default function AboutPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const missionInnerRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(1);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const header = headerRef.current;
    const mission = missionRef.current;
    const missionInner = missionInnerRef.current;
    const why = whyRef.current;
    const how = howRef.current;
    if (!root || !header || !mission || !why || !how) return;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      setupCover(header, mission);
      setupCover(mission, why, missionInner);

      gsap.fromTo(
        how,
        {
          borderRadius: "28px 28px 0px 0px",
          boxShadow: "0 -8px 24px rgba(0,0,0,0)",
        },
        {
          borderRadius: "0px 0px 0px 0px",
          boxShadow: "0 -20px 48px rgba(0,0,0,0.35)",
          ease: "none",
          scrollTrigger: {
            trigger: how,
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
            fastScrollEnd: true,
          },
        }
      );

      /* —— Section reveals (transform + opacity only) —— */
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!items.length) return;

        const isCardStagger = group.hasAttribute("data-stagger-cards");

        gsap.set(items, {
          opacity: 0,
          y: isCardStagger ? 32 : 16,
          force3D: true,
        });

        ScrollTrigger.create({
          trigger: group,
          start: "top 85%",
          once: true,
          fastScrollEnd: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: isCardStagger ? 0.55 : 0.6,
              ease: "power2.out",
              stagger: isCardStagger ? 0.1 : 0.06,
              overwrite: "auto",
            });
          },
        });
      });

      /* —— Why Unicorn timeline —— */
      const timelineTrack = root.querySelector<HTMLElement>(
        "[data-timeline-track]"
      );
      const timelineProgress = timelineTrack?.querySelector<HTMLElement>(
        "[data-timeline-progress]"
      );
      const timelineTip = timelineTrack?.querySelector<HTMLElement>(
        "[data-timeline-tip]"
      );
      const timelineCards =
        gsap.utils.toArray<HTMLElement>("[data-timeline-card]");

      type CardState = {
        card: HTMLElement;
        num: HTMLElement | null;
        dot: HTMLElement | null;
        lit: boolean;
        threshold: number;
      };

      const timelineCardState: CardState[] = timelineCards.map((card) => {
        const side = card.getAttribute("data-side");
        const num = card.querySelector<HTMLElement>("[data-timeline-num]");
        const dot = card.querySelector<HTMLElement>("[data-timeline-dot]");
        const fromX = side === "right" ? 48 : -48;

        gsap.set(card, { opacity: 0, x: fromX, y: 24, force3D: true });
        if (num) {
          gsap.set(num, {
            color: "rgba(255,255,255,0.04)",
            scale: 0.94,
            transformOrigin: "100% 0%",
          });
        }
        if (dot) {
          gsap.set(dot, { backgroundColor: "#000000", scale: 0.75 });
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          fastScrollEnd: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });

        return { card, num, dot, lit: false, threshold: 0 };
      });

      const measureThresholds = () => {
        if (!timelineTrack) return;
        const trackTop = timelineTrack.getBoundingClientRect().top;
        const trackHeight = timelineTrack.offsetHeight || 1;

        timelineCardState.forEach((state) => {
          if (!state.dot) {
            state.threshold = 1;
            return;
          }
          const dotRect = state.dot.getBoundingClientRect();
          const dotY = dotRect.top + dotRect.height / 2 - trackTop;
          state.threshold = Math.min(1, Math.max(0, dotY / trackHeight));
        });
      };

      const syncTimelineGlow = (progress: number) => {
        timelineCardState.forEach((state) => {
          const shouldLit = progress >= state.threshold - 0.01;
          if (shouldLit === state.lit) return;
          state.lit = shouldLit;

          if (state.num) {
            gsap.to(state.num, {
              color: shouldLit ? "#ff5f28" : "rgba(255,255,255,0.04)",
              scale: shouldLit ? 1 : 0.94,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (state.dot) {
            gsap.to(state.dot, {
              backgroundColor: shouldLit ? "#ff5f28" : "#000000",
              scale: shouldLit ? 1 : 0.75,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      if (timelineTrack && timelineProgress) {
        measureThresholds();
        gsap.set(timelineProgress, {
          scaleY: 0,
          transformOrigin: "top center",
          force3D: true,
        });

        const glowTl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineTrack,
            start: "top 75%",
            end: "bottom 35%",
            scrub: 0.35,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              measureThresholds();
              syncTimelineGlow(self.progress);
            },
            onUpdate: (self) => syncTimelineGlow(self.progress),
          },
        });

        glowTl.fromTo(
          timelineProgress,
          { scaleY: 0 },
          { scaleY: 1, ease: "none" },
          0
        );

        if (timelineTip) {
          glowTl.fromTo(
            timelineTip,
            { top: "0%", yPercent: -50 },
            { top: "100%", yPercent: -50, ease: "none" },
            0
          );
        }
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 200);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <AboutHeader ref={headerRef} />

      {/* White — Mission / Vision */}
      <div
        ref={missionRef}
        className="relative z-20 overflow-hidden bg-white"
      >
        <div ref={missionInnerRef} className="origin-center">
          <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
            <div
              data-reveal
              className="flex flex-col gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
            >
              <h2
                data-reveal-item
                className="text-4xl font-light uppercase tracking-[0.06em] text-black md:text-5xl lg:text-6xl xl:text-[4rem]"
              >
                Mission &amp;{" "}
                <span className="text-[#ff5f28]">Vision</span>
              </h2>
              <p
                data-reveal-item
                className="max-w-lg text-base leading-relaxed text-black/55 md:text-right md:text-lg lg:text-xl"
              >
                We combine world-class technology partnerships, AI innovation,
                and deep regional expertise to deliver measurable business
                outcomes.
              </p>
            </div>

            <div
              data-reveal
              className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-12 xl:gap-20"
            >
              <div data-reveal-item className="relative">
                <div
                  className="pointer-events-none absolute -inset-x-6 -inset-y-8 z-0 md:-inset-x-10"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(0,0,0,0.04) 0%, rgba(255,95,40,0.03) 45%, transparent 75%)",
                  }}
                  aria-hidden
                />
                <div className="relative z-[1]">
                  <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:text-sm">
                    <span aria-hidden>✦</span>
                    Mission
                  </p>
                  <h3 className="text-3xl font-light leading-[1.1] tracking-tight text-black md:text-4xl lg:text-5xl">
                    Empower organizations with{" "}
                    <span className="text-[#ff5f28]">intelligent</span>{" "}
                    technologies
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-black/55 md:mt-5 md:text-lg">
                    To empower organizations with intelligent technologies that
                    drive growth, efficiency, and customer loyalty.
                  </p>
                  <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#ff5f28] to-transparent md:mt-8" />
                </div>
              </div>

              <div data-reveal-item className="relative">
                <div
                  className="pointer-events-none absolute -inset-x-6 -inset-y-8 z-0 md:-inset-x-10"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(0,0,0,0.04) 0%, rgba(255,95,40,0.03) 45%, transparent 75%)",
                  }}
                  aria-hidden
                />
                <div className="relative z-[1]">
                  <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:text-sm">
                    <span aria-hidden>✦</span>
                    Vision
                  </p>
                  <h3 className="text-3xl font-light leading-[1.1] tracking-tight text-black md:text-4xl lg:text-5xl">
                    Become the leading{" "}
                    <span className="text-[#ff5f28]">AI-powered</span> growth
                    partner
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-black/55 md:mt-5 md:text-lg">
                    To become the leading AI powered growth and transformation
                    partner across the globe.
                  </p>
                  <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#ff5f28] to-transparent md:mt-8" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Black — Why Unicorn */}
      <div ref={whyRef} className="relative z-30 bg-black">
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-28 md:px-8 md:py-28 md:pb-36 lg:px-12 lg:py-32 lg:pb-40">
            <div
              className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#ff5f28]/[0.06]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-12 bottom-12 h-56 w-56 rounded-full bg-[#ff5f28]/[0.04]"
              aria-hidden
            />

            <div
              data-reveal
              className="relative flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
            >
              <h2
                data-reveal-item
                className="text-4xl font-light uppercase tracking-[0.06em] text-white md:text-5xl lg:text-6xl xl:text-[4rem]"
              >
                Why{" "}
                <span className="text-[#ff5f28]">Unicorn</span>
              </h2>
              <p
                data-reveal-item
                className="max-w-lg text-base leading-relaxed text-white/55 md:text-right md:text-lg lg:text-xl"
              >
                Our approach blends strategic thinking, AI-led execution, and
                regional insight — so leadership teams can move faster with less
                risk.
              </p>
            </div>

            <div data-reveal className="relative mt-12 md:mt-14">
              <h3
                data-reveal-item
                className="max-w-4xl text-3xl font-light leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl"
              >
                Built for teams that need speed, clarity &amp;{" "}
                <span className="text-[#ff5f28]">outcomes</span>
              </h3>
            </div>

            <div data-timeline-track className="relative mt-14 md:mt-20">
              {/* Base track */}
              <div
                className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-white/15 md:left-1/2 md:-translate-x-1/2"
                aria-hidden
              />
              <div
                data-timeline-progress
                className="pointer-events-none absolute left-4 top-0 z-[1] h-full w-[2px] -translate-x-1/2 md:left-1/2"
                style={{
                  background:
                    "linear-gradient(to bottom, #ff5f28 0%, #ff8f5c 55%, #ff5f28 100%)",
                  boxShadow: "0 0 10px 1px rgba(255,95,40,0.45)",
                }}
                aria-hidden
              />
              <div
                data-timeline-tip
                className="pointer-events-none absolute left-4 z-[2] h-16 w-10 -translate-x-1/2 md:left-1/2 md:w-12"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,95,40,0.55) 0%, rgba(255,95,40,0.15) 45%, transparent 72%)",
                }}
                aria-hidden
              />

              <div className="flex flex-col gap-10 md:gap-16 lg:gap-20">
                {whyUnicorn.map((item, index) => {
                  const step = String(index + 1).padStart(2, "0");
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={item.title}
                      data-timeline-card
                      data-side={isLeft ? "left" : "right"}
                      className={`relative flex pl-12 md:pl-0 ${
                        isLeft ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      <span
                        data-timeline-dot
                        className="absolute left-4 top-8 z-[1] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#ff5f28] bg-black md:left-1/2 md:top-10"
                        aria-hidden
                      />

                      <article
                        className={`group relative w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-7 transition-colors duration-200 hover:border-[#ff5f28]/45 hover:bg-white/[0.05] md:w-[calc(50%-2.5rem)] md:p-9 lg:w-[calc(50%-3.5rem)] ${
                          isLeft ? "md:mr-auto" : "md:ml-auto"
                        }`}
                      >
                        <span
                          data-timeline-num
                          className="pointer-events-none absolute right-4 top-4 select-none text-[6rem] font-medium leading-none md:right-6 md:top-5 md:text-[7rem]"
                          aria-hidden
                        >
                          {step}
                        </span>

                        <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full border border-[#ff5f28]/30 bg-[#ff5f28]/10 text-[#ff5f28]">
                          {item.icon}
                        </div>

                        <div className="relative z-[1] mt-8">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5f28]">
                            {step}
                          </p>
                          <h4 className="mt-2 text-2xl font-light tracking-tight text-white md:text-3xl">
                            {item.title}
                          </h4>
                          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
      </div>

      {/* White — How we work */}
      <div ref={howRef} className="relative z-40 overflow-hidden bg-white">
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
          <div
            data-reveal
            className="relative flex flex-col gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
          >
            <h2
              data-reveal-item
              className="text-4xl font-light uppercase tracking-[0.06em] text-black md:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              How we{" "}
              <span className="text-[#ff5f28]">work</span>
            </h2>
            <p
              data-reveal-item
              className="max-w-lg text-base leading-relaxed text-black/55 md:text-right md:text-lg lg:text-xl"
            >
              We align stakeholders early, identify the quickest path to
              measurable impact, and ship in clear phases.
            </p>
          </div>

          <div data-reveal className="mt-12 md:mt-14">
            <h3
              data-reveal-item
              className="text-center text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl"
            >
              Partner, not{" "}
              <span className="text-[#ff5f28]">just a vendor</span>
            </h3>
          </div>

          <div
            data-reveal
            data-stagger-cards
            className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-6"
          >
            {principles.map((item, index) => {
              const step = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={item.title}
                  data-reveal-item
                  className="flex min-h-[300px] flex-col overflow-hidden rounded-[1.25rem] border border-black/10 bg-white md:min-h-[340px]"
                >
                  <div className="relative flex flex-1 flex-col overflow-hidden px-8 pb-10 pt-10 md:px-9 md:pt-12">
                    <span
                      className="pointer-events-none absolute -right-1 top-4 select-none text-[7rem] font-medium leading-none text-black/[0.05] md:text-[8rem]"
                      aria-hidden
                    >
                      {step}
                    </span>
                    <h3 className="relative z-[1] text-2xl font-light tracking-tight text-black md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="relative z-[1] mt-4 max-w-[18rem] text-base leading-relaxed text-black/55 md:text-lg">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between bg-black px-8 py-4 md:px-9 md:py-5">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90 md:text-base">
                      Step
                    </span>
                    <span className="text-lg font-semibold tabular-nums text-[#ff5f28] md:text-xl">
                      {step}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div
            data-reveal
            id="faq"
            className="mt-20 md:mt-28"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p
                data-reveal-item
                className="mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:text-sm"
              >
                <span aria-hidden>✦</span>
                FAQs
              </p>
              <h3
                data-reveal-item
                className="text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl"
              >
                Question? Look{" "}
                <span className="text-[#ff5f28]">here</span>
              </h3>
            </div>

            <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] lg:gap-8 xl:gap-10">
              <div data-reveal-item className="flex flex-col gap-3">
                {faqs.map((faq, index) => {
                  const open = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className={`overflow-hidden rounded-2xl transition-colors duration-200 ${
                        open
                          ? "bg-black text-white"
                          : "bg-[#efefef] text-black"
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() =>
                          setOpenFaq(open ? -1 : index)
                        }
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                      >
                        <span className="text-base font-light tracking-tight md:text-lg">
                          {faq.question}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center text-2xl leading-none ${
                            open ? "text-white" : "text-black/50"
                          }`}
                          aria-hidden
                        >
                          {open ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`px-5 pb-5 text-sm leading-relaxed md:px-6 md:pb-6 md:text-base ${
                              open ? "text-white/70" : "text-black/55"
                            }`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div data-reveal-item className="flex flex-col gap-4">
                <div className="flex flex-1 flex-col items-center rounded-[1.5rem] border border-black/10 bg-transparent px-7 py-10 text-center md:rounded-[1.75rem] md:px-8 md:py-12">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#ff5f28]/30 bg-[#ff5f28]/10 text-[#ff5f28]">
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <p className="mt-7 text-2xl font-light tracking-tight text-black md:text-3xl">
                    You have different questions?
                  </p>
                  <p className="mt-4 max-w-sm text-base leading-relaxed text-black/55 md:text-lg">
                    Our team will answer all your questions. We ensure a quick
                    response.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-9 inline-flex items-center rounded-full bg-[#ff5f28] px-9 py-4 text-base font-medium text-white transition hover:bg-[#ff7342] md:px-10 md:py-5 md:text-lg"
                  >
                    Contact us
                  </Link>
                </div>

                <div className="flex items-center gap-4 rounded-[1.5rem] bg-[#efefef] px-5 py-5 md:rounded-[1.75rem] md:px-6 md:py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff5f28] text-white">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-black/45">Your growth. Our mission.</p>
                    <p className="mt-0.5 text-base font-light tracking-tight text-black md:text-lg">
                      24/7 Service
                    </p>
                    <a
                      href="tel:+971585686912"
                      className="mt-0.5 block text-sm text-black/50 transition hover:text-[#ff5f28]"
                    >
                      +97 158 5686912
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NewsletterCover />
    </div>
  );
}