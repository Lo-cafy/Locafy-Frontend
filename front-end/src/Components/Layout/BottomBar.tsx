import React from 'react';
import { LayoutDashboard, User, Settings, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BottomBarProps {
  activePage: string;
}

const bottomItems = [
  { id: 'profile', label: 'Profile', icon: User, path: '/user/profile' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/user/dashboard' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/user/settings' },
  { id: 'home', label: 'Home', icon: Home, path: '/' }
];

const BottomBar: React.FC<BottomBarProps> = ({ activePage }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t-2 rounded-t-3xl border-l-2 border-r-2
     border-gray-800 flex justify-around items-center py-3 px-2 md:hidden z-50 safe-bottom">
      {bottomItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-1 flex-1 
              transition-all duration-200 
              ${activePage === item.id ? "text-green-700" : "text-black"}`}
          >
            <IconComponent className="w-6 h-6" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;