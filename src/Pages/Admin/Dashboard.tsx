import React, { useEffect, useState } from 'react';
import { Button } from '@/ui/button';
import { Download, Plus } from 'lucide-react';
import StatsCards from '@/Components/Admin/Dashboard/StatsCards';
import RevenueChart from '@/Components/Admin/Dashboard/RevenueChart';
import ServiceDistribution from '@/Components/Admin/Dashboard/ServiceDistribution';
import QuickStats from '@/Components/Admin/Dashboard/QuickStats';
import RecentActivity from '@/Components/Admin/RecentActivity';
import { adminService } from '@/services/admin.service';
import type { DashboardStats } from '@/types/admin.types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminService.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const revenueData = [
    { month: 'Jan', revenue: 125000 },
    { month: 'Feb', revenue: 142000 },
    { month: 'Mar', revenue: 138000 },
    { month: 'Apr', revenue: 165000 },
    { month: 'May', revenue: 158000 },
    { month: 'Jun', revenue: 187000 },
    { month: 'Jul', revenue: 198000 }
  ];

  const serviceTypeData = [
    { name: 'Cleaning', value: 35, color: '#3b82f6' },
    { name: 'Laundry', value: 25, color: '#10b981' },
    { name: 'Home Repair', value: 20, color: '#f59e0b' },
    { name: 'Gardening', value: 12, color: '#ef4444' },
    { name: 'Others', value: 8, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-base sm:text-lg mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-gray-800/30 backdrop-blur border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 flex-1 sm:flex-initial">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white shadow-sm flex-1 sm:flex-initial">
            <Plus className="w-4 h-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <ServiceDistribution data={serviceTypeData} />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default AdminDashboard;