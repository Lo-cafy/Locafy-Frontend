import { useMemo } from "react";
import type { ServiceType, Filters } from "@/types/services";

export function useServicesFiltering(
  services: ServiceType[], 
  filters: Filters, 
  searchText: string, 
  locationText: string
) {
  return useMemo(() => {
    let filtered = services.filter((s) => {
      const price = Number(s.price) || 0;
      const rating = Number(s.rating) || 0;
      if (filters.minPrice != null && price < filters.minPrice) return false;
      if (filters.maxPrice != null && price > filters.maxPrice) return false;
      if (filters.minRating != null && rating < filters.minRating) return false;
      return true;
    });

    const text = searchText.trim().toLowerCase();
    if (text) {
      filtered = filtered.filter((s) =>
        (s.title && s.title.toLowerCase().includes(text)) ||
        (s.description && s.description.toLowerCase().includes(text))
      );
    }

    const loc = (locationText || filters.locationText || "").trim().toLowerCase();
    if (loc) {
      filtered = filtered.filter((s) => s.location?.toLowerCase().includes(loc));
    }

    switch (filters.sort) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        // Without createdAt, keep current order; placeholder for future backend support
        break;
      default:
        break;
    }

    return filtered;
  }, [services, filters, searchText, locationText]);
}
