import { forwardRef } from "react";

import Button from "./Button";
import Navbar from "./Navbar";
import PageHeaderBackdrop from "./PageHeaderBackdrop";

const BlogHeader = forwardRef<HTMLElement>(function BlogHeader(_, ref) {
  return (
    <>
      <Navbar />

      <header
        ref={ref}
        className="relative z-0 flex min-h-[70svh] w-full max-w-[100%] flex-col overflow-x-clip overflow-y-hidden bg-black md:min-h-[85vh] md:will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <PageHeaderBackdrop />

        <div className="relative z-10 flex flex-1 flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
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
                  <p className="mb-5 flex items-center justify-start gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#ff5f28] sm:mb-4 sm:text-xs sm:tracking-[0.18em] md:mb-6 md:text-sm">
                    <span aria-hidden>✦</span>
                    Blog
                  </p>

                  <h1 className="text-[3.25rem] font-light leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[1.04] md:text-7xl lg:text-8xl xl:text-[6.5rem] xl:leading-[1.01]">
                    Insights that
                    <br />
                    build{" "}
                    <span className="text-gradient-future">authority.</span>
                  </h1>

                  <p className="mt-6 max-w-[30.5rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]">
                    Perspectives on AI, loyalty, retail intelligence, and digital
                    transformation across the GCC and beyond.
                  </p>

                  <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-4 md:mt-12 md:gap-5">
                    <Button
                      href="#blog-topics"
                      variant="primary"
                      className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto sm:px-[1.85rem] sm:py-[0.95rem] sm:text-base md:text-lg"
                    >
                      Explore topics
                    </Button>
                    <Button
                      href="/contact"
                      variant="secondary"
                      className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto sm:px-[1.85rem] sm:py-[0.95rem] sm:text-base md:text-lg"
                    >
                      Talk to us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
    </>
  );
});

export default BlogHeader;
