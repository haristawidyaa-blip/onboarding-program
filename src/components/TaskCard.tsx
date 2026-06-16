"use client";

import {
  Video,
  FileText,
  Link2,
  PencilLine,
  CheckCircle2,
  Users,
  Info,
  Check,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { ProgramTask } from "@/lib/types";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

const typeMeta: Record<
  ProgramTask["type"],
  { label: string; icon: LucideIcon; color: string }
> = {
  video: { label: "Video", icon: Video, color: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20" },
  document: { label: "Materi", icon: FileText, color: "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20" },
  link: { label: "Tautan", icon: Link2, color: "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20" },
  reflection: { label: "Refleksi", icon: PencilLine, color: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" },
  action: { label: "Tugas", icon: CheckCircle2, color: "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" },
  meeting: { label: "Sesi", icon: Users, color: "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20" },
  info: { label: "Info", icon: Info, color: "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-white/5 dark:text-white/60 dark:border-white/10" },
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
  const Icon = meta.icon;

  const embedUrl = task.type === "video" && task.href ? getYoutubeEmbedUrl(task.href) : null;
  const isPadletEmbed = task.type === "reflection" && !!task.href;

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
        done
          ? "border-red-200 bg-red-50/60 dark:border-red-500/20 dark:bg-red-500/5"
          : "border-zinc-200/80 bg-white dark:border-white/10 dark:bg-white/5"
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
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${meta.color}`}
            >
              <Icon className="h-3 w-3" strokeWidth={2.5} />
              {meta.label}
            </span>
          </div>

          <h3
            className={`mt-1.5 font-semibold leading-snug ${
              done ? "text-red-800 dark:text-red-300" : "text-zinc-900 dark:text-white"
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

          {embedUrl && (
            <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={embedUrl}
                title={task.title}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {isPadletEmbed && (
            <div className="mt-3 h-[500px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
              <iframe
                src={task.href}
                title={task.title}
                className="h-full w-full"
                loading="lazy"
                frameBorder="0"
              />
              <a
                href={task.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
              >
                Buka Padlet di tab baru
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          )}

          {task.href && !embedUrl && !isPadletEmbed && (
            <a
              href={task.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-red-500"
            >
              {task.ctaLabel ?? "Buka"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
