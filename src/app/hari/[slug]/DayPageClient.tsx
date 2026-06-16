"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgramDay } from "@/lib/types";
import { programDays } from "@/lib/data";
import { dayIconMap } from "@/lib/dayIcons";
import { useProgress } from "@/lib/useProgress";

export function DayPageClient({
  day,
  dayIndex,
}: {
  day: ProgramDay;
  dayIndex: number;
}) {
  const { isDone, toggleTask, hydrated } = useProgress();

  const allTasks = day.sections.flatMap((sec) => sec.tasks);
  const doneCount = hydrated ? allTasks.filter((t) => isDone(t.id)).length : 0;

  const prevDay = programDays[dayIndex - 1];
  const nextDay = programDays[dayIndex + 1];
  const Icon = dayIconMap[day.icon];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <Breadcrumbs
            items={[
              { label: "Onboarding", href: "/program/onboarding" },
              { label: `Hari ${day.dayNumber}: ${day.title}` },
            ]}
          />

          <div className="mt-4 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
                Hari {day.dayNumber} dari {programDays.length}
              </span>
            </div>
            <h1 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {day.title}
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/60">{day.intro}</p>

            {day.note && (
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" strokeWidth={2} />
                {day.note}
              </p>
            )}

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm mb-1.5 text-zinc-600 dark:text-white/60">
                <span>Progress hari ini</span>
                <span className="font-medium">
                  {doneCount}/{allTasks.length} task
                </span>
              </div>
              <ProgressBar value={doneCount} total={allTasks.length} />
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {day.sections.map((section) => (
              <div key={section.id}>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      done={hydrated && isDone(task.id)}
                      onToggle={() => toggleTask(task.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {day.closingQuote && (
            <blockquote className="mt-8 rounded-3xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 p-5 text-sm italic text-red-800 dark:text-red-300">
              “{day.closingQuote}”
            </blockquote>
          )}

          <div className="mt-10 flex items-center justify-between">
            {prevDay ? (
              <Link
                href={`/hari/${prevDay.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-white/60 hover:text-red-600 dark:hover:text-red-500"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                {prevDay.title}
              </Link>
            ) : (
              <span />
            )}
            {nextDay ? (
              <Link
                href={`/hari/${nextDay.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline"
              >
                {nextDay.title}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            ) : (
              <Link
                href="/program/onboarding"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline"
              >
                Kembali ke Dashboard
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
