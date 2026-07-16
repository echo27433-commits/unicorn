import { forwardRef } from "react";

import PageHeroHeader from "./PageHeroHeader";

const WorkHeader = forwardRef<HTMLElement>(function WorkHeader(_, ref) {
  return (
    <PageHeroHeader
      ref={ref}
      eyebrow="Customer Success Stories"
      title={
        <>
          Real Results,{" "}
          <span className="text-gradient-future">Real Impact.</span>
        </>
      }
      description="See how leading brands across industries leverage Echo to transform customer engagement, boost loyalty, and drive measurable growth."
      descriptionClassName="mt-6 max-w-[34rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]"
      primaryCta={{ href: "/contact", label: "Book a Call" }}
      secondaryCta={{ href: "#cases", label: "View Case Studies" }}
    />
  );
});

export default WorkHeader;
