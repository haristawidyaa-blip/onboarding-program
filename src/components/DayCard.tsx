"use client";

import Link from "next/link";
import { ProgramDay } from "@/lib/types";
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

  return (
    <Link
      href={`/hari/${day.slug}`}
      className="group block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 hover:border-red-300 dark:hover:border-red-500/50 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{day.emoji}</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
            Hari {day.dayNumber}
          </span>
        </div>
        {isComplete && (
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
            Selesai
          </span>
        )}
      </div>

      <h3 className="mt-2 font-semibold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400">
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
