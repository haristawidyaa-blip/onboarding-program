"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { ProgressBar } from "@/components/ProgressBar";
import { programDays } from "@/lib/data";
import { useProgress } from "@/lib/useProgress";

export default function DayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const dayIndex = programDays.findIndex((d) => d.slug === slug);
  const day = programDays[dayIndex];

  const { isDone, toggleTask, hydrated } = useProgress();

  if (!day) {
    notFound();
  }

  const allTasks = day.sections.flatMap((sec) => sec.tasks);
  const doneCount = hydrated ? allTasks.filter((t) => isDone(t.id)).length : 0;

  const prevDay = programDays[dayIndex - 1];
  const nextDay = programDays[dayIndex + 1];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <Link href="/" className="text-sm text-emerald-600 hover:underline">
            ← Kembali ke Dashboard
          </Link>

          <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{day.emoji}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Hari {day.dayNumber} dari {programDays.length}
              </span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-bold text-zinc-900">
              {day.title}
            </h1>
            <p className="mt-2 text-sm text-zinc-600">{day.intro}</p>

            {day.note && (
              <p className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
                ⚠️ {day.note}
              </p>
            )}

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm mb-1.5 text-zinc-600">
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
                <h2 className="text-base font-semibold text-zinc-900 mb-3">
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
            <blockquote className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm italic text-emerald-800">
              “{day.closingQuote}”
            </blockquote>
          )}

          <div className="mt-10 flex items-center justify-between">
            {prevDay ? (
              <Link
                href={`/hari/${prevDay.slug}`}
                className="text-sm font-medium text-zinc-600 hover:text-emerald-600"
              >
                ← {prevDay.title}
              </Link>
            ) : (
              <span />
            )}
            {nextDay ? (
              <Link
                href={`/hari/${nextDay.slug}`}
                className="text-sm font-medium text-emerald-600 hover:underline"
              >
                {nextDay.title} →
              </Link>
            ) : (
              <Link href="/" className="text-sm font-medium text-emerald-600 hover:underline">
                Kembali ke Dashboard →
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
