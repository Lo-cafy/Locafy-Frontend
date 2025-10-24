import React from 'react';
import { LayoutDashboard, User, Settings, Home, Wrench, CalendarCheck, LogOut, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "@/store/authStore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'services', label: 'My Services', icon: Wrench },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const NavItem = ({ item, isActive, onClick }: { item: {id: string, label: string, icon: React.ElementType}, isActive: boolean, onClick: () => void }) => (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={onClick}
                    className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 group relative ${
                        isActive 
                        ? 'bg-emerald-500/10 text-emerald-700 font-semibold' 
                        : 'text-gray-500 hover:bg-black/5'
                    }`}
                >
                    <item.icon className="w-6 h-6 shrink-0" />
                    <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                        {item.label}
                    </span>
                    {isActive && <div className="absolute left-0 h-6 w-1 bg-emerald-600 rounded-r-full"></div>}
                </button>
            </TooltipTrigger>
            {/* Tooltip appears only when sidebar is collapsed */}
            <TooltipContent side="right" className="hidden group-hover:hidden bg-gray-800 text-white border-none rounded-md">
                <p>{item.label}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleNavigation = (pageId: string) => {
    if (pageId === 'home') {
      navigate('/');
    } else {
      setActivePage(pageId);
    }
  };

  return (
    <aside className="hidden md:flex md:sticky top-0 flex-col h-screen w-20 bg-white/60 backdrop-blur-lg text-gray-700 p-3 border-r border-white/30 transition-all duration-300 hover:w-64 group z-50 shadow-sm peer">
      <div className="flex items-center h-16 shrink-0 mb-6 px-2 justify-center group-hover:justify-start">
         <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <span className="text-white font-bold text-xl">L</span>
         </div>
        <div className="ml-3 text-xl font-bold text-gray-800 opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-200 overflow-hidden">
          Locafy
        </div>
      </div>

      <nav className="flex flex-col justify-between flex-1">
        <div className="space-y-2">
            {sidebarItems.map((item) => <NavItem key={item.id} item={item} isActive={activePage === item.id} onClick={() => handleNavigation(item.id)} />)}
        </div>

        <div className="space-y-2">
            <NavItem item={{id: 'home', label: 'Home', icon: Home}} isActive={activePage === 'home'} onClick={() => handleNavigation('home')} />
            <NavItem item={{id: 'logout', label: 'Logout', icon: LogOut}} isActive={false} onClick={logout} />
        </div>
      </nav>
      
      <div className="mt-auto pt-3 border-t border-white/40">
        <div className="flex items-center justify-center group-hover:justify-start h-16 px-1.5">
          {user?.picture ? (
            <img src={user.picture} alt="User" className="w-10 h-10 rounded-full shrink-0" />
          ) : (
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
              {user?.name?.charAt(0).toUpperCase() || <User size={20} />}
            </div>
          )}
          <div className="ml-3 text-left w-0 opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-200 overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || "User Name"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || "user@email.com"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;