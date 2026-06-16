import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LearningSpaceClient } from "./LearningSpaceClient";

export const metadata: Metadata = { title: "Learning Space" };

export default function BelajarPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <p className="text-red-600 dark:text-red-500 text-sm font-semibold uppercase tracking-wide">
            Di Luar Program Orientasi
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] dark:text-white">
            Learning Space
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-white/60 leading-relaxed">
            Kumpulan materi belajar CISDI di luar materi onboarding 5 hari.
            Jelajahi topik yang relevan dengan pekerjaanmu — mulai dari
            kebijakan kesehatan, pengembangan diri, hingga keuangan personal.
          </p>

          <div className="mt-8">
            <LearningSpaceClient />
          </div>
        </section>
      </main>
    </>
  );
}
