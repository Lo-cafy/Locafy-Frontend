import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import type { User } from '@/types/auth.types';

// Props interface remains the same
interface UserTableProps {
  users: User[];
  onStatusUpdate?: (userId: string, isActive: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users = [] }) => {
  // Helper function for status chip styling remains the same
  const getStatusChipClass = (status: User['status']) => {
    switch(status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Inactive': return 'bg-red-500/20 text-red-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  return (
    // Main container
    <div className="bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg border border-gray-700">
      {/* Desktop Table Header - hidden on mobile */}
      <div className="hidden md:grid grid-cols-12 gap-4 text-gray-400 text-sm font-semibold border-b border-gray-700 pb-3 mb-4 px-3">
        <span className="col-span-12 md:col-span-4">User</span>
        <span className="col-span-12 md:col-span-2">Role</span>
        <span className="col-span-12 md:col-span-2">Status</span>
        <span className="col-span-12 md:col-span-3">Join Date</span>
        <span className="col-span-12 md:col-span-1 text-right">Actions</span>
      </div>

      {/* Table Body - handles both mobile and desktop views */}
      {users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No users found.
        </div>
      ) : (
        <div className="space-y-3">
          {users.map(user => (
            <div 
              key={user.id} 
              className="bg-gray-900/50 hover:bg-gray-700/50 transition-colors rounded-lg p-3"
            >
              {/* This div handles the responsive layout switch */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-4 items-center">
                
                {/* User Info - Visible on all screen sizes but formatted differently */}
                <div className="md:col-span-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                   {/* Mobile-only Actions Button */}
                  <div className="md:hidden">
                    <button className="text-gray-400 hover:text-white p-1 rounded-full">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile-specific details view (hidden on medium screens and up) */}
                <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-3 border-t border-gray-700/50 mt-3">
                   <div>
                       <p className="text-xs text-gray-500 mb-1">Role</p>
                       <p className="text-gray-300">{user.role}</p>
                   </div>
                   <div>
                       <p className="text-xs text-gray-500 mb-1">Status</p>
                       <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChipClass(user.status)}`}>
                          {user.status}
                       </span>
                   </div>
                   <div className="col-span-2">
                       <p className="text-xs text-gray-500 mb-1">Join Date</p>
                       <p className="text-gray-300">{user.joinDate}</p>
                   </div>
                </div>

                {/* Desktop-only columns (hidden by default, visible on medium screens and up) */}
                <div className="hidden md:block col-span-2 text-sm text-gray-300">{user.role}</div>
                <div className="hidden md:block col-span-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChipClass(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <div className="hidden md:block col-span-3 text-sm text-gray-300">{user.joinDate}</div>
                <div className="hidden md:block col-span-1 text-right">
                  <button className="text-gray-400 hover:text-white p-1 rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTable;

