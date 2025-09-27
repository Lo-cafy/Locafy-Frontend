import React from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Search, Filter } from 'lucide-react';

interface ServiceFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-lg">
      <div className="relative flex-1 min-w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Search services..." 
          className="pl-10 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-44 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
          <SelectItem value="all" className="text-gray-300 hover:text-white hover:bg-gray-700/50">All Categories</SelectItem>
          <SelectItem value="cleaning" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Cleaning</SelectItem>
          <SelectItem value="laundry" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Laundry</SelectItem>
          <SelectItem value="repair" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Home Repair</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-36 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
          <SelectItem value="all" className="text-gray-300 hover:text-white hover:bg-gray-700/50">All Status</SelectItem>
          <SelectItem value="active" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Active</SelectItem>
          <SelectItem value="inactive" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50">
        <Filter className="w-4 h-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
};

export default ServiceFilters;