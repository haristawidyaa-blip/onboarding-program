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

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="sm:col-span-1">
          <Image
            src={withBasePath("/cisdi-logo.png")}
            alt="CISDI"
            width={92}
            height={45}
            className="h-7 w-auto"
            unoptimized
          />
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Center for Indonesia&apos;s Strategic Development Initiatives —
            membangun SDM yang sehat, adil, dan setara.
          </p>
          <p className="mt-1.5 text-xs text-white/30">
            Dikembangkan oleh{" "}
            <span className="text-white/50 font-medium">Tim Knowledge &amp; Learning</span>.
          </p>
          <div className="mt-4 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-white/30 hover:text-white/80 transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Navigasi</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/program/onboarding" className="hover:text-white transition-colors">
                Laman Belajar
              </Link>
            </li>
            <li>
              <Link href="/belajar" className="hover:text-white transition-colors">
                Learning Space
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Kontak</p>
          <ul className="space-y-2 text-sm text-white/50">
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
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <a href="mailto:humancapital@cisdi.org" className="hover:text-white transition-colors">
                humancapital@cisdi.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} CISDI. Seluruh hak cipta dilindungi.</p>
          <p>Portal Onboarding Karyawan Baru CISDI</p>
        </div>
      </div>
    </footer>
  );
}
