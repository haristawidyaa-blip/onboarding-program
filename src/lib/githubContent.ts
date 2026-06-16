import { GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH, LEARNING_MATERIALS_PATH } from "./cmsConfig";
import { LearningMaterial } from "./types";

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

const CONTENTS_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${LEARNING_MATERIALS_PATH}`;

export class GithubContentError extends Error {}

export async function fetchLearningMaterials(
  token: string
): Promise<{ data: LearningMaterial[]; sha: string }> {
  const res = await fetch(`${CONTENTS_URL}?ref=${GITHUB_BRANCH}`, {
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
  const data = JSON.parse(base64ToUtf8(json.content)) as LearningMaterial[];
  return { data, sha: json.sha };
}

export async function saveLearningMaterials(
  token: string,
  materials: LearningMaterial[],
  sha: string,
  message: string
): Promise<{ sha: string }> {
  const content = utf8ToBase64(JSON.stringify(materials, null, 2) + "\n");

  const res = await fetch(CONTENTS_URL, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content,
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
