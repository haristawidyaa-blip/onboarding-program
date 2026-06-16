"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ProgramDay } from "@/lib/types";
import { dayIconMap } from "@/lib/dayIcons";
import { ProgressBar } from "./ProgressBar";

export function DayCard({
  day,
  doneCount,
  totalCount,
}: {
  day: ProgramDay;
  doneCount: number;
  totalCount: number;
}) {
  const isComplete = totalCount > 0 && doneCount === totalCount;
  const Icon = dayIconMap[day.icon];

  return (
    <Link
      href={`/hari/${day.slug}`}
      className="group block rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm hover:border-red-300 dark:hover:border-red-500/50 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
            Hari {day.dayNumber}
          </span>
        </div>
        {isComplete && (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
            <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
            Selesai
          </span>
        )}
      </div>

      <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400">
        {day.title}
      </h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-white/50 line-clamp-2">{day.intro}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-white/50 mb-1">
          <span>
            {doneCount}/{totalCount} task
          </span>
        </div>
        <ProgressBar value={doneCount} total={totalCount} size="sm" />
      </div>
    </Link>
  );
}
