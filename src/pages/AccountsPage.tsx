import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { CreditCard, Landmark, PiggyBank } from "lucide-react";

const accounts = [
  { name: "Main Checking", type: "Checking", balance: 18420, icon: CreditCard, last4: "4521" },
  { name: "Savings Account", type: "Savings", balance: 42800, icon: PiggyBank, last4: "8832" },
  { name: "Investment", type: "Brokerage", balance: 15600, icon: Landmark, last4: "3310" },
];

const AccountsPage = () => (
  <DashboardLayout>
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Accounts</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your connected accounts</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((a) => (
          <Card key={a.name} className="card-shadow hover:card-shadow-hover transition-shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <a.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">•••• {a.last4}</p>
              </div>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              ₹{a.balance.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{a.type} Account</p>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default AccountsPage;

