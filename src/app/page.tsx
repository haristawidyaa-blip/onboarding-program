"use client";

import { Header } from "@/components/Header";
import { DayCard } from "@/components/DayCard";
import { ProgressBar } from "@/components/ProgressBar";
import { programDays, totalTaskCount } from "@/lib/data";
import { useProgress } from "@/lib/useProgress";

function countDayTasks(day: (typeof programDays)[number]) {
  return day.sections.reduce((sum, sec) => sum + sec.tasks.length, 0);
}

function countDayDone(day: (typeof programDays)[number], completed: Set<string>) {
  let n = 0;
  for (const sec of day.sections) {
    for (const task of sec.tasks) {
      if (completed.has(task.id)) n++;
    }
  }
  return n;
}

export default function Home() {
  const { completed, hydrated } = useProgress();
  const totalDone = hydrated ? completed.size : 0;

  const nextDay =
    programDays.find((d) => countDayDone(d, completed) < countDayTasks(d)) ??
    programDays[programDays.length - 1];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400 p-8 sm:p-10 text-white shadow-lg">
            <p className="text-emerald-50/90 text-sm font-medium">
              🎪 Program Orientasi Karyawan Baru
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
              Selamat bergabung di CISDI! 👋🏼
            </h1>
            <p className="mt-3 max-w-2xl text-emerald-50/95 text-sm sm:text-base">
              Ikuti perjalanan belajar selama 5 hari untuk mengenal visi, misi,
              nilai-nilai, ekosistem kerja, dan rekan-rekan kerjamu di CISDI.
              Selesaikan task harian, tandai progress kamu, dan jangan lupa
              hadir di setiap sesi penyelarasan.
            </p>

            <div className="mt-6 max-w-md">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium">Progress keseluruhan</span>
                <span className="font-semibold">
                  {totalDone}/{totalTaskCount} task
                </span>
              </div>
              <ProgressBar value={totalDone} total={totalTaskCount} />
            </div>

            <a
              href={`/hari/${nextDay.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              Lanjutkan ke {nextDay.title}
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">
            Jadwal Harian
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {programDays.map((day) => (
              <DayCard
                key={day.slug}
                day={day}
                doneCount={hydrated ? countDayDone(day, completed) : 0}
                totalCount={countDayTasks(day)}
              />
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600">
            <p className="font-medium text-zinc-800 mb-1">Butuh bantuan?</p>
            <p>
              Hubungi Tim Human Capital apabila menemui kendala atau
              membutuhkan informasi lebih lanjut terkait proses ini. Materi
              dan mekanisme orientasi karyawan baru dikembangkan bersama oleh
              Tim Learning &amp; Development.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
