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
      description="unicorn is a global AI and technology transformation company helping enterprises deliver digital transformation, product engineering, and AI-led customer experiences across the GCC."
      primaryCta={{ href: "/contact", label: "Speak with our team" }}
      secondaryCta={{ href: "/services", label: "View Our Services" }}
    />
  );
});

export default AboutHeader;
