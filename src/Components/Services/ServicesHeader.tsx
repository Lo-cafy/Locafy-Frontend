import { Button } from "@/ui/button";
import type { Filters } from "@/types/services";

interface ServicesHeaderProps {
  filters: Filters;
  onFilterOpen: () => void;
}

export default function ServicesHeader({ filters, onFilterOpen }: ServicesHeaderProps) {
  return (
    <>
      {/* Quote */}
      <div className="mb-4 sm:mb-6">
        <p className="text-xl sm:text-2xl text-emerald-700 italic font-serif">
          "Connecting communities with trusted local services."
        </p>
      </div>

      {/* Mobile/Tablet filter bar */}
      <div className="lg:hidden mb-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.categoryId != null && (
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Category</span>
          )}
          {filters.minPrice != null || filters.maxPrice != null ? (
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Price</span>
          ) : null}
          {filters.minRating != null && (
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Rating {filters.minRating}+</span>
          )}
          {filters.sort && (
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Sort</span>
          )}
        </div>
        <Button variant="default" onClick={onFilterOpen} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Filters
        </Button>
      </div>
    </>
  );
}
