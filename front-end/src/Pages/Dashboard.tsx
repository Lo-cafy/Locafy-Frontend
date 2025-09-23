import { Card } from '@/ui/card';
import { 
  LayoutDashboard, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Star
} from 'lucide-react';

const statsData = [
  {
    title: "Total Earnings",
    value: "₹12,450",
    icon: DollarSign,
    trend: "+12.5%",
    trendLabel: "from last month",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Active Services",
    value: "8",
    icon: LayoutDashboard,
    trend: "+2",
    trendLabel: "new this week",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Total Bookings",
    value: "124",
    icon: Calendar,
    trend: "+18",
    trendLabel: "this month",
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Customer Rating",
    value: "4.8",
    icon: Star,
    trend: "+0.2",
    trendLabel: "this month",
    color: "bg-yellow-100 text-yellow-600"
  }
];

const recentBookings = [
  {
    id: 1,
    service: "Plumbing Service",
    customer: "John Smith",
    date: "Today, 2:00 PM",
    status: "Confirmed",
    amount: "₹850"
  },
  // Add more bookings...
];

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, John!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.trend}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-2">{stat.trendLabel}</p>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Upcoming Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <button className="text-sm text-green-600 hover:text-green-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{booking.service}</h3>
                  <p className="text-sm text-gray-600">{booking.customer}</p>
                  <p className="text-xs text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.amount}</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Stats */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Performance Stats</h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="space-y-6">
            {/* Response Time */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Average Response Time</p>
                <p className="text-sm font-medium">25 mins</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-600 rounded-full w-3/4"></div>
              </div>
            </div>

            {/* Completion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Service Completion Rate</p>
                <p className="text-sm font-medium">95%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-600 rounded-full w-11/12"></div>
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
                <p className="text-sm font-medium">4.8/5.0</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-600 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;