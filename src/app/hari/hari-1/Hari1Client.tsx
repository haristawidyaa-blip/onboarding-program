"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Info,
  Check,
  ArrowRight,
  ArrowUpRight,
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

// ── Primitive components ────────────────────────────────────────────────────

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

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-4 border-b border-red-100 dark:border-red-900/30 pb-2 text-xl font-bold text-red-600 dark:text-red-500">
      {children}
    </h2>
  );
}

function NumSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 dark:bg-white/15 text-sm font-bold text-white">
          {num}
        </span>
        <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
      </div>
      <div className="pl-9 space-y-1">{children}</div>
    </div>
  );
}

// ── CheckItem — inline checkbox row ────────────────────────────────────────

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

// ── Main component ──────────────────────────────────────────────────────────

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
        <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Onboarding", href: "/program/onboarding" },
              { label: "Hari 1: Mengenal CISDI yang Sehat, Adil, Setara" },
            ]}
          />

          {/* ── Day header ── */}
          <div className="mt-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎡</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-500">
                Hari 1 dari 5
              </span>
            </div>
            <h1 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
              Mengenal CISDI yang Sehat, Adil, Setara
            </h1>
            <p className="mt-1 text-sm font-semibold text-red-600 dark:text-red-400">
              Halo! Selamat datang di hari pertama kamu bekerja di CISDI.
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Mari mulai dengan mengeksplorasi sejarah, visi, misi, dan nilai-nilai
              CISDI—yang menjadi kompas dalam setiap langkah kita.
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
              SECTION 1 — Mengenal CISDI
          ══════════════════════════════════════════════════ */}
          <SectionHeader>Mengenal CISDI yang Sehat, Adil, Setara</SectionHeader>

          {/* Toggle: Visi Misi */}
          <Toggle title="Mengenal CISDI: Visi, Misi dan Fokus Kerja">
            <CheckItem id="d1-video-visi-misi" isDone={d("d1-video-visi-misi")} onToggle={t("d1-video-visi-misi")}>
              Tonton video Mengenal CISDI: Visi, Misi dan Fokus Kerja
            </CheckItem>
            <YTEmbed videoId="0cm3-HvzyUo?si=J84IAVb_r048tEAe" title="Mengenal CISDI: Visi, Misi dan Fokus Kerja" />
            <ol className="mt-1 ml-1 list-decimal space-y-1 pl-4 text-sm text-zinc-700 dark:text-white/70">
              <li>
                <CheckItem id="d1-visi-misi-pedoman" isDone={d("d1-visi-misi-pedoman")} onToggle={t("d1-visi-misi-pedoman")}>
                  Pelajari Visi, Misi, dan Pedoman Yayasan di halaman{" "}
                  <span className="font-medium text-red-600 underline dark:text-red-400">
                    Visi, Misi, dan Pedoman Yayasan
                  </span>
                </CheckItem>
              </li>
              <li>
                <CheckItem id="d1-isu-prioritas" isDone={d("d1-isu-prioritas")} onToggle={t("d1-isu-prioritas")}>
                  Pelajari fokus isu yang dikerjakan CISDI di halaman{" "}
                  <span className="font-medium text-red-600 underline dark:text-red-400">
                    Isu Prioritas CISDI
                  </span>
                </CheckItem>
              </li>
            </ol>
          </Toggle>

          {/* Toggle: Public Health */}
          <Toggle title="[ Materi Pembelajaran ] Public Health 101">
            <Callout>
              Isu besar CISDI berada di ranah kerja kesehatan masyarakat atau{" "}
              <em>public health</em>, maka kamu perlu memiliki pengetahuan dasar
              terkait <em>public health</em>.{" "}
              <CheckItem id="d1-public-health" isDone={d("d1-public-health")} onToggle={t("d1-public-health")}>
                Pelajari laman{" "}
                <span className="font-semibold underline">Public Health 101</span>
              </CheckItem>
            </Callout>
          </Toggle>

          {/* Toggle: PHC */}
          <Toggle title="[ Materi Pembelajaran ] Primary Health Care 101">
            <Callout>
              Selain kesehatan masyarakat, penguatan layanan kesehatan primer
              menjadi salah satu fokus isu CISDI.{" "}
              <CheckItem id="d1-phc" isDone={d("d1-phc")} onToggle={t("d1-phc")}>
                Pelajari{" "}
                <span className="font-semibold underline">Primary Health Care 101</span>
              </CheckItem>
            </Callout>
          </Toggle>

          <p className="mt-3 text-sm text-zinc-600 dark:text-white/60">
            Selain itu, kamu juga diharapkan bisa mengeksplorasi materi pembelajaran
            lain yang tersedia di Learning Space. Kamu dapat memilih subjek atau
            materi yang dirasa paling relevan dengan pekerjaan yang akan kamu
            lakukan di CISDI.
          </p>
          <div className="mt-2">
            <CheckItem id="d1-learning-space" isDone={d("d1-learning-space")} onToggle={t("d1-learning-space")}>
              <Link
                href="/belajar"
                className="inline-flex items-center gap-1 font-medium text-red-600 underline dark:text-red-400"
              >
                Jelajahi Learning Space <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </CheckItem>
          </div>

          {/* Toggle: Quarterly Review */}
          <Toggle title="Update Informasi Terkini tentang Kerja CISDI">
            <Callout>
              <p>
                CISDI menyelenggarakan <em>Quarterly Review</em> sebagai mekanisme
                pertukaran informasi lintas divisi. Kamu bisa mempelajari pembahasan
                terbaru terkait capaian kerja divisi/departemen di CISDI pada tautan
                di bawah ini:
              </p>
              <div className="mt-2">
                <CheckItem id="d1-update-info" isDone={d("d1-update-info")} onToggle={t("d1-update-info")}>
                  <span className="font-semibold underline">Buka Kalender CISDI</span>{" "}
                  untuk melihat rekaman Quarterly Review dan kegiatan terkini CISDI
                </CheckItem>
              </div>
            </Callout>
          </Toggle>

          {/* ══════════════════════════════════════════════════
              SECTION 2 — Refleksi
          ══════════════════════════════════════════════════ */}
          <SectionHeader>Refleksi Memaknai CISDI yang Sehat, Adil, Setara</SectionHeader>

          <blockquote className="mb-4 border-l-4 border-red-500 pl-4 italic text-zinc-700 dark:text-white/70">
            "Refleksi bukan sekadar melihat ke belakang, tapi menata langkah ke
            depan."
          </blockquote>

          <Callout variant="tip">
            <p>
              Kamu telah menyimak video dan membaca materi tentang sejarah, visi,
              misi, serta nilai-nilai yang kita yakini, sebagai Civitas CISDI.
              Sekarang, saatnya merenung sejenak dan menuliskan pandangan serta
              rencanamu sebagai bagian dari perjalanan ini.
            </p>
            <p className="mt-1 font-semibold text-red-600 dark:text-red-400">
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

          <CheckItem id="d1-reflection" isDone={d("d1-reflection")} onToggle={t("d1-reflection")}>
            Tulis refleksimu di Padlet
          </CheckItem>
          <div className="mt-2 h-[480px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
            <iframe
              src="https://padlet.com/knowledgelearning/memaknai-visi-dan-misi-cisdi-ak9dyg5cz7u4o6kv"
              title="Padlet Refleksi Visi Misi"
              className="h-full w-full"
              loading="lazy"
            />
          </div>

          {/* ══════════════════════════════════════════════════
              SECTION 3 — Ekosistem Kerja
          ══════════════════════════════════════════════════ */}
          <SectionHeader>Mengenal Ekosistem Kerja dan Komunikasi CISDI</SectionHeader>

          <Callout>
            Sebelum memulai tahapan ini, pastikan kamu telah menerima akun email
            dari Tim Human Capital (berupa alamat email dan kata sandi atau tautan
            aktivasi) yang dikirimkan ke email pribadimu.
          </Callout>

          <p className="mt-3 text-sm text-zinc-600 dark:text-white/60">
            CISDI menggunakan sistem kerja <em>hybrid</em>, sehingga membutuhkan
            alat pendukung yang mengintegrasikan seluruh proses kerja. Topik ini
            akan mengajakmu mengenal aplikasi penunjang kerja CISDI berdasarkan
            kelompok fungsi di bawah ini:
          </p>

          {/* ── 1. Media Komunikasi Internal ── */}
          <NumSection num="1" title="Media Komunikasi Internal">
            {/* Google Mail */}
            <Toggle title={<span>🟥 <strong>Google Mail</strong></span>}>
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
              <ol className="mt-1 space-y-4 text-sm">
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    1. Mengubah dan Me-reset Password akun Gmail
                  </p>
                  <ol className="mt-1 ml-4 list-[lower-alpha] space-y-1 text-zinc-600 dark:text-white/60">
                    <li>
                      Buka{" "}
                      <a
                        href="https://myaccount.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 underline dark:text-red-400"
                      >
                        Akun Google
                      </a>
                      , kamu mungkin perlu login.
                    </li>
                    <li>
                      Pada "Keamanan", pilih{" "}
                      <strong>Login ke Google</strong>.
                    </li>
                    <li>
                      Pilih <strong>Sandi</strong>. Anda mungkin perlu login lagi.
                    </li>
                    <li>
                      Masukkan sandi baru Anda, lalu pilih{" "}
                      <strong>Ubah Sandi</strong>.
                    </li>
                  </ol>
                </li>
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    2. Tambahkan foto profil
                  </p>
                  <ol className="mt-1 ml-4 list-[lower-alpha] space-y-1 text-zinc-600 dark:text-white/60">
                    <li>
                      Upload foto dari komputer kamu atau pilih salah satu foto dari
                      Google Foto.
                    </li>
                    <li>Atur ukuran foto kebutuhan.</li>
                    <li>
                      Di kiri bawah, klik{" "}
                      <strong>simpan sebagai foto profil</strong>.
                    </li>
                    <li>
                      Pakaian yang digunakan foto profil CISDI adalah kemeja/
                      <em>blouse</em> warna putih dengan latar foto abu-abu.
                    </li>
                  </ol>
                </li>
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    3. Menambahkan Email Signature CISDI
                  </p>
                  <ol className="mt-1 ml-4 list-[lower-alpha] space-y-1 text-zinc-600 dark:text-white/60">
                    <li>
                      Buka{" "}
                      <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 underline dark:text-red-400"
                      >
                        Gmail
                      </a>
                      .
                    </li>
                    <li>
                      Di kanan atas, klik Setting/Setelan →{" "}
                      <strong>Lihat semua setelan</strong>.
                    </li>
                    <li>
                      Di bagian "Tanda tangan" / "Email Signature", salin dan
                      sesuaikan teks dari{" "}
                      <a
                        href="https://docs.google.com/document/d/1uqb5DQpyFmPqPs2NqU9gYkuUwydD2edO_84bJyQ-HXs/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 underline dark:text-red-400"
                      >
                        dokumen template signature ini
                      </a>{" "}
                      ke kotak "Tanda tangan" atau Signature.
                    </li>
                    <li>
                      Setelah selesai, di bagian bawah halaman klik{" "}
                      <strong>Save/Simpan Perubahan</strong>.
                    </li>
                  </ol>
                </li>
              </ol>
              <CheckItem id="d1-gmail" isDone={d("d1-gmail")} onToggle={t("d1-gmail")}>
                Selesaikan aktivasi akun Gmail CISDI (password, foto profil,
                email signature)
              </CheckItem>
            </Toggle>

            {/* Group Email */}
            <Toggle title="Penggunaan Group Email dan Email Tim">
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

            {/* Slack */}
            <Toggle title="Slack">
              <Callout>
                Sebelum memulai tahapan ini, kamu perlu mendapatkan invitation atau
                undangan mengakses Slack yang dikirimkan Tim Human Capital ke email
                CISDI kamu.
              </Callout>
              <p className="text-sm text-zinc-700 dark:text-white/70">
                🎥{" "}
                <strong>Berkenalan dengan Slack</strong> — CISDI memaksimalkan
                penggunaan Slack{" "}
                <strong>sebagai portal utama komunikasi internal sehari-hari</strong>
                . Di Slack, kamu dapat terhubung dengan seluruh karyawan satu kantor,
                membuat #channel yang dapat digunakan sebagai group atau multi-member
                chat. Ketahui lebih lanjut tentang Slack dalam video singkat di
                bawah ini.
              </p>
              <CheckItem id="d1-slack-video" isDone={d("d1-slack-video")} onToggle={t("d1-slack-video")}>
                Tonton video pengenalan Slack
              </CheckItem>
              <YTEmbed videoId="6wjmH5qL3Ms" title="Berkenalan dengan Slack" />

              <h4 className="mt-4 mb-1 font-semibold text-sm text-zinc-800 dark:text-white">
                Bergabung dan Lengkapi Profil di Slack CISDI
              </h4>
              <p className="text-sm text-zinc-600 dark:text-white/60 mb-3">
                Ikuti langkah-langkah berikut untuk melengkapi profil kamu di Slack.
              </p>
              <ol className="space-y-4 text-sm">
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    1. Log in Slack di Gawai / Perangkat Kerja
                  </p>
                  <p className="text-zinc-600 dark:text-white/60 mt-1">
                    Setelah mendapatkan invitation ke email CISDI, selanjutnya kamu
                    dapat melakukan sign in melalui laman browser:{" "}
                    <a
                      href="https://slack.com/signin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 underline dark:text-red-400"
                    >
                      slack.com/signin
                    </a>{" "}
                    atau melalui aplikasi Slack yang dapat diunduh di perangkat
                    kerja kamu. Slack kompatibel dengan Windows, Mac, Android maupun
                    iOS.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    2. Lengkapi Profil di Slack
                  </p>
                  <p className="text-zinc-600 dark:text-white/60 mt-1">
                    Karena jadi portal utama untuk komunikasi internal, kamu perlu
                    melengkapi informasi/profil di Slack agar rekan kerjamu dapat
                    mengenal dan berkomunikasi dengan baik.
                  </p>
                  <p className="text-zinc-600 dark:text-white/60 mt-1">
                    Lengkapi profil Slack kamu, setidaknya dengan{" "}
                    <strong>1) Foto, 2) Informasi Posisi Kerja di CISDI</strong>, dan
                    kontak{" "}
                    <strong>
                      3) Alamat email CISDI, 4) Nomor Whatsapp
                    </strong>{" "}
                    — agar rekan kerja kamu mengetahui bagaimana cara terhubung
                    dengan kamu. Sesuaikan ketentuan foto dengan foto profil di email.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    3. Pengaturan Notifikasi dan Status
                  </p>
                  <p className="text-zinc-600 dark:text-white/60 mt-1 mb-2">
                    Agar kamu tidak tertinggal notifikasi atau meminimalisir distraksi
                    di Slack, kamu bisa menyesuaikan pengaturan notifikasi di Slack
                    sesuai preferensi kamu. Pelajari langkah-langkah untuk mengatur
                    notifikasi di Slack yang dijelaskan dalam video singkat di bawah
                    ini.
                  </p>
                  <CheckItem id="d1-slack-notif-video" isDone={d("d1-slack-notif-video")} onToggle={t("d1-slack-notif-video")}>
                    Tonton video cara mengatur notifikasi Slack
                  </CheckItem>
                  <YTEmbed videoId="wuyWwzazef8" title="Pengaturan Notifikasi Slack" />
                </li>
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    4. Kenali Penggunaan Channel-channel Utama di Slack CISDI
                  </p>
                  <p className="text-zinc-600 dark:text-white/60 mt-1 mb-2">
                    Jika sudah berhasil masuk ke dalam workspace CISDI di Slack,
                    secara otomatis kamu akan bergabung ke dalam{" "}
                    <strong>tiga channel bersama</strong> berikut:
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
                          <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-white/70 w-40">
                            Channel
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-white/70">
                            Penjelasan Fungsi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            ch: "#cisdi-hq",
                            desc: "Channel ini tempat semua karyawan CISDI bergabung. Kamu bisa gunakan channel ini untuk memberikan pengumuman satu kantor melalui fitur mention @here atau @channel untuk memberi notifikasi ke seluruh member channel.",
                          },
                          {
                            ch: "#random",
                            desc: "Channel ini juga tempat semua karyawan CISDI bergabung. Seperti namanya, channel ini bisa digunakan untuk informasi dan percakapan yang bersifat informal atau random.",
                          },
                          {
                            ch: "#tech-optimization",
                            desc: "Di channel ini kamu bisa mendapatkan atau membagikan informasi terkait penggunaan dan optimalisasi fitur-fitur digital yang digunakan di internal CISDI.",
                          },
                        ].map((row) => (
                          <tr
                            key={row.ch}
                            className="border-b border-zinc-100 last:border-0 dark:border-white/5"
                          >
                            <td className="px-4 py-3 font-mono font-medium text-red-600 dark:text-red-400">
                              {row.ch}
                            </td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-white/60">
                              {row.desc}
                            </td>
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
                </li>
                <li>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    5. Berinteraksi dengan atasan dan rekan kerja
                  </p>
                  <p className="text-zinc-600 dark:text-white/60 mt-1">
                    Hubungi manager atau lead yang menjadi supervisor kamu melalui
                    Slack untuk memperkenalkan diri. Jika belum, tanyakan channel
                    Slack apa saja yang perlu kamu ikuti.
                  </p>
                </li>
              </ol>
              <CheckItem id="d1-slack-profile" isDone={d("d1-slack-profile")} onToggle={t("d1-slack-profile")}>
                Selesaikan semua langkah bergabung dan melengkapi profil di Slack CISDI
              </CheckItem>

              <Callout>
                Pelajari{" "}
                <span className="font-semibold underline">
                  Pedoman Komunikasi Internal CISDI
                </span>{" "}
                untuk mempelajari ketentuan komunikasi internal dan mengurangi
                terjadinya miskomunikasi dalam sirkulasi informasi antar karyawan
                CISDI.
              </Callout>
              <CheckItem id="d1-pedoman-komunikasi" isDone={d("d1-pedoman-komunikasi")} onToggle={t("d1-pedoman-komunikasi")}>
                Pelajari Pedoman Komunikasi Internal CISDI
              </CheckItem>
            </Toggle>

            {/* Praktik */}
            <Toggle title="Praktik Mengenali Ekosistem Komunikasi CISDI">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                Setelah mengenali aplikasi yang rutin diakses Civitas CISDI, kamu
                diharapkan dapat mengoptimalkan penggunaannya. Mari praktikkan
                langkah-langkah berikut untuk mencobanya:
              </p>
              <ol className="mt-2 ml-4 list-decimal space-y-1.5 text-sm text-zinc-600 dark:text-white/60">
                <li>Agendakan jadwal pertemuan dengan Supervisormu pada pekan ini,</li>
                <li>
                  Gunakan Slack untuk menghubungi secara personal dan menyepakati
                  waktu pertemuan pada pekan ini,
                </li>
                <li>
                  Buat undangan pertemuan lengkap dengan deskripsi menggunakan Google
                  Calendar, tag @Yurdhinda Aprilia dan @ayu.purnamasari@cisdi.org
                  juga, ya!
                </li>
                <li>
                  Lakukan pertemuan yang telah dijadwalkan untuk membahas peran dan
                  lingkup pekerjaanmu.
                </li>
              </ol>
              <CheckItem id="d1-praktik-ekosistem" isDone={d("d1-praktik-ekosistem")} onToggle={t("d1-praktik-ekosistem")}>
                Selesaikan praktik mengenali ekosistem komunikasi CISDI (4 langkah)
              </CheckItem>
            </Toggle>
          </NumSection>

          {/* ── 2. Proses Kerja ── */}
          <NumSection num="2" title="Proses Kerja (Working Process)">
            <Callout>
              CISDI memaksimalkan penggunaan{" "}
              <strong>ekosistem Google Workspace</strong> untuk menunjang aktivitas
              kerja sehari-hari. Jika kamu belum terbiasa dengan penggunaan ekosistem
              Google, silakan ikuti penjelasan fungsi dasar dari setiap produk yang
              digunakan, di bawah ini:
            </Callout>

            <Toggle title="🟦 Google Calendar">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                <strong className="text-zinc-800 dark:text-white">
                  Google Calendar merupakan platform kalender Google yang dapat
                  digunakan untuk mengatur agenda, mengundang, dan pengingat.
                </strong>{" "}
                Fitur Google Calendar (<em>kerap disingkat</em> GCal) CISDI
                memaksimalkan Google Calendar untuk mendokumentasikan waktu kerja
                atau time tracking yang akan dianalisis untuk mengukur beban kerja
                bagi setiap karyawan. Tidak hanya untuk agenda pertemuan, penggunaan
                Google Calendar juga ditujukan untuk merekam aktivitas individu
                (memaksimalkan fitur Focus Time).
              </p>
              <CheckItem id="d1-gcal" isDone={d("d1-gcal")} onToggle={t("d1-gcal")}>
                Pelajari Google Calendar dan Mekanisme Time Tracking di Google
                Calendar
              </CheckItem>
            </Toggle>

            <Toggle title="🟢 Google Meet">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                Google Meet digunakan sebagai medium utama pertemuan virtual bagi
                lintas unit di internal maupun eksternal CISDI.
              </p>
              <CheckItem id="d1-gmeet" isDone={d("d1-gmeet")} onToggle={t("d1-gmeet")}>
                Pelajari lebih lanjut tentang Google Meet
              </CheckItem>
            </Toggle>

            <Toggle title="🟡 Google Docs, Spreadsheet dan Slides">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                Dengan ekosistem yang terintegrasi, CISDI juga memaksimalkan
                platform-platform pengolahan kata, angka dan visual yang dimiliki
                Google di antaranya{" "}
                <a href="#" className="text-red-600 underline dark:text-red-400">
                  Google Docs
                </a>
                ,{" "}
                <a href="#" className="text-red-600 underline dark:text-red-400">
                  Google Spreadsheet
                </a>
                , dan{" "}
                <a href="#" className="text-red-600 underline dark:text-red-400">
                  Google Slides
                </a>
                .
              </p>
              <CheckItem id="d1-gdocs" isDone={d("d1-gdocs")} onToggle={t("d1-gdocs")}>
                Pelajari lebih lanjut tentang Google Docs, Spreadsheet, dan Slides
              </CheckItem>
            </Toggle>
          </NumSection>

          {/* ── 3. Penyimpanan Dokumen ── */}
          <NumSection num="3" title="Penyimpanan Dokumen (Storage)">
            <Callout>
              CISDI memaksimalkan penggunaan Google Drive sebagai medium penyimpanan
              berbasis <em>cloud</em>. Fitur ini terintegrasi dengan setiap akun
              berdomain xxx@cisdi.org dan menyematkan medium penyimpanan (
              <em>storage</em>) di setiap akun.
            </Callout>

            <Toggle title="🟢 Google Drive">
              <p className="text-sm text-zinc-600 dark:text-white/60">
                <strong className="text-zinc-800 dark:text-white">
                  Media Penyimpanan Bersama / Shared Drive
                </strong>
                <br />
                <strong>Shared Drive: CISDI Internal Knowledge Hub</strong> digunakan
                untuk sebagai media penyimpanan dan berbagi dokumen. Pengaturan umum
                folder ini dapat diakses oleh seluruh akun berdomain cisdi.org, jadi
                bisa digunakan untuk menyimpan dokumen yang dapat dibagikan lintas
                tim.
              </p>
              <CheckItem id="d1-gdrive" isDone={d("d1-gdrive")} onToggle={t("d1-gdrive")}>
                Pelajari lebih lanjut tentang Google Drive dan Shared Drive CISDI
                Internal Knowledge Hub
              </CheckItem>
            </Toggle>
          </NumSection>

          {/* ── 4. Knowledge Hub ── */}
          <NumSection num="4" title="Portal Informasi dan Pengetahuan (Knowledge Hub)">
            <Callout>
              <strong>
                CISDI memaksimalkan Notion sebagai pusat informasi dan pengetahuan
                internal.
              </strong>{" "}
              Portal informasi ini dapat digunakan sebagai rujukan mengakses
              informasi seputar CISDI, prosedur kerja, dashboard, dan informasi
              pendukung pekerjaan lainnya.
            </Callout>

            <Toggle title="Notion (CISDI Wiki)">
              <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-white">
                Tips Penggunaan CISDI Wiki
              </h4>
              <p className="mb-3 text-sm text-zinc-600 dark:text-white/60">
                Terdapat dua cara mengakses notion yang dapat disesuaikan dengan
                preferensi dan kebutuhan:
              </p>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="mb-1.5 text-sm font-semibold text-zinc-800 dark:text-white">
                    1 Akses melalui browser 🌐
                  </p>
                  <ol className="ml-4 list-decimal space-y-1 text-xs text-zinc-600 dark:text-white/60">
                    <li>
                      Login di{" "}
                      <a
                        href="https://www.notion.so"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 underline dark:text-red-400"
                      >
                        notion.so
                      </a>
                    </li>
                    <li>
                      Tambahkan bookmark di browser yang kamu gunakan untuk
                      memudahkan akses ke CISDI Wiki
                    </li>
                  </ol>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="mb-1.5 text-sm font-semibold text-zinc-800 dark:text-white">
                    2 Akses melalui aplikasi di gawai 📱
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-white/60">
                    Unduh aplikasi Notion di App Store, Playstore atau kunjungi{" "}
                    <a
                      href="https://www.notion.so/desktop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 underline dark:text-red-400"
                    >
                      notion.so/desktop
                    </a>{" "}
                    dari laptop/PC kamu.
                  </p>
                </div>
              </div>

              <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-white">
                Akses ke Notion —{" "}
                <span className="text-red-600 dark:text-red-400">
                  Sign Up dan Log in ke Notion
                </span>
              </h4>
              <p className="mb-3 text-sm text-zinc-600 dark:text-white/60">
                Akses ke Notion akan terhubung dengan email CISDI. Kamu akan
                mendapatkan email berisi undangan untuk membuat akun dan masuk ke
                CISDI Wiki. Hubungi Tim Human Capital atau Knowledge &amp; Learning
                apabila kamu belum mendapatkan akses atau menemui kendala dalam
                tahapan ini.
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

              <p className="mt-3 mb-1 text-sm font-medium text-red-600 dark:text-red-400">
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
          </NumSection>

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
              tercantum pada kalender Google, pastikan telah mengakses seluruh materi
              asinkronus laman program orientasi karyawan CISDI hari pertama
            </p>
            <CheckItem id="d1-sesi" isDone={d("d1-sesi")} onToggle={t("d1-sesi")}>
              Ikuti Sesi Penyelarasan Hari Pertama
            </CheckItem>
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
