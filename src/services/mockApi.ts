import { Transaction, transactions as defaultTransactions } from "@/data/mockData";

const STORAGE_KEY = "findash-transactions";
const PROFILE_KEY = "findash-profile";

function delay(ms = 600): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await delay();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultTransactions;
    }
  }
  return defaultTransactions;
}

export async function addTransactionApi(t: Omit<Transaction, "id">): Promise<Transaction> {
  await delay(300);
  const newTxn: Transaction = { ...t, id: crypto.randomUUID() };
  const current = await fetchTransactions();
  const updated = [newTxn, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newTxn;
}

export async function deleteTransactionApi(id: string): Promise<void> {
  await delay(200);
  const current = await fetchTransactions();
  const updated = current.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function persistTransactions(txns: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txns));
}

export function loadProfile(): { name: string; email: string } {
  const stored = localStorage.getItem(PROFILE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fallback */ }
  }
  return { name: "Ananya Khare", email: "ananyakhare555@gmail.com" };
}

export function persistProfile(profile: { name: string; email: string }) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
