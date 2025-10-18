import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Bell, CheckCircle2, AlertTriangle, MessageSquare } from "lucide-react";

interface NotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const items = useMemo(
    () => [
      { id: "n1", icon: CheckCircle2, title: "Service approved", desc: "Your new service 'Premium Cleaning' is approved.", time: "2m ago", tone: "success" as const },
      { id: "n2", icon: MessageSquare, title: "New message", desc: "Alice sent you a message regarding booking #1234.", time: "15m ago", tone: "info" as const },
      { id: "n3", icon: AlertTriangle, title: "Payment review", desc: "Payout for booking #1227 is under review.", time: "1h ago", tone: "warn" as const },
    ],
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900"><Bell className="w-5 h-5 text-emerald-600"/> Notifications</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {items.map(({ id, icon: Icon, title, desc, time, tone }) => (
            <div key={id} className="p-3 rounded-xl border bg-white flex items-start gap-3">
              <Badge className={`${tone === "success" ? "bg-emerald-100 text-emerald-700" : tone === "warn" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"} flex items-center gap-1`}>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tone === "success" ? "Success" : tone === "warn" ? "Alert" : "Info"}</span>
              </Badge>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{title}</div>
                <div className="text-sm text-gray-600">{desc}</div>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap">{time}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Mark all as read</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
