import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({
  items,
  variant = "auto",
}: {
  items: BreadcrumbItem[];
  variant?: "auto" | "on-dark";
}) {
  const muted =
    variant === "on-dark"
      ? "text-white/50 hover:text-white/80"
      : "text-zinc-400 hover:text-zinc-700 dark:text-white/50 dark:hover:text-white/80";
  const sep =
    variant === "on-dark" ? "text-white/25" : "text-zinc-300 dark:text-white/25";
  const current =
    variant === "on-dark"
      ? "font-semibold text-white"
      : "font-semibold text-zinc-800 dark:text-white";

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm flex-wrap">
      <Link href="/" aria-label="Beranda" className={`transition-colors shrink-0 ${muted}`}>
        <Home className="h-3.5 w-3.5" strokeWidth={2} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 min-w-0">
          <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${sep}`} strokeWidth={2} />
          {item.href ? (
            <Link href={item.href} className={`transition-colors truncate ${muted}`}>
              {item.label}
            </Link>
          ) : (
            <span className={`truncate ${current}`}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
