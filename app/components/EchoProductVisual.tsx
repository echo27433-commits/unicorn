"use client";

import Image from "next/image";

/** Echo wordmark — sized for ~260px CSS width (not 1600px source). */
export function EchoLogo({
  className = "h-24 w-auto object-contain object-left md:h-32 lg:h-40",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/The_Echo_Logo_v2 (2).webp"
      alt="ECHO powered by unicorn"
      width={520}
      height={323}
      sizes="(max-width: 768px) 60vw, 260px"
      quality={70}
      className={className}
    />
  );
}

/** Echo platform laptop preview — sized for ~580px CSS width. */
export function EchoPlatformImage({
  alt = "ECHO platform preview on laptop",
  className = "relative z-[1] h-auto w-full min-h-[280px] object-contain md:min-h-[420px] lg:min-h-[520px]",
  priority = false,
}: {
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/image_1.webp"
      alt={alt}
      width={934}
      height={780}
      sizes="(max-width: 1024px) 90vw, 580px"
      quality={70}
      priority={priority}
      className={className}
    />
  );
}
