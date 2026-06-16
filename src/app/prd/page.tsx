import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prdSections } from "@/lib/prdContent";

export const metadata: Metadata = { title: "PRD" };

export default function PrdPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <Breadcrumbs items={[{ label: "PRD" }]} />
          <p className="mt-6 text-red-600 dark:text-red-500 text-sm font-semibold uppercase tracking-wide">
            Dokumentasi Internal
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] dark:text-white">
            PRD — LMS CISDI
          </h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-white/60 leading-relaxed">
            Product Requirements Document untuk aplikasi dashboard Program
            Orientasi Karyawan Baru CISDI. Dokumen ini merangkum latar
            belakang, tujuan, lingkup fitur, dan batasan produk saat ini.
          </p>

          <div className="mt-10 space-y-8">
            {prdSections.map(({ id, icon: Icon, title, body }) => (
              <div
                key={id}
                id={id}
                className="rounded-3xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-6 shadow-sm scroll-mt-24"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <h2 className="font-semibold text-zinc-900 dark:text-white">{title}</h2>
                </div>
                <div className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-white/70 space-y-3">
                  {body}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-zinc-400 dark:text-white/40">
            Dokumen ini akan diperbarui seiring berkembangnya kebutuhan
            program onboarding. Hubungi Tim Human Capital &amp; Learning
            Development untuk usulan perubahan.
          </p>
        </section>
      </main>
    </>
  );
}
