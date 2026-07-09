"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className="relative w-full overflow-hidden"
    >
      <div className="relative min-h-[70vh] md:min-h-[75vh] lg:min-h-[85vh]">
        <Image
          src="/case.png"
          alt="Analyst reviewing data on a laptop"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-24 md:min-h-[75vh] md:px-8 md:pb-16 lg:min-h-[85vh] lg:px-10 lg:pb-20">
          <div
            className={`max-w-2xl transition-all duration-1000 ${
              visible ? "animate-fade-in-left opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="text-base font-medium text-white/90 md:text-lg">
              Case Study
            </p>

            <h2
              className={`text-glow-white mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl ${
                visible ? "animate-fade-up opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ animationDelay: "120ms" }}
            >
              Improving Safety in Life Sciences with AI
            </h2>

            <p
              className={`text-glow-muted mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg lg:text-xl ${
                visible ? "animate-fade-up opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ animationDelay: "240ms" }}
            >
              Our teams of technologists, strategists and designers deliver
              powerful digital experiences.
            </p>

            <div
              className={visible ? "animate-fade-up opacity-100" : "translate-y-4 opacity-0"}
              style={{ animationDelay: "380ms" }}
            >
              <Button href="#contact" variant="outline" className="mt-10 md:mt-12 md:text-lg">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
