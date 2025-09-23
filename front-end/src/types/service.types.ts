 
export type Coordinates = {
  latitude: number;
  longitude: number;
};

 
export type ServiceCategory = {
  categoryId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
 
export type ServicePhoto = {
  photoId: string;
  photoUrl: string;
  isPrimary: boolean;
  createdAt: string;
};
 
export type ServiceProvider = {
  userId: number;
  firstname: string;
  lastname: string;
  rating: number;
};
 
export type ServiceListing = {
  serviceId: string;
  providerId: number;
  categoryId: number;
  title: string;
  description?: string;
  price: number;
  locationText: string;
  locationGeo?: Coordinates;
  rating: number;
  photos?: ServicePhoto[];
  category?: ServiceCategory;
  provider?: ServiceProvider;
  distanceKm?: number;
  primaryPhotoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type ServiceSearchFilters = {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  radiusKm?: number;
  minRating?: number;
  locationFilter?: string;
  queryText?: string;
  limit?: number;
  cursor?: string;
};

export type ServiceSearchParams = ServiceSearchFilters;

export type ServiceSearchResponse = {
  services: ServiceListing[];
  hasMore: boolean;
  nextCursor?: string;
};
export type CreateServiceInput = {
  categoryId: number;
  title: string;
  description?: string;
  price: number;
  locationText: string;
  coordinates?: Coordinates;
  photoUrls?: string[];
  primaryPhotoIndex?: number;
};

 
export type ServiceDetailsResponse = ServiceListing & {
  longitude?: number;
  latitude?: number;
  categoryName: string;
  providerFirstname: string;
  providerLastname: string;
  providerRating: number;
   totalReviews: number;
};