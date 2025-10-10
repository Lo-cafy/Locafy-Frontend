import ServiceCard from "./serviceCard";
import type { ServiceType } from "@/types/services";

interface ServicesGridProps {
  services: ServiceType[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  onClearFilters: () => void;
}

export default function ServicesGrid({ 
  services, 
  loading, 
  error, 
  onRetry, 
  onClearFilters
}: ServicesGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 sm:py-16">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          onClick={onRetry} 
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No services found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
        <button 
          onClick={onClearFilters} 
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
  );
}
