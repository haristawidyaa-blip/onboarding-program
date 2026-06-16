import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SopSection } from "@/components/SopSection";
import { sopData } from "@/lib/sopData";

export const metadata: Metadata = { title: "SOP & Pedoman Kerja" };

export default function SopPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <Breadcrumbs items={[{ label: "SOP & Pedoman Kerja" }]} />
          <p className="mt-6 text-red-600 dark:text-red-500 text-sm font-semibold uppercase tracking-wide">
            Dokumen Organisasi
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] dark:text-white">
            SOP &amp; Pedoman Kerja CISDI
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-white/60 leading-relaxed">
            Seluruh dokumen SOP dan pedoman kerja yang berlaku di CISDI.
            Cari berdasarkan nama, jenis, atau divisi pemilik.
          </p>
          <p className="mt-1.5 text-xs text-zinc-400 dark:text-white/30">
            {sopData.length} dokumen tersedia
          </p>

          <div className="mt-8">
            <SopSection />
          </div>
        </section>
      </main>
    </>
  );
}
