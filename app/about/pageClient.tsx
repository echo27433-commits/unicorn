"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutHeader from "../components/AboutHeader";
import NewsletterCover from "../components/NewsletterCover";

gsap.registerPlugin(ScrollTrigger);

const whyUnicorn = [
  {
    title: "Regional Expertise",
    description: "Deep understanding of the markets and customer behavior.",
  },
  {
    title: "Enterprise Focus",
    description: "Built for medium and large organizations.",
  },
  {
    title: "AI First",
    description:
      "Every solution is designed with intelligence, automation, and scalability in mind.",
  },
  {
    title: "Outcome Driven",
    description:
      "Focused on measurable business results, not technology for its own sake.",
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
  ScrollTrigger.create({
    trigger: pinned,
    start: "top top",
    endTrigger: cover,
    end: "top top",
    pin: true,
    pinSpacing: false,
    anticipatePin: 1,
  });

  gsap.fromTo(
    pinnedInner ?? pinned,
    { scale: 1, opacity: pinnedInner ? 1 : 1 },
    {
      scale: 0.94,
      ...(pinnedInner ? {} : { opacity: 0.5 }),
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
}

export default function AboutPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const missionInnerRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const whyInnerRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(1);

  useEffect(() => {
    const header = headerRef.current;
    const mission = missionRef.current;
    const missionInner = missionInnerRef.current;
    const why = whyRef.current;
    const whyInner = whyInnerRef.current;
    const how = howRef.current;
    if (!header || !mission || !why || !how) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      setupCover(header, mission);
      setupCover(mission, why, missionInner);
      setupCover(why, how, whyInner);
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 250);
    const t2 = window.setTimeout(refresh, 700);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
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
        const isCardStagger = group.hasAttribute("data-stagger-cards");

        gsap.set(items, {
          opacity: 0,
          y: isCardStagger ? 48 : 20,
          ...(isCardStagger ? { scale: 0.96 } : {}),
        });

        ScrollTrigger.create({
          trigger: group,
          start: isCardStagger ? "top 82%" : "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              ...(isCardStagger ? { scale: 1 } : {}),
              duration: isCardStagger ? 0.75 : 0.8,
              ease: "power3.out",
              stagger: isCardStagger ? 0.22 : 0.08,
            });
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <AboutHeader ref={headerRef} />

      {/* White — Mission / Vision */}
      <div
        ref={missionRef}
        className="relative z-20 overflow-hidden bg-white will-change-transform"
      >
        <div ref={missionInnerRef} className="origin-center will-change-transform">
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
          </section>        </div>
      </div>

      {/* Black — Why Unicorn */}
      <div
        ref={whyRef}
        className="relative z-30 overflow-hidden bg-black will-change-transform"
      >
        <div ref={whyInnerRef} className="origin-center will-change-transform">
          <section className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
            <div
              data-reveal
              className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20"
            >
              <div className="max-w-xl">
                <p
                  data-reveal-item
                  className="text-sm font-medium tracking-wide text-[#ff5f28]"
                >
                  / why unicorn /
                </p>
                <h2
                  data-reveal-item
                  className="mt-4 text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  Built for teams that need speed, clarity &amp;{" "}
                  <span className="text-[#ff5f28]">outcomes</span>
                </h2>
                <p
                  data-reveal-item
                  className="mt-5 text-sm leading-relaxed text-white/55 md:text-base"
                >
                  Our approach blends strategic thinking, AI-led execution, and
                  regional insight — so leadership teams can move faster with
                  less risk.
                </p>
              </div>

              <div className="grid gap-4">
                {whyUnicorn.map((item, index) => (
                  <div
                    key={item.title}
                    data-reveal-item
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#ff5f28]/40 hover:bg-[#ff5f28]/[0.06] md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ff5f28]/30 bg-[#ff5f28]/10 text-sm font-medium text-[#ff5f28]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-lg font-medium text-white md:text-xl">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-white/55 md:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* White — How we work */}
      <div
        ref={howRef}
        className="relative z-40 overflow-hidden bg-white will-change-transform"
      >
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
                  className="flex min-h-[320px] flex-col overflow-hidden rounded-[1.25rem] border border-black/10 bg-white shadow-[0_12px_40px_-24px_rgba(0,0,0,0.25)] md:min-h-[360px]"
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
                      className={`overflow-hidden rounded-2xl transition-colors duration-300 ${
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
                          <p className="px-5 pb-5 text-sm leading-relaxed text-white/70 md:px-6 md:pb-6 md:text-base">
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