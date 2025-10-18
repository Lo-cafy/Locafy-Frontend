// src/Pages/User/Services.tsx
import { useState } from 'react';
import { Wrench } from 'lucide-react';
import ServiceCard, { type Service } from '../../Components/ProviderDashboard/ServiceCard';
import ListServiceModal from '../../Components/ProviderDashboard/ListServiceModal';
import ServiceDetailsModal from '../../Components/ProviderDashboard/ServiceDetailsModal';
import ServiceEditModal from '../../Components/ProviderDashboard/ServiceEditModal';

// --- Dummy Data for Services ---
const dummyServices: Service[] = [
  { id: 'SVC01', name: 'Professional House Cleaning', category: 'Cleaning', price: 150, rating: 4.9, status: 'Active' },
  { id: 'SVC02', name: 'Advanced Plumbing Solutions', category: 'Plumbing', price: 80, rating: 4.8, status: 'Active' },
  { id: 'SVC03', name: 'Creative Landscaping', category: 'Gardening', price: 120, rating: 4.9, status: 'Paused' },
  { id: 'SVC04', name: 'Full-Stack Web Development', category: 'Tech', price: 500, rating: 5.0, status: 'Active' },
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(dummyServices);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleServiceAdded = (newService: Service) => {
    setServices(prev => [newService, ...prev]);
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setDetailsOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setEditOpen(true);
  };

  const handleSaveService = (updated: Service) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Wrench className="w-8 h-8 text-emerald-600" />
          My Services
        </h1>
        <ListServiceModal onServiceAdded={handleServiceAdded} />
      </div>

      {/* --- Service Cards Grid --- */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} onView={handleViewService} onEdit={handleEditService} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 bg-white/40 rounded-2xl">
          <p className="font-medium">You have not listed any services yet.</p>
        </div>
      )}

      <ServiceDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        service={selectedService}
      />

      <ServiceEditModal
        open={editOpen}
        onOpenChange={setEditOpen}
        service={selectedService}
        onSave={handleSaveService}
      />
    </div>
  );
};

export default Services;