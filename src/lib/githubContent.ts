import {
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH,
  LEARNING_MATERIALS_PATH,
  SOP_PATH,
} from "./cmsConfig";
import { LearningMaterial } from "./types";
import { SopItem } from "./sopData";

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export class GithubContentError extends Error {}

async function fetchFile(
  token: string,
  path: string
): Promise<{ content: string; sha: string }> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) {
    if (res.status === 401) throw new GithubContentError("Token tidak valid atau sudah expired.");
    if (res.status === 404) throw new GithubContentError("File tidak ditemukan di repo.");
    throw new GithubContentError(`Gagal mengambil data (status ${res.status}).`);
  }
  const json = await res.json();
  return { content: base64ToUtf8(json.content), sha: json.sha };
}

async function saveFile(
  token: string,
  path: string,
  content: string,
  sha: string,
  message: string
): Promise<{ sha: string }> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: utf8ToBase64(content),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  if (!res.ok) {
    if (res.status === 401) throw new GithubContentError("Token tidak valid atau tidak punya akses tulis.");
    if (res.status === 409) throw new GithubContentError("Konflik: file sudah berubah di GitHub, muat ulang dulu.");
    throw new GithubContentError(`Gagal menyimpan (status ${res.status}).`);
  }
  const json = await res.json();
  return { sha: json.content.sha };
}

// Learning Materials

export async function fetchLearningMaterials(
  token: string
): Promise<{ data: LearningMaterial[]; sha: string }> {
  const { content, sha } = await fetchFile(token, LEARNING_MATERIALS_PATH);
  return { data: JSON.parse(content) as LearningMaterial[], sha };
}

export async function saveLearningMaterials(
  token: string,
  materials: LearningMaterial[],
  sha: string,
  message: string
): Promise<{ sha: string }> {
  return saveFile(
    token,
    LEARNING_MATERIALS_PATH,
    JSON.stringify(materials, null, 2) + "\n",
    sha,
    message
  );
}

// SOP

export async function fetchSop(
  token: string
): Promise<{ data: SopItem[]; sha: string }> {
  const { content, sha } = await fetchFile(token, SOP_PATH);
  return { data: JSON.parse(content) as SopItem[], sha };
}

export async function saveSop(
  token: string,
  items: SopItem[],
  sha: string,
  message: string
): Promise<{ sha: string }> {
  return saveFile(
    token,
    SOP_PATH,
    JSON.stringify(items, null, 2) + "\n",
    sha,
    message
  );
}
