"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
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
  BookOpen,
  FileText,
  ChevronDown,
  Link as LinkIcon,
} from "lucide-react";
import { LearningMaterial } from "@/lib/types";
import { SopItem } from "@/lib/sopData";
import { getToken, setToken as storeToken, clearToken } from "@/lib/cmsToken";
import { getCmsAuthed, clearCmsAuthed } from "@/lib/cmsAuth";
import {
  fetchLearningMaterials,
  saveLearningMaterials,
  fetchSop,
  saveSop,
  GithubContentError,
} from "@/lib/githubContent";

// ── helpers ──────────────────────────────────────────────────────────────────

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function uniqueId(base: string, existing: { id: string }[]) {
  let id = base; let n = 2;
  while (existing.some((m) => m.id === id)) { id = `${base}-${n}`; n++; }
  return id;
}

const SOP_TYPES = ["Pedoman Kerja", "SOP"] as const;
const SOP_DIVISIONS = [
  "Community & Public Engagement",
  "Corporate Secretary, Human Capital and General Affairs",
  "Digital Communication",
  "Finance & Administration",
  "IT Development",
  "Knowledge & Learning",
  "Research & Development",
] as const;

// ── learning materials tab ───────────────────────────────────────────────────

type MatForm = { title: string; categories: string; pdfUrl: string };
const emptyMat: MatForm = { title: "", categories: "", pdfUrl: "" };

function LearningTab() {
  const [materials, setMaterials] = useState<LearningMaterial[] | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<MatForm>(emptyMat);
  const [newForm, setNewForm] = useState<MatForm>(emptyMat);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    const token = getToken(); if (!token) return;
    setLoading(true); setError(null);
    try {
      const { data, sha } = await fetchLearningMaterials(token);
      setMaterials(data); setSha(sha);
    } catch (e) { setError(e instanceof GithubContentError ? e.message : "Kesalahan tak terduga."); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function startEdit(m: LearningMaterial) {
    setEditingId(m.id);
    setEditForm({ title: m.title, categories: m.categories.join(", "), pdfUrl: m.pdfUrl });
  }
  function saveEdit() {
    if (!materials || !editingId) return;
    setMaterials(materials.map((m) => m.id === editingId ? {
      ...m, title: editForm.title.trim(),
      categories: editForm.categories.split(",").map((c) => c.trim()).filter(Boolean),
      pdfUrl: editForm.pdfUrl.trim(),
    } : m));
    setEditingId(null);
  }
  function del(id: string) {
    if (!materials || !confirm("Hapus materi ini?")) return;
    setMaterials(materials.filter((m) => m.id !== id));
  }
  function add() {
    if (!materials || !newForm.title.trim() || !newForm.pdfUrl.trim()) return;
    const id = uniqueId(slugify(newForm.title), materials);
    setMaterials([...materials, {
      id, title: newForm.title.trim(),
      categories: newForm.categories.split(",").map((c) => c.trim()).filter(Boolean),
      pdfUrl: newForm.pdfUrl.trim(),
    }]);
    setNewForm(emptyMat); setShowAdd(false);
  }
  async function saveToGithub() {
    const token = getToken();
    if (!token || !materials || !sha) return;
    setSaving(true); setError(null); setSuccessMsg(null);
    try {
      const { sha: newSha } = await saveLearningMaterials(token, materials, sha, "Update learning materials via Admin CMS");
      setSha(newSha);
      setSuccessMsg("Tersimpan ke GitHub! Situs akan diperbarui setelah deploy selesai (~1 menit).");
    } catch (e) { setError(e instanceof GithubContentError ? e.message : "Kesalahan tak terduga."); }
    finally { setSaving(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <button onClick={load} disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:text-white/70 hover:border-red-300 dark:hover:border-red-500/50 transition-colors">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} strokeWidth={2} /> Muat ulang
        </button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {loading && !materials && <Spinner label="Memuat dari GitHub..." />}

      {materials && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-500 dark:text-white/50">{materials.length} materi</p>
            <button onClick={() => setShowAdd((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Tambah Materi
            </button>
          </div>

          {showAdd && (
            <div className="mb-5 rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-zinc-50 dark:bg-white/5 p-4 space-y-3">
              <input value={newForm.title} onChange={(e) => setNewForm({ ...newForm, title: e.target.value })} placeholder="Judul materi" className={inputCls} />
              <input value={newForm.categories} onChange={(e) => setNewForm({ ...newForm, categories: e.target.value })} placeholder="Kategori (pisahkan koma)" className={inputCls} />
              <input value={newForm.pdfUrl} onChange={(e) => setNewForm({ ...newForm, pdfUrl: e.target.value })} placeholder="Link PDF (Google Drive)" className={inputCls} />
              <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors">Tambahkan</button>
            </div>
          )}

          <div className="space-y-3">
            {materials.map((m) => editingId === m.id ? (
              <div key={m.id} className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50/40 dark:bg-red-500/5 p-4 space-y-3">
                <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className={inputCls} />
                <input value={editForm.categories} onChange={(e) => setEditForm({ ...editForm, categories: e.target.value })} className={inputCls} />
                <input value={editForm.pdfUrl} onChange={(e) => setEditForm({ ...editForm, pdfUrl: e.target.value })} placeholder="Link PDF" className={inputCls} />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors">
                    <Save className="h-3.5 w-3.5" strokeWidth={2} /> Simpan
                  </button>
                  <button onClick={() => setEditingId(null)} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-600 dark:text-white/60">
                    <X className="h-3.5 w-3.5" strokeWidth={2} /> Batal
                  </button>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-4">
                <div className="min-w-0">
                  <p className="font-medium text-zinc-900 dark:text-white">{m.title}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.categories.map((c) => <span key={c} className="rounded-full bg-zinc-100 dark:bg-white/10 px-2 py-0.5 text-xs text-zinc-600 dark:text-white/60">{c}</span>)}
                  </div>
                  {m.pdfUrl && <a href={m.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:underline"><LinkIcon className="h-3 w-3" strokeWidth={2} />Buka PDF</a>}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <IconBtn onClick={() => startEdit(m)} label="Edit"><Pencil className="h-3.5 w-3.5" strokeWidth={2} /></IconBtn>
                  <IconBtn onClick={() => del(m.id)} label="Hapus"><Trash2 className="h-3.5 w-3.5" strokeWidth={2} /></IconBtn>
                </div>
              </div>
            ))}
          </div>

          <button onClick={saveToGithub} disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50 transition-colors">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} /> : <Save className="h-4 w-4" strokeWidth={2} />}
            Simpan ke GitHub
          </button>
        </>
      )}
    </div>
  );
}

// ── SOP tab ──────────────────────────────────────────────────────────────────

type SopForm = { name: string; type: "SOP" | "Pedoman Kerja"; division: string; pdfUrl: string };
const emptySop: SopForm = { name: "", type: "Pedoman Kerja", division: SOP_DIVISIONS[0], pdfUrl: "" };

function SopTab() {
  const [items, setItems] = useState<SopItem[] | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<SopForm>(emptySop);
  const [newForm, setNewForm] = useState<SopForm>(emptySop);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    const token = getToken(); if (!token) return;
    setLoading(true); setError(null);
    try {
      const { data, sha } = await fetchSop(token);
      setItems(data); setSha(sha);
    } catch (e) { setError(e instanceof GithubContentError ? e.message : "Kesalahan tak terduga."); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function startEdit(s: SopItem) {
    setEditingId(s.id);
    setEditForm({ name: s.name, type: s.type, division: s.division, pdfUrl: s.pdfUrl });
  }
  function saveEdit() {
    if (!items || !editingId) return;
    setItems(items.map((s) => s.id === editingId ? {
      ...s, name: editForm.name.trim(), type: editForm.type,
      division: editForm.division, pdfUrl: editForm.pdfUrl.trim(),
    } : s));
    setEditingId(null);
  }
  function del(id: string) {
    if (!items || !confirm("Hapus dokumen ini?")) return;
    setItems(items.filter((s) => s.id !== id));
  }
  function add() {
    if (!items || !newForm.name.trim()) return;
    const id = uniqueId(slugify(newForm.name), items);
    setItems([...items, { id, name: newForm.name.trim(), type: newForm.type, division: newForm.division, status: "Authorized", pdfUrl: newForm.pdfUrl.trim() }]);
    setNewForm(emptySop); setShowAdd(false);
  }
  async function saveToGithub() {
    const token = getToken();
    if (!token || !items || !sha) return;
    setSaving(true); setError(null); setSuccessMsg(null);
    try {
      const { sha: newSha } = await saveSop(token, items, sha, "Update SOP via Admin CMS");
      setSha(newSha);
      setSuccessMsg("Tersimpan ke GitHub! Situs akan diperbarui setelah deploy selesai (~1 menit).");
    } catch (e) { setError(e instanceof GithubContentError ? e.message : "Kesalahan tak terduga."); }
    finally { setSaving(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <button onClick={load} disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:text-white/70 hover:border-red-300 dark:hover:border-red-500/50 transition-colors">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} strokeWidth={2} /> Muat ulang
        </button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {loading && !items && <Spinner label="Memuat dari GitHub..." />}

      {items && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-500 dark:text-white/50">{items.length} dokumen</p>
            <button onClick={() => setShowAdd((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Tambah Dokumen
            </button>
          </div>

          {showAdd && (
            <div className="mb-5 rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-zinc-50 dark:bg-white/5 p-4 space-y-3">
              <input value={newForm.name} onChange={(e) => setNewForm({ ...newForm, name: e.target.value })} placeholder="Nama dokumen" className={inputCls} />
              <SopTypeSelect value={newForm.type} onChange={(v) => setNewForm({ ...newForm, type: v })} />
              <SopDivisionSelect value={newForm.division} onChange={(v) => setNewForm({ ...newForm, division: v })} />
              <input value={newForm.pdfUrl} onChange={(e) => setNewForm({ ...newForm, pdfUrl: e.target.value })} placeholder="Link PDF (Google Drive / opsional)" className={inputCls} />
              <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors">Tambahkan</button>
            </div>
          )}

          <div className="space-y-3">
            {items.map((s) => editingId === s.id ? (
              <div key={s.id} className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50/40 dark:bg-red-500/5 p-4 space-y-3">
                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className={inputCls} />
                <SopTypeSelect value={editForm.type} onChange={(v) => setEditForm({ ...editForm, type: v })} />
                <SopDivisionSelect value={editForm.division} onChange={(v) => setEditForm({ ...editForm, division: v })} />
                <input value={editForm.pdfUrl} onChange={(e) => setEditForm({ ...editForm, pdfUrl: e.target.value })} placeholder="Link PDF (opsional)" className={inputCls} />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors">
                    <Save className="h-3.5 w-3.5" strokeWidth={2} /> Simpan
                  </button>
                  <button onClick={() => setEditingId(null)} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-600 dark:text-white/60">
                    <X className="h-3.5 w-3.5" strokeWidth={2} /> Batal
                  </button>
                </div>
              </div>
            ) : (
              <div key={s.id} className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-white/[0.07] p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-zinc-900 dark:text-white leading-snug">{s.name}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${s.type === "SOP" ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300" : "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"}`}>
                      {s.type}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-white/45">{s.division}</p>
                  {s.pdfUrl ? (
                    <a href={s.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:underline">
                      <LinkIcon className="h-3 w-3" strokeWidth={2} /> Buka PDF
                    </a>
                  ) : (
                    <span className="mt-1.5 inline-block text-xs text-zinc-300 dark:text-white/20 italic">Belum ada PDF</span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <IconBtn onClick={() => startEdit(s)} label="Edit"><Pencil className="h-3.5 w-3.5" strokeWidth={2} /></IconBtn>
                  <IconBtn onClick={() => del(s.id)} label="Hapus"><Trash2 className="h-3.5 w-3.5" strokeWidth={2} /></IconBtn>
                </div>
              </div>
            ))}
          </div>

          <button onClick={saveToGithub} disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50 transition-colors">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} /> : <Save className="h-4 w-4" strokeWidth={2} />}
            Simpan ke GitHub
          </button>
        </>
      )}
    </div>
  );
}

// ── shared UI ─────────────────────────────────────────────────────────────────

const inputCls = "w-full rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none focus:border-red-400 dark:focus:border-red-500/50 transition-colors";

function Alert({ variant, children }: { variant: "error" | "success"; children: React.ReactNode }) {
  const isErr = variant === "error";
  return (
    <div className={`mb-4 flex items-start gap-2 rounded-xl px-3.5 py-2.5 text-sm ${isErr ? "bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400" : "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400"}`}>
      {isErr ? <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} /> : <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />}
      {children}
    </div>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-white/50">
      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} /> {label}
    </div>
  );
}

function IconBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-white/15 text-zinc-600 dark:text-white/60 hover:border-red-300 hover:text-red-600 transition-colors">
      {children}
    </button>
  );
}

function SopTypeSelect({ value, onChange }: { value: string; onChange: (v: "SOP" | "Pedoman Kerja") => void }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value as "SOP" | "Pedoman Kerja")}
        className={`${inputCls} appearance-none pr-8 cursor-pointer`}>
        {SOP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-white/30" strokeWidth={2} />
    </div>
  );
}

function SopDivisionSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} appearance-none pr-8 cursor-pointer`}>
        {SOP_DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-white/30" strokeWidth={2} />
    </div>
  );
}

// ── root component ────────────────────────────────────────────────────────────

type Tab = "learning" | "sop";

export function AdminClient() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("learning");

  useEffect(() => {
    if (!getCmsAuthed()) router.replace("/admin/login");
    else setHasToken(!!getToken());
  }, [router]);

  function handleDisconnect() {
    clearToken();
    clearCmsAuthed();
    router.replace("/admin/login");
  }

  if (!hasToken) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-1">
          <TabBtn active={activeTab === "learning"} onClick={() => setActiveTab("learning")} icon={<BookOpen className="h-3.5 w-3.5" strokeWidth={2} />}>
            Materi Learning Space
          </TabBtn>
          <TabBtn active={activeTab === "sop"} onClick={() => setActiveTab("sop")} icon={<FileText className="h-3.5 w-3.5" strokeWidth={2} />}>
            SOP & Pedoman Kerja
          </TabBtn>
        </div>
        <button onClick={handleDisconnect}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:text-white/70 hover:border-red-300 dark:hover:border-red-500/50 transition-colors">
          <LogOut className="h-3.5 w-3.5" strokeWidth={2} /> Hapus token
        </button>
      </div>

      {activeTab === "learning" ? <LearningTab /> : <SopTab />}
    </div>
  );
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${active ? "bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-white/50 hover:text-zinc-700 dark:hover:text-white/70"}`}>
      {icon}{children}
    </button>
  );
}
