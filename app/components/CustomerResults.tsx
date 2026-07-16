"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const serviceGroups = [
  {
    title: "AI & Data Intelligence",
    accent: "Intelligence",
    from: "left" as const,
    description:
      "Models, vision, and analytics that turn raw data into decisions you can act on.",
    items: [
      "AI Vision",
      "AI Analytics",
      "Predictive Insights",
      "Business Intelligence",
    ],
  },
  {
    title: "Digital Growth",
    accent: "Growth",
    from: "right" as const,
    description:
      "Channels, content, and conversion systems that turn attention into pipeline.",
    items: [
      "AI Search & Answer Visibility",
      "AI Driven Acquisition",
      "Conversational Brand Presence",
      "Generative Content Systems",
      "Predictive Conversion Intelligence",
    ],
  },
];

const SERVICE_IMAGE = "/servies/soe.webp";

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

function ServiceGroupBlock({
  group,
}: {
  group: (typeof serviceGroups)[number];
}) {
  const { ref, visible } = useReveal(0.1);
  const titleParts = group.title.split(group.accent);
  const fromLeft = group.from === "left";
  const hiddenX = fromLeft ? "-translate-x-[40%]" : "translate-x-[40%]";

  const imagePanel = (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-1000 ease-out ${
        visible ? "translate-x-0 opacity-100" : `${hiddenX} opacity-0`
      }`}
    >
      <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(255,95,40,0.16),transparent_70%)] blur-2xl" aria-hidden />
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-black/10 md:aspect-[16/10] lg:aspect-[5/4]">
        <Image
          src={SERVICE_IMAGE}
          alt={group.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </div>
    </div>
  );

  const listPanel = (
    <div className="relative flex flex-col justify-center">
      <div
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 z-0 md:-inset-x-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(0,0,0,0.04) 0%, rgba(255,95,40,0.03) 45%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="relative z-[1]">
        <div
          className={`transition-all duration-1000 ease-out ${
            visible ? "translate-x-0 opacity-100" : `${hiddenX} opacity-0`
          }`}
        >
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:text-sm">
            <span aria-hidden>✦</span>
            Service
          </p>
          <h4 className="text-3xl font-light leading-[1.1] tracking-tight text-black md:text-4xl lg:text-5xl">
            {titleParts[0]}
            <span className="text-[#ff5f28]">{group.accent}</span>
            {titleParts[1] ?? ""}
          </h4>
          <p className="mt-4 max-w-md text-base leading-relaxed text-black/55 md:mt-5 md:text-lg">
            {group.description}
          </p>
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#ff5f28] to-transparent md:mt-8" />
        </div>

        <ul className="mt-8 space-y-0 md:mt-10">
          {group.items.map((item, itemIndex) => (
            <li
              key={item}
              className={`group flex items-center gap-5 border-b border-black/10 py-4 transition-all duration-700 ease-out last:border-b-0 md:gap-6 md:py-5 ${
                visible ? "translate-x-0 opacity-100" : `${hiddenX} opacity-0`
              }`}
              style={{ transitionDelay: visible ? `${180 + itemIndex * 90}ms` : "0ms" }}
            >
              <span className="w-8 shrink-0 text-sm font-medium tabular-nums tracking-wider text-[#ff5f28]/70 md:text-base">
                {String(itemIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-light tracking-tight text-black transition-colors duration-200 group-hover:text-[#ff5f28] md:text-xl lg:text-2xl">
                {item}
              </span>
              <span className="ml-auto h-px w-0 bg-[#ff5f28]/50 transition-all duration-300 group-hover:w-10" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        {fromLeft ? (
          <>
            {imagePanel}
            {listPanel}
          </>
        ) : (
          <>
            {listPanel}
            {imagePanel}
          </>
        )}
      </div>
    </div>
  );
}

export default function CustomerResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const visualReveal = useReveal(0.15);
  const servicesReveal = useReveal(0.12);

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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden bg-white font-sans"
    >
      <div
        className={`pointer-events-none absolute -left-24 top-0 hidden h-[32rem] w-[32rem] rounded-full bg-[#ff5f28]/[0.08] blur-3xl transition-opacity duration-1000 md:block ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute -right-16 bottom-0 hidden h-[26rem] w-[26rem] rounded-full bg-[#ff5f28]/[0.06] blur-3xl transition-opacity duration-1000 delay-150 md:block ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-4 pt-6 pb-24 md:px-8 md:pt-8 md:pb-32 lg:px-12 lg:pt-10 lg:pb-40">
        <div
          className={`flex flex-col gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14 ${
            visible ? "animate-fade-up opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-light uppercase tracking-[0.06em] text-black md:text-5xl lg:text-6xl xl:text-[4rem]">
            Products
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-black/55 md:text-right md:text-lg lg:text-xl">
            We build intelligent platforms that help brands converse, convert,
            and grow, from AI assistants to enterprise engagement systems.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          <div
            className={`relative max-w-2xl transition-all duration-1000 ${
              visible ? "animate-fade-in-left opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 md:-inset-x-12 md:-inset-y-14"
              style={{
                background:
                  "radial-gradient(ellipse 70% 65% at 30% 40%, rgba(0,0,0,0.05) 0%, rgba(255,95,40,0.04) 45%, transparent 75%)",
              }}
              aria-hidden
            />

            <div className="relative z-[1]">
              <Image
                src="/The_Echo_Logo_v2 (2).webp"
                alt="ECHO powered by unicorn"
                width={640}
                height={180}
                sizes="(max-width: 768px) 70vw, 320px"
                className="h-24 w-auto object-contain object-left md:h-32 lg:h-40"
              />

              <h3 className="mt-10 text-4xl font-light leading-[1.08] tracking-tight text-black md:mt-12 md:text-5xl lg:text-6xl xl:text-[3.75rem] xl:leading-[1.06]">
                The AI Engine for{" "}
                <span className="text-[#ff5f28]">Conversations</span>,{" "}
                <span className="text-[#ff5f28]">Loyalty</span> &amp;{" "}
                <span className="text-[#ff5f28]">Growth</span>.
              </h3>

              <p className="mt-7 max-w-[30.5rem] text-base leading-relaxed text-black/55 md:mt-8 md:text-lg">
                Echo is our AI powered platform for enterprise conversations,
                loyalty, and growth, helping teams automate engagement and
                deliver measurable outcomes at scale.
              </p>
            </div>
          </div>

          <div
            ref={visualReveal.ref}
            className={`relative scale-105 transition-all duration-1000 lg:scale-110 lg:translate-x-4 ${
              visualReveal.visible
                ? "animate-fade-in-right opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,95,40,0.22),transparent_65%)] blur-2xl md:-inset-10"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/image_1.webp"
                alt="ECHO platform preview on laptop"
                width={1400}
                height={1050}
                className="relative z-[1] h-auto w-full min-h-[280px] object-contain md:min-h-[420px] lg:min-h-[520px]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            <Link
              href="https://www.theecho.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary group relative z-[1] mt-8 inline-flex items-center gap-3 md:mt-10 md:text-lg"
            >
              Visit Echo
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

        <div className="mt-24 md:mt-32 lg:mt-36">
          <div
            ref={servicesReveal.ref}
            className={`mb-12 flex flex-col gap-4 border-b border-black/10 pb-10 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12 md:pb-12 ${
              servicesReveal.visible
                ? "animate-fade-up opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h3 className="text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
              Our <span className="text-[#ff5f28]">Services</span>
            </h3>
            <p className="max-w-md text-base leading-relaxed text-black/55 md:text-right md:text-lg">
              End to end capabilities that turn data into decisions and digital
              presence into measurable growth.
            </p>
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {serviceGroups.map((group) => (
              <ServiceGroupBlock key={group.title} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
