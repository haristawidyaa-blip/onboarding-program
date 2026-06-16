"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import { clearAuthed } from "@/lib/auth";
import { ThemeToggle } from "./ThemeToggle";
import { GlobalSearch } from "./GlobalSearch";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Onboarding", href: "/program/onboarding" },
  { label: "Learning Space", href: "/belajar" },
];

export function Header() {
  const router = useRouter();
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
            Laman Belajar
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/85">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <GlobalSearch />
          <ThemeToggle />
          <button
            onClick={handleLogout}
            aria-label="Keluar"
            title="Keluar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <GlobalSearch />
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-white/85"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
