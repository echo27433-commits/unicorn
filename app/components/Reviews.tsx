"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const featured = {
  quote:
    "Unicorn transformed how we engage attendees and stakeholders. Clarity, speed, and results that moved the needle across our events and digital programs.",
  name: "Masdar",
  role: "Energy & Sustainability",
  image:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
  logo: "/brands/masdar_logo_dark.png",
};

const reviews = [
  {
    quote:
      "From strategy to execution, the partnership felt seamless. We shipped faster and saw measurable lift in engagement and loyalty within the first quarter.",
    name: "Nesto",
    role: "Enterprise Retail",
    logo: "/brands/nesto_logo_dark.png",
  },
  {
    quote:
      "A rare mix of creative thinking and technical depth. Digital platforms and intelligent systems that scale with how we serve customers every day.",
    name: "Europcar",
    role: "Mobility",
    logo: "/brands/europcar_logo_dark.png",
  },
  {
    quote:
      "AI Vision gave us real time shelf and floor visibility we could act on. Professional, proactive, and built for hypermarket operations at scale.",
    name: "Mark & Save",
    role: "Value Retail · AI Vision",
    logo: "/brands/mark_save_logo_dark.png",
  },
  {
    quote:
      "Sharp creative and digital execution that matched how we show up for customers. A partner that understands brand, product, and pace.",
    name: "BenQ",
    role: "Consumer Electronics",
    logo: "/brands/benq_logo_dark.png",
  },
];

type Review = (typeof reviews)[number];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-[#ff5f28] sm:h-5 sm:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function CompanyLogo({
  src,
  name,
  fullWidth = false,
}: {
  src: string;
  name: string;
  light?: boolean;
  fullWidth?: boolean;
}) {
  const isMarkAndSave = name === "Mark & Save";
  const isBenQ = name === "BenQ";
  const skipInvert = isBenQ;

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-white/15 bg-black ${
        fullWidth
          ? "h-14 w-full px-3 py-2 sm:h-16 sm:px-4 sm:py-2.5"
          : "h-16 shrink-0 px-4 py-2.5 sm:h-20 sm:px-5 sm:py-3"
      }`}
    >
      <Image
        src={src}
        alt={name}
        width={280}
        height={80}
        sizes={fullWidth ? "(max-width: 768px) 80vw, 240px" : "220px"}
        className={`w-auto object-contain ${
          skipInvert ? "" : "brightness-0 invert"
        } ${
          fullWidth
            ? isMarkAndSave
              ? "h-12 max-w-[95%] sm:h-14 sm:max-w-[18rem]"
              : isBenQ
                ? "h-12 max-w-[95%] sm:h-14 sm:max-w-[18rem]"
                : "h-7 max-w-[70%] sm:h-8 sm:max-w-[12rem]"
            : "h-10 max-w-[11rem] sm:h-12 sm:max-w-[14rem]"
        }`}
      />
    </div>
  );
}

function ReviewCard({
  review,
  className = "",
}: {
  review: Review;
  className?: string;
}) {
  return (
    <article
      data-review-card
      className={`flex flex-col justify-between rounded-[1.25rem] border-2 border-black/10 bg-[#ececec] p-5 sm:rounded-[1.5rem] sm:p-6 md:p-7 ${className}`}
    >
      <div>
        <Stars />
        <p className="mt-4 text-sm leading-relaxed text-black/65 sm:mt-5 sm:text-base md:text-lg">
          {review.quote}
        </p>
      </div>
      <div className="mt-8 w-full sm:mt-12 md:mt-14">
        <CompanyLogo src={review.logo} name={review.name} fullWidth />
      </div>
    </article>
  );
}

function MobileReviewCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (!mq.matches || prefersReduced || paused) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % reviews.length);
    }, 4000);

    const onChange = () => {
      if (!mq.matches) window.clearInterval(id);
    };
    mq.addEventListener?.("change", onChange);

    return () => {
      window.clearInterval(id);
      mq.removeEventListener?.("change", onChange);
    };
  }, [paused]);

  const goTo = (index: number) => {
    setActive((index + reviews.length) % reviews.length);
  };

  return (
    <div
      className="w-full min-w-0 md:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        const end = e.changedTouches[0]?.clientX;
        touchStartX.current = null;
        setPaused(false);
        if (start == null || end == null) return;
        const delta = start - end;
        if (Math.abs(delta) < 40) return;
        goTo(active + (delta > 0 ? 1 : -1));
      }}
    >
      <div className="w-full min-w-0 overflow-hidden">
        <div
          className="flex w-full transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              className="box-border w-full min-w-full max-w-full flex-[0_0_100%] px-0.5"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Review slides"
      >
        {reviews.map((review, index) => (
          <button
            key={review.name}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Show review from ${review.name}`}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === index
                ? "w-6 bg-[#ff5f28]"
                : "w-2 bg-black/20 hover:bg-black/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const header = section.querySelectorAll("[data-review-header]");
      const featuredCard = section.querySelector("[data-review-featured]");
      const cards = section.querySelectorAll("[data-review-card]");
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      gsap.set(header, {
        autoAlpha: 0,
        y: isMobile ? 24 : 48,
        scale: isMobile ? 1 : 0.96,
      });
      gsap.set(featuredCard, {
        autoAlpha: 0,
        y: isMobile ? 20 : 56,
        scale: isMobile ? 1 : 0.96,
        transformOrigin: "center bottom",
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
        duration: 0.85,
        stagger: 0.08,
      })
        .to(
          featuredCard,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
          },
          "-=0.4"
        )
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: isMobile ? 0 : 0.1,
          },
          "-=0.55"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full overflow-x-clip bg-[#f7f7f7] font-sans"
    >
      <div className="pointer-events-none absolute -left-24 top-20 hidden h-80 w-80 rounded-full bg-[#ff5f28]/[0.06] blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-20 bottom-10 hidden h-72 w-72 rounded-full bg-[#ff5f28]/[0.05] blur-3xl md:block" />

      <div className="relative mx-auto w-full max-w-[90rem] min-w-0 px-4 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-review-header
            className="mb-4 flex items-center justify-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#ff5f28] sm:mb-5 sm:text-xs sm:tracking-[0.18em] md:mb-6 md:text-sm"
          >
            <span aria-hidden>✦</span>
            Client Testimonials
          </p>
          <h2
            data-review-header
            className="text-[2rem] font-light leading-[1.1] tracking-tight text-black sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-6xl xl:text-[4rem]"
          >
            What Our Clients <span className="text-[#ff5f28]">Say</span>
          </h2>
        </div>

        <div className="mt-10 grid min-w-0 gap-4 sm:mt-14 sm:gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <article
            data-review-featured
            className="relative min-h-[420px] w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:min-h-[520px] sm:rounded-[1.75rem] lg:col-span-5 lg:min-h-[720px]"
          >
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-[1] p-5 sm:p-7 md:p-9">
              <p className="max-w-md text-[0.95rem] font-light leading-relaxed text-white sm:text-lg md:text-xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="mt-5 sm:mt-6">
                <CompanyLogo src={featured.logo} name={featured.name} />
              </div>
            </div>

            <span
              className="pointer-events-none absolute bottom-2 right-4 text-[4.5rem] font-light leading-none text-white/15 sm:bottom-4 sm:right-6 sm:text-[7rem] md:text-[9rem]"
              aria-hidden
            >
              ”
            </span>
          </article>

          <MobileReviewCarousel />

          <div className="hidden min-w-0 gap-5 md:grid md:grid-cols-2 md:grid-rows-2 lg:col-span-7 lg:gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} className="h-full min-h-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
