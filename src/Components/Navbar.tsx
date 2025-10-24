import { useEffect, useState, useRef } from "react";
import { Bell, MapPin, Search } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Badge } from "@/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { SignUpButton } from "@/Auth/SignupButton";
import { UserMenu } from "@/Auth/UserMenuButton";
import { SearchDropdown } from "./searchDropDown";

export function Navbar() {
  const { isLoggedIn, hydrateFromStorage } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-2 sm:px-4 lg:px-6">

          {/* Left - Logo (flush left corner) */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            {/* Text visible only on md+ */}
            <div className="hidden md:flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Locafy
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                friendly • trustable service
              </span>
            </div>
          </div>

          {/* Middle - Search (shown only to logged-in users) */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2 flex-1 justify-center px-4">
              <div ref={searchRef} className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true); // Show dropdown when typing
                  }}
                  placeholder="Search for services..."
                  className="pl-10 bg-white/20 border-white/30 backdrop-blur-sm text-gray-700 placeholder-gray-500 focus:border-emerald-300 focus:ring-emerald-200 relative z-50"
                  onFocus={() => setIsSearchFocused(true)}
                />
                {isSearchFocused && (
                  <SearchDropdown 
                    searchQuery={searchQuery} 
                    onClose={() => setIsSearchFocused(false)} 
                  />
                )}
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>New York</span>
              </div>
            </div>
          )}

          {/* Right - User / Notifications (flush right corner) */}
          <div className="flex items-center space-x-3 pr-0">
            {/* Notifications (only md+) */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-emerald-50/50"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-emerald-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </div>

            {/* Conditional Auth */}
            {isLoggedIn ? <UserMenu /> : <SignUpButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
