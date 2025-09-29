"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/Components/Services/sidebar"
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
export default function ServiceListingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<{
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }>({});
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Function to go back to previous page
  const handleGoBack = () => {
    window.history.back();
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let url = "http://localhost:5000/api/services";
        if (filters.categoryId) {
          url = `http://localhost:5000/api/services/category/${filters.categoryId}`;
        }
        const res = await axios.get(url);
        let apiServices = res.data.services || res.data;

        // Fetch images for each service
        const servicesWithImages = await Promise.all(
          apiServices.map(async (service: any) => {
            try {
              const photoRes = await axios.get(
                `http://localhost:5000/api/photoservices/${service.id}/photos`
              );
              const photos = photoRes.data.data.photos || [];
              const primaryPhoto = photos.find((p: any) => p.is_primary) || photos[0];

              return {
                ...service,
                image: primaryPhoto ? primaryPhoto.photo_url : "",
              };
            } catch (err) {
              console.error("Failed to fetch photos for service", service.id);
              return { ...service, image: "" };
            }
          })
        );

        // Apply filters
        let filteredServices = servicesWithImages.filter((s: any) => {
          const price = Number(s.price);
          const rating = Number(s.rating);
          if (filters.minPrice && price < filters.minPrice) return false;
          if (filters.maxPrice && price > filters.maxPrice) return false;
          if (filters.minRating && rating < filters.minRating) return false;
          return true;
        });
        // Apply search text filter
        if (searchText.trim()) {
          const text = searchText.toLowerCase();
          filteredServices = filteredServices.filter(
            (s: any) =>
              s.title.toLowerCase().includes(text) ||
              s.description.toLowerCase().includes(text)
          );
        }

        setServices(filteredServices);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, searchText]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Sidebar */}
        <Sidebar filters={filters} setFilters={setFilters} />

        {/* Main Content */}
        <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex overflow */}
          {/* Header with Back Button */}
          <div className="mb-4 sm:mb-6">
            {/* Back Button */}
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-3 sm:mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Services</h1>

            {/* Search bar */}
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>

          {/* Results Info */}
          {!loading && !error && (
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600">
                Showing {services.length} service{services.length !== 1 ? 's' : ''}
                {searchText && (
                  <span> for "<strong>{searchText}</strong>"</span>
                )}
              </p>
            </div>
          )}
          {/* Loading, Error, and Results */}
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
                onClick={() => { setFilters({}); setSearchText(""); }}
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
                  id={s.id} // <-- Pass the id here
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