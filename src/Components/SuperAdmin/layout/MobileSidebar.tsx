import React from 'react';
import { X, Shield } from 'lucide-react';
import SuperAdminSidebar from './Sidebar';
import { useAuthStore } from '@/store/authStore';
import { MoreHorizontal } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuperAdminMobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-30 lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-40`}>
        {/* Close button for mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand */}
        <div className="px-4 py-6 border-b border-gray-800 flex items-center gap-2">
          <Shield className="w-6 h-6 text-emerald-400" />
          <span className="font-bold text-lg">Super Admin</span>
        </div>

        {/* Sidebar content */}
        <SuperAdminSidebar />

        {/* User Profile */}
        <div className="p-4 mt-6 border-t border-gray-800">
          <div className="flex items-center bg-gray-700 p-3 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm mr-3">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="text-sm flex-1">
              <p className="font-semibold text-white">{user?.name || 'Super Admin'}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email || 'super@locafy.com'}</p>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminMobileSidebar;
