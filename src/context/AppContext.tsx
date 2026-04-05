import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { Transaction, TransactionType, Category, transactions as initialTransactions } from "@/data/mockData";
import { persistTransactions, loadProfile, persistProfile } from "@/services/mockApi";

export type Role = "admin" | "viewer";

export interface UserProfile {
  name: string;
  email: string;
}

interface Filters {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortBy: "date" | "amount";
  sortDir: "asc" | "desc";
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
  groupBy: "none" | "category" | "type" | "month";
}

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredTransactions: Transaction[];
  groupedTransactions: Record<string, Transaction[]>;
  isLoading: boolean;
  userProfile: UserProfile;
  setUserProfile: (p: UserProfile) => void;
}

const AppContext = createContext<AppState | null>(null);

function loadTransactions(): Transaction[] {
  const stored = localStorage.getItem("findash-transactions");
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fallback */ }
  }
  return initialTransactions;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("admin");
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfileState] = useState<UserProfile>(loadProfile);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortDir: "desc",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
    groupBy: "none",
  });

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Persist transactions to localStorage
  useEffect(() => {
    persistTransactions(transactions);
  }, [transactions]);

  const setUserProfile = useCallback((p: UserProfile) => {
    setUserProfileState(p);
    persistProfile(p);
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...t, id: crypto.randomUUID() },
      ...prev,
    ]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }
    if (filters.dateFrom) {
      result = result.filter((t) => t.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter((t) => t.date <= filters.dateTo);
    }
    if (filters.amountMin) {
      const min = parseFloat(filters.amountMin);
      if (!isNaN(min)) result = result.filter((t) => t.amount >= min);
    }
    if (filters.amountMax) {
      const max = parseFloat(filters.amountMax);
      if (!isNaN(max)) result = result.filter((t) => t.amount <= max);
    }
    result.sort((a, b) => {
      const dir = filters.sortDir === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return dir * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return dir * (a.amount - b.amount);
    });
    return result;
  }, [transactions, filters]);

  const groupedTransactions = useMemo(() => {
    if (filters.groupBy === "none") return { All: filteredTransactions };
    return filteredTransactions.reduce<Record<string, Transaction[]>>((acc, t) => {
      let key: string;
      if (filters.groupBy === "category") key = t.category;
      else if (filters.groupBy === "type") key = t.type === "income" ? "Income" : "Expense";
      else key = t.date.slice(0, 7); // month: YYYY-MM
      (acc[key] = acc[key] || []).push(t);
      return acc;
    }, {});
  }, [filteredTransactions, filters.groupBy]);

  return (
    <AppContext.Provider
      value={{ role, setRole, transactions, addTransaction, deleteTransaction, filters, setFilters, filteredTransactions, groupedTransactions, isLoading, userProfile, setUserProfile }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
