import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
];

const workLinks = [
  { label: "Use Cases", href: "/work" },
  { label: "Locations", href: "/#locations" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-black font-sans">
      <div className="relative mx-auto w-full max-w-[90rem] px-4 pt-16 md:px-8 md:pt-20 lg:px-12 lg:pt-24">
        {/* Top: blurb + link columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <p className="max-w-md text-sm leading-relaxed text-white/70 md:text-base lg:max-w-sm">
            unicorn is the AI and technology partner built for ambitious brands
            that want to design, ship, and scale digital products with measurable
            impact.
          </p>

          <div className="flex flex-wrap gap-12 sm:gap-16 md:gap-24">
            <div>
              <p className="text-sm font-semibold text-white">unicorn</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Company</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {workLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Middle: social + CTA */}
        <div className="mt-14 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <a
            href="https://www.linkedin.com/company/theunicornglobal/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm text-white transition-colors hover:text-[#ff5f28]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:bg-[#ff5f28] group-hover:text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </span>
            Follow us on LinkedIn
          </a>

          <div className="flex w-full max-w-xl flex-col items-stretch gap-4 rounded-2xl border border-[#ff5f28]/45 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:rounded-full sm:py-3 sm:pl-5 sm:pr-3">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Image
                src="/Logo 1.webp"
                alt="unicorn"
                width={140}
                height={40}
                sizes="140px"
                className="h-7 w-auto shrink-0 object-contain sm:h-8"
              />
              <p className="text-sm font-medium text-white md:text-base">
                Ready to See unicorn in Action?
              </p>
            </div>

            <Link
              href="/contact"
              className="btn btn--primary group inline-flex shrink-0 items-center justify-center gap-2 !rounded-full px-5 py-2.5 text-sm"
            >
              Book a Demo
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#ff5f28] transition-transform duration-200 group-hover:translate-x-0.5">
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Taglines */}
        <div className="mt-16 flex flex-col gap-2 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 md:text-xs">
            Intelligence that compounds
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 md:text-xs">
            AI native from day one
          </p>
        </div>
      </div>

      {/* Oversized brand logo */}
      <div className="relative mt-8 w-full px-4 pb-10 md:mt-10 md:px-8 md:pb-14 lg:px-12">
        <Image
          src="/Unicorn.svg"
          alt="unicorn"
          width={1600}
          height={320}
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="mx-auto h-auto w-full max-w-[90rem] object-contain"
        />
      </div>
    </footer>
  );
}
