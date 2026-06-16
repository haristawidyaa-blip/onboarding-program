"use client";

import {
  Home as HomeIcon,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  Lightbulb,
  Heart,
  Users,
  Target,
  CalendarClock,
  Rocket,
  CalendarDays,
  ListChecks,
  TrendingUp,
} from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScHcMMSNKyjLa-M7hUNDXkae3oLoI4mB09OdzMSI3VmxCNLwg/viewform?usp=send_form";
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
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/30 active:translate-y-0"
            >
              Lanjutkan ke {nextDay.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="group rounded-2xl border border-black/5 dark:border-white/15 bg-white/90 dark:bg-white/10 backdrop-blur-md p-5 transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-white/15 hover:shadow-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <CalendarDays className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-3 text-2xl font-semibold text-red-600 dark:text-red-400">{programDays.length} Hari</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-white/80">
                  Durasi program orientasi karyawan baru CISDI.
                </p>
              </div>
              <div className="group rounded-2xl border border-black/5 dark:border-white/15 bg-white/90 dark:bg-white/10 backdrop-blur-md p-5 transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-white/15 hover:shadow-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <ListChecks className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-3 text-2xl font-semibold text-red-600 dark:text-red-400">
                  {totalDone}/{totalTaskCount}
                </p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-white/80">
                  Task yang sudah kamu selesaikan sejauh ini.
                </p>
              </div>
              <div className="group rounded-2xl border border-black/5 dark:border-white/15 bg-white/90 dark:bg-white/10 backdrop-blur-md p-5 transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-white/15 hover:shadow-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <TrendingUp className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-3 text-2xl font-semibold text-red-600 dark:text-red-400">{pct}%</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-white/80">
                  Progress keseluruhan program onboardingmu.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 lg:items-start">
          <div>
          <p className="text-red-600 dark:text-red-500 text-sm font-semibold uppercase tracking-wide">
            Sebelum Mulai
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] dark:text-white">
            Yuk, kenalan dulu dengan CISDI
          </h2>

          <div className="relative mt-10 space-y-6 pl-14 sm:pl-16">
            <div
              className="absolute left-[23px] sm:left-[27px] top-12 bottom-12 border-l-2 border-dashed border-red-200 dark:border-red-500/25"
              aria-hidden
            />

            <div className="group relative">
              <span className="absolute -left-14 sm:-left-16 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 ring-4 ring-[#f5f5f7] dark:ring-white/10">
                <Heart className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-5 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5">
                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-white/70">
                  Kamu mungkin merasa sangat bersemangat, mungkin juga sedikit
                  cemas. Tapi yang pasti—kamu siap untuk mulai berkontribusi.
                </p>
              </div>
            </div>

            <div className="group relative">
              <span className="absolute -left-14 sm:-left-16 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 ring-4 ring-[#f5f5f7] dark:ring-white/10">
                <Users className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-5 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5">
                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-white/70">
                  Untuk bisa berkontribusi dengan optimal, kita perlu saling
                  berkenalan. Laman ini akan membawamu melihat lebih dekat
                  CISDI, apa yang sudah kita kerjakan, dan apa yang mendorong
                  kita untuk terus memperjuangkannya sehingga membantumu
                  beradaptasi dengan situasi dan lingkungan kerja di CISDI.
                </p>
              </div>
            </div>

            <div className="group relative">
              <span className="absolute -left-14 sm:-left-16 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 ring-4 ring-[#f5f5f7] dark:ring-white/10">
                <Target className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-5 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5">
                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-white/70">
                  Selain itu, setiap topik yang kamu akses diharapkan dapat
                  membantumu untuk:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2 text-[15px] text-zinc-700 dark:text-white/70">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-red-600 dark:text-red-500" strokeWidth={2} />
                    <span>memahami &amp; menghayati visi, misi, nilai-nilai/prinsip-prinsip CISDI,</span>
                  </li>
                  <li className="flex items-start gap-2 text-[15px] text-zinc-700 dark:text-white/70">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-red-600 dark:text-red-500" strokeWidth={2} />
                    <span>memiliki sikap saling memahami ekspektasi antara CISDI dengan karyawan,</span>
                  </li>
                  <li className="flex items-start gap-2 text-[15px] text-zinc-700 dark:text-white/70">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-red-600 dark:text-red-500" strokeWidth={2} />
                    <span>menunjukkan kesiapan berperan &amp; berkontribusi di CISDI.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative">
              <span className="absolute -left-14 sm:-left-16 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 ring-4 ring-[#f5f5f7] dark:ring-white/10">
                <CalendarClock className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-5 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5">
                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-white/70">
                  Program pembelajaran ini akan dilakukan selama 5 (lima) hari
                  ke depan dengan metode <em>blended learning</em>. Terdapat
                  materi asinkronus pada laman Notion yang bisa kamu akses
                  secara mandiri dan disesuaikan dengan pengelolaan waktu kamu
                  saat ini. Akses materi juga dilengkapi dengan pertemuan
                  secara sinkronus, baik daring maupun luring. Pertemuan
                  sinkronus ini dilakukan sebagai sesi penyelarasan di setiap
                  hari dan praktik mandiri dari materi asinkronus yang kamu
                  akses.
                </p>
              </div>
            </div>

            <div className="group relative">
              <span className="absolute -left-14 sm:-left-16 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white ring-4 ring-[#f5f5f7] dark:ring-white/10">
                <Rocket className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50/60 dark:bg-red-500/5 p-5 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5">
                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-white/70">
                  Kamu dapat memulai pembelajaran dengan menggunakan fitur
                  yang tersedia pada setiap laman materi di setiap harinya.
                  Sebelum menjelajah materi harian, sila mengisi{" "}
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-red-600 dark:text-red-400 hover:underline"
                  >
                    borang ini
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </a>{" "}
                  sebagai langkah awal pembelajaran di Program Orientasi
                  Karyawan CISDI. Mari terlibat di setiap langkah materi
                  pembelajaran untuk mencapai tujuan pembelajarannya. Selamat
                  belajar dan sampai jumpa di kelas!
                </p>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
                >
                  Isi Borang Sekarang
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
          </div>

          <aside className="mt-10 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-6 shadow-sm">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">Progress Onboardingmu</p>

              <div className="relative mx-auto mt-5 flex h-36 w-36 items-center justify-center">
                <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-zinc-100 dark:text-white/10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="text-red-600 dark:text-red-500 transition-all duration-700"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - pct / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-semibold text-red-600 dark:text-red-400">{pct}%</span>
                  <span className="text-xs text-zinc-500 dark:text-white/50">selesai</span>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-sm">
                <div className="flex items-center justify-between text-zinc-600 dark:text-white/60">
                  <span>Task selesai</span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {totalDone}/{totalTaskCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600 dark:text-white/60">
                  <span>Hari aktif</span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {nextDay.dayNumber}/{programDays.length}
                  </span>
                </div>
              </div>

              <a
                href={`/hari/${nextDay.slug}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
              >
                Lanjutkan Belajar
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </aside>
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

          <div className="mt-10 rounded-3xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-6 text-sm text-zinc-600 dark:text-white/60">
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
