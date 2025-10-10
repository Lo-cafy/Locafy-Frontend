export type SortOption = "" | "price-low" | "price-high" | "rating" | "newest";

export interface Filters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: SortOption;
  locationText?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  isLoading?: boolean;
  error?: string;
}

export interface PriceFilterProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export interface RatingFilterProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export interface SidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}


