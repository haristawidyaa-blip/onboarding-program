"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight } from "lucide-react";
import { searchIndex, type SearchItem } from "@/lib/searchIndex";

const GROUP_ORDER: SearchItem["group"][] = ["Program", "Onboarding", "Learning Space", "PRD"];

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      const id = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(id);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<SearchItem["group"], SearchItem[]>();
    for (const item of results) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return GROUP_ORDER.map((group) => ({ group, items: map.get(group) ?? [] })).filter(
      (g) => g.items.length > 0
    );
  }, [results]);

  function handleSelect(item: SearchItem) {
    setOpen(false);
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Cari"
        className="flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-sm text-white/70 hover:border-red-500 hover:text-red-500 transition-colors"
      >
        <Search className="h-4 w-4" strokeWidth={2} />
        <span className="hidden sm:inline">Cari</span>
        <kbd className="hidden sm:inline rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white/40">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-[12vh]"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-[#1e1e1e] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2.5 border-b border-zinc-200 dark:border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-zinc-400 dark:text-white/40 shrink-0" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari program, materi, atau dokumentasi..."
                className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-white/40 outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="text-zinc-400 dark:text-white/40 hover:text-zinc-600 dark:hover:text-white/70"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {query.trim() === "" && (
                <p className="px-3 py-6 text-center text-sm text-zinc-400 dark:text-white/40">
                  Ketik untuk mencari di seluruh program, materi, dan dokumentasi.
                </p>
              )}
              {query.trim() !== "" && results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-zinc-400 dark:text-white/40">
                  Tidak ada hasil untuk &ldquo;{query}&rdquo;.
                </p>
              )}
              {grouped.map(({ group, items }) => (
                <div key={group} className="mb-2">
                  <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-white/40">
                    {group}
                  </p>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-zinc-900 dark:text-white truncate">
                          {item.title}
                        </span>
                        <span className="block text-xs text-zinc-500 dark:text-white/50 truncate">
                          {item.description}
                        </span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-300 dark:text-white/20" strokeWidth={2} />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
