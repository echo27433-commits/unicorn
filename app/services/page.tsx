import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import PageMotionRoot from "../components/PageMotionRoot";
import ServicesHeader from "../components/ServicesHeader";
import ServicesPageClient from "./pageClient";

export const metadata = {
  title: "Services · unicorn",
  description:
    "AI, data intelligence & digital growth services that turn strategy into measurable outcomes.",
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
