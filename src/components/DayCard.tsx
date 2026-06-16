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
      className="group block rounded-2xl border border-zinc-200 bg-white p-5 hover:border-emerald-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{day.emoji}</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Hari {day.dayNumber}
          </span>
        </div>
        {isComplete && (
          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-medium text-white">
            Selesai
          </span>
        )}
      </div>

      <h3 className="mt-2 font-semibold text-zinc-900 group-hover:text-emerald-700">
        {day.title}
      </h3>
      <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{day.intro}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
          <span>
            {doneCount}/{totalCount} task
          </span>
        </div>
        <ProgressBar value={doneCount} total={totalCount} size="sm" />
      </div>
    </Link>
  );
}
