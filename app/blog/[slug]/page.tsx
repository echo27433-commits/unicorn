import { notFound } from "next/navigation";

import DeferredNewsletterCover from "../../components/DeferredNewsletterCover";
import { getAllBlogSlugs, getBlogPostBySlug } from "../../lib/blog";
import BlogDetailClient from "./pageClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blogs" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <BlogDetailClient post={post} />
      <DeferredNewsletterCover />
    </>
  );
}
