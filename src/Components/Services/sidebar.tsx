"use client";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import api  from "@/Api/baseurl";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

// Define a specific type for the filters object
type Filters = {
  sort?: string;
  categoryId?: number | null;
  minPrice?: number;
  maxPrice?: number;
  rating?: number | null;
  [key: string]: unknown; // Allows for other potential filter properties
};

// Use the correct React types for the state setter
interface Props {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  onClearFilters: () => void;
}

interface Category {
  id: number;
  name: string;
}

export default function Sidebar({ filters, setFilters, onClearFilters }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");
  const [categoryServices, setCategoryServices] = useState<unknown[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState("");

  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    price: false,
    rating: false,
    sort: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError("");
        const res = await api.get(
          "/categories"
        );
        let categoriesData = res.data;

        if (res.data.categories && Array.isArray(res.data.categories))
          categoriesData = res.data.categories;
        else if (res.data.data && Array.isArray(res.data.data))
          categoriesData = res.data.data;
        else if (res.data.results && Array.isArray(res.data.results))
          categoriesData = res.data.results;

        if (!Array.isArray(categoriesData)) {
          setCategoriesError("Invalid categories data format");
          return setCategories([]);
        }

        setCategories(
          categoriesData.map((cat: Record<string, unknown>) => ({
            id: (cat as { category_id?: number; id?: number }).category_id ?? (cat as { id?: number }).id ?? 0,
            name:
              (cat as { name?: string }).name ??
              (cat as { category_name?: string }).category_name ??
              "Unnamed Category",
          }))
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setCategoriesError(`Failed to load categories: ${message}`);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchServicesByCategory = async () => {
      if (!filters.categoryId) return setCategoryServices([]);
      try {
        setServicesLoading(true);
        setServicesError("");
        const res = await api.get(
          `/services/category/${filters.categoryId}`
        );
        let servicesData = res.data;
        if (res.data.services && Array.isArray(res.data.services))
          servicesData = res.data.services;
        else if (res.data.data && Array.isArray(res.data.data))
          servicesData = res.data.data;
        setCategoryServices(Array.isArray(servicesData) ? (servicesData as unknown[]) : []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setServicesError(`Failed to load services: ${message}`);
        setCategoryServices([]);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServicesByCategory();
  }, [filters.categoryId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('[data-mobile-filters]');
      const toggle = document.getElementById('mobile-toggle');
      if (
        isMobileOpen &&
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        toggle &&
        !toggle.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileOpen]);

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Sort options
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ];

  const handleSortChange = (sortValue: string) => {
    setFilters((prev) => ({ ...prev, sort: sortValue }));
  };

  const CollapsibleSection = ({
    title,
    isCollapsed,
    onToggle,
    children,
  }: {
    title: string;
    isCollapsed: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-800 hover:text-green-600 transition-colors"
      >
        <span>{title}</span>
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {!isCollapsed && (
        <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );

  const FilterContent = () => (
    <>
      {/* Quick Sort */}
      <CollapsibleSection
        title="Sort By"
        isCollapsed={collapsedSections.sort}
        onToggle={() => toggleSection("sort")}
      >
        <select
          value={filters.sort || ""}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
        >
          <option value="">Default</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </CollapsibleSection>

      {/* Categories */}
      <CollapsibleSection
        title="Categories"
        isCollapsed={collapsedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <CategoryFilter
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          isLoading={categoriesLoading}
          error={categoriesError}
        />
      </CollapsibleSection>

      {/* Price Range */}
      <CollapsibleSection
        title="Price Range"
        isCollapsed={collapsedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <PriceFilter filters={filters} setFilters={setFilters} />
      </CollapsibleSection>

      {/* Rating */}
      <CollapsibleSection
        title="Minimum Rating"
        isCollapsed={collapsedSections.rating}
        onToggle={() => toggleSection("rating")}
      >
        <RatingFilter filters={filters} setFilters={setFilters} />
      </CollapsibleSection>

      {/* Status Messages */}
      {servicesLoading && (
        <p className="mt-4 text-sm text-gray-500">Loading services...</p>
      )}
      {servicesError && (
        <p className="mt-4 text-sm text-red-500">{servicesError}</p>
      )}
      {categoryServices.length > 0 && (
        <p className="mt-4 text-sm text-green-600">
          {categoryServices.length} services found in this category
        </p>
      )}
      {categoriesError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Categories Error:</p>
          <p className="text-xs text-red-500 mt-1">{categoriesError}</p>
        </div>
      )}
    </>
  );

  return (
    <div className="h-full">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-full border-r">
        <div className="h-full flex flex-col">
          <div className="p-6 flex-shrink-0 bg-white">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 bg-white">
            <FilterContent />
          </div>
          <div className="p-6 flex-shrink-0 border-t bg-white">
            <button
              onClick={onClearFilters}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Filter Button */}
        <div className="sticky top-0 z-40">
          <div className="p-4 bg-white/95 backdrop-blur-md shadow-sm">
            <button
              id="mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`w-full bg-white/80 backdrop-blur-sm border py-2.5 px-4 rounded-lg font-medium flex items-center justify-between transition-all duration-300 ${
                isMobileOpen 
                  ? 'border-green-600 text-green-600 shadow-md' 
                  : 'border-gray-200/80 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>{isMobileOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </div>
              {isMobileOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isMobileOpen && (
          <div className="fixed inset-x-0 top-[calc(4rem+65px)] z-50">
            {/* Backdrop */}
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/70"
              onClick={() => setIsMobileOpen(false)}
            />
            
            {/* Content */}
            <div className="relative mx-4">
              <div className="bg-white/95 rounded-lg shadow-lg flex flex-col max-h-[85vh]">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <FilterContent />
                  </div>
                </div>

                {/* Fixed Bottom Buttons */}
                <div className="p-4 border-t bg-white/95 backdrop-blur-sm flex gap-2 sticky bottom-0 rounded-b-lg">
                  <button
                    onClick={() => {
                      onClearFilters();
                      setIsMobileOpen(false);
                    }}
                    className="flex-1 bg-white text-gray-700 py-2.5 px-4 rounded-lg font-medium border hover:bg-gray-50 transition-colors text-sm shadow-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-colors text-sm shadow-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}