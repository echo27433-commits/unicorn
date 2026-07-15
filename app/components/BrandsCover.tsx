"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { isMobileMotion, prefersReducedMotion, scrubValue } from "../lib/motion";
import BrandsTrust from "./BrandsTrust";

gsap.registerPlugin(ScrollTrigger);

/**
 * Brands (black) slides over Products (white) above it.
 * Pins Products until Brands reaches the top.
 */
export default function BrandsCover() {
  const brandsRef = useRef<HTMLDivElement>(null);
  const brandsInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const brands = brandsRef.current;
    if (!brands) return;

    if (prefersReducedMotion()) return;

    const mobile = isMobileMotion();
    const scrub = scrubValue(0.9);
    const products = document.querySelector<HTMLElement>("[data-products-section]");
    const productsInner =
      products?.querySelector<HTMLElement>("[data-products-inner]") ?? products;

    if (!products) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: products,
        start: "bottom bottom",
        endTrigger: brands,
        end: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: mobile ? 0 : 1,
        invalidateOnRefresh: true,
      });

      if (mobile) return;

      if (productsInner) {
        gsap.fromTo(
          productsInner,
          { scale: 1 },
          {
            scale: 0.94,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: brands,
              start: "top bottom",
              end: "top top",
              scrub,
            },
          }
        );
      }

      gsap.fromTo(
        brands,
        {
          borderRadius: "32px 32px 0px 0px",
          boxShadow: "0 -12px 40px rgba(0,0,0,0)",
        },
        {
          borderRadius: "0px 0px 0px 0px",
          boxShadow: "0 -32px 90px rgba(0,0,0,0.5)",
          ease: "none",
          scrollTrigger: {
            trigger: brands,
            start: "top bottom",
            end: "top top",
            scrub,
          },
        }
      );
    });

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
    <div
      ref={brandsRef}
      data-brands-cover
      className="relative z-30 overflow-hidden bg-black md:will-change-transform"
    >
      <div ref={brandsInnerRef} className="origin-center">
        <BrandsTrust />
      </div>
    </div>
  );
}
