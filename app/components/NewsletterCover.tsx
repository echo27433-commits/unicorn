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
  const newsletterContentRef = useRef<HTMLDivElement>(null);
  const footerSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const newsletter = newsletterRef.current;
    const newsletterContent = newsletterContentRef.current;
    const footerSlot = footerSlotRef.current;
    if (!wrapper || !newsletter || !newsletterContent || !footerSlot) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    let stackHeight = 0;
    let syncing = false;

    const sync = () => {
      // Measure natural content height — never clear applied sizes (that
      // retriggers ResizeObserver and collapses pin-spacing mid-refresh).
      const nh = newsletterContent.scrollHeight;
      const fh = footerSlot.scrollHeight;
      const next = Math.max(nh, fh, window.innerHeight);

      if (next === stackHeight) return stackHeight;

      syncing = true;
      stackHeight = next;
      wrapper.style.height = `${stackHeight}px`;
      newsletter.style.minHeight = `${stackHeight}px`;
      // Allow layout to settle before re-arming observers.
      requestAnimationFrame(() => {
        syncing = false;
      });
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
      });

      gsap.fromTo(
        newsletter,
        { y: 0 },
        {
          y: () => -stackHeight,
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

    let refreshTimer = 0;
    const scheduleRefresh = () => {
      if (syncing) return;
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        const before = stackHeight;
        sync();
        if (stackHeight !== before) {
          ScrollTrigger.refresh();
        }
      }, 80);
    };

    window.addEventListener("load", scheduleRefresh);
    const t1 = window.setTimeout(scheduleRefresh, 300);
    const t2 = window.setTimeout(scheduleRefresh, 900);

    const resizeObserver = new ResizeObserver(() => {
      scheduleRefresh();
    });
    // Observe natural-size sources only — not the stretched newsletter shell.
    resizeObserver.observe(footerSlot);
    resizeObserver.observe(newsletterContent);

    const images = footerSlot.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", scheduleRefresh, { once: true });
      }
    });

    return () => {
      window.removeEventListener("load", scheduleRefresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(refreshTimer);
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
        <div ref={newsletterContentRef}>
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
