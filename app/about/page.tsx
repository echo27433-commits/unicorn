import AboutHeader from "../components/AboutHeader";
import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import AboutPageClient from "./pageClient";

export const metadata = {
  title: "About Us · unicorn",
  description:
    "Unicorn is a global AI and technology transformation company helping organizations create meaningful customer experiences, unlock operational intelligence, and accelerate digital growth.",
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
