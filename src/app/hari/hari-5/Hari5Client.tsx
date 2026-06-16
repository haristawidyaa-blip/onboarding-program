"use client";

import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/useProgress";
import { programDays } from "@/lib/data";

const ALL_TASK_IDS = ["d5-sesi"];

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
    <div className="flex items-start gap-2 py-0.5">
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

export function Hari5Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const prevDay = programDays[3];

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
              { label: "Hari 5: Sesi Penyelarasan Penutup" },
            ]}
          />

          {/* ── Day header ── */}
          <div className="mt-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎡</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
                Hari 5 dari 5
              </span>
            </div>
            <h1 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
              Sesi Penyelarasan Penutup
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

          {/* ── Closing message ── */}
          <div className="mt-8 rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-8 shadow-sm dark:border-red-500/20 dark:from-red-500/10 dark:to-transparent">
            <h2 className="text-2xl font-bold leading-snug text-red-600 dark:text-red-400">
              Selamat! Kamu telah menyelesaikan kegiatan belajar pertama dari
              perjalananmu di CISDI.
            </h2>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
              <p>
                Kamu telah mengenal bagaimana dan mengapa CISDI lahir, memahami
                visi dan misi yang menjadi arah langkah, serta menggali
                nilai-nilai yang kita pegang teguh dalam bekerja dan
                berinteraksi.
              </p>
              <p>
                Semoga proses ini membantu melihat bahwa kamu bukan hanya
                Civitas sebuah organisasi, melainkan juga bagian dari sebuah
                gerakan—untuk mewujudkan Indonesia yang lebih sehat, lebih adil,
                dan lebih setara.
              </p>
              <p>
                Perjalanan ini tidak selalu mudah. Tapi bersama, kita bisa
                saling menopang. Dan setiap langkah kecil yang kamu
                ambil—setiap inisiatif, ide, atau keputusan yang kamu
                buat—dapat membawa perubahan yang berarti.
              </p>
              <p>
                Mari terus belajar, tumbuh, dan bekerja bersama dengan semangat
                kolaborasi, integritas, keberlanjutan, keberagaman, dan
                keberpihakan sosial.
              </p>
              <p>Sampai jumpa di bagian pembelajaran berikutnya.</p>
              <p className="font-semibold text-zinc-900 dark:text-white">
                Selamat datang di CISDI. ✨
              </p>
            </div>
          </div>

          {/* ── Sesi Penyelarasan ── */}
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">📌</span>
              <h3 className="font-bold text-red-800 dark:text-red-300">
                Sesi Penyelarasan
              </h3>
            </div>
            <ul className="mb-3 ml-4 list-disc space-y-1 text-sm text-red-700 dark:text-red-300">
              <li>
                Sesi penyelarasan dilaksanakan sesuai dengan jadwal yang telah
                tercantum pada kalender Google, pastikan telah mengakses seluruh
                materi asinkronus dan menyelesaikan seluruh tugas pada laman
                program orientasi karyawan CISDI.
              </li>
            </ul>
            <CheckItem id="d5-sesi" isDone={d("d5-sesi")} onToggle={t("d5-sesi")}>
              Ikuti Sesi Penyelarasan Penutup
            </CheckItem>
          </div>

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
            <Link
              href="/program/onboarding"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
