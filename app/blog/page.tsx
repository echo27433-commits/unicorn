import BlogHeader from "../components/BlogHeader";
import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import PageMotionRoot from "../components/PageMotionRoot";
import BlogPageClient from "./pageClient";

export const metadata = {
  title: "Blogs",
  description:
    "Thought leadership on AI services, conversational AI, computer vision, loyalty, and digital transformation for enterprise teams across the GCC.",
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
