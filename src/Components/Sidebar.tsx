import React from 'react';
import { LayoutDashboard, User, Settings, Package, Home } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  className?: string;
}

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'Home', label: 'Home', icon: Home },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <div
      className="
        flex flex-col min-h-screen mt-5 rounded-t-4xl ml-5 
        w-20 bg-green-950 text-green-100 p-4 
        transition-all duration-300 
        lg:hover:w-64 group
      "
    >
      {/* Logo */}
      <div className="flex justify-center ml-3 mb-8 mt-4">
        <div className="p-2 border-amber-50 border-2 rounded-lg">
          <Package className="w-6 h-6" />
        </div>
        <span className="ml-3 font-semibold opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 truncate">
          Locafy
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-4 flex-1">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-white hover:text-black group relative ${
                activePage === item.id ? 'bg-green-600' : ''
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="ml-4 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 truncate absolute left-12">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User section */}
      <div className="mt-auto pt-4 border-t border-gray-700 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="ml-3 truncate">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
