import { forwardRef } from "react";

import Button from "./Button";
import Navbar from "./Navbar";
import PageHeaderBackdrop from "./PageHeaderBackdrop";

const AboutHeader = forwardRef<HTMLElement>(function AboutHeader(_, ref) {
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
                    About Us
                  </p>

                  <h1 className="text-[3.25rem] font-light leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[1.04] md:text-7xl lg:text-8xl xl:text-[6.5rem] xl:leading-[1.01]">
                    Building the future of{" "}
                    <span className="text-gradient-future">enterprise growth.</span>
                  </h1>

                  <p className="mt-6 max-w-[32rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]">
                    Unicorn is a global AI and technology transformation company
                    helping organizations create meaningful customer experiences,
                    unlock operational intelligence, and accelerate digital growth.
                  </p>

                  <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-4 md:mt-12 md:gap-5">
                    <Button
                      href="/contact"
                      variant="primary"
                      className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto sm:px-[1.85rem] sm:py-[0.95rem] sm:text-base md:text-lg"
                    >
                      Book a Call
                    </Button>
                    <Button
                      href="/services"
                      variant="secondary"
                      className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto sm:px-[1.85rem] sm:py-[0.95rem] sm:text-base md:text-lg"
                    >
                      View Our Services
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

export default AboutHeader;
