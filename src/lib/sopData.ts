export type SopItem = {
  name: string;
  type: "SOP" | "Pedoman Kerja";
  division: string;
  status: "Authorized";
};

export const sopData: SopItem[] = [
  { name: "Panduan Pengelolaan Website CISDI (cisdi.org)", type: "Pedoman Kerja", division: "Knowledge & Learning", status: "Authorized" },
  { name: "Pedoman Komunikasi Internal CISDI", type: "Pedoman Kerja", division: "Knowledge & Learning", status: "Authorized" },
  { name: "Panduan Pengajuan Nota Keuangan", type: "SOP", division: "Finance & Administration", status: "Authorized" },
  { name: "Mekanisme Time Tracking di Google Calendar", type: "Pedoman Kerja", division: "Knowledge & Learning", status: "Authorized" },
  { name: "Pedoman Penamaan dan Penyimpanan Dokumen", type: "Pedoman Kerja", division: "Knowledge & Learning", status: "Authorized" },
  { name: "Panduan Pengajuan Lembur", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Panduan Pengajuan Cuti dan Pengganti Hari", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Panduan Pengadaan Barang dan Jasa", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Pedoman Bermedia Sosial Bagi Karyawan CISDI", type: "Pedoman Kerja", division: "Digital Communication", status: "Authorized" },
  { name: "Kebijakan Anti Kekerasan dan Pelecehan di Ruang Kerja", type: "SOP", division: "Knowledge & Learning", status: "Authorized" },
  { name: "Permintaan Tanda Tangan CEO", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Panduan Unggah Konten ke Website CISDI", type: "Pedoman Kerja", division: "Knowledge & Learning", status: "Authorized" },
  { name: "Panduan Penggunaan JMO (Jamsostek Mobile) - BPJS Ketenagakerjaan", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Panduan Penggunaan Mobile JKN (Jaminan Kesehatan Nasional) - BPJS Kesehatan", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "SOP Pengelolaan Aset CISDI", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Rencana Anggaran Biaya (RAB) CISDI Tahun 2023", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Pemilihan Konsumsi Sehat", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Pemutusan Akses Email Karyawan Non-Aktif", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Prosedur Pengajuan Perjalanan Dinas", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Standar Biaya Umum (SBU) CISDI", type: "SOP", division: "Finance & Administration", status: "Authorized" },
  { name: "Panduan Optimalisasi Linkedin untuk Karyawan CISDI", type: "Pedoman Kerja", division: "Knowledge & Learning", status: "Authorized" },
  { name: "SOP Konseling Kesehatan Mental", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Pedoman Pelaksanaan Yayasan (PPY)", type: "SOP", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Alur Pengajuan Uji Kelayakan Etik / Ethical Clearance Riset", type: "SOP", division: "Research & Development", status: "Authorized" },
  { name: "Pedoman Etika Yayasan CISDI", type: "SOP", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "SOP Penilaian KPI Karyawan", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Panduan Registrasi dan Feedback Event", type: "Pedoman Kerja", division: "Community & Public Engagement", status: "Authorized" },
  { name: "Panduan Peminjaman Barang Inventaris", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Asuransi Kumpulan - Allianz", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Mekanisme Pengajuan Travel Request", type: "Pedoman Kerja", division: "Finance & Administration", status: "Authorized" },
  { name: "Pedoman Dokumentasi Kegiatan CISDI", type: "Pedoman Kerja", division: "Digital Communication", status: "Authorized" },
  { name: "Panduan Penilaian Key Performance Indicator (KPI)", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Panduan Penyusunan Key Performance Indicators (KPI)", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Pedoman Dokumentasi Kegiatan Lapangan dan Pengolahan Konten Media Sosial CISDI", type: "Pedoman Kerja", division: "Community & Public Engagement", status: "Authorized" },
  { name: "Panduan Penerjemahan dan Proofreading Produk Pengetahuan CISDI", type: "Pedoman Kerja", division: "Knowledge & Learning", status: "Authorized" },
  { name: "Panduan Penggunaan Ruangan Kantor CISDI", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Kebijakan Anti Korupsi dan Fraud", type: "SOP", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Prosedur Pengadaan Jasa Berbasis Perorangan", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Panduan Pengembangan Produk Tim IT Development CISDI", type: "Pedoman Kerja", division: "IT Development", status: "Authorized" },
  { name: "Panduan Identitas Visual Pencerah Nusantara", type: "Pedoman Kerja", division: "Community & Public Engagement", status: "Authorized" },
  { name: "Panduan Pengajuan Pembaruan Data Karyawan CISDI", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Panduan Penyusunan Key Performance Indicators (KPI) - 2026", type: "Pedoman Kerja", division: "Corporate Secretary, Human Capital and General Affairs", status: "Authorized" },
  { name: "Brand Playbook & Panduan Identitas Visual CISDI", type: "Pedoman Kerja", division: "Digital Communication", status: "Authorized" },
];

export const sopDivisions = [...new Set(sopData.map((s) => s.division))].sort();
