import { User, Star, Shield, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/ui/card';
import { Button } from '@/ui/button';
import { ServiceProvider } from '@/types/service.types';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
}

export function ServiceProviderCard({ provider }: ServiceProviderCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <h3 className="font-semibold">
              {provider.firstname} {provider.lastname}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{provider.rating.toFixed(1)} Rating</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Verified Provider</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}