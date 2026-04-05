export type TransactionType = "income" | "expense";
export type Category =
  | "Salary"
  | "Freelance"
  | "Shopping"
  | "Food & Dining"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Investment"
  | "Transfer";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export const categories: Category[] = [
  "Salary",
  "Freelance",
  "Shopping",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Investment",
  "Transfer",
];

export const transactions: Transaction[] = [
  { id: "1", date: "2026-04-01", description: "Monthly Salary", amount: 8500, type: "income", category: "Salary" },
  { id: "2", date: "2026-04-01", description: "Grocery Store", amount: 124.50, type: "expense", category: "Food & Dining" },
  { id: "3", date: "2026-03-30", description: "Electric Bill", amount: 89.00, type: "expense", category: "Utilities" },
  { id: "4", date: "2026-03-28", description: "Freelance Project", amount: 2200, type: "income", category: "Freelance" },
  { id: "5", date: "2026-03-27", description: "Online Shopping", amount: 349.99, type: "expense", category: "Shopping" },
  { id: "6", date: "2026-03-25", description: "Movie Tickets", amount: 32.00, type: "expense", category: "Entertainment" },
  { id: "7", date: "2026-03-24", description: "Gas Station", amount: 55.00, type: "expense", category: "Transportation" },
  { id: "8", date: "2026-03-22", description: "Doctor Visit", amount: 150.00, type: "expense", category: "Healthcare" },
  { id: "9", date: "2026-03-20", description: "Stock Dividend", amount: 320.00, type: "income", category: "Investment" },
  { id: "10", date: "2026-03-18", description: "Restaurant Dinner", amount: 78.50, type: "expense", category: "Food & Dining" },
  { id: "11", date: "2026-03-15", description: "Monthly Salary", amount: 8500, type: "income", category: "Salary" },
  { id: "12", date: "2026-03-14", description: "Internet Bill", amount: 65.00, type: "expense", category: "Utilities" },
  { id: "13", date: "2026-03-12", description: "Uber Ride", amount: 22.50, type: "expense", category: "Transportation" },
  { id: "14", date: "2026-03-10", description: "Concert Tickets", amount: 120.00, type: "expense", category: "Entertainment" },
  { id: "15", date: "2026-03-08", description: "Transfer from Savings", amount: 1000.00, type: "income", category: "Transfer" },
  { id: "16", date: "2026-03-05", description: "Clothing Store", amount: 215.00, type: "expense", category: "Shopping" },
  { id: "17", date: "2026-03-03", description: "Freelance Design Work", amount: 1500, type: "income", category: "Freelance" },
  { id: "18", date: "2026-03-01", description: "Monthly Salary", amount: 8500, type: "income", category: "Salary" },
  { id: "19", date: "2026-02-28", description: "Pharmacy", amount: 45.00, type: "expense", category: "Healthcare" },
  { id: "20", date: "2026-02-25", description: "Subscription Services", amount: 42.99, type: "expense", category: "Entertainment" },
  { id: "21", date: "2026-02-22", description: "Groceries", amount: 98.75, type: "expense", category: "Food & Dining" },
  { id: "22", date: "2026-02-20", description: "Investment Return", amount: 450.00, type: "income", category: "Investment" },
  { id: "23", date: "2026-02-18", description: "Water Bill", amount: 38.00, type: "expense", category: "Utilities" },
  { id: "24", date: "2026-02-15", description: "Monthly Salary", amount: 8500, type: "income", category: "Salary" },
  { id: "25", date: "2026-02-10", description: "Electronics Store", amount: 599.99, type: "expense", category: "Shopping" },
];

export const balanceTrendData = [
  { month: "Oct", balance: 18200 },
  { month: "Nov", balance: 21400 },
  { month: "Dec", balance: 19800 },
  { month: "Jan", balance: 23100 },
  { month: "Feb", balance: 25600 },
  { month: "Mar", balance: 28900 },
  { month: "Apr", balance: 32450 },
];

export function getSpendingByCategory(txns: Transaction[]) {
  const map: Record<string, number> = {};
  txns
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
}

export function getSummary(txns: Transaction[]) {
  const income = txns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = txns.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
}
