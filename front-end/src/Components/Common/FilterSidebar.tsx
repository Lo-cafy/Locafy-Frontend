import { useState } from 'react';
import { Filter, Star } from 'lucide-react'; 
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Checkbox } from '@/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateFilter, clearFilters } from '@/store/serviceStore';

const categories = [
  { id: 1, name: 'Plumbing' },
  { id: 2, name: 'Electrical' },
  { id: 3, name: 'Cleaning' },
  { id: 4, name: 'Painting' },
  { id: 5, name: 'Carpentry' },
  { id: 6, name: 'AC Repair' },
  { id: 7, name: 'Appliance Repair' },
  { id: 8, name: 'Pest Control' },
];

export const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.services.filters);
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice?.toString() || '',
    max: filters.maxPrice?.toString() || '',
  });

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      dispatch(updateFilter({ categoryId }));
    } else if (filters.categoryId === categoryId) {
      dispatch(updateFilter({ categoryId: undefined }));
    }
  };

  const handlePriceChange = () => {
    dispatch(updateFilter({
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(clearFilters())}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear all
        </Button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Categories</Label>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categoryId === category.id}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Price Range</Label>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-24"
          />
          <span className="text-gray-500">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-24"
          />
          <Button
            size="sm"
            onClick={handlePriceChange}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Distance */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Distance</Label>
        <div className="space-y-3">
          {[5, 10, 20, 50].map((km) => (
            <div key={km} className="flex items-center space-x-2">
              <Checkbox
                id={`distance-${km}`}
                checked={filters.radiusKm === km}
                onCheckedChange={(checked) => 
                  dispatch(updateFilter({ radiusKm: checked ? km : undefined }))
                }
              />
              <Label
                htmlFor={`distance-${km}`}
                className="text-sm font-normal cursor-pointer"
              >
                Within {km} km
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Rating</Label>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) => 
                  dispatch(updateFilter({ minRating: checked ? rating : undefined }))
                }
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-normal cursor-pointer flex items-center"
              >
                {rating}+ <Star className="w-4 h-4 text-yellow-400 ml-1" />
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};