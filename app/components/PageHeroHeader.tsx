import { forwardRef, type ReactNode } from "react";

import Button from "./Button";
import Navbar from "./Navbar";
import PageHeaderBackdrop from "./PageHeaderBackdrop";

export type PageHeroCta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export type PageHeroHeaderProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
  /** Logo, back-link, etc. above the eyebrow */
  beforeTitle?: ReactNode;
  /** Content between eyebrow and H1 (e.g. brand logo) */
  afterEyebrow?: ReactNode;
  /** Extra block under title (e.g. case-study headline) */
  afterDescription?: ReactNode;
  /** Region chips, etc. below CTAs */
  afterCtas?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  /** Full-bleed home hero vs standard inner page */
  size?: "page" | "home";
  intensity?: "default" | "home";
  /** Replace the default copy block (home uses custom Hero) */
  children?: ReactNode;
};

const ctaClass =
  "w-full justify-center px-4 py-2.5 text-sm sm:w-auto sm:px-[1.85rem] sm:py-[0.95rem] sm:text-base md:text-lg";

/**
 * Shared black hero shell: Navbar + backdrop + eyebrow / H1 / CTAs.
 * Used by all inner pages and detail slugs — keeps one composition path.
 */
const PageHeroHeader = forwardRef<HTMLElement, PageHeroHeaderProps>(
  function PageHeroHeader(
    {
      eyebrow,
      title,
      description,
      primaryCta,
      secondaryCta,
      beforeTitle,
      afterEyebrow,
      afterCtas,
      afterDescription,
      titleClassName,
      descriptionClassName,
      size = "page",
      intensity = "default",
      children,
    },
    ref
  ) {
    const isHome = size === "home";

    return (
      <>
        <Navbar />

        <header
          ref={ref}
          data-motion-pin
          className={
            isHome
              ? "relative z-0 flex min-h-[100svh] w-full max-w-[100%] flex-col overflow-x-clip overflow-y-hidden bg-black md:min-h-screen md:will-change-transform"
              : "relative z-0 flex min-h-[70svh] w-full max-w-[100%] flex-col overflow-x-clip overflow-y-hidden bg-black md:min-h-[85vh] md:will-change-transform"
          }
          style={{ transformOrigin: "center center" }}
        >
          <PageHeaderBackdrop intensity={intensity} />

          <div
            className={
              isHome
                ? "relative z-10 flex min-h-[100svh] flex-col pointer-events-none md:min-h-screen [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
                : "relative z-10 flex flex-1 flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
            }
          >
            {children ?? (
              <section className="relative flex flex-col px-4 pb-8 pt-32 sm:pb-12 sm:pt-36 md:flex-1 md:px-8 md:pb-20 md:pt-44 lg:px-12 lg:pt-48">
                <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-start md:flex-1 md:justify-center">
                  <div className="relative max-w-4xl lg:max-w-5xl">
                    <div
                      className="pointer-events-none absolute -inset-x-4 -inset-y-6 z-0 sm:-inset-x-8 sm:-inset-y-10 md:-inset-x-12 md:-inset-y-14"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 65% at 30% 40%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 45%, transparent 75%)",
                      }}
                      aria-hidden
                    />

                    <div className="relative z-[1] text-left">
                      {beforeTitle}

                      <p className="mb-5 flex items-center justify-start gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#ff5f28] sm:mb-4 sm:tracking-[0.18em] md:mb-6 md:text-sm">
                        <span aria-hidden>✦</span>
                        {eyebrow}
                      </p>

                      {afterEyebrow}

                      <h1
                        className={
                          titleClassName ??
                          "text-[3.75rem] font-light leading-[1.06] tracking-tight text-white sm:text-5xl sm:leading-[1.04] md:text-7xl lg:text-8xl xl:text-[6.5rem] xl:leading-[1.01]"
                        }
                      >
                        {title}
                      </h1>

                      {afterDescription}

                      <p
                        className={
                          descriptionClassName ??
                          "mt-6 max-w-[32rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]"
                        }
                      >
                        {description}
                      </p>

                      {(primaryCta || secondaryCta) && (
                        <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-4 md:mt-12 md:gap-5">
                          {primaryCta ? (
                            <Button
                              href={primaryCta.href}
                              variant={primaryCta.variant ?? "primary"}
                              className={ctaClass}
                            >
                              {primaryCta.label}
                            </Button>
                          ) : null}
                          {secondaryCta ? (
                            <Button
                              href={secondaryCta.href}
                              variant={secondaryCta.variant ?? "secondary"}
                              className={ctaClass}
                            >
                              {secondaryCta.label}
                            </Button>
                          ) : null}
                        </div>
                      )}

                      {afterCtas}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </header>
      </>
    );
  }
);

export default PageHeroHeader;
