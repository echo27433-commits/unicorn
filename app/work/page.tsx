import Image from "next/image";
import Link from "next/link";

import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import PageMotionRoot from "../components/PageMotionRoot";
import WorkHeader from "../components/WorkHeader";
import { workCases } from "../lib/work";

export const metadata = {
  title: "Work · unicorn",
  description:
    "Customer success stories, how leading brands use Echo to transform engagement, loyalty, and measurable growth.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-black">
      <WorkHeader />
      <PageMotionRoot
        reveal={{
          start: "top 82%",
          y: 28,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        }}
      >
        <div
          data-motion-cover
          id="cases"
          className="relative z-30 overflow-hidden bg-white"
        >
          <section className="relative mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
            <div data-reveal className="mb-12 md:mb-16">
              <p
                data-reveal-item
                className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ff5f28]"
              >
                Use Cases
              </p>
              <h2
                data-reveal-item
                className="mt-4 max-w-3xl text-3xl font-light tracking-tight text-black md:text-5xl lg:text-6xl"
              >
                Brands that turned conversations into growth
              </h2>
            </div>

            <div data-reveal className="grid gap-8 md:gap-10">
              {workCases.map((study, index) => {
                const accentIndex = study.name.lastIndexOf(study.accent);
                const before =
                  accentIndex > 0 ? study.name.slice(0, accentIndex) : "";
                const after =
                  accentIndex >= 0
                    ? study.name.slice(accentIndex + study.accent.length)
                    : study.name;

                return (
                  <Link
                    key={study.slug}
                    data-reveal-item
                    href={`/work/${study.slug}`}
                    className="group grid overflow-hidden rounded-2xl border border-black/10 transition hover:border-[#ff5f28]/35 md:grid-cols-2 md:rounded-3xl"
                  >
                    <div
                      className={`relative aspect-[16/11] overflow-hidden bg-black/5 md:aspect-auto md:min-h-[22rem] ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        src={study.image}
                        alt={study.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 inline-flex max-w-[calc(100%-2.5rem)] items-center rounded-xl border border-white/20 bg-black/70 px-4 py-3 backdrop-blur-md md:bottom-7 md:left-7 md:px-6 md:py-5">
                        <Image
                          src={study.logo}
                          alt={study.logoAlt}
                          width={420}
                          height={140}
                          className={
                            study.logoClassName ??
                            "h-8 w-auto max-w-[10rem] object-contain md:h-10 md:max-w-[12rem]"
                          }
                        />
                      </div>
                    </div>

                    <div
                      className={`flex flex-col justify-center bg-[#fafafa] px-6 py-8 md:px-10 md:py-12 lg:px-12 ${
                        index % 2 === 1 ? "md:order-1" : ""
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                        {study.industry}
                      </p>
                      <h3 className="mt-3 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                        {accentIndex >= 0 ? (
                          <>
                            {before}
                            <span className="text-[#ff5f28]">{study.accent}</span>
                            {after}
                          </>
                        ) : (
                          study.name
                        )}
                      </h3>
                      <p className="mt-5 text-2xl font-light tracking-tight text-black md:text-3xl">
                        {study.headline}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {study.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f28]"
                              aria-hidden
                            />
                            <span className="text-base leading-relaxed text-black/60">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#ff5f28] transition-transform group-hover:translate-x-1">
                        View Full Case Study
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </PageMotionRoot>
      <DeferredNewsletterCover />
    </div>
  );
}
