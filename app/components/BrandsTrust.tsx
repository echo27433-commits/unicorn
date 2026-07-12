"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: "Masdar", src: "/brands/masdar_logo_dark.png" },
  { name: "Nesto", src: "/brands/nesto_logo_dark.png" },
  { name: "Salesforce", src: "/brands/salesforce_logo_dark.png" },
  { name: "Europcar", src: "/brands/europcar_logo_dark.png" },
  { name: "Dubai Trade", src: "/brands/dubai_trade_logo_dark.png" },
  { name: "Grand", src: "/brands/grand_logo_dark.png" },
  { name: "Kenz", src: "/brands/kenz_logo_dark.png" },
  { name: "Mark & Save", src: "/brands/mark_save_logo_dark.png" },
];

export default function BrandsTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const header = section.querySelectorAll("[data-brands-header]");
      const cards = section.querySelectorAll("[data-brands-card]");

      gsap.set(header, {
        autoAlpha: 0,
        y: isMobile ? 20 : 48,
        scale: isMobile ? 1 : 0.96,
      });
      gsap.set(cards, {
        autoAlpha: 0,
        y: isMobile ? 16 : 56,
        scale: isMobile ? 1 : 0.96,
        transformOrigin: "center bottom",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(header, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? 0.55 : 0.85,
        stagger: isMobile ? 0.05 : 0.1,
      }).to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: isMobile ? 0.5 : 0.75,
          stagger: isMobile ? 0.04 : 0.08,
        },
        isMobile ? "-=0.3" : "-=0.45"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="relative w-full overflow-hidden bg-black font-sans"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-96 w-[40rem] -translate-x-1/2 rounded-full bg-[#ff5f28]/[0.08] blur-3xl md:block" />

      <div className="relative mx-auto w-full max-w-[90rem] px-4 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span
            data-brands-header
            className="inline-flex items-center rounded-lg border border-[#ff5f28]/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5f28] md:text-xs"
          >
            Brands Trust Us
          </span>

          <h2
            data-brands-header
            className="mt-8 text-4xl font-light leading-[1.1] tracking-tight text-white md:mt-10 md:text-5xl lg:text-6xl xl:text-[3.75rem] xl:leading-[1.08]"
          >
            Partnering with ambitious brands to{" "}
            <span className="text-[#ff5f28]">build what&apos;s next.</span>
          </h2>

          <p
            data-brands-header
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:mt-7 md:text-base"
          >
            From energy and retail to mobility and enterprise platforms — we
            help organizations design, ship, and scale digital products that
            deliver measurable impact.
          </p>

          <Link
            data-brands-header
            href="#contact"
            className="btn btn--primary group mt-10 inline-flex items-center gap-3 md:mt-12 md:text-lg"
          >
            Work with us
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff5f28] transition-transform duration-200 group-hover:translate-x-0.5">
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
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </span>
          </Link>
        </div>

        <div
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-20 md:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              data-brands-card
              className="group flex min-h-[140px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 transition-colors duration-300 hover:border-[#ff5f28]/35 hover:bg-[#ff5f28]/[0.06] md:min-h-[180px] md:px-10 md:py-12"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={280}
                height={90}
                sizes="(max-width: 768px) 40vw, 180px"
                className="h-12 w-auto max-w-full object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 md:h-16 lg:h-[4.5rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
