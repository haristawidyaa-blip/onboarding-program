"use client";

import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/useProgress";
import { programDays } from "@/lib/data";

const ALL_TASK_IDS = ["d5-sesi"];

export function Hari5Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const prevDay = programDays[3];

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
              { label: "Hari 5: Sesi Penyelarasan Penutup" },
            ]}
          />

          {/* ── Day hero ── */}
          <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 shadow-xl dark:from-zinc-900 dark:to-black">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎡</span>
              <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs font-semibold tracking-wide text-red-400">
                Hari 5 dari 5
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Sesi Penyelarasan Penutup
            </h1>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                <span>Progress hari ini</span>
                <span className="font-semibold text-white/70">{doneCount}/{ALL_TASK_IDS.length} task</span>
              </div>
              <ProgressBar value={doneCount} total={ALL_TASK_IDS.length} />
            </div>
          </div>

          {/* ── Closing message ── */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-8 shadow-sm dark:border-red-500/20 dark:from-red-500/10 dark:to-transparent">
            <h2 className="text-2xl font-bold leading-snug text-red-600 dark:text-red-400">
              Selamat! Kamu telah menyelesaikan kegiatan belajar pertama dari
              perjalananmu di CISDI.
            </h2>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
              <p>
                Kamu telah mengenal bagaimana dan mengapa CISDI lahir, memahami
                visi dan misi yang menjadi arah langkah, serta menggali
                nilai-nilai yang kita pegang teguh dalam bekerja dan berinteraksi.
              </p>
              <p>
                Semoga proses ini membantu melihat bahwa kamu bukan hanya
                Civitas sebuah organisasi, melainkan juga bagian dari sebuah
                gerakan—untuk mewujudkan Indonesia yang lebih sehat, lebih adil,
                dan lebih setara.
              </p>
              <p>
                Perjalanan ini tidak selalu mudah. Tapi bersama, kita bisa
                saling menopang. Dan setiap langkah kecil yang kamu ambil—setiap
                inisiatif, ide, atau keputusan yang kamu buat—dapat membawa
                perubahan yang berarti.
              </p>
              <p>
                Mari terus belajar, tumbuh, dan bekerja bersama dengan semangat
                kolaborasi, integritas, keberlanjutan, keberagaman, dan
                keberpihakan sosial.
              </p>
              <p>Sampai jumpa di bagian pembelajaran berikutnya.</p>
              <p className="text-base font-semibold text-zinc-900 dark:text-white">
                Selamat datang di CISDI. ✨
              </p>
            </div>
          </div>

          {/* ── Sesi Penyelarasan ── */}
          <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-6 shadow-lg shadow-red-600/20">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="text-2xl">📌</span>
              <h3 className="text-lg font-bold text-white">Sesi Penyelarasan</h3>
            </div>
            <ul className="mb-4 ml-5 list-disc space-y-1 text-sm text-red-100">
              <li>
                Sesi penyelarasan dilaksanakan sesuai dengan jadwal yang telah
                tercantum pada kalender Google, pastikan telah mengakses seluruh
                materi asinkronus dan menyelesaikan seluruh tugas pada laman
                program orientasi karyawan CISDI.
              </li>
            </ul>
            <div
              onClick={t("d5-sesi")}
              role="checkbox"
              aria-checked={d("d5-sesi")}
              tabIndex={0}
              onKeyDown={(e) => e.key === " " && t("d5-sesi")()}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all select-none ${
                d("d5-sesi")
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-white/20 bg-white/10 text-red-100 hover:bg-white/20"
              }`}
            >
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${d("d5-sesi") ? "border-white bg-white text-red-600" : "border-white/50"}`}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className={`text-sm font-medium ${d("d5-sesi") ? "line-through" : ""}`}>
                Ikuti Sesi Penyelarasan Penutup
              </span>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="mt-10 flex items-center justify-between">
            {prevDay && (
              <Link href={`/hari/${prevDay.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-white/60 hover:text-red-600 dark:hover:text-red-500">
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                {prevDay.title}
              </Link>
            )}
            <Link href="/program/onboarding" className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline">
              Kembali ke Dashboard
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
