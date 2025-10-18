import React, { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import UserTable from '@/Components/Admin/Users/UserTable';
import UserFilters from '@/Components/Admin/Users/UsersFilters';
import UserStats from '@/Components/Admin/Users/UserStats';
import AddUserModal from '@/Components/Admin/Users/AddUserModal';
import { mockUsers } from '@/Components/Admin/data/mockData';
import type { User } from '@/types/auth.types';
import UserDetailsModal from '@/Components/Admin/Users/UserDetailsModal';

const AdminUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

 
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleUserAdded = (newUser: User) => {
    setUsers(prev => [newUser, ...prev]);
  };

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const onViewUser = (user: User) => { setSelectedUser(user); setDetailsOpen(true); };

  return (
    <>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 mt-1">Manage customers and service providers</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-700 border border-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <AddUserModal onUserAdded={handleUserAdded} />
        </div>
      </div>

      {/* Row 1: User Stat Cards */}
      <div className="mb-8">
        <UserStats />
      </div>

      {/* User Filtering and Search */}
      <div className="mb-8">
        <UserFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      {/* User Table */}
      <UserTable users={pagedUsers} onView={onViewUser} />

      {/* Table Footer/Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 mt-4">
        <p className="text-sm text-gray-400 mb-2 sm:mb-0">
          Page {currentPage} of {totalPages} · {filteredUsers.length} total users
        </p>
        <div className="flex">
          <button 
            className="px-4 py-2 text-sm text-gray-400 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors mr-2 disabled:opacity-50" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button 
            className="px-4 py-2 text-sm text-white bg-indigo-500 rounded-xl hover:bg-indigo-600 transition-colors"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <UserDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} user={selectedUser} />
    </>
  );
};

export default AdminUsers;