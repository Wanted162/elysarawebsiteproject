export type StoredAccount = {
  email: string;
  name: string;
  passwordHash?: string;
  password?: string;
};

export const ACCOUNTS_KEY = "elysara-accounts";
export const CURRENT_USER_KEY = "elysara-current-user";
export const AUTH_UPDATED_EVENT = "elysara-auth-updated";

export function getAccounts(): StoredAccount[] {
  try {
    const value = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getCurrentAccount() {
  const currentEmail = localStorage.getItem(CURRENT_USER_KEY);
  return getAccounts().find((account) => account.email === currentEmail) ?? null;
}

export function setCurrentAccount(email: string) {
  localStorage.setItem(CURRENT_USER_KEY, email);
  localStorage.setItem("elysara-member", "true");
  window.dispatchEvent(new Event(AUTH_UPDATED_EVENT));
}

export function clearCurrentAccount() {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem("elysara-member");
  window.dispatchEvent(new Event(AUTH_UPDATED_EVENT));
}

export async function hashPassword(password: string) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
