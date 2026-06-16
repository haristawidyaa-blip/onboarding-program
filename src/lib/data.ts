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
        id: "media-komunikasi",
        title: "1. Media Komunikasi Internal",
        note: "Sebelum memulai tahapan ini, pastikan kamu telah menerima akun email dari Tim Human Capital (berupa alamat email dan kata sandi atau tautan aktivasi) yang dikirimkan ke email pribadimu.",
        tasks: [
          {
            id: "d1-gmail",
            type: "action",
            title: "Aktivasi & lengkapi akun Gmail CISDI",
            description:
              "Google Mail (Gmail) merupakan platform surat elektronik yang dikembangkan Google dan terintegrasi dengan layanan-layanan di dalam ekosistem Google.",
            steps: [
              "Ubah dan reset password akun Gmail (buka Akun Google → Keamanan → Login ke Google → Sandi)",
              "Tambahkan foto profil (kemeja/blouse putih, latar abu-abu)",
              "Tambahkan Email Signature CISDI sesuai template yang tersedia",
            ],
          },
          {
            id: "d1-group-email",
            type: "document",
            title: "Pelajari Email & Group Mailing List Directory",
            description:
              "Akses dan pelajari direktori email grup atau tim yang dapat digunakan untuk menunjang kebutuhan koordinasi lintas unit.",
            ctaLabel: "Buka direktori",
          },
          {
            id: "d1-slack-video",
            type: "video",
            title: "Berkenalan dengan Slack",
            description:
              "CISDI memaksimalkan penggunaan Slack sebagai portal utama komunikasi internal sehari-hari.",
            href: "https://youtu.be/6wjmH5qL3Ms",
            ctaLabel: "Tonton video",
          },
          {
            id: "d1-slack-profile",
            type: "action",
            title: "Bergabung dan lengkapi profil di Slack CISDI",
            steps: [
              "Login Slack di gawai/perangkat kerja via slack.com/signin atau aplikasi Slack",
              "Lengkapi profil: foto, informasi posisi kerja di CISDI, email CISDI, nomor WhatsApp",
              "Atur pengaturan notifikasi dan status sesuai preferensi",
              "Kenali channel utama: #cisdi-hq, #random, #tech-optimization",
              "Hubungi manager/lead supervisor melalui Slack untuk memperkenalkan diri",
            ],
          },
          {
            id: "d1-slack-notif-video",
            type: "video",
            title: "Cara mengatur notifikasi di Slack",
            description:
              "Agar kamu tidak tertinggal notifikasi atau meminimalisir distraksi di Slack, pelajari cara menyesuaikan pengaturan notifikasi.",
            href: "https://youtu.be/wuyWwzazef8",
            ctaLabel: "Tonton video",
          },
          {
            id: "d1-pedoman-komunikasi",
            type: "document",
            title: "Pelajari Pedoman Komunikasi Internal CISDI",
            description:
              "Pelajari ketentuan komunikasi internal untuk mengurangi terjadinya miskomunikasi dalam sirkulasi informasi antar karyawan CISDI.",
            ctaLabel: "Buka pedoman",
          },
          {
            id: "d1-praktik-ekosistem",
            type: "action",
            title: "Praktik Mengenali Ekosistem Komunikasi CISDI",
            steps: [
              "Agendakan jadwal pertemuan dengan Supervisormu pada pekan ini",
              "Gunakan Slack untuk menghubungi secara personal dan menyepakati waktu pertemuan",
              "Buat undangan pertemuan lengkap dengan deskripsi menggunakan Google Calendar, tag @Yurdhinda Aprilia dan @ayu.purnamasari@cisdi.org",
              "Lakukan pertemuan yang telah dijadwalkan untuk membahas peran dan lingkup pekerjaanmu",
            ],
          },
        ],
      },
      {
        id: "proses-kerja",
        title: "2. Proses Kerja (Working Process)",
        note: "CISDI memaksimalkan penggunaan ekosistem Google Workspace untuk menunjang aktivitas kerja sehari-hari.",
        tasks: [
          {
            id: "d1-gcal",
            type: "document",
            title: "Pelajari Google Calendar & ketentuan Time Tracking",
            description:
              "CISDI memaksimalkan Google Calendar untuk mendokumentasikan waktu kerja (time tracking) dan mengatur agenda pertemuan serta aktivitas individu (Focus Time).",
            ctaLabel: "Pelajari lebih lanjut",
          },
          {
            id: "d1-gmeet",
            type: "document",
            title: "Pelajari Google Meet",
            description:
              "Google Meet digunakan sebagai medium utama pertemuan virtual bagi lintas unit di internal maupun eksternal CISDI.",
            ctaLabel: "Pelajari lebih lanjut",
          },
          {
            id: "d1-gdocs",
            type: "document",
            title: "Pelajari Google Docs, Spreadsheet, dan Slides",
            description:
              "CISDI memaksimalkan platform pengolahan kata, angka, dan visual dari Google: Google Docs, Google Spreadsheet, dan Google Slides.",
            ctaLabel: "Pelajari lebih lanjut",
          },
        ],
      },
      {
        id: "penyimpanan-dokumen",
        title: "3. Penyimpanan Dokumen (Storage)",
        note: "CISDI memaksimalkan penggunaan Google Drive sebagai medium penyimpanan berbasis cloud. Fitur ini terintegrasi dengan setiap akun berdomain xxx@cisdi.org.",
        tasks: [
          {
            id: "d1-gdrive",
            type: "document",
            title: "Pelajari Google Drive & Shared Drive (CISDI Internal Knowledge Hub)",
            description:
              "Shared Drive: CISDI Internal Knowledge Hub digunakan untuk media penyimpanan dan berbagi dokumen yang dapat diakses oleh seluruh akun berdomain cisdi.org.",
            ctaLabel: "Pelajari lebih lanjut",
          },
        ],
      },
      {
        id: "knowledge-hub",
        title: "4. Portal Informasi dan Pengetahuan (Knowledge Hub)",
        note: "CISDI memaksimalkan Notion sebagai pusat informasi dan pengetahuan internal. Portal informasi ini dapat digunakan sebagai rujukan mengakses informasi seputar CISDI, prosedur kerja, dashboard, dan informasi pendukung pekerjaan lainnya.",
        tasks: [
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
              "Akses ke Notion akan terhubung dengan email CISDI. Kamu akan mendapatkan email berisi undangan untuk membuat akun. Hubungi Tim Human Capital atau Knowledge & Learning apabila belum mendapatkan akses.",
            steps: [
              "Akses melalui browser: login di notion.so atau tambahkan bookmark",
              "Akses melalui aplikasi: unduh Notion di App Store, Playstore, atau notion.so/desktop",
            ],
          },
          {
            id: "d1-pum",
            type: "action",
            title: "Isi Personal User Manual di Employee Directory",
            description:
              "Jika sudah berhasil log in, lengkapi profil Personal User Manual template agar rekan-rekan di CISDI bisa mengenal kamu.",
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
              "Sesi penyelarasan dilaksanakan sesuai dengan jadwal yang telah tercantum pada kalender Google. Pastikan telah mengakses seluruh materi asinkronus laman program orientasi karyawan CISDI hari pertama.",
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
    title: "Sesi Penyelarasan Penutup",
    icon: "kickoff",
    intro:
      "Selamat! Kamu telah menyelesaikan kegiatan belajar pertama dari perjalananmu di CISDI. Kamu telah mengenal bagaimana dan mengapa CISDI lahir, memahami visi dan misi yang menjadi arah langkah, serta menggali nilai-nilai yang kita pegang teguh dalam bekerja dan berinteraksi. Semoga proses ini membantu melihat bahwa kamu bukan hanya Civitas sebuah organisasi, melainkan juga bagian dari sebuah gerakan—untuk mewujudkan Indonesia yang lebih sehat, lebih adil, dan lebih setara. Perjalanan ini tidak selalu mudah. Tapi bersama, kita bisa saling menopang. Dan setiap langkah kecil yang kamu ambil—setiap inisiatif, ide, atau keputusan yang kamu buat—dapat membawa perubahan yang berarti. Mari terus belajar, tumbuh, dan bekerja bersama dengan semangat kolaborasi, integritas, keberlanjutan, keberagaman, dan keberpihakan sosial. Sampai jumpa di bagian pembelajaran berikutnya. Selamat datang di CISDI. ✨",
    sections: [
      {
        id: "hari-kelima",
        title: "Hari Kelima",
        tasks: [
          {
            id: "d5-sesi",
            type: "meeting",
            title: "Sesi Penyelarasan",
            description:
              "Sesi penyelarasan dilaksanakan sesuai dengan jadwal yang telah tercantum pada kalender Google, pastikan telah mengakses seluruh materi asinkronus dan menyelesaikan seluruh tugas pada laman program orientasi karyawan CISDI.",
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
