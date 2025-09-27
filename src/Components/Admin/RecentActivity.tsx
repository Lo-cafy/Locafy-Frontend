import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { CheckCircle, RefreshCw, DollarSign, XCircle } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    { text: 'New booking confirmed', time: '2 mins ago', icon: CheckCircle, color: 'text-green-400' },
    { text: 'Booking #BK003 updated', time: '15 mins ago', icon: RefreshCw, color: 'text-blue-400' },
    { text: 'Payment received for #BK001', time: '1 hour ago', icon: DollarSign, color: 'text-purple-400' },
    { text: 'Booking #BK005 cancelled', time: '2 hours ago', icon: XCircle, color: 'text-red-400' }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-white text-base sm:text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
            <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.color} mt-0.5 flex-shrink-0`} />
            <div className="min-w-0">
              <p className="text-gray-200 text-sm sm:text-base break-words">{activity.text}</p>
              <p className="text-gray-500 text-xs sm:text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;