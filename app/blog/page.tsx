import BlogHeader from "../components/BlogHeader";
import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import PageMotionRoot from "../components/PageMotionRoot";
import BlogPageClient from "./pageClient";

export const metadata = {
  title: "Blog · unicorn",
  description:
    "Insights on AI powered loyalty, conversational AI, computer vision, and digital transformation across the GCC.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black">
      <BlogHeader />
      <PageMotionRoot refreshDelayMs={200}>
        <BlogPageClient />
      </PageMotionRoot>
      <DeferredNewsletterCover />
    </div>
  );
}
