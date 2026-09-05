"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/seo/site";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#doctor", label: "About" },
  { href: "/#process", label: "What to Expect" },
  { href: "/#location", label: "Location" },
  { href: "/#faq", label: "FAQs" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-3.5">
        <Link
          href="/"
          className="font-display text-lg text-cream-50 sm:text-xl"
        >
          {siteConfig.doctorName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-cream-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/appointment" variant="primary" size="md">
            Book an Appointment
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream-50 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <div className="relative h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform",
                open && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </div>
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-ink-950 lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cream-50"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/appointment" variant="primary" size="md" className="mt-3">
              Book an Appointment
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
