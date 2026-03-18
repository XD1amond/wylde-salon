"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/",            label: "Home" },
  { href: "/services",    label: "Services" },
  { href: "/stylists",    label: "Stylists" },
  { href: "/memberships", label: "Memberships" },
  { href: "/reviews",     label: "Reviews" },
  { href: "/booking",     label: "Book Now" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 mx-auto max-w-6xl px-6 pt-4 pb-2">
      <nav className="animate-fade-down flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[color:rgba(255,255,255,0.88)] px-5 py-3 shadow-sm backdrop-blur-md transition-all">
        {/* Logo */}
        <Link
          href="/"
          className="display-font shrink-0 text-xl tracking-wide text-[var(--accent-deep)] transition hover:opacity-75"
        >
          WYLDE SALON
        </Link>

        {/* Desktop nav */}
        <div className="hidden flex-wrap items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const isBook = item.href === "/booking";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isBook
                    ? "ml-2 rounded-full bg-[var(--accent-deep)] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[var(--accent)] hover:shadow-md"
                    : `animated-underline px-2 py-1 text-sm transition-colors ${
                        active
                          ? "font-semibold text-[var(--accent-deep)]"
                          : "text-[var(--text-muted)] hover:text-[var(--accent-deep)]"
                      }`
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-[var(--foreground)] transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[var(--foreground)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[var(--foreground)] transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="animate-fade-down mt-2 rounded-2xl border border-[var(--line)] bg-white/95 p-4 shadow-lg backdrop-blur-md md:hidden">
          {navItems.map((item) => {
            const isBook = item.href === "/booking";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={
                  isBook
                    ? "mt-2 block rounded-xl bg-[var(--accent-deep)] px-4 py-2.5 text-center text-sm font-semibold text-white"
                    : "block border-b border-[var(--line)] py-2.5 text-sm text-[var(--foreground)] last:border-none"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
