import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sun, Moon, Monitor } from "lucide-react";

const SettingsPage = () => {
  const { userProfile, setUserProfile } = useApp();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);

  const handleSave = () => {
    setUserProfile({ name: name.trim() || "User", email: email.trim() || "user@example.com" });
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        <Card className="card-shadow p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Theme</p>
                <p className="text-xs text-muted-foreground">Choose your preferred appearance</p>
              </div>
              <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <span className="flex items-center gap-2"><Sun className="h-3.5 w-3.5" /> Light</span>
                  </SelectItem>
                  <SelectItem value="dark">
                    <span className="flex items-center gap-2"><Moon className="h-3.5 w-3.5" /> Dark</span>
                  </SelectItem>
                  <SelectItem value="system">
                    <span className="flex items-center gap-2"><Monitor className="h-3.5 w-3.5" /> System</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Transaction Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified for each transaction</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
