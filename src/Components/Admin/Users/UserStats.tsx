import React from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import type  { StatCardData } from '@/types/admin.types';

const UserStats: React.FC = () => {
  const userStats: StatCardData[] = [
    { 
      title: 'Total Users', 
      value: '8,750', 
      change: '+12.5%', 
      isPositive: true, 
      icon: Users, 
      iconColor: 'text-indigo-400' 
    },
    { 
      title: 'Active Users', 
      value: '7,234', 
      change: '+8.2%', 
      isPositive: true, 
      icon: UserCheck, 
      iconColor: 'text-green-400' 
    },
    { 
      title: 'Inactive Users', 
      value: '1,516', 
      change: '-3.1%', 
      isPositive: false, 
      icon: UserX, 
      iconColor: 'text-red-400' 
    },
    { 
      title: 'New This Month', 
      value: '423', 
      change: '+15.8%', 
      isPositive: true, 
      icon: UserPlus, 
      iconColor: 'text-purple-400' 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {userStats.map((stat, index) => (
        <div key={index} className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
            {stat.icon && stat.iconColor && (
              <div className={`p-2 rounded-full bg-opacity-20 ${stat.iconColor}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            )}
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

export default UserStats;