"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { isMobileMotion, prefersReducedMotion, scrubValue } from "../lib/motion";
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

    if (prefersReducedMotion()) return;

    const mobile = isMobileMotion();
    const scrub = scrubValue(0.9);

    const ctx = gsap.context(() => {
      if (!mobile) {
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
              scrub,
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: location,
        start: "bottom bottom",
        endTrigger: reviews,
        end: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: mobile ? 0 : 1,
        invalidateOnRefresh: true,
      });

      if (!mobile) {
        gsap.fromTo(
          locationInner,
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
      }
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
          className="origin-center md:will-change-transform"
        >
          <OurLocation />
        </div>
      </div>
      <div
        ref={reviewsRef}
        className="relative z-40 min-w-0 overflow-x-clip bg-[#f7f7f7] md:will-change-transform"
      >
        <Reviews />
      </div>
    </>
  );
}
