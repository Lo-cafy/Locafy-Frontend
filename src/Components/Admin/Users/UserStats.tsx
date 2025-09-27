import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

const UserStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '8,750',
      change: '+12.5%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '7,234',
      change: '+8.2%',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Inactive Users',
      value: '1,516',
      change: '-3.1%',
      icon: UserX,
      color: 'red'
    },
    {
      title: 'New This Month',
      value: '423',
      change: '+15.8%',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600/20 text-blue-400',
      green: 'bg-green-600/20 text-green-400',
      red: 'bg-red-600/20 text-red-400',
      purple: 'bg-purple-600/20 text-purple-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">{stat.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                <p className={`text-xs sm:text-sm ${stat.color === 'red' ? 'text-red-400' : 'text-green-400'} mt-1`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-2 ${getColorClasses(stat.color)} backdrop-blur rounded-lg`}>
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;