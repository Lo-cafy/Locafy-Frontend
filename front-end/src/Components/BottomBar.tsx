import React from 'react';
import { LayoutDashboard, User, Settings, Home } from 'lucide-react';

interface BottomBarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const bottomItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'home', label: 'Home', icon: Home }
];

const BottomBar: React.FC<BottomBarProps> = ({ activePage, setActivePage }) => {
  return (
<div className="fixed bottom-0 left-0 right-0 w-full  bg-white border-t-2 rounded-t-3xl border-l-2 border-r-2
 border-gray-800 flex justify-around items-center py-3 px-2md:hidden z-50safe-bottom">
  {bottomItems.map((item) => {
    const IconComponent = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => setActivePage(item.id)}
        className={`flex flex-col items-center justify-center gap-1 flex-1 
          transition-all duration-200 
          ${activePage === item.id ? "text-green-700" : "text-black"}`}
      >
        <IconComponent className="w-6 h-6" />
        <span className="text-[10px]">{item.label}</span>
      </button>
    );
  })}
</div>

  );
};

export default BottomBar;
