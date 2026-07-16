import { notFound } from "next/navigation";

import DeferredNewsletterCover from "../../components/DeferredNewsletterCover";
import { getAllWorkSlugs, getWorkCaseBySlug } from "../../lib/work";
import WorkDetailClient from "./pageClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const study = getWorkCaseBySlug(slug);
  if (!study) return { title: "Work · unicorn" };

  return {
    title: `${study.name} · Work · unicorn`,
    description: `${study.headline}, ${study.summary}`,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getWorkCaseBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <WorkDetailClient study={study} />
      <DeferredNewsletterCover />
    </>
  );
}
