import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter
}) => {
  const Dropdown: React.FC<{ label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }> = ({ 
    label, value, onChange, options 
  }) => (
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-xl text-sm font-medium hover:bg-gray-600 transition-colors appearance-none cursor-pointer"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );

  return (
    <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] md:min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 ml-auto">
          <Dropdown 
            label="All Roles" 
            value={roleFilter}
            onChange={setRoleFilter}
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'Admin', label: 'Admin' },
              { value: 'Provider', label: 'Provider' },
              { value: 'Customer', label: 'Customer' }
            ]}
          />
          <Dropdown 
            label="All Status" 
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
              { value: 'Pending', label: 'Pending' }
            ]}
          />
          <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-xl text-sm font-medium hover:bg-gray-600 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;