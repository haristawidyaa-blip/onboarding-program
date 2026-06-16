import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900">
          <span className="text-2xl">🎪</span>
          <span>Onboarding CISDI</span>
        </Link>
        <span className="hidden sm:inline text-sm text-zinc-500">
          Program Orientasi Karyawan Baru
        </span>
      </div>
    </header>
  );
}
