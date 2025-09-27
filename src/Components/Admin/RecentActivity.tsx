import React from 'react';
import { Clock, User, Package, Calendar } from 'lucide-react';

interface Activity {
  id: number;
  type: 'user' | 'service' | 'booking';
  message: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
}

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 1,
      type: 'user',
      message: 'New user registered',
      time: '5 minutes ago',
      icon: User,
      iconColor: 'text-blue-400'
    },
    {
      id: 2,
      type: 'service',
      message: 'Service "Home Cleaning" updated',
      time: '1 hour ago',
      icon: Package,
      iconColor: 'text-purple-400'
    },
    {
      id: 3,
      type: 'booking',
      message: 'New booking received',
      time: '2 hours ago',
      icon: Calendar,
      iconColor: 'text-green-400'
    }
  ];

  return (
    <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center p-3 bg-gray-900/50 rounded-lg">
            <div className={`p-2 rounded-full bg-opacity-20 mr-3 ${activity.iconColor}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{activity.message}</p>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;