 
import React from 'react';
import { LayoutDashboard, User, Home,CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BottomBarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

 
const bottomItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
  { id: 'profile', label: 'Profile', icon: User },
];

const BottomBar: React.FC<BottomBarProps> = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();

  const handleNavigation = (pageId: string) => {
    if (pageId === 'home') {
      navigate('/');
    } else {
      setActivePage(pageId);
    }
  };
  
  return (
   
    <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-white/30 flex justify-around items-center h-16 md:hidden z-50 shadow-t-xl">
      {bottomItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 relative ${
              isActive ? "text-emerald-600" : "text-gray-500 hover:text-emerald-600"
            }`}
          >
            <IconComponent className="w-6 h-6" />
            <span className={`text-xs font-medium ${isActive ? "font-bold" : ""}`}>{item.label}</span>
            
            
            {isActive && (
              <div className="absolute top-0 w-10 h-1 bg-emerald-600 rounded-b-full"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomBar;