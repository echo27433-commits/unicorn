"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutHeader from "../components/AboutHeader";
import Button from "../components/Button";
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
    description: "Stakeholders, goals, and success metrics locked before we build.",
  },
  {
    title: "Ship in phases",
    description: "Clear milestones with value delivered at every stage.",
  },
  {
    title: "Measure outcomes",
    description: "Instrumentation so leadership sees impact — not just output.",
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

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <AboutHeader ref={headerRef} />

      {/* White — Mission / Vision */}
      <div
        ref={missionRef}
        className="relative z-20 overflow-hidden bg-white will-change-transform"
      >
        <div ref={missionInnerRef} className="origin-center will-change-transform">
          <section className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
            <div data-reveal className="max-w-3xl">
              <p
                data-reveal-item
                className="text-sm font-medium tracking-wide text-[#ff5f28]"
              >
                / mission & vision /
              </p>
              <h2
                data-reveal-item
                className="mt-4 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl"
              >
                What drives us{" "}
                <span className="text-[#ff5f28]">forward</span>
              </h2>
              <p
                data-reveal-item
                className="mt-5 max-w-xl text-sm leading-relaxed text-black/55 md:text-base"
              >
                We combine world-class technology partnerships, AI innovation,
                and deep regional expertise to deliver measurable business
                outcomes.
              </p>
            </div>

            <div
              data-reveal
              className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8"
            >
              <div
                data-reveal-item
                className="rounded-[1.75rem] border border-black/8 bg-black/[0.03] p-8 md:rounded-[2rem] md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff5f28]">
                  Mission
                </p>
                <h3 className="mt-4 text-2xl font-light tracking-tight text-black md:text-3xl">
                  Empower organizations with intelligent technologies
                </h3>
                <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#ff5f28] to-transparent" />
                <p className="mt-5 text-sm leading-relaxed text-black/55 md:text-base">
                  To empower organizations with intelligent technologies that
                  drive growth, efficiency, and customer loyalty.
                </p>
              </div>

              <div
                data-reveal-item
                className="rounded-[1.75rem] border border-black/8 bg-black/[0.03] p-8 md:rounded-[2rem] md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff5f28]">
                  Vision
                </p>
                <h3 className="mt-4 text-2xl font-light tracking-tight text-black md:text-3xl">
                  Become the leading AI-powered growth partner
                </h3>
                <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#ff5f28] to-transparent" />
                <p className="mt-5 text-sm leading-relaxed text-black/55 md:text-base">
                  To become the leading AI powered growth and transformation
                  partner across the globe.
                </p>
              </div>
            </div>
          </section>
        </div>
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
        <section className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
          <div data-reveal className="max-w-3xl">
            <p
              data-reveal-item
              className="text-sm font-medium tracking-wide text-[#ff5f28]"
            >
              / how we work /
            </p>
            <h2
              data-reveal-item
              className="mt-4 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl"
            >
              A transformation partner,{" "}
              <span className="text-[#ff5f28]">not just a vendor</span>
            </h2>
            <p
              data-reveal-item
              className="mt-5 max-w-xl text-sm leading-relaxed text-black/55 md:text-base"
            >
              We align stakeholders early, identify the quickest path to
              measurable impact, and ship in clear phases.
            </p>
          </div>

          <div
            data-reveal
            className="mt-14 grid gap-5 sm:grid-cols-3 md:mt-16 md:gap-6"
          >
            {principles.map((item, index) => (
              <div
                key={item.title}
                data-reveal-item
                className="rounded-[1.5rem] border border-black/8 bg-black/[0.03] p-7 md:p-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28]">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-xl font-light tracking-tight text-black md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="mt-16 overflow-hidden rounded-[1.75rem] border border-black/8 bg-[radial-gradient(70%_90%_at_15%_10%,rgba(255,95,40,0.14),transparent_55%),radial-gradient(70%_90%_at_85%_90%,rgba(255,95,40,0.08),transparent_55%)] p-8 md:mt-20 md:rounded-[2rem] md:p-12"
          >
            <div
              data-reveal-item
              className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10"
            >
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff5f28]">
                  Ready when you are
                </p>
                <h3 className="mt-3 text-2xl font-light tracking-tight text-black md:text-3xl">
                  Let&apos;s build what&apos;s next
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55 md:text-base">
                  Start a project conversation — we&apos;ll map the fastest path
                  from idea to measurable impact.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" variant="primary">
                  Start a Project
                </Button>
                <Link href="/" className="btn btn--secondary inline-flex">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <NewsletterCover />
    </div>
  );
}
