import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import { InstagramIcon, TwitterIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

const socials = [
  { label: "Instagram", href: "https://instagram.com/cisdi_id", Icon: InstagramIcon },
  { label: "Twitter", href: "https://twitter.com/CISDI_ID", Icon: TwitterIcon },
  { label: "Facebook", href: "https://www.facebook.com/cisdi", Icon: FacebookIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/center-for-indonesia's-strategic-development-initiatives-cisdi-/posts/?feedView=all",
    Icon: LinkedinIcon,
  },
];

const navPlatform = [
  { label: "Beranda", href: "/" },
  { label: "Onboarding", href: "/program/onboarding" },
  { label: "Learning Space", href: "/belajar" },
];

const navSumber = [
  { label: "PRD", href: "/prd" },
  { label: "Kelola Materi", href: "/admin" },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white/60">
      <div className="h-0.5 bg-gradient-to-r from-red-600 via-red-500/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Image
            src={withBasePath("/cisdi-logo.png")}
            alt="CISDI"
            width={92}
            height={45}
            className="h-7 w-auto"
            unoptimized
          />
          <p className="mt-3 text-sm leading-relaxed text-white/45">
            Platform pembelajaran digital CISDI — onboarding, materi mandiri,
            dan pengembangan SDM dalam satu tempat.
          </p>
          <p className="mt-2 text-xs text-white/25">
            Dikembangkan oleh{" "}
            <span className="text-white/45 font-medium">Tim Knowledge &amp; Learning</span>
          </p>
          <div className="mt-4 flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/35 hover:bg-red-600/20 hover:text-red-400 transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-red-500/80 mb-4">
            Platform
          </p>
          <ul className="space-y-2.5 text-sm">
            {navPlatform.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white hover:translate-x-0.5 inline-block transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sumber */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-red-500/80 mb-4">
            Sumber
          </p>
          <ul className="space-y-2.5 text-sm">
            {navSumber.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white hover:translate-x-0.5 inline-block transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-red-500/80 mb-4">
            Kontak
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="mailto:info@cisdi.org"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-white/30" strokeWidth={2} />
                info@cisdi.org
              </a>
            </li>
            <li>
              <a
                href="mailto:humancapital@cisdi.org"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-white/30" strokeWidth={2} />
                humancapital@cisdi.org
              </a>
            </li>
            <li>
              <a
                href="tel:+62213917590"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-white/30" strokeWidth={2} />
                (+62) 21 3917590
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <p>© {new Date().getFullYear()} CISDI. Seluruh hak cipta dilindungi.</p>
          <p>LMS CISDI &mdash; Program Orientasi Karyawan Baru</p>
        </div>
      </div>
    </footer>
  );
}
