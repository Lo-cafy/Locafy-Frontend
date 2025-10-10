"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/Components/Services/sidebar";
import ServicesHeader from "@/Components/Services/ServicesHeader";
import FilterModal from "@/Components/Services/FilterModal";
import ServicesGrid from "@/Components/Services/ServicesGrid";
import type { Filters } from "@/types/services";
import { useDebounce } from "@/hooks/debouncing";
import { Navbar } from "@/Components/Navbar";
import { useAuthStore } from "@/store/authStore";
import { useServicesData } from "@/hooks/services/useServicesData";
import { useServicesFiltering } from "@/hooks/services/useServicesFiltering";
import { useCategories } from "@/hooks/services/useCategories";

export default function ServiceListingPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(searchText, 300);
  const debouncedLocation = useDebounce(locationText, 300);
  const { hydrateFromStorage } = useAuthStore();

  // Custom hooks
  const { services, loading, error, refetch } = useServicesData(filters, debouncedSearch, debouncedLocation);
  const filteredServices = useServicesFiltering(services, filters, debouncedSearch, debouncedLocation);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  const clearAllFilters = () => {
    setFilters({});
    setSearchText("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        showSearch={true} 
        searchText={searchText}
        onSearchTextChange={setSearchText}
        locationText={locationText}
        onLocationTextChange={setLocationText}
      />
      <div className="px-3 sm:px-2 pt-24 sm:pt-20 lg:pt-24 pb-4 sm:py-1 lg:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Desktop sidebar only */}
        <div className="hidden lg:block">
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>

        <div className="flex-1 min-w-0">
          <ServicesHeader filters={filters} onFilterOpen={() => setIsFilterOpen(true)} />

          <FilterModal 
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            categoriesLoading={categoriesLoading}
            categoriesError={categoriesError}
          />

          {!loading && !error && (
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600">
                Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                {searchText && <span> for "<strong>{searchText}</strong>"</span>}
              </p>
            </div>
          )}

          <ServicesGrid
            services={filteredServices}
            loading={loading}
            error={error}
            onRetry={refetch}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>
    </div>
  );
}