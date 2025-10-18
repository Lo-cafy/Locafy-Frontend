import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Audit Logs</h1>

      <div className="flex gap-2">
        <Input placeholder="Search logs..." className="max-w-sm" />
        <Select>
          <SelectTrigger className="w-40"><SelectValue placeholder="Severity" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {[1,2,3,4,5].map((i) => (
          <Card key={i} className="p-4 bg-white/10 border-white/10">
            <div className="text-sm text-gray-400">2025-10-17 23:24:1{i}</div>
            <div className="font-semibold">User updated role for alice@example.com to admin</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
