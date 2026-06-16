import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { programDays } from "@/lib/data";
import { withBasePath } from "@/lib/basePath";
import { InstagramIcon, TwitterIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

const socials = [
  { label: "Instagram", href: "https://instagram.com/cisdi_id", Icon: InstagramIcon },
  { label: "Twitter", href: "https://twitter.com/CISDI_ID", Icon: TwitterIcon },
  { label: "Facebook", href: "https://facebook.com/cisdi.id", Icon: FacebookIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/cisdi", Icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <Image
            src={withBasePath("/cisdi-logo.png")}
            alt="CISDI"
            width={92}
            height={45}
            className="h-8 w-auto"
            unoptimized
          />
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Center for Indonesia&apos;s Strategic Development Initiatives.
            Program Orientasi Karyawan Baru — dikembangkan oleh Tim Human
            Capital &amp; Learning Development.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-red-500 hover:text-red-500 transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Jadwal Harian</p>
          <ul className="space-y-2 text-sm">
            {programDays.map((day) => (
              <li key={day.slug}>
                <Link href={`/hari/${day.slug}`} className="hover:text-white transition-colors">
                  Hari {day.dayNumber}: {day.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Bantuan</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:humancapital@cisdi.org"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                Hubungi Tim Human Capital
              </a>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Kembali ke Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Info Kontak</p>
          <ul className="space-y-2 text-sm text-white/50">
            <li className="flex items-start gap-1.5">
              <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" strokeWidth={2} />
              Jl. Tebet Barat Dalam VIII No.12, Jakarta Selatan
            </li>
            <li>
              <a
                href="mailto:info@cisdi.org"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                info@cisdi.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} CISDI. Seluruh hak cipta dilindungi.</p>
          <p>Dibuat untuk program Onboarding Karyawan Baru CISDI</p>
        </div>
      </div>
    </footer>
  );
}
