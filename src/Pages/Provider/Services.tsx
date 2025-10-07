// src/Pages/User/Services.tsx
import { Wrench, PlusCircle } from 'lucide-react';
import ServiceCard, { type Service } from '../../Components/ProviderDashboard/ServiceCard';
import { Button } from '@/ui/button';

// --- Dummy Data for Services ---
const dummyServices: Service[] = [
  { id: 'SVC01', name: 'Professional House Cleaning', category: 'Cleaning', price: 150, rating: 4.9, status: 'Active' },
  { id: 'SVC02', name: 'Advanced Plumbing Solutions', category: 'Plumbing', price: 80, rating: 4.8, status: 'Active' },
  { id: 'SVC03', name: 'Creative Landscaping', category: 'Gardening', price: 120, rating: 4.9, status: 'Paused' },
  { id: 'SVC04', name: 'Full-Stack Web Development', category: 'Tech', price: 500, rating: 5.0, status: 'Active' },
];

const Services = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Wrench className="w-8 h-8 text-emerald-600" />
          My Services
        </h1>
        <Button className="mt-4 sm:mt-0 bg-emerald-600 text-white hover:bg-emerald-700 shadow-md">
          <PlusCircle className="w-5 h-5 mr-2" />
          List a New Service
        </Button>
      </div>

      {/* --- Service Cards Grid --- */}
      {dummyServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 bg-white/40 rounded-2xl">
          <p className="font-medium">You have not listed any services yet.</p>
        </div>
      )}
    </div>
  );
};

export default Services;