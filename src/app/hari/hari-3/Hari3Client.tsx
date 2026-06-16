"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Info,
  Lightbulb,
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

// ── Primitives ───────────────────────────────────────────────────────────────

function Toggle({
  title,
  icon,
  children,
  defaultOpen = true,
  accent = "red",
}: {
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accent?: "red" | "blue" | "green" | "yellow" | "purple";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const borderMap = {
    red: "border-l-red-500",
    blue: "border-l-sky-500",
    green: "border-l-emerald-500",
    yellow: "border-l-amber-400",
    purple: "border-l-violet-500",
  };
  return (
    <div className={`mb-4 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03] border-l-4 ${borderMap[accent]}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.04]"
      >
        {icon && <span className="text-base leading-none shrink-0">{icon}</span>}
        <span className="flex-1 text-sm font-semibold text-zinc-800 dark:text-white">{title}</span>
        {open
          ? <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 dark:text-white/30" strokeWidth={2} />
          : <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 dark:text-white/30" strokeWidth={2} />}
      </button>
      {open && (
        <div className="border-t border-zinc-100 px-5 py-4 space-y-3 dark:border-white/[0.06]">
          {children}
        </div>
      )}
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
  if (variant === "tip") {
    return (
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" strokeWidth={2} />
        <div className="min-w-0">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-900 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" strokeWidth={2} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function SectionHeader({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="mt-12 mb-5 flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/30">
        {num}
      </span>
      <div className="flex-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{children}</h2>
        <div className="mt-1.5 h-0.5 w-full rounded-full bg-gradient-to-r from-red-500/60 to-transparent" />
      </div>
    </div>
  );
}

function SubSectionHeader({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 mb-4 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-lg dark:bg-white/10">
        {emoji}
      </span>
      <h3 className="text-base font-bold text-zinc-900 dark:text-white">{children}</h3>
    </div>
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
    <div
      onClick={onToggle}
      role="checkbox"
      aria-checked={isDone}
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && onToggle()}
      className={`group flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-all select-none ${
        isDone
          ? "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10"
          : "border-zinc-200 bg-zinc-50 hover:border-red-200 hover:bg-red-50/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-red-500/30"
      }`}
    >
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
        isDone ? "border-red-600 bg-red-600 text-white" : "border-zinc-300 dark:border-white/30 group-hover:border-red-400"
      }`}>
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <div className={`flex-1 text-sm leading-relaxed ${
        isDone ? "text-red-700 line-through decoration-red-400 dark:text-red-400" : "text-zinc-700 dark:text-white/70"
      }`}>
        {children}
      </div>
    </div>
  );
}

function YTEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="my-3 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
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

// ── Main ─────────────────────────────────────────────────────────────────────

export function Hari3Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const prevDay = programDays[1];
  const nextDay = programDays[3];

  function d(id: string) { return hydrated && isDone(id); }
  function t(id: string) { return () => toggleTask(id); }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Onboarding", href: "/program/onboarding" },
              { label: "Hari 3: Life at CISDI" },
            ]}
          />

          {/* ── Day hero ── */}
          <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 shadow-xl dark:from-zinc-900 dark:to-black">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎡</span>
              <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs font-semibold tracking-wide text-red-400">
                Hari 3 dari 5
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Life at CISDI
            </h1>
            <p className="mt-1 text-sm font-medium text-red-400">
              Hai, selamat datang di hari ketiga masa orientasi kamu! ✨
            </p>
            <p className="mt-2 text-sm text-white/50">
              Hari ini kamu akan mengenal lebih dekat kehidupan di CISDI — bukan
              hanya sebagai tempat bekerja, tetapi sebagai organisasi yang
              digerakkan oleh tujuan, kolaborasi, dan semangat belajar yang
              berkelanjutan.
            </p>
            <p className="mt-1 text-sm text-white/50">
              Di halaman ini, kamu akan menjelajahi tiga aspek penting kehidupan di CISDI:
            </p>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                <span>Progress hari ini</span>
                <span className="font-semibold text-white/70">{doneCount}/{ALL_TASK_IDS.length} task</span>
              </div>
              <ProgressBar value={doneCount} total={ALL_TASK_IDS.length} />
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              SECTION 1 — Life at CISDI
          ══════════════════════════════════════════════ */}
          <SectionHeader num="1">Life at CISDI</SectionHeader>

          {/* ── Civitas Organisasi ── */}
          <SubSectionHeader emoji="🪢">Civitas Organisasi</SubSectionHeader>
          <p className="mb-4 text-sm text-zinc-600 dark:text-white/60">
            Kenali struktur organisasi dan orang-orang hebat di balik berbagai inisiatif CISDI.
          </p>

          <Toggle title="Mengenal Struktur Organisasi CISDI" icon="🔍" accent="blue">
            <Callout>
              Di tahap ini kamu diharapkan bisa memahami jalur koordinasi di
              internal CISDI dan mengenal pihak-pihak yang akan berkolaborasi
              erat denganmu dalam aktivitas kerja sehari-hari.
            </Callout>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="mb-1 text-sm font-semibold text-zinc-800 dark:text-white">
                  1. Akses dan Pelajari{" "}
                  <span className="text-sky-600 dark:text-sky-400 underline">Struktur Organisasi</span>
                </p>
                <p className="text-sm text-zinc-600 dark:text-white/60">
                  Cari tau jalur koordinasi dan supervisi di internal departemen dan divisi.
                </p>
                <div className="mt-2">
                  <CheckItem id="d3-struktur" isDone={d("d3-struktur")} onToggle={t("d3-struktur")}>
                    Akses dan pelajari Struktur Organisasi CISDI
                  </CheckItem>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="mb-1 text-sm font-semibold text-zinc-800 dark:text-white">
                  2. Kunjungi kembali{" "}
                  <span className="text-sky-600 dark:text-sky-400 underline">Employee Directory</span>
                </p>
                <p className="text-sm text-zinc-600 dark:text-white/60">
                  Kenali rekan-rekan kerjamu dan temukan cara terbaik untuk berkomunikasi dan berkolaborasi dengan mereka 😊
                </p>
                <div className="mt-2">
                  <CheckItem id="d3-directory" isDone={d("d3-directory")} onToggle={t("d3-directory")}>
                    Kunjungi Employee Directory di Notion
                  </CheckItem>
                </div>
              </div>
            </div>
          </Toggle>

          {/* Yuk berefleksi */}
          <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
            <p className="font-semibold text-amber-800 dark:text-amber-200">🌞 Yuk, berefleksi!</p>
            <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
              Kamu baru saja bergabung di CISDI dengan posisi dan peranmu saat ini.
              Dalam pekan pertamamu, kamu diberi tugas untuk menangani sebuah proyek
              yang membutuhkan koordinasi dengan tim lain. Kamu telah mempelajari
              struktur organisasi dan <em>employee directory</em>. Seperti apa
              langkah-langkah lanjutan yang akan kamu lakukan dalam 1 (satu) pekan ke depan?
            </p>
            <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
              Refleksikan dan tuangkan gagasanmu pada kolom di bawah atau melalui{" "}
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
          <div className="mt-3">
            <CheckItem id="d3-reflection-1" isDone={d("d3-reflection-1")} onToggle={t("d3-reflection-1")}>
              Tulis refleksimu di Padlet (berefleksi pengalaman koordinasi)
            </CheckItem>
          </div>
          <div className="mt-3 h-[400px] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-white/10">
            <iframe
              src="https://padlet.com/knowledgelearning/yuk-berefleksi-pengalaman-koordinasi-di-pekan-pertama-wvv9r426nomqcwk4"
              title="Padlet Berefleksi Koordinasi"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <div className="mt-3">
            <Callout variant="tip">
              Tips: Saat berefleksi, coba pertimbangkan apa saja hal-hal yang
              mendukung dan menantang sehingga dapat membantumu menemukan strategi
              konkret dan tepat guna.
            </Callout>
          </div>

          {/* ── Interaksi Kolaboratif & Suportif ── */}
          <SubSectionHeader emoji="🤝">Interaksi yang Kolaboratif &amp; Suportif</SubSectionHeader>
          <p className="mb-4 text-sm text-zinc-600 dark:text-white/60">
            Pelajari bagaimana kita bekerja sama, berkomunikasi, dan mengekspresikan
            identitas CISDI melalui Brand Playbook, Panduan Visual, dan Pedoman Bermedia Sosial.
          </p>

          <Toggle title={<span><em>Brand Playbook</em> dan Panduan Visual CISDI</span>} icon="🎨" accent="purple">
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

          <Toggle title="Pedoman Bermedia Sosial bagi Karyawan CISDI" icon="📱" accent="green">
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

          {/* ── Pembelajaran Berkelanjutan ── */}
          <SubSectionHeader emoji="🌱">Pembelajaran Berkelanjutan</SubSectionHeader>
          <p className="mb-4 text-sm text-zinc-600 dark:text-white/60">
            Temukan berbagai cara CISDI mendukung pengembangan diri dan perjalanan belajar kamu di sini.
          </p>

          <Toggle title="Pembelajaran Berkelanjutan di CISDI" icon="📘" accent="blue">
            <div className="space-y-2 text-sm text-zinc-700 dark:text-white/70">
              <p>Di CISDI, setiap orang didorong untuk terus <strong>belajar, tumbuh, dan berkembang</strong>.</p>
              <p>
                Kami percaya bahwa pembelajaran tidak berhenti di masa orientasi —
                melainkan, menjadi bagian dari keseharian kerja.
              </p>
              <p>
                Kamu dapat mengajukan berbagai bentuk kegiatan belajar, baik yang
                relevan langsung dengan peranmu maupun yang memperluas wawasan di
                luar bidangmu. Kegiatan yang kamu ikuti, termasuk yang di luar{" "}
                <em>scope of work</em> (SOW), akan dihitung sebagai bagian dari pengembangan diri.
              </p>
              <p>
                Selain itu, setiap karyawan memiliki{" "}
                <strong><em>Individual Development Plan</em> (IDP)</strong>{" "}
                yang diperbaharui setiap tahun untuk membantu merancang perjalanan
                belajar dan target pengembangan kompetensi.
              </p>
              <p>
                Kamu juga bisa menjelajahi <em>Learning Space</em> CISDI —
                berisi rekaman, materi, dan sumber pembelajaran dari berbagai sesi
                sebelumnya yang dapat diakses kapan saja.
              </p>
            </div>
            <CheckItem id="d3-lifelong" isDone={d("d3-lifelong")} onToggle={t("d3-lifelong")}>
              Baca dan pahami program pembelajaran berkelanjutan di CISDI
            </CheckItem>
          </Toggle>

          <div className="mb-3 mt-2 flex items-center gap-2">
            <span className="text-base">🎯</span>
            <h4 className="font-semibold text-zinc-800 dark:text-white">Kanal Pembelajaran di CISDI</h4>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Toggle title="Pengajuan Kegiatan Belajar Internal CISDI" icon="📝" accent="yellow" defaultOpen>
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

            <Toggle title="Cakrawala Belajar" icon="🌏" accent="green" defaultOpen>
              <p className="text-sm text-zinc-600 dark:text-white/60">
                Cakrawala Belajar adalah ruang berbagi untuk semua civitas CISDI.
                Disini kamu bisa mempelajari sesi-sesi tematik, atau bahkan
                berbagi pengetahuan terkait topik-topik yang kamu ketahui.
                Jelajahi Cakrawala Belajar di halaman{" "}
                <Link href="/belajar" className="font-semibold text-red-600 underline dark:text-red-400">
                  Learning Space
                </Link>
              </p>
              <CheckItem id="d3-cakrawala" isDone={d("d3-cakrawala")} onToggle={t("d3-cakrawala")}>
                Jelajahi Cakrawala Belajar di Learning Space
              </CheckItem>
            </Toggle>
          </div>

          {/* ══════════════════════════════════════════════
              SECTION 2 — Mari Berefleksi
          ══════════════════════════════════════════════ */}
          <SectionHeader num="2">✍️ Mari berefleksi</SectionHeader>

          <p className="mb-3 text-sm text-zinc-600 dark:text-white/60">
            Pembelajaran yang baik dimulai dari kesadaran diri. Coba lakukan
            beberapa langkah sederhana berikut untuk menutup modul ini:
          </p>

          <div className="mb-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <ol className="ml-4 list-decimal space-y-2 text-sm text-zinc-600 dark:text-white/60">
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
              <li>Baca kembali SOW-mu dan identifikasi potensi diri yang bisa kamu kembangkan.</li>
              <li>Diskusikan hasil refleksi tersebut dengan atasanmu untuk menentukan bentuk dukungan pembelajaran yang sesuai.</li>
            </ol>
          </div>

          <CheckItem id="d3-action" isDone={d("d3-action")} onToggle={t("d3-action")}>
            Selesaikan 3 langkah penutup modul (jurnal, baca SOW, diskusi atasan)
          </CheckItem>

          <blockquote className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-sm italic text-zinc-600 dark:text-white/60">
              &ldquo;Apa keterampilan yang ingin kamu kembangkan kedepannya, dan
              bagaimana cara yang kamu ingin lakukan untuk dapat mencapainya?&rdquo;
            </p>
          </blockquote>

          <div className="mt-3">
            <CheckItem id="d3-reflection-2" isDone={d("d3-reflection-2")} onToggle={t("d3-reflection-2")}>
              Tulis refleksimu di Padlet (lifelong learning)
            </CheckItem>
          </div>
          <div className="mt-3 h-[400px] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-white/10">
            <iframe
              src="https://padlet.com/knowledgelearning/longlife-learning-e4mwq3ijw0z4fbwe"
              title="Padlet Lifelong Learning"
              className="h-full w-full"
              loading="lazy"
            />
          </div>

          <div className="mt-4">
            <Callout>
              Pembelajaran di CISDI bersifat kolaboratif — jangan ragu untuk
              berbagi pengetahuan, mengajukan ide sesi belajar, atau belajar dari
              rekan kerja di lintas tim. Setiap interaksi bisa menjadi ruang belajar baru.
            </Callout>
          </div>

          {/* ── Sesi Penyelarasan ── */}
          <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-6 shadow-lg shadow-red-600/20">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="text-2xl">📌</span>
              <h3 className="text-lg font-bold text-white">Sesi Penyelarasan</h3>
            </div>
            <p className="mb-4 text-sm text-red-100">
              Sesi penyelarasan dilaksanakan sesuai dengan jadwal yang telah
              tercantum pada kalender Google, pastikan telah mengakses seluruh
              materi asinkronus laman program orientasi karyawan CISDI hingga hari ketiga.
            </p>
            <div
              onClick={t("d3-sesi")}
              role="checkbox"
              aria-checked={d("d3-sesi")}
              tabIndex={0}
              onKeyDown={(e) => e.key === " " && t("d3-sesi")()}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all select-none ${
                d("d3-sesi")
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-white/20 bg-white/10 text-red-100 hover:bg-white/20"
              }`}
            >
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${d("d3-sesi") ? "border-white bg-white text-red-600" : "border-white/50"}`}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className={`text-sm font-medium ${d("d3-sesi") ? "line-through" : ""}`}>
                Ikuti Sesi Penyelarasan Hari Ketiga
              </span>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="mt-10 flex items-center justify-between">
            {prevDay && (
              <Link href={`/hari/${prevDay.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-white/60 hover:text-red-600 dark:hover:text-red-500">
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                {prevDay.title}
              </Link>
            )}
            {nextDay && (
              <Link href={`/hari/${nextDay.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline">
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
