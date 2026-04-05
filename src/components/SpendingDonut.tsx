import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useApp } from "@/context/AppContext";
import { getSpendingByCategory } from "@/data/mockData";

const COLORS = [
  "hsl(230, 80%, 56%)",
  "hsl(152, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(0, 72%, 51%)",
  "hsl(195, 70%, 50%)",
  "hsl(340, 65%, 55%)",
  "hsl(160, 50%, 45%)",
];

export function SpendingDonut() {
  const { transactions } = useApp();
  const data = getSpendingByCategory(transactions);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="card-shadow p-6">
      <h3 className="text-sm font-semibold text-foreground mb-1">Spending Breakdown</h3>
      <p className="text-xs text-muted-foreground mb-4">By category</p>
      <div className="flex flex-col items-center">
        <div className="relative">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">
  ₹{total.toLocaleString("en-IN")}
</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 w-full max-w-[280px]">
          {data.slice(0, 6).map((item, idx) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
              <span className="text-muted-foreground truncate">{item.name}</span>
              <span className="ml-auto font-medium text-foreground">
  ₹{item.value.toLocaleString("en-IN")}
</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
