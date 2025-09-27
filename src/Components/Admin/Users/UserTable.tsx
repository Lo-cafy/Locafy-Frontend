import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import type { User } from '@/types/auth.types';

interface UserTableProps {
  users: User[];
  onStatusUpdate?: (userId: string, isActive: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onStatusUpdate }) => {
  const getStatusChipClass = (status: User['status']) => {
    switch(status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Inactive': return 'bg-red-500/20 text-red-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 overflow-x-auto">
      <div className="min-w-full">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm font-semibold border-b border-gray-700 pb-3 mb-4">
          <span className="col-span-4">User</span>
          <span className="col-span-2">Role</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-3">Join Date</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>

        {/* Table Body */}
        {users.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No users found.
          </div>
        ) : (
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="grid grid-cols-12 gap-4 items-center bg-gray-900/50 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="col-span-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-gray-300">{user.role}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChipClass(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <div className="col-span-3 text-sm text-gray-300">{user.joinDate}</div>
                <div className="col-span-1 text-right">
                  <button className="text-gray-400 hover:text-white p-1 rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;