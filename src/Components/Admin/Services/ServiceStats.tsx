 
import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { Briefcase, CheckCircle, Clock, Star } from 'lucide-react';

const ServiceStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Services',
      value: '2,456',
      icon: Briefcase,
      color: 'blue'
    },
    {
      title: 'Active Services',
      value: '2,203',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pending Review',
      value: '187',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      icon: Star,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600/20 text-blue-400',
      green: 'bg-green-600/20 text-green-400',
      orange: 'bg-orange-600/20 text-orange-400',
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

export default ServiceStats;