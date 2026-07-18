import { forwardRef } from "react";

import PageHeroHeader from "./PageHeroHeader";

const BlogHeader = forwardRef<HTMLElement>(function BlogHeader(_, ref) {
  return (
    <PageHeroHeader
      ref={ref}
      eyebrow="Blog"
      title={
        <>
          Insights that
          <br />
          build <span className="text-gradient-future">authority.</span>
        </>
      }
      description="Perspectives on AI, loyalty, retail intelligence, and digital transformation across the GCC and beyond."
      descriptionClassName="mt-6 max-w-[30.5rem] text-[0.875rem] leading-relaxed text-white/55 sm:mt-5 sm:text-sm md:mt-7 md:text-[0.95rem]"
      primaryCta={{ href: "#blog-topics", label: "Explore topics" }}
      secondaryCta={{ href: "/contact", label: "Speak with our team" }}
    />
  );
});

export default BlogHeader;
