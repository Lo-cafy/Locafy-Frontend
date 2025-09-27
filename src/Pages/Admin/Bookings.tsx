import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Button } from '@/ui/button';
import { Download, Calendar } from 'lucide-react';
import BookingStats from '@/Components/Admin/BookingStats';
import BookingFilters from '@/Components/Admin/BookingFilters';
import BookingTable from '@/Components/Admin/BookingTable';
import RecentActivity from '@/Components/Admin/RecentActivity';
import TodaySchedule from '@/Components/Admin/TodaySchedule';
import PerformanceMetrics from '@/Components/Admin/PerformanceMetrics';
import type { Booking } from '@/types/Bookings.types';
import { mockBookings } from '@/Components/Admin/data/mockData';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    setBookings(mockBookings);
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    inProgress: bookings.filter(b => b.status === 'in-progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.amount, 0)
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab !== 'all' && booking.status !== activeTab) return false;
    if (searchQuery && !booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Booking Management</h1>
          <p className="text-base sm:text-lg text-gray-400 mt-1">Monitor and manage all service bookings</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-gray-800/30 backdrop-blur border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white w-full sm:w-auto">
            <Calendar className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <BookingStats stats={stats} />

      {/* Filters */}
      <BookingFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      {/* Tabs and Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="bg-gray-800/30 backdrop-blur border border-gray-700/50 p-1 inline-flex min-w-full sm:min-w-0">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 text-xs sm:text-sm">
              All ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 text-xs sm:text-sm">
              Pending ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 text-xs sm:text-sm">
              Confirmed ({stats.confirmed})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 text-xs sm:text-sm">
              In Progress ({stats.inProgress})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 text-xs sm:text-sm">
              Completed ({stats.completed})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 text-xs sm:text-sm">
              Cancelled ({stats.cancelled})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-4 sm:mt-6">
          <BookingTable bookings={filteredBookings} />
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <RecentActivity />
        <TodaySchedule />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default Bookings;