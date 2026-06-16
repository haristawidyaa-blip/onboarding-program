"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import { VALID_USERNAME, VALID_PASSWORD, setAuthed } from "@/lib/auth";

export default function LoginPage() {
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
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#161616] p-8 shadow-2xl">
        <div className="flex justify-center">
          <Image
            src={withBasePath("/cisdi-logo.png")}
            alt="CISDI"
            width={92}
            height={45}
            className="h-9 w-auto"
            unoptimized
            priority
          />
        </div>

        <h1 className="mt-6 text-center text-xl font-semibold text-white">
          Onboarding CISDI
        </h1>
        <p className="mt-1.5 text-center text-sm text-white/50">
          Masuk untuk mengakses program orientasi karyawan baru.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1.5 block text-xs font-medium text-white/60">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" strokeWidth={2} />
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cisdi"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-red-500/50 focus:bg-white/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/60">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" strokeWidth={2} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-red-500/50 focus:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
              >
                {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500 active:scale-[0.98]"
          >
            Masuk
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </button>
        </form>
      </div>
    </main>
  );
}
