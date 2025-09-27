import React from 'react';
import { DollarSign, Users, Package, CalendarCheck } from 'lucide-react';
import type { QuickStatData } from '@/types/admin.types';

const QuickStats: React.FC = () => {
  const summaryData: QuickStatData[] = [
    {
      title: 'Total Revenue',
      value: '$0',
      details: '+0% from last month',
      icon: DollarSign,
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Active Users',
      value: '0',
      details: '+0 new this month',
      icon: Users,
      iconColor: 'text-green-400',
    },
    {
      title: 'Active Services',
      value: '0',
      details: '0 pending approval',
      icon: Package,
      iconColor: 'text-purple-400',
    },
    {
      title: 'Monthly Bookings',
      value: '0',
      details: '0 completed',
      icon: CalendarCheck,
      iconColor: 'text-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((summary, index) => (
        <div key={index} className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-400 font-medium">{summary.title}</p>
            <div className={`p-2 rounded-full bg-opacity-20 ${summary.iconColor}`}>
              <summary.icon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-2">{summary.value}</p>
          <p className={`text-xs mt-2 ${summary.title === 'Total Revenue' ? 'text-emerald-400' : 'text-gray-400'}`}>
            {summary.details}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;