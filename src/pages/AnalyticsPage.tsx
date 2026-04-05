import { DashboardLayout } from "@/components/DashboardLayout";
import { BalanceChart } from "@/components/BalanceChart";
import { SpendingDonut } from "@/components/SpendingDonut";
import { InsightsPanel } from "@/components/InsightsPanel";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { getSummary, getSpendingByCategory } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AnalyticsPage = () => {
  const { transactions } = useApp();
  const spending = getSpendingByCategory(transactions);
  const summary = getSummary(transactions);

  const monthlyData = [
    { month: "Jan", income: 8500, expenses: 1850 },
    { month: "Feb", income: 8950, expenses: 2100 },
    { month: "Mar", income: 12200, expenses: 1690 },
    { month: "Apr", income: 8500, expenses: 1245 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Detailed analysis of your financial data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <BalanceChart />
          </div>
          <SpendingDonut />
        </div>

        <Card className="card-shadow p-6">
          <h3 className="text-sm font-semibold text-foreground mb-1">Income vs Expenses</h3>
          <p className="text-xs text-muted-foreground mb-6">Monthly comparison</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px hsl(0 0% 0% / 0.08)",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
              />
              <Bar dataKey="income" fill="hsl(152, 60%, 40%)" radius={[6, 6, 0, 0]} barSize={28} name="Income" />
              <Bar dataKey="expenses" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} barSize={28} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <InsightsPanel />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
