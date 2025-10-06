"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "@/Components/Services/sidebar";
import ServiceCard from "@/Components/Services/serviceCard";
import SearchBar from "@/Components/Services/searchBar";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category_id: number;
  location?: string;
  image?: string;
  isFeatured?: boolean;
}

interface Filters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export default function ServiceListingPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let url = filters.categoryId 
          ? `https://back-end-service-listing.onrender.com/api/services/category/${filters.categoryId}`
          : "https://back-end-service-listing.onrender.com/api/services";
        
        const res = await axios.get(url);
        let apiServices = extractServicesArray(res.data);

        if (!Array.isArray(apiServices)) {
          setError("Invalid data format received");
          setServices([]);
          return;
        }

        const servicesWithImages = await Promise.all(
          apiServices.map(async (service: any) => {
            const serviceId = service.service_id;
            if (!serviceId) {
              return { 
                ...service, 
                id: serviceId, 
                location: service.location_text, 
                image: "" 
              };
            }

            try {
              const photoRes = await axios.get(`https://back-end-service-listing.onrender.com/api/photoservices/${serviceId}/photos`);
              const photos = extractPhotosArray(photoRes.data);
              const primaryPhoto = photos.find((p: any) => p.is_primary) || photos[0];

              return {
                ...service,
                id: serviceId,
                location: service.location_text,
                image: primaryPhoto?.photo_url || "",
              };
            } catch (err) {
              return { 
                ...service, 
                id: serviceId, 
                location: service.location_text, 
                image: "" 
              };
            }
          })
        );

        const filteredServices = applyFilters(servicesWithImages, filters, searchText);
        setServices(filteredServices);
        setError("");
      } catch (err) {
        setError("Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchServices, 300);
    return () => clearTimeout(timeoutId);
  }, [filters, searchText]);

  const extractServicesArray = (data: any): any[] => {
    if (Array.isArray(data)) return data;
    if (data?.services && Array.isArray(data.services)) return data.services;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (data?.results && Array.isArray(data.results)) return data.results;
    return [];
  };

  const extractPhotosArray = (data: any): any[] => {
    if (data?.data?.photos && Array.isArray(data.data.photos)) return data.data.photos;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (Array.isArray(data)) return data;
    if (data?.photos && Array.isArray(data.photos)) return data.photos;
    return [];
  };

  const applyFilters = (services: any[], filters: Filters, searchText: string) => {
    let filtered = services.filter((s: any) => {
      const price = Number(s.price) || 0;
      const rating = Number(s.rating) || 0;
      
      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;
      if (filters.minRating && rating < filters.minRating) return false;
      return true;
    });

    if (searchText.trim()) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter((s: any) =>
        (s.title && s.title.toLowerCase().includes(text)) || 
        (s.description && s.description.toLowerCase().includes(text))
      );
    }

    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case "price-low":
          filtered.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
          break;
        case "price-high":
          filtered.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
          break;
        case "rating":
          filtered.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
          break;
        case "newest":
          // Assuming there's a created_at or similar field
          filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
          break;
      }
    }

    return filtered;
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchText("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6">
        <Sidebar filters={filters} setFilters={setFilters} />
        
        <div className="flex-1 min-w-0">
          <div className="mb-4 sm:mb-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center hover:text-green-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Services</span>
              {filters.categoryId && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-green-600 font-medium">Category</span>
                </>
              )}
            </nav>

            {/* Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Services</h1>
                {searchText && (
                  <p className="text-gray-600 mt-1">
                    Search results for "<span className="font-medium text-green-600">{searchText}</span>"
                  </p>
                )}
              </div>
              <button 
                onClick={handleGoBack} 
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium hidden sm:inline">Back</span>
              </button>
            </div>
            
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>

          {!loading && !error && (
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600">
                Showing {services.length} service{services.length !== 1 ? 's' : ''}
                {searchText && <span> for "<strong>{searchText}</strong>"</span>}
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-8 sm:py-16">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
              <p className="text-red-600 font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : services.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No services found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
              <button 
                onClick={clearAllFilters} 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {services.map((s, index) => (
                <div 
                  key={s.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4 mb-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ServiceCard
                    id={s.id}
                    name={s.title}
                    location={s.location || "Unknown location"}
                    price={Number(s.price)}
                    rating={Number(s.rating)}
                    image={s.image}
                    isFeatured={s.isFeatured}
                    providerName={`${s.title.split(' ')[0]}'s Services`}
                    reviewCount={Math.floor(Math.random() * 100) + 10}
                    completionTime={`${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 5) + 2} days`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}