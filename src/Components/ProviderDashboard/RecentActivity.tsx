 
import { Card } from "@/ui/card";
import { CalendarCheck, Star } from "lucide-react";

const activities = [
  { icon: CalendarCheck, text: "New booking from Anjali for 'Home Cleaning'", time: "2m ago" },
  { icon: Star, text: "Received a 5-star review for 'Plumbing'", time: "1h ago" },
  { icon: CalendarCheck, text: "Booking completed for 'Gardening Service'", time: "3h ago" },
];

export default function RecentActivity() {
  return (
    <Card className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 rounded-full">
              <activity.icon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-700">{activity.text}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}