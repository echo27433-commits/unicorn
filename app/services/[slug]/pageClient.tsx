"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import NewsletterCover from "../../components/NewsletterCover";
import PageHeaderBackdrop from "../../components/PageHeaderBackdrop";
import type { Service } from "../../lib/services";
import { services } from "../../lib/services";
import { setupCover } from "../../lib/motion";

gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const accentIndex = service.title.lastIndexOf(service.accent);
  const titleBefore = accentIndex > 0 ? service.title.slice(0, accentIndex) : "";
  const titleAfter =
    accentIndex >= 0
      ? service.title.slice(accentIndex + service.accent.length)
      : "";

  const related = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  useEffect(() => {
    const root = rootRef.current;
    const header = headerRef.current;
    const detail = detailRef.current;
    if (!root || !header || !detail) return;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      setupCover(header, detail, null, { invalidateOnRefresh: true });

      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.set(items, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: group,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.07,
            });
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 250);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      ctx.revert();
    };
  }, [reducedMotion, service.slug]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <Navbar />

      <header
        ref={headerRef}
        className="relative z-0 flex min-h-[70svh] w-full max-w-[100%] flex-col overflow-x-clip overflow-y-hidden bg-black md:min-h-[85vh] md:will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <PageHeaderBackdrop />

        <div className="relative z-10 flex flex-1 flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          <section className="relative flex flex-col px-4 pb-8 pt-32 sm:pb-12 sm:pt-36 md:flex-1 md:px-8 md:pb-20 md:pt-44 lg:px-12 lg:pt-48">
            <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-start md:flex-1 md:justify-center">
              <div className="relative max-w-4xl lg:max-w-5xl">
                <div
                  className="pointer-events-none absolute -inset-x-4 -inset-y-6 z-0 sm:-inset-x-8 sm:-inset-y-10 md:-inset-x-12 md:-inset-y-14"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 65% at 30% 40%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 45%, transparent 75%)",
                  }}
                  aria-hidden
                />

                <div className="relative z-[1] text-left">
                  <p className="mb-5 flex items-center justify-start gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#ff5f28] sm:mb-4 sm:tracking-[0.18em] md:mb-6 md:text-sm">
                    <span aria-hidden>✦</span>
                    Service · {service.category}
                  </p>

                  <h1 className="text-[3.25rem] font-light leading-[1.06] tracking-tight text-white sm:text-5xl sm:leading-[1.04] md:text-7xl lg:text-8xl xl:text-[6rem] xl:leading-[1.01]">
                    {titleBefore}
                    <span className="text-gradient-future">{service.accent}</span>
                    {titleAfter}
                  </h1>

                  <p className="mt-6 max-w-[34rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]">
                    {service.description}
                  </p>

                  <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-4 md:mt-12 md:gap-5">
                    <Button
                      href="/contact"
                      variant="primary"
                      className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto sm:px-[1.85rem] sm:py-[0.95rem] sm:text-base md:text-lg"
                    >
                      Talk about this service
                    </Button>
                    <Button
                      href="/services"
                      variant="secondary"
                      className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto sm:px-[1.85rem] sm:py-[0.95rem] sm:text-base md:text-lg"
                    >
                      All Services
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>

      <div ref={detailRef} className="relative z-30 overflow-hidden bg-white">
        <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-16 md:px-8 md:py-28 md:pb-20 lg:px-12 lg:py-32">
          {/* Overview */}
          <div
            data-reveal
            className="grid items-start gap-12 border-b border-black/10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pb-20"
          >
            <div
              data-reveal-item
              className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-black/10 md:rounded-3xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div data-reveal-item className="flex flex-col justify-center">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-light tracking-tight text-black md:text-6xl lg:text-7xl">
                  {service.stat}
                </span>
                <span className="mb-2 text-sm text-black/45 md:mb-3 md:text-base">
                  {service.statLabel}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-light tracking-tight text-black md:mt-8 md:text-4xl lg:text-5xl">
                Overview
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-black/55 md:mt-6 md:text-lg">
                {service.overview}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-black/45 md:text-lg">
                {service.detail}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {service.industries.map((industry) => (
                  <span
                    key={industry}
                    className="border border-black/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-black/55"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Who it's for + Capabilities */}
          <div
            data-reveal
            className="mt-16 grid gap-10 border-b border-black/10 pb-16 md:mt-20 md:grid-cols-2 md:gap-14 md:pb-20"
          >
            <div data-reveal-item>
              <h3 className="text-2xl font-light tracking-tight text-black md:text-3xl">
                Who it&apos;s for
              </h3>
              <ul className="mt-6 space-y-3">
                {service.whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-black/70 md:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal-item>
              <h3 className="text-2xl font-light tracking-tight text-black md:text-3xl">
                Capabilities
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-black/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Outcomes + Deliverables */}
          <div
            data-reveal
            className="mt-16 grid gap-10 border-b border-black/10 pb-16 md:mt-20 md:grid-cols-2 md:gap-14 md:pb-20"
          >
            <div data-reveal-item>
              <h3 className="text-2xl font-light tracking-tight text-black md:text-3xl">
                Outcomes
              </h3>
              <ul className="mt-6 space-y-3">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-black/70 md:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal-item>
              <h3 className="text-2xl font-light tracking-tight text-black md:text-3xl">
                Deliverables
              </h3>
              <ul className="mt-6 space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-black/70 md:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use cases + gallery */}
          <div data-reveal className="mt-16 border-b border-black/10 pb-16 md:mt-20 md:pb-20">
            <h3
              data-reveal-item
              className="text-2xl font-light tracking-tight text-black md:text-3xl lg:text-4xl"
            >
              Use cases
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
              {service.useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  data-reveal-item
                  className="border-t border-black/15 pt-6"
                >
                  <h4 className="text-xl font-light tracking-tight text-black md:text-2xl">
                    {useCase.title}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-black/55">
                    {useCase.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6">
              {service.gallery.map((src, i) => (
                <div
                  key={src}
                  data-reveal-item
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10"
                >
                  <Image
                    src={src}
                    alt={`${service.title} — visual ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div data-reveal className="mt-16 md:mt-20">
            <h3
              data-reveal-item
              className="text-2xl font-light tracking-tight text-black md:text-3xl lg:text-4xl"
            >
              How we deliver
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  data-reveal-item
                  className="rounded-2xl border border-black/10 bg-[#fafafa] px-6 py-8"
                >
                  <p className="text-sm font-medium tabular-nums text-[#ff5f28]">
                    {step.step}
                  </p>
                  <h4 className="mt-3 text-xl font-light tracking-tight text-black md:text-2xl">
                    {step.title}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-black/55">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div data-reveal className="mt-16 border-t border-black/10 pt-16 md:mt-20 md:pt-20">
            <h3
              data-reveal-item
              className="text-2xl font-light tracking-tight text-black md:text-3xl"
            >
              Common questions
            </h3>
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
              {service.faqs.map((faq) => (
                <div key={faq.q} data-reveal-item>
                  <h4 className="text-lg font-medium tracking-tight text-black md:text-xl">
                    {faq.q}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-black/55">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related with images */}
          {related.length > 0 ? (
            <div data-reveal className="mt-20 border-t border-black/10 pt-16 md:mt-28 md:pt-20">
              <h3
                data-reveal-item
                className="text-2xl font-light tracking-tight text-black md:text-3xl"
              >
                Related in {service.category}
              </h3>
              <div className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    data-reveal-item
                    href={`/services/${item.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-black/10 transition hover:border-[#ff5f28]/40"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-black/5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </div>
                    <div className="bg-[#fafafa] px-5 py-5 md:px-6 md:py-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                        {item.category}
                      </p>
                      <p className="mt-2 text-xl font-light tracking-tight text-black transition-colors group-hover:text-[#ff5f28] md:text-2xl">
                        {item.title}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/50">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* CTA */}
          <div
            data-reveal
            className="mt-20 flex flex-col items-start gap-6 border-t border-black/10 pt-16 md:mt-28 md:flex-row md:items-center md:justify-between md:pt-20"
          >
            <div data-reveal-item className="max-w-xl">
              <h3 className="text-2xl font-light tracking-tight text-black md:text-3xl lg:text-4xl">
                Ready to apply {service.title}?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/55 md:text-lg">
                Tell us about your environment and goals — we&apos;ll map a practical path from pilot to scale.
              </p>
            </div>
            <div data-reveal-item>
              <Button href="/contact" variant="primary" className="px-6 py-3 text-base md:text-lg">
                Start a conversation
              </Button>
            </div>
          </div>
        </section>
      </div>

      <NewsletterCover />
    </div>
  );
}
