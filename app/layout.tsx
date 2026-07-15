import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "unicorn",
  description:
    "Build. Scale. Lead the Future. We partner with ambitious businesses to design and deliver digital solutions that spark innovation and accelerate growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
