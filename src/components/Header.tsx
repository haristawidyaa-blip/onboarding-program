"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, Mail, LogOut } from "lucide-react";
import { programDays } from "@/lib/data";
import { dayIconMap } from "@/lib/dayIcons";
import { withBasePath } from "@/lib/basePath";
import { clearAuthed } from "@/lib/auth";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [{ label: "Dashboard", href: "/" }];

export function Header() {
  const router = useRouter();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    clearAuthed();
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#161616]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={withBasePath("/cisdi-logo.png")}
            alt="CISDI"
            width={92}
            height={45}
            className="h-8 w-auto"
            unoptimized
            priority
          />
          <span className="hidden sm:inline h-5 w-px bg-white/15" aria-hidden />
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
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            {scheduleOpen && (
              <div className="absolute left-0 top-full pt-3 w-72">
                <div className="rounded-2xl border border-white/10 bg-[#1e1e1e]/95 backdrop-blur-xl p-2 shadow-2xl">
                  {programDays.map((day) => {
                    const Icon = dayIconMap[day.icon];
                    return (
                      <Link
                        key={day.slug}
                        href={`/hari/${day.slug}`}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span>
                          Hari {day.dayNumber}: {day.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <a href="mailto:humancapital@cisdi.org" className="hover:text-white transition-colors">
            Hubungi Kami
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            aria-label="Keluar"
            title="Keluar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
          </button>
          <Link
            href={`/hari/${programDays[0].slug}`}
            className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
          >
            #SiapOnboarding
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            aria-label="Keluar"
            title="Keluar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80"
            aria-label="Buka menu navigasi"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu className="h-4.5 w-4.5" strokeWidth={2} />
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
              {programDays.map((day) => {
                const Icon = dayIconMap[day.icon];
                return (
                  <Link
                    key={day.slug}
                    href={`/hari/${day.slug}`}
                    className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm text-white/80 hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                      <Icon className="h-3 w-3" strokeWidth={2} />
                    </span>
                    Hari {day.dayNumber}: {day.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <a
            href="mailto:humancapital@cisdi.org"
            className="flex items-center gap-2 text-sm font-medium text-white/85"
          >
            <Mail className="h-4 w-4" strokeWidth={2} />
            Hubungi Kami
          </a>
          <Link
            href={`/hari/${programDays[0].slug}`}
            className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            #SiapOnboarding
          </Link>
        </div>
      )}
    </header>
  );
}
