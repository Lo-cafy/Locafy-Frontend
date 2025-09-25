"use client";

interface Props {
  filters: { minPrice?: number; maxPrice?: number };
  setFilters: (filters: any) => void;
}

export default function PriceFilter({ filters, setFilters }: Props) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setFilters({ ...filters, minPrice: value });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setFilters({ ...filters, maxPrice: value });
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="flex gap-2 flex-wrap">
        <input
          type="number"
          placeholder="Min"
          value={filters.minPrice ?? ""}
          onChange={handleMinChange}
          className="w-full sm:w-[calc(50%-0.5rem)] p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.maxPrice ?? ""}
          onChange={handleMaxChange}
          className="w-full sm:w-[calc(50%-0.5rem)] p-2 border rounded"
        />
      </div>
    </div>
  );
}
