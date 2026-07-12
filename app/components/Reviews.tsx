"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const featured = {
  quote:
    "Unicorn transformed how we engage customers. Their team delivered clarity, speed, and results that moved the needle for our business.",
  name: "Samantha Lee",
  role: "Head of Digital, Retail",
  image: "/review1.jpg",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80",
};

const reviews = [
  {
    quote:
      "From strategy to execution, the partnership felt seamless. We shipped faster and saw measurable lift within the first quarter.",
    name: "Ali Raza",
    role: "Entrepreneur",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=80",
  },
  {
    quote:
      "Their AI and data work gave us insights we could actually act on. Clear communication and exceptional delivery throughout.",
    name: "Priya Mehta",
    role: "Product Director",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&h=96&q=80",
  },
  {
    quote:
      "A rare mix of creative thinking and technical depth. The Echo platform rollout exceeded every expectation we set.",
    name: "James Carter",
    role: "Operations Lead",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&h=96&q=80",
  },
  {
    quote:
      "Professional, proactive, and outcome-focused. They understood our market and built solutions that scale with us.",
    name: "Nora Al-Hassan",
    role: "Marketing Manager",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=96&h=96&q=80",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-5 w-5 text-[#ff5f28]"
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

      gsap.set(header, {
        autoAlpha: 0,
        y: 48,
        scale: 0.96,
      });
      gsap.set(featuredCard, {
        autoAlpha: 0,
        y: 56,
        scale: 0.96,
        transformOrigin: "center bottom",
      });
      gsap.set(cards, {
        autoAlpha: 0,
        y: 56,
        scale: 0.96,
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
            stagger: 0.1,
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
      className="relative w-full overflow-hidden bg-[#f7f7f7] font-sans"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#ff5f28]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[#ff5f28]/[0.05] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[90rem] px-4 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-review-header
            className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:mb-6 md:text-sm"
          >
            <span aria-hidden>✦</span>
            Testimonials
          </p>
          <h2
            data-review-header
            className="text-4xl font-light leading-[1.08] tracking-tight text-black md:text-5xl lg:text-6xl xl:text-[4rem]"
          >
            What Our Clients <span className="text-[#ff5f28]">Say</span>
          </h2>
        </div>

        <div
          className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6 xl:gap-8"
        >
          <article
            data-review-featured
            className="relative min-h-[620px] overflow-hidden rounded-[1.75rem] lg:col-span-5 lg:min-h-[720px]"
          >
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-[1] p-7 md:p-9">
              <p className="max-w-md text-lg font-light leading-relaxed text-white md:text-xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={featured.avatar}
                  alt={featured.name}
                  width={44}
                  height={44}
                  sizes="44px"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-white/40"
                />
                <div>
                  <p className="text-sm font-medium text-white">{featured.name}</p>
                  <p className="text-xs text-white/60">{featured.role}</p>
                </div>
              </div>
            </div>

            <span
              className="pointer-events-none absolute bottom-4 right-6 text-[7rem] font-light leading-none text-white/15 md:text-[9rem]"
              aria-hidden
            >
              ”
            </span>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
            {reviews.map((review) => (
              <article
                key={review.name}
                data-review-card
                className="flex flex-col justify-between rounded-[1.5rem] bg-[#ececec] p-6 md:p-7"
              >
                <div>
                  <Stars />
                  <p className="mt-5 text-base leading-relaxed text-black/65 md:text-lg">
                    {review.quote}
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-3 md:mt-14">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={44}
                    height={44}
                    sizes="44px"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-black">{review.name}</p>
                    <p className="text-xs text-black/45">{review.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
