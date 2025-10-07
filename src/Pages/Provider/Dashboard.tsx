// src/Pages/User/Dashboard.tsx
import { DollarSign, Wrench, Star } from "lucide-react";
import StatCard from "../../Components/ProviderDashboard/StatsCard";
import IncomeChart from "../../Components/ProviderDashboard/IncomeChart";
import RecentActivity from "../../Components/ProviderDashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
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
    </div>
  );
};

export default Dashboard;