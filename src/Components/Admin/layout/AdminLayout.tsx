// src/Pages/Admin/AdminLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/Components/Admin/layout/Sidebar';
import AdminHeader from '@/Components/Admin/layout/Header';
import MobileSidebar from '@/Components/Admin/layout/MobileSidebar';
import { useAuthStore } from '@/store/authStore';

const AdminLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex w-full bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700">
        <AdminSidebar />
        
        {/* User Info Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/50">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@servicehub.com'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;