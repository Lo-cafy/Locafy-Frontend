interface Props {
  filters: any;
  setFilters: (filters: any) => void;
}

export default function PriceFilter({ filters, setFilters }: Props) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="space-y-3">
        <input
          type="number"
          placeholder="Min"
          value={filters.minPrice || ""}
          onChange={e => setFilters({ ...filters, minPrice: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.maxPrice || ""}
          onChange={e => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}