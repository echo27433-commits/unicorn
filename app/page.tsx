import dynamic from "next/dynamic";
import type { Metadata } from "next";

import DeferredNewsletterCover from "./components/DeferredNewsletterCover";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "./lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} · AI Services, Digital Transformation & Enterprise Technology`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

const ScrollHeroCover = dynamic(() => import("./components/ScrollHeroCover"), {
  loading: () => (
    <div className="min-h-[100svh] w-full bg-black" aria-hidden />
  ),
});

const ReviewsCover = dynamic(() => import("./components/ReviewsCover"), {
  loading: () => (
    <div className="min-h-[50vh] w-full bg-[#f7f7f7]" aria-hidden />
  ),
});

const OurLocation = dynamic(() => import("./components/OurLocation"), {
  loading: () => <div className="min-h-[50vh] w-full bg-black" aria-hidden />,
});

export default function Home() {
  return (
    <div className="bg-black">
      <ScrollHeroCover />
      <ReviewsCover />
      <OurLocation />
      <DeferredNewsletterCover />
    </div>
  );
}
