import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { Calendar, Clock, CheckCircle, DollarSign } from 'lucide-react';

interface BookingStatsProps {
  stats: {
    total: number;
    inProgress: number;
    completed: number;
    totalRevenue: number;
  };
}

const BookingStats: React.FC<BookingStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.total,
      icon: Calendar,
      iconColor: 'text-gray-400',
      valueColor: 'text-white',
      bgColor: 'bg-gray-600/20'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      iconColor: 'text-blue-400',
      valueColor: 'text-blue-400',
      bgColor: 'bg-blue-600/20'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      iconColor: 'text-green-400',
      valueColor: 'text-green-400',
      bgColor: 'bg-green-600/20'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      iconColor: 'text-purple-400',
      valueColor: 'text-purple-400',
      bgColor: 'bg-purple-600/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/40 transition-all">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-400 truncate">{stat.title}</p>
                <p className={`text-xl sm:text-2xl font-bold ${stat.valueColor}`}>{stat.value}</p>
              </div>
              <div className={`p-2 ${stat.bgColor} backdrop-blur rounded-lg`}>
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.iconColor} flex-shrink-0`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingStats;