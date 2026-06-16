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
  "d3-struktur",
  "d3-directory",
  "d3-reflection-1",
  "d3-brand",
  "d3-medsos",
  "d3-lifelong",
  "d3-pengajuan-belajar",
  "d3-cakrawala",
  "d3-action",
  "d3-reflection-2",
  "d3-sesi",
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

function SubSectionHeader({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-white">
      <span>{emoji}</span>
      {children}
    </h3>
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

function YTEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="my-2 aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function Hari3Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const prevDay = programDays[1];
  const nextDay = programDays[3];

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
              { label: "Hari 3: Life at CISDI" },
            ]}
          />

          {/* ── Day header ── */}
          <div className="mt-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎡</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
                Hari 3 dari 5
              </span>
            </div>
            <h1 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
              Life at CISDI
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Hai, selamat datang di hari ketiga masa orientasi kamu! ✨
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Hari ini kamu akan mengenal lebih dekat kehidupan di CISDI — bukan
              hanya sebagai tempat bekerja, tetapi sebagai organisasi yang
              digerakkan oleh tujuan, kolaborasi, dan semangat belajar yang
              berkelanjutan.
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Di halaman ini, kamu akan menjelajahi tiga aspek penting kehidupan
              di CISDI:
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
              SECTION 1 — Civitas Organisasi
          ══════════════════════════════════════════════════ */}
          <SectionHeader>Life at CISDI</SectionHeader>

          <SubSectionHeader emoji="🪢">Civitas Organisasi</SubSectionHeader>
          <p className="mb-4 text-sm text-zinc-600 dark:text-white/60">
            Kenali struktur organisasi dan orang-orang hebat di balik berbagai
            inisiatif CISDI.
          </p>

          <Toggle title={<span>🔍 Mengenal Struktur Organisasi CISDI</span>}>
            <Callout>
              Di tahap ini kamu diharapkan bisa memahami jalur koordinasi di
              internal CISDI dan mengenal pihak-pihak yang akan berkolaborasi
              erat denganmu dalam aktivitas kerja sehari-hari.
            </Callout>

            <div className="mt-2 space-y-3 text-sm text-zinc-600 dark:text-white/60">
              <div>
                <p className="font-semibold text-zinc-800 dark:text-white">
                  1. Akses dan Pelajari{" "}
                  <span className="font-semibold underline text-sky-600 dark:text-sky-400">
                    Struktur Organisasi
                  </span>
                </p>
                <p className="mt-0.5 ml-4">
                  Cari tau jalur koordinasi dan supervisi di internal departemen
                  dan divisi.
                </p>
                <div className="ml-4 mt-1">
                  <CheckItem id="d3-struktur" isDone={d("d3-struktur")} onToggle={t("d3-struktur")}>
                    Akses dan pelajari Struktur Organisasi CISDI
                  </CheckItem>
                </div>
              </div>

              <div>
                <p className="font-semibold text-zinc-800 dark:text-white">
                  2. Kunjungi kembali{" "}
                  <span className="font-semibold underline text-sky-600 dark:text-sky-400">
                    Employee Directory
                  </span>
                </p>
                <p className="mt-0.5 ml-4">
                  Kenali rekan-rekan kerjamu dan temukan cara terbaik untuk
                  berkomunikasi dan berkolaborasi dengan mereka 😊
                </p>
                <div className="ml-4 mt-1">
                  <CheckItem id="d3-directory" isDone={d("d3-directory")} onToggle={t("d3-directory")}>
                    Kunjungi Employee Directory di Notion
                  </CheckItem>
                </div>
              </div>
            </div>
          </Toggle>

          {/* Yuk berefleksi */}
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <p className="font-semibold text-amber-800 dark:text-amber-200">
              🌞 Yuk, berefleksi!
            </p>
            <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
              Kamu baru saja bergabung di CISDI dengan posisi dan peranmu saat
              ini. Dalam pekan pertamamu, kamu diberi tugas untuk menangani
              sebuah proyek yang membutuhkan koordinasi dengan tim lain. Kamu
              telah mempelajari struktur organisasi dan{" "}
              <em>employee directory</em>. Seperti apa langkah-langkah lanjutan
              yang akan kamu lakukan dalam 1 (satu) pekan ke depan?
            </p>
            <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
              Refleksikan dan tuangkan gagasanmu pada kolom di bawah atau
              melalui{" "}
              <a
                href="https://padlet.com/knowledgelearning/yuk-berefleksi-pengalaman-koordinasi-di-pekan-pertama-wvv9r426nomqcwk4"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                tautan ini
              </a>
              .
            </p>
          </div>
          <CheckItem id="d3-reflection-1" isDone={d("d3-reflection-1")} onToggle={t("d3-reflection-1")}>
            Tulis refleksimu di Padlet (berefleksi pengalaman koordinasi)
          </CheckItem>
          <div className="mt-2 h-[400px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
            <iframe
              src="https://padlet.com/knowledgelearning/yuk-berefleksi-pengalaman-koordinasi-di-pekan-pertama-wvv9r426nomqcwk4"
              title="Padlet Berefleksi Koordinasi"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <Callout variant="tip">
            Tips: Saat berefleksi, coba pertimbangkan apa saja hal-hal yang
            mendukung dan menantang sehingga dapat membantumu menemukan strategi
            konkret dan tepat guna.
          </Callout>

          {/* ══════════════════════════════════════════════════
              SECTION 2 — Interaksi yang Kolaboratif & Suportif
          ══════════════════════════════════════════════════ */}
          <SubSectionHeader emoji="🤝">
            Interaksi yang Kolaboratif &amp; Suportif
          </SubSectionHeader>
          <p className="mb-4 text-sm text-zinc-600 dark:text-white/60">
            Pelajari bagaimana kita bekerja sama, berkomunikasi, dan
            mengekspresikan identitas CISDI melalui Brand Playbook, Panduan
            Visual, dan Pedoman Bermedia Sosial.
          </p>

          <Toggle title={<span>🎨 <em>Brand Playbook</em> dan Panduan Visual CISDI</span>}>
            <Callout>
              Dalam aktivitas kerja, kamu akan merepresentasikan CISDI dalam
              bentuk-bentuk narasi atau visual — baik presentasi, laporan,
              maupun unggahan media sosial. Di tahap ini, kamu perlu memahami
              panduan &lsquo;<em>branding</em>&rsquo; dan penggunaan materi
              visual CISDI. Pelajari{" "}
              <span className="font-semibold underline">
                Brand Playbook &amp; Panduan Identitas Visual CISDI
              </span>
            </Callout>
            <CheckItem id="d3-brand" isDone={d("d3-brand")} onToggle={t("d3-brand")}>
              Pelajari Brand Playbook &amp; Panduan Identitas Visual CISDI
            </CheckItem>
            <Callout variant="tip">
              <em>Tip:</em> Saat membuat materi visual atau tulisan, bayangkan
              bagaimana karyamu akan dilihat oleh publik — apakah sudah
              menggambarkan nilai-nilai yang menjadi ciri khas CISDI?
            </Callout>
          </Toggle>

          <Toggle title={<span>📱 Pedoman Bermedia Sosial bagi Karyawan CISDI</span>}>
            <Callout>
              <p>
                Sebagai karyawan CISDI, aktivitasmu di media sosial juga
                mencerminkan nilai dan citra organisasi.
              </p>
              <p className="mt-2">
                Panduan ini membantu kamu memahami bagaimana bermedia sosial
                dengan bijak, menjaga batasan, serta menavigasi situasi yang
                mungkin muncul di ruang digital. Akses dan pelajari{" "}
                <span className="font-semibold underline">
                  Pedoman Bermedia Sosial Bagi Karyawan CISDI
                </span>
              </p>
            </Callout>
            <CheckItem id="d3-medsos" isDone={d("d3-medsos")} onToggle={t("d3-medsos")}>
              Akses dan pelajari Pedoman Bermedia Sosial Bagi Karyawan CISDI
            </CheckItem>
            <YTEmbed videoId="kt7ktiqVP5I" title="Pedoman Bermedia Sosial Karyawan CISDI" />
          </Toggle>

          {/* ══════════════════════════════════════════════════
              SECTION 3 — Pembelajaran Berkelanjutan
          ══════════════════════════════════════════════════ */}
          <SubSectionHeader emoji="🌱">Pembelajaran Berkelanjutan</SubSectionHeader>
          <p className="mb-4 text-sm text-zinc-600 dark:text-white/60">
            Temukan berbagai cara CISDI mendukung pengembangan diri dan
            perjalanan belajar kamu di sini.
          </p>

          <Toggle title={<span>📘 Pembelajaran Berkelanjutan di CISDI</span>}>
            <div className="space-y-2 text-sm text-zinc-700 dark:text-white/70">
              <p>
                Di CISDI, setiap orang didorong untuk terus{" "}
                <strong>belajar, tumbuh, dan berkembang</strong>.
              </p>
              <p>
                Kami percaya bahwa pembelajaran tidak berhenti di masa orientasi
                — melainkan, menjadi bagian dari keseharian kerja.
              </p>
              <p>
                Kamu dapat mengajukan berbagai bentuk kegiatan belajar, baik
                yang relevan langsung dengan peranmu maupun yang memperluas
                wawasan di luar bidangmu. Kegiatan yang kamu ikuti, termasuk
                yang di luar <em>scope of work</em> (SOW), akan dihitung sebagai
                bagian dari pengembangan diri.
              </p>
              <p>
                Selain itu, setiap karyawan memiliki{" "}
                <strong>
                  <em>Individual Development Plan</em> (IDP)
                </strong>{" "}
                yang diperbaharui setiap tahun untuk membantu merancang
                perjalanan belajar dan target pengembangan kompetensi.
              </p>
              <p>
                Kamu juga bisa menjelajahi <em>Learning Space</em> CISDI —
                berisi rekaman, materi, dan sumber pembelajaran dari berbagai
                sesi sebelumnya yang dapat diakses kapan saja.
              </p>
            </div>
            <CheckItem id="d3-lifelong" isDone={d("d3-lifelong")} onToggle={t("d3-lifelong")}>
              Baca dan pahami program pembelajaran berkelanjutan di CISDI
            </CheckItem>
          </Toggle>

          <h4 className="mt-4 mb-2 font-semibold text-zinc-800 dark:text-white">
            🎯 Kanal Pembelajaran di CISDI
          </h4>

          <Toggle title="Pengajuan Kegiatan Belajar Internal CISDI">
            <p className="text-sm text-zinc-600 dark:text-white/60">
              Kamu dapat mengajukan ide atau kebutuhan belajar pada tim Learning
              &amp; Development melalui formulir pengajuan pembelajaran internal.
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Panduan dan tautan pengajuan dapat kamu temukan di halaman{" "}
              <span className="font-semibold underline text-sky-600 dark:text-sky-400">
                Panduan Pengajuan Kegiatan Belajar Internal Karyawan CISDI
              </span>
            </p>
            <CheckItem id="d3-pengajuan-belajar" isDone={d("d3-pengajuan-belajar")} onToggle={t("d3-pengajuan-belajar")}>
              Pelajari Panduan Pengajuan Kegiatan Belajar Internal Karyawan CISDI
            </CheckItem>
          </Toggle>

          <Toggle title="Cakrawala Belajar">
            <p className="text-sm text-zinc-600 dark:text-white/60">
              Cakrawala Belajar adalah ruang berbagi untuk semua civitas CISDI.
              Disini kamu bisa mempelajari sesi-sesi tematik, atau bahkan
              berbagi pengetahuan terkait topik-topik yang kamu ketahui.
              Jelajahi Cakrawala Belajar di halaman{" "}
              <Link
                href="/belajar"
                className="font-semibold text-red-600 underline dark:text-red-400"
              >
                Learning Space
              </Link>
            </p>
            <CheckItem id="d3-cakrawala" isDone={d("d3-cakrawala")} onToggle={t("d3-cakrawala")}>
              Jelajahi Cakrawala Belajar di Learning Space
            </CheckItem>
          </Toggle>

          {/* ══════════════════════════════════════════════════
              SECTION 4 — Mari Berefleksi
          ══════════════════════════════════════════════════ */}
          <SectionHeader>✍️ Mari berefleksi</SectionHeader>

          <p className="mb-3 text-sm text-zinc-600 dark:text-white/60">
            Pembelajaran yang baik dimulai dari kesadaran diri. Coba lakukan
            beberapa langkah sederhana berikut untuk menutup modul ini:
          </p>

          <ol className="ml-4 list-decimal space-y-1.5 text-sm text-zinc-600 dark:text-white/60">
            <li>
              Tulis jurnal refleksi pribadi tentang hal-hal yang ingin kamu
              pelajari di CISDI melalui{" "}
              <a
                href="https://padlet.com/knowledgelearning/longlife-learning-e4mwq3ijw0z4fbwe"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline text-red-600 dark:text-red-400"
              >
                tautan ini
              </a>
            </li>
            <li>
              Baca kembali SOW-mu dan identifikasi potensi diri yang bisa kamu
              kembangkan.
            </li>
            <li>
              Diskusikan hasil refleksi tersebut dengan atasanmu untuk
              menentukan bentuk dukungan pembelajaran yang sesuai.
            </li>
          </ol>

          <CheckItem id="d3-action" isDone={d("d3-action")} onToggle={t("d3-action")}>
            Selesaikan 3 langkah penutup modul (jurnal, baca SOW, diskusi atasan)
          </CheckItem>

          <blockquote className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm italic text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            &ldquo;Apa keterampilan yang ingin kamu kembangkan kedepannya, dan
            bagaimana cara yang kamu ingin lakukan untuk dapat
            mencapainya?&rdquo;
          </blockquote>

          <CheckItem id="d3-reflection-2" isDone={d("d3-reflection-2")} onToggle={t("d3-reflection-2")}>
            Tulis refleksimu di Padlet (lifelong learning)
          </CheckItem>
          <div className="mt-2 h-[400px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
            <iframe
              src="https://padlet.com/knowledgelearning/longlife-learning-e4mwq3ijw0z4fbwe"
              title="Padlet Lifelong Learning"
              className="h-full w-full"
              loading="lazy"
            />
          </div>

          <Callout>
            Pembelajaran di CISDI bersifat kolaboratif — jangan ragu untuk
            berbagi pengetahuan, mengajukan ide sesi belajar, atau belajar dari
            rekan kerja di lintas tim. Setiap interaksi bisa menjadi ruang
            belajar baru.
          </Callout>

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
              materi asinkronus laman program orientasi karyawan CISDI hingga
              hari ketiga.
            </p>
            <CheckItem id="d3-sesi" isDone={d("d3-sesi")} onToggle={t("d3-sesi")}>
              Ikuti Sesi Penyelarasan Hari Ketiga
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
