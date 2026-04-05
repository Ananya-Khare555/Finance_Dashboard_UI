import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: "balance" | "income" | "expense";
}

const iconMap = {
  balance: Wallet,
  income: ArrowUpRight,
  expense: ArrowDownRight,
};

const iconColorMap = {
  balance: "bg-primary/10 text-primary",
  income: "bg-success/10 text-success",
  expense: "bg-destructive/10 text-destructive",
};

export function SummaryCard({ title, value, change, trend, icon }: SummaryCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card className="card-shadow hover:card-shadow-hover transition-shadow p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5 text-success" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              )}
              <span className={`text-xs font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
                {change}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColorMap[icon]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
