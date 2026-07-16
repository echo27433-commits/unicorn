import { forwardRef } from "react";

import PageHeroHeader from "./PageHeroHeader";

const ServicesHeader = forwardRef<HTMLElement>(function ServicesHeader(_, ref) {
  return (
    <PageHeroHeader
      ref={ref}
      eyebrow="Services"
      title={
        <>
          Expertise that{" "}
          <span className="text-gradient-future">drives growth.</span>
        </>
      }
      description="AI & data intelligence and digital growth services that turn strategy into measurable outcomes."
      primaryCta={{ href: "/contact", label: "Book a Call" }}
      secondaryCta={{ href: "#services", label: "Explore Services" }}
    />
  );
});

export default ServicesHeader;
