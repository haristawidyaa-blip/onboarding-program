"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { programDays } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Dashboard", href: "/" },
];

export function Header() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#161616]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/cisdi-logo.png"
            alt="CISDI"
            width={92}
            height={45}
            className="h-8 w-auto"
            priority
          />
          <span className="hidden sm:inline h-5 w-px bg-white/20" aria-hidden />
          <span className="hidden sm:inline text-sm font-medium text-white/70">
            Onboarding
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/85">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setScheduleOpen(true)}
            onMouseLeave={() => setScheduleOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              Jadwal Harian
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {scheduleOpen && (
              <div className="absolute left-0 top-full pt-3 w-64">
                <div className="rounded-xl border border-white/10 bg-[#1e1e1e] p-2 shadow-xl">
                  {programDays.map((day) => (
                    <Link
                      key={day.slug}
                      href={`/hari/${day.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      <span>{day.emoji}</span>
                      <span>
                        Hari {day.dayNumber}: {day.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="mailto:humancapital@cisdi.org"
            className="hover:text-white transition-colors"
          >
            Hubungi Kami
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href={`/hari/${programDays[0].slug}`}
            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
          >
            #SiapOnboarding
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/80"
            aria-label="Buka menu navigasi"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#161616] px-4 sm:px-6 py-4 space-y-3">
          <Link href="/" className="block text-sm font-medium text-white/85" onClick={() => setMobileOpen(false)}>
            Dashboard
          </Link>
          <div>
            <p className="text-xs uppercase tracking-wide text-white/40 mb-1.5">Jadwal Harian</p>
            <div className="space-y-1">
              {programDays.map((day) => (
                <Link
                  key={day.slug}
                  href={`/hari/${day.slug}`}
                  className="block rounded-lg px-2 py-1.5 text-sm text-white/80 hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {day.emoji} Hari {day.dayNumber}: {day.title}
                </Link>
              ))}
            </div>
          </div>
          <a href="mailto:humancapital@cisdi.org" className="block text-sm font-medium text-white/85">
            Hubungi Kami
          </a>
          <Link
            href={`/hari/${programDays[0].slug}`}
            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            #SiapOnboarding
          </Link>
        </div>
      )}
    </header>
  );
}
