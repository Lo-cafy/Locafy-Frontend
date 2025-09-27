// src/Components/Admin/Dashboard/StatsCards.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { 
  DollarSign,
  Users,
  Briefcase,
  CalendarDays,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface StatsCardsProps {
  stats: any;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.revenue?.total?.toLocaleString() || '0'}`,
      change: `+${stats?.revenue?.growth || 0}%`,
      icon: DollarSign,
      color: 'blue',
      subtitle: 'from last month'
    },
    {
      title: 'Active Users',
      value: stats?.users?.activeUsers?.toLocaleString() || '0',
      change: `+${stats?.users?.newUsersThisMonth || 0}`,
      icon: Users,
      color: 'green',
      subtitle: 'new this month'
    },
    {
      title: 'Active Services',
      value: stats?.services?.activeServices?.toLocaleString() || '0',
      change: `${stats?.services?.pendingApprovals || 0}`,
      icon: Briefcase,
      color: 'purple',
      subtitle: 'pending approval'
    },
    {
      title: 'Monthly Bookings',
      value: stats?.bookings?.total?.toLocaleString() || '0',
      change: `${stats?.bookings?.completed || 0}`,
      icon: CalendarDays,
      color: 'orange',
      subtitle: 'completed'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600/20 text-blue-400',
      green: 'bg-green-600/20 text-green-400',
      purple: 'bg-purple-600/20 text-purple-400',
      orange: 'bg-orange-600/20 text-orange-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">{card.title}</CardTitle>
            <div className={`p-2 ${getColorClasses(card.color)} backdrop-blur rounded-lg group-hover:scale-110 transition-transform`}>
              <card.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {card.value}
            </div>
            <p className="text-xs sm:text-sm text-gray-400 flex items-center mt-2">
              {card.color === 'blue' && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-400" />}
              {card.color === 'orange' && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-400" />}
              {card.color === 'purple' && <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-orange-400" />}
              <span className={card.color === 'blue' ? 'text-green-400' : ''}>
                {card.change}
              </span>
              <span className="ml-1">{card.subtitle}</span>
            </p>
            <div className="mt-3 h-1 bg-gray-700/50 rounded-full overflow-hidden">
              <div className={`h-full ${getColorClasses(card.color)} rounded-full transition-all duration-1000`} 
                style={{ width: `${Math.min(75 + index * 5, 90)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;