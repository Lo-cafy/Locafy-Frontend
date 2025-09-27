"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

interface Props {
  filters: any;
  setFilters: (filters: any) => void;
}
interface ApiCategory {
  category_id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
}
export default function Sidebar({ filters, setFilters }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");
  const [categoryServices, setCategoryServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState("");
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(
          res.data.categories.map((cat: ApiCategory) => ({
            id: cat.category_id,
            name: cat.name,
          }))
        );
      } catch (err) {
        setCategoriesError("Failed to load categories. Please try again.");
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);
  // Fetch services by category
  useEffect(() => {
    const fetchServicesByCategory = async () => {
      if (!filters.categoryId) return setCategoryServices([]);
      try {
        setServicesLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/services/category/${filters.categoryId}`
        );
        setCategoryServices(res.data);
      } catch (err) {
        setServicesError("Failed to load services. Please try again.");
        setCategoryServices([]);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServicesByCategory();
  }, [filters.categoryId]);

  const clearAll = () => setFilters({});
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const toggle = document.getElementById("mobile-toggle");
      if (
        isMobileOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggle &&
        !toggle.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  // ✅ Reusable FilterContent block
  const FilterContent = () => (
    <>
      <CategoryFilter
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        isLoading={categoriesLoading}
        error={categoriesError}
      />
      <PriceFilter filters={filters} setFilters={setFilters} />
      <RatingFilter filters={filters} setFilters={setFilters} />
      {servicesLoading && <p className="mt-4 text-sm text-gray-500">Loading services...</p>}
      {servicesError && <p className="mt-4 text-sm text-red-500">{servicesError}</p>}
      {categoryServices.length > 0 && (
        <p className="mt-4 text-sm text-green-600">
          {categoryServices.length} services found in this category
        </p>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden sticky top-4 z-40 mb-4 px-4">
        <button
          id="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:p-6 lg:bg-slate-50 lg:border lg:rounded-xl lg:shadow flex-shrink-0 sticky top-4 h-fit">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <FilterContent />
        <button
          onClick={clearAll}
          className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-colors"
        >
          Reset Filters
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white w-4/5 max-w-xs shadow-xl flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Shared Filter Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <FilterContent />
        </div>
        {/* Buttons */}
        <div className="p-4 border-t bg-white">
          <button
            onClick={clearAll}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold mb-2 hover:bg-gray-200 transition-colors"
          >
            Reset Filters
          </button>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
