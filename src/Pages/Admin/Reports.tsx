// src/Pages/Admin/Reports.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Button } from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Download, RefreshCw, ChevronDown } from 'lucide-react';
import RevenueChart from '@/Components/Admin/Reports/RevenueChart';
import UserMetricsChart from '@/Components/Admin/Reports/UserMetricsChart';
import MetricCards from '@/Components/Admin/Reports/MetricCards';
import { useAdminStore } from '@/store/adminStore';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const { fetchDashboardStats } = useAdminStore();

  const revenueData = [
    { date: '2024-01', revenue: 45000 },
    { date: '2024-02', revenue: 52000 },
    { date: '2024-03', revenue: 49000 },
    { date: '2024-04', revenue: 58000 },
    { date: '2024-05', revenue: 55000 },
    { date: '2024-06', revenue: 62000 }
  ];

  const userMetrics = [
    { month: 'Jan', newUsers: 250, activeUsers: 1200 },
    { month: 'Feb', newUsers: 320, activeUsers: 1350 },
    { month: 'Mar', newUsers: 280, activeUsers: 1400 },
    { month: 'Apr', newUsers: 350, activeUsers: 1500 },
    { month: 'May', newUsers: 310, activeUsers: 1600 },
    { month: 'Jun', newUsers: 380, activeUsers: 1750 }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics & Reports</h1>
          <p className="text-gray-400 text-base sm:text-lg">Comprehensive platform insights</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-36 bg-gray-800/30 backdrop-blur border-gray-700/50 text-white">
              <SelectValue />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <SelectItem value="7d" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Last 7 days</SelectItem>
              <SelectItem value="30d" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Last 30 days</SelectItem>
              <SelectItem value="90d" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Last 90 days</SelectItem>
              <SelectItem value="12m" className="text-gray-300 hover:text-white hover:bg-gray-700/50">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="bg-gray-800/30 backdrop-blur border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 flex-1 sm:flex-initial"
            >
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button 
              className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white flex-1 sm:flex-initial"
              onClick={() => fetchDashboardStats()}
            >
              <RefreshCw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <MetricCards />

      {/* Report Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="bg-gray-800/30 backdrop-blur border border-gray-700/50 inline-flex min-w-full sm:min-w-0">
            <TabsTrigger 
              value="revenue" 
              className="flex-1 data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 px-4 py-2"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex-1 data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 px-4 py-2"
            >
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="flex-1 data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 px-4 py-2"
            >
              Services
            </TabsTrigger>
            <TabsTrigger 
              value="bookings" 
              className="flex-1 data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400 px-4 py-2"
            >
              Bookings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="revenue">
          <RevenueChart data={revenueData} />
        </TabsContent>

        <TabsContent value="users">
          <UserMetricsChart data={userMetrics} />
        </TabsContent>

        <TabsContent value="services">
          <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Services Overview</CardTitle>
              <CardDescription className="text-gray-400">Service performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add services content here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Booking Analytics</CardTitle>
              <CardDescription className="text-gray-400">Booking trends and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add bookings content here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;