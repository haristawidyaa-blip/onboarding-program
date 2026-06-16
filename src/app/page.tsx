"use client";

import { Home as HomeIcon, ChevronRight, ArrowRight, HelpCircle, Lightbulb } from "lucide-react";
import { Header } from "@/components/Header";
import { DayCard } from "@/components/DayCard";
import { programDays, totalTaskCount } from "@/lib/data";
import { useProgress } from "@/lib/useProgress";
import { withBasePath } from "@/lib/basePath";

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

  const pct = totalTaskCount === 0 ? 0 : Math.round((totalDone / totalTaskCount) * 100);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative bg-[#161616] bg-cover bg-center"
          style={{ backgroundImage: `url(${withBasePath("/hero-team.jpg")})` }}
        >
          <div className="absolute inset-0 bg-[#0f0f0f]/80" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-14">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <HomeIcon className="h-4 w-4" strokeWidth={2} />
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="font-semibold text-white">Program Orientasi Karyawan Baru CISDI</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Hai, selamat bergabung di CISDI!
            </h1>
            <p className="mt-5 max-w-2xl text-white/70 text-sm sm:text-base leading-relaxed">
              Ini adalah laman pembelajaran yang kamu akses pertama kali di
              CISDI. Seperti apa perasaan kamu saat ini?
            </p>

            <a
              href={`/hari/${nextDay.slug}`}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
            >
              Lanjutkan ke {nextDay.title}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              <div className="rounded-2xl bg-zinc-100 dark:bg-white/10 p-5">
                <p className="text-2xl font-semibold text-red-600 dark:text-red-500">{programDays.length} Hari</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-white/70">
                  Durasi program orientasi karyawan baru CISDI.
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-100 dark:bg-white/10 p-5">
                <p className="text-2xl font-semibold text-red-600 dark:text-red-500">
                  {totalDone}/{totalTaskCount}
                </p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-white/70">
                  Task yang sudah kamu selesaikan sejauh ini.
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-100 dark:bg-white/10 p-5">
                <p className="text-2xl font-semibold text-red-600 dark:text-red-500">{pct}%</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-white/70">
                  Progress keseluruhan program onboardingmu.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
          <div className="space-y-4 text-[15px] leading-relaxed text-zinc-700 dark:text-white/70">
            <p>
              Kamu mungkin merasa sangat bersemangat, mungkin juga sedikit
              cemas. Tapi yang pasti—kamu siap untuk mulai berkontribusi.
            </p>
            <p>
              Untuk bisa berkontribusi dengan optimal, kita perlu saling
              berkenalan. Laman ini akan membawamu melihat lebih dekat CISDI,
              apa yang sudah kita kerjakan, dan apa yang mendorong kita untuk
              terus memperjuangkannya sehingga membantumu beradaptasi dengan
              situasi dan lingkungan kerja di CISDI.
            </p>
            <p>Selain itu, setiap topik yang kamu akses diharapkan dapat membantumu untuk:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-red-600 dark:text-red-500" strokeWidth={2} />
                <span>memahami &amp; menghayati visi, misi, nilai-nilai/prinsip-prinsip CISDI,</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-red-600 dark:text-red-500" strokeWidth={2} />
                <span>memiliki sikap saling memahami ekspektasi antara CISDI dengan karyawan,</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-red-600 dark:text-red-500" strokeWidth={2} />
                <span>menunjukkan kesiapan berperan &amp; berkontribusi di CISDI.</span>
              </li>
            </ul>
            <p>
              Program pembelajaran ini akan dilakukan selama 5 (lima) hari ke
              depan dengan metode blended learning. Terdapat materi
              asinkronus pada laman Notion yang bisa kamu akses secara
              mandiri dan disesuaikan dengan pengelolaan waktu kamu saat ini.
              Akses materi juga dilengkapi dengan pertemuan secara sinkronus,
              baik daring maupun luring. Pertemuan sinkronus ini dilakukan
              sebagai sesi penyelarasan di setiap hari dan praktik mandiri
              dari materi asinkronus yang kamu akses.
            </p>
            <p>
              Kamu dapat memulai pembelajaran dengan menggunakan fitur yang
              tersedia pada setiap laman materi di setiap harinya. Sebelum
              menjelajah materi harian, sila mengisi borang ini sebagai
              langkah awal pembelajaran di Program Orientasi Karyawan CISDI.
              Mari terlibat di setiap langkah materi pembelajaran untuk
              mencapai tujuan pembelajarannya. Selamat belajar dan sampai
              jumpa di kelas!
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
          <p className="text-red-600 dark:text-red-500 text-sm font-semibold uppercase tracking-wide">
            Jadwal Harian
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] dark:text-white max-w-2xl">
            Gunakan tombol dengan nama hari di bawah ini untuk mengakses tiap materi selama program orientasi berlangsung
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {programDays.map((day) => (
              <DayCard
                key={day.slug}
                day={day}
                doneCount={hydrated ? countDayDone(day, completed) : 0}
                totalCount={countDayTasks(day)}
              />
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/5 p-6 text-sm text-zinc-600 dark:text-white/60">
            <p className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white mb-1.5">
              <HelpCircle className="h-4 w-4 text-red-600 dark:text-red-500" strokeWidth={2} />
              Butuh bantuan?
            </p>
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
