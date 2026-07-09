"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Button from "./Button";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-5 md:px-8 md:pt-5 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 backdrop-blur-md md:px-8 md:py-5">
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

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-white/75 lg:flex xl:text-base">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative transition-colors hover:text-white ${
                    link.active ? "text-white" : ""
                  }`}
                >
                  {link.label}
                  {link.active ? (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#ff5f28]" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="#contact" variant="secondary">
              Contact
            </Button>
            <Button href="#contact" variant="primary">
              Book a Call
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-200 hover:border-[#ff5f28]/50 hover:bg-[#ff5f28]/10 hover:text-[#ff5f28] lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 text-lg transition-colors hover:text-[#ff5f28] ${
                      link.active ? "text-[#ff5f28]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="#contact" variant="secondary" className="w-full justify-center">
                Contact
              </Button>
              <Button href="#contact" variant="primary" className="w-full justify-center">
                Book a Call
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
