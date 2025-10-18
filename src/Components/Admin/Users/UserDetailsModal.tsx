import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import type { User } from "@/types/auth.types";
import { Mail, Shield, CalendarDays, CheckCircle2, XCircle } from "lucide-react";

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export default function UserDetailsModal({ open, onOpenChange, user }: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">User Details</DialogTitle>
          <DialogDescription className="text-gray-600">Overview of the selected user.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{user.name}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Role:</span>
              <span>{user.role}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              {user.status === "Active" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <span className="font-medium">Status:</span>
              <Badge className={user.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-800"}>{user.status}</Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Joined:</span>
              <span>{user.joinDate}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
