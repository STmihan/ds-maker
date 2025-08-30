import type { Profile } from "~/types/profile";

const STORAGE_KEY = 'ds-maker-profile';

export function saveProfileToLocalStorage(profile: Profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
      console.error("Failed to save profile to localStorage", e);
  }
}

export function loadProfileFromLocalStorage(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

