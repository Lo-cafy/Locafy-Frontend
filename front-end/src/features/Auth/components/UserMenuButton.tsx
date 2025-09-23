import { LogOut, User as UserIcon, Settings } from "lucide-react";
import { useAuthStore } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover";
import type { User, GoogleUser } from '@/store/authStore';

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

 
  const getDisplayName = (user: User | GoogleUser) => {
    if ('name' in user) {
      return user.name;  
    }
    return `${user.firstName} ${user.lastName}`;  
  };

  
  const getDisplayPicture = (user: User | GoogleUser) => {
    if ('picture' in user) {
      return user.picture;  
    }
    return user.profilePhoto;  
  };

  const displayName = getDisplayName(user);
  const displayPicture = getDisplayPicture(user);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          {displayPicture ? (
            <img
              src={displayPicture}
              alt={displayName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">
            Hi, {displayName}
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-2 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col space-y-1">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <button
            onClick={() => navigate("/user")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <UserIcon className="h-4 w-4" />
            Profile
          </button>

          <button
            onClick={() => navigate("/user")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>

          <div className="border-t border-gray-100 my-1"></div>

          <button
            onClick={logout}
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