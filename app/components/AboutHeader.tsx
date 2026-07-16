import { forwardRef } from "react";

import PageHeroHeader from "./PageHeroHeader";

const AboutHeader = forwardRef<HTMLElement>(function AboutHeader(_, ref) {
  return (
    <PageHeroHeader
      ref={ref}
      eyebrow="About Us"
      title={
        <>
          Building the future of{" "}
          <span className="text-gradient-future">enterprise growth.</span>
        </>
      }
      description="Unicorn is a global AI and technology transformation company helping organizations create meaningful customer experiences, unlock operational intelligence, and accelerate digital growth."
      primaryCta={{ href: "/contact", label: "Book a Call" }}
      secondaryCta={{ href: "/services", label: "View Our Services" }}
    />
  );
});

export default AboutHeader;
