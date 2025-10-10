import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import type { Filters } from "@/types/services/filters";
import {
  Paintbrush,
  Hammer,
  Leaf,
  Wrench,
  Sparkles,
  Car,
  Home,
  Heart,
  Camera,
  Music,
  BookOpen,
  Briefcase,
  Utensils,
  Shirt,
  Laptop
} from "lucide-react";

interface Props {
  categories: { id: number; name: string }[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  isLoading?: boolean;
  error?: string;
}

// Icon mapping for categories
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  if (name.includes('paint') || name.includes('painting')) return Paintbrush;
  if (name.includes('carpent') || name.includes('wood') || name.includes('furniture')) return Hammer;
  if (name.includes('garden') || name.includes('landscap') || name.includes('plant')) return Leaf;
  if (name.includes('plumb') || name.includes('electr') || name.includes('repair')) return Wrench;
  if (name.includes('clean') || name.includes('housekeep')) return Sparkles;
  if (name.includes('auto') || name.includes('car') || name.includes('vehicle')) return Car;
  if (name.includes('home') || name.includes('interior') || name.includes('design')) return Home;
  if (name.includes('health') || name.includes('fitness') || name.includes('wellness')) return Heart;
  if (name.includes('photo') || name.includes('video') || name.includes('media')) return Camera;
  if (name.includes('music') || name.includes('audio') || name.includes('sound')) return Music;
  if (name.includes('educat') || name.includes('tutor') || name.includes('learn')) return BookOpen;
  if (name.includes('busines') || name.includes('consult') || name.includes('legal')) return Briefcase;
  if (name.includes('food') || name.includes('cater') || name.includes('cook')) return Utensils;
  if (name.includes('fashion') || name.includes('cloth') || name.includes('style')) return Shirt;
  if (name.includes('tech') || name.includes('computer') || name.includes('software')) return Laptop;

  return Wrench; // Default icon
};

export default function CategoryFilter({
  categories,
  filters,
  setFilters,
  isLoading = false,
  error
}: Props) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Categories</h3>

     {isLoading ? (
  <div className="space-y-2">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="flex items-center gap-2 animate-pulse">
        <div className="h-4 w-4 bg-slate-200 rounded"></div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
      </div>
    ))}
  </div>
      ) : error ? (
        // Error state
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
          <p>Failed to load categories</p>
          <button
            onClick={() => window.location.reload()}
            className="text-red-700 underline mt-1"
          >
            Try again
          </button>
        </div>
      ) : categories.length === 0 ? (
        // Empty state
        <p className="text-sm text-slate-500">No categories available</p>
      ) : (
        // Success state
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {categories.map(c => {
            const IconComponent = getCategoryIcon(c.name);
            return (
              <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`cat-${c.id}`}
                  checked={filters.categoryId === c.id}
                  onCheckedChange={checked =>
                    setFilters({ ...filters, categoryId: checked ? c.id : undefined })
                  }
                />
                <IconComponent className="h-4 w-4 text-green-600 flex-shrink-0" />
                <Label htmlFor={`cat-${c.id}`} className="cursor-pointer text-sm flex-1">{c.name}</Label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
