"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { scheduleScrollRefresh } from "../lib/motion";
import { services } from "../lib/services";

/** Interactive services list — GSAP lives in PageMotionRoot on the server page. */
export default function ServicesPageClient() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <div
      data-motion-cover
      id="services"
      className="relative z-30 overflow-hidden bg-white"
    >
      <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 pb-28 md:px-8 md:py-28 md:pb-36 lg:px-12 lg:py-32 lg:pb-40">
        <div
          data-reveal
          className="grid gap-8 border-b border-black/10 pb-12 md:grid-cols-2 md:items-end md:gap-16 md:pb-14"
        >
          <h2
            data-reveal-item
            className="text-4xl font-light uppercase tracking-[0.06em] text-black md:text-5xl lg:text-6xl xl:text-[4rem]"
          >
            Our <span className="text-[#ff5f28]">Services</span>
          </h2>
          <p
            data-reveal-item
            className="max-w-lg text-left text-base leading-relaxed text-black/55 md:text-lg lg:text-xl"
          >
            End to end capabilities that turn data into decisions and digital
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
                key={service.slug}
                data-reveal-item
                className="border-b border-black/10 bg-transparent"
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 py-7 md:gap-8 md:py-9 lg:gap-12">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-label={`Preview ${service.title}`}
                    onClick={() => {
                      setActiveService(open ? null : index);
                      scheduleScrollRefresh(520);
                    }}
                    className={`pt-1 text-left text-sm font-medium tabular-nums transition-colors md:text-base ${
                      open ? "text-[#ff5f28]" : "text-black/35"
                    }`}
                  >
                    {step}
                  </button>

                  <Link href={`/services/${service.slug}`} className="min-w-0 text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40 md:text-sm">
                      {service.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-light tracking-tight text-black transition-colors hover:text-[#ff5f28] md:text-3xl lg:text-4xl">
                      {titleBefore}
                      <span className="text-[#ff5f28]">{service.accent}</span>
                      {titleAfter}
                    </h3>
                  </Link>

                  <Link
                    href={`/services/${service.slug}`}
                    className={`mt-1 inline-flex shrink-0 items-center rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 md:mt-0 md:px-5 md:py-2.5 md:text-sm ${
                      open
                        ? "bg-[#ff5f28] text-white"
                        : "bg-[#efefef] text-black/80 hover:bg-[#ff5f28] hover:text-white"
                    }`}
                  >
                    View Service
                  </Link>
                </div>

                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-8 pl-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:pb-10 md:pl-12 lg:gap-14 lg:pl-16">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 md:aspect-[5/4]">
                        {open ? (
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                          />
                        ) : null}
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
                          href={`/services/${service.slug}`}
                          className="mt-8 inline-flex w-fit items-center rounded-full bg-[#ff5f28] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#ff7342] md:mt-10"
                        >
                          Open service page
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
  );
}
