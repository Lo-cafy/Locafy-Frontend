 
import { Card } from "@/ui/card";
import { TrendingUp } from "lucide-react";

export default function IncomeChart() {
  
  const chartData = [
    { month: "Jan", income: 1200 },
    { month: "Feb", income: 1900 },
    { month: "Mar", income: 1500 },
    { month: "Apr", income: 2800 },
    { month: "May", income: 2200 },
    { month: "Jun", income: 3200 },
  ];
  const maxIncome = Math.max(...chartData.map(d => d.income));

  return (
    <Card className="bg-white p-6 rounded-xl shadow-md col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Income Overview</h3>
        <div className="flex items-center text-sm text-green-600 font-medium">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+15.2% this month</span>
        </div>
      </div>
      
      <div className="flex items-end justify-around h-48 bg-gray-50/70 p-4 rounded-lg border border-gray-100">
        {chartData.map((data) => {
         
          const barHeight = `${(data.income / maxIncome) * 100}%`;

          return (
            <div key={data.month} className="flex flex-col items-center group">
               
              <div className="text-xs font-bold text-white bg-gray-800 px-2 py-1 rounded-md mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ${data.income}
              </div>
              <div
                className="w-8 bg-gradient-to-t from-emerald-400 to-green-500 rounded-t-md hover:opacity-80 transition-opacity"
                style={{ height: barHeight }}  
              ></div>
              <p className="text-xs font-medium text-gray-500 mt-2">{data.month}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}