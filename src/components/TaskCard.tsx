"use client";

import { ProgramTask } from "@/lib/types";

const typeMeta: Record<
  ProgramTask["type"],
  { label: string; icon: string; color: string }
> = {
  video: { label: "Video", icon: "🎥", color: "bg-rose-50 text-rose-600 border-rose-200" },
  document: { label: "Materi", icon: "📄", color: "bg-sky-50 text-sky-600 border-sky-200" },
  link: { label: "Tautan", icon: "🔗", color: "bg-violet-50 text-violet-600 border-violet-200" },
  reflection: { label: "Refleksi", icon: "📝", color: "bg-amber-50 text-amber-600 border-amber-200" },
  action: { label: "Tugas", icon: "✅", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  meeting: { label: "Sesi", icon: "🤝", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  info: { label: "Info", icon: "ℹ️", color: "bg-zinc-50 text-zinc-600 border-zinc-200" },
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
        done ? "border-emerald-200 bg-emerald-50/60" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          aria-label={done ? "Tandai belum selesai" : "Tandai selesai"}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            done
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-zinc-300 text-transparent hover:border-emerald-400"
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
              done ? "text-emerald-800 line-through/0" : "text-zinc-900"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-1 text-sm text-zinc-600">{task.description}</p>
          )}

          {task.steps && task.steps.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {task.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-500">{i + 1}.</span>
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
              className="mt-3 inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700"
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
