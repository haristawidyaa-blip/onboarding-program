"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Info,
  Lightbulb,
  Check,
  ArrowRight,
  ArrowUpRight,
  Database,
  Globe,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/useProgress";
import { programDays } from "@/lib/data";

const ALL_TASK_IDS = [
  "d1-video-visi-misi",
  "d1-visi-misi-pedoman",
  "d1-isu-prioritas",
  "d1-public-health",
  "d1-phc",
  "d1-learning-space",
  "d1-update-info",
  "d1-reflection",
  "d1-gmail",
  "d1-group-email",
  "d1-slack-video",
  "d1-slack-notif-video",
  "d1-slack-profile",
  "d1-pedoman-komunikasi",
  "d1-praktik-ekosistem",
  "d1-gcal",
  "d1-gmeet",
  "d1-gdocs",
  "d1-gdrive",
  "d1-notion-video",
  "d1-notion-signup",
  "d1-pum",
  "d1-sesi",
];

// ── Primitives ──────────────────────────────────────────────────────────────

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
        {icon && (
          <span className="text-base leading-none shrink-0">{icon}</span>
        )}
        <span className="flex-1 text-sm font-semibold text-zinc-800 dark:text-white">
          {title}
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 dark:text-white/30" strokeWidth={2} />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 dark:text-white/30" strokeWidth={2} />
        )}
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

function SectionHeader({
  num,
  children,
}: {
  num?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 mb-5 flex items-center gap-4">
      {num && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/30">
          {num}
        </span>
      )}
      <div className="flex-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          {children}
        </h2>
        <div className="mt-1.5 h-0.5 w-full rounded-full bg-gradient-to-r from-red-500/60 to-transparent" />
      </div>
    </div>
  );
}

function StepCard({
  num,
  title,
  children,
  last = false,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 dark:bg-white/15 text-xs font-bold text-white ring-4 ring-white dark:ring-zinc-900">
          {num}
        </span>
        {!last && <div className="mt-1 w-0.5 flex-1 bg-zinc-200 dark:bg-white/10" />}
      </div>
      <div className={`pb-6 flex-1 ${last ? "" : ""}`}>
        <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">{title}</p>
        <div className="space-y-2">{children}</div>
      </div>
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
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          isDone
            ? "border-red-600 bg-red-600 text-white"
            : "border-zinc-300 dark:border-white/30 group-hover:border-red-400"
        }`}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <div
        className={`flex-1 text-sm leading-relaxed ${
          isDone
            ? "text-red-700 line-through decoration-red-400 dark:text-red-400"
            : "text-zinc-700 dark:text-white/70"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function InlineCheck({
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
            ? "border-red-600 bg-red-600 text-white"
            : "border-zinc-300 dark:border-white/30 text-transparent hover:border-red-400"
        }`}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </button>
      <div
        className={`text-sm leading-relaxed ${
          isDone
            ? "text-red-700 line-through dark:text-red-400"
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

function AppCard({
  emoji,
  name,
  children,
}: {
  emoji: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="text-xl leading-none">{emoji}</span>
        <h4 className="font-semibold text-zinc-900 dark:text-white">{name}</h4>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

export function Hari1Client() {
  const { isDone, toggleTask, hydrated } = useProgress();
  const doneCount = hydrated ? ALL_TASK_IDS.filter((id) => isDone(id)).length : 0;
  const nextDay = programDays[1];

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
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Onboarding", href: "/program/onboarding" },
              { label: "Hari 1: Mengenal CISDI yang Sehat, Adil, Setara" },
            ]}
          />

          {/* ── Day hero card ── */}
          <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 shadow-xl dark:from-zinc-900 dark:to-black">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎡</span>
              <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs font-semibold tracking-wide text-red-400">
                Hari 1 dari 5
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mengenal CISDI yang Sehat, Adil, Setara
            </h1>
            <p className="mt-1 text-sm font-medium text-red-400">
              Halo! Selamat datang di hari pertama kamu bekerja di CISDI.
            </p>
            <p className="mt-1 text-sm text-white/50">
              Mari mulai dengan mengeksplorasi sejarah, visi, misi, dan
              nilai-nilai CISDI—yang menjadi kompas dalam setiap langkah kita.
            </p>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                <span>Progress hari ini</span>
                <span className="font-semibold text-white/70">
                  {doneCount}/{ALL_TASK_IDS.length} task
                </span>
              </div>
              <ProgressBar value={doneCount} total={ALL_TASK_IDS.length} />
            </div>
          </div>

          {/* ════════════════════════════════════════════════
              1 — Mengenal CISDI
          ════════════════════════════════════════════════ */}
          <SectionHeader num="1">Mengenal CISDI yang Sehat, Adil, Setara</SectionHeader>

          <Toggle title="Mengenal CISDI: Visi, Misi dan Fokus Kerja" icon="🎬" accent="red">
            <CheckItem id="d1-video-visi-misi" isDone={d("d1-video-visi-misi")} onToggle={t("d1-video-visi-misi")}>
              Tonton video Mengenal CISDI: Visi, Misi dan Fokus Kerja
            </CheckItem>
            <YTEmbed videoId="0cm3-HvzyUo?si=J84IAVb_r048tEAe" title="Mengenal CISDI: Visi, Misi dan Fokus Kerja" />
            <div className="grid gap-2 sm:grid-cols-2">
              <CheckItem id="d1-visi-misi-pedoman" isDone={d("d1-visi-misi-pedoman")} onToggle={t("d1-visi-misi-pedoman")}>
                Pelajari Visi, Misi, dan Pedoman Yayasan di halaman{" "}
                <span className="font-medium text-red-600 underline dark:text-red-400">
                  Visi, Misi, dan Pedoman Yayasan
                </span>
              </CheckItem>
              <CheckItem id="d1-isu-prioritas" isDone={d("d1-isu-prioritas")} onToggle={t("d1-isu-prioritas")}>
                Pelajari fokus isu yang dikerjakan CISDI di halaman{" "}
                <span className="font-medium text-red-600 underline dark:text-red-400">
                  Isu Prioritas CISDI
                </span>
              </CheckItem>
            </div>
          </Toggle>

          <Toggle title="[ Materi Pembelajaran ] Public Health 101" icon="🏥" accent="blue">
            <Callout>
              Isu besar CISDI berada di ranah kerja kesehatan masyarakat atau{" "}
              <em>public health</em>, maka kamu perlu memiliki pengetahuan dasar
              terkait <em>public health</em>.
            </Callout>
            <CheckItem id="d1-public-health" isDone={d("d1-public-health")} onToggle={t("d1-public-health")}>
              Pelajari laman{" "}
              <span className="font-semibold underline">Public Health 101</span>
            </CheckItem>
          </Toggle>

          <Toggle title="[ Materi Pembelajaran ] Primary Health Care 101" icon="💊" accent="green">
            <Callout>
              Selain kesehatan masyarakat, penguatan layanan kesehatan primer
              menjadi salah satu fokus isu CISDI.
            </Callout>
            <CheckItem id="d1-phc" isDone={d("d1-phc")} onToggle={t("d1-phc")}>
              Pelajari{" "}
              <span className="font-semibold underline">Primary Health Care 101</span>
            </CheckItem>
          </Toggle>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
            <p>
              Selain itu, kamu juga diharapkan bisa mengeksplorasi materi
              pembelajaran lain yang tersedia di Learning Space. Kamu dapat
              memilih subjek atau materi yang dirasa paling relevan dengan
              pekerjaan yang akan kamu lakukan di CISDI.
            </p>
            <div className="mt-3">
              <CheckItem id="d1-learning-space" isDone={d("d1-learning-space")} onToggle={t("d1-learning-space")}>
                <Link
                  href="/belajar"
                  className="inline-flex items-center gap-1 font-medium text-red-600 underline dark:text-red-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  Jelajahi Learning Space <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </CheckItem>
            </div>
          </div>

          <Toggle title="Update Informasi Terkini tentang Kerja CISDI" icon="📅" accent="purple" defaultOpen={false}>
            <Callout>
              <p>
                CISDI menyelenggarakan <em>Quarterly Review</em> sebagai mekanisme
                pertukaran informasi lintas divisi. Kamu bisa mempelajari pembahasan
                terbaru terkait capaian kerja divisi/departemen di CISDI pada tautan
                di bawah ini:
              </p>
              <div className="mt-2">
                <InlineCheck id="d1-update-info" isDone={d("d1-update-info")} onToggle={t("d1-update-info")}>
                  <span className="font-semibold underline">Buka Kalender CISDI</span>{" "}
                  untuk melihat rekaman Quarterly Review dan kegiatan terkini CISDI
                </InlineCheck>
              </div>
            </Callout>
          </Toggle>

          {/* ════════════════════════════════════════════════
              2 — Refleksi
          ════════════════════════════════════════════════ */}
          <SectionHeader num="2">Refleksi Memaknai CISDI yang Sehat, Adil, Setara</SectionHeader>

          <Callout variant="tip">
            <p>
              Kamu telah menyimak video dan membaca materi tentang sejarah, visi,
              misi, serta nilai-nilai yang kita yakini, sebagai Civitas CISDI.
              Sekarang, saatnya merenung sejenak dan menuliskan pandangan serta
              rencanamu sebagai bagian dari perjalanan ini.
            </p>
            <p className="mt-1 font-semibold text-amber-700 dark:text-amber-300">
              Tidak ada jawaban benar atau salah—yang penting, jujur dan bermakna
              bagi dirimu sendiri.
            </p>
            <p className="mt-1">
              Mari berefleksi dengan panduan pertanyaan di bawah ini. Tulis jawaban
              kamu di laman ini, yuk!
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>Bagaimana visi dan misi CISDI berkaitan dengan peran kamu?</li>
              <li>
                Bagaimana kamu bisa memastikan bahwa sikap dan perilaku kamu selaras
                dengan nilai-nilai CISDI dalam bekerja dan berinteraksi dengan rekan
                kerja?
              </li>
            </ul>
          </Callout>

          <div className="mt-4">
            <CheckItem id="d1-reflection" isDone={d("d1-reflection")} onToggle={t("d1-reflection")}>
              Tulis refleksimu di Padlet
            </CheckItem>
          </div>
          <div className="mt-3 h-[480px] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-white/10">
            <iframe
              src="https://padlet.com/knowledgelearning/memaknai-visi-dan-misi-cisdi-ak9dyg5cz7u4o6kv"
              title="Padlet Refleksi Visi Misi"
              className="h-full w-full"
              loading="lazy"
            />
          </div>

          {/* ════════════════════════════════════════════════
              3 — Ekosistem Kerja
          ════════════════════════════════════════════════ */}
          <SectionHeader num="3">Mengenal Ekosistem Kerja dan Komunikasi CISDI</SectionHeader>

          <Callout>
            Sebelum memulai tahapan ini, pastikan kamu telah menerima akun email
            dari Tim Human Capital (berupa alamat email dan kata sandi atau tautan
            aktivasi) yang dikirimkan ke email pribadimu.
          </Callout>

          <p className="mt-4 text-sm text-zinc-600 dark:text-white/60">
            CISDI menggunakan sistem kerja <em>hybrid</em>, sehingga membutuhkan
            alat pendukung yang mengintegrasikan seluruh proses kerja. Topik ini
            akan mengajakmu mengenal aplikasi penunjang kerja CISDI berdasarkan
            kelompok fungsi di bawah ini:
          </p>

          {/* ── 1. Media Komunikasi ── */}
          <div className="mt-6 flex items-center gap-3 mb-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/30">1</span>
            <h3 className="font-bold text-zinc-900 dark:text-white">Media Komunikasi Internal</h3>
          </div>

          <Toggle title="Google Mail (Gmail)" icon="🟥" accent="red">
            <p className="text-sm text-zinc-600 dark:text-white/60">
              <strong className="text-zinc-800 dark:text-white">
                Google Mail (Gmail) merupakan platform surat elektronik yang
                dikembangkan Google dan terintegrasi dengan layanan-layanan di
                dalam ekosistem Google.
              </strong>{" "}
              Jika sudah melewati langkah-langkah aktivasi akun email, kamu sudah
              bisa mengeksplorasi penggunaan Google Mail.
            </p>
            <Callout>
              Di bawah ini adalah langkah-langkah yang wajib dilakukan untuk
              mengaktivasi dan melengkapi akun email CISDI
            </Callout>
            <div className="mt-2 space-y-0">
              <StepCard num="1" title="Mengubah dan Me-reset Password akun Gmail">
                <ol className="ml-1 list-[lower-alpha] space-y-1 pl-5 text-sm text-zinc-600 dark:text-white/60">
                  <li>Buka <a href="https://myaccount.google.com" target="_blank" rel="noopener noreferrer" className="text-red-600 underline dark:text-red-400">Akun Google</a>, kamu mungkin perlu login.</li>
                  <li>Pada "Keamanan", pilih <strong>Login ke Google</strong>.</li>
                  <li>Pilih <strong>Sandi</strong>. Anda mungkin perlu login lagi.</li>
                  <li>Masukkan sandi baru Anda, lalu pilih <strong>Ubah Sandi</strong>.</li>
                </ol>
              </StepCard>
              <StepCard num="2" title="Tambahkan foto profil">
                <ol className="ml-1 list-[lower-alpha] space-y-1 pl-5 text-sm text-zinc-600 dark:text-white/60">
                  <li>Upload foto dari komputer kamu atau pilih salah satu foto dari Google Foto.</li>
                  <li>Atur ukuran foto kebutuhan.</li>
                  <li>Di kiri bawah, klik <strong>simpan sebagai foto profil</strong>.</li>
                  <li>Pakaian yang digunakan foto profil CISDI adalah kemeja/<em>blouse</em> warna putih dengan latar foto abu-abu.</li>
                </ol>
              </StepCard>
              <StepCard num="3" title="Menambahkan Email Signature CISDI" last>
                <ol className="ml-1 list-[lower-alpha] space-y-1 pl-5 text-sm text-zinc-600 dark:text-white/60">
                  <li>Buka <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="text-red-600 underline dark:text-red-400">Gmail</a>.</li>
                  <li>Di kanan atas, klik Setting/Setelan → <strong>Lihat semua setelan</strong>.</li>
                  <li>Di bagian "Tanda tangan" / "Email Signature", salin dan sesuaikan teks dari <a href="https://docs.google.com/document/d/1uqb5DQpyFmPqPs2NqU9gYkuUwydD2edO_84bJyQ-HXs/view" target="_blank" rel="noopener noreferrer" className="text-red-600 underline dark:text-red-400">dokumen template signature ini</a> ke kotak "Tanda tangan" atau Signature.</li>
                  <li>Setelah selesai, di bagian bawah halaman klik <strong>Save/Simpan Perubahan</strong>.</li>
                </ol>
              </StepCard>
            </div>
            <CheckItem id="d1-gmail" isDone={d("d1-gmail")} onToggle={t("d1-gmail")}>
              Selesaikan aktivasi akun Gmail CISDI (password, foto profil, email signature)
            </CheckItem>
          </Toggle>

          <Toggle title="Penggunaan Group Email dan Email Tim" icon="📨" accent="blue">
            <Callout>
              Di tahap ini, kamu diharapkan dapat mengetahui direktori email grup
              atau tim yang dapat digunakan untuk menunjang kebutuhan koordinasi
              lintas unit. Akses dan pelajari{" "}
              <span className="font-semibold underline">
                Email &amp; Group Mailing List Directory
              </span>
              .
            </Callout>
            <CheckItem id="d1-group-email" isDone={d("d1-group-email")} onToggle={t("d1-group-email")}>
              Akses dan pelajari Email &amp; Group Mailing List Directory
            </CheckItem>
          </Toggle>

          <Toggle title="Slack" icon="💬" accent="purple">
            <Callout>
              Sebelum memulai tahapan ini, kamu perlu mendapatkan invitation atau
              undangan mengakses Slack yang dikirimkan Tim Human Capital ke email
              CISDI kamu.
            </Callout>
            <p className="text-sm text-zinc-700 dark:text-white/70">
              🎥{" "}<strong>Berkenalan dengan Slack</strong> — CISDI memaksimalkan
              penggunaan Slack{" "}
              <strong>sebagai portal utama komunikasi internal sehari-hari</strong>
              . Di Slack, kamu dapat terhubung dengan seluruh karyawan satu kantor,
              membuat #channel yang dapat digunakan sebagai group atau multi-member
              chat. Ketahui lebih lanjut tentang Slack dalam video singkat di bawah ini.
            </p>
            <CheckItem id="d1-slack-video" isDone={d("d1-slack-video")} onToggle={t("d1-slack-video")}>
              Tonton video pengenalan Slack
            </CheckItem>
            <YTEmbed videoId="6wjmH5qL3Ms" title="Berkenalan dengan Slack" />

            <h4 className="mt-4 mb-2 font-semibold text-sm text-zinc-800 dark:text-white">
              Bergabung dan Lengkapi Profil di Slack CISDI
            </h4>
            <p className="mb-3 text-sm text-zinc-600 dark:text-white/60">
              Ikuti langkah-langkah berikut untuk melengkapi profil kamu di Slack.
            </p>
            <div className="space-y-0">
              <StepCard num="1" title="Log in Slack di Gawai / Perangkat Kerja">
                <p className="text-sm text-zinc-600 dark:text-white/60">
                  Setelah mendapatkan invitation ke email CISDI, selanjutnya kamu
                  dapat melakukan sign in melalui laman browser:{" "}
                  <a href="https://slack.com/signin" target="_blank" rel="noopener noreferrer" className="text-red-600 underline dark:text-red-400">slack.com/signin</a>{" "}
                  atau melalui aplikasi Slack yang dapat diunduh di perangkat kerja kamu. Slack kompatibel dengan Windows, Mac, Android maupun iOS.
                </p>
              </StepCard>
              <StepCard num="2" title="Lengkapi Profil di Slack">
                <p className="text-sm text-zinc-600 dark:text-white/60">
                  Karena jadi portal utama untuk komunikasi internal, kamu perlu
                  melengkapi informasi/profil di Slack agar rekan kerjamu dapat
                  mengenal dan berkomunikasi dengan baik.
                </p>
                <p className="text-sm text-zinc-600 dark:text-white/60 mt-1">
                  Lengkapi profil Slack kamu, setidaknya dengan{" "}
                  <strong>1) Foto, 2) Informasi Posisi Kerja di CISDI</strong>, dan
                  kontak <strong>3) Alamat email CISDI, 4) Nomor Whatsapp</strong>{" "}
                  — agar rekan kerja kamu mengetahui bagaimana cara terhubung
                  dengan kamu. Sesuaikan ketentuan foto dengan foto profil di email.
                </p>
              </StepCard>
              <StepCard num="3" title="Pengaturan Notifikasi dan Status">
                <p className="text-sm text-zinc-600 dark:text-white/60 mb-2">
                  Agar kamu tidak tertinggal notifikasi atau meminimalisir distraksi
                  di Slack, kamu bisa menyesuaikan pengaturan notifikasi di Slack
                  sesuai preferensi kamu.
                </p>
                <CheckItem id="d1-slack-notif-video" isDone={d("d1-slack-notif-video")} onToggle={t("d1-slack-notif-video")}>
                  Tonton video cara mengatur notifikasi Slack
                </CheckItem>
                <YTEmbed videoId="wuyWwzazef8" title="Pengaturan Notifikasi Slack" />
              </StepCard>
              <StepCard num="4" title="Kenali Penggunaan Channel-channel Utama di Slack CISDI">
                <p className="text-sm text-zinc-600 dark:text-white/60 mb-3">
                  Jika sudah berhasil masuk ke dalam workspace CISDI di Slack,
                  secara otomatis kamu akan bergabung ke dalam{" "}
                  <strong>tiga channel bersama</strong> berikut:
                </p>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
                        <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-white/70 w-36">Channel</th>
                        <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-white/70">Penjelasan Fungsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { ch: "#cisdi-hq", desc: "Channel ini tempat semua karyawan CISDI bergabung. Kamu bisa gunakan channel ini untuk memberikan pengumuman satu kantor melalui fitur mention @here atau @channel untuk memberi notifikasi ke seluruh member channel." },
                        { ch: "#random", desc: "Channel ini juga tempat semua karyawan CISDI bergabung. Seperti namanya, channel ini bisa digunakan untuk informasi dan percakapan yang bersifat informal atau random." },
                        { ch: "#tech-optimization", desc: "Di channel ini kamu bisa mendapatkan atau membagikan informasi terkait penggunaan dan optimalisasi fitur-fitur digital yang digunakan di internal CISDI." },
                      ].map((row) => (
                        <tr key={row.ch} className="border-b border-zinc-100 last:border-0 dark:border-white/5">
                          <td className="px-4 py-3 font-mono font-medium text-red-600 dark:text-red-400">{row.ch}</td>
                          <td className="px-4 py-3 text-zinc-600 dark:text-white/60">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-white/60">
                  Selain channel-channel di atas, kamu juga bisa memanfaatkan
                  channel-channel yang digunakan untuk internal/lintas divisi
                  ataupun project tertentu. Kamu dapat diinformasikan atau bertanya
                  kepada manajer dan rekan satu divisi terkait penggunaan
                  channel-channel yang perlu kamu ketahui terkait pekerjaan.
                </p>
              </StepCard>
              <StepCard num="5" title="Berinteraksi dengan atasan dan rekan kerja" last>
                <p className="text-sm text-zinc-600 dark:text-white/60">
                  Hubungi manager atau lead yang menjadi supervisor kamu melalui
                  Slack untuk memperkenalkan diri. Jika belum, tanyakan channel
                  Slack apa saja yang perlu kamu ikuti.
                </p>
              </StepCard>
            </div>
            <CheckItem id="d1-slack-profile" isDone={d("d1-slack-profile")} onToggle={t("d1-slack-profile")}>
              Selesaikan semua langkah bergabung dan melengkapi profil di Slack CISDI
            </CheckItem>
            <Callout>
              Pelajari{" "}
              <span className="font-semibold underline">
                Pedoman Komunikasi Internal CISDI
              </span>{" "}
              untuk mempelajari ketentuan komunikasi internal dan mengurangi
              terjadinya miskomunikasi dalam sirkulasi informasi antar karyawan CISDI.
            </Callout>
            <CheckItem id="d1-pedoman-komunikasi" isDone={d("d1-pedoman-komunikasi")} onToggle={t("d1-pedoman-komunikasi")}>
              Pelajari Pedoman Komunikasi Internal CISDI
            </CheckItem>
          </Toggle>

          <Toggle title="Praktik Mengenali Ekosistem Komunikasi CISDI" icon="⚡" accent="yellow">
            <p className="text-sm text-zinc-600 dark:text-white/60">
              Setelah mengenali aplikasi yang rutin diakses Civitas CISDI, kamu
              diharapkan dapat mengoptimalkan penggunaannya. Mari praktikkan
              langkah-langkah berikut untuk mencobanya:
            </p>
            <ol className="mt-2 ml-4 list-decimal space-y-1.5 text-sm text-zinc-600 dark:text-white/60">
              <li>Agendakan jadwal pertemuan dengan Supervisormu pada pekan ini,</li>
              <li>Gunakan Slack untuk menghubungi secara personal dan menyepakati waktu pertemuan pada pekan ini,</li>
              <li>Buat undangan pertemuan lengkap dengan deskripsi menggunakan Google Calendar, tag @Yurdhinda Aprilia dan @ayu.purnamasari@cisdi.org juga, ya!</li>
              <li>Lakukan pertemuan yang telah dijadwalkan untuk membahas peran dan lingkup pekerjaanmu.</li>
            </ol>
            <CheckItem id="d1-praktik-ekosistem" isDone={d("d1-praktik-ekosistem")} onToggle={t("d1-praktik-ekosistem")}>
              Selesaikan praktik mengenali ekosistem komunikasi CISDI (4 langkah)
            </CheckItem>
          </Toggle>

          {/* ── 2. Proses Kerja ── */}
          <div className="mt-8 flex items-center gap-3 mb-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/30">2</span>
            <h3 className="font-bold text-zinc-900 dark:text-white">Proses Kerja (Working Process)</h3>
          </div>

          <Callout>
            CISDI memaksimalkan penggunaan{" "}
            <strong>ekosistem Google Workspace</strong> untuk menunjang aktivitas
            kerja sehari-hari. Jika kamu belum terbiasa dengan penggunaan ekosistem
            Google, silakan ikuti penjelasan fungsi dasar dari setiap produk yang
            digunakan, di bawah ini:
          </Callout>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <AppCard emoji="🟦" name="Google Calendar">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                Platform kalender Google yang dapat digunakan untuk mengatur agenda,
                mengundang, dan pengingat. CISDI memaksimalkan Google Calendar untuk
                mendokumentasikan waktu kerja (<em>time tracking</em>) dan merekam
                aktivitas individu (Focus Time).
              </p>
              <CheckItem id="d1-gcal" isDone={d("d1-gcal")} onToggle={t("d1-gcal")}>
                Pelajari Google Calendar &amp; Time Tracking
              </CheckItem>
            </AppCard>
            <AppCard emoji="🟢" name="Google Meet">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                Google Meet digunakan sebagai medium utama pertemuan virtual bagi
                lintas unit di internal maupun eksternal CISDI.
              </p>
              <CheckItem id="d1-gmeet" isDone={d("d1-gmeet")} onToggle={t("d1-gmeet")}>
                Pelajari lebih lanjut tentang Google Meet
              </CheckItem>
            </AppCard>
            <AppCard emoji="🟡" name="Google Docs, Sheets & Slides">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                CISDI memaksimalkan platform-platform pengolahan kata, angka dan
                visual yang dimiliki Google: Google Docs, Google Spreadsheet, dan
                Google Slides.
              </p>
              <CheckItem id="d1-gdocs" isDone={d("d1-gdocs")} onToggle={t("d1-gdocs")}>
                Pelajari Google Docs, Spreadsheet, dan Slides
              </CheckItem>
            </AppCard>
          </div>

          {/* ── 3. Penyimpanan Dokumen ── */}
          <div className="mt-8 flex items-center gap-3 mb-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/30">3</span>
            <h3 className="font-bold text-zinc-900 dark:text-white">Penyimpanan Dokumen (Storage)</h3>
          </div>

          <Callout>
            CISDI memaksimalkan penggunaan Google Drive sebagai medium penyimpanan
            berbasis <em>cloud</em>. Fitur ini terintegrasi dengan setiap akun
            berdomain xxx@cisdi.org dan menyematkan medium penyimpanan (<em>storage</em>) di setiap akun.
          </Callout>

          <div className="mt-4">
            <AppCard emoji="🟢" name="Google Drive">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                <strong className="text-zinc-800 dark:text-white">
                  Shared Drive: CISDI Internal Knowledge Hub
                </strong>{" "}
                digunakan untuk media penyimpanan dan berbagi dokumen. Pengaturan
                umum folder ini dapat diakses oleh seluruh akun berdomain cisdi.org,
                jadi bisa digunakan untuk menyimpan dokumen yang dapat dibagikan
                lintas tim.
              </p>
              <CheckItem id="d1-gdrive" isDone={d("d1-gdrive")} onToggle={t("d1-gdrive")}>
                Pelajari lebih lanjut tentang Google Drive dan Shared Drive CISDI Internal Knowledge Hub
              </CheckItem>
            </AppCard>
          </div>

          {/* ── 4. Knowledge Hub ── */}
          <div className="mt-8 flex items-center gap-3 mb-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/30">4</span>
            <h3 className="font-bold text-zinc-900 dark:text-white">Portal Informasi dan Pengetahuan (Knowledge Hub)</h3>
          </div>

          <Callout>
            <strong>
              CISDI memaksimalkan Notion sebagai pusat informasi dan pengetahuan internal.
            </strong>{" "}
            Portal informasi ini dapat digunakan sebagai rujukan mengakses informasi
            seputar CISDI, prosedur kerja, dashboard, dan informasi pendukung pekerjaan lainnya.
          </Callout>

          <Toggle title="Notion (CISDI Wiki)" icon="📓" accent="blue" defaultOpen>
            <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-white">
              Tips Penggunaan CISDI Wiki
            </h4>
            <p className="mb-3 text-sm text-zinc-600 dark:text-white/60">
              Terdapat dua cara mengakses notion yang dapat disesuaikan dengan
              preferensi dan kebutuhan:
            </p>
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-800 dark:text-white">
                  <Globe className="h-4 w-4 text-sky-500" /> Akses melalui browser
                </p>
                <ol className="ml-4 list-decimal space-y-1 text-xs text-zinc-600 dark:text-white/60">
                  <li>Login di <a href="https://www.notion.so" target="_blank" rel="noopener noreferrer" className="text-red-600 underline dark:text-red-400">notion.so</a></li>
                  <li>Tambahkan bookmark di browser yang kamu gunakan untuk memudahkan akses ke CISDI Wiki</li>
                </ol>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-800 dark:text-white">
                  <Database className="h-4 w-4 text-sky-500" /> Akses melalui aplikasi di gawai
                </p>
                <p className="text-xs text-zinc-600 dark:text-white/60">
                  Unduh aplikasi Notion di App Store, Playstore atau kunjungi{" "}
                  <a href="https://www.notion.so/desktop" target="_blank" rel="noopener noreferrer" className="text-red-600 underline dark:text-red-400">notion.so/desktop</a>{" "}
                  dari laptop/PC kamu.
                </p>
              </div>
            </div>

            <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-white">
              Akses ke Notion —{" "}
              <span className="text-red-600 dark:text-red-400">Sign Up dan Log in ke Notion</span>
            </h4>
            <p className="mb-3 text-sm text-zinc-600 dark:text-white/60">
              Akses ke Notion akan terhubung dengan email CISDI. Kamu akan
              mendapatkan email berisi undangan untuk membuat akun dan masuk ke
              CISDI Wiki. Hubungi Tim Human Capital atau Knowledge &amp; Learning
              apabila kamu belum mendapatkan akses atau menemui kendala dalam tahapan ini.
            </p>

            <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-white">
              Eksplorasi dan Isi Konten di CISDI Wiki
            </h4>
            <p className="mb-1 text-sm font-medium text-red-600 dark:text-red-400">
              Mengenal Tampilan dan Isi CISDI Wiki
            </p>
            <p className="mb-2 text-sm text-zinc-600 dark:text-white/60">
              Apabila sudah berhasil masuk, kamu akan menemukan tampilan CISDI Wiki
              seperti video di bawah ini.
            </p>
            <CheckItem id="d1-notion-video" isDone={d("d1-notion-video")} onToggle={t("d1-notion-video")}>
              Tonton video pengenalan CISDI Wiki (Notion)
            </CheckItem>
            <YTEmbed videoId="dyQ5zIaWnVA" title="Mengenal Tampilan dan Isi CISDI Wiki" />

            <CheckItem id="d1-notion-signup" isDone={d("d1-notion-signup")} onToggle={t("d1-notion-signup")}>
              Sign up dan login ke Notion (CISDI Wiki)
            </CheckItem>

            <p className="mt-4 mb-1 text-sm font-medium text-red-600 dark:text-red-400">
              Mengisi Personal User Manual di Employee Directory
            </p>
            <p className="mb-2 text-sm text-zinc-600 dark:text-white/60">
              Jika sudah berhasil log in, kamu bisa melengkapi profil Personal
              User Manual template agar rekan-rekan di CISDI bisa mengenal kamu
              dan menjelajahi halaman profil mereka!
            </p>
            <CheckItem id="d1-pum" isDone={d("d1-pum")} onToggle={t("d1-pum")}>
              Isi Personal User Manual di Employee Directory (Notion)
            </CheckItem>
          </Toggle>

          {/* ── Sesi Penyelarasan ── */}
          <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-6 shadow-lg shadow-red-600/20">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="text-2xl">📌</span>
              <h3 className="text-lg font-bold text-white">Sesi Penyelarasan</h3>
            </div>
            <p className="mb-4 text-sm text-red-100">
              Sesi penyelarasan dilaksanakan sesuai dengan jadwal yang telah
              tercantum pada kalender Google, pastikan telah mengakses seluruh materi
              asinkronus laman program orientasi karyawan CISDI hari pertama
            </p>
            <div
              onClick={t("d1-sesi")}
              role="checkbox"
              aria-checked={d("d1-sesi")}
              tabIndex={0}
              onKeyDown={(e) => e.key === " " && t("d1-sesi")()}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all select-none ${
                d("d1-sesi")
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-white/20 bg-white/10 text-red-100 hover:bg-white/20"
              }`}
            >
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${d("d1-sesi") ? "border-white bg-white text-red-600" : "border-white/50"}`}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className={`text-sm font-medium ${d("d1-sesi") ? "line-through" : ""}`}>
                Ikuti Sesi Penyelarasan Hari Pertama
              </span>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="mt-10 flex items-center justify-between">
            <span />
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
