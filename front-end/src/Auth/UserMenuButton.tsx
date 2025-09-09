import { LogOut } from "lucide-react";
import { Button } from "@/ui/button";
import { useAuthStore } from "@/store/authStore";

export function UserMenu() {
  const { user, logout} = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      {user.picture ? (
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-8 rounded-full border"
        />
      ) : (
        <div className="w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-full">
          {user.name?.[0] ?? "U"}
        </div>
      )}

      {/* Name */}
      <span className="text-sm font-medium text-gray-700">
        Hi, {user.name.split(" ")[0]}
      </span>

      {/* Logout */}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 text-red-600 border-red-500"
        onClick={logout}
      >
        <LogOut className="h-4 w-4" /> Logout
      </Button>
    </div>
  );
}
