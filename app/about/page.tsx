import AboutHeader from "../components/AboutHeader";
import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import AboutPageClient from "./pageClient";

export const metadata = {
  title: "About Us",
  description:
    "unicorn is a global AI and technology transformation company. We help enterprises across the GCC deliver digital transformation, product engineering, and AI-led customer experiences.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-black">
      <AboutHeader />
      <AboutPageClient />
      <DeferredNewsletterCover />
    </div>
  );
}
