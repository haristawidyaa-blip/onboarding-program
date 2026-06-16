import { ProgramDay } from "./types";

export const programDays: ProgramDay[] = [
  {
    slug: "hari-1",
    dayNumber: 1,
    title: "Mengenal CISDI yang Sehat, Adil, Setara",
    icon: "kickoff",
    intro:
      "Halo! Selamat datang di hari pertama kamu bekerja di CISDI. Mari mulai dengan mengeksplorasi sejarah, visi, misi, dan nilai-nilai CISDI — yang menjadi kompas dalam setiap langkah kita.",
    sections: [
      {
        id: "kenal-cisdi",
        title: "Mengenal CISDI yang Sehat, Adil, Setara",
        tasks: [
          {
            id: "d1-video-visi-misi",
            type: "video",
            title: "Mengenal CISDI: Visi, Misi dan Fokus Kerja",
            href: "https://www.youtube.com/embed/0cm3-HvzyUo?si=J84IAVb_r048tEAe",
            ctaLabel: "Tonton video",
          },
          {
            id: "d1-visi-misi-pedoman",
            type: "document",
            title: "Pelajari Visi, Misi, dan Pedoman Yayasan",
            ctaLabel: "Buka materi",
          },
          {
            id: "d1-isu-prioritas",
            type: "document",
            title: "Pelajari fokus isu yang dikerjakan CISDI di halaman Isu Prioritas CISDI",
            ctaLabel: "Buka materi",
          },
          {
            id: "d1-public-health",
            type: "document",
            title: "[Materi Pembelajaran] Public Health 101",
            description:
              "Isu besar CISDI berada di ranah kerja kesehatan masyarakat (public health), maka kamu perlu memiliki pengetahuan dasar terkait public health.",
            ctaLabel: "Pelajari materi",
          },
          {
            id: "d1-phc",
            type: "document",
            title: "[Materi Pembelajaran] Primary Health Care 101",
            description:
              "Selain kesehatan masyarakat, penguatan layanan kesehatan primer menjadi salah satu fokus isu CISDI.",
            ctaLabel: "Pelajari materi",
          },
          {
            id: "d1-learning-space",
            type: "link",
            title: "Eksplorasi materi lain di Learning Space",
            description:
              "Pilih subjek atau materi yang dirasa paling relevan dengan pekerjaan yang akan kamu lakukan di CISDI.",
            href: "/belajar",
            ctaLabel: "Buka Learning Space",
          },
          {
            id: "d1-update-info",
            type: "info",
            title: "Update Informasi Terkini tentang Kerja CISDI",
            description:
              "CISDI menyelenggarakan Quarterly Review sebagai mekanisme pertukaran informasi lintas divisi. Pelajari capaian kerja divisi/departemen di Kalender CISDI.",
            ctaLabel: "Buka Kalender CISDI",
          },
        ],
      },
      {
        id: "refleksi-1",
        title: "Refleksi Memaknai CISDI yang Sehat, Adil, Setara",
        tasks: [
          {
            id: "d1-reflection",
            type: "reflection",
            title: "Tulis refleksimu di Padlet",
            description:
              "Bagaimana visi dan misi CISDI berkaitan dengan peran kamu? Bagaimana kamu memastikan sikap dan perilakumu selaras dengan nilai-nilai CISDI?",
            href: "https://padlet.com/knowledgelearning/memaknai-visi-dan-misi-cisdi-ak9dyg5cz7u4o6kv",
            ctaLabel: "Tulis refleksi di Padlet",
          },
        ],
      },
      {
        id: "ekosistem-kerja",
        title: "Mengenal Ekosistem Kerja dan Komunikasi CISDI",
        tasks: [
          {
            id: "d1-gmail",
            type: "action",
            title: "Aktivasi & lengkapi akun Gmail CISDI",
            description: "Pastikan kamu sudah menerima akun email dari Tim Human Capital.",
            steps: [
              "Ubah dan reset password akun Gmail",
              "Tambahkan foto profil (kemeja/blouse putih, latar abu-abu)",
              "Tambahkan Email Signature CISDI",
            ],
          },
          {
            id: "d1-group-email",
            type: "document",
            title: "Pelajari Email & Group Mailing List Directory",
            ctaLabel: "Buka direktori",
          },
          {
            id: "d1-slack-video",
            type: "video",
            title: "Berkenalan dengan Slack",
            href: "https://youtu.be/6wjmH5qL3Ms",
            ctaLabel: "Tonton video",
          },
          {
            id: "d1-slack-profile",
            type: "action",
            title: "Bergabung dan lengkapi profil di Slack CISDI",
            steps: [
              "Login Slack di gawai/perangkat kerja",
              "Lengkapi profil: foto, posisi kerja, email CISDI, nomor WhatsApp",
              "Atur notifikasi dan status sesuai preferensi",
              "Kenali channel utama: #cisdi-hq, #random, #tech-optimization",
              "Hubungi supervisor melalui Slack untuk memperkenalkan diri",
            ],
          },
          {
            id: "d1-pedoman-komunikasi",
            type: "document",
            title: "Pelajari Pedoman Komunikasi Internal CISDI",
            ctaLabel: "Buka pedoman",
          },
          {
            id: "d1-praktik-ekosistem",
            type: "action",
            title: "Praktik Mengenali Ekosistem Komunikasi CISDI",
            steps: [
              "Agendakan jadwal pertemuan dengan Supervisormu pekan ini",
              "Gunakan Slack untuk menyepakati waktu pertemuan",
              "Buat undangan di Google Calendar lengkap dengan deskripsi, tag @Yurdhinda Aprilia dan @ayu.purnamasari@cisdi.org",
              "Lakukan pertemuan untuk membahas peran dan lingkup pekerjaanmu",
            ],
          },
          {
            id: "d1-gcal",
            type: "document",
            title: "Pelajari Google Calendar & ketentuan Time Tracking",
            ctaLabel: "Pelajari lebih lanjut",
          },
          {
            id: "d1-gmeet",
            type: "document",
            title: "Pelajari Google Meet",
            ctaLabel: "Pelajari lebih lanjut",
          },
          {
            id: "d1-gdrive",
            type: "document",
            title: "Pelajari Google Drive & Shared Drive (CISDI Internal Knowledge Hub)",
            ctaLabel: "Pelajari lebih lanjut",
          },
          {
            id: "d1-notion-video",
            type: "video",
            title: "Mengenal Tampilan dan Isi CISDI Wiki (Notion)",
            href: "https://youtu.be/dyQ5zIaWnVA",
            ctaLabel: "Tonton video",
          },
          {
            id: "d1-notion-signup",
            type: "action",
            title: "Sign up & login ke Notion (CISDI Wiki)",
            description:
              "Akses terhubung dengan email CISDI. Hubungi Tim Human Capital / Knowledge & Learning jika belum mendapat akses.",
          },
          {
            id: "d1-pum",
            type: "action",
            title: "Isi Personal User Manual di Employee Directory",
            ctaLabel: "Buka Employee Directory",
          },
        ],
      },
      {
        id: "sesi-1",
        title: "Sesi Penyelarasan",
        tasks: [
          {
            id: "d1-sesi",
            type: "meeting",
            title: "Ikuti Sesi Penyelarasan Hari Pertama",
            description:
              "Sesi dilaksanakan sesuai jadwal di kalender Google. Pastikan kamu telah mengakses seluruh materi asinkronus hari pertama sebelum sesi berlangsung.",
          },
        ],
      },
    ],
  },
  {
    slug: "hari-2",
    dayNumber: 2,
    title: "Ekosistem Kerja, Kebijakan & Pedoman CISDI",
    icon: "kickoff",
    intro:
      "Mari berkenalan lebih jauh dengan ekosistem kerja CISDI. Hari ini kita mengupas bagaimana prinsip Sehat, Adil, Setara diimplementasikan dalam kebijakan dan pedoman internal CISDI.",
    sections: [
      {
        id: "gedsi",
        title: "Mengenal Ekosistem Kerja CISDI",
        tasks: [
          {
            id: "d2-gedsi",
            type: "document",
            title: "Praktik GEDSI dalam Lingkungan CISDI",
            ctaLabel: "Pelajari GEDSI 101",
          },
          {
            id: "d2-anti-kekerasan",
            type: "document",
            title: "Mitigasi Perilaku Kekerasan dan Pelecehan di Lingkungan Kerja",
            ctaLabel: "Pelajari Kebijakan Anti Kekerasan dan Pelecehan",
          },
          {
            id: "d2-anti-korupsi",
            type: "document",
            title: "Mitigasi Perilaku Penggelapan dan KKN di Lingkungan Kerja",
            ctaLabel: "Pelajari Kebijakan Anti Korupsi dan Fraud",
          },
          {
            id: "d2-sop",
            type: "document",
            title: "SOP, Kebijakan, dan Pedoman Internal",
            description:
              "Identifikasi dan akses dokumen yang relevan dengan aktivitas pekerjaanmu. Minta arahan supervisor terkait kebijakan mana yang perlu dipelajari.",
            ctaLabel: "Buka direktori SOP & Kebijakan",
          },
        ],
      },
      {
        id: "pedoman",
        title: "Menggunakan dan Mengimplementasi Pedoman",
        tasks: [
          {
            id: "d2-penamaan-dokumen",
            type: "document",
            title: "Pedoman Penamaan dan Penyimpanan Dokumen",
            ctaLabel: "Pelajari pedoman",
          },
          {
            id: "d2-renja",
            type: "document",
            title: "Pelajari Rencana Kerja (work plan) Unit/Departemen/Project tahun berjalan",
            ctaLabel: "Buka Kalender CISDI",
          },
          {
            id: "d2-tugas-mandiri",
            type: "action",
            title: "Tugas Mandiri: Membuat Draf Diskusi Rencana Kerja",
            steps: [
              "Baca rencana kerja dari departemen kamu saat ini",
              "Catat hal yang ingin kamu ketahui dari Supervisor terkait rencana kerja",
              "Diskusikan hal tersebut dalam pertemuan yang sudah dijadwalkan",
            ],
          },
        ],
      },
      {
        id: "pengajuan",
        title: "Alur Pengajuan Reguler",
        tasks: [
          {
            id: "d2-finance",
            type: "document",
            title: "Finance & Administration",
            steps: [
              "Panduan Pengadaan Barang dan Jasa",
              "Panduan Pengajuan Nota Keuangan",
              "Panduan Penggunaan Ruangan Kantor CISDI",
            ],
          },
          {
            id: "d2-hc",
            type: "document",
            title: "Human Capital",
            steps: [
              "Panduan Pengajuan Cuti dan Pengganti Hari",
              "Panduan Pengajuan Lembur",
              "Panduan Pengajuan Kegiatan Belajar Internal Karyawan CISDI",
            ],
          },
          {
            id: "d2-kl",
            type: "document",
            title: "Knowledge & Learning",
            steps: ["Panduan Unggah Konten ke Website CISDI"],
          },
          {
            id: "d2-praktik-pengajuan",
            type: "action",
            title: "Praktik Mandiri: Coba Alur Pengajuan Reguler",
            steps: [
              "Kirim pengajuan cuti mengikuti langkah-langkah yang ada",
              "Sematkan kata '[Tugas Program Orientasi]' pada subject agar cuti tidak terpotong",
              "Tag @Yurdhinda Aprilia dan @ayu.purnamasari@cisdi.org",
              "Tunggu respons dari Supervisor dan Tim Human Capital",
            ],
          },
        ],
      },
      {
        id: "refleksi-2",
        title: "Refleksi Pembelajaran",
        tasks: [
          {
            id: "d2-reflection",
            type: "reflection",
            title: "Tulis refleksimu di Padlet",
            description:
              "Seperti apa langkah awal yang kamu lakukan untuk memastikan rencana kerja kamu selaras dengan prioritas CISDI?",
            href: "https://padlet.com/knowledgelearning/menyelaraskan-strategi-dengan-prioritas-ccisdi-mt7gbrwdmadywyjt",
            ctaLabel: "Tulis refleksi di Padlet",
          },
        ],
      },
      {
        id: "sesi-2",
        title: "Sesi Penyelarasan",
        tasks: [
          {
            id: "d2-sesi",
            type: "meeting",
            title: "Ikuti Sesi Penyelarasan Hari Kedua",
            description:
              "Sesi dilaksanakan sesuai jadwal di kalender Google. Pastikan kamu telah mengakses seluruh materi asinkronus hari kedua sebelum sesi berlangsung.",
          },
        ],
      },
    ],
  },
  {
    slug: "hari-3",
    dayNumber: 3,
    title: "Life at CISDI",
    icon: "growth",
    intro:
      "Hari ini kamu akan mengenal lebih dekat kehidupan di CISDI — bukan hanya sebagai tempat bekerja, tetapi sebagai organisasi yang digerakkan oleh tujuan, kolaborasi, dan semangat belajar yang berkelanjutan.",
    sections: [
      {
        id: "civitas",
        title: "Civitas Organisasi",
        tasks: [
          {
            id: "d3-struktur",
            type: "document",
            title: "Mengenal Struktur Organisasi CISDI",
            description:
              "Pahami jalur koordinasi di internal CISDI dan kenali pihak-pihak yang akan berkolaborasi erat denganmu sehari-hari.",
            ctaLabel: "Akses Struktur Organisasi",
          },
          {
            id: "d3-directory",
            type: "link",
            title: "Kunjungi kembali Employee Directory",
            description: "Kenali rekan-rekan kerjamu dan temukan cara terbaik berkomunikasi dan berkolaborasi.",
          },
          {
            id: "d3-reflection-1",
            type: "reflection",
            title: "Yuk, berefleksi!",
            description:
              "Dalam pekan pertamamu, kamu diberi tugas menangani proyek yang butuh koordinasi dengan tim lain. Seperti apa langkah lanjutan yang akan kamu lakukan dalam 1 pekan ke depan?",
            href: "https://padlet.com/knowledgelearning/yuk-berefleksi-pengalaman-koordinasi-di-pekan-pertama-wvv9r426nomqcwk4",
            ctaLabel: "Tulis refleksi di Padlet",
          },
        ],
      },
      {
        id: "interaksi",
        title: "Interaksi yang Kolaboratif & Suportif",
        tasks: [
          {
            id: "d3-brand",
            type: "document",
            title: "Brand Playbook dan Panduan Visual CISDI",
            ctaLabel: "Pelajari Brand Playbook",
          },
          {
            id: "d3-medsos",
            type: "video",
            title: "Pedoman Bermedia Sosial bagi Karyawan CISDI",
            href: "https://youtu.be/kt7ktiqVP5I",
            ctaLabel: "Tonton video",
          },
        ],
      },
      {
        id: "lifelong-learning",
        title: "Pembelajaran Berkelanjutan",
        tasks: [
          {
            id: "d3-lifelong",
            type: "info",
            title: "Pembelajaran Berkelanjutan di CISDI",
            description:
              "Setiap karyawan memiliki Individual Development Plan (IDP) yang diperbarui tiap tahun untuk merancang perjalanan belajar dan target pengembangan kompetensi.",
          },
          {
            id: "d3-pengajuan-belajar",
            type: "document",
            title: "Panduan Pengajuan Kegiatan Belajar Internal Karyawan CISDI",
            ctaLabel: "Buka panduan",
          },
          {
            id: "d3-cakrawala",
            type: "link",
            title: "Jelajahi Cakrawala Belajar di Learning Space",
            href: "/belajar",
            ctaLabel: "Buka Learning Space",
          },
        ],
      },
      {
        id: "refleksi-3",
        title: "Mari Berefleksi",
        tasks: [
          {
            id: "d3-action",
            type: "action",
            title: "Tutup modul hari ini",
            steps: [
              "Tulis jurnal refleksi pribadi tentang hal yang ingin kamu pelajari di CISDI",
              "Baca kembali SOW-mu dan identifikasi potensi diri yang bisa kamu kembangkan",
              "Diskusikan hasil refleksi dengan atasanmu untuk menentukan bentuk dukungan pembelajaran",
            ],
          },
          {
            id: "d3-reflection-2",
            type: "reflection",
            title: "Tulis refleksimu di Padlet",
            description:
              "Apa keterampilan yang ingin kamu kembangkan kedepannya, dan bagaimana cara yang kamu ingin lakukan untuk mencapainya?",
            href: "https://padlet.com/knowledgelearning/longlife-learning-e4mwq3ijw0z4fbwe",
            ctaLabel: "Tulis refleksi di Padlet",
          },
        ],
      },
      {
        id: "sesi-3",
        title: "Sesi Penyelarasan",
        tasks: [
          {
            id: "d3-sesi",
            type: "meeting",
            title: "Ikuti Sesi Penyelarasan Hari Ketiga",
            description:
              "Sesi dilaksanakan sesuai jadwal di kalender Google. Pastikan kamu telah mengakses seluruh materi asinkronus hingga hari ketiga.",
          },
        ],
      },
    ],
  },
  {
    slug: "hari-4",
    dayNumber: 4,
    title: "Misi Mengenal Kantor & Rekan Kerja",
    icon: "growth",
    intro:
      "Hai! Selamat datang di hari keempat. Hari ini, saatnya kamu mengeksplorasi kantor kita secara luring dan mengenal lebih dekat orang-orang yang akan bekerja bersamamu. Sambil berjalan-jalan, selesaikan misi kecil ini — seru, ringan, tapi penuh makna!",
    closingQuote:
      "Apa hal baru yang aku pelajari dari percakapan hari ini, dan bagaimana hal itu bisa membantuku berkolaborasi lebih baik di CISDI?",
    sections: [
      {
        id: "misi",
        title: "Misi Hari Ini",
        tasks: [
          {
            id: "d4-supervisor",
            type: "meeting",
            title: "Bertemu dengan Supervisor sesuai jadwal yang sudah disepakati",
            ctaLabel: "Tandai selesai",
          },
          {
            id: "d4-agenda",
            type: "action",
            title: "Masukkan topik ini sebagai agenda pembahasan",
            steps: [
              "Lingkup pekerjaan",
              "Ekspektasi yang muncul",
              "Rencana kerja",
              "Dokumen dan aplikasi penunjang yang akan diakses",
            ],
          },
          {
            id: "d4-kenalan",
            type: "action",
            title: "Berkenalan dengan 3 civitas CISDI dari lintas departemen",
            description: "Cari tahu apa spesialisasi mereka.",
          },
          {
            id: "d4-catat",
            type: "reflection",
            title: "Catat hal-hal menarik dan berkesan",
            description:
              "Catat sebagai bahan diskusi pada sesi penyelarasan hari kelima.",
          },
          {
            id: "d4-deadline",
            type: "info",
            title: "Tenggat waktu",
            description: "Kamu punya waktu sampai 2 hari ke depan untuk menyelesaikan misi ini sebelum sesi penyelarasan terakhir.",
          },
        ],
      },
    ],
  },
  {
    slug: "hari-5",
    dayNumber: 5,
    title: "Refleksi Akhir & Sesi Penyelarasan Penutup",
    icon: "kickoff",
    intro:
      "Hari terakhir program orientasi! Saatnya merangkum perjalanan belajarmu selama satu pekan, menuntaskan misi hari keempat, dan menyiapkan langkah-langkah awal kontribusimu di CISDI.",
    note:
      "Materi rinci hari kelima belum tersedia dalam dokumen sumber — bagian ini menjadi placeholder yang dapat dilengkapi oleh Tim Learning & Development.",
    sections: [
      {
        id: "wrap-up",
        title: "Menuntaskan Misi & Persiapan Sesi Akhir",
        tasks: [
          {
            id: "d5-finalize-mission",
            type: "action",
            title: "Tuntaskan misi Hari Keempat (jika belum selesai)",
            description: "Pastikan kamu sudah bertemu Supervisor dan berkenalan dengan 3 civitas CISDI lintas departemen.",
          },
          {
            id: "d5-review",
            type: "reflection",
            title: "Tinjau kembali seluruh refleksi Hari 1–4",
            description: "Rangkum poin-poin penting yang ingin kamu bawa ke sesi penyelarasan akhir.",
          },
        ],
      },
      {
        id: "sesi-akhir",
        title: "Sesi Penyelarasan Penutup",
        tasks: [
          {
            id: "d5-sesi",
            type: "meeting",
            title: "Ikuti Sesi Penyelarasan Terakhir",
            description:
              "Diskusikan hasil misi Hari Keempat dan seluruh pembelajaran selama program orientasi bersama Supervisor dan Tim Human Capital / Learning & Development.",
          },
          {
            id: "d5-feedback",
            type: "reflection",
            title: "Berikan feedback program orientasi",
            description: "Bagikan masukanmu kepada Tim Human Capital untuk perbaikan program orientasi selanjutnya.",
          },
        ],
      },
    ],
  },
];

export const totalTaskCount = programDays.reduce(
  (sum, day) => sum + day.sections.reduce((s, sec) => s + sec.tasks.length, 0),
  0
);
