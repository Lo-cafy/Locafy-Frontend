import { LogOut, User, Settings } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover";

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
  {user.picture ? (
    <img
      src={user.picture}
      alt={user.name}
      className="w-8 h-8 rounded-full"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
      {user.name?.charAt(0).toUpperCase()}
    </div>
  )}
  {/* Greeting text - always visible */}
  <span className="hidden md:inline text-sm font-medium text-gray-700">
    Hi, {user.name}
  </span>
</div>

      </PopoverTrigger>

      <PopoverContent className="w-56 p-2 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col space-y-1">
          {/* User Info */}
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate("/user")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <User className="h-4 w-4" />
            Profile
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate("/User")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>

          {/* Divider */}
          <div className="border-t border-gray-100 my-1"></div>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
