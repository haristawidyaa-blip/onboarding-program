import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-red-50 dark:bg-red-500/10 animate-pulse" />
            <Compass
              className="relative h-11 w-11 text-red-600 dark:text-red-400 animate-[spin_6s_linear_infinite]"
              strokeWidth={1.75}
            />
          </div>

          <p className="mt-6 text-7xl font-bold tracking-tight text-red-600 dark:text-red-500">
            404
          </p>
          <h1 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Aduh, nyasar nih kayaknya! 🧭
          </h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-white/60 leading-relaxed">
            Halaman yang kamu cari sepertinya belum (atau tidak pernah) ada di
            sini. Mungkin salah ketik alamat, atau materinya udah pindah
            tempat. Yuk balik lagi ke jalur yang benar.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500 hover:-translate-y-0.5"
            >
              <Home className="h-4 w-4" strokeWidth={2} />
              Kembali ke Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
            <Link
              href="/belajar"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-700 dark:text-white/80 hover:border-red-300 dark:hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Jelajahi Learning Space
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
