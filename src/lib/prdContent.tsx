import {
  Target,
  Users,
  ListChecks,
  Layers,
  GitBranch,
  Gauge,
  XCircle,
  Lightbulb,
} from "lucide-react";

export const prdSections = [
  {
    id: "latar-belakang-masalah",
    icon: Target,
    title: "1. Latar Belakang & Masalah",
    body: (
      <>
        <p>
          Proses onboarding karyawan baru CISDI sebelumnya tersebar di banyak
          dokumen (Notion, Google Form, Padlet, email) tanpa satu pintu akses
          yang jelas. Karyawan baru kesulitan melacak materi mana yang sudah
          dipelajari, task mana yang belum selesai, dan kapan harus mengikuti
          sesi penyelarasan.
        </p>
        <p>
          Aplikasi ini dibuat sebagai satu dashboard terpusat untuk program
          orientasi 5 hari, menggabungkan materi asinkronus, refleksi, video,
          dan progress tracking dalam satu tempat.
        </p>
      </>
    ),
  },
  {
    id: "tujuan-produk",
    icon: Lightbulb,
    title: "2. Tujuan Produk",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Memberikan satu sumber kebenaran (single source of truth) untuk jadwal & materi onboarding 5 hari.</li>
        <li>Memudahkan karyawan baru menandai progress task harian secara mandiri.</li>
        <li>Menyatukan akses ke materi (dokumen, video, refleksi) tanpa berpindah-pindah platform secara berlebihan.</li>
        <li>Memberi Tim Human Capital &amp; Learning Development gambaran sederhana soal kelengkapan materi onboarding.</li>
      </ul>
    ),
  },
  {
    id: "target-pengguna",
    icon: Users,
    title: "3. Target Pengguna",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Karyawan baru CISDI</strong> — pengguna utama, mengakses dashboard selama 5 hari pertama bekerja.</li>
        <li><strong>Tim Human Capital &amp; Learning Development</strong> — pemilik konten, menyusun &amp; memperbarui materi tiap hari.</li>
        <li><strong>Supervisor/atasan langsung</strong> — referensi pendamping untuk sesi penyelarasan harian.</li>
      </ul>
    ),
  },
  {
    id: "lingkup-fitur",
    icon: ListChecks,
    title: "4. Lingkup Fitur (In Scope)",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Login sederhana berbasis username/password bersama (gate akses internal).</li>
        <li>Dashboard ringkasan progress (total task selesai, persentase keseluruhan, hari aktif).</li>
        <li>Halaman per hari (Hari 1–5) berisi section &amp; task terstruktur.</li>
        <li>Tipe task: video (embed YouTube), materi/dokumen (link keluar), refleksi (embed Padlet), tugas aksi, sesi tatap muka, info.</li>
        <li>Checklist task dengan status tersimpan di perangkat (localStorage), tidak perlu akun individual.</li>
        <li>Navigasi cepat antar hari &amp; dari/ke dashboard.</li>
        <li>Mode terang/gelap (light/dark mode) sesuai preferensi pengguna.</li>
        <li>Tampilan responsif (mobile &amp; desktop).</li>
      </ul>
    ),
  },
  {
    id: "alur-pengguna",
    icon: GitBranch,
    title: "5. Alur Pengguna (User Flow)",
    body: (
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Karyawan baru membuka link aplikasi → diarahkan ke halaman login.</li>
        <li>Login dengan kredensial bersama → masuk ke Dashboard.</li>
        <li>Dashboard menampilkan progress keseluruhan &amp; daftar 5 hari program.</li>
        <li>Memilih hari → melihat daftar section &amp; task hari tersebut.</li>
        <li>Menyelesaikan task (menonton video, membaca materi, mengisi refleksi di Padlet, dll) lalu menandai task selesai.</li>
        <li>Progress otomatis ter-update di dashboard &amp; kartu hari terkait.</li>
        <li>Mengulang langkah 4–6 untuk Hari 1 sampai Hari 5 hingga program selesai.</li>
      </ol>
    ),
  },
  {
    id: "arsitektur-tech-stack",
    icon: Layers,
    title: "6. Arsitektur & Tech Stack",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Framework:</strong> Next.js 16 (App Router) + React 19 + TypeScript.</li>
        <li><strong>Styling:</strong> Tailwind CSS v4, font Poppins, ikon dari lucide-react.</li>
        <li><strong>Penyimpanan progress:</strong> localStorage di sisi klien (tidak ada database/backend).</li>
        <li><strong>Hosting:</strong> Static export (output: export) di-deploy ke GitHub Pages lewat GitHub Actions.</li>
        <li><strong>Data konten:</strong> hardcoded terstruktur di <code>src/lib/data.ts</code>, diedit langsung oleh developer/Tim L&amp;D.</li>
      </ul>
    ),
  },
  {
    id: "metrik-keberhasilan",
    icon: Gauge,
    title: "7. Metrik Keberhasilan",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Karyawan baru menyelesaikan seluruh task 5 hari sebelum sesi penyelarasan terakhir.</li>
        <li>Berkurangnya pertanyaan berulang ke Tim Human Capital terkait &ldquo;materi ada di mana&rdquo;.</li>
        <li>Tingkat penyelesaian refleksi Padlet meningkat dibanding proses manual sebelumnya.</li>
      </ul>
    ),
  },
  {
    id: "di-luar-lingkup",
    icon: XCircle,
    title: "8. Di Luar Lingkup (Out of Scope)",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Akun individual per karyawan / autentikasi berbasis akun pribadi.</li>
        <li>Backend/database — progress tersimpan lokal per perangkat, tidak disinkronkan ke server.</li>
        <li>Laporan/analytics agregat untuk Tim Human Capital di dalam aplikasi (saat ini manual).</li>
        <li>Notifikasi otomatis (email/push) pengingat task atau sesi penyelarasan.</li>
        <li>Pengelolaan konten lewat CMS — perubahan materi masih lewat perubahan kode.</li>
      </ul>
    ),
  },
];
