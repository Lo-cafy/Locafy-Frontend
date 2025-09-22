import React from 'react';
import { LayoutDashboard, User, Settings, Package, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activePage: string;
}

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: User, path: '/user/profile' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/user/dashboard' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/user/settings' },
  { id: 'home', label: 'Home', icon: Home, path: '/' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
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
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-white hover:text-black group relative ${
                activePage === item.id ? 'bg-green-600' : ''
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="ml-4 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 truncate absolute left-12">
                {item.label}
              </span>
            </Link>
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