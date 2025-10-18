import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '@/Components/SuperAdmin/layout/Sidebar';
import AdminHeader from '@/Components/Admin/layout/Header';
import MobileSidebar from '@/Components/SuperAdmin/layout/MobileSidebar';
import { useAuthStore } from '@/store/authStore';

const SuperAdminLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="text-lg font-bold text-emerald-400">Super Admin</div>
          <div className="text-xs text-gray-400">Full system access</div>
        </div>
        <SuperAdminSidebar />
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400">{user?.email}</div>
        </div>
      </aside>

      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      <div className="flex flex-col min-h-screen">
        <div className="lg:ml-64">
          <AdminHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
        </div>
        <main className="flex-1 p-4 md:p-8 pt-4 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
