import Image from "next/image";
import Link from "next/link";

import { blogPosts } from "../lib/blog";

export default function BlogPageClient() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div
      data-motion-cover
      className="relative z-20 overflow-hidden bg-black"
    >
      <main className="relative bg-black font-sans">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-[#ff5f28]/[0.07]" />
          <div className="absolute -right-12 bottom-8 h-64 w-64 rounded-full bg-[#ff5f28]/[0.05]" />
        </div>

        <section
          id="blog-topics"
          className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32"
        >
          <div data-reveal className="max-w-3xl">
            <p
              data-reveal-item
              className="text-sm font-medium tracking-wide text-[#ff5f28]"
            >
              / insights /
            </p>
            <h2
              data-reveal-item
              className="mt-4 text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Create authority around{" "}
              <span className="text-[#ff5f28]">AI</span>
            </h2>
            <p
              data-reveal-item
              className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
            >
              Thought leadership on loyalty, conversational AI, computer
              vision, and digital transformation, built for enterprise
              leaders across the GCC.
            </p>
          </div>

          <article
            data-reveal
            className="mt-14 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] md:mt-16 md:rounded-[2rem]"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-0 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div
                data-reveal-item
                className="relative min-h-[320px] overflow-hidden md:min-h-[420px] lg:min-h-[520px]"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-8 md:p-10">
                  <span className="rounded-full border border-[#ff5f28]/40 bg-black/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5f28]">
                    Featured
                  </span>
                </div>
              </div>
              <div data-reveal-item className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28]">
                  {featured.category} · {featured.readTime}
                </p>
                <h3 className="mt-4 text-2xl font-light leading-snug tracking-tight text-white transition-colors group-hover:text-[#ff5f28] md:text-3xl lg:text-[2rem]">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-[#ff5f28]">
                  Read article
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </article>

          <div
            data-reveal
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6"
          >
            {rest.map((post) => (
              <article
                key={post.slug}
                data-reveal-item
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition-colors hover:border-[#ff5f28]/35 hover:bg-[#ff5f28]/[0.06]"
              >
                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-[5/4] lg:h-[260px] lg:aspect-auto">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5f28]">
                      {post.category} · {post.readTime}
                    </p>
                    <h3 className="mt-4 text-xl font-light leading-snug tracking-tight text-white transition-colors group-hover:text-[#ff5f28] md:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                      {post.excerpt}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors group-hover:text-[#ff5f28]">
                      Read more
                      <svg
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div
            data-reveal
            className="mt-16 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(70%_90%_at_15%_10%,rgba(255,95,40,0.16),transparent_55%),radial-gradient(70%_90%_at_85%_90%,rgba(255,95,40,0.1),transparent_55%)] p-8 md:mt-20 md:rounded-[2rem] md:p-12"
          >
            <div
              data-reveal-item
              className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10"
            >
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff5f28]">
                  Have a topic in mind?
                </p>
                <h3 className="mt-3 text-2xl font-light tracking-tight text-white md:text-3xl">
                  Let&apos;s explore it together
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
                  Looking for deeper research, a case study, or a briefing for
                  your leadership team? We&apos;d love to help.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn btn--primary inline-flex shrink-0 items-center gap-2"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
