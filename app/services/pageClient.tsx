"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NewsletterCover from "../components/NewsletterCover";
import ServicesHeader from "../components/ServicesHeader";

gsap.registerPlugin(ScrollTrigger);

const echoFeatures = [
  "Loyalty Management",
  "Customer Rewards",
  "Omnichannel Communication",
  "WhatsApp Business Integration",
  "Conversational AI",
  "Marketing Automation",
  "Customer Segmentation",
  "Campaign Analytics",
];

const serviceImages = [
  "/blogs/b1.webp",
  "/blogs/b2.webp",
  "/blogs/b3.jpg",
  "/blogs/b4.jpg",
  "/blogs/b5.jpg",
  "/blogs/b6.jpg",
  "/servies/soe.jpg",
  "/image_1.png",
  "/case.png",
  "/review1.jpg",
];

const services = [
  {
    category: "AI & Data Intelligence",
    title: "Computer Vision",
    accent: "Vision",
    description:
      "See what matters in real time — shelf intelligence, shopper analytics, and operational visibility powered by visual AI.",
    stat: "01",
    statLabel: "/capability",
    image: serviceImages[0],
  },
  {
    category: "AI & Data Intelligence",
    title: "AI Analytics",
    accent: "Analytics",
    description:
      "Turn raw signals into clear decisions with models that surface patterns, anomalies, and opportunities leadership can act on.",
    stat: "02",
    statLabel: "/capability",
    image: serviceImages[1],
  },
  {
    category: "AI & Data Intelligence",
    title: "Predictive Insights",
    accent: "Insights",
    description:
      "Anticipate demand, churn, and performance before they happen — so teams plan with confidence, not hindsight.",
    stat: "03",
    statLabel: "/capability",
    image: serviceImages[2],
  },
  {
    category: "AI & Data Intelligence",
    title: "Dashboarding",
    accent: "Dashboarding",
    description:
      "Executive-ready views that put the right metrics in front of the right people — live, clear, and decision-ready.",
    stat: "04",
    statLabel: "/capability",
    image: serviceImages[3],
  },
  {
    category: "AI & Data Intelligence",
    title: "Business Intelligence",
    accent: "Intelligence",
    description:
      "Connect data across systems into a single source of truth that drives strategy, reporting, and measurable outcomes.",
    stat: "05",
    statLabel: "/capability",
    image: serviceImages[4],
  },
  {
    category: "Digital Growth",
    title: "SEO",
    accent: "SEO",
    description:
      "Technical foundations, content strategy, and authority building that compound organic visibility over time.",
    stat: "01",
    statLabel: "/capability",
    image: serviceImages[5],
  },
  {
    category: "Digital Growth",
    title: "Performance Marketing",
    accent: "Marketing",
    description:
      "Paid channels engineered for efficiency — creative tests, bidding systems, and attribution that prove ROI.",
    stat: "02",
    statLabel: "/capability",
    image: serviceImages[6],
  },
  {
    category: "Digital Growth",
    title: "Social Media Strategy",
    accent: "Strategy",
    description:
      "Platform-native narratives and community systems that turn attention into trust, pipeline, and brand equity.",
    stat: "03",
    statLabel: "/capability",
    image: serviceImages[7],
  },
  {
    category: "Digital Growth",
    title: "AI Content Creation",
    accent: "Creation",
    description:
      "Human-led, AI-accelerated content engines that scale quality output without losing brand voice.",
    stat: "04",
    statLabel: "/capability",
    image: serviceImages[8],
  },
  {
    category: "Digital Growth",
    title: "Conversion Optimization",
    accent: "Optimization",
    description:
      "Test, learn, and lift — UX, messaging, and funnel experiments that turn more visitors into customers.",
    stat: "05",
    statLabel: "/capability",
    image: serviceImages[9],
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
  pinnedInner?: HTMLElement | null,
  options?: { pinStart?: string }
) {
  const scrubTarget = pinnedInner ?? pinned;

  ScrollTrigger.create({
    trigger: pinned,
    start: options?.pinStart ?? "top top",
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

export default function ServicesPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const productInnerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeService, setActiveService] = useState<number | null>(0);

  useEffect(() => {
    const header = headerRef.current;
    const product = productRef.current;
    const productInner = productInnerRef.current;
    const services = servicesRef.current;
    if (!header || !product || !services) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      setupCover(header, product);
      // Pin after product has scrolled through, then Our Services overlays it
      setupCover(product, services, productInner, {
        pinStart: "bottom bottom",
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 250);
    const t2 = window.setTimeout(refresh, 700);
    const t3 = window.setTimeout(refresh, 1400);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    // Accordion height changes — give the grid transition time, then refresh once.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 520);
    return () => window.clearTimeout(t);
  }, [activeService]);

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
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <ServicesHeader ref={headerRef} />

      {/* Black — Product Echo */}
      <div
        ref={productRef}
        id="echo"
        className="relative z-20 bg-black"
      >
        <div ref={productInnerRef} className="origin-center">
          <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-28 md:px-8 md:py-28 md:pb-36 lg:px-12 lg:py-32 lg:pb-40">
            <div
              data-reveal
              className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
            >
              <h2
                data-reveal-item
                className="text-4xl font-light uppercase tracking-[0.06em] text-white md:text-5xl lg:text-6xl xl:text-[4rem]"
              >
                Products &amp;{" "}
                <span className="text-[#ff5f28]">Services</span>
              </h2>
              <p
                data-reveal-item
                className="max-w-lg text-base leading-relaxed text-white/55 md:text-right md:text-lg lg:text-xl"
              >
                We build intelligent platforms that help brands converse,
                convert, and grow — from AI assistants to enterprise engagement
                systems.
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
                    src="/The_Echo_Logo_v2 (2).png"
                    alt="ECHO — powered by unicorn"
                    width={720}
                    height={200}
                    sizes="(max-width: 768px) 80vw, 420px"
                    className="h-28 w-auto object-contain object-left md:h-36 lg:h-44"
                  />

                  <h3 className="mt-8 text-4xl font-light leading-[1.08] tracking-tight text-white md:mt-10 md:text-5xl lg:text-6xl xl:text-[3.75rem] xl:leading-[1.06]">
                    AI Powered Customer{" "}
                    <span className="text-[#ff5f28]">Engagement</span> Platform
                  </h3>

                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55 md:mt-6 md:text-lg lg:text-xl">
                    Echo is our AI-powered platform for enterprise conversations,
                    loyalty, and growth — helping teams automate engagement and
                    deliver measurable outcomes at scale.
                  </p>

                  <Link
                    href="/contact"
                    className="btn btn--primary group mt-8 inline-flex items-center gap-3 md:mt-10 md:text-lg"
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
                  src="/image_1.png"
                  alt="ECHO platform preview"
                  width={1600}
                  height={1200}
                  className="h-auto w-full min-h-[300px] object-contain md:min-h-[440px] lg:min-h-[540px]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
            </div>

            <div data-reveal data-stagger-cards className="mt-16 md:mt-20">
              <p
                data-reveal-item
                className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:mb-8 md:text-sm"
              >
                Features
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {echoFeatures.map((feature) => (
                  <li
                    key={feature}
                    data-reveal-item
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                      aria-hidden
                    />
                    <span className="text-base font-light tracking-tight text-white md:text-lg">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* White — Services */}
      <div
        ref={servicesRef}
        className="relative z-30 overflow-hidden bg-white"
      >
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-28 md:px-8 md:py-28 md:pb-36 lg:px-12 lg:py-32 lg:pb-40">
          <div
            data-reveal
            className="flex flex-col gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
          >
            <h2
              data-reveal-item
              className="text-4xl font-light uppercase tracking-[0.06em] text-black md:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              Our{" "}
              <span className="text-[#ff5f28]">Services</span>
            </h2>
            <p
              data-reveal-item
              className="max-w-lg text-base leading-relaxed text-black/55 md:text-right md:text-lg lg:text-xl"
            >
              End-to-end capabilities that turn data into decisions and digital
              presence into measurable growth.
            </p>
          </div>

          <div
            data-reveal
            className="mt-10 border-t border-black/10 md:mt-14"
            onMouseLeave={() => setActiveService(null)}
          >
            {services.map((service, index) => {
              const open = activeService === index;
              const step = String(index + 1).padStart(2, "0");
              const accentIndex = service.title.lastIndexOf(service.accent);
              const titleBefore =
                accentIndex > 0 ? service.title.slice(0, accentIndex) : "";
              const titleAfter =
                accentIndex >= 0
                  ? service.title.slice(accentIndex + service.accent.length)
                  : "";

              return (
                <article
                  key={`${service.category}-${service.title}`}
                  data-reveal-item
                  className="border-b border-black/10 bg-transparent"
                  onMouseEnter={() => setActiveService(index)}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() =>
                      setActiveService(open ? null : index)
                    }
                    className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 py-7 text-left md:gap-8 md:py-9 lg:gap-12"
                  >
                    <span
                      className={`pt-1 text-sm font-medium tabular-nums transition-colors md:text-base ${
                        open ? "text-[#ff5f28]" : "text-black/35"
                      }`}
                    >
                      {step}
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40 md:text-sm">
                        {service.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-light tracking-tight text-black md:text-3xl lg:text-4xl">
                        {titleBefore}
                        <span className="text-[#ff5f28]">{service.accent}</span>
                        {titleAfter}
                      </h3>
                    </div>

                    <span
                      className={`mt-1 inline-flex shrink-0 items-center rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 md:mt-0 md:px-5 md:py-2.5 md:text-sm ${
                        open
                          ? "bg-[#ff5f28] text-white"
                          : "bg-[#efefef] text-black/80"
                      }`}
                    >
                      View Service
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-8 pb-8 pl-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:pb-10 md:pl-12 lg:gap-14 lg:pl-16">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 md:aspect-[5/4]">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className={`object-cover transition-transform duration-700 ${
                              open ? "scale-100" : "scale-105"
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="flex items-end gap-3">
                            <span className="text-5xl font-light tracking-tight text-black md:text-6xl lg:text-7xl">
                              {service.stat}
                            </span>
                            <span className="mb-2 text-sm text-black/45 md:mb-3 md:text-base">
                              {service.statLabel}
                            </span>
                          </div>

                          <p className="mt-5 max-w-xl text-base leading-relaxed text-black/55 md:mt-6 md:text-lg">
                            {service.description}
                          </p>

                          <Link
                            href="/contact"
                            className="mt-8 inline-flex w-fit items-center rounded-full bg-[#ff5f28] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#ff7342] md:mt-10"
                          >
                            Talk about this service
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <NewsletterCover />
    </div>
  );
}
