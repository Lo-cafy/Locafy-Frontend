import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";

interface Props {
  filters: any;
  setFilters: (filters: any) => void;
}

export default function RatingFilter({ filters, setFilters }: Props) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Minimum Rating</h3>
      <div className="space-y-2">
        {[4, 3, 2, 1].map(r => (
          <div key={r} className="flex items-center gap-2">
            <Checkbox
              id={`rating-${r}`}
              checked={filters.minRating === r}
              onCheckedChange={checked =>
                setFilters({ ...filters, minRating: checked ? r : undefined })
              }
            />
            <Label htmlFor={`rating-${r}`} className="cursor-pointer">{r}+ ⭐</Label>
          </div>
        ))}
      </div>
    </div>
  );
}