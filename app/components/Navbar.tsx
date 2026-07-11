"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "./Button";

const navLinks = [
  { label: "Home", href: "/#home", match: "/" },
  { label: "About", href: "/about", match: "/about" },
  { label: "Services", href: "/#services", match: null },
  { label: "Work", href: "/#work", match: null },
  { label: "Blog", href: "/blog", match: "/blog" },
  { label: "Contact", href: "/contact", match: "/contact" },
];

function ChatIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 w-full px-4 transition-all duration-300 ease-out md:px-8 lg:px-12 ${
        scrolled ? "pt-2 md:pt-2.5" : "pt-5 md:pt-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/25 backdrop-blur-xl transition-all duration-300 ease-out ${
          scrolled
            ? "px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] md:px-6 md:py-2.5"
            : "px-5 py-3.5 md:px-8 md:py-5"
        }`}
      >
        <nav className="flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/Logo 1.png"
              alt="unicorn"
              width={180}
              height={52}
              priority
              className={`w-auto transition-all duration-300 ease-out ${
                scrolled ? "h-7 md:h-8" : "h-10 md:h-12"
              }`}
            />
          </Link>

          <ul
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center font-medium text-white/75 transition-all duration-300 ease-out lg:flex ${
              scrolled ? "gap-6 text-xs xl:text-sm" : "gap-8 text-sm xl:text-base"
            }`}
          >
            {navLinks.map((link) => {
              const active =
                link.match != null &&
                (link.match === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.match));

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`relative transition-colors hover:text-white ${
                      active ? "text-white" : ""
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#ff5f28]" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className={`btn btn--secondary transition-all duration-300 ease-out ${
                scrolled ? "!px-4 !py-2 !text-sm" : ""
              }`}
            >
              <ChatIcon className={scrolled ? "h-3.5 w-3.5" : "h-4 w-4"} />
              Let&apos;s Talk
            </Link>
            <Button
              href="/contact"
              variant="primary"
              className={`transition-all duration-300 ease-out ${
                scrolled ? "!px-4 !py-2 !text-sm" : ""
              }`}
            >
              Book a Call
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 ease-out hover:border-[#ff5f28]/50 hover:bg-[#ff5f28]/10 hover:text-[#ff5f28] lg:hidden ${
              scrolled ? "h-9 w-9" : "h-12 w-12"
            }`}
          >
            <svg
              className={`transition-all duration-300 ${scrolled ? "h-5 w-5" : "h-6 w-6"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {menuOpen ? (
          <div className="mt-4 border-t border-white/10 pt-4 lg:hidden">
            <ul className="flex flex-col gap-4 text-base font-medium text-white">
              {navLinks.map((link) => {
                const active =
                  link.match != null &&
                  (link.match === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.match));

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-2 text-lg transition-colors hover:text-[#ff5f28] ${
                        active ? "text-[#ff5f28]" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn btn--secondary w-full justify-center"
              >
                <ChatIcon />
                Let&apos;s Talk
              </Link>
              <Button href="/contact" variant="primary" className="w-full justify-center">
                Book a Call
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
