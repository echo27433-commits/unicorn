import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import CalendlyAssets from "./components/CalendlyAssets";
import SmoothScroll from "./components/SmoothScroll";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "./lib/site";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · AI Services & Digital Transformation`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI services",
    "digital transformation",
    "product engineering",
    "enterprise technology",
    "AI consulting GCC",
    "customer engagement platform",
    "conversational AI",
    "loyalty platform",
    "computer vision retail",
    "Dubai AI company",
  ],
  authors: [{ name: "Unicorn Worldwide Marketing Services" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <CalendlyAssets />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
