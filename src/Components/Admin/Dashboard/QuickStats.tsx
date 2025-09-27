import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const QuickStats: React.FC = () => {
  const quickStats = [
    { label: 'Avg. Response Time', value: '2.4 min', change: '-12%', positive: true },
    { label: 'Service Completion', value: '94.2%', change: '+2.1%', positive: true },
    { label: 'Customer Retention', value: '89.5%', change: '+5.2%', positive: true },
    { label: 'Provider Rating', value: '4.8/5', change: '+0.1', positive: true }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {quickStats.map((stat, index) => (
        <Card key={index} className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                <p className="text-base sm:text-lg font-semibold text-white">{stat.value}</p>
              </div>
              <div className={`flex items-center text-xs sm:text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;