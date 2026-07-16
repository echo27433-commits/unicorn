import { forwardRef } from "react";

import PageHeroHeader from "./PageHeroHeader";

const regions = ["UAE", "Saudi Arabia", "Bahrain", "Qatar", "India"];

const ContactHeader = forwardRef<HTMLElement>(function ContactHeader(_, ref) {
  return (
    <PageHeroHeader
      ref={ref}
      eyebrow="Contact Us"
      title={
        <>
          Let&apos;s build
          <br />
          what&apos;s <span className="text-gradient-future">next.</span>
        </>
      }
      description="Tell us about your project, challenge, or ambition. Our team across the region is ready to help you design, ship, and scale."
      descriptionClassName="mt-6 max-w-[30.5rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]"
      primaryCta={{ href: "#contact-form", label: "Send a message" }}
      secondaryCta={{
        href: "mailto:hello@theunicorn.global",
        label: "Email us",
      }}
      afterCtas={
        <div className="mt-8 flex flex-wrap gap-2 sm:gap-2 md:mt-12">
          {regions.map((region) => (
            <span
              key={region}
              className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[0.65rem] text-white/60 sm:px-3.5 sm:py-1.5 sm:text-xs md:text-sm"
            >
              {region}
            </span>
          ))}
        </div>
      }
    />
  );
});

export default ContactHeader;
