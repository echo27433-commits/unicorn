import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import PageLoader from "./components/PageLoader";
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

/** Multilingual greetings — duplicated for a seamless CSS loop. */
const hellos = [
  "Hallo",
  "مرحبا",
  "안녕",
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "こんにちは",
  "नमस्ते",
  "Olá",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <div
          id="boot-loader"
          className="boot-loader"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="boot-loader__glow boot-loader__glow--bl" aria-hidden />
          <div className="boot-loader__glow boot-loader__glow--tr" aria-hidden />
          <div className="boot-loader__viewport">
            <div className="boot-loader__track">
              {[...hellos, ...hellos].map((word, i) => (
                <span key={`${word}-${i}`} className="boot-loader__word">
                  {word}
                </span>
              ))}
            </div>
          </div>
          <span className="sr-only">Loading</span>
        </div>
        <SmoothScroll>
          <PageLoader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
