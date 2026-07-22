import { forwardRef } from "react";

import PageHeroHeader from "./PageHeroHeader";

const ProductsHeader = forwardRef<HTMLElement>(function ProductsHeader(_, ref) {
  return (
    <PageHeroHeader
      ref={ref}
      eyebrow="Our Platform"
      title={
        <>
          One ecosystem.{" "}
          <span className="text-gradient-future">Endless possibilities.</span>
        </>
      }
      description="Echo is our enterprise AI engagement platform — loyalty, omnichannel messaging, and conversational AI engineered for digital transformation at scale."
      descriptionClassName="mt-6 max-w-[34rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]"
      titleClassName="text-[3.25rem] font-light leading-[1.06] tracking-tight text-white sm:text-5xl sm:leading-[1.04] md:text-7xl lg:text-8xl xl:text-[6rem] xl:leading-[1.01]"
      primaryCta={{ href: "/contact", label: "Speak with our team" }}
      secondaryCta={{ href: "#modules", label: "Explore Modules" }}
    />
  );
});

export default ProductsHeader;
