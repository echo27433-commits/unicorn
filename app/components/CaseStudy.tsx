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
    category: "Retail",
    title: "Nesto Hypermarket & MNS",
    accent: "MNS",
    description:
      "A connected retail experience that unifies in-store operations, customer journeys, and real-time insights across hypermarket environments.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=70",
    imageAlt: "Modern supermarket aisle with product shelves",
    logo: "/brands/mark_save_logo_dark.png",
    logoAlt: "Märk & Save",
  },
  {
    category: "Energy & Sustainability",
    title: "Masdar Clean Energy",
    accent: "Energy",
    description:
      "Digital platforms and intelligent systems that accelerate sustainable energy initiatives and operational excellence at scale.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=70",
    imageAlt: "Solar panels under a clear sky",
    logo: "/brands/masdar_logo_dark.png",
    logoAlt: "Masdar",
  },
  {
    category: "Retail",
    title: "MNS Computer Vision",
    accent: "Vision",
    description:
      "AI-powered computer vision that transforms shelf intelligence, shopper analytics, and store operations into measurable growth.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=70",
    imageAlt: "Robotics and computer vision technology",
    logo: "/brands/salesforce_logo_dark.png",
    logoAlt: "Salesforce",
  },
];

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    if (prefersReducedMotion()) return;

    const mobile = isMobileMotion();
    const scrub = scrubValue(0.85);

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-case-slide]");
      const images = gsap.utils.toArray<HTMLElement>("[data-case-image]");
      const progressItems = gsap.utils.toArray<HTMLElement>("[data-case-progress]");

      if (slides.length < 2) return;

      // Mobile: opacity-only crossfades (no full-viewport y / image scale).
      if (mobile) {
        gsap.set(slides, { autoAlpha: 0 });
        gsap.set(slides[0], { autoAlpha: 1 });
        gsap.set(images, { autoAlpha: 0 });
        gsap.set(images[0], { autoAlpha: 1 });
      } else {
        gsap.set(slides, { autoAlpha: 0, y: () => window.innerHeight });
        gsap.set(slides[0], { autoAlpha: 1, y: 0 });
        gsap.set(images, { autoAlpha: 0, scale: 1.08 });
        gsap.set(images[0], { autoAlpha: 1, scale: 1 });
      }
      gsap.set(progressItems, { opacity: 0.28, scaleX: 0.7 });
      gsap.set(progressItems[0], { opacity: 1, scaleX: 1 });

      // Keep this section's own pin. Location cover is endTrigger only —
      // a spacer in page.tsx gives scroll room so slides finish before Location covers.
      const cover = document.querySelector<HTMLElement>("[data-location-cover]");

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
                end: () => `+=${window.innerHeight * slides.length * (mobile ? 1.2 : 1.75)}`,
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

        if (mobile) {
          tl.to({}, { duration: 0.85 })
            .to(currentSlide, { autoAlpha: 0, duration: 0.9 }, "<")
            .to(nextSlide, { autoAlpha: 1, duration: 0.9 }, "<")
            .to(currentImage, { autoAlpha: 0, duration: 0.9 }, "<")
            .to(nextImage, { autoAlpha: 1, duration: 0.9 }, "<");
        } else {
          tl.to({}, { duration: 1.1 })
            .to(
              currentSlide,
              {
                autoAlpha: 0,
                y: () => -window.innerHeight,
                duration: 1.45,
              },
              "<"
            )
            .fromTo(
              nextSlide,
              { autoAlpha: 0, y: () => window.innerHeight },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1.45,
              },
              "<"
            )
            .to(
              currentImage,
              {
                autoAlpha: 0,
                scale: 1.08,
                duration: 1.45,
              },
              "<"
            )
            .fromTo(
              nextImage,
              { autoAlpha: 0, scale: 1.06 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1.45,
              },
              "<"
            );
        }

        if (currentProgress && nextProgress) {
          tl.to(
            currentProgress,
            { opacity: 0.28, scaleX: 0.7, duration: mobile ? 0.4 : 0.55 },
            "<"
          ).to(
            nextProgress,
            { opacity: 1, scaleX: 1, duration: mobile ? 0.4 : 0.55 },
            "<"
          );
        }
      });

      // Hold MNS Computer Vision while Our Location slides over
      tl.to({}, { duration: cover ? (mobile ? 1.4 : 2.2) : 1.0 });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timeout = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className="relative w-full bg-black font-sans"
    >
      <div
        ref={pinRef}
        className="relative z-0 h-[100vh] min-h-[640px] w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          {caseStudies.map((study, index) => (
            <div
              key={study.image}
              data-case-image
              className="absolute inset-0 md:will-change-transform"
            >
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, 100vw"
                quality={70}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.18) 48%, transparent 68%)",
          }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-10">
          {caseStudies.map((study) => {
            const titleParts = study.title.split(study.accent);

            return (
              <div
                key={study.title}
                data-case-slide
                className="absolute inset-0 flex items-end md:will-change-transform"
              >
                <div className="mx-auto w-full max-w-7xl px-4 pb-28 pt-28 md:px-8 md:pb-32 md:pt-32 lg:px-12 lg:pb-36">
                  <div className="pointer-events-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                    <div className="max-w-xl lg:max-w-2xl">
                      <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:mb-6 md:text-sm">
                        <span aria-hidden>✦</span>
                        Case Study · {study.category}
                      </p>

                      <h2 className="text-glow-white text-5xl font-light leading-[1.06] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-[4.75rem] xl:leading-[1.02]">
                        {titleParts[0]}
                        <span className="text-gradient-future">{study.accent}</span>
                        {titleParts[1] ?? ""}
                      </h2>

                      <p className="mt-6 max-w-[30.5rem] text-base leading-relaxed text-white/80 md:mt-7 md:text-lg">
                        {study.description}
                      </p>

                      <div className="mt-10 md:mt-12">
                        <Button href="#contact" variant="primary" className="md:text-lg">
                          Learn more
                        </Button>
                      </div>
                    </div>

                    <div className="shrink-0 lg:pb-2">
                      <div className="inline-flex items-center rounded-2xl border border-white/15 bg-black/80 px-6 py-5 md:bg-black/55 md:px-8 md:py-6 md:backdrop-blur-md">
                        <Image
                          src={study.logo}
                          alt={study.logoAlt}
                          width={360}
                          height={120}
                          className="h-16 w-auto max-w-[min(100%,20rem)] object-contain md:h-20 lg:h-24"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-2.5 px-4 pb-10 md:px-8 md:pb-12 lg:px-12">
            {caseStudies.map((study) => (
              <span
                key={study.title}
                data-case-progress
                className="h-1.5 w-8 origin-left rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
