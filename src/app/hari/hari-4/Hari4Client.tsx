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

function CheckItem({
  id,
  children,
  isDone,
  onToggle,
}: {
  id: string;
  children: React.ReactNode;
  isDone: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start gap-3 py-1">
      <button
        onClick={onToggle}
        aria-label={isDone ? "Tandai belum selesai" : "Tandai selesai"}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all active:scale-90 ${
          isDone
            ? "border-red-600 bg-red-600 text-white scale-105"
            : "border-zinc-300 dark:border-white/30 text-transparent hover:border-red-400 hover:scale-105"
        }`}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </button>
      <div
        className={`text-sm leading-relaxed ${
          isDone
            ? "text-red-700 dark:text-red-400 line-through"
            : "text-zinc-700 dark:text-white/70"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

const MISI = [
  {
    id: "d4-supervisor",
    emoji: "🤝",
    title: "Bertemu dengan Supervisor sesuai jadwal yang sudah kamu sepakati,",
    detail: null,
  },
  {
    id: "d4-agenda",
    emoji: "📋",
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
    title:
      "Berkenalan dengan 3 civitas CISDI dari lintas departemen dan cari tahu apa spesialisasi mereka,",
    detail: null,
  },
  {
    id: "d4-catat",
    emoji: "📝",
    title:
      "Catat hal-hal menarik dan berkesan yang kamu temukan selama menjalankan misi ini sebagai bahan diskusi pada sesi penyelarasan hari kelima,",
    detail: null,
  },
  {
    id: "d4-deadline",
    emoji: "⏳",
    title:
      "Kamu punya waktu sampai 2 hari ke depan untuk menyelesaikan misi ini sebelum sesi penyelarasan terakhir.",
    detail: null,
  },
];

export function Hari4Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const prevDay = programDays[2];
  const nextDay = programDays[4];

  function d(id: string) {
    return hydrated && isDone(id);
  }
  function t(id: string) {
    return () => toggleTask(id);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Onboarding", href: "/program/onboarding" },
              { label: "Hari 4: Misi Mengenal Kantor & Rekan Kerja" },
            ]}
          />

          {/* ── Day header ── */}
          <div className="mt-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎡</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
                Hari 4 dari 5
              </span>
            </div>
            <h1 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
              🎉 Hai! Selamat datang di hari keempat
            </h1>
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-sm text-zinc-600 dark:text-white/60">
                <span>Progress hari ini</span>
                <span className="font-medium">
                  {doneCount}/{ALL_TASK_IDS.length} task
                </span>
              </div>
              <ProgressBar value={doneCount} total={ALL_TASK_IDS.length} />
            </div>
          </div>

          {/* ── Intro ── */}
          <div className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-white/60">
            <p>Bagaimana pengalaman belajarmu selama 3 hari ini?</p>
            <p>
              Seberapa makin siap kamu untuk berkontribusi di CISDI? 💪
            </p>
            <p>
              Hari ini, saatnya kamu mengeksplorasi kantor kita secara{" "}
              <strong className="text-zinc-800 dark:text-white">luring</strong>{" "}
              dan mengenal lebih dekat orang-orang yang akan bekerja bersamamu.
            </p>
            <p>
              Sambil berjalan-jalan, kamu juga dapat menyelesaikan sebuah misi
              kecil — seru, ringan, tapi penuh makna! 🌿
            </p>
            <p>
              Ikuti langkah-langkah berikut dan selesaikan tantanganmu:
            </p>
          </div>

          {/* ── Misi list ── */}
          <div className="mt-5 space-y-4">
            {MISI.map((item, i) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-2 flex items-start gap-3">
                  <span className="mt-0.5 text-lg leading-none">{item.emoji}</span>
                  <div className="flex-1 text-sm text-zinc-700 dark:text-white/70">
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {i + 1}.{" "}
                    </span>
                    {item.title}
                    {item.detail && (
                      <ul className="mt-1 ml-4 list-disc space-y-0.5 text-zinc-600 dark:text-white/60">
                        {item.detail.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <CheckItem id={item.id} isDone={d(item.id)} onToggle={t(item.id)}>
                  Tandai selesai
                </CheckItem>
              </div>
            ))}
          </div>

          {/* ── Closing quote ── */}
          <blockquote className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm italic text-zinc-600 dark:text-white/60">
              &ldquo;Apa hal baru yang aku pelajari dari percakapan hari ini,
              dan bagaimana hal itu bisa membantuku berkolaborasi lebih baik di
              CISDI?&rdquo;
            </p>
          </blockquote>

          {/* ── Navigation ── */}
          <div className="mt-10 flex items-center justify-between">
            {prevDay && (
              <Link
                href={`/hari/${prevDay.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-white/60 hover:text-red-600 dark:hover:text-red-500"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                {prevDay.title}
              </Link>
            )}
            {nextDay && (
              <Link
                href={`/hari/${nextDay.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline"
              >
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
