import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export default function Tenants() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tenants</h1>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Add Tenant</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Search tenants..." className="max-w-sm" />
        <Button variant="outline">Filter</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Acme Corp", "Globex", "Umbrella", "Stark", "Wayne"].map((t) => (
          <Card key={t} className="p-4 bg-white/10 border-white/10">
            <div className="font-semibold">{t}</div>
            <div className="text-sm text-gray-400">Active · 42 users</div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline">Manage</Button>
              <Button size="sm" variant="outline">Suspend</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
