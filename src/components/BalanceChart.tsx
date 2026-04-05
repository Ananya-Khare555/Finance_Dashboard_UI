import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { balanceTrendData } from "@/data/mockData";

export function BalanceChart() {
  return (
    <Card className="card-shadow p-6">
      <h3 className="text-sm font-semibold text-foreground mb-1">Balance Trend</h3>
      <p className="text-xs text-muted-foreground mb-6">Last 7 months overview</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={balanceTrendData}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(230, 80%, 56%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(230, 80%, 56%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 91%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px hsl(0 0% 0% / 0.08)",
              fontSize: "13px",
            }}
            formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Balance"]}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="hsl(230, 80%, 56%)"
            strokeWidth={2.5}
            fill="url(#balanceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
