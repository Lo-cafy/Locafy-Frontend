import type { ServiceType } from "@/types/services";
import type { ApiService, ApiPhoto } from "@/types/api";

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
  return primary?.photo_url || "";
}

export function normalizeService(api: ApiService): ServiceType {
  const id = api.service_id ?? api.id ?? 0;
  return {
    id,
    title: String(api.title ?? "Untitled Service"),
    location: String(api.location_text ?? "Unknown location"),
    price: Number(api.price ?? 0),
    rating: Number(api.rating ?? 0),
    image: api.image_url,
    categoryId: undefined,
    description: api.description,
    reviews: api.review_count,
    duration: api.completion_time,
    isFeatured: api.is_featured,
    providerName: api.provider_name,
  };
}
