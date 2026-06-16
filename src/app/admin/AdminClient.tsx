"use client";

import { useEffect, useState } from "react";
import {
  KeyRound,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { LearningMaterial } from "@/lib/types";
import { getToken, setToken as storeToken, clearToken } from "@/lib/cmsToken";
import { fetchLearningMaterials, saveLearningMaterials, GithubContentError } from "@/lib/githubContent";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

function uniqueId(base: string, existing: LearningMaterial[]) {
  let id = base;
  let n = 2;
  while (existing.some((m) => m.id === id)) {
    id = `${base}-${n}`;
    n++;
  }
  return id;
}

type FormState = { title: string; categories: string; pdfUrl: string };
const emptyForm: FormState = { title: "", categories: "", pdfUrl: "" };

export function AdminClient() {
  const [tokenInput, setTokenInput] = useState("");
  const [hasToken, setHasToken] = useState(false);

  const [materials, setMaterials] = useState<LearningMaterial[] | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm);
  const [newForm, setNewForm] = useState<FormState>(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setHasToken(!!getToken());
  }, []);

  async function loadMaterials() {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const { data, sha } = await fetchLearningMaterials(token);
      setMaterials(data);
      setSha(sha);
    } catch (e) {
      setError(e instanceof GithubContentError ? e.message : "Terjadi kesalahan tak terduga.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (hasToken) loadMaterials();
  }, [hasToken]);

  function handleConnect() {
    if (!tokenInput.trim()) return;
    storeToken(tokenInput.trim());
    setTokenInput("");
    setHasToken(true);
  }

  function handleDisconnect() {
    clearToken();
    setHasToken(false);
    setMaterials(null);
    setSha(null);
  }

  function startEdit(material: LearningMaterial) {
    setEditingId(material.id);
    setEditForm({
      title: material.title,
      categories: material.categories.join(", "),
      pdfUrl: material.pdfUrl,
    });
  }

  function saveEdit() {
    if (!materials || !editingId) return;
    setMaterials(
      materials.map((m) =>
        m.id === editingId
          ? {
              ...m,
              title: editForm.title.trim(),
              categories: editForm.categories
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean),
              pdfUrl: editForm.pdfUrl.trim(),
            }
          : m
      )
    );
    setEditingId(null);
  }

  function deleteMaterial(id: string) {
    if (!materials) return;
    if (!confirm("Hapus materi ini? Perubahan baru permanen setelah disimpan ke GitHub.")) return;
    setMaterials(materials.filter((m) => m.id !== id));
  }

  function addMaterial() {
    if (!materials) return;
    if (!newForm.title.trim() || !newForm.pdfUrl.trim()) return;
    const id = uniqueId(slugify(newForm.title), materials);
    setMaterials([
      ...materials,
      {
        id,
        title: newForm.title.trim(),
        categories: newForm.categories
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        pdfUrl: newForm.pdfUrl.trim(),
      },
    ]);
    setNewForm(emptyForm);
    setShowAddForm(false);
  }

  async function handleSaveToGithub() {
    const token = getToken();
    if (!token || !materials || !sha) return;
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const { sha: newSha } = await saveLearningMaterials(
        token,
        materials,
        sha,
        "Update learning materials via Admin CMS"
      );
      setSha(newSha);
      setSuccessMsg(
        "Tersimpan ke GitHub! Situs akan otomatis diperbarui setelah deploy selesai (~1 menit)."
      );
    } catch (e) {
      setError(e instanceof GithubContentError ? e.message : "Terjadi kesalahan tak terduga.");
    } finally {
      setSaving(false);
    }
  }

  if (!hasToken) {
    return (
      <div className="rounded-3xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-6 shadow-sm max-w-md">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300">
            <KeyRound className="h-4.5 w-4.5" strokeWidth={2} />
          </span>
          <h2 className="font-semibold text-zinc-900 dark:text-white">Masukkan GitHub Token</h2>
        </div>
        <p className="mt-3 text-sm text-zinc-600 dark:text-white/60 leading-relaxed">
          Gunakan{" "}
          <a
            href="https://github.com/settings/personal-access-tokens/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 dark:text-red-400 underline"
          >
            fine-grained personal access token
          </a>{" "}
          yang di-scope khusus ke repo ini saja, dengan permission{" "}
          <strong>Contents: Read and write</strong>. Token disimpan hanya di browser ini, tidak
          dikirim ke server manapun selain GitHub.
        </p>
        <input
          type="password"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          placeholder="github_pat_..."
          className="mt-4 w-full rounded-xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-red-400 dark:focus:border-red-500/50"
        />
        <button
          onClick={handleConnect}
          disabled={!tokenInput.trim()}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 transition-colors"
        >
          Hubungkan
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          onClick={loadMaterials}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:text-white/70 hover:border-red-300 dark:hover:border-red-500/50 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} strokeWidth={2} />
          Muat ulang
        </button>
        <button
          onClick={handleDisconnect}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:text-white/70 hover:border-red-300 dark:hover:border-red-500/50 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" strokeWidth={2} />
          Hapus token
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3.5 py-2.5 text-sm text-amber-700 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
          {error}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3.5 py-2.5 text-sm text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
          {successMsg}
        </div>
      )}

      {loading && !materials && (
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-white/50">
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
          Memuat materi dari GitHub...
        </div>
      )}

      {materials && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-500 dark:text-white/50">{materials.length} materi</p>
            <button
              onClick={() => setShowAddForm((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Tambah Materi
            </button>
          </div>

          {showAddForm && (
            <div className="mb-5 rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-zinc-50 dark:bg-white/5 p-4 space-y-3">
              <input
                value={newForm.title}
                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                placeholder="Judul materi"
                className="w-full rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:border-red-400"
              />
              <input
                value={newForm.categories}
                onChange={(e) => setNewForm({ ...newForm, categories: e.target.value })}
                placeholder="Kategori (pisahkan dengan koma)"
                className="w-full rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:border-red-400"
              />
              <input
                value={newForm.pdfUrl}
                onChange={(e) => setNewForm({ ...newForm, pdfUrl: e.target.value })}
                placeholder="Link PDF (Google Drive)"
                className="w-full rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:border-red-400"
              />
              <button
                onClick={addMaterial}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
              >
                Tambahkan
              </button>
            </div>
          )}

          <div className="space-y-3">
            {materials.map((m) =>
              editingId === m.id ? (
                <div
                  key={m.id}
                  className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50/40 dark:bg-red-500/5 p-4 space-y-3"
                >
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:border-red-400"
                  />
                  <input
                    value={editForm.categories}
                    onChange={(e) => setEditForm({ ...editForm, categories: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:border-red-400"
                  />
                  <input
                    value={editForm.pdfUrl}
                    onChange={(e) => setEditForm({ ...editForm, pdfUrl: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:border-red-400"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={saveEdit}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
                    >
                      <Save className="h-3.5 w-3.5" strokeWidth={2} />
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-600 dark:text-white/60"
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={2} />
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-zinc-900 dark:text-white">{m.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {m.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-zinc-100 dark:bg-white/10 px-2 py-0.5 text-xs text-zinc-600 dark:text-white/60"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      onClick={() => startEdit(m)}
                      aria-label="Edit"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-white/15 text-zinc-600 dark:text-white/60 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => deleteMaterial(m.id)}
                      aria-label="Hapus"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-white/15 text-zinc-600 dark:text-white/60 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <button
            onClick={handleSaveToGithub}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            ) : (
              <Save className="h-4 w-4" strokeWidth={2} />
            )}
            Simpan ke GitHub
          </button>
        </>
      )}
    </div>
  );
}
