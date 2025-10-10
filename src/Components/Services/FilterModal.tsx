import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Button } from "@/ui/button";
import CategoryFilter from "./CategoryFilter";
import type { Filters } from "@/types/services";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  categories: { id: number; name: string }[];
  categoriesLoading: boolean;
  categoriesError: string;
}

export default function FilterModal({ 
  isOpen, 
  onClose, 
  filters, 
  setFilters, 
  categories, 
  categoriesLoading, 
  categoriesError 
}: FilterModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Category */}
          <CategoryFilter 
            categories={categories} 
            filters={filters} 
            setFilters={setFilters} 
            isLoading={categoriesLoading} 
            error={categoriesError} 
          />
          
          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <div className="flex gap-2">
              <Button variant={filters.minPrice === 0 && filters.maxPrice === 50 ? "default" : "outline"} onClick={() => setFilters({ ...filters, minPrice: 0, maxPrice: 50 })}>Under $50</Button>
              <Button variant={filters.minPrice === 50 && filters.maxPrice === 100 ? "default" : "outline"} onClick={() => setFilters({ ...filters, minPrice: 50, maxPrice: 100 })}>$50-$100</Button>
              <Button variant={filters.minPrice === 100 && filters.maxPrice === 200 ? "default" : "outline"} onClick={() => setFilters({ ...filters, minPrice: 100, maxPrice: 200 })}>$100-$200</Button>
            </div>
          </div>
          
          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            <div className="flex gap-2">
              {[4,3,2,1].map(r => (
                <Button key={r} variant={filters.minRating === r ? "default" : "outline"} onClick={() => setFilters({ ...filters, minRating: filters.minRating === r ? undefined : r })}>{r}+</Button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => setFilters({})}>Clear all</Button>
            <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white">Apply</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
