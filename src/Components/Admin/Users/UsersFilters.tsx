import React from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-4 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-lg">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Search users..." 
          className="pl-10 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white placeholder-gray-400 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white">
            <SelectValue placeholder="All Roles" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <SelectItem value="all" className="text-gray-300 hover:text-white hover:bg-gray-700/50">All Roles</SelectItem>
            <SelectItem value="user" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Customers</SelectItem>
            <SelectItem value="admin" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Service Providers</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-36 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white">
            <SelectValue placeholder="Status" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <SelectItem value="all" className="text-gray-300 hover:text-white hover:bg-gray-700/50">All Status</SelectItem>
            <SelectItem value="active" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Active</SelectItem>
            <SelectItem value="inactive" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50 w-full sm:w-auto"
        >
          <Filter className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">More Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default UserFilters;