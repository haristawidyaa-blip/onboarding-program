const SESSION_KEY = "cisdi-cms-session";

export const CMS_USERNAME = "admin";
export const CMS_PASSWORD = "admin";

export function getCmsAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "1";
}

export function setCmsAuthed() {
  localStorage.setItem(SESSION_KEY, "1");
}

export function clearCmsAuthed() {
  localStorage.removeItem(SESSION_KEY);
}
