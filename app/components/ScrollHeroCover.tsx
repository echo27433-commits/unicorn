"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import {
  isMobileMotion,
  prefersReducedMotion,
  scheduleScrollRefresh,
  scrubValue,
} from "../lib/motion";
import Header from "./Header";

gsap.registerPlugin(ScrollTrigger);

const CustomerResults = dynamic(() => import("./CustomerResults"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100svh] w-full bg-white" aria-hidden />
  ),
});

export default function ScrollHeroCover() {
  const heroRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const cover = coverRef.current;
    if (!hero || !cover) return;

    if (prefersReducedMotion()) return;

    const mobile = isMobileMotion();
    const scrub = scrubValue(0.9);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        endTrigger: cover,
        end: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: mobile ? 0 : 1,
        fastScrollEnd: true,
      });

      // Pause WebGL waves once the next section covers the hero (pinned hero
      // stays "visible" to IntersectionObserver otherwise).
      ScrollTrigger.create({
        trigger: cover,
        start: "top 92%",
        onEnter: () => hero.setAttribute("data-waves-paused", ""),
        onLeaveBack: () => hero.removeAttribute("data-waves-paused"),
      });

      if (mobile) {
        // Transform-only opacity fade — skip scale / radius / shadow paints.
        gsap.fromTo(
          hero,
          { opacity: 1 },
          {
            opacity: 0.35,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: cover,
              start: "top bottom",
              end: "top top",
              scrub,
              fastScrollEnd: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          hero,
          { scale: 1, opacity: 1 },
          {
            scale: 0.94,
            opacity: 0.5,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: cover,
              start: "top bottom",
              end: "top top",
              scrub,
              fastScrollEnd: true,
            },
          }
        );

        gsap.fromTo(
          cover,
          {
            borderRadius: "32px 32px 0px 0px",
            boxShadow: "0 -12px 40px rgba(0,0,0,0)",
          },
          {
            borderRadius: "0px 0px 0px 0px",
            boxShadow: "0 -32px 90px rgba(0,0,0,0.5)",
            ease: "none",
            scrollTrigger: {
              trigger: cover,
              start: "top bottom",
              end: "top top",
              scrub,
              fastScrollEnd: true,
            },
          }
        );
      }
    });

    const cancelRefresh = scheduleScrollRefresh(250);

    return () => {
      cancelRefresh();
      hero.removeAttribute("data-waves-paused");
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Header ref={heroRef} />
      <div
        ref={coverRef}
        data-products-section
        className="relative z-20 overflow-hidden md:will-change-transform"
      >
        <div data-products-inner className="origin-center md:will-change-transform">
          <CustomerResults />
        </div>
      </div>
    </>
  );
}
