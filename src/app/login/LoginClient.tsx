"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, ArrowRight, Eye, EyeOff, GraduationCap, BookOpen, FileText } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import { VALID_USERNAME, VALID_PASSWORD, setAuthed } from "@/lib/auth";

const features = [
  { Icon: GraduationCap, label: "Program Orientasi Karyawan Baru", sub: "5 hari · 51 task terstruktur" },
  { Icon: BookOpen, label: "Learning Space", sub: "36 materi pengembangan mandiri" },
  { Icon: FileText, label: "SOP & Pedoman Kerja", sub: "43 dokumen organisasi" },
];

export function LoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username.trim().toLowerCase() === VALID_USERNAME && password === VALID_PASSWORD) {
      setAuthed();
      router.replace("/");
    } else {
      setError("Username atau password salah.");
    }
  }

  return (
    <main className="flex min-h-screen bg-[#0a0a0a]">
      {/* ── Left panel ── */}
      <div className="relative hidden lg:flex lg:w-[52%] flex-col items-start justify-center px-14 py-14 overflow-hidden bg-[#0f0f0f]">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 -left-24 h-[360px] w-[360px] rounded-full bg-red-900/20 blur-[90px]" />
        {/* dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        {/* Logo — pinned top-left */}
        <div className="absolute top-10 left-14">
          <Image src={withBasePath("/cisdi-logo.png")} alt="CISDI" width={92} height={45} className="h-9 w-auto" unoptimized priority />
        </div>

        {/* Body — truly centred */}
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-red-400">
            Learning Management System
          </span>

          <h1 className="mt-5 text-[2.6rem] font-bold leading-[1.15] tracking-tight text-white">
            Satu platform<br />untuk semua<br />
            <span className="text-red-500">program belajar.</span>
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
            Akses onboarding, materi mandiri, dan dokumen organisasi CISDI dalam satu tempat.
          </p>

          <div className="mt-10 space-y-4">
            {features.map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10 text-white/50">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/75">{label}</p>
                  <p className="text-xs text-white/30">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer — pinned bottom-left */}
        <p className="absolute bottom-10 left-14 text-xs text-white/20">© 2025 CISDI · Tim Knowledge &amp; Learning</p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 bg-[#111111]">
        {/* mobile logo */}
        <div className="mb-8 lg:hidden">
          <Image src={withBasePath("/cisdi-logo.png")} alt="CISDI" width={92} height={45} className="h-8 w-auto" unoptimized />
        </div>

        <div className="w-full max-w-[340px]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Selamat datang 👋</h2>
            <p className="mt-1.5 text-sm text-white/40">Masuk untuk mengakses LMS CISDI.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-xs font-medium text-white/45">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" strokeWidth={2} />
                <input
                  id="username" type="text" autoComplete="username"
                  value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }}
                  placeholder="cisdi"
                  className="w-full rounded-xl border border-white/8 bg-white/[0.06] py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-red-500/40 focus:bg-white/[0.09]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/45">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" strokeWidth={2} />
                <input
                  id="password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                  value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••"
                  className="w-full rounded-xl border border-white/8 bg-white/[0.06] py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-red-500/40 focus:bg-white/[0.09]"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan" : "Tampilkan"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <button type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-500 hover:shadow-red-600/35 active:scale-[0.98]">
              Masuk
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
