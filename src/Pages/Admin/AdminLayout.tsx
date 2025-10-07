import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/Components/Admin/layout/Sidebar';
import AdminHeader from '@/Components/Admin/layout/Header';
import MobileSidebar from '@/Components/Admin/layout/MobileSidebar';
import { useAuthStore } from '@/store/authStore';
import { MoreHorizontal } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <style>{`
        /* Custom scrollbar styling for a smoother dark mode look */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #111827; /* gray-900 */
        }
        ::-webkit-scrollbar-thumb {
          background: #374151; /* gray-700 */
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #4b5563; /* gray-600 */
        }
      `}</style>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800">
        <AdminSidebar />
        
        {/* User Info Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center bg-gray-700 p-3 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm mr-3">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="text-sm flex-1">
              <p className="font-semibold text-white">{user?.name || 'Admin User'}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email || 'admin@servicehub.com'}</p>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Main Content */}
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

export default AdminLayout;