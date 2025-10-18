// src/Components/ProviderDashboard/ServiceCard.tsx
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { DollarSign, Star, Edit, Trash2, Eye } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  status: "Active" | "Paused";
}

interface ServiceCardProps {
  service: Service;
  onView?: (service: Service) => void;
  onEdit?: (service: Service) => void;
}

const getStatusStyles = (status: Service['status']) => {
  return status === "Active"
    ? "bg-green-100/70 text-green-800 border-green-200/80"
    : "bg-yellow-100/70 text-yellow-800 border-yellow-200/80";
};

export default function ServiceCard({ service, onView, onEdit }: ServiceCardProps) {
  return (
    <Card className="bg-white/60 backdrop-blur-lg border border-white/30 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge className="text-xs bg-emerald-100/70 text-emerald-800">{service.category}</Badge>
          <Badge className={`text-xs font-semibold ${getStatusStyles(service.status)}`}>
            {service.status}
          </Badge>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-700">
          <div className="flex items-center gap-1 font-bold text-lg text-emerald-800">
            <DollarSign className="w-5 h-5" />
            <span>{service.price}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold">{service.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/50 mt-4 pt-3 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/50 border-gray-300/70 hover:bg-white"
          onClick={() => onView?.(service)}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/50 border-gray-300/70 hover:bg-white"
          onClick={() => onEdit?.(service)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white/50 border-red-200/70 text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
      </div>
    </Card>
  );
}