"use client";

import { ProgramTask } from "@/lib/types";

const typeMeta: Record<
  ProgramTask["type"],
  { label: string; icon: string; color: string }
> = {
  video: { label: "Video", icon: "🎥", color: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20" },
  document: { label: "Materi", icon: "📄", color: "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20" },
  link: { label: "Tautan", icon: "🔗", color: "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20" },
  reflection: { label: "Refleksi", icon: "📝", color: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" },
  action: { label: "Tugas", icon: "✅", color: "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" },
  meeting: { label: "Sesi", icon: "🤝", color: "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20" },
  info: { label: "Info", icon: "ℹ️", color: "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-white/5 dark:text-white/60 dark:border-white/10" },
};

export function TaskCard({
  task,
  done,
  onToggle,
}: {
  task: ProgramTask;
  done: boolean;
  onToggle: () => void;
}) {
  const meta = typeMeta[task.type];

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
        done
          ? "border-red-200 bg-red-50/60 dark:border-red-500/20 dark:bg-red-500/5"
          : "border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          aria-label={done ? "Tandai belum selesai" : "Tandai selesai"}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            done
              ? "border-red-600 bg-red-600 text-white"
              : "border-zinc-300 dark:border-white/20 text-transparent hover:border-red-400"
          }`}
        >
          ✓
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${meta.color}`}
            >
              <span>{meta.icon}</span>
              {meta.label}
            </span>
          </div>

          <h3
            className={`mt-1.5 font-semibold leading-snug ${
              done ? "text-red-800 dark:text-red-300 line-through/0" : "text-zinc-900 dark:text-white"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">{task.description}</p>
          )}

          {task.steps && task.steps.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-white/60">
              {task.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red-500">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          )}

          {task.href && (
            <a
              href={task.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500"
            >
              {task.ctaLabel ?? "Buka"}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
