import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { Eye, Activity, MoreHorizontal, Star, MapPin } from 'lucide-react';
import type { Service } from '@/types/service.types';

interface ServiceGridProps {
  services: Service[];
  onApprove: (serviceId: string) => void;
  onReject: (serviceId: string, reason: string) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, onApprove, onReject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {services.map((service) => (
        <Card key={service.id} className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl bg-gray-700/30 p-2 rounded-lg">{service.images[0] || '🔧'}</div>
                <div>
                  <CardTitle className="text-lg leading-tight text-white">{service.name}</CardTitle>
                  <p className="text-sm text-gray-400">{service.providerName}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                    Edit Service
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700/50" />
                  {service.isActive ? (
                    <DropdownMenuItem 
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => onReject(service.id, 'Service deactivated by admin')}
                    >
                      Deactivate
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem 
                      className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      onClick={() => onApprove(service.id)}
                    >
                      Activate
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">
                {service.category.name}
              </Badge>
              <Badge className={service.isActive ? 
                'bg-green-600/20 text-green-300 border-green-400/30' : 
                'bg-red-600/20 text-red-300 border-red-400/30'
              }>
                {service.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Price</p>
                <p className="font-semibold text-green-400">
                  ${service.price.amount.toFixed(2)}/{service.price.unit}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Orders</p>
                <p className="font-semibold text-blue-400">{service.reviewCount}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-yellow-400">{service.rating}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{service.location}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Button size="sm" className="flex-1 bg-blue-600/80 hover:bg-blue-700/80 text-white">
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-gray-700/30 border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50">
                <Activity className="w-3 h-3 mr-1" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceGrid;