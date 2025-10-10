export const BASE_URL = "https://back-end-servicelisting.onrender.com";

export const API_ENDPOINTS = {
  SERVICES: "/api/services",
  SERVICES_BY_CATEGORY: (categoryId: number) => `/api/services/category/${categoryId}`,
  CATEGORIES: "/api/categories",
  PHOTOS: (serviceId: number) => `/api/photoservices/${serviceId}/photos`,
} as const;


