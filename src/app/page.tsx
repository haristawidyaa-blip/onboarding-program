"use client";

import { Header } from "@/components/Header";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/courses";
import { totalTaskCount } from "@/lib/data";
import { useProgress } from "@/lib/useProgress";

export default function Home() {
  const { completed, hydrated } = useProgress();
  const onboardingDone = hydrated ? completed.size : 0;
  const onboardingPct =
    totalTaskCount === 0 ? 0 : Math.round((onboardingDone / totalTaskCount) * 100);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative bg-[#161616]">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-wide">
              Learning Management System
            </p>
            <h1 className="mt-2 max-w-2xl text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
              Satu tempat untuk semua program belajar di CISDI
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-sm sm:text-base leading-relaxed">
              Mulai dari program orientasi karyawan baru hingga materi
              pengembangan diri mandiri — pilih program yang ingin kamu
              jalani di bawah ini.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <p className="text-red-600 dark:text-red-500 text-sm font-semibold uppercase tracking-wide">
            Program Tersedia
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] dark:text-white">
            Pilih program untuk mulai belajar
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                href={course.href}
                icon={course.icon}
                meta={course.meta}
                progressPct={course.id === "onboarding" ? onboardingPct : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
