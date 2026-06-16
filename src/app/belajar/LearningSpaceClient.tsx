"use client";

import { useMemo, useState } from "react";
import { FileText, ArrowUpRight, Search } from "lucide-react";
import { learningMaterials } from "@/lib/learningSpace";

const ALL_CATEGORIES = Array.from(
  new Set(learningMaterials.flatMap((m) => m.categories))
).sort();

export function LearningSpaceClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return learningMaterials.filter((m) => {
      const matchesCategory = !activeCategory || m.categories.includes(activeCategory);
      const matchesQuery = m.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-white/40" strokeWidth={2} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari materi..."
          className="w-full rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-white/40 outline-none transition-colors focus:border-red-400 dark:focus:border-red-500/50"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-red-600 text-white"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
          }`}
        >
          Semua ({learningMaterials.length})
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const count = learningMaterials.filter((m) => m.categories.includes(cat)).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-zinc-500 dark:text-white/50">
        Menampilkan {filtered.length} dari {learningMaterials.length} materi
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((material) => (
          <a
            key={material.id}
            href={material.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-red-300 dark:hover:border-red-500/50 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 transition-transform group-hover:scale-110">
                <FileText className="h-5 w-5" strokeWidth={2} />
              </span>
              <ArrowUpRight
                className="h-4 w-4 text-zinc-300 dark:text-white/20 opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </div>
            <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
              {material.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {material.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-zinc-100 dark:bg-white/10 px-2 py-0.5 text-xs text-zinc-600 dark:text-white/60"
                >
                  {cat}
                </span>
              ))}
            </div>
          </a>
        ))}

        {filtered.length === 0 && (
          <div className="sm:col-span-2 rounded-2xl border border-dashed border-zinc-300 dark:border-white/15 p-8 text-center text-sm text-zinc-500 dark:text-white/50">
            Tidak ada materi yang cocok dengan pencarianmu.
          </div>
        )}
      </div>
    </div>
  );
}
