export interface Service {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  categoryId?: number;
  description?: string;
  reviews?: number;
  duration?: string;
  isFeatured?: boolean;
}
