import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { TrendingUp } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  const metrics = [
    { label: 'Completion Rate', value: '94%', trend: '+2.5%', up: true, progress: 94 },
    { label: 'Customer Satisfaction', value: '4.8/5', trend: '+0.2', up: true, progress: 96 },
    { label: 'Average Response Time', value: '2.4 min', trend: '-0.5 min', up: true, progress: 80 },
    { label: 'Cancellation Rate', value: '3.2%', trend: '-0.8%', up: true, progress: 97 }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-white text-base sm:text-lg">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs sm:text-sm truncate mr-2">{metric.label}</span>
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <span className="text-gray-200 font-medium text-xs sm:text-sm">{metric.value}</span>
                <div className={`flex items-center ${metric.up ? 'text-green-400' : 'text-red-400'}`}>
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{metric.trend}</span>
                </div>
              </div>
            </div>
            <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300" 
                style={{ width: `${metric.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;