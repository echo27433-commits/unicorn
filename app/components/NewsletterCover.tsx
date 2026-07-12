"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import Footer from "./Footer";
import Newsletter from "./Newsletter";

gsap.registerPlugin(ScrollTrigger);

/**
 * Newsletter stays in front and lifts away on scroll.
 * Footer sits behind it and is revealed underneath.
 */
export default function NewsletterCover() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const footerSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const newsletter = newsletterRef.current;
    const footerSlot = footerSlotRef.current;
    if (!wrapper || !newsletter || !footerSlot) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    let stackHeight = 0;

    const sync = () => {
      newsletter.style.minHeight = "";
      wrapper.style.height = "";

      const nh = newsletter.scrollHeight;
      const fh = footerSlot.scrollHeight;
      stackHeight = Math.max(nh, fh, window.innerHeight);

      wrapper.style.height = `${stackHeight}px`;
      newsletter.style.minHeight = `${stackHeight}px`;
      return stackHeight;
    };

    const ctx = gsap.context(() => {
      sync();

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${stackHeight || sync()}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: sync,
        onRefresh: sync,
      });

      gsap.fromTo(
        newsletter,
        { yPercent: 0 },
        {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${stackHeight || sync()}`,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    const refresh = () => {
      sync();
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 300);
    const t2 = window.setTimeout(refresh, 900);
    const t3 = window.setTimeout(refresh, 1600);

    const resizeObserver = new ResizeObserver(() => {
      refresh();
    });
    resizeObserver.observe(footerSlot);
    resizeObserver.observe(newsletter);

    const images = footerSlot.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", refresh, { once: true });
      }
    });

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      resizeObserver.disconnect();
      ctx.revert();
      wrapper.style.height = "";
      newsletter.style.minHeight = "";
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative z-50 w-full overflow-hidden bg-black"
    >
      <div
        ref={footerSlotRef}
        className="absolute inset-x-0 top-0 z-0 w-full bg-black"
      >
        <Footer />
      </div>

      <div
        ref={newsletterRef}
        className="relative z-10 w-full bg-white will-change-transform"
      >
        <Newsletter />
      </div>
    </div>
  );
}
