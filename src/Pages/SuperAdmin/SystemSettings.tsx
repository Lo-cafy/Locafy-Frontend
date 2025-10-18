import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Settings</h1>

      <Card className="p-4 bg-white/10 border-white/10 space-y-3">
        <div className="font-semibold">Branding</div>
        <Input placeholder="Site Name" className="max-w-sm" />
        <div className="flex gap-2">
          <Button variant="outline">Upload Logo</Button>
          <Button variant="outline">Upload Favicon</Button>
        </div>
      </Card>

      <Card className="p-4 bg-white/10 border-white/10 space-y-3">
        <div className="font-semibold">Email</div>
        <Input placeholder="SMTP Host" className="max-w-sm" />
        <Input placeholder="SMTP User" className="max-w-sm" />
        <Input placeholder="SMTP Password" type="password" className="max-w-sm" />
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Save</Button>
      </Card>
    </div>
  );
}
