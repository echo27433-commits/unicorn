import dynamic from "next/dynamic";

import ScrollHeroCover from "./components/ScrollHeroCover";

const CaseStudy = dynamic(() => import("./components/CaseStudy"), {
  loading: () => <div className="h-[100vh] min-h-[640px] w-full bg-black" aria-hidden />,
});

const LocationCover = dynamic(() => import("./components/LocationCover"), {
  loading: () => <div className="min-h-[50vh] w-full bg-black" aria-hidden />,
});

const BrandsTrust = dynamic(() => import("./components/BrandsTrust"), {
  loading: () => <div className="min-h-[40vh] w-full bg-black" aria-hidden />,
});

const NewsletterCover = dynamic(() => import("./components/NewsletterCover"), {
  loading: () => <div className="min-h-[50vh] w-full bg-black" aria-hidden />,
});

export default function Home() {
  return (
    <div className="bg-black">
      <ScrollHeroCover />
      <CaseStudy />
      {/* Spacer = scroll room for case slides while pinned (pinSpacing false). Do not remove. */}
      <div className="pointer-events-none h-[240vh] w-full bg-black" aria-hidden />
      <LocationCover />
      <BrandsTrust />
      <NewsletterCover />
    </div>
  );
}
