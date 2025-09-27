import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
// import { Skeleton } from "@/ui/skeleton"; // You might need to import or create this

interface Props {
  categories: { id: number; name: string }[];
  filters: any;
  setFilters: (filters: any) => void;
  isLoading?: boolean;
  error?: string;
}

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
          {categories.map(c => (
            <div key={c.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${c.id}`}
                checked={filters.categoryId === c.id}
                onCheckedChange={checked =>
                  setFilters({ ...filters, categoryId: checked ? c.id : undefined })
                }
              />
              <Label htmlFor={`cat-${c.id}`} className="cursor-pointer">{c.name}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}