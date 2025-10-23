// Business Profile Types

export interface ProviderBusinessProfile {
  id?: string;
  businessName: string;
  businessType?: string;
  description: string;
  businessDescription?: string;
  category: string;
  services: string[];
  experience: number;
  isBusinessVerified?: boolean;
  pricing: {
    hourlyRate?: number;
    fixedRate?: number;
    currency: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
  serviceArea: string[];
  certifications: string[];
  insurance: boolean;
  rating?: number;
  reviewsCount?: number;
  completedJobs?: number;
  profileImage?: string;
  gallery?: string[];
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  websiteUrl?: string; // Alternative field name
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  // Additional fields used by components
  baseServiceRate?: number;
  currencyCode?: string;
  averageRating?: number;
  totalReviews?: number;
  totalBookings?: number;
  completionRate?: number;
  serviceRadiusKm?: number;
}

export interface AlertState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
