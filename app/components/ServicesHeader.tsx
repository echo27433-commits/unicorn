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
      description="AI services, data intelligence, and digital growth capabilities that turn strategy into measurable enterprise outcomes."
      primaryCta={{ href: "/contact", label: "Speak with our team" }}
      secondaryCta={{ href: "#services", label: "Explore Services" }}
    />
  );
});

export default ServicesHeader;
