import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Badge } from "@/ui/badge";
import { Mail, Shield, CheckCircle2 } from "lucide-react";

interface InviteUserModalProps {
  onInvited?: (payload: { email: string; role: "customer" | "provider" | "admin" | "superadmin"; tenant?: string }) => void;
  triggerClassName?: string;
}

export default function InviteUserModal({ onInvited, triggerClassName }: InviteUserModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"customer" | "provider" | "admin" | "superadmin">("customer");
  const [tenant, setTenant] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const tenants = ["Acme Corp", "Globex", "Umbrella", "Stark", "Wayne"];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    onInvited?.({ email, role, tenant: tenant || undefined });
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setEmail("");
      setRole("customer");
      setTenant("");
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName ?? "bg-emerald-600 text-white hover:bg-emerald-700"}>
          <Mail className="w-4 h-4 mr-2" /> Invite User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            Invite User
          </DialogTitle>
        </DialogHeader>

        {sent ? (
          <div className="p-4 flex items-center gap-3 text-emerald-700 bg-emerald-50 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <div className="font-semibold">Invitation sent</div>
              <div className="text-sm">An email invitation was sent to {email}</div>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" required />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={role}
                onValueChange={(v: "customer" | "provider" | "admin" | "superadmin") => setRole(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tenant (optional)</Label>
              <Select value={tenant} onValueChange={setTenant}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tenant" />
                </SelectTrigger>
                <SelectContent>
                  {tenants.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {tenant && <Badge variant="secondary" className="mt-1">{tenant}</Badge>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700" disabled={sending}>
                {sending ? "Sending..." : "Send Invite"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
