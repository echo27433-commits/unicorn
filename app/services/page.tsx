import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import PageMotionRoot from "../components/PageMotionRoot";
import ServicesHeader from "../components/ServicesHeader";
import ServicesPageClient from "./pageClient";

export const metadata = {
  title: "Services",
  description:
    "Enterprise AI services and digital growth capabilities — AI vision, analytics, predictive insights, acquisition, and content systems that turn strategy into measurable outcomes.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      <ServicesHeader />
      <PageMotionRoot>
        <ServicesPageClient />
      </PageMotionRoot>
      <DeferredNewsletterCover />
    </div>
  );
}
