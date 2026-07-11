"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import OurLocation from "./OurLocation";
import Reviews from "./Reviews";

gsap.registerPlugin(ScrollTrigger);

/**
 * Location slides over Case Study (existing).
 * Then Reviews ("What Our Clients Say") slides over Location/map.
 * Scale runs on an inner layer so Case Study never shows through.
 */
export default function LocationCover() {
  const locationRef = useRef<HTMLDivElement>(null);
  const locationInnerRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const location = locationRef.current;
    const locationInner = locationInnerRef.current;
    const reviews = reviewsRef.current;
    if (!location || !locationInner || !reviews) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Location panel rounded cover over case study
      gsap.fromTo(
        location,
        {
          borderRadius: "32px 32px 0px 0px",
          boxShadow: "0 -12px 40px rgba(0,0,0,0)",
        },
        {
          borderRadius: "0px 0px 0px 0px",
          boxShadow: "0 -32px 90px rgba(0,0,0,0.45)",
          ease: "none",
          scrollTrigger: {
            trigger: location,
            start: "top bottom",
            end: "top top",
            scrub: 0.9,
          },
        }
      );

      // Hold Location/map, then Reviews slide over it
      ScrollTrigger.create({
        trigger: location,
        start: "bottom bottom",
        endTrigger: reviews,
        end: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Same motion as Products → Hero, but only on inner content.
      // Outer shell stays solid black so Case Study #3 never peeks through.
      gsap.fromTo(
        locationInner,
        { scale: 1 },
        {
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: reviews,
            start: "top bottom",
            end: "top top",
            scrub: 0.9,
          },
        }
      );

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
            scrub: 0.9,
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
    <>
      <div
        ref={locationRef}
        data-location-cover
        className="relative z-30 overflow-hidden bg-black"
      >
        <div
          ref={locationInnerRef}
          className="origin-center will-change-transform"
        >
          <OurLocation />
        </div>
      </div>
      <div
        ref={reviewsRef}
        className="relative z-40 overflow-hidden bg-[#f7f7f7] will-change-transform"
      >
        <Reviews />
      </div>
    </>
  );
}
