export type Service = {
  id: string;
  name: string;
  description: string;
  price: Price;
  priceUnit: string; 
  category: Category;
  provider: Provider;
  providerName?: string; 
  images: string[];
  rating: number;
  reviewCount: number;
  status: ServiceStatus;
  isActive: boolean;  
  location: string;  
  availability: Availability;
  features: string[];
  createdAt: string;
  updatedAt: string;
};

export type Price = {
  amount: number;
  currency: string;
  unit: 'hour' | 'day' | 'session' | 'project';
  discounts?: Discount[];
};

export type Discount = {
  type: 'percentage' | 'fixed';
  value: number;
  validFrom: string;
  validUntil: string;
  code?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parentId?: string;
};

export type Provider = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  verified: boolean;
  location: Location;
  specialties: string[];
  experience: number;
};

export type Location = {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

export type Availability = {
  schedule: Schedule[];
  exceptions: Exception[];
  timezone: string;
};

export type Schedule = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  slots: TimeSlot[];
};

export type TimeSlot = {
  start: string;
  end: string;
};

export type Exception = {
  date: string;
  type: 'holiday' | 'unavailable' | 'custom';
  description?: string;
};

export type ServiceStatus = 'active' | 'inactive' | 'pending' | 'rejected';

export type ServiceFilter = {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  availability?: string;
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
  sortOrder?: 'asc' | 'desc';
};

export type ServiceReview = {
  id: string;
  serviceId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  helpful: number;
  response?: {
    comment: string;
    createdAt: string;
  };
};

// src/Types/service.ts
export interface Photo {
  photo_url?: string;
  url?: string;
}

export interface Review {
  rating?: number;
}

export interface Option {
  id: string | number;
  name: string;
  price: number; // must be number
  description?: string;
}

export interface ServiceFull {
  service_id: number;
  id?: number;
  title: string;
  description?: string;
  price: string; // API returns string
  currency_code?: string;
  reviews?: Review[];
  photos?: Photo[];
  tags?: string[];
  type?: string;
  whatsIncluded?: string[];
  options?: { id?: number | string; name?: string; price?: number; description?: string }[];
  relatedServices?: ServiceFull[];
  availability?: string;
  booking_count?: number;
  service_radius_km?: number;
  location_text?: string;
  verification_status?: string;
  category_id?: number;
}
