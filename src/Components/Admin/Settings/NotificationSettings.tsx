 import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import { Button } from '@/ui/button';

const NotificationSettings: React.FC = () => {
  const notifications = [
    {
      title: 'Email Notifications',
      description: 'Receive email notifications for important updates',
      enabled: true
    },
    {
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      enabled: true
    },
    {
      title: 'Booking Alerts',
      description: 'Get notified for new bookings and updates',
      enabled: true
    },
    {
      title: 'Service Updates',
      description: 'Notifications about service status changes',
      enabled: false
    },
    {
      title: 'Marketing Updates',
      description: 'Receive marketing and promotional emails',
      enabled: false
    }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
      <CardContent className="space-y-6 p-6">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 backdrop-blur">
            <div>
              <Label className="text-white">{notification.title}</Label>
              <p className="text-sm text-gray-400">{notification.description}</p>
            </div>
            <Switch 
              defaultChecked={notification.enabled}
              className="bg-gray-600 data-[state=checked]:bg-blue-600" 
            />
          </div>
        ))}

        <div className="flex justify-end space-x-3 pt-6">
          <Button 
            variant="outline" 
            className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
          >
            Reset
          </Button>
          <Button className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;