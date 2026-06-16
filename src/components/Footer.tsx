import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { programDays } from "@/lib/data";
import { withBasePath } from "@/lib/basePath";
import { InstagramIcon, TwitterIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

const socials = [
  { label: "Instagram", handle: "cisdi_id", href: "https://instagram.com/cisdi_id", Icon: InstagramIcon },
  { label: "Twitter", handle: "@CISDI_ID", href: "https://twitter.com/CISDI_ID", Icon: TwitterIcon },
  { label: "Facebook", handle: "CISDI", href: "https://www.facebook.com/cisdi", Icon: FacebookIcon },
  {
    label: "LinkedIn",
    handle: "CISDI",
    href: "https://www.linkedin.com/company/center-for-indonesia's-strategic-development-initiatives-cisdi-/posts/?feedView=all",
    Icon: LinkedinIcon,
  },
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
          <ul className="space-y-2.5 text-sm text-white/50">
            <li className="flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" strokeWidth={2} />
              Jl. Probolinggo No. 40C RT.01/02, Kel. Gondangdia, Kec. Menteng, Jakarta Pusat, DKI Jakarta 10350
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <a href="tel:+62213917590" className="hover:text-white transition-colors">
                (+62) 21 3917590
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <a href="mailto:info@cisdi.org" className="hover:text-white transition-colors">
                info@cisdi.org
              </a>
            </li>
          </ul>

          <p className="text-sm font-semibold text-white mt-6 mb-3">Terhubung dengan CISDI</p>
          <ul className="space-y-2.5 text-sm text-white/50">
            {socials.map(({ label, handle, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {handle}
                </a>
              </li>
            ))}
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
