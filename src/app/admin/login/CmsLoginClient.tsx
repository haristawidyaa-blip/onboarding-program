"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { KeyRound, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import { getToken, setToken } from "@/lib/cmsToken";

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
        {
          headers: {
            Authorization: `Bearer ${val}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      if (res.status === 401) {
        setError("Token tidak valid atau sudah expired.");
      } else if (res.status === 404 || res.status === 403) {
        setError("Token tidak punya akses ke repository ini.");
      } else if (!res.ok) {
        setError(`Gagal memverifikasi token (status ${res.status}).`);
      } else {
        setToken(val);
        router.replace("/admin");
      }
    } catch {
      setError("Tidak dapat terhubung ke GitHub. Cek koneksi internet.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-[#161616] p-8 shadow-2xl">
          {/* Logo + badge */}
          <div className="flex flex-col items-center gap-3">
            <Image
              src={withBasePath("/cisdi-logo.png")}
              alt="CISDI"
              width={92}
              height={45}
              className="h-8 w-auto"
              unoptimized
              priority
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
              CMS Admin Access
            </span>
          </div>

          <h1 className="mt-6 text-center text-lg font-semibold text-white">
            Masuk ke LMS CMS
          </h1>
          <p className="mt-1.5 text-center text-sm text-white/45 leading-relaxed">
            Masukkan GitHub Personal Access Token dengan akses{" "}
            <span className="text-white/70 font-medium">Contents: Read &amp; Write</span>.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="token" className="mb-1.5 block text-xs font-medium text-white/50">
                GitHub Token
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" strokeWidth={2} />
                <input
                  id="token"
                  type={show ? "text" : "password"}
                  value={token}
                  onChange={(e) => { setTokenInput(e.target.value); setError(""); }}
                  placeholder="github_pat_..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-red-500/50 focus:bg-white/8"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Sembunyikan token" : "Tampilkan token"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {show ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!token.trim() || checking}
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500 disabled:opacity-40 active:scale-[0.98]"
            >
              {checking ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Memverifikasi...
                </span>
              ) : (
                <>
                  Masuk ke CMS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Helper */}
        <p className="mt-4 text-center text-xs text-white/25">
          Belum punya token?{" "}
          <a
            href="https://github.com/settings/personal-access-tokens/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/45 underline hover:text-white/70 transition-colors"
          >
            Buat di GitHub Settings
          </a>
        </p>
      </div>
    </main>
  );
}
