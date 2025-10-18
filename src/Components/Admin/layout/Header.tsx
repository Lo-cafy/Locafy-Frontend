import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import NotificationsModal from '@/Components/Admin/NotificationsModal';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center flex-grow max-w-2xl">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden mr-3 p-2 text-gray-400 hover:text-white rounded-xl bg-gray-800 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:border-indigo-500 transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-4">
        <button onClick={() => setNotificationsOpen(true)} className="p-2 text-gray-400 hover:text-indigo-400 rounded-full transition-colors relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-gray-900"></span>
        </button>
        
        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 ring-indigo-500 transition-shadow">
          {user?.name?.charAt(0) || 'A'}
        </div>
      </div>
      <NotificationsModal open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </header>
  );
};

export default AdminHeader;