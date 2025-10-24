import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/Api/baseurl';
import { MapPin } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  location: string;
  image?: string;
}

interface SearchDropdownProps {
  searchQuery: string;
  onClose: () => void;
}

export function SearchDropdown({ searchQuery, onClose }: SearchDropdownProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      if (!searchQuery.trim()) {
        setServices([]);
        return;
      }

      setLoading(true);
      try {
        // Use regular services endpoint with filters
        const res = await api.get(`/services`);
        console.log('Search API response:', res.data);

        // Handle different response formats
        let data = [];
        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (typeof res.data === 'object') {
          data = res.data.services || res.data.data || [];
        }

        // Filter services based on search query
        const filteredServices = data.filter((service: any) => {
          const title = (service.title || service.name || '').toLowerCase();
          return title.includes(searchQuery.toLowerCase());
        });

        console.log('Filtered services:', filteredServices);

        // Map and transform the filtered data
        setServices(
          filteredServices
            .map((service: any) => ({
              id: service.service_id || service.id,
              title: service.title || service.name || 'Unnamed Service',
              location: service.location || service.location_text || 'Location not specified',
              image: service.image || service.photo_url
            }))
            .slice(0, 5)
        );
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchServices, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
    onClose();
  };

  // Always show dropdown when there's a search query, even if no results
  if (!searchQuery.trim()) {
    return null;
  }
  
  console.log('Current search state:', {
    query: searchQuery,
    loading,
    servicesCount: services.length
  });

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[400px] overflow-y-auto z-[60]">
      {loading ? (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="py-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="w-full px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-600 font-bold text-lg">
                    {service.title[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {service.title}
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{service.location}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}