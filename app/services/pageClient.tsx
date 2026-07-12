"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

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

const serviceGroups = [
  {
    title: "AI & Data Intelligence",
    accent: "Intelligence",
    description:
      "Models, vision, and analytics that turn raw data into decisions you can act on.",
    items: [
      "Computer Vision",
      "AI Analytics",
      "Predictive Insights",
      "Dashboarding",
      "Business Intelligence",
    ],
  },
  {
    title: "Digital Growth",
    accent: "Growth",
    description:
      "Channels, content, and conversion systems that turn attention into pipeline.",
    items: [
      "SEO",
      "Performance Marketing",
      "Social Media Strategy",
      "AI Content Creation",
      "Conversion Optimization",
    ],
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
    { scale: 1 },
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

export default function ServicesPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const productInnerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

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
      setupCover(product, services, productInner);
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

      {/* White — Product Echo */}
      <div
        ref={productRef}
        id="echo"
        className="relative z-20 overflow-hidden bg-white will-change-transform"
      >
        <div
          ref={productInnerRef}
          className="origin-center will-change-transform"
        >
          <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
            <div
              data-reveal
              className="flex flex-col gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
            >
              <h2
                data-reveal-item
                className="text-4xl font-light uppercase tracking-[0.06em] text-black md:text-5xl lg:text-6xl xl:text-[4rem]"
              >
                Products &amp;{" "}
                <span className="text-[#ff5f28]">Services</span>
              </h2>
              <p
                data-reveal-item
                className="max-w-lg text-base leading-relaxed text-black/55 md:text-right md:text-lg lg:text-xl"
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
                      "radial-gradient(ellipse 70% 65% at 30% 40%, rgba(0,0,0,0.05) 0%, rgba(255,95,40,0.04) 45%, transparent 75%)",
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
                    width={640}
                    height={180}
                    sizes="(max-width: 768px) 70vw, 280px"
                    className="h-20 w-auto object-contain object-left md:h-28 lg:h-32"
                  />

                  <h3 className="mt-8 text-3xl font-light leading-[1.1] tracking-tight text-black md:mt-10 md:text-4xl lg:text-5xl">
                    AI Powered Customer{" "}
                    <span className="text-[#ff5f28]">Engagement</span> Platform
                  </h3>

                  <p className="mt-5 max-w-md text-base leading-relaxed text-black/55 md:mt-6 md:text-lg">
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

              <div data-reveal-item className="relative">
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f7]">
                  <Image
                    src="/image_1.png"
                    alt="ECHO platform preview"
                    width={1400}
                    height={1050}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
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
                    className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                      aria-hidden
                    />
                    <span className="text-base font-light tracking-tight text-black md:text-lg">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Black — Services */}
      <div
        ref={servicesRef}
        className="relative z-30 overflow-hidden bg-black will-change-transform"
      >
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-28 md:px-8 md:py-28 md:pb-36 lg:px-12 lg:py-32 lg:pb-40">
          <div
            data-reveal
            className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14"
          >
            <h2
              data-reveal-item
              className="text-4xl font-light uppercase tracking-[0.06em] text-white md:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              Our{" "}
              <span className="text-[#ff5f28]">Services</span>
            </h2>
            <p
              data-reveal-item
              className="max-w-lg text-base leading-relaxed text-white/55 md:text-right md:text-lg lg:text-xl"
            >
              End-to-end capabilities that turn data into decisions and digital
              presence into measurable growth.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
            {serviceGroups.map((group) => {
              const titleParts = group.title.split(group.accent);

              return (
                <div key={group.title} data-reveal>
                  <div data-reveal-item>
                    <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:text-sm">
                      <span aria-hidden>✦</span>
                      Service
                    </p>
                    <h3 className="text-3xl font-light leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl">
                      {titleParts[0]}
                      <span className="text-[#ff5f28]">{group.accent}</span>
                      {titleParts[1] ?? ""}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55 md:mt-5 md:text-lg">
                      {group.description}
                    </p>
                    <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#ff5f28] to-transparent md:mt-8" />
                  </div>

                  <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        data-reveal-item
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 transition-colors hover:border-[#ff5f28]/40 hover:bg-white/[0.05] md:px-6 md:py-6"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ff5f28]/30 bg-[#ff5f28]/10 text-[#ff5f28]">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14M13 6l6 6-6 6"
                            />
                          </svg>
                        </span>
                        <span className="text-lg font-light tracking-tight text-white md:text-xl">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div
            data-reveal
            className="mt-20 flex flex-col items-start gap-6 border-t border-white/10 pt-12 md:mt-28 md:flex-row md:items-center md:justify-between md:pt-14"
          >
            <div data-reveal-item className="max-w-xl">
              <h3 className="text-3xl font-light tracking-tight text-white md:text-4xl">
                Ready to map the path to{" "}
                <span className="text-[#ff5f28]">measurable impact?</span>
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/55 md:text-lg">
                Tell us about your goals — we&apos;ll help you choose the right
                product and service mix.
              </p>
            </div>
            <Link
              data-reveal-item
              href="/contact"
              className="inline-flex items-center rounded-full bg-[#ff5f28] px-8 py-4 text-base font-medium text-white transition hover:bg-[#ff7342] md:px-10 md:py-5 md:text-lg"
            >
              Start a Project
            </Link>
          </div>
        </section>
      </div>

      <NewsletterCover />
    </div>
  );
}
