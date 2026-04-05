import { Transaction } from "@/data/mockData";

export function exportCSV(transactions: Transaction[], filename = "transactions.csv") {
  const header = "Date,Description,Amount,Type,Category\n";
  const rows = transactions.map(
    (t) => `${t.date},"${t.description}",${t.amount},${t.type},${t.category}`
  ).join("\n");
  downloadBlob(header + rows, filename, "text/csv");
}

export function exportJSON(transactions: Transaction[], filename = "transactions.json") {
  const json = JSON.stringify(transactions, null, 2);
  downloadBlob(json, filename, "application/json");
}

function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
