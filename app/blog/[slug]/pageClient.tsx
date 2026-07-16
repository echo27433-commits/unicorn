"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageHeroHeader from "../../components/PageHeroHeader";
import type { BlogPost } from "../../lib/blog";
import { getRelatedBlogPosts } from "../../lib/blog";
import {
  scheduleScrollRefresh,
  setupCover,
  setupReveal,
} from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const related = getRelatedBlogPosts(post.slug, 3);

  useEffect(() => {
    const root = rootRef.current;
    const header = headerRef.current;
    const article = articleRef.current;
    if (!root || !header || !article) return;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      setupCover(header, article, null, { invalidateOnRefresh: true });
      setupReveal({
        scope: root,
        start: "top 80%",
        y: 20,
        cardY: 32,
        duration: 0.75,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, root);

    const cancelRefresh = scheduleScrollRefresh(250);

    return () => {
      cancelRefresh();
      ctx.revert();
    };
  }, [reducedMotion, post.slug]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      <PageHeroHeader
        ref={headerRef}
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        descriptionClassName="mt-6 max-w-[36rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]"
        primaryCta={{ href: "#article", label: "Read article" }}
        secondaryCta={{ href: "/blog", label: "All insights" }}
      />

      <div
        ref={articleRef}
        id="article"
        data-motion-cover
        className="relative z-20 overflow-hidden bg-black"
      >
        <article className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:py-28">
          <div
            data-reveal
            className="overflow-hidden rounded-[1.75rem] border border-white/10 md:rounded-[2rem]"
          >
            <div
              data-reveal-item
              className="relative aspect-[16/9] w-full md:aspect-[21/9]"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          </div>

          <div
            data-reveal
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center gap-3 md:mt-12"
          >
            <span
              data-reveal-item
              className="rounded-full border border-[#ff5f28]/35 bg-[#ff5f28]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5f28]"
            >
              {post.category}
            </span>
            <span
              data-reveal-item
              className="text-sm text-white/45"
            >
              {post.readTime} read
            </span>
          </div>

          <div className="mx-auto mt-10 max-w-3xl md:mt-14">
            {post.sections.map((section, index) => (
              <section
                key={`${post.slug}-${index}`}
                data-reveal
                className={index === 0 ? "" : "mt-12 md:mt-16"}
              >
                {section.heading ? (
                  <h2
                    data-reveal-item
                    className="text-2xl font-light tracking-tight text-white md:text-3xl"
                  >
                    {section.heading}
                  </h2>
                ) : null}
                <div
                  className={
                    section.heading ? "mt-5 space-y-5 md:mt-6 md:space-y-6" : "space-y-5 md:space-y-6"
                  }
                >
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      data-reveal-item
                      className="text-base leading-relaxed text-white/60 md:text-lg md:leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {related.length ? (
            <div data-reveal className="mt-20 border-t border-white/10 pt-14 md:mt-24 md:pt-16">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p
                    data-reveal-item
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28]"
                  >
                    Keep reading
                  </p>
                  <h2
                    data-reveal-item
                    className="mt-3 text-3xl font-light tracking-tight text-white md:text-4xl"
                  >
                    Related insights
                  </h2>
                </div>
                <Link
                  href="/blog"
                  data-reveal-item
                  className="hidden text-sm font-medium text-white/60 transition-colors hover:text-[#ff5f28] sm:inline-flex"
                >
                  View all
                </Link>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {related.map((item) => (
                  <article
                    key={item.slug}
                    data-reveal-item
                    className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition-colors hover:border-[#ff5f28]/35 hover:bg-[#ff5f28]/[0.06]"
                  >
                    <Link href={`/blog/${item.slug}`} className="flex h-full flex-col">
                      <div className="relative aspect-[5/3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5f28]">
                          {item.category} · {item.readTime}
                        </p>
                        <h3 className="mt-3 text-lg font-light leading-snug tracking-tight text-white transition-colors group-hover:text-[#ff5f28] md:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                          {item.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
}
