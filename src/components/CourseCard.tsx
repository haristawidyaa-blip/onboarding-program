"use client";

import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

export function CourseCard({
  title,
  description,
  href,
  icon: Icon,
  meta,
  progressPct,
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  meta: string;
  progressPct?: number;
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-3xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-red-300 dark:hover:border-red-500/50 hover:shadow-xl"
    >
      <ArrowUpRight
        className="absolute right-6 top-6 h-4 w-4 text-zinc-300 dark:text-white/20 opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />

      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 transition-transform group-hover:scale-110 group-hover:rotate-6">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>

      <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-zinc-600 dark:text-white/60 leading-relaxed">
        {description}
      </p>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-white/40">
        {meta}
      </p>

      {progressPct !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-white/50 mb-1">
            <span>Progress kamu</span>
            <span className="font-medium text-zinc-700 dark:text-white/70">{progressPct}%</span>
          </div>
          <ProgressBar value={progressPct} total={100} size="sm" />
        </div>
      )}
    </Link>
  );
}
