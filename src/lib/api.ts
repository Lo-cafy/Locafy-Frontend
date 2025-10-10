import type { ServiceType } from "@/types/services";
import type { ApiService, ApiPhoto } from "@/types/api";
import { BASE_URL, API_ENDPOINTS } from "@/api/baseUrl";

export interface ApiService {
  service_id?: number;
  id?: number;
  title?: string;
  name?: string;
  price?: number | string;
  rating?: number | string;
  description?: string;
  location_text?: string;
  location?: string;
  category_id?: number;
  categoryId?: number;
  isFeatured?: boolean;
  providerName?: string;
  reviews?: number;
  duration?: string;
  image?: string;
}

export interface ApiPhoto {
  is_primary?: boolean;
  photo_url?: string;
  url?: string;
}

export function extractArray<T = any>(root: any, candidates: string[]): T[] {
  if (Array.isArray(root)) return root as T[];
  for (const key of candidates) {
    const value = key.split(".").reduce<any>((acc, k) => (acc ? acc[k] : undefined), root);
    if (Array.isArray(value)) return value as T[];
  }
  return [] as T[];
}

export function extractServicesArray(data: any): ApiService[] {
  return extractArray<ApiService>(data, [
    "services",
    "data.services",
    "data",
    "results",
  ]);
}

export function extractPhotosArray(data: any): ApiPhoto[] {
  return extractArray<ApiPhoto>(data, [
    "data.photos",
    "data",
    "photos",
  ]);
}

export function getPrimaryPhoto(photos: ApiPhoto[]): string {
  if (!Array.isArray(photos) || photos.length === 0) return "";
  const primary = photos.find(p => p.is_primary) ?? photos[0];
  return primary?.photo_url || primary?.url || "";
}

export function normalizeService(api: ApiService): ServiceType {
  const id = api.service_id ?? api.id ?? 0;
  return {
    id,
    title: String(api.title ?? api.name ?? "Untitled Service"),
    location: String(api.location_text ?? api.location ?? "Unknown location"),
    price: Number(api.price ?? 0),
    rating: Number(api.rating ?? 0),
    image: api.image,
    categoryId: api.category_id ?? api.categoryId,
    description: api.description,
    reviews: api.reviews,
    duration: api.duration,
    isFeatured: api.isFeatured,
    providerName: api.providerName,
  };
}


