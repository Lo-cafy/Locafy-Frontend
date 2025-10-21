 
 
 
"use client";
import { useState, useEffect, useCallback } from "react";
 
 
 
import api  from "@/Api/baseurl";
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

  const extractServicesArray = useCallback((data: unknown): Array<Record<string, unknown>> => {
    if (Array.isArray(data)) return data as Array<Record<string, unknown>>;
    if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      if (Array.isArray(d.services)) return d.services as Array<Record<string, unknown>>;
      if (Array.isArray(d.data)) return d.data as Array<Record<string, unknown>>;
      if (Array.isArray(d.results)) return d.results as Array<Record<string, unknown>>;
    }
    return [];
  }, []);

  interface Photo { photo_url?: string; is_primary?: boolean }
  const extractPhotosArray = useCallback((data: unknown): Photo[] => {
    if (Array.isArray(data)) return data as Photo[];
    if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      const nested = d.data;
      if (nested && typeof nested === "object" && !Array.isArray(nested)) {
        const photos = (nested as Record<string, unknown>).photos as unknown;
        if (Array.isArray(photos)) return photos as Photo[];
      }
      if (Array.isArray(nested as unknown[])) return nested as Photo[];
      if (Array.isArray(d.photos as unknown[])) return d.photos as Photo[];
    }
    return [];
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const url = filters.categoryId
          ? `/api/services/category/${filters.categoryId}`
          : "/api/services";

        const res = await api.get(url);
        const apiServices = extractServicesArray(res.data);

        if (!Array.isArray(apiServices)) {
          setError("Invalid data format received");
          setServices([]);
          return;
        }

        const servicesWithImages: Service[] = await Promise.all(
          apiServices.map(async (service: Record<string, unknown>) => {
            const serviceId = (service as { service_id?: number; id?: number }).service_id ?? (service as { id?: number }).id ?? 0;
            const title = (service as { title?: string; name?: string }).title ?? (service as { name?: string }).name ?? "Untitled";
            const description = (service as { description?: string }).description ?? "";
            const priceRaw = (service as { price?: number | string }).price;
            const price = typeof priceRaw === 'number' ? priceRaw : parseFloat(String(priceRaw ?? 0)) || 0;
            const ratingRaw = (service as { rating?: number | string }).rating;
            const rating = typeof ratingRaw === 'number' ? ratingRaw : parseFloat(String(ratingRaw ?? 0)) || 0;
            const categoryId = (service as { category_id?: number }).category_id ?? 0;
            const locationText = (service as { location_text?: string; location?: string }).location_text ?? (service as { location?: string }).location ?? "Unknown location";
            if (!serviceId) {
              return {
                id: 0,
                title: String(title),
                description: String(description),
                price: Number(price),
                rating: Number(rating),
                category_id: Number(categoryId),
                location: String(locationText),
                image: "",
                isFeatured: false,
              };
            }

            try {
              const photoRes = await api.get(
                `/api/photoservices/${serviceId}/photos`
              );
              const photos = extractPhotosArray(photoRes.data);
              const primaryPhoto = photos.find((p) => p.is_primary) || photos[0];

              return {
                id: Number(serviceId),
                title: String(title),
                description: String(description),
                price: Number(price),
                rating: Number(rating),
                category_id: Number(categoryId),
                location: String(locationText),
                image: (primaryPhoto?.photo_url as string) || "",
                isFeatured: false,
              };
            } catch {
              return {
                id: Number(serviceId),
                title: String(title),
                description: String(description),
                price: Number(price),
                rating: Number(rating),
                category_id: Number(categoryId),
                location: String(locationText),
                image: "",
                isFeatured: false,
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
      } catch {
        setError("Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchServices, 300);
    return () => clearTimeout(timeoutId);
  }, [filters, searchText, extractPhotosArray, extractServicesArray]);

  

  const applyFilters = (
    services: Service[],
    filters: Filters,
    searchText: string
  ) => {
    let filtered = services.filter((s) => {
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
      filtered = filtered.filter((s) =>
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
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back</span>
              </button>
              <button
                onClick={() => window.location.href = '/my-bookings'}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
              >
                My Bookings
              </button>
            </div>
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