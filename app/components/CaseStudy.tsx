"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { isMobileMotion, prefersReducedMotion, scrubValue } from "../lib/motion";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    slug: "nesto-hypermarkets",
    category: "Retail",
    title: "Nesto Hypermarkets",
    accent: "Hypermarkets",
    description:
      "28% increase in repeat shoppers — personalized WhatsApp journeys that turned low engagement into measurable loyalty.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=75",
    imageAlt: "Modern supermarket aisle with product shelves",
    logo: "/brands/nesto_logo_dark.png",
    logoAlt: "Nesto",
  },
  {
    slug: "masdar",
    category: "Energy & Sustainability",
    title: "Masdar",
    accent: "Masdar",
    description:
      "45% increase in registrations — live event engagement that replaced fragmented communication with real-time participation.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=75",
    imageAlt: "Solar panels under a clear sky",
    logo: "/brands/masdar_logo_dark.png",
    logoAlt: "Masdar",
  },
  {
    slug: "mark-and-save",
    category: "Retail · AI Vision",
    title: "Mark and Save",
    accent: "Save",
    description:
      "AI Vision for shelf intelligence, shopper analytics, and store operations — turning cameras into real-time retail visibility.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=75",
    imageAlt: "Hypermarket aisle with product shelves monitored for stock visibility",
    logo: "/brands/mark_save_logo_dark.png",
    logoAlt: "Mark & Save",
  },
];

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const slides = gsap.utils.toArray<HTMLElement>("[data-case-slide]", section);
    const images = gsap.utils.toArray<HTMLElement>("[data-case-image]", section);
    const progressItems = gsap.utils.toArray<HTMLElement>(
      "[data-case-progress]",
      section
    );

    if (slides.length < 2) return;

    const mobile = isMobileMotion();
    const reduced = prefersReducedMotion();

    // Always lock non-active slides — prevents stacked text before/without animation.
    gsap.set(slides, { autoAlpha: 0, y: 0, zIndex: 0, pointerEvents: "none" });
    gsap.set(slides[0], { autoAlpha: 1, zIndex: 2, pointerEvents: "auto" });
    gsap.set(images, { autoAlpha: 0, zIndex: 0 });
    gsap.set(images[0], { autoAlpha: 1, zIndex: 2 });
    gsap.set(progressItems, { opacity: 0.28, scaleX: 0.7 });
    gsap.set(progressItems[0], { opacity: 1, scaleX: 1 });

    if (reduced) {
      return () => {
        gsap.set(slides, { clearProps: "all" });
        gsap.set(images, { clearProps: "all" });
      };
    }

    const scrub = scrubValue(0.85);
    const exitY = mobile ? -40 : () => -window.innerHeight * 0.4;
    const enterY = mobile ? 40 : () => window.innerHeight * 0.4;

    const ctx = gsap.context(() => {
      const cover = document.querySelector<HTMLElement>("[data-reviews-cover]");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          ...(cover
            ? {
                endTrigger: cover,
                end: "top top",
                pinSpacing: false,
              }
            : {
                end: () =>
                  `+=${window.innerHeight * slides.length * (mobile ? 1.15 : 1.8)}`,
              }),
          pin: pin,
          scrub,
          anticipatePin: mobile ? 0 : 1,
          invalidateOnRefresh: true,
          refreshPriority: 0,
        },
      });

      slides.forEach((_, index) => {
        if (index === slides.length - 1) return;

        const currentSlide = slides[index];
        const nextSlide = slides[index + 1];
        const currentImage = images[index];
        const nextImage = images[index + 1];
        const currentProgress = progressItems[index];
        const nextProgress = progressItems[index + 1];

        const hold = mobile ? 0.85 : 1.15;
        const move = mobile ? 0.7 : 1.1;

        // Exit fully, then enter — never show two copy blocks at once.
        tl.to({}, { duration: hold })
          .to(currentSlide, {
            autoAlpha: 0,
            y: exitY,
            duration: move * 0.55,
            force3D: true,
          })
          .set(currentSlide, { zIndex: 0, pointerEvents: "none" })
          .set(currentImage, { autoAlpha: 0, zIndex: 0 })
          .set(nextImage, { autoAlpha: 1, zIndex: 2 })
          .set(nextSlide, { zIndex: 2, pointerEvents: "auto" })
          .fromTo(
            nextSlide,
            { autoAlpha: 0, y: enterY },
            {
              autoAlpha: 1,
              y: 0,
              duration: move,
              force3D: true,
            }
          );

        if (currentProgress && nextProgress) {
          tl.to(
            currentProgress,
            { opacity: 0.28, scaleX: 0.7, duration: mobile ? 0.3 : 0.45 },
            "<"
          ).to(
            nextProgress,
            { opacity: 1, scaleX: 1, duration: mobile ? 0.3 : 0.45 },
            "<"
          );
        }
      });

      tl.to({}, { duration: cover ? (mobile ? 1.2 : 2.2) : 1.0 });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timeout = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timeout);
      ctx.revert();
      gsap.set(slides, { autoAlpha: 0, clearProps: "transform" });
      gsap.set(slides[0], { autoAlpha: 1 });
      gsap.set(images, { autoAlpha: 0 });
      gsap.set(images[0], { autoAlpha: 1 });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-study"
      data-case-study
      className="relative z-30 w-full bg-black font-sans"
    >
      <div
        ref={pinRef}
        data-case-inner
        className="relative z-0 flex min-h-[100svh] w-full origin-center items-center overflow-hidden md:will-change-transform"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 85% 45%, rgba(255,95,40,0.12) 0%, transparent 65%), radial-gradient(ellipse 35% 40% at 10% 85%, rgba(255,95,40,0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-6 px-4 py-20 sm:gap-8 sm:py-24 md:gap-14 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20 lg:px-12">
          {/* Text — clipped so inactive slides never peek */}
          <div className="relative order-2 isolate h-[22rem] overflow-hidden sm:h-[24rem] md:h-[30rem] lg:order-1 lg:h-[36rem]">
            {caseStudies.map((study, index) => {
              const titleParts = study.title.split(study.accent);

              return (
                <div
                  key={study.slug}
                  data-case-slide
                  className={`absolute inset-0 flex flex-col justify-center ${
                    index === 0
                      ? "pointer-events-auto z-[2] opacity-100"
                      : "pointer-events-none invisible z-0 opacity-0"
                  }`}
                  aria-hidden={index !== 0}
                >
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] sm:mb-4 sm:text-sm md:mb-7 md:text-base">
                    <span aria-hidden>✦</span>
                    Case Study · {study.category}
                  </p>

                  <h2 className="text-glow-white text-[2.35rem] font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] xl:leading-[1.02]">
                    {titleParts[0]}
                    <span className="text-gradient-future">{study.accent}</span>
                    {titleParts[1] ?? ""}
                  </h2>

                  <p className="mt-4 max-w-[34rem] text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base md:mt-8 md:text-xl">
                    {study.description}
                  </p>

                  <div className="relative z-10 mt-6 pointer-events-auto sm:mt-8 md:mt-12">
                    <Button
                      href={`/work/${study.slug}`}
                      variant="primary"
                      className="!px-4 !py-2.5 !text-sm md:!px-[1.85rem] md:!py-[0.95rem] md:!text-lg"
                    >
                      View case study
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side image box */}
          <div className="relative order-1 w-full lg:order-2">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(255,95,40,0.2),transparent_70%)] blur-2xl md:-inset-10"
              aria-hidden
            />
            <div className="relative mx-auto aspect-[4/3] w-full max-h-[38svh] overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:max-h-none md:rounded-[1.75rem] lg:aspect-[5/4] lg:min-h-[28rem] xl:min-h-[34rem]">
              {caseStudies.map((study, index) => (
                <div
                  key={study.slug}
                  data-case-image
                  className={`absolute inset-0 ${
                    index === 0
                      ? "z-[2] opacity-100"
                      : "invisible z-0 opacity-0"
                  }`}
                  aria-hidden={index !== 0}
                >
                  <Image
                    src={study.image}
                    alt={study.imageAlt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 92vw, 48vw"
                    quality={75}
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-4 pt-12 md:px-7 md:pb-7 md:pt-20">
                    <div className="inline-flex items-center rounded-xl border border-white/20 bg-black/70 px-4 py-3 backdrop-blur-md md:rounded-2xl md:px-7 md:py-5">
                      <Image
                        src={study.logo}
                        alt={study.logoAlt}
                        width={360}
                        height={120}
                        className="h-8 w-auto max-w-[min(100%,12rem)] object-contain md:h-16 lg:h-[4.5rem] lg:max-w-[20rem]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 pb-6 md:gap-2.5 md:px-8 md:pb-12 lg:px-12">
            {caseStudies.map((study) => (
              <span
                key={study.slug}
                data-case-progress
                className="h-1.5 w-7 origin-left rounded-full bg-white md:w-8"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
