"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import CustomerResults from "./CustomerResults";
import Header from "./Header";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHeroCover() {
  const heroRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const cover = coverRef.current;
    if (!hero || !cover) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        endTrigger: cover,
        end: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      gsap.fromTo(
        hero,
        { scale: 1, opacity: 1 },
        {
          scale: 0.94,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cover,
            start: "top bottom",
            end: "top top",
            scrub: 0.9,
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
            scrub: 0.9,
          },
        }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timeout = window.setTimeout(refresh, 250);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Header ref={heroRef} />
      <div
        ref={coverRef}
        className="relative z-20 overflow-hidden will-change-transform"
      >
        <CustomerResults />
      </div>
    </>
  );
}
