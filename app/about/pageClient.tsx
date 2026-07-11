"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Button from "../components/Button";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

type WhyItem = {
  title: string;
  description: string;
};

const whyUnicorn: WhyItem[] = [
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
    description: "Every solution is designed with intelligence, automation, and scalability in mind.",
  },
  {
    title: "Outcome Driven",
    description: "Focused on measurable business results, not technology for its own sake.",
  },
];

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-white/75">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f28]" />
      {children}
    </p>
  );
}

function AccentRule() {
  return <div className="h-px w-full bg-gradient-to-r from-[#ff5f28]/60 via-[#ff5f28]/15 to-transparent" />;
}

export default function AboutPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const revealGroups = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      revealGroups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.set(items, { opacity: 0, y: 18, filter: "blur(6px)" });

        ScrollTrigger.create({
          trigger: group,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
        });
      });

      const floatOrbs = gsap.utils.toArray<HTMLElement>("[data-orb]");
      floatOrbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -18 : 14,
          duration: 4.8 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <Navbar />

      <main className="relative">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            data-orb
            className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#ff5f28]/[0.12] blur-3xl"
          />
          <div
            data-orb
            className="absolute -right-32 top-14 h-96 w-96 rounded-full bg-[#ff5f28]/[0.10] blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(255,95,40,0.08),transparent_60%)]" />
        </div>

        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-16 pt-[8.25rem] md:px-8 md:pb-24 md:pt-40">
          <div data-reveal className="max-w-3xl">
            <div data-reveal-item>
              <SectionLabel>ABOUT US</SectionLabel>
            </div>

            <h1
              data-reveal-item
              className="text-glow-white mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Building the Future of{" "}
              <span className="text-gradient-accent">Enterprise Growth</span>
            </h1>

            <p data-reveal-item className="text-glow-muted mt-6 text-base leading-relaxed text-white/70 md:text-lg">
              Unicorn is a global AI and technology transformation company helping organizations create meaningful
              customer experiences, unlock operational intelligence, and accelerate digital growth.
            </p>

            <p data-reveal-item className="text-glow-muted mt-4 text-base leading-relaxed text-white/65 md:text-lg">
              We combine world class technology partnerships, AI innovation, and deep regional expertise to deliver
              measurable business outcomes.
            </p>

            <div data-reveal-item className="mt-10 flex flex-wrap gap-4">
              <Button href="/#contact" variant="primary">
                Book a Call
              </Button>
              <Button href="/#services" variant="secondary">
                View Our Services
              </Button>
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <div data-reveal className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div
              data-reveal-item
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md md:p-10"
            >
              <p className="text-xs font-semibold tracking-[0.22em] text-white/55">MISSION</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Empower organizations with intelligent technologies
              </h2>
              <AccentRule />
              <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                To empower organizations with intelligent technologies that drive growth, efficiency, and customer
                loyalty.
              </p>
            </div>

            <div
              data-reveal-item
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md md:p-10"
            >
              <p className="text-xs font-semibold tracking-[0.22em] text-white/55">VISION</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Become the leading AI-powered growth partner
              </h2>
              <AccentRule />
              <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                To become the leading AI powered growth and transformation partner across the globe.
              </p>
            </div>
          </div>
        </section>

        {/* Why Unicorn */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <div data-reveal className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div data-reveal-item>
                <SectionLabel>WHY UNICORN</SectionLabel>
              </div>
              <h2 data-reveal-item className="text-glow-white mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Built for enterprise teams that need speed, clarity, and outcomes
              </h2>
              <p data-reveal-item className="text-glow-muted mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                Our approach blends strategic thinking, AI-led execution, and regional insight—so leadership teams can
                move faster with less risk.
              </p>
            </div>

            <div className="grid gap-4">
              {whyUnicorn.map((item) => (
                <div
                  key={item.title}
                  data-reveal-item
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-[#ff5f28]/40 hover:bg-[#ff5f28]/[0.06]"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-xl border border-[#ff5f28]/30 bg-[#ff5f28]/10" />
                    <div>
                      <p className="text-lg font-bold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-base">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operating principles (extra section) */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(70%_90%_at_15%_10%,rgba(255,95,40,0.16),transparent_55%),radial-gradient(70%_90%_at_85%_90%,rgba(255,95,40,0.10),transparent_55%)] p-8 backdrop-blur-md md:p-12"
          >
            <div className="max-w-3xl">
              <div data-reveal-item>
                <SectionLabel>HOW WE WORK</SectionLabel>
              </div>
              <h2 data-reveal-item className="text-glow-white mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                A transformation partner, not just a vendor
              </h2>
              <p data-reveal-item className="text-glow-muted mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                We align stakeholders early, identify the quickest path to measurable impact, and ship in clear phases.
                Every delivery includes instrumentation so leadership can see outcomes—not just output.
              </p>

              <div data-reveal-item className="mt-10 flex flex-wrap gap-4">
                <Button href="/#contact" variant="primary">
                  Start a Project
                </Button>
                <Button href="/" variant="secondary">
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

