"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

interface Props { filters: any; setFilters: (filters: any) => void; }
interface Category { id: number; name: string; }

export default function Sidebar({ filters, setFilters }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");
  const [categoryServices, setCategoryServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError("");
        const res = await axios.get("https://back-end-service-listing.onrender.com/api/categories");
        let categoriesData = res.data;
        
        if (res.data.categories && Array.isArray(res.data.categories)) categoriesData = res.data.categories;
        else if (res.data.data && Array.isArray(res.data.data)) categoriesData = res.data.data;
        else if (res.data.results && Array.isArray(res.data.results)) categoriesData = res.data.results;
        
        if (!Array.isArray(categoriesData)) {
          setCategoriesError("Invalid categories data format");
          return setCategories([]);
        }

        setCategories(categoriesData.map((cat: any) => ({
          id: cat.category_id || cat.id,
          name: cat.name || cat.category_name || "Unnamed Category",
        })));
      } catch (err: any) {
        setCategoriesError(`Failed to load categories: ${err.message}`);
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
        const res = await axios.get(`https://back-end-service-listing.onrender.com/api/services/category/${filters.categoryId}`);
        let servicesData = res.data;
        if (res.data.services && Array.isArray(res.data.services)) servicesData = res.data.services;
        else if (res.data.data && Array.isArray(res.data.data)) servicesData = res.data.data;
        setCategoryServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (err: any) {
        setServicesError(`Failed to load services: ${err.message}`);
        setCategoryServices([]);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServicesByCategory();
  }, [filters.categoryId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const toggle = document.getElementById("mobile-toggle");
      if (isMobileOpen && sidebar && !sidebar.contains(event.target as Node) && toggle && !toggle.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  const FilterContent = () => (
    <>
      <CategoryFilter categories={categories} filters={filters} setFilters={setFilters} isLoading={categoriesLoading} error={categoriesError} />
      <PriceFilter filters={filters} setFilters={setFilters} />
      <RatingFilter filters={filters} setFilters={setFilters} />
      {servicesLoading && <p className="mt-4 text-sm text-gray-500">Loading services...</p>}
      {servicesError && <p className="mt-4 text-sm text-red-500">{servicesError}</p>}
      {categoryServices.length > 0 && <p className="mt-4 text-sm text-green-600">{categoryServices.length} services found in this category</p>}
      {categoriesError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Categories Error:</p>
          <p className="text-xs text-red-500 mt-1">{categoriesError}</p>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="lg:hidden sticky top-4 z-40 mb-4 px-4">
        <button id="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)} className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:p-6 lg:bg-slate-50 lg:border lg:rounded-xl lg:shadow flex-shrink-0 sticky top-4 h-fit">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <FilterContent />
        <button onClick={() => setFilters({})} className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-colors">
          Reset Filters
        </button>
      </aside>

      {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />}

      <div id="mobile-sidebar" className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} bg-white w-4/5 max-w-xs shadow-xl flex flex-col`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4"><FilterContent /></div>
        <div className="p-4 border-t bg-white">
          <button onClick={() => setFilters({})} className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold mb-2 hover:bg-gray-200 transition-colors">
            Reset Filters
          </button>
          <button onClick={() => setIsMobileOpen(false)} className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-colors">
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}