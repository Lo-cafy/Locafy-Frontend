import type { ServiceType } from "./service";
import type { Filters, Category } from "./filters";

export interface ServicesHeaderProps {
  filters: Filters;
  onFilterOpen: () => void;
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string;
}

export interface ServicesGridProps {
  services: ServiceType[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  onClearFilters: () => void;
  searchText: string;
}

export interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}


