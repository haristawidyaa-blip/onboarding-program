"use client";

import Link from "next/link";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/useProgress";
import { programDays } from "@/lib/data";

const ALL_TASK_IDS = [
  "d4-supervisor",
  "d4-agenda",
  "d4-kenalan",
  "d4-catat",
  "d4-deadline",
];

const MISI = [
  {
    id: "d4-supervisor",
    emoji: "🤝",
    num: "1",
    title: "Bertemu dengan Supervisor sesuai jadwal yang sudah kamu sepakati,",
    detail: null,
  },
  {
    id: "d4-agenda",
    emoji: "📋",
    num: "2",
    title: "Masukkan topik ini sebagai agenda pembahasan:",
    detail: [
      "lingkup pekerjaan,",
      "ekspektasi yang muncul,",
      "rencana kerja,",
      "serta dokumen dan aplikasi penunjang yang akan diakses,",
    ],
  },
  {
    id: "d4-kenalan",
    emoji: "👋",
    num: "3",
    title: "Berkenalan dengan 3 civitas CISDI dari lintas departemen dan cari tahu apa spesialisasi mereka,",
    detail: null,
  },
  {
    id: "d4-catat",
    emoji: "📝",
    num: "4",
    title: "Catat hal-hal menarik dan berkesan yang kamu temukan selama menjalankan misi ini sebagai bahan diskusi pada sesi penyelarasan hari kelima,",
    detail: null,
  },
  {
    id: "d4-deadline",
    emoji: "⏳",
    num: "5",
    title: "Kamu punya waktu sampai 2 hari ke depan untuk menyelesaikan misi ini sebelum sesi penyelarasan terakhir.",
    detail: null,
  },
];

export function Hari4Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const prevDay = programDays[2];
  const nextDay = programDays[4];

  function d(id: string) { return hydrated && isDone(id); }
  function t(id: string) { return () => toggleTask(id); }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Onboarding", href: "/program/onboarding" },
              { label: "Hari 4: Misi Mengenal Kantor & Rekan Kerja" },
            ]}
          />

          {/* ── Day hero ── */}
          <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 shadow-xl dark:from-zinc-900 dark:to-black">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎡</span>
              <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs font-semibold tracking-wide text-red-400">
                Hari 4 dari 5
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              🎉 Hai! Selamat datang di hari keempat
            </h1>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                <span>Progress hari ini</span>
                <span className="font-semibold text-white/70">{doneCount}/{ALL_TASK_IDS.length} task</span>
              </div>
              <ProgressBar value={doneCount} total={ALL_TASK_IDS.length} />
            </div>
          </div>

          {/* ── Intro ── */}
          <div className="mt-6 space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
            <p>Bagaimana pengalaman belajarmu selama 3 hari ini?</p>
            <p>Seberapa makin siap kamu untuk berkontribusi di CISDI? 💪</p>
            <p>
              Hari ini, saatnya kamu mengeksplorasi kantor kita secara{" "}
              <strong className="text-zinc-800 dark:text-white">luring</strong>{" "}
              dan mengenal lebih dekat orang-orang yang akan bekerja bersamamu.
            </p>
            <p>
              Sambil berjalan-jalan, kamu juga dapat menyelesaikan sebuah misi
              kecil — seru, ringan, tapi penuh makna! 🌿
            </p>
            <p>Ikuti langkah-langkah berikut dan selesaikan tantanganmu:</p>
          </div>

          {/* ── Misi list ── */}
          <div className="mt-6 space-y-4">
            {MISI.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                {/* Number + connector */}
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 dark:bg-white/15 text-sm font-bold text-white ring-4 ring-white dark:ring-zinc-900">
                    {item.num}
                  </span>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-xl leading-none shrink-0">{item.emoji}</span>
                    <p className="text-sm text-zinc-700 dark:text-white/70 leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                  {item.detail && (
                    <ul className="ml-7 mb-3 list-disc space-y-0.5 text-sm text-zinc-600 dark:text-white/60">
                      {item.detail.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                  )}
                  <div
                    onClick={t(item.id)}
                    role="checkbox"
                    aria-checked={d(item.id)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === " " && t(item.id)()}
                    className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 transition-all select-none ${
                      d(item.id)
                        ? "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10"
                        : "border-zinc-200 bg-zinc-50 hover:border-red-200 hover:bg-red-50/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-red-500/30"
                    }`}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      d(item.id) ? "border-red-600 bg-red-600 text-white" : "border-zinc-300 dark:border-white/30 group-hover:border-red-400"
                    }`}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={`text-sm ${d(item.id) ? "text-red-700 line-through dark:text-red-400" : "text-zinc-700 dark:text-white/70"}`}>
                      Tandai selesai
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Closing quote ── */}
          <blockquote className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-sm italic text-zinc-600 dark:text-white/60">
              &ldquo;Apa hal baru yang aku pelajari dari percakapan hari ini,
              dan bagaimana hal itu bisa membantuku berkolaborasi lebih baik di CISDI?&rdquo;
            </p>
          </blockquote>

          {/* ── Navigation ── */}
          <div className="mt-10 flex items-center justify-between">
            {prevDay && (
              <Link href={`/hari/${prevDay.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-white/60 hover:text-red-600 dark:hover:text-red-500">
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                {prevDay.title}
              </Link>
            )}
            {nextDay && (
              <Link href={`/hari/${nextDay.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline">
                {nextDay.title}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
