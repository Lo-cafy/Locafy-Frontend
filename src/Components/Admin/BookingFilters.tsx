import React from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Search, Filter } from 'lucide-react';

interface BookingFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  dateFilter,
  setDateFilter
}) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-lg">
      <div className="relative flex-1 min-w-0 sm:min-w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Search bookings..." 
          className="pl-10 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white placeholder-gray-400 w-full focus:border-blue-400 focus:ring-blue-400/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={dateFilter} onValueChange={setDateFilter}>
        <SelectTrigger className="w-full sm:w-44 bg-gray-700/30 backdrop-blur border-gray-600/50 text-white">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800/90 backdrop-blur-xl border border-gray-700/50">
          <SelectItem value="all" className="text-gray-300 hover:text-white hover:bg-gray-700/50">All Time</SelectItem>
          <SelectItem value="today" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Today</SelectItem>
          <SelectItem value="week" className="text-gray-300 hover:text-white hover:bg-gray-700/50">This Week</SelectItem>
          <SelectItem value="month" className="text-gray-300 hover:text-white hover:bg-gray-700/50">This Month</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50 w-full sm:w-auto">
        <Filter className="w-4 h-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
};

export default BookingFilters;