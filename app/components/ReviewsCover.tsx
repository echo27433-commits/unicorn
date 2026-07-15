"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { isMobileMotion, prefersReducedMotion, scrubValue } from "../lib/motion";
import Reviews from "./Reviews";

gsap.registerPlugin(ScrollTrigger);

/**
 * White Reviews panel slides over the black Use Cases (Case Study) section.
 * Overlay polish (radius / shadow / scale) is desktop-only — white-on-black only.
 */
export default function ReviewsCover() {
  const caseInnerRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reviews = reviewsRef.current;
    if (!reviews) return;

    if (prefersReducedMotion()) return;

    const mobile = isMobileMotion();
    const scrub = scrubValue(0.9);
    const caseSection = document.querySelector<HTMLElement>("[data-case-study]");
    const caseInner =
      caseSection?.querySelector<HTMLElement>("[data-case-inner]") ?? caseSection;

    caseInnerRef.current = caseInner;

    const ctx = gsap.context(() => {
      if (mobile) return;

      if (caseInner) {
        gsap.fromTo(
          caseInner,
          { scale: 1 },
          {
            scale: 0.94,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: reviews,
              start: "top bottom",
              end: "top top",
              scrub,
            },
          }
        );
      }

      gsap.fromTo(
        reviews,
        {
          borderRadius: "32px 32px 0px 0px",
          boxShadow: "0 -12px 40px rgba(0,0,0,0)",
        },
        {
          borderRadius: "0px 0px 0px 0px",
          boxShadow: "0 -32px 90px rgba(0,0,0,0.5)",
          ease: "none",
          scrollTrigger: {
            trigger: reviews,
            start: "top bottom",
            end: "top top",
            scrub,
          },
        }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timeout = window.setTimeout(refresh, 450);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={reviewsRef}
      data-reviews-cover
      className="relative z-40 min-w-0 overflow-x-clip bg-[#f7f7f7] md:will-change-transform"
    >
      <Reviews />
    </div>
  );
}
