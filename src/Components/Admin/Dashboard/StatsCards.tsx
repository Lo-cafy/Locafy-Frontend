import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { DashboardStats, StatCardData } from '@/types/admin.types';

interface StatsCardsProps {
  stats: DashboardStats | null;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const statData: StatCardData[] = [
    { 
      title: 'Avg. Response Time', 
      value: stats?.avgResponseTime || '2.4 min', 
      change: '12%', 
      isPositive: false 
    },
    { 
      title: 'Service Completion', 
      value: `${stats?.serviceCompletion || 94.2}%`, 
      change: '2.1%', 
      isPositive: true 
    },
    { 
      title: 'Customer Retention', 
      value: `${stats?.customerRetention || 89.5}%`, 
      change: '5.2%', 
      isPositive: true 
    },
    { 
      title: 'Provider Rating', 
      value: `${stats?.providerRating || 4.8}/5`, 
      change: '0.1', 
      isPositive: true 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statData.map((stat, index) => (
        <div key={index} className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
            <div className={`flex items-center px-2 py-1 text-xs rounded-full ${
              stat.isPositive ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'
            }`}>
              {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {stat.change}
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          <div className={`flex items-center mt-1 text-xs font-medium ${
            stat.isPositive ? 'text-emerald-400' : 'text-red-400'
          }`}>
            <span className="mr-1">{stat.change}</span>
            <span className="text-gray-400 font-normal">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;