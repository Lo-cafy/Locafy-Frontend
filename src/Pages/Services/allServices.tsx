"use client";
import { useState, useEffect } from "react";
import { listingApi as api } from "@/Api/baseurl";
import Sidebar from "@/Components/Services/sidebar";
import ServiceCard from "@/Components/Services/serviceCard";
import SearchBar from "@/Components/Services/searchBar";
import { ArrowLeft } from "lucide-react";

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

// Use a consistent and more comprehensive Filters type
type Filters = {
  categoryId?: number | null;
  minPrice?: number;
  maxPrice?: number;
  rating?: number | null;
  sort?: string;
};

export default function ServiceListingPage() {
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
          ? `/api/services/category/${filters.categoryId}`
          : "/api/services";

        const res = await api.get(url);
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
                image: "",
              };
            }

            try {
              const photoRes = await api.get(
                `/api/photoservices/${serviceId}/photos`
              );
              const photos = extractPhotosArray(photoRes.data);
              const primaryPhoto =
                photos.find((p: any) => p.is_primary) || photos[0];

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
                image: "",
              };
            }
          })
        );

        const filteredServices = applyFilters(
          servicesWithImages,
          filters,
          searchText
        );
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
    if (data?.data?.photos && Array.isArray(data.data.photos))
      return data.data.photos;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (Array.isArray(data)) return data;
    if (data?.photos && Array.isArray(data.photos)) return data.photos;
    return [];
  };

  const applyFilters = (
    services: any[],
    filters: Filters,
    searchText: string
  ) => {
    let filtered = services.filter((s: any) => {
      const price = Number(s.price) || 0;
      const rating = Number(s.rating) || 0;

      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;
      // Changed filters.minRating to filters.rating
      if (filters.rating && rating < filters.rating) return false;
      return true;
    });

    if (searchText.trim()) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (s: any) =>
          (s.title && s.title.toLowerCase().includes(text)) ||
          (s.description && s.description.toLowerCase().includes(text))
      );
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
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-3 sm:mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Services
            </h1>
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>

          {!loading && !error && (
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600">
                Showing {services.length} service{services.length !== 1 ? "s" : ""}
                {searchText && (
                  <span>
                    {" "}
                    for "<strong>{searchText}</strong>"
                  </span>
                )}
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
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                No services found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {services.map((s) => (
                <ServiceCard
                  key={s.id}
                  id={s.id}
                  name={s.title}
                  location={s.location || "Unknown location"}
                  price={Number(s.price)}
                  rating={Number(s.rating)}
                  image={s.image}
                  isFeatured={s.isFeatured}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}