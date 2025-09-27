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