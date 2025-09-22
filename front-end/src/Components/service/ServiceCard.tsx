import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import type { ServiceListing } from '@/types/service.types';

type ServiceCardProps = {
  service: ServiceListing;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link to={`/services/${service.serviceId}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.primaryPhotoUrl || '/placeholder-service.jpg'}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-emerald-600">
            ₹{service.price}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {service.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{service.locationText}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{service.rating.toFixed(1)}</span>
            </div>
            
            {service.distanceKm && (
              <span className="text-sm text-gray-500">
                {service.distanceKm.toFixed(1)} km away
              </span>
            )}
          </div>
          
          {service.category && (
            <Badge variant="secondary" className="mt-2">
              {service.category.name}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}