import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getSpendingByCategory, getSummary } from "@/data/mockData";

export function InsightsPanel() {
  const { transactions } = useApp();
  const spending = getSpendingByCategory(transactions);
  const summary = getSummary(transactions);
  const topCategory = spending[0];
  const savingsRate = summary.income > 0 ? ((summary.income - summary.expenses) / summary.income * 100).toFixed(1) : "0";

  const insights = [
    {
      icon: AlertCircle,
      iconColor: "text-warning",
      bgColor: "bg-warning/10",
      title: "Highest Spending",
      description: topCategory ? `${topCategory.name} — ₹${topCategory.value.toLocaleString("en-IN")}` : "No expenses yet",
    },
    {
      icon: TrendingUp,
      iconColor: "text-success",
      bgColor: "bg-success/10",
      title: "Savings Rate",
      description: `${savingsRate}% of income saved this period`,
    },
    {
      icon: TrendingDown,
      iconColor: "text-destructive",
      bgColor: "bg-destructive/10",
      title: "Monthly Comparison",
      description: "Expenses decreased 8.2% from last month",
    },
    {
      icon: Lightbulb,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "Tip",
      description: "Consider reducing Entertainment spend by 15% to hit your goal",
    },
  ];

  return (
    <Card className="card-shadow p-6">
      <h3 className="text-sm font-semibold text-foreground mb-1">Insights</h3>
      <p className="text-xs text-muted-foreground mb-4">Key observations from your data</p>
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.title} className="flex items-start gap-3 rounded-lg border border-border p-3">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${insight.bgColor}`}>
              <insight.icon className={`h-4 w-4 ${insight.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{insight.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
