import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { categories } from "@/data/mockData";
import { exportCSV, exportJSON } from "@/lib/export";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TableSkeleton } from "@/components/Skeletons";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { Search, Plus, MoreHorizontal, ArrowUpDown, Trash2, Eye, FileText, Download, Filter, ChevronDown } from "lucide-react";

const TransactionsPage = () => {
  const { role, filters, setFilters, filteredTransactions, groupedTransactions, isLoading, deleteTransaction } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const hasAdvancedFilters = filters.dateFrom || filters.dateTo || filters.amountMin || filters.amountMax || filters.groupBy !== "none";

  const clearFilters = () => setFilters((f) => ({
    ...f, search: "", type: "all", category: "all", dateFrom: "", dateTo: "", amountMin: "", amountMax: "", groupBy: "none",
  }));

  const renderRows = (txns: typeof filteredTransactions, groupLabel?: string) => (
    <React.Fragment key={groupLabel}>
      {groupLabel && filters.groupBy !== "none" && (
        <tr className="bg-muted/50 border-b border-border">
          <td colSpan={6} className="px-4 py-2.5">
            <span className="text-sm font-semibold text-foreground">{groupLabel}</span>
            <span className="ml-2 text-xs text-muted-foreground">({txns.length})</span>
          </td>
        </tr>
      )}
      {txns.map((t) => (
        <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
          <td className="px-4 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
            {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </td>
          <td className="px-4 py-3.5 text-sm font-medium text-foreground">{t.description}</td>
          <td className="px-4 py-3.5">
            <Badge variant="secondary" className="font-normal text-xs">{t.category}</Badge>
          </td>
          <td className="px-4 py-3.5">
            <Badge
              className={`text-xs font-medium ${
                t.type === "income"
                  ? "bg-success/10 text-success hover:bg-success/20 border-0"
                  : "bg-destructive/10 text-destructive hover:bg-destructive/20 border-0"
              }`}
            >
              {t.type === "income" ? "Income" : "Expense"}
            </Badge>
          </td>
          <td className={`px-4 py-3.5 text-sm font-semibold text-right whitespace-nowrap ${
  t.type === "income" ? "text-success" : "text-destructive"
}`}>
  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
</td>
          <td className="px-4 py-3.5">
            {role === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Eye className="h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-2 text-destructive focus:text-destructive"
                    onClick={() => deleteTransaction(t.id)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </td>
        </tr>
      ))}
    </React.Fragment>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Transactions</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-3.5 w-3.5" /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => exportCSV(filteredTransactions)}>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportJSON(filteredTransactions)}>
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {role === "admin" && (
              <Button size="sm" onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-3.5 w-3.5" /> Add Transaction
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card className="card-shadow p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="pl-9 h-9"
              />
            </div>
            <Select value={filters.type} onValueChange={(v) => setFilters((f) => ({ ...f, type: v as any }))}>
              <SelectTrigger className="w-full sm:w-[140px] h-9"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.category} onValueChange={(v) => setFilters((f) => ({ ...f, category: v as any }))}>
              <SelectTrigger className="w-full sm:w-[160px] h-9"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-9"
              onClick={() => setFilters((f) => ({ ...f, sortDir: f.sortDir === "desc" ? "asc" : "desc" }))}
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {filters.sortDir === "desc" ? "Newest" : "Oldest"}
            </Button>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground h-7 px-2">
                  <Filter className="h-3 w-3" />
                  Advanced Filters
                  <ChevronDown className={`h-3 w-3 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              {hasAdvancedFilters && (
                <Button variant="ghost" size="sm" className="text-xs text-destructive h-7 px-2" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
            <CollapsibleContent className="pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Date From</Label>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Date To</Label>
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Min Amount ($)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.amountMin}
                    onChange={(e) => setFilters((f) => ({ ...f, amountMin: e.target.value }))}
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Max Amount ($)</Label>
                  <Input
                    type="number"
                    placeholder="Any"
                    value={filters.amountMax}
                    onChange={(e) => setFilters((f) => ({ ...f, amountMax: e.target.value }))}
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Group By</Label>
                  <Select value={filters.groupBy} onValueChange={(v) => setFilters((f) => ({ ...f, groupBy: v as any }))}>
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Grouping</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Table */}
        <Card className="card-shadow overflow-hidden">
          {isLoading ? (
            <div className="p-4"><TableSkeleton /></div>
          ) : filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
                <FileText className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">No transactions found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                {filters.search || filters.type !== "all" || filters.category !== "all" || hasAdvancedFilters
                  ? "Try adjusting your filters to find what you're looking for."
                  : "Start by adding your first transaction to track your finances."}
              </p>
              {role === "admin" && (
                <Button size="sm" className="mt-4 gap-2" onClick={() => setDialogOpen(true)}>
                  <Plus className="h-3.5 w-3.5" /> Add Transaction
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedTransactions).map(([group, txns]) =>
                    renderRows(txns, group)
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
      <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </DashboardLayout>
  );
};

export default TransactionsPage;
