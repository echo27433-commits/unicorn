"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { getButtonClass } from "./Button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 pt-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md md:px-8 md:py-5">
        <nav className="flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/Logo 1.png"
              alt="unicorn"
              width={180}
              height={52}
              priority
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <ul className="hidden items-center gap-2 text-base font-medium text-white lg:flex xl:text-lg">
            {navLinks.map((link, index) => (
              <li key={link.label} className="flex items-center">
                {index > 0 && <span className="mx-4 text-lg text-white/30 xl:mx-5">/</span>}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[#FFAA00]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="#contact"
              className={`${getButtonClass("secondary")} !px-6 !py-3 text-sm md:text-base`}
            >
              Contact
            </Link>
            <Link
              href="#contact"
              className={`${getButtonClass("primary")} !px-6 !py-3 text-sm md:text-base`}
            >
              Book a Call
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-200 hover:border-[#FFAA00]/50 hover:bg-[#FFAA00]/10 hover:text-[#FFAA00] lg:hidden"
          >
            <svg
              className="h-6 w-6"
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

        {menuOpen && (
          <div className="mt-4 border-t border-white/10 pt-4 lg:hidden">
            <ul className="flex flex-col gap-4 text-base font-medium text-white">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-lg transition-colors hover:text-[#FFAA00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={`${getButtonClass("secondary")} !px-6 !py-3 text-base`}
              >
                Contact
              </Link>
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={`${getButtonClass("primary")} !px-6 !py-3 text-base`}
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
