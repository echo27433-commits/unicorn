import ContactHeader from "../components/ContactHeader";
import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import ContactPageClient from "./pageClient";

export const metadata = {
  title: "Contact",
  description:
    "Speak with unicorn about AI services, digital transformation, and enterprise product engineering. HQ in Dubai, UAE — with teams across Saudi Arabia, Bahrain, Qatar, and India.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <ContactHeader />
      <ContactPageClient />
      <DeferredNewsletterCover />
    </div>
  );
}
