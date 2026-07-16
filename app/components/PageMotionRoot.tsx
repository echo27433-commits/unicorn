"use client";

import { useEffect, useEffectEvent, useRef, type ReactNode } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  scheduleScrollRefresh,
  setupCover,
  setupReveal,
  type SetupCoverOptions,
  type SetupRevealOptions,
} from "../lib/motion";
import { useReducedMotion } from "../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export type PageMotionRootProps = {
  children: ReactNode;
  className?: string;
  /** Pin `[data-motion-pin]` while `[data-motion-cover]` slides over. */
  cover?: boolean | SetupCoverOptions;
  reveal?: boolean | SetupRevealOptions;
  /** Extra GSAP work inside the root context (timeline, multi-cover, etc.). */
  onSetup?: (root: HTMLElement) => void;
  refreshDelayMs?: number;
};

/**
 * Small client island for ScrollTrigger setup. Keep page headers as server
 * components in `page.tsx` and mark them with `data-motion-pin`.
 */
export default function PageMotionRoot({
  children,
  className,
  cover = true,
  reveal = true,
  onSetup,
  refreshDelayMs = 250,
}: PageMotionRootProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const onSetupEvent = useEffectEvent((root: HTMLElement) => {
    onSetup?.(root);
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const pinned =
      root.querySelector<HTMLElement>("[data-motion-pin]") ??
      document.querySelector<HTMLElement>("[data-motion-pin]");
    const coverEl = root.querySelector<HTMLElement>("[data-motion-cover]");

    const ctx = gsap.context(() => {
      if (cover && pinned && coverEl) {
        const opts =
          typeof cover === "object" ? cover : { invalidateOnRefresh: true };
        setupCover(pinned, coverEl, null, opts);
      }

      if (reveal) {
        const opts = typeof reveal === "object" ? reveal : undefined;
        setupReveal({
          scope: root,
          start: "top 80%",
          y: 20,
          cardY: 40,
          duration: 0.8,
          cardDuration: 0.8,
          stagger: 0.08,
          cardStagger: 0.06,
          ease: "power3.out",
          ...opts,
        });
      }

      onSetupEvent(root);
    }, root);

    const cancelRefresh = scheduleScrollRefresh(refreshDelayMs);

    return () => {
      cancelRefresh();
      ctx.revert();
    };
  }, [cover, reducedMotion, refreshDelayMs, reveal]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
