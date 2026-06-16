"use client";

import { useState, useMemo } from "react";
import { Search, FileText, ClipboardList, CheckCircle2, ChevronDown, ExternalLink } from "lucide-react";
import { sopData, sopDivisions } from "@/lib/sopData";

const TYPE_FILTERS = ["Semua", "Pedoman Kerja", "SOP"] as const;

const divisionShort: Record<string, string> = {
  "Corporate Secretary, Human Capital and General Affairs": "Corp. Secretary & HC",
  "Finance & Administration": "Finance & Admin",
  "Knowledge & Learning": "Knowledge & Learning",
  "Digital Communication": "Digital Comm.",
  "Community & Public Engagement": "Community & Engagement",
  "Research & Development": "Research & Dev.",
  "IT Development": "IT Development",
};

export function SopSection() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("Semua");
  const [divisionFilter, setDivisionFilter] = useState<string>("Semua");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sopData.filter((s) => {
      if (typeFilter !== "Semua" && s.type !== typeFilter) return false;
      if (divisionFilter !== "Semua" && s.division !== divisionFilter) return false;
      if (q && !s.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, typeFilter, divisionFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-white/30" strokeWidth={2} />
          <input
            type="search"
            placeholder="Cari SOP atau pedoman..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 pl-9 pr-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-white/30 outline-none focus:border-red-400 dark:focus:border-red-500/50 transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="appearance-none rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 pl-3 pr-8 py-2 text-sm text-zinc-700 dark:text-white/80 outline-none focus:border-red-400 dark:focus:border-red-500/50 cursor-pointer transition-colors"
          >
            {TYPE_FILTERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-white/30" strokeWidth={2} />
        </div>

        <div className="relative">
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="appearance-none rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 pl-3 pr-8 py-2 text-sm text-zinc-700 dark:text-white/80 outline-none focus:border-red-400 dark:focus:border-red-500/50 cursor-pointer transition-colors max-w-56"
          >
            <option value="Semua">Semua Divisi</option>
            {sopDivisions.map((d) => (
              <option key={d} value={d}>{divisionShort[d] ?? d}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-white/30" strokeWidth={2} />
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-zinc-400 dark:text-white/35 mb-3">
        Menampilkan <span className="font-medium text-zinc-600 dark:text-white/60">{filtered.length}</span> dari {sopData.length} dokumen
      </p>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-white/[0.04] border-b border-zinc-200/80 dark:border-white/10">
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-white/40 text-xs uppercase tracking-wide w-8">#</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-white/40 text-xs uppercase tracking-wide">Nama Dokumen</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-white/40 text-xs uppercase tracking-wide whitespace-nowrap">Jenis</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-white/40 text-xs uppercase tracking-wide">Divisi</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 dark:text-white/40 text-xs uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-400 dark:text-white/30">
                    Tidak ada dokumen yang cocok.
                  </td>
                </tr>
              ) : (
                filtered.map((sop, i) => (
                  <tr
                    key={i}
                    className="bg-white dark:bg-transparent hover:bg-zinc-50/80 dark:hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3.5 text-zinc-400 dark:text-white/25 text-xs">{i + 1}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-white/20">
                          {sop.type === "SOP" ? (
                            <ClipboardList className="h-4 w-4" strokeWidth={2} />
                          ) : (
                            <FileText className="h-4 w-4" strokeWidth={2} />
                          )}
                        </span>
                        <span className="font-medium text-zinc-800 dark:text-white/85 leading-snug">{sop.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sop.type === "SOP"
                          ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                          : "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                      }`}>
                        {sop.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-zinc-500 dark:text-white/50 text-xs leading-snug">
                      {divisionShort[sop.division] ?? sop.division}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                          {sop.status}
                        </span>
                        {sop.pdfUrl && (
                          <a
                            href={sop.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" strokeWidth={2} />
                            PDF
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
