import { useState } from 'react';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/ui/input';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 1,
      title: 'Plumbing Service',
      description: 'Professional plumbing services for your home',
      price: '₹500/hr',
      status: 'active',
      bookings: 24,
      rating: 4.8,
    },
    // Add more services
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Services</h1>
        <Button className="bg-emerald-600">
          <Plus className="w-5 h-5 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </Button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-gray-500 mt-1">{service.description}</p>
                
                <div className="flex gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">{service.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bookings</p>
                    <p className="font-medium">{service.bookings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-medium">{service.rating}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;