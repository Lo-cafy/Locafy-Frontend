import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import InviteUserModal from "@/Components/SuperAdmin/InviteUserModal";

export default function UsersRoles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users & Roles</h1>
        <InviteUserModal />
      </div>

      <div className="flex gap-2">
        <Input placeholder="Search users..." className="max-w-sm" />
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="provider">Provider</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="superadmin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Alice", "Bob", "Carol", "Dave", "Eve", "Frank"].map((u) => (
          <Card key={u} className="p-4 bg-white/10 border-white/10">
            <div className="font-semibold">{u}</div>
            <div className="text-sm text-gray-400">alice@example.com</div>
            <div className="mt-3 flex gap-2">
              <Select>
                <SelectTrigger className="w-44"><SelectValue placeholder="Change role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Update</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
