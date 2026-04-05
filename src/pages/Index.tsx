import { DashboardLayout } from "@/components/DashboardLayout";
import { SummaryCard } from "@/components/SummaryCard";
import { BalanceChart } from "@/components/BalanceChart";
import { SpendingDonut } from "@/components/SpendingDonut";
import { InsightsPanel } from "@/components/InsightsPanel";
import { SummaryCardSkeleton, ChartSkeleton } from "@/components/Skeletons";
import { useApp } from "@/context/AppContext";
import { getSummary } from "@/data/mockData";

const DashboardPage = () => {
  const { transactions, isLoading } = useApp();
  const summary = getSummary(transactions);

  const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(n);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Your financial overview at a glance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </>
          ) : (
            <>
              <SummaryCard title="Total Balance" value={fmt(summary.balance)} change="+12.5%" trend="up" icon="balance" />
              <SummaryCard title="Total Income" value={fmt(summary.income)} change="+8.2%" trend="up" icon="income" />
              <SummaryCard title="Total Expenses" value={fmt(summary.expenses)} change="-3.1%" trend="down" icon="expense" />
            </>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <ChartSkeleton className="lg:col-span-2" />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <div className="lg:col-span-2">
                <BalanceChart />
              </div>
              <SpendingDonut />
            </>
          )}
        </div>

        {/* Insights */}
        {isLoading ? <ChartSkeleton /> : <InsightsPanel />}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
