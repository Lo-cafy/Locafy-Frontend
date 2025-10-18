import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Switch } from "@/ui/switch";

const flags = [
  { key: "beta-dashboard", name: "Beta Dashboard", description: "Enable beta dashboard for all tenants" },
  { key: "new-booking-flow", name: "New Booking Flow", description: "Use the new booking funnel" },
  { key: "realtime-insights", name: "Realtime Insights", description: "Live metrics stream on dashboards" },
];

export default function FeatureFlags() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feature Flags</h1>
        <Button variant="outline">Sync</Button>
      </div>

      <div className="space-y-3">
        {flags.map((f) => (
          <Card key={f.key} className="p-4 bg-white/10 border-white/10 flex items-start justify-between">
            <div>
              <div className="font-semibold">{f.name}</div>
              <div className="text-sm text-gray-400">{f.description}</div>
            </div>
            <Switch />
          </Card>
        ))}
      </div>
    </div>
  );
}
