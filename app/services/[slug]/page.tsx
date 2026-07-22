import { notFound } from "next/navigation";

import DeferredNewsletterCover from "../../components/DeferredNewsletterCover";
import { getAllServiceSlugs, getServiceBySlug } from "../../lib/services";
import ServiceDetailClient from "./pageClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Services" };

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceDetailClient service={service} />
      <DeferredNewsletterCover />
    </>
  );
}
