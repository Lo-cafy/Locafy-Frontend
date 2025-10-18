// src/Pages/User/Dashboard.tsx
import { useState } from "react";
import { DollarSign, Wrench, Star, Bell } from "lucide-react";
import { Button } from "@/ui/button";
import StatCard from "../../Components/ProviderDashboard/StatsCard";
import IncomeChart from "../../Components/ProviderDashboard/IncomeChart";
import RecentActivity from "../../Components/ProviderDashboard/RecentActivity";
import NotificationsModal from "@/Components/Admin/NotificationsModal";

const Dashboard = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="relative z-0 flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Button
          aria-label="Notifications"
          variant="outline"
          className="border-gray-300 hover:bg-gray-100 p-2 rounded-full z-0 transition-opacity peer-hover:md:opacity-0 peer-hover:md:pointer-events-none"
          onClick={() => setNotifOpen(true)}
        >
          <Bell className="w-5 h-5 text-emerald-600" />
        </Button>
      </div>

      {/* --- Stat Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Total Earnings" 
          value="$12,450" 
          icon={DollarSign}
          color="border-green-500"
        />
        <StatCard 
          title="Services Completed" 
          value="152" 
          icon={Wrench}
          color="border-blue-500"
        />
        <StatCard 
          title="Average Rating" 
          value="4.9" 
          icon={Star}
          color="border-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <IncomeChart />
        <RecentActivity />
      </div>

      <NotificationsModal open={notifOpen} onOpenChange={setNotifOpen} />
    </div>
  );
};

export default Dashboard;