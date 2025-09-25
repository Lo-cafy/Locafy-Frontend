"use client";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";

interface Category {
  category_id: number;
  name: string;
}

interface Props {
  categories: Category[];
  filters: { categoryId?: number };
  setFilters: (filters: { categoryId?: number }) => void;
}

export default function CategoryFilter({ categories, filters, setFilters }: Props) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Categories</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
        {categories.map((c) => (
          <div key={c.category_id} className="flex items-center gap-2">
            <Checkbox
              id={`cat-${c.category_id}`}
              checked={filters.categoryId === c.category_id}
              onCheckedChange={(checked) =>
                setFilters({
                  categoryId: checked ? c.category_id : undefined,
                })
              }
            />
            <Label htmlFor={`cat-${c.category_id}`} className="cursor-pointer">
              {c.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
