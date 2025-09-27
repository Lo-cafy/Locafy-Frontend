 
import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { DollarSign, Users, Calendar, Clock } from 'lucide-react';

const MetricCards: React.FC = () => {
  const metrics = [
    { 
      title: 'Total Revenue', 
      value: '$298,500', 
      change: '+12.5%',
      icon: DollarSign,
      bgColor: 'bg-blue-600/20',
      textColor: 'text-blue-400',
      iconColor: 'text-blue-400'
    },
    { 
      title: 'Active Users', 
      value: '8,750', 
      change: '+8.2%',
      icon: Users,
      bgColor: 'bg-green-600/20',
      textColor: 'text-green-400',
      iconColor: 'text-green-400'
    },
    { 
      title: 'Total Bookings', 
      value: '2,420', 
      change: '+15.8%',
      icon: Calendar,
      bgColor: 'bg-purple-600/20',
      textColor: 'text-purple-400',
      iconColor: 'text-purple-400'
    },
    { 
      title: 'Avg Response Time', 
      value: '2.4 min', 
      change: '-10.5%',
      icon: Clock,
      bgColor: 'bg-orange-600/20',
      textColor: 'text-orange-400',
      iconColor: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{metric.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{metric.value}</p>
                <div className={`flex items-center text-sm ${metric.textColor} mt-1`}>
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className={`p-2 ${metric.bgColor} backdrop-blur rounded-lg`}>
                <metric.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${metric.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricCards;