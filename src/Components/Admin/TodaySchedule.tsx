import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';

const TodaySchedule: React.FC = () => {
  const schedules = [
    { time: '10:00 AM', service: 'House Cleaning', customer: 'John Smith' },
    { time: '11:30 AM', service: 'Plumbing Service', customer: 'Emma Davis' },
    { time: '2:00 PM', service: 'Garden Maintenance', customer: 'Robert Brown' },
    { time: '4:30 PM', service: 'Car Wash', customer: 'Maria Garcia' }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-white text-base sm:text-lg">Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
            <div className="w-16 sm:w-20 text-gray-400 text-xs sm:text-sm flex-shrink-0">{schedule.time}</div>
            <div className="min-w-0">
              <p className="text-gray-200 font-medium text-sm sm:text-base truncate">{schedule.service}</p>
              <p className="text-gray-500 text-xs sm:text-sm truncate">{schedule.customer}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;