const AUTH_KEY = "cisdi-onboarding-auth";
export const VALID_USERNAME = "cisdi";
export const VALID_PASSWORD = "cisdi";

export function isAuthed() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthed() {
  localStorage.setItem(AUTH_KEY, "true");
}

export function clearAuthed() {
  localStorage.removeItem(AUTH_KEY);
}
