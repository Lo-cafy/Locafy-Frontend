// src/Pages/Admin/AdminUsers.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/ui/button';
import { Download, Plus } from 'lucide-react';
import UserTable from '@/Components/Admin/Users/UserTable';
import UserFilters from '@/Components/Admin/Users/UsersFilters';
import UserStats from '@/Components/Admin/Users/UserStats';
import { adminService } from '@/services/admin.service';
import type { User } from '@/types/auth.types';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers({
        page: currentPage,
        limit: 10,
        search: searchQuery || undefined,
        role: roleFilter !== 'all' ? roleFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      
      if (response.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId: string, isActive: boolean) => {
    try {
      const response = await adminService.updateUserStatus(userId, isActive);
      if (response.success) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 text-base sm:text-lg">Manage customers and service providers</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-gray-800/30 backdrop-blur border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 flex-1 sm:flex-initial">
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white flex-1 sm:flex-initial">
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Add User</span>
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <UserStats />

      {/* Filters */}
      <UserFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Users Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading users...</div>
      ) : (
        <UserTable users={users} onStatusUpdate={handleStatusUpdate} />
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-lg p-4">
        <p className="text-sm text-gray-400 text-center sm:text-left">
          Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, users.length)} of {users.length} users
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;