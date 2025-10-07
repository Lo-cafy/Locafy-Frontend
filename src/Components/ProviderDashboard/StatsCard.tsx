import { Card } from "@/ui/card";
import type { LucideIcon } from "lucide-react"; 

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon; 
  color: string;
}

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <Card className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">
         
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </Card>
  );
}
