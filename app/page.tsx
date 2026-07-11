import BrandsTrust from "./components/BrandsTrust";
import CaseStudy from "./components/CaseStudy";
import LocationCover from "./components/LocationCover";
import NewsletterCover from "./components/NewsletterCover";
import ScrollHeroCover from "./components/ScrollHeroCover";

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
