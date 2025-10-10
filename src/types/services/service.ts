export interface ServiceType {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  categoryId?: number;
  description?: string;
  reviews?: number;       // total reviews count
  duration?: string;      // completion/delivery time
  isFeatured?: boolean;
  providerName?: string;  // optional provider
}

export interface ServiceCardType {
  id: number;
  name: string;           // maps from title
  location: string;
  price: number;
  rating: number;
  image?: string;
  providerName?: string;
  reviewCount?: number;   // maps from reviews
  completionTime?: string;// maps from duration
  isFeatured?: boolean;
}

export interface ServiceSummaryProps {
  service: any;
}

export interface ServiceCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  isFeatured?: boolean;
}


