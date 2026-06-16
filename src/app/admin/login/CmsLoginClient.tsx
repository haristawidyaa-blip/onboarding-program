"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { KeyRound, Eye, EyeOff, ArrowRight, ShieldCheck, Database, FileText, BookOpen } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import { getToken, setToken } from "@/lib/cmsToken";

const features = [
  { Icon: BookOpen, label: "Kelola Materi Learning Space", sub: "Tambah, edit, hapus materi" },
  { Icon: FileText, label: "Kelola SOP & Pedoman Kerja", sub: "Tambah, edit, hapus dokumen" },
  { Icon: Database, label: "Tersimpan ke GitHub", sub: "Perubahan langsung ke repo" },
];

export function CmsLoginClient() {
  const router = useRouter();
  const [token, setTokenInput] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (getToken()) router.replace("/admin");
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const val = token.trim();
    if (!val) return;
    setChecking(true);
    setError("");
    try {
      const res = await fetch(
        "https://api.github.com/repos/haristawidyaa-blip/onboarding-program",
        { headers: { Authorization: `Bearer ${val}`, Accept: "application/vnd.github+json" } }
      );
      if (res.status === 401) setError("Token tidak valid atau sudah expired.");
      else if (res.status === 403 || res.status === 404) setError("Token tidak punya akses ke repository ini.");
      else if (!res.ok) setError(`Gagal memverifikasi token (status ${res.status}).`);
      else { setToken(val); router.replace("/admin"); }
    } catch {
      setError("Tidak dapat terhubung ke GitHub. Cek koneksi internet.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-[#0a0a0a]">
      {/* ── Left panel ── */}
      <div className="relative hidden lg:flex lg:w-[52%] flex-col justify-between p-14 overflow-hidden bg-[#0f0f0f]">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 -left-24 h-[360px] w-[360px] rounded-full bg-red-900/20 blur-[90px]" />
        {/* dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        {/* Logo */}
        <div className="relative">
          <Image src={withBasePath("/cisdi-logo.png")} alt="CISDI" width={92} height={45} className="h-9 w-auto" unoptimized priority />
        </div>

        {/* Body */}
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-red-400">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
            CMS Admin Access
          </span>

          <h1 className="mt-5 text-[2.6rem] font-bold leading-[1.15] tracking-tight text-white">
            Content<br />Management<br />
            <span className="text-red-500">System.</span>
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
            Kelola konten LMS CISDI langsung dari sini — tersinkronisasi otomatis ke repository.
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

        {/* Footer */}
        <p className="relative text-xs text-white/20">© 2025 CISDI · Tim Knowledge &amp; Learning</p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 bg-[#111111]">
        {/* mobile logo */}
        <div className="mb-8 lg:hidden">
          <Image src={withBasePath("/cisdi-logo.png")} alt="CISDI" width={92} height={45} className="h-8 w-auto" unoptimized />
        </div>

        <div className="w-full max-w-[340px]">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 mb-4">
              <ShieldCheck className="h-3 w-3" strokeWidth={2} />
              Admin Only
            </span>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Masuk ke CMS</h2>
            <p className="mt-1.5 text-sm text-white/40">
              Gunakan GitHub PAT dengan akses{" "}
              <span className="text-white/60 font-medium">Contents: Read &amp; Write</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="token" className="mb-1.5 block text-xs font-medium text-white/45">
                GitHub Access Token
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" strokeWidth={2} />
                <input
                  id="token" type={show ? "text" : "password"}
                  value={token} onChange={(e) => { setTokenInput(e.target.value); setError(""); }}
                  placeholder="github_pat_..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/8 bg-white/[0.06] py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-red-500/40 focus:bg-white/[0.09]"
                />
                <button type="button" onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Sembunyikan" : "Tampilkan"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
                  {show ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <button type="submit" disabled={!token.trim() || checking}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-500 hover:shadow-red-600/35 disabled:opacity-40 active:scale-[0.98]">
              {checking ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  Masuk ke CMS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-white/25">
            Belum punya token?{" "}
            <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer"
              className="text-white/45 underline hover:text-white/70 transition-colors">
              Buat di GitHub Settings
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
