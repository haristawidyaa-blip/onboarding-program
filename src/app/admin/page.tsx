import { Header } from "@/components/Header";
import { AdminClient } from "./AdminClient";

export default function AdminPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <p className="text-red-600 dark:text-red-500 text-sm font-semibold uppercase tracking-wide">
            Internal Tool
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] dark:text-white">
            Kelola Materi Learning Space
          </h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-white/60 leading-relaxed">
            Tambah, edit, atau hapus materi Learning Space langsung dari sini.
            Perubahan disimpan langsung ke repository dan situs akan otomatis
            diperbarui setelah deploy selesai.
          </p>

          <div className="mt-8">
            <AdminClient />
          </div>
        </section>
      </main>
    </>
  );
}
