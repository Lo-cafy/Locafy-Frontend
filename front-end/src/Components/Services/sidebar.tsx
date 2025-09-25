"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SlidersHorizontal, X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

interface Category {
  category_id: number;
  name: string;
}

interface Filters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

interface Props {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function Sidebar({ filters, setFilters }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const clearAll = () => setFilters({});

  const content = (
    <div>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <CategoryFilter categories={categories} filters={filters} setFilters={setFilters} />
          <PriceFilter filters={filters} setFilters={setFilters} />
          <RatingFilter filters={filters} setFilters={setFilters} />
        </>
      )}

      <button
        onClick={clearAll}
        className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block p-6 bg-slate-50 border rounded-xl shadow w-72 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        {content}
      </div>

      {/* Mobile Icon Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Modal Dialog */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">Filters</h2>
            {content}

            <button
              onClick={() => setIsMobileOpen(false)}
              className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
