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
 * Mobile: white panel matches newsletter content only (no viewport stretch).
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

    const mobileMq = window.matchMedia("(max-width: 767px)");
    let stackHeight = 0;
    let panelHeight = 0;
    let syncing = false;

    const sync = () => {
      const nh = newsletterContent.scrollHeight;
      const fh = footerSlot.scrollHeight;
      const isMobile = mobileMq.matches;

      // Mobile white panel = content only. Wrapper must still fit the footer
      // so the full reveal works, but that extra area is black (footer), not white.
      const nextPanel = isMobile ? nh : Math.max(nh, fh, window.innerHeight);
      const nextStack = isMobile
        ? Math.max(nh, fh)
        : Math.max(nh, fh, window.innerHeight);

      if (nextStack === stackHeight && nextPanel === panelHeight) {
        return stackHeight;
      }

      syncing = true;
      stackHeight = nextStack;
      panelHeight = nextPanel;

      wrapper.style.height = `${stackHeight}px`;
      newsletter.style.minHeight = `${panelHeight}px`;
      // Lock height on mobile so the white shell can't grow with the wrapper.
      newsletter.style.height = isMobile ? `${panelHeight}px` : "";

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
          y: () =>
            mobileMq.matches
              ? -(panelHeight || newsletterContent.scrollHeight)
              : -stackHeight,
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
        const beforePanel = panelHeight;
        sync();
        if (stackHeight !== before || panelHeight !== beforePanel) {
          ScrollTrigger.refresh();
        }
      }, 80);
    };

    const onBreakpointChange = () => {
      stackHeight = 0;
      panelHeight = 0;
      newsletter.style.height = "";
      scheduleRefresh();
    };

    window.addEventListener("load", scheduleRefresh);
    mobileMq.addEventListener("change", onBreakpointChange);
    const t1 = window.setTimeout(scheduleRefresh, 300);
    const t2 = window.setTimeout(scheduleRefresh, 900);

    const resizeObserver = new ResizeObserver(() => scheduleRefresh());
    resizeObserver.observe(footerSlot);
    resizeObserver.observe(newsletterContent);

    footerSlot.querySelectorAll("img").forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", scheduleRefresh, { once: true });
      }
    });

    return () => {
      window.removeEventListener("load", scheduleRefresh);
      mobileMq.removeEventListener("change", onBreakpointChange);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(refreshTimer);
      resizeObserver.disconnect();
      ctx.revert();
      wrapper.style.height = "";
      newsletter.style.minHeight = "";
      newsletter.style.height = "";
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
