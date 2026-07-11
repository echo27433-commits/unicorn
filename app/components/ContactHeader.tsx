import { forwardRef } from "react";

import Button from "./Button";
import LineWaves from "./LineWaves";
import Navbar from "./Navbar";

const regions = ["UAE", "Saudi Arabia", "Bahrain", "Qatar", "India"];

const ContactHeader = forwardRef<HTMLElement>(function ContactHeader(_, ref) {
  return (
    <>
      <Navbar />

      <header
        ref={ref}
        className="relative z-0 flex min-h-[78vh] flex-col overflow-hidden bg-black will-change-transform md:min-h-[85vh]"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.85) 64%, black 76%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.85) 64%, black 76%, black 100%)",
          }}
        >
          <LineWaves
            speed={0.14}
            innerLineCount={40}
            outerLineCount={48}
            warpIntensity={1.15}
            rotation={-38}
            edgeFadeWidth={0.08}
            colorCycleSpeed={0.55}
            brightness={0.62}
            color1="#ff5f28"
            color2="#ffc49a"
            color3="#ff3a00"
            enableMouseInteraction={false}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, #000000 40%, rgba(0,0,0,0.97) 48%, rgba(0,0,0,0.88) 54%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.52) 66%, rgba(0,0,0,0.32) 72%, rgba(0,0,0,0.16) 78%, rgba(0,0,0,0.06) 84%, transparent 92%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen opacity-50"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, transparent 46%, rgba(255,95,40,0.03) 54%, rgba(255,95,40,0.07) 64%, rgba(255,95,40,0.1) 72%, rgba(255,95,40,0.06) 80%, transparent 90%)",
          }}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[50%] bg-[radial-gradient(ellipse_85%_80%_at_90%_50%,rgba(255,95,40,0.2),transparent_75%)]" />

        <div className="relative z-10 flex flex-1 flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          <section className="relative flex flex-1 flex-col px-4 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44 lg:px-12 lg:pt-48">
            <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
              <div className="relative max-w-4xl lg:max-w-5xl">
                <div
                  className="pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 md:-inset-x-12 md:-inset-y-14"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 65% at 30% 40%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 45%, transparent 75%)",
                  }}
                  aria-hidden
                />

                <div className="relative z-[1]">
                  <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5f28] md:mb-6 md:text-sm">
                    <span aria-hidden>✦</span>
                    Contact Us
                  </p>

                  <h1 className="text-6xl font-light leading-[1.04] tracking-tight text-white md:text-7xl lg:text-8xl xl:text-[6.5rem] xl:leading-[1.01]">
                    Let&apos;s build
                    <br />
                    what&apos;s{" "}
                    <span className="text-gradient-future">next.</span>
                  </h1>

                  <p className="mt-6 max-w-[30.5rem] text-sm leading-relaxed text-white/55 md:mt-7 md:text-[0.95rem]">
                    Tell us about your project, challenge, or ambition — our
                    team across the region is ready to help you design, ship,
                    and scale.
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
                    <Button href="#contact-form" variant="primary" className="md:text-lg">
                      Send a message
                    </Button>
                    <Button
                      href="mailto:hello@theunicorn.global"
                      variant="secondary"
                      className="md:text-lg"
                    >
                      Email us
                    </Button>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2 md:mt-12">
                    {regions.map((region) => (
                      <span
                        key={region}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/60 md:text-sm"
                      >
                        {region}
                      </span>
                    ))}
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

export default ContactHeader;
