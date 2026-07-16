import dynamic from "next/dynamic";

import DeferredNewsletterCover from "./components/DeferredNewsletterCover";

const ScrollHeroCover = dynamic(() => import("./components/ScrollHeroCover"), {
  loading: () => (
    <div className="min-h-[100svh] w-full bg-black" aria-hidden />
  ),
});

const BrandsCover = dynamic(() => import("./components/BrandsCover"), {
  loading: () => <div className="min-h-[40vh] w-full bg-black" aria-hidden />,
});

const CaseStudy = dynamic(() => import("./components/CaseStudy"), {
  loading: () => (
    <div className="h-[100svh] min-h-[720px] w-full bg-black" aria-hidden />
  ),
});

const ReviewsCover = dynamic(() => import("./components/ReviewsCover"), {
  loading: () => (
    <div className="min-h-[50vh] w-full bg-[#f7f7f7]" aria-hidden />
  ),
});

const OurLocation = dynamic(() => import("./components/OurLocation"), {
  loading: () => <div className="min-h-[50vh] w-full bg-black" aria-hidden />,
});

export default function Home() {
  return (
    <div className="bg-black">
      {/* Hero (black) ← Products (white) overlay */}
      <ScrollHeroCover />
      {/* Products (white) ← Brands (black) overlay */}
      <BrandsCover />
      {/* Use cases (black) */}
      <CaseStudy />
      {/* Spacer = scroll room for case slides while pinned (pinSpacing false). Do not remove. */}
      <div className="pointer-events-none h-[240vh] w-full bg-black" aria-hidden />
      {/* Reviews (white) slides over Use cases (black) */}
      <ReviewsCover />
      {/* Location (black) — after reviews */}
      <OurLocation />
      <DeferredNewsletterCover />
    </div>
  );
}
