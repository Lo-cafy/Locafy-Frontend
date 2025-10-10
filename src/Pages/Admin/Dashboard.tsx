import React from 'react';
import { Download, Plus } from 'lucide-react';
import StatsCards from '@/Components/Admin/Dashboard/StatsCards';
import RevenueChart from '@/Components/Admin/Dashboard/RevenueChart';
import ServiceDistribution from '@/Components/Admin/Dashboard/ServiceDistribution';
import QuickStats from '@/Components/Admin/Dashboard/QuickStats';
import { mockDashboardStats } from '@/Components/Admin/data/mockData';

const AdminDashboard: React.FC = () => {
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
    <>
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-700 border border-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-xl hover:bg-indigo-600 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="mb-8">
        <StatsCards stats={mockDashboardStats} />
      </div>

      {/* Row 2: Summary Cards */}
      <div className="mb-8">
        <QuickStats />
      </div>

      {/* Row 3: Charts/Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div className="lg:col-span-1">
          <ServiceDistribution data={serviceTypeData} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;