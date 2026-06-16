"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Info,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/useProgress";
import { programDays } from "@/lib/data";

const ALL_TASK_IDS = [
  "d2-gedsi",
  "d2-anti-kekerasan",
  "d2-anti-korupsi",
  "d2-sop",
  "d2-penamaan-dokumen",
  "d2-renja",
  "d2-tugas-mandiri",
  "d2-finance",
  "d2-hc",
  "d2-kl",
  "d2-praktik-pengajuan",
  "d2-reflection",
  "d2-sesi",
];

function Toggle({
  title,
  children,
  defaultOpen = true,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1.5 py-1 text-left text-sm font-semibold text-zinc-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 dark:text-white/40" strokeWidth={2} />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 dark:text-white/40" strokeWidth={2} />
        )}
        {title}
      </button>
      {open && <div className="pl-5 mt-1 space-y-2">{children}</div>}
    </div>
  );
}

function Callout({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "tip";
}) {
  const cls =
    variant === "tip"
      ? "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 text-yellow-900 dark:text-yellow-200"
      : "bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/20 text-sky-900 dark:text-sky-200";
  return (
    <div className={`flex gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${cls}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 opacity-70" strokeWidth={2} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-4 border-b border-red-100 dark:border-red-900/30 pb-2 text-xl font-bold text-red-600 dark:text-red-500">
      {children}
    </h2>
  );
}

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

const KALENDER_EVENTS = [
  { name: "[ Internal ] Sharing Session Pre Visit Pencerah Nusantara", status: "Scheduled", date: "June 19, 2026" },
  { name: "Health Inc x LBP", status: "Scheduled", date: "June 13, 2026" },
  { name: "Site Visit Kendal", status: "Scheduled", date: "June 8 – June 12, 2026" },
  { name: "Outing CISDI 2026", status: "Scheduled", date: "June 5 – June 6, 2026" },
  { name: "Leadership Retreat 2026", status: "Scheduled", date: "June 4 – June 5, 2026" },
  { name: "Diseminasi Kampanye Keluarga Berimun", status: "Scheduled", date: "June 2, 2026" },
  { name: 'Health Inc Networthing x TC: Bedah Buku "Kretek Capitalism"', status: "Scheduled", date: "May 23, 2026" },
  { name: "Ko-kreasi LBP - Jakarta", status: "Scheduled", date: "May 20, 2026" },
  { name: "WCTC - Dublin", status: "Scheduled", date: "May 15, 2026" },
  { name: "Quarterly Review 1 - 2026", status: "Done", date: "May 12 – May 13, 2026" },
  { name: "PHIL Public Lecture", status: "Scheduled", date: "May 7, 2026" },
  { name: "Konferensi Pers TC", status: "Scheduled", date: "April 30, 2026" },
  { name: "Diseminasi NPM Study - Food Policy", status: "Scheduled", date: "April 28, 2026" },
  { name: "Networthing: Hari Bumi", status: "Scheduled", date: "April 25, 2026" },
  { name: "Ko-kreasi Viriya LBP - Tangerang Selatan", status: "Scheduled", date: "April 23, 2026" },
  { name: "Belajar Bareng CISDI: Training Supportive-Supervision #2", status: "Scheduled", date: "April 22, 2026" },
  { name: "Kickoff Co-Impact 2026-2030", status: "Scheduled", date: "April 16, 2026" },
  { name: "FGD IDLO - Advocacy & Campaign Tool Kit", status: "Scheduled", date: "March 30 – March 31, 2026" },
  { name: "Networthing - Health Inc Community x Teman CISDI x STAND", status: "Scheduled", date: "March 14, 2026" },
  { name: "Sosialisasi Lapor SPT 2025", status: "Done", date: "March 10, 2026" },
  { name: "Buka Bersama CISDI", status: "Done", date: "March 9, 2026" },
  { name: 'World Obesity DAY 2026 "Finding Healthy Food"', status: "Scheduled", date: "March 7, 2026" },
  { name: "FGD Baseline Viriya", status: "Done", date: "January 20, 2026" },
  { name: "Kroni Untung, Anak-Anak Diracun? Peringatan 1 Tahun Proyek MBG (ICW)", status: "Done", date: "January 8, 2026" },
];

export function Hari2Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const prevDay = programDays[0];
  const nextDay = programDays[2];

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
              { label: "Hari 2: Ekosistem Kerja, Kebijakan & Pedoman CISDI" },
            ]}
          />

          {/* ── Day header ── */}
          <div className="mt-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎡</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
                Hari 2 dari 5
              </span>
            </div>
            <h1 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
              Halo! Mari berkenalan lebih jauh dengan ekosistem kerja CISDI.
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Hari ini kita akan mengupas bagaimana prinsip Sehat, Adil, Setara
              diimplementasikan dalam kebijakan dan pedoman internal CISDI.
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Topik hari ini juga akan mengantarkanmu pada cara menggunakan
              pedoman kerja yang akan sering kamu akses sesuai dengan peran saat
              ini.
            </p>
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

          {/* ══════════════════════════════════════════════════
              SECTION 1 — Mengenal Ekosistem Kerja CISDI
          ══════════════════════════════════════════════════ */}
          <SectionHeader>Mengenal Ekosistem Kerja CISDI</SectionHeader>

          <Toggle title="Praktik GEDSI dalam Lingkungan CISDI">
            <Callout>
              CISDI menerapkan kebijakan internal untuk mencegah dan menangani
              tindak kekerasan/pelecehan di lingkungan kerja.{" "}
              <strong>Pelajari</strong>{" "}
              <span className="font-semibold underline text-sky-700 dark:text-sky-300">
                GEDSI 101
              </span>
            </Callout>
            <CheckItem id="d2-gedsi" isDone={d("d2-gedsi")} onToggle={t("d2-gedsi")}>
              Pelajari GEDSI 101
            </CheckItem>
          </Toggle>

          <Toggle title="Mitigasi Perilaku Kekerasan dan Pelecehan di Lingkungan Kerja CISDI">
            <Callout>
              CISDI menerapkan kebijakan internal untuk mencegah dan menangani
              tindak kekerasan/pelecehan di lingkungan kerja.{" "}
              <strong>Pelajari</strong>{" "}
              <span className="font-semibold underline text-sky-700 dark:text-sky-300">
                Kebijakan Anti Kekerasan dan Pelecehan di Ruang Kerja
              </span>
            </Callout>
            <CheckItem id="d2-anti-kekerasan" isDone={d("d2-anti-kekerasan")} onToggle={t("d2-anti-kekerasan")}>
              Pelajari Kebijakan Anti Kekerasan dan Pelecehan di Ruang Kerja
            </CheckItem>
          </Toggle>

          <Toggle title="Mitigasi Perilaku Penggelapan dan KKN di Lingkungan Kerja CISDI">
            <Callout>
              CISDI menerapkan kebijakan internal untuk mencegah dan menangani
              tindak penggelapan dan KKN di lingkungan kerja.{" "}
              <strong>Pelajari</strong>{" "}
              <span className="font-semibold underline text-sky-700 dark:text-sky-300">
                Kebijakan Anti Korupsi dan Fraud
              </span>
            </Callout>
            <CheckItem id="d2-anti-korupsi" isDone={d("d2-anti-korupsi")} onToggle={t("d2-anti-korupsi")}>
              Pelajari Kebijakan Anti Korupsi dan Fraud
            </CheckItem>
          </Toggle>

          <Toggle title="SOP, Kebijakan, dan Pedoman Internal">
            <Callout>
              <p>
                Di tahap ini, kamu perlu mengenal direktori kebijakan, SOP, dan
                pedoman internal CISDI. Silakan identifikasi dan akses dokumen
                yang relevan dengan aktivitas pekerjaanmu.
              </p>
              <p className="mt-2">
                Kamu juga bisa meminta arahan dari supervisor terkait kebijakan
                mana yang perlu dipelajari.{" "}
                <strong>Akses dan eksplorasi laman</strong>{" "}
                <span className="font-semibold underline text-sky-700 dark:text-sky-300">
                  SOP, Pedoman &amp; Kebijakan Internal
                </span>
              </p>
            </Callout>
            <CheckItem id="d2-sop" isDone={d("d2-sop")} onToggle={t("d2-sop")}>
              Akses dan eksplorasi laman SOP, Pedoman &amp; Kebijakan Internal
            </CheckItem>
          </Toggle>

          {/* ══════════════════════════════════════════════════
              SECTION 2 — Menggunakan dan Mengimplementasi Pedoman
          ══════════════════════════════════════════════════ */}
          <SectionHeader>Menggunakan dan Mengimplementasi Pedoman</SectionHeader>

          <Toggle title="Pedoman Penamaan dan Penyimpanan Dokumen">
            <Callout>
              Kamu perlu memahami standar penamaan dan penyimpanan dokumen di
              internal CISDI. Silakan pelajari{" "}
              <span className="font-semibold underline text-sky-700 dark:text-sky-300">
                Pedoman Penamaan dan Penyimpanan Dokumen
              </span>
            </Callout>
            <CheckItem id="d2-penamaan-dokumen" isDone={d("d2-penamaan-dokumen")} onToggle={t("d2-penamaan-dokumen")}>
              Pelajari Pedoman Penamaan dan Penyimpanan Dokumen
            </CheckItem>
          </Toggle>

          <Toggle title={<span>Rencana Kerja (w<em>ork plan</em>) Unit Departemen/Project</span>}>
            <Callout>
              <p>
                Di tahap ini, kamu perlu mengetahui rencana kerja dari unit
                kerjamu.{" "}
                <strong className="text-sky-700 dark:text-sky-300 underline">
                  Akses dan pelajari rencana kerja di tahun berjalan.
                </strong>
              </p>
              <p className="mt-1">
                Simak pembahasan rencana kerja tahun berjalan dari tautan laman
                di bawah ini.
              </p>
            </Callout>
            <CheckItem id="d2-renja" isDone={d("d2-renja")} onToggle={t("d2-renja")}>
              Akses dan pelajari rencana kerja unit/departemen di tahun berjalan
            </CheckItem>

            {/* Kalender CISDI table */}
            <div className="mt-3">
              <p className="mb-2 text-sm font-semibold text-zinc-800 dark:text-white">
                Kalender CISDI
              </p>
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
                      <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-white/70">
                        Nama Kegiatan/Aktivitas
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-white/70 w-28">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-white/70 w-36">
                        Tanggal Kegiatan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {KALENDER_EVENTS.map((ev, i) => (
                      <tr
                        key={i}
                        className="border-b border-zinc-100 last:border-0 dark:border-white/5"
                      >
                        <td className="px-4 py-2.5 text-zinc-700 dark:text-white/70">
                          {ev.name}
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
                              ev.status === "Done"
                                ? "bg-zinc-100 text-zinc-500 dark:bg-white/10 dark:text-white/50"
                                : "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                            }`}
                          >
                            {ev.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-zinc-500 dark:text-white/50 text-xs">
                          {ev.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tugas Mandiri */}
            <div className="mt-5">
              <h4 className="mb-2 font-semibold text-red-600 dark:text-red-400">
                Tugas Mandiri: Membuat Draf Diskusi Rencana Kerja
              </h4>
              <ol className="ml-4 list-decimal space-y-1.5 text-sm text-zinc-600 dark:text-white/60">
                <li>Baca rencana kerja dari departemen kamu saat ini,</li>
                <li>
                  Catat apa saja hal yang ingin kamu ketahui dari Supervisor
                  terkait rencana kerja yang akan dilakukan,
                </li>
                <li>
                  Diskusikan hal tersebut dalam pertemuan yang sudah kamu
                  jadwalkan.
                </li>
              </ol>
              <CheckItem id="d2-tugas-mandiri" isDone={d("d2-tugas-mandiri")} onToggle={t("d2-tugas-mandiri")}>
                Selesaikan tugas mandiri membuat draf diskusi rencana kerja (3
                langkah)
              </CheckItem>
            </div>
          </Toggle>

          <Toggle title="Alur Pengajuan Reguler">
            <Callout>
              <p>
                Dalam pekerjaan di CISDI sehari-hari, kamu akan membutuhkan
                berbagai aktivitas permintaan terkait administrasi, keuangan dan
                kebutuhan lintas fungsi lainnya.
              </p>
              <p className="mt-2">
                Pelajari alur kerja atau alur pengajuan reguler terkait Finance
                &amp; Administration, Human Capital, dan Knowledge &amp;
                Learning. Di bawah ini merupakan panduan teknis dari{" "}
                <em>regular request</em> yang berlaku dari divisi-divisi di
                CISDI.
              </p>
            </Callout>

            <div className="mt-3 space-y-4">
              {/* Finance & Administration */}
              <div>
                <p className="mb-1.5 font-semibold text-sky-600 dark:text-sky-400">
                  Finance &amp; Administration
                </p>
                <ul className="ml-4 space-y-1 text-sm text-zinc-600 dark:text-white/60">
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">🔖</span> Panduan Pengadaan
                    Barang dan Jasa
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>💵</span> Panduan Pengajuan Nota Keuangan
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">🔖</span> Panduan Penggunaan
                    Ruangan Kantor CISDI
                  </li>
                </ul>
                <CheckItem id="d2-finance" isDone={d("d2-finance")} onToggle={t("d2-finance")}>
                  Pelajari panduan Finance &amp; Administration
                </CheckItem>
              </div>

              {/* Human Capital */}
              <div>
                <p className="mb-1.5 font-semibold text-sky-600 dark:text-sky-400">
                  Human Capital
                </p>
                <ul className="ml-4 space-y-1 text-sm text-zinc-600 dark:text-white/60">
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">🔖</span> Panduan Pengajuan
                    Cuti dan Pengganti Hari
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">🔖</span> Panduan Pengajuan
                    Lembur
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">🔖</span> Panduan Pengajuan
                    Kegiatan Belajar Internal Karyawan CISDI
                  </li>
                </ul>
                <CheckItem id="d2-hc" isDone={d("d2-hc")} onToggle={t("d2-hc")}>
                  Pelajari panduan Human Capital
                </CheckItem>
              </div>

              {/* Knowledge & Learning */}
              <div>
                <p className="mb-1.5 font-semibold text-sky-600 dark:text-sky-400">
                  Knowledge &amp; Learning
                </p>
                <ul className="ml-4 space-y-1 text-sm text-zinc-600 dark:text-white/60">
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">🔖</span> Panduan Unggah
                    Konten ke Website CISDI
                  </li>
                </ul>
                <CheckItem id="d2-kl" isDone={d("d2-kl")} onToggle={t("d2-kl")}>
                  Pelajari panduan Knowledge &amp; Learning
                </CheckItem>
              </div>
            </div>

            {/* Praktik Mandiri */}
            <div className="mt-4">
              <h4 className="mb-2 font-semibold text-red-600 dark:text-red-400">
                Praktik Mandiri: Coba Alur Pengajuan Reguler
              </h4>
              <p className="mb-2 text-sm text-zinc-600 dark:text-white/60">
                Setelah mengenali beberapa alur pengajuan reguler di CISDI, mari
                praktik secara langsung dengan mengikuti langkah-langkah
                berikut:
              </p>
              <ol className="ml-4 list-decimal space-y-1.5 text-sm text-zinc-600 dark:text-white/60">
                <li>
                  Kirim pengajuan cuti mengikuti langkah-langkah yang ada,
                </li>
                <li>
                  Sematkan kata{" "}
                  <strong className="text-zinc-800 dark:text-white">
                    &lsquo;[Tugas Program Orientasi]&rsquo;
                  </strong>{" "}
                  pada subject agar cuti tidak terpotong,
                </li>
                <li>
                  Tag <strong>@Yurdhinda Aprilia</strong> dan{" "}
                  <strong>@ayu.purnamasari@cisdi.org</strong> juga, ya!
                </li>
                <li>
                  Setelahnya praktik pengajuan ini akan mendapatkan respons dari
                  Supervisor dan tim human Capital.
                </li>
              </ol>
              <CheckItem id="d2-praktik-pengajuan" isDone={d("d2-praktik-pengajuan")} onToggle={t("d2-praktik-pengajuan")}>
                Selesaikan praktik alur pengajuan reguler (4 langkah)
              </CheckItem>
            </div>
          </Toggle>

          {/* ══════════════════════════════════════════════════
              SECTION 3 — Refleksi Pembelajaran
          ══════════════════════════════════════════════════ */}
          <SectionHeader>Refleksi Pembelajaran</SectionHeader>

          <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
            <p className="font-semibold text-red-800 dark:text-red-200">
              📌 Mari berefleksi sejenak dengan dipandu pertanyaan berikut:
            </p>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">
              Seperti apa langkah awal yang kamu lakukan untuk memastikan
              rencana kerja kamu selaras dengan prioritas CISDI?
            </p>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
              Tulis hasil refleksimu pada laman di bawah ini.
            </p>
          </div>

          <CheckItem id="d2-reflection" isDone={d("d2-reflection")} onToggle={t("d2-reflection")}>
            Tulis refleksimu di Padlet
          </CheckItem>
          <div className="mt-2 h-[480px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
            <iframe
              src="https://padlet.com/knowledgelearning/menyelaraskan-strategi-dengan-prioritas-ccisdi-mt7gbrwdmadywyjt"
              title="Padlet Refleksi Rencana Kerja"
              className="h-full w-full"
              loading="lazy"
            />
          </div>

          {/* ── Sesi Penyelarasan ── */}
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">📌</span>
              <h3 className="font-bold text-red-800 dark:text-red-300">
                Sesi Penyelarasan
              </h3>
            </div>
            <p className="mb-3 text-sm text-red-700 dark:text-red-300">
              Sesi penyelarasan dilaksanakan sesuai dengan jadwal yang telah
              tercantum pada kalender Google, pastikan telah mengakses seluruh
              materi asinkronus laman program orientasi karyawan CISDI hari
              kedua.
            </p>
            <CheckItem id="d2-sesi" isDone={d("d2-sesi")} onToggle={t("d2-sesi")}>
              Ikuti Sesi Penyelarasan Hari Kedua
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
